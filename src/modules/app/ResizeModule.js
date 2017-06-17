// import {addResizeListener} from 'detect-element-resize';

export class ResizeModule {
  constructor(params = {}) {
    this.params = Object.assign({
      auto: true
    }, params);

    this.callbacks = [this.setSize.bind(this)];
  }

  setSize(width = 1, height = 1) {
    this.camera.native.aspect = width / height;
    this.camera.native.updateProjectionMatrix();

    if (this.rendering) this.rendering.setSize(width, height);
  }

  trigger() {
    const {
      container: {
        offsetWidth,
        offsetHeight
      },
      resolution
    } = this;

    const width = Number(offsetWidth * resolution.x).toFixed();
    const height = Number(offsetHeight * resolution.y).toFixed();

    this.callbacks.forEach(cb => {
      cb(width, height);
    });
  }

  addAutoresize() {
    this.container = this.getContainer();
    this.resolution = this.getResolution();

    if (this.params.auto) window.addEventListener('resize', this.trigger.bind(this));
  }

  addCallback(func) {
    this.callbacks.push(func);
  }

  manager(manager) {
    manager.define('resize');

    this.rendering = manager.get('renderer');
    this.camera = manager.get('camera');

    this.getResolution = () => manager.use('rendering').params.resolution;
    this.getContainer = () => manager.get('container');

    this.addAutoresize();
  }
}
