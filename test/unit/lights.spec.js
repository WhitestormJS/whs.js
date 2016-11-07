define(['whs'], (WHS) => {
  const world = new WHS.World({init: {rendering: false}});

  const lights = [
    'AmbientLight',
    'DirectionalLight',
    'HemisphereLight',
    'PointLight',
    'SpotLight'
  ];

  function describeAttribute(component, name, dims, Type) {
    describe(`@test .${name}`, () => {
      describe('#set()', () => {
        it('should set new values', () => component[name].set(1, 1, 1));
      });

      it(`@set .${name}`, () => {
        component[name] = new Type(...(new Array(dims.length).fill(2)));
        return component[name];
      });

      describe('@test properties', () => {
        for (let i = 0; i < dims.length; i++) {
          it(`@set .${dims.charAt(i)}`, () => {
            component[name][dims.charAt(i)] = 3;
            return component[name][dims.charAt(i)];
          });
        }
      });

      it('@equal (light.position) and (light.native.position)',
        () => component.position === component.native.position);
    });
  }

  function testAPI(light) {
    describe('#wrap()', () => {
      it('should wrap component`s params', () => light.wrap());
    });

    describe('#addTo()', () => {
      it('should add component to the world', () => light.addTo(world));
    });

    describe('#clone()', () => {
      it('should clone component', () => light.clone());
    });

    describe('#copy()', () => {
      it('should copy specified component to existing one', () => light.copy(new WHS.Component()));
    });

    describeAttribute(light, 'position', 'xyz', THREE.Vector3);
    describeAttribute(light, 'rotation', 'xyz', THREE.Euler);
    describeAttribute(light, 'quaternion', 'xyzw', THREE.Quaternion);
  }

  describe('Meshes', () => {
    const world = new WHS.World({init: {rendering: false}});

    context('Automatic lights test. (Used only for lights that don\'t rely on specific files', () => {
      for (let i = 0, max = lights.length; i < max; i++) {
        const lightName = lights[i];

        describe(lightName, () => {
          testAPI(new WHS[lightName]());
        });
      }
    });
  });
});
