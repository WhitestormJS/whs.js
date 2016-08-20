const conf = {
  world: {
    stats: "fps",
    autoresize: true,

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
  },
  plane: {
    geometry: {
      width: 250,
      height: 250
    },

    mass: 0,

    material: {
      color: 0xcccccc,
      kind: "basic"
    },

    pos: {
      x: 0,
      y: 0,
      z: 0
    },

    rot: {
      x: -Math.PI / 2
    }
  }
};

export {conf};