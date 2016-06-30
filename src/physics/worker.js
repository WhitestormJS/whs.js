import Ammo from 'whs-ammo';

module.exports = function (self) {
  'use strict';
  const transferableMessage = self.webkitPostMessage || self.postMessage,

    // enum
    MESSAGE_TYPES = {
      WORLDREPORT: 0,
      COLLISIONREPORT: 1,
      VEHICLEREPORT: 2,
      CONSTRAINTREPORT: 3
    };

    // temp variables
  let _object,
    _vector,
    _transform,
    last_simulation_duration = 0,

    _num_objects = 0,
    _num_wheels = 0,
    _num_constraints = 0,

    // functions
    reportVehicles,
    reportCollisions,
    reportConstraints,

    // world variables
    fixedTimeStep, // used when calling stepSimulation
    rateLimit, // sets whether or not to sync the simulation rate with fixedTimeStep
    last_simulation_time,

    world,
    _vec3_1,
    _vec3_2,
    _vec3_3,
    _quat;

    // private cache
  const public_functions = {},
    _objects = {},
    _vehicles = {},
    _constraints = {},
    _materials = {},
    _objects_ammo = {},
    _object_shapes = {},

    // The following objects are to track objects that ammo.js doesn't clean
    // up. All are cleaned up when they're corresponding body is destroyed.
    // Unfortunately, it's very difficult to get at these objects from the
    // body, so we have to track them ourselves.
    _motion_states = {},
    // Don't need to worry about it for cached shapes.
    _noncached_shapes = {},
    // A body with a compound shape always has a regular shape as well, so we
    // have track them separately.
    _compound_shapes = {};

    // object reporting
  let REPORT_CHUNKSIZE, // report array is increased in increments of this chunk size
    worldreport,
    collisionreport,
    vehiclereport,
    constraintreport;

  const WORLDREPORT_ITEMSIZE = 14, // how many float values each reported item needs
    COLLISIONREPORT_ITEMSIZE = 5, // one float for each object id, and a Vec3 contact normal
    VEHICLEREPORT_ITEMSIZE = 9, // vehicle id, wheel index, 3 for position, 4 for rotation
    CONSTRAINTREPORT_ITEMSIZE = 6; // constraint id, offset object, offset, applied impulse

  const ab = new ArrayBuffer(1);

  transferableMessage(ab, [ab]);
  const SUPPORT_TRANSFERABLE = (ab.byteLength === 0);

  const getShapeFromCache = (cache_key) => {
    if (_object_shapes[cache_key] !== undefined)
      return _object_shapes[cache_key];

    return null;
  };

  const setShapeCache = (cache_key, shape) => {
    _object_shapes[cache_key] = shape;
  };

  const createShape = (description) => {
    let shape;

    _transform.setIdentity();
    switch (description.type) {
      case 'plane': {
        const cache_key = `plane_${description.normal.x}_${description.normal.y}_${description.normal.z}`;

        if ((shape = getShapeFromCache(cache_key)) === null) {
          _vec3_1.setX(description.normal.x);
          _vec3_1.setY(description.normal.y);
          _vec3_1.setZ(description.normal.z);
          shape = new Ammo.btStaticPlaneShape(_vec3_1, 0);
          setShapeCache(cache_key, shape);
        }

        break;
      }
      case 'box': {
        const cache_key = `box_${description.width}_${description.height}_${description.depth}`;

        if ((shape = getShapeFromCache(cache_key)) === null) {
          _vec3_1.setX(description.width / 2);
          _vec3_1.setY(description.height / 2);
          _vec3_1.setZ(description.depth / 2);
          shape = new Ammo.btBoxShape(_vec3_1);
          setShapeCache(cache_key, shape);
        }

        break;
      }
      case 'sphere': {
        const cache_key = `sphere_${description.radius}`;

        if ((shape = getShapeFromCache(cache_key)) === null) {
          shape = new Ammo.btSphereShape(description.radius);
          setShapeCache(cache_key, shape);
        }

        break;
      }
      case 'cylinder': {
        const cache_key = `cylinder_${description.width}_${description.height}_${description.depth}`;

        if ((shape = getShapeFromCache(cache_key)) === null) {
          _vec3_1.setX(description.width / 2);
          _vec3_1.setY(description.height / 2);
          _vec3_1.setZ(description.depth / 2);
          shape = new Ammo.btCylinderShape(_vec3_1);
          setShapeCache(cache_key, shape);
        }

        break;
      }
      case 'capsule': {
        const cache_key = `capsule_${description.radius}_${description.height}`;

        if ((shape = getShapeFromCache(cache_key)) === null) {
          // In Bullet, capsule height excludes the end spheres
          shape = new Ammo.btCapsuleShape(description.radius, description.height - 2 * description.radius);
          setShapeCache(cache_key, shape);
        }

        break;
      }
      case 'cone': {
        const cache_key = `cone_${description.radius}_${description.height}`;

        if ((shape = getShapeFromCache(cache_key)) === null) {
          shape = new Ammo.btConeShape(description.radius, description.height);
          setShapeCache(cache_key, shape);
        }

        break;
      }
      case 'concave': {
        const triangle_mesh = new Ammo.btTriangleMesh();
        if (!description.triangles.length) return false;

        for (let i = 0; i < description.triangles.length; i++) {
          const triangle = description.triangles[i];

          _vec3_1.setX(triangle[0].x);
          _vec3_1.setY(triangle[0].y);
          _vec3_1.setZ(triangle[0].z);

          _vec3_2.setX(triangle[1].x);
          _vec3_2.setY(triangle[1].y);
          _vec3_2.setZ(triangle[1].z);

          _vec3_3.setX(triangle[2].x);
          _vec3_3.setY(triangle[2].y);
          _vec3_3.setZ(triangle[2].z);

          triangle_mesh.addTriangle(
            _vec3_1,
            _vec3_2,
            _vec3_3,
            false
          );
        }

        shape = new Ammo.btBvhTriangleMeshShape(
          triangle_mesh,
          true,
          true
        );
        _noncached_shapes[description.id] = shape;

        break;
      }
      case 'convex': {
        shape = new Ammo.btConvexHullShape();

        for (let i = 0; i < description.points.length; i++) {
          const point = description.points[i];

          _vec3_1.setX(point.x);
          _vec3_1.setY(point.y);
          _vec3_1.setZ(point.z);

          shape.addPoint(_vec3_1);
        }

        _noncached_shapes[description.id] = shape;

        break;
      }
      case 'heightfield': {
        const ptr = Ammo._malloc(4 * description.xpts * description.ypts);

        for (let i = 0, p = 0, p2 = 0; i < description.xpts; i++) {
          for (let j = 0; j < description.ypts; j++) {
            Ammo.HEAPF32[ptr + p2 >> 2] = description.points[p];

            p++;
            p2 += 4;
          }
        }

        shape = new Ammo.btHeightfieldTerrainShape(
          description.xpts,
          description.ypts,
          ptr,
          1,
          -description.absMaxHeight,
          description.absMaxHeight,
          2,
          'PHY_FLOAT',
          false
        );

        _vec3_1.setX(description.xsize / (description.xpts - 1));
        _vec3_1.setY(description.ysize / (description.ypts - 1));
        _vec3_1.setZ(1);

        shape.setLocalScaling(_vec3_1);
        _noncached_shapes[description.id] = shape;
        break;
      }
      default:
        // Not recognized
        return;
    }

    return shape;
  };

  public_functions.init = (params) => {
    _transform = new Ammo.btTransform();
    _vec3_1 = new Ammo.btVector3(0, 0, 0);
    _vec3_2 = new Ammo.btVector3(0, 0, 0);
    _vec3_3 = new Ammo.btVector3(0, 0, 0);
    _quat = new Ammo.btQuaternion(0, 0, 0, 0);

    REPORT_CHUNKSIZE = params.reportsize || 50;

    if (SUPPORT_TRANSFERABLE) {
      // Transferable messages are supported, take advantage of them with TypedArrays
      worldreport = new Float32Array(2 + REPORT_CHUNKSIZE * WORLDREPORT_ITEMSIZE); // message id + # of objects to report + chunk size * # of values per object
      collisionreport = new Float32Array(2 + REPORT_CHUNKSIZE * COLLISIONREPORT_ITEMSIZE); // message id + # of collisions to report + chunk size * # of values per object
      vehiclereport = new Float32Array(2 + REPORT_CHUNKSIZE * VEHICLEREPORT_ITEMSIZE); // message id + # of vehicles to report + chunk size * # of values per object
      constraintreport = new Float32Array(2 + REPORT_CHUNKSIZE * CONSTRAINTREPORT_ITEMSIZE); // message id + # of constraints to report + chunk size * # of values per object
    } else {
      // Transferable messages are not supported, send data as normal arrays
      worldreport = [];
      collisionreport = [];
      vehiclereport = [];
      constraintreport = [];
    }

    worldreport[0] = MESSAGE_TYPES.WORLDREPORT;
    collisionreport[0] = MESSAGE_TYPES.COLLISIONREPORT;
    vehiclereport[0] = MESSAGE_TYPES.VEHICLEREPORT;
    constraintreport[0] = MESSAGE_TYPES.CONSTRAINTREPORT;

    const collisionConfiguration = new Ammo.btDefaultCollisionConfiguration(),
      dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration),
      solver = new Ammo.btSequentialImpulseConstraintSolver();

    let broadphase;

    if (!params.broadphase) params.broadphase = {type: 'dynamic'};

    switch (params.broadphase.type) {
      case 'sweepprune':

        _vec3_1.setX(params.broadphase.aabbmin.x);
        _vec3_1.setY(params.broadphase.aabbmin.y);
        _vec3_1.setZ(params.broadphase.aabbmin.z);

        _vec3_2.setX(params.broadphase.aabbmax.x);
        _vec3_2.setY(params.broadphase.aabbmax.y);
        _vec3_2.setZ(params.broadphase.aabbmax.z);

        broadphase = new Ammo.btAxisSweep3(
          _vec3_1,
          _vec3_2
        );

        break;

      case 'dynamic':
      default:
        broadphase = new Ammo.btDbvtBroadphase();
        break;
    }

    world = new Ammo.btDiscreteDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration);

    fixedTimeStep = params.fixedTimeStep;
    rateLimit = params.rateLimit;

    transferableMessage({cmd: 'worldReady'});
  };

  public_functions.registerMaterial = (description) => {
    _materials[description.id] = description;
  };

  public_functions.unRegisterMaterial = (description) => {
    delete _materials[description.id];
  };

  public_functions.setFixedTimeStep = (description) => {
    fixedTimeStep = description;
  };

  public_functions.setGravity = (description) => {
    _vec3_1.setX(description.x);
    _vec3_1.setY(description.y);
    _vec3_1.setZ(description.z);
    world.setGravity(_vec3_1);
  };

  public_functions.addObject = (description) => {
    let shape = createShape(description);

    if (!shape) return;

    // If there are children then this is a compound shape
    if (description.children) {
      const compound_shape = new Ammo.btCompoundShape();
      compound_shape.addChildShape(_transform, shape);

      for (let i = 0; i < description.children.length; i++) {
        const _child = description.children[i];

        const trans = new Ammo.btTransform();
        trans.setIdentity();

        _vec3_1.setX(_child.position_offset.x);
        _vec3_1.setY(_child.position_offset.y);
        _vec3_1.setZ(_child.position_offset.z);
        trans.setOrigin(_vec3_1);

        _quat.setX(_child.rotation.x);
        _quat.setY(_child.rotation.y);
        _quat.setZ(_child.rotation.z);
        _quat.setW(_child.rotation.w);
        trans.setRotation(_quat);

        shape = createShape(description.children[i]);
        compound_shape.addChildShape(trans, shape);
        Ammo.destroy(trans);
      }

      shape = compound_shape;
      _compound_shapes[description.id] = shape;
    }

    _vec3_1.setX(0);
    _vec3_1.setY(0);
    _vec3_1.setZ(0);
    shape.calculateLocalInertia(description.mass, _vec3_1);

    _transform.setIdentity();

    _vec3_2.setX(description.position.x);
    _vec3_2.setY(description.position.y);
    _vec3_2.setZ(description.position.z);
    _transform.setOrigin(_vec3_2);

    _quat.setX(description.rotation.x);
    _quat.setY(description.rotation.y);
    _quat.setZ(description.rotation.z);
    _quat.setW(description.rotation.w);
    _transform.setRotation(_quat);

    const motionState = new Ammo.btDefaultMotionState(_transform); // #TODO: btDefaultMotionState supports center of mass offset as second argument - implement
    const rbInfo = new Ammo.btRigidBodyConstructionInfo(description.mass, motionState, shape, _vec3_1);

    if (description.materialId !== undefined) {
      rbInfo.set_m_friction(_materials[description.materialId].friction);
      rbInfo.set_m_restitution(_materials[description.materialId].restitution);
    }

    const body = new Ammo.btRigidBody(rbInfo);
    Ammo.destroy(rbInfo);

    if (typeof description.collision_flags !== 'undefined') body.setCollisionFlags(description.collision_flags);

    world.addRigidBody(body);

    body.id = description.id;
    _objects[body.id] = body;
    _motion_states[body.id] = motionState;

    _objects_ammo[body.a == undefined ? body.ptr : body.a] = body.id;
    _num_objects++;

    transferableMessage({cmd: 'objectReady', params: body.id});
  };

  public_functions.addVehicle = (description) => {
    const vehicle_tuning = new Ammo.btVehicleTuning();

    vehicle_tuning.set_m_suspensionStiffness(description.suspension_stiffness);
    vehicle_tuning.set_m_suspensionCompression(description.suspension_compression);
    vehicle_tuning.set_m_suspensionDamping(description.suspension_damping);
    vehicle_tuning.set_m_maxSuspensionTravelCm(description.max_suspension_travel);
    vehicle_tuning.set_m_maxSuspensionForce(description.max_suspension_force);

    const vehicle = new Ammo.btRaycastVehicle(
      vehicle_tuning,
      _objects[description.rigidBody],
      new Ammo.btDefaultVehicleRaycaster(world)
    );

    vehicle.tuning = vehicle_tuning;
    _objects[description.rigidBody].setActivationState(4);
    vehicle.setCoordinateSystem(0, 1, 2);

    world.addVehicle(vehicle);
    _vehicles[description.id] = vehicle;
  };
  public_functions.removeVehicle = (description) => {
    delete _vehicles[description.id];
  };

  public_functions.addWheel = (description) => {
    if (_vehicles[description.id] !== undefined) {
      let tuning = _vehicles[description.id].tuning;
      if (description.tuning !== undefined) {
        tuning = new Ammo.btVehicleTuning();
        tuning.set_m_suspensionStiffness(description.tuning.suspension_stiffness);
        tuning.set_m_suspensionCompression(description.tuning.suspension_compression);
        tuning.set_m_suspensionDamping(description.tuning.suspension_damping);
        tuning.set_m_maxSuspensionTravelCm(description.tuning.max_suspension_travel);
        tuning.set_m_maxSuspensionForce(description.tuning.max_suspension_force);
      }

      _vec3_1.setX(description.connection_point.x);
      _vec3_1.setY(description.connection_point.y);
      _vec3_1.setZ(description.connection_point.z);

      _vec3_2.setX(description.wheel_direction.x);
      _vec3_2.setY(description.wheel_direction.y);
      _vec3_2.setZ(description.wheel_direction.z);

      _vec3_3.setX(description.wheel_axle.x);
      _vec3_3.setY(description.wheel_axle.y);
      _vec3_3.setZ(description.wheel_axle.z);

      _vehicles[description.id].addWheel(
        _vec3_1,
        _vec3_2,
        _vec3_3,
        description.suspension_rest_length,
        description.wheel_radius,
        tuning,
        description.is_front_wheel
      );
    }

    _num_wheels++;

    if (SUPPORT_TRANSFERABLE) {
      vehiclereport = new Float32Array(1 + _num_wheels * VEHICLEREPORT_ITEMSIZE); // message id & ( # of objects to report * # of values per object )
      vehiclereport[0] = MESSAGE_TYPES.VEHICLEREPORT;
    } else vehiclereport = [MESSAGE_TYPES.VEHICLEREPORT];
  };

  public_functions.setSteering = (details) => {
    if (_vehicles[details.id] !== undefined) _vehicles[details.id].setSteeringValue(details.steering, details.wheel);
  };

  public_functions.setBrake = (details) => {
    if (_vehicles[details.id] !== undefined) _vehicles[details.id].setBrake(details.brake, details.wheel);
  };

  public_functions.applyEngineForce = (details) => {
    if (_vehicles[details.id] !== undefined) _vehicles[details.id].applyEngineForce(details.force, details.wheel);
  };

  public_functions.removeObject = (details) => {
    world.removeRigidBody(_objects[details.id]);
    Ammo.destroy(_objects[details.id]);
    Ammo.destroy(_motion_states[details.id]);
    if (_compound_shapes[details.id]) Ammo.destroy(_compound_shapes[details.id]);
    if (_noncached_shapes[details.id]) Ammo.destroy(_noncached_shapes[details.id]);

    _objects_ammo[_objects[details.id].a === undefined ? _objects[details.id].a : _objects[details.id].ptr] = null;
    _objects[details.id] = null;
    _motion_states[details.id] = null;

    if (_compound_shapes[details.id]) _compound_shapes[details.id] = null;
    if (_noncached_shapes[details.id]) _noncached_shapes[details.id] = null;
    _num_objects--;
  };

  public_functions.updateTransform = (details) => {
    _object = _objects[details.id];
    _object.getMotionState().getWorldTransform(_transform);

    if (details.pos) {
      _vec3_1.setX(details.pos.x);
      _vec3_1.setY(details.pos.y);
      _vec3_1.setZ(details.pos.z);
      _transform.setOrigin(_vec3_1);
    }

    if (details.quat) {
      _quat.setX(details.quat.x);
      _quat.setY(details.quat.y);
      _quat.setZ(details.quat.z);
      _quat.setW(details.quat.w);
      _transform.setRotation(_quat);
    }

    _object.setWorldTransform(_transform);
    _object.activate();
  };

  public_functions.updateMass = (details) => {
    // #TODO: changing a static object into dynamic is buggy
    _object = _objects[details.id];

    // Per http://www.bulletphysics.org/Bullet/phpBB3/viewtopic.php?p=&f=9&t=3663#p13816
    world.removeRigidBody(_object);

    _vec3_1.setX(0);
    _vec3_1.setY(0);
    _vec3_1.setZ(0);

    _object.setMassProps(details.mass, _vec3_1);
    world.addRigidBody(_object);
    _object.activate();
  };

  public_functions.applyCentralImpulse = (details) => {

    _vec3_1.setX(details.x);
    _vec3_1.setY(details.y);
    _vec3_1.setZ(details.z);

    _objects[details.id].applyCentralImpulse(_vec3_1);
    _objects[details.id].activate();
  };

  public_functions.applyImpulse = (details) => {

    _vec3_1.setX(details.impulse_x);
    _vec3_1.setY(details.impulse_y);
    _vec3_1.setZ(details.impulse_z);

    _vec3_2.setX(details.x);
    _vec3_2.setY(details.y);
    _vec3_2.setZ(details.z);

    _objects[details.id].applyImpulse(
      _vec3_1,
      _vec3_2
    );
    _objects[details.id].activate();
  };

  public_functions.applyTorque = (details) => {

    _vec3_1.setX(details.torque_x);
    _vec3_1.setY(details.torque_y);
    _vec3_1.setZ(details.torque_z);

    _objects[details.id].applyTorque(
      _vec3_1
    );
    _objects[details.id].activate();
  };

  public_functions.applyCentralForce = (details) => {

    _vec3_1.setX(details.x);
    _vec3_1.setY(details.y);
    _vec3_1.setZ(details.z);

    _objects[details.id].applyCentralForce(_vec3_1);
    _objects[details.id].activate();
  };

  public_functions.applyForce = (details) => {

    _vec3_1.setX(details.force_x);
    _vec3_1.setY(details.force_y);
    _vec3_1.setZ(details.force_z);

    _vec3_2.setX(details.x);
    _vec3_2.setY(details.y);
    _vec3_2.setZ(details.z);

    _objects[details.id].applyForce(
      _vec3_1,
      _vec3_2
    );
    _objects[details.id].activate();
  };

  public_functions.onSimulationResume = () => {
    last_simulation_time = Date.now();
  };

  public_functions.setAngularVelocity = (details) => {
    _vec3_1.setX(details.x);
    _vec3_1.setY(details.y);
    _vec3_1.setZ(details.z);

    _objects[details.id].setAngularVelocity(
      _vec3_1
    );
    _objects[details.id].activate();
  };

  public_functions.setLinearVelocity = (details) => {
    _vec3_1.setX(details.x);
    _vec3_1.setY(details.y);
    _vec3_1.setZ(details.z);

    _objects[details.id].setLinearVelocity(
      _vec3_1
    );
    _objects[details.id].activate();
  };

  public_functions.setAngularFactor = (details) => {
    _vec3_1.setX(details.x);
    _vec3_1.setY(details.y);
    _vec3_1.setZ(details.z);

    _objects[details.id].setAngularFactor(
        _vec3_1
    );
  };

  public_functions.setLinearFactor = (details) => {
    _vec3_1.setX(details.x);
    _vec3_1.setY(details.y);
    _vec3_1.setZ(details.z);

    _objects[details.id].setLinearFactor(
      _vec3_1
    );
  };

  public_functions.setDamping = (details) => {
    _objects[details.id].setDamping(details.linear, details.angular);
  };

  public_functions.setCcdMotionThreshold = (details) => {
    _objects[details.id].setCcdMotionThreshold(details.threshold);
  };

  public_functions.setCcdSweptSphereRadius = (details) => {
    _objects[details.id].setCcdSweptSphereRadius(details.radius);
  };

  public_functions.addConstraint = (details) => {
    let constraint;

    switch (details.type) {

      case 'point': {
        if (details.objectb === undefined) {
          _vec3_1.setX(details.positiona.x);
          _vec3_1.setY(details.positiona.y);
          _vec3_1.setZ(details.positiona.z);

          constraint = new Ammo.btPoint2PointConstraint(
            _objects[details.objecta],
            _vec3_1
          );
        } else {
          _vec3_1.setX(details.positiona.x);
          _vec3_1.setY(details.positiona.y);
          _vec3_1.setZ(details.positiona.z);

          _vec3_2.setX(details.positionb.x);
          _vec3_2.setY(details.positionb.y);
          _vec3_2.setZ(details.positionb.z);

          constraint = new Ammo.btPoint2PointConstraint(
            _objects[details.objecta],
            _objects[details.objectb],
            _vec3_1,
            _vec3_2
          );
        }
        break;
      }
      case 'hinge': {
        if (details.objectb === undefined) {
          _vec3_1.setX(details.positiona.x);
          _vec3_1.setY(details.positiona.y);
          _vec3_1.setZ(details.positiona.z);

          _vec3_2.setX(details.axis.x);
          _vec3_2.setY(details.axis.y);
          _vec3_2.setZ(details.axis.z);

          constraint = new Ammo.btHingeConstraint(
            _objects[details.objecta],
            _vec3_1,
            _vec3_2
          );
        } else {
          _vec3_1.setX(details.positiona.x);
          _vec3_1.setY(details.positiona.y);
          _vec3_1.setZ(details.positiona.z);

          _vec3_2.setX(details.positionb.x);
          _vec3_2.setY(details.positionb.y);
          _vec3_2.setZ(details.positionb.z);

          _vec3_3.setX(details.axis.x);
          _vec3_3.setY(details.axis.y);
          _vec3_3.setZ(details.axis.z);

          constraint = new Ammo.btHingeConstraint(
            _objects[details.objecta],
            _objects[details.objectb],
            _vec3_1,
            _vec3_2,
            _vec3_3,
            _vec3_3
          );
        }
        break;
      }
      case 'slider': {
        let transformb;
        const transforma = new Ammo.btTransform();

        _vec3_1.setX(details.positiona.x);
        _vec3_1.setY(details.positiona.y);
        _vec3_1.setZ(details.positiona.z);

        transforma.setOrigin(_vec3_1);

        let rotation = transforma.getRotation();
        rotation.setEuler(details.axis.x, details.axis.y, details.axis.z);
        transforma.setRotation(rotation);

        if (details.objectb) {
          transformb = new Ammo.btTransform();

          _vec3_2.setX(details.positionb.x);
          _vec3_2.setY(details.positionb.y);
          _vec3_2.setZ(details.positionb.z);

          transformb.setOrigin(_vec3_2);

          rotation = transformb.getRotation();
          rotation.setEuler(details.axis.x, details.axis.y, details.axis.z);
          transformb.setRotation(rotation);

          constraint = new Ammo.btSliderConstraint(
            _objects[details.objecta],
            _objects[details.objectb],
            transforma,
            transformb,
            true
          );
        } else {
          constraint = new Ammo.btSliderConstraint(
            _objects[details.objecta],
            transforma,
            true
          );
        }

        Ammo.destroy(transforma);
        if (transformb !== undefined) Ammo.destroy(transformb);

        break;
      }
      case 'conetwist': {
        const transforma = new Ammo.btTransform();
        transforma.setIdentity();

        const transformb = new Ammo.btTransform();
        transformb.setIdentity();

        _vec3_1.setX(details.positiona.x);
        _vec3_1.setY(details.positiona.y);
        _vec3_1.setZ(details.positiona.z);

        _vec3_2.setX(details.positionb.x);
        _vec3_2.setY(details.positionb.y);
        _vec3_2.setZ(details.positionb.z);

        transforma.setOrigin(_vec3_1);
        transformb.setOrigin(_vec3_2);

        let rotation = transforma.getRotation();
        rotation.setEulerZYX(-details.axisa.z, -details.axisa.y, -details.axisa.x);
        transforma.setRotation(rotation);

        rotation = transformb.getRotation();
        rotation.setEulerZYX(-details.axisb.z, -details.axisb.y, -details.axisb.x);
        transformb.setRotation(rotation);

        constraint = new Ammo.btConeTwistConstraint(
          _objects[details.objecta],
          _objects[details.objectb],
          transforma,
          transformb
        );

        constraint.setLimit(Math.PI, 0, Math.PI);

        Ammo.destroy(transforma);
        Ammo.destroy(transformb);

        break;
      }
      case 'dof': {
        let transformb;

        const transforma = new Ammo.btTransform();
        transforma.setIdentity();

        _vec3_1.setX(details.positiona.x);
        _vec3_1.setY(details.positiona.y);
        _vec3_1.setZ(details.positiona.z);

        transforma.setOrigin(_vec3_1);

        let rotation = transforma.getRotation();
        rotation.setEulerZYX(-details.axisa.z, -details.axisa.y, -details.axisa.x);
        transforma.setRotation(rotation);

        if (details.objectb) {
          transformb = new Ammo.btTransform();
          transformb.setIdentity();

          _vec3_2.setX(details.positionb.x);
          _vec3_2.setY(details.positionb.y);
          _vec3_2.setZ(details.positionb.z);

          transformb.setOrigin(_vec3_2);

          rotation = transformb.getRotation();
          rotation.setEulerZYX(-details.axisb.z, -details.axisb.y, -details.axisb.x);
          transformb.setRotation(rotation);

          constraint = new Ammo.btGeneric6DofConstraint(
            _objects[details.objecta],
            _objects[details.objectb],
            transforma,
            transformb,
            true
          );
        } else {
          constraint = new Ammo.btGeneric6DofConstraint(
            _objects[details.objecta],
            transforma,
            true
          );
        }

        Ammo.destroy(transforma);
        if (transformb !== undefined) Ammo.destroy(transformb);

        break;
      }
      default:
        return;
    }

    world.addConstraint(constraint);

    constraint.a = _objects[details.objecta];
    constraint.b = _objects[details.objectb];

    constraint.ta = transforma;
    constraint.tb = transformb;

    constraint.enableFeedback();
    _constraints[details.id] = constraint;
    _num_constraints++;

    if (SUPPORT_TRANSFERABLE) {
      constraintreport = new Float32Array(1 + _num_constraints * CONSTRAINTREPORT_ITEMSIZE); // message id & ( # of objects to report * # of values per object )
      constraintreport[0] = MESSAGE_TYPES.CONSTRAINTREPORT;
    } else constraintreport = [MESSAGE_TYPES.CONSTRAINTREPORT];
  };

  public_functions.removeConstraint = (details) => {
    const constraint = _constraints[details.id];

    if (constraint !== undefined) {
      world.removeConstraint(constraint);
      _constraints[details.id] = null;
      _num_constraints--;
    }
  };

  public_functions.constraint_setBreakingImpulseThreshold = (details) => {
    const constraint = _constraints[details.id];
    if (constraint !== undefind) constraint.setBreakingImpulseThreshold(details.threshold);
  };

  public_functions.simulate = (params = {}) => {
    if (world) {
      if (params.timeStep && params.timeStep < fixedTimeStep)
        params.timeStep = fixedTimeStep;
      else if (!params.timeStep && last_simulation_time) {
        params.timeStep = 0;

        while (params.timeStep + last_simulation_duration <= fixedTimeStep)
          params.timeStep = (Date.now() - last_simulation_time) / 1000; // time since last simulation
      } else if (!params.timeStep) params.timeStep = fixedTimeStep; // handle first frame

      params.maxSubSteps = params.maxSubSteps || Math.ceil(params.timeStep / fixedTimeStep); // If maxSubSteps is not defined, keep the simulation fully up to date

      last_simulation_duration = Date.now();
      world.stepSimulation(params.timeStep, params.maxSubSteps, fixedTimeStep);

      reportVehicles();
      reportCollisions();
      reportConstraints();
      reportWorld();

      last_simulation_duration = (Date.now() - last_simulation_duration) / 1000;
      last_simulation_time = Date.now();
    }
  };

  // Constraint functions
  public_functions.hinge_setLimits = (params) => {
    _constraints[params.constraint].setLimit(params.low, params.high, 0, params.bias_factor, params.relaxation_factor);
  };

  public_functions.hinge_enableAngularMotor = (params) => {
    const constraint = _constraints[params.constraint];
    constraint.enableAngularMotor(true, params.velocity, params.acceleration);
    constraint.a.activate();
    if (constraint.b) constraint.b.activate();
  };

  public_functions.hinge_disableMotor = (params) => {
    _constraints[params.constraint].enableMotor(false);
    if (constraint.b) constraint.b.activate();
  };

  public_functions.slider_setLimits = (params) => {
    const constraint = _constraints[params.constraint];
    constraint.setLowerLinLimit(params.lin_lower || 0);
    constraint.setUpperLinLimit(params.lin_upper || 0);

    constraint.setLowerAngLimit(params.ang_lower || 0);
    constraint.setUpperAngLimit(params.ang_upper || 0);
  };

  public_functions.slider_setRestitution = (params) => {
    const constraint = _constraints[params.constraint];
    constraint.setSoftnessLimLin(params.linear || 0);
    constraint.setSoftnessLimAng(params.angular || 0);
  };

  public_functions.slider_enableLinearMotor = (params) => {
    const constraint = _constraints[params.constraint];
    constraint.setTargetLinMotorVelocity(params.velocity);
    constraint.setMaxLinMotorForce(params.acceleration);
    constraint.setPoweredLinMotor(true);
    constraint.a.activate();
    if (constraint.b) constraint.b.activate();
  };

  public_functions.slider_disableLinearMotor = (params) => {
    const constraint = _constraints[params.constraint];
    constraint.setPoweredLinMotor(false);
    if (constraint.b) constraint.b.activate();
  };

  public_functions.slider_enableAngularMotor = (params) => {
    const constraint = _constraints[params.constraint];
    constraint.setTargetAngMotorVelocity(params.velocity);
    constraint.setMaxAngMotorForce(params.acceleration);
    constraint.setPoweredAngMotor(true);
    constraint.a.activate();
    if (constraint.b) constraint.b.activate();
  };

  public_functions.slider_disableAngularMotor = (params) => {
    const constraint = _constraints[params.constraint];
    constraint.setPoweredAngMotor(false);
    constraint.a.activate();
    if (constraint.b) constraint.b.activate();
  };

  public_functions.conetwist_setLimit = (params) => {
    _constraints[params.constraint].setLimit(params.z, params.y, params.x); // ZYX order
  };

  public_functions.conetwist_enableMotor = (params) => {
    const constraint = _constraints[params.constraint];
    constraint.enableMotor(true);
    constraint.a.activate();
    constraint.b.activate();
  };

  public_functions.conetwist_setMaxMotorImpulse = (params) => {
    const constraint = _constraints[params.constraint];
    constraint.setMaxMotorImpulse(params.max_impulse);
    constraint.a.activate();
    constraint.b.activate();
  };

  public_functions.conetwist_setMotorTarget = (params) => {
    const constraint = _constraints[params.constraint];

    _quat.setX(params.x);
    _quat.setY(params.y);
    _quat.setZ(params.z);
    _quat.setW(params.w);

    constraint.setMotorTarget(_quat);

    constraint.a.activate();
    constraint.b.activate();
  };

  public_functions.conetwist_disableMotor = (params) => {
    const constraint = _constraints[params.constraint];
    constraint.enableMotor(false);
    constraint.a.activate();
    constraint.b.activate();
  };

  public_functions.dof_setLinearLowerLimit = (params) => {
    const constraint = _constraints[params.constraint];

    _vec3_1.setX(params.x);
    _vec3_1.setY(params.y);
    _vec3_1.setZ(params.z);

    constraint.setLinearLowerLimit(_vec3_1);
    constraint.a.activate();

    if (constraint.b) constraint.b.activate();
  };

  public_functions.dof_setLinearUpperLimit = (params) => {
    const constraint = _constraints[params.constraint];

    _vec3_1.setX(params.x);
    _vec3_1.setY(params.y);
    _vec3_1.setZ(params.z);

    constraint.setLinearUpperLimit(_vec3_1);
    constraint.a.activate();

    if (constraint.b) constraint.b.activate();
  };

  public_functions.dof_setAngularLowerLimit = (params) => {
    const constraint = _constraints[params.constraint];

    _vec3_1.setX(params.x);
    _vec3_1.setY(params.y);
    _vec3_1.setZ(params.z);

    constraint.setAngularLowerLimit(_vec3_1);
    constraint.a.activate();

    if (constraint.b) constraint.b.activate();
  };

  public_functions.dof_setAngularUpperLimit = (params) => {
    const constraint = _constraints[params.constraint];

    _vec3_1.setX(params.x);
    _vec3_1.setY(params.y);
    _vec3_1.setZ(params.z);

    constraint.setAngularUpperLimit(_vec3_1);
    constraint.a.activate();

    if (constraint.b) constraint.b.activate();
  };

  public_functions.dof_enableAngularMotor = (params) => {
    const constraint = _constraints[params.constraint];

    const motor = constraint.getRotationalLimitMotor(params.which);
    motor.set_m_enableMotor(true);
    constraint.a.activate();

    if (constraint.b) constraint.b.activate();
  };

  public_functions.dof_configureAngularMotor = (params) => {
    const constraint = _constraints[params.constraint],
      motor = constraint.getRotationalLimitMotor(params.which);

    motor.set_m_loLimit(params.low_angle);
    motor.set_m_hiLimit(params.high_angle);
    motor.set_m_targetVelocity(params.velocity);
    motor.set_m_maxMotorForce(params.max_force);
    constraint.a.activate();

    if (constraint.b) constraint.b.activate();
  };

  public_functions.dof_disableAngularMotor = (params) => {
    const constraint = _constraints[params.constraint],
      motor = constraint.getRotationalLimitMotor(params.which);

    motor.set_m_enableMotor(false);
    constraint.a.activate();

    if (constraint.b) constraint.b.activate();
  };

  const reportWorld = function () {
    if (SUPPORT_TRANSFERABLE) {
      if (worldreport.length < 2 + _num_objects * WORLDREPORT_ITEMSIZE) {
        worldreport = new Float32Array(
          2 + // message id & # objects in report
          (Math.ceil(_num_objects / REPORT_CHUNKSIZE) * REPORT_CHUNKSIZE) * WORLDREPORT_ITEMSIZE // # of values needed * item size
        );
        worldreport[0] = MESSAGE_TYPES.WORLDREPORT;
      }
    }

    worldreport[1] = _num_objects; // record how many objects we're reporting on

    let offset = 0, i = 0;

    // for ( i = 0; i < worldreport[1]; i++ ) {
    for (const index in _objects) {
      if (_objects.hasOwnProperty(index)) {
        const object = _objects[index];

        // #TODO: we can't use center of mass transform when center of mass can change,
        //        but getMotionState().getWorldTransform() screws up on objects that have been moved
        // object.getMotionState().getWorldTransform( transform );
        const transform = object.getCenterOfMassTransform();

        const origin = transform.getOrigin();
        const rotation = transform.getRotation();

        // add values to report
        offset = 2 + (i++) * WORLDREPORT_ITEMSIZE;

        worldreport[offset] = object.id;

        worldreport[offset + 1] = origin.x();
        worldreport[offset + 2] = origin.y();
        worldreport[offset + 3] = origin.z();

        worldreport[offset + 4] = rotation.x();
        worldreport[offset + 5] = rotation.y();
        worldreport[offset + 6] = rotation.z();
        worldreport[offset + 7] = rotation.w();

        _vector = object.getLinearVelocity();
        worldreport[offset + 8] = _vector.x();
        worldreport[offset + 9] = _vector.y();
        worldreport[offset + 10] = _vector.z();

        _vector = object.getAngularVelocity();
        worldreport[offset + 11] = _vector.x();
        worldreport[offset + 12] = _vector.y();
        worldreport[offset + 13] = _vector.z();
      }
    }

    if (SUPPORT_TRANSFERABLE) transferableMessage(worldreport.buffer, [worldreport.buffer]);
    else transferableMessage(worldreport);
  };

  reportCollisions = function () {
    var i, offset,
      dp = world.getDispatcher(),
      num = dp.getNumManifolds(),
      manifold, num_contacts, j, pt,
      _collided = false;

    if (SUPPORT_TRANSFERABLE) {
      if (collisionreport.length < 2 + num * COLLISIONREPORT_ITEMSIZE) {
        collisionreport = new Float32Array(
          2 + // message id & # objects in report
          (Math.ceil(_num_objects / REPORT_CHUNKSIZE) * REPORT_CHUNKSIZE) * COLLISIONREPORT_ITEMSIZE // # of values needed * item size
        );
        collisionreport[0] = MESSAGE_TYPES.COLLISIONREPORT;
      }
    }

    collisionreport[1] = 0; // how many collisions we're reporting on

    for (i = 0; i < num; i++) {
      manifold = dp.getManifoldByIndexInternal(i);

      num_contacts = manifold.getNumContacts();
      if (num_contacts === 0) {
        continue;
      }

      for (j = 0; j < num_contacts; j++) {
        pt = manifold.getContactPoint(j);

        // if ( pt.getDistance() < 0 ) {
        offset = 2 + (collisionreport[1]++) * COLLISIONREPORT_ITEMSIZE;
        collisionreport[offset] = _objects_ammo[manifold.getBody0().ptr];
        collisionreport[offset + 1] = _objects_ammo[manifold.getBody1().ptr];

        _vector = pt.get_m_normalWorldOnB();
        collisionreport[offset + 2] = _vector.x();
        collisionreport[offset + 3] = _vector.y();
        collisionreport[offset + 4] = _vector.z();
        break;
        // }

        transferableMessage(_objects_ammo);

      }
    }


    if (SUPPORT_TRANSFERABLE) {
      transferableMessage(collisionreport.buffer, [collisionreport.buffer]);
    } else {
      transferableMessage(collisionreport);
    }
  };

  reportVehicles = function () {
    var index, vehicle,
      transform, origin, rotation,
      offset = 0,
      i = 0, j = 0;

    if (SUPPORT_TRANSFERABLE) {
      if (vehiclereport.length < 2 + _num_wheels * VEHICLEREPORT_ITEMSIZE) {
        vehiclereport = new Float32Array(
          2 + // message id & # objects in report
          (Math.ceil(_num_wheels / REPORT_CHUNKSIZE) * REPORT_CHUNKSIZE) * VEHICLEREPORT_ITEMSIZE // # of values needed * item size
        );
        vehiclereport[0] = MESSAGE_TYPES.VEHICLEREPORT;
      }
    }

    for (index in _vehicles) {
      if (_vehicles.hasOwnProperty(index)) {
        vehicle = _vehicles[index];

        for (j = 0; j < vehicle.getNumWheels(); j++) {

          // vehicle.updateWheelTransform( j, true );

          // transform = vehicle.getWheelTransformWS( j );
          transform = vehicle.getWheelInfo(j).get_m_worldTransform();

          origin = transform.getOrigin();
          rotation = transform.getRotation();

          // add values to report
          offset = 1 + (i++) * VEHICLEREPORT_ITEMSIZE;

          vehiclereport[offset] = index;
          vehiclereport[offset + 1] = j;

          vehiclereport[offset + 2] = origin.x();
          vehiclereport[offset + 3] = origin.y();
          vehiclereport[offset + 4] = origin.z();

          vehiclereport[offset + 5] = rotation.x();
          vehiclereport[offset + 6] = rotation.y();
          vehiclereport[offset + 7] = rotation.z();
          vehiclereport[offset + 8] = rotation.w();

        }

      }
    }

    if (j !== 0) {
      if (SUPPORT_TRANSFERABLE) {
        transferableMessage(vehiclereport.buffer, [vehiclereport.buffer]);
      } else {
        transferableMessage(vehiclereport);
      }
    }
  };

  reportConstraints = function () {
    var index, constraint,
      offset_body,
      transform, origin,
      offset = 0,
      i = 0;

    if (SUPPORT_TRANSFERABLE) {
      if (constraintreport.length < 2 + _num_constraints * CONSTRAINTREPORT_ITEMSIZE) {
        constraintreport = new Float32Array(
          2 + // message id & # objects in report
          (Math.ceil(_num_constraints / REPORT_CHUNKSIZE) * REPORT_CHUNKSIZE) * CONSTRAINTREPORT_ITEMSIZE // # of values needed * item size
        );
        constraintreport[0] = MESSAGE_TYPES.CONSTRAINTREPORT;
      }
    }

    for (index in _constraints) {
      if (_constraints.hasOwnProperty(index)) {
        constraint = _constraints[index];
        offset_body = constraint.a;
        transform = constraint.ta;
        origin = transform.getOrigin();

        // add values to report
        offset = 1 + (i++) * CONSTRAINTREPORT_ITEMSIZE;

        constraintreport[offset] = index;
        constraintreport[offset + 1] = offset_body.id;
        constraintreport[offset + 2] = origin.x;
        constraintreport[offset + 3] = origin.y;
        constraintreport[offset + 4] = origin.z;
        constraintreport[offset + 5] = constraint.getBreakingImpulseThreshold();
      }
    }


    if (i !== 0) {
      if (SUPPORT_TRANSFERABLE) {
        transferableMessage(constraintreport.buffer, [constraintreport.buffer]);
      } else {
        transferableMessage(constraintreport);
      }
    }

  };

  self.onmessage = function (event) {

    if (event.data instanceof Float32Array) {
      // transferable object

      switch (event.data[0]) {
        case MESSAGE_TYPES.WORLDREPORT:
          worldreport = new Float32Array(event.data);
          break;

        case MESSAGE_TYPES.COLLISIONREPORT:
          collisionreport = new Float32Array(event.data);
          break;

        case MESSAGE_TYPES.VEHICLEREPORT:
          vehiclereport = new Float32Array(event.data);
          break;

        case MESSAGE_TYPES.CONSTRAINTREPORT:
          constraintreport = new Float32Array(event.data);
          break;
      }

      return;
    }

    if (event.data.cmd && public_functions[event.data.cmd]) {
      // if ( event.data.params.id !== undefined && _objects[event.data.params.id] === undefined && event.data.cmd !== 'addObject' && event.data.cmd !== 'registerMaterial' ) return;
      public_functions[event.data.cmd](event.data.params);
    }

  };
};
