import * as THREE from 'three';

import {Loop} from '../extensions/Loop';
import {defaults} from '../utils/defaults';
import {WHSObject} from './Object';

class Light extends WHSObject {
  /**
   * Constructing WHS.Light object.
   *
   * @param {Object} params - Inputed parameters.
   * @param {String} type - Light type.
   * @return {WHS.Light}
   */
  constructor(params, type) {
    if (!type)
      console.error('@constructor: Please specify " type ".');

    const _set = (x, y, z) => {
      this.x = x;
      this.y = y;
      this.z = z;
    };

    // Polyfill for 3D.
    super({

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

        width: 1024,
        height: 1024,

        near: true,
        far: 400,
        fov: 60,
        darkness: 0.3,

        top: 200,
        bottom: -200,
        left: -200,
        right: 200
      },

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

    const scope = Object.assign(this,
      {
        _type: type,

        _light: this.__params.light,
        _shadowmap: this.__params.shadowmap
      });

    if (defaults.debug)
      console.debug(`@WHS.Light: Light ${scope._type} found.`, scope);

    return scope;
  }

  /**
   * Applying shadow & position & rotation.
   *
   * @param {...String} tags - Tags that defines what to do with light
   * additionally.
   */
  wrap(...tags) {
    const _scope = this;

    return new Promise((resolve, reject) => {
      try {
        if (tags.indexOf('no-shadows') < 0) {
          _scope.getNative().castShadow = true;
          _scope.getNative().receiveShadow = true;
        }

        if (tags.indexOf('no-transforms') < 0) {
          _scope.position.set(
            _scope.__params.pos.x,
            _scope.__params.pos.y,
            _scope.__params.pos.z
          );

          _scope.rotation.set(
            _scope.__params.rot.x,
            _scope.__params.rot.y,
            _scope.__params.rot.z
          );
        }

        tags.forEach(tag => {
          _scope[tag] = true;
        });

        if (defaults.debug)
          console.debug(`@WHS.Light: Light ${_scope._type} + ' is ready.`, _scope);

        _scope.emit('ready');

        resolve(_scope);
      } catch (err) {
        console.error(err.message);
        reject();
      }
    });
  }

  /**
   * Add light to WHS.World object.
   *
   * @param {WHS.World} root - World, were this light will be.
   * @param {...String} tags - Tags for compiling.
   */
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
        if (defaults.debug) {
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
   * Set shadow properties for light.
   */
  wrapShadow() {
    const _scope = this;

    return new Promise((resolve, reject) => {
      try {
        _scope.getNative().shadow.mapSize.width = this._shadowmap.width;
        _scope.getNative().shadow.mapSize.height = this._shadowmap.height;
        _scope.getNative().shadow.bias = this._shadowmap.bias;

        _scope.getNative().shadow.camera.near = this._shadowmap.near;
        _scope.getNative().shadow.camera.far = this._shadowmap.far;
        _scope.getNative().shadow.camera.fov = this._shadowmap.fov;

        _scope.getNative().shadow.camera.left = this._shadowmap.left;
        _scope.getNative().shadow.camera.right = this._shadowmap.right;
        _scope.getNative().shadow.camera.top = this._shadowmap.top;
        _scope.getNative().shadow.camera.bottom = this._shadowmap.bottom;
      } catch (err) {
        console.error(err.message);
        reject();
      } finally {
        resolve(_scope);
      }
    });
  }

  /**
   * Clone light.
   */
  clone() {
    return new Light(this.__params, this._type).copy(this);
  }

  /**
   * Copy light.
   *
   * @param {WHS.Light} source - Source object, that will be applied to this.
   */
  copy(source) {
    this.light = source.getNative().clone();
    if (source.helper) this.helper = source.helper.clone();

    this.wrap();

    this.position = source.position.clone();
    this.rotation = source.rotation.clone();

    this._type = source._type;

    return this;
  }

  /**
   * Remove this light from world.
   */
  remove() {
    this.parent.getScene().remove(this.getNative());
    if (source.helper) this.parent.getScene().remove(this.helper);

    this.parent.children.splice(this.parent.children.indexOf(this), 1);
    this.parent = null;

    this.emit('remove');

    return this;
  }

  /* Access private data */

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

  get target() {
    return this.getNative().target.position;
  }

  set target(vector3) {
    return this.getNative().target.position.copy(vector3);
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
      else if (lookAt instanceof THREE.Vector3) _scope.lookAt(lookAt);
      else if (
          lookAt instanceof THREE.Curve
          || lookAt instanceof THREE.CurvePath
        ) _scope.lookAt(lookAt.getPoint(u));
    });

    animation.start();

    if (loop) {
      setInterval(() => {
        animation.stop();

        animation = new Loop(clock => {
          const u = clock.getElapsedtime() * 1000 / gEnd,
            vec1 = curve.getPoint(u),
            vec2 = curve.getPoint((u + 0.01) % 1);

          _scope.position.set(vec1.x, vec1.y, vec1.z);

          if (!lookAt) _scope.lookAt(vec2);
          else if (lookAt instanceof THREE.Vector3) _scope.lookAt(lookAt);
          else if (
              lookAt instanceof THREE.Curve
              || lookAt instanceof THREE.CurvePath
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
}

export {
  Light
};
