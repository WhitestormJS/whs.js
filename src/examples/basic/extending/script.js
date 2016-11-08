import * as UTILS from './globals';

WHS.Component.prototype.changeColor = function (world) {
  const object = this,
    color = new THREE.Color();

  const animation = new WHS.Loop(() => {
    object.material.color = color;

    if (color.r <= 1)
      color.r += 0.01;
    if (color.g >= 0)
      color.g -= 0.01;
    if (color.b >= 0)
      color.b -= 0.01;
    if (color.r >= 1) {
      animation.stop(world);

      object.material.color.setRGB(1, 0, 0);

      const animation2 = new WHS.Loop(() => {
        object.material.color = color;
        if (color.r >= 0)
          color.r -= 0.01;
        if (color.g <= 1)
          color.g += 0.01;
        if (color.b >= 0)
          color.b -= 0.01;
        if (color.r <= 0 && color.g >= 1) {
          animation2.stop(world);

          object.material.color.setRGB(1, 0, 0);
          const animation3 = new WHS.Loop(() => {
            object.material.color = color;
            if (color.r >= 0)
              color.r -= 0.01;
            if (color.g >= 0)
              color.g -= 0.01;
            if (color.b <= 1)
              color.b += 0.01;
            if (color.g <= 0 && color.b >= 1) {
              animation3.stop(world);

              object.material.color.setRGB(0, 0, 1);
              animation.start(world);
            }
          });

          animation3.start(world);
        }
      });

      animation2.start(world);
    }
  });

  animation.start(world);
};

const world = new WHS.World({
  ...UTILS.$world,

  camera: {
    far: 10000,
    position: [0, 10, 30]
  }
});

const torus = new WHS.Torus({
  geometry: {
    radius: 5,
    tube: 2
  },

  mass: 0,

  material: {
    color: UTILS.$colors.mesh,
    kind: 'phong'
  },

  position: {
    x: 0,
    y: 10,
    z: 0
  }
});

world.add(torus);

torus.changeColor(world);

UTILS.addBoxPlane(world, 250);
UTILS.addBasicLights(world);

world.setControls(new WHS.OrbitControls());
world.start();
