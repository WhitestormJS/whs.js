import {Mesh} from 'three';
import {Component} from './Component';

import {attributes, copy, mirror} from './prototype/attributes';
import {CompositionError} from './errors';

@attributes(
  copy('position', 'rotation', 'quaternion', 'scale'),
  mirror('material', 'geometry')
)
/**
 * @class MeshComponent
 * @category core
 * @param {Object} [params] - The parameters object.
 * @param {Object} [instructions] - The instructions object.
 * @extends module:core.Component
 * @memberof module:core
 */
class MeshComponent extends Component {
  /**
   * Default values for parameters
   * @member {Object} module:core.MeshComponent#defaults
   * @static
   * @default
   * {
   *   build: true,
   *   geometry: {},
   *   material: false,
   *
   *   shadow: {
   *     cast: true,
   *     receive: true
   *   },
   *
   *   position: {x: 0, y: 0, z: 0},
   *   rotation: {x: 0, y: 0, z: 0},
   *   scale: {x: 1, y: 1, z: 1}
   * }
   */
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

  /**
   * Static instructions
   * @member {Object} module:core.MeshComponent#instructions
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
    return new (MeshComponent.custom(geom, constructor))(params);
  }

  static from(mesh, params = {}) {
    params.build = false;

    const component = new MeshComponent(params);

    component.native = mesh;
    component.wrap();

    return component;
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
        this.wait(build);

        this.wait(new Promise(resolve => {
          build.then(native => {
            this.native = native;
            this.wrap().then(resolve);
          });
        }));
      } else {
        this.native = build;
        this.wait(this.wrap());
      }
    }

    this.applyCommand('postIntegrate');
  }

  // BUILDING & WRAPPING

  /**
   * @method build
   * @description Build livecycle should return a native object.
   * @throws {CompositionError}
   * @memberof module:core.MeshComponent
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
   * @memberof module:core.MeshComponent
   */
  wrap() {
    return new Promise(resolve => {
      // TODO: Fix defer with physics
      // this.defer(() => {
      const {position, rotation, scale, shadow} = this.params;

      this.position.set(position.x, position.y, position.z);
      this.rotation.set(rotation.x, rotation.y, rotation.z);
      this.scale.set(scale.x, scale.y, scale.z);

      this.native.castShadow = shadow.cast;
      this.native.receiveShadow = shadow.receive;

      this.applyBridge({onWrap: 1});

      resolve(this);
      // });
    });
  }

  // COPYING & CLONING

  /**
   * @method copy
   * @instance
   * @description Copy source transforms & execute `Component.copy()`
   * @param {MeshComponent} source - The source mesh component to copy from.
   * @return {this} MeshComponent
   * @memberof module:core.MeshComponent
   */
  copy(source) {
    return super.copy(source, () => {
      this.position.copy(source.position);
      this.rotation.copy(source.rotation);
      this.quaternion.copy(source.quaternion);
    });
  }

  /**
   * @method clone
   * @instance
   * @description Make a clone of this MeshComponent using `.copy()`
   * @param {THREE.Geometry} geometry - The geometry to clone
   * @param {THREE.Material} material - The material to clone
   * @return {MeshComponent} clone of this object
   * @memberof module:core.MeshComponent
   */
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
