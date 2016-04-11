/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS plugin loop
 *
 * @param  {Function} func - Function to be executed
 */
WHS.loop = function( func ) {

    this.loop = {
        func: func,
        id: WHS.loops.length,
        enabled: false
    };

    WHS.loops.push( this.loop );

}

/**
 * Starts the loop
 */
WHS.loop.prototype.start = function() {

    this.loop.enabled = true;

};

/**
 * Stops the loop
 */
WHS.loop.prototype.stop = function() {

    this.loop.enabled = false;

};

/**
 * Removes loop from WHS.loops array.
 */
WHS.loop.prototype.remove = function() {

    this.loop.enabled = false;

    WHS.loops.filter( el => {
    	return el !== this.loop;
    });

};
