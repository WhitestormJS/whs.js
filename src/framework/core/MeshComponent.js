import {
  BoxHelper,
  BoundingBoxHelper,
  MeshBasicMaterial,
  EdgesHelper,
  FaceNormalsHelper,
  VertexNormalsHelper
} from 'three';

import {$wrap} from '../utils/ComponentUtils';

import {loadMaterial, extend} from '../utils/index';

function MeshComponent(targetComponent) {
  const resultComponent = class MeshComponentEnhance extends targetComponent {
    static defaults = extend(targetComponent.defaults, {
      build: true,
      geometry: {},

      shadow: {
        cast: true,
        receive: true
      },

      material: false,

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
    });

    static instructions = (() => targetComponent.instructions = {
      ...targetComponent.instructions,
      position: ['x', 'y', 'z'],
      rotation: ['x', 'y', 'z'],
      scale: ['x', 'y', 'z'],
      target: ['x', 'y', 'z']
    })();

    static helpers = {
      box: [BoxHelper],

      boundingBox: [BoundingBoxHelper, {
        color: 0xffffff
      }, ['color']],

      edges: [EdgesHelper, {
        color: 0xffffff
      }, ['color']],

      faceNormals: [FaceNormalsHelper, {
        size: 2,
        color: 0xffffff,
        linewidth: 1
      }, ['size', 'color', 'linewidth']],

      vertexNormals: [VertexNormalsHelper, {
        size: 2,
        color: 0xffffff,
        linewidth: 1
      }, ['size', 'color', 'linewidth']]
    };

    constructor(params = {}, defaults = {}, instructions = {}) {
      super(params, defaults, instructions);
    }

    g_(params = {}) {
      if (this.buildGeometry) {
        this.native.geometry = this.buildGeometry(
          this.updateParams({geometry: params})
        );
      }
    }

    m_(params = {}) {
      if (this.params.material && this.params.material.kind !== params.kind) {
        this.native.material = loadMaterial(
          this.updateParams({material: params}).material
        );
      } else {
        this.updateParams({material: params});

        for (const key in params)
          this.native.material[key] = params[key];
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
      this._native.rotation.copy(euler);
      return this._native.rotation;
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

    addHelper(name, params = {}, helpers = resultComponent.helpers) {
      super.addHelper(name, params, helpers);
    }

    updateHelper(name) {
      this._helpers[name].update();
    }

    addTo(world) {
      return world.add(this);
    }
  };

  $wrap(resultComponent).onCallWrap((scope, ...tags) => {
    const _native = scope.native,
      _params = scope.params,
      _helpers = _params.helpers;

    scope._helpers = {
      box: null,
      boundingBox: null,
      edges: null,
      faceNormals: null
    };

    if (tags.indexOf('no-shadows') < 0) {
      _native.castShadow = _params.shadow.cast;
      _native.receiveShadow = _params.shadow.receive;
    }

    if (_helpers.box) scope.addHelper('box');
    if (_helpers.boundingBox) scope.addHelper('boundingBox', _helpers.boundingBox);
    if (_helpers.edges) scope.addHelper('edges', _helpers.edges);
    if (_helpers.faceNormals) scope.addHelper('faceNormals', _helpers.faceNormals);
    if (_helpers.vertexNormals) scope.addHelper('vertexNormals', _helpers.vertexNormals);
  });

  return resultComponent;
}

export {
  MeshComponent
};
