/*jslint white: true*/

/**
 * Javascript document by Alexander Buzin (2014-2015)
 */

// [x]TODO: RESTRUCTURIZE.

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

WHS.headers = {}; //GLOBAL headers, ex: url, script, library, specific api...
WHS.API = {};
WHS.ADD = {}; // some figures or shape funcs;
WHS.objects = [];
WHS.grounds = [];

var api = WHS.API;




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
        console.error("No rabbits for the box. (arguments)", [box, rabbits]);
    else if (arguments.length = 2) {
        if (Array.isArray(rabbits) && rabbits.length <= 1)
            box.add(rabbits[0]);
        else if (Array.isArray(rabbits) && rabbits.length >= 2) {
            for (var i = 0; i < rabbits.length; i++) {
                box.add(rabbits[i]);
            }
        }
        else if (!Array.isArray(rabbits) && box)
            box.add(rabbits);
        else
            // FIXME: Fix caller function line number.
            console.error("box is undefined. Line " + (new Error).lineNumber + ". Func merge.", [box, rabbits]);
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

        var canObj = new WHS.headers.cannonjs.Trimesh(points, faces);
        canObj.updateNormals();

        return canObj;

    }
}

// NOTE: WHS API Triangulate *FUNCTION*
/**
 * TRIANGULATE.
 *
 * @param {Object} thrObj *THREE.JS* geometry. (REQUIRED)
 * @param {Object} material *THREE.JS* material. (REQUIRED)
 */
WHS.API.Triangulate = function (thrObj, material) {
    'use strict';

    if (arguments.length < 1)
        console.error("No THREE.js geometry");
    else if (arguments.length = 1) {
        var triangles = new WHS.headers.threejs.Geometry();
        var materials = [];

        thrObj.faces.forEach(function (element, index) {
            var triangle = new WHS.headers.threejs.Geometry();

            [].push.apply(triangle.vertices, [
                    thrObj.vertices[element.a],
                    thrObj.vertices[element.b],
                    thrObj.vertices[element.c]
            ]);

            triangle.faceVertexUvs[0].push([
                new WHS.headers.threejs.Vector2( 0, 0 ),
                new WHS.headers.threejs.Vector2( 0, 1 ),
                new WHS.headers.threejs.Vector2( 1, 1 ),
                new WHS.headers.threejs.Vector2( 1, 0 ),
            ]);

            triangle.faces.push(new WHS.headers.threejs.Face3( 0, 1, 2 ));
            triangle.computeFaceNormals();

            var triangleMesh = new WHS.headers.threejs.Mesh(triangle, material);
            triangleMesh.updateMatrix();

            triangles.merge(triangleMesh.geometry, triangleMesh.matrix);
            materials.push(material);
        });

        var trianglesMesh = new WHS.headers.threejs.Mesh(triangles, new WHS.headers.threejs.MeshFaceMaterial(materials) );
        return trianglesMesh;
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
    //'use strict';

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

    this.anaglyph = params.anaglyph;

    api.def(params.gravity, {
        x: 0,
        y: -9.82 * 100,
        z: 0
    });

    var THREEx = THREE,
        CANNONx = CANNON;

    WHS.headers.threejs = THREEx;
    WHS.headers.cannonjs = CANNONx;

    this.params = params;

    this.scene = new THREEx.Scene();
    this.world = new CANNONx.World();

    this.world.gravity.set(params.gravity.x, params.gravity.y, params.gravity.z);
    this.world.broadphase = new CANNONx.NaiveBroadphase();
    this.world.quatNormalizeSkip = 0;
    this.world.quatNormalizeFast = false;

    this.solver = new CANNON.GSSolver();
    this.world.defaultContactMaterial.contactEquationStiffness = 1e8;
    this.world.defaultContactMaterial.contactEquationRegularizationTime = 3;
    this.solver.iterations = 20;
    this.solver.tolerance = 0;
    var split = true;

    if (split)
        this.world.solver = new CANNONx.SplitSolver(this.solver);
    else
        this.world.solver = this.solver;

    this.physicsMaterial = new CANNONx.Material("slipperyMaterial");
    this.physicsContactMaterial = new CANNONx.ContactMaterial(this.physicsMaterial,
        this.physicsMaterial,
        0.0, // friction coefficient
        0.3 // restitution
    );

    // We must add the contact materials to the world
    this.world.addContactMaterial(this.physicsContactMaterial);

    // Debug Renderer
    if (params.helper) {
        this.cannonDebugRenderer = new THREE.CannonDebugRenderer(this.scene, this.world);
    }

    this.camera = new THREEx.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);

    api.merge(this.scene, this.camera);

    this.renderer = new THREEx.WebGLRenderer();
    this.renderer.setClearColor(0x70DBFF);

    this.renderer.shadowMapEnabled = true;
	this.renderer.shadowMapSoft = true;

    if (this.anaglyph) {
        this.effect = new THREEx.AnaglyphEffect(this.renderer);
        this.effect.setSize(window.innerWidth, window.innerHeight);

        this.effect.render(this.scene, this.camera);
    } else {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.render(this.scene, this.camera);
    }

    $(this.renderer.domElement).css({
        'width': '100%',
        'height': '100%'
    });

    $(this.renderer.domElement).attr('');

    $('body').append(this.renderer.domElement);

    $('body').css({
        'margin': 0,
        'padding': 0,
        'position': 'relative',
        'overflow': 'hidden'
    });

    WHS.init.prototype.animate(null, this);

    return this;
}



// NOTE: WHS figure *FUNCTION*
/**
 * Figure.
 *
 * @param {String} figure name *THREE.JS*. (REQUIRED)
 * @param {Object} options Figure options. (REQUIRED)
 */
WHS.init.prototype.addObject = function (figureType, options) {
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

            api.merge(this.scene, this.visible);

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

                api.merge(this.world, this.body);
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

            api.merge(this.scene, this.visible);

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
                api.merge(this.world, this.body);
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

            api.merge(this.scene, this.visible);

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
                api.merge(this.world, this.body);
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

            api.merge(this.scene, this.visible);

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
                api.merge(this.world, this.body);
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

            api.merge(this.scene, this.visible);

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
                api.merge(this.world, this.body);
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

            api.merge(this.scene, this.visible);

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
                api.merge(this.world, this.body);
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

            api.merge(this.scene, this.visible);

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
                api.merge(this.world, this.body);
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

            api.merge(this.scene, this.visible);

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
                api.merge(this.world, this.body);
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

            api.merge(this.scene, this.visible);

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
                api.merge(this.world, this.body);
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

            api.merge(this.scene, this.visible);

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
                api.merge(this.world, this.body);
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

            api.merge(this.scene, this.visible);

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
                api.merge(this.world, this.body);
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

            api.merge(this.scene, this.visible);

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


                api.merge(this.world, this.body);
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

            api.merge(this.scene, this.visible);

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
            api.merge(this.scene, this.visible);

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
                api.merge(this.world, this.body);
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

            api.merge(this.scene, this.visible);

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
                api.merge(this.world, this.body);
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

            api.merge(this.scene, this.visible);

            if (!options.onlyvis) {
                this.physic = CANNONx.Trimesh.createTorus(opt.geometry.radius, opt.geometry.tube, opt.geometry.radialSegments, opt.geometry.tubularSegments);
                this.body = new CANNONx.Body({
                    mass: opt.mass
                });
                this.body.linearDamping = 0.9; // Default value.
                this.body.addShape(this.physic);
                this.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                this.body.quaternion.copy(this.visible.quaternion);
                this.body.name = this.name;
                api.merge(this.world, this.body);
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
            this.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            api.merge(this.scene, this.visible);

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
                api.merge(this.world, this.body);
            } else {
                this.onlyvis = true;
            }

            WHS.objects.push(this);

            break;
        case "tube":
            var key = 0;

            // FIXME: fix to WHS.API (not here)
            this.CustomSinCurve = THREEx.Curve.create(
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
                opt.geometry.path = new this.CustomSinCurve(100);
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

            api.merge(this.scene, this.visible);

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
                api.merge(this.world, this.body);
            } else {
                this.onlyvis = true;
            }

            WHS.objects.push(this);

            break;
    }

    return this;
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
WHS.init.prototype.addGround = function (type, size, material, pos, genmap) {
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
            api.merge(this.world, this.body);
            api.merge(this.scene, this.visible);
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
            api.merge(this.world, this.body);
            api.merge(this.scene, this.visible);
            break;
        // FUTURE: terrain add.
        // TODO: Fix perfomance by saving terrain like threeJs object with options.
        case "terrain":
            var detalityX = size.detalityX || 10;
            var detalityY = size.detalityY || 10;
            this.detalityX = detalityX;
            this.detalityY = detalityY;

            var canvas = document.createElement('canvas');
            canvas.setAttribute("width", size.width);
            canvas.setAttribute("height", size.height);

            if (canvas.getContext){
               var ctx = canvas.getContext('2d');

                ctx.drawImage(size.terrain ,0,0);
            }

                    var terrainGeometry = TERRAINGEN.GetFromCanvas({
                        alea: RAND_MT,
                        generator: PN_GENERATOR,
                        width: size.width,
                        height: size.height,
                        widthSegments: size.width,
                        heightSegments: size.height,
                        depth: size.depth,
                        param: 3,
                        filterparam: 1,
                        filter: [ BLUR_FILTER ],
                        postgen: [ MOUNTAINS_COLORS ],
                        effect: [ DEPTHNOISE_EFFECT ] //[ DESTRUCTURE_EFFECT ]
                    }, canvas, 0, 0, size.width, size.height);
                    console.log(terrainGeometry);
                    var trGeometry = new THREE.Geometry().fromBufferGeometry( terrainGeometry);
                    trGeometry.computeFaceNormals();
                    console.log(trGeometry);

                    this.visible = api.Triangulate(new THREE.Geometry().fromBufferGeometry( terrainGeometry), this.materialType);

                    this.visible.scale.x = 1;
                    this.visible.scale.y = 1;
                    this.visible.position.set(pos.x, pos.y, pos.z);
                    this.physic = new WHS.API.TrimeshFigure(new THREE.Geometry().fromBufferGeometry( terrainGeometry ));
                    this.body = new CANNONx.Body({
                        mass: 0
                    });

                    this.body.linearDamping = 0.9; // Default value.
                    this.body.addShape(this.physic);
                    this.body.position.set(pos.x, pos.y, pos.z);
                    this.physic.scale.x = 1;
                    this.physic.scale.y = 1;
                    this.body.name = this.name;
                    api.merge(this.world, this.body);
                    api.merge(this.scene, this.visible);
                    this.visible.castShadow = true;
	                this.visible.receiveShadow = true;


            break;
    }


    WHS.grounds.push(this);
}

// NOTE: WHS light *FUNCTION*
/**
 * Light.
 *
 * @param {String} type Light type. (REQUIRED)
 * @param {Object} opts Parameters of light dot. (OPTIONAL)
 * @param {Object} pos Position of light dot. (OPTIONAL)
 * @param {Object} target Target of light dot. (OPTIONAL)
 */
WHS.init.prototype.addLight = function (type, opts, pos, target) {
    // TODO: add lights.
    this.whsobject = true;

    var THREEx = WHS.headers.threejs;
    var CANNONx = WHS.headers.cannonjs;

    this.target = api.def(target, {x:0, y:0, z:0});
    this.pos = api.def(pos, {x:0, y:0, z:0});

    var options = api.def(opts, {});

    options.color = api.def(opts.color, 0xffffff); // Default: white.
    options.intensity = api.def(opts.intensity, 1); // Default: 1.

    switch (type) {
        case "ambient":
            this.light = new THREEx.AmbientLight( options.color );
        break;

        case "area":
            this.light = new THREEx.AreaLight( options.color, options.intensity );
            console.warn([this.light], "This light only works in the deferredrenderer");
        break;

        case "directional":
            this.light = new THREEx.DirectionalLight( options.color, options.intensity );
        break;

        case "hemisphere":
            this.light = new THREEx.HemisphereLight( options.skyColor, options.groundColor, options.intensity );
        break;

        case "light":
            this.light = new THREEx.Light( options.color );
        break;

        case "point":
            this.light = new THREEx.PointLight( options.color, options.intensity, options.distance );
        break;

        case "spot":
            this.light = new THREEx.SpotLight( options.color );
        break;
    }

    this.light.position.clone(this.pos);
    this.light.castShadow = true;
	this.light.shadowDarkness = 0.5;

    if (this.light.target)
        this.light.target.position.clone(this.target);

    WHS.API.merge(this.scene, this.light);

    return this.light;
}


// NOTE: WHS animate *FUNCTION*
// [x]TODO: Fix animate update callback.
/**
 * ANIMATE.
 */
WHS.init.prototype.animate = function (time, scope) {
    'use strict';

    function reDraw() {
        requestAnimationFrame(reDraw);

        if (scope.params.helper) {
            scope.cannonDebugRenderer.update();
        }

        for (var i = 0; i < Object.keys(WHS.objects).length; i++) {
            if (!WHS.objects[i].onlyvis) {
                WHS.objects[i].visible.position.copy(WHS.objects[i].body.position);
                WHS.objects[i].visible.quaternion.copy(WHS.objects[i].body.quaternion);
            }
        }

        scope.world.step(1 / 60);

        if (scope.anaglyph)
            scope.effect.render(scope.scene, scope.camera);
        else
            scope.renderer.render(scope.scene, scope.camera);

        if (scope.controls) {
            scope.controls.update(Date.now() - scope.time);
            scope.time = Date.now();
        }
    }

    this.update = reDraw;

    this.update();
}


WHS.init.prototype.MakeFirstPerson = function (object) {
    'use strict';

    // TODO: Clean up.
    this.controls = new PointerLockControls(this.camera, object.body, 10);

    var controls = this.controls;

    WHS.API.merge(this.scene, this.controls.getObject());

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
                    controls.enabled = true;
                    $('#blocker').css({
                        'display': 'none'
                    });
            } else {
                    controls.enabled = false;

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
