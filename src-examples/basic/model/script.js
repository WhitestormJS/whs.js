const GAME = new WHS.World({
  stats: 'fps', // fps, ms, mb
  autoresize: "window",

  gravity: {
    x: 0,
    y: -100,
    z: 0
  },

  camera: {
    far: 10000,
    y: 100,
    z: 300
  },

  shadowmap: {
    type: THREE.PCFSoftShadowMap
  }
});

new WHS.Model({
  geometry: {
    path: '{{ assets }}/models/utah-teapot-large.json',
    physics: '{{ assets }}/models/utah-teapot-light.json'
  },

  mass: 100,
  
  physics: {
    type: 'concave',
    friction: 1,
    restitution: 0
  },

  material: {
    shading: THREE.SmoothShading,
    map: WHS.texture('{{ assets }}/textures/teapot.jpg', {repeat: {x: 2, y: 2}}),
    kind: 'phong',
    side: THREE.DoubleSide,
    useCustomMaterial: true
  },

  pos: {
    x: 0,
    y: 100,
    z: 0
  },

  scale: {
    x: 4,
    y: 4,
    z: 4
  }
}).addTo(GAME, 'wait');

new WHS.Sphere({
  geometry: {
    radius: 3
  },

  mass: 12,

  material: {
    kind: 'phong',
    color: 0x00ff00
  },

  pos: {
    x: 10, // 45
    y: 250,
    z: 0.769
  }
}).addTo(GAME);

new WHS.Box({

  geometry: {
    width: 250,
    height: 1,
    depth: 250
  },

  mass: 0,

  material: {
    color: 0xff0000,
    kind: 'phong'
  },

  pos: {
    x: 0,
    y: 0,
    z: 0
  }
}).addTo(GAME);

new WHS.DirectionalLight({
  color: 0xffffff, // 0x00ff00,
  intensity: 2,

  pos: {
    x: 0,
    y: 10,
    z: 30
  },

  target: {
    x: 0,
    y: 0,
    z: 0
  }
}).addTo(GAME);

GAME.setControls(WHS.orbitControls());
GAME.start();
