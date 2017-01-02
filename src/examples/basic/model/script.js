import * as UTILS from './globals';

const world = new WHS.App([
  new WHS.modules.ElementModule(),
  new WHS.modules.SceneModule(),
  new PHYSICS.WorldModule({
    ammo: '{{ ammojs }}'
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
  new WHS.modules.CameraModule({
    position: new THREE.Vector3(0, 10, 50)
  }),
  new WHS.OrbitControlsModule()
]);

// const sphere = new WHS.Dodecahedron({ // Create sphere comonent.
//   geometry: {
//     radius: 5,
//     detail: 0
//   },
//
//   modules: [
//     new PHYSICS.ConvexModule({
//       mass: 10,
//       restitution: 1
//     })
//   ],
//
//   material: {
//     color: UTILS.$colors.mesh,
//     kind: 'basic' // lambert
//   },
//
//   position: [0, 20, 0] // 0 100 0
// });

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

  material: new THREE.MeshBasicMaterial({
    shading: THREE.SmoothShading,
    map: WHS.texture('{{ assets }}/textures/teapot.jpg', {repeat: {x: 1, y: 1}}),
    side: THREE.DoubleSide
  }),

  position: {
    y: 100
  },

  scale: [4, 4, 4]
});

// const ball = new (PHYSICS.$rigidBody(WHS.Sphere, PHYSICS.SPHERE))({
//   geometry: {
//     radius: 3,
//     widthSegments: 16,
//     heightSegments: 16
//   },
//
//   mass: 60,
//
//   material: {
//     kind: 'phong',
//     color: UTILS.$colors.mesh
//   },
//
//   physics: {
//     restitution: 1
//   },
//
//   position: [10, 250, -1.969]
// });

teapot.addTo(world).then(() => {
  // ball.addTo(world);
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
