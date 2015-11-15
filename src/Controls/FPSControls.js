/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

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
