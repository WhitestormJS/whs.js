define(['whs'], function(WHS) {
  describe('Shape', () => {
    const world = new WHS.World({init: {renderer: false}});

    context('Working with default values', () => {
      let result, expected;

      const object = new WHS.Component({
        default1: 1,
        default2: 2,
        default3: 3,

        default4: {
          value: 4
        }
      });

      it('#setParams', () => {
        object.params = {
          default5: 5
        }
      });

      it('#updateParams', () => {
        object.params = {
          default5: 6
        };
      });

      expected = {
        default1: 1,
        default2: 2,
        default3: 3,

        default4: {
          value: 4
        },

        default5: 6
      };

      it('#getParams', () => {
        result = object.params;
      });

      it('=== Values are equal ===', () => result === expected);
    });
  });
});
