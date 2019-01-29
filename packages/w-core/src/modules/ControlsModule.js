export class ControlsModule {
  constructor(controlsSetup) {
    this.controlsSetup = controlsSetup;
  }

  setup(app, {manager}) {
    manager.controls = this.controlsSetup(manager);

    manager.controlsLoop = app.loop(() => {
      manager.controls.update();
    });
  }
}
