define(['whs'], (WHS) => {
  describe('[WHS.Component]', () => {
    const world = new WHS.World({plugins: {rendering: false}});

    describe('Working with default values', () => {
      let result;

      const object = new WHS.Component({
        default1: 1,
        default2: 2,
        default3: 3,

        default4: {
          value: 4
        }
      });

      it('@set .params', () => {
        object.params = {default5: 5};
      });

      describe('#updateParams()', () => {
        object.updateParams({
          default5: 6
        });

        it('should updater parameters', () => object.params.default5 === 6);
      });

      const expected = {
        default1: 1,
        default2: 2,
        default3: 3,

        default4: {
          value: 4
        },

        default5: 6
      };

      it('@returns .params', () => {
        result = object.params;
        return result;
      });

      it('@equal (result) and (expected) values', () => result === expected);

      describe('#addTo()', () => {
        it('should not be added to the world if no native', done => {
          object.addTo(world).catch(() => done());
        });
      });
    });
  });
});
