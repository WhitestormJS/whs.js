export class DefineModule {
  constructor(...data) {
    this.data = data;
  }

  setup(app, utils) {
    this.data.forEach(data => {
      Object.assign(utils.manager, typeof data === 'function' ? data(utils) : data);
    });
  }
}
