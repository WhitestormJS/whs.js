import * as UTILS from '../../globals';

const ad = UTILS.appDefaults;

const controlsModule = new WHS.controls.OrbitModule();

const world = new WHS.App([
  ...UTILS.appModules({
    position: new THREE.Vector3(0, 10, 200)
  }, ad.rendering, ad.physics, false),
  controlsModule
]);

controlsModule.controls.autoRotate = true;

// Create a ball
const ball = new WHS.Sphere({
  geometry: {
    radius: 5,
    widthSegments: 32,
    heightSegments: 32
  },

  modules: [
    new PHYSICS.SphereModule({
      mass: 10,
      restitution: 3,
      friction: 0
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh
  }),

  position: [0, 30, 0]
});

// Create all sides of the box
function makeBoxWall(attrs = {}, size = 100) {
  return new WHS.Box({
    ...attrs,

    geometry: {
      width: size,
      height: size,
      depth: 0
    },

    modules: [
      new PHYSICS.BoxModule({
        mass: 0,
        restitution: 3,
        friction: 0
      })
    ],

    material: new THREE.MeshPhongMaterial({
      color: 0x447F8B,
      transparent: true,
      opacity: 0.125
    })
  });
}

// Create wireframe box
new WHS.Box({
  geometry: {
    width: 100,
    height: 100,
    depth: 100
  },

  modules: [
    new PHYSICS.CompoundModule({
      mass: 100
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: 0xffffff,
    wireframe: true
  }),

  position: [0, 0, 0],
  rotation: [0, 0, 25]
}).defer(box => {
  makeBoxWall({
    position: [0, 0, 50]
  }).addTo(box);

  makeBoxWall({
    position: [0, 0, -50]
  }).addTo(box);

  makeBoxWall({
    rotation: {x: -Math.PI / 2},
    position: [0, 50, 0]
  }).addTo(box);

  makeBoxWall({
    rotation: {x: -Math.PI / 2},
    position: [0, -50, 0]
  }).addTo(box);

  makeBoxWall({
    rotation: {y: -Math.PI / 2},
    position: [50, 0, 0]
  }).addTo(box);

  makeBoxWall({
    rotation: {y: -Math.PI / 2},
    position: [-50, 0, 0]
  }).addTo(box);

  box.addTo(world).then(() => {
    const v = new THREE.Vector3(0, 0, 1);

    box.setLinearFactor(new THREE.Vector3(0, 0, 0));

    new WHS.Loop(() => {
      box.setAngularVelocity(v);
    }).start(world);
  });
});

ball.addTo(world);

UTILS.addBasicLights(world);

world.start();
