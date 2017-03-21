import * as UTILS from '../../globals';

const ad = UTILS.appDefaults;

const controlsModule = new WHS.controls.OrbitModule();
const cameraModule = new WHS.app.CameraModule({
  position: {
    z: 500,
    y: 400
  },
  far: 30000,
  near: 10
});

const world = new WHS.App([
  ...UTILS.appModules({
    position: new THREE.Vector3(0, 10, 200)
  }, ad.rendering, ad.physics, false),
  controlsModule,
  cameraModule,
  new WHS.app.ResizeModule()
]);

controlsModule.controls.autoRotate = true;

new WHS.Box({
  geometry: {
    width: 100,
    height: 100,
    depth: 100
  },

  material: new THREE.MeshPhongMaterial({
    color: 0x4286f4
  }),

  position: [0, 0, 0],
  rotation: [0, 0, 25]
}).addTo(world);

const plane = new WHS.Box({
  geometry: {
    width: 2000,
    height: 0.1,
    depth: 2000
  },
  material: new THREE.MeshPhongMaterial({
    color: 0xffffff
  }),
  position: [0, -60, 0],
  rotation: [0, 0, 25]
});
plane.addTo(world);

const lightDimension = {width: 50, height: 200};
const lightPosition = {x: 0, y: 100, z: -200};
const lightRotation = {x: 0.3, y: 0, z: -0.1};

const planeLight = new WHS.Box({
  geometry: {
    width: lightDimension.width,
    height: lightDimension.height,
    depth: 0.2
  },

  material: new THREE.MeshBasicMaterial({
    color: 0xffffff
  }),

  position: [lightPosition.x, lightPosition.y, lightPosition.z],
  rotation: [lightRotation.x, lightRotation.y, lightRotation.z]
});
planeLight.addTo(world);

const intensityFactor = 2000;
const areaLight = new WHS.AreaLight({
  light: {
    color: 0xffffff,
    intensity: lightDimension.width * intensityFactor,
    width: lightDimension.width,
    height: lightDimension.height
  },

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
});
areaLight.addTo(world);

world.start();
