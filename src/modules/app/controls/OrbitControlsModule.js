import {Vector3} from 'three';
import {ControlsModule} from '../ControlsModule';

import {ThreeOrbitControls} from './lib/ThreeOrbitControls';

/**
 * @class OrbitControlsModule
 * @category modules/app
 * @param {Object} [params]
 * @param {Object} [params.object=camera] Object to which controls are applied.
 * @param {THREE.Vector3} [params.target=new Vector3()] Controls center vector.
 * @param {Boolean} [params.follow=false] Follow the target
 * @memberof module:modules/app
 * @example <caption> Creating a rendering module and passing it to App's modules</caption>
 * new App([
 *   new ElementModule(),
 *   new SceneModule(),
 *   new DefineModule('camera', new WHS.PerspectiveCamera({
 *     position: new THREE.Vector3(0, 6, 18),
 *     far: 10000
 *   })),
 *   new RenderingModule(),
 *   new OrbitControlsModule()
 * ]);
 */
export class OrbitControlsModule extends ControlsModule {
  constructor(params = {}) {
    super(params);

    this.params = Object.assign({
      follow: false,
      object: null,
      target: new Vector3()
    }, params);
  }

  manager(manager) {
    super.manager(manager);

    const {object: obj, follow, target} = this.params;
    const object = obj ? obj.native : manager.get('camera').native;

    const controls = new ThreeOrbitControls(
      object,
      manager.get('element'),
      manager.handler
    );

    const updateProcessor = follow ? c => {
      controls.update(c.getDelta());
      controls.target.copy(target);
    } : c => {
      controls.update(c.getDelta());
    };

    this.setControls(controls);
    this.setUpdate(updateProcessor);

    manager.update({
      camera: camera => {
        if (obj) return;
        controls.object = camera.native;
      },
      element: element => {
        controls.domElement = element;
      }
    });

    controls.target.copy(target);
  }
}
