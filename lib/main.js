function MainLoop()
{
	requestAnimationFrame( MainLoop );
	TERRAINGENDEMO.Update();
}

$( function() {
	WINDOW.Initialize();

	var parameters = {
		alea: RAND_MT,
		generator: PN_GENERATOR,
		width: 500,
		height: 500,
		widthSegments: 250,
		heightSegments: 250,
		depth: 150,
		param: 3,
		filterparam: 1,
		filter: [ BLUR_FILTER ],
		postgen: [ MOUNTAINS_COLORS ],
		effect: [ DEPTHNOISE_EFFECT ],
		canvas: document.getElementById('heightmap'),
	};

	TERRAINGENDEMO.Initialize( 'canvas-3d', parameters );
	GUI.Initialize( parameters );

	WINDOW.ResizeCallback = function( inWidth, inHeight ) { TERRAINGENDEMO.Resize( inWidth, inHeight ); };
	TERRAINGENDEMO.Resize( WINDOW.ms_Width, WINDOW.ms_Height );

	MainLoop();
} );
