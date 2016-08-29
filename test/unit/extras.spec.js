define(['whs'], function(WHS) {
  describe('Extras', () => {
    const world = new WHS.World({init: {renderer: false}});

    context('Group', () => {
      const group = new WHS.Group();

      it('#addTo', () => {
        group.addTo(world);
      });

      it('Adding a shape', () => {
        const shape = new WHS.Shape(new THREE.Mesh());
        shape.addTo(group);
      });

      it('Shapes created at the beginning', () => {
        const shape = new WHS.Shape(new THREE.Mesh());
        const shape2 = shape.clone();

        new WHS.Group(shape, shape2);
      });
    });

    context('Line (rope)', () => {
      const rope = new WHS.Line({
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

      it('#addTo', () => {
        rope.addTo(world);
      });
    });
  });
});
