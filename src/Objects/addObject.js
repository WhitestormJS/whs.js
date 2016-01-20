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

  var scope = new api.construct(this, options, figureType),
      mass = options.onlyvis ? scope._target.mass : 1,
      fprops;

  scope.materialType = api.loadMaterial(options.materialOptions)._material;

  switch (figureType) {
    case "sphere":

      fprops = api.extend(options.geometryOptions, {

        radius: 1,
        segmentA: 32,
        segmentB: 32

      });


      scope.visible = new Physijs.SphereMesh(new THREE.SphereGeometry(
        fprops.radius,
        fprops.segmentA,
        fprops.segmentB
      ), scope.materialType, 10);

      break;
    case "cube":

      fprops = api.extend(options.geometryOptions, {

        width: 1,
        height: 1,
        depth: 1

      });

      scope.visible = new Physijs.BoxMesh(new THREE.BoxGeometry(
        fprops.width,
        fprops.height,
        fprops.depth
      ), scope.materialType, mass);

      break;
    case "cylinder":

      fprops = api.extend(options.geometryOptions, {

        radiusTop: 1,
        radiusBottom: 1,
        height: 1,
        radiusSegments: 32

      });

      scope.visible = new Physijs.CylinderMesh(
        new THREE.CylinderGeometry(
          fprops.radiusTop,
          fprops.radiusBottom,
          fprops.height,
          fprops.radiusSegments
        ),
      scope.materialType, mass);

      break;
    case "dodecahedron":

      fprops = api.extend(options.geometryOptions, {

        radius: 1,
        detail: 0

      });

      scope.visible = new Physijs.ConvexMesh(
        new THREE.DodecahedronGeometry(
          fprops.radius,
          fprops.detail
        ),
      scope.materialType, mass);

      break;
    case "extrude":

      fprops = api.extend(options.geometryOptions, {

        shapes: [],
        options: {}

      });

      scope.visible = new Physijs.ConvexMesh(
        new THREE.ExtrudeGeometry(
          fprops.shapes,
          fprops.options
        ),
      scope.materialType, mass);

      break;
    case "icosahedron":

      fprops = api.extend(options.geometryOptions, {

        radius: 1,
        detail: 0

      });

      scope.visible = new Physijs.ConvexMesh(
        new THREE.IcosahedronGeometry(
          fprops.radius,
          fprops.detail
        ),
      scope.materialType, mass);

      break;
    case "lathe":

      fprops = api.extend(options.geometryOptions, {

        points: [],

      });

      scope.visible = new Physijs.ConvexMesh(new THREE.LatheGeometry(
        fprops.points
      ), scope.materialType, mass);

      break;
    case "octahedron":

      fprops = api.extend(options.geometryOptions, {

        radius: 1,
        detail: 0

      });

      scope.visible = new Physijs.ConvexMesh(
        new THREE.OctahedronGeometry(
          fprops.radius,
          fprops.detail
        ),
      scope.materialType, mass);

      break;
    case "parametric":

      fprops = api.extend(options.geometryOptions, {

        func: function() {},
        slices: 10,
        stacks: 10 


      });

      scope.visible = new Physijs.ConvexMesh(
        new THREE.ParametricGeometry(
          fprops.func,
          fprops.slices,
          fprops.stacks
        ),
      scope.materialType, mass);

      break;
    case "plane":

      fprops = api.extend(options.geometryOptions, {

        width: 1,
        height: 0,
        segments: 32

      });

      scope.visible = new Physijs.ConvexMesh(
        new THREE.PlaneBufferGeometry(
          fprops.width,
          fprops.height,
          fprops.segments
        ),
      scope.materialType, mass);

      break;
    case "polyhedron":

      fprops = api.extend(options.geometryOptions, {

        verticesOfCube: [],
        indicesOfFaces: [],
        radius: 1,
        detail: 1

      });

      scope.visible = new Physijs.ConvexMesh(
        new THREE.PolyhedronGeometry(
          fprops.verticesOfCube,
          fprops.indicesOfFaces
        ),
      scope.materialType, mass);

      break;
    case "ring":

      fprops = api.extend(options.geometryOptions, {

        innerRadius: 0,
        outerRadius: 50,
        thetaSegments: 1,
        phiSegments: 8,
        thetaStart: 0,
        thetaLength: Math.PI * 2

      });

      scope.visible = new Physijs.ConcaveMesh(
        new THREE.TorusGeometry(
          fprops.outerRadius,
          (fprops.outerRadius - fprops.innerRadius) / 2,
          fprops.thetaSegments, fprops.phiSegments
        ),
      scope.materialType, mass);

      break;
    case "shape":

      fprops.shapes = options.geometryOptions.shapes;

      scope.visible = new THREE.Mesh(
        new THREE.ShapeGeometry(fprops.shapes),
        scope.materialType
      );

      scope.onlyvis = true;

      // WARN: console | 2d to 3d.
      console.warn('This is not physic object. 2D!', [scope]);

      break;
    case "tetrahedron":

      fprops = api.extend(options.geometryOptions, {

        radius: 1,
        detail: 0

      });

      scope.visible = new Physijs.ConvexMesh(
        new THREE.TetrahedronGeometry(
          fprops.radius,
          fprops.detail
        ),
      scope.materialType, mass);

      break;
    case "text":

      fprops =  api.extend(options.geometryOptions, {

        text: "Hello World!"

      });

      fprops.parameters = api.extend(options.geometryOptions.parameters, {

        size: 1,
        height: 50,
        curveSegments: 1,
        font: "Adelle",
        weight: "normal",
        style: "normal",
        bevelEnabled: false,
        bevelThickness: 10,
        bevelSize: 8

      });

      scope.visible = new Physijs.ConcaveMesh(
        new THREE.TextGeometry(
          fprops.text,
          fprops.parameters
        ),
      scope.materialType, masss);

      break;
    case "torus":

      fprops = api.extend(options.geometryOptions, {

        radius: 100,
        tube: 40,
        radialSegments: 8,
        tubularSegments: 6,
        arc: Math.PI * 2,

      });

      scope.visible = new Physijs.ConcaveMesh(
        new THREE.TorusGeometry(
          fprops.radius,
          fprops.tube,
          fprops.radialSegments,
          fprops.tubularSegments,
          fprops.arc
        ),
      scope.materialType, mass);

      break;
    case "torusknot":

      fprops = api.extend(options.geometryOptions, {

        radius: 100,
        tube: 40,
        radialSegments: 64,
        tubularSegments: 8,
        p: 2,
        q: 3,
        heightScale: 1

      });

      scope.visible = new Physijs.ConvexMesh(
        new THREE.TorusKnotGeometry(
          fprops.radius,
          fprops.tube,
          fprops.radialSegments,
          fprops.tubularSegments,
          fprops.p,
          fprops.q,
          fprops.heightScale
        ),
      scope.materialType, mass);

      break;
    case "tube":

      scope.CustomSinCurve = THREE.Curve.create(

        function(scale) { //custom curve constructor
          this.scale = scale || 1;
        },

        function(t) { //getPoint: t is between 0-1
          var tx = t * 3 - 1.5,
              ty = Math.sin(2 * Math.PI * t),
              tz = 0;

          return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
        }

      );

      fprops = api.extend(options.geometryOptions, {

        path: options.geometryOptions.path ? new this.CustomSinCurve(100) : false,
        segments: 20,
        radius: 2,
        radiusSegments: 8,
        closed: false,

      });

      scope.visible = new Physijs.ConcaveMesh(
        new THREE.TubeGeometry(
          fprops.path,
          fprops.segments,
          fprops.radius,
          fprops.radiusSegments,
          fprops.closed
        ),
      scope.materialType, masss);

      break;
  }

  scope.addCompoundFace = function() {
    
    this.compoundFace = new THREE.Geometry();
    this.compoundFace.faces.push(new THREE.Face3(0, 1, 2));

    var boundingBox = new THREE.Box3().setFromObject(this.visible),
        boxAround = new THREE.BoxGeometry(
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
    //this.compoundFace.vertices.push(new THREE.Vector3(0,1,2));
  }

  scope.remove = function () {
    return scope.wrap.remove();
  }

  scope.retrieve = function () {
    return scope.wrap.retrieve();
  }

  scope.build(scope.visible);

  scope.wrap = new api.Wrap(scope, scope.visible);

  return scope;
}
