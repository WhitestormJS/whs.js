export class ElementModule {
  constructor(params = {}) {
    this.params = Object.assign({
      container: document.body
    }, params);

    this.element = window.document.createElement('div');
    this.element.className = 'whs';
    this.element.style.width = 'inherit';
    this.element.style.height = 'inherit';
  }

  manager(manager) {
    manager.addDependency('element', this.element, {alias: '$element'});
    manager.addDependency('container', this.params.container, {alias: '$container'});
  }

  integrate(params, self) {
    params.container.appendChild(self.element);
  }
}
