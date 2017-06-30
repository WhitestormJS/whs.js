import {Object3D} from 'three';
import {MeshComponent} from '../../core/MeshComponent';
import {Component} from '../../core/Component';

/**
 * @class Group
 * @category components/meshes
 * @description Sometimes you need to make groups of objects (it's not conveniently to apply transforms to each object when can make just one to a group).<br/>
 * In Three.js you make it using `THREE.Object3D` and it's children. <br/><br/>
 * In whs.js we have `Group`
 * @extends module:core.MeshComponent
 * @memberof module:components/meshes
 * @example <caption>Approach 2 - Adding objects to an empty group</caption>
 * const sphere = new Sphere();
 * const box = new Box();
 * const group = new Group();
 *
 * sphere.addTo(group);
 * box.addTo(group);
* @example <caption>Approach 2 - Making a group from objects</caption>
 * const sphere = new Sphere();
 * const box = new Box();
 * const group = new Group(box, sphere);
 * // OR: const group = new Group([box, sphere]);
 */
class Group extends MeshComponent {
  constructor(...objects) {
    super({});

    for (let i = 0; i < objects.length; i++) {
      const obj = objects[i];

      if (obj instanceof Component) obj.addTo(this);
      else if (obj instanceof Object3D) this.native.add(obj);
    }
  }

  build() {
    return new Object3D();
  }
}

export {
  Group
};
