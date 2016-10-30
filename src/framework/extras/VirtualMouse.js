import Events from 'minivents';
import {getWorld} from '../core/Component';

export class VirtualMouse extends Events {
  mouse = new THREE.Vector2();
  raycaster = new THREE.Raycaster();
  world = null;
  projectionPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

  constructor(world) {
    super();

    world.mouse = this;
    this.world = world;
    window.addEventListener('mousemove', this.update.bind(this));
    window.addEventListener('click', () => this.emit('click'));
  }

  update(e) {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    this.projectionPlane.normal.copy(this.world.camera.native.getWorldDirection());

    this.raycaster.setFromCamera(this.mouse, this.world.camera.native);
    this.emit('move');
  }

  track(component) {
    let isHovered = false;

    this.on('move', () => {
      if (this.hovers(component)) {
        if (!isHovered) {
          component.emit('mouseover');
          isHovered = true;
        } else component.emit('mousemove');
      } else if (isHovered) {
        component.emit('mouseout');
        isHovered = false;
      }
    });

    this.on('click', () => {
      if (isHovered) component.emit('click');
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
