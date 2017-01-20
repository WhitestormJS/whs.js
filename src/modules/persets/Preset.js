export class Perset {
  static Array(...modules) {
    const array = [];

    modules.forEach(module => {
      if (module[0]) array.push(module[1]());
    });

    return array;
  }

  constructor(modules) {
    this.modules = modules;
  }

  get() {
    return this.modules;
  }

  extend(modules) {
    this.modules = this.modules.concat(modules);
    return this;
  }
}
