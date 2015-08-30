module.exports = HingeConstraint;

var Constraint = require('./Constraint');
var RotationalEquation = require('../equations/RotationalEquation');
var RotationalMotorEquation = require('../equations/RotationalMotorEquation');
var ContactEquation = require('../equations/ContactEquation');
var Vec3 = require('../math/Vec3');

/**
 * Hinge constraint. Tries to keep the local body axes equal.
 * @class HingeConstraint
 * @constructor
 * @author schteppe
 * @param {RigidBody} bodyA
 * @param {RigidBody} bodyB
 * @param {object} [options]
 * @param {Vec3} [options.pivotA] A point defined locally in bodyA. This defines the offset of axisA.
 * @param {Vec3} [options.axisA] an axis that bodyA can rotate around.
 * @param {Vec3} [options.pivotB]
 * @param {Vec3} [options.axisB]
 * @param {Number} [options.maxForce=1e6]
 * @extends Constraint
 */
function HingeConstraint(bodyA, bodyB, options){ // bodyA, pivotA, axisA, bodyB, pivotB, axisB, maxForce
    Constraint.call(this, bodyA, bodyB, options);

    var maxForce = typeof(options.maxForce) !== 'undefined' ? options.maxForce : 1e6;

    // TODO: use a clever default setup... how?
    var pivotA = this.pivotA = typeof(options.pivotA) !== 'undefined' ? options.pivotA.clone() : new Vec3();
    var pivotB = this.pivotB = typeof(options.pivotB) !== 'undefined' ? options.pivotB.clone() : new Vec3();
    var axisA = this.axisA = typeof(options.axisA) !== 'undefined' ? options.axisA.clone() : new Vec3(1,0,0);
    var axisB = this.axisB = typeof(options.axisB) !== 'undefined' ? options.axisB.clone() : new Vec3(1,0,0);

    var that = this;

    // Equations to be fed to the solver
    var eqs = this.equations = [
        new RotationalEquation(bodyA,bodyB), // rotational1
        new RotationalEquation(bodyA,bodyB), // rotational2
        new ContactEquation(bodyA,bodyB),    // p2pNormal
        new ContactEquation(bodyA,bodyB),    // p2pTangent1
        new ContactEquation(bodyA,bodyB),    // p2pTangent2
    ];

    var r1 =        this.getRotationalEquation1();
    var r2 =        this.getRotationalEquation2();
    var normal =    this.getPointToPointEquation1();
    var t1 =        this.getPointToPointEquation2();
    var t2 =        this.getPointToPointEquation3();
    var motor; // not activated by default

    t1.minForce = t2.minForce = normal.minForce = -maxForce;
    t1.maxForce = t2.maxForce = normal.maxForce =  maxForce;

    var unitPivotA = pivotA.unit();
    var unitPivotB = pivotB.unit();

    var axisA_x_pivotA = this.axisA_x_pivotA = new Vec3();
    var axisA_x_axisA_x_pivotA = this.axisA_x_axisA_x_pivotA = new Vec3();
    var axisB_x_pivotB = this.axisB_x_pivotB = new Vec3();
    axisA.cross(unitPivotA,axisA_x_pivotA);
    if(axisA_x_pivotA.norm2() < 0.001){ // pivotA is along the same line as axisA
        unitPivotA.tangents(axisA_x_pivotA,axisA_x_pivotA);
    }
    axisA.cross(axisA_x_pivotA,axisA_x_axisA_x_pivotA);
    axisB.cross(unitPivotB,axisB_x_pivotB);
    if(axisB_x_pivotB.norm2() < 0.001){ // pivotB is along the same line as axisB
        axisB.tangents(axisB_x_pivotB,axisB_x_pivotB);
    }

    axisA_x_pivotA.normalize();
    axisB_x_pivotB.normalize();

    // Motor stuff
    this.motorEnabled = false;
    this.motorTargetVelocity = 0;
    this.motorMinForce = -maxForce;
    this.motorMaxForce = maxForce;
    this.motorEquation = new RotationalMotorEquation(bodyA,bodyB,maxForce);
}
HingeConstraint.prototype = new Constraint();

/**
 * @method enableMotor
 */
HingeConstraint.prototype.enableMotor = function(){
    if(!this.motorEnabled){
        this.equations.push(this.motorEquation);
        this.motorEnabled = true;
    }
};

/**
 * @method disableMotor
 */
HingeConstraint.prototype.disableMotor = function(){
    if(this.motorEnabled){
        this.motorEnabled = false;
        this.equations.pop();
    }
};

HingeConstraint.prototype.update = function(){
    var bodyA = this.bodyA,
        bodyB = this.bodyB,
        eqs = this.equations,
        motor = this.motorEquation,
        r1 = eqs[0],
        r2 = eqs[1],
        normal = eqs[2],
        t1 = eqs[3],
        t2 = eqs[4];
    var axisA_x_pivotA = this.axisA_x_pivotA;
    var axisA = this.axisA;
    var axisB = this.axisB;
    var pivotA = this.pivotA;
    var pivotB = this.pivotB;
    var axisA_x_axisA_x_pivotA = this.axisA_x_axisA_x_pivotA;
    var axisB_x_pivotB = this.axisB_x_pivotB;

    // Update world positions of pivots
    /*
    bodyB.position.vsub(bodyA.position,normal.ni);
    normal.ni.normalize();
    */
    normal.ni.set(1,0,0);
    t1.ni.set(0,1,0);
    t2.ni.set(0,0,1);
    bodyA.quaternion.vmult(this.pivotA,normal.ri);
    bodyB.quaternion.vmult(this.pivotB,normal.rj);

    //normal.ni.tangents(t1.ni,t2.ni);
    t1.ri.copy(normal.ri);
    t1.rj.copy(normal.rj);
    t2.ri.copy(normal.ri);
    t2.rj.copy(normal.rj);

    axisA.cross(pivotA, axisA_x_pivotA);
    if(axisA_x_pivotA.norm2() < 0.001){ // pivotA is along the same line as axisA
        pivotA.tangents(axisA_x_pivotA, axisA_x_pivotA);
    }
    axisA.cross(axisA_x_pivotA, axisA_x_axisA_x_pivotA);
    axisB.cross(pivotB, axisB_x_pivotB);
    if(axisB_x_pivotB.norm2() < 0.001){ // pivotB is along the same line as axisB
        axisB.tangents(axisB_x_pivotB,axisB_x_pivotB);
    }

    axisA_x_pivotA.normalize();
    axisB_x_pivotB.normalize();

    // update rotational constraints
    bodyA.quaternion.vmult(axisA_x_pivotA, r1.ni);
    bodyB.quaternion.vmult(axisB, r1.nj);
    bodyA.quaternion.vmult(axisA_x_axisA_x_pivotA, r2.ni);
    bodyB.quaternion.vmult(axisB, r2.nj);

    if(this.motorEnabled){
        bodyA.quaternion.vmult(this.axisA, motor.axisA);
        bodyB.quaternion.vmult(this.axisB, motor.axisB);
        motor.targetVelocity = this.motorTargetVelocity;
        motor.maxForce = this.motorMaxForce;
        motor.minForce = this.motorMinForce;
    }
};

HingeConstraint.prototype.getRotationalEquation1 =   function(){ return this.equations[0]; };
HingeConstraint.prototype.getRotationalEquation2 =   function(){ return this.equations[1]; };
HingeConstraint.prototype.getPointToPointEquation1 = function(){ return this.equations[2]; };
HingeConstraint.prototype.getPointToPointEquation2 = function(){ return this.equations[3]; };
HingeConstraint.prototype.getPointToPointEquation3 = function(){ return this.equations[4]; };
