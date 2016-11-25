define(['whs'], (WHS) => {
  describe('[WHS.World]', () => {
    // WHS.Work class works properly.
    it('Basic world', () => new WHS.World({plugins: {rendering: false}}));

    // It's custom settings also works.
    it('World with custom settings', () => new WHS.World({
      plugins: {
        rendering: false
      },

      stats: 'fps',
      autoresize: true,
      softbody: true,

      shadowmap: {
        enabled: false
      },

      helpers: {
        grid: {},
        axis: {}
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

        position: [5, 3, 8]
      },

      resolution: {
        width: 2,
        height: 2
      },

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

      rendering: {
        renderer: {
          alpha: true
        },

        background: {
          color: 0x00ff00,
          opacity: 0.5
        }
      }
    }));
  });
});
