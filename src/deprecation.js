import {Importer} from './components/meshes/Importer';

export class Model extends Importer {
  constructor(params, ...additional) {
    console.warn('Model is deprecated. Use Importer instead.');

    if (params.geometry) {
      params.url = params.geometry.path;
      params.loader = params.geometry.loader;
    }

    super(params, ...additional);
  }
}
