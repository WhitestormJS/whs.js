varying vec2 vUv;
uniform sampler2D tInput;
uniform sampler2D tBias;
uniform float radius;
uniform float amount;
uniform vec2 resolution;
uniform float focalDistance;
uniform float aperture;

// Bokeh disc.
// by David Hoskins.
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

#define ITERATIONS 150.0

#define ONEOVER_ITR  1.0 / ITERATIONS
#define PI 3.141596

// This is (3.-sqrt(5.0))*PI radians, which doesn't precompiled for some reason.
// The compiler is a dunce I tells-ya!!
#define GOLDEN_ANGLE 2.39996323

//-------------------------------------------------------------------------------------------
// This creates the 2D offset for the next point.
// (r-1.0) is the same as sqrt(0, 1,  2, 3...)
vec2 Sample(in float theta, inout float r)
{
    r += 1.0 / r;
	return (r-1.0) * vec2(cos(theta), sin(theta)) * .06;
}

//-------------------------------------------------------------------------------------------
vec3 Bokeh(sampler2D tex, vec2 uv, float radius, float amount)
{
	vec3 acc = vec3(0.0);
	vec3 div = vec3(0.0);
    vec2 pixel = vec2(resolution.y/resolution.x, 1.0) * radius * .025;
    float r = 1.0;
	for (float j = 0.0; j < GOLDEN_ANGLE * ITERATIONS; j += GOLDEN_ANGLE)
    {
       	
		vec3 col = texture2D(tex, uv + pixel * Sample(j, r)).xyz;
       // col = col * col * 1.2; // ...contrast it for better highlights
		vec3 bokeh = vec3(.5) + pow(col, vec3(10.0)) * amount;
		acc += col * bokeh;
		div += bokeh;
	}
	return acc / div;
}

float sampleBias( vec2 uv ) {
	float d = abs( texture2D( tBias, uv ).r - focalDistance );
	return d * aperture;//min( d * aperture, .005 );
	//return unpack_depth( texture2D( tBias, uv ) );
}

//-------------------------------------------------------------------------------------------
void main(void)
{
	vec2 uv = gl_FragCoord.xy / resolution.xy;
 	float bias = sampleBias( vUv );

	gl_FragColor = vec4(Bokeh(tInput, uv*vec2(1.0, 1.0), radius * bias, amount ), 1.0);

}