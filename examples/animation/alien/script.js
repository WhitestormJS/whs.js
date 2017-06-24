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

const animationModule = new WHS.AnimationModule(world, false, {
  speed: 1.2
});

const characterTexturePath = `${process.assetsPath}/textures/space-alien/`;
const textureModule = new WHS.TextureModule({
  url: `${characterTexturePath}diffuse.png`,
  type: 'map'
}, {
  url: `${characterTexturePath}emissive.png`,
  type: 'emissiveMap'
}, {
  url: `${characterTexturePath}normal.png`,
  type: 'normalMap'
}, {
  url: `${characterTexturePath}metalness.png`,
  type: 'metalnessMap'
}, {
  url: `${characterTexturePath}ao.png`,
  type: 'aoMap'
});

new WHS.Importer({
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

  modules: [textureModule, animationModule],

  shadow: {
    receive: false
  },

  position: [0, -5, 0]

}).addTo(world).then(() => {
  animationModule.play('observe');
});

new WHS.PointLight({
  color: 0xffffff,
  intensity: 2,
  distance: 20,

  shadow: {
    far: 30,
    near: 2
  },

  position: [-1, 3, 5]

}).addTo(world);

const floorTextureRepeat = new THREE.Vector2(15, 15);

new WHS.Box({
  geometry: {
    width: 80,
    height: 80,
    depth: 0.1
  },

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
  ],

  position: [0, -5, 0]

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
}).start(world);

world.start();
