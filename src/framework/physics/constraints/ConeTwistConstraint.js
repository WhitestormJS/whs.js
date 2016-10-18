import {convertWorldPositionToObject, getObjectId} from '../api';

export class ConeTwistConstraint {
  constructor(obja, objb, position) {
    const objecta = obja;
    const objectb = obja;

    if (position === undefined) console.error('Both objects must be defined in a ConeTwistConstraint.');

    this.type = 'conetwist';
    this.appliedImpulse = 0;
    this.id = getObjectId();
    this.scene = objecta.parent;
    this.objecta = objecta._physijs.id;
    this.positiona = convertWorldPositionToObject(position, objecta).clone();
    this.objectb = objectb._physijs.id;
    this.positionb = convertWorldPositionToObject(position, objectb).clone();
    this.axisa = {x: objecta.rotation.x, y: objecta.rotation.y, z: objecta.rotation.z};
    this.axisb = {x: objectb.rotation.x, y: objectb.rotation.y, z: objectb.rotation.z};
  }

  getDefinition() {
    return {
      type: this.type,
      id: this.id,
      objecta: this.objecta,
      objectb: this.objectb,
      positiona: this.positiona,
      positionb: this.positionb,
      axisa: this.axisa,
      axisb: this.axisb
    };
  }

  setLimit(x, y, z) {
    this.scene.execute('conetwist_setLimit', {constraint: this.id, x, y, z});
  }

  enableMotor() {
    this.scene.execute('conetwist_enableMotor', {constraint: this.id});
  }

  setMaxMotorImpulse(max_impulse) {
    this.scene.execute('conetwist_setMaxMotorImpulse', {constraint: this.id, max_impulse});
  }

  setMotorTarget(target) {
    if (target instanceof THREE.Vector3)
      target = new THREE.Quaternion().setFromEuler(new THREE.Euler(target.x, target.y, target.z));
    else if (target instanceof THREE.Euler)
      target = new THREE.Quaternion().setFromEuler(target);
    else if (target instanceof THREE.Matrix4)
      target = new THREE.Quaternion().setFromRotationMatrix(target);

    this.scene.execute('conetwist_setMotorTarget', {
      constraint: this.id,
      x: target.x,
      y: target.y,
      z: target.z,
      w: target.w
    });
  }
}
