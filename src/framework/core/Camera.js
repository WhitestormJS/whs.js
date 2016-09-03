import * as THREE from 'three';

import {Loop} from '../extras/Loop';
import {CoreObject} from './CoreObject';

class Camera extends CoreObject {
  constructor(params, type = 'camera', localWindow = window) {
    if (!type) console.error('@constructor: Please specify " type ".');

    const _set = (x, y, z) => {
      this.x = x;
      this.y = y;
      this.z = z;
    };

    params.useTarget = Boolean(params.target);

    super({
      camera: {
        fov: 45,
        aspect: localWindow.innerWidth / localWindow.innerHeight,
        near: 1,
        far: 1000,
        left: localWindow.innerWidth / -2,
        right: localWindow.innerWidth / 2,
        top: localWindow.innerHeight / 2,
        bottom: localWindow.innerHeight / -2,
        cubeResolution: 128
      },

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
    });

    if (params instanceof THREE.Camera) {
      super.setParams({
        pos: {x: params.position.x, y: params.position.y, z: params.position.z},
        rot: {x: params.rotation.x, y: params.rotation.y, z: params.rotation.z}
      });
    } else super.setParams(params);

    const scope = Object.assign(this, {
      type: type,
      helper: false
    });

    if (params instanceof THREE.Camera) this.setNative(params);

    return scope;
  }

  wrap(...tags) {
    return new Promise((resolve, reject) => {
      const _native = this.getNative(),
        _params = this.getParams();

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
      _scope = this;

    return new Promise((resolve, reject) => {
      try {
        _scope.parent.getScene().add(_scope.getNative());
        _scope.parent.children.push(_scope);

        if (_helper) _scope.parent.getScene().add(_helper);
      } catch (err) {
        console.error(err.message);
        reject();
      } finally {
        resolve(_scope);
        _scope.emit('ready');
      }
    });
  }

  clone() {
    return new Camera(this.getParams(), this.type).copy(this);
  }

  copy(source) {
    if (source.getNative()) {
      this.setNative(source.getNative().clone());
      this.setParams(source.getParams());

      this.wrap();

      this.position = source.position.clone();
      this.rotation = source.rotation.clone();
    } else this.setParams(source.getParams());

    this.type = source.type;

    return this;
  }

  getParent() {
    return this.parent;
  }

  get position() {
    return this.getNative().position;
  }

  set position(vector3) {
    return this.getNative().position.copy(vector3);
  }

  get rotation() {
    return this.getNative().rotation;
  }

  set rotation(euler) {
    return this.getNative().rotation.copy(euler);
  }

  get quaternion() {
    return this.getNative().quaternion;
  }

  set quaternion(euler) {
    return this.getNative().quaternion.copy(euler);
  }

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
    return this.getNative().lookAt(vector3);
  }

  getWorldDirection(vector3) {
    return this.getNative().getWorldDirection(vector3);
  }
}

export {
  Camera
};
