import {
  Quaternion,
  Object3D
} from 'three';

import * as Physijs from '../physics/index.js';
import {$wrap} from '../utils/ComponentUtils';

import {extend} from '../utils/index';

const physicsDefaults = Physijs.default === false ? false : {
  restitution: 0.3,
  friction: 0.8,
  damping: 0,
  pressure: 100,
  margin: 0,
  klst: 0.9,
  kvst: 0.9,
  kast: 0.9
};

function PhysicsComponent(targetComponent) {
  const resultComponent = class PhysicsComponentEnhance extends targetComponent {
    static defautls = extend(targetComponent.defaults,
      {
        mass: 10,
        physics: physicsDefaults
      }
    );

    setAngularVelocity(...args) {
      return this.native.setAngularVelocity(...args);
    }

    setLinearVelocity(...args) {
      return this.native.setLinearVelocity(...args);
    }

    applyCentralImpulse(...args) {
      return this.native.applyCentralImpulse(...args);
    }

    applyImpulse(...args) {
      return this.native.applyImpulse(...args);
    }

    applyTorque(...args) {
      return this.native.applyTorque(...args);
    }

    applyCentralForce(...args) {
      return this.native.applyCentralForce(...args);
    }

    applyForce(...args) {
      return this.native.applyForce(...args);
    }

    getAngularVelocity(...args) {
      return this.native.getAngularVelocity(...args);
    }

    getLinearVelocity(...args) {
      return this.native.getLinearVelocity(...args);
    }

    setAngularFactor(...args) {
      return this.native.setAngularFactor(...args);
    }

    setLinearFactor(...args) {
      return this.native.setLinearFactor(...args);
    }

    setDamping(...args) {
      return this.native.setDamping(...args);
    }

    setCcdMotionThreshold(...args) {
      return this.native.setCcdMotionThreshold(...args);
    }

    setCcdSweptSphereRadius(...args) {
      return this.native.setCcdSweptSphereRadius(...args);
    }

    appendAnchor(world, object, node, influence, collisionBetweenLinkedBodies = true) {
      return this.native.appendAnchor(world.scene, object.native, node, influence, collisionBetweenLinkedBodies);
    }

    copy(source) {
      const sourceNative = source.native;

      if (sourceNative) {
        this.native = sourceNative.clone(source.params);
        this.native.mass = sourceNative.mass;
        this.params = {...source.params};

        this.wrap('no-transforms');

        this.position.copy(source.position);
        this.rotation.copy(source.rotation);
      } else this.params = source.params;

      this.callCopy(this);

      return this;
    }

    get position() {
      return this.native.position;
    }

    set position(vector3) {
      const pos = this._native.position,
        native = this._native;

      Object.defineProperties(pos, {
        x: {
          get() {
            return this._x;
          },

          set(x) {
            native.__dirtyPosition = true;
            this._x = x;
          }
        },
        y: {
          get() {
            return this._y;
          },

          set(y) {
            native.__dirtyPosition = true;
            this._y = y;
          }
        },
        z: {
          get() {
            return this._z;
          },

          set(z) {
            native.__dirtyPosition = true;
            this._z = z;
          }
        }
      });

      native.__dirtyPosition = true;

      pos.copy(vector3);
    }

    get quaternion() {
      this.__c_rot = true;
      return this.native.quaternion;
    }

    set quaternion(quaternion) {
      const quat = this._native.quaternion,
        native = this._native;

      quat.copy(quaternion);

      quat.onChange(() => {
        if (this.__c_rot) {
          if (native.__dirtyRotation === true) {
            this.__c_rot = false;
            native.__dirtyRotation = false;
          }
          native.__dirtyRotation = true;
        }
      });
    }

    get rotation() {
      this.__c_rot = true;
      return this._native.rotation;
    }

    set rotation(euler) {
      const rot = this._native.rotation,
        native = this._native;

      rot.copy(euler);

      rot.onChange(() => {
        if (this.__c_rot) {
          this.quaternion.copy(new Quaternion().setFromEuler(rot));
          native.__dirtyRotation = true;
        }
      });
    }

    get native() {
      return this._native;
    }

    set native(mesh) {
      this._native = mesh;

      if (mesh instanceof Object3D) {
        this.position = mesh.position.clone();
        this.quaternion = mesh.quaternion.clone();
        this.rotation = mesh.rotation.clone();
      }
    }
  }

  $wrap(resultComponent).onCallConstructor(scope => {
    scope.physics = scope.params.physics !== undefined ? scope.params.physics : Physijs.default !== false;
    scope.__c_rot = false;
  })

  $wrap(resultComponent).onCallAddTo(scope => {
    scope.native.addEventListener('collision', () => {
      scope.emit('collide');
    });
  });

  return resultComponent;
}

export {
  PhysicsComponent,
  physicsDefaults
};
