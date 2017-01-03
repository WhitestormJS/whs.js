import { BasicRendering } from '../../components/rendering/basic/BasicRendering';

export class RenderingModule {
  constructor(params) {
    this.params = params;
    this.rendering = new BasicRendering(params);
  }

  manager(manager) {
    this.renderLoop = this.rendering.integrateRenderer(
      manager.get('element'),
      manager.get('scene'),
      manager.get('camera').native
    );

    manager.onDependencyUpdate({
      element: (element) => {
        this.rendering.attachToCanvas(element);
      },
      scene: (scene) => {
        this.rendering.scene = scene;
      },
      camera: (camera) => {
        this.rendering.camera = camera.native;
      }
    });

    manager.addDependency('rendering', this.rendering, {alias: '$rendering'});
  }

  integrate(params, self) {
    // const computedWidth = Number(params.width * params.resolution.width).toFixed();
    // const computedHeight = Number(params.height * params.resolution.height).toFixed();

    self.renderLoop.start(this);
  }
}
