import * as UTILS from '../../globals';

const cameraModule = new WHS.app.CameraModule({
  position: {
    z: 50,
    y: 60
  },
  far: 20000,
  near: 1
});

const controlsModule = new WHS.controls.OrbitModule();

console.log(THREE.PCFSoftShadowMap);

const world = new WHS.App([
  ...UTILS.appModules({
    position: new THREE.Vector3(0, 10, 200),
    renderer: {
      shadowMap: {
        type: THREE.PCFSoftShadowMap,
        renderSingleSided: true
      },

      physicallyCorrectLights: true
    }
  }),
  controlsModule,
  cameraModule
]);

// controlsModule.controls.autoRotate = true;

new WHS.Model({
  geometry: {
    path: `${process.assetsPath}/models/bedroom/bedroom.json`,
    loader: new THREE.ObjectLoader(),

    parser(scene) {
      return scene;
    }
  },

  position: [0, -10, 0],
  rotation: new THREE.Euler(0, Math.PI / 2 * 3, 0)
}).addTo(world).then(o => {
  console.log(o);
});

const radius = 55;

new WHS.Sphere({
  material: new THREE.MeshBasicMaterial({color: 0xffffff}),
  position: [20, 20, 0]
}).addTo(world).then(mesh => {
  let angle = 0;

  new WHS.DirectionalLight({
    light: {
      intensity: 2
    },

    shadow: {
      mapSize: {
        width: 4096,
        height: 4096
      },

      far: 150,
      near: 5
    },

    position: [radius, 35, 0]
  }).addTo(mesh);

  new WHS.Loop(() => {
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    mesh.position.set(x, 35, z);
    angle += 0.01;
  }).start(world);
});

world.start();
