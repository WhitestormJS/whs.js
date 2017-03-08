import * as UTILS from '../../globals';

const red = 0xff0040;
const blue = 0x6666ff;
const white = 0xffffff;
const lightIntensity = 1;

const cameraModule = new WHS.app.CameraModule({
  position: {
    z: 30,
    y: 40
  },
  far: 20000,
  near: 1
});

const controlsModule = new WHS.controls.OrbitModule();

const world = new WHS.App([
  ...UTILS.appModules({
    position: new THREE.Vector3(0, 10, 200)
  }),
  controlsModule,
  cameraModule
]);
controlsModule.controls.autoRotate = true;

new WHS.Box({
  geometry: [10, 10, 10, 100, 100, 100],
  material: new THREE.MeshPhongMaterial({
    bumpScale: 2,
    displacementBias: -0.5,
    displacementScale: 0.5
  }),
  modules: [
    new WHS.mesh.TextureModule({
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
  position: [0, 5, 0]
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
  receiveShadow: true,
  material: new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide
  })
}).addTo(world);

new WHS.AmbientLight({
  light: {
    color: 0xffffff,
    intensity: 0.05
  }
}).addTo(world);

const redSpotLight = new WHS.PointLight({
  light: {
    color: red,
    intensity: lightIntensity,
    distance: 40
  },

  material: new THREE.MeshBasicMaterial({
    color: red
  })
});
redSpotLight.addTo(world);

new WHS.Sphere({
  geometry: [1, 32, 32],

  material: new THREE.MeshBasicMaterial({
    color: red
  })
}).addTo(redSpotLight);

const whiteSpotLight = new WHS.PointLight({
  light: {
    color: white,
    intensity: lightIntensity,
    distance: 90
  }
});
whiteSpotLight.addTo(world);

new WHS.Sphere({
  geometry: [1, 32, 32],

  material: new THREE.MeshBasicMaterial({
    color: white
  })
}).addTo(whiteSpotLight);

const blueSpotLight = new WHS.PointLight({
  light: {
    color: blue,
    intensity: lightIntensity,
    distance: 50
  }
});
blueSpotLight.addTo(world);

new WHS.Sphere({
  geometry: [1, 32, 32],

  material: new THREE.MeshBasicMaterial({
    color: blue
  }),
  castShadow: false
}).addTo(blueSpotLight);

const distance = 15;
const slowFactor = 0.8;
const fastFactor = 1.4;
new WHS.Loop(() => {
  const t = Date.now() * 0.0015;
  // blue light stays flat on Y axis
  blueSpotLight.position.x = distance * Math.sin(t * slowFactor);
  blueSpotLight.position.z = distance * Math.cos(t * slowFactor);
  // red & white lights bounce on Y axis
  redSpotLight.position.x = distance * Math.cos(t * fastFactor);
  redSpotLight.position.y = Math.abs(distance * Math.sin(t * fastFactor));
  // white is like red, but oscilates its Z as well
  whiteSpotLight.position.x = distance * Math.sin(t);
  whiteSpotLight.position.y = Math.abs(distance * Math.cos(t));
  whiteSpotLight.position.z = distance * Math.cos(t);
}).start(world);

world.start();
