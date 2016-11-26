import * as UTILS from './globals';

const world = new WHS.World({
  ...UTILS.$world,
  softbody: true,

  gravity: [0, -10, 0]
});

const tubeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 1,
  emissive: 0x333333,
  roughness: 0.4
});

// TOP.
const toptube = new WHS.Tube({
  geometry: {
    path: new THREE.LineCurve3(new THREE.Vector3(-30, 30, 0), new THREE.Vector3(30, 30, 0)),
    radius: 1
  },

  mass: 0,
  material: tubeMaterial
});

toptube.addTo(world);

// LEFT.
new WHS.Tube({
  geometry: {
    path: new THREE.LineCurve3(new THREE.Vector3(-29.5, 30.5, 0), new THREE.Vector3(-40, 0, 0)),
    radius: 1
  },

  mass: 0,
  material: tubeMaterial
}).addTo(world);

// RIGHT.
new WHS.Tube({
  geometry: {
    path: new THREE.LineCurve3(new THREE.Vector3(29.5, 30.5, 0), new THREE.Vector3(40, 0, 0)),
    radius: 1
  },

  mass: 0,
  material: tubeMaterial
}).addTo(world);

const sphere = new WHS.Sphere({
  geometry: {
    radius: 3,
    widthSegments: 32,
    heightSegments: 32
  },

  mass: 3,

  material: {
    color: 0xffffff,
    kind: 'basic'
  },

  position: {
    x: -20,
    y: 10,
    z: 0
  }
});

const sphereHandler = [];

for (let i = 0; i < 5; i++) {
  const sc = sphere.clone();
  sc.position.x = -20 + i * 6;
  sc.material = sc.material.clone();
  sc.addTo(world);
  sphereHandler.push(sc);

  const v1 = sc.position.clone();
  const v2 = sc.position.clone();
  v2.y = 30;

  const rope = new WHS.Line({
    geometry: {
      curve: new THREE.LineCurve3(v1, v2)
    },

    physics: {
      piterations: 10,
      viterations: 10
    },

    mass: 1,

    softbody: true
  });

  rope.addTo(world).then(() => {
    rope.appendAnchor(world, toptube, 50, 1);
    rope.appendAnchor(world, sc, 0, 1);
  });
}

const sphereStart = new WHS.Sphere({
  geometry: {
    radius: 3,
    widthSegments: 32,
    heightSegments: 32
  },

  mass: 3,

  material: {
    color: 0xffffff,
    kind: 'basic'
  },

  position: {
    x: 25,
    y: 15,
    z: 0
  }
});

sphereStart.addTo(world);
sphereHandler.push(sphereStart);

const rope1 = new WHS.Line({
  geometry: {
    curve: new THREE.LineCurve3(sphereStart.position.clone(), new THREE.Vector3(10, 30, 0))
  },

  physics: {
    piterations: 10,
    viterations: 10
  },

  mass: 1,

  softbody: true
});

rope1.addTo(world);

rope1.appendAnchor(world, toptube, 50, 1);
rope1.appendAnchor(world, sphereStart, 0, 1);

new WHS.Plane({
  geometry: {
    width: 250,
    height: 250
  },

  mass: 0,

  material: {
    color: 0xff0000,
    kind: 'basic',
    transparent: true,
    opacity: 0
  },

  position: {
    x: 0,
    y: 0,
    z: 0
  },

  rotation: {
    x: -Math.PI / 2
  }
}).addTo(world);

new WHS.SpotLight({
  light: {
    intensity: 6,
    distance: 100,
    angle: 90
  },

  position: {
    y: 50
  }
}).addTo(world);

new WHS.AmbientLight({
  light: {
    intensity: 0.6,
    color: 0xffffff
  }
}).addTo(world);

world.start();

// Check mouse.
const mouse = new WHS.VirtualMouse(world);

for (let i = 0, max = sphereHandler.length; i < max; i++) {
  const nows = sphereHandler[i];
  mouse.track(nows);

  let dragged;

  nows.on('mouseover', () => {
    if (!dragged) nows.material.color.set(0xff0000);
  });

  nows.on('mouseout', () => {
    if (!dragged) nows.material.color.set(0xffffff);
  });

  nows.on('mousedown', () => {
    nows.material.color.set(0xff0000);
    dragged = true;
  });

  mouse.on('mouseup', () => {
    nows.material.color.set(0xffffff);
    dragged = false;
  });

  mouse.on('move', () => {
    if (dragged) nows.setLinearVelocity(mouse.project().sub(nows.position).multiplyScalar(3));
  });
}
