define(['whitestormjs'], function (WHS) {
  suite('Array iteration', () => {
    benchmark('_.each', () => {
      this.list.forEach((number) => {
        return number;
      });
    });

    benchmark('native forEach', () => {
      this.list.forEach((number) => {
        return number;
      });
    });
  }, {
    onCycle: (event) => {
      const suite = this;
      const benchmark = event.target;
      console.log(`Cycle completed for ${suite.name} : ${benchmark.name}`);
    },
    setup: () => {
      this.list = [5, 4, 3];
    },
    teardown: () => {
      this.list = null;
    }
  });
});
