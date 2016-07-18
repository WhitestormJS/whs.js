define(['whslight', 'table'], function(WHS, Table) {
  let total = 0;

  suite("Add to world", () => {
    const objectAmount = 100;

    benchmark("add object", () => {
      for (let i = 0; i < objectAmount; i++) {
        this.sphere.addTo(this.GAME);
        total++;
        return this.sphere;
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
          kind: "phong"
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
          {field: "obj", name: "Objects added"},
          {field: "time",  name: "Time (ms)"},
          {field: "tpo",  name: "Time per object (ms)"},
          {field: "test", name: "Test name"}
        ],
      };
       
      var table = asciitable(options, [
        {obj: total, time: t, tpo: t / total, test: "Adding objects"}
      ]);
       
      console.log('\n' + table);
    }
  });
});
