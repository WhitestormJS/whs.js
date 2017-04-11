import * as UTILS from '../../globals';

const mouse = new WHS.VirtualMouseModule();

const world = new WHS.App([
  new WHS.ElementModule(),
  new WHS.SceneModule(),
  new WHS.CameraModule({
    position: new THREE.Vector3(0, 60, 120),
    far: 10000
  }),
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
  new WHS.ResizeModule(),
  mouse
]);

const cloth = new WHS.Tube({ // Softbody (blue).
  geometry: {
    path: new THREE.LineCurve3(new THREE.Vector3(0, 40, 0), new THREE.Vector3(0, 10, 0)),
    segments: 20,
    radius: 16,
    radiusSegments: 16,
    closed: false
  },

  modules: [
    new PHYSICS.SoftbodyModule({
      mass: 1,
      margin: 3,
      damping: 0.03,
      piterations: 12,
      viterations: 12,
      pressure: 300
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.softbody,
    side: THREE.DoubleSide
  })
});

const arm = new WHS.Box({ // Rigidbody (green).
  geometry: {
    width: 80,
    height: 6,
    depth: 6
  },

  modules: [
    new PHYSICS.BoxModule({
      mass: 0
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh
  }),

  position: {
    y: 50,
    z: 10
  }
});

arm.addTo(world);
cloth.addTo(world).then(() => {
  cloth.appendAnchor(arm, 0, 1, false);
  cloth.appendAnchor(arm, 40, 1, false);
});

new WHS.Box({ // Rigidbody (green).
  geometry: {
    width: 10,
    height: 10,
    depth: 10
  },

  modules: [
    new PHYSICS.BoxModule({
      mass: 10
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh
  }),

  position: {
    y: 18
  }
}).addTo(world).then(box => {
  mouse.on('move', () => {
    box.setLinearVelocity(mouse.project().sub(box.position));
  });
});

UTILS.addBoxPlane(world, 250);
UTILS.addBasicLights(world, 0.5, [60, 60, 20], 400);

world.start();
