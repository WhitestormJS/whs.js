import {Component} from './Component';

import {attributes, copy} from './prototype/attributes';
import {CompositionError} from './errors';

@attributes(
  copy('position', 'rotation', 'quaternion', 'target')
)
/**
 * @class LightComponent
 * @category core
 * @param {Object} [params] - The parameters object.
 * @param {Object} [instructions] - The instructions object.
 * @extends module:core.Component
 * @memberof module:core
 */
class LightComponent extends Component {
  /**
   * Default values for parameters
   * @member {Object} module:core.LightComponent#defaults
   * @static
   * @default
   * {
   *   build: true,
   *
   *   shadow: {
   *     cast: true,
   *
   *     bias: 0,
   *     radius: 1,
   *
   *     mapSize: {
   *       width: 1024,
   *       height: 1024
   *     },
   *
   *     camera: {
   *       near: true,
   *       far: 400,
   *       fov: 90,
   *
   *       top: 200,
   *       bottom: -200,
   *       left: -200,
   *       right: 200
   *     }
   *   },
   *
   *   position: {x: 0, y: 0, z: 0},
   *   rotation: {x: 0, y: 0, z: 0}
   * }
   */
  static defaults = {
    ...Component.defaults,

    build: true,

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

  /**
   * Static instructions
   * @member {Object} module:core.LightComponent#instructions
   * @static
   * @default
   * {
   *   position: ['x', 'y', 'z'],
   *   rotation: ['x', 'y', 'z']
   * }
   */
  static instructions = {
    position: ['x', 'y', 'z'],
    rotation: ['x', 'y', 'z']
  };

  static from(light, params = {}, wrapShadow = true) {
    params.build = false;

    const component = new LightComponent(params);

    component.native = light;
    component.wrap();
    if (wrapShadow) component.wrapShadow();

    return component;
  }

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
   * @memberof module:core.LightComponent
   */
  build() {
    throw new CompositionError(
      'MeshComponent',
      'Instance should have it\'s own .build().',
      this
    );
  }

  /**
   * @method wrap
   * @instance
   * @description Wraps transforms (`position` & `rotation`)
   * @return {Promise} Resolved when action is completed
   * @memberof module:core.LightComponent
   */
  wrap() {
    return new Promise(resolve => {
      this.defer(() => {
        const {position, rotation} = this.params;

        this.position.set(position.x, position.y, position.z);
        this.rotation.set(rotation.x, rotation.y, rotation.z);

        this.applyBridge({onWrap: 1});

        resolve(this);
      });
    });
  }

  /**
   * @method wrapShadow
   * @instance
   * @description Wraps shadow properties
   * @memberof module:core.LightComponent
   */
  wrapShadow() {
    const {native, params: {shadow}} = this;

    native.castShadow = shadow.cast;
    native.shadow.mapSize.width = shadow.mapSize.width;
    native.shadow.mapSize.height = shadow.mapSize.height;
    native.shadow.bias = shadow.bias;
    native.shadow.radius = shadow.radius;

    const shadowCamera = native.shadow.camera;
    const {camera} = shadow;

    shadowCamera.near = camera.near;
    shadowCamera.far = camera.far;
    shadowCamera.fov = camera.fov;

    shadowCamera.left = camera.left;
    shadowCamera.right = camera.right;
    shadowCamera.top = camera.top;
    shadowCamera.bottom = camera.bottom;
  }

  // COPYING & CLONING

  /**
   * @method copy
   * @instance
   * @description Copy source transforms & execute `Component.copy()`
   * @param {LightComponent} source - The source component to copy.
   * @return {this} LightComponent
   * @memberof module:core.LightComponent
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
   * @description Make a clone of this LightComponent using `.copy()`
   * @return {LightComponent} clone of this object
   * @memberof module:core.LightComponent
   */
  clone() {
    return new this.constructor({build: false}).copy(this);
  }
}

export {
  LightComponent
};
