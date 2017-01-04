import {
  Vector2,
  Raycaster,
  Plane,
  Vector3
} from 'three';

import Events from 'minivents';

export class VirtualMouse extends Events {
  mouse = new Vector2();
  raycaster = new Raycaster();
  world = null;
  canvas = null;
  projectionPlane = new Plane(new Vector3(0, 0, 1), 0);

  constructor(world, globalMovement = false) {
    super();

    world.mouse = this;
    this.manager = world;

    if (this.manager.get('renderer')) this.canvas = this.manager.get('renderer').domElement;

    const mouseMoveContainer = globalMovement ? window : this.manager.get('element');

    mouseMoveContainer.addEventListener('mousemove', this.update.bind(this));
    this.manager.get('element').addEventListener('click', () => this.emit('click'));
    this.manager.get('element').addEventListener('mousedown', () => this.emit('mousedown'));
    this.manager.get('element').addEventListener('mouseup', () => this.emit('mouseup'));
  }

  update(e) {
    const rect = this.canvas.getBoundingClientRect();

    this.mouse.x = ((e.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;

    this.projectionPlane.normal.copy(this.manager.get('camera').native.getWorldDirection());

    this.raycaster.setFromCamera(this.mouse, this.manager.get('camera').native);
    this.emit('move');
  }

  track(component) {
    let isHovered = false;

    this.on('move', () => {
      if (this.hovers(component)) {
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

  intersection(component) {
    return this.raycaster.intersectObject(component.native);
  }

  project(plane = this.projectionPlane) {
    return this.raycaster.ray.intersectPlane(plane);
  }

  hovers(component) {
    const intersection = this.intersection(component)[0];
    return intersection ? intersection.object === component.native : false;
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
