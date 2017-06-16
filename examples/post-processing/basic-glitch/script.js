import * as UTILS from '../../globals';

const postprocessor = new WHS.PostProcessorModule();

window.world = new WHS.App(
  new WHS.BasicAppPreset({
    camera: {
      position: new THREE.Vector3(0, 10, 50)
    },

    rendering: {
      bgColor: 0x162129,

      renderer: {
        antialias: true,
        shadowmap: {
          type: THREE.PCFSoftShadowMap
        }
      }
    }
  })
    .extend([
      new PHYSICS.WorldModule({
        ammo: process.ammoPath
      }),
      postprocessor,
      new WHS.OrbitControlsModule()
    ])
    .autoresize()
    .get()
);

const sphere = new WHS.Sphere({ // Create sphere comonent.
  geometry: {
    radius: 5,
    widthSegments: 32,
    heightSegments: 32
  },

  modules: [
    new PHYSICS.SphereModule({
      mass: 10,
      restitution: 1
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh
  }),

  position: new THREE.Vector3(0, 20, 0)
});

sphere.addTo(world);

UTILS.addBoxPlane(world);
UTILS.addBasicLights(world);

world.start(); // Start animations and physics simulation.

const glitchPass = new POSTPROCESSING.GlitchPass();

postprocessor
  .render()
  .pass(glitchPass)
  .name('glitch')
  .renderToScreen(true);
