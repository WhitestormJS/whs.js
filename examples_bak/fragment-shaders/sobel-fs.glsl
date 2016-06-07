uniform sampler2D tInput;
uniform vec2 resolution;
varying vec2 vUv;

void main(void) {

	float x = 1.0 / resolution.x;
	float y = 1.0 / resolution.y;
	vec4 horizEdge = vec4( 0.0 );
	horizEdge -= texture2D( tInput, vec2( vUv.x - x, vUv.y - y ) ) * 1.0;
	horizEdge -= texture2D( tInput, vec2( vUv.x - x, vUv.y     ) ) * 2.0;
	horizEdge -= texture2D( tInput, vec2( vUv.x - x, vUv.y + y ) ) * 1.0;
	horizEdge += texture2D( tInput, vec2( vUv.x + x, vUv.y - y ) ) * 1.0;
	horizEdge += texture2D( tInput, vec2( vUv.x + x, vUv.y     ) ) * 2.0;
	horizEdge += texture2D( tInput, vec2( vUv.x + x, vUv.y + y ) ) * 1.0;
	vec4 vertEdge = vec4( 0.0 );
	vertEdge -= texture2D( tInput, vec2( vUv.x - x, vUv.y - y ) ) * 1.0;
	vertEdge -= texture2D( tInput, vec2( vUv.x    , vUv.y - y ) ) * 2.0;
	vertEdge -= texture2D( tInput, vec2( vUv.x + x, vUv.y - y ) ) * 1.0;
	vertEdge += texture2D( tInput, vec2( vUv.x - x, vUv.y + y ) ) * 1.0;
	vertEdge += texture2D( tInput, vec2( vUv.x    , vUv.y + y ) ) * 2.0;
	vertEdge += texture2D( tInput, vec2( vUv.x + x, vUv.y + y ) ) * 1.0;
	vec3 edge = sqrt((horizEdge.rgb * horizEdge.rgb) + (vertEdge.rgb * vertEdge.rgb));
	
	gl_FragColor = vec4( edge, texture2D( tInput, vUv ).a );

}