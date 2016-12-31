import {
  PCFSoftShadowMap
} from 'three';

import {Loop} from '../../extras/Loop';

export class Renderer {
  constructor(params = {}) {
    this.params = Object.assign({
      width: window.innerWidth,
      height: window.innerHeight,

      resolution: {
        width: 1,
        height: 1
      },

      shadowmap: {
        enabled: true,
        type: PCFSoftShadowMap
      },

      background: {
        color: 0x000000,
        opacity: 1
      },

      renderer: {}
    }, params);
  }

  get world() {
    return this._world;
  }

  set world(world) {
    if (this._world) this.renderLoop.stop(world);
    this.renderLoop = new Loop((clock) =>
      this.renderModule(world.$scene, world.$camera.native, clock.getDelta()));
    this._world = world;
    this.renderLoop.start(world);
    this.attachToCanvas();

    // if (params.modules && params.modules.stats) this.make$stats();
  }

  attachToCanvas() {
    if (this.world) {
      // TODO: detach from dom
    }

    const canvas = this.$renderer.domElement;
    this.world.$canvas = canvas;

    // attach to new parent world dom
    this.world.$element.appendChild(canvas);
    canvas.style.width = '100%';
    canvas.style.height = '100%';
  }

  // make$stats() {
  //   const statsData = this.params.stats;

  //   if (statsData) {
  //     const stats = new Stats();
  //     this.$stats = stats;

  //     if (statsData === 'fps') stats.setMode(0);
  //     else if (statsData === 'ms') stats.setMode(1);
  //     else if (statsData === 'mb') stats.setMode(1);
  //     else stats.setMode(0);

  //     const stStyle = stats.domElement.style;

  //     stStyle.position = 'absolute';
  //     stStyle.left = '0px';
  //     stStyle.top = '0px';

  //     this.world.$element.appendChild(stats.domElement);
  //   }
  // }

  build(params = {}) {
    throw new Error('Build method has to be re-implemented in each rendering module (use it to initialize your rendering module!)');
  }

  renderModule(scene, camera, delta) {
    throw new Error('renderModule method has to be re-implemented in each rendering module (or else your module won\'t do anything!)');
  }

  setSize(width, height) {
    throw new Error('setSize method has to be re-implemented in each rendering module (or else your module won\'t resize!)');
  }
}
