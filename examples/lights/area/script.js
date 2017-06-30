import * as UTILS from '../../globals';

const ad = UTILS.appDefaults;

const cameraModule = new WHS.DefineModule('camera', new WHS.PerspectiveCamera({
  position: {
    z: 500,
    y: 400
  },
  far: 30000,
  near: 10
}));

const app = new WHS.App([
  ...UTILS.appModules({
    position: new THREE.Vector3(0, 10, 200)
  }),
  cameraModule,
  new WHS.ResizeModule()
]);
// controlsModule.controls.autoRotate = true;

new WHS.Box({
  geometry: {
    width: 100,
    height: 100,
    depth: 100
  },

  material: new THREE.MeshStandardMaterial({
    color: 0x4286f4,
    metalness: 0.0,
    roughness: 0.044676705160855
  }),

  position: [0, 0, 0],
  rotation: [0, 0, 25]
}).addTo(app);

const plane = new WHS.Box({
  geometry: {
    width: 2000,
    height: 0.1,
    depth: 2000
  },
  material: new THREE.MeshStandardMaterial({
    color: 0x808080,
    metalness: 0.0,
    roughness: 0.044676705160855
  }),
  position: [0, -60, 0],
  rotation: [0, 0, 25]
});
plane.addTo(app);

const lightDimension = {width: 350, height: 200};
const lightPosition = {x: 0, y: 100, z: -200};
const lightRotation = {x: 0.3, y: 0, z: -0.1};

const intensityFactor = 1000;
const areaLight = new WHS.AreaLight({
  color: 0xffffff,
  intensity: lightDimension.width * intensityFactor,
  width: lightDimension.width,
  height: lightDimension.height,

  position: {
    x: lightPosition.x,
    y: lightPosition.y,
    z: lightPosition.z
  },

  rotation: {
    x: lightRotation.x,
    y: lightRotation.y,
    z: lightRotation.z
  }

  // position: [0, 10, 0],
  // rotation: [-Math.PI/2, 0, 0]
});

const scene = app.get('scene');
const renderer = app.get('renderer');

renderer.gammaInput = true;
renderer.gammaOutput = true;

// new WHS.PointLight({
//   intensity: 0.0
// }).addTo(app);

areaLight.addTo(app).then(({native}) => {
  const helper = new THREE.RectAreaLightHelper(native);
  scene.add(helper);
});


app.start();
