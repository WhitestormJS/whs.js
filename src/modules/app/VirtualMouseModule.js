import {
  Vector2,
  Raycaster,
  Plane,
  Vector3
} from 'three';

import Events from 'minivents';
import {EventsPatchModule} from './EventsPatchModule';

/**
 * @class VirtualMouseModule
 * @category modules/app
 * @param {Boolean} [globalMovement=false]
 * @memberof module:modules/app
 * @extends Events
 */
export class VirtualMouseModule extends Events {
  mouse = new Vector2();
  raycaster = new Raycaster();
  world = null;
  canvas = null;
  projectionPlane = new Plane(new Vector3(0, 0, 1), 0);

  constructor(globalMovement = false) {
    super();
    this.globalMovement = globalMovement;
  }

  update(e, customX, customY) {
    const rect = this.canvas.getBoundingClientRect();

    const x = customX || e.clientX;
    const y = customY || e.clientY;

    this.mouse.x = ((x - rect.left) / (rect.right - rect.left)) * 2 - 1;
    this.mouse.y = -((y - rect.top) / (rect.bottom - rect.top)) * 2 + 1;

    this.projectionPlane.normal.copy(this.camera.getWorldDirection());

    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.emit('move');
  }

  manager(manager) {
    manager.define('mouse');
    manager.require('events', () => new EventsPatchModule());

    this.canvas = manager.get('renderer').domElement;
    this.camera = manager.get('camera').native;
  }

  integrate(self) {
    [
      'click',
      'mousedown',
      'mouseup',
      'mousemove'
    ].forEach(ev => this.on(ev, e => self.emit(ev, e)));

    self.globalX = 0;
    self.globalY = 0;

    this.on('mousemove', e => {
      if (document.pointerLockElement !== null) {
        self.globalX += e.movementX;
        self.globalY += e.movementY;

        self.update(e, self.globalX, self.globalY);
      } else self.update(e);
    });
  }

  track(component, nested = true) {
    let isHovered = false;

    this.on('move', () => {
      if (this.hovers(component, nested)) {
        if (isHovered) component.emit('mousemove');
        else {
          component.emit('mouseover');
          isHovered = true;
        }
      } else if (isHovered) {
        component.emit('mouseout');
        isHovered = false;
      }
    });

    this.on('click', () => {
      if (isHovered) component.emit('click');
      else component.emit('offClick');
    });

    this.on('mousedown', () => {
      if (isHovered) component.emit('mousedown');
    });

    this.on('mouseup', () => {
      if (isHovered) component.emit('mouseup');
    });
  }

  intersection({native}, nested = true) {
    if (native.children.length > 0 && nested) {
      const objects = [];
      native.traverse(child => objects.push(child));

      return this.raycaster.intersectObjects(objects);
    }

    return this.raycaster.intersectObject(native);
  }

  project(plane = this.projectionPlane) {
    return this.raycaster.ray.intersectPlane(plane);
  }

  hovers(component, nested = true) {
    return this.intersection(component, nested).length > 0;
  }

  get ray() {
    return this.raycaster.ray;
  }

  get x() {
    return this.mouse.x;
  }

  get y() {
    return this.mouse.y;
  }
}
