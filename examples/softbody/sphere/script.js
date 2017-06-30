import * as UTILS from '../../globals';

const app = new WHS.App([
  new WHS.ElementModule(),
  new WHS.SceneModule(),
  new WHS.DefineModule('camera', new WHS.PerspectiveCamera({
    position: new THREE.Vector3(0, 10, 50)
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
    gravity: new THREE.Vector3(0, -10, 0),
    softbody: true
  }),
  new WHS.OrbitControlsModule(),
  new WHS.ResizeModule()
]);

new WHS.Icosahedron({ // Softbody (blue).
  geometry: {
    radius: 4,
    detail: 3
  },

  modules: [
    new PHYSICS.SoftbodyModule({
      mass: 15,
      viterations: 2,
      diterations: 2,
      pressure: 1000
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh
  }),

  position: {
    y: 4
  }
}).addTo(app).then(obj => { obj.native.frustumCulled = false });

// TODO: Make sphere position start from specific position. [Softbodies issue]
new WHS.Sphere({ // Rigidbody (green).
  geometry: {
    radius: 1,
    widthSegments: 16,
    heightSegments: 16
  },

  modules: [
    new PHYSICS.SphereModule({
      mass: 1
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh
  }),

  position: {
    y: 30,
    x: -0.5,
    z: 0.5
  }
}).addTo(app)



UTILS.addBoxPlane(app, 2500);
UTILS.addBasicLights(app);

app.start();
