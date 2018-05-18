import * as UTILS from '@utils';

const app = new WHS.App([
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
    width: 30,
    height: 2,
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
    width: 30,
    height: 1,
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
    y: 38,
    z: 12
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

pointer.position.set(0, 60, -8);
pointer.addTo(app);

box.addTo(app);
box2.addTo(app).then(() => {
  const constraint = new PHYSICS.DOFConstraint(box2, box,
    new THREE.Vector3(0, 38, 1)
  );

  app.addConstraint(constraint);
  constraint.enableAngularMotor(10, 20);
});

UTILS.addPlane(app, 250);
UTILS.addBasicLights(app);

app.start();
