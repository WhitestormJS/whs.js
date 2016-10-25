import * as THREE from 'three';
import {$wrap, $defaults, $extend, $define} from '../utils/ComponentUtils';

import {loadMaterial, extend} from '../utils/index';

function MeshComponent(targetComponent) {
  const resultComponent = class MeshComponentEnhance extends targetComponent {
    static defaults = (() => targetComponent.defaults = {
      ...targetComponent.defaults,
      build: true,
      geometry: {},

      shadow: {
        cast: true,
        receive: true
      },

      material: {
        kind: 'basic'
      },

      helpers: {
        box: false,
        boundingBox: false,
        edges: false,
        faceNormals: false
      },

      position: {x: 0, y: 0, z: 0},
      rotation: {x: 0, y: 0, z: 0},
      scale: {x: 1, y: 1, z: 1},
      target: {x: 0, y: 0, z: 0}
    })();

    static instructions = (() => targetComponent.instructions = {
      ...targetComponent.instructions,
      position: ['x', 'y', 'z'],
      rotation: ['x', 'y', 'z'],
      scale: ['x', 'y', 'z'],
      target: ['x', 'y', 'z']
    })();

    constructor(...props) {
      super(...props);

      this.helpers = {
        box: null,
        boundingBox: null,
        edges: null,
        faceNormals: null
      };
    }

    G_(params = {}) {
      if (this.buildGeometry) {
        this.native.geometry = this.buildGeometry(
          this.updateParams({geometry: params})
        );
      }
    }

    M_(params = {}) {
      if (this.params.material && this.params.material.kind !== params.kind)
        this.native.material = loadMaterial(
          this.updateParams({material: params}).material
        );
      else {
        this.updateParams({material: params});

        for (let key in params) {
          this.native.material[key] = params[key];
        }
      }
    }

    /* Three.js */

    raycast(...args) {
      return this.native.raycast(...args);
    }

    copy(source) {
      const sourceNative = source.native;

      if (sourceNative) {
        this.native = sourceNative.clone(source.params);
        this.params = {...source.params};

        this.wrap('no-transforms');

        this.position.copy(source.position);
        this.rotation.copy(source.rotation);
        this.quaternion.copy(source.quaternion);
      } else this.params = source.params;

      this.callCopy(this);

      return this;
    }

    wrapTransforms() {
      const _params = this.params;

      const position = _params.position,
        rotation = _params.rotation,
        scale = _params.scale;

      this.position.set(
        position.x,
        position.y,
        position.z
      );

      this.rotation.set(
        rotation.x,
        rotation.y,
        rotation.z
      );

      this.scale.set(
        scale.x,
        scale.y,
        scale.z
      );
    }

    get position() {
      return this.native.position;
    }

    set position(vector3) {
      this.native.position.copy(vector3);
      return this.native.position;
    }

    get quaternion() {
      return this.native.quaternion;
    }

    set quaternion(quaternion) {
      this.native.quaternion.copy(quaternion);
      return this.native.quaternion;
    }

    get rotation() {
      return this._native.rotation;
    }

    set rotation(euler) {
      this.native.rotation.copy(euler);
      return this.native.rotation;
    }

    get scale() {
      return this.native.scale;
    }

    set scale(vector3) {
      this.native.scale.copy(vector3);
      return this.native.scale;
    }

    get material() {
      return this.native.material;
    }

    set material(material) {
      this.native.material = material;
    }

    get geometry() {
      return this.native.geometry;
    }

    set geometry(geometry) {
      this.native.geometry = geometry;
    }

    clone() {
      return new resultComponent({build: false}).copy(this);
    }
  }

  $wrap(resultComponent).onCallWrap((scope, ...tags) => {
    const _native = scope.native,
      _params = scope.params,
      _params_helpers = _params.helpers;

    if (tags.indexOf('no-shadows') < 0) {
      _native.castShadow = _params.shadow.cast;
      _native.receiveShadow = _params.shadow.receive;
    }

    // Box helper.
    if (_params_helpers.box) {
      scope.helpers.box = new THREE.BoxHelper(
        _native
      );
    }

    // Bounding box helper.
    if (_params_helpers.boundingBox) {
      extend(_params_helpers.boundingBox, {
        color: 0xffffff
      });

      scope.helpers.boundingBox = new THREE.BoundingBoxHelper(
        _native,
        _params_helpers.boundingBox.color
        ? _params_helpers.boundingBox.color
        : 0xffffff
      );
    }

    // Edges helper.
    if (_params_helpers.edges) {
      extend(_params_helpers.edges, {
        color: 0xffffff
      });

      scope.helpers.edges = new THREE.EdgesHelper(
        _native,
        _params_helpers.edges.color
      );
    }

    // faceNormals helper.
    if (_params_helpers.faceNormals) {
      const _params_helpers_faceNormals = _params_helpers.faceNormals;

      extend(_params_helpers_faceNormals, {
        size: 2,
        color: 0xffffff,
        linewidth: 1
      });

      scope.helpers.faceNormals = new THREE.FaceNormalsHelper(
        _native,
        _params_helpers_faceNormals.size,
        _params_helpers_faceNormals.color,
        _params_helpers_faceNormals.linewidth
      );
    }

    // vertexNormals helper.
    if (_params_helpers.vertexNormals) {
      const _params_helpers_vertexNormals = _params_helpers.vertexNormals;

      extend(_params_helpers_vertexNormals, {
        size: 2,
        color: 0xffffff,
        linewidth: 1
      });

      scope.helpers.vertexNormals = new THREE.VertexNormalsHelper(
        _native,
        _params_helpers_vertexNormals.size,
        _params_helpers_vertexNormals.color,
        _params_helpers_vertexNormals.linewidth
      );
    }
  });

  return resultComponent;
}

export {
  MeshComponent
};
