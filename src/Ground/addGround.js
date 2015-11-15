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
  scope.name = "ground" + key;

  api.def(size, {
    width: 100,
    height: 100
  });

  switch (material.type) {
    case "basic":
      scope.materialType = new this.threejs.MeshBasicMaterial(material);
      break;

    case "linebasic":
      scope.materialType = new this.threejs.LineBasicMaterial(material);
      break;

    case "linedashed":
      scope.materialType = new this.threejs.LineDashedMaterial(material);
      break;

    case "material":
      scope.materialType = new this.threejs.Material(material);
      break;

    case "depth":
      scope.materialType = new this.threejs.MeshDepthMaterial(material);
      break;

    case "face":
      scope.materialType = new this.threejs.MeshFaceMaterial(material);
      break;

    case "lambert":
      scope.materialType = new this.threejs.MeshLambertMaterial(material);
      break;

    case "normal":
      scope.materialType = new this.threejs.MeshNormalMaterial(material);
      break;

    case "phong":
      scope.materialType = new this.threejs.MeshPhongMaterial(material);
      break;

    case "pointcloud":
      scope.materialType = new this.threejs.PointCloudMaterial(material);
      break;

    case "rawshader":
      scope.materialType = new this.threejs.RawShaderMaterial(material);
      break;

    case "shader":
      scope.materialType = new this.threejs.ShaderMaterial(material);
      break;

    case "spritecanvas":
      scope.materialType = new this.threejs.SpriteCanvasMaterial(material);
      break;

    case "sprite":
      scope.materialType = new this.threejs.SpriteMaterial(material);
      break;
  }

  switch (type) {
    case "smooth":
      scope.visible = new this.threejs.Mesh(new this.threejs.PlaneBufferGeometry(size.width, size.height, 1, 1), scope.materialType);
      scope.visible.rotation.set(-90 / 180 * Math.PI, 0, 0);
      scope.visible.position.set(pos.x, pos.y, pos.z);
      scope.physic = new this.cannonjs.Plane(size.width, size.height);
      scope.body = new this.cannonjs.Body({
        mass: 0
      });
      scope.body.linearDamping = 0.9; // Default value.
      scope.body.addShape(scope.physic);
      scope.body.position.set(pos.x, pos.y, pos.z);
      scope.body.quaternion.setFromAxisAngle(new this.cannonjs.Vec3(1, 0, 0), -Math.PI / 2);
      scope.body.name = scope.name;
      api.merge(this.world, scope.body);
      api.merge(this.scene, scope.visible);
      break;
    case "infinitySmooth":
      scope.visible = new this.threejs.Mesh(new this.threejs.PlaneBufferGeometry(size.width, size.height, 1, 1), scope.materialType);
      scope.visible.rotation.set(-90 / 180 * Math.PI, 0, 0);
      scope.visible.position.set(pos.x, pos.y, pos.z);
      scope.physic = new this.cannonjs.Plane(size.width, size.height);
      scope.body = new this.cannonjs.Body({
        mass: 0
      });
      scope.body.linearDamping = 0.9; // Default value.
      scope.body.addShape(scope.physic);
      scope.body.position.set(posscopex, pos.y, pos.z);
      scope.body.quaternion.setFromAxisAngle(new this.cannonjs.Vec3(1, 0, 0), -Math.PI / 2);
      scope.body.name = scope.name;
      api.merge(this.world, scope.body);
      api.merge(this.scene, scope.visible);
      break;
      // FUTURE: terrain add.
      // TODO: Fix perfomance by saving terrain like threeJs object with options.
    case "terrain":

      //api.def(size.detality, 0);

      var canvas = document.createElement('canvas');
      canvas.setAttribute("width", size.width);
      canvas.setAttribute("height", size.height);

      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.drawImage(size.terrain, 0, 0);
      }

      var terrainGeometry = TERRAINGEN.GetFromCanvas({
        alea: RAND_MT,
        generator: PN_GENERATOR,
        width: size.width,
        height: size.height,
        widthSegments: size.width,
        heightSegments: size.height,
        depth: size.depth,
        param: 3,
        filterparam: 1,
        filter: [BLUR_FILTER],
        postgen: [], // MOUNTAINS_COLORS
        effect: [DEPTHNOISE_EFFECT] //[ DESTRUCTURE_EFFECT ]
      }, canvas, 0, 0, size.width, size.height);

      scope.custumGeom = new this.threejs.Geometry().fromBufferGeometry(terrainGeometry);
      scope.custumGeom.verticesNeedUpdate = true;
      scope.custumGeom.elementsNeedUpdate = true;
      scope.custumGeom.normalsNeedUpdate = true;
      scope.custumGeom.computeFaceNormals();
      scope.custumGeom.computeVertexNormals();
      scope.custumGeom.mergeVertices();

      if (!isNaN(size.detality)) {
        scope.modifier = new this.threejs.SubdivisionModifier();

        scope.modifier.modify(scope.custumGeom);
        scope.custumGeom.verticesNeedUpdate = true;
        scope.custumGeom.elementsNeedUpdate = true;
        scope.custumGeom.normalsNeedUpdate = true;
        scope.custumGeom.computeFaceNormals();
        scope.custumGeom.computeVertexNormals();
        scope.custumGeom.mergeVertices();
      }

      if (size.useDeafultMaterial) {

      	var oceanTexture = new THREE.ImageUtils.loadTexture( 'assets/textures/terrain/dirt-512.jpg' );
      	oceanTexture.wrapS = oceanTexture.wrapT = THREE.RepeatWrapping;

      	var sandyTexture = new THREE.ImageUtils.loadTexture( 'assets/textures/terrain/sand-512.jpg' );
      	sandyTexture.wrapS = sandyTexture.wrapT = THREE.RepeatWrapping;

      	var grassTexture = new THREE.ImageUtils.loadTexture( 'assets/textures/terrain/grass-512.jpg' );
      	grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;

      	var rockyTexture = new THREE.ImageUtils.loadTexture( 'assets/textures/terrain/rock-512.jpg' );
      	rockyTexture.wrapS = rockyTexture.wrapT = THREE.RepeatWrapping;

      	var snowyTexture = new THREE.ImageUtils.loadTexture( 'assets/textures/terrain/snow-512.jpg' );
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
        }, THREE.ShaderLib['basic'].uniforms, THREE.UniformsLib[ "fog" ]);

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



              '	vec4 water = (smoothstep(0.01, 0.25, vAmount) - smoothstep(0.24, 0.26, vAmount)) * texture2D( oceanTexture, vUv * 0.1 );',
              '	vec4 sandy = (smoothstep(0.24, 0.27, vAmount) - smoothstep(0.28, 0.31, vAmount)) * texture2D( sandyTexture, vUv * 0.1 );',
              '	vec4 grass = (smoothstep(0.28, 0.32, vAmount) - smoothstep(0.35, 0.40, vAmount)) * texture2D( grassTexture, vUv * 0.2 );',
              '	vec4 rocky = (smoothstep(0.30, 0.40, vAmount) - smoothstep(0.40, 0.70, vAmount)) * texture2D( rockyTexture, vUv * 0.2 );',
              '	vec4 snowy = (smoothstep(0.42, 0.45, vAmount))                                   * texture2D( snowyTexture, vUv * 0.1 );',
              '	gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0) + water + sandy + grass + rocky + snowy; ',

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
      }

      scope.materialType = size.useDeafultMaterial ? customMaterial : scope.materialType;

      scope.visible = api.Triangulate(scope.custumGeom, scope.materialType);

      scope.visible.scale.x = 1;
      scope.visible.scale.y = 1;
      scope.visible.position.set(pos.x, pos.y, pos.z);
      api.rotateGeometry(scope.visible.geometry, {
        x: 0,
        y: Math.PI / 180 * -180,
        z: 0
      });
      //scope.visible.rotation.set(0, Math.PI / 180 * -180, 0);

      scope.visible.updateMatrix();
      //scope.visible.quaternion.set(0.5, 0.5, 0.5, -0.5);
      //console.log(terrainGeometry.heightsArray);
      scope.physic = new this.cannonjs.Heightfield(terrainGeometry.heightsArray.reverse(), {
        elementSize: 1 // Distance between the data points in X and Y directions
      });

      scope.body = new this.cannonjs.Body({
        mass: 0
      });

      scope.body.linearDamping = 0.9; // Default value.
      scope.body.addShape(scope.physic);


      scope.body.quaternion.setFromEuler(Math.PI / 180 * -90, 0, 0, "XYZ");

      scope.body.position.set(pos.x - size.width / 2 + 1, pos.y, pos.z + size.height / 2 - 1);
      //scope.physic.scale.x = 1;
      //scope.physic.scale.y = 1;
      scope.body.name = scope.name;
      api.merge(this.world, scope.body);
      api.merge(this.scene, scope.visible);
      scope.visible.castShadow = true;
      scope.visible.receiveShadow = true;

      break;
  }

  WHS.grounds.push(scope);

  return scope;
}
