import {Mesh} from 'three';
import {VehicleTunning} from './tunning';

export class Vehicle {
  constructor(mesh, tuning = new VehicleTuning()) {
    this.mesh = mesh;
    this.wheels = [];

    this._physijs = {
      id: getObjectId(),
      rigidBody: mesh._physijs.id,
      suspension_stiffness: tuning.suspension_stiffness,
      suspension_compression: tuning.suspension_compression,
      suspension_damping: tuning.suspension_damping,
      max_suspension_travel: tuning.max_suspension_travel,
      friction_slip: tuning.friction_slip,
      max_suspension_force: tuning.max_suspension_force
    };
  }

  addWheel(wheel_geometry, wheel_material, connection_point, wheel_direction, wheel_axle, suspension_rest_length, wheel_radius, is_front_wheel, tuning) {
    const wheel = new Mesh(wheel_geometry, wheel_material);

    wheel.castShadow = wheel.receiveShadow = true;
    wheel.position.copy(wheel_direction).multiplyScalar(suspension_rest_length / 100).add(connection_point);

    this.world.add(wheel);
    this.wheels.push(wheel);

    this.world.execute('addWheel', {
      id: this._physijs.id,
      connection_point: {x: connection_point.x, y: connection_point.y, z: connection_point.z},
      wheel_direction: {x: wheel_direction.x, y: wheel_direction.y, z: wheel_direction.z},
      wheel_axle: {x: wheel_axle.x, y: wheel_axle.y, z: wheel_axle.z},
      suspension_rest_length,
      wheel_radius,
      is_front_wheel,
      tuning
    });
  }

  setSteering(amount, wheel) {
    if (wheel !== undefined && this.wheels[wheel] !== undefined)
      this.world.execute('setSteering', {id: this._physijs.id, wheel, steering: amount});
    else if (this.wheels.length > 0) {
      for (let i = 0; i < this.wheels.length; i++)
        this.world.execute('setSteering', {id: this._physijs.id, wheel: i, steering: amount});
    }
  }

  setBrake(amount, wheel) {
    if (wheel !== undefined && this.wheels[wheel] !== undefined)
      this.world.execute('setBrake', {id: this._physijs.id, wheel, brake: amount});
    else if (this.wheels.length > 0) {
      for (let i = 0; i < this.wheels.length; i++)
        this.world.execute('setBrake', {id: this._physijs.id, wheel: i, brake: amount});
    }
  }

  applyEngineForce(amount, wheel) {
    if (wheel !== undefined && this.wheels[wheel] !== undefined)
      this.world.execute('applyEngineForce', {id: this._physijs.id, wheel, force: amount});
    else if (this.wheels.length > 0) {
      for (let i = 0; i < this.wheels.length; i++)
        this.world.execute('applyEngineForce', {id: this._physijs.id, wheel: i, force: amount});
    }
  }
}
