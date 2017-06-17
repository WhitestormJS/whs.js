import * as UTILS from '../../globals';

const postprocessor = new WHS.PostProcessorModule();

const app = new WHS.App([
  new WHS.ElementModule(),
  new WHS.SceneModule(),
  new WHS.CameraModule(UTILS.appDefaults.camera),
  new WHS.RenderingModule(UTILS.appDefaults.rendering, {
    shadow: true
  }),
  new PHYSICS.WorldModule(UTILS.appDefaults.physics),
  // new WHS.OrbitControlsModule(),
  new WHS.ResizeModule(),
  new StatsModule(),
  new VRKit.VRModule()
]);

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

sphere.addTo(app);

app.module(new VRKit.VRControls({
  object: app.manager.get('camera'),
  intensity: 10
}));

UTILS.addBoxPlane(app);
UTILS.addBasicLights(app);

app.start();
