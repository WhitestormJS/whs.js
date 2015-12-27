/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.plugins.loop = function(func) {
	this.loop = {
		func:func,
		id: WHS.plugins.settings.loop_id++,
		enabled: false
	};

	WHS.plugins.queue.push(this.loop);
}

WHS.plugins.loop.prototype.start = function() {
    this.loop.enabled = true;
};

WHS.plugins.loop.prototype.stop = function() {
	this.loop.enabled = false;
};