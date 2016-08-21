define(['whs', 'table'], function(WHS, Table) {
  let total = 0;
  let perfTime, cycleID = 1;
  let tableContent = [];

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
        init: {
          renderer: false
        },

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

      perfTime = performance.now();
    },
    onCycle: () => {
      const t = performance.now() - perfTime;

      if (total > 0) {
        tableContent.push({cycle: cycleID, obj: total, time: t, tpo: t / total, test: "Adding objects"});

        // RESET
        total = 0;
        perfTime = performance.now();
        cycleID++;
      }
    },
    onComplete: () => {
      const options = {
        skinny: true,
        intersectionCharacter: "x",
        columns: [
          {field: "cycle", name: "#"},
          {field: "obj", name: "Objects added"},
          {field: "time",  name: "Time (ms)"},
          {field: "tpo",  name: "Time per object (ms)"},
          {field: "test", name: "Test name"}
        ],
      };
       
      console.log('\n' + asciitable(options, tableContent));
    }
  });
});
