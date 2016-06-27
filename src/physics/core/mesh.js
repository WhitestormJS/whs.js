import * as THREE from 'three';
import {Eventable} from '../eventable';
import {getObjectId} from '../api';

export class Mesh extends THREE.Mesh {
  constructor(geometry, material, mass) {
    if (!geometry) return;

    super(geometry, material);
    Object.assign(this, new Eventable());
    Eventable.make(Mesh);

    if (!geometry.boundingBox) geometry.computeBoundingBox();

    this._physijs = {
      type: null,
      id: getObjectId(),
      mass: mass || 0,
      touches: [],
      linearVelocity: new THREE.Vector3(),
      angularVelocity: new THREE.Vector3()
    };
  }

  get mass() {
    return this._physijs.mass;
  }

  set mass(mass) {
    this._physijs.mass = mass;
    if (this.world) this.world.execute('updateMass', {id: this._physijs.id, mass});
  }

  applyCentralImpulse(force) {
    if (this.world) this.world.execute('applyCentralImpulse', {id: this._physijs.id, x: force.x, y: force.y, z: force.z});
  }

  applyImpulse(force, offset) {
    if (this.world) {
      this.world.execute('applyImpulse', {
        id: this._physijs.id,
        impulse_x: force.x,
        impulse_y: force.y,
        impulse_z: force.z,
        x: offset.x,
        y: offset.y,
        z: offset.z
      });
    }
  }

  applyTorque(force) {
    if (this.world) {
      this.world.execute('applyTorque', {
        id: this._physijs.id,
        torque_x: force.x,
        torque_y: force.y,
        torque_z: force.z
      });
    }
  }

  applyCentralForce(force) {
    if (this.world) this.world.execute('applyCentralForce', {id: this._physijs.id, x: force.x, y: force.y, z: force.z});
  }

  applyForce(force, offset) {
    if (this.world) {
      this.world.execute('applyForce', {
        id: this._physijs.id,
        force_x: force.x,
        force_y: force.y,
        force_z: force.z,
        x: offset.x,
        y: offset.y,
        z: offset.z
      });
    }
  }

  getAngularVelocity() {
    return this._physijs.angularVelocity;
  }

  setAngularVelocity(velocity) {
    if (this.world) this.world.execute('setAngularVelocity', {id: this._physijs.id, x: velocity.x, y: velocity.y, z: velocity.z});
  }

  getLinearVelocity() {
    return this._physijs.linearVelocity;
  }

  setLinearVelocity(velocity) {
    if (this.world) this.world.execute('setLinearVelocity', {id: this._physijs.id, x: velocity.x, y: velocity.y, z: velocity.z});
  }

  setAngularFactor(factor) {
    if (this.world) this.world.execute('setAngularFactor', {id: this._physijs.id, x: factor.x, y: factor.y, z: factor.z});
  }

  setLinearFactor(factor) {
    if (this.world) this.world.execute('setLinearFactor', {id: this._physijs.id, x: factor.x, y: factor.y, z: factor.z});
  }

  setDamping(linear, angular) {
    if (this.world) this.world.execute('setDamping', {id: this._physijs.id, linear, angular});
  }

  setCcdMotionThreshold(threshold) {
    if (this.world) this.world.execute('setCcdMotionThreshold', {id: this._physijs.id, threshold});
  }

  setCcdSweptSphereRadius(radius) {
    if (this.world) this.world.execute('setCcdSweptSphereRadius', {id: this._physijs.id, radius});
  }
}
