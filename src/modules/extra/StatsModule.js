import {Loop} from 'whs';
import Stats from 'stats.js';

export default class StatsModule {
  static codes = {
    fps: 0,
    ms: 1,
    mb: 2,
    custom: 3
  }

  constructor(code = 0) {
    this.stats = new Stats();
    this.stats.showPanel(code);
  }

  manager(manager) {
    manager.get('container').appendChild(this.stats.dom);
    manager.add('stats', this.stats, {alias: '$stats'});
  }

  integrate(self) {
    const stats = self.stats;

    const preProcess = new Loop(() => stats.begin());
    const postProcess = new Loop(() => stats.end());

    this.loops.unshift(preProcess);
    this.loops.push(postProcess);

    // Patch method
    self.addLoop = function (loop) {
      return new Promise(resolve => {
        if (this.loops[this.loops.length - 1] === postProcess) this.loops.pop();
        this.loops.push(loop);
        this.loops.push(postProcess);
        resolve(loop);
      });
    };

    preProcess.start();
    postProcess.start();
  }
}
