import * as UTILS from '../../globals';

const world = new WHS.App([
  ...UTILS.appModules({
    position: new THREE.Vector3(0, 40, 70)
  })
]);

const halfMat = {
  transparent: true,
  opacity: 0.5
};

const box = new WHS.Box({
  geometry: {
    width: 2,
    height: 30,
    depth: 2
  },

  modules: [
    new PHYSICS.BoxModule({
      mass: 10
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh,
    ...halfMat
  }),

  position: {
    y: 40
  }
});

const box2 = new WHS.Box({
  geometry: {
    width: 2,
    height: 20,
    depth: 2
  },


  modules: [
    new PHYSICS.BoxModule({
      mass: 10,
      damping: 0.1
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.softbody,
    ...halfMat
  }),

  position: {
    y: 42,
    z: 10
  }
});

box.addTo(world);
box2.addTo(world).then(() => {
  const constraint = new PHYSICS.SliderConstraint(box2, box,
    new THREE.Vector3(0, box2.position.y, 0),
    new THREE.Vector3(0, 1, 0)
  );

  world.addConstraint(constraint);
});

UTILS.addPlane(world, 250);
UTILS.addBasicLights(world);

world.start();
