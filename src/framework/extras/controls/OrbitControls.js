import * as THREE from 'three';
import getOrbitControls from 'three-orbit-controls';
import {Component} from '../../core/Component';

const ThreeOrbitControls = getOrbitControls(THREE);

export class OrbitControls extends Component {
  constructor(target) {
    super();
    this.target = target;
  }

  integrate(world) {
    const controls = new ThreeOrbitControls(
      world.camera.native,
      world.renderer.domElement
    );

    if (this.target)
      controls.target.copy(this.target instanceof THREE.Vector3 ? this.target : this.target.position);

    return controls;
  }
}
