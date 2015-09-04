var MOUNTAINS_COLORS =
{
	Apply: function( inGeometry, inParameters )
	{
		var step = 1000;
		var colors = inGeometry.getAttribute( 'color' ).array;
		var positions = inGeometry.getAttribute( 'position' ).array;

		for( var i = 0; i < positions.length; i += 3 )
		{
			var depth = Math.min( 1, 0.2 + ( 0.85 + 0.3 * inParameters.alea.Random() ) * 0.8 * Math.round( step * positions[i + 1] / inParameters.depth ) / step );

			colors[i] = depth * depth;
			colors[i + 1] = depth;
			colors[i + 2] = depth * depth * depth;
		}
	},

};
