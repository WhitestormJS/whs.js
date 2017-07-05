import * as UTILS from '../../globals';

const DatGUI = new DatGUIModule();

const app = new WHS.App([
  new WHS.ElementModule(),
  new WHS.SceneModule(),
  new WHS.DefineModule('camera', new WHS.PerspectiveCamera({
    position: {
      z: 20,
      y: 5
    }
  })),
  new WHS.RenderingModule(UTILS.appDefaults.rendering, {
    shadow: true
  }),
  new PHYSICS.WorldModule(UTILS.appDefaults.physics),
  new WHS.OrbitControlsModule(),
  new StatsModule(0),
  new WHS.ResizeModule(),
  DatGUI
]);

app.get('camera').applyModule(
  DatGUI.Camera({
    name: 'PerspectiveCamera'
  })
);

const sphere = new WHS.Sphere({
  material: new THREE.MeshLambertMaterial({color: 0xffffff}),

  modules: [
    new WHS.DynamicGeometryModule(),
    DatGUI.Mesh({
      name: 'Sphere',
      geometry: {
        radius: {
          range: [2, 100]
        }
      }
    }).materials({
      phong: new THREE.MeshPhongMaterial(),
      depth: new THREE.MeshDepthMaterial(),
      lambert: new THREE.MeshLambertMaterial(),
      basic: new THREE.MeshBasicMaterial()
    })
  ]
});

DatGUI.folder('main_folder').folder('child_folder').Custom([{
  name: 'myProp',
  value: 10,
  step: 10,
  range: [false, 100],
  onChange: v => {
    console.log(`myProp: ${v}`);
  }
}]);

new WHS.SpotLight({
  position: [10, 20, 10],

  distance: 200,
  intensity: 2,

  modules: [
    DatGUI.Light({
      name: 'SpotLight'
    })
  ]
}).addTo(app);

window.sp = sphere;

new WHS.Plane({
  geometry: [100, 100],
  material: new THREE.MeshLambertMaterial({color: 0xffffff}),
  position: [0, -10, 0],
  rotation: [-Math.PI / 2, 0, 0]
}).addTo(app);

sphere.addTo(app);

app.start();
