import {
  HingeConstraint as HingeConstraintPhysi,
  DOFConstraint as DOFConstraintPhysi,
  PointConstraint as PointConstraintPhysi,
  SliderConstraint as SliderConstraintPhysi,
  ConeTwistConstraint as ConeTwistConstraintPhysi
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

export class DOFConstraint extends DOFConstraintPhysi {
  constructor(obja, objb, position) {
    super(
      obja.native,
      objb.native ? objb.native : objb,
      position
    );
  }
}

export class PointConstraint extends PointConstraintPhysi {
  constructor(obja, objb, position) {
    super(
      obja.native,
      objb.native ? objb.native : objb,
      position
    );
  }
}

export class SliderConstraint extends SliderConstraintPhysi {
  constructor(obja, objb, position, axis) {
    super(
      obja.native,
      objb.native ? objb.native : objb,
      position,
      axis
    );
  }
}
