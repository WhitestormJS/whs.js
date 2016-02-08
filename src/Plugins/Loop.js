/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.loop = function( func ) {

    this.loop = {
        func: func,
        id: WHS.loops.length,
        enabled: false
    };

    WHS.loops.push( this.loop );

}

WHS.loop.prototype.start = function() {

    this.loop.enabled = true;

};

WHS.loop.prototype.stop = function() {

    this.loop.enabled = false;

};
