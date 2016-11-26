define(['whs'], (WHS) => {
  describe('[WHS.Camera]', () => {
    const world = new WHS.World({plugins: {rendering: false}});

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

        it('@equal (camera.position) and (camera.native.position)',
          () => component.position === component.native.position);
      });
    }

    function testAPI(camera) {
      describe('#wrap()', () => {
        it('should wrap component`s params', () => camera.wrap());
      });

      describe('#addTo()', () => {
        it('should add component to the world', () => camera.addTo(world));
      });

      describe('#clone()', () => {
        it('should clone component', () => camera.clone());
      });

      describe('#copy()', () => {
        it('should copy specified component to existing one', () => camera.copy(new WHS.Component()));
      });

      it('@returns .parent', () => camera.parent);

      describeAttribute(camera, 'position', 'xyz', THREE.Vector3);
      describeAttribute(camera, 'rotation', 'xyz', THREE.Euler);
      describeAttribute(camera, 'quaternion', 'xyzw', THREE.Quaternion);
    }

    context('Should also work with Three.js cameras [...THREE.Camera]', () => {
      testAPI(new WHS.Element(new THREE.Camera(), [WHS.CameraComponent]));
    });
  });
});
