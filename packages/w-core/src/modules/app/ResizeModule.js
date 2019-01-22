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

    this.callbacks = [this.setSize.bind(this)];
  }

  /**
   * @function setSize
   * @instance
   * @description This function sets the provided width & height to the renderer object.
   * @param {Number} [width=1] - The promise that should be added to a queue.
   * @param {Number} [height=1] - that is resolved when all promises completed.
   * @memberof module:modules/app.ResizeModule
   */
  setSize(width = 1, height = 1) {
    this.camera.native.aspect = width / height;
    this.camera.native.updateProjectionMatrix();

    if (this.rendering) this.rendering.setSize(width, height);
  }

  /**
   * @method trigger
   * @instance
   * @description Triggers resize when called. width & height are determined automatically
   * This invokes each callbacks with the new width and height as params
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

    const width = Number(offsetWidth * resolution.x).toFixed();
    const height = Number(offsetHeight * resolution.y).toFixed();

    this.callbacks.forEach(cb => {
      cb(width, height);
    });
  }

  /**
   * @method addAutoresize
   * @instance
   * @description Sets module to autoresize, this adds an event listene on window resize to trigger the resize
   * @memberof module:modules/app.ResizeModule
   */
  addAutoresize() {
    this.container = this.getContainer();
    this.resolution = this.getResolution();

    if (this.params.auto) window.addEventListener('resize', this.trigger.bind(this));
  }

  /**
   * @method addCallback
   * @instance
   * @description Adds a call back function to the existing callbacks list.
   * @param {Function} func - The callback function to add
   * @memberof module:modules/app.ResizeModule
   */
  addCallback(func) {
    this.callbacks.push(func);
  }

  manager(manager) {
    manager.define('resize');

    this.rendering = manager.get('renderer');
    this.camera = manager.get('camera');

    this.getResolution = () => manager.use('rendering').params.resolution;
    this.getContainer = () => manager.get('container');

    manager.update({
      container: container => {
        this.container = container;
      }
    });

    this.addAutoresize();
  }
}
