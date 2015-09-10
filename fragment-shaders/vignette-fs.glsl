uniform sampler2D tInput;
uniform float falloff;
uniform float amount;
varying vec2 vUv;

void main() {

    vec4 color = texture2D(tInput, vUv);
    
    float dist = distance(vUv, vec2(0.5, 0.5));
    color.rgb *= smoothstep(0.8, falloff * 0.799, dist * (amount + falloff));
    
    gl_FragColor = color;

}