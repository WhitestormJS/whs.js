import * as UTILS from '../../globals';

const mouse = new WHS.VirtualMouseModule();
const Dragging = new DragModule();

const app = new WHS.App([
  new WHS.ElementModule(),
  new WHS.SceneModule(),
  new WHS.DefineModule('camera', new WHS.PerspectiveCamera({
    position: new THREE.Vector3(0, 10, 50)
  })),
  new WHS.RenderingModule({
    bgColor: 0x162129,

    renderer: {
      antialias: true,
      shadowmap: {
        type: THREE.PCFSoftShadowMap
      }
    }
  }),
  new PHYSICS.WorldModule({
    ammo: process.ammoPath
  }),
  // new WHS.OrbitControlsModule(),
  new WHS.ResizeModule(),
  mouse,
  Dragging
]);

const sphere = new WHS.Sphere({ // Create sphere component.
  geometry: {
    radius: 3,
    widthSegments: 32,
    heightSegments: 32
  },

  modules: [
    // new PHYSICS.SphereModule({
    //   mass: 10
    // }),
    Dragging.mesh()
  ],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh
  }),

  position: [0, 3, 0]
});

sphere.addTo(app);
mouse.track(sphere);

// sphere.on('mouseover', () => {
//   sphere.material.color.set(0xffff00);
//   console.log('mouseover');
// });
//
// sphere.on('mousemove', () => {
//   console.log('mousemove');
// });
//
// sphere.on('mouseout', () => {
//   sphere.material.color.set(UTILS.$colors.mesh);
//   console.log('mouseout');
// });
//
// sphere.on('click', () => {
//   alert('click!');
// });

UTILS.addPlane(app);
UTILS.addBasicLights(app);

app.start(); // Start animations and physics simulation.
