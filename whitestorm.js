/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

// [x]TODO: RESTRUCTURIZE.
// [x]TODO: RESTRUCTURIZE threejs and cannonjs library calling.
// [x]TODO: Add stats.
// TODO: Add http://underscorejs.org/.

/* ================ LOADING LIBS ================================================== */

// LIBRARY: Terrain Loader
//$.getScript('lib/TerrainLoader.js');


/* ================ MODERNIZING BROWSER API IF NOT EXIST ========================== */

if (typeof Array.isArray === 'undefined') {
  Array.isArray = function(obj) {
    'use strict';
    return Object.prototype.toString.call(obj) === '[object Array]';
  };
}

/* ================ WHITESTORM|JS ================================================= */
var WHS = {
  REVISION: "0.0.3"
};

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
WHS.API.merge = function(box, rabbits) {
  'use strict';
  if (arguments.length < 2)
    console.error("No rabbits for the box. (arguments)", [box, rabbits]);
  else if (arguments.length == 2) {
    if (Array.isArray(rabbits) && rabbits.length <= 1)
      box.add(rabbits[0]);
    else if (Array.isArray(rabbits) && rabbits.length >= 2) {
      for (var i = 0; i < rabbits.length; i++) {
        box.add(rabbits[i]);
      }
    } else if (!Array.isArray(rabbits) && box)
      box.add(rabbits);
    else
    // FIXME: Fix caller function line number.
      console.error("box is undefined. Line " + (new Error).lineNumber + ". Func merge.", [box, rabbits]);
  }
}

// NOTE: WHS API def *FUNCTION*.
// [x]FIXME: Modify def for third parameter.
/**
 * Defines variable. Makes convexPolyhedron object *CANNON.JS* from *THREE.JS* firure.
 *
 * @param {Var} option Variable with value. (REQUIRED)
 * @param {Type} value Value for apply (default). (REQUIRED)
 * @param {Var} variablePoint Variable with value for apply. (OPTIONAL)
 */
WHS.API.def = function(option, value, variablePoint) {
  'use strict';
  if (arguments.length < 2)
    console.error("Something wrong! option? value?");
  else if (arguments.length == 2) {
    option = option || value;
    return option;
  } else if (arguments.length == 3 && variablePoint) {
    variablePoint = option || value;
    return variablePoint;
  }
}

// NOTE: WHS API ConvexFigure *FUNCTION*.
/**
 * Trimesh figure. Makes convexPolyhedron object *CANNON.JS* from *THREE.JS* firure.
 *
 * @param {Object} thrObj Figure object *THREE.JS*. (REQUIRED)
 * @returns {Object} - Figure object *CANNON.JS*. (REQUIRED)
 */
WHS.API.ConvexFigure = function(thrObj) {
  'use strict';
  if (arguments.length < 1)
    console.error("No THREE.js geometry");
  else if (arguments.length == 1) {
    var points = new Array();
    var faces = new Array();

    thrObj.vertices.forEach(function(element) {
      points.push(new WHS.headers.cannonjs.Vec3(element.x, element.y, element.z));
    });

    thrObj.faces.forEach(function(element) {
      faces.push([element.a, element.b, element.c]);
    });

    return new WHS.headers.cannonjs.ConvexPolyhedron(points, faces);
  }
}

// NOTE: WHS API PackUvs *FUNCTION*.
/**
 * Packing uvs. Generates uvs automatically.
 *
 * @param {Object} geometry Figure object geometry *THREE.JS*. (REQUIRED)
 */
WHS.API.PackUvs = function(geometry) {

  geometry.computeBoundingBox();

  var max = geometry.boundingBox.max;
  var min = geometry.boundingBox.min;

  var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
  var range = new THREE.Vector2(max.x - min.x, max.y - min.y);

  geometry.faceVertexUvs[0] = [];
  var faces = geometry.faces;

  for (i = 0; i < geometry.faces.length; i++) {

    var v1 = geometry.vertices[faces[i].a];
    var v2 = geometry.vertices[faces[i].b];
    var v3 = geometry.vertices[faces[i].c];

    geometry.faceVertexUvs[0].push([
      new THREE.Vector2((v1.x + offset.x) / range.x, (v1.y + offset.y) / range.y),
      new THREE.Vector2((v2.x + offset.x) / range.x, (v2.y + offset.y) / range.y),
      new THREE.Vector2((v3.x + offset.x) / range.x, (v3.y + offset.y) / range.y)
    ]);

  }

  geometry.uvsNeedUpdate = true;

}

// NOTE: WHS API TrimeshFigure *FUNCTION*.
// TODO: Heights array.
/**
 * Trimesh figure. Makes trimesh object *CANNON.JS* from *THREE.JS* firure.
 *
 * @param {Object} thrObj Figure object *THREE.JS*. (REQUIRED)
 * @param {Boolean} heightsNeed true if heights need. (OPTIONAL)
 */
WHS.API.TrimeshFigure = function(thrObj, heightsNeed) {
  'use strict';

  if (arguments.length < 1)
    console.error("No THREE.js geometry");
  else if (arguments.length == 1) {
    var points = [];
    var faces = [];
    var heights = [];

    thrObj.vertices.forEach(function(element) {
      points.push(element.x);
      points.push(element.y);
      points.push(element.z);

      if (heightsNeed) {
        heights.push({
          x: element.x,
          y: element.y,
          z: element.z
        });
      }
    });

    thrObj.faces.forEach(function(element) {
      faces.push(element.a);
      faces.push(element.b);
      faces.push(element.c);
    });

    var canObj = new WHS.headers.cannonjs.Trimesh(points, faces);
    canObj.updateNormals();
    canObj.heightsValues = heights;

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
WHS.API.Triangulate = function(thrObj, material) {
  'use strict';

  if (arguments.length < 1)
    console.error("No THREE.js geometry");
  else if (arguments.length = 1) {
    var triangles = new WHS.headers.threejs.Geometry();
    var materials = [];

    thrObj.faces.forEach(function(element) {
      var triangle = new WHS.headers.threejs.Geometry();

      [].push.apply(triangle.vertices, [
        thrObj.vertices[element.a],
        thrObj.vertices[element.b],
        thrObj.vertices[element.c]
      ]);

      triangle.faceVertexUvs[0].push([
        new WHS.headers.threejs.Vector2(0, 0),
        new WHS.headers.threejs.Vector2(0, 1),
        new WHS.headers.threejs.Vector2(1, 1),
        new WHS.headers.threejs.Vector2(1, 0),
      ]);

      triangle.faces.push(new WHS.headers.threejs.Face3(0, 1, 2));
      triangle.computeFaceNormals();

      var triangleMesh = new WHS.headers.threejs.Mesh(triangle, material);
      triangleMesh.updateMatrix();

      triangles.merge(triangleMesh.geometry, triangleMesh.matrix);
      materials.push(material);
    });

    var trianglesMesh = new WHS.headers.threejs.Mesh(triangles, new WHS.headers.threejs.MeshFaceMaterial(materials));
    return trianglesMesh;
  }
}

WHS.API.isSame = function(a1, a2) {
  return !(a1.sort() > a2.sort() || a1.sort() < a2.sort());
}

// TODO: write quick docs for func
WHS.API.removeDuplicateFaces = function(geometry) {
  for (var i = 0; i < geometry.faces.length; i++) {
    var tri = geometry.faces[i];
    var inds = [tri.a, tri.b, tri.c, tri.d].sort();
    for (var j = 0; j < i; j++) {
      var tri_2 = geometry.faces[j];
      if (tri_2 !== undefined) { // May have already been deleted
        var inds_2 = [tri_2.a, tri_2.b, tri_2.c, tri_2.d].sort();
        if (WHS.API.isSame(inds, inds_2)) {
          delete geometry.faces[i]; // Sets these faces to undefined
          // If duplicate, it is also interior, so remove both
          delete geometry.faces[j];
        }
      }
    }
  }
  geometry.faces = geometry.faces.filter(function(a) {
    return a === undefined
  });
  return geometry;
}

// NOTE: WHS API rotateBody *FUNCTION*.
/**
 * Rotate body. Rotates body object *CANNON.JS*.
 *
 * @param {Object} body Body object in *CANNON.JS*. (REQUIRED)
 * @param {Object} rotateSet Object of x, y, z coords. (REQUIRED)
 */
WHS.API.rotateBody = function(body, rotateSet) {
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
WHS.API.texture = function(url, options) {
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

    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;
  }

  return texture;
}

// NOTE: WHS API shape *FUNCTION*.
/**
 * Shape. Makes *THREE.JS* shape.
 *
 * @returns {Object} - *THREE.JS* shape object.
 */
WHS.ADD.shape = function() {
  return new WHS.headers.threejs.Shape();
}

// TODO: Get height function.
WHS.API.getheight = function(pos, diff, terrain) {
  'use strict';

  diff = diff || 1000;

  this.raycaster = new WHS.headers.threejs.Raycaster(
    new WHS.headers.threejs.Vector3(pos.x, diff, pos.y),
    new WHS.headers.threejs.Vector3(0, -1, 0).normalize()
  );

  this.intersect = this.raycaster.intersectObject(terrain.visible);

  return this.intersect;
}

WHS.API.rotateGeometry = function(geometry, rotateSet) {
  var rotationMatrix = new WHS.headers.threejs.Matrix4();
  rotationMatrix.makeRotationFromEuler(new WHS.headers.threejs.Euler(rotateSet.x, rotateSet.y, rotateSet.z, 'XYZ'));

  for (var v in geometry.vertices) {
    geometry.vertices[v].applyMatrix4(rotationMatrix);
  }

  return geometry;
}

// NOTE: WHS API init *FUNCTION*.
/**
 * Init.
 *
 * @param {Object} params Parameters of initalize. (REQUIRED)
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



// NOTE: WHS figure *FUNCTION*
/**
 * Figure.
 *
 * @param {String} figure name *THREE.JS*. (REQUIRED)
 * @param {Object} options Figure options. (REQUIRED)
 */
WHS.init.prototype.addObject = function(figureType, options) {
  'use strict';

  var scope = {}; // INIT LOCAL SCOPE.

  scope.root = this;

  var opt = {};

  scope.whsobject = true;

  scope.releaseTime = new Date().getTime();

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
  console.log(opt);

  switch (opt.material.type) {
    case "basic":
      scope.materialType = new this.threejs.MeshBasicMaterial(opt.material);
      break;
    case "linebasic":
      scope.materialType = new this.threejs.LineBasicMaterial(opt.material);
      break;
    case "linedashed":
      scope.materialType = new this.threejs.LineDashedMaterial(opt.material);
      break;
    case "material":
      scope.materialType = new this.threejs.Material(opt.material);
      break;
    case "depth":
      scope.materialType = new this.threejs.MeshDepthMaterial(opt.material);
      break;
    case "face":
      scope.materialType = new this.threejs.MeshFaceMaterial(opt.material.materials);
      break;
    case "lambert":
      scope.materialType = new this.threejs.MeshLambertMaterial(opt.material);
      break;
    case "normal":
      scope.materialType = new this.threejs.MeshNormalMaterial(opt.material);
      break;
    case "phong":
      scope.materialType = new this.threejs.MeshPhongMaterial(opt.material);
      break;
    case "pointcloud":
      scope.materialType = new this.threejs.PointCloudMaterial(opt.material);
      break;
    case "rawshader":
      scope.materialType = new this.threejs.RawShaderMaterial(opt.material);
      break;
    case "shader":
      scope.materialType = new this.threejs.ShaderMaterial(opt.material);
      break;
    case "spritecanvas":
      scope.materialType = new this.threejs.SpriteCanvasMaterial(opt.material);
      break;
    case "sprite":
      scope.materialType = new this.threejs.SpriteMaterial(opt.material);
      break;
  }

  var key = 0;

  switch (figureType) {
    case "sphere":

      api.def(opt.geometry.segmentA, 32);
      api.def(opt.geometry.segmentB, 32);

      // FIXME: more complex use of key sholud be added.
      WHS.objects.forEach(function(el) {
        if (el.type == "sphere") {
          key++;
        }
      });

      scope.type = "sphere";
      scope.name = opt.name || "sphere" + key;
      scope.visible = new this.threejs.Mesh(new this.threejs.SphereGeometry(opt.geometry.radius, opt.geometry.segmentA, opt.geometry.segmentB), scope.materialType);

      scope.visible.name = scope.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

      api.merge(this.scene, scope.visible);

      if (!options.onlyvis) {
        scope.physic = new this.cannonjs.Sphere(opt.geometry.radius);

        scope.body = new this.cannonjs.Body({
          mass: opt.mass
        });

        scope.body.linearDamping = 0.9; //default
        scope.body.addShape(scope.physic);
        scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
        scope.body.quaternion.copy(scope.visible.quaternion);
        scope.body.name = scope.name;

        api.merge(this.world, scope.body);
      } else {
        scope.onlyvis = true;
      }

      WHS.objects.push(scope);

      break;
    case "cube":


      api.def(opt.geometry.width, 1);
      api.def(opt.geometry.height, 1);
      api.def(opt.geometry.depth, 1);

      WHS.objects.forEach(function(el) {
        if (el.type == "cube") {
          key++;
        }
      });

      scope.type = "cube";
      scope.name = opt.name || "cube" + key;
      scope.visible = new this.threejs.Mesh(new this.threejs.BoxGeometry(opt.geometry.width, opt.geometry.height, opt.geometry.depth), scope.materialType);

      scope.visible.name = scope.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

      api.merge(this.scene, scope.visible);

      if (!options.onlyvis) {
        scope.physic = new this.cannonjs.Box(new this.cannonjs.Vec3(opt.geometry.width * 0.5, opt.geometry.height * 0.5, opt.geometry.depth * 0.5));
        scope.body = new this.cannonjs.Body({
          mass: opt.mass
        });

        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
        scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
        scope.body.quaternion.copy(scope.visible.quaternion);
        scope.body.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), (Math.PI / 180) * opt.rot.x);
        scope.body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), (Math.PI / 180) * opt.rot.y);
        scope.body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 1), (Math.PI / 180) * opt.rot.z);
        scope.body.name = scope.name;
        api.merge(this.world, scope.body);
      } else {
        scope.onlyvis = true;
      }

      WHS.objects.push(scope);

      break;
    case "cylinder":


      api.def(opt.geometry.radiusTop, 1);
      api.def(opt.geometry.radiusBottom, 1);
      api.def(opt.geometry.height, 1);
      api.def(opt.geometry.radiusSegments, 32);

      WHS.objects.forEach(function(el) {
        if (el.type == "cylinder") {
          key++;
        }
      });

      scope.type = "cylinder";
      scope.name = opt.name || "cylinder" + key;
      scope.visible = new this.threejs.Mesh(new this.threejs.CylinderGeometry(opt.geometry.radiusTop, opt.geometry.radiusBottom, opt.geometry.height, opt.geometry.radiusSegments), scope.materialType);

      scope.visible.name = scope.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

      api.merge(this.scene, scope.visible);

      if (!options.onlyvis) {
        scope.physic = new this.cannonjs.Cylinder(opt.geometry.radiusTop, opt.geometry.radiusBottom, opt.geometry.height, opt.geometry.radiusSegments);
        scope.body = new this.cannonjs.Body({
          mass: opt.mass
        });
        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
        scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
        scope.body.quaternion.copy(scope.visible.quaternion);
        scope.body.name = scope.name;
        api.merge(this.world, scope.body);
      } else {
        scope.onlyvis = true;
      }

      WHS.objects.push(scope);

      break;
    case "dodecahedron":


      api.def(opt.geometry.radius, 1);
      api.def(opt.geometry.detail, 0);

      WHS.objects.forEach(function(el) {
        if (el.type == "dodecahedron") {
          key++;
        }
      });

      scope.type = "dodecahedron";
      scope.name = opt.name || "dodecahedron" + key;
      scope.visible = new this.threejs.Mesh(new this.threejs.DodecahedronGeometry(opt.geometry.radius, opt.geometry.detail), scope.materialType);

      scope.visible.name = scope.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

      api.merge(this.scene, scope.visible);

      if (!options.onlyvis) {
        scope.physic = new WHS.API.ConvexFigure(scope.visible.geometry);
        scope.body = new this.cannonjs.Body({
          mass: opt.mass
        });
        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
        scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
        scope.body.quaternion.copy(scope.visible.quaternion);
        scope.body.name = scope.name;
        api.merge(this.world, scope.body);
      } else {
        scope.onlyvis = true;
      }

      WHS.objects.push(scope);

      break;
    case "extrude":


      api.def(opt.geometry.shapes, []);
      api.def(opt.geometry.options, {});

      WHS.objects.forEach(function(el) {
        if (el.type == "extrude") {
          key++;
        }
      });

      scope.type = "extrude";
      scope.name = opt.name || "extrude" + key;
      scope.visible = new this.threejs.Mesh(new this.threejs.ExtrudeGeometry(opt.geometry.shapes, opt.geometry.options), scope.materialType);

      scope.visible.name = this.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

      api.merge(this.scene, scope.visible);
      console.log(scope.visible.geometry);

      if (!options.onlyvis) {
        scope.physic = new WHS.API.ConvexFigure(scope.visible.geometry);
        scope.body = new this.cannonjs.Body({
          mass: opt.mass
        });
        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
        scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
        scope.body.quaternion.copy(scope.visible.quaternion);
        scope.body.name = scope.name;
        api.merge(this.world, scope.body);
      } else {
        scope.onlyvis = true;
      }

      WHS.objects.push(scope);

      break;
    case "icosahedron":


      api.def(opt.geometry.radius, 1);
      api.def(opt.geometry.detail, 0);

      WHS.objects.forEach(function(el) {
        if (el.type == "icosahedron") {
          key++;
        }
      });

      scope.type = "icosahedron";
      scope.name = opt.name || "icosahedron" + key;
      scope.visible = new this.threejs.Mesh(new this.threejs.IcosahedronGeometry(opt.geometry.radius, opt.geometry.detail), scope.materialType);

      scope.visible.name = scope.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

      api.merge(this.scene, scope.visible);

      if (!options.onlyvis) {
        scope.physic = new WHS.API.ConvexFigure(this.visible.geometry);
        scope.body = new this.cannonjs.Body({
          mass: opt.mass
        });
        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
        scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
        scope.body.quaternion.copy(scope.visible.quaternion);
        scope.body.name = scope.name;
        api.merge(this.world, scope.body);
      } else {
        scope.onlyvis = true;
      }

      WHS.objects.push(scope);

      break;
    case "lathe":


      api.def(opt.geometry.points, []);

      WHS.objects.forEach(function(el) {
        if (el.type == "lathe") {
          key++;
        }
      });

      scope.type = "lathe";
      scope.name = opt.name || "lathe" + key;
      scope.visible = new this.threejs.Mesh(new this.threejs.LatheGeometry(opt.geometry.points), scope.materialType);

      scope.visible.name = scope.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

      api.merge(this.scene, scope.visible);

      if (!options.onlyvis) {
        scope.physic = new WHS.API.ConvexFigure(this.visible.geometry);
        this.body = new this.cannonjs.Body({
          mass: opt.mass
        });
        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
        scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
        scope.body.quaternion.copy(scope.visible.quaternion);
        scope.body.name = scope.name;
        api.merge(this.world, scope.body);
      } else {
        scope.onlyvis = true;
      }

      WHS.objects.push(scope);

      break;
    case "octahedron":


      api.def(opt.geometry.radius, 1);
      api.def(opt.geometry.detail, 0);

      WHS.objects.forEach(function(el) {
        if (el.type == "octahedron") {
          key++;
        }
      });

      scope.type = "octahedron";
      scope.name = opt.name || "octahedron" + key;
      scope.visible = new this.threejs.Mesh(new this.threejs.OctahedronGeometry(opt.geometry.radius, opt.geometry.detail), scope.materialType);

      scope.visible.name = scope.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

      api.merge(this.scene, scope.visible);

      if (!options.onlyvis) {
        scope.physic = new WHS.API.ConvexFigure(this.visible.geometry);
        scope.body = new this.cannonjs.Body({
          mass: opt.mass
        });
        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
        scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
        scope.body.quaternion.copy(scope.visible.quaternion);
        scope.body.name = scope.name;
        api.merge(this.world, scope.body);
      } else {
        scope.onlyvis = true;
      }

      WHS.objects.push(scope);

      break;
    case "parametric":


      api.def(opt.geometry.func, function() {});
      api.def(opt.geometry.slices, 10);
      api.def(opt.geometry.stacks, 10);

      WHS.objects.forEach(function(el) {
        if (el.type === "parametric") {
          key++;
        }
      });

      scope.type = "parametric";
      scope.name = opt.name || "parametric" + key;
      scope.visible = new this.threejs.Mesh(new this.threejs.ParametricGeometry(opt.geometry.func, opt.geometry.slices, opt.geometry.stacks), scope.materialType);

      scope.visible.name = scope.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

      api.merge(this.scene, scope.visible);

      if (!options.onlyvis) {
        scope.physic = new WHS.API.ConvexFigure(scope.visible.geometry);
        scope.body = new this.cannonjs.Body({
          mass: opt.mass
        });
        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
        scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
        scope.body.quaternion.copy(scope.visible.quaternion);
        scope.body.name = this.name;
        api.merge(this.world, scope.body);
      } else {
        scope.onlyvis = true;
      }

      WHS.objects.push(scope);

      break;
    case "plane":


      api.def(opt.geometry.func, function() {});
      api.def(opt.geometry.width, 10);
      api.def(opt.geometry.height, 10);
      api.def(opt.geometry.segments, 32);

      WHS.objects.forEach(function(el) {
        if (el.type == "plane") {
          key++;
        }
      });

      scope.type = "plane";
      scope.name = opt.name || "plane" + key;
      scope.visible = new this.threejs.Mesh(new this.threejs.PlaneBufferGeometry(opt.geometry.width, opt.geometry.height, opt.geometry.segments), scope.materialType);

      scope.visible.name = scope.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

      api.merge(this.scene, scope.visible);

      if (!options.onlyvis) {
        scope.physic = new WHS.API.ConvexFigure(scope.visible.geometry);
        scope.body = new this.cannonjs.Body({
          mass: opt.mass
        });
        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
        scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
        scope.body.quaternion.copy(scope.visible.quaternion);
        scope.body.name = scope.name;
        api.merge(this.world, scope.body);
      } else {
        scope.onlyvis = true;
      }

      WHS.objects.push(scope);

      break;
    case "polyhedron":


      api.def(opt.geometry.verticesOfCube, []);
      api.def(opt.geometry.indicesOfFaces, []);
      api.def(opt.geometry.radius, 1);
      api.def(opt.geometry.detail, 1);

      WHS.objects.forEach(function(el) {
        if (el.type == "polyhedron") {
          key++;
        }
      });

      scope.type = "polyhedron";
      scope.name = opt.name || "polyhedron" + key;
      scope.visible = new this.threejs.Mesh(new this.threejs.PolyhedronGeometry(opt.geometry.verticesOfCube, opt.geometry.indicesOfFaces), scope.materialType);

      scope.visible.name = scope.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

      api.merge(this.scene, scope.visible);

      if (!options.onlyvis) {
        scope.physic = new WHS.API.ConvexFigure(scope.visible.geometry);
        scope.body = new this.cannonjs.Body({
          mass: opt.mass
        });
        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
        scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
        scope.body.quaternion.copy(scope.visible.quaternion);
        scope.body.name = scope.name;
        api.merge(this.world, scope.body);
      } else {
        scope.onlyvis = true;
      }

      WHS.objects.push(scope);

      break;
    case "ring":


      api.def(opt.geometry.innerRadius, 0);
      api.def(opt.geometry.outerRadius, 50);
      api.def(opt.geometry.thetaSegments, 1);
      api.def(opt.geometry.phiSegments, 8);
      api.def(opt.geometry.thetaStart, 0);
      api.def(opt.geometry.thetaLength, Math.PI * 2);

      WHS.objects.forEach(function(el) {
        if (el.type == "ring") {
          key++;
        }
      });

      scope.type = "ring";
      scope.name = opt.name || "ring" + key;
      scope.visible = new this.threejs.Mesh(new this.threejs.TorusGeometry(opt.geometry.outerRadius, (opt.geometry.outerRadius - opt.geometry.innerRadius) / 2, opt.geometry.thetaSegments, opt.geometry.phiSegments), scope.materialType);

      scope.visible.scale.z = 1 / (opt.geometry.outerRadius - opt.geometry.innerRadius) * 2;
      scope.visible.name = scope.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

      api.merge(this.scene, scope.visible);

      if (!options.onlyvis) {
        scope.physic = this.cannonjs.Trimesh.createTorus(opt.geometry.outerRadius, (opt.geometry.outerRadius - opt.geometry.innerRadius) / 2, opt.geometry.thetaSegments, opt.geometry.phiSegments);
        scope.physic.scale.z = 1 / (opt.geometry.outerRadius - opt.geometry.innerRadius) * 2;
        scope.body = new this.cannonjs.Body({
          mass: opt.mass
        });
        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
        scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
        scope.body.quaternion.copy(scope.visible.quaternion);
        scope.body.name = scope.name;


        api.merge(this.world, scope.body);
      } else {
        scope.onlyvis = true;
      }

      WHS.objects.push(scope);

      break;
    case "shape":


      WHS.objects.forEach(function(el) {
        if (el.type == "shape") {
          key++;
        }
      });

      scope.type = "shape";
      scope.name = opt.name || "shape" + key;
      scope.visible = new this.threejs.Mesh(new this.threejs.ShapeGeometry(opt.geometry.shapes), scope.materialType);

      scope.visible.name = scope.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

      api.merge(this.scene, scope.visible);

      scope.onlyvis = true;

      // WARN: console | 2d to 3d.
      console.warn('This is not physic object. 2D!', [scope]);

      WHS.objects.push(scope);

      break;
    case "tetrahedron":


      api.def(opt.geometry.radius, 1);
      api.def(opt.geometry.detail, 0);

      WHS.objects.forEach(function(el) {
        if (el.type == "tetrahedron") {
          key++;
        }
      });

      scope.type = "tetrahedron";
      scope.name = opt.name || "tetrahedron" + key;
      scope.visible = new this.threejs.Mesh(new this.threejs.TetrahedronGeometry(opt.geometry.radius, opt.geometry.detail), scope.materialType);
      scope.visible.name = scope.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);
      api.merge(this.scene, scope.visible);

      if (!options.onlyvis) {
        scope.physic = new WHS.API.ConvexFigure(this.visible.geometry);
        scope.body = new this.cannonjs.Body({
          mass: opt.mass
        });
        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
        scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
        scope.body.quaternion.copy(scope.visible.quaternion);
        scope.body.name = scope.name;
        api.merge(this.world, scope.body);
      } else {
        scope.onlyvis = true;
      }

      WHS.objects.push(scope);

      break;
    case "text":


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

      WHS.objects.forEach(function(el) {
        if (el.type == "text") {
          key++;
        }
      });

      scope.type = "text";
      scope.name = opt.name || "text" + key;
      scope.visible = new this.threejs.Mesh(new this.threejs.TextGeometry(opt.geometry.text, opt.geometry.parameters), scope.materialType);
      scope.visible.name = scope.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

      api.merge(this.scene, scope.visible);

      if (!options.onlyvis) {
        scope.physic = new WHS.API.TrimeshFigure(scope.visible.geometry);
        scope.body = new this.cannonjs.Body({
          mass: opt.mass
        });
        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
        scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
        scope.body.quaternion.copy(scope.visible.quaternion);
        scope.body.name = scope.name;
        api.merge(this.world, scope.body);
      } else {
        scope.onlyvis = true;
      }

      WHS.objects.push(scope);

      break;
    case "torus":


      api.def(opt.geometry.radius, 100);
      api.def(opt.geometry.tube, 40);
      api.def(opt.geometry.radialSegments, 8);
      api.def(opt.geometry.tubularSegments, 6);
      api.def(opt.geometry.arc, Math.PI * 2);

      WHS.objects.forEach(function(el) {
        if (el.type == "torus") {
          key++;
        }
      });

      scope.type = "torus";
      scope.name = opt.name || "torus" + key;
      scope.visible = new this.threejs.Mesh(new this.threejs.TorusGeometry(opt.geometry.radius, opt.geometry.tube, opt.geometry.radialSegments, opt.geometry.tubularSegments, opt.geometry.arc), scope.materialType);

      scope.visible.name = scope.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

      api.merge(this.scene, scope.visible);

      if (!options.onlyvis) {
        scope.physic = this.cannonjs.Trimesh.createTorus(opt.geometry.radius, opt.geometry.tube, opt.geometry.radialSegments, opt.geometry.tubularSegments);
        scope.body = new this.cannonjs.Body({
          mass: opt.mass
        });
        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
        scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
        scope.body.quaternion.copy(scope.visible.quaternion);
        scope.body.name = scope.name;
        api.merge(this.world, scope.body);
      } else {
        scope.onlyvis = true;
      }

      WHS.objects.push(scope);

      break;
    case "torusknot":


      api.def(opt.geometry.radius, 100);
      api.def(opt.geometry.tube, 40);
      api.def(opt.geometry.radialSegments, 8);
      api.def(opt.geometry.tubularSegments, 6);
      api.def(opt.geometry.arc, Math.PI * 2);

      WHS.objects.forEach(function(el) {
        if (el.type == "torusknot") {
          key++;
        }
      });

      scope.type = "torusknot";
      scope.name = opt.name || "torusknot" + key;
      scope.visible = new this.threejs.Mesh(new this.threejs.TorusKnotGeometry(opt.geometry.radius, opt.geometry.tube, opt.geometry.radialSegments, opt.geometry.tubularSegments, opt.geometry.p, opt.geometry.q, opt.geometry.heightScale), scope.materialType);

      scope.visible.name = scope.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

      api.merge(this.scene, scope.visible);

      if (!options.onlyvis) {
        scope.physic = new WHS.API.TrimeshFigure(scope.visible.geometry);
        scope.body = new this.cannonjs.Body({
          mass: opt.mass
        });
        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
        scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
        scope.body.quaternion.copy(scope.visible.quaternion);
        scope.body.name = scope.name;
        api.merge(this.world, scope.body);
      } else {
        scope.onlyvis = true;
      }

      WHS.objects.push(scope);

      break;
    case "tube":


      // FIXME: fix to WHS.API (not here)
      scope.CustomSinCurve = this.threejs.Curve.create(
        function(scale) { //custom curve constructor
          this.scale = scale || 1;
        },
        function(t) { //getPoint: t is between 0-1
          var tx = t * 3 - 1.5,
            ty = Math.sin(2 * Math.PI * t),
            tz = 0;
          return new this.threejs.Vector3(tx, ty, tz).multiplyScalar(this.scale);
        }
      );

      if (!opt.geometry.path) {
        opt.geometry.path = new this.CustomSinCurve(100);
      }

      api.def(opt.geometry.segments, 20);
      api.def(opt.geometry.radius, 2);
      api.def(opt.geometry.radiusSegments, 8);
      api.def(opt.geometry.closed, false);

      WHS.objects.forEach(function(el) {
        if (el.type == "tube") {
          key++;
        }
      });

      scope.type = "tube";
      scope.name = opt.name || "tube" + key;
      scope.visible = new this.threejs.Mesh(new this.threejs.TubeGeometry(opt.geometry.path, opt.geometry.segments, opt.geometry.radius, opt.geometry.radiusSegments, opt.geometry.closed), scope.materialType);

      scope.visible.name = this.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

      api.merge(this.scene, this.visible);

      if (!options.onlyvis) {
        scope.physic = new WHS.API.TrimeshFigure(scope.visible.geometry);
        scope.body = new this.cannonjs.Body({
          mass: opt.mass
        });
        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
        scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
        scope.body.quaternion.copy(scope.visible.quaternion);
        scope.body.name = scope.name;
        api.merge(this.world, scope.body);
      } else {
        scope.onlyvis = true;
      }

      WHS.objects.push(scope);

      break;
  }

  scope.addCompoundFace = function() {
    this.compoundFace = new this.root.threejs.Geometry();

    this.compoundFace.faces.push(new this.root.threejs.Face3(0, 1, 2));

    var boundingBox = new this.root.threejs.Box3().setFromObject(this.visible);

    var boxAround = new this.root.threejs.BoxGeometry(
      boundingBox.max.x - boundingBox.min.x,
      boundingBox.max.y - boundingBox.min.y,
      boundingBox.max.z - boundingBox.min.z
    );

    //console.log(boxAround.faces[7]); // Bottom Face.

    var vec1 = boxAround.vertices[boxAround.faces[7].a].add(this.visible.position);
    var vec2 = boxAround.vertices[boxAround.faces[7].b].add(this.visible.position);
    var vec3 = boxAround.vertices[boxAround.faces[7].c].add(this.visible.position);

    this.compoundFace.vertices.push(vec1);
    this.compoundFace.vertices.push(vec2);
    this.compoundFace.vertices.push(vec3);
    //this.compoundFace.vertices.push(new this.root.threejs.Vector3(0,1,2));
    //console.log(this.compoundFace); // Bottom Face.
  }

  return scope;
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
WHS.init.prototype.addGround = function(type, size, material, pos) {
  'use strict';

  var scope = {};
  scope.root = this;

  var key = 0;
  WHS.grounds.forEach(function(el) {
    if (el.type == type) {
      key++;
    }
  });

  scope.type = type;
  scope.name = "ground" + key;

  api.def(size, {
    width: 100,
    height: 100
  });

  switch (material.type) {
    case "basic":
      scope.materialType = new this.threejs.MeshBasicMaterial(material);
      break;

    case "linebasic":
      scope.materialType = new this.threejs.LineBasicMaterial(material);
      break;

    case "linedashed":
      scope.materialType = new this.threejs.LineDashedMaterial(material);
      break;

    case "material":
      scope.materialType = new this.threejs.Material(material);
      break;

    case "depth":
      scope.materialType = new this.threejs.MeshDepthMaterial(material);
      break;

    case "face":
      scope.materialType = new this.threejs.MeshFaceMaterial(material);
      break;

    case "lambert":
      scope.materialType = new this.threejs.MeshLambertMaterial(material);
      break;

    case "normal":
      scope.materialType = new this.threejs.MeshNormalMaterial(material);
      break;

    case "phong":
      scope.materialType = new this.threejs.MeshPhongMaterial(material);
      break;

    case "pointcloud":
      scope.materialType = new this.threejs.PointCloudMaterial(material);
      break;

    case "rawshader":
      scope.materialType = new this.threejs.RawShaderMaterial(material);
      break;

    case "shader":
      scope.materialType = new this.threejs.ShaderMaterial(material);
      break;

    case "spritecanvas":
      scope.materialType = new this.threejs.SpriteCanvasMaterial(material);
      break;

    case "sprite":
      scope.materialType = new this.threejs.SpriteMaterial(material);
      break;
  }

  switch (type) {
    case "smooth":
      scope.visible = new this.threejs.Mesh(new this.threejs.PlaneBufferGeometry(size.width, size.height, 1, 1), scope.materialType);
      scope.visible.rotation.set(-90 / 180 * Math.PI, 0, 0);
      scope.visible.position.set(pos.x, pos.y, pos.z);
      scope.physic = new this.cannonjs.Plane(size.width, size.height);
      scope.body = new this.cannonjs.Body({
        mass: 0
      });
      scope.body.linearDamping = 0.9; // Default value.
      scope.body.addShape(scope.physic);
      scope.body.position.set(pos.x, pos.y, pos.z);
      scope.body.quaternion.setFromAxisAngle(new this.cannonjs.Vec3(1, 0, 0), -Math.PI / 2);
      scope.body.name = scope.name;
      api.merge(this.world, scope.body);
      api.merge(this.scene, scope.visible);
      break;
    case "infinitySmooth":
      scope.visible = new this.threejs.Mesh(new this.threejs.PlaneBufferGeometry(size.width, size.height, 1, 1), scope.materialType);
      scope.visible.rotation.set(-90 / 180 * Math.PI, 0, 0);
      scope.visible.position.set(pos.x, pos.y, pos.z);
      scope.physic = new this.cannonjs.Plane(size.width, size.height);
      scope.body = new this.cannonjs.Body({
        mass: 0
      });
      scope.body.linearDamping = 0.9; // Default value.
      scope.body.addShape(scope.physic);
      scope.body.position.set(posscopex, pos.y, pos.z);
      scope.body.quaternion.setFromAxisAngle(new this.cannonjs.Vec3(1, 0, 0), -Math.PI / 2);
      scope.body.name = scope.name;
      api.merge(this.world, scope.body);
      api.merge(this.scene, scope.visible);
      break;
      // FUTURE: terrain add.
      // TODO: Fix perfomance by saving terrain like threeJs object with options.
    case "terrain":

      //api.def(size.detality, 0);

      var canvas = document.createElement('canvas');
      canvas.setAttribute("width", size.width);
      canvas.setAttribute("height", size.height);

      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.drawImage(size.terrain, 0, 0);
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
        filter: [BLUR_FILTER],
        postgen: [], // MOUNTAINS_COLORS
        effect: [DEPTHNOISE_EFFECT] //[ DESTRUCTURE_EFFECT ]
      }, canvas, 0, 0, size.width, size.height);

      scope.custumGeom = new this.threejs.Geometry().fromBufferGeometry(terrainGeometry);
      scope.custumGeom.verticesNeedUpdate = true;
      scope.custumGeom.elementsNeedUpdate = true;
      scope.custumGeom.normalsNeedUpdate = true;
      scope.custumGeom.computeFaceNormals();
      scope.custumGeom.computeVertexNormals();
      scope.custumGeom.mergeVertices();

      if (!isNaN(size.detality)) {
        scope.modifier = new this.threejs.SubdivisionModifier();

        scope.modifier.modify(scope.custumGeom);
        scope.custumGeom.verticesNeedUpdate = true;
        scope.custumGeom.elementsNeedUpdate = true;
        scope.custumGeom.normalsNeedUpdate = true;
        scope.custumGeom.computeFaceNormals();
        scope.custumGeom.computeVertexNormals();
        scope.custumGeom.mergeVertices();
      }

      // TESTINV. ===

      //var bumpTexture = new THREE.ImageUtils.loadTexture( 'images/heightmap.png' );
    	//bumpTexture.wrapS = bumpTexture.wrapT = THREE.RepeatWrapping;
    	// magnitude of normal displacement
    	var bumpScale   = 2.0;

    	var oceanTexture = new THREE.ImageUtils.loadTexture( 'textures/terrain/dirt-512.jpg' );
    	oceanTexture.wrapS = oceanTexture.wrapT = THREE.RepeatWrapping;

    	var sandyTexture = new THREE.ImageUtils.loadTexture( 'textures/terrain/sand-512.jpg' );
    	sandyTexture.wrapS = sandyTexture.wrapT = THREE.RepeatWrapping;

    	var grassTexture = new THREE.ImageUtils.loadTexture( 'textures/terrain/grass-512.jpg' );
    	grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;

    	var rockyTexture = new THREE.ImageUtils.loadTexture( 'textures/terrain/rock-512.jpg' );
    	rockyTexture.wrapS = rockyTexture.wrapT = THREE.RepeatWrapping;

    	var snowyTexture = new THREE.ImageUtils.loadTexture( 'textures/terrain/snow-512.jpg' );
    	snowyTexture.wrapS = snowyTexture.wrapT = THREE.RepeatWrapping;


    	// use "this." to create global object
    	var customUniforms = {
    		//bumpTexture:	{ type: "t", value: bumpTexture },
    		bumpScale:	    { type: "f", value: bumpScale },
    		oceanTexture:	{ type: "t", value: oceanTexture },
    		sandyTexture:	{ type: "t", value: sandyTexture },
    		grassTexture:	{ type: "t", value: grassTexture },
    		rockyTexture:	{ type: "t", value: rockyTexture },
    		snowyTexture:	{ type: "t", value: snowyTexture },
    	};


      var customUN = Object.assign(
      {
        ambient  : { type: "c", value: new THREE.Color( 0xdddddd ) },
        emissive : { type: "c", value: new THREE.Color( 0xeeeeee ) },
        wrapRGB  : { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) },
        oceanTexture:	{ type: "t", value: oceanTexture },
        sandyTexture:	{ type: "t", value: sandyTexture },
        grassTexture:	{ type: "t", value: grassTexture },
        rockyTexture:	{ type: "t", value: rockyTexture },
        snowyTexture:	{ type: "t", value: snowyTexture },
        //light: true,
        //fog: true
      }, THREE.ShaderLib['basic'].uniforms);

      var shopts = {
          uniforms: customUN,
          vertexShader: [

      			"#define TERRAIN;",
            //"#define USE_SHADOWMAP;",
            //"#define USE_FOG;",
            //"#define MAX_SHADOWS 2;",

      			"varying vec3 vLightFront;",

      			"#ifdef DOUBLE_SIDED",

      			"	varying vec3 vLightBack;",

      			"#endif",
            '',
            'varying float vAmount;',
            'varying vec2 vUv;',
            '',

      			THREE.ShaderChunk[ "map_pars_vertex" ],
      			THREE.ShaderChunk[ "lightmap_pars_vertex" ],
      			THREE.ShaderChunk[ "envmap_pars_vertex" ],
      			THREE.ShaderChunk[ "lights_lambert_pars_vertex" ],
      			THREE.ShaderChunk[ "color_pars_vertex" ],
      			THREE.ShaderChunk[ "morphtarget_pars_vertex" ],
      			THREE.ShaderChunk[ "skinning_pars_vertex" ],
      			THREE.ShaderChunk[ "shadowmap_pars_vertex" ],
      			THREE.ShaderChunk[ "logdepthbuf_pars_vertex" ],

      			"void main() {",
      				THREE.ShaderChunk[ "map_vertex" ],
      				THREE.ShaderChunk[ "lightmap_vertex" ],
      				THREE.ShaderChunk[ "color_vertex" ],

      				THREE.ShaderChunk[ "morphnormal_vertex" ],
      				THREE.ShaderChunk[ "skinbase_vertex" ],
      				THREE.ShaderChunk[ "skinnormal_vertex" ],
      				THREE.ShaderChunk[ "defaultnormal_vertex" ],

      				THREE.ShaderChunk[ "morphtarget_vertex" ],
      				THREE.ShaderChunk[ "skinning_vertex" ],
      				THREE.ShaderChunk[ "default_vertex" ],
      				THREE.ShaderChunk[ "logdepthbuf_vertex" ],

    				  //THREE.ShaderChunk[ "worldpos_vertex" ],
      				THREE.ShaderChunk[ "envmap_vertex" ],
      				THREE.ShaderChunk[ "lights_lambert_vertex" ],
              THREE.ShaderChunk[ "worldpos_vertex" ],
      				THREE.ShaderChunk[ "shadowmap_vertex" ],
              '	vUv = uv;',
              '	vAmount = position.y * 0.005 + 0.1;',

              'vec3 newPosition = position;',
              '	gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );',

      			"}"

      		].join("\n"),

      		fragmentShader: [

      			"uniform float opacity;",

      			"varying vec3 vLightFront;",

      			"#ifdef DOUBLE_SIDED",

      			"	varying vec3 vLightBack;",

      			"#endif",
            'uniform sampler2D oceanTexture;',
            'uniform sampler2D sandyTexture;',
            'uniform sampler2D grassTexture;',
            'uniform sampler2D rockyTexture;',
            'uniform sampler2D snowyTexture;',

      			THREE.ShaderChunk[ "color_pars_fragment" ],
      			THREE.ShaderChunk[ "map_pars_fragment" ],
      			THREE.ShaderChunk[ "alphamap_pars_fragment" ],
      			THREE.ShaderChunk[ "lightmap_pars_fragment" ],
      			THREE.ShaderChunk[ "envmap_pars_fragment" ],
      			THREE.ShaderChunk[ "fog_pars_fragment" ],
      			THREE.ShaderChunk[ "shadowmap_pars_fragment" ],
      			THREE.ShaderChunk[ "specularmap_pars_fragment" ],
      			THREE.ShaderChunk[ "logdepthbuf_pars_fragment" ],
            '',
            'varying vec2 vUv;',
            '',
            'varying float vAmount;',
            '',
      			"void main() {",



            '	vec4 water = (smoothstep(0.01, 0.25, vAmount) - smoothstep(0.24, 0.26, vAmount)) * texture2D( oceanTexture, vUv * 0.1 );',
            '	vec4 sandy = (smoothstep(0.24, 0.27, vAmount) - smoothstep(0.28, 0.31, vAmount)) * texture2D( sandyTexture, vUv * 0.1 );',
            '	vec4 grass = (smoothstep(0.28, 0.32, vAmount) - smoothstep(0.35, 0.40, vAmount)) * texture2D( grassTexture, vUv * 0.2 );',
            '	vec4 rocky = (smoothstep(0.30, 0.40, vAmount) - smoothstep(0.40, 0.70, vAmount)) * texture2D( rockyTexture, vUv * 0.2 );',
            '	vec4 snowy = (smoothstep(0.42, 0.45, vAmount))                                   * texture2D( snowyTexture, vUv * 0.1 );',
            '	gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0) + water + sandy + grass + rocky + snowy; ',

            //'	gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0)',

      				THREE.ShaderChunk[ "logdepthbuf_fragment" ],
      				THREE.ShaderChunk[ "map_fragment" ],
      				THREE.ShaderChunk[ "alphamap_fragment" ],
      				THREE.ShaderChunk[ "alphatest_fragment" ],
      				THREE.ShaderChunk[ "specularmap_fragment" ],

      			"	#ifdef DOUBLE_SIDED",

      					//"float isFront = float( gl_FrontFacing );",
      					//"gl_FragColor.xyz *= isFront * vLightFront + ( 1.0 - isFront ) * vLightBack;",

      			"		if ( gl_FrontFacing )",
      			"			gl_FragColor.xyz *= vLightFront;",
      			"		else",
      			"			gl_FragColor.xyz *= vLightBack;",

      			"	#else",

      			"		gl_FragColor.xyz *= vLightFront;",

      			"	#endif",

      				THREE.ShaderChunk[ "lightmap_fragment" ],
      				THREE.ShaderChunk[ "color_fragment" ],
      				//THREE.ShaderChunk[ "envmap_fragment" ],
      				THREE.ShaderChunk[ "shadowmap_fragment" ],

      				THREE.ShaderChunk[ "linear_to_gamma_fragment" ],

      				THREE.ShaderChunk[ "fog_fragment" ],

      			"}"

      		].join("\n"),

        side: THREE.DoubleSide,
        shading: THREE.SmoothShading,
      };

      var customMaterial = new THREE.ShaderMaterial(shopts);
      //console.log(shopts.vertexShader);
      //console.log(shopts.fragmentShader);

      console.log(customUN);

      // TESTINV. ===


      scope.visible = api.Triangulate(scope.custumGeom, customMaterial); //scope.materialType);

      scope.visible.scale.x = 1;
      scope.visible.scale.y = 1;
      scope.visible.position.set(pos.x, pos.y, pos.z);
      api.rotateGeometry(scope.visible.geometry, {
        x: 0,
        y: Math.PI / 180 * -180,
        z: 0
      });
      //scope.visible.rotation.set(0, Math.PI / 180 * -180, 0);

      scope.visible.updateMatrix();
      //scope.visible.quaternion.set(0.5, 0.5, 0.5, -0.5);
      //console.log(terrainGeometry.heightsArray);
      scope.physic = new this.cannonjs.Heightfield(terrainGeometry.heightsArray.reverse(), {
        elementSize: 1 // Distance between the data points in X and Y directions
      });

      scope.body = new this.cannonjs.Body({
        mass: 0
      });

      scope.body.linearDamping = 0.9; // Default value.
      scope.body.addShape(scope.physic);


      scope.body.quaternion.setFromEuler(Math.PI / 180 * -90, 0, 0, "XYZ");

      scope.body.position.set(pos.x - size.width / 2 + 1, pos.y, pos.z + size.height / 2 - 1);
      //scope.physic.scale.x = 1;
      //scope.physic.scale.y = 1;
      scope.body.name = scope.name;
      api.merge(this.world, scope.body);
      api.merge(this.scene, scope.visible);
      scope.visible.castShadow = true;
      scope.visible.receiveShadow = true;

      break;
  }

  WHS.grounds.push(scope);

  return scope;
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
WHS.init.prototype.addLight = function(type, opts, pos, target) {
  // TODO: add lights.

  var scope = {};

  scope.whsobject = true;

  scope.target = target;
  scope.pos = pos;

  console.log(scope.pos);

  var options = api.def(opts, {});

  api.def(opts.color, 0xffffff, options.color); // Default: white.
  api.def(opts.skyColor, 0xffffff, options.skyColor); // Default: white.
  api.def(opts.groundColor, 0xffffff, options.groundColor); // Default: white.
  api.def(opts.intensity, 1, options.intensity); // Default: 1.
  api.def(opts.distance, 100, options.distance); // Default: 100.
  api.def(opts.angle, Math.PI / 3, options.angle); // Default: 100.

  switch (type) {
    case "ambient":
      scope.light = new this.threejs.AmbientLight(0xffffff);
      break;

    case "area":
      scope.light = new this.threejs.AreaLight(options.color, options.intensity);
      console.warn([this.light], "This light only works in the deferredrenderer");
      break;

    case "directional":
      scope.light = new this.threejs.DirectionalLight(options.color, options.intensity);
      scope.light.castShadow = true;
      scope.light.shadowDarkness = 0.5;
      break;

    case "hemisphere":
      scope.light = new this.threejs.HemisphereLight(options.skyColor, options.groundColor, options.intensity);
      break;

    case "light":
      scope.light = new this.threejs.Light(options.color);
      break;

    case "point":
      scope.light = new this.threejs.PointLight(options.color, options.intensity, options.distance);
      break;

    case "spot":
      scope.light = new this.threejs.SpotLight(options.color, options.intensity, options.distance, options.angle);
      scope.light.castShadow = true;

      // FIXME: Shadow default parameters.
      scope.light.shadowMapWidth = 1024;
      scope.light.shadowMapHeight = 1024;

      scope.light.shadowCameraNear = 50;
      scope.light.shadowCameraFar = 4000;
      scope.light.shadowCameraFov = 30;
      break;
  }

  scope.light.position.set(scope.pos.x, scope.pos.y, scope.pos.z);

  if (scope.light.target)
    scope.light.target.position.set(scope.target.x, scope.target.y, scope.target.z);

  WHS.API.merge(this.scene, scope.light);

  return scope;
}

// NOTE: WHS init prototype addFog *FUNCTION*
/**
 * ADDFOG.
 *
 * @param {String} type Fog type (name). (REQUIRED)
 * @param {Object} params Options of fog object. (REQUIRED)
 * @returns {Object} This element scope/statement.
 */
WHS.init.prototype.addFog = function(type, params) {
  'use strict';

  var scope = {};

  api.def(params.hex, 0x000000); //, this.hex);
  api.def(params.near, 0.015); //, this.near);
  api.def(params.far, 1000); //, this.far);
  api.def(params.density, 0.00025); //, this.density);

  switch (type) {
    case "fog":
      scope = new this.threejs.Fog(params.hex, params.near, params.far);
      break;

    case "fogexp2":
      scope = new this.threejs.FogExp2(params.hex, params.density);
      break;
  }

  return scope;
}

// TODO: add *FUNC* Wagner for *WAGNER.JS*.
WHS.init.prototype.addWagner = function(wagnerjs, type, params) {
  'use strict';

  var scope = {};

  //api.def(params.hex, 0x000000); //, this.hex);
  //api.def(params.near, 0.015); //, this.near);
  //api.def(params.far, 1000); //, this.far);
  //api.def(params.density, 0.00025); //, this.density);

  switch (type) {
    case "zoomBlurPass":
      scope.effect = new wagnerjs.ZoomBlurPass();
      scope.effect.params.strength = .05;
      scope.effect.params.center.set(.5 * this.composer.width, .5 * this.composer.height);
      this.composer.pass(scope.effect);
      break;

    case "multiPassBloomPass":
      scope.effect = new wagnerjs.MultiPassBloomPass();
      scope.effect.params.blurAmount = 1.32;
      scope.effect.params.strength = .5;
      scope.effect.params.applyZoomBlur = true;
      scope.effect.params.zoomBlurStrength = 0.84;
      scope.effect.params.useTexture = true;
      scope.effect.glowTexture = wagnerjs.Pass.prototype.getOfflineTexture(this.composer.width, this.composer.height, false);
      scope.effect.params.center.set(.5 * this.composer.width, .5 * this.composer.height);
      this.composer.pass(scope.effect);
      break;

    case "vignettePass":
      scope.effect = new wagnerjs.VignettePass();
      scope.effect.params.amount = 0.7;
      scope.effect.params.falloff = 0.2;
      this.composer.pass(scope.effect);
      break;

    case "directionalBlurPass":
      scope.effect = new wagnerjs.DirectionalBlurPass();
      scope.effect.params.delta = 0.1;
      this.composer.pass(scope.effect);
      break;

    case "motionBlurPass":
      scope.motionBlurEffect = new wagnerjs.DirectionalBlurPass();
      scope.motionBlurEnable = true;
      scope.motionBlurEffect.params.delta = 0;
      scope.effect = scope.motionBlurEffect;
      this.composer.pass(scope.effect);
      break;
  }

  //this.composer.eff.push(this.effect);
  this.composer.toScreen();

  scope.composer = this.composer;

  scope.apply = function() {
    this.composer.eff.push(scope.effect);
    return scope;
  }

  return scope;
}

// NOTE: WHS init prototype addGrass *FUNCTION*
/**
 * ADDGRASS.
 *
 * @param {Object} ground WHS ground object @addGround. (REQUIRED)
 * @param {Object} options Options of fog object. (REQUIRED)
 * @returns {Object} This element scope/statement.
 */
WHS.init.prototype.addGrass = function(ground, options) {
  'use strict';

  var scope = {};
  scope.root = this;
  scope.opts = options;

  if (!scope.opts.coords)
    console.warn('Please add grass objects coordinates! @addGrass');

  scope.grassMeshes = [];

  scope.opts.coords.forEach(function(coord) {
    var mesh = new THREE.Mesh(
      new THREE.Geometry(),
      new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("textures/thingrass.png"),
        side: THREE.DoubleSide,
        blending: THREE.NormalBlending,
        transparent: true,
        alphaTest: 0.5
      })
    );

    var intr = (WHS.API.getheight({
      x: coord.x,
      y: coord.y
    }, 500, ground))[0];

    var faceVertices = intr.object.geometry.vertices;

    var faceInGeometry = new THREE.Geometry();
    faceInGeometry.faces.push(new THREE.Face3(0, 1, 2));
    faceInGeometry.vertices.push(faceVertices[intr.face.a]);
    faceInGeometry.vertices.push(faceVertices[intr.face.c]);
    faceInGeometry.vertices.push(faceVertices[intr.face.b]);
    faceInGeometry.computeFaceNormals();

    /*var faceIn = new THREE.Mesh(
      faceInGeometry, // Face geomtery.
      new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.DoubleSide})
    );

    var vecN = intr.point.clone().add(faceInGeometry.faces[0].normal);
    var rotN = faceInGeometry.faces[0].normal; //.normalize();

    var nlGeometry = new THREE.Geometry();
    nlGeometry.vertices = [
      intr.point,
      vecN.clone()
    ];

    var normalLine = new THREE.Line(
      nlGeometry,
      new THREE.MeshBasicMaterial({color: 0x000000})
    );*/

    mesh.position.set(0, 0, 0);
    mesh.geometry.vertices.push(faceVertices[intr.face.a].clone());
    mesh.geometry.vertices.push(faceVertices[intr.face.c].clone());
    mesh.geometry.vertices.push(faceVertices[intr.face.a].clone().add(faceInGeometry.faces[0].normal));
    mesh.geometry.vertices.push(faceVertices[intr.face.c].clone().add(faceInGeometry.faces[0].normal));

    var dVec = new THREE.Vector3(
      faceVertices[intr.face.a].clone().x / 2 + faceVertices[intr.face.c].clone().x / 2,
      faceVertices[intr.face.a].clone().y / 2 + faceVertices[intr.face.c].clone().y / 2,
      faceVertices[intr.face.a].clone().z / 2 + faceVertices[intr.face.c].clone().z / 2
    );

    mesh.geometry.vertices.push(
      dVec.clone().add(
        dVec.clone().sub(faceVertices[intr.face.b].clone())
      )
    );

    mesh.geometry.vertices.push(faceVertices[intr.face.b].clone());
    mesh.geometry.vertices.push(faceVertices[intr.face.b].clone()
      .add(faceInGeometry.faces[0].normal)
    );
    mesh.geometry.vertices.push(
      dVec.clone().add(
        dVec.clone().sub(faceVertices[intr.face.b].clone())
      ).add(faceInGeometry.faces[0].normal)
    );

    mesh.geometry.faces.push(new THREE.Face3(0, 1, 2));
    mesh.geometry.faces.push(new THREE.Face3(1, 2, 3));
    mesh.geometry.faces.push(new THREE.Face3(4, 6, 5));
    mesh.geometry.faces.push(new THREE.Face3(4, 6, 7));

    mesh.geometry.faceVertexUvs[0].push([
      new THREE.Vector2(0, 0),
      new THREE.Vector2(1, 0),
      new THREE.Vector2(0, 1)
    ]);

    mesh.geometry.faceVertexUvs[0].push([
      new THREE.Vector2(0, 0),
      new THREE.Vector2(1, 1),
      new THREE.Vector2(0, 1)
    ]);

    mesh.geometry.faceVertexUvs[0].push([
      new THREE.Vector2(0, 0),
      new THREE.Vector2(1, 1),
      new THREE.Vector2(1, 0)
    ]);

    mesh.geometry.faceVertexUvs[0].push([
      new THREE.Vector2(0, 0),
      new THREE.Vector2(1, 1),
      new THREE.Vector2(0, 1)
    ]);

    mesh.geometry.uvsNeedUpdate = true;

    //scope.root.scene.add(faceIn);
    //scope.root.scene.add(normalLine);
    scope.root.scene.add(mesh);
    scope.grassMeshes.push(mesh);
  });

  // Section under construction. (animation of Grass).
  scope.update = function() {
    /*requestAnimationFrame(scope.update);

    var delta = 0;
    var oldTime = 0;

    var time = new Date().getTime();
    delta = time - oldTime;
    oldTime = time;

    if (isNaN(delta) || delta > 1000 || delta == 0 ) {
        delta = 1000/60;
    }*/
  }

  scope.update();

  return scope;
}

// NOTE: WHS animate *FUNCTION*
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

// NOTE: WHS init prototype MakeFirstPerson *FUNCTION*
/**
 * MAKEFIRSTPERSON.
 *
 * @param {Object} object *WHS* figure/object. (REQUIRED)
 */
WHS.init.prototype.MakeFirstPerson = function(object, plc, jqselector) {
  'use strict';


  // TODO: Clean up.
  this.controls = new plc(this.camera, object.body, 10, this);

  var controls = this.controls;

  console.log(this);

  WHS.API.merge(this.scene, this.controls.getObject());

  this.rootElement.append('<div id="blocker">' +
    '   <center>' +
    '      <h1>PointerLock</h1>' +
    '   </center>' +
    '   <br>' +
    '   <p>(W,A,S,D = Move, SPACE = Jump, MOUSE = Look)</p>' +
    '</div>');

  var jqs = $(jqselector);

  jqs.css({
    'color': 'white',
    'background': 'rgba(0,0,0,0.5)',
    'text-align': 'center',
    'position': 'absolute',
    'width': '100%',
    'height': '100%',
    'left': 0,
    'top': 0
  });

  if ('pointerLockElement' in document ||
    'mozPointerLockElement' in document ||
    'webkitPointerLockElement' in document) {
    var element = document.body;

    this.pointerlockchange = function() {
      if (document.pointerLockElement === element ||
        document.mozPointerLockElement === element ||
        document.webkitPointerLockElement === element) {
        controls.enabled = true;
        jqs.css({
          'display': 'none'
        });
      } else {
        controls.enabled = false;

        jqs.css({
          'display': 'block'
        });
      }
    }
  }

  document.addEventListener('pointerlockchange', this.pointerlockchange, false);
  document.addEventListener('mozpointerlockchange', this.pointerlockchange, false);
  document.addEventListener('webkitpointerlockchange', this.pointerlockchange, false);

  this.pointerlockerror = function() {
    console.warn("Pointer lock error.");
  }

  document.addEventListener('pointerlockerror', this.pointerlockerror, false);
  document.addEventListener('mozpointerlockerror', this.pointerlockerror, false);
  document.addEventListener('webkitpointerlockerror', this.pointerlockerror, false);

  jqs.on('click', function() {
    element.requestPointerLock = element.requestPointerLock ||
      element.mozRequestPointerLock ||
      element.webkitRequestPointerLock;

    if (/Firefox/i.test(navigator.userAgent)) {
      var fullscreenchange = function() {
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

// NOTE: WHS init prototype OrbitControls *FUNCTION*
/**
 * ORBITCONTROLS.
 *
 * @param {Object} object Description. (OPTIONAL)
 */
WHS.init.prototype.OrbitControls = function(object) {
  // TODO: add use for object.
  this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
}
