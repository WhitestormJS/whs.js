import * as UTILS from '../../globals';

const world = new WHS.App([
  ...UTILS.appModules()
]);

const shadow = {
  cast: false,
  recieve: false
};

// Map
const box = new WHS.Box({ // Create box comonent.
  geometry: [10, 10, 10],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh
  }),

  shadow,

  modules: [
    new WHS.TextureModule({
      url: `${process.assetsPath}/textures/box.jpg`
    })
  ],

  position: [-15, 0, 0]
});

const label = new UTILS.Label({
  text: 'Map',
  scale: [10, 10, 1],
  position: [-15, 7, 0]
});

box.addTo(world);
label.addTo(world);

// normalMap

const boxNormal = new WHS.Box({ // Create box comonent.
  geometry: [10, 10, 10],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh
  }),

  shadow,

  modules: [
    new WHS.TextureModule({
      url: `${process.assetsPath}/textures/box.jpg`
    }, {
      type: 'normalMap',
      url: `${process.assetsPath}/textures/normalBox.png`
    })
  ],

  position: [0, 0, 0]
});

const labelNormal = new UTILS.Label({
  text: 'normalMap',
  scale: [10, 10, 1],
  position: [0, 7, 0]
});

boxNormal.addTo(world);
labelNormal.addTo(world);

// displacementMap

const boxDisplace = new WHS.Box({ // Create box comonent.
  geometry: [10, 10, 10, 100, 100, 100],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh
  }),

  shadow,

  modules: [
    new WHS.TextureModule({
      url: `${process.assetsPath}/textures/box.jpg`
    }, {
      type: 'displacementMap',
      url: `${process.assetsPath}/textures/displacementBox.png`
    })
  ],

  position: [15, 0, 0]
});

const labelDisplace = new UTILS.Label({
  text: 'displacementMap',
  size: 30,
  scale: [10, 10, 1],
  position: [15, 7, 0]
});

boxDisplace.addTo(world);
labelDisplace.addTo(world);

new WHS.PointLight({
  light: {
    distance: 100
  },

  position: [0, 0, 10]
}).addTo(world);

UTILS.addBasicLights(world);

world.start(); // Start animations and physics simulation.
