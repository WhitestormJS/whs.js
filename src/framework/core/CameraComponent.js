import * as THREE from 'three';
import {$wrap, $defaults, $extend, $define} from '../utils/ComponentUtils';

import {extend} from '../utils/index';

function CameraComponent(targetComponent) {
  const resultComponent = class CameraComponentEnhance extends targetComponent {
    static defautls = extend(targetComponent.defaults, {
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

    constructor(...props) {
      super(...props);

      this.helper = null;
      if (this.native instanceof THREE.Object3D) this.params = CameraComponentEnhance.defaults;
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

    lookAt(...args) {
      return this.native.lookAt(...args);
    }

    copy(source) {
      if (source.native) {
        this.native = source.native.clone();
        this.params = Object.assign({}, source.params);

        if (source.helper) this.helper = source.helper.clone();
        if (source.target) this.target = source.target.clone();
        this.wrap();

        this.position = source.position.clone();
        this.rotation = source.rotation.clone();
      } else this.params = source.params;

      this.callCopy(this);

      return this;
    }

    clone() {
      return new resultComponent({build: false}).copy(this);
    }
  }

  $wrap(resultComponent).onCallWrap((scope, ...tags) => {
    const _native = scope.native;
    const _params = scope.params;

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

  return resultComponent;
}

export {
  CameraComponent
};
