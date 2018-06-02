import {version} from '../../package.json';
import {system} from '../polyfill';
import {ModuleSystem} from './ModuleSystem';
import {ModuleManager} from './ModuleManager';

/**
 * @class App
 * @category core
 * @description This component is used to prepare a world scene, setup physics, camera, renderer and all other things that you usually do before making meshes.
 * @param {Array} [modules=[]] - Array of Modules
 * @extends ModuleSystem
 * @memberof module:core
 */
class App extends ModuleSystem {
  /**
   * @description Defines whether the scene should render or not
   * @member {Boolean} module:core.App#enabled
   * @public
   */
  enabled = true;

  /**
   * Loops in this app
   * @description Array of loops that are executed by this app.
   * @member {Array} module:core.App#loops
   * @public
   */
  loops = [];

  constructor(modules = []) {
    console.log(`WHS.App ${version}`);

    super();
    this.manager = new ModuleManager(this);
    this.modules = modules;

    this.integrateModules();
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
        if (e.enabled) e.execute(e.clock);
      }
    };

    this.enabled = true;

    if (!this.request)
      process();
  }

  /**
   * @method stop
   * @description Stops rendering loops
   * @memberof module:core.App
   */
  stop() {
    this.enabled = false;
  }

  /**
   * @method addLoop
   * @description Adds loop to this app.
   * @param {Object} loop - the loop to add
   * @return {Promise} Promise that is resolved when promises completed.
   * @memberof module:core.App
   * @example <caption>Adding a loop to an app</caption>
   * const loop = new Loop(() => {
   *  // ...
   * });
   *
   * const app = new App();
   *
   * app.addLoop(loop);
   * loop.start();
   */
  addLoop(loop) {
    return new Promise(resolve => {
      this.loops.push(loop);
      resolve(loop);
    });
  }

  /**
   * @method removeLoop
   * @description Removes loop from this app.
   * @param {Object} loop - the loop to remove
   * @return {Promise} Promise that is resolved when promises completed.
   * @memberof module:core.App
   */
  removeLoop(loop) {
    return new Promise(resolve => {
      const index = this.loops.indexOf(loop);
      if (index !== -1) this.loops.splice(index, 1);

      resolve(loop);
    });
  }

  get(key) {
    return this.manager.get(key);
  }

  use(key) {
    return this.manager.use(key);
  }
}

export {
  App
};
