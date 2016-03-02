WAGNER.BlendPass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'BlendPass constructor' );
	this.loadShader( 'blend-fs.glsl' );

	this.params.mode = 1;
	this.params.opacity = 1;
	this.params.tInput2 = null;
	this.params.resolution2 = new THREE.Vector2();
	this.params.sizeMode = 1;
	this.params.aspectRatio = 1;
	this.params.aspectRatio2 = 1;

};

WAGNER.BlendMode = {
	Normal: 1,
	Dissolve: 2,
	Darken: 3,
	Multiply: 4,
	ColorBurn: 5,
	LinearBurn: 6,
	DarkerColor: 7,
	Lighten: 8,
	Screen: 9,
	ColorDodge: 10,
	LinearDodge: 11,
	LighterColor: 12,
	Overlay: 13,
	SoftLight: 14,
	HardLight: 15,
	VividLight: 16,
	LinearLight: 17,
	PinLight: 18,
	HardMix: 19,
	Difference: 20,
	Exclusion: 21,
	Substract: 22,
	Divide: 23
};

WAGNER.BlendPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.BlendPass.prototype.run = function( c ) {

	this.shader.uniforms.mode.value = this.params.mode;
	this.shader.uniforms.opacity.value = this.params.opacity;
	this.shader.uniforms.tInput2.value = this.params.tInput2;
	this.shader.uniforms.sizeMode.value = this.params.sizeMode;
	this.shader.uniforms.aspectRatio.value = this.params.aspectRatio;
	this.shader.uniforms.aspectRatio2.value = this.params.aspectRatio2;
		c.pass( this.shader );

}

WAGNER.InvertPass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'InvertPass constructor' );
	this.loadShader( 'invert-fs.glsl' );

};

WAGNER.InvertPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.SymetricPass = function() {

    WAGNER.Pass.call( this );
    WAGNER.log( 'SymetricPass constructor' );
    this.loadShader( 'symetric-fs.glsl' );

    this.params.xReverse = false;
    this.params.yReverse = false;
    this.params.xMirror = false;
    this.params.yMirror = false;
    this.params.mirrorCenter = new THREE.Vector2( 0.5, 0.5);
    this.params.angle = 0;


};

WAGNER.SymetricPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.SymetricPass.prototype.run = function( c ) {

    this.shader.uniforms.xReverse.value = this.params.xReverse;
    this.shader.uniforms.yReverse.value = this.params.yReverse;
    this.shader.uniforms.xMirror.value = this.params.xMirror;
    this.shader.uniforms.yMirror.value = this.params.yMirror;
    this.shader.uniforms.mirrorCenter.value = this.params.mirrorCenter;
    this.shader.uniforms.angle.value = this.params.angle;

    c.pass( this.shader );

}


WAGNER.SepiaPass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'SepiaPass constructor' );
	this.loadShader( 'sepia-fs.glsl' );

	this.params.amount = 1;

};

WAGNER.SepiaPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.SepiaPass.prototype.run = function( c ) {

	this.shader.uniforms.amount.value = this.params.amount;
	c.pass( this.shader );

}

WAGNER.BrightnessContrastPass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'BrightnessContrastPass constructor' );
	this.loadShader( 'brightness-contrast-fs.glsl' );

	this.params.brightness = 1;
	this.params.contrast = 1;

};

WAGNER.BrightnessContrastPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.BrightnessContrastPass.prototype.run = function( c ) {

	this.shader.uniforms.brightness.value = this.params.brightness;
	this.shader.uniforms.contrast.value = this.params.contrast;

	c.pass( this.shader );

}

WAGNER.Pass.prototype.bindUniform = function( p, s, v, c ) {

	Object.defineProperty( p, v, { 
		get : function(){ return s.uniforms[ id ].value; }, 
		set : c,
		configurable : false 
	} );

};

WAGNER.NoisePass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'Noise Pass constructor' );
	this.loadShader( 'noise-fs.glsl' );

	this.params.amount = 0.1;
	this.params.speed = 0;

};

WAGNER.NoisePass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.NoisePass.prototype.run = function( c ) {

	this.shader.uniforms.amount.value = this.params.amount;
	this.shader.uniforms.speed.value = this.params.speed;
	c.pass( this.shader );

};

WAGNER.VignettePass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'Vignette Pass constructor' );
	this.loadShader( 'vignette-fs.glsl' );

	this.params.amount = 1;
	this.params.falloff = 0.1;

};

WAGNER.VignettePass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.VignettePass.prototype.run = function( c ) {

	this.shader.uniforms.amount.value = this.params.amount;
	this.shader.uniforms.falloff.value = this.params.falloff;
	c.pass( this.shader );

};

WAGNER.Vignette2Pass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'Vignette Pass constructor' );
	this.loadShader( 'vignette2-fs.glsl' );

	this.params.boost = 2;
	this.params.reduction = 2;

};

WAGNER.Vignette2Pass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.Vignette2Pass.prototype.run = function( c ) {

	this.shader.uniforms.boost.value = this.params.boost;
	this.shader.uniforms.reduction.value = this.params.reduction;
	c.pass( this.shader );

};

WAGNER.DenoisePass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'Denoise Pass constructor' );
	this.loadShader( 'denoise-fs.glsl' );

	this.params.exponent = 5;
	this.params.strength = 10;

};

WAGNER.DenoisePass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.DenoisePass.prototype.run = function( c ) {

	this.shader.uniforms.exponent.value = this.params.exponent;
	this.shader.uniforms.strength.value = this.params.strength;
	c.pass( this.shader );

};

WAGNER.BoxBlurPass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'BoxBlurPass Pass constructor' );
	this.loadShader( 'box-blur2-fs.glsl' );
	this.params.delta = new THREE.Vector2( 0, 0 );
	this.params.taps = 1;

};

WAGNER.BoxBlurPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.BoxBlurPass.prototype.run = function( c ) {

	this.shader.uniforms.delta.value.copy( this.params.delta );
	/*for( var j = 0; j < this.params.taps; j++ ) {
		this.shader.uniforms.delta.value.copy( this.params.delta );
		c.pass( this.shader );
	}*/
	c.pass( this.shader );

}

WAGNER.FullBoxBlurPass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'FullBoxBlurPass Pass constructor' );
	this.boxPass = new WAGNER.BoxBlurPass();
	this.params.amount = 20;
	this.params.taps = 1;

};

WAGNER.FullBoxBlurPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.FullBoxBlurPass.prototype.isLoaded = function() {

	if( this.boxPass.isLoaded() ) {
		this.loaded = true;
	}
	return WAGNER.Pass.prototype.isLoaded.call( this );

};

WAGNER.FullBoxBlurPass.prototype.run = function( c ) {

	var s = this.params.amount;
	this.boxPass.params.delta.set( s, 0 );
	this.boxPass.params.taps = this.params.taps;
	c.pass( this.boxPass );
	this.boxPass.params.delta.set( 0, s );
	c.pass( this.boxPass );

};

WAGNER.ZoomBlurPass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'ZoomBlurPass Pass constructor' );
	this.loadShader( 'zoom-blur-fs.glsl' );

	this.params.center = new THREE.Vector2( 0.5, 0.5 );
	this.params.strength = 2;

};

WAGNER.ZoomBlurPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.ZoomBlurPass.prototype.run = function( c ) {

	this.shader.uniforms.center.value.copy ( this.params.center );
	this.shader.uniforms.strength.value = this.params.strength;
	c.pass( this.shader );

};

WAGNER.MultiPassBloomPass = function( w, h ) {

	WAGNER.Pass.call( this );
	WAGNER.log( 'MultiPassBloomPass Pass constructor' );

	this.composer = null;

	this.tmpTexture  = this.getOfflineTexture( w, h, true );
	this.blurPass    = new WAGNER.FullBoxBlurPass();
	this.blendPass   = new WAGNER.BlendPass();
	this.zoomBlur    = new WAGNER.ZoomBlurPass();
	this.brightnessContrastPass = new WAGNER.BrightnessContrastPass();

	this.width = w || 512;
	this.height = h || 512;

	this.params.blurAmount = 20;
	this.params.applyZoomBlur = false;
	this.params.zoomBlurStrength = 2;
	this.params.useTexture = false;
	this.params.zoomBlurCenter = new THREE.Vector2( 0,0 );
	this.params.blendMode = WAGNER.BlendMode.Screen;

};

WAGNER.MultiPassBloomPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.MultiPassBloomPass.prototype.isLoaded = function() {

	if( this.blurPass.isLoaded() && 
		this.blendPass.isLoaded() &&
		this.zoomBlur.isLoaded() ) {
		this.loaded = true;
	}
	return WAGNER.Pass.prototype.isLoaded.call( this );

};

WAGNER.MultiPassBloomPass.prototype.run = function( c ) {

	if( !this.composer ) {
		this.composer = new WAGNER.Composer( c.renderer, { useRGBA: true } );
		this.composer.setSize( this.width, this.height );
		//this.composer.setSize( this.tmpTexture.width, this.tmpTexture.height );
	}

	/*var s = 0.5;
	if( c.width != this.tmpTexture.width / s || c.height != this.tmpTexture.height / s ) {
		this.tmpTexture  = this.getOfflineTexture( c.width * s, c.height * s, true );
		this.composer.setSize( this.tmpTexture.width, this.tmpTexture.height );
	}*/

	this.composer.reset();

	if( this.params.useTexture === true ) {
		this.composer.setSource( this.params.glowTexture );
	} else {
		this.composer.setSource( c.output );
		/*this.brightnessContrastPass.params.brightness = -1;
		this.brightnessContrastPass.params.contrast = 5;
		this.composer.pass( this.brightnessContrastPass );*/
	}

	this.blurPass.params.amount = this.params.blurAmount;
	this.composer.pass( this.blurPass );
	
	if( this.params.applyZoomBlur ) {
		this.zoomBlur.params.center.set( .5 * this.composer.width, .5 * this.composer.height );
		this.zoomBlur.params.strength = this.params.zoomBlurStrength;
		this.composer.pass( this.zoomBlur );
	}

	if( this.params.useTexture === true ) {
		this.blendPass.params.mode = WAGNER.BlendMode.Screen;
		this.blendPass.params.tInput = this.params.glowTexture;
		c.pass( this.blendPass );
	}

	this.blendPass.params.mode = this.params.blendMode;
	this.blendPass.params.tInput2 = this.composer.output;
	c.pass( this.blendPass );
	
};

WAGNER.CGAPass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'CGA Pass constructor' );
	this.loadShader( 'cga-fs.glsl', function() {
		this.shader.uniforms.pixelDensity.value = window.devicePixelRatio;
	} );

};

WAGNER.CGAPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.SobelEdgeDetectionPass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'SobelEdgeDetectionPass Pass constructor' );
	this.loadShader( 'sobel-fs.glsl' );

};

WAGNER.SobelEdgeDetectionPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.FreiChenEdgeDetectionPass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'FreiChenEdgeDetectionPass Pass constructor' );
	this.loadShader( 'frei-chen-fs.glsl' );

};

WAGNER.FreiChenEdgeDetectionPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.DirtPass = function() {

	WAGNER.Pass.call( this );
	this.blendPass = new WAGNER.BlendPass();
	this.dirtTexture = THREE.ImageUtils.loadTexture( WAGNER.assetsPath + '/textures/dirt8.jpg' );

	this.params.blendMode = WAGNER.BlendMode.SoftLight;

};

WAGNER.DirtPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.DirtPass.prototype.isLoaded = function() {

	if( this.blendPass.isLoaded() ) {
		this.loaded = true;
	}
	return WAGNER.Pass.prototype.isLoaded.call( this );

};

WAGNER.DirtPass.prototype.run = function( c ) {

	this.blendPass.params.sizeMode = 1;
	this.blendPass.params.mode = this.params.blendMode;
	this.blendPass.params.tInput2 = this.dirtTexture;
	if( this.dirtTexture.image ) {
		this.blendPass.params.resolution2.set( this.dirtTexture.image.width, this.dirtTexture.image.height );
		this.blendPass.params.aspectRatio2 = this.dirtTexture.image.width / this.dirtTexture.image.height;
	}
	this.blendPass.params.aspectRatio = c.read.width / c.read.height;
	c.pass( this.blendPass );

};

WAGNER.GuidedBoxBlurPass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'GuidedBoxBlurPass Pass constructor' );
	this.loadShader( 'guided-box-blur2-fs.glsl' );

	this.params.tBias = null;
	this.params.delta = new THREE.Vector2( 1., 0 );
	this.params.invertBiasMap = false;
	this.params.isPacked = 0;
	this.params.from = 0;
	this.params.to = 1;

};

WAGNER.GuidedBoxBlurPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.GuidedBoxBlurPass.prototype.run = function( c ) {

	this.shader.uniforms.tBias.value = this.params.tBias,
	this.shader.uniforms.delta.value.copy( this.params.delta );
	this.shader.uniforms.delta.value.multiplyScalar( .0001 );
	this.shader.uniforms.invertBiasMap.value = this.params.invertBiasMap;
	this.shader.uniforms.isPacked.value = this.params.isPacked;
	this.shader.uniforms.from.value = this.params.from;
	this.shader.uniforms.to.value = this.params.to;
	c.pass( this.shader );

}

WAGNER.GuidedFullBoxBlurPass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'FullBoxBlurPass Pass constructor' );
	this.guidedBoxPass = new WAGNER.GuidedBoxBlurPass();

	this.params.tBias = null;
	this.params.invertBiasMap = false;
	this.params.isPacked = 0;
	this.params.amount = 10;
	this.params.from = 0;
	this.params.to = 1;
	this.params.taps = 1;

};

WAGNER.GuidedFullBoxBlurPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.GuidedFullBoxBlurPass.prototype.isLoaded = function() {

	if( this.guidedBoxPass.isLoaded() ) {
		this.loaded = true;
	}
	return WAGNER.Pass.prototype.isLoaded.call( this );

};

WAGNER.GuidedFullBoxBlurPass.prototype.run = function( c ) {

	this.guidedBoxPass.params.invertBiasMap = this.params.invertBiasMap;
	this.guidedBoxPass.params.isPacked = this.params.isPacked;
	this.guidedBoxPass.params.tBias = this.params.tBias;
	this.guidedBoxPass.params.from = this.params.from;
	this.guidedBoxPass.params.to = this.params.to;
	var s = this.params.amount;
	for( var j = 0; j < this.params.taps; j++ ) {
		this.guidedBoxPass.params.delta.set( s, 0 );
		c.pass( this.guidedBoxPass );
		this.guidedBoxPass.params.delta.set( 0, s );
		c.pass( this.guidedBoxPass );
	}

};

WAGNER.PixelatePass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'PixelatePass Pass constructor' );
	this.loadShader( 'pixelate-fs.glsl' );

	this.params.amount = 320;

};

WAGNER.PixelatePass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.PixelatePass.prototype.run = function( c ) {

	this.shader.uniforms.amount.value = this.params.amount;
	c.pass( this.shader );

}

WAGNER.RGBSplitPass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'RGBSplitPass Pass constructor' );
	this.loadShader( 'rgb-split-fs.glsl', function() {
	} );

	this.params.delta = new THREE.Vector2();

};

WAGNER.RGBSplitPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.RGBSplitPass.prototype.run = function( c ) {

	this.shader.uniforms.delta.value.copy( this.params.delta );
	c.pass( this.shader );

}

/*

https://www.shadertoy.com/view/XssGz8

Simulates Chromatic Aberration by linearly interpolating blur-weights from red to green to blue.
Original idea by Kusma: https://github.com/kusma/vlee/blob/master/data/postprocess.fx
Barrel Blur forked from https://www.shadertoy.com/view/XslGz8

*/

WAGNER.ChromaticAberrationPass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'ChromaticAberrationPass Pass constructor' );
	this.loadShader( 'chromatic-aberration-fs.glsl' );

};

WAGNER.ChromaticAberrationPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.BarrelBlurPass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'BarrelBlurPass Pass constructor' );
	this.loadShader( 'barrel-blur-fs.glsl' );

};

WAGNER.BarrelBlurPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.OldVideoPass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'OldVideoPass Pass constructor' );
	this.loadShader( 'old-video-fs.glsl' );

};

WAGNER.OldVideoPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.DotScreenPass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'DotScreenPass Pass constructor' );
	this.loadShader( 'dot-screen-fs.glsl' );

};

WAGNER.DotScreenPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.PoissonDiscBlurPass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'PoissonDiscBlurPass Pass constructor' );
	this.loadShader( 'poisson-disc-blur-fs.glsl' );

};

WAGNER.PoissonDiscBlurPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.CircularBlurPass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'CircularBlurPass Pass constructor' );
	this.loadShader( 'circular-blur-fs.glsl' );

};

WAGNER.CircularBlurPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.ToonPass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'ToonPass Pass constructor' );
	this.loadShader( 'toon-fs.glsl' );

};

WAGNER.ToonPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.FXAAPass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'FXAA Pass constructor' );
	this.loadShader( 'fxaa-fs.glsl' );

};

WAGNER.FXAAPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.HighPassPass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'HighPass Pass constructor' );
	this.loadShader( 'high-pass-fs.glsl' );

};

WAGNER.HighPassPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.GrayscalePass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'GrayscalePass Pass constructor' );
	this.loadShader( 'grayscale-fs.glsl' );

};

WAGNER.GrayscalePass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.ASCIIPass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'ASCIIPass Pass constructor' );
	this.loadShader( 'ascii-fs.glsl', function() {
		this.shader.uniforms.tAscii.value = THREE.ImageUtils.loadTexture( WAGNER.assetsPath + '/ascii/8x16_ascii_font_sorted.gif' );
	} );

};

WAGNER.ASCIIPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.LEDPass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'LEDPass Pass constructor' );
	this.loadShader( 'led-fs.glsl', function() {
		
		//this.shader.uniforms.noiseTexture.value = 1;
	} );

	this.params.pixelSize = 10;
	this.params.tolerance = .25;
	this.params.pixelRadius = .25;
	this.params.luminanceSteps = 100;
	this.params.luminanceBoost = .2;
	this.params.colorBoost = .01;
	this.params.burntOutPercent = 50;
};

WAGNER.LEDPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.LEDPass.prototype.run = function( c ) {

	this.shader.uniforms.pixelSize.value = this.params.pixelSize;
	this.shader.uniforms.tolerance.value = this.params.tolerance;
	this.shader.uniforms.pixelRadius.value = this.params.pixelRadius;
	this.shader.uniforms.luminanceSteps.value = this.params.luminanceSteps;
	this.shader.uniforms.luminanceBoost.value = this.params.luminanceBoost;
	this.shader.uniforms.colorBoost.value = this.params.colorBoost;
	this.shader.uniforms.burntOutPercent.value = this.params.burntOutPercent;

	c.pass( this.shader );

}

WAGNER.HalftonePass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'HalftonePass Pass constructor' );
	this.loadShader( 'halftone-fs.glsl', function() {
		this.shader.uniforms.pixelSize.value = 6;
	} );

};

WAGNER.HalftonePass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.Halftone2Pass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'Halftone2Pass Pass constructor' );
	this.loadShader( 'halftone2-fs.glsl' );

	this.params.amount = 128;
	this.params.smoothness = .25;

};

WAGNER.Halftone2Pass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.Halftone2Pass.prototype.run = function( c ) {

	this.shader.uniforms.amount.value = this.params.amount;
	this.shader.uniforms.smoothness.value = this.params.smoothness;

	c.pass( this.shader );

}

WAGNER.HalftoneCMYKPass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'HalftoneCMYKPass Pass constructor' );
	this.loadShader( 'halftone-cmyk-fs.glsl', function() {

	} );

};

WAGNER.HalftoneCMYKPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.CrossFadePass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'CrossFadePass Pass constructor' );
	this.loadShader( 'crossfade-fs.glsl' );

	this.params.tInput2 = null;
	this.params.tFadeMap = null;
	this.params.amount = 0;

};

WAGNER.CrossFadePass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.CrossFadePass.prototype.run = function( c ) {

	this.shader.uniforms.tInput2.value = this.params.tInput2;
	this.shader.uniforms.tFadeMap.value = this.params.tFadeMap;
	this.shader.uniforms.amount.value = this.params.amount;

	c.pass( this.shader );

}

WAGNER.SSAOPass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'SSAOPass Pass constructor' );
	this.loadShader( 'ssao-fs.glsl', function( fs ) {
		
		/*this.shader.uniforms.pSphere.value = [
			new THREE.Vector3(-0.010735935, 0.01647018, 0.0062425877),
			new THREE.Vector3(-0.06533369, 0.3647007, -0.13746321),
			new THREE.Vector3(-0.6539235, -0.016726388, -0.53000957),
			new THREE.Vector3(0.40958285, 0.0052428036, -0.5591124),
			new THREE.Vector3(-0.1465366, 0.09899267, 0.15571679),
			new THREE.Vector3(-0.44122112, -0.5458797, 0.04912532),
			new THREE.Vector3(0.03755566, -0.10961345, -0.33040273),
			new THREE.Vector3(0.019100213, 0.29652783, 0.066237666),
			new THREE.Vector3(0.8765323, 0.011236004, 0.28265962),
			new THREE.Vector3(0.29264435, -0.40794238, 0.15964167)
		];*/
		
	} );

	this.params.texture = null;
	this.params.isPacked = false;
	this.params.onlyOcclusion = false;

	this.blurPass = new WAGNER.FullBoxBlurPass();
	this.blendPass = new WAGNER.BlendPass();
	this.composer = null;

};

WAGNER.SSAOPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.SSAOPass.prototype.run = function( c ) {

	if( !this.composer ) {
		var s = 4;
		this.composer = new WAGNER.Composer( c.renderer, { useRGBA: true } );
		this.composer.setSize( c.width / s, c.height / s );
	}

	this.composer.reset();

	this.composer.setSource( c.output );

	this.shader.uniforms.tDepth.value = this.params.texture;
	//this.shader.uniforms.isPacked.value = this.params.isPacked;
	this.shader.uniforms.onlyOcclusion.value = this.params.onlyOcclusion;
	this.composer.pass( this.shader );

	this.blurPass.params.amount = .1;
	this.composer.pass( this.blurPass );

	if( this.params.onlyOcclusion ) {
		c.setSource( this.composer.output );
	} else {		
		this.blendPass.params.mode = WAGNER.BlendMode.Multiply;
		this.blendPass.params.tInput2 = this.composer.output;

		c.pass( this.blendPass );
	}

}

WAGNER.SimpleSSAOPass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'SimpleSSAOPass Pass constructor' );
	this.loadShader( 'ssao-simple-fs.glsl', function( fs ) {
	} );

	this.params.texture = null;
	this.params.onlyOcclusion = 0;
	this.params.zNear = 1;
	this.params.zFar = 10000;
	this.params.strength = 1;

};

WAGNER.SimpleSSAOPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.SimpleSSAOPass.prototype.run = function( c ) {

	this.shader.uniforms.tDepth.value = this.params.texture;
//	this.shader.uniforms.onlyOcclusion.value = this.params.onlyOcclusion;
	this.shader.uniforms.zNear.value = this.params.zNear;
	this.shader.uniforms.zFar.value = this.params.zFar;
	this.shader.uniforms.strength.value = this.params.strength;

	c.pass( this.shader );

}

WAGNER.DirectionalBlurPass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'Directional Blur Pass constructor' );
	this.loadShader( 'guided-directional-blur-fs.glsl', function( fs ) {
		
	} );

	this.params.tBias = null;
	this.params.delta = .1;

}

WAGNER.DirectionalBlurPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.DirectionalBlurPass.prototype.run = function( c ) {

	this.shader.uniforms.tBias.value = this.params.tBias;
	this.shader.uniforms.delta.value = this.params.delta;

	c.pass( this.shader );

}

WAGNER.BleachPass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'Bleach Pass constructor' );
	this.loadShader( 'bleach-fs.glsl', function( fs ) {
		
	} );

	this.params.amount = 1;

}

WAGNER.BleachPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.BleachPass.prototype.run = function( c ) {

	this.shader.uniforms.amount.value = this.params.amount;

	c.pass( this.shader );

}

WAGNER.DOFPass = function() {

	WAGNER.Pass.call( this );
	WAGNER.log( 'DOFPass Pass constructor' );
	this.loadShader( 'dof-fs.glsl' );

	this.params.focalDistance = 0;
	this.params.aperture = .005;
	this.params.tBias = null;
	this.params.blurAmount = 1;

};

WAGNER.DOFPass.prototype = Object.create( WAGNER.Pass.prototype );

WAGNER.DOFPass.prototype.run = function( c ) {

	this.shader.uniforms.tBias.value = this.params.tBias;
	this.shader.uniforms.focalDistance.value = this.params.focalDistance;
	this.shader.uniforms.aperture.value = this.params.aperture;
	this.shader.uniforms.blurAmount.value = this.params.blurAmount;

	this.shader.uniforms.delta.value.set( 1, 0 );
	c.pass( this.shader );

	this.shader.uniforms.delta.value.set( 0, 1 );
	c.pass( this.shader );

}