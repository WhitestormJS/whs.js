uniform sampler2D tInput;
uniform vec2 resolution;
uniform float amount;

varying vec2 vUv;

const vec4 one = vec4(1.0);
const vec4 two = vec4(2.0);
const vec4 lumcoeff = vec4(0.2125,0.7154,0.0721,0.0);

vec4 overlay(vec4 myInput, vec4 previousmix, vec4 amount) {
	float luminance = dot(previousmix,lumcoeff);
	float mixamount = clamp((luminance - 0.45) * 10.0, 0.0, 1.0);

	vec4 branch1 = two * previousmix * myInput;
	vec4 branch2 = one - (two * (one - previousmix) * (one - myInput));

	vec4 result = mix(branch1, branch2, vec4(mixamount) );

	return mix(previousmix, result, amount);
}

void main (void)  {
	vec4 pixel = texture2D(tInput, vUv);
	vec4 luma = vec4(vec3(dot(pixel,lumcoeff)), pixel.a);
	gl_FragColor = overlay(luma, pixel, vec4(amount));
}
