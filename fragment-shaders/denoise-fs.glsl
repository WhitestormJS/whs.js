uniform sampler2D tInput;
uniform float exponent;
uniform float strength;
uniform vec2 resolution;
varying vec2 vUv;

void main() {

	vec4 center = texture2D(tInput, vUv);
	vec4 color = vec4(0.0);
	float total = 0.0;
	for (float x = -4.0; x <= 4.0; x += 1.0) {
		for (float y = -4.0; y <= 4.0; y += 1.0) {
			vec4 sample = texture2D(tInput, vUv + vec2(x, y) / resolution);
			float weight = 1.0 - abs(dot(sample.rgb - center.rgb, vec3(0.25)));
			weight = pow(weight, exponent);
			color += sample * weight;
			total += weight;
		}
	}
	gl_FragColor = color / total;

}