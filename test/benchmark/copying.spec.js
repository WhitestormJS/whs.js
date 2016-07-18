define(['whslight', 'table'], function (WHS) {
  let total = 0;

  suite('Cloning objects', () => {
    const cloningAmmount = 400;

    benchmark('clone spheres', () => {
      for (let i = 0; i < cloningAmmount; i++) {
        const obj = this.sphere.clone();
        obj.addTo(this.GAME);
        total++;

        return obj;
      }
    });
  }, {
    onStart: () => {
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
    onComplete: () => {
      const t = performance.now() - perfTime;

      var options = {
        skinny: true,
        intersectionCharacter: "x",
        columns: [
          {field: "obj", name: "Objects cloned"},
          {field: "time",  name: "Time (ms)"},
          {field: "tpo",  name: "Time per object (ms)"},
          {field: "test", name: "Test name"}
        ],
      };
       
      var table = asciitable(options, [
        {obj: total, time: t, tpo: t / total, test: "Copying"}
      ]);
       
      console.log('\n' + table);
    }
  });
});
