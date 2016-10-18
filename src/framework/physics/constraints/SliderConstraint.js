import * as THREE from 'three';
import {convertWorldPositionToObject, getObjectId} from '../api';

export class SliderConstraint {
  constructor(obja, objb, position, axis) {
    const objecta = obja;
    let objectb = objb;

    if (axis === undefined) {
      axis = position;
      position = objectb;
      objectb = undefined;
    }

    this.type = 'slider';
    this.appliedImpulse = 0;
    this.id = getObjectId();
    this.scene = objecta.parent;
    this.objecta = objecta._physijs.id;
    this.positiona = convertWorldPositionToObject(position, objecta).clone();
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

  setLimits(lin_lower, lin_upper, ang_lower, ang_upper) {
    this.scene.execute('slider_setLimits', {
      constraint: this.id,
      lin_lower,
      lin_upper,
      ang_lower,
      ang_upper
    });
  }

  setRestitution(linear, angular) {
    this.scene.execute(
      'slider_setRestitution',
      {
        constraint: this.id,
        linear,
        angular
      }
    );
  }

  enableLinearMotor(velocity, acceleration) {
    this.scene.execute('slider_enableLinearMotor', {
      constraint: this.id,
      velocity,
      acceleration
    });
  }

  disableLinearMotor() {
    this.scene.execute('slider_disableLinearMotor', {constraint: this.id});
  }

  enableAngularMotor(velocity, acceleration) {
    this.scene.execute('slider_enableAngularMotor', {
      constraint: this.id,
      velocity,
      acceleration
    });
  }

  disableAngularMotor() {
    this.scene.execute('slider_disableAngularMotor', {constraint: this.id});
  }
}
