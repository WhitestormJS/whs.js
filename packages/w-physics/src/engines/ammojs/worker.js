import CMD from '../commands';

const transferableMessage = self.webkitPostMessage || self.postMessage;

let AMMO = null;

let dt = 0;
new class AmmoBackend {
  bodies = [];
  cache = {
    geometries: {}
  };

  constructor() {
    self.onmessage = ({data}) => {
      // console.log(data);
      switch (data[0] || data.cmd) {
        case CMD.INITIALIZE:
          this.initialize(data.data.path);
          transferableMessage({cmd: CMD.FEEDBACK_INITIALIZE});
          break;
        case CMD.REQUEST_UPDATE:
          this.update();
          // transferableMessage(true);
          break;
        case CMD.CREATE_RIGIDBODY:
          this.createRigidBody(data.data);
          break;
        default:

      }
    };
  }

  initialize(ammoPath) {
    importScripts(ammoPath);
    AMMO = Ammo();
    console.log('Ammo initialized!', AMMO);
    this.prepareSetup();
  }

  prepareSetup() {
    // temp variables
    this.tmpVec3 = new AMMO.btVector3();

    this.collisionConfiguration = new AMMO.btDefaultCollisionConfiguration();
    this.dispatcher = new AMMO.btCollisionDispatcher(this.collisionConfiguration);
    this.broadphase = new AMMO.btDbvtBroadphase();
    this.solver = new AMMO.btSequentialImpulseConstraintSolver();

    this.world = new AMMO.btDiscreteDynamicsWorld(
      this.dispatcher,
      this.broadphase,
      this.solver,
      this.collisionConfiguration
    );

    this.world.setGravity(new AMMO.btVector3(0, -5, 0));

    // TODO: Remove
  }

  // key example: `plane.normal{24.543,23.53,53.4}`
  *shapeGenerator({type = 'box', ...data}) {
    const vec3 = this.tmpVec3;

    switch (type) {
      case 'plane':
        yield Symbol.for(`plane.normal{${data.normal.join(',')}}`);

        vec3.setX(data.normal[0]);
        vec3.setY(data.normal[1]);
        vec3.setY(data.normal[2]);

        yield new AMMO.btStaticPlaneShape(vec3);
      case 'sphere':
        yield Symbol.for(`sphere.radius{${data.radius}}`);
        yield new AMMO.btSphereShape(data.radius);
      case 'box':
        yield Symbol.for(`box.size{${data.size.join(',')}}`);

        vec3.setX(data.size[0] / 2);
        vec3.setY(data.size[1] / 2);
        vec3.setY(data.size[2] / 2);

        yield new AMMO.btBoxShape(vec3);
      default:

    }
  }

  createShape(bodyData) {
    const shapeGenerator = this.shapeGenerator(bodyData);
    const shapeKey = shapeGenerator.next().value;

    if (shapeKey in this.cache.geometries) {
      return this.cache.geometries[shapeKey];
    }

    return shapeGenerator.next().value;
  }

  createBody(shape, {
    mass = 1,
    position = [0, 0, 0],
    restitution = 0,
    friction = 1,
    linearDamping = 0,
    angularDamping = 0
  }) {
    const transform = this.transform = new AMMO.btTransform();
    transform.setIdentity();
    transform.setOrigin(new AMMO.btVector3(position[0], position[1], position[2]));

    const localInertia = new AMMO.btVector3(0, 0, 0);

    shape.calculateLocalInertia(mass, localInertia);
    const motionState = new AMMO.btDefaultMotionState(transform);
    const rbInfo = new AMMO.btRigidBodyConstructionInfo(mass, motionState, shape, localInertia);

    rbInfo.set_m_friction(friction);
    console.log('restitution', restitution);
    rbInfo.set_m_restitution(restitution);
    rbInfo.set_m_linearDamping(linearDamping);
    rbInfo.set_m_angularDamping(angularDamping);

    const body = new AMMO.btRigidBody(rbInfo);

    return body;
  }

  createRigidBody(bodyData) {
    const shape = this.createShape(bodyData);

    const body = this.createBody(shape, {
      mass: typeof bodyData.mass === 'number' ? bodyData.mass : 1,
      position: bodyData.position,
      restitution: bodyData.restitution,
      friction: bodyData.friction,
      linearDamping: bodyData.linearDamping,
      angularDamping: bodyData.angularDamping
    });

    this.world.addRigidBody(body);
    this.bodies.push(body);

    transferableMessage({
      cmd: CMD.FEEDBACK_RIGIDBODY,
      data: {index: bodyData.index}
    });
  }

  updateRigidBodies(array, initialOffset) {
    let numbodies = this.bodies.length;

    while (numbodies--) {
      const offset = numbodies * 7 + initialOffset;

      this.bodies[numbodies].getMotionState().getWorldTransform(this.transform);
      const origin = this.transform.getOrigin();
      const rotation = this.transform.getRotation();

      array[offset] = origin.x();
      array[offset + 1] = origin.y();
      array[offset + 2] = origin.z();
      array[offset + 3] = rotation.x();
      array[offset + 4] = rotation.y();
      array[offset + 5] = rotation.z();
      array[offset + 6] = rotation.w();
    }
  }

  simulate() {
    this.world.stepSimulation(dt++, 2);
  }

  update() {
    const array = new Float32Array(
      1 +
      this.bodies.length * 7
    );

    array[0] = CMD.FEEDBACK_UPDATE;

    this.simulate();
    this.updateRigidBodies(array, 1);

    transferableMessage(array);
  }
}
