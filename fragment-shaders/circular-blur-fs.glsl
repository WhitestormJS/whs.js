uniform sampler2D tInput;
uniform vec2 resolution;
varying vec2 vUv;

float nrand( vec2 n ) {
	return fract(sin(dot(n.xy, vec2(12.9898, 78.233)))* 43758.5453);
}

vec2 rot2d( vec2 p, float a ) {
	vec2 sc = vec2(sin(a),cos(a));
	return vec2( dot( p, vec2(sc.y, -sc.x) ), dot( p, sc.xy ) );
}

void main(void)
{
	vec2 uv = gl_FragCoord.xy / resolution.xy;
	uv.x += 0.1;//*iGlobalTime;

	float maxofs = 12.0;// * (0.5+0.5*sin( iGlobalTime ));
	const int NUM_SAMPLES = 16;
	const int NUM_SAMPLES2 = NUM_SAMPLES/2;
	const float NUM_SAMPLES_F = float(NUM_SAMPLES);
	const float anglestep = 6.28 / NUM_SAMPLES_F;
	const float MIPBIAS = -8.0; //note: make sure we always pick mip0

	//note: rand
	float rnd = nrand( 0.01*gl_FragCoord.xy );//+ fract(iGlobalTime) );
	
	//note: ordered dither
	//float rnd = texture2D( iChannel1, gl_FragCoord.xy / 8.0 ).r;

	//note: create halfcircle of offsets
	vec2 ofs[NUM_SAMPLES];
	{
		float angle = 3.1416*rnd;
		for( int i=0;i<NUM_SAMPLES2;++i )
		{
			ofs[i] = rot2d( vec2(maxofs,0.0), angle ) / resolution.xy;
			angle += anglestep;
		}
	}
	
	vec4 sum = vec4(0.0);
	//note: sample positive half-circle
	for( int i=0;i<NUM_SAMPLES2;++i )
		sum += texture2D( tInput, vec2(uv.x, uv.y)+ofs[i], MIPBIAS );

	//note: sample negative half-circle
	for( int i=0;i<NUM_SAMPLES2;++i )
		sum += texture2D( tInput, vec2(uv.x, uv.y)-ofs[i], MIPBIAS );

	gl_FragColor.rgb = sum.rgb / NUM_SAMPLES_F;
	gl_FragColor.a = texture2D( tInput, vUv ).a;
}
