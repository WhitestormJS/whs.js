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
    manager.add('element', this.element);
    manager.add('container', this.params.container);
  }

  integrate(self) {
    self.params.container.appendChild(self.element);
  }
}
