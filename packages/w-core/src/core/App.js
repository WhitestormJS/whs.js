import {Clock} from 'three';

import {version} from '../../package.json';
import {system} from '../polyfill';
import {DefineModule} from '../modules/DefineModule';
import {ModuleSystem} from './ModuleSystem';
import {Loop} from './Loop';
import {Store} from './Store';

/**
 * @class App
 * @category core
 * @description This component is used to prepare a world scene, setup physics, camera, renderer and all other things that you usually do before making meshes.
 * @param {Array} [modules=[]] - Array of Modules
 * @extends ModuleSystem
 * @memberof module:core
 */
class App extends ModuleSystem {
  static Store = Store;
  /**
   * @description Defines whether the scene should render or not
   * @member {Boolean} module:core.App#enabled
   * @public
   */
  enabled = true;
  clock = new Clock();

  /**
   * Loops in this app
   * @description Array of loops that are executed by this app.
   * @member {Array} module:core.App#loops
   * @public
   */
  loops = [];

  static define = (...args) => {
    return new DefineModule(...args);
  };

  constructor(modules = []) {
    console.log(`WHS.App ${version}`);
    super({modules});

    this.setupModules();
  }

  // CONTROLS & UPDATING

  /**
   * @method start
   * @description Start rendering loop and physics simulation (if you use version with physics).
   * @memberof module:core.App
   */
  start() {
    const requestAnimFrame = (() => {
      return system.window.requestAnimationFrame
        || system.window.webkitRequestAnimationFrame
        || system.window.mozRequestAnimationFrame
        || function (callback) {
          system.window.setTimeout(callback, 1000 / 60);
        };
    })();

    const process = () => {
      this.request = requestAnimFrame(() => process());
      if (!this.enabled) return;

      for (let i = 0, ll = this.loops.length; i < ll; i++) {
        const e = this.loops[i];
        if (e.enabled) e.func(this.clock);
      }
    };

    this.enabled = true;

    if (!this.request)
      process();
  }

  loop(loopCallback) {
    const loop = new Loop(loopCallback);
    this.loops.push(loop);

    return loop;
  }
}

export {
  App
};
