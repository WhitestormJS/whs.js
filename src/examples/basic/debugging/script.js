window.GAME = new WHS.World({
  stats: 'fps', // fps, ms, mb
  autoresize: "window",
  background: {
    color: 0xcccccc
  },

  helpers: {
    grid: {
      size: 100,
      step: 100,
      color1: 0xff0000
    },
    axis: {
      size: 100
    }
  },

  gravity: {
    x: 0,
    y: -100,
    z: 0
  },

  camera: {
    far: 10000,
    y: 10,
    z: 30
  }
});

window.sphere = new WHS.Sphere({
  geometry: {
    radius: 2
  },

  mass: 0,
  physics: false,

  helpers: {
    box: true
  },

  material: {
    color: 0xff0000,
    kind: 'phong'
  },

  position: {
    x: 0,
    y: 10,
    z: 0
  }
});

sphere.addTo(GAME).then((obj) => {
  window.sphere2 = obj.clone();

  sphere2.params.helpers.box = false;
  sphere2.params.helpers.faceNormals = {color: 0x0000ff, size: 0.5};

  sphere2.wrap('no-transforms');
  sphere2.addTo(GAME);
  sphere2.position.x = 10;

  const sphere3 = sphere2.clone();

  sphere3.params.helpers.faceNormals = false;
  sphere3.params.helpers.edges = {color: 0x0000ff, size: 0.5};

  sphere3.wrap('no-transforms');
  sphere3.position.z = 10;
  sphere3.addTo(GAME);

  const sphere4 = sphere3.clone();

  sphere4.params.helpers.edges = false;
  sphere4.params.helpers.vertexNormals = {color: 0x00ff00, size: 0.5};

  sphere4.wrap('no-transforms');
  sphere4.position.x = 0;
  sphere4.addTo(GAME);
});

new WHS.Plane({
  geometry: {
    width: 250,
    height: 250
  },

  material: {
    color: 0xcccccc,
    kind: 'basic'
  },

  position: {
    x: 0,
    y: 0,
    z: 0
  },

  rotation: {
    x: -Math.PI / 2,
    y: 0,
    z: 0
  }
}).addTo(GAME);

new WHS.PointLight({
  light: {
    intensity: 2,
    distance: 200
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
}).addTo(GAME);

new WHS.AmbientLight({
  light: {
    intensity: 0.5
  }
}).addTo(GAME);

// GAME.ground.mesh.__dirtyRotation = true;
// GAME.ground.rotation.set(-Math.PI/2, 0, 0);

GAME.setControls(WHS.orbitControls());
GAME.start();
