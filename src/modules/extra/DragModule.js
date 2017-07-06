import {Vector3} from 'three';

class MeshDragModule {
  constructor(mouse) {
    this.mouse = mouse;
    this.offset = new Vector3();
  }

  postIntegrate(self) {
    this.defer(() => {
      const {mouse, offset} = self;
      mouse.track(this);

      offset.copy(this.position);

      let dragPossible = false;

      this.on('mousedown', () => {
        dragPossible = true;
        offset.copy(this.position.clone().sub(mouse.project()));
      });

      mouse.on('mouseup', () => {dragPossible = false});

      mouse.on('move', () => {
        if (dragPossible) this.position.copy(mouse.project().add(offset));
      });
    });
  }
}

export default class DragModule {
  constructor() {
    this.mouse = null;
  }

  manager(manager) {
    manager.define('drag');
    this.mouse = manager.use('mouse');
  }

  mesh() {
    return new MeshDragModule(this.mouse);
  }
}
