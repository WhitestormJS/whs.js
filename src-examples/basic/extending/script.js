WHS.Shape.prototype.changeColor = function () {
  const object = this,
    color = new THREE.Color();

  const animation = new WHS.Loop(() => {
    object.M_color = color;

    if (color.r <= 1)
      color.r += 0.01;
    if (color.g >= 0)
      color.g -= 0.01;
    if (color.b >= 0)
      color.b -= 0.01;
    if (color.r >= 1) {
      object.getWorld().removeLoop(animation);
      animation.stop();

      object.M_color.setRGB(1, 0, 0);

      const animation2 = new WHS.Loop(() => {
        object.M_color = color;
        if (color.r >= 0)
          color.r -= 0.01;
        if (color.g <= 1)
          color.g += 0.01;
        if (color.b >= 0)
          color.b -= 0.01;
        if (color.r <= 0 && color.g >= 1) {
          object.getWorld().removeLoop(animation2);
          animation2.stop();

          object.M_color.setRGB(1, 0, 0);
          const animation3 = new WHS.Loop(() => {
            object.M_color = color;
            if (color.r >= 0)
              color.r -= 0.01;
            if (color.g >= 0)
              color.g -= 0.01;
            if (color.b <= 1)
              color.b += 0.01;
            if (color.g <= 0 && color.b >= 1) {
              object.getWorld().removeLoop(animation3);
              animation3.stop();

              object.M_color.setRGB(0, 0, 1);

              object.getWorld().addLoop(animation);
              animation.start();
            }
          });

          object.getWorld().addLoop(animation3);
          animation3.start();
        }
      });

      object.getWorld().addLoop(animation2);
      animation2.start();
    }
  });

  object.getWorld().addLoop(animation);
  animation.start();
};

const GAME = new WHS.World({
  stats: 'fps', // fps, ms, mb
  autoresize: true,

  gravity: {
    x: 0,
    y: -50,
    z: 0
  },

  camera: {
    far: 10000,
    y: 10,
    z: 30
  },

  shadowmap: {
    type: THREE.PCFSoftShadowMap
  }
});

const torus = new WHS.Torus({
  geometry: {
    radius: 5,
    tube: 2
  },

  mass: 0,

  material: {
    color: 0xff0000,
    kind: 'phong'
  },

  pos: {
    x: 0,
    y: 10,
    z: 0
  }
});

GAME.add(torus);

torus.changeColor();

new WHS.Box({

  geometry: {
    width: 250,
    height: 1,
    depth: 250
  },

  mass: 0,

  material: {
    color: 0xff0000,
    kind: 'phong'
  },

  pos: {
    x: 0,
    y: 0,
    z: 0
  }
}).addTo(GAME);

new WHS.DirectionalLight({
  color: 0xffffff, // 0x00ff00,
  intensity: 2,

  pos: {
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

GAME.setControls(WHS.orbitControls());
GAME.start();
