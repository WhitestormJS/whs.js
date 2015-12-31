WHS.API.ConvexFigure = function(thrObj) {
  'use strict';
  if (!(thrObj instanceof THREE.Geometry))
    console.error("No THREE.js geometry");
    //Checks if thrObj is not a THREE Geometry
  else{
    //If it is then
    var points = new Array(),
        faces = new Array();

    thrObj.vertices.forEach(function(element) {
      points.push(new CANNON.Vec3(element.x, element.y, element.z));
    });

    thrObj.faces.forEach(function(element) {
      faces.push([element.a, element.b, element.c]);
    });

    return new CANNON.ConvexPolyhedron(points, faces);
  }
}
