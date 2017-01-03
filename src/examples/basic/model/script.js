import * as UTILS from './globals';

const world = new WHS.App([
  new WHS.modules.ElementModule(),
  new WHS.modules.SceneModule(),
  new PHYSICS.WorldModule({
    ammo: '{{ ammojs }}'
  }),
  new WHS.modules.CameraModule({
    position: new THREE.Vector3(0, 40, 250)
  }),
  new WHS.modules.RenderingModule({
    background: {
      color: 0x162129
    },

    renderer: {
      antialias: true
    },

    shadowmap: {
      type: THREE.PCFSoftShadowMap
    }
  }),
  new WHS.OrbitControlsModule(),
  new WHS.modules.AutoresizeModule()
]);

const teapot = new WHS.Model({
  geometry: {
    path: '{{ assets }}/models/teapot/utah-teapot-large.json'
  },

  modules: [
    new PHYSICS.ConcaveModule({
      friction: 1,
      mass: 200,
      restitution: 0.5,
      path: '{{ assets }}/models/teapot/utah-teapot-light.json',
      scale: new THREE.Vector3(4, 4, 4)
    })
  ],

  useCustomMaterial: true,

  material: new THREE.MeshPhongMaterial({
    shading: THREE.SmoothShading,
    map: WHS.texture('{{ assets }}/textures/teapot.jpg', {repeat: {x: 1, y: 1}}),
    side: THREE.DoubleSide
  }),

  position: {
    y: 100
  },

  scale: [4, 4, 4]
});

const ball = new WHS.Sphere({
  geometry: {
    radius: 3,
    widthSegments: 16,
    heightSegments: 16
  },

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh
  }),

  modules: [
    new PHYSICS.SphereModule({
      restitution: 1,
      mass: 60
    })
  ],

  position: [10, 250, -1.969]
});

teapot.addTo(world).then(() => {
  ball.addTo(world);
});

UTILS.addBoxPlane(world, 500);

new WHS.SpotLight({
  light: {
    color: 0xffffff,
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

world.start();
