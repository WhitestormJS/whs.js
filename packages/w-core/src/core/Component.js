import {ModuleSystem} from './ModuleSystem';

export class Component extends ModuleSystem {
  isAsync = false;

  constructor(options = {}) {
    const asyncOptions = typeof options === 'function' && options();

    super(asyncOptions ? {modules: []} : options);

    this.isAsync = asyncOptions instanceof Promise;

    this.native = this.isAsync ? new Promise(resolve => {
      asyncOptions.then(options => {
        this.modules = options.modules || [];
        const native = this.build(options);
        this.setupModules();
        resolve(native);
      });
    }) : this.build(typeof options === 'function' ? options() : options);

    this.setupModules();
  }

  build() {
    console.error('You should use your own .build()');
    return null;
  }

  async add(component) {
    const selfNative = this.isAsync ? await this.native : this.native;
    const childNative = component.isAsync ? await component.native : component.native;

    selfNative.add(childNative);
  }
}
