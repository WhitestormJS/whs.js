define(['whs'], function(WHS) {
  describe('Shape', () => {
    const world = new WHS.World({init: {renderer: false}});

    context('Working with default values', () => {
      let result, expected;

      const object = new WHS.CoreObject({
        default1: 1,
        default2: 2,
        default3: 3,

        default4: {
          value: 4
        }
      });

      it('#setParams', () => {
        object.setParams({
          default5: 5
        });
      });

      expected = {
        default1: 1,
        default2: 2,
        default3: 3,

        default4: {
          value: 4
        },

        default5: 5
      };

      it('#getParams', () => {
        result = object.getParams();
      });

      it('=== Values are equal ===', () => result === expected);
    });
  });
});
