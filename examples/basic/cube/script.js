import * as UTILS from '../../globals';

const world = new WHS.App([
  ...UTILS.appModules()
]);


// Create ball

const ball = new WHS.Sphere({
  geometry: {
    radius: 5,
    widthSegments: 32,
    heightSegments: 32
  },

  modules: [
    new PHYSICS.SphereModule({
      mass: 10,
      restitution: 1
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh
  }),

  position: [ 0, 50, 0 ]
})


// Create all sides of the box

function makeBoxWall(attrs = {}, size = 100) {
  return new WHS.Box({
    ...attrs,

    geometry: {
      width: size,
      height: size,
      depth: 0
    },

    modules: [
      new PHYSICS.BoxModule({
        mass: 0
      })
    ],

    material: new THREE.MeshPhongMaterial({
      color: 0x447F8B,
      transparent: true,
      opacity: 0.125
    })
  });
}

const box = makeBoxWall({
  position: [ 0, 0, 50 ]
});

makeBoxWall({
  position: [ 0, 0, -100 ]
}).addTo(box);

makeBoxWall({
  rotation: { x: -Math.PI / 2 },
  position: [ 0, 50, -50 ]
}).addTo(box);

makeBoxWall({
  rotation: { x: -Math.PI / 2 },
  position: [ 0, -50, -50 ]
}).addTo(box);

makeBoxWall({
  rotation: { y: -Math.PI / 2 },
  position: [ 50, 0, -50 ]
}).addTo(box);

makeBoxWall({
  rotation: { y: -Math.PI / 2 },
  position: [ -50, 0, -50]
}).addTo(box);


// Create wireframe box

new WHS.Box({
  geometry: {
    width: 100,
    height: 100,
    depth: 100
  },

  material: new THREE.MeshPhongMaterial({
    color: 0xffffff,
    wireframe: true
  }),

  position: [ 0, 0, -50 ]
}).addTo(box);


box.rotation.set(0, 0, 25)

box.addTo(world);
ball.addTo(world);

UTILS.addBasicLights(world)

world.start()
