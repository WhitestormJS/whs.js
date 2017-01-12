import {addResizeListener} from 'detect-element-resize';

export class AutoresizeModule {
  constructor(params) {
    this.params = Object.assign({
      autoresize: 'window'
    }, params);
  }

  setSize(width = 1, height = 1) {
    this.camera.native.aspect = width / height;
    this.camera.native.updateProjectionMatrix();

    if (this.rendering) {
      this.rendering.setSize(width, height);
    }
  }

  addAutoresize() {
    const container = this.getContainer();

    const resizeCallback = () => {
      const resolution = this.getResolution();

      this.setSize(
        Number(container.offsetWidth * resolution.x).toFixed(),
        Number(container.offsetHeight * resolution.y).toFixed()
      );
    };

    if (this.params.autoresize === 'window') window.addEventListener('resize', resizeCallback);
    else {
      if (this.params.autoresize.delay) {
        let resize = true;

        addResizeListener(container, () => {
          window.clearTimeout(resize);
          resize = window.setTimeout(resizeCallback, params.autoresize.delay);
        });
      }
      else addResizeListener(container, resizeCallback);
    }
  }

  manager(manager) {
    this.rendering = manager.get('renderer');
    this.camera = manager.get('camera');

    this.getResolution = () => manager.get('renderer', true).params.resolution;
    this.getContainer = () => manager.get('element', true).params.container;

    this.addAutoresize();
  }
}
