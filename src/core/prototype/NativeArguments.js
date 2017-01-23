export function NativeArguments(...properties) {
  return function (target) {
    for (let i = 0; i < properties.length; i++) {
      const isArray = properties[i] instanceof Array;
      const property = isArray ? properties[i][0] : properties[i];
      const config = isArray ? properties[i][1] : {};

      const setter = config.copy ? function (value) {
        this.native[property].copy(value);
      } : function (value) {
        this.native[property] = value;
      };

      Object.defineProperty(target.prototype, property, {
        get() {
          return this.native[property];
        },
        set: setter,
        configurable: true,
        enumerable: true
      });
    }
  };
}
