function computeSphereOptions(geometry, options) {
  geometry.computeBoundingSphere();

  return {
    radius: options.radius || geometry.boundingSphere.radius
  };
};

function computeBoxOptions(geometry, options) {
  geometry.computeBoundingBox();

  return {
    size: options.size || geometry.boundingBox.getSize().toArray()
  };
};

export class RigidbodyModule {
  constructor({type = 'sphere', compute, ...options} = {type: 'sphere', compute: true}) {
    this.data = {};
    this.type = type;
    this.compute = Boolean(compute);
    this.options = options;
  }

  setup(component, {manager}) {
    manager.createPhysics = (worldModule, index) => {
      const {position, quaternion} = component.native;

      manager.physics = {
        engine: worldModule.engine,
        data: {
          type: this.type,
          position: position.toArray(),
          quaternion: quaternion.toArray(),
          index,
          mass: this.options.mass,
          restitution: this.options.restitution,
          friction: this.options.friction,
          linearDamping: this.options.linearDamping,
          angularDamping: this.options.angularDamping,
          ...this.computeData(this.type, component.native.geometry)
        },
        component,
        active: false
      };

      return manager.physics;
    }
  }

  computeData(type, geometry) {
    switch (type) {
      case 'sphere':
        return computeSphereOptions(geometry, this.options);
      case 'box':
        return computeBoxOptions(geometry, this.options);
      default:

    }
  }
}
