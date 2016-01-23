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

  var options = {
    pos: pos
  };

  var scope = new api.construct(this, options, type);

  scope.skip = true;

  api.def(size, {
    width: 100,
    height: 100
  });

  scope.materialType = api.loadMaterial(material)._material;

  switch (type) {
    case "smooth":

      //scope.mesh = new Physijs.PlaneMesh(
        //new THREE.PlaneGeometry(size.width, size.height, 1, 1),
      //scope.materialType, 0);

      scope.mesh = new Physijs.BoxMesh( new THREE.BoxGeometry(size.width, 1, size.height), scope.materialType, 0);

      //scope._rot.set(-90 / 180 * Math.PI, 0, 0);

      break;

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
        scope.root._settings.assets + '/textures/terrain/dirt-512.jpg'
      );

    	oceanTexture.wrapS = oceanTexture.wrapT = THREE.RepeatWrapping;

    	var sandyTexture = api.TextureLoader().load(
        scope.root._settings.assets + '/textures/terrain/sand-512.jpg'
      );

    	sandyTexture.wrapS = sandyTexture.wrapT = THREE.RepeatWrapping;

    	var grassTexture = api.TextureLoader().load(
        scope.root._settings.assets + '/textures/terrain/grass-512.jpg'
      );

    	grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;

    	var rockyTexture = api.TextureLoader().load(
        scope.root._settings.assets + '/textures/terrain/rock-512.jpg'
      );

    	rockyTexture.wrapS = rockyTexture.wrapT = THREE.RepeatWrapping;

    	var snowyTexture = api.TextureLoader().load(
        scope.root._settings.assets + '/textures/terrain/snow-512.jpg'
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
        .load(scope.root._settings.assets + '/terrain/default_terrain.png');

			var normalMap = new THREE.WebGLRenderTarget( rx, ry, pars );
			normalMap.texture = api.TextureLoader()
        .load(scope.root._settings.assets + '/terrain/NormalMap.png');

			var specularMap = new THREE.WebGLRenderTarget( 256, 256, pars ); //2048
			specularMap.texture = api.TextureLoader()
        .load(scope.root._settings.assets + '/terrain/default_terrain.png');

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
        uniformsTerrain[ "shadowMap" ].value = [normalMap];

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

      var geom = new THREE.PlaneGeometry(256, 256, 255, 255);

      //THREE.BufferGeometryUtils.computeTangents( geom );

      geom.verticesNeedUpdate = true;

      scope._rot.set(Math.PI / 180 * -90, 0, 0);

      var hgtdata = [], index = 0, i = 0; // new Array(256);
      var imgdata = ctx.getImageData(0, 0, 256, 256).data;
//console.log(geom);
      for (var x=0; x <= 255; x++) {
        hgtdata[x] = new Uint8Array(256);

        for (var y=255; y >= 0; y--) {
          //hgtdata[x][255-y] = ctx.getImageData(x, y, 1, 1).data[0]/255 * 100;
          geom.vertices[index].z = imgdata[i]/255 * 100;
          i += 4;
          index++;
        }
      }

      scope.mesh = new Physijs.HeightfieldMesh(
        geom,
        Physijs.createMaterial(material, 0.8, 0.1)
      );


      /*var height_img_data = ctx.getImageData(0, 0, 256, 256).data;
      var z, index = 0;
      for( var i = 0, l = height_img_data.length; i<l; i+=4){
               z = height_img_data[i];
               geom.vertices[index].z = z / 255 * 100;
               index = index + 1;
       }*/

      geom.computeVertexNormals();
      geom.computeFaceNormals();
      //geom.computeTangents();

      scope.mesh.updateMatrix();

      scope.dtb = true;

      //scope.physic.scale.x = 256/250;
      //scope.physic.scale.z = 256/250;
      //scope.body.name = scope.name;

      scope.mesh.castShadow = true;
      scope.mesh.receiveShadow = true;

      break;
  }

  scope.build(scope.mesh);

  scope.wrap = api.Wrap(scope, scope.mesh);

  return scope;
}
