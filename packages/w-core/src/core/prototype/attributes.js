export function attributes(...mappers) {
  return function (target) {
    for (let i = 0; i < mappers.length; i++) {
      const mapper = mappers[i];

      for (let k = 0; k < mapper.map.length; k++) {
        const attribute = mapper.map[k];

        Object.defineProperty(target.prototype, attribute, {
          get: mapper.getter(attribute),
          set: mapper.setter(attribute),
          configurable: mapper.configurable,
          enumerable: mapper.enumerable
        });
      }
    }
  };
}

export function copy(...map) {
  return {
    map,
    getter(name) {
      return function () {
        return this.native[name];
      };
    },
    setter(name) {
      return function (value) {
        this.native[name].copy(value);
      };
    },
    configurable: true,
    enumerable: true
  };
}

export function mirror(...map) {
  return {
    map,
    getter(name) {
      return function () {
        return this.native[name];
      };
    },
    setter(name) {
      return function (value) {
        this.native[name] = value;
      };
    },
    configurable: true,
    enumerable: true
  };
}
