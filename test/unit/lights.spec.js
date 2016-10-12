define(['whs'], function(WHS) {
  const lights = [
    'AmbientLight',
    'DirectionalLight',
    'HemisphereLight',
    'PointLight',
    'SpotLight'
  ];

  describe('Meshes', () => {
    const world = new WHS.World({init: {rendering: false}});

    context('Automatic mesh test. (Used only for meshes that don\'t rely on specific files', () => {
      for (let i = 0, max = lights.length; i < max; i++) {
        const lightName = lights[i];

        it(lightName, () => {
          new WHS[lightName]();
        });
      }
    });
  });
});
