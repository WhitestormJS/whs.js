export class ElementModule {
  integrate() {
    this.$element = window.document.createElement('div');
    this.$element.className = 'whs';
    this.$element.style.width = 'inherit';
    this.$element.style.height = 'inherit';
    this.params.container.appendChild(this.$element);

    return this.$element;
  }
}
