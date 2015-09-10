varying vec2 vUv;

void main() {

	vUv = uv;
//	vPosition = vec4( modelViewMatrix * vec4( position, 1.0 ) ).xyz;
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}