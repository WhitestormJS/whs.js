import {
  WebGLRenderer,
  Vector2
} from 'three';

import {Loop} from '../../core/Loop';

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

  constructor(params = {}, {shadow: isShadow} = {shadow: false}) {
    this.params = Object.assign({
      width: window.innerWidth,
      height: window.innerHeight,

      resolution: new Vector2(1, 1),
      pixelRatio: window.devicePixelRatio,

      bgColor: 0x000000,
      bgOpacity: 1,

      renderer: {}
    }, params);

    const {
      bgColor,
      bgOpacity,
      renderer,
      pixelRatio,
      width,
      height,
      resolution
    } = this.params;

    this.renderer = new WebGLRenderer(renderer);
    this.effects = [];
    this.applyAdditional('shadow', isShadow);

    this.renderer.setClearColor(
      bgColor,
      bgOpacity
    );

    if (pixelRatio) this.renderer.setPixelRatio(pixelRatio);

    this.setSize(
      Number(width * resolution.x).toFixed(),
      Number(height * resolution.y).toFixed()
    );
  }

  applyAdditional(name, isApplied = false) {
    if (!isApplied) return;
    RenderingModule.additional[name].apply(this, [this.renderer]);
  }

  integrateRenderer(element, scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.renderLoop = new Loop(() => this.renderer.render(this.scene, this.camera));
    this.attachToCanvas(element);

    return this.renderLoop;
  }

  effect(effect, cb) {
    this.defer.then(() => {
      this.renderLoop.stop();

      const size = this.renderer.getSize();
      effect.setSize(size.width, size.height);

      const loop = new Loop(cb ? cb : () => {
        effect.render(this.scene, this.camera);
      });

      this.effects.push(loop);
      if (this.enabled) loop.start(this.app);
    });
  }

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
    // this.renderLoop.start();
    // this.effects.forEach(loop => loop.start());
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
