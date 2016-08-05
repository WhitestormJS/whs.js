const GAME = new WHS.World({
  stats: 'fps', // fps, ms, mb
  autoresize: "window",

  gravity: {
    x: 0,
    y: -9.8,
    z: 0
  },

  camera: {
    far: 10000,
    y: 100,
    z: 300
  },

  shadowmap: {
    type: THREE.PCFShadowMap
  },

  background: {
    color: 0xaaaaaa
  }
});

const stick = new WHS.Box({
  geometry: {
    width: 40,
    height: 8,
    depth: 8
  },

  mass: 10,

  material: {
    kind: 'phong',
    map: WHS.texture('{{ assets }}/textures/retina_wood.jpg'),
    specularMap: WHS.texture('{{ assets }}/textures/SpecularMap.png'),
    normalMap: WHS.texture('{{ assets }}/textures/NormalMap.png'),
    shininess: 0
  },

  physics: {
    restitution: 0,
    friction: 0.5
  },

  pos: {
    y: 4
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
      const newStick = stick.clone();
      const newStick2 = stick2.clone();

      if (i % 2 === 0) {
        newStick.quaternion.setFromEuler(new THREE.Euler(0, Math.PI / 2, 0));
        newStick.position.set(8 + 41 * k, 4 + delta + (8 + delta) * i, 8 + 41 * j);

        newStick2.quaternion.setFromEuler(new THREE.Euler(0, Math.PI / 2, 0));
        newStick2.position.set(-8 + 41 * k, 4 + delta + (8 + delta) * i, 8 + 41 * j);
      } else {
        newStick.position.y = 4 + delta + (8 + delta) * i;
        newStick2.position.y = 4 + delta + (8 + delta) * i;
        newStick.position.z = 41 * j;
        newStick2.position.z = 16 + 41 * j;
        newStick.position.x = newStick2.position.x = 41 * k;
      }

      objects += 2;

      newStick.addTo(GAME);
      newStick2.addTo(GAME);
    }
  }
}

document.querySelector('.object_count').innerText = `${objects} objects`;

window.sphere = new WHS.Sphere({
  geometry: {
    radius: 12,
    widthSegments: 32,
    heightSegments: 32
  },

  mass: 1000,

  material: {
    color: 0x000ff,
    kind: 'phong'
  },

  pos: {
    x: -100,
    y: 12
  }
});

window.sphere.addTo(GAME).then((sphere) => {
  const mx = 600,
    mz = 200;

  sphere.setAngularVelocity({x: mx, y: 0, z: mz});
  sphere.setLinearVelocity({x: mx, y: 0, z: mz});
});

window.ground = new WHS.Box({
  geometry: {
    width: 2500,
    height: 5,
    depth: 2500
  },

  mass: 0,

  material: {
    map: WHS.texture('{{ assets }}/textures/metal.png', {repeat:{x:20, y:20}}),
    normalMap: WHS.texture('{{ assets }}/textures/NormalMap_metal.png', {repeat:{x:20, y:20}}),
    kind: 'phong'
  },

  physics: {
    margin: 3
  },

  pos: {
    x: 0,
    y: -3,
    z: 0
  }
});
window.ground.addTo(GAME);

const light = new WHS.DirectionalLight({
  light: {
    color: 0xffffff, // 0x00ff00,
    intensity: 1,
    distance: 400
  },

  shadowmap: {
    far: 2500,

    left: -400,
    right: 400
  },

  pos: {
    x: 0,
    y: 100,
    z: 300
  }
});

light.addTo(GAME);

console.log(light);

new WHS.AmbientLight({
  light: {
    color: 0xffffff,
    intensity: 0.2
  }
}).addTo(GAME);

GAME.setControls(WHS.orbitControls());
GAME.start();
