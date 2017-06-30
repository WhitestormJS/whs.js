import Events from 'minivents';

export class LoaderModule extends Events {
  constructor(...expecting) {
    super();

    this.promises = {};

    this.expecting = expecting;
    this.resolved = [];
  }

  expect(key) {
    this.expecting.push(key);
  }

  resolve(key) {
    if (this.expecting.includes(key)) {
      this.expecting = this.expecting.filter(item => item !== key);
      this.resolved.push(key);
    }

    this.emit('step', key);

    if (this.getProgress() === 1) {
      this.emit('complete');
    }

    return this;
  }

  promise(key, promise) {
    promise.then(() => this.resolve(key));

    this.promises[key] = promise;
    this.expect(key);

    return promise;
  }

  getProgress() {
    const el = this.expecting.length;
    const rl = this.resolved.length;

    return rl / (el + rl);
  }
}
