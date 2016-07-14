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

    const geometry = params.geometry.buffer ? new THREE.BufferGeometry() : new THREE.Geometry();
    const _verts = params.geometry.points;

    const _geom_dircect = params.geometry instanceof THREE.Geometry 
      || params.geometry instanceof THREE.BufferGeometry;

    if (!_geom_dircect && !params.geometry.buffer) {
      geometry.vertices = _verts;
    } else if (!_geom_dircect && params.geometry.direct) {
      geometry.addAttribute('position', new THREE.BufferAttribute(_verts, 3));
    } else if(!_geom_dircect) {
      const vertices = new Float32Array(_verts.length * 3);

      for (let i = 0, max = _verts.length; i < max; i++) {
        vertices[i * 3] = _verts[0].x;
        vertices[i * 3 + 1] = _verts[0].y;
        vertices[i * 3 + 2] = _verts[0].z;
      }

      geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    }

    const points = new THREE.Points(
      _geom_dircect ? params.geometry : geometry,
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
