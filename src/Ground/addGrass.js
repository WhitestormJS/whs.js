/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

// TODO: Improve Grass object.
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

  scope.onlyvis = true;

  if (!scope.opts.coords)
    console.warn('Please add grass objects coordinates! @addGrass');

  scope.grassMeshes = [];

  var globalGrass = new THREE.Mesh(
    new THREE.Geometry(),
    new THREE.MeshFaceMaterial()
  );


  scope.opts.coords.forEach(function(coord) {
    var mesh = new THREE.Mesh(
      new THREE.Geometry(),
      new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("assets/textures/thingrass.png"),
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

    mesh.geometry.vertices.push(faceVertices[intr.face.a].clone()
      .add(faceInGeometry.faces[0].normal));

    mesh.geometry.vertices.push(faceVertices[intr.face.c].clone()
      .add(faceInGeometry.faces[0].normal));

    var dVec = new THREE.Vector3(
      faceVertices[intr.face.a].clone().x /
        2 + faceVertices[intr.face.c].clone().x / 2,
      faceVertices[intr.face.a].clone().y /
        2 + faceVertices[intr.face.c].clone().y / 2,
      faceVertices[intr.face.a].clone().z /
        2 + faceVertices[intr.face.c].clone().z / 2
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
    //scope.root.scene.add(mesh);

    globalGrass.geometry.merge(mesh.geometry, mesh.matrix);
    globalGrass.material.materials.push(mesh.material);
    scope.grassMeshes.push(mesh);
  });

  scope.wrap = api.Wrap(scope, globalGrass);

  // Section under construction. (animation of Grass).
  // #TODO:0 Add grass animation.
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
