const app = new WHS.App(
  new WHS.BasicAppPreset({
    camera: {
      position: {
        z: 20,
        y: 5
      }
    }
  })
  .extend([
    new WHS.controls.OrbitModule(),
    new StatsModule(0)
  ])
  .get()
);

const sphere = new WHS.Sphere({
  material: new THREE.MeshBasicMaterial({color: 0xffffff}),
  modules: [
    new WHS.mesh.DynamicGeometryModule(),
    new DatGUIModule({
      name: 'MySphere',
      material: true,
      geometry: true,
      tryMaterial: [
        THREE.MeshBasicMaterial,
        THREE.MeshLambertMaterial,
        THREE.MeshPhongMaterial
      ],
      custom: {
        hello: value => {
          console.log(value);
        }
      },
      defaults: {
        hello: 1
      },
      range: {
        hello: [0, 10]
      },
      step: {
        hello: 2
      }
    })
  ]
});

new WHS.SpotLight({
  position: [10, 10, 10]
}).addTo(app);

sphere.addTo(app);

app.start();
