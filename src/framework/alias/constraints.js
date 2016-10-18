import {
  HingeConstraint as HingeConstraintPhysi
} from '../physics/constraints/index';

export class HingeConstraint extends HingeConstraintPhysi {
  constructor(obja, objb, position, axis) {
    super(
      obja.native,
      objb.native ? objb.native : objb,
      position,
      axis
    );
  }
}
