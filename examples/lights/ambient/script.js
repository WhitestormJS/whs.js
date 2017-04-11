import * as UTILS from '../../globals';

const cameraModule = new WHS.CameraModule({
  position: {
    z: -30,
    y: 20,
    x: -20
  },
  far: 20000,
  near: 1
});

const controlsModule = new WHS.OrbitControlsModule();

const world = new WHS.App([
  ...UTILS.appModules({
    position: new THREE.Vector3(0, 10, 200),
    renderer: {
      shadowmap: {
        type: THREE.BasicShadowMap
      }
    }
  }),
  controlsModule,
  cameraModule,
  new WHS.ResizeModule()
]);
controlsModule.controls.autoRotate = true;

new WHS.Box({
  geometry: [10, 10, 10, 100, 100, 100],
  material: new THREE.MeshPhongMaterial({
    bumpScale: 2,
    displacementBias: -0.5,
    displacementScale: 0.5
  }),
  shadow: {
    receive: false
  },
  modules: [
    new WHS.TextureModule({
      url: `${process.assetsPath}/textures/box.jpg`
    }, {
      url: `${process.assetsPath}/textures/normalBox.png`,
      type: 'normalMap'
    }, {
      url: `${process.assetsPath}/textures/bumpBox.png`,
      type: 'bumpMap'
    }, {
      url: `${process.assetsPath}/textures/displacementBox.png`,
      type: 'displacementMap'
    }
  )
  ],
  position: [0, 4, 0]
}).addTo(world);

new WHS.Box({
  geometry: {
    width: 2000,
    height: 2000
  },
  position: [0, -1.5, 0],
  rotation: {
    y: 0,
    x: -Math.PI / 2
  },
  shadow: {
    cast: false
  },
  material: new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide
  })
}).addTo(world);

new WHS.AmbientLight({
  light: {
    color: 0xffffff,
    intensity: 0.4
  }
}).addTo(world);

world.start();
