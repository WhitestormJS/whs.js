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
    height: 20,
    depth: 2
  },

  modules: [
    new PHYSICS.BoxModule({
      mass: 0
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
    height: 2,
    depth: 20
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
    y: 28,
    z: 10
  }
});

const pointer = new WHS.Sphere({
  modules: [
    new PHYSICS.SphereModule()
  ],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh
  })
});

console.log(pointer);

pointer.position.set(0.5, 60, -8);
pointer.addTo(world);

box.addTo(world);
box2.addTo(world).then(() => {
  const constraint = new PHYSICS.PointConstraint(box2, box,
    new THREE.Vector3(0, box2.position.y, 1)
  );

  world.addConstraint(constraint);
});

UTILS.addPlane(world, 250);
UTILS.addBasicLights(world);

world.start();
