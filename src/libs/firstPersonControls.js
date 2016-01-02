/**
 * @author mrdoob / http://mrdoob.com/
 * @author schteppe / https://github.com/schteppe
 */
 var PointerLockControls = function ( camera, mesh, alpha, scope) {

    console.log(mesh);
    mesh.__dirtyPosition = true;

	var alpha = alpha || 0.5;
    var eyeYPos = 10; // eyes are 2 meters above the ground
    var velocityFactor = 0.05 * 20;
    var jumpVelocity = 10 * alpha;
    var runDelta = 1;
    var goDelta = 0.25 * runDelta;
    var sScope = this;
    var velocity = mesh.getLinearVelocity();

    var pitchObject = new THREE.Object3D();
    pitchObject.add( camera );

    var yawObject = new THREE.Object3D();
    yawObject.position.y = 2;
    yawObject.add( pitchObject );

    var quat = new THREE.Quaternion();

    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;

    var canJump = false;
    var jump = false;

    var contactNormal = new THREE.Vector3(); // Normal in the contact, pointing *out* of whatever the player touched
    var upAxis = new THREE.Vector3(0,1,0);

    mesh.addEventListener("collision", function(other_object, v, r, contactNormal){
        //console.log(contactNormal.dot(upAxis) > 0.5);

        // If contactNormal.dot(upAxis) is between 0 and 1, we know that the contact normal is somewhat in the up direction.
        if(contactNormal.dot(upAxis) < 0.5) // Use a "good" threshold value between 0 and 1 here!
            canJump = true;
    });

    var PI_2 = Math.PI / 2;

    var onMouseMove = function ( event ) {
        scope.motionBlurEnable = false;


        if ( sScope.enabled === false ) return;

        var movementX = event.movementX || event.mozMovementX || 0;
        var movementY = event.movementY || event.mozMovementY || 0;

        if (scope.motionBlurEffect)
            scope.motionBlurEffect.params.delta = Math.abs(0.0005 * event.movementX)/2 + Math.abs(0.0005 * event.movementY)/2;

        yawObject.rotation.y -= movementX * 0.002;
        pitchObject.rotation.x -= movementY * 0.002;

        pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );
    };

    var onMouseStop = function ( event ) {

    }

    var onKeyDown = function ( event ) {

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
                    mesh.applyCentralImpulse(new THREE.Vector3(0, 50, 0));
                }
                canJump = false;
                break;

            case 15: // shift
                if ( canJump === true ){
                    jump = true;
                }
                break;
        }

    };

    var onKeyUp = function ( event ) {

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

        }

    };

    document.body.addEventListener( 'mousemove', onMouseMove, false );
    document.body.addEventListener( 'keydown', onKeyDown, false );
    document.body.addEventListener( 'keyup', onKeyUp, false );

    //$("body").on( 'mousemove', onMouseMove, false );
    $(document).mousestop(100, onMouseStop);

    this.enabled = false;

    this.getObject = function () {
        return yawObject;
    };

    this.getDirection = function(targetVec){
        targetVec.set(0,0,-1);
        quat.multiplyVector3(targetVec);
    }

    // Moves the camera to the Cannon.js object position and adds velocity to the object if the run key is down
    var inputVelocity = new THREE.Vector3();
    var euler = new THREE.Euler();

    this.update = function ( delta ) {

        var moveVec = new THREE.Vector3();

        if ( sScope.enabled === false ) return;

        delta *= 0.03;
        delta = Math.min(delta, 0.5);
        console.log(delta);

        inputVelocity.set(0,0,0);

        if ( moveForward ){
            inputVelocity.z = -velocityFactor * delta * alpha * goDelta;
        }
        if ( moveBackward ){
            inputVelocity.z = velocityFactor * delta * alpha * goDelta;
        }

        if ( moveLeft ){
            inputVelocity.x = -velocityFactor * delta * alpha * goDelta;
        }
        if ( moveRight ){
            inputVelocity.x = velocityFactor * delta * alpha * goDelta;
        }

        // Convert velocity to world coordinates
        euler.x = pitchObject.rotation.x;
        euler.y = yawObject.rotation.y;
        euler.order = "XYZ";
        quat.setFromEuler(euler);
        inputVelocity.applyQuaternion(quat);
        //quat.multiplyVector3(inputVelocity);

        mesh.applyCentralImpulse(new THREE.Vector3(inputVelocity.x, 0, inputVelocity.z));

        yawObject.position.copy(mesh.position);
    };
};
