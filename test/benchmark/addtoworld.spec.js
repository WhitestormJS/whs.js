'use strict';

define(["whslight"], function(WHS) {
  suite("Add to world", () => {
    const objectAmount = 100;

    benchmark("add object", () => {
      for (let i = 0; i < objectAmount; i++) {
        this.sphere.addTo(this.GAME);
        this.totalObjects++;
        return this.sphere;
      }
    });
  }, {
    onStart: () => {
      this.totalObjects = 0;

      this.GAME = new WHS.World({
        gravity: {
          x: 0,
          y: -100,
          z: 0
        }
      });

      this.sphere = new WHS.Sphere({
        geometry: {
          radius: 10
        },

        mass: 0,
        physics: false,

        material: {
          shading: THREE.FlatShading,
          kind: "phong"
        }
      });

      this.perfTime = performance.now();
    },
    teardown: () => {
      const t = performance.now() - perfTime;
      this.additional = [
        {
          field: "Objects added",
          value: window.totalObjects
        },
        {
          field: " :: Time",
          value: t + "ms"
        },
        {
          field: " :: Average time per object",
          value: t / window.totalObjects + "ms"
        }
      ];
    }
  });
});
