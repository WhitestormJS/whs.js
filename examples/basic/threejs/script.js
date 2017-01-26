import * as UTILS from '../../globals';

const world = new WHS.App([
  new WHS.app.ElementModule(),
  new WHS.app.SceneModule(true)
]);

const scene = new THREE.Scene();
const material = new THREE.MeshPhongMaterial({color: UTILS.$colors.mesh});
const materialNested = material.clone();
materialNested.color.set(0x0000ff);
const materialWHS = material.clone();
materialWHS.color.set(0xffffff);
materialWHS.map = WHS.mesh.TextureModule.load(`${process.assetsPath}/textures/earth.jpg`);

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

world.setScene(scene);

world
  .module(new WHS.app.CameraModule({
    position: new THREE.Vector3(0, 2, 12)
  }))
  .module(new WHS.app.RenderingModule({
    bgColor: 0x162129,

    renderer: {
      antialias: true
    }
  }))
  .module(new WHS.app.ResizeModule())
  .module(new WHS.controls.OrbitModule());

const sphere = new WHS.Sphere({
  geometry: [1, 32, 32],
  material: materialWHS
});

sphere.addTo(world);
sphere.position.y = 2;

const mesh1 = WHS.MeshComponent.create(
  new THREE.SphereGeometry(1, 32, 32),
  {material}
);

mesh1.position.set(2, 2, 0);

world.add(mesh1);

const light = new WHS.PointLight();

light.addTo(world);

UTILS.addPlane(world);
UTILS.addBasicLights(world);

world.start();
