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
 *   new DefineModule('camera', new WHS.PerspectiveCamera({
 *     position: new THREE.Vector3(0, 6, 18),
 *     far: 10000
 *   })),
 *   new RenderingModule({
 *     bgColor: 0x162129,
 *
 *     renderer: {
 *       antialias: true,
 *       shadowmap: {
 *         type: THREE.PCFSoftShadowMap
 *       }
 *     }
 *   }, {shadow: true})
 * ]);
 */
export class RenderingModule {
  static additional = {
    shadow(renderer) {
      renderer.shadowMap.enabled = true;
    }
  }

  enabled = true;

  defer = new Promise(resolve => {
    this.resolve = resolve;
  });

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

  applyAdditional(name) {
    RenderingModule.additional[name].apply(this, [this.renderer]);
  }

  integrateRenderer(element, scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.renderLoop = new Loop(() => this.renderer.render(this.scene, this.camera));
    this.attachToCanvas(element);

    return this.renderLoop;
  }

  effect(effect, effectLoop = () => {
    effect.render(this.scene, this.camera);
  }) {
    this.defer.then(() => {
      this.renderLoop.stop();

      const size = this.renderer.getSize();
      effect.setSize(size.width, size.height);

      const loop = new Loop(effectLoop);

      this.effects.push(loop);
      if (this.enabled) loop.start(this.app);
    });
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

  attachToCanvas(element) {
    const canvas = this.renderer.domElement;

    // attach to new parent world dom
    element.appendChild(canvas);
    canvas.style.width = '100%';
    canvas.style.height = '100%';
  }

  stop() {
    this.enabled = false;
    this.renderLoop.stop();
    this.effects.forEach(loop => loop.stop());
  }

  play() {
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

    this.resolve();
  }

  integrate(self) {
    self.renderLoop.start(this);
    self.effects.forEach(loop => loop.start(this));
  }

  dispose(self) {
    self.renderLoop.stop(this);
    self.effects.forEach(loop => loop.stop(this));
    self.renderer.forceContextLoss();
  }
}
