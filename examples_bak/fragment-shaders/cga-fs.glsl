varying vec2 vUv;
uniform sampler2D tInput;
uniform vec2 resolution;
uniform sampler2D cgaMap;
uniform float pixelDensity;

void main() {

	float size = 2. * pixelDensity;
	float dSize = 2. * size;

	float amount = resolution.x / size;
	float d = 1.0 / amount;
	float ar = resolution.x / resolution.y;
	float sx = floor( vUv.x / d ) * d;
	d = ar / amount;
	float sy = floor( vUv.y / d ) * d;

	vec4 base = texture2D( tInput, vec2( sx, sy ) );

	float lum = .2126 * base.r + .7152 * base.g + .0722 * base.b;
	float o = floor( 6. * lum );

	vec3 c1;
	vec3 c2;
	
	vec3 black = vec3( 0. );
	vec3 light = vec3( 85., 255., 255. ) / 255.;
	vec3 dark = vec3( 254., 84., 255. ) / 255.;
	vec3 white = vec3( 1. );

	/*dark = vec3( 89., 255., 17. ) / 255.;
	light = vec3( 255., 87., 80. ) / 255.;
	white = vec3( 255., 255., 0. ) / 255.;*/

	/*light = vec3( 85., 255., 255. ) / 255.;
	dark = vec3( 255., 86., 80. ) / 255.;*/

	if( o == 0. ) { c1 = black; c2 = c1; }
	if( o == 1. ) { c1 = black; c2 = dark; }
	if( o == 2. ) { c1 = dark;  c2 = c1; }
	if( o == 3. ) { c1 = dark;  c2 = light; }
	if( o == 4. ) { c1 = light; c2 = c1; }
	if( o == 5. ) { c1 = light; c2 = white; }
	if( o == 6. ) { c1 = white; c2 = c1; }

	if( mod( gl_FragCoord.x, dSize ) > size ) {
		if( mod( gl_FragCoord.y, dSize ) > size ) {
			base.rgb = c1;
		} else {
			base.rgb = c2;	
		}
	} else {
		if( mod( gl_FragCoord.y, dSize ) > size ) {
			base.rgb = c2;
		} else {
			base.rgb = c1;		
		}
	}

	gl_FragColor = vec4( base.rgb, base.a );

}