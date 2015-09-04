var GENERATORS =
{
	Random: {
		Default: 0,
		MersenneTwister: 1
	},
	Generator: {
		PerlinNoise: 0
	},
	PostGen: {
		None: 0,
		Mountains: 1,
		GameMountains: 2,
		BlackWhite: 3
	},
	Filter: {
		None: 0,
		Blur: 1,
		GameTerrain: 2,
		Circle: 3,
	},
	Effect: {
		None: 0,
		Destructure: 1,
		DepthNoise: 2
	},
	ms_Randoms: [ RAND_DEFAULT, RAND_MT ],
	ms_Generators: [ PN_GENERATOR ],
	ms_Colors: [ null, MOUNTAINS_COLORS, MOUNTAINS2_COLORS, BLACKWHITE_COLORS ],
	ms_Filters: [ null, BLUR_FILTER, GAMETERRAIN_FILTER, CIRCLE_FILTER ],
	ms_Effects: [ null, DESTRUCTURE_EFFECT, DEPTHNOISE_EFFECT ],
};

var GUI =
{
	ms_SmoothShading: false,
	ms_Parameters: {},

	Initialize: function( inParameters )
	{
		gui = new dat.GUI();
		this.ms_Parameters = inParameters;
		guiParameters =
		{
			width: inParameters.width,
			height: inParameters.height,
			widthSegments: inParameters.widthSegments,
			heightSegments: inParameters.heightSegments,
			depth: inParameters.depth,
			param: inParameters.param,
			filterparam: inParameters.filterparam,

			alea: GENERATORS.Random.MersenneTwister,
			generator: GENERATORS.Generator.PerlinNoise,
			colors: GENERATORS.ms_Colors.indexOf( inParameters.postgen[0] ),
			filter: GENERATORS.ms_Filters.indexOf( inParameters.filter[0] ),
			effect: GENERATORS.ms_Effects.indexOf( inParameters.effect[0] ),

			heightMap: false,
			smoothShading: false,

			github: function() {},

			update: function() { GUI.Update(); }
		};

		var terrainFolder = gui.addFolder('Terrain');
			terrainFolder.add( guiParameters, 'width' ).min(1).max(1000).step(1).name('Width').onChange( function( inValue ) {
				GUI.ms_Parameters.width = inValue;
			} );
			terrainFolder.add( guiParameters, 'height' ).min(1).max(1000).step(1).name('Height').onChange( function( inValue ) {
				GUI.ms_Parameters.height = inValue;
			} );
			terrainFolder.add( guiParameters, 'widthSegments' ).min(1).max(500).step(1).name('Segments width').onChange( function( inValue ) {
				GUI.ms_Parameters.widthSegments = inValue;
			} );
			terrainFolder.add( guiParameters, 'heightSegments' ).min(1).max(500).step(1).name('Segments height').onChange( function( inValue ) {
				GUI.ms_Parameters.heightSegments = inValue;
			} );
			terrainFolder.add( guiParameters, 'depth' ).min(0).max(500).step(1).name('Depth').onChange( function( inValue ) {
				GUI.ms_Parameters.depth = inValue;
			} );
		terrainFolder.open();

		var generatorFolder = gui.addFolder('Generator');
			generatorFolder.add( guiParameters, 'alea', GENERATORS.Random ).name('Random').onChange( function( inValue ) {
				GUI.ms_Parameters.alea = GENERATORS.ms_Randoms[inValue];
			} );
			generatorFolder.add( guiParameters, 'generator', GENERATORS.Generator ).name('Noise').onChange( function( inValue ) {
				GUI.ms_Parameters.generator = GENERATORS.ms_Generators[inValue];
			} );
			generatorFolder.add( guiParameters, 'param' ).min(1.1).max(10).step(0.1).name('Parameter').onChange( function( inValue ) {
				GUI.ms_Parameters.param = inValue;
			} );
			generatorFolder.add( guiParameters, 'filter', GENERATORS.Filter ).name('Filter').onChange( function( inValue ) {
				GUI.ms_Parameters.filter = ( inValue == 0 )? [] : [ GENERATORS.ms_Filters[inValue] ];
			} );
			generatorFolder.add( guiParameters, 'filterparam' ).min(0).max(10).step(0.1).name('Filter param').onChange( function( inValue ) {
				GUI.ms_Parameters.filterparam = inValue;
			} );
			generatorFolder.add( guiParameters, 'effect', GENERATORS.Effect ).name('Effect').onChange( function( inValue ) {
				GUI.ms_Parameters.effect = ( inValue == 0 )? [] : [ GENERATORS.ms_Effects[inValue] ];
			} );
			generatorFolder.add( guiParameters, 'colors', GENERATORS.PostGen ).name('Colors').onChange( function( inValue ) {
				GUI.ms_Parameters.postgen = ( inValue == 0 )? [] : [ GENERATORS.ms_Colors[inValue] ];
			} );
		generatorFolder.open();

		var otherFolder = gui.addFolder('Other');
			otherFolder.add( guiParameters, 'heightMap' ).name('Height map').onChange( function( inValue ) {
				if( inValue )
					$('#heightmap').show();
				else
					$('#heightmap').hide();
			} );
			otherFolder.add( guiParameters, 'smoothShading' ).name('Smooth shading').onChange( function( inValue ) {
				GUI.ms_SmoothShading = inValue;
			} );
			otherFolder.add( guiParameters, 'github' ).name('<a href="https://github.com/jbouny/terrain-generator" target="_blank">GitHub</a>');
		otherFolder.open();

		gui.add( guiParameters, 'update' ).name('<b>Generate</b>');
	},

	Update: function()
	{
		TERRAINGENDEMO.Load( this.ms_Parameters );
	}
};
