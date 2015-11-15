/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * Init.
 *
 * @param {Object} THREE *THREE.JS* object. (REQUIRED)
 * @param {Object} CANNON *CANNON.JS* object. (REQUIRED)
 * @param {Object} params Parameters of initalize. (OPTIONAL)
 * @return {Object} Scope.
 */
WHS.init = function(THREE, CANNON, params) {
  'use strict';

  console.log('WHS.init', WHS.REVISION);

  params = params || {};

  this.anaglyph = params.anaglyph;

  api.def(params.gravity, {
    x: 0,
    y: -9.82 * 100,
    z: 0
  });

  // Local variables.
  this.threejs = THREE;
  this.cannonjs = CANNON;

  // Global variables (for WfHS.API).
  WHS.headers.threejs = this.threejs;
  WHS.headers.cannonjs = this.cannonjs;

  this.params = params;

  this.rWidth = window.innerWidth / 1.5;
  this.rHeight = window.innerHeight / 1.5

  this.scene = new this.threejs.Scene();
  this.world = new this.cannonjs.World();

  this.world.gravity.set(params.gravity.x, params.gravity.y, params.gravity.z);
  this.world.broadphase = new this.cannonjs.NaiveBroadphase();
  this.world.quatNormalizeSkip = 0;
  this.world.quatNormalizeFast = false;

  this.solver = new this.cannonjs.GSSolver();
  this.world.defaultContactMaterial.contactEquationStiffness = 1e8;
  this.world.defaultContactMaterial.contactEquationRegularizationTime = 3;
  this.solver.iterations = 20;
  this.solver.tolerance = 0;
  var split = true;

  if (split)
    this.world.solver = new this.cannonjs.SplitSolver(this.solver);
  else
    this.world.solver = this.solver;

  this.physicsMaterial = new this.cannonjs.Material("slipperyMaterial");
  this.physicsContactMaterial = new this.cannonjs.ContactMaterial(this.physicsMaterial,
    this.physicsMaterial,
    0.0, // friction coefficient
    0.3 // restitution
  );

  // We must add the contact materials to the world
  this.world.addContactMaterial(this.physicsContactMaterial);

  // Debug Renderer
  if (params.helper) {
    this.cannonDebugRenderer = new this.threejs.CannonDebugRenderer(this.scene, this.world);
  }

  if (params.stats) {
    this.stats = new Stats();
    if (params.stats == "fps")
      this.stats.setMode(0);
    else if (params.stats == "ms")
      this.stats.setMode(1);
    else if (params.stats == "mb")
      this.stats.setMode(1);
    else {
      this.stats.setMode(0);
      // WARN: console | stats mode.
      console.warn([this.stats], "Please, apply right stats mode [fps, ms, mb] .");
    }

    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.left = '0px';
    this.stats.domElement.style.bottom = '0px';

    document.body.appendChild(this.stats.domElement);
  }

  if (!this.params.camera) {
    this.params.camera = {};
  }

  this.params.camera.aspect = api.def(this.params.camera.aspect, 75);
  this.params.camera.near = api.def(this.params.camera.near, 1);
  this.params.camera.far = api.def(this.params.camera.far, 1000);

  console.log(this.params);

  this.camera = new this.threejs.PerspectiveCamera(
    this.params.camera.aspect,
    window.innerWidth / window.innerHeight,
    this.params.camera.near,
    this.params.camera.far
  );

  this.params.camera.x = api.def(this.params.camera.x, 0);
  this.params.camera.y = api.def(this.params.camera.y, 0);
  this.params.camera.z = api.def(this.params.camera.z, 0);
  this.camera.position.set(this.params.camera.x, this.params.camera.y, this.params.camera.z);

  api.merge(this.scene, this.camera);

  this.renderer = new this.threejs.WebGLRenderer();
  this.renderer.setClearColor(0x70DBFF);

  this.renderer.shadowMapEnabled = true;
  this.renderer.shadowMapSoft = true;

  if (this.anaglyph) {
    this.effect = new this.threejs.AnaglyphEffect(this.renderer);
    this.effect.setSize(this.rWidth, window.innerHeight);

    this.effect.render(this.scene, this.camera);
  } else {
    this.renderer.setSize(this.rWidth, this.rHeight);
    this.renderer.render(this.scene, this.camera);
  }

  $(this.renderer.domElement).css({
    'width': '100%',
    'height': '100%'
  });

  $(this.renderer.domElement).attr('');

  this.rootElement = $('body');

  $(this.renderer.domElement).css({
    'width': '100%',
    'height': '100%'
  });

  this.rootElement.append(this.renderer.domElement);

  this.rootElement.css({
    'margin': 0,
    'padding': 0,
    'position': 'relative',
    'overflow': 'hidden'
  });

  WHS.init.prototype.animate(null, this);

  // NOTE: =================================== Composer. ============================================

  if (params.wagner) {
    this.composer = new params.wagner.Composer(this.renderer);
    this.composer.setSize(this.rWidth, this.rHeight);
    $(this.composer.domElement).css({
      'width': '100%',
      'height': '100%'
    });
    this.renderer.autoClearColor = true;
    this.composer.reset();
    this.composer.render(this.scene, this.camera);
  }

  this.composer.eff = [];

  // NOTE: =================================== Autoresize. ==========================================
  var scope = this;

  if (params.autoresize)
    $(window).on('load resize', function() {
      scope.camera.aspect = window.innerWidth / window.innerHeight;
      scope.camera.updateProjectionMatrix();

      scope.renderer.setSize(scope.rWidth, scope.rHeight);
      $(scope.renderer.domElement).css({
        'width': '100%',
        'height': '100%'
      });

      if (params.wagner) {
        scope.composer.setSize(scope.rWidth, scope.rHeight);
        $(scope.composer.domElement).css({
          'width': '100%',
          'height': '100%'
        });
      }
    });

  return scope;
}

// [x]TODO: Fix animate update callback.
/**
 * ANIMATE.
 */
WHS.init.prototype.animate = function(time, scope) {
  'use strict';

  this.delta = 0,
    this.oldTimer = 0;

  this.timer = new Date().getTime();
  this.delta = this.timer - this.oldTime;
  this.oldTimer = this.timer;

  if (isNaN(this.delta) || this.delta > 1000 || this.delta == 0) {
    this.delta = 1000 / 60;
  }

  function reDraw() {
    if (scope.stats)
      scope.stats.begin();

    requestAnimationFrame(reDraw);

    if (scope.params.helper) {
      scope.cannonDebugRenderer.update();
    }

    for (var i = 0; i < Object.keys(WHS.objects).length; i++) {
      if (!WHS.objects[i].onlyvis) {
        WHS.objects[i].visible.position.copy(WHS.objects[i].body.position);
        WHS.objects[i].visible.quaternion.copy(WHS.objects[i].body.quaternion);
      }
      //WHS.objects[i].addCompoundFace();
    }

    scope.world.step(1 / 60);

    if (scope.anaglyph)
      scope.effect.render(scope.scene, scope.camera);
    else {}
    //scope.renderer.render(scope.scene, scope.camera);

    if (scope.controls) {
      scope.controls.update(Date.now() - scope.time);
      scope.time = Date.now();
    }

    if (scope.motionBlurEffect && scope.motionBlurEnable) {
      scope.motionBlurEffect.params.delta = 0;
      scope.motionBlurEnable = true;
    }

    if (scope.composer) {
      scope.composer.reset();

      scope.composer.render(scope.scene, scope.camera);

      scope.composer.eff.forEach(function(effect) {
        scope.composer.pass(effect);
      })

      scope.composer.toScreen();
    }

    if (scope.stats)
      scope.stats.end();
  }

  this.update = reDraw;

  this.update();
}
