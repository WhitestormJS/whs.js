uniform sampler2D tInput;
uniform vec2 resolution;
uniform sampler2D leftEyeTexture;
uniform sampler2D rightEyeTexture;

varying vec2 vUv;


void main(void) {

	if( vUv.x < .5 ) {	
		gl_FragColor = texture2D( leftEyeTexture, vUv * vec2( 2., 1. ) );
	} else {
		gl_FragColor = texture2D( rightEyeTexture, vUv * vec2( 2., 1. ) - vec2( 1., 0. ) );
	}

}