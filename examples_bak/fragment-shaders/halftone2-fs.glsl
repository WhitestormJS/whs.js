// adapted from http://www.is-real.net/experiments/webgl/wwdc2014/

varying vec2 vUv;
uniform sampler2D tInput;
uniform vec2 resolution;
uniform float pixelSize;
uniform float amount;
uniform float smoothness;

float antialiasStep( float threshold, float value ) {

  float afwidth = amount * ( 1.0 / 200.0 );
  return smoothstep( threshold - afwidth, threshold, value );

}

float roundedBox( vec2 position, vec2 size, float radius ) {

  return length( max( abs( position ) - size, 0.0 ) ) - radius;

}

void main(void) {

  float ar = resolution.x / resolution.y;
  vec2 nearest = 2.0 * fract( amount * vec2( 1., 1. / ar ) * vUv ) - 1.0;
  float distX = length( nearest.x );
  float distY = length( nearest.y );
  float dist = length( nearest );

  vec2 d = vec2( 1. / amount ) * vec2( 1., ar );
  vec2 tUv = floor( vUv / d ) * d;
  vec3 dotColorCalculation = texture2D( tInput, tUv ).rgb;
  vec3 luma = vec3( .299, 0.587, 0.114 );
  vec3 gradientColor = dotColorCalculation ;//texture2D( tInput, vUv ).rgb;
  float radius = sqrt( dot( dotColorCalculation, luma ) );

  vec3 bkgColor = vec3( 0. );//1.0, 1.0, 1.0 );

  vec4 halfToneDotColor = vec4( mix( gradientColor.rgb, bkgColor, antialiasStep( radius, dist ) ), 1.0 );

  float b = roundedBox( vec2( distX+0.02, distY+0.02 ), vec2( .5 * radius ), 0.4 * radius );
  vec4 halfToneSquircleColor = vec4( mix( bkgColor, gradientColor.rgb, smoothstep( smoothness, 0.0, b) ), 1.0 );

  gl_FragColor = halfToneSquircleColor;

}
