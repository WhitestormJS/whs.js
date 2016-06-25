define(['whslight'], function (WHS) {
  suite('Cloning objects', () => {
    const cloningAmmount = 400;

    benchmark('clone spheres', () => {
      for (let i = 0; i < cloningAmmount; i++) {
        const obj = this.sphere.clone();
        obj.addTo(this.GAME);
        this.clonedObjects++;

        return obj;
      }
    });
  }, {
    onStart: () => {
      this.clonedObjects = 0;

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
          kind: 'phong'
        }
      });

      this.perfTime = performance.now();
    },
    teardown: () => {
      const t = performance.now() - perfTime;
      this.additional = [
        {
          field: 'Objects cloned',
          value: window.clonedObjects
        },
        {
          field: ' :: Time',
          value: t + 'ms.'
        },
        {
          field: ' :: Time per object',
          value: t / window.clonedObjects + 'ms.'
        }
      ];
    }
  });
});
