export class DynamicGeometryModule {
  integrate() {
    this.g_ = function (params = {}) {
      if (this.buildGeometry) {
        this.native.geometry = this.buildGeometry(
          this.updateParams({geometry: params})
        );
      }
    };
  }
}
