import {Component} from './Component';

import {attributes, copy} from './prototype/attributes';
import {CompositionError} from './errors';

@attributes(
  copy('position', 'rotation', 'quaternion', 'target')
)
class CameraComponent extends Component {
  static defaults = {
    ...Component.defaults,

    build: true,

    position: {x: 0, y: 0, z: 0},
    rotation: {x: 0, y: 0, z: 0}
  };

  static instructions = {
    position: ['x', 'y', 'z'],
    rotation: ['x', 'y', 'z'],
    scale: ['x', 'y', 'z']
  };

  constructor(params, defaults = CameraComponent.defaults, instructions = CameraComponent.instructions) {
    super(params, defaults, instructions);

    if (this.params.build) {
      const build = this.build(this.params);

      if (!build) {
        throw new CompositionError(
          'CameraComponent',
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

  build() {
    throw new CompositionError(
      'CameraComponent',
      'Instance should have it\'s own .build().',
      this
    );
  }

  wrap() {
    return new Promise(resolve => {
      this.defer(() => {
        this.position.set(this.params.position.x, this.params.position.y, this.params.position.z);
        this.rotation.set(this.params.rotation.x, this.params.rotation.y, this.params.rotation.z);

        resolve(this);
      });
    });
  }


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

  addTo(object) {
    return object.add(this);
  }
}

export {
  CameraComponent
};
