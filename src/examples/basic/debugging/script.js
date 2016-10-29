import * as UTILS from './globals';

const world = new WHS.World({
  ...UTILS.$world,

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

  camera: {
    far: 10000,
    y: 10,
    z: 30
  }
});

const sphere = new WHS.Sphere({
  geometry: {
    radius: 2
  },

  mass: 0,
  physics: false,

  material: {
    color: UTILS.$colors.mesh,
    kind: 'phong'
  },

  position: [0, 10, 0]
});

sphere.wait().then(() => {
  const boxHelper = sphere.clone();
  boxHelper.addTo(world);
  boxHelper.addHelper('box');

  const faceNormalsHelper = sphere.clone();
  faceNormalsHelper.position.x = 10;
  faceNormalsHelper.addTo(world);
  faceNormalsHelper.addHelper('faceNormals', {color: 0x0000ff, size: 0.5});

  const vertexNormalsHelper = sphere.clone();
  vertexNormalsHelper.position.set(10, 10, 10);
  vertexNormalsHelper.addTo(world);
  vertexNormalsHelper.addHelper('vertexNormals', {color: 0x00ff00, size: 0.5});

  const boundingBoxHelper = sphere.clone();
  boundingBoxHelper.position.z = 10;
  boundingBoxHelper.addTo(world);
  boundingBoxHelper.addHelper('boundingBox', {color: 0x00ffff});
  boundingBoxHelper._helpers.boundingBox.update();
});

UTILS.addPlane(world, 250);
UTILS.addBasicLights(world, 0.5, [0, 50, 50], 200);

world.setControls(new WHS.OrbitControls());
world.start();
