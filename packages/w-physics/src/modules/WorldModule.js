import CMD from '../engines/commands';

export class WorldModule {
  constructor(options) {
    this.engine = options.engine;
    this.bodies = {};
    this.bodyIndex = 0;
    this.simulate = false;
  }

  setup(app, {manager}) {
    manager.simulateLoop = app.loop(() => {
      if (!this.simulate) return;
      this.engine.requestUpdate();
    });

    this.engine.listen(({data}) => {
      switch (data[0] || data.cmd) {
        case CMD.FEEDBACK_INITIALIZE:
          this.simulate = true;
          break;
        case CMD.FEEDBACK_RIGIDBODY:
          const physics = this.bodies[data.data.index];
          physics.active = true;
          break;
        case CMD.FEEDBACK_UPDATE:
          this.processUpdateFeedback(data);
          break;
        default:

      }
    })
  }

  processUpdateFeedback(array) {
    const bodies = this.bodies;
    let numbodies = this.bodyIndex;

    while(numbodies--) {
      const offset = 1 + numbodies * 7;
      const body = bodies[numbodies].component.native;

      body.position.x = array[offset];
      body.position.y = array[offset + 1];
      body.position.z = array[offset + 2];

      body.quaternion.x = array[offset + 3];
      body.quaternion.y = array[offset + 4];
      body.quaternion.z = array[offset + 5];
      body.quaternion.w = array[offset + 6];
    }
  }

  bridges = {
    child: (component) => {
      if (component.manager && 'createPhysics' in component.manager) {
        const index = this.bodyIndex++;
        const physics = component.manager.createPhysics(this, index);
        this.bodies[index] = physics;
        this.engine.send(CMD.CREATE_RIGIDBODY, physics.data);
      }

      return component;
    }
  }
}
