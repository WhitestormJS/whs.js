import * as UTILS from '../../globals';

const app = new WHS.App([
  new WHS.ElementModule(),
  new WHS.SceneModule(),
  new WHS.DefineModule('camera', new WHS.PerspectiveCamera({
    position: new THREE.Vector3(0, 6, 18),
    far: 10000
  })),
  new WHS.RenderingModule({
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
  new WHS.ResizeModule()
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

UTILS.addBoxPlane(app, 250).then(() => sphere.addTo(app)).then(() => {
  for (let i = 0; i < 30; i++) {
    const newSphere = sphere.clone(true, false);
    newSphere.position.y = 5 + 4 * (i + 1);
    newSphere.native.frustumCulled = false;
    newSphere.addTo(app);
  }
});

new WHS.DirectionalLight({
  color: 0xffffff, // 0x00ff00,
  intensity: 1,

  position: {
    x: 0,
    y: 10,
    z: 30
  }
}).addTo(app);

new WHS.AmbientLight({
  color: 0xffffff,
  intensity: 0.5
}).addTo(app);

app.start();
