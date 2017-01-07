const world = new WHS.App([
  new WHS.modules.ElementModule(),
  new WHS.modules.SceneModule(),
  new WHS.modules.CameraModule({
    position: new THREE.Vector3(-8, 5, 20),
    far: 2000,
    near: 1,
    fov: 45
  }),
  new WHS.modules.RenderingModule({
    bgColor: 0xffffff,

    renderer: {
      antialias: true,
      shadowmap: {
        type: THREE.PCFSoftShadowMap
      }
    }
  }),
  new WHS.OrbitControlsModule({target: new THREE.Vector3(50, 50, 50)}),
  new WHS.modules.AutoresizeModule()
]);

const data = new Float32Array(3993000);
const colors = new Float32Array(3993000);

let i = 0;
for (let x = 0; x <= 100; x++) {
  for (let y = 0; y <= 100; y++) {
    for (let z = 0; z <= 100; z++) {
      data[i * 3] = x;
      data[i * 3 + 1] = y;
      data[i * 3 + 2] = z;
      colors[i * 3] = x / 100;
      colors[i * 3 + 1] = y / 100;
      colors[i * 3 + 2] = z / 100;
      i++;
    }
  }
}

const geom = new THREE.BufferGeometry();

geom.addAttribute('position', new THREE.BufferAttribute(data, 3));
geom.addAttribute('color', new THREE.BufferAttribute(colors, 3));

class Points extends WHS.MeshComponent {
  build(params = {}) {
    return new THREE.Points(params.geom, new THREE.PointsMaterial({vertexColors: THREE.VertexColors, size: 0.1}));
  }
}

new Points({geom}).addTo(world);

// Start rendering.
world.start();
