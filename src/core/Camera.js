import * as THREE from 'three';

import {Loop} from '../extensions/Loop';
import {WHSObject} from './Object';

class Camera extends WHSObject {
  constructor(params, type) {
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

    super.setParams(params);

    const scope = Object.assign(this, {
      _type: type,
      helper: false
    });

    if (WHS.debug)
      console.debug(`@WHS.Camera: Camera ${scope._type} found.`, scope);

    return scope;
  }

  wrap(...tags) {
    return new Promise((resolve, reject) => {
      try {
        this.position.set(
          this.__params.pos.x,
          this.__params.pos.y,
          this.__params.pos.z
        );

        this.rotation.set(
          this.__params.rot.x,
          this.__params.rot.y,
          this.__params.rot.z
        );

        if (this.__params.useTarget) this.lookAt(this.__params.target);

        if (this.__params.helper) {
          this.helper = new THREE.CameraHelper(
            this.getNative()
          );
        }

        tags.forEach(tag => {
          this[tag] = true;
        });

        if (WHS.debug)
          console.debug(`@WHS.Camera: Camera ${this._type} is ready.`, this);

        this.emit('ready');

        resolve(this);
      } catch (err) {
        console.error(err.message);
        reject();
      }
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
        if (WHS.debug) {
          console.debug(
            `@WHS.Camera: Camera ${_scope._type} was added to world.`,
            [_scope, _scope.parent]
          );
        }

        resolve(_scope);

        _scope.emit('ready');
      }
    });
  }

  /**
   * Clone camera.
   */
  clone() {
    return new Shape(this.__params, this._type).copy(this);
  }

  /**
   * Copy camera.
   *
   * @param {WHS.Camera} source - Source object, that will be applied to this.
   */
  copy(source) {
    this.mesh = source.mesh.clone();

    this.wrap();

    this.position = source.position.clone();
    this.rotation = source.rotation.clone();

    this._type = source._type;

    return this;
  }

  setNative(native) {
    this.native = native;
    return this.native;
  }

  getNative() {
    return this.native;
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
