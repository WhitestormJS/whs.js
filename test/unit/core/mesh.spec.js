define(['whs'], (WHS) => {
  describe('[WHS.MeshComponent]', () => {
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

        it('@equal (mesh.position) and (mesh.native.position)',
          () => component.position === component.native.position);
      });
    }

    function testAPI(mesh) {
      describe('#wrap()', () => {
        it('should wrap component`s params', () => mesh.wrap());
      });

      describe('#addTo()', () => {
        it('should add component to the world', () => mesh.addTo(world));
      });

      describe('#clone()', () => {
        it('should clone component', () => mesh.clone());
      });

      describe('#copy()', () => {
        it('should copy specified component to existing one', () => mesh.copy(new WHS.Component()));
      });

      describeAttribute(mesh, 'position', 'xyz', THREE.Vector3);
      describeAttribute(mesh, 'rotation', 'xyz', THREE.Euler);
      describeAttribute(mesh, 'quaternion', 'xyzw', THREE.Quaternion);
      describeAttribute(mesh, 'scale', 'xyz', THREE.Vector3);

      // it('API: m_', () => {
      //   mesh.m_({ kind: 'phong', color: 0xffffff });
      // });

      describe('#hide()', () => {
        mesh.hide();
        it('should make object invisible', () => mesh.native.visible === false);
      });

      describe('#show()', () => {
        mesh.show();
        it('should make object visible', () => mesh.native.visible === false);
      });
    }

    context('Should wrap three.js meshes', () => {
      const meshThree = new THREE.Mesh(new THREE.Geometry(), new THREE.Material());
      const mesh = new WHS.Element(meshThree, [WHS.MeshComponent]);

      testAPI(mesh);
    });

    context('Should work with classes like WHS.Box', () => {
      const mesh = new WHS.Box({
        geometry: {
          width: 2,
          height: 2,
          depth: 2
        },

        material: {
          kind: 'lambert',
          color: 0xff0000 // Red.
        },

        pos: [2, 4, 5],

        rot: {
          x: Math.PI / 4
        }
      });

      testAPI(mesh);
    });

    context('Should work with softbodies.', () => {
      const mesh = new WHS.Sphere({
        geometry: {
          radius: 3
        },

        softbody: true,

        material: {
          kind: 'lambert',
          color: 0xff0000 // Red.
        },

        pos: {
          x: 2,
          y: 4,
          z: 5
        },

        rot: {
          x: Math.PI / 4
        }
      });

      testAPI(mesh);
    });
  });
});
