"use strict";

var _get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);
    if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);
        if (parent === null) {
            return undefined;
        } else {
            return get(parent, property, receiver);
        }
    } else if ("value" in desc) {
        return desc.value;
    } else {
        var getter = desc.get;
        if (getter === undefined) {
            return undefined;
        }
        return getter.call(receiver);
    }
};

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

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

    'terrain': {

        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib["fog"], THREE.UniformsLib["lights"], THREE.UniformsLib["shadowmap"], {

            "enableDiffuse1": {
                type: "i",
                value: 0
            },
            "enableDiffuse2": {
                type: "i",
                value: 0
            },
            "enableSpecular": {
                type: "i",
                value: 0
            },
            "enableReflection": {
                type: "i",
                value: 0
            },

            "tDiffuse1": {
                type: "t",
                value: null
            },
            "tDiffuse2": {
                type: "t",
                value: null
            },
            "tDetail": {
                type: "t",
                value: null
            },
            "tNormal": {
                type: "t",
                value: null
            },
            "tSpecular": {
                type: "t",
                value: null
            },
            "tDisplacement": {
                type: "t",
                value: null
            },

            "uNormalScale": {
                type: "f",
                value: 1.0
            },

            "uDisplacementBias": {
                type: "f",
                value: 0.0
            },
            "uDisplacementScale": {
                type: "f",
                value: 1.0
            },

            "diffuse": {
                type: "c",
                value: new THREE.Color(0xeeeeee)
            },
            "specular": {
                type: "c",
                value: new THREE.Color(0x111111)
            },
            "shininess": {
                type: "f",
                value: 30
            },
            "opacity": {
                type: "f",
                value: 1
            },

            "uRepeatBase": {
                type: "v2",
                value: new THREE.Vector2(1, 1)
            },
            "uRepeatOverlay": {
                type: "v2",
                value: new THREE.Vector2(1, 1)
            },

            "uOffset": {
                type: "v2",
                value: new THREE.Vector2(0, 0)
            }

        }]),

        fragmentShader: "\n\t\t        uniform vec3 diffuse;\n\t\t        uniform vec3 emissive;\n\t\t        uniform float opacity;\n\t\t        varying vec3 vLightFront;\n\t\t        varying vec3 vLightBack;\n\t\t        uniform vec2 uRepeatOverlay;\n\t\t        uniform vec2 uRepeatBase;\n\t\t        uniform vec2 uOffset;\n\t\t        uniform float uNormalScale;\n\t\t        uniform sampler2D tNormal;\n\t\t        uniform sampler2D oceanTexture;\n\t\t        uniform sampler2D sandyTexture;\n\t\t        uniform sampler2D grassTexture;\n\t\t        uniform sampler2D rockyTexture;\n\t\t        uniform sampler2D snowyTexture;\n\t\t        varying vec3 vTangent;\n\t\t        varying vec3 vBinormal;\n\t\t        varying vec3 vNormal;\n\t\t        varying vec3 vViewPosition;\n\t\t" + [THREE.ShaderChunk["common"], THREE.ShaderChunk["packing"], THREE.ShaderChunk["color_pars_fragment"], THREE.ShaderChunk["uv_pars_fragment"], THREE.ShaderChunk["uv2_pars_fragment"], THREE.ShaderChunk["map_pars_fragment"], THREE.ShaderChunk["alphamap_pars_fragment"], THREE.ShaderChunk["aomap_pars_fragment"], THREE.ShaderChunk["lightmap_pars_fragment"], THREE.ShaderChunk["emissivemap_pars_fragment"], THREE.ShaderChunk["envmap_pars_fragment"], THREE.ShaderChunk["bsdfs"], THREE.ShaderChunk["ambient_pars"], THREE.ShaderChunk["lights_pars"], THREE.ShaderChunk["fog_pars_fragment"], THREE.ShaderChunk["shadowmap_pars_fragment"], THREE.ShaderChunk["shadowmask_pars_fragment"], THREE.ShaderChunk["specularmap_pars_fragment"]].join("\n") + "\n\t\t        varying vec2 vUv;\n\t\t        varying float vAmount;\n\t\t        void main() {\n\t\t        \t// UVs.\n\t\t            vec2 uvOverlay = uRepeatOverlay * vUv + uOffset;\n\t\t            vec2 uvBase = uRepeatBase * vUv;\n\t\t\t\t\tvec3 specularTex = vec3( 1.0 );\n\t\t            vec3 normalTex = texture2D( tNormal, uvOverlay ).xyz * 2.0 - 1.0;\n\t\t            normalTex.xy *= uNormalScale;\n\t\t            normalTex = normalize( normalTex );\n\t\t            mat3 tsb = mat3( vTangent, vBinormal, vNormal );\n\n\t\t            vec3 finalNormal = tsb * normalTex;\n\t\t            vec3 normal = normalize( finalNormal );\n\t\t            vec3 viewPosition = normalize( vViewPosition );\n\t\t            vec3 shadowMask = vec3( 1.0 );\n\t\t            vec3 totalAmbientLight = ambientLightColor;\n\t\t            vec4 diffuseColor = vec4(0.0);\n\n\t\t            // Color by texture.\n\t\t            vec4 water = (smoothstep(0.01, 0.25, vAmount)\n\t\t            - smoothstep(0.24, 0.26, vAmount))\n\t\t            * texture2D( oceanTexture, vUv * 10.0 );\n\t\t            vec4 sandy = (smoothstep(0.24, 0.27, vAmount)\n\t\t            - smoothstep(0.28, 0.31, vAmount))\n\t\t            * texture2D( sandyTexture, vUv * 10.0 );\n\t\t            vec4 grass = (smoothstep(0.28, 0.32, vAmount)\n\t\t            - smoothstep(0.35, 0.40, vAmount))\n\t\t            * texture2D( grassTexture, vUv * 20.0 );\n\t\t            vec4 rocky = (smoothstep(0.30, 0.40, vAmount)\n\t\t            - smoothstep(0.40, 0.70, vAmount))\n\t\t            * texture2D( rockyTexture, vUv * 20.0 );\n\t\t            vec4 snowy = (smoothstep(0.42, 0.45, vAmount))\n\t\t            * texture2D( snowyTexture, vUv * 10.0 );\n\t\t            diffuseColor = vec4(0.0, 0.0, 0.0, 1.0)\n\t\t            + water + sandy + grass + rocky + snowy;\n\n\t\t            ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t\t            vec3 totalEmissiveLight = emissive;\n\t\t" + [THREE.ShaderChunk["logdepthbuf_fragment"], THREE.ShaderChunk["map_fragment"], THREE.ShaderChunk["color_fragment"], THREE.ShaderChunk["alphamap_fragment"], THREE.ShaderChunk["alphatest_fragment"], THREE.ShaderChunk["specularmap_fragment"], THREE.ShaderChunk["emissivemap_fragment"]].join("\n") + "\n\t\treflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );\n\t\t" + THREE.ShaderChunk["lightmap_fragment"] + "\n\t\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\n\t\t#ifdef DOUBLE_SIDED\n\n\t\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\n\t\t#else\n\n\t\t\treflectedLight.directDiffuse = vLightFront;\n\n\t\t#endif\n\n\t\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n\t\t" + THREE.ShaderChunk["aomap_fragment"] + "\n\t\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveLight;\n\n\t\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t\t\n\t\t" + [THREE.ShaderChunk["envmap_fragment"], THREE.ShaderChunk["linear_to_gamma_fragment"], THREE.ShaderChunk["fog_fragment"]].join("\n") + "\n\t\t      }\n\t\t",

        vertexShader: "\n\t\t    #define TERRAIN;\n\t\t    varying vec3 vLightFront;\n\t\t    #ifdef DOUBLE_SIDED\n\t\t        varying vec3 vLightBack;\n\t\t    #endif\n\t\t    \n\t\t    varying float vAmount;\n\t\t    attribute vec4 tangent;\n\t\t    uniform vec2 uRepeatBase;\n\t\t    uniform sampler2D tNormal;\n\t\t    #ifdef VERTEX_TEXTURES\n\t\t\t    uniform sampler2D tDisplacement;\n\t\t\t    uniform float uDisplacementScale;\n\t\t\t    uniform float uDisplacementBias;\n\t\t    #endif\n\t\t    varying vec3 vTangent;\n\t\t    varying vec3 vBinormal;\n\t\t    varying vec3 vNormal;\n\t\t    varying vec2 vUv;\n\t\t    varying vec3 vViewPosition;\n\t\t" + [THREE.ShaderChunk["common"], THREE.ShaderChunk["uv_pars_vertex"], THREE.ShaderChunk["uv2_pars_vertex"], THREE.ShaderChunk["envmap_pars_vertex"], THREE.ShaderChunk["bsdfs"], THREE.ShaderChunk["lights_pars"], THREE.ShaderChunk["color_pars_vertex"], THREE.ShaderChunk["morphtarget_pars_vertex"], THREE.ShaderChunk["skinning_pars_vertex"], THREE.ShaderChunk["shadowmap_pars_vertex"], THREE.ShaderChunk["logdepthbuf_pars_vertex"]].join("\n") + "\n\t\t    void main() {\n\t\t" + [THREE.ShaderChunk["uv_vertex"], THREE.ShaderChunk["uv2_vertex"], THREE.ShaderChunk["color_vertex"], THREE.ShaderChunk["beginnormal_vertex"], THREE.ShaderChunk["morphnormal_vertex"], THREE.ShaderChunk["skinbase_vertex"], THREE.ShaderChunk["skinnormal_vertex"], THREE.ShaderChunk["defaultnormal_vertex"], THREE.ShaderChunk["begin_vertex"], THREE.ShaderChunk["morphtarget_vertex"], THREE.ShaderChunk["skinning_vertex"], THREE.ShaderChunk["project_vertex"], THREE.ShaderChunk["logdepthbuf_vertex"], THREE.ShaderChunk["worldpos_vertex"]].join("\n") + "\n\t\t\t    vNormal = normalize( normalMatrix * normal);\n\t\t\t    // Tangent and binormal vectors.\n\t\t\t    vTangent = normalize( normalMatrix * tangent.xyz );\n\t\t\t    vBinormal = cross( vNormal, vTangent ) * tangent.w;\n\t\t\t    vBinormal = normalize( vBinormal );\n\t\t\t    // Texture coordinates.\n\t\t\t    vUv = uv;\n\t\t\t    vec2 uvBase = uv * uRepeatBase;\n\t\t\t    // displacement mapping\n\t\t\t    worldPosition = modelMatrix * vec4( position, 1.0 );\n\t\t\t    mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\t\t\t    transformedNormal = normalize( normalMatrix * normal );\n\t\t\t    gl_Position = projectionMatrix * mvPosition;\n\t\t\t    vViewPosition = -mvPosition.xyz;\n\t\t\t    vAmount = position.z * 0.005 + 0.1;\n\t\t" + [THREE.ShaderChunk["envmap_vertex"], THREE.ShaderChunk["lights_lambert_vertex"], THREE.ShaderChunk["shadowmap_vertex"]].join("\n") + "\n\t\t   }\n\t\t",

        side: THREE.DoubleSide,
        shading: THREE.SmoothShading

    }

};
/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
 */

WHS.Terrain = function(_WHS$Shape) {
    _inherits(Terrain, _WHS$Shape);

    function Terrain(params) {
        _classCallCheck(this, Terrain);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Terrain).call(this, params, "terrain"));

        WHS.API.extend(params.geometry, {

            width: 1,
            height: 1,
            depth: 1,
            map: false

        });

        var canvas = document.createElement('canvas');
        canvas.setAttribute("width", params.geometry.width);
        canvas.setAttribute("height", params.geometry.height);

        if (canvas.getContext) {

            var ctx = canvas.getContext('2d');
            ctx.drawImage(params.geometry.map, 0, 0);
        }

        // Ocean texture.
        var oceanTexture = WHS.API.loadTexture(WHS._settings.assets + '/textures/terrain/dirt-512.jpg');

        oceanTexture.wrapS = oceanTexture.wrapT = THREE.RepeatWrapping;

        // Sandy texture.
        var sandyTexture = WHS.API.loadTexture(WHS._settings.assets + '/textures/terrain/sand-512.jpg');

        sandyTexture.wrapS = sandyTexture.wrapT = THREE.RepeatWrapping;

        // Grass texture.
        var grassTexture = WHS.API.loadTexture(WHS._settings.assets + '/textures/terrain/grass-512.jpg');

        grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;

        // Rocky texture.
        var rockyTexture = WHS.API.loadTexture(WHS._settings.assets + '/textures/terrain/rock-512.jpg');

        rockyTexture.wrapS = rockyTexture.wrapT = THREE.RepeatWrapping;

        // Snowy texture.
        var snowyTexture = WHS.API.loadTexture(WHS._settings.assets + '/textures/terrain/snow-512.jpg');

        snowyTexture.wrapS = snowyTexture.wrapT = THREE.RepeatWrapping;

        // Normal Map.
        var normalShader = THREE.NormalMapShader;

        var rx = 256,
            ry = 256;

        var pars = {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,

            format: THREE.RGBFormat
        };

        // Heightmap.
        var heightMap = new THREE.WebGLRenderTarget(rx, ry, pars);

        heightMap.texture = WHS.API.loadTexture(WHS._settings.assets + '/terrain/default_terrain.png');

        // Normalmap.
        var normalMap = new THREE.WebGLRenderTarget(rx, ry, pars);

        normalMap.texture = WHS.API.loadTexture(WHS._settings.assets + '/terrain/NormalMap.png');

        // Specularmap.
        var specularMap = new THREE.WebGLRenderTarget(256, 256, pars); //2048

        specularMap.texture = WHS.API.loadTexture(WHS._settings.assets + '/terrain/default_terrain.png');

        // Terrain shader (ShaderTerrain.js).
        var terrainShader = THREE.ShaderTerrain["terrain"];

        var uniformsTerrain = Object.assign(THREE.UniformsUtils.clone(terrainShader.uniforms), {
            oceanTexture: {
                type: "t",
                value: oceanTexture
            },
            sandyTexture: {
                type: "t",
                value: sandyTexture
            },
            grassTexture: {
                type: "t",
                value: grassTexture
            },
            rockyTexture: {
                type: "t",
                value: rockyTexture
            },
            snowyTexture: {
                type: "t",
                value: snowyTexture
            },
            fog: true,
            lights: true
        }, THREE.UniformsLib['common'], THREE.UniformsLib['fog'], THREE.UniformsLib['lights'], THREE.UniformsLib['ambient'], THREE.UniformsLib['shadowmap'], {
            ambient: {
                type: "c",
                value: new THREE.Color(0xffffff)
            },
            emissive: {
                type: "c",
                value: new THREE.Color(0x000000)
            },
            wrapRGB: {
                type: "v3",
                value: new THREE.Vector3(1, 1, 1)
            }
        });

        console.log(uniformsTerrain);

        uniformsTerrain["tDisplacement"].value = heightMap;
        uniformsTerrain["spotShadowMap"].value = [normalMap];

        uniformsTerrain["uDisplacementScale"].value = 100;
        uniformsTerrain["uRepeatOverlay"].value.set(6, 6);

        var material = new THREE.ShaderMaterial({

            uniforms: uniformsTerrain,
            vertexShader: terrainShader.vertexShader,
            fragmentShader: terrainShader.fragmentShader,
            lights: true,
            fog: true,
            side: THREE.FrontSide,
            shading: THREE.SmoothShading

        });

        var geom = new THREE.PlaneGeometry(256, 256, 255, 255);

        geom.verticesNeedUpdate = true;

        var index = 0,
            i = 0,
            imgdata = ctx.getImageData(0, 0, 256, 256).data;

        for (var x = 0; x <= 255; x++) {
            for (var y = 255; y >= 0; y--) {
                geom.vertices[index].z = imgdata[i] / 255 * 100;

                i += 4;
                index++;
            }
        }

        _this.mesh = new Physijs.HeightfieldMesh(geom, Physijs.createMaterial(material, 0.8, 0.1));

        geom.computeVertexNormals();
        geom.computeFaceNormals();
        geom.computeTangents();

        _this.mesh.updateMatrix();
        _this.mesh.castShadow = true;
        _this.mesh.receiveShadow = true;

        _get(Object.getPrototypeOf(Terrain.prototype), "build", _this).call(_this, "skip");

        _this.setRotation(Math.PI / 180 * -90, 0, 0);

        return _this;
    }

    return Terrain;
}(WHS.Shape);

WHS.World.prototype.Terrain = function(params) {
    var object = new WHS.Terrain(params);

    object.addTo(this);

    return object;
};