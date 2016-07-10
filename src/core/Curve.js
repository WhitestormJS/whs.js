import * as THREE from 'three';

import {loadMaterial} from '../extras/api';
import {defaults} from '../utils/defaults';
import {WHSObject} from './Object';

class Curve extends WHSObject {
  /**
   * Create curve.
   *
   * Todo
   */
  constructor(params) {
    super({
      curve: false,
      points: 50
    });

    super.setParams(params);

    const geometry = new THREE.Geometry();
    geometry.vertices = params.curve.getPoints(params.points);

    const curve = new THREE.Line(
      geometry,
      loadMaterial(params.material, false)._material
    );

    this.setNative(curve);

    const scope = Object.assign(this, {
      type: 'curve'
    });

    scope.setNative(param.curve);

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
        if (defaults.debug) {
          console.debug(
            `@WHS.Curve: Curve ${_scope._type} was added to world.`,
            [_scope, _scope.parent]
          );
        }

        resolve(_scope);
      }
    });
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

    if (defaults.debug) {
      console.debug(
        `@WHS.Curve: Curve ${this._type} was removed from world`,
        [_scope]
      );
    }

    return this;
  }
}

export {
  Curve
};
