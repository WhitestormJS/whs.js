import Events from 'minivents';
import {extend} from '../utils/index';

class CoreObject {
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
    return this.__params;
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

  /**
   * Remove this shape from world.
   *
   * @return {WHS.Shape} - this.
   */
  remove(source) {
    this.getNative().remove(source.getNative());

    this.children.splice(this.children.indexOf(source), 1);
    source.parent = null;

    source.emit('remove');

    if (WHS.debug) {
      console.debug(
        `@WHS.Shape: Shape ${source._type} was removed from world`,
        [source]
      );
    }

    return this;
  }
}

export {
  CoreObject
};
