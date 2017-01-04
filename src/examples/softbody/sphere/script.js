import * as UTILS from './globals';

const world = new WHS.App([
  new WHS.modules.ElementModule(),
  new WHS.modules.SceneModule(),
  new WHS.modules.CameraModule({
    position: new THREE.Vector3(0, 10, 50)
  }),
  new WHS.modules.RenderingModule({
    bgColor: 0x162129,

    renderer: {
      antialias: true,
      shadowmap: {
        type: THREE.PCFSoftShadowMap
      }
    }
  }),
  new PHYSICS.WorldModule({
    ammo: '{{ ammojs }}'
  }),
  new WHS.OrbitControlsModule(),
  new WHS.modules.AutoresizeModule()
]);

new WHS.Sphere({ // Softbody (blue).
  geometry: {
    radius: 4,
    widthSegments: 16,
    heightSegments: 16
  },

  modules: [
    new PHYSICS.SphereModule({
      mass: 15
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh
  }),

  position: {
    y: 4
  }
}).addTo(world).then(obj => { obj.native.frustumCulled = false });

new WHS.Sphere({ // Rigidbody (green).
  geometry: {
    radius: 1,
    widthSegments: 16,
    heightSegments: 16
  },

  modules: [
    new PHYSICS.SphereModule({
      mass: 2
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
}).addTo(world);

UTILS.addBoxPlane(world, 2500);
UTILS.addBasicLights(world);

world.start();
