define(['whs'], function(WHS) {
  describe('Cameras', () => {
    const world = new WHS.World({init: {renderer: false}});

    context('Non-automatic tests.', () => {
      it('PerspectiveCamera', () => {
        new WHS.PerspectiveCamera({
          camera: {
            fov: 45,
            aspect: 1 / 2,
            near: 1,
            far: 1000
          }
        });
      });

      it('OrtographicCamera', () => {
        new WHS.OrtographicCamera({
          camera: {
            left: -100,
            top: 100,
            right: 100,
            bottom: -100,
            near: 1,
            far: 1000
          }
        });
      });

      it('CubeCamera', () => {
        new WHS.CubeCamera({
          camera: {
            near: 1,
            far: 1000,
            cubeResolution: 1000
          }
        });
      });
    });
  });
});
