import * as UTILS from '../../globals';

const world = new WHS.App([
  new WHS.app.ElementModule(),
  new WHS.app.SceneModule(),
  new WHS.app.CameraModule({
    position: new THREE.Vector3(0, 6, 18),
    far: 10000
  }),
  new WHS.app.RenderingModule({
    bgColor: 0x162129,

    renderer: {
      antialias: true,
      shadowmap: {
        type: THREE.PCFSoftShadowMap
      }
    }
  }),
  new PHYSICS.WorldModule({
    ammo: process.ammoPath,
    gravity: new THREE.Vector3(0, -9.8, 0),
    softbody: true
  }),
  new WHS.OrbitControlsModule(),
  new WHS.app.AutoresizeModule()
]);

const sphere = new WHS.Icosahedron({ // Softbody.
  geometry: {
    radius: 1,
    detail: 2
  },

  modules: [
    new PHYSICS.SoftbodyModule({
      mass: 2,
      pressure: 100,
      damping: 0.01,
      friction: 0.3,
      klst: 0.6,
      kast: 0.6,
      margin: 0.05
    })
  ],

  shadow: {
    cast: false,
    receive: false
  },

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.softbody,
    wireframe: true
  }),

  position: {
    y: 5
  }
});

sphere.native.frustumCulled = false;

UTILS.addBoxPlane(world, 250).then(() => sphere.addTo(world)).then(() => {
  for (let i = 0; i < 30; i++) {
    const newSphere = sphere.clone(true, false);
    newSphere.position.y = 5 + 4 * (i + 1);
    newSphere.native.frustumCulled = false;
    newSphere.addTo(world);
  }
});

new WHS.DirectionalLight({
  light: {
    color: 0xffffff, // 0x00ff00,
    intensity: 1
  },

  position: {
    x: 0,
    y: 10,
    z: 30
  }
}).addTo(world);

new WHS.AmbientLight({
  light: {
    color: 0xffffff,
    intensity: 0.5
  }
}).addTo(world);

world.start();
