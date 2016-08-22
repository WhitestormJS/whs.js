import * as THREE from 'three';

import {Loop} from '../extensions/Loop';
import {World} from './World';
import {CoreObject} from './CoreObject';

class Light extends CoreObject {
  constructor(params, type = 'light') {
    const _set = (x, y, z) => {
      this.x = x;
      this.y = y;
      this.z = z;
    };

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

    if (params instanceof THREE.Light) {
      super.setParams({
        pos: {x: params.position.x, y: params.position.y, z: params.position.z},
        rot: {x: params.rotation.x, y: params.rotation.y, z: params.rotation.z}
      });
    } else super.setParams(params);

    this.type = type;

    if (params instanceof THREE.Light) this.setNative(params);
    if (WHS.debug) console.debug(`@WHS.Light: Light ${scope.type} found.`, this);

    return this;
  }

  /**
   * Applying shadow & position & rotation.
   *
   * @param {...String} tags - Tags that defines what to do with light
   * additionally.
   */
  wrap(...tags) {
    return new Promise((resolve, reject) => {
      const _native = this.getNative(),
        _params = this.getParams();

      if (tags.indexOf('no-shadows') < 0) {
        this.wrapShadow();
      }

      if (tags.indexOf('no-transforms') < 0) {
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

        if (this.target) this.target = _params.target;
      }

      tags.forEach(tag => {
        this[tag] = true;
      });

      if (WHS.debug)
        console.debug(`@WHS.Light: Light ${this.type} + ' is ready.`, this);

      this.emit('ready');

      resolve(this);
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

    return new Promise((resolve, reject) => {
      const _native = this.getNative(),
        _parent = this.parent;

      const parentNative = _parent instanceof World ? _parent.getScene()
        : _parent.getNative();

      parentNative.add(_native);
      parent.children.push(this);

      if (this.helper) parentNative.add(this.helper);
      if (_native.target) parentNative.add(_native.target);
      if (WHS.debug) {
        console.debug(
          `@WHS.Camera: Camera ${this.type} was added to world.`,
          [this, this.parent]
        );
      }

      resolve(this);
      this.emit('ready');
    });
  }

  /**
   * Set shadow properties for light.
   */
  wrapShadow() {
    return new Promise((resolve, reject) => {
      const _native = this.getNative(),
        _shadow = this.getParams().shadowmap;

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

  /**
   * Clone light.
   */
  clone() {
    return new Light(this.__params, this.type).copy(this);
  }

  /**
   * Copy light.
   *
   * @param {WHS.Light} source - Source object, that will be applied to this.
   */
  copy(source) {
    if (source.getNative()) {
      this.setNative(source.getNative().clone());
      if (source.helper) this.helper = source.helper.clone();
      this.setParams(source.getParams());

      this.wrap();

      this.position = source.position.clone();
      this.rotation = source.rotation.clone();
      if (source.target) this.target = source.target.clone();
    } else this.setParams(source.getParams());

    this.type = source.type;

    return this;
  }

  getParent() {
    return this.parent;
  }

  getWorld() {
    let p = this.parent;

    while (!(p instanceof World)) {
      if (p) p = p.parent;
      else return false;
    }

    return p;
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

  get target() {
    return this.getNative().target;
  }

  set target(vector3) {
    if (vector3 instanceof THREE.Object3D)
      this.getNative().target.copy(vector3); // THREE.Object3D in this case.
    else this.getNative().target.position.copy(vector3);
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

  /* VISIBILITY */
  show() {
    this.getNative().visible = true;
  }

  hide() {
    this.getNative().visible = false;
  }
}

export {
  Light
};
