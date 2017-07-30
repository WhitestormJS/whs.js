import * as UTILS from '../../globals';

const controlsModule = new WHS.OrbitControlsModule();

const app = new WHS.App([
  ...UTILS.appModules({
    position: new THREE.Vector3(0, 10, 200)
  }),

  controlsModule
]);

app.start();

const text = new WHS.Text({
  text: 'From whs',
  font: WHS.Text.load(`${process.assetsPath}/fonts/gentilis_bold.typeface.json`),

  geometry: {
    size: 20,
    height: 5,
    curveSegments: 6
  },

  material: new THREE.MeshBasicMaterial({
    color: 0xffffff
  }),

  position: [-150, 0, 0]
}).addTo(app);

(new THREE.FontLoader()).load(`${process.assetsPath}/fonts/gentilis_bold.typeface.json`, font => {
  const text2 = new WHS.Text({
    text: 'From three',
    font,

    geometry: {
      size: 20,
      height: 5,
      curveSegments: 6
    },

    material: new THREE.MeshBasicMaterial({
      color: 0xffffff
    }),

    position: [50, 0, 0]
  }).addTo(app);
});
