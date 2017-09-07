import * as UTILS from '../../globals';

WebVRConfig.FORCE_ENABLE_VR = true;
WebVRConfig.CARDBOARD_UI_DISABLED = true;

const app = new WHS.App([
  new WHS.ElementModule(),
  new WHS.SceneModule(),
  new WHS.DefineModule('camera', new WHS.PerspectiveCamera()),
  new WHS.RenderingModule(UTILS.appDefaults.rendering, {
    shadow: true
  }),
  new PHYSICS.WorldModule(UTILS.appDefaults.physics),
  // new WHS.OrbitControlsModule(),
  new WHS.ResizeModule(),
  new StatsModule(),
  new VRKit.VR2Module()
]);

const camera = app.get('camera');
const cameraWrap = new WHS.Group(camera);
cameraWrap.addTo(app);

cameraWrap.position.set(0, 5, 20);

const sphere = new WHS.Sphere({ // Create sphere comonent.
  geometry: {
    radius: 3,
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

  position: new THREE.Vector3(0, 20, 10)
});

sphere.addTo(app);

const cm = new VRKit.VRControls({
  object: camera,
  intensity: 10
});

app.module(cm);

UTILS.addBoxPlane(app);
UTILS.addBasicLights(app);

app.start();
