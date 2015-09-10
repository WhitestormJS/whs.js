var MOUNTAINS2_COLORS =
{
	ms_Canvas: null,
	ms_Gradient: null,

	GenerateGradient: function()
	{
		this.ms_Canvas = TERRAINGEN.CreateCanvas( 255, 1 );
		var context = this.ms_Canvas.getContext( "2d" );

		var gradient = context.createLinearGradient( 0, 0, 255, 0 );

		gradient.addColorStop( 0.0, '#061701' );
		gradient.addColorStop( 0.1, '#205E0C' );
		gradient.addColorStop( 0.2, '#667755' );
		gradient.addColorStop( 0.6, '#999999' );
		gradient.addColorStop( 0.8, '#FFFFFF' );

		context.fillStyle = gradient;
		context.rect( 0, 0, this.ms_Canvas.width, this.ms_Canvas.height );
		context.fill();

		this.ms_Gradient = context.getImageData( 0, 0, this.ms_Canvas.width, this.ms_Canvas.height ).data;
	},

	Apply: function( inGeometry, inParameters )
	{
		if( this.ms_Canvas == null )
			this.GenerateGradient();

		var positions = inGeometry.getAttribute( 'position' ).array;
		var colors = inGeometry.getAttribute( 'color' ).array;

		for( var i = 0; i < positions.length; i += 3 )
		{
			var depth = positions[i + 1] / inParameters.depth,
			    indice = Math.round( depth * 255 )

			colors[i] = this.ms_Gradient[ indice * 4 ] * ( 1 + 2 * inParameters.alea.Random() * Math.max( 0, ( 0.3 - depth ) ) ) / 255.0;
			colors[i + 1] = Math.min( 1, this.ms_Gradient[ indice * 4 + 1 ] * ( 1 + 2 * inParameters.alea.Random() * Math.max( 0, ( 0.3 - depth ) ) ) / 255.0 );
			colors[i + 2] = this.ms_Gradient[ indice * 4 + 2 ] / 255.0;
		}
	},

};
