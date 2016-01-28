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

const PI_2 = Math.PI/2;

WHS.init.prototype.MakeFirstPerson = function(object, params) {

    'use strict';

    var target = WHS.API.extend({
        block: document.getElementById('blocker'),
        speed: 1,
        ypos: 1
    }, params);

    this.controls = new (function ( camera, mesh, params) {

        /* Velocity properties */
        var velocityFactor = 1, 
            runVelocity = 0.25;

        mesh.setAngularFactor({x: 0, y: 0, z: 0});

        /* Init */
        var scope = this,
            pitchObject = new THREE.Object3D();

        pitchObject.add( camera );

        var yawObject = new THREE.Object3D();

        yawObject.position.y = params.ypos; // eyes are 2 meters above the ground
        yawObject.add( pitchObject );

        var quat = new THREE.Quaternion(),

            moveForward = false,
            moveBackward = false,
            moveLeft = false,
            moveRight = false,

            canJump = false;

        mesh.addEventListener("collision", function(other_object, v, r, contactNormal){

            if(contactNormal.y < 0.5) // Use a "good" threshold value between 0 and 1 here!
                    canJump = true;
        });

        function onMouseMove ( event ) {
            if ( scope.enabled === false ) return;

            var movementX = event.movementX || event.mozMovementX || event.getMovementX() || 0,
                movementY = event.movementY || event.mozMovementY || event.getMovementY() || 0;

            yawObject.rotation.y -= movementX * 0.002,
            pitchObject.rotation.x -= movementY * 0.002;

            pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );
        };

        function onKeyDown ( event ) {

            switch ( event.keyCode ) {

                case 38: // up
                case 87: // w
                    moveForward = true;
                    break;

                case 37: // left
                case 65: // a
                    moveLeft = true;
                    break;

                case 40: // down
                case 83: // s
                    moveBackward = true;
                    break;

                case 39: // right
                case 68: // d
                    moveRight = true;
                    break;

                case 32: // space
                    if ( canJump == true ){

                            mesh.applyCentralImpulse({x: 0, y: 300, z: 0}); 

                    }

                    canJump = false;

                    break;

                case 15: // shift

                        runVelocity = 0.5;
                        break;

            }

        };

        function onKeyUp ( event ) {
            switch( event.keyCode ) {

                case 38: // up
                case 87: // w
                    moveForward = false;
                    break;

                case 37: // left
                case 65: // a
                    moveLeft = false;
                    break;

                case 40: // down
                case 83: // a
                    moveBackward = false;
                    break;

                case 39: // right
                case 68: // d
                    moveRight = false;
                    break;

                case 15: // shift
                    runVelocity = 0.25;
                    break;

            }

        };

        document.body.addEventListener( 'mousemove', onMouseMove, false );
        document.body.addEventListener( 'keydown', onKeyDown, false );
        document.body.addEventListener( 'keyup', onKeyUp, false );

        this.enabled = false;

        this.getObject = function () {
            return yawObject;
        };

        this.getDirection = function(targetVec){
            targetVec.set(0,0,-1);
            quat.multiplyVector3(targetVec);
        }

        // Moves the camera to the Cannon.js object position 
        // and adds velocity to the object if the run key is down.
        var inputVelocity = new THREE.Vector3(),
            euler = new THREE.Euler();

        this.update = function ( delta ) {

            var moveVec = new THREE.Vector3();

            if ( scope.enabled === false ) return;

            delta = delta || 0.5;
            delta = Math.min(delta, 0.5);

            inputVelocity.set(0,0,0);

            var speed = velocityFactor * delta * params.speed * runVelocity;

            if ( moveForward ){
                inputVelocity.z = -speed;
            }

            if ( moveBackward ){
                inputVelocity.z = speed;
            }

            if ( moveLeft ){
                inputVelocity.x = -speed;
            }

            if ( moveRight ){
                inputVelocity.x = speed;
            }

            // Convert velocity to world coordinates
            euler.x = pitchObject.rotation.x,
            euler.y = yawObject.rotation.y,
            euler.order = "XYZ";

            quat.setFromEuler(euler);

            inputVelocity.applyQuaternion(quat);

            mesh.applyCentralImpulse({x: inputVelocity.x * 10, y: 0, z: inputVelocity.z * 10});
            mesh.setAngularVelocity({x: inputVelocity.z * 10, y: 0, z: -inputVelocity.x * 10});

            yawObject.position.copy(mesh.position);
        };

    })(this._camera, object.visible, target);

    var controls = this.controls;

    WHS.API.merge(this.scene, this.controls.getObject());

    if ('pointerLockElement' in document ||
        'mozPointerLockElement' in document ||
        'webkitPointerLockElement' in document) {

        var element = document.body;

        this.pointerlockchange = function() {
            if (document.pointerLockElement === element ||
                document.mozPointerLockElement === element ||
                document.webkitPointerLockElement === element) {

                controls.enabled = true;

                target.block.fadeOut();

            } else {

                controls.enabled = false;

                target.block.fadeIn();

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

    target.block.addEventListener('click', function() {

        element.requestPointerLock = element.requestPointerLock ||
                                     element.mozRequestPointerLock ||
                                     element.webkitRequestPointerLock;

        element.requestFullscreen = element.requestFullscreen ||
                                    element.mozRequestFullscreen ||
                                    element.mozRequestFullScreen ||
                                    element.webkitRequestFullscreen;

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

            element.requestFullscreen();

        } else
            element.requestPointerLock();

    } );

}
