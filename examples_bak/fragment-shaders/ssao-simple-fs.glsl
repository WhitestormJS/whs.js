varying vec2 vUv;

uniform sampler2D tDepth;
uniform vec2 resolution;
uniform float zNear;
uniform float zFar;
uniform float strength;

// -------------

/*
SSAO GLSL shader v1.2
assembled by Martins Upitis (martinsh) (devlog-martinsh.blogspot.com)
original technique is made by Arkano22 (www.gamedev.net/topic/550699-ssao-no-halo-artifacts/)

changelog:
1.2 - added fog calculation to mask AO. Minor fixes.
1.1 - added spiral sampling method from here:
(http://www.cgafaq.info/wiki/Evenly_distributed_points_on_sphere)
*/
//uniform sampler2D bgl_RenderedTexture;

#define PI    3.14159265

float width = resolution.x; //texture width
float height = resolution.y; //texture height

vec2 texCoord = vUv;

//------------------------------------------
//general stuff

//user variables
uniform int samples; //ao sample count //64.0
uniform float radius; //ao radius //5.0

float aoclamp = 0.125; //depth clamp - reduces haloing at screen edges
bool noise = true; //use noise instead of pattern for sample dithering
float noiseamount = 0.0002; //dithering amount

float diffarea = 0.3; //self-shadowing reduction
float gdisplace = 0.4; //gauss bell center //0.4

bool mist = false; //use mist?
float miststart = 0.0; //mist start
float mistend = zFar; //mist end

bool onlyAO = false; //use only ambient occlusion pass?
float lumInfluence = 0.7; //how much luminance affects occlusion

//--------------------------------------------------------

vec2 rand(vec2 coord) //generating noise/pattern texture for dithering
{
  float noiseX = ((fract(1.0-coord.s*(width/2.0))*0.25)+(fract(coord.t*(height/2.0))*0.75))*2.0-1.0;
  float noiseY = ((fract(1.0-coord.s*(width/2.0))*0.75)+(fract(coord.t*(height/2.0))*0.25))*2.0-1.0;

  if (noise)
  {
    noiseX = clamp(fract(sin(dot(coord ,vec2(12.9898,78.233))) * 43758.5453),0.0,1.0)*2.0-1.0;
    noiseY = clamp(fract(sin(dot(coord ,vec2(12.9898,78.233)*2.0)) * 43758.5453),0.0,1.0)*2.0-1.0;
  }
  return vec2(noiseX,noiseY)*noiseamount;
}

float doMist()
{
  float zdepth = texture2D(tDepth,texCoord.xy).x;
  float depth = -zFar * zNear / (zdepth * (zFar - zNear) - zFar);
  return clamp((depth-miststart)/mistend,0.0,1.0);
}

float readDepth(vec2 coord)
{
  if (vUv.x<0.0||vUv.y<0.0) return 1.0;
  else {
    float z_b = texture2D(tDepth, coord ).x;
    float z_n = 2.0 * z_b - 1.0;
    return (2.0 * zNear) / (zFar + zNear - z_n * (zFar-zNear));
  }
}

int compareDepthsFar(float depth1, float depth2) {
  float garea = 2.0; //gauss bell width
  float diff = (depth1 - depth2)*100.0; //depth difference (0-100)
  //reduce left bell width to avoid self-shadowing
  if (diff<gdisplace)
  {
    return 0;
  } else {
    return 1;
  }
}

float compareDepths(float depth1, float depth2)
{
  float garea = 2.0; //gauss bell width
  float diff = (depth1 - depth2)*100.0; //depth difference (0-100)
  //reduce left bell width to avoid self-shadowing
  if (diff<gdisplace)
  {
    garea = diffarea;
  }

  float gauss = pow(2.7182,-2.0*(diff-gdisplace)*(diff-gdisplace)/(garea*garea));
  return gauss;
}

float calAO(float depth,float dw, float dh)
{
  float dd = (1.0-depth)*radius;

  float temp = 0.0;
  float temp2 = 0.0;
  float coordw = vUv.x + dw*dd;
  float coordh = vUv.y + dh*dd;
  float coordw2 = vUv.x - dw*dd;
  float coordh2 = vUv.y - dh*dd;

  vec2 coord = vec2(coordw , coordh);
  vec2 coord2 = vec2(coordw2, coordh2);

  float cd = readDepth(coord);
  int far = compareDepthsFar(depth, cd);
  temp = compareDepths(depth, cd);
  //DEPTH EXTRAPOLATION:
  if (far > 0)
  {
    temp2 = compareDepths(readDepth(coord2),depth);
    temp += (1.0-temp)*temp2;
  }

  return temp;
}

void main(void)
{
  vec2 noise = rand(texCoord);
  float depth = readDepth(texCoord);

  float w = (1.0 / width)/clamp(depth,aoclamp,1.0)+(noise.x*(1.0-noise.x));
  float h = (1.0 / height)/clamp(depth,aoclamp,1.0)+(noise.y*(1.0-noise.y));

  float pw = 0.0;
  float ph = 0.0;

  float ao = 0.0;

  float dl = PI * (3.0 - sqrt(5.0));
  float dz = 1.0 / float(samples);
  float l = 0.0;
  float z = 1.0 - dz/2.0;

  for (int i = 0; i < 64; i++)
  {
    if (i > samples) break;
    float r = sqrt(1.0 - z);

    pw = cos(l) * r;
    ph = sin(l) * r;
    ao += calAO(depth,pw*w,ph*h);
    z = z - dz;
    l = l + dl;
  }


  ao /= float(samples);
  ao *= strength;
  ao = 1.0-ao;

  if (mist)
  {
    ao = mix(ao, 1.0, doMist());
  }

  /*
  vec3 color = texture2D(bgl_RenderedTexture,texCoord).rgb;

  vec3 lumcoeff = vec3(0.299,0.587,0.114);
  float lum = dot(color.rgb, lumcoeff);
  vec3 luminance = vec3(lum, lum, lum);

  vec3 final = vec3(color*mix(vec3(ao),vec3(1.0),luminance*lumInfluence));//mix(color*ao, white, luminance)

  if (onlyAO)
  {
  final = vec3(mix(vec3(ao),vec3(1.0),luminance*lumInfluence)); //ambient occlusion only
  }
  */
  //vec3 final = vec3(depth/1.0);
  vec3 final = vec3(depth);

  gl_FragColor = vec4(final,1.0);

}