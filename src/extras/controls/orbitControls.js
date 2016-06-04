import * as THREE from 'three';
import ThreeOrbitControls from 'three-orbit-controls';

export function OrbitControls(object) {
  const controls = new ThreeOrbitControls(
    this.getCamera().getNative(),
    this.getRenderer().domElement
  );

  if (object && object.__whsobject) {
    const target = object ? object.mesh.position
      : new THREE.Vector3(0, 0, 0);

    controls.target = target;
  } else if (typeof object === 'object')
    controls.target.copy(target);
  else
    console.error('Object must be a THREE.JS vector! @OrbitControls');

  return controls;
}
