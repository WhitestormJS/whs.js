var CIRCLE_FILTER =
{
	Apply: function( inCanvas, inParameters )
	{
		var context = inCanvas.getContext( "2d" );

		// Apply a radial gradient
		var gradient = context.createRadialGradient( inCanvas.width*0.5, inCanvas.height*0.5, 0, inCanvas.width*0.5, inCanvas.height*0.5, Math.min( inCanvas.height, inCanvas.width ) * 0.5 );
		gradient.addColorStop( 0.0, 'transparent' );
		gradient.addColorStop( 0.6, 'transparent' );
		gradient.addColorStop( 1.0, '#000000' );
		context.fillStyle = gradient;

		context.rect( 0, 0, inCanvas.width, inCanvas.height );
		context.fill();
		context.rect( 0, 0, inCanvas.width, inCanvas.height );
		context.fill();

		BLUR_FILTER.Apply( inCanvas, inParameters );
	}
};
