var PN_GENERATOR =
{
	RandomNoise: function( inParameters, inCanvas, inX, inY, inWidth, inHeight, inAlpha )
	{
		var g = inCanvas.getContext("2d"),
			imageData = g.getImageData( 0, 0, inCanvas.width, inCanvas.height ),
			pixels = imageData.data;

		for( var i = 0; i < pixels.length; i += 4 )
		{
			pixels[i] = pixels[i+1] = pixels[i+2] = ( inParameters.alea.Random() * 256 ) | 0;
			pixels[i+3] = 255;
		}

		g.putImageData( imageData, 0, 0 );
		return inCanvas;
	},

	PerlinNoise: function( inParameters )
	{
		/**
		 * This part is based on the snippest :
		 * https://gist.github.com/donpark/1796361
		 */

		var noise = this.RandomNoise( inParameters, TERRAINGEN.CreateCanvas( inParameters.widthSegments, inParameters.heightSegments ) );
		var context = inParameters.canvas.getContext("2d");
		context.save();

		var ratio = inParameters.widthSegments / inParameters.heightSegments;

		/* Scale random iterations onto the canvas to generate Perlin noise. */
		for( var size = 4; size <= noise.height; size *= inParameters.param )
		{
			var x = ( inParameters.alea.Random() * ( noise.width - size ) ) | 0,
				y = ( inParameters.alea.Random() * ( noise.height - size ) ) | 0;
			context.globalAlpha = 4 / size;
			context.drawImage( noise, Math.max( x, 0 ), y, size * ratio, size, 0, 0, inParameters.widthSegments, inParameters.heightSegments );
		}

		context.restore();

		return inParameters.canvas;
	},

	Get: function( inParameters )
	{
		var geometry = new THREE.Geometry();

		inParameters.param = Math.max( 1.1, inParameters.param );

		// Create the Perlin Noise
		var noise = this.PerlinNoise( inParameters );

		return noise;
	}
};
