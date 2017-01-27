const mouse = new WHS.app.VirtualMouseModule();

const world = new WHS.App([
  new WHS.app.ElementModule(),
  new WHS.app.SceneModule(),
  new WHS.app.CameraModule({
    position: new THREE.Vector3(0, 15, 60),
    far: 10000
  }),
  new WHS.app.RenderingModule({
    bgColor: 0x162129,

    renderer: {
      antialias: true,
      shadowmap: {
        type: THREE.PCFSoftShadowMap
      }
    }
  }),
  new PHYSICS.WorldModule({
    ammo: process.ammoPath,
    gravity: new THREE.Vector3(0, -10, 0),
    softbody: true
  }),
  new WHS.app.ResizeModule(),
  mouse
]);

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

  modules: [
    new PHYSICS.ConvexModule({
      mass: 0
    })
  ],

  material: tubeMaterial
});

toptube.addTo(world);

// LEFT.
new WHS.Tube({
  geometry: {
    path: new THREE.LineCurve3(new THREE.Vector3(-29.5, 30.5, 0), new THREE.Vector3(-40, 0, 0)),
    radius: 1
  },

  modules: [
    new PHYSICS.ConvexModule({
      mass: 0
    })
  ],

  material: tubeMaterial
}).addTo(world);

// RIGHT.
new WHS.Tube({
  geometry: {
    path: new THREE.LineCurve3(new THREE.Vector3(29.5, 30.5, 0), new THREE.Vector3(40, 0, 0)),
    radius: 1
  },

  modules: [
    new PHYSICS.ConvexModule({
      mass: 0
    })
  ],

  material: tubeMaterial
}).addTo(world);

const sphere = new WHS.Sphere({
  geometry: {
    radius: 3,
    widthSegments: 32,
    heightSegments: 32
  },

  modules: [
    new PHYSICS.SphereModule({
      mass: 3
    })
  ],

  material: new THREE.MeshBasicMaterial({
    color: 0xffffff
  }),

  position: {
    x: -20,
    y: 10,
    z: 0
  }
});

const sphereHandler = [];
const blackBasic = new THREE.MeshBasicMaterial({color: 0x000000});

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

    material: blackBasic,

    modules: [
      new PHYSICS.RopeModule({
        piterations: 10,
        viterations: 10,
        mass: 1
      })
    ]
  });

  rope.addTo(world).then(() => {
    rope.appendAnchor(toptube, 50, 1);
    rope.appendAnchor(sc, 0, 1);
  });
}

const sphereStart = new WHS.Sphere({
  geometry: {
    radius: 3,
    widthSegments: 32,
    heightSegments: 32
  },

  modules: [
    new PHYSICS.SphereModule({
      mass: 3
    })
  ],

  material: new THREE.MeshBasicMaterial({
    color: 0xffffff
  }),

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

  material: blackBasic,

  modules: [
    new PHYSICS.RopeModule({
      piterations: 10,
      viterations: 10,
      mass: 1
    })
  ]
});

rope1.addTo(world).then(() => {
  rope1.appendAnchor(toptube, 50, 1);
  rope1.appendAnchor(sphereStart, 0, 1);
});

new WHS.Plane({
  geometry: {
    width: 250,
    height: 250
  },

  modules: [
    new PHYSICS.PlaneModule({
      mass: 0
    })
  ],

  material: new THREE.MeshBasicMaterial({
    color: 0xff0000,
    transparent: true,
    opacity: 0
  }),

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
