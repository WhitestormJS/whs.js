varying vec2 vUv;
uniform sampler2D tInput;
uniform sampler2D tBias;
uniform float delta;

float random(vec3 scale,float seed){return fract(sin(dot(gl_FragCoord.xyz+seed,scale))*43758.5453+seed);}

float sampleBias( vec2 uv ) {
	//return texture2D( tBias, uv ).r;
	vec3 luma = vec3( .299, 0.587, 0.114 );
	return dot( texture2D( tBias, uv ).rgb, luma );
}

void main() {

	float f = sampleBias( vUv );
	float a = - f * 3.14159;
	vec4 o = texture2D( tInput,vUv );
	vec4 color=vec4(0.0);
	float total=0.0;
	vec2 tDelta = delta * vec2( cos( a ), sin( a ) );
	float offset=random(vec3(12.9898,78.233,151.7182),0.0);
	for(float t=-30.0;t<=30.0;t++){
		float percent=(t+offset-0.5)/30.0;
		float weight=1.0-abs(percent);
		vec4 sample=texture2D(tInput,vUv+tDelta*percent);
		sample.rgb*=sample.a;
		color+=sample*weight;
		total+=weight;
	}
	
	if( total == 0. ) total = 1.;
	gl_FragColor = color / total;
	gl_FragColor.rgb/=gl_FragColor.a+0.00001;

}