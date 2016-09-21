import * as THREE from 'three';

import {extend} from '../utils/index';
import {Loop} from '../extras/Loop';
import {deprecate} from '../utils/decorators';
import {World} from './World';
import {CoreObject} from './CoreObject';

const _set = (x, y, z) => {
  this.x = x;
  this.y = y;
  this.z = z;
};

class Light extends CoreObject {
  static defaults = {
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
  };

  helper = null;

  constructor(params = {}, type = 'light') {
    super();

    if (params instanceof THREE.Light) {
      this.params = extend({
        pos: {x: params.position.x, y: params.position.y, z: params.position.z},
        rot: {x: params.rotation.x, y: params.rotation.y, z: params.rotation.z}
      }, Light.defaults);
    } else this.params = extend(params, Light.defaults);

    if (params instanceof THREE.Light) this.native = params;
    this.type = type;
  }

  wrap(...tags) {
    return new Promise(resolve => {
      const _params = this.params;

      if (tags.indexOf('no-shadows') < 0) this.wrapShadow();

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

      resolve(this);
    });
  }

  addTo(parent) {
    this.parent = parent;

    return new Promise(resolve => {
      const _native = this.native,
        _parent = this.parent;

      const parentNative = _parent instanceof World ? _parent.scene
        : _parent.native;

      parentNative.add(_native);
      parent.children.push(this);

      if (this.helper) parentNative.add(this.helper);
      if (_native.target) parentNative.add(_native.target);

      resolve(this);
    });
  }

  /**
   * Set shadow properties for light.
   */
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

  clone() {
    return new Light(this.params, this.type).copy(this);
  }

  copy(source) {
    if (source.native) {
      this.native = source.native.clone();
      if (source.helper) this.helper = source.helper.clone();
      this.params = source.params;

      this.wrap();

      this.position = source.position.clone();
      this.rotation = source.rotation.clone();
      if (source.target) this.target = source.target.clone();
    } else this.params = source.params;

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

  get target() {
    return this.native.target;
  }

  set target(vector3) {
    if (vector3 instanceof THREE.Object3D)
      this.native.target.copy(vector3); // THREE.Object3D in this case.
    else this.native.target.position.copy(vector3);
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
    this.native.visible = true;
  }

  hide() {
    this.native.visible = false;
  }
}

export {
  Light
};
