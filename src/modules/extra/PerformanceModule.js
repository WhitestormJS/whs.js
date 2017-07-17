import fps from 'fps';
import Events from 'minivents';

export default class PerformanceModule extends Events {
  constructor(config, iterationStart = 60, framesToUpdate = 60, blockTimeout = 0) {
    super();

    this.config = config;
    this.enabled = {};
    this.iterationStart = iterationStart;
    this.framesToUpdate = framesToUpdate;
    this.blockTimeout = blockTimeout;
    this.iteration = 0;
    this.avgRate = 60;
    this.block = false;

    for (const key in config)
      if (config[key]) this.enabled[key] = true;

    this.ticker = fps();
    this.rate = 60;
  }

  manager(manager) {
    manager.define('performance');
    const {ticker, config} = this;

    this.app = manager.handler;

    this.loop = new WHS.Loop(() => {
      ticker.tick();
      this.rate = ticker.rate;

      this.avgRate = (this.iteration * this.avgRate + this.rate) / (this.iteration + 1);

      if (this.iteration % this.framesToUpdate === 0 && this.iteration > this.iterationStart && !this.block) {
        for (const key in config) {
          if (config[key]) {
            const erate = config[key];

            this.enable(key);

            if (this.enabled[key] && erate > this.avgRate) {
              this.disable(key);
              this.block = true;
              this.iteration = 1;
              this.avgRate = 60;

              setTimeout(() => {
                this.block = false;
              }, this.blockTimeout);

              delete config[key];
            }

            break;
          }
        }
      }

      this.iteration++;
    });
  }

  start() {
    this.loop.start(this.app);
  }

  disable(key) {
    this.enabled[key] = false;
    this.emit(key, false);
  }

  enable(key) {
    this.enabled[key] = true;
    this.emit(key, true);
  }
}
