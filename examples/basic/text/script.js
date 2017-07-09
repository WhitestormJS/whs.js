import * as UTILS from '../../globals';

const controlsModule = new WHS.OrbitControlsModule();

const app = new WHS.App([
  ...UTILS.appModules({
    position: new THREE.Vector3(0, 10, 200)
  }),

  controlsModule
]);

const text = new WHS.Text({
  text: 'Gentilis Bold Text',

  parameters: {
      font: `${process.assetsPath}/fonts/gentilis_bold.typeface.json`,
      size: 20,
      height: 5,
      curveSegments: 6
  },

  material: new THREE.MeshBasicMaterial({
    color: 0xffffff
  }),

  position: [-100, 0, 0]
}).addTo(app);

app.start();
