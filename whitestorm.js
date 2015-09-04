/*jslint white: true*/

/**
 * Javascript document by Alexander Buzin (2014-2015)
 */

/* ================ LOADING LIBS ================================================== */

// LIBRARY: Terrain Loader
//$.getScript('lib/TerrainLoader.js');


/* ================ MODERNIZING BROWSER API IF NOT EXIST ========================== */

if (typeof Array.isArray === 'undefined') {
    Array.isArray = function (obj) {
        'use strict';
        return Object.prototype.toString.call(obj) === '[object Array]';
    };
}

/* ================ WHITESTORM|JS ================================================= */
var WHS = {};

WHS.vars = {}; // GLOBAL variables
WHS.headers = {}; //GLOBAL headers, ex: url, script, library, specific api...
WHS.API = {};
WHS.ADD = {}; // some figures or shape funcs;
WHS.objects = [];
WHS.grounds = [];

var vars = WHS.vars,
    api = WHS.API;




// NOTE: WHS API merge *FUNCTION*
/**
 * MERGE.
 *
 * @param {Object} box Object to be merged. (REQUIRED)
 * @param {Object} rabbits Object to be added. (REQUIRED)
 */
WHS.API.merge = function (box, rabbits) {
    'use strict';
    if (arguments.length < 2)
        console.error("No rabbits for the box. (arguments)");
    else if (arguments.length = 2) {
        if (Array.isArray(rabbits) && rabbits.length <= 1)
            box.add(rabbits[0]);
        else if (Array.isArray(rabbits) && rabbits.length >= 2) {
            for (var i = 0; i < rabbits.length; i++) {
                box.add(rabbits[i]);
            }
        }
        else if (!Array.isArray(rabbits))
            box.add(rabbits);
    }
}

// NOTE: WHS API def *FUNCTION*.
/**
 * Defines variable. Makes convexPolyhedron object *CANNON.JS* from *THREE.JS* firure.
 *
 * @param {Object} thrObj Figure object *THREE.JS*. (REQUIRED)
 * @param {Object} thrObj Figure object *THREE.JS*. (REQUIRED)
 */
WHS.API.def = function (option, value) {
    'use strict';
    if (arguments.length < 2)
        console.error("Something wrong! option? value?");
    else if (arguments.length = 2) {
        option = option || value;
        return option;
    }
}

// NOTE: WHS API ConvexFigure *FUNCTION*.
/**
 * Trimesh figure. Makes convexPolyhedron object *CANNON.JS* from *THREE.JS* firure.
 *
 * @param {Object} thrObj Figure object *THREE.JS*. (REQUIRED)
 * @returns {Object} - Figure object *CANNON.JS*. (REQUIRED)
 */
WHS.API.ConvexFigure = function (thrObj) {
    'use strict';
    if (arguments.length < 1)
        console.error("No THREE.js geometry");
    else if (arguments.length = 1) {
        var points = new Array();
        var faces = new Array();

        thrObj.vertices.forEach(function (element) {
            points.push(new WHS.headers.cannonjs.Vec3(element.x, element.y, element.z));
        });

        thrObj.faces.forEach(function (element) {
            faces.push([element.a, element.b, element.c]);
        });

        return new WHS.headers.cannonjs.ConvexPolyhedron(points, faces);
    }
}

// NOTE: WHS API TrimeshFigure *FUNCTION*.
/**
 * Trimesh figure. Makes trimesh object *CANNON.JS* from *THREE.JS* firure.
 *
 * @param {Object} thrObj Figure object *THREE.JS*. (REQUIRED)
 */
WHS.API.TrimeshFigure = function (thrObj) {
    'use strict';

    if (arguments.length < 1)
        console.error("No THREE.js geometry");
    else if (arguments.length = 1) {
        var points = [];
        var faces = [];

        thrObj.vertices.forEach(function (element) {
            points.push(element.x);
            points.push(element.y);
            points.push(element.z);
        });

        thrObj.faces.forEach(function (element) {
            faces.push(element.a);
            faces.push(element.b);
            faces.push(element.c);
        });

        return new WHS.headers.cannonjs.Trimesh(points, faces);

    }
}

// NOTE: WHS API rotateBody *FUNCTION*.
/**
 * Rotate body. Rotates body object *CANNON.JS*.
 *
 * @param {Object} body Body object in *CANNON.JS*. (REQUIRED)
 * @param {Object} rotateSet Object of x, y, z coords. (REQUIRED)
 */
WHS.API.rotateBody = function (body, rotateSet) {
    'use strict';

    body.quaternion.x = Math.sin((Math.PI / 180) * rotateSet.x * 0.5);
    body.quaternion.y = Math.sin((Math.PI / 180) * rotateSet.y * 0.5);
    body.quaternion.z = Math.sin((Math.PI / 180) * rotateSet.z * 0.5);
    body.quaternion.w = Math.cos(90 * 0.5);

    return body;
}

// NOTE: WHS API texture *FUNCTION*.
/**
 * Texture. Loads texture object.
 *
 * @param {String} url Url adress of texture *JSON*. (REQUIRED)
 * @param {Object} options Parameters of texture. (REQUIRED)
 */
WHS.API.texture = function (url, options) {
    'use strict';

    var texture = WHS.headers.threejs.ImageUtils.loadTexture(url);

    if (options) {
        var opt = options;
        opt.offset = opt.offset || {
            x: 1,
            y: 1
        };

        opt.offset.x = opt.offset.x || 1;
        opt.offset.y = opt.offset.y || 1;

        opt.repeat = opt.repeat || {
            x: 1,
            y: 1
        };

        opt.repeat.x = opt.repeat.x || 1;
        opt.repeat.y = opt.repeat.y || 1;

        texture.wrapS = texture.wrapT = WHS.headers.threejs.RepeatWrapping;
        //texture.offset.set(opt.offset.x, opt.offset.y);
        texture.repeat.set(opt.repeat.x, opt.repeat.y);
    }

    return texture;
}

// NOTE: WHS API shape *FUNCTION*.
/**
 * Shape. Makes *THREE.JS* shape.
 *
 * @returns {Object} - *THREE.JS* shape object.
 */
WHS.ADD.shape = function () {
    return new WHS.headers.threejs.Shape();
}

// NOTE: WHS API init *FUNCTION*.
/**
 * Init.
 *
 * @param {Object} params Parameters of initalize. (REQUIRED)
 */
WHS.init = function (THREE, CANNON, params) {
    'use strict';

    params = params || {};

    vars.anaglyph = params.anaglyph;

    api.def(params.gravity, {
        x: 0,
        y: -9.82,
        z: 0
    });

    var THREEx = THREE,
        CANNONx = CANNON;

    WHS.headers.threejs = THREEx;
    WHS.headers.cannonjs = CANNONx;

    vars.params = params;

    vars.scene = new THREEx.Scene();
    vars.world = new CANNONx.World();

    vars.world.gravity.set(params.gravity.x, params.gravity.y, params.gravity.z);
    vars.world.broadphase = new CANNONx.NaiveBroadphase();
    vars.world.quatNormalizeSkip = 0;
    vars.world.quatNormalizeFast = false;

    vars.solver = new CANNON.GSSolver();
    vars.world.defaultContactMaterial.contactEquationStiffness = 1e9;
    vars.world.defaultContactMaterial.contactEquationRegularizationTime = 4;
    vars.solver.iterations = 7;
    vars.solver.tolerance = 0.1;
    var split = true;

    if (split)
        vars.world.solver = new CANNONx.SplitSolver(vars.solver);
    else
        vars.world.solver = vars.solver;

    vars.physicsMaterial = new CANNONx.Material("slipperyMaterial");
    vars.physicsContactMaterial = new CANNONx.ContactMaterial(vars.physicsMaterial,
        vars.physicsMaterial,
        0.0, // friction coefficient
        0.3 // restitution
    );

    // We must add the contact materials to the world
    vars.world.addContactMaterial(vars.physicsContactMaterial);

    // Debug Renderer
    if (params.helper) {
        vars.cannonDebugRenderer = new THREE.CannonDebugRenderer(vars.scene, vars.world);
    }

    vars.camera = new THREEx.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 10, 10000);

    api.merge(vars.scene, vars.camera);

    vars.renderer = new THREEx.WebGLRenderer();

    if (vars.anaglyph) {
        vars.effect = new THREEx.AnaglyphEffect(vars.renderer);
        vars.effect.setSize(window.innerWidth, window.innerHeight);

        vars.effect.render(vars.scene, vars.camera);
    } else {
        vars.renderer.setSize(window.innerWidth, window.innerHeight);
        vars.renderer.render(vars.scene, vars.camera);
    }

    $(vars.renderer.domElement).css({
        'width': '100%',
        'height': '100%'
    });

    $(vars.renderer.domElement).attr('');

    $('body').append(vars.renderer.domElement);

    $('body').css({
        'margin': 0,
        'padding': 0,
        'position': 'relative',
        'overflow': 'hidden'
    });

    WHS.animate();

    return this;
}



// NOTE: WHS figure *FUNCTION*
/**
 * Figure.
 *
 * @param {String} figure name *THREE.JS*. (REQUIRED)
 * @param {Object} options Figure options. (REQUIRED)
 */
WHS.create = function (figureType, options) {
    'use strict';

    var THREEx = WHS.headers.threejs;
    var CANNONx = WHS.headers.cannonjs;

    var opt = options;

    this.whsobject = true;

    this.releaseTime = new Date().getTime();

    opt.color = options.color || 0xffffff;
    opt.mass = options.mass || 0;

    opt.pos = typeof options.pos == "object" ? options.pos : {
        x: 0,
        y: 0,
        z: 0
    };

    opt.rot = typeof options.pos == "object" ? options.pos : {
        x: 0,
        y: 0,
        z: 0
    };

    opt.material = options.materialOptions || {};
    opt.geometry = options.geometryOptions || {};

    switch (opt.material.type) {
    case "basic":
        this.materialType = new THREEx.MeshBasicMaterial(opt.material);
        break;
    case "linebasic":
        this.materialType = new THREEx.LineBasicMaterial(opt.material);
        break;
    case "linedashed":
        this.materialType = new THREEx.LineDashedMaterial(opt.material);
        break;
    case "material":
        this.materialType = new THREEx.Material(opt.material);
        break;
    case "depth":
        this.materialType = new THREEx.MeshDepthMaterial(opt.material);
        break;
    case "face":
        this.materialType = new THREEx.MeshFaceMaterial(opt.material.materials);
        break;
    case "lambert":
        this.materialType = new THREEx.MeshLambertMaterial(opt.material);
        break;
    case "normal":
        this.materialType = new THREEx.MeshNormalMaterial(opt.material);
        break;
    case "phong":
        this.materialType = new THREEx.MeshPhongMaterial(opt.material);
        break;
    case "pointcloud":
        this.materialType = new THREEx.PointCloudMaterial(opt.material);
        break;
    case "rawshader":
        this.materialType = new THREEx.RawShaderMaterial(opt.material);
        break;
    case "shader":
        this.materialType = new THREEx.ShaderMaterial(opt.material);
        break;
    case "spritecanvas":
        this.materialType = new THREEx.SpriteCanvasMaterial(opt.material);
        break;
    case "sprite":
        this.materialType = new THREEx.SpriteMaterial(opt.material);
        break;
    }


    switch (figureType) {
        case "sphere":
            var key = 0;
            api.def(opt.geometry.segmentA, 32);
            api.def(opt.geometry.segmentB, 32);

            WHS.objects.forEach(function (el, index) {
                if (el.type == "sphere") {
                    key++;
                }
            });

            this.type = "sphere";
            this.name = opt.name || "sphere" + key;
            this.visible = new THREEx.Mesh(new THREEx.SphereGeometry(opt.geometry.radius, opt.geometry.segmentA, opt.geometry.segmentB), this.materialType);

            this.visible.name = this.name;
            this.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            this.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            api.merge(vars.scene, this.visible);

            if (!options.onlyvis) {
                this.physic = new CANNONx.Sphere(opt.geometry.radius);

                this.body = new CANNONx.Body({
                    mass: opt.mass
                });

                this.body.linearDamping = 0.9; //default
                this.body.addShape(this.physic);
                this.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                this.body.quaternion.copy(this.visible.quaternion);
                this.body.name = this.name;

                api.merge(vars.world, this.body);
            } else {
                this.onlyvis = true;
            }

            WHS.objects.push(this);

            break;
        case "cube":
            var key = 0;

            api.def(opt.geometry.width, 1);
            api.def(opt.geometry.height, 1);
            api.def(opt.geometry.depth, 1);

            WHS.objects.forEach(function (el, index) {
                if (el.type == "cube") {
                    key++;
                }
            });

            this.type = "cube";
            this.name = opt.name || "cube" + key;
            this.visible = new THREEx.Mesh(new THREEx.BoxGeometry(opt.geometry.width, opt.geometry.height, opt.geometry.depth), this.materialType);

            this.visible.name = this.name;
            this.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            this.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            api.merge(vars.scene, this.visible);

            if (!options.onlyvis) {
                this.physic = new CANNONx.Box(new CANNONx.Vec3(opt.geometry.width * 0.5, opt.geometry.height * 0.5, opt.geometry.depth * 0.5));
                this.body = new CANNONx.Body({
                    mass: opt.mass
                });

                this.body.linearDamping = 0.9; // Default value.
                this.body.addShape(this.physic);
                this.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                this.body.quaternion.copy(this.visible.quaternion);
                this.body.name = this.name;
                api.merge(vars.world, this.body);
            } else {
                this.onlyvis = true;
            }

            WHS.objects.push(this);

            break;
        case "cylinder":
            var key = 0;

            api.def(opt.geometry.radiusTop, 1);
            api.def(opt.geometry.radiusBottom, 1);
            api.def(opt.geometry.height, 1);
            api.def(opt.geometry.radiusSegments, 32);

            WHS.objects.forEach(function (el, index) {
                if (el.type == "cylinder") {
                    key++;
                }
            });

            this.type = "cylinder";
            this.name = opt.name || "cylinder" + key;
            this.visible = new THREEx.Mesh(new THREEx.CylinderGeometry(opt.geometry.radiusTop, opt.geometry.radiusBottom, opt.geometry.height, opt.geometry.radiusSegments), this.materialType);

            this.visible.name = this.name;
            this.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            this.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            api.merge(vars.scene, this.visible);

            if (!options.onlyvis) {
                this.physic = new CANNONx.Cylinder(opt.geometry.radiusTop, opt.geometry.radiusBottom, opt.geometry.height, opt.geometry.radiusSegments);
                this.body = new CANNONx.Body({
                    mass: opt.mass
                });
                this.body.linearDamping = 0.9; // Default value.
                this.body.addShape(this.physic);
                this.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                this.body.quaternion.copy(this.visible.quaternion);
                this.body.name = this.name;
                api.merge(vars.world, this.body);
            } else {
                this.onlyvis = true;
            }

            WHS.objects.push(this);

            break;
        case "dodecahedron":
            var key = 0;

            api.def(opt.geometry.radius, 1);
            api.def(opt.geometry.detail, 0);

            WHS.objects.forEach(function (el, index) {
                if (el.type == "dodecahedron") {
                    key++;
                }
            });

            this.type = "dodecahedron";
            this.name = opt.name || "dodecahedron" + key;
            this.visible = new THREEx.Mesh(new THREEx.DodecahedronGeometry(opt.geometry.radius, opt.geometry.detail), this.materialType);

            this.visible.name = this.name;
            this.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            this.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            api.merge(vars.scene, this.visible);

            if (!options.onlyvis) {
                this.physic = new WHS.API.ConvexFigure(this.visible.geometry);
                this.body = new CANNONx.Body({
                    mass: opt.mass
                });
                this.body.linearDamping = 0.9; // Default value.
                this.body.addShape(this.physic);
                this.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                this.body.quaternion.copy(this.visible.quaternion);
                this.body.name = this.name;
                api.merge(vars.world, this.body);
            } else {
                this.onlyvis = true;
            }

            WHS.objects.push(this);

            break;
        case "extrude":
            var key = 0;

            api.def(opt.geometry.shapes, []);
            api.def(opt.geometry.options, {});

            WHS.objects.forEach(function (el, index) {
                if (el.type == "extrude") {
                    key++;
                }
            });

            this.type = "extrude";
            this.name = opt.name || "extrude" + key;
            this.visible = new THREEx.Mesh(new THREEx.ExtrudeGeometry(opt.geometry.shapes, opt.geometry.options), this.materialType);

            this.visible.name = this.name;
            this.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            this.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            api.merge(vars.scene, this.visible);

            if (!options.onlyvis) {
                this.physic = new WHS.API.ConvexFigure(this.visible.geometry);
                this.body = new CANNONx.Body({
                    mass: opt.mass
                });
                this.body.linearDamping = 0.9; // Default value.
                this.body.addShape(this.physic);
                this.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                this.body.quaternion.copy(this.visible.quaternion);
                this.body.name = this.name;
                api.merge(vars.world, this.body);
            } else {
                this.onlyvis = true;
            }

            WHS.objects.push(this);

            break;
        case "icosahedron":
            var key = 0;

            api.def(opt.geometry.radius, 1);
            api.def(opt.geometry.detail, 0);

            WHS.objects.forEach(function (el, index) {
                if (el.type == "icosahedron") {
                    key++;
                }
            });

            this.type = "icosahedron";
            this.name = opt.name || "icosahedron" + key;
            this.visible = new THREEx.Mesh(new THREEx.IcosahedronGeometry(opt.geometry.radius, opt.geometry.detail), this.materialType);

            this.visible.name = this.name;
            this.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            this.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            api.merge(vars.scene, this.visible);

            if (!options.onlyvis) {
                this.physic = new WHS.API.ConvexFigure(this.visible.geometry);
                this.body = new CANNONx.Body({
                    mass: opt.mass
                });
                this.body.linearDamping = 0.9; // Default value.
                this.body.addShape(this.physic);
                this.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                this.body.quaternion.copy(this.visible.quaternion);
                this.body.name = this.name;
                api.merge(vars.world, this.body);
            } else {
                this.onlyvis = true;
            }

            WHS.objects.push(this);

            break;
        case "lathe":
            var key = 0;

            api.def(opt.geometry.points, []);

            WHS.objects.forEach(function (el, index) {
                if (el.type == "lathe") {
                    key++;
                }
            });

            this.type = "lathe";
            this.name = opt.name || "lathe" + key;
            this.visible = new THREEx.Mesh(new THREEx.LatheGeometry(opt.geometry.points), this.materialType);

            this.visible.name = this.name;
            this.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            this.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            api.merge(vars.scene, this.visible);

            if (!options.onlyvis) {
                this.physic = new WHS.API.ConvexFigure(this.visible.geometry);
                this.body = new CANNONx.Body({
                    mass: opt.mass
                });
                this.body.linearDamping = 0.9; // Default value.
                this.body.addShape(this.physic);
                this.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                this.body.quaternion.copy(this.visible.quaternion);
                this.body.name = this.name;
                api.merge(vars.world, this.body);
            } else {
                this.onlyvis = true;
            }

            WHS.objects.push(this);

            break;
        case "octahedron":
            var key = 0;

            api.def(opt.geometry.radius, 1);
            api.def(opt.geometry.detail, 0);

            WHS.objects.forEach(function (el, index) {
                if (el.type == "octahedron") {
                    key++;
                }
            });

            this.type = "octahedron";
            this.name = opt.name || "octahedron" + key;
            this.visible = new THREEx.Mesh(new THREEx.OctahedronGeometry(opt.geometry.radius, opt.geometry.detail), this.materialType);

            this.visible.name = this.name;
            this.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            this.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            api.merge(vars.scene, this.visible);

            if (!options.onlyvis) {
                this.physic = new WHS.API.ConvexFigure(this.visible.geometry);
                this.body = new CANNONx.Body({
                    mass: opt.mass
                });
                this.body.linearDamping = 0.9; // Default value.
                this.body.addShape(this.physic);
                this.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                this.body.quaternion.copy(this.visible.quaternion);
                this.body.name = this.name;
                api.merge(vars.world, this.body);
            } else {
                this.onlyvis = true;
            }

            WHS.objects.push(this);

            break;
        case "parametric":
            var key = 0;

            api.def(opt.geometry.func, function () {});
            api.def(opt.geometry.slices, 10);
            api.def(opt.geometry.stacks, 10);

            WHS.objects.forEach(function (el, index) {
                if (el.type === "parametric") {
                    key++;
                }
            });

            this.type = "parametric";
            this.name = opt.name || "parametric" + key;
            this.visible = new THREEx.Mesh(new THREEx.ParametricGeometry(opt.geometry.func, opt.geometry.slices, opt.geometry.stacks), this.materialType);

            this.visible.name = this.name;
            this.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            this.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            api.merge(vars.scene, this.visible);

            if (!options.onlyvis) {
                this.physic = new WHS.API.ConvexFigure(this.visible.geometry);
                this.body = new CANNONx.Body({
                    mass: opt.mass
                });
                this.body.linearDamping = 0.9; // Default value.
                this.body.addShape(this.physic);
                this.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                this.body.quaternion.copy(this.visible.quaternion);
                this.body.name = this.name;
                api.merge(vars.world, this.body);
            } else {
                this.onlyvis = true;
            }

            WHS.objects.push(this);

            break;
        case "plane":
            var key = 0;

            api.def(opt.geometry.func, function () {});
            api.def(opt.geometry.width, 10);
            api.def(opt.geometry.height, 10);
            api.def(opt.geometry.segments, 32);

            WHS.objects.forEach(function (el, index) {
                if (el.type == "plane") {
                    key++;
                }
            });

            this.type = "plane";
            this.name = opt.name || "plane" + key;
            this.visible = new THREEx.Mesh(new THREEx.PlaneBufferGeometry(opt.geometry.width, opt.geometry.height, opt.geometry.segments), this.materialType);

            this.visible.name = this.name;
            this.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            this.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            api.merge(vars.scene, this.visible);

            if (!options.onlyvis) {
                this.physic = new WHS.API.ConvexFigure(this.visible.geometry);
                this.body = new CANNONx.Body({
                    mass: opt.mass
                });
                this.body.linearDamping = 0.9; // Default value.
                this.body.addShape(this.physic);
                this.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                this.body.quaternion.copy(this.visible.quaternion);
                this.body.name = this.name;
                api.merge(vars.world, this.body);
            } else {
                this.onlyvis = true;
            }

            WHS.objects.push(this);

            break;
        case "polyhedron":
            var key = 0;

            api.def(opt.geometry.verticesOfCube, []);
            api.def(opt.geometry.indicesOfFaces, []);
            api.def(opt.geometry.radius, 1);
            api.def(opt.geometry.detail, 1);

            WHS.objects.forEach(function (el, index) {
                if (el.type == "polyhedron") {
                    key++;
                }
            });

            this.type = "polyhedron";
            this.name = opt.name || "polyhedron" + key;
            this.visible = new THREEx.Mesh(new THREEx.PolyhedronGeometry(opt.geometry.verticesOfCube, opt.geometry.indicesOfFaces), this.materialType);

            this.visible.name = this.name;
            this.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            this.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            api.merge(vars.scene, this.visible);

            if (!options.onlyvis) {
                this.physic = new WHS.API.ConvexFigure(this.visible.geometry);
                this.body = new CANNONx.Body({
                    mass: opt.mass
                });
                this.body.linearDamping = 0.9; // Default value.
                this.body.addShape(this.physic);
                this.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                this.body.quaternion.copy(this.visible.quaternion);
                this.body.name = this.name;
                api.merge(vars.world, this.body);
            } else {
                this.onlyvis = true;
            }

            WHS.objects.push(this);

            break;
        case "ring":
            var key = 0;

            api.def(opt.geometry.innerRadius, 0);
            api.def(opt.geometry.outerRadius, 50);
            api.def(opt.geometry.thetaSegments, 1);
            api.def(opt.geometry.phiSegments, 8);
            api.def(opt.geometry.thetaStart, 0);
            api.def(opt.geometry.thetaLength, Math.PI * 2);

            WHS.objects.forEach(function (el, index) {
                if (el.type == "ring") {
                    key++;
                }
            });

            this.type = "ring";
            this.name = opt.name || "ring" + key;
            this.visible = new THREEx.Mesh(new THREE.TorusGeometry(opt.geometry.outerRadius, (opt.geometry.outerRadius - opt.geometry.innerRadius) / 2, opt.geometry.thetaSegments, opt.geometry.phiSegments), this.materialType);

            this.visible.scale.z = 1 / (opt.geometry.outerRadius - opt.geometry.innerRadius) * 2;
            this.visible.name = this.name;
            this.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            this.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            api.merge(vars.scene, this.visible);

            if (!options.onlyvis) {
                this.physic = CANNONx.Trimesh.createTorus(opt.geometry.outerRadius, (opt.geometry.outerRadius - opt.geometry.innerRadius) / 2, opt.geometry.thetaSegments, opt.geometry.phiSegments);
                this.physic.scale.z = 1 / (opt.geometry.outerRadius - opt.geometry.innerRadius) * 2;
                this.body = new CANNONx.Body({
                    mass: opt.mass
                });
                this.body.linearDamping = 0.9; // Default value.
                this.body.addShape(this.physic);
                this.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                this.body.quaternion.copy(this.visible.quaternion);
                this.body.name = this.name;


                api.merge(vars.world, this.body);
            } else {
                this.onlyvis = true;
            }

            WHS.objects.push(this);

            break;
        case "shape":
            var key = 0;

            WHS.objects.forEach(function (el, index) {
                if (el.type == "shape") {
                    key++;
                }
            });

            this.type = "shape";
            this.name = opt.name || "shape" + key;
            this.visible = new THREEx.Mesh(new THREEx.ShapeGeometry(opt.geometry.shapes), this.materialType);

            this.visible.name = this.name;
            this.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            this.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            api.merge(vars.scene, this.visible);

            this.onlyvis = true;

            // WARN: console | 2d to 3d.
            console.warn('This is not physic object. 2D!', [this]);

            WHS.objects.push(this);

            break;
        case "tetrahedron":
            var key = 0;

            api.def(opt.geometry.radius, 1);
            api.def(opt.geometry.detail, 0);

            WHS.objects.forEach(function (el, index) {
                if (el.type == "tetrahedron") {
                    key++;
                }
            });

            this.type = "tetrahedron";
            this.name = opt.name || "tetrahedron" + key;
            this.visible = new THREEx.Mesh(new THREEx.TetrahedronGeometry(opt.geometry.radius, opt.geometry.detail), this.materialType);
            this.visible.name = this.name;
            this.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            this.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);
            api.merge(vars.scene, this.visible);

            if (!options.onlyvis) {
                this.physic = new WHS.API.ConvexFigure(this.visible.geometry);
                this.body = new CANNONx.Body({
                    mass: opt.mass
                });
                this.body.linearDamping = 0.9; // Default value.
                this.body.addShape(this.physic);
                this.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                this.body.quaternion.copy(this.visible.quaternion);
                this.body.name = this.name;
                api.merge(vars.world, this.body);
            } else {
                this.onlyvis = true;
            }

            WHS.objects.push(this);

            break;
        case "text":
            var key = 0;

            opt.geometry.parameters = opt.geometry.parameters || {};

            api.def(opt.geometry.text, "Hello World!");
            api.def(opt.geometry.parameters.size, 1);
            api.def(opt.geometry.parameters.height, 50);
            api.def(opt.geometry.parameters.curveSegments, 1);
            api.def(opt.geometry.parameters.font, "Adelle"); // string !
            api.def(opt.geometry.parameters.weight, "normal"); // string !
            api.def(opt.geometry.parameters.style, "normal");
            api.def(opt.geometry.parameters.bevelEnabled, false);
            api.def(opt.geometry.parameters.bevelThickness, 10);
            api.def(opt.geometry.parameters.bevelSize, 8);

            WHS.objects.forEach(function (el, index) {
                if (el.type == "text") {
                    key++;
                }
            });

            this.type = "text";
            this.name = opt.name || "text" + key;
            this.visible = new THREEx.Mesh(new THREEx.TextGeometry(opt.geometry.text, opt.geometry.parameters), this.materialType);
            this.visible.name = this.name;
            this.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            this.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            api.merge(vars.scene, this.visible);

            if (!options.onlyvis) {
                this.physic = new WHS.API.TrimeshFigure(this.visible.geometry);
                this.body = new CANNONx.Body({
                    mass: opt.mass
                });
                this.body.linearDamping = 0.9; // Default value.
                this.body.addShape(this.physic);
                this.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                this.body.quaternion.copy(this.visible.quaternion);
                this.body.name = this.name;
                api.merge(vars.world, this.body);
            } else {
                this.onlyvis = true;
            }

            WHS.objects.push(this);

            break;
        case "torus":
            var key = 0;

            api.def(opt.geometry.radius, 100);
            api.def(opt.geometry.tube, 40);
            api.def(opt.geometry.radialSegments, 8);
            api.def(opt.geometry.tubularSegments, 6);
            api.def(opt.geometry.arc, Math.PI * 2);

            WHS.objects.forEach(function (el, index) {
                if (el.type == "torus") {
                    key++;
                }
            });

            this.type = "torus";
            this.name = opt.name || "torus" + key;
            this.visible = new THREEx.Mesh(new THREE.TorusGeometry(opt.geometry.radius, opt.geometry.tube, opt.geometry.radialSegments, opt.geometry.tubularSegments, opt.geometry.arc), this.materialType);

            this.visible.name = this.name;
            this.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            this.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            api.merge(vars.scene, this.visible);

            if (!options.onlyvis) {
                this.physic = CANNONx.Trimesh.createTorus(opt.geometry.radius, opt.geometry.tube, opt.geometry.radialSegments, opt.geometry.tubularSegments);
                this.body = new CANNONx.Body({
                    mass: opt.mass
                });
                this.body.linearDamping = 0.9; // Default value.
                this.body.addShape(this.physic);
                this.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                console.log(opt.rot.x);
                this.body.quaternion.copy(this.visible.quaternion);
                this.body.name = this.name;
                api.merge(vars.world, this.body);
            } else {
                this.onlyvis = true;
            }

            WHS.objects.push(this);

            break;
        case "torusknot":
            var key = 0;

            api.def(opt.geometry.radius, 100);
            api.def(opt.geometry.tube, 40);
            api.def(opt.geometry.radialSegments, 8);
            api.def(opt.geometry.tubularSegments, 6);
            api.def(opt.geometry.arc, Math.PI * 2);

            WHS.objects.forEach(function (el, index) {
                if (el.type == "torusknot") {
                    key++;
                }
            });

            this.type = "torusknot";
            this.name = opt.name || "torusknot" + key;
            this.visible = new THREEx.Mesh(new THREE.TorusKnotGeometry(opt.geometry.radius, opt.geometry.tube, opt.geometry.radialSegments, opt.geometry.tubularSegments, opt.geometry.p, opt.geometry.q, opt.geometry.heightScale), this.materialType);

            this.visible.name = this.name;
            this.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            console.log(opt.rot.x + opt.rot.y + opt.rot.z)
            this.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            api.merge(vars.scene, this.visible);

            if (!options.onlyvis) {
                this.physic = new WHS.API.TrimeshFigure(this.visible.geometry);
                this.body = new CANNONx.Body({
                    mass: opt.mass
                });
                this.body.linearDamping = 0.9; // Default value.
                this.body.addShape(this.physic);
                this.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                console.log(opt.rot.x);
                this.body.quaternion.copy(this.visible.quaternion);
                this.body.name = this.name;
                api.merge(vars.world, this.body);
            } else {
                this.onlyvis = true;
            }

            WHS.objects.push(this);

            break;
        case "tube":
            var key = 0;

            // FIXME: fix to WHS.API (not here)
            vars.CustomSinCurve = THREEx.Curve.create(
                function (scale) { //custom curve constructor
                    this.scale = scale || 1;
                },
                function (t) { //getPoint: t is between 0-1
                    var tx = t * 3 - 1.5,
                        ty = Math.sin(2 * Math.PI * t),
                        tz = 0;
                    return new THREEx.Vector3(tx, ty, tz).multiplyScalar(this.scale);
                }
            );

            if (!opt.geometry.path) {
                opt.geometry.path = new vars.CustomSinCurve(100);
            }

            api.def(opt.geometry.segments, 20);
            api.def(opt.geometry.radius, 2);
            api.def(opt.geometry.radiusSegments, 8);
            api.def(opt.geometry.closed, false);

            WHS.objects.forEach(function (el, index) {
                if (el.type == "tube") {
                    key++;
                }
            });

            this.type = "tube";
            this.name = opt.name || "tube" + key;
            this.visible = new THREEx.Mesh(new THREEx.TubeGeometry(opt.geometry.path, opt.geometry.segments, opt.geometry.radius, opt.geometry.radiusSegments, opt.geometry.closed), this.materialType);

            this.visible.name = this.name;
            this.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            this.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            api.merge(vars.scene, this.visible);

            if (!options.onlyvis) {
                this.physic = new WHS.API.TrimeshFigure(this.visible.geometry);
                this.body = new CANNONx.Body({
                    mass: opt.mass
                });
                this.body.linearDamping = 0.9; // Default value.
                this.body.addShape(this.physic);
                this.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                console.log(opt.rot.x);
                this.body.quaternion.copy(this.visible.quaternion);
                this.body.name = this.name;
                api.merge(vars.world, this.body);
            } else {
                this.onlyvis = true;
            }

            WHS.objects.push(this);

            break;
    }
}

// NOTE: WHS ground *FUNCTION*
/**
 * Ground.
 *
 * @param {String} type Ground/Terrain type. (REQUIRED)
 * @param {Object} size Size of ground. (REQUIRED)
 * @param {Object} material Material type and options. (REQUIRED)
 * @param {Object} pos Position of ground in 3D space. (REQUIRED)
 * @param {Object} genmap Map object with heights of ground. (OPTIONAL)
 */
WHS.addGround = function (type, size, material, pos, genmap) {
    'use strict';

    var THREEx = WHS.headers.threejs;
    var CANNONx = WHS.headers.cannonjs;

    api.def(size, {
        width: 100,
        height: 100
    });

    switch (material.type) {
        case "basic":
            this.materialType = new THREEx.MeshBasicMaterial(material);
        break;

        case "linebasic":
            this.materialType = new THREEx.LineBasicMaterial(material);
        break;

        case "linedashed":
            this.materialType = new THREEx.LineDashedMaterial(material);
        break;

        case "material":
            this.materialType = new THREEx.Material(material);
        break;

        case "depth":
            this.materialType = new THREEx.MeshDepthMaterial(material);
        break;

        case "face":
            this.materialType = new THREEx.MeshFaceMaterial(material);
        break;

        case "lambert":
            this.materialType = new THREEx.MeshLambertMaterial(material);
        break;

        case "normal":
            this.materialType = new THREEx.MeshNormalMaterial(material);
        break;

        case "phong":
            this.materialType = new THREEx.MeshPhongMaterial(material);
        break;

        case "pointcloud":
            this.materialType = new THREEx.PointCloudMaterial(material);
        break;

        case "rawshader":
            this.materialType = new THREEx.RawShaderMaterial(material);
        break;

        case "shader":
            this.materialType = new THREEx.ShaderMaterial(material);
        break;

        case "spritecanvas":
            this.materialType = new THREEx.SpriteCanvasMaterial(material);
        break;

        case "sprite":
            this.materialType = new THREEx.SpriteMaterial(material);
        break;
    }

    switch (type) {
        case "smooth":
            this.visible = new THREEx.Mesh(new THREEx.PlaneBufferGeometry(size.width, size.height, 1, 1), this.materialType);
            this.visible.rotation.set(-90 / 180 * Math.PI, 0, 0);
            this.visible.position.set(pos.x, pos.y, pos.z);
            this.physic = new CANNONx.Plane(size.width, size.height);
            this.body = new CANNONx.Body({
                mass: 0
            });
            this.body.linearDamping = 0.9; // Default value.
            this.body.addShape(this.physic);
            this.body.position.set(pos.x, pos.y, pos.z);
            this.body.quaternion.setFromAxisAngle(new CANNONx.Vec3(1, 0, 0), -Math.PI / 2);
            this.body.name = this.name;
            api.merge(vars.world, this.body);
            api.merge(vars.scene, this.visible);
            break;
        case "infinitySmooth":
            this.visible = new THREEx.Mesh(new THREEx.PlaneBufferGeometry(size.width, size.height, 1, 1), this.materialType);
            this.visible.rotation.set(-90 / 180 * Math.PI, 0, 0);
            this.visible.position.set(pos.x, pos.y, pos.z);
            this.physic = new CANNONx.Plane(size.width, size.height);
            this.body = new CANNONx.Body({
                mass: 0
            });
            this.body.linearDamping = 0.9; // Default value.
            this.body.addShape(this.physic);
            this.body.position.set(pos.x, pos.y, pos.z);
            this.body.quaternion.setFromAxisAngle(new CANNONx.Vec3(1, 0, 0), -Math.PI / 2);
            this.body.name = this.name;
            api.merge(vars.world, this.body);
            api.merge(vars.scene, this.visible);
            break;
        // FUTURE: terrain add.
        case "terrain":
            var detalityX = size.detalityX || 10;
            var detalityY = size.detalityY || 10;
            this.detalityX = detalityX;
            this.detalityY = detalityY;

            // FIXME: fix heights loading

            var terrainGeometry = TERRAINGEN.Get({
                alea: RAND_MT,
                generator: PN_GENERATOR,
                width: 250,
                height: 250,
                widthSegments: 125,
                heightSegments: 125,
                depth: 50,
                param: 3,
                filterparam: 1,
                filter: [ BLUR_FILTER ],
                postgen: [ MOUNTAINS_COLORS ],
                effect: [ DEPTHNOISE_EFFECT ]
            });

            this.visible = new THREEx.Mesh(terrainGeometry, this.materialType);
            console.log(new THREE.Geometry().fromBufferGeometry( terrainGeometry ));
            this.visible.scale.x = 1;
            this.visible.scale.y = 1;
            this.visible.position.set(pos.x, pos.y, pos.z);
            this.physic = new WHS.API.TrimeshFigure(new THREE.Geometry().fromBufferGeometry( terrainGeometry ));
            console.log(this.physic);
            console.log(this.visible);
            this.body = new CANNONx.Body({
                mass: 0
            });
            this.body.linearDamping = 0.9; // Default value.
            this.body.addShape(this.physic);
            this.body.position.set(pos.x, pos.y, pos.z);
            this.physic.scale.x = 1;
            this.physic.scale.y = 1;
            this.body.name = this.name;
            api.merge(vars.world, this.body);
            api.merge(vars.scene, this.visible);

            break;
    }
    WHS.grounds.push(this);
}

// NOTE: WHS light *FUNCTION*
/**
 * Light.
 *
 * @param {String} type Light type.
 * @param {Object} pos Position of light dot.
 * @param {Object} target Target of light dot.
 */
WHS.addLight = function (type, pos, target) {
    // TODO: add lights.
    this.whsobject = true;

    switch (type) {
        case "ambient":
            this.light = new THREE.AmbientLight( 0x404040 );
        break;

        case "area":
            this.light = new THREE.AreaLight( 0xffffff, 1 );
        break;

        case "directional":
            this.light = new THREE.DirectionalLight( 0xffffff, 0.5 );
        break;

        case "hemisphere":
            this.light = new THREE.HemisphereLight(skyColorHex, groundColorHex, intensity);
        break;

        case "light":
            this.light = new THREE.Light( 0x404040 );
        break;

        case "point":
            this.light = new THREE.PointLight( 0xff0000, 1, 100 );
        break;

        case "spot":
            this.light = new THREE.SpotLight( 0xffffff );
        break;
    }

    WHS.API.merge(WHS.API.scene, this.light);

    return this.light;
}


// NOTE: WHS animate *FUNCTION*
/**
 * ANIMATE.
 */
WHS.animate = function () {
    'use strict';

    requestAnimationFrame(WHS.animate);

    if (vars.params.helper) {
        vars.cannonDebugRenderer.update();
    }

    for (var i = 0; i < Object.keys(WHS.objects).length; i++) {
        if (!WHS.objects[i].onlyvis) {
            WHS.objects[i].visible.position.copy(WHS.objects[i].body.position);
            WHS.objects[i].visible.quaternion.copy(WHS.objects[i].body.quaternion);
        }
    }

    vars.world.step(1 / 60);

    if (vars.anaglyph)
        vars.effect.render(vars.scene, vars.camera);
    else
        vars.renderer.render(vars.scene, vars.camera);

    if (vars.controls) {
        vars.controls.update(Date.now() - vars.time);
        vars.time = Date.now();
    }
}


WHS.MakeFirstPerson = function (object) {
    'use strict';

    // TODO: Clean up.
    vars.controls = new PointerLockControls(vars.camera, object.body, 10);

    WHS.API.merge(vars.scene, vars.controls.getObject());

    $('body').append('<div id="blocker"><center><h1>PointerLock</h1></center><br><p>(W,A,S,D = Move, SPACE = Jump, MOUSE = Look, CLICK = Shoot)</p></div>');

    $('#blocker').css({
        'color': 'white',
        'background': 'rgba(0,0,0,0.5)',
        'text-align': 'center',
        'position': 'absolute',
        'width': '100%',
        'height': '100%',
        'left': 0,
        'top': 0
    });

    if ('pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document) {
        var element = document.body;

        var pointerlockchange = function (event) {
            if (document.pointerLockElement === element ||
                document.mozPointerLockElement === element ||
                document.webkitPointerLockElement === element) {
                    vars.controls.enabled = true;
                    $('#blocker').css({
                        'display': 'none'
                    });
            } else {
                    vars.controls.enabled = false;

                    $('#blocker').css({
                        'display': 'block'
                    });
            }
        }
    }

    document.addEventListener('pointerlockchange', pointerlockchange, false);
    document.addEventListener('mozpointerlockchange', pointerlockchange, false);
    document.addEventListener('webkitpointerlockchange', pointerlockchange, false);

    document.addEventListener('pointerlockerror', pointerlockerror, false);
    document.addEventListener('mozpointerlockerror', pointerlockerror, false);
    document.addEventListener('webkitpointerlockerror', pointerlockerror, false);

    var pointerlockerror = function (event) {
        // FIXME: delete.
    }

    $('#blocker').on('click', function (event) {
        element.requestPointerLock = element.requestPointerLock ||
            element.mozRequestPointerLock ||
            element.webkitRequestPointerLock;

        if (/Firefox/i.test(navigator.userAgent)) {

            var fullscreenchange = function (event) {
                if (document.fullscreenElement === element ||
                    document.mozFullscreenElement === element ||
                    document.mozFullScreenElement === element) {
                        document.removeEventListener('fullscreenchange', fullscreenchange);
                        document.removeEventListener('mozfullscreenchange', fullscreenchange);
                        element.requestPointerLock();
                }
            }

            document.addEventListener('fullscreenchange', fullscreenchange, false);
            document.addEventListener('mozfullscreenchange', fullscreenchange, false);

            element.requestFullscreen = element.requestFullscreen ||
                element.mozRequestFullscreen ||
                element.mozRequestFullScreen ||
                element.webkitRequestFullscreen;

            element.requestFullscreen();
        } else
            element.requestPointerLock();
    });
}
