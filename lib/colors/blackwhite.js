var BLACKWHITE_COLORS =
{
	Apply: function( inGeometry, inParameters )
	{
		var positions = inGeometry.getAttribute( 'position' ).array;
		var colors = inGeometry.getAttribute( 'color' ).array;

		for( var i = 0; i < positions.length; i += 3 )
		{
			var depth = positions[i + 1] / inParameters.depth;

			colors[i] = depth * depth;
			colors[i + 1] = colors[i];
			colors[i + 2] = colors[i];
		}
	},

};
