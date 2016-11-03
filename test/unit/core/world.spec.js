define(['whs'], (WHS) => {
  describe('World', () => {
    // WHS.Work class works properly.
    it('Basic world', () => new WHS.World({init: {rendering: false}}));

    // It's custom settings also works.
    it('World with custom settings', () => new WHS.World({
      init: {
        rendering: false
      },

      stats: 'fps',
      autoresize: true,
      softbody: true,

      shadowmap: {
        enabled: false
      },

      helpers: {
        grid: true,
        axis: true
      },

      gravity: {
        x: 10,
        y: 20,
        z: 30
      },

      camera: {
        aspect: 80,
        near: 2,
        far: 40,

        x: 5,
        y: 3,
        z: 8
      },

      rWidth: 2,
      rHeight: 2,

      width: window.innerWidth * 2,
      height: window.innerHeight * 2,

      physics: {
        fixedTimeStep: 1 / 120,
        broadphase: {type: 'sweepprune'}
      },

      fog: {
        type: 'regular',

        density: 0.0025,
        hex: 0xff0000,
        near: 2,
        far: 500
      },

      background: {
        color: 0x00ff00,
        opacity: 0.5
      },

      renderer: {
        alpha: true
      }
    }));
  });
});
