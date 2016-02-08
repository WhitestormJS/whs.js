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
WHS.init = class {

    constructor (params) {

        'use strict';

        console.log('WHS.init', WHS.REVISION);

        if (!THREE)
            console.warn('whitestormJS requires THREE.js. {Object} THREE not found.');
        if (!Physijs)
            console.warn('whitestormJS requires PHYSI.js. {Object} Physijs not found.');
        if (!WAGNER)
            console.warn('whitestormJS requires WAGNER.js. {Object} WAGNER not found.');

        var target = api.extend(params, {

            anaglyph: false,
            helper: false,
            stats: false,
            wagner: true,
            autoresize: false,

            shadowmap: true,

            gravity: {
                x: 0,
                y: 0,
                z: 0
            },

            camera: {
                aspect: 75,
                near: 1,
                far: 1000,

                x: 0,
                y: 0,
                z: 0
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
            container: document.body,

            path_worker: '../libs/physijs_worker.js',
            path_ammo: '../libs/ammo.js'

        });

        this._settings = target;

        Physijs.scripts.worker = target.path_worker;
        Physijs.scripts.ammo = target.path_ammo;

        this.scene = new Physijs.Scene;

        this.scene.setGravity(new THREE.Vector3(params.gravity.x, params.gravity.y, params.gravity.z));

        // DOM INIT
        var whselement = document.createElement('div'); //.whs
        whselement.className = "whs";

        target.container.appendChild(whselement);

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

            whselement.appendChild(this._stats.domElement);
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

        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';

        whselement.appendChild(renderer.domElement);

        target.container.style.margin = 0;
        target.container.style.padding = 0;
        target.container.style.position = 'relative';
        target.container.style.overflow = 'hidden';

        // NOTE: ==================== Composer. =======================
        if (target.wagner) {

            this._composer = new WAGNER.Composer(renderer);
            
            this._composer.setSize(target.rWidth, target.rHeight);
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
            window.addEventListener('load resize', function() {
                scope._camera.aspect = window.innerWidth / window.innerHeight;

                scope._camera.updateProjectionMatrix();

                scope.renderer.setSize(target.rWidth, target.rHeight);

                /*if (params.wagner) {
                    scope._composer.setSize(target.rWidth, target.rHeight);

                    renderer.domElement.style.width = '100%';
                    renderer.domElement.style.height = '100%';
                }*/
        });

        return scope;

    }

    start() {

        'use strict';

        var clock = new THREE.Clock();
        var scope = this;
        scope._events = new Events();

        /*scope._events.on("ready", function() {
            scope.update();
        })*/

        function reDraw(time) {

            requestAnimationFrame(reDraw);

            // Init stats.
            if (scope._stats)
                 scope._stats.begin();

            // Merging data loop.
            for (var i = 0; i < scope.modellingQueue.length; i++) {
                if (scope.modellingQueue[i]._type == "morph") 
                    scope.modellingQueue[i].mesh.mixer.update( clock.getDelta() );
            }

            scope.scene.simulate();

            //if (scope._settings.anaglyph)
            //  scope.effect.render(scope.scene, scope._camera);

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

             WHS.loops.forEach( function(loop) {

                if(loop.enabled)
                    loop.func(time);
                
             });
        }

        this.update = reDraw;

        scope.update();

        /*scope._ready = [];

        var loading_queue = WHS.Watch(scope.children);

        loading_queue._queue.forEach(object => {
            object.ready.on("ready", function() {
               // object._state.then(() => {
                    scope._ready.push(object);

                    if(loading_queue._queue.length == scope._ready.length) 
                        scope._events.emit("ready");
                //});
            });

        });*/
    }

}
