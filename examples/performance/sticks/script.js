import * as UTILS from '../../globals';

const world = new WHS.App([
  new WHS.modules.ElementModule(),
  new WHS.modules.SceneModule(),
  new WHS.modules.CameraModule({
    position: new THREE.Vector3(0, 10, 50)
  }),
  new WHS.modules.RenderingModule({
    bgColor: 0x162129,

    renderer: {
      antialias: true,
      shadowmap: {
        type: THREE.PCFSoftShadowMap
      }
    }
  }),
  new PHYSICS.WorldModule({
    ammo: process.ammoPath
  }),
  new WHS.OrbitControlsModule(),
  new WHS.modules.AutoresizeModule()
]);

const stick = new WHS.Box({
  geometry: {
    width: 5,
    height: 1,
    depth: 1
  },

  material: new THREE.MeshPhongMaterial({color: UTILS.$colors.mesh}),

  modules: [
    new PHYSICS.BoxModule({
      mass: 1,
      restitution: 0,
      friction: 0.5,
      state: 4
    })
  ],

  shadow: {
    cast: false,
    receive: false
  },

  position: {
    y: 0.5
  }
});

const stick2 = stick.clone();
stick2.position.set(0, 4, 20);

const height = 10; // BASE: 6, 0, 2, 2.
const delta = 0;
const cols = 4,
  rows = 4;

let objects = 0;

for (let k = 0; k < rows; k++) {
  for (let j = 0; j < cols; j++) {
    for (let i = 0; i < height; i++) {
      const newStick = stick.clone(false, true);
      const newStick2 = stick2.clone(false, true);

      newStick.material.color.add(new THREE.Color(Math.random(), Math.random(), Math.random()).multiplyScalar(0.2));
      newStick2.material.color.add(new THREE.Color(Math.random(), Math.random(), Math.random()).multiplyScalar(0.2));

      if (i % 2 === 0) {
        newStick.quaternion.setFromEuler(new THREE.Euler(0, Math.PI / 2, 0));
        newStick.position.set(1 + 6 * k, 0.5 + delta + (1 + delta) * i, 1 + 6 * j);

        newStick2.quaternion.setFromEuler(new THREE.Euler(0, Math.PI / 2, 0));
        newStick2.position.set(-1 + 6 * k, 0.5 + delta + (1 + delta) * i, 1 + 6 * j);
      } else {
        newStick.position.y = 0.5 + delta + (1 + delta) * i;
        newStick2.position.y = 0.5 + delta + (1 + delta) * i;
        newStick.position.z = 6 * j;
        newStick2.position.z = 2 + 6 * j;
        newStick.position.x = newStick2.position.x = 6 * k;
      }

      objects += 2;

      newStick.addTo(world);
      newStick2.addTo(world);
    }
  }
}

document.querySelector('.object_count').innerText = `${objects} objects`;

const sphere = new WHS.Sphere({
  geometry: {
    radius: 3,
    widthSegments: 32,
    heightSegments: 32
  },

  modules: [
    new PHYSICS.SphereModule({
      mass: 10
    })
  ],

  material: new THREE.MeshStandardMaterial({
    emissive: 0xaaaaaa,
    color: UTILS.$colors.mesh,
    metalness: 0.8,
    roughness: 0.5
  }),

  position: {
    x: -20,
    y: 3
  }
});

sphere.addTo(world).then((sphere) => {
  const mx = 60,
    mz = 20;

  sphere.setAngularVelocity({x: mx, y: 0, z: mz});
  sphere.setLinearVelocity({x: mx, y: 0, z: mz});
});

UTILS.addBoxPlane(world, 250).then(o => {
  o.position.y = -1;
});

UTILS.addBasicLights(world, 0.5, [100, 100, 100], 200);

world.start();
