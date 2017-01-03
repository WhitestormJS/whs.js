import {
  PCFSoftShadowMap
} from 'three';

import {Loop} from '../../extras/Loop';

export class RenderingModule {
  constructor(params = {}) {
    this.params = Object.assign({
      width: window.innerWidth,
      height: window.innerHeight,

      resolution: {
        width: 1,
        height: 1
      },

      shadowmap: {
        enabled: true,
        type: PCFSoftShadowMap
      },

      background: {
        color: 0x000000,
        opacity: 1
      },

      renderer: {}
    }, params);

    this.renderer = new THREE.WebGLRenderer(this.params.renderer);

    this.renderer.setClearColor(
      this.params.background.color,
      this.params.background.opacity
    );

    // Shadowmap.
    this.renderer.shadowMap.enabled = this.params.shadowmap.enabled;
    this.renderer.shadowMap.type = this.params.shadowmap.type;
    this.renderer.shadowMap.cascade = true;

    this.setSize(this.params.width, this.params.height);
  }

  integrateRenderer(element, scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.renderLoop = new Loop((clock) => this.renderModule(this.scene, this.camera, clock.getDelta()));
    this.attachToCanvas(element);

    return this.renderLoop;
  }

  renderModule(scene, camera, delta) {
    this.renderer.render(scene, camera);
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

  manager(manager) {
    this.renderLoop = this.integrateRenderer(
      manager.get('element'),
      manager.get('scene'),
      manager.get('camera').native
    );

    manager.onDependencyUpdate({
      element: (element) => {
        this.attachToCanvas(element);
      },
      scene: (scene) => {
        this.scene = scene;
      },
      camera: (camera) => {
        this.camera = camera.native;
      }
    });

    manager.addDependency('renderer', this.renderer, {alias: '$rendering'});
  }

  integrate(params, self) {
    // const computedWidth = Number(params.width * params.resolution.width).toFixed();
    // const computedHeight = Number(params.height * params.resolution.height).toFixed();

    self.renderLoop.start(this);
  }
}
