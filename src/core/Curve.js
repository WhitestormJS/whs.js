import THREE from 'three';

import loadMaterial from '../extras/api';
import Object from './Object';

class Curve extends Object {
  /**
   * Create curve.
   *
   * Todo
   */
  constructor(params) {
    super({
      geometry: {
        curve: false,
        points: 50
      }
    });

    super.setParams(params);

    const geometry = new THREE.Geometry();

    geometry.vertices = params.geometry.curve.getPoints(params.geometry.points);

    const curve = new THREE.Line(
        geometry,
        loadMaterial(params.material, false)._material
    );

    this.setNative(curve);

    const scope = Object.assign(this,
      {
        _type: 'curve',
        __path: params.geometry.curve
      }
    );

    return scope;
  }

    /**
     * Add curve to scene.
     */
  addTo(parent) {
    const _scope = this;
    _scope.parent = parent;

    return new Promise((resolve, reject) => {
      try {
        _scope.parent.getScene().add(_scope.getNative());
        _scope.parent.children.push(_scope);
      } catch (err) {
        console.error(err.message);
        reject();
      } finally {
        if (WHS.debug) {
          console.debug(
            `@WHS.Curve: Curve ${_scope._type} was added to world.`,
            [_scope, _scope.parent]
          );
        }

        resolve(_scope);
      }
    });
  }

    /* Access private data */

  setNative(curve) {
    return native.set(this, curve);
  }

  getNative() {
    return native.get(this);
  }

    /**
     * Clone curve.
     */
  clone() {
    return new Curve(this.__params).copy(this);
  }

    /**
     * Copy curve.
     *
     * @param {WHS.Curve} source - Source object, that will be applied to this.
     */
  copy(source) {
    this.setNative(source.getNative().clone());

    this._type = source._type;

    return this;
  }

    /**
     * Remove this curve from world.
     *
     * @return {WHS.Curve} - this.
     */
  remove() {
    this.parent.getScene().remove(this.getNative());

    this.parent.children.splice(this.parent.children.indexOf(this), 1);
    this.parent = null;

    this.emit('remove');

    if (WHS.debug) {
      console.debug(
        `@WHS.Curve: Curve ${this._type} was removed from world`,
        [_scope]
      );
    }

    return this;
  }
}

export {
  Curve as default
};
