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
WHS.init = function(params) {
  'use strict';

  console.log('WHS.init', WHS.REVISION);

  if (!THREE)
    console.warn('whitestormJS requires THREE.js. {Object} THREE not found.');
  if (!CANNON)
    console.warn('whitestormJS requires CANNON.js. {Object} CANNON not found.');
  if (!CANNON)
    console.warn('whitestormJS requires WAGNER.js. {Object} WAGNER not found.');

  var target = $.extend(true, {

    anaglyph: false,
    helper: false,
    stats: false,

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

    container: $('body')

  }, params);

  this.params = params;

  this.scene = new THREE.Scene();
  this.world = new CANNON.World();

  this.world.gravity.set(params.gravity.x, params.gravity.y, params.gravity.z);

  this.world.broadphase = new CANNON.NaiveBroadphase();

  this.world.quatNormalizeSkip = target.physics.quatNormalizeSkip;
  this.world.quatNormalizeFast = target.physics.quatNormalizeFast;

  var solver = new CANNON.GSSolver();

  this.world.defaultContactMaterial.contactEquationStiffness =
    target.physics.defMaterial.contactEquationStiffness;
  this.world.defaultContactMaterial.contactEquationRegularizationTime =
    target.physics.defMaterial.contactEquationRegularizationTime;

  solver.iterations = target.physics.solver.iterations;
  solver.tolerance = target.physics.solver.tolerance;

  this.world.solver = new CANNON.SplitSolver(solver);

  var physicsMaterial = new CANNON.Material("slipperyMaterial");

  var physicsContactMaterial = new CANNON.ContactMaterial(
    physicsMaterial,
    physicsMaterial,
    0.0, // friction coefficient
    0.3 // restitution
  );

  // We must add the contact materials to the world
  this.world.addContactMaterial(physicsContactMaterial);

  // Debug Renderer
  if (target.helper) {
    this.cannonDebugRenderer = new THREE.CannonDebugRenderer(
      this.scene,
      this.world
    );
  }

  if (target.stats) {
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
      console.warn([this.stats], "Please, apply stats mode [fps, ms, mb] .");
    }

    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.left = '0px';
    this.stats.domElement.style.bottom = '0px';

    target.container.append(this.stats.domElement);
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

  target.container.append(renderer.domElement);

  target.container.css({
    'margin': 0,
    'padding': 0,
    'position': 'relative',
    'overflow': 'hidden'
  });


  // NOTE: ==================== Composer. =======================

  if (params.wagner) {
    this.composer = new WAGNER.Composer(renderer);
    
    this.composer.setSize(target.rWidth, target.rHeight);

    $(this.composer.domElement).css({
      'width': target.width,
      'height': target.height
    });

    this.composer.autoClearColor = true;

    this.composer.reset();
    this.composer.render(this.scene, camera);

    this.composer.eff = [];
  }

  Object.assign(this, {
    _camera: camera,
    renderer: renderer,
    _settings: target,
    modellingQueue: []
  });

  // NOTE: ==================== Autoresize. ======================
  var scope = this;

  scope.animate(null, scope);

  if (params.autoresize)
    $(window).on('load resize', function() {
      scope._camera.aspect = window.innerWidth / window.innerHeight;

      scope._camera.updateProjectionMatrix();

      scope.renderer.setSize(target.rWidth, target.rHeight);

      $(scope.renderer.domElement).css({
          'width': window.innerWidth,
          'height': window.innerHeight
      });

      if (params.wagner) {
        scope.composer.setSize(target.rWidth, target.rHeight);

        $(scope.composer.domElement).css({
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
 WHS.init.prototype.animate = function(time, scope) {
   'use strict';

   var clock = new THREE.Clock();

   function reDraw() {

     requestAnimationFrame(reDraw);

     if (scope.stats)
       scope.stats.begin();

     if (scope.params.helper) 
       scope.cannonDebugRenderer.update();

     for (var i = 0; i < Object.keys(scope.modellingQueue).length; i++) {

       if (!scope.modellingQueue[i].onlyvis && !scope.modellingQueue[i].skip) {

         scope.modellingQueue[i].visible.position.copy(scope.modellingQueue[i].body.position);

         if (scope.modellingQueue[i].visible.quaternion)
           scope.modellingQueue[i].visible.quaternion.copy(scope.modellingQueue[i].body.quaternion);

       }

       if (scope.modellingQueue[i].morph) {
         scope.modellingQueue[i].visible.mixer.update( clock.getDelta() );
       }
     }

     scope.world.step(1 / 60);

     if (scope.anaglyph)
       scope.effect.render(scope.scene, scope._camera);

     if (scope.controls) {
       scope.controls.update(Date.now() - scope.time);
       scope.time = Date.now();
     }

     if (scope.composer) {
       scope.composer.reset();

       scope.composer.render(scope.scene, scope._camera);

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
