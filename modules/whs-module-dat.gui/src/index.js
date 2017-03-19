import dat from 'dat-gui';

import {DatMeshModule} from './DatMeshModule';
import {DatLightModule} from './DatLightModule';
import {DatCameraModule} from './DatCameraModule';
import {DatCustomModule} from './DatCustomModule';

// Polyfill
dat.GUI.prototype.removeFolder = function(name) {
  var folder = this.__folders[name];
  if (!folder) {
    return;
  }
  folder.close();
  this.__ul.removeChild(folder.domElement.parentNode);
  delete this.__folders[name];
  this.onResize();
}

export default class DatGUIModule {
  static new(params) {
    return new DatGUIModule(new dat.GUI(params));
  }

  constructor(gui = new dat.GUI({autoPlace: false})) {
    this.gui = gui;
  }

  manager(manager) {
    const dom = this.gui.domElement;
    const style = dom.style;

    style.position = 'absolute';
    style.top = 0;
    style.right = '20px';

    manager.get('element').appendChild(this.gui.domElement);
  }

  set(gui) {
    this.gui = gui;
    return this;
  }

  folder(name = 'folder') {
    return new DatGUIModule(this.gui.addFolder(name));
  }

  Mesh(params = {}, gui = this.gui) {
    return new DatMeshModule(params, gui);
  }

  Light(params = {}, gui = this.gui) {
    return new DatLightModule(params, gui);
  }

  Camera(params = {}, gui = this.gui) {
    return new DatCameraModule(params, gui);
  }

  Custom(params = {}, gui = this.gui) {
    return new DatCustomModule(params, gui);
  }
}

DatGUIModule.dat = dat;
