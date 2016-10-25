import * as THREE from 'three';
import {$wrap, $define, $extend, $defaults} from '../utils/ComponentUtils';

import {loadMaterial, extend} from '../utils/index';

function LightComponent(targetComponent) {
  const resultComponent = class LightComponentEnhance extends targetComponent {
    static defaults = (() => targetComponent.defaults = {
      ...targetComponent.defaults,

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
    })();

    static instructions = (() => targetComponent.instructions = {
      ...targetComponent.instructions,
      position: ['x', 'y', 'z'],
      rotation: ['x', 'y', 'z'],
      target: ['x', 'y', 'z']
    })();

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
    }

    wrapTransforms() {
      const _params = this.params;

      this.position.set(
        _params.position.x,
        _params.position.y,
        _params.position.z
      );

      this.rotation.set(
        _params.rotation.x,
        _params.rotation.y,
        _params.rotation.z
      );

      if (this.target) this.target = _params.target;
    }

    copy(source) {
      if (source.native) {
        this.native = source.native.clone();
        this.params = {...source.params};

        if (source.helper) this.helper = source.helper.clone();
        if (source.target) this.target = source.target.clone();
        this.wrap();

        this.position = source.position.clone();
        this.rotation = source.rotation.clone();
      } else this.params = source.params;

      this.callCopy(this);

      return this;
    }

    get position() {
      return this.native.position;
    }

    set position(vector3) {
      this.native.position.copy(vector3);
      return this.native.position;
    }

    get quaternion() {
      return this.native.quaternion;
    }

    set quaternion(quaternion) {
      this.native.quaternion.copy(quaternion);
      return this.native.quaternion;
    }

    get rotation() {
      return this._native.rotation;
    }

    set rotation(euler) {
      this.native.rotation.copy(euler);
      return this.native.rotation;
    }

    get target() {
      return this.native.target;
    }

    set target(vector3) {
      if (vector3 instanceof THREE.Object3D)
        this.native.target.copy(vector3); // THREE.Object3D in this case.
      else this.native.target.position.copy(vector3);
    }

    clone() {
      return new resultComponent({build: false}).copy(this);
    }
  };

  $wrap(targetComponent).onCallConstructor(scope => {
    scope.helper = null;
  });

  $wrap(targetComponent).onCallWrap((scope, ...tags) => {
    if (tags.indexOf('no-shadows') < 0) scope.wrapShadow();
  });

  return resultComponent;
}

export {
  LightComponent
};
