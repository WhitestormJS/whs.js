import { BasicRendering } from '../../components/rendering/basic/BasicRendering';

export class RenderingModule {
  constructor(params) {
    this.params = params;
  }

  integrate(params) {
    // const computedWidth = Number(params.width * params.resolution.width).toFixed();
    // const computedHeight = Number(params.height * params.resolution.height).toFixed();

    this.$rendering = new BasicRendering(params)(this);
  }
}
