import * as UTILS from './globals';

const world = new WHS.World({
  ...UTILS.$world
});

const sphere = new WHS.Sphere({ // Create sphere comonent.
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

const mouse = new WHS.VirtualMouse(world);
mouse.track(sphere);

sphere.on('mouseover', () => {
  sphere.material.color.set(0xffff00);
  console.log('mouseover');
});

sphere.on('mousemove', () => {
  console.log('mousemove');
});

sphere.on('mouseout', () => {
  sphere.material.color.set(UTILS.$colors.mesh);
  console.log('mouseout');
});

sphere.on('click', () => {
  alert('click!');
})

UTILS.addPlane(world);
UTILS.addBasicLights(world);

world.start(); // Start animations and physics simulation.
world.setControls(new WHS.OrbitControls());
