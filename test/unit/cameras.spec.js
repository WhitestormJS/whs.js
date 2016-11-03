define(['whs'], (WHS) => {
  describe('Cameras', () => {
    const world = new WHS.World({init: {rendering: false}});

    context('PerspectiveCamera', () => {
      let component;

      it('Create', () => {
        component = new WHS.PerspectiveCamera({
          camera: {
            fov: 45,
            aspect: 1 / 2,
            near: 1,
            far: 1000
          }
        });
      });

      it('#addTo', () => component.addTo(world));
    });

    context('OrthographicCamera', () => {
      let component;

      it('Create', () => {
        component = new WHS.OrthographicCamera({
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

      it('#addTo', () => component.addTo(world));
    });

    context('CubeCamera', () => {
      let component;

      it('Create', () => {
        component = new WHS.CubeCamera({
          camera: {
            near: 1,
            far: 1000,
            cubeResolution: 1000
          }
        });
      });

      it('#addTo', () => component.addTo(world));
    });
  });
});
