import * as UTILS from './globals';

const world = new (PHYSICS.$world(WHS.World))({
  ...UTILS.$world,

  physics: {
    ammo: '{{ ammojs }}'
  },

  softbody: true,

  shadowmap: {
    type: THREE.PCFSoftShadowMap
  },

  physics: {
    fixedTimeStep: 1 / 120
  }
});

new WHS.Sphere({ // Softbody (blue).
  geometry: {
    radius: 4,
    widthSegments: 16,
    heightSegments: 16
  },

  mass: 15,
  softbody: true,

  physics: {
    pressure: 2000,

    piteration: 40,
    viteration: 40
  },

  material: {
    color: UTILS.$colors.softbody,
    kind: 'phong'
  },

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

  mass: 2,

  material: {
    color: UTILS.$colors.mesh,
    kind: 'phong'
  },

  position: {
    y: 30,
    x: -0.5,
    z: 0.5
  }
}).addTo(world);

UTILS.addBoxPlane(world, 2500);
UTILS.addBasicLights(world);

world.setControls(new WHS.OrbitControls());
world.start();
