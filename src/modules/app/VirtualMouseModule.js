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

  /**
   * @method track
   * @description Starts tracking events on a component
   * @param {Component} component A component, that should be tracked by the mouse
   * @param {Boolean} nested Whether component's children should be tracked or not
   * @memberof module:modules/app.VirtualMouseModule
   */
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

  /**
   * @method intersection
   * @description Returns an intersection data
   * @param {Component} component A component that intersects with mouse ray (or doesn't)
   * @param {Boolean} nested Whether component's children should be tracked or not
   * @return {Array} intersection data.
   * @memberof module:modules/app.VirtualMouseModule
   */
  intersection({native}, nested = true) {
    if (native.children.length > 0 && nested) {
      const objects = [];
      native.traverse(child => objects.push(child));

      return this.raycaster.intersectObjects(objects);
    }

    return this.raycaster.intersectObject(native);
  }

  /**
   * @method project
   * @description Returns a vector based on mouse ray intersection with plane
   * @param {THREE.Plane} [plane=this.projectionPlane] Math plane that is used
   * @param {Vector3} [target] Optional target
   * @return {Vector3} An intersection point.
   * @memberof module:modules/app.VirtualMouseModule
   */
  project(plane = this.projectionPlane, target) {
    return this.raycaster.ray.intersectPlane(plane, target);
  }

  /**
   * @method hovers
   * @description Returns a boolean based on intersection data (Whether mouse hovers the component)
   * @param {Component} component A component that intersects with mouse ray (or doesn't)
   * @param {Boolean} nested Whether component's children should be tracked or not
   * @return {Boolean} Whether the component is hovered.
   * @memberof module:modules/app.VirtualMouseModule
   */
  hovers(component, nested = true) {
    return this.intersection(component, nested).length > 0;
  }

  /**
   * Mouse ray
   * @member {THREE.Ray} module:modules/app.VirtualMouseModule#ray
   * @public
   */
  get ray() {
    return this.raycaster.ray;
  }

  /**
   * Mouse x [-1; 1]
   * @member {Number} module:modules/app.VirtualMouseModule#x
   * @public
   */
  get x() {
    return this.mouse.x;
  }

  /**
   * Mouse y [-1; 1]
   * @member {Number} module:modules/app.VirtualMouseModule#y
   * @public
   */
  get y() {
    return this.mouse.y;
  }
}
