// from: http://www.ozone3d.net/smf/index.php?topic=68.0

uniform sampler2D tInput;
uniform vec2 resolution;

//uniform float kernel[9];

varying vec2 vUv;

float step_w = 1.0/resolution.x;
float step_h = 1.0/resolution.y;

void main(void)
{

	vec2 offset[9];
	float kernel[ 9 ];

	offset[ 0 ] = vec2(-step_w, -step_h);
	offset[ 1 ] = vec2(0.0, -step_h);
	offset[ 2 ] = vec2(step_w, -step_h);

	offset[ 3 ] = vec2(-step_w, 0.0);
	offset[ 4 ] = vec2(0.0, 0.0);
	offset[ 5 ] = vec2(step_w, 0.0);

	offset[ 6 ] = vec2(-step_w, step_h);
	offset[ 7 ] = vec2(0.0, step_h);
	offset[ 8 ] = vec2(step_w, step_h);

	kernel[ 0 ] = -1.;
	kernel[ 1 ] = -1.;
	kernel[ 2 ] = -1.;
	
	kernel[ 3 ] = -1.;
	kernel[ 4 ] = 8.;
	kernel[ 5 ] = -1.;
	
	kernel[ 6 ] = -1.;
	kernel[ 7 ] = -1.;
	kernel[ 8 ] = -1.;


   int i = 0;
   vec4 sum = vec4(0.0);

   for( int i=0; i<9; i++ )
   {
    vec4 tmp = texture2D(tInput, vUv + offset[i]);
    sum += tmp * kernel[i];
    sum.a = 1.0;
   }

   gl_FragColor = sum;
}