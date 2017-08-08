import {Loop} from '../../core/Loop';
import {EventsPatchModule} from './EventsPatchModule';

/**
 * @class ControlsModule
 * @category modules/app
 * @param {Object} [params]
 * @memberof module:modules/app
 * @example <caption> Creating a rendering module and passing it to App's modules</caption>
 * new App([
 *   new ElementModule(),
 *   new SceneModule(),
 *   new DefineModule('camera', new WHS.PerspectiveCamera({
 *     position: new THREE.Vector3(0, 6, 18),
 *     far: 10000
 *   })),
 *   new RenderingModule(),
 *   new ControlsModule.from(new THREE.TrackballControls())
 * ]);
 */
export class ControlsModule {
  static from(controls) {
    return new ControlsModule({controls});
  }

  constructor(params = {}) {
    this.params = Object.assign({
      controls: false,
      fix: controls => controls,

      update(c) {
        this.controls.update(c.getDelta());
      }
    }, params);

    this.controls = this.params.controls;
    this.update = this.params.update;
  }

  manager(manager) {
    manager.define('controls');
    manager.require('events', () => new EventsPatchModule());
  }

  /**
   * @method setControls
   * @description Set working controls
   * @param {Object} controls Working three.js controls object.
   * @return {this}
   * @memberof module:modules/app.ControlsModule
   */
  setControls(controls) {
    this.controls = controls;
    return this;
  }

  /**
   * @method setUpdate
   * @description Set controls update function
   * @param {Function} update Update function
   * @return {this}
   * @memberof module:modules/app.ControlsModule
   */
  setUpdate(update) {
    this.update = update;
    return this;
  }

  integrate(self) {
    self.updateLoop = new Loop(self.update.bind(self));
    self.updateLoop.start(this);
  }
}
