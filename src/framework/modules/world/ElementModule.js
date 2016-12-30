export class ElementModule {
  constructor(params) {
    this.params = Object.assign({
      container: document.body
    }, params);
  }

  integrate(params) {
    this.$element = window.document.createElement('div');
    this.$element.className = 'whs';
    this.$element.style.width = 'inherit';
    this.$element.style.height = 'inherit';
    params.container.appendChild(this.$element);

    return this.$element;
  }
}
