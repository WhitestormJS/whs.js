import * as UTILS from './globals';

const world = new WHS.World({
  ...UTILS.$world,

  camera: {
    far: 10000,
    position: [0, 2, 12]
  },

  plugins: {
    scene: false
  }
});

const scene = new THREE.Scene();
const material = new THREE.MeshPhongMaterial({color: UTILS.$colors.mesh});
const materialNested = material.clone();
materialNested.color.set(0x0000ff);
const materialWHS = material.clone();
materialWHS.color.set(0xffffff);
materialWHS.map = new WHS.texture('{{ assets }}/textures/earth.jpg');

const mesh1 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  material
);

mesh1.position.set(2, 2, 0);

scene.add(mesh1);

const mesh2 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  material
);

mesh2.position.set(4, 2, 0);

scene.add(mesh2);

const mesh3 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  materialNested
);

mesh3.position.set(0, 0, 1);

// Nested object.
mesh2.add(mesh3);

world.importScene(scene, true);
world.make$camera();
world.make$rendering();
world.make$helpers();

const sphere = new WHS.Element(
  new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    materialWHS
  ),
  [WHS.MeshComponent]
);

sphere.addTo(world);
sphere.position.y = 2;

const light = new WHS.Element(
  new THREE.PointLight(),
  [WHS.LightComponent]
);

light.wrap();

light.addTo(world);

UTILS.addPlane(world);
UTILS.addBasicLights(world);

world.setControls(new WHS.OrbitControls());
world.start();
