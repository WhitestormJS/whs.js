var GAMETERRAIN_FILTER =
{
	Apply: function( inCanvas, inParameters )
	{
		var context = inCanvas.getContext( "2d" );

		context.beginPath();

		// Apply gradient to get a shape for a potential game
		var gradient = context.createLinearGradient( inCanvas.width, 0, 0, 0 );
		gradient.addColorStop( 0, '#111' );
		gradient.addColorStop( 0.06, '#1b1b1b' );
		gradient.addColorStop( 0.1, '#1b1b1b' );
		gradient.addColorStop( 0.3, 'rgba(0, 0, 0, 0.7)' );
		gradient.addColorStop( 0.6, 'rgba(0, 0, 0, 0.3)' );
		gradient.addColorStop( 0.8, 'rgba(0, 0, 0, 0.05)' );
		gradient.addColorStop( 0.9, 'rgba(255, 255, 255, 0.1)' );
		gradient.addColorStop( 0.94, 'rgba(255, 255, 255, 0.1)' );
		gradient.addColorStop( 0.96, '#000' );

		context.fillStyle = gradient;
		context.rect( 0, 0, inCanvas.width, inCanvas.height );
		context.fill();
		context.rect( 0, 0, inCanvas.width, inCanvas.height );
		context.fill();

		BLUR_FILTER.Apply( inCanvas, inParameters );
	}
};
