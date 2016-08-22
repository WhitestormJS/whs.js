define(['whs'], function(WHS) {
  describe('Camera', () => {
    const world = new WHS.World({init: {renderer: false}});

    function describeAttribute(camera, name, dims, Value) {
      describe('.' + name, done => {
        it('Method', () => camera[name].set(1, 1, 1));

        it('Setter', () => {
          camera[name] = new Value(...(new Array(dims.length).fill(2)));
        });

        it('Poperties', () => {
          for (let i = 0; i < dims.length; i++)
            camera[name][dims.charAt(i)] = 3;
        });

        it('=== Values are equal ===', () => camera.position === camera.getNative().position);
      });
    }

    function testAPI(camera) {
      it('#wrap()', () => camera.wrap());
      it('#addTo()', () => camera.addTo(world));
      it('#clone()', () => camera.clone());
      it('#copy()', () => camera.copy(new WHS.Light()));
      it('#getParent()', () => camera.getParent());

      describeAttribute(camera, 'position', 'xyz', THREE.Vector3);
      describeAttribute(camera, 'rotation', 'xyz', THREE.Euler);
      describeAttribute(camera, 'quaternion', 'xyzw', THREE.Quaternion);
    }

    context('Should wrap three.js cameras', () => {
      const camera = new WHS.Camera(new THREE.Camera());

      testAPI(camera);
    });
  });
});
