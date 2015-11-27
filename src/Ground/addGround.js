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

    //scope.materialType = size.useDeafultMaterial ?
    //  customMaterial : scope.materialType;

      var normalShader = THREE.NormalMapShader;

			var rx = 256,
          ry = 256;

			var pars = {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBFormat
      };

			var heightMap = new THREE.WebGLRenderTarget( rx, ry, pars );
      heightMap.texture = api.TextureLoader()
        .load('../assets/terrain/default_terrain.png');

			var normalMap = new THREE.WebGLRenderTarget( rx, ry, pars );
			normalMap.texture = api.TextureLoader()
        .load('../assets/terrain/default_terrain.png');

			var specularMap = new THREE.WebGLRenderTarget( 256, 256, pars ); //2048
			specularMap.texture = api.TextureLoader()
        .load('../assets/terrain/default_terrain.png');

      var terrainShader = THREE.ShaderTerrain[ "terrain" ];

      var uniformsTerrain = Object.assign(
        THREE.UniformsUtils.clone( terrainShader.uniforms ),
        {
          oceanTexture:	{ type: "t", value: oceanTexture },
          sandyTexture:	{ type: "t", value: sandyTexture },
          grassTexture:	{ type: "t", value: grassTexture },
          rockyTexture:	{ type: "t", value: rockyTexture },
          snowyTexture:	{ type: "t", value: snowyTexture },
          fog: true,
          lights: true
        },
        THREE.UniformsLib['common'],
        THREE.UniformsLib['fog'],
        THREE.UniformsLib['lights'],
        THREE.UniformsLib['shadowmap'],
        {
            ambient  : { type: "c", value: new THREE.Color( 0xffffff ) },
            emissive : { type: "c", value: new THREE.Color( 0x000000 ) },
            wrapRGB  : { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) }
        });

				uniformsTerrain[ "tDisplacement" ].value = heightMap;

				uniformsTerrain[ "uDisplacementScale" ].value = 100;

				uniformsTerrain[ "uRepeatOverlay" ].value.set( 6, 6 );


   			var material = new THREE.ShaderMaterial( {
 						uniforms: 		uniformsTerrain,
 						vertexShader: 	terrainShader.vertexShader,
 						fragmentShader: terrainShader.fragmentShader,
 						lights: 		true,
 						fog: 			true,
            side: THREE.DoubleSide,
            shading: THREE.SmoothShading
						} );

      scope.visible = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(256, 256, 256, 256),
        material
      );

      scope.visible.scale.x = 1;
      scope.visible.scale.y = 1;
      scope.visible.position.set(pos.x, pos.y, pos.z);
      scope.visible.rotation.set(Math.PI / 180 * -90, 0, 0);

      var hgtdata = []; // new Array(256);

      for (var x=0; x <= 255; x++) {
        hgtdata[x] = new Uint8Array(256);

        for (var y=255; y >= 0; y--) {
          hgtdata[x][255-y] = ctx.getImageData(x, y, 1, 1).data[0]/255 * 100;
        }
      }

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
