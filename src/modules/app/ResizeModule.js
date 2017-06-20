// import {addResizeListener} from 'detect-element-resize';

/**
 * @class ResizeModule
 * @category modules/app
 * @param {Object} [params={auto: true}] - If auto is set to true - resize will be triggered when container resizes
 * @memberof module:modules/app
 */
export class ResizeModule {
  constructor(params = {}) {
    this.params = Object.assign({
      auto: true
    }, params);
  }

  /**
   * @function setSize
   * @description This function sets the provided width & height to the renderer object.
   * @param {Number} [width=1] - The promise that should be added to a queue.
   * @return {Number} [height=1] - that is resolved when all promises completed.
   * @memberof module:modules/app.ResizeModule
   */
  setSize(width = 1, height = 1) {
    this.camera.native.aspect = width / height;
    this.camera.native.updateProjectionMatrix();

    if (this.rendering) this.rendering.setSize(width, height);
  }

  /**
   * @method trigger
   * @description Triggers resize when called. width & height are determined automatically
   * @memberof module:modules/app.ResizeModule
   */
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

    if (this.params.auto) window.addEventListener('resize', this.trigger.bind(this));
  }

  manager(manager) {
    this.rendering = manager.get('renderer');
    this.camera = manager.get('camera');

    this.getResolution = () => manager.get('renderer', true).params.resolution;
    this.getContainer = () => manager.get('container');

    this.addAutoresize();
  }
}
