import * as UTILS from '../../globals';

const cameraModule = new WHS.app.CameraModule({
  position: {
    z: -30,
    y: 20,
    x: -20
  },
  far: 20000,
  near: 1
});

const controlsModule = new WHS.controls.OrbitModule();
const fogModule = new WHS.app.FogModule({color: 0xaaaaaa, near: 10, far: 200});

const world = new WHS.App([
  ...UTILS.appModules({
    position: new THREE.Vector3(0, 10, 200)
  }),
  controlsModule,
  cameraModule,
  fogModule,
  new WHS.app.ResizeModule()
]);

controlsModule.controls.minDistance = 15;
controlsModule.controls.maxDistance = 400;

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
  )],

  position: [0, 4, 0]
}).addTo(world);

new WHS.Box({
  geometry: {
    width: 300,
    height: 152
  },

  position: [5, -1.5, -22],

  rotation: {
    y: 0,
    x: -Math.PI / 2
  },

  shadow: {
    cast: false
  },

  modules: [
    new WHS.mesh.TextureModule({
      url: `${process.assetsPath}/textures/metal-floor.png`,
      repeat: new THREE.Vector2(30, 30)
    }
  )],

  material: new THREE.MeshPhongMaterial({
  })
}).addTo(world);

new WHS.Box({
  geometry: {
    width: 300,
    height: 120,
    depth: 10
  },

  position: [5, 58, 50],

  shadow: {
    cast: false
  },

  modules: [
    new WHS.mesh.TextureModule({
      url: `${process.assetsPath}/textures/wall-brick.jpg`,
      repeat: new THREE.Vector2(10, 5)
    }
  )],

  material: new THREE.MeshPhongMaterial({
  })
}).addTo(world);

new WHS.Box({
  geometry: {
    width: 300,
    height: 120,
    depth: 10
  },

  position: [5, 58, -100],

  shadow: {
    cast: false
  },

  modules: [
    new WHS.mesh.TextureModule({
      url: `${process.assetsPath}/textures/wall-brick.jpg`,
      repeat: new THREE.Vector2(10, 5)
    }
  )],

  material: new THREE.MeshPhongMaterial({
  })
}).addTo(world);

// z wall
new WHS.Box({
  geometry: {
    width: 150,
    height: 120,
    depth: 10
  },

  rotation: {
    y: -Math.PI / 2,
    x: 0
  },

  position: [150, 58, -25],

  shadow: {
    cast: false
  },

  modules: [
    new WHS.mesh.TextureModule({
      url: `${process.assetsPath}/textures/wall-brick.jpg`,
      repeat: new THREE.Vector2(10, 5)
    }
  )],

  material: new THREE.MeshPhongMaterial({
  })
}).addTo(world);

new WHS.Sphere({
  geometry: {
    radius: 2,
    widthSegments: 16,
    heightSegments: 16
  },

  position: [-10, 0.8, 30],

  shadow: {
    cast: false,
    receive: false
  },

  modules: [
    new WHS.mesh.TextureModule({
      url: `${process.assetsPath}/textures/baseball.jpg`
    }
  )],

  material: new THREE.MeshPhongMaterial({
  })
}).addTo(world);

new WHS.AmbientLight({
  light: {
    color: 0xffffff,
    intensity: 0.3
  }
}).addTo(world);

world.start();
