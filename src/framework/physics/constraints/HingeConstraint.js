import {convertWorldPositionToObject} from '../api';

export class HingeConstraint {
  constructor(obja, objb, position, axis) {
    const objecta = obja;
    let objectb = objb;

    if (axis === undefined) {
      axis = position;
      position = objectb;
      objectb = undefined;
    }

    this.type = 'hinge';
    this.appliedImpulse = 0;
    this.scene = objecta.parent;
    this.objecta = objecta._physijs.id;
    this.positiona = convertWorldPositionToObject(position, objecta).clone();
    this.position = position.clone();
    this.axis = axis;

    if (objectb) {
      this.objectb = objectb._physijs.id;
      this.positionb = convertWorldPositionToObject(position, objectb).clone();
    }
  }

  getDefinition() {
    return {
      type: this.type,
      id: this.id,
      objecta: this.objecta,
      objectb: this.objectb,
      positiona: this.positiona,
      positionb: this.positionb,
      axis: this.axis
    };
  }

  setLimits(low, high, bias_factor, relaxation_factor) {
    this.scene.execute('hinge_setLimits', {
      constraint: this.id,
      low,
      high,
      bias_factor,
      relaxation_factor
    });
  }

  enableAngularMotor(velocity, acceleration) {
    this.scene.execute('hinge_enableAngularMotor', {
      constraint: this.id,
      velocity,
      acceleration
    });
  }

  disableMotor() {
    this.scene.execute('hinge_disableMotor', {constraint: this.id});
  }
}
