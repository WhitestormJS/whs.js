import {
  WebGLRenderer,
  Vector2
} from 'three';

import {Loop} from '../../core/Loop';

/**
 * @class RenderingModule
 * @category modules/app
 * @param {Object} [params]
 * @memberof module:modules/app
 * @example <caption> Creating a rendering module and passing it to App's modules</caption>
 * new App([
 *   new ElementModule(),
 *   new SceneModule(),
 *   new DefineModule('camera', new PerspectiveCamera({
 *     position: new THREE.Vector3(0, 6, 18),
 *     far: 10000
 *   })),
 *   new RenderingModule({
 *     bgColor: 0x162129,
 *
 *     renderer: {
 *       antialias: true
 *     }
 *   }, {shadow: true})
 * ]);
 */
export class RenderingModule {
  /**
   * additional
   * @description collection of additional scripts
   * @static
   * @member {Object} module:core.App#additional
   * @public
   */
  static additional = {
    shadow(renderer) {
      renderer.shadowMap.enabled = true;
    }
  }

  /**
   * enabled
   * @static
   * @member {Boolean} module:core.App#enabled
   * @public
   */
  enabled = true;

  constructor(params = {}, additional) {
    this.params = Object.assign({
      width: window.innerWidth,
      height: window.innerHeight,

      resolution: new Vector2(1, 1),
      pixelRatio: window.devicePixelRatio,

      bgColor: 0x000000,
      bgOpacity: 1,

      renderer: {},
      fix() {}
    }, params);

    const {
      bgColor,
      bgOpacity,
      renderer,
      pixelRatio,
      width,
      height,
      resolution,
      fix
    } = this.params;

    this.renderer = new WebGLRenderer(renderer);
    this.effects = [];

    this.renderer.setClearColor(
      bgColor,
      bgOpacity
    );

    if (pixelRatio) this.renderer.setPixelRatio(pixelRatio);

    this.setSize(
      Number(width * resolution.x).toFixed(),
      Number(height * resolution.y).toFixed()
    );

    for (const key in additional)
      if (additional[key]) this.applyAdditional(key);

    fix(this.renderer);
  }

  /**
   * @method applyAdditional
   * @description Apply additional script from RenderingModule.additional
   * @param {Stirng} name Script name
   * @return {this}
   * @memberof module:modules/app.RenderingModule
   */
  applyAdditional(name) {
    RenderingModule.additional[name].apply(this, [this.renderer]);
  }

  /**
   * @method integrateRenderer
   * @description Integrate renderer
   * @param {NodeElement} element DOM object
   * @param {THREE.Scene} scene used scene
   * @param {THREE.Camera} camera used camera
   * @return {Loop} renderLoop
   * @memberof module:modules/app.RenderingModule
   */
  integrateRenderer(element, scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.attachToCanvas(element);

    return new Loop(() => this.renderer.render(this.scene, this.camera));
  }

  /**
   * @method effect
   * @description Add three.js effect
   * @param {Object} effect three.js effect
   * @param {function} effectLoop update function for effect
   * @return {this}
   * @memberof module:modules/app.RenderingModule
   */
  effect(effect, effectLoop = () => {
    effect.render(this.scene, this.camera);
  }) {
    this.renderLoop.stop();

    const size = this.renderer.getSize();
    effect.setSize(size.width, size.height);

    const loop = new Loop(effectLoop);

    this.effects.push(loop);
    if (this.enabled) loop.start(this.app);

    return this;
  }

  /**
   * @method setSize
   * @description Update render target width and height.
   * @param {Number} width
   * @param {Number} height
   * @memberof module:modules/app.RenderingModule
   */
  setSize(width, height) {
    if (this.renderer) this.renderer.setSize(width, height);
  }

  /**
   * @method attachToCanvas
   * @description Attach renderer.domElement to element
   * @param {NodeElement} element DOM object
   * @memberof module:modules/app.RenderingModule
   */
  attachToCanvas(element) {
    const canvas = this.renderer.domElement;

    // attach to new parent world dom
    element.appendChild(canvas);
    canvas.style.width = '100%';
    canvas.style.height = '100%';
  }

  /**
   * @method stop
   * @description Stops renderLoop and effect loops
   * @memberof module:modules/app.RenderingModule
   */
  stop() {
    this.enabled = false;
    this.renderLoop.stop();
    this.effects.forEach(loop => loop.stop());
  }

  /**
   * @method play
   * @description Resumes renderLoop and effect loops
   * @memberof module:modules/app.RenderingModule
   */
  play() {
    this.enabled = true;
    this.renderLoop.start();
    this.effects.forEach(loop => loop.start());
  }

  manager(manager) {
    manager.define('rendering');
    manager.set('renderer', this.renderer);

    this.app = manager.handler;

    this.renderLoop = this.integrateRenderer(
      manager.get('element'),
      manager.get('scene'),
      manager.get('camera').native
    );

    manager.update({
      element: element => {
        this.attachToCanvas(element);
      },
      scene: scene => {
        this.scene = scene;
      },
      camera: camera => {
        this.camera = camera.native;
      }
    });
  }

  integrate(self) {
    self.renderLoop.start(this);
    self.effects.forEach(loop => loop.start(this));
  }

  /**
   * @method dispose
   * @description Dispose rendering context
   * @memberof module:modules/app.RenderingModule
   */
  dispose() {
    this.stop();
    this.renderer.forceContextLoss();
  }
}
