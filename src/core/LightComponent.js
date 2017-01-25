import {Component} from './Component';

import {attributes, copy} from './prototype/attributes';
import {CompositionError} from './errors';

@attributes(
  copy('position', 'rotation', 'quaternion', 'target')
)
class LightComponent extends Component {
  static defaults = {
    ...Component.defaults,

    build: true,

    light: {
      color: 0xffffff,
      skyColor: 0xffffff,
      groundColor: 0xffffff,

      intensity: 1,
      distance: 100,
      angle: Math.PI / 3,
      exponent: 0,
      decay: 1
    },

    shadow: {
      cast: true,

      bias: 0,
      radius: 1,

      mapSize: {
        width: 1024,
        height: 1024
      },

      camera: {
        near: true,
        far: 400,
        fov: 90,

        top: 200,
        bottom: -200,
        left: -200,
        right: 200
      }
    },

    position: {x: 0, y: 0, z: 0},
    rotation: {x: 0, y: 0, z: 0}
  };

  static instructions = {
    position: ['x', 'y', 'z'],
    rotation: ['x', 'y', 'z'],
    scale: ['x', 'y', 'z']
  };

  constructor(params, defaults = LightComponent.defaults, instructions = LightComponent.instructions) {
    super(params, defaults, instructions);

    if (this.params.build) {
      const build = this.build(this.params);

      if (!build) {
        throw new CompositionError(
          'LightComponent',
          '.build() method should return a THREE.Object3D or a Promise resolved with THREE.Object3D.',
          this
        );
      }

      if (build instanceof Promise) {
        build.then((native) => {
          this.native = native;
        });
      } else this.native = build;

      this.wrap();
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
        const {position, rotation} = this.params;

        this.position.set(position.x, position.y, position.z);
        this.rotation.set(rotation.x, rotation.y, rotation.z);

        resolve(this);
      });
    });
  }

  wrapShadow() {
    const {native, params: {shadow}} = this;

    native.castShadow = shadow.cast;
    native.shadow.mapSize.width = shadow.mapSize.width;
    native.shadow.mapSize.height = shadow.mapSize.height;
    native.shadow.bias = shadow.bias;
    native.shadow.radius = shadow.radius;

    const shadowCamera = native.shadow.camera;
    const camera = shadow.camera;

    shadowCamera.near = camera.near;
    shadowCamera.far = camera.far;
    shadowCamera.fov = camera.fov;

    shadowCamera.left = camera.left;
    shadowCamera.right = camera.right;
    shadowCamera.top = camera.top;
    shadowCamera.bottom = camera.bottom;
  }

  // COPYING & CLONING

  copy(source) {
    return super.copy(source, () => {
      if (this.target) this.target.copy(source.target());

      this.position.copy(source.position);
      this.rotation.copy(source.rotation);
      this.quaternion.copy(source.quaternion);
    });
  }

  clone() {
    return new this.constructor({build: false}).copy(this);
  }
}

export {
  LightComponent
};
