export class DefineModule {
  constructor(...data) {
    this.data = data;
  }

  setup(app, {manager, ...other}) {
    this.data.forEach(data => {
      Object.assign(manager, typeof data === 'function' ? data(manager, other) : data);
    });
  }
}
