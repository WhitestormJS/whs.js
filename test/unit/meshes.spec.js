define(['whs'], (WHS) => {
  const assetsPath = '/base/test/_assets/';
  const world = new WHS.World({modules: {rendering: false}});

  const shapes = [
    'Box',
    'Cylinder',
    'Dodecahedron',
    'Extrude',
    'Icosahedron',
    'Lathe',
    // 'Model',
    // 'Morph',
    'Octahedron',
    'Parametric',
    'Plane',
    'Polyhedron',
    'Ring',
    'Shape',
    'Sphere',
    'Tetrahedron',
    // 'Text',
    'Torus',
    'Torusknot',
    'Tube'
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

  describe('Meshes', () => {
    const world = new WHS.World({modules: {rendering: false}});

    context('Automatic mesh test. (Used only for meshes that don\'t rely on specific files', () => {
      for (let i = 0, max = shapes.length; i < max; i++) {
        const meshName = shapes[i];

        context(meshName, () => {
          testAPI(new WHS[meshName]());
        });
      }
    });

    context('Non-automatic tests.', () => {
      it('Model', () => {
        new WHS.Model({
          geometry: {
            path: `${assetsPath}models/teapot/utah-teapot-large.json`,
            physics: `${assetsPath}models/teapot/utah-teapot-light.json`
          },

          mass: 100,

          physics: {
            type: 'convex',
            friction: 1,
            restitution: 0
          }
        }).addTo(world);
      });

      it('Morph', () => {
        new WHS.Morph({
          geometry: {
            width: 2,
            height: 2,
            depth: 2,
            path: `${assetsPath}models/morph/parrot.js`
          },

          material: {
            useVertexColors: true,
            kind: 'lambert'
          },

          morph: {
            duration: 0.4,
            speed: 200
          }
        }).addTo(world);
      });

      it('Text', () => {
        new WHS.Morph({
          geometry: {
            text: 'hello world!',
            parameters: {
              font: `${assetsPath}models/fonts/helvetiker_regular.typeface.js`
            }
          }
        }).addTo(world);
      });

      it('Line (rope)', () => {
        new WHS.Line({
          geometry: {
            curve: new THREE.LineCurve3(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 5, 0))
          },

          physics: {
            piterations: 10,
            viterations: 10
          },

          mass: 1,

          softbody: true
        });
      });
    });
  });
});
