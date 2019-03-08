import {WebGLRenderer} from 'three';

export class RenderingModule {
  constructor(moduleOptions = {}, rendererOptions = {}) {
    this.moduleOptions = moduleOptions;
    this.rendererOptions = rendererOptions;
  }

  setup(app, {manager, onUpdate, warn}) {
    warn('size', 'manager.size should be an array: [width, height]');
    warn('camera', 'manager.camera should be a WHS.Component.Camera');
    warn('scene', 'manager.scene should be a THREE.Scene');
    warn('container', 'manager.container should be an HTMLElement');

    const {
      container,
      camera,
      scene,
      size = [window.innerWidth, window.innerHeight]
    } = manager;

    const rendererOptions = this.rendererOptions || {};

    const renderer = manager.renderer = new WebGLRenderer(this.prepareRendererOptions(rendererOptions));
    renderer.setSize(size[0], size[1]);

    onUpdate('size', (value) => {
      renderer.setSize(value[0], value[1]);
    });

    container.appendChild(renderer.domElement);

    manager.renderFunc = () => {
      manager.renderer.render(manager.scene, manager.camera.native);
    };

    manager.renderLoop = app.loop(clock => {
      manager.renderFunc(clock)
    });
  }

  prepareRendererOptions(rendererOptions) {
    const quality = this.moduleOptions.quality || 'medium';

    switch (quality) {
      case 'high':
        rendererOptions.antialias = true;
        break;
      default:

    }

    return rendererOptions;
  }
}
