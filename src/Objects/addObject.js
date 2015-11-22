/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * Figure.
 *
 * @param {String} figure name *THREE.JS*. (REQUIRED)
 * @param {Object} options Figure options. (REQUIRED)
 * @return {Object} Scope.
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
      scope.materialType = new this.threejs.MeshFaceMaterial(
        opt.material.materials
      );
      
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

      // #FIXME:40 more complex use of key sholud be added.
      WHS.objects.forEach(function(el) {
        if (el.type == "sphere") {
          key++;
        }
      });

      scope.type = "sphere";
      scope.name = opt.name || "sphere" + key;
      scope.visible = new this.threejs.Mesh(new this.threejs.SphereGeometry(
        opt.geometry.radius,
        opt.geometry.segmentA,
        opt.geometry.segmentB
      ), scope.materialType);

      scope.visible.name = scope.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set(
        (Math.PI / 180) * opt.rot.x,
        (Math.PI / 180) * opt.rot.y,
        (Math.PI / 180) * opt.rot.z
      );

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

      } else {
        scope.onlyvis = true;
      }

      scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

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
      scope.visible = new this.threejs.Mesh(new this.threejs.BoxGeometry(
        opt.geometry.width,
        opt.geometry.height,
        opt.geometry.depth
      ), scope.materialType);

      scope.visible.name = scope.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set(
        (Math.PI / 180) * opt.rot.x,
        (Math.PI / 180) * opt.rot.y,
        (Math.PI / 180) * opt.rot.z
      );

      if (!options.onlyvis) {
        scope.physic = new this.cannonjs.Box(
          new this.cannonjs.Vec3(
            opt.geometry.width * 0.5,
            opt.geometry.height * 0.5,
            opt.geometry.depth * 0.5
          )
        );

        scope.body = new this.cannonjs.Body({
          mass: opt.mass
        });

        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
        scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
        scope.body.quaternion.copy(scope.visible.quaternion);

        scope.body.quaternion.setFromAxisAngle(
          new CANNON.Vec3(1, 0, 0),
          (Math.PI / 180) * opt.rot.x
        );

        scope.body.quaternion.setFromAxisAngle(
          new CANNON.Vec3(0, 1, 0),
          (Math.PI / 180) * opt.rot.y
        );

        scope.body.quaternion.setFromAxisAngle(
          new CANNON.Vec3(0, 0, 1),
          (Math.PI / 180) * opt.rot.z
        );

        scope.body.name = scope.name;
      } else {
        scope.onlyvis = true;
      }

      scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

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
      scope.visible = new this.threejs.Mesh(
        new this.threejs.CylinderGeometry(
          opt.geometry.radiusTop,
          opt.geometry.radiusBottom,
          opt.geometry.height,
          opt.geometry.radiusSegments
        ),
      scope.materialType);

      scope.visible.name = scope.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set(
        (Math.PI / 180) * opt.rot.x,
        (Math.PI / 180) * opt.rot.y,
        (Math.PI / 180) * opt.rot.z
      );

      if (!options.onlyvis) {
        scope.physic = new this.cannonjs.Cylinder(
          opt.geometry.radiusTop,
          opt.geometry.radiusBottom,
          opt.geometry.height,
          opt.geometry.radiusSegments
        );

        scope.body = new this.cannonjs.Body({
          mass: opt.mass
        });

        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
        scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
        scope.body.quaternion.copy(scope.visible.quaternion);

        scope.body.name = scope.name;
      } else {
        scope.onlyvis = true;
      }

      scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

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
      scope.visible = new this.threejs.Mesh(
        new this.threejs.DodecahedronGeometry(
          opt.geometry.radius,
          opt.geometry.detail
        ),
      scope.materialType);

      scope.visible.name = scope.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set(
        (Math.PI / 180) * opt.rot.x,
        (Math.PI / 180) * opt.rot.y,
        (Math.PI / 180) * opt.rot.z
      );

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
      } else {
        scope.onlyvis = true;
      }

      scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

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
      scope.visible = new this.threejs.Mesh(
        new this.threejs.ExtrudeGeometry(
          opt.geometry.shapes,
          opt.geometry.options
        ),
      scope.materialType);

      scope.visible.name = this.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set(
        (Math.PI / 180) * opt.rot.x,
        (Math.PI / 180) * opt.rot.y,
        (Math.PI / 180) * opt.rot.z
      );

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
      } else {
        scope.onlyvis = true;
      }

      scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

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
      scope.visible = new this.threejs.Mesh(
        new this.threejs.IcosahedronGeometry(
          opt.geometry.radius,
          opt.geometry.detail
        ),
      scope.materialType);

      scope.visible.name = scope.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set(
        (Math.PI / 180) * opt.rot.x,
        (Math.PI / 180) * opt.rot.y,
        (Math.PI / 180) * opt.rot.z
      );

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
      } else {
        scope.onlyvis = true;
      }

      scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

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
      scope.visible = new this.threejs.Mesh(new this.threejs.LatheGeometry(
        opt.geometry.points
      ), scope.materialType);

      scope.visible.name = scope.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set(
        (Math.PI / 180) * opt.rot.x,
        (Math.PI / 180) * opt.rot.y,
        (Math.PI / 180) * opt.rot.z
      );

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
      } else {
        scope.onlyvis = true;
      }

      scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

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
      scope.visible = new this.threejs.Mesh(
        new this.threejs.OctahedronGeometry(
          opt.geometry.radius,
          opt.geometry.detail
        ),
      scope.materialType);

      scope.visible.name = scope.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set(
        (Math.PI / 180) * opt.rot.x,
        (Math.PI / 180) * opt.rot.y,
        (Math.PI / 180) * opt.rot.z
      );

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
      } else {
        scope.onlyvis = true;
      }

      scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

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
      scope.visible = new this.threejs.Mesh(
        new this.threejs.ParametricGeometry(
          opt.geometry.func,
          opt.geometry.slices,
          opt.geometry.stacks
        ),
      scope.materialType);

      scope.visible.name = scope.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set(
        (Math.PI / 180) * opt.rot.x,
        (Math.PI / 180) * opt.rot.y,
        (Math.PI / 180) * opt.rot.z
      );

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
      } else {
        scope.onlyvis = true;
      }

      scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

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
      scope.visible = new this.threejs.Mesh(
        new this.threejs.PlaneBufferGeometry(
          opt.geometry.width,
          opt.geometry.height,
          opt.geometry.segments
        ),
      scope.materialType);

      scope.visible.name = scope.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set(
        (Math.PI / 180) * opt.rot.x,
        (Math.PI / 180) * opt.rot.y,
        (Math.PI / 180) * opt.rot.z
      );

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
      } else {
        scope.onlyvis = true;
      }

      scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

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
      scope.visible = new this.threejs.Mesh(
        new this.threejs.PolyhedronGeometry(
          opt.geometry.verticesOfCube,
          opt.geometry.indicesOfFaces
        ),
      scope.materialType);

      scope.visible.name = scope.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set(
        (Math.PI / 180) * opt.rot.x,
        (Math.PI / 180) * opt.rot.y,
        (Math.PI / 180) * opt.rot.z
      );

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
      } else {
        scope.onlyvis = true;
      }

      scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

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
      scope.visible = new this.threejs.Mesh(
        new this.threejs.TorusGeometry(
          opt.geometry.outerRadius,
          (opt.geometry.outerRadius - opt.geometry.innerRadius) / 2,
          opt.geometry.thetaSegments, opt.geometry.phiSegments
        ),
      scope.materialType);

      scope.visible.scale.z =
        1 / (opt.geometry.outerRadius - opt.geometry.innerRadius) * 2;

      scope.visible.name = scope.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set(
        (Math.PI / 180) * opt.rot.x,
        (Math.PI / 180) * opt.rot.y,
        (Math.PI / 180) * opt.rot.z
      );

      if (!options.onlyvis) {
        scope.physic = this.cannonjs.Trimesh.createTorus(
          opt.geometry.outerRadius,
          (opt.geometry.outerRadius - opt.geometry.innerRadius) / 2,
          opt.geometry.thetaSegments, opt.geometry.phiSegments
        );

        scope.physic.scale.z =
          1 / (opt.geometry.outerRadius - opt.geometry.innerRadius) * 2;

        scope.body = new this.cannonjs.Body({
          mass: opt.mass
        });

        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
        scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
        scope.body.quaternion.copy(scope.visible.quaternion);
        scope.body.name = scope.name;
      } else {
        scope.onlyvis = true;
      }

      scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

      break;
    case "shape":


      WHS.objects.forEach(function(el) {
        if (el.type == "shape") {
          key++;
        }
      });

      scope.type = "shape";
      scope.name = opt.name || "shape" + key;
      scope.visible = new this.threejs.Mesh(
        new this.threejs.ShapeGeometry(opt.geometry.shapes),
        scope.materialType
      );

      scope.visible.name = scope.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set(
        (Math.PI / 180) * opt.rot.x,
        (Math.PI / 180) * opt.rot.y,
        (Math.PI / 180) * opt.rot.z
      );

      scope.onlyvis = true;

      // WARN: console | 2d to 3d.
      console.warn('This is not physic object. 2D!', [scope]);

      scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

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
      scope.visible = new this.threejs.Mesh(
        new this.threejs.TetrahedronGeometry(
          opt.geometry.radius,
          opt.geometry.detail
        ),
      scope.materialType);

      scope.visible.name = scope.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set(
        (Math.PI / 180) * opt.rot.x,
        (Math.PI / 180) * opt.rot.y,
        (Math.PI / 180) * opt.rot.z
      );

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
      } else {
        scope.onlyvis = true;
      }

      scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

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

      scope.visible = new this.threejs.Mesh(
        new this.threejs.TextGeometry(
          opt.geometry.text,
          opt.geometry.parameters
        ),
      scope.materialType);

      scope.visible.name = scope.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set(
        (Math.PI / 180) * opt.rot.x,
        (Math.PI / 180) * opt.rot.y,
        (Math.PI / 180) * opt.rot.z
      );

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
      } else {
        scope.onlyvis = true;
      }

      scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

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

      scope.visible = new this.threejs.Mesh(
        new this.threejs.TorusGeometry(
          opt.geometry.radius,
          opt.geometry.tube,
          opt.geometry.radialSegments,
          opt.geometry.tubularSegments,
          opt.geometry.arc
        ),
      scope.materialType);

      scope.visible.name = scope.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set(
        (Math.PI / 180) * opt.rot.x,
        (Math.PI / 180) * opt.rot.y,
        (Math.PI / 180) * opt.rot.z
      );

      if (!options.onlyvis) {
        scope.physic = this.cannonjs.Trimesh.createTorus(
          opt.geometry.radius,
          opt.geometry.tube,
          opt.geometry.radialSegments,
          opt.geometry.tubularSegments
        );

        scope.body = new this.cannonjs.Body({
          mass: opt.mass
        });

        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
        scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
        scope.body.quaternion.copy(scope.visible.quaternion);
        scope.body.name = scope.name;
      } else {
        scope.onlyvis = true;
      }

      scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

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
      scope.visible = new this.threejs.Mesh(
        new this.threejs.TorusKnotGeometry(
          opt.geometry.radius,
          opt.geometry.tube,
          opt.geometry.radialSegments,
          opt.geometry.tubularSegments,
          opt.geometry.p,
          opt.geometry.q,
          opt.geometry.heightScale
        ),
      scope.materialType);

      scope.visible.name = scope.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set(
        (Math.PI / 180) * opt.rot.x,
        (Math.PI / 180) * opt.rot.y,
        (Math.PI / 180) * opt.rot.z
      );

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
      } else {
        scope.onlyvis = true;
      }

      scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

      break;
    case "tube":


      // #FIXME:30 fix to WHS.API (not here)
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

      scope.visible = new this.threejs.Mesh(
        new this.threejs.TubeGeometry(
          opt.geometry.path,
          opt.geometry.segments,
          opt.geometry.radius,
          opt.geometry.radiusSegments,
          opt.geometry.closed
        ),
      scope.materialType);

      scope.visible.name = this.name;
      scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.visible.rotation.set(
        (Math.PI / 180) * opt.rot.x,
        (Math.PI / 180) * opt.rot.y,
        (Math.PI / 180) * opt.rot.z
      );

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
      } else {
        scope.onlyvis = true;
      }

      scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

      break;
  }

  // DOING:10 Fix code style here.
  scope.addCompoundFace = function() {
    this.compoundFace = new this.root.threejs.Geometry();

    this.compoundFace.faces.push(new this.root.threejs.Face3(0, 1, 2));

    var boundingBox = new this.root.threejs.Box3().setFromObject(this.visible);

    var boxAround = new this.root.threejs.BoxGeometry(
      boundingBox.max.x - boundingBox.min.x,
      boundingBox.max.y - boundingBox.min.y,
      boundingBox.max.z - boundingBox.min.z
    );

    var vec1 = boxAround.vertices[boxAround.faces[7].a]
      .add(this.visible.position);

    var vec2 = boxAround.vertices[boxAround.faces[7].b]
      .add(this.visible.position);

    var vec3 = boxAround.vertices[boxAround.faces[7].c]
      .add(this.visible.position);

    this.compoundFace.vertices.push(vec1);
    this.compoundFace.vertices.push(vec2);
    this.compoundFace.vertices.push(vec3);
    //this.compoundFace.vertices.push(new this.root.threejs.Vector3(0,1,2));
  }

  scope.remove = function () {
    return scope.wrap.remove();
  }

  scope.retrieve = function () {
    return scope.wrap.retrieve();
  }

  return scope;
}
