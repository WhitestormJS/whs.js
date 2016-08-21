define(['whs'], function(WHS) {
  describe('Light', () => {
    const world = new WHS.World({init: {renderer: false}});

    function describeAttribute(shape, name, dims, Value) {
      describe('.' + name, done => {
        it('Method', () => shape[name].set(1, 1, 1));

        it('Setter', () => {
          shape[name] = new Value(...(new Array(dims.length).fill(2)));
        });

        it('Poperties', () => {
          for (let i = 0; i < dims.length; i++)
            shape[name][dims.charAt(i)] = 3;
        });

        it('=== Values are equals ===', () => shape.position === shape.getNative().position);
      });
    }

    function testAPI(shape) {
      it('#wrapShadow()', () => shape.wrapShadow());
      it('#wrap()', () => shape.wrap());
      it('#wrap() - \'no-shadows\'', () => shape.wrap('no-shadows'));
      it('#wrap() - \'no-transforms\'', () => shape.wrap('no-transforms'));
      it('#addTo()', () => shape.addTo(world));
      it('#clone()', () => shape.clone());
      it('#copy()', () => shape.copy(new WHS.Shape()));
      it('#getWorld()', () => shape.getWorld());
      it('#getParent()', () => shape.getParent());

      describeAttribute(shape, 'position', 'xyz', THREE.Vector3);
      describeAttribute(shape, 'rotation', 'xyz', THREE.Euler);
      describeAttribute(shape, 'quaternion', 'xyzw', THREE.Quaternion);
      describeAttribute(shape, 'target', 'xyz', THREE.Quaternion);

      it('API: M_', () => {
        shape.M_({ color: 0xffffff });
        shape.M_color = 0xffffff;
        shape.M_({ kind: 'phong', color: 0xffffff });
      });

      it('#hide(), #show()', () => {
        shape.hide();
        shape.show();
      });
    }

    context('Should wrap three.js lights', () => {
      const light = new THREE.Light();
      const shape = new WHS.Shape(light);

      testAPI(shape);
    });

    context('Should work with classes like WHS.Box', () => {
      const shape = new WHS.Box({
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

      testAPI(shape);
    });

    context('Should work with softbodies.', () => {
      const shape = new WHS.Sphere({
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

      testAPI(shape);
    });
  });
});
