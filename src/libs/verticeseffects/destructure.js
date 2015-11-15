var DESTRUCTURE_EFFECT =
{
	Apply: function( inGeometry, inParameters )
	{
		var positions = inGeometry.getAttribute( 'position' ).array,
			densityWidth = inParameters.width / inParameters.widthSegments,
			densityHeight = inParameters.height / inParameters.heightSegments,
			densityDepth = inParameters.depth / 255,
			param = 1;

		for( var i = 0; i < positions.length; i++ )
		{
			if (i % 3 == 0) {
        positions[i] += (inParameters.alea.Random() - 0.5) * densityWidth * param;
      } else if (i % 3 == 1) {
        positions[i] += (inParameters.alea.Random() - 0.5) * densityDepth * param;
      } else if (i % 3 == 2) {
        positions[i] += (inParameters.alea.Random() - 0.5) * densityHeight * param;
      }
		}
	},

};
