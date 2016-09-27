import * as THREE from 'three';
import {$wrap, $define} from '../utils/ComponentUtils';

export default function LightComponent(target) {
  Object.assign(target.defaults, {
    light: {
      color: 0xffffff,
      skyColor: 0xffffff,
      groundColor: 0xffffff,

      intensity: 1,
      distance: 100,
      angle: Math.PI / 3,
      exponent: 0,
      decay: 1
    },

    helper: false,

    shadowmap: {
      cast: true,

      bias: 0,
      radius: 1,

      width: 1024,
      height: 1024,

      near: true,
      far: 400,
      fov: 60,

      top: 200,
      bottom: -200,
      left: -200,
      right: 200
    },

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
    wrapShadow() {
      return new Promise(resolve => {
        const _native = this.native,
          _shadow = this.params.shadowmap;

        _native.castShadow = _shadow.cast;
        _native.shadow.mapSize.width = _shadow.width;
        _native.shadow.mapSize.height = _shadow.height;
        _native.shadow.bias = _shadow.bias;
        _native.shadow.radius = _shadow.radius;

        const _shadowCamera = _native.shadow.camera;

        _shadowCamera.near = _shadow.near;
        _shadowCamera.far = _shadow.far;
        _shadowCamera.fov = _shadow.fov;

        _shadowCamera.left = _shadow.left;
        _shadowCamera.right = _shadow.right;
        _shadowCamera.top = _shadow.top;
        _shadowCamera.bottom = _shadow.bottom;

        resolve(this);
      });
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
    const _params = scope.params;

    if (tags.indexOf('no-shadows') < 0) scope.wrapShadow();

    if (tags.indexOf('no-transforms') < 0) {
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

      if (scope.target) scope.target = _params.target;
    }
  });
}
