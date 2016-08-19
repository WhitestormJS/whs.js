export class VehicleTunning {
  constructor(suspension_stiffness = 5.88, suspension_compression = 0.83, suspension_damping = 0.88, max_suspension_travel = 500, friction_slip = 10.5, max_suspension_force = 6000) {
    this.suspension_stiffness = suspension_stiffness;
    this.suspension_compression = suspension_compression;
    this.suspension_damping = suspension_damping;
    this.max_suspension_travel = max_suspension_travel;
    this.friction_slip = friction_slip;
    this.max_suspension_force = max_suspension_force;
  }
}
