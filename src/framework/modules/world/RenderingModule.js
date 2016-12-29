import { BasicRendering } from '../../components/rendering/basic/BasicRendering';

export class RenderingModule {
  integrate() {
    const _params = this.params;
    const computedWidth = Number(_params.width * _params.resolution.width).toFixed();
    const computedHeight = Number(_params.height * _params.resolution.height).toFixed();

    this.$rendering = new BasicRendering(this.params)(this);
  }
}
