import {Preset} from '../Perset';

import {ElementModule} from '../../app/ElementModule';
import {SceneModule} from '../../app/SceneModule';
import {CameraModule} from '../../app/CameraModule';
import {RenderingModule} from '../../app/RenderingModule';
import {AutoresizeModule} from '../../app/AutoresizeModule';

export class BasicAppPreset extends Preset {
  constructor({camera, rendering, element} = {}) {
    super([
      new ElementModule(element),
      new SceneModule(),
      new CameraModule(camera),
      new RenderingModule(rendering, {
        shadow: true
      })
    ]);
  }

  autoresize() {
    this.modules.push(new AutoresizeModule());
    return this;
  }
}
