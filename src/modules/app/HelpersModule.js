export class HelpersModule {
  integrate() {
    const _helpers = this.params.helpers;

    if (_helpers.axis) this.addHelper('axis', _helpers.axis);
    if (_helpers.grid) this.addHelper('grid', _helpers.grid);
  }
}
