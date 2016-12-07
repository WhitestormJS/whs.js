import { Scene as PhysicsWorld } from '../core/scene';
import { Vector3 } from 'three';

export function create() {
  const scene = new PhysicsWorld(
    {
      fixedTimeStep: this.params.physics.fixedTimeStep,
      broadphase: this.params.physics.broadphase,
      ammo: this.params.physics.ammo
    },
    {
      stats: this.params.stats,
      world: this,
      softbody: this.params.softbody
    }
  )

  scene.setGravity(
    new Vector3(
      this.params.gravity.x,
      this.params.gravity.y,
      this.params.gravity.z
    )
  );

  scene.simulate();

  return scene;
}
