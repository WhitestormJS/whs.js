/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * @author alteredq / http://alteredqualia.com/
 * @author alex2401 / http://alexbuzin.me/
 *
 */

THREE.ShaderTerrain = {

    'terrain' : {

		uniforms: THREE.UniformsUtils.merge( [

		    THREE.UniformsLib[ "fog" ],
		    THREE.UniformsLib[ "lights" ],
		    THREE.UniformsLib[ "shadowmap" ],

		    {

			    "enableDiffuse1"  : { type: "i", value: 0 },
			    "enableDiffuse2"  : { type: "i", value: 0 },
			    "enableSpecular"  : { type: "i", value: 0 },
			    "enableReflection": { type: "i", value: 0 },

			    "tDiffuse1"    : { type: "t", value: null },
			    "tDiffuse2"    : { type: "t", value: null },
			    "tDetail"      : { type: "t", value: null },
			    "tNormal"      : { type: "t", value: null },
			    "tSpecular"    : { type: "t", value: null },
			    "tDisplacement": { type: "t", value: null },

			    "uNormalScale": { type: "f", value: 1.0 },

			    "uDisplacementBias": { type: "f", value: 0.0 },
			    "uDisplacementScale": { type: "f", value: 1.0 },

			    "diffuse": { type: "c", value: new THREE.Color( 0xeeeeee ) },
			    "specular": { type: "c", value: new THREE.Color( 0x111111 ) },
			    "shininess": { type: "f", value: 30 },
			    "opacity": { type: "f", value: 1 },

			    "uRepeatBase"    : { type: "v2", value: new THREE.Vector2( 1, 1 ) },
			    "uRepeatOverlay" : { type: "v2", value: new THREE.Vector2( 1, 1 ) },

			    "uOffset" : { type: "v2", value: new THREE.Vector2( 0, 0 ) }

		    }

	    ] ),

	    fragmentShader: [

		`

		        uniform vec3 diffuse;
		        uniform vec3 emissive;
		        uniform float opacity;

		        uniform vec3 ambientLightColor;

		        varying vec3 vLightFront;

		        #ifdef DOUBLE_SIDED

			        varying vec3 vLightBack;

			        uniform vec2 uRepeatOverlay;
			        uniform vec2 uRepeatBase;
			        uniform vec2 uOffset;
			        uniform float uNormalScale;

			        uniform sampler2D tNormal;

		        #endif

		        uniform sampler2D oceanTexture;
		        uniform sampler2D sandyTexture;
		        uniform sampler2D grassTexture;
		        uniform sampler2D rockyTexture;
		        uniform sampler2D snowyTexture;

		        varying vec3 vTangent;
		        varying vec3 vBinormal;
		        varying vec3 vNormal;

		        varying vec3 vViewPosition;

		` + 

			        [

				        THREE.ShaderChunk[ "common" ],
				        THREE.ShaderChunk[ "color_pars_fragment" ],
				        THREE.ShaderChunk[ "map_pars_fragment" ],
				        THREE.ShaderChunk[ "alphamap_pars_fragment" ],
				        THREE.ShaderChunk[ "lightmap_pars_fragment" ],
				        THREE.ShaderChunk[ "envmap_pars_fragment" ],
				        THREE.ShaderChunk[ "fog_pars_fragment" ],
				        THREE.ShaderChunk[ "shadowmap_pars_fragment" ],
				        THREE.ShaderChunk[ "specularmap_pars_fragment" ],
				        THREE.ShaderChunk[ "logdepthbuf_pars_fragment" ]

			        ].join("\n") +
		        
		`

		        varying vec2 vUv;
		        varying float vAmount;

		        void main() {

		        	// UVs.
		            vec2 uvOverlay = uRepeatOverlay * vUv + uOffset;
		            vec2 uvBase = uRepeatBase * vUv;

					vec3 specularTex = vec3( 1.0 );
		            vec3 normalTex = texture2D( tNormal, uvOverlay ).xyz * 2.0 - 1.0;

		            normalTex.xy *= uNormalScale;
		            normalTex = normalize( normalTex );

		            mat3 tsb = mat3( vTangent, vBinormal, vNormal );

		            vec3 finalNormal = tsb * normalTex;
		            vec3 normal = normalize( finalNormal );
		            vec3 viewPosition = normalize( vViewPosition );

		            vec3 shadowMask = vec3( 1.0 );
		            vec3 outgoingLight = vec3( 0.0 );
		            vec3 totalAmbientLight = ambientLightColor;

		            vec4 diffuseColor = vec4(0.0);

		            // Color by texture.
		            vec4 water = (smoothstep(0.01, 0.25, vAmount)
		            - smoothstep(0.24, 0.26, vAmount))
		            * texture2D( oceanTexture, vUv * 10.0 );

		            vec4 sandy = (smoothstep(0.24, 0.27, vAmount)
		            - smoothstep(0.28, 0.31, vAmount))
		            * texture2D( sandyTexture, vUv * 10.0 );

		            vec4 grass = (smoothstep(0.28, 0.32, vAmount)
		            - smoothstep(0.35, 0.40, vAmount))
		            * texture2D( grassTexture, vUv * 20.0 );

		            vec4 rocky = (smoothstep(0.30, 0.40, vAmount)
		            - smoothstep(0.40, 0.70, vAmount))
		            * texture2D( rockyTexture, vUv * 20.0 );

		            vec4 snowy = (smoothstep(0.42, 0.45, vAmount))
		            * texture2D( snowyTexture, vUv * 10.0 );
		            diffuseColor = vec4(0.0, 0.0, 0.0, 1.0)
		            + water + sandy + grass + rocky + snowy;

		` +

				        [

					        THREE.ShaderChunk[ "logdepthbuf_fragment" ],
					        THREE.ShaderChunk[ "map_fragment" ],
					        THREE.ShaderChunk[ "alphamap_fragment" ],
					        THREE.ShaderChunk[ "alphatest_fragment" ],
					        THREE.ShaderChunk[ "specularmap_fragment" ],

					        THREE.ShaderChunk[ "lightmap_fragment" ],
					        THREE.ShaderChunk[ "color_fragment" ],
					        THREE.ShaderChunk[ "shadowmap_fragment" ],
					        THREE.ShaderChunk[ "linear_to_gamma_fragment" ],
					        THREE.ShaderChunk[ "fog_fragment" ]

				        ].join("\n") +

		`

		            #ifdef DOUBLE_SIDED

		                if ( gl_FrontFacing )

		                    outgoingLight += diffuseColor.rgb * 
		                		( vLightFront * shadowMask + totalAmbientLight )
		                		+ emissive;

		                else

		                    outgoingLight += diffuseColor.rgb * 
		                		( vLightBack * shadowMask + totalAmbientLight )
		                		+ emissive;

		            #else

		                outgoingLight += diffuseColor.rgb * 
		                	( vLightFront * shadowMask + totalAmbientLight )
		                	+ emissive;

		            #endif

		           gl_FragColor = vec4( outgoingLight, diffuseColor.a );

		      }

		`

		],

		vertexShader: [


		`

		    #define TERRAIN;

		    varying vec3 vLightFront;

		    #ifdef DOUBLE_SIDED

		        varying vec3 vLightBack;

		    #endif
		    
		    varying float vAmount;
		    attribute vec4 tangent;

		    uniform vec2 uRepeatBase;
		    uniform sampler2D tNormal;

		    #ifdef VERTEX_TEXTURES

			    uniform sampler2D tDisplacement;
			    uniform float uDisplacementScale;
			    uniform float uDisplacementBias;

		    #endif

		    varying vec3 vTangent;
		    varying vec3 vBinormal;
		    varying vec3 vNormal;
		    varying vec2 vUv;
		    varying vec3 vViewPosition;

		` + 

		    [

			    THREE.ShaderChunk[ "common" ],

			    THREE.ShaderChunk[ "uv_pars_vertex" ],
			    THREE.ShaderChunk[ "uv2_pars_vertex" ],
			    THREE.ShaderChunk[ "envmap_pars_vertex" ],
			    THREE.ShaderChunk[ "lights_lambert_pars_vertex" ],
			    THREE.ShaderChunk[ "color_pars_vertex" ],
			    THREE.ShaderChunk[ "morphtarget_pars_vertex" ],
			    THREE.ShaderChunk[ "skinning_pars_vertex" ],
			    THREE.ShaderChunk[ "shadowmap_pars_vertex" ],
			    THREE.ShaderChunk[ "logdepthbuf_pars_vertex" ]

		    ].join( "\n" ) +

		`

		    void main() {

		` + 

		    [

			    THREE.ShaderChunk[ "color_vertex" ],

			    THREE.ShaderChunk[ "beginnormal_vertex" ],
			    THREE.ShaderChunk[ "morphnormal_vertex" ],
			    THREE.ShaderChunk[ "skinbase_vertex" ],
			    THREE.ShaderChunk[ "skinnormal_vertex" ],
			    THREE.ShaderChunk[ "defaultnormal_vertex" ],

			    THREE.ShaderChunk[ "begin_vertex" ],
			    THREE.ShaderChunk[ "morphtarget_vertex" ],
			    THREE.ShaderChunk[ "skinning_vertex" ],
			    THREE.ShaderChunk[ "project_vertex" ],
			    THREE.ShaderChunk[ "logdepthbuf_vertex" ],

			    THREE.ShaderChunk[ "uv_vertex" ],
			    THREE.ShaderChunk[ "uv2_vertex" ]

		    ].join( "\n" ) +

		`

			    vNormal = normalize( normalMatrix * normal);

			    // Tangent and binormal vectors.
			    vTangent = normalize( normalMatrix * tangent.xyz );
			    vBinormal = cross( vNormal, vTangent ) * tangent.w;
			    vBinormal = normalize( vBinormal );

			    // Texture coordinates.
			    vUv = uv;

			    vec2 uvBase = uv * uRepeatBase;

			    // displacement mapping
			    vec4 worldPosition = modelMatrix * vec4( position, 1.0 );

			    mvPosition = modelViewMatrix * vec4( position, 1.0 );
			    transformedNormal = normalize( normalMatrix * normal );

			    gl_Position = projectionMatrix * mvPosition;
			    vViewPosition = -mvPosition.xyz;
			    vAmount = position.z * 0.005 + 0.1;

		` +

		    [

			    THREE.ShaderChunk[ "envmap_vertex" ],
			    THREE.ShaderChunk[ "lights_lambert_vertex" ],
			    THREE.ShaderChunk[ "shadowmap_vertex" ]

		    ].join( "\n" ) +

		`

		   }

		`

		],

		side: THREE.DoubleSide,
	    shading: THREE.SmoothShading

	}

};
