/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.init.prototype.addMorph = function (url, options) {
  'use strict';

  var scope = new api.construct(this, options, "morph");

  scope.skip = true;
  scope.morph = true;

  api.JSONLoader().load(url, function(geometry) {

    var material = new THREE.MeshLambertMaterial( { 
      color: 0xffaa55, 
      morphTargets: true, 
      vertexColors: THREE.FaceColors 
    } );

    scope.mesh = new THREE.Mesh( geometry, material );
    scope.mesh.speed = scope._morph.speed;

    scope._mixer = new THREE.AnimationMixer( scope.mesh );
    scope._mixer.addAction( new THREE.AnimationAction( geometry.animations[0] ).warpToDuration( 0.5 ) );

    scope._mixer.update( 600 * Math.random() );
    scope.mesh.mixer = scope._mixer;

    scope._rot.y = Math.PI/2;

    scope.build(scope.mesh);
    scope.wrap = new api.Wrap(scope, scope.mesh);
  });

  return scope;
  
}
