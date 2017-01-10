import {ModuleManager} from './ModuleManager';

class App {
  // static defaults = {
  //   stats: false,
  //   autoresize: false,
  //   softbody: false,
  //
  //   helpers: {
  //     grid: false,
  //     axis: false
  //   },
  //
  //   gravity: {
  //     x: 0,
  //     y: 0,
  //     z: 0
  //   },
  //
  //   rendering: {
  //     shadowmap: {
  //       enabled: true,
  //       type: PCFSoftShadowMap
  //     },
  //
  //     background: {
  //       color: 0x000000,
  //       opacity: 1
  //     },
  //
  //     renderer: {}
  //   },
  //
  //   camera: {
  //     fov: 75,
  //     near: 1,
  //     far: 1000,
  //
  //     position: {
  //       x: 0,
  //       y: 0,
  //       z: 0
  //     }
  //   },
  //
  //   width: window.innerWidth,
  //   height: window.innerHeight,
  //   container: window.document.body,
  //
  //   resolution: {
  //     width: 1,
  //     height: 1
  //   },
  //
  //   physics: {
  //     create: false,
  //     fixedTimeStep: 1 / 60,
  //     broadphase: {type: 'dynamic'}
  //   },
  //
  //   modules: []
  // };
  //
  // static instructions = {
  //   camera: {
  //     position: ['x', 'y', 'z']
  //   },
  //
  //   gravity: ['x', 'y', 'z']
  // };
  //
  // static helpers = {
  //   axis: [AxisHelper, {
  //     size: 5
  //   }, ['size']],
  //
  //   grid: [GridHelper, {
  //     size: 10,
  //     step: 1,
  //     color1: 0xffffff,
  //     color2: 0xffffff
  //   }, ['size', 'step', 'color1', 'color2']]
  // };

  simulate = false;
  render = true;
  loops = [];

  constructor(modules = []) {
    this.modules = modules;
    this.manager = new ModuleManager(this);

    if (process.env.WHSDEV) {
      window.appInstance = this;
    }

    for (let i = 0, max = modules.length; i < max; i++) {
      const module = modules[i];

      if (typeof module === 'function')
        module.bind(this)();
      else {
        if (!module.name) module.name = '';
        this.manager.setActiveModule(module);
        if (module.manager) module.manager(this.manager);
        if (module.integrate) module.integrate.bind(this)(module.params, module);
      }
    }

    this.manager.reset();

    // if (params.autoresize) {
    //   const container = params.container;

    //   const resizeCallback = () => {
    //     // FIXME:20 Am I crazy or offsetHeight is increasing even when we downsize the window ?
    //     // console.log('height offset : ', params.container.offsetHeight);

    //     this.setSize(
    //       Number(container.offsetWidth * params.resolution.width).toFixed(),
    //       Number(container.offsetHeight * params.resolution.height).toFixed()
    //     );

    //     this.emit('resize');
    //   }

    //   if (params.autoresize === 'window') window.addEventListener('resize', resizeCallback);
    //   else {
    //     if (params.autoresize.delay) {
    //       let resize = true;

    //       addResizeListener(container, () => {
    //         window.clearTimeout(resize);
    //         resize = window.setTimeout(resizeCallback, params.autoresize.delay);
    //       });
    //     }
    //     else addResizeListener(container, resizeCallback);
    //   }
    // }
  }

  /**
   * Start animation.
   */
  // start() {
  //   this.clock = new THREE.Clock();

  //   window.requestAnimFrame = (() => {
  //     return window.requestAnimationFrame
  //       || window.webkitRequestAnimationFrame
  //       || window.mozRequestAnimationFrame
  //       || function (callback) {
  //         window.setTimeout(callback, 1000 / 60);
  //       };
  //   })();

  //   this.onStartRendering = onStartRendering;
  //   this.onFinishRendering = onFinishRendering;
  //   this.$rendering.render(this.$scene, this.$camera.native);

  //   if (this.$rendering) this.$rendering.start(this.beforeRender.bind(this), this.afterRender.bind(this));
  // }

  start() {
    window.requestAnimFrame = (() => {
      return window.requestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.mozRequestAnimationFrame
        || function (callback) {
          window.setTimeout(callback, 1000 / 60);
        };
    })();

    function process() {
      window.requestAnimFrame(process.bind(this));

      // Init stats.
      // if (stats) stats.begin();

      for (let i = 0; i < this.loops.length; i++) {
        const e = this.loops[i];
        if (e.enabled) e.execute(e.clock);
      }

      // End helper.
      // if (stats) stats.end();
    }

    (process.bind(this))();
  }

  module(module) {
    if (typeof module === 'function')
      module.bind(this.modulesSharedScope)().integrate.bind(this)(module.params, module);
    else {
      this.modules.push(module);
      if (!module.name) module.name = '';
      this.manager.setActiveModule(module);
      if (module.manager) module.manager(this.manager);
      if (module.integrate) module.integrate.bind(this)(module.params, module);
    }

    return this;
  }

  // /**
  //  * Callback called immediately before Plugin Rendering.
  //  * @param  {Number} delta : delta time elapsed since the last frame.
  //  */
  // beforeRender(delta) {
  //   if (this.controls) {
  //     this.controls.update(Date.now() - this.time);
  //     this.time = Date.now();
  //   };
  // }

  // *
  //  * Callback called immediately after the Plugin Rendering.
  //  * @param  {Number} delta : delta time elapsed since the last frame (will be equal to beforeRender delta).

  // afterRender(delta) {
  //   for (let i = 0; i < this.loops.length; i++) {
  //     const e = this.loops[i];
  //     if (e.enabled) e.execute(e.clock);
  //   }
  // }

  /**
   * Retrieve the renderer used by the active rendering plugin.
   * @return {THREE.WebGLRenderer} The WebGLRenderer used by the current rendering plugin.
   */
  // get renderer() {
  //   if (this.$rendering) return this.$rendering.$renderer;
  // }

  addLoop(loop) {
    return new Promise((resolve) => {
      this.loops.push(loop);
      resolve(loop);
    });
  }

  removeLoop(loop) {
    return new Promise((resolve) => {
      this.loops.filter((l) => l !== loop);
      resolve(loop);
    });
  }

  applyBridge(bridgeMap = {}) {
    const modules = this.modules;

    for (let i = 0, max = modules.length; i < max; i++) {
      for (let key in bridgeMap) {
        const module = modules[i];

        if (module.bridge && module.bridge[key])
          bridgeMap[key] = module.bridge[key].apply(this, [bridgeMap[key], module]);
      }
    }

    return bridgeMap;
  }

  // addHelper(name, params = {}, helpers = App.helpers) {
  //   super.addHelper(name, params, helpers);
  // }

  // addConstraint(constraint) {
  //   this.$scene.addConstraint(constraint);
  // }

  /**
   * This functon will scene properties when it's called.
   */
  // setSize(width = 1, height = 1) {
  //   this.$camera.native.aspect = width / height;
  //   this.$camera.native.updateProjectionMatrix();

  //   if (this.$rendering) {
  //     this.$rendering.setSize(width, height);
  //   }
  // }
}

export {
  App
};
