import {Component} from '../core/Component';
import {applyTransform} from '../utils';
import {Mesh} from 'three';

export class MeshComponent extends Component {
  build(options) {
    const geometry = options.geometry;
    const material = options.material;

    const mesh = this.bridge('mesh', new Mesh(
      this.bridge('geometry', geometry),
      this.bridge('material', material)
    ));

    applyTransform(mesh, options);

    return mesh;
  }
}

Component.Mesh = MeshComponent;
