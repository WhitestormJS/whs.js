import { World } from '../../lib/core/World';
import { Sphere } from '../../lib/components/meshes/Sphere';
import { Plane } from '../../lib/components/meshes/Plane';

const world = new World({
  stats: 'fps', // fps, ms, mb
  autoresize: true,

  gravity: {
    x: 0,
    y: -100,
    z: 0
  },

  camera: {
    far: 10000,
    position: {
      y: 10,
      z: 30
    }
  }
});

const sphere = new Sphere({
  geometry: {
    radius: 3
  },

  mass: 10,

  material: {
    color: 0xffffff,
    kind: 'basic'
  },

  position: {
    y: 100
  }
});

sphere.addTo(world);

new Plane({
  geometry: {
    width: 250,
    height: 250
  },

  mass: 0,

  material: {
    color: 0xff0000,
    kind: 'basic'
  },

  rotation: {
    x: -Math.PI / 2
  }
}).addTo(world);

world.start();
