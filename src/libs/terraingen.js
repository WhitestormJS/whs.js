var TERRAINGEN =
{
	/// HELPERS METHODS ///

	/**
	 * Create a DOM canvas element
	 * @param inWidth Width of the canvas
	 * @param inHeight Height of the canvas
	 * @return The created canvas
	 */
	CreateCanvas: function( inWidth, inHeight )
	{
		var canvas = document.createElement( "canvas" );
		canvas.width = inWidth;
		canvas.height = inHeight;
		return canvas;
	},

	/**
	 * Create vertices of the terrain from the given canvas and parameters
	 * @param inNoise 2D Canvas that store height informations
	 * @param inGeometry Geometry where fill vertices
	 * @param inDepth Depth of the terrain
	 * @param inWidth Width of the terrain
	 * @param inHeight Height of the terrain
	 */
	CreateVertices: function( inNoise, inGeometry, inDepth, inWidth, inHeight, nbPoints )
	{
		var positions = inGeometry.getAttribute( 'position' ).array;
        inGeometry.heightsArray = [];
		var context = inNoise.getContext('2d'),
			imgData = context.getImageData( 0, 0, inNoise.width, inNoise.height ),
			pixels = imgData.data,
			scaleX = inWidth / ( inNoise.width - 1 ),
			scaleY = inDepth / 255,
			scaleZ= inHeight / ( inNoise.height - 1 ),
			id = 0,
            vid = 0,
			pixel = 0
			offsetX = - inNoise.width / 2,
			offsetZ = - inNoise.height / 2;

		//for( var y = inNoise.height-1; y >= 0; --y )
		for( var x = 0; x < inNoise.width; ++x )
		{
            inGeometry.heightsArray[x] = []; // new Float32Array(inNoise.height);

			for( var y = 0; y < inNoise.height; ++y )
			{
				//inGeometry.vertices.push( new THREE.Vector3( scaleX * ( x + offsetX ), scaleY * ( pixels[id * 4 + 1] ), scaleZ * ( y + offsetZ ) ) );
				positions[id ++] = scaleX * ( x + offsetX );
				positions[id ++] = scaleY * ( pixels[ (pixel ++) * 4 + 1] );
				positions[id ++] = scaleZ * ( y + offsetZ );
                inGeometry.heightsArray[x][y] = scaleY * ( pixels[ (pixel) * 4 + 1] );
			}
		}

        console.log(inGeometry.heightsArray);
	},

	/**
	 * Create faces of the terrain
	 * @param inGeometry Geometry where fill faces
	 * @param inWidth Width of the terrain
	 * @param inHeight Height of the terrain
	 */
	CreateFaces: function( inGeometry, inWidth, inHeight )
	{
		var indices = inGeometry.getAttribute( 'index' ).array;
		var id = 0;

		for( var y = 0; y < inHeight - 1; ++y )
		{
			for( var x = 0; x < inWidth - 1; ++x )
			{
				// First triangle
				indices[id ++] = y * inWidth + x + 1;
				indices[id ++] = y * inWidth + x;
				indices[id ++] = ( y + 1 ) * inWidth + x;

				// Second triangle
				indices[id ++] = ( y + 1 ) * inWidth + x + 1;
				indices[id ++] = y * inWidth + x + 1;
				indices[id ++] = ( y + 1 ) * inWidth + x;
			}
		}
	},

	/**
	 * Create geometry of the terrain from the given canvas and parameters
	 * @param inNoise 2D Canvas that store height informations
	 * @param inWidth Width of the terrain
	 * @param inHeight Height of the terrain
	 * @param inWidthSegments Number of segments on the width
	 * @param inHeightSegments Number of segments on the height
	 * @return The created geometry
	 */
	CreateGeometry: function( inNoise, inDepth, inWidth, inHeight, inWidthSegments, inHeightSegments )
	{
		var geometry = new THREE.BufferGeometry();

		var nbPoints = inNoise.width * inNoise.height;
		var indices = ( inNoise.width - 1 ) * ( inNoise.height - 1 ) * 2 * 3 ;
		geometry.addAttribute( 'index', new THREE.BufferAttribute(new Uint32Array( indices ), 1) );
		//geometry.addAttribute( 'color', new THREE.BufferAttribute(new Float32Array( nbPoints * 3 ), 3) );
		geometry.addAttribute( 'position', new THREE.BufferAttribute(new Float32Array( nbPoints * 3 ), 3) );

		geometry.hights = this.CreateVertices( inNoise, geometry, inDepth, inWidth, inHeight);
		this.CreateFaces( geometry, inWidthSegments, inHeightSegments );

		return geometry;
	},

	ConstructTerrain: function( inNoise, inParameters )
	{
		// Create the corresponding geometry
		var geometry = this.CreateGeometry( inNoise, inParameters.depth, inParameters.width, inParameters.height, inParameters.widthSegments, inParameters.heightSegments );

		// Apply vertices effect
		for( var i = 0; i < inParameters.effect.length; ++i )
		{
			if( null !== inParameters.effect[i] )
				inParameters.effect[i].Apply( geometry, inParameters );
		}

		// Apply post algorithm as color generation
		for( var i = 0; i < inParameters.postgen.length; ++i )
		{
			if( null !== inParameters.postgen[i] )
				inParameters.postgen[i].Apply( geometry, inParameters );
		}

        geometry.computeFaceNormals();
        geometry.computeVertexNormals();

		// Update the geometry
		//geometry.attributes.color.needsUpdate = true;
		geometry.attributes.index.needsUpdate = true;
		geometry.attributes.position.needsUpdate = true;

		return geometry;
	},

	/// ACCESSIBLE METHODS ///

	/**
	 * Generate a 2D Canvas from given parameters
	 * @return A canvas that store height map
	 */
	GetCanvas: function( inParameters )
	{
		inParameters = inParameters || {};

		// Manage default parameters
		inParameters.type = inParameters.type || 0;
		inParameters.depth = inParameters.depth || 10;
		inParameters.width = inParameters.width || 100;
		inParameters.height = inParameters.height || 100;
		inParameters.widthSegments = inParameters.widthSegments || 100;
		inParameters.heightSegments = inParameters.heightSegments || 100;
		inParameters.postgen = inParameters.postgen || [];
		inParameters.effect = inParameters.effect || [];
		inParameters.filter = inParameters.filter || [];

		if( typeof inParameters.canvas == 'undefined' )
			inParameters.canvas = this.CreateCanvas( inParameters.width, inParameters.height );
		inParameters.canvas.width = inParameters.widthSegments;
		inParameters.canvas.height = inParameters.heightSegments;
		$( inParameters.canvas ).width( inParameters.widthSegments );
		$( inParameters.canvas ).height( inParameters.heightSegments );

		var noise = inParameters.generator.Get( inParameters );

		// Apply filters
		for( var i = 0; i < inParameters.filter.length; ++i )
		{
			if( null !== inParameters.filter[i] )
				inParameters.filter[i].Apply( noise, inParameters );
		}

		return noise;
	},

	Get: function ( inParameters )
	{
		return this.ConstructTerrain( this.GetCanvas( inParameters ), inParameters );
	},

	GetFromCanvas: function( inParameters, inCanvas, inX, inY, inWidth, inHeight )
	{
		// Extract a portion of the given canvas into an other
		var noise = this.CreateCanvas( inWidth, inHeight );
		var imageData = inCanvas.getContext("2d").getImageData( inX, inY, inWidth, inHeight );
		noise.getContext("2d").putImageData( imageData, 0, 0, 0, 0, inWidth, inHeight );

		var scaleWidth = inWidth / inParameters.widthSegments;
		var scaleHeight = inHeight / inParameters.heightSegments;
		var parameters = Object.create( inParameters );
		parameters.widthSegments = inWidth;
		parameters.heightSegments = inHeight;
		parameters.width = Math.floor( parameters.width * scaleWidth );
		parameters.height = Math.floor( parameters.height * scaleHeight );
		parameters.heightSegments = inHeight;

		return this.ConstructTerrain( noise, parameters );
	},
};
