varying vec2 vUv;
uniform sampler2D tInput;
uniform sampler2D tBias;
uniform vec2 delta;
uniform float invertBiasMap;
uniform float isPacked;
uniform float from;
uniform float to;

float random(vec3 scale,float seed){return fract(sin(dot(gl_FragCoord.xyz+seed,scale))*43758.5453+seed);}

float unpack_depth(const in vec4 color) {
	return ( color.r * 256. * 256. * 256. + color.g * 256. * 256. + color.b * 256. + color.a ) / ( 256. * 256. * 256. );
}

float sampleBias( vec2 uv ) {
	float b = ( texture2D( tBias, uv ).r - from ) / ( to - from );
	b = clamp( b, 0., 1. );
	if( invertBiasMap == 1. ) b = 1. - b;
	return b;
	//return unpack_depth( texture2D( tBias, uv ) );
}

void main() {

	vec4 sum = vec4( 0. );
	float bias = sampleBias( vUv );

	sum += texture2D( tInput, ( vUv - bias * delta * 4. ) ) * 0.051;
	sum += texture2D( tInput, ( vUv - bias * delta * 3. ) ) * 0.0918;
	sum += texture2D( tInput, ( vUv - bias * delta * 2. ) ) * 0.12245;
	sum += texture2D( tInput, ( vUv - bias * delta * 1. ) ) * 0.1531;
	sum += texture2D( tInput, ( vUv + bias * delta * 0. ) ) * 0.1633;
	sum += texture2D( tInput, ( vUv + bias * delta * 1. ) ) * 0.1531;
	sum += texture2D( tInput, ( vUv + bias * delta * 2. ) ) * 0.12245;
	sum += texture2D( tInput, ( vUv + bias * delta * 3. ) ) * 0.0918;
	sum += texture2D( tInput, ( vUv + bias * delta * 4. ) ) * 0.051;

	gl_FragColor = sum;
	
}