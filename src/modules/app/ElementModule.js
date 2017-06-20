/**
 * @class ElementModule
 * @category Modules/App
 * @param {Object} [params={container: document.body}] container is the DOM object to which application's canvas will be added to.
 * @memberof module:modules/app
 * @example <caption>Creating an element module, passing it to the App</caption>
 * new App([
 *   new ElementModule({
 *     container: document.getElementById('app')
 *   })
 * ]);
 */
export class ElementModule {
  constructor(params = {}) {
    this.params = Object.assign({
      container: document.body
    }, params);

    this.element = window.document.createElement('div');
    this.element.className = 'whs';
    this.element.style.width = 'inherit';
    this.element.style.height = 'inherit';
    this.element.style.position = 'relative';
  }

  manager(manager) {
    manager.add('element', this.element, {alias: '$element'});
    manager.add('container', this.params.container, {alias: '$container'});
  }

  integrate(self) {
    self.params.container.appendChild(self.element);
  }
}
