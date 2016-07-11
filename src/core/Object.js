import Events from 'minivents';
import {extend} from '../extras/api';

class WHSObject {
  /**
   * Constructing WHS.Shape object.
   *
   * @param {Boolean} structurable - true if object has parents and children.
   * @param {String} type - Shape type.
   * @return {WHS.Object}
   */
  constructor(defaults = {}, structurable = true) {
    const scope = structurable
    ? Object.assign(this,
      {
        __whsobject: true,
        __releaseTime: new Date().getTime(),
        __params: {},
        __defaults: defaults,

        parent: null,
        children: []
      },
    new Events())
    : Object.assign(this,
      {
        __whsobject: true,
        __releaseTime: new Date().getTime(),
        __params: {},
        __defaults: defaults
      },
    new Events());

    return scope;
  }

  setParams(params = {}) {
    this.__params = extend(params, this.__defaults);
  }

  updateParams(params = {}) {
    this.__params = extend(params, this.__params);
    return this.__params;
  }

  getParams() {
    return this.__params;
  }

  setNative(native) {
    this._native = native;
    return this.native;
  }

  getNative() {
    return this._native;
  }

  add(children) {
    const _scope = this;

    if (children.addTo)
      return children.addTo(this);
    else if (children instanceof Object) {
      return new Promise((resolve) => {
        children.parent = _scope;

        _scope.getNative().add(children.getNative());
        _scope.children.push(_scope);

        resolve();
      });
    }
  }
}

export {
  WHSObject
};
