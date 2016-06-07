uniform sampler2D tInput;
uniform vec2 center;
uniform float strength;
uniform vec2 resolution;
varying vec2 vUv;

/*float random(vec3 scale,float seed){return fract(sin(dot(gl_FragCoord.xyz+seed,scale))*43758.5453+seed);}

void main(){
	vec4 color=vec4(0.0);
	float total=0.0;
	vec2 toCenter=center-vUv*resolution;
	float offset=random(vec3(12.9898,78.233,151.7182),0.0);
	for(float t=0.0;t<=40.0;t++){
		float percent=(t+offset)/40.0;
		float weight=4.0*(percent-percent*percent);
		vec4 sample=texture2D(tInput,);
		sample.rgb*=sample.a;
		color+=sample*weight;
		total+=weight;
	}
	gl_FragColor=color/total;
	gl_FragColor.rgb/=gl_FragColor.a+0.00001;
}*/

void main() {

	vec4 sum = vec4( 0. );

	vec2 toCenter = center - vUv * resolution;
	vec2 inc = toCenter * strength / resolution;
	float boost = 2.;

	inc = center / resolution - vUv;
	
	sum += texture2D( tInput, ( vUv - inc * 4. ) ) * 0.051;
	sum += texture2D( tInput, ( vUv - inc * 3. ) ) * 0.0918;
	sum += texture2D( tInput, ( vUv - inc * 2. ) ) * 0.12245;
	sum += texture2D( tInput, ( vUv - inc * 1. ) ) * 0.1531;
	sum += texture2D( tInput, ( vUv + inc * 0. ) ) * 0.1633;
	sum += texture2D( tInput, ( vUv + inc * 1. ) ) * 0.1531;
	sum += texture2D( tInput, ( vUv + inc * 2. ) ) * 0.12245;
	sum += texture2D( tInput, ( vUv + inc * 3. ) ) * 0.0918;
	sum += texture2D( tInput, ( vUv + inc * 4. ) ) * 0.051;

	gl_FragColor = sum;

}