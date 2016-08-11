window.GAME = new WHS.World({
  autoresize: true,

  gravity: {
    x: 0,
    y: -100,
    z: 0
  },

  camera: {
    far: 10000,
    y: 10,
    z: 30
  },

  background: {
    opacity: 0
  },

  rWidth: 1.5,
  rHeight: 1.5,

  renderer: {
    alpha: true
  }
});

const envMap = WHS.texture('{{ assets }}/background.jpg');
envMap.mapping = THREE.SphericalReflectionMapping;

const sphere = new WHS.Sphere({
  geometry: {
    radius: 3,
    widthSegments: 32,
    heightSegments: 32
  },

  mass: 10,

  material: {
    color: 0xffffff,
    kind: 'basic',
    envMap: envMap,
    refractionRatio: 0.95
  },

  pos: {
    x: -20,
    y: 20,
    z: 0
  }
});

sphere.addTo(GAME);

for (let i = 0; i < 5; i++) {
  const sc = sphere.clone();
  sc.position.x = -20 + i * 6;
  sc.addTo(GAME);
}

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

  pos: {
    x: 0,
    y: 0,
    z: 0
  },

  rot: {
    x: -Math.PI / 2
  }
}).addTo(GAME);

new WHS.PointLight({
  light: {
    intensity: 6,
    distance: 100
  },

  pos: {
    y: 50
  }
}).addTo(GAME);

new WHS.AmbientLight({
  light: {
    intensity: 10,
    color: 0xffffff
  }
}).addTo(GAME);

GAME.setControls(WHS.orbitControls());

GAME.start();
