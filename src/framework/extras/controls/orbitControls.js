import * as THREE from 'three';
import getOrbitControls from 'three-orbit-controls';

const ThreeOrbitControls = getOrbitControls(THREE);

export function orbitControls(target) {
  return function (world) {
    const controls = new ThreeOrbitControls(
      world.camera.native,
      world.renderer.domElement
    );

    if (target)
      controls.target.copy(target instanceof THREE.Vector3 ? target : target.position);

    return controls;
  };
}
