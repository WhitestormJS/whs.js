import * as UTILS from '../../globals';

const world = new WHS.App([
  ...UTILS.appModules({
    position: new THREE.Vector3(5, 5, 10),
    renderer: {
      shadowMap: {
        type: THREE.PCFSoftShadowMap,
        renderSingleSided: true
      },

      physicallyCorrectLights: true
    }
  }),
  new WHS.OrbitControlsModule(),
  new WHS.ResizeModule()
]);

const animationModule = new WHS.AnimationModule();

const characterTexturePath = `${process.assetsPath}/textures/space-alien/`;
const textureModule = new WHS.TextureModule({
  url: characterTexturePath + `diffuse.png`,
  type: 'map'
}, {
  url: characterTexturePath + `emissive.png`,
  type: 'emissiveMap'
}, {
  url: characterTexturePath + `normal.png`,
  type: 'normalMap'
}, {
  url: characterTexturePath + `metalness.png`,
  type: 'metalnessMap'
}, {
  url: characterTexturePath + `ao.png`,
  type: 'aoMap'
});

const robot = new WHS.Importer({
  parser(geometry, materials) {
    return new THREE.SkinnedMesh(geometry, materials);
  },

  url: `${process.assetsPath}/models/space-alien/character.json`,
  useCustomMaterial: true,
  material: new THREE.MeshStandardMaterial({
    shading: THREE.SmoothShading,
    skinning: true,
    emissiveIntensity: 1,
    metalness: 1
  }),

  modules: [textureModule, animationModule]
});
robot.addTo(world).then(() => {
  animationModule.play('observe');
});

const whitePointLight = new WHS.PointLight({
  light: {
    color: 0xffffff,
    intensity: 2,
    distance: 20
  },

  shadow: {
    far: 30,
    near: 2
  },

  position: [-1, 8, 5]
});
whitePointLight.addTo(world);

const floorTextureRepeat = new THREE.Vector2(15, 15);
new WHS.Box({
  geometry: {
    width: 80,
    height: 80,
    depth: 0.1
  },
  position: [0, 0, 0],
  rotation: {
    y: 0,
    x: -Math.PI / 2
  },

  shadow: {
    cast: false
  },

  material: new THREE.MeshStandardMaterial({
    roughness: 0.9
  }),

  modules: [
    new WHS.TextureModule({
      url: `${process.assetsPath}/textures/rock/gbase.jpg`,
      repeat: floorTextureRepeat
    }, {
      url: `${process.assetsPath}/textures/rock/gbump.jpg`,
      repeat: floorTextureRepeat,
      type: 'bumpMap'
    }, {
      url: `${process.assetsPath}/textures/rock/groughness.jpg`,
      repeat: floorTextureRepeat,
      type: 'roughnessMap'
    })
  ]

}).addTo(world);

new WHS.SpotLight({
  light: {
    color: 0xffffff,
    intensity: 1,
    distance: 100,
    angle: 90
  },

  shadow: {
    cast: false
  },

  position: {
    x: 10,
    y: 30,
    z: 10
  }
}).addTo(world);

UTILS.addAmbient(world, 0.1);

new WHS.Loop(() => {
  animationModule.update();
}).start(world);

world.start();
