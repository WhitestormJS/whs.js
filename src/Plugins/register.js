/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.gp = {};

WHS.plugins.register = function( name, plugin, global ) {

	'use strict';

	var id = WHS.plugins.settings.plug_id;

	WHS.plugins.list[ name ] = {
		func: plugin,
		id: id
	};


	if ( global )
		WHS.gp[ name ] = plugin;
	else
		WHS.API.construct.prototype[ name ] = plugin;

	WHS.plugins.settings.plug_id ++;

	return;

};
