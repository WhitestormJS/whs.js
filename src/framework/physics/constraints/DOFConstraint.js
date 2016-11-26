import {convertWorldPositionToObject} from '../api';

export class DOFConstraint {
  constructor(obja, objb, position) {
    const objecta = obja;
    let objectb = objb;

    if ( position === undefined ) {
      position = objectb;
      objectb = undefined;
    }

    this.type = 'dof';
    this.appliedImpulse = 0;
    this.scene = objecta.parent;
    this.objecta = objecta._physijs.id;
    this.positiona = convertWorldPositionToObject( position, objecta ).clone();
    this.axisa = { x: objecta.rotation.x, y: objecta.rotation.y, z: objecta.rotation.z };

    if ( objectb ) {
      this.objectb = objectb._physijs.id;
      this.positionb = convertWorldPositionToObject( position, objectb ).clone();
      this.axisb = { x: objectb.rotation.x, y: objectb.rotation.y, z: objectb.rotation.z };
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
      axisa: this.axisa,
      axisb: this.axisb
    };
  }

  setLinearLowerLimit(limit) {
    this.scene.execute( 'dof_setLinearLowerLimit', { constraint: this.id, x: limit.x, y: limit.y, z: limit.z } );
  }

  setLinearUpperLimit (limit) {
    this.scene.execute( 'dof_setLinearUpperLimit', { constraint: this.id, x: limit.x, y: limit.y, z: limit.z } );
  }

  setAngularLowerLimit (limit) {
    this.scene.execute( 'dof_setAngularLowerLimit', { constraint: this.id, x: limit.x, y: limit.y, z: limit.z } );
  }

  setAngularUpperLimit (limit) {
    this.scene.execute( 'dof_setAngularUpperLimit', { constraint: this.id, x: limit.x, y: limit.y, z: limit.z } );
  }

  enableAngularMotor (which) {
    this.scene.execute( 'dof_enableAngularMotor', { constraint: this.id, which: which } );
  }

  configureAngularMotor (which, low_angle, high_angle, velocity, max_force ) {
    this.scene.execute( 'dof_configureAngularMotor', { constraint: this.id, which: which, low_angle: low_angle, high_angle: high_angle, velocity: velocity, max_force: max_force } );
  }

  disableAngularMotor (which) {
    this.scene.execute( 'dof_disableAngularMotor', { constraint: this.id, which: which } );
  }
}
