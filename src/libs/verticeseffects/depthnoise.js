var DEPTHNOISE_EFFECT =
{
	Apply: function( inGeometry, inParameters )
	{
		var positions = inGeometry.getAttribute( 'position' ).array,
			scaleDepth = inParameters.depth / 255;

		for( var i = 1; i < positions.length; i += 3 )
		{
			positions[i] += scaleDepth * inParameters.alea.Random();
		}
	},

};
