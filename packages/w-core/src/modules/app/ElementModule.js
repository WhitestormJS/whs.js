/**
 * @class ElementModule
 * @category modules/app
 * @param {Object} [container=document.body] container is the DOM object to which application's canvas will be added to.
 * @memberof module:modules/app
 * @example <caption>Creating an element module, passing it to the App</caption>
 * new App([
 *   new ElementModule(document.getElementById('app'))
 * ]);
 */
export class ElementModule {
  constructor(container = document.body) {
    if (container.container) {
      console.warn('ElementModule now accepts only argument which is a DOM object, not a params object.');
      this.container = container.container;
    } else this.container = container;

    this.createElement();
  }

  /**
   * @method createElement
   * @instance
   * @description Creates a canvas element.
   * @memberof module:modules/app.ElementModule
   */
  createElement() {
    this.element = window.document.createElement('div');

    this.element.className = 'whs-app';
    this.element.style.width = 'inherit';
    this.element.style.height = 'inherit';
    this.element.style.position = 'relative';
  }

  manager(manager) {
    manager.set('element', this.element);
    manager.set('container', this.container);
  }

  integrate(self) {
    self.container.appendChild(self.element);
  }
}
