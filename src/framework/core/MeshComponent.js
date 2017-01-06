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

    position: new Vector3(0, 0, 0),
    rotation: new Euler(0, 0, 0),
    scale: new Vector3(1, 1, 1)
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
    throw new Error('@MeshComponent: Instance should have it\'s own .build().');
  }

  wrap() {
    return new Promise(resolve => {
      this.defer(() => {
        this.position.copy(this.params.position);
        this.rotation.copy(this.params.rotation);
        this.scale.copy(this.params.scale);

        resolve(this);
      });
    });
  }

  copy(source) {
    if (source.native) {
      this.native = source.native.clone();
      this.params = {...source.params};

      this.position.copy(source.position);
      this.rotation.copy(source.rotation);
      this.quaternion.copy(source.quaternion);
    } else this.params = source.params;

    return this;
  }

  clone() {
    return new this.constructor({build: false}).copy(this);
  }

  addTo(object) {
    return object.add(this);
  }
}

export {
  MeshComponent
};
