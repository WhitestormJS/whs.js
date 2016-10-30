const world = new WHS.World({
  autoresize: "window",

  gravity: {
    x: 0,
    y: -10,
    z: 0
  },

  camera: {
    far: 2000,
    near: 1,
    z: 20,
    x: -8,
    y: 5,

    aspect: 45
  },

  rendering: {
    background: {
      color: 0xffffff
    },

    renderer: {
      antialias: true
    }
  }
});

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

const points = new WHS.Shape(
  new THREE.Points(geom, new THREE.PointsMaterial({vertexColors: THREE.VertexColors, size: 0.1}))
);

points.addTo(world);

world.setControls(new WHS.OrbitControls(new THREE.Vector3(50, 50, 50)));

// Start rendering.
world.start();
