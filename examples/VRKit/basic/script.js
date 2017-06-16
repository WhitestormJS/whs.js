import * as UTILS from '../../globals';

const postprocessor = new WHS.PostProcessorModule();

const world = new WHS.App([
  new WHS.ElementModule(),
  new WHS.SceneModule(),
  new WHS.CameraModule(UTILS.appDefaults.camera),
  new WHS.RenderingModule(UTILS.appDefaults.rendering, {
    shadow: true
  }),
  new PHYSICS.WorldModule(UTILS.appDefaults.physics),
  new WHS.OrbitControlsModule(),
  new WHS.ResizeModule(),
  new StatsModule(),
  new VRKit.VRModule(),
  // postprocessor
  // new WHS.RenderingModule()
  //,
]);

// postprocessor.render();

// postprocessor
//   .render()
//   // .shader(
//   //   new THREE.ShaderMaterial({
//   //     vertexShader: `
//   //       varying vec2 vUv;
//   //
//   //       void main() {
//   //         vUv = uv;
//   //
//   //         gl_Position = projectionMatrix *
//   //                   modelViewMatrix *
//   //                   vec4(position,1.0);
//   //       }
//   //     `,
//   //
//   //     fragmentShader: `
//   //       varying vec2 vUv;
//   //       uniform sampler2D readBuffer;
//   //
//   //       void main() {
//   //         vec4 diffuse = texture2D(readBuffer, vUv);
//   //
//   //         diffuse.xy *= vUv;
//   //
//   //         gl_FragColor = diffuse;
//   //       }
//   //     `
//   //   })
//   // )
//   // .name('MyShader')
//   .renderToScreen();

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

// ....

// postprocessor
