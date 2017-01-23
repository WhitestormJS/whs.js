import {Component} from './Component';

import {NativeArguments} from './prototype/NativeArguments';
import {CompositionError} from './errors';

@NativeArguments(
  // Three.js Instances.
  ['position', {copy: true}],
  ['rotation', {copy: true}],
  ['quaternion', {copy: true}],
  ['scale', {copy: true}],

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
    scale: {x: 1, y: 1, z: 1}
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

      if (!build) {
        throw new CompositionError(
          'MeshComponent',
          '.build() method should return a THREE.Object3D or a Promise resolved with THREE.Object3D.',
          this
        );
      }

      if (build instanceof Promise) {
        build.then(native => {
          this.native = native;
        });
      } else this.native = build;

      this.wrap();
    }
  }

  build() {
    throw new CompositionError(
      'MeshComponent',
      'Instance should have it\'s own .build().',
      this
    );
  }

  wrap() {
    return new Promise(resolve => {
      this.defer(() => {
        const {position, rotation, scale, shadow} = this.params;

        this.position.set(position.x, position.y, position.z);
        this.rotation.set(rotation.x, rotation.y, rotation.z);
        this.scale.set(scale.x, scale.y, scale.z);

        this.native.castShadow = shadow.cast;
        this.native.receiveShadow = shadow.receive;

        this.applyBridge({onWrap: null});

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
        const {native} = object;
        if (!native) reject();

        const addPromise = this.applyBridge({onAdd: object}).onAdd;

        const resolver = () => {
          this.native.add(native);
          this.children.push(object);

          resolve(object);
        };

        if (addPromise instanceof Promise) addPromise.then(resolver);
        else resolver();
      });
    });
  }

  copy(source) {
    if (source.native) {
      this.native = source.native.clone();
      this.params = {...source.params};
      this.modules = source.modules.slice(0);

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
