/**
 * @class DefineModule
 * @category modules
 * @param {String} name
 * @param {Object} data
 * @memberof module:modules
 * @example <caption> Creating a DefineModule with PerspectiveCamera as camera module and passing it to App's modules</caption>
 * new App([
 *   // ...
 *   new DefineModule('camera', new PerspectiveCamera())
 * ]);
 */
export class DefineModule {
  constructor(name, data) {
    this.name = name;
    this.data = data;
  }

  manager(manager) {
    manager.set(this.name, this.data);
  }
}
