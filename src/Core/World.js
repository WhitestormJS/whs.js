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

        console.log( super.setParams( params ) );

        native.set( this, {} );

        console.log( super.getParams() );

        // INIT.
        this._initScene();
        this._initDOM();
        this._initStats();
        this._initCamera();
        this._initRenderer();
        this._initHelpers();

        // NOTE: ==================== Autoresize. ======================
        var scope = this;

        if ( this.getParams().autoresize )
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

        let scene = new Physijs.Scene;

        scene.setGravity(
            new THREE.Vector3(
                this.getParams().gravity.x, 
                this.getParams().gravity.y,
                this.getParams().gravity.z
            )
        );

        this.setScene( scene );

        // Array for processing.
        this.children = [];

    }

    /**
     * Set Physi.js scripts pathes.
     */
    _initPhysiJS() {

        this.simulate = true;

        Physijs.scripts.worker = this.getParams().path_worker;
        Physijs.scripts.ammo = this.getParams().path_ammo;

    }

    /**
     * Initialize DOM structure for whitestorm.
     */
    _initDOM() {

        this.getParams().container.style.margin = 0;
        this.getParams().container.style.padding = 0;
        this.getParams().container.style.position = 'relative';
        this.getParams().container.style.overflow = 'hidden';

        this._dom = document.createElement('div');
        this._dom.className = "whs";

        this.getParams().container.appendChild(this._dom);

        return this._dom;

    }

    /**
     * Inititialize stats plugin.
     */
    _initStats() {

        // Debug Renderer
        if (this.getParams().stats) {

            this._stats = new Stats();

            if (this.getParams().stats == "fps")
                this._stats.setMode(0);

            else if (this.getParams().stats == "ms")
                this._stats.setMode(1);

            else if (this.getParams().stats == "mb")
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

        this.setCamera( new WHS.PerspectiveCamera({
            camera: {
                fov: this.getParams().camera.aspect,
                aspect: this.getParams().width / this.getParams().height,
                near: this.getParams().camera.near,
                far: this.getParams().camera.far
            },

            pos: {
                x: this.getParams().camera.x,
                y: this.getParams().camera.y,
                z: this.getParams().camera.z
            }
        }) );

        this.getCamera().addTo( this );

    }

    /**
     * Create a renderer and apply it's options.
     */
    _initRenderer() {

        this.render = true;

        // Renderer.
        this.setRenderer( new THREE.WebGLRenderer() );
        this.getRenderer().setClearColor( this.getParams().background );

        // Shadowmap.
        this.getRenderer().shadowMap.enabled = this.getParams().shadowmap.enabled;
        this.getRenderer().shadowMap.type = this.getParams().shadowmap.type;
        this.getRenderer().shadowMap.cascade = true;

        this.getRenderer().setSize( 
            +( this.getParams().width * this.getParams().rWidth ).toFixed(), 
            +( this.getParams().height * this.getParams().rHeight ).toFixed()
        );

        this.getRenderer().render( this.getScene(), this.getCamera().getNative() );

        this._dom.appendChild( this.getRenderer().domElement );

        this.getRenderer().domElement.style.width = '100%';
        this.getRenderer().domElement.style.height = '100%';

    }

    /**
     * Add helpers to scene.
     */
    _initHelpers() {

        if ( this.getParams().helpers.axis )
            this.getScene().add( 
                new THREE.AxisHelper( 
                    this.getParams().helpers.axis.size 
                    ? this.getParams().helpers.axis.size 
                    : 5
                ) 
            );

        if ( this.getParams().helpers.grid )
            this.getScene().add( 
                new THREE.GridHelper( 
                    this.getParams().helpers.grid.size 
                    ? this.getParams().helpers.grid.size 
                    : 10,
                    this.getParams().helpers.grid.step 
                    ? this.getParams().helpers.grid.step 
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

            //if (scope.getParams().anaglyph)
            //  scope.effect.render(scope.scene, scope._camera);

            scope.__localTime = time;

            scope._process( clock );

            if ( scope.simulate ) scope.getScene().simulate();

            scope._updateControls();

            // Effects rendering.
            if ( scope._composer ) {

                scope._composer.reset();

                if ( scope.render ) scope._composer.render( 
                    scope.getScene(), 
                    scope.getCamera().getNative() 
                );

                scope._composer.pass( scope._composer.stack );

                scope._composer.toScreen();

            } else {

                if ( scope.render ) scope.getRenderer().render( 
                    scope.getScene(), 
                    scope.getCamera().getNative() 
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
                    this.children[i].getNative().mixer.update( delta );

            }

    }

    /**
     * This functon will scene properties when it's called.
     */
    setSize( width = 1, height = 1) {

        this.getCamera().getNative().aspect = width / height;
        this.getCamera().getNative().updateProjectionMatrix();
        
        this.getRenderer().setSize( 
            +(width * this.getParams().rWidth).toFixed(), 
            +(height * this.getParams().rHeight).toFixed()
        );

    }

    setScene( scene ) {
        return native.get( this ).scene = scene; 
    }

    getScene() {
        return native.get( this ).scene; 
    }

    setRenderer( renderer ) {
        return native.get( this ).renderer = renderer; 
    }

    getRenderer() {
        return native.get( this ).renderer; 
    }

    /**
     * Set a camera for rendering world.
     *
     * @params {WHS.Camera} camera - The camera to be rendered.
     */
    setCamera( camera ) {

        if ( camera instanceof WHS.Camera )
            native.get( this ).camera = camera;
        else
            console.error("@WHS.World: camera in not an instance of WHS.Camera.");

        return this;

    }

    getCamera() {
        return native.get( this ).camera;
    }

}
