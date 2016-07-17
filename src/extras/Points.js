import * as THREE from 'three';

import {loadMaterial} from './api';
import {defaults} from '../utils/defaults';
import {WHSObject} from '../core/Object';

class Points extends WHSObject {
  /**
   * Create points.
   *
   * Todo
   */
  constructor(params) {
    super({
      geometry: false,

      material: {
        kind: 'points'
      }
    });

    super.setParams(params);

    const _verts = params.geometry.points;

    const points = new THREE.Points(
      params.geometry,
      loadMaterial(params.material)._material
    );

    this.setNative(points);

    const scope = Object.assign(this, {
      _type: 'points'
    });

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
    return new Points(this.__params).copy(this);
  }

  /**
   * Copy curve.
   *
   * @param {WHS.Points} source - Source object, that will be applied to this.
   */
  copy(source) {
    this.setNative(source.getNative().clone());

    this._type = source._type;

    return this;
  }

  /**
   * Remove this curve from world.
   *
   * @return {WHS.Points} - this.
   */
  remove() {
    this.parent.getScene().remove(this.getNative());

    this.parent.children.splice(this.parent.children.indexOf(this), 1);
    this.parent = null;

    this.emit('remove');

    if (defaults.debug) {
      console.debug(
        `@WHS.Points: Curve ${this._type} was removed from world`,
        [_scope]
      );
    }

    return this;
  }
}

export {
  Points
};
