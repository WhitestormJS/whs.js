import * as UTILS from './globals';

const world = new (PHYSICS.$world(WHS.World))({
  ...UTILS.$world,

  physics: {
    ammo: '{{ ammojs }}'
  },

  camera: {
    far: 10000,
    position: [0, 100, 300]
  }
});

const teapot = new (PHYSICS.$rigidBody(WHS.Model, PHYSICS.CONCAVE2))({
  geometry: {
    path: '{{ assets }}/models/teapot/utah-teapot-large.json',
    physics: '{{ assets }}/models/teapot/utah-teapot-light.json'
  },

  mass: 200,

  physics: {
    type: 'concave',
    friction: 1,
    restitution: 0.5
  },

  material: {
    kind: 'phong',
    shading: THREE.SmoothShading,
    map: WHS.texture('{{ assets }}/textures/teapot.jpg', {repeat: {x: 1, y: 1}}),
    side: THREE.DoubleSide,
    useCustomMaterial: true
  },

  position: {
    y: 100
  },

  scale: [4, 4, 4]
});

const ball = new (PHYSICS.$rigidBody(WHS.Sphere, PHYSICS.SPHERE))({
  geometry: {
    radius: 3,
    widthSegments: 16,
    heightSegments: 16
  },

  mass: 60,

  material: {
    kind: 'phong',
    color: UTILS.$colors.mesh
  },

  physics: {
    restitution: 1
  },

  position: [10, 250, -1.969]
});

teapot.addTo(world).then(() => {
  ball.addTo(world);
});

UTILS.addBoxPlane(world, 500);

new WHS.SpotLight({
  light: {
    color: 0xffffff, // 0x00ff00,
    intensity: 1,
    distance: 300,
    angle: 180
  },

  shadowmap: {
    fov: 90
  },

  position: {
    x: 0,
    y: 150,
    z: 50
  }
}).addTo(world);

UTILS.addAmbient(world, 0.3);

world.setControls(new WHS.OrbitControls());
world.start();
