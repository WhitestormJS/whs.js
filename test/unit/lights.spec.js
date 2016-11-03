define(['whs'], (WHS) => {
  const lights = [
    'AmbientLight',
    'DirectionalLight',
    'HemisphereLight',
    'PointLight',
    'SpotLight'
  ];

  describe('Meshes', () => {
    const world = new WHS.World({init: {rendering: false}});

    context('Automatic lights test. (Used only for lights that don\'t rely on specific files', () => {
      for (let i = 0, max = lights.length; i < max; i++) {
        const lightName = lights[i];

        context(lightName, () => {
          let component;

          it('Create', () => {
            component = new WHS[lightName]();
          });

          it('#addTo', () => component.addTo(world));
        });
      }
    });
  });
});
