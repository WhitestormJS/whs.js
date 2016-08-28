define(['whs'], function(WHS) {
  const path_assets = '/base/test/_assets/';
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
    'Shape2D',
    'Sphere',
    'Tetrahedron',
    // 'Text',
    'Torus',
    'Torusknot',
    'Tube'
  ];

  describe('Meshes', () => {
    const world = new WHS.World({init: {renderer: false}});

    context('Automatic mesh test. (Used only for meshes that don\'t rely on specific files', () => {
      for (let i = 0, max = shapes.length; i < max; i++) {
        const shapeName = shapes[i];

        it(shapeName, () => {
          new WHS[shapeName]();
        });
      }
    });

    context('Non-automatic tests.', () => {
      it('Model', () => {
        new WHS.Model({
          geometry: {
            path: path_assets + 'models/teapot/utah-teapot-large.json',
            physics: path_assets + 'models/teapot/utah-teapot-light.json'
          },

          mass: 100,

          physics: {
            type: 'convex',
            friction: 1,
            restitution: 0
          }
        });
      });

      it('Morph', () => {
        new WHS.Morph({
          geometry: {
            width: 2,
            height: 2,
            depth: 2,
            path: path_assets + 'models/morph/parrot.js'
          },

          material: {
            useVertexColors: true,
            kind: 'lambert'
          },

          morph: {
            duration: 0.4,
            speed: 200
          }
        });
      });

      it('Text', () => {
        new WHS.Morph({
          geometry: {
            text: 'hello world!',
            parameters: {
              font: path_assets + 'models/fonts/helvetiker_regular.typeface.js'
            }
          }
        });
      });
    });
  });
});
