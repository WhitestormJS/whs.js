define(['whs'], function(WHS) {
  const path_assets = '/base/test/_assets/';

  describe('Utils', () => {
    const world = new WHS.World({init: {renderer: false}});

    context('#extend()', () => {
      it('Basic', () => {
        const result = WHS.extend({
          a: 1,
          b: 2,
          c: 3
        },
        {
          d: 4
        });

        return result === {
          a: 1,
          b: 2,
          c: 3,
          d: 4
        };
      });

      it('Deep', () => {
        const result = WHS.extend({
          a: 1,
          b: 2,
          c: 3,
          d: {
            e: 4
          }
        },
        {
          d: {
            e: 5,
            f: 6
          }
        });

        return result === {
          a: 1,
          b: 2,
          c: 3,
          d: {
            e: 4,
            f: 6
          }
        };
      });
    });

    context('#texture()', () => {
      it('create a texture', () => {
        WHS.texture(path_assets + 'textures/box.jpg');
      });

      it('usage with offset and repeat', () => {
        WHS.texture(path_assets + 'textures/box.jpg', {
          repeat: {
            x: 2,
            y: 3
          },

          offset: {
            x: 1,
            y: 2
          }
        });
      });
    });

    context('#loadMaterial()', () => {
      it('pass through if THREE.Material', () => {
        WHS.loadMaterial(new THREE.MeshBasicMaterial());
      });

      it('Generates a material', () => {
        WHS.loadMaterial({
          kind: 'basic',
          color: 0xffffff
        });
      });
    });
  });
});
