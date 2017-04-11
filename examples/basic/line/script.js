import * as UTILS from '../../globals';

const controlsModule = new WHS.controls.OrbitModule();

const world = new WHS.App([
  ...UTILS.appModules({
    position: new THREE.Vector3(0, 10, 200)
  }),

  controlsModule
]);

controlsModule.controls.autoRotate = true;

const yPadding = 2;
const xzPadding = 1;
let yDist = Math.floor(Math.random() * 10) + yPadding;

for (let i = 1; i < 100; i++) {
  const xStart = Math.floor(Math.random() * i * (i % 2 === 0 ? -1 : -1)) + (xzPadding * (i % 2 === 0 ? -10 : 10));
  const xDist = Math.floor(Math.random()) + 5;
  const zStart = Math.floor(Math.random() * i * (i % 2 === 0 ? -1 : -1)) + (xzPadding * (i % 2 === 0 ? -10 : 10));
  yDist = Math.floor(Math.random() * 50) + (yPadding * 10);
  const points = [
    new THREE.Vector3(xStart, 0, zStart),
    new THREE.Vector3(xStart + xDist, 0, zStart),
    new THREE.Vector3(xStart, 0, -xDist + zStart),
    new THREE.Vector3(xStart + xDist, 0, -xDist + zStart)
  ];

  const color = new THREE.Color(0xffffff * Math.random()).getHex();
  drawRectangle(points, color);
}

function drawRectangle(points, color) {
  // join the bottom points
  for (let i = 0; i < points.length - 1; i++) {
    const line = new WHS.Line({
      geometry: {
        start: new THREE.Vector3(points[i].x, points[i].y, points[i].z),
        end: new THREE.Vector3(points[i + 1].x, points[i + 1].y, points[i + 1].z)
      },

      material: new THREE.LineBasicMaterial({
        color
      })
    });

    line.addTo(world);
  }

  // top square
  for (let i = 0; i < points.length - 1; i++) {
    const line = new WHS.Line({
      geometry: {
        start: new THREE.Vector3(points[i].x, points[i].y + yDist, points[i].z),
        end: new THREE.Vector3(points[i + 1].x, points[i + 1].y + yDist, points[i + 1].z)
      },

      material: new THREE.LineBasicMaterial({
        color
      })
    });

    line.addTo(world);
  }

  // closes the top square
  const line2 = new WHS.Line({
    geometry: {
      start: new THREE.Vector3(
        points[points.length - 1].x,
        points[points.length - 1].y + yDist,
        points[points.length - 1].z),

      end: new THREE.Vector3(
        points[0].x,
        points[0].y + yDist,
        points[0].z)
    },

    material: new THREE.LineBasicMaterial({
      color
    })
  });
  line2.addTo(world);

  // closes the bottom square
  const line = new WHS.Line({
    geometry: {
      start: new THREE.Vector3(points[points.length - 1].x, points[points.length - 1].y, points[points.length - 1].z),
      end: new THREE.Vector3(points[0].x, points[0].y, points[0].z)
    },

    material: new THREE.LineBasicMaterial({
      color
    })
  });
  line.addTo(world);

  // vertical join
  for (let i = 0; i < points.length - 1; i++) {
    const line = new WHS.Line({
      geometry: {
        start: new THREE.Vector3(points[i].x, points[i].y, points[i].z),
        end: new THREE.Vector3(points[i].x, points[i + 1].y + yDist, points[i].z)
      },

      material: new THREE.LineBasicMaterial({
        color
      })
    });

    line.addTo(world);
  }
  // closes the vertical one
  const line3 = new WHS.Line({
    geometry: {
      start: new THREE.Vector3(points[points.length - 1].x, points[points.length - 1].y, points[points.length - 1].z),
      end: new THREE.Vector3(points[3].x, points[3].y + yDist, points[3].z)
    },

    material: new THREE.LineBasicMaterial({
      color
    })
  });
  line3.addTo(world);
}

new WHS.Box({
  geometry: {
    width: 900,
    height: 900,
    widthSegments: 50,
    heightSegments: 50
  },

  position: [0, -1.5, 0],
  rotation: {
    y: 0,
    x: -Math.PI / 2
  },

  shadow: {
    cast: false,
    receive: false
  },

  material: new THREE.MeshBasicMaterial({
    wireframe: true,
    color: 0x444444
  })
}).addTo(world);

world.start();
