const GAME = new WHS.World({
  stats: 'fps', // fps, ms, mb
  autoresize: true,

  gravity: {
    x: 0,
    y: -100,
    z: 0
  },

  camera: {
    far: 10000,
    y: 10,
    z: 100
  },

  rendering:{
    background: {
      color: 0xcccccc
    }
  }
});

const halfMat = {
  kind: 'basic',
  transparent: true,
  opacity: 0.5
};

const box = new WHS.Box({
  geometry: {
    width: 2,
    height: 20,
    depth: 2
  },

  mass: 0,

  material: {
    color: 0xffffff,
    ...halfMat
  },

  position: {
    y: 40
  }
});

const box2 = new WHS.Box({
  geometry: {
    width: 2,
    height: 2,
    depth: 20
  },

  mass: 10,

  material: {
    color: 0x0000ff,
    ...halfMat
  },

  physics: {
    damping: 0.1
  },

  position: {
    y: 28,
    z: 10
  }
});

const pointer = new WHS.Sphere({material: {color: 0x00ff00}});
pointer.position.set(0.5, 60, -8);
pointer.addTo(GAME);

box.addTo(GAME);
box2.addTo(GAME);

const constraint = new WHS.PointConstraint(box2, box,
  new THREE.Vector3(0, box2.position.y, 1)
);

GAME.scene.addConstraint(constraint);

new WHS.Plane({
  geometry: {
    width: 250,
    height: 250
  },

  mass: 0,

  material: {
    color: 0xff0000,
    kind: 'basic'
  },

  position: {
    x: 0,
    y: 0,
    z: 0
  },

  rotation: {
    x: -Math.PI / 2
  }
}).addTo(GAME);

GAME.start();
GAME.setControls(WHS.orbitControls());
