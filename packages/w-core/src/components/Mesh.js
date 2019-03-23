import {Component} from '../core/Component';
import {applyTransform} from '../utils';
import {Mesh} from 'three';

export class MeshComponent extends Component {
  build(options) {
    const geometry = options.geometry;
    const material = options.material;

    const mesh = this.bridge('mesh', new Mesh(
      geometry ? this.bridge('geometry', geometry) : undefined,
      material ? this.bridge('material', material) : undefined
    ));

    applyTransform(mesh, options);

    return mesh;
  }
}

Component.Mesh = MeshComponent;
