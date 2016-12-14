import * as UTILS from './globals';

const world = new (PHYSICS.$world(WHS.World))({
  ...UTILS.$world,
  softbody: true,

  gravity: {
    y: -9.8
  },

  camera: {
    far: 10000,
    near: 0.01,
    position: [0, 6, 18]
  }
});

const sphere = new WHS.Icosahedron({ // Softbody.
  geometry: {
    radius: 1,
    detail: 2
  },

  mass: 2,
  softbody: true,

  physics: {
    pressure: 100,
    damping: 0.01,
    friction: 0.3,

    klst: 0.6,
    kast: 0.6,
    margin: 0.05
  },

  shadow: {
    cast: false,
    receive: false
  },

  material: {
    color: UTILS.$colors.softbody,
    wireframe: true,
    kind: 'phong'
  },

  position: {
    y: 5
  }
});

sphere.native.frustumCulled = false;
sphere.position.y = 5;

UTILS.addBoxPlane(world, 250).then(() => sphere.addTo(world)).then(function () {
  for (var i = 0; i < 30; i++) {
    let newSphere = sphere.clone();
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
  },

  target: {
    x: 0,
    y: 0,
    z: 0
  }
}).addTo(world);

new WHS.AmbientLight({
  light: {
    color: 0xffffff,
    intensity: 0.5
  }
}).addTo(world);

world.setControls(new WHS.OrbitControls());
world.start();
