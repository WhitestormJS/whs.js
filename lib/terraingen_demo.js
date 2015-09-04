var TERRAINGENDEMO =
{
	ms_Canvas: null,
	ms_Renderer: null,
	ms_Camera: null,
	ms_Scene: null,
	ms_Controls: null,
	ms_IsDisplaying: false,
	ms_Terrain: null,

	Enable: ( function()
	{
        try
		{
			var aCanvas = document.createElement( 'canvas' );
			return !! window.WebGLRenderingContext && ( aCanvas.getContext( 'webgl' ) || aCanvas.getContext( 'experimental-webgl' ) );
		}
		catch( e ) { return false; }
	} )(),

	Initialize: function( inIdCanvas, inParameters )
	{
		this.ms_Canvas = $( '#'+inIdCanvas );

		// Initialize Renderer, Camera and Scene
		this.ms_Renderer = this.Enable? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
		this.ms_Canvas.html( this.ms_Renderer.domElement );
		this.ms_Scene = new THREE.Scene();

		this.ms_Camera = new THREE.PerspectiveCamera( 55.0, Window.ms_Width / Window.ms_Height, 0.01, 10000 );
		this.ms_Camera.position.set( inParameters.width / 2, Math.max( inParameters.width, inParameters.height ) / 1.5, -inParameters.height / 1.5 );
		this.ms_Camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

		this.ms_Renderer.shadowMapEnabled = true;
		this.ms_Renderer.shadowMapSoft = true;

		// Initialize Orbit control
		this.ms_Controls = new THREE.OrbitControls( this.ms_Camera, this.ms_Renderer.domElement );

		// Add light
		var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
		directionalLight.position.set( 0.5, 0.7, 0.75 );
		directionalLight.castShadow = true;
		directionalLight.shadowDarkness = 0.5;
		this.ms_Scene.add( directionalLight );

		// Create terrain
		this.Load( inParameters );
	},

	Load: function( inParameters )
	{
		var terrainGeo = TERRAINGEN.Get( inParameters );
		var terrainMaterial = new THREE.MeshPhongMaterial( { vertexColors: THREE.VertexColors , shading: ( GUI.ms_SmoothShading? THREE.SmoothShading : THREE.FlatShading ) } );

		var terrain = new THREE.Mesh( terrainGeo, terrainMaterial );
		terrain.position.y = - inParameters.depth / 2;
		if( this.ms_Terrain != null )
			this.ms_Scene.remove( this.ms_Terrain );
		this.ms_Scene.add( terrain );
		this.ms_Terrain = terrain;
		this.ms_Terrain.castShadow = true;
		this.ms_Terrain.receiveShadow = true;

		this.Display();

	},

	Display: function()
	{
		this.ms_Renderer.render( this.ms_Scene, this.ms_Camera );
	},

	Update: function()
	{
		this.ms_Controls.update();
		this.Display();
	},

	Resize: function( inWidth, inHeight )
	{
		this.ms_Camera.aspect =  inWidth / inHeight;
		this.ms_Camera.updateProjectionMatrix();
		this.ms_Renderer.setSize( inWidth, inHeight );
		this.ms_Canvas.html( this.ms_Renderer.domElement );
		this.Display();
	}
};
