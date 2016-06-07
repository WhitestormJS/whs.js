uniform float mNear;
uniform float mFar;
uniform float isPacked;
varying float depth;

vec4 pack_depth( const in float f ) {
	vec4 color;
	color.r = floor( f / ( 256. * 256. * 256. ) );
	color.g = floor( ( mod( f,  256. * 256. * 256. ) ) / ( 256. * 256. ) );
	color.b = floor( ( mod( f,  256. * 256. ) ) / 256. );
	color.a = floor( mod( f, 256.)  );
	return color / 256.0;
}

void main() {

	/*float z = gl_FragCoord.z * 2.0 - 1.0 
	float depth = gl_FragCoord.z / gl_FragCoord.w;
	float color = 1. - ( depth - mNear ) / ( mFar - mNear );

	if( isPacked == 1. ) {
		color *= 256. * 256. * 256. * 256.;
		gl_FragColor = pack_depth( color );
	} else {
		gl_FragColor = vec4( vec3( color ), 1. );
	}*/

	gl_FragColor = vec4( vec3( 1. - depth ), 1. );
//	gl_FragColor = vec4( vNormal.xyz, color );

}	