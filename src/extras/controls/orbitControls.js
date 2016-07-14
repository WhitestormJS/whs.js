import * as THREE from 'three';
import getOrbitControls from 'three-orbit-controls';

const ThreeOrbitControls = getOrbitControls(THREE);

export function orbitControls(object) {
  return function (world) {
    const controls = new ThreeOrbitControls(
      world.getCamera().getNative(),
      world.getRenderer().domElement
    );

    if (object && object.__whsobject) {
      const target = object ? object.mesh.position
        : new THREE.Vector3(0, 0, 0);

      controls.target = target;
    } else if (object instanceof THREE.Vector3)
      controls.target.copy(object);

    return controls;
  };
}
