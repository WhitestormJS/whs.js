define(['whs'], function(WHS) {
  describe('MeshComponent', () => {
    const world = new WHS.World({init: {rendering: false}});

    function describeAttribute(mesh, name, dims, Value) {
      describe('.' + name, done => {
        it('Method', () => mesh[name].set(1, 1, 1));

        it('Setter', () => {
          mesh[name] = new Value(...(new Array(dims.length).fill(2)));
        });

        it('Poperties', () => {
          for (let i = 0; i < dims.length; i++)
            mesh[name][dims.charAt(i)] = 3;
        });

        it('=== Values are equal ===', () => mesh.position === mesh.native.position);
      });
    }

    function testAPI(mesh) {
      it('#wrap()', () => mesh.wrap());
      it('#addTo()', () => mesh.addTo(world));
      it('#clone()', () => mesh.clone());
      it('#copy()', () => mesh.copy(new WHS.Component()));

      describeAttribute(mesh, 'position', 'xyz', THREE.Vector3);
      describeAttribute(mesh, 'rotation', 'xyz', THREE.Euler);
      describeAttribute(mesh, 'quaternion', 'xyzw', THREE.Quaternion);
      describeAttribute(mesh, 'scale', 'xyz', THREE.Vector3);

      it('API: M_', () => {
        mesh.M_({ kind: 'phong', color: 0xffffff });
      });

      it('#hide(), #show()', () => {
        mesh.hide();
        mesh.show();
      });
    }

    context('Should wrap three.js meshes', () => {
      const meshThree = new THREE.Mesh(new THREE.Geometry(), new THREE.Material());
      const mesh = WHS.MeshComponent(new WHS.Component(meshThree));

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
