/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * Init.
 *
 * @param {Object} params Parameters of initalize. (OPTIONAL)
 * @return {Object} Scope.
 */
WHS.init = function(params) {
  'use strict';

  console.log('WHS.init', WHS.REVISION);

  if (!THREE)
    console.warn('whitestormJS requires THREE.js. {Object} THREE not found.');
  if (!Physijs)
    console.warn('whitestormJS requires PHYSI.js. {Object} Physijs not found.');
  if (!WAGNER)
    console.warn('whitestormJS requires WAGNER.js. {Object} WAGNER not found.');

  var target = $.extend(true, {

    anaglyph: false,
    helper: false,
    stats: false,
    wagner: true,
    autoresize: false,

    shadowmap: true,

    gravity: {
      x:0,
      y:0,
      z:0
    },

    camera: {
      aspect: 75,
      near: 1,
      far: 1000,

      x:0,
      y:0,
      z:0
    },

    rWidth: window.innerWidth, // Resolution(width).
    rHeight: window.innerHeight, // Resolution(height).

    width: window.innerWidth, // Container(width).
    height: window.innerHeight, // Container(height).

    physics: {

      quatNormalizeSkip: 0,
      quatNormalizeFast: false,

      solver: {
        iterations: 20,
        tolerance: 0,
      },

      defMaterial: {
        contactEquationStiffness: 1e8,
        contactEquationRegularizationTime: 3
      }

    },

    background: 0x000000,

    assets: "./assets",

    container: $('body')

  }, params);

  this._settings = target;

  Physijs.scripts.worker = '../libs/physijs_worker.js';
  Physijs.scripts.ammo = '../libs/ammo.js';

  this.scene = new Physijs.Scene;

  this.scene.setGravity(new THREE.Vector3(params.gravity.x, params.gravity.y, params.gravity.z));

  // DOM INIT
  var whselement = $('<div class="whs"></div>');

  target.container.append($(whselement));

  // Debug Renderer

  if (target.stats) {
    this._stats = new Stats();

    if (target.stats == "fps")
      this._stats.setMode(0);

    else if (target.stats == "ms")
      this._stats.setMode(1);

    else if (target.stats == "mb")
      this._stats.setMode(1);

    else {
      this._stats.setMode(0);
      // WARN: console | stats mode.
      console.warn([this._stats], "Please, apply stats mode [fps, ms, mb] .");
    }

    this._stats.domElement.style.position = 'absolute';
    this._stats.domElement.style.left = '0px';
    this._stats.domElement.style.bottom = '0px';

    $(whselement).append(this._stats.domElement);
  }

  // Camera.
  var camera = new THREE.PerspectiveCamera(
    target.camera.aspect,
    target.width / target.height,
    target.camera.near,
    target.camera.far
  );

  camera.position.set(
    target.camera.x,
    target.camera.y,
    target.camera.z
  );

  api.merge(this.scene, camera);

  // Renderer.
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(target.background);

  // Shadowmap.
  renderer.shadowMap.enabled = target.shadowmap;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMap.cascade = true;

  if (target.anaglyph) {

    this.effect = new THREE.AnaglyphEffect(renderer);
    this.effect.setSize(target.rWidth, target.rHeight);

    this.effect.render(this.scene, camera);

  } else {

    renderer.setSize(target.rWidth, target.rHeight);
    renderer.render(this.scene, camera);

  }

  $(renderer.domElement).css({
    'width': target.width,
    'height': target.height
  });

  $(renderer.domElement).attr('');

  $(whselement).append(renderer.domElement);

  target.container.css({
    'margin': 0,
    'padding': 0,
    'position': 'relative',
    'overflow': 'hidden'
  });


  // NOTE: ==================== Composer. =======================

  if (target.wagner) {
    this._composer = new WAGNER.Composer(renderer);
    
    this._composer.setSize(target.rWidth, target.rHeight);

    $(this._composer.domElement).css({
      'width': target.width,
      'height': target.height
    });

    this._composer.autoClearColor = true;

    this._composer.reset();
    this._composer.render(this.scene, camera);

    this._composer.eff = [];
  }

  Object.assign(this, {
    _camera: camera,
    renderer: renderer,
    _settings: target,
    modellingQueue: [], // Queue for physics objects
    children: [], // Children for this app.
    _dom: whselement
  });

  // NOTE: ==================== Autoresize. ======================
  var scope = this;

  if (target.autoresize)
    $(window).on('load resize', function() {
      scope._camera.aspect = window.innerWidth / window.innerHeight;

      scope._camera.updateProjectionMatrix();

      scope.renderer.setSize(target.rWidth, target.rHeight);

      $(scope.renderer.domElement).css({
          'width': window.innerWidth,
          'height': window.innerHeight
      });

      if (params.wagner) {
        scope._composer.setSize(target.rWidth, target.rHeight);

        $(scope._composer.domElement).css({
           'width': window.innerWidth,
          'height': window.innerHeight
        });
      }
    });

  return scope;

}

// [x]#TODO:70 Fix animate update callback.
/**
 * ANIMATE.
 */
 WHS.init.prototype.start = function() {
   'use strict';

   var clock = new THREE.Clock();
   var scope = this;
   scope._events = new Events();

   scope._events.on("ready", function() {
    scope.update();
   })

   function reDraw(time) {

     requestAnimationFrame(reDraw);

     // Init stats.
     if (scope._stats)
       scope._stats.begin();

     // Merging data loop.
     for (var i = 0; i < Object.keys(scope.modellingQueue).length; i++) {
       if (scope.modellingQueue[i].morph) {
         scope.modellingQueue[i].visible.mixer.update( clock.getDelta() );
       }
     }

     scope.scene.simulate();

     //if (scope._settings.anaglyph)
       //scope.effect.render(scope.scene, scope._camera);

     // Controls.
     if (scope.controls) {
       scope.controls.update(Date.now() - scope.time);
       scope.time = Date.now();
     }

     // Effects rendering.
     if (scope._composer) {
       scope._composer.reset();

       scope._composer.render(scope.scene, scope._camera);

       scope._composer.eff.forEach(function(effect) {
         scope._composer.pass(effect);
       })

       scope._composer.toScreen();
     }

     // End helper.
     if (scope._stats)
       scope._stats.end();

     WHS.plugins.queue.forEach( function(loop) {
      if(loop.enabled)
        loop.func(time);
     });
   }

   this.update = reDraw;

   /* Events */

   scope._queue = [];
   scope._ready = [];

   scope.children.forEach(function(object) {
     scope._queue.push(object);
   });

   scope.children.forEach(function(object) {
     object._state.done(function() {
       scope._ready.push(object);
 
       if(scope._queue.length == scope._ready.length) {
         scope._events.emit("ready");
       }
     });
   });
 }
