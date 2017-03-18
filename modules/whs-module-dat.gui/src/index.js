import dat from 'dat-gui';

import {DatMeshModule} from './DatMeshModule';
import {DatLightModule} from './DatLightModule';
import {DatCameraModule} from './DatCameraModule';

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
  constructor(params = {}) {
    this.gui = new dat.GUI();
  }

  Mesh(params = {}) {
    params.gui = this.gui;
    return new DatMeshModule(params);
  }

  Light(params = {}) {
    params.gui = this.gui;
    return new DatLightModule(params);
  }

  Camera(params = {}) {
    params.gui = this.gui;
    return new DatCameraModule(params);
  }
}
