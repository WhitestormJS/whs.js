const world = new WHS.World({
  stats: "fps", // fps, ms, mb or false if not need.
  autoresize: true,

  gravity: { // Physic gravity.
    x: 0,
    y: -100,
    z: 0
  },

  camera: {
    z: 50, // Move camera.
    y: 10
  },

  rendering: {
    background: {
      color: 0x162129
    },

    renderer: {
      antialias: true
    }
  }
});

const sphere = new WHS.Sphere({ // Create sphere comonent.
  geometry: {
    radius: 3,
    widthSegments: 32,
    heightSegments: 32
  },

  mass: 10, // Mass of physics object.

  material: {
    color: 0xF2F2F2,
    kind: 'lambert'
  },

  position: [0, 100, 0]
});

const plane = new WHS.Plane({
  geometry: {
    width: 100,
    height: 100
  },

  mass: 0,

  material: {
    color: 0x447F8B,
    kind: 'phong'
  },

  rotation: {
    x: - Math.PI / 2
  }
});

new WHS.PointLight({
  light: {
    intensity: 0.5
  },

  shadowmap: {
    fov: 90
  },

  position: [0, 10, 10]
}).addTo(world);

new WHS.AmbientLight({
  light: {
    intensity: 0.5
  }
}).addTo(world);

sphere.addTo(world);
plane.addTo(world);

world.start(); // Start animations and physics simulation.
world.setControls(WHS.orbitControls());
