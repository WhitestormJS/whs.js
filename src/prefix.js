/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

// [x]#TODO:130 RESTRUCTURIZE.
// [x]#TODO:120 RESTRUCTURIZE threejs and cannonjs library calling.
// [x]#DONE:30 Add stats.
// #TODO:10 Add http://underscorejs.org/.
// DONE:20 clean all console.logs.
// DOING:0 Wagner.base.js is not a part of library.
// FIXME: Fix fog.
// DOING:10 improve libraries support.

/* ================ MODERNIZING BROWSER API IF NOT EXIST ==================== */

// Array.isArray;
if (typeof Array.isArray === 'undefined') {
  Array.isArray = function(obj) {
    'use strict';
    return Object.prototype.toString.call(obj) === '[object Array]';
  };
}

//event.movementX and event.movementY kind of polyfill

if(window && !MouseEvent.prototype.hasOwnProperty('movementX') && !MouseEvent.prototype.hasOwnProperty('mozMovementX')){ //Checks for support
	//If movementX and ... are not supported, an object Mouse is added to the WHS that contains information about last coords of the mouse
	WHS.Mouse = {},
	WHS.Mouse.lastX = 0,
	WHS.Mouse.lastY = 0;
	MouseEvent.prototype.getMovementX = function(){
		'use strict';
  	var value =  this.clientX - WHS.Mouse.lastX;
  	WHS.Mouse.lastX = this.clientX;
  	return value;
	}
  MouseEvent.prototype.getMovementY = function(){
  	'use strict';
  	var value =  this.clientY - WHS.Mouse.lastY;
  	WHS.Mouse.lastY = this.clientY;
  	return value;
	}
 }

WHS.extend = function(object, ...extensions){ // $.extend alternative, ... is the spread operator
	for(var extension of extensions){
		if(!extension)
			continue; //Ignore null and undefined objects and paramaters
		for(var prop of Object.getOwnPropertyNames(extension)){ //Do not traverse the prototype chain
				object[prop] = (object[prop] === 0)? 0 : object[prop] || extension[prop]; //Add values that do not already exist
		}
	}
	return object;
}

// Object.assign|es6+;
if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(target) {
            'use strict';
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert first argument to object');
            }

            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[i];
                if (nextSource === undefined || nextSource === null) {
                    continue;
                }
                nextSource = Object(nextSource);

                var keysArray = Object.keys(nextSource);
                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== undefined && desc.enumerable) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
    });
}

/* ================ WHITESTORM|JS ==================== */
var WHS = {
  REVISION: "0.0.6"
};

WHS.headers = {}; //GLOBAL headers, ex: url, script, library, specific api...
WHS.API = {};
WHS.ADD = {}; // some figures or shape funcs;

WHS.plugins = {
    settings: { // Global variables, else...
        plug_id: 0,
        loop_id: 0
    },

    list: {}, // All plugins

    queue: [] // Animation queue
};

WHS.grounds = [];


var api = WHS.API;


if ( typeof define === 'function' && define.amd ) {

		define( 'whitestorm', WHS );

} else if ( 'undefined' !== typeof exports && 'undefined' !== typeof module ) {

		module.exports = WHS;

}
