import {ElementModule} from '../modules/app/ElementModule';
import {SceneModule} from '../modules/app/SceneModule';
import {CameraModule} from '../modules/app/CameraModule';
import {RenderingModule} from '../modules/app/RenderingModule';
import {ResizeModule} from '../modules/app/ResizeModule';

import {App} from './App';

export class TestApp extends App {
  constructor(modulesAdditional = []) {
    const modules = [
      new ElementModule(),
      new SceneModule(),
      new CameraModule(),
      new RenderingModule({}, {
        shadow: true
      }),
      new ResizeModule()
    ].concat(modulesAdditional);

    super(modules);
  }
}
