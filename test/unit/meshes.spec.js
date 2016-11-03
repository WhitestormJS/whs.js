define(['whs'], (WHS) => {
  const assetsPath = '/base/test/_assets/';

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

  describe('Meshes', () => {
    const world = new WHS.World({init: {rendering: false}});

    context('Automatic mesh test. (Used only for meshes that don\'t rely on specific files', () => {
      for (let i = 0, max = shapes.length; i < max; i++) {
        const meshName = shapes[i];

        context(meshName, () => {
          let component;

          it('Create', () => {
            component = new WHS[meshName]();
          });

          it('#addTo', () => component.addTo(world));
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
