import {Component} from './Component';

import {attributes, copy} from './prototype/attributes';
import {CompositionError} from './errors';

@attributes(
  copy('position', 'rotation', 'quaternion', 'target')
)
/**
 * @class CameraComponent
 * @category core
 * @param {Object} [params] - The parameters object.
 * @param {Object} [instructions] - The instructions object.
 * @extends module:core.Component
 * @memberof module:core
 */
class CameraComponent extends Component {
  /**
   * Default values for parameters
   * @member {Object} module:core.CameraComponent#defaults
   * @static
   * @default
   * {
   *   build: true,
   *
   *   position: {x: 0, y: 0, z: 0},
   *   rotation: {x: 0, y: 0, z: 0}
   * }
   */
  static defaults = {
    ...Component.defaults,

    build: true,

    position: {x: 0, y: 0, z: 0},
    rotation: {x: 0, y: 0, z: 0}
  };

  /**
   * Static instructions
   * @member {Object} module:core.CameraComponent#instructions
   * @static
   * @default
   * {
   *   position: ['x', 'y', 'z'],
   *   rotation: ['x', 'y', 'z'],
   *   scale: ['x', 'y', 'z']
   * }
   */
  static instructions = {
    position: ['x', 'y', 'z'],
    rotation: ['x', 'y', 'z'],
    scale: ['x', 'y', 'z']
  };

  static from(camera, params = {}) {
    params.build = false;

    const component = new CameraComponent(params);

    component.native = camera;
    component.wrap();

    return component;
  }

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
        build.then(native => {
          this.native = native;
        });
      } else this.native = build;

      this.wait(this.wrap());
    }

    this.applyCommand('postIntegrate');
  }

  // BUILDING & WRAPPING

  /**
   * @method build
   * @instance
   * @description Build livecycle should return a native object.
   * @throws {CompositionError}
   * @memberof module:core.CameraComponent
   */
  build() {
    throw new CompositionError(
      'CameraComponent',
      'Instance should have it\'s own .build().',
      this
    );
  }

  /**
   * @method wrap
   * @instance
   * @description Wraps transforms (`position` & `rotation`)
   * @return {Promise} Resolved when action is completed
   * @memberof module:core.CameraComponent
   */
  wrap() {
    return new Promise(resolve => {
      this.defer(() => {
        this.position.set(this.params.position.x, this.params.position.y, this.params.position.z);
        this.rotation.set(this.params.rotation.x, this.params.rotation.y, this.params.rotation.z);

        this.applyBridge({onWrap: 1});

        resolve(this);
      });
    });
  }

  /**
   * @method copy
   * @instance
   * @description Copy source transforms & execute `Component.copy()`
   * @param {CameraComponent} source - The camera component to copy
   * @return {this} CameraComponent
   * @memberof module:core.CameraComponent
   */
  copy(source) {
    return super.copy(source, () => {
      if (this.target) this.target.copy(source.target());

      this.position.copy(source.position);
      this.rotation.copy(source.rotation);
      this.quaternion.copy(source.quaternion);
    });
  }

  /**
   * @method clone
   * @instance
   * @description Make a clone of this CameraComponent using `.copy()`
   * @return {CameraComponent} clone of this object
   * @memberof module:core.CameraComponent
   */
  clone() {
    return new this.constructor({build: false}).copy(this);
  }
}

export {
  CameraComponent
};
