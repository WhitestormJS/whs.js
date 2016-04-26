/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/** Class that initializates 3d world. */
WHS.World = class extends WHS.Object {
    /**
     * Create a 3D world and define defaults.
     *
     * @param {object} params - The scene settings object.
     * @return {World} A 3D world whs object.
     */
    constructor( params = {} ) {

        'use strict';

        if (!THREE)
            console.warn('WhitestormJS requires Three.js. {Object} THREE is undefined.');
        if (!Physijs)
            console.warn('WhitestormJS requires Physi.js. {Object} Physijs is undefined.');

        super({

            stats: false,
            autoresize: false,

            shadowmap: {
                enabled: true,
                type: THREE.PCFSoftShadowMap
            },

            helpers: {
                grid: false,
                axis: false
            },

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

            rWidth: 1, // Resolution(width).
            rHeight: 1, // Resolution(height).

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

        super.setParams( params );

        // INIT.
        this._initScene();
        this._initDOM();
        this._initStats();
        this._initCamera();
        this._initRenderer();
        this._initHelpers();

        // NOTE: ==================== Autoresize. ======================
        var scope = this;

        if ( this.__params.autoresize )
            window.addEventListener('resize', () => {
                scope.setSize( 
                    window.innerWidth, 
                    window.innerHeight
                );
            });

        return scope;

    }

    /**
     * Initialize Three.js scene object.
     */
    _initScene() {

        this._initPhysiJS();

        this.scene = new Physijs.Scene;

        this.scene.setGravity(
            new THREE.Vector3(
                this.__params.gravity.x, 
                this.__params.gravity.y,
                this.__params.gravity.z
            )
        );

        // Arrays for processing.
        this.children = [];

    }

    /**
     * Set Physi.js scripts pathes.
     */
    _initPhysiJS() {

        this.simulate = true;

        Physijs.scripts.worker = this.__params.path_worker;
        Physijs.scripts.ammo = this.__params.path_ammo;

    }

    /**
     * Initialize DOM structure for whitestorm.
     */
    _initDOM() {

        this.__params.container.style.margin = 0;
        this.__params.container.style.padding = 0;
        this.__params.container.style.position = 'relative';
        this.__params.container.style.overflow = 'hidden';

        this._dom = document.createElement('div');
        this._dom.className = "whs";

        this.__params.container.appendChild(this._dom);

        return this._dom;

    }

    /**
     * Inititialize stats plugin.
     */
    _initStats() {

        // Debug Renderer
        if (this.__params.stats) {

            this._stats = new Stats();

            if (this.__params.stats == "fps")
                this._stats.setMode(0);

            else if (this.__params.stats == "ms")
                this._stats.setMode(1);

            else if (this.__params.stats == "mb")
                this._stats.setMode(1);

            else {
                this._stats.setMode(0);

                console.warn([this._stats], "Please, apply stats mode [fps, ms, mb] .");
            }

            this._stats.domElement.style.position = 'absolute';
            this._stats.domElement.style.left = '0px';
            this._stats.domElement.style.bottom = '0px';

            this._dom.appendChild(this._stats.domElement);

        }

    }

    /**
     * Create a camera and add it to scene.
     */
    _initCamera() {

        this._camera = new WHS.PerspectiveCamera({
            camera: {
                fov: this.__params.camera.aspect,
                aspect: this.__params.width / this.__params.height,
                near: this.__params.camera.near,
                far: this.__params.camera.far
            }
        });

        this._camera.position.set(
            this.__params.camera.x,
            this.__params.camera.y,
            this.__params.camera.z
        );

        this._camera.addTo( this );

    }

    /**
     * Create a renderer and apply it's options.
     */
    _initRenderer() {

        this.render = true;

        // Renderer.
        this._renderer = new THREE.WebGLRenderer();
        this._renderer.setClearColor(this.__params.background);

        // Shadowmap.
        this._renderer.shadowMap.enabled = this.__params.shadowmap.enabled;
        this._renderer.shadowMap.type = this.__params.shadowmap.type;
        this._renderer.shadowMap.cascade = true;

        this._renderer.setSize( 
            +(this.__params.width * this.__params.rWidth).toFixed(), 
            +(this.__params.height * this.__params.rHeight).toFixed()
        );

        this._renderer.render(this.scene, this._camera.camera);

        this._dom.appendChild(this._renderer.domElement);

        this._renderer.domElement.style.width = '100%';
        this._renderer.domElement.style.height = '100%';

    }

    /**
     * Add helpers to scene.
     */
    _initHelpers() {

        if ( this.__params.helpers.axis )
            this.scene.add( 
                new THREE.AxisHelper( 
                    this.__params.helpers.axis.size 
                    ? this.__params.helpers.axis.size 
                    : 5
                ) 
            );

        if ( this.__params.helpers.grid )
            this.scene.add( 
                new THREE.GridHelper( 
                    this.__params.helpers.grid.size 
                    ? this.__params.helpers.grid.size 
                    : 10,
                    this.__params.helpers.grid.step 
                    ? this.__params.helpers.grid.step 
                    : 1
                ) 
            );

    }

    /**
     * Start animation.
     */
    start() {

        'use strict';

        var clock = new THREE.Clock();
        var scope = this;

        function reDraw(time) {

            requestAnimationFrame(reDraw);

            // Init stats.
            if (scope._stats)
                 scope._stats.begin();

            //if (scope.__params.anaglyph)
            //  scope.effect.render(scope.scene, scope._camera);

            scope.__localTime = time;

            scope._process( clock );

            if ( scope.simulate ) scope.scene.simulate();

            scope._updateControls();

            // Effects rendering.
            if ( scope._composer ) {

                scope._composer.reset();

                if ( scope.render ) scope._composer.render( 
                    scope.scene, 
                    scope._camera.camera 
                );

                scope._composer.pass( scope._composer.stack );

                scope._composer.toScreen();

            } else {

                if ( scope.render ) scope._renderer.render( 
                    scope.scene, 
                    scope._camera.camera 
                );

            }

            scope._execLoops( time );

            // End helper.
            if (scope._stats)
                scope._stats.end();
        }

        this._update = reDraw;

        scope._update();
    }

    /**
     * Execute all loops with a specific time.
     *
     * @params {number} time - The time value that will be passed to loops.
     */
    _execLoops( time ) {

        WHS.loops.forEach( loop => {
            if ( loop.enabled ) loop.func( loop.clock, time );
        } );

    }

    /**
     * Update controls time values.
     */
    _updateControls() {

        if (this.controls) {

            this.controls.update(Date.now() - this.time);
            this.time = Date.now();

        }

    }

    /**
     * Update morphs animations.
     *
     * @params {THREE.Clock} clock - The clock object, which.
     */
    _process( clock ) {

            let delta = clock.getDelta();

            for ( var i = 0; i < this.children.length; i++ ) {

                if ( this.children[i]._type == "morph" ) 
                    this.children[i].mesh.mixer.update( delta );

            }

    }

    /**
     * Set a camera for rendering world.
     *
     * @params {WHS.Camera} camera - The camera to be rendered.
     */
    setCamera( camera ) {

        if ( camera instanceof WHS.Camera )
            this._camera = camera;
        else
            console.error("@WHS.World: camera in not an instance of WHS.Camera.");

        return this;

    }

    /**
     * This functon will scene properties when it's called.
     */
    setSize( width = 1, height = 1) {

        this._camera.camera.aspect = width / height;
        this._camera.camera.updateProjectionMatrix();
        
        this._renderer.setSize( 
            +(width * this.__params.rWidth).toFixed(), 
            +(height * this.__params.rHeight).toFixed()
        );

    }

}
