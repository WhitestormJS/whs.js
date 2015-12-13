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

  this.renderer = new THREE.WebGLRenderer();
  this.renderer.setClearColor(target.background);

  this.renderer.shadowMap.enabled = true;
  this.renderer.shadowMap.type = THREE.BasicShadowMap;
  this.renderer.shadowMapType = THREE.PCFSoftShadowMap;

  if (target.anaglyph) {
    this.effect = new THREE.AnaglyphEffect(this.renderer);
    this.effect.setSize(target.rWidth, target.rHeight);

    this.effect.render(this.scene, camera);
  } else {
    this.renderer.setSize(target.rWidth, target.rHeight);
    this.renderer.render(this.scene, camera);
  }

  $(this.renderer.domElement).css({
    'width': target.width,
    'height': target.height
  });

  $(this.renderer.domElement).attr('');

  this.rootElement = $('body');

  target.container.append(this.renderer.domElement);

  target.container.css({
    'margin': 0,
    'padding': 0,
    'position': 'relative',
    'overflow': 'hidden'
  });


  // NOTE: ==================== Composer. =======================

  if (params.wagner) {
    this.composer = new params.wagner.Composer(this.renderer);
    this.composer.setSize(target.rWidth, target.rHeight);

    $(this.composer.domElement).css({
      'width': '100%',
      'height': '100%'
    });

    this.composer.autoClearColor = true;
    this.composer.reset();
    this.composer.render(this.scene, camera);
    this.composer.eff = [];
  }

  //console.log(this);

  Object.assign(this, {
    _camera: camera
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

  //console.log(scope);

  return scope;

}

// [x]#TODO:70 Fix animate update callback.
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

   var clock = new THREE.Clock();

   function reDraw() {

     var delta = clock.getDelta();

     if (scope.stats)
       scope.stats.begin();

     requestAnimationFrame(reDraw);

     if (scope.params.helper) {
       scope.cannonDebugRenderer.update();
     }

     for (var i = 0; i < Object.keys(WHS.objects).length; i++) {

       if (!WHS.objects[i].onlyvis && !WHS.objects[i].skip) {
         //console.log(WHS.objects[i].body.position.y);

         WHS.objects[i].visible.position.copy(WHS.objects[i].body.position);

         if (WHS.objects[i].visible.quaternion)
           WHS.objects[i].visible.quaternion.copy(WHS.objects[i].body.quaternion);

       }

       if (WHS.objects[i].morph) {
         WHS.objects[i].visible.mixer.update( delta );

       }
       //WHS.objects[i].addCompoundFace();
     }

     scope.world.step(1 / 60);

     if (scope.anaglyph)
       scope.effect.render(scope.scene, scope._camera);

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
