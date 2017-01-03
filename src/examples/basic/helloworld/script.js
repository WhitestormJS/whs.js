import * as UTILS from './globals';

window.world = new WHS.World({
  ...UTILS.$world,

  physics: {
    ammo: 'http://localhost:8080/vendor/ammo.js'
  }
});

const sphere = new WHS.Sphere({ // Create sphere component.
  geometry: {
    radius: 3,
    widthSegments: 32,
    heightSegments: 32
  },

  mass: 10, // Mass of physics object.

  material: {
    color: UTILS.$colors.mesh,
    kind: 'lambert'
  },

  position: [0, 100, 0]
});

sphere.addTo(world);

UTILS.addPlane(world);
UTILS.addBasicLights(world).then(o => console.log(o.native));

world.start(); // Start animations and physics simulation.
world.setControls(new WHS.OrbitControls());
