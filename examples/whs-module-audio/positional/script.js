import * as UTILS from '../../globals';
import PositionalAudioModule from '../../../modules/whs-module-audio/src';

const controlsModule = new WHS.controls.OrbitModule();

const cameraModule = new WHS.app.CameraModule({
  position: {
    z: 250,
    y: 100
  },

  far: 30000,
  near: 1
});

const world = new WHS.App([
  ...UTILS.appModules({
    position: new THREE.Vector3(0, 10, 200)
  }),

  controlsModule,
  cameraModule
]);

controlsModule.controls.autoRotate = true;

const audioModule = new PositionalAudioModule({
  loop: true
});

const sphere = new WHS.Sphere({
  geometry: {
    radius: 20
  },

  shadow: {
    cast: false
  },

  material: new THREE.MeshBasicMaterial({
    color: 0xffffff
  }),

  modules: [
    audioModule
  ],

  position: {
    y: 5
  }

});
sphere.addTo(world);

sphere.addAudioListener(cameraModule);
sphere.playAudio(`${process.assetsPath}/sounds/folk.mp3`);

new WHS.PointLight({
  light: {
    color: 0xffffff,
    intensity: 1,
    distance: 1000
  },

  position: [10, 40, 10]
}).addTo(world);

new WHS.Box({
  geometry: {
    width: 2000,
    height: 0.1,
    depth: 2000
  },

  shadow: {
    cast: false
  },

  material: new THREE.MeshPhongMaterial({
    color: 0xffffff
  }),

  position: [0, -60, 0],
  rotation: [0, 0, 25]
}).addTo(world);

world.start();
