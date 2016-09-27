import * as THREE from 'three';
import Events from 'minivents';

import {extend} from '../utils/index';

class Component extends Events {
  static defaults = {};
  _wait = [];
  children = [];

  constructor(obj = {}, defaults) {
    super();

    if (obj instanceof THREE.Object3D) this.native = obj;
    else this.params = extend(obj, defaults);

    this.callConstructor(this);
  }

  wait(promise) {
    this._wait.push(promise);
  }

  callConstructor() {}
  callWrap() {}
  callAddTo() {}
  callCopy() {}

  wrap(...tags) {
    return new Promise((resolve, reject) => {
      const _wrap = () => {
        if (tags.indexOf('no-transforms') < 0) this.wrapTransforms();

        this.callWrap(this, ...tags);
        resolve(this);
      };
      if (this._wait.length > 0) Promise.all(this._wait).then(_wrap);
      else _wrap();
    });
  }

  wrapTransforms() {}

  addTo(parent) {
    const _helpers = this.helpers;
    this.parent = parent;

    return new Promise((resolve, reject) => {
      const _add = () => {
        const _native = this.native,
          _params = this.params,
          _parent = this.parent;

        if (!_native) reject();

        const parentNative = _parent.scene ? _parent.scene : _parent.native;

        parentNative.add(_native);
        _parent.children.push(this);

        for (let key in _params.helpers) {
          if (_params.helpers[key]) parentNative.add(_helpers[key]);
        }

        this.callAddTo(this);
        resolve(this);
      };

      if (this._wait.length > 0) Promise.all(this._wait).then(_add);
      else _add();
    });
  }

  updateParams(params = {}) {
    this.params = extend(params, this.params);
    return this.params;
  }

  add(children) {
    if (children.addTo)
      return children.addTo(this);
    else if (children instanceof Component) {
      return new Promise((resolve) => {
        children.parent = this;

        this.native.add(children.native);
        this.children.push(this);

        resolve();
      });
    }
  }

  remove(source) {
    this.native.remove(source.native);

    this.children.splice(this.children.indexOf(source), 1);
    source.parent = null;
    source.emit('remove');

    return this;
  }

  clone() {
    return new Component(this.params).copy(this);
  }

  copy(source) {
    const sourceNative = source.native;

    if (sourceNative) {
      this.native = sourceNative.clone(source.params);
      this.params = Object.create(source.params);
      this.wrap();
    } else this.params = source.params;

    this.callCopy(this);

    return this;
  }

  get native() {
    return this._native;
  }

  set native(mesh) {
    this._native = mesh;
    return this._native;
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
  Component
};
