import * as THREE from 'three';
import Events from 'minivents';

import {extend, transformData, toArray} from '../utils/index';

const getWorld = (parent) => {
  let world = parent;
  while (!world.scene) world = world.parent;
  return world;
}

class Component extends Events {
  static defaults = {};
  static instructions = {};
  static helpers = {};
  _wait = [];
  _helpers = [];
  children = [];
  params = {};

  constructor(obj = {}, defaults = {}, instructions = {}) {
    super();

    if (obj instanceof THREE.Object3D) this.native = obj;
    else this.params = transformData(extend(obj, defaults), instructions);

    this.callConstructor(this);
  }

  wait(promise) {
    if (promise) this._wait.push(promise);
    return Promise.all(this._wait);
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
    this.parent = parent;

    return new Promise((resolve, reject) => {
      const _add = () => {
        const _native = this.native;
        const _params = this.params;
        const _parent = this.parent;

        if (!_native) reject();

        const parentNative = _parent.scene ? _parent.scene : _parent.native;

        parentNative.add(_native);
        _parent.children.push(this);

        if (typeof _params.helpers === 'undefined')
          _params.helpers = {};

        for (let key in this._helpers) {
          if (this._helpers) parentNative.add(this._helpers[key]);
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

  addHelper(name, params = {}, helpers = Component.helpers) {
    const helper = helpers[name];
    const data = helper[1] ? toArray(
      extend(params, helper[1]),
      helper[2]
    ) : [];

    this._helpers[name] = new helper[0](this.native, ...data);
    if (this.parent) getWorld(this.parent).scene.add(this._helpers[name]);
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
      this.params = {...source.params};
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
