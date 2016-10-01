import * as THREE from 'three';
import {$wrap, $define} from '../utils/ComponentUtils';

function CameraComponent(target) {
  Object.assign(target.defaults, {
    camera: {
      fov: 45,
      aspect: window.innerWidth / window.innerHeight,
      near: 1,
      far: 1000,
      left: window.innerWidth / -2,
      right: window.innerWidth / 2,
      top: window.innerHeight / 2,
      bottom: window.innerHeight / -2,
      cubeResolution: 128
    },

    helper: false,

    position: {x: 0, y: 0, z: 0},
    rotation: {x: 0, y: 0, z: 0},
    target: {x: 0, y: 0, z: 0}
  });

  $define(target, {
    position: {
      get: function() {
        return this.native.position;
      },

      set: function(vector3) {
        this.native.position.copy(vector3);
        return this.native.position;
      }
    },

    quaternion: {
      get: function() {
        return this.native.quaternion;
      },

      set: function(quaternion) {
        this.native.quaternion.copy(quaternion);
        return this.native.quaternion;
      }
    },

    rotation: {
      get: function() {
        return this._native.rotation;
      },

      set: function(euler) {
        this.native.rotation.copy(euler);
        return this.native.rotation;
      }
    },

    target: {
      get: function() {
        return this.native.target;
      },

      set: function(vector3) {
        if (vector3 instanceof THREE.Object3D)
          this.native.target.copy(vector3); // THREE.Object3D in this case.
        else this.native.target.position.copy(vector3);
      }
    }
  })


  Object.assign(target.prototype, {
    /* Three.js */

    lookAt(...args) {
      return this.native.lookAt(...args);
    },

    copy(source) {
      if (source.native) {
        this.native = source.native.clone();
        this.params = Object.create(source.params);

        if (source.helper) this.helper = source.helper.clone();
        if (source.target) this.target = source.target.clone();
        this.wrap();

        this.position = source.position.clone();
        this.rotation = source.rotation.clone();
      } else this.params = source.params;

      this.callCopy(this);

      return this;
    }
  });

  $wrap(target).onCallConstructor(scope => {
    scope.helper = null;
  });

  $wrap(target).onCallWrap((scope, ...tags) => {
    const _native = scope.native,
      _params = scope.params;

    scope.position.set(
      _params.position.x,
      _params.position.y,
      _params.position.z
    );

    scope.rotation.set(
      _params.rotation.x,
      _params.rotation.y,
      _params.rotation.z
    );

    if (_params.useTarget) scope.lookAt(_params.target);
    if (_params.helper) scope.helper = new THREE.CameraHelper(_native);
  });
}

export {
  CameraComponent
};
