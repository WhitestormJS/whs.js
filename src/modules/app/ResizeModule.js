// import {addResizeListener} from 'detect-element-resize';

export class ResizeModule {
  constructor(params = {}) {
    this.params = Object.assign({
      auto: true
    }, params);
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

    this.setSize(
      Number(offsetWidth * resolution.x).toFixed(),
      Number(offsetHeight * resolution.y).toFixed()
    );
  }

  addAutoresize() {
    this.container = this.getContainer();
    this.resolution = this.getResolution();

    if (this.params.auto) window.addEventListener('resize', this.trigger);
  }

  manager(manager) {
    this.rendering = manager.get('renderer');
    this.camera = manager.get('camera');

    this.getResolution = () => manager.get('renderer', true).params.resolution;
    this.getContainer = () => manager.get('element', true).params.container;

    this.addAutoresize();
  }
}
