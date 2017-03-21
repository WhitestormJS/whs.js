import {Mesh} from 'three';
import {Component} from './Component';

import {attributes, copy, mirror} from './prototype/attributes';
import {CompositionError} from './errors';

@attributes(
  copy('position', 'rotation', 'quaternion', 'scale'),
  mirror('material', 'geometry')
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

  // CUSTOM GEOMETRY HANDLING

  static custom(geom, constructor = Mesh) {
    return class extends MeshComponent {
      build(params = this.params) {
        const {geometry, material} = this.applyBridge({
          geometry: geom,
          material: params.material
        });

        return this.applyBridge({mesh: new constructor(geometry, material)}).mesh;
      }
    };
  }

  static create(geom, params, constructor) {
    return new (WHS.MeshComponent.custom(geom, constructor))(params);
  }

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
          this.wrap();
        });
      } else {
        this.native = build;
        this.wrap();
      }
    }
  }

  // BUILDING & WRAPPING

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

        console.log(this.native.position);

        this.native.castShadow = shadow.cast;
        this.native.receiveShadow = shadow.receive;

        this.applyBridge({onWrap: 1});

        resolve(this);
      });
    });
  }

  // COPYING & CLONING

  copy(source) {
    return super.copy(source, () => {
      this.position.copy(source.position);
      this.rotation.copy(source.rotation);
      this.quaternion.copy(source.quaternion);
    });
  }

  clone(geometry, material) {
    const dest = new this.constructor({build: false}).copy(this);

    if (geometry) dest.geometry = dest.geometry.clone();
    if (material) dest.material = dest.material.clone();

    return dest;
  }
}

export {
  MeshComponent
};
