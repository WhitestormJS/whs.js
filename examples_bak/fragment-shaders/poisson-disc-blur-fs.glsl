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
	const int NUM_TAPS = 12;
	float max_siz = 42.0;// * (0.5+0.5*sin(iGlobalTime));
	
	vec2 fTaps_Poisson[NUM_TAPS];
	fTaps_Poisson[0]  = vec2(-.326,-.406);
	fTaps_Poisson[1]  = vec2(-.840,-.074);
	fTaps_Poisson[2]  = vec2(-.696, .457);
	fTaps_Poisson[3]  = vec2(-.203, .621);
	fTaps_Poisson[4]  = vec2( .962,-.195);
	fTaps_Poisson[5]  = vec2( .473,-.480);
	fTaps_Poisson[6]  = vec2( .519, .767);
	fTaps_Poisson[7]  = vec2( .185,-.893);
	fTaps_Poisson[8]  = vec2( .507, .064);
	fTaps_Poisson[9]  = vec2( .896, .412);
	fTaps_Poisson[10] = vec2(-.322,-.933);
	fTaps_Poisson[11] = vec2(-.792,-.598);
	
	vec2 uv = gl_FragCoord.xy / resolution.xy;
	//uv.x += 0.05*iGlobalTime;
	vec4 sum = vec4(0);
	float rnd = 6.28 * nrand( uv /*+fract(iGlobalTime)*/ );
	
	vec4 basis = vec4( rot2d(vec2(1,0),rnd), rot2d(vec2(0,1),rnd) );
	for (int i=0; i < NUM_TAPS; i++)
	{
		vec2 ofs = fTaps_Poisson[i]; ofs = vec2(dot(ofs,basis.xz),dot(ofs,basis.yw) );
		//vec2 ofs = rot2d( fTaps_Poisson[i], rnd );
		vec2 texcoord = uv + max_siz * ofs / resolution.xy;
		sum += texture2D(tInput, texcoord, -10.0);
	}
	gl_FragColor = sum / vec4(NUM_TAPS);
}