import * as UTILS from '../../globals';

const app = new WHS.App([
  ...UTILS.appModules()
]);

const sphere = new WHS.Cylinder({ // Create sphere comonent.
  geometry: {
    radiusTop: 1,
    radiusBottom: 1,
    height: 2,
    radiusSegments: 32,
    heightSegments: 32,
  },

  modules: [
    new PHYSICS.CylinderModule({
      mass: 2,
      restitution: 1
    })
  ],

  material: new THREE.MeshPhongMaterial({
    color: UTILS.$colors.mesh
  }),

  position: new THREE.Vector3(0, 20, 0)
});

sphere.addTo(app);

UTILS.addBoxPlane(app);
UTILS.addBasicLights(app);

app.start(); // Start animations and physics simulation.
