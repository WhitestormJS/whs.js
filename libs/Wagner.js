(function() {

'use strict';

var WAGNER = WAGNER || {};

WAGNER.vertexShadersPath = './vertex-shaders';
WAGNER.fragmentShadersPath = './fragment-shaders';
WAGNER.assetsPath = './assets';

WAGNER.log = function() {
	//console.log( Array.prototype.slice.call( arguments ).join( ' ' ) );
};

WAGNER.Composer = function( renderer, settings ) {

	this.width = 1;
	this.height = 1;

	this.settings = settings || {};
	this.useRGBA = this.settings.useRGBA || false;

	this.renderer = renderer;
	this.copyPass = new WAGNER.CopyPass( this.settings );

	this.scene = new THREE.Scene();
	this.quad = new THREE.Mesh(
		new THREE.PlaneBufferGeometry( 1, 1 ),
		this.defaultMaterial
	);
	this.scene.add( this.quad );
	this.camera = new THREE.OrthographicCamera( 1, 1, 1, 1, -10000, 10000 );

	this.front = new THREE.WebGLRenderTarget(1, 1, {
		minFilter: this.settings.minFilter !== undefined ? this.settings.minFilter : THREE.LinearFilter,
		magFilter: this.settings.magFilter !== undefined ? this.settings.magFilter : THREE.LinearFilter,
		wrapS: this.settings.wrapS !== undefined ? this.settings.wrapS : THREE.ClampToEdgeWrapping,
		wrapT: this.settings.wrapT !== undefined ? this.settings.wrapT : THREE.ClampToEdgeWrapping,
		format: this.useRGBA ? THREE.RGBAFormat : THREE.RGBFormat,
		type: this.settings.type !== undefined ? this.settings.type : THREE.UnsignedByteType,
		stencilBuffer: this.settings.stencilBuffer !== undefined ? this.settings.stencilBuffer : true
	});

	this.back = this.front.clone();

	this.startTime = Date.now();

	this.passes = {};

};

WAGNER.Composer.prototype.linkPass = function( id, pass ) {

	function WagnerLoadPassException( message ) {
		this.message = 'Pass "' + id + '" already loaded.';
		this.name = "WagnerLoadPassException";
		this.toString = function() {
			return this.message;
		};
	}

	if( this.passes[ id ] ) {
		throw new WagnerLoadPassException( id, pass );
	}

	this.passes[ id ] = pass;

};

WAGNER.Composer.prototype.swapBuffers = function() {

	this.output = this.write;
	this.input = this.read;

	var t = this.write;
	this.write = this.read;
	this.read = t;

};

WAGNER.Composer.prototype.render = function( scene, camera, keep, output ) {

	if( this.copyPass.isLoaded() ) {
		if( keep ) this.swapBuffers();
		this.renderer.render( scene, camera, output?output:this.write, true );
		if( !output ) this.swapBuffers();
	}

};

WAGNER.Composer.prototype.toScreen = function() {

	if( this.copyPass.isLoaded() ) {
		this.quad.material = this.copyPass.shader;
		this.quad.material.uniforms.tInput.value = this.read;
		this.quad.material.uniforms.resolution.value.set( this.width, this.height );
		this.renderer.render( this.scene, this.camera );
	}

};

WAGNER.Composer.prototype.toTexture = function( t ) {

	if( this.copyPass.isLoaded() ) {
		this.quad.material = this.copyPass.shader;
		this.quad.material.uniforms.tInput.value = this.read;
		this.renderer.render( this.scene, this.camera, t, false );
	}

};

WAGNER.Composer.prototype.pass = function( pass ) {

	if( pass instanceof WAGNER.Stack ) {

		this.passStack(pass);

	} else {

		if( typeof pass === 'string' ) {
			this.quad.material = this.passes[ pass ];
		}
		if( pass instanceof THREE.ShaderMaterial ) {
			this.quad.material = pass;
		}
		if( pass instanceof WAGNER.Pass ) {
			if( !pass.isLoaded() ) return;
			pass.run( this );
			return;
		}

		if( !pass.isSim ) this.quad.material.uniforms.tInput.value = this.read;

		this.quad.material.uniforms.resolution.value.set( this.width, this.height );
		this.quad.material.uniforms.time.value = 0.001 * ( Date.now() - this.startTime );
		this.renderer.render( this.scene, this.camera, this.write, false );
		this.swapBuffers();

	}

};

WAGNER.Composer.prototype.passStack = function( stack ) {

	stack.getPasses().forEach( function ( pass ) {

		this.pass( pass );

	}.bind(this));

};

WAGNER.Composer.prototype.reset = function() {

	this.read = this.front;
	this.write = this.back;

	this.output = this.write;
	this.input = this.read;

};

WAGNER.Composer.prototype.setSource = function( src ) {

	if( this.copyPass.isLoaded() ) {
		this.quad.material = this.copyPass.shader;
		this.quad.material.uniforms.tInput.value = src;
		this.renderer.render( this.scene, this.camera, this.write, true );
		this.swapBuffers();
	}

};

WAGNER.Composer.prototype.setSize = function( w, h ) {

	this.width = w;
	this.height = h;

	this.camera.projectionMatrix.makeOrthographic( w / - 2, w / 2, h / 2, h / - 2, this.camera.near, this.camera.far );
	this.quad.scale.set( w, h, 1 );

	this.front.setSize( w, h );
	this.back.setSize( w, h );

};

WAGNER.Composer.prototype.defaultMaterial = new THREE.MeshBasicMaterial();

WAGNER.loadShader = function( file, callback ) {

	var oReq = new XMLHttpRequest();
	oReq.onload = function() {
		var content = oReq.responseText;
		callback( content );
	}.bind( this );
	oReq.onerror = function() {

		function WagnerLoadShaderException( f ) {
			this.message = 'Shader "' + f + '" couldn\'t be loaded.';
			this.name = "WagnerLoadShaderException";
			this.toString = function() {
				return this.message;
			};
		}
		throw new WagnerLoadShaderException( file );
	};
	oReq.onabort = function() {

		function WagnerLoadShaderException( f ) {
			this.message = 'Shader "' + f + '" load was aborted.';
			this.name = "WagnerLoadShaderException";
			this.toString = function() {
				return this.message;
			};
		}
		throw new WagnerLoadShaderException( file );
	};
	oReq.open( 'get', file, true );
	oReq.send();

};

WAGNER.processShader = function( vertexShaderCode, fragmentShaderCode ) {

	WAGNER.log( 'Processing Shader | Performing uniform Reflection...' );

	var regExp = /uniform\s+([^\s]+)\s+([^\s]+)\s*;/gi;
	var regExp2 = /uniform\s+([^\s]+)\s+([^\s]+)\s*\[\s*(\w+)\s*\]*\s*;/gi;

	var typesMap = {

		sampler2D: { type: 't', value: function() { return new THREE.Texture(); } },
		samplerCube: { type: 't', value: function() {} },

		bool:  { type: 'b', value: function() { return 0; } },
		int:   { type: 'i', value: function() { return 0; } },
		float: { type: 'f', value: function() { return 0; } },

		vec2: { type: 'v2', value: function() { return new THREE.Vector2(); } },
		vec3: { type: 'v3', value: function() { return new THREE.Vector3(); } },
		vec4: { type: 'v4', value: function() { return new THREE.Vector4(); } },

		bvec2: { type: 'v2', value: function() { return new THREE.Vector2(); } },
		bvec3: { type: 'v3', value: function() { return new THREE.Vector3(); } },
		bvec4: { type: 'v4', value: function() { return new THREE.Vector4(); } },

		ivec2: { type: 'v2', value: function() { return new THREE.Vector2(); } },
		ivec3: { type: 'v3', value: function() { return new THREE.Vector3(); } },
		ivec4: { type: 'v4', value: function() { return new THREE.Vector4(); } },

		mat2: { type: 'v2', value: function() { return new THREE.Matrix2(); } },
		mat3: { type: 'v3', value: function() { return new THREE.Matrix3(); } },
		mat4: { type: 'v4', value: function() { return new THREE.Matrix4(); } }

	};

	var arrayTypesMap = {
		float: { type: 'fv', value: function() { return []; } },
		vec3: { type: 'v3v', value: function() { return []; } }
	};

	var matches;
	var uniforms = {
		resolution: { type: 'v2', value: new THREE.Vector2( 1, 1 ), default: true },
		time: { type: 'f', value: Date.now(), default: true },
		tInput: { type: 't', value: new THREE.Texture(), default: true }
	};

  var uniformType, uniformName, arraySize;

	while( ( matches = regExp.exec( fragmentShaderCode ) ) !== null) {
		if( matches.index === regExp.lastIndex) {
			regExp.lastIndex++;
		}
		uniformType = matches[ 1 ];
		uniformName = matches[ 2 ];
		WAGNER.log( '  > SINGLE', uniformType, uniformName );
		uniforms[ uniformName ] = {
			type: typesMap[ uniformType ].type,
			value: typesMap[ uniformType ].value()
		};
	}

	while( ( matches = regExp2.exec( fragmentShaderCode ) ) !== null) {
		if( matches.index === regExp.lastIndex) {
			regExp.lastIndex++;
		}
		uniformType = matches[ 1 ];
		uniformName = matches[ 2 ];
		arraySize = matches[ 3 ];
		WAGNER.log( '  > ARRAY', arraySize, uniformType, uniformName );
		uniforms[ uniformName ] = {
			type: arrayTypesMap[ uniformType ].type,
			value: arrayTypesMap[ uniformType ].value()
		};
	}

	WAGNER.log( 'Uniform reflection completed. Compiling...' );

	var shader = new THREE.ShaderMaterial( {
		uniforms: uniforms,
		vertexShader: vertexShaderCode,
		fragmentShader: fragmentShaderCode,
		shading: THREE.FlatShading,
		depthWrite: false,
		depthTest: false,
		transparent: true
	} );

	WAGNER.log( 'Compiled' );

	return shader;

};

WAGNER.Pass = function() {

	WAGNER.log( 'Pass constructor' );
	this.shader = null;
	this.loaded = null;
	this.params = {};
	this.isSim = false;

};

WAGNER.Pass.prototype.loadShader = function( id, c ) {

	var self = this;
	var vs = 'varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); }';
	WAGNER.loadShader( WAGNER.fragmentShadersPath + '/' + id, function( fs ) {
		self.shader = WAGNER.processShader( vs, fs );
		//self.mapUniforms( self.shader.uniforms );
		if( c ) c.apply( self );
	} );

};

WAGNER.Pass.prototype.mapUniforms = function( uniforms ) {

	var params = this.params;

	for( var j in uniforms ) {
		if( !uniforms[ j ].default ) {
			(function( id ) {
				Object.defineProperty( params, id, {
					get : function(){ return uniforms[ id ].value; },
					set : function( v ){ uniforms[ id ].value = v; },
					configurable : false
				} );
			})( j );
		}
	}

};

WAGNER.Pass.prototype.run = function( c ) {

	//WAGNER.log( 'Pass run' );
	c.pass( this.shader );

};

WAGNER.Pass.prototype.isLoaded = function() {

	if( this.loaded === null ) {
		if( this.shader instanceof THREE.ShaderMaterial ) {
			this.loaded = true;
		}
	} else {
		return this.loaded;
	}

};

WAGNER.Pass.prototype.getOfflineTexture = function( w, h, useRGBA ){

	var rtTexture = new THREE.WebGLRenderTarget( w, h, {
		minFilter: THREE.LinearFilter,
		magFilter: THREE.LinearFilter,
		format: useRGBA?THREE.RGBAFormat:THREE.RGBFormat
	} );

	return rtTexture;

};

WAGNER.CopyPass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'CopyPass constructor' );
	this.loadShader( 'copy-fs.glsl' );

};

WAGNER.CopyPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.GenericPass = function( fragmentShaderSource, c ) {

	WAGNER.Pass.call( this );
	var self = this;
	WAGNER.loadShader( WAGNER.vertexShadersPath + '/orto-vs.glsl', function( vs ) {
		WAGNER.loadShader( fragmentShaderSource, function( fs ) {
			self.shader = WAGNER.processShader( vs, fs );
			if( c ) c.apply( self );
		} );
	} );

}

WAGNER.GenericPass.prototype = Object.create( WAGNER.Pass.prototype );



WAGNER.Stack = function ( shadersPool ) {

    this.passItems = [];
    this.shadersPool = shadersPool;
    this.passes = [];

};

WAGNER.Stack.prototype.addPass = function ( shaderName, enabled, params, index ) {

    var length,
    	passItem = {
	        shaderName: shaderName,
	        enabled: enabled || false,
	        params: params
	    };

    this.passItems.push( passItem );
    length = this.passItems.length;

    this.updatePasses();

    if ( index ) {

        return this.movePassToIndex( this.passItems[ length ], index );

    } else {

        return length - 1;

    }

};

WAGNER.Stack.prototype.removePass = function ( index ) {

    this.passItems.splice(index, 1);
    this.updatePasses();

};

WAGNER.Stack.prototype.enablePass = function ( index ) {

    this.passItems[ index ].enabled = true;
    this.updatePasses();

};

WAGNER.Stack.prototype.disablePass = function ( index ) {

    this.passItems[ index ].enabled = false;
    this.updatePasses();

};

WAGNER.Stack.prototype.isPassEnabled = function ( index ) {

    return this.passItems[ index ].enabled;

};

WAGNER.Stack.prototype.movePassToIndex = function ( index, destIndex ) {

    this.passItems.splice( destIndex, 0, this.passItems.splice( index, 1 )[ 0 ] );
    this.updatePasses();
    return destIndex; //#TODO:180 check if destIndex is final index

};

WAGNER.Stack.prototype.reverse = function () {

    this.passItems.reverse();
    this.updatePasses();

};

WAGNER.Stack.prototype.updatePasses = function () {

    this.passes = this.shadersPool.getPasses( this.passItems );

    // init default params for new passItems
    this.passItems.forEach( function ( passItem, index ) {

    	if (passItem.params === undefined) {

    		passItem.params = JSON.parse(JSON.stringify(this.passes[index].params)); // clone params without reference to the real shader instance params
    		// console.log('updatePasses', passItem, passItem.params);

    	}

    }.bind(this) );

	// console.log('Updated stack passes list from shaders pool. Stack contains', this.passes.length, 'shaders, and there are', this.shadersPool.availableShaders.length, 'shaders in the pool.');

};

WAGNER.Stack.prototype.getPasses = function () {

    return this.passes;

};




WAGNER.ShadersPool = function () {

    this.availableShaders = [];

};

WAGNER.ShadersPool.prototype.getPasses = function ( passItems ) {

	var pass,
		passes = [];

    this.availableShaders.forEach( function ( availableShader ) {

        availableShader.used = false;

    } );

    if ( passItems ) {

        passItems.forEach( function ( passItem, index ) {

            if ( passItem.enabled ) {

            	pass = this.getShaderFromPool( passItem.shaderName, passItem.params );

            	if ( passItem.params ) {

            		pass.params = this.extendParams(pass.params, passItem.params)

            	}

                passes.push( pass );

            }

        }.bind( this ) );

    }

    return passes;

};

WAGNER.ShadersPool.prototype.getShaderFromPool = function ( shaderName, params ) {

    var pass,
        shaderItem;

    if ( shaderName && WAGNER[ shaderName ] ) {

    	for (var i = this.availableShaders.length - 1; i >= 0; i--) {

    		shaderItem = this.availableShaders[i];

            if ( !shaderItem.used && shaderItem.name === shaderName ) {

                shaderItem.used = true;
                pass = shaderItem.pass;
                break;

            }

    	};

        if ( !pass ) {

            pass = new WAGNER[ shaderName ]( params );

            shaderItem = {
                pass: pass,
                name: shaderName,
                used: true
            };

            this.availableShaders.push( shaderItem );

        }

        return pass;

    }

};


WAGNER.ShadersPool.prototype.extendParams = function(target, source) {

    var obj = {},
        i = 0,
        il = arguments.length,
        key;

    for (; i < il; i++) {

        for (key in arguments[i]) {

            if (arguments[i].hasOwnProperty(key)) {

                obj[key] = arguments[i][key];

            }
        }
    }

    return obj;

}





window.WAGNER = WAGNER;
})();
