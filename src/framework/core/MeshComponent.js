import {Vector3, Euler} from 'three';
import {Component} from './Component';

import {NativeArguments} from './prototype/NativeArguments';

@NativeArguments(
  // Three.js Instances.
  ['position',   {copy: true}],
  ['rotation',   {copy: true}],
  ['quaternion', {copy: true}],
  ['scale',      {copy: true}],

  // Get properties.
  'material',
  'geometry'
)
class MeshComponent extends Component {
  static defaults = {
    ...Component.defaults,

    build: true,
    geometry: {},
    material: false,

    shadow: {
      cast: true,
      receive: true
    },

    position: {x: 0, y: 0, z: 0},
    rotation: {x: 0, y: 0, z: 0},
    scale: {x: 1, y: 1, z: 1},
  };

  static instructions = {
    position: ['x', 'y', 'z'],
    rotation: ['x', 'y', 'z'],
    scale: ['x', 'y', 'z']
  };

  constructor(params, defaults = MeshComponent.defaults, instructions = MeshComponent.instructions) {
    super(params, defaults, instructions);

    if (this.params.build) {
      const build = this.build(this.params);

      if (!build) throw new Error('@MeshComponent: .build() method should return a THREE.Object3D or a Promise resolved with THREE.Object3D.');

      if (build instanceof Promise) build.then((native) => {this.native = native});
      else this.native = build;

      this.wrap();
    }
  }

  build() {
    console.error(this);
    throw new Error(`@MeshComponent: Instance should have it\'s own .build().`);
  }

  wrap() {
    return new Promise(resolve => {
      this.defer(() => {
        this.position.set(this.params.position.x, this.params.position.y, this.params.position.z);
        this.rotation.set(this.params.rotation.x, this.params.rotation.y, this.params.rotation.z);
        this.scale.set(this.params.scale.x, this.params.scale.y, this.params.scale.z);

        resolve(this);
      });
    });
  }

  g_(params = {}) {
    if (this.buildGeometry) {
      this.native.geometry = this.buildGeometry(
        this.updateParams({geometry: params})
      );
    }
  }

  add(object) {
    object.parent = this;

    return new Promise((resolve, reject) => {
      this.defer(() => {
        const {native, parent} = object;
        if (!native) reject();

        this.applyBridge({onAdd: object});

        this.native.add(native);
        this.children.push(object);

        resolve(object);
      });
    });
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

  copy(source) {
    if (source.native) {
      this.native = source.native.clone();
      this.params = {...source.params};

      this.position.copy(source.position);
      this.rotation.copy(source.rotation);
      this.quaternion.copy(source.quaternion);
    } else this.params = source.params;

    this.applyBridge({onCopy: source});

    return this;
  }

  clone(geometry, material) {
    const dest = new this.constructor({build: false}).copy(this);

    if (geometry) dest.geometry = dest.geometry.clone();
    if (material) dest.material = dest.material.clone();

    return dest;
  }

  addTo(object) {
    return object.add(this);
  }
}

export {
  MeshComponent
};
