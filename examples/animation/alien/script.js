import * as UTILS from '../../globals';

const app = new WHS.App([
  ...UTILS.appModules({
    position: new THREE.Vector3(5, 5, 10),
    near: true
  }, {
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

const animationModule = new WHS.AnimationModule(app, false, {
  speed: 1.2
});

const fix = texture => {
  texture.anisotropy = 2;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipMapLinearFilter;

  return texture;
};

const characterTexturePath = `${process.assetsPath}/textures/space-alien/`;
const textureModule = new WHS.TextureModule({
  url: `${characterTexturePath}diffuse.png`,
  type: 'map',
  fix
}, {
  url: `${characterTexturePath}emissive.png`,
  type: 'emissiveMap',
  fix
}, {
  url: `${characterTexturePath}normal.png`,
  type: 'normalMap',
  fix
}, {
  url: `${characterTexturePath}metalness.png`,
  type: 'metalnessMap',
  fix
}, {
  url: `${characterTexturePath}ao.png`,
  type: 'aoMap',
  fix
});

new WHS.Importer({
  url: `${process.assetsPath}/models/space-alien/character.json`,
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

}).addTo(app).then(() => {
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

}).addTo(app);

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

}).addTo(app);

new WHS.SpotLight({
  color: 0xffffff,
  intensity: 1,
  distance: 100,
  angle: 90,

  shadow: {
    cast: false
  },

  position: {
    x: 10,
    y: 30,
    z: 10
  }
}).addTo(app);

UTILS.addAmbient(app, 0.1);

new WHS.Loop(() => {
}).start(app);

app.start();
