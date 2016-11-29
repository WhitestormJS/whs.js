define(['whs'], (WHS) => {
  describe('[WHS.LightComponent]', () => {
    const world = new WHS.World({modules: {rendering: false}});

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

    context('Should work also with Three.js lights [...THREE.Light]', () => {
      const lightThree = new THREE.Light();
      const light = new WHS.Element(lightThree, [WHS.LightComponent]);

      testAPI(light);
    });

    context('Should work with WHS.DirectionalLight', () => {
      const light = new WHS.DirectionalLight({
        light: {
          color: 0xffffff,
          intensity: 2,
          distance: 300
        },

        position: {
          x: 2,
          y: 4,
          z: 6
        }
      });

      testAPI(light);
    });
  });
});
