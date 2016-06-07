varying vec2 vUv;
uniform sampler2D tInput;
float kernel = .005;
float scale = 1.;
float thresh = 1.;

void main()
{
    vec4 sum = vec4(0);

    // mess of for loops due to gpu compiler/hardware limitations
    int j=-2;
    for( int i=-2; i<=2; i++) sum+=texture2D(tInput,vUv+vec2(i,j)*kernel);
    j=-1;
    for( int i=-2; i<=2; i++) sum+=texture2D(tInput,vUv+vec2(i,j)*kernel);
    j=0;
    for( int i=-2; i<=2; i++) sum+=texture2D(tInput,vUv+vec2(i,j)*kernel);
    j=1;
    for( int i=-2; i<=2; i++) sum+=texture2D(tInput,vUv+vec2(i,j)*kernel);
    j=2;
    for( int i=-2; i<=2; i++) sum+=texture2D(tInput,vUv+vec2(i,j)*kernel);
    sum/=25.0;

    vec4 s=texture2D(tInput, vUv);
    gl_FragColor=s;

    // use the blurred colour if it's bright enough
    if (length(sum)>thresh)
    {
        gl_FragColor +=sum*scale;
    }
}