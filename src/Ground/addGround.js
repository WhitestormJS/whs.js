/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * Ground.
 *
 * @param {String} type Ground/Terrain type. (REQUIRED)
 * @param {Object} size Size of ground. (REQUIRED)
 * @param {Object} material Material type and options. (REQUIRED)
 * @param {Object} pos Position of ground in 3D space. (REQUIRED)
 * @return {Object} Scope.
 */
WHS.init.prototype.addGround = function(type, size, material, pos) {
  'use strict';

  var scope = {};
  scope.root = this;

  var key = 0;
  WHS.grounds.forEach(function(el) {
    if (el.type == type) {
      key++;
    }
  });

  scope.type = type;
  scope.skip = true;
  scope.name = "ground" + key;

  api.def(size, {
    width: 100,
    height: 100
  });

  console.log(material);


  switch (material.kind) {
    case "basic":
      scope.materialType = new THREE.MeshBasicMaterial(material);
      break;

    case "linebasic":
      scope.materialType = new THREE.LineBasicMaterial(material);
      break;

    case "linedashed":
      scope.materialType = new THREE.LineDashedMaterial(material);
      break;

    case "material":
      scope.materialType = new THREE.Material(material);
      break;

    case "depth":
      scope.materialType = new THREE.MeshDepthMaterial(material);
      break;

    case "face":
      scope.materialType = new THREE.MeshFaceMaterial(material);
      break;

    case "lambert":
      scope.materialType = new THREE.MeshLambertMaterial(material);
      break;

    case "normal":
      scope.materialType = new THREE.MeshNormalMaterial(material);
      break;

    case "phong":
      scope.materialType = new THREE.MeshPhongMaterial(material);
      break;

    case "pointcloud":
      scope.materialType = new THREE.PointCloudMaterial(material);
      break;

    case "rawshader":
      scope.materialType = new THREE.RawShaderMaterial(material);
      break;

    case "shader":
      scope.materialType = new THREE.ShaderMaterial(material);
      break;

    case "spritecanvas":
      scope.materialType = new THREE.SpriteCanvasMaterial(material);
      break;

    case "sprite":
      scope.materialType = new THREE.SpriteMaterial(material);
      break;
  }

  switch (type) {
    case "smooth":

      scope.visible = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(size.width, size.height, 1, 1),
      scope.materialType);

      scope.visible.rotation.set(-90 / 180 * Math.PI, 0, 0);
      scope.visible.position.set(pos.x, pos.y, pos.z);
      scope.physic = new CANNON.Plane(size.width, size.height);

      scope.body = new CANNON.Body({
        mass: 0
      });

      scope.body.linearDamping = 0.9; // Default value.
      scope.body.addShape(scope.physic);
      scope.body.position.set(pos.x, pos.y, pos.z);

      scope.body.quaternion.setFromAxisAngle(
        new CANNON.Vec3(1, 0, 0),
        -Math.PI / 2
      );

      scope.body.name = scope.name;
      break;

    case "infinitySmooth":

      scope.visible = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(size.width, size.height, 1, 1),
      scope.materialType);

      scope.visible.rotation.set(-90 / 180 * Math.PI, 0, 0);
      scope.visible.position.set(pos.x, pos.y, pos.z);
      scope.physic = new CANNON.Plane(size.width, size.height);
      scope.body = new CANNON.Body({
        mass: 0
      });
      scope.body.linearDamping = 0.9; // Default value.
      scope.body.addShape(scope.physic);
      scope.body.position.set(posscopex, pos.y, pos.z);

      scope.body.quaternion.setFromAxisAngle(
        new CANNON.Vec3(1, 0, 0),
        -Math.PI / 2
      );

      scope.body.name = scope.name;

      break;

      // #TODO:80 Fix perfomance by saving terrain like threeJs object with options.
    case "terrain":
      //api.def(size.detality, 0);

      var canvas = document.createElement('canvas');
      canvas.setAttribute("width", size.width);
      canvas.setAttribute("height", size.height);

      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.drawImage(size.terrain, 0, 0);
      }


      //if (size.useDeafultMaterial) {

      	var oceanTexture = api.TextureLoader().load(
          'assets/textures/terrain/dirt-512.jpg'
        );

      	oceanTexture.wrapS = oceanTexture.wrapT = THREE.RepeatWrapping;

      	var sandyTexture = api.TextureLoader().load(
          'assets/textures/terrain/sand-512.jpg'
        );

      	sandyTexture.wrapS = sandyTexture.wrapT = THREE.RepeatWrapping;

      	var grassTexture = api.TextureLoader().load(
          'assets/textures/terrain/grass-512.jpg'
        );

      	grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;

      	var rockyTexture = api.TextureLoader().load(
          'assets/textures/terrain/rock-512.jpg'
        );

      	rockyTexture.wrapS = rockyTexture.wrapT = THREE.RepeatWrapping;

      	var snowyTexture = api.TextureLoader().load(
          'assets/textures/terrain/snow-512.jpg'
        );

      	snowyTexture.wrapS = snowyTexture.wrapT = THREE.RepeatWrapping;

        var customUN = Object.assign(
        {
          ambient  : { type: "c", value: new THREE.Color( 0xdddddd ) },
          emissive : { type: "c", value: new THREE.Color( 0xeeeeee ) },
          wrapRGB  : { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) },
          oceanTexture:	{ type: "t", value: oceanTexture },
          sandyTexture:	{ type: "t", value: sandyTexture },
          grassTexture:	{ type: "t", value: grassTexture },
          rockyTexture:	{ type: "t", value: rockyTexture },
          snowyTexture:	{ type: "t", value: snowyTexture },
          fog: true,
          lights: true
        }, THREE.ShaderLib['lambert'].uniforms);

        var shopts = {
            uniforms: customUN,
            vertexShader: [

        			"#define TERRAIN;",
        			"varying vec3 vLightFront;",
        			"#ifdef DOUBLE_SIDED",
        			"	varying vec3 vLightBack;",
        			"#endif",
              '',
              'varying float vAmount;',
              'varying vec2 vUv;',
              '',

        			THREE.ShaderChunk[ "map_pars_vertex" ],
        			THREE.ShaderChunk[ "lightmap_pars_vertex" ],
        			THREE.ShaderChunk[ "envmap_pars_vertex" ],
        			THREE.ShaderChunk[ "lights_lambert_pars_vertex" ],
        			THREE.ShaderChunk[ "color_pars_vertex" ],
        			THREE.ShaderChunk[ "morphtarget_pars_vertex" ],
        			THREE.ShaderChunk[ "skinning_pars_vertex" ],
        			THREE.ShaderChunk[ "shadowmap_pars_vertex" ],
        			THREE.ShaderChunk[ "logdepthbuf_pars_vertex" ],

        			"void main() {",
        				THREE.ShaderChunk[ "map_vertex" ],
        				THREE.ShaderChunk[ "lightmap_vertex" ],
        				THREE.ShaderChunk[ "color_vertex" ],

        				THREE.ShaderChunk[ "morphnormal_vertex" ],
        				THREE.ShaderChunk[ "skinbase_vertex" ],
        				THREE.ShaderChunk[ "skinnormal_vertex" ],
        				THREE.ShaderChunk[ "defaultnormal_vertex" ],

        				THREE.ShaderChunk[ "morphtarget_vertex" ],
        				THREE.ShaderChunk[ "skinning_vertex" ],
        				THREE.ShaderChunk[ "default_vertex" ],
        				THREE.ShaderChunk[ "logdepthbuf_vertex" ],

      				  //THREE.ShaderChunk[ "worldpos_vertex" ],
        				THREE.ShaderChunk[ "envmap_vertex" ],
        				THREE.ShaderChunk[ "lights_lambert_vertex" ],
                THREE.ShaderChunk[ "worldpos_vertex" ],
        				THREE.ShaderChunk[ "shadowmap_vertex" ],
                '	vUv = uv;',
                '	vAmount = position.y * 0.005 + 0.1;',

                'vec3 newPosition = position;',
'	gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );',

        			"}"

        		].join("\n"),

        		fragmentShader: [

        			"uniform float opacity;",

        			"varying vec3 vLightFront;",

        			"#ifdef DOUBLE_SIDED",

        			"varying vec3 vLightBack;",

        			"#endif",
              'uniform sampler2D oceanTexture;',
              'uniform sampler2D sandyTexture;',
              'uniform sampler2D grassTexture;',
              'uniform sampler2D rockyTexture;',
              'uniform sampler2D snowyTexture;',

        			THREE.ShaderChunk[ "color_pars_fragment" ],
        			THREE.ShaderChunk[ "map_pars_fragment" ],
        			THREE.ShaderChunk[ "alphamap_pars_fragment" ],
        			THREE.ShaderChunk[ "lightmap_pars_fragment" ],
        			THREE.ShaderChunk[ "envmap_pars_fragment" ],
        			THREE.ShaderChunk[ "fog_pars_fragment" ],
        			THREE.ShaderChunk[ "shadowmap_pars_fragment" ],
        			THREE.ShaderChunk[ "specularmap_pars_fragment" ],
        			THREE.ShaderChunk[ "logdepthbuf_pars_fragment" ],
              '',
              'varying vec2 vUv;',
              'varying float vAmount;',
              '',
        			"void main() {",



              '	vec4 water = (smoothstep(0.01, 0.25, vAmount)',
              ' - smoothstep(0.24, 0.26, vAmount))',
              ' * texture2D( oceanTexture, vUv * 0.1 );',

              '	vec4 sandy = (smoothstep(0.24, 0.27, vAmount)',
              ' - smoothstep(0.28, 0.31, vAmount))',
              ' * texture2D( sandyTexture, vUv * 0.1 );',

              '	vec4 grass = (smoothstep(0.28, 0.32, vAmount)',
              ' - smoothstep(0.35, 0.40, vAmount))',
              ' * texture2D( grassTexture, vUv * 0.2 );',

              '	vec4 rocky = (smoothstep(0.30, 0.40, vAmount)',
              ' - smoothstep(0.40, 0.70, vAmount))',
              ' * texture2D( rockyTexture, vUv * 0.2 );',

              '	vec4 snowy = (smoothstep(0.42, 0.45, vAmount))',
              '* texture2D( snowyTexture, vUv * 0.1 );',
              '	gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0)',
              ' + water + sandy + grass + rocky + snowy; ',

        				THREE.ShaderChunk[ "logdepthbuf_fragment" ],
        				THREE.ShaderChunk[ "map_fragment" ],
        				THREE.ShaderChunk[ "alphamap_fragment" ],
        				THREE.ShaderChunk[ "alphatest_fragment" ],
        				THREE.ShaderChunk[ "specularmap_fragment" ],

        			"	#ifdef DOUBLE_SIDED",

        			"		if ( gl_FrontFacing )",
        			"			gl_FragColor.xyz *= vLightFront;",
        			"		else",
        			"			gl_FragColor.xyz *= vLightBack;",

        			"	#else",

        			"		gl_FragColor.xyz *= vLightFront;",

        			"	#endif",

        				THREE.ShaderChunk[ "lightmap_fragment" ],
        				THREE.ShaderChunk[ "color_fragment" ],
        				THREE.ShaderChunk[ "shadowmap_fragment" ],
        				THREE.ShaderChunk[ "linear_to_gamma_fragment" ],
        				THREE.ShaderChunk[ "fog_fragment" ],

        			"}"

        		].join("\n"),

          side: THREE.DoubleSide,
          shading: THREE.SmoothShading,
        };

        var customMaterial = new THREE.ShaderMaterial(shopts);

      //scope.materialType = size.useDeafultMaterial ?
      //  customMaterial : scope.materialType;

        var uniformsNoise, uniformsNormal,
        				heightMap, normalMap,
        				quadTarget;


        var normalShader = THREE.NormalMapShader;

				var rx = 256, ry = 256;
				var pars = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat };

				heightMap = new THREE.WebGLRenderTarget( rx, ry, pars );
        heightMap.texture = api.TextureLoader().load('../assets/terrain/default_terrain.png');
				//heightMap.texture.generateMipmaps = false;

        console.log(normalMap);

				normalMap = new THREE.WebGLRenderTarget( rx, ry, pars );
				normalMap.texture = api.TextureLoader().load('../assets/terrain/default_terrain.png');

				uniformsNoise = {

					time:   { type: "f", value: 1.0 },
					scale:  { type: "v2", value: new THREE.Vector2( 2, 2 ) },
					offset: { type: "v2", value: new THREE.Vector2( 0, 0 ) }

				};

				uniformsNormal = THREE.UniformsUtils.clone( normalShader.uniforms );

				uniformsNormal.height.value = 0.05;
				uniformsNormal.resolution.value.set( rx, ry );
				uniformsNormal.heightMap.value = heightMap;

				var vertexShader = document.getElementById( 'vertexShader' ).textContent;

				// TEXTURES

				var specularMap = new THREE.WebGLRenderTarget( 256, 256, pars ); //2048
				specularMap.texture = api.TextureLoader().load('../assets/terrain/default_terrain.png');

        var terrainShader = THREE.ShaderTerrain[ "terrain" ];

  				var uniformsTerrain = THREE.UniformsUtils.clone( terrainShader.uniforms );

          uniformsTerrain = Object.assign(uniformsTerrain, {
            ambient  : { type: "c", value: new THREE.Color( 0xdddddd ) },
            emissive : { type: "c", value: new THREE.Color( 0xeeeeee ) },
            wrapRGB  : { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) },
            oceanTexture:	{ type: "t", value: oceanTexture },
            sandyTexture:	{ type: "t", value: sandyTexture },
            grassTexture:	{ type: "t", value: grassTexture },
            rockyTexture:	{ type: "t", value: rockyTexture },
            snowyTexture:	{ type: "t", value: snowyTexture },
            fog: true,
            lights: true
          }, THREE.ShaderLib['lambert'].uniforms);

  				uniformsTerrain[ "tNormal" ].value = normalMap;
  				uniformsTerrain[ "uNormalScale" ].value = 3.5;

  				uniformsTerrain[ "tDisplacement" ].value = heightMap;
          //uniformsTerrain[ "tDisplacement" ].value = heightMap;

  				uniformsTerrain[ "tDiffuse1" ].value = grassTexture;
  				uniformsTerrain[ "tDiffuse2" ].value = rockyTexture;
  				uniformsTerrain[ "tSpecular" ].value = specularMap;
  				uniformsTerrain[ "tDetail" ].value =  oceanTexture;

  				uniformsTerrain[ "enableDiffuse1" ].value = true;
  				uniformsTerrain[ "enableDiffuse2" ].value = true;
  				uniformsTerrain[ "enableSpecular" ].value = true;

  				uniformsTerrain[ "diffuse" ].value.setHex( 0xffffff );
  				uniformsTerrain[ "specular" ].value.setHex( 0xffffff );

  				uniformsTerrain[ "shininess" ].value = 30;

  				uniformsTerrain[ "uDisplacementScale" ].value = 100;

  				uniformsTerrain[ "uRepeatOverlay" ].value.set( 6, 6 );

  				var params = [
  					[ 'heightmap', 	document.getElementById( 'fragmentShaderNoise' ).textContent, 	vertexShader, uniformsNoise, false ],
  					[ 'normal', 	normalShader.fragmentShader,  normalShader.vertexShader, uniformsNormal, false ],
  					[ 'terrain', 	terrainShader.fragmentShader, terrainShader.vertexShader, uniformsTerrain, true ]
  				 ];


           var mlib = {};

           for( var i = 0; i < params.length; i ++ ) {

     					material = new THREE.ShaderMaterial( {

     						uniforms: 		params[ i ][ 3 ],
     						vertexShader: 	params[ i ][ 2 ],
     						fragmentShader: params[ i ][ 1 ],
     						lights: 		params[ i ][ 4 ],
     						fog: 			true,
                side: THREE.DoubleSide,
                shading: THREE.SmoothShading
     						} );

     					mlib[ params[ i ][ 0 ] ] = material;



     				}

      var geom = new THREE.PlaneBufferGeometry(256, 256, 256, 256);

      scope.visible = new THREE.Mesh(geom, mlib[ "terrain" ]); // api.Triangulate(scope.custumGeom, scope.materialType);


      scope.visible.scale.x = 1;
      scope.visible.scale.y = 1;
      scope.visible.position.set(pos.x, pos.y, pos.z);
      scope.visible.rotation.set(Math.PI / 180 * -90, 0, 0);

      //scope.root.scene.add(scope.visible);
      /*scope.visible.geometry = api.rotateGeometry(scope.visible.geometry, {
        x: 0,
        y: Math.PI / 180 * -180,
        z: 0
      });*/

      var hgtdata = []; // new Array(256);

      for (var x=0; x <= 255; x++) {
        hgtdata[x] = new Uint8Array(256);

        for (var y=255; y >= 0; y--) {
          hgtdata[x][255-y] = ctx.getImageData(x, y, 1, 1).data[0]/255 * 100;

          //console.log(y);
        }
      }

      //console.log(hgtdata);


      scope.visible.updateMatrix();
      scope.physic = new CANNON.Heightfield(
        hgtdata,
        {
          elementSize: 1 // Distance between the data points in X and Y directions
        }
      );

      scope.body = new CANNON.Body({
        mass: 0
      });

      scope.body.linearDamping = 0.9; // Default value.
      scope.body.addShape(scope.physic);


      scope.body.quaternion.setFromEuler(Math.PI / 180 * -90, 0, 0, "XYZ");

      scope.body.position.set(
        pos.x - size.width / 2 + 0.5,
        pos.y,
        pos.z + size.height / 2 - 0.5
      );

      //scope.physic.scale.x = 256/250;
      //scope.physic.scale.z = 256/250;
      scope.body.name = scope.name;

      scope.visible.castShadow = true;
      scope.visible.receiveShadow = true;

      break;
  }

  scope.wrap = api.Wrap(scope, scope.visible, scope.body);

  return scope;
}
