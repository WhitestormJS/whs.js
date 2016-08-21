define(['whs', 'table'], function (WHS) {
  let total = 0;
  let perfTime, cycleID = 1;
  let tableContent = [];

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
          kind: 'phong'
        }
      });

      perfTime = performance.now();
    },
    onCycle: () => {
      const t = performance.now() - perfTime;

      if (total > 0) {
        tableContent.push({cycle: cycleID, obj: total, time: t, tpo: t / total, test: "Cloning objects"});

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
          {field: "obj", name: "Objects cloned"},
          {field: "time",  name: "Time (ms)"},
          {field: "tpo",  name: "Time per object (ms)"},
          {field: "test", name: "Test name"}
        ],
      };
       
      console.log('\n' + asciitable(options, tableContent));
    }
  });
});
