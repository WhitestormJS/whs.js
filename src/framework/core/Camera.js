import * as THREE from 'three';

import {extend} from '../utils/index';
import {Loop} from '../extras/Loop';
import {CoreObject} from './CoreObject';
import {deprecate} from '../utils/decorators';

const _set = (x, y, z) => {
  this.x = x;
  this.y = y;
  this.z = z;
};

class Camera extends CoreObject {
  static defaults = {
    helper: false,

    pos: {
      x: 0,
      y: 0,
      z: 0,
      set: _set
    },

    rot: {
      x: 0,
      y: 0,
      z: 0,
      set: _set
    },

    target: {
      x: 0,
      y: 0,
      z: 0,
      set: _set
    }
  };

  helper = null;

  constructor(params, type = 'camera', localWindow = window) {
    super();

    Camera.defaults.camera = {
      fov: 45,
      aspect: localWindow.innerWidth / localWindow.innerHeight,
      near: 1,
      far: 1000,
      left: localWindow.innerWidth / -2,
      right: localWindow.innerWidth / 2,
      top: localWindow.innerHeight / 2,
      bottom: localWindow.innerHeight / -2,
      cubeResolution: 128
    };

    params.useTarget = Boolean(params.target);

    if (params instanceof THREE.Camera) {
      this.params = extend({
        pos: {x: params.position.x, y: params.position.y, z: params.position.z},
        rot: {x: params.rotation.x, y: params.rotation.y, z: params.rotation.z}
      }, Camera.defaults);
    } else this.params = extend(params, Camera.defaults);

    if (params instanceof THREE.Camera) this.native = params;
    this.type = type;
  }

  wrap(...tags) {
    return new Promise((resolve, reject) => {
      const _native = this.native,
        _params = this.params;

      this.position.set(
        _params.pos.x,
        _params.pos.y,
        _params.pos.z
      );

      this.rotation.set(
        _params.rot.x,
        _params.rot.y,
        _params.rot.z
      );

      if (_params.useTarget) this.lookAt(_params.target);
      if (_params.helper) this.helper = new THREE.CameraHelper(_native);

      tags.forEach(tag => {
        this[tag] = true;
      });

      this.emit('ready');

      resolve(this);
    });
  }

  addTo(parent) {
    this.parent = parent;

    const _helper = this.helper,
      _scene = this.parent.scene;

    return new Promise((resolve, reject) => {
      _scene.add(this.native);
      this.parent.children.push(this);

      if (_helper) _scene.add(_helper);

      resolve(this);
    });
  }

  clone() {
    return new Camera(this.params, this.type).copy(this);
  }

  copy(source) {
    if (source.native) {
      this.native = source.native.clone();
      this.params = Object.create(source.params);

      this.wrap();

      this.position = source.position.clone();
      this.rotation = source.rotation.clone();
    } else this.setParams(source.params);

    this.type = source.type;

    return this;
  }

  get position() {
    return this.native.position;
  }

  set position(vector3) {
    return this.native.position.copy(vector3);
  }

  get rotation() {
    return this.native.rotation;
  }

  set rotation(euler) {
    return this.native.rotation.copy(euler);
  }

  get quaternion() {
    return this.native.quaternion;
  }

  set quaternion(euler) {
    return this.native.quaternion.copy(euler);
  }

  @deprecate('0.0.11')
  follow(curve, time = 1000, loop, lookAt) {
    const _scope = this,
      gEnd = time;

    let animation = new Loop(clock => {
      const u = clock.getElapsedTime() * 1000 / gEnd,
        vec1 = curve.getPoint(u),
        vec2 = curve.getPoint((u + 0.01) % 1);

      _scope.position.set(vec1.x, vec1.y, vec1.z);

      if (!lookAt) _scope.lookAt(vec2);
      else if (lookAt instanceof TVector3) _scope.lookAt(lookAt);
      else if (
          lookAt instanceof TCurve
          || lookAt instanceof TCurvePath
        ) _scope.lookAt(lookAt.getPoint(u));
    });

    animation.start();

    if (loop) {
      setInterval(() => {
        animation.stop();

        animation = new Loop(clock => {
          const u = clock.getElapsedTime() * 1000 / gEnd,
            vec1 = curve.getPoint(u),
            vec2 = curve.getPoint((u + 0.01) % 1);

          _scope.position.set(vec1.x, vec1.y, vec1.z);

          if (!lookAt) _scope.lookAt(vec2);
          else if (lookAt instanceof TVector3) _scope.lookAt(lookAt);
          else if (
              lookAt instanceof TCurve
              || lookAt instanceof TCurvePath
            ) _scope.lookAt(lookAt.getPoint(u));
        });

        animation.start();
      }, time);
    } else {
      setTimeout(() => {
        animation.stop();
      }, time);
    }
  }

  lookAt(vector3) {
    return this.native.lookAt(vector3);
  }

  getWorldDirection(vector3) {
    return this.native.getWorldDirection(vector3);
  }
}

export {
  Camera
};
