/**
 * @class DynamicGeometryModule
 * @category modules/mesh
 * @param {Object} [params={attributes: false}] - params
 * @param {Boolean} [patchEvents=true]
 * @memberof module:modules/mesh
 */
export class DynamicGeometryModule {
  constructor(params = {}) {
    this.params = Object.assign({
      attributes: false
    }, params);
  }

  integrate(self) {
    const params = self.params;

    this.g_ = function (params = {}) {
      if (this.buildGeometry) {
        this.native.geometry = this.buildGeometry(
          this.updateParams({geometry: params})
        );
      }
    };

    if (params.attributes) {
      for (const key in this.params.geometry) {
        if (key) {
          Object.defineProperty(this, `g_${key}`, {
            get() {
              return this.native.geometry.parameters[key];
            },
            set(value) {
              this.native.geometry = this.buildGeometry(this.updateParams({geometry: {[key]: value}}));
            },
            configurable: true,
            enumerable: true
          });
        }
      }
    }
  }
}
