module.exports = RotationalMotorEquation;

var Vec3 = require('../math/Vec3');
var Mat3 = require('../math/Mat3');
var Equation = require('./Equation');

/**
 * Rotational motor constraint. Works to keep the relative angular velocity of the bodies to a given value
 * @class RotationalMotorEquation
 * @constructor
 * @author schteppe
 * @param {RigidBody} bodyA
 * @param {RigidBody} bodyB
 * @param {Number} maxForce
 * @extends Equation
 */
function RotationalMotorEquation(bodyA, bodyB, maxForce){
    maxForce = maxForce || 1e6;
    Equation.call(this,bodyA,bodyB,-maxForce,maxForce);
    this.axisA = new Vec3(); // World oriented rotational axis
    this.axisB = new Vec3(); // World oriented rotational axis

    this.invIi = new Mat3();
    this.invIj = new Mat3();

    /**
     * Motor velocity
     * @property {Number} targetVelocity
     */
    this.targetVelocity = 0;
}

RotationalMotorEquation.prototype = new Equation();
RotationalMotorEquation.prototype.constructor = RotationalMotorEquation;

var zero = new Vec3();

RotationalMotorEquation.prototype.computeB = function(h){
    var a = this.a,
        b = this.b,
        bi = this.bi,
        bj = this.bj,

        axisA = this.axisA,
        axisB = this.axisB,

        vi = bi.velocity,
        wi = bi.angularVelocity ? bi.angularVelocity : zero,
        fi = bi.force,
        taui = bi.torque ? bi.torque : zero,

        vj = bj.velocity,
        wj = bj.angularVelocity ? bj.angularVelocity : zero,
        fj = bj.force,
        tauj = bj.torque ? bj.torque : zero,

        GA = this.jacobianElementA,
        GB = this.jacobianElementB,

        invMassi = bi.invMass,
        invMassj = bj.invMass;

    // g = 0
    // gdot = axisA * wi - axisB * wj
    // G = [0 axisA 0 -axisB]
    // W = [vi wi vj wj]

    GA.rotational.copy(axisA);
    axisB.negate(GB.rotational);

    var GW = this.computeGW() - this.targetVelocity,
        GiMf = this.computeGiMf();//axis.dot(invIi.vmult(taui)) + axis.dot(invIj.vmult(tauj));

    var B = - GW * b - h*GiMf;

    return B;
};

/*
// Compute C = GMG+eps
RotationalMotorEquation.prototype.computeC = function(){
    var bi = this.bi;
    var bj = this.bj;
    var axisA = this.axisA;
    var axisB = this.axisB;
    var invMassi = bi.invMass;
    var invMassj = bj.invMass;

    var C = this.eps;

    C += bi.invInertiaWorld.vmult(axisA).dot(axisB);
    C += bj.invInertiaWorld.vmult(axisB).dot(axisB);

    return C;
};

var computeGWlambda_ulambda = new Vec3();
RotationalMotorEquation.prototype.computeGWlambda = function(){
    var bi = this.bi;
    var bj = this.bj;
    var ulambda = computeGWlambda_ulambda;
    var axisA = this.axisA;
    var axisB = this.axisB;

    var GWlambda = 0.0;
    //bj.vlambda.vsub(bi.vlambda, ulambda);
    //GWlambda += ulambda.dot(this.ni);

    // Angular
    if(bi.wlambda){
        GWlambda += bi.wlambda.dot(axisA);
    }
    if(bj.wlambda){
        GWlambda += bj.wlambda.dot(axisB);
    }

    //console.log("GWlambda:",GWlambda);

    return GWlambda;
};

RotationalMotorEquation.prototype.addToWlambda = function(deltalambda){
    var bi = this.bi;
    var bj = this.bj;
    var axisA = this.axisA;
    var axisB = this.axisB;
    var invMassi = bi.invMass;
    var invMassj = bj.invMass;

    // Add to linear velocity
    //bi.vlambda.vsub(n.mult(invMassi * deltalambda),bi.vlambda);
    //bj.vlambda.vadd(n.mult(invMassj * deltalambda),bj.vlambda);

    // Add to angular velocity
    if(bi.wlambda){
        var I = bi.invInertiaWorld;
        bi.wlambda.vsub(I.vmult(axisA).mult(deltalambda),bi.wlambda);
    }
    if(bj.wlambda){
        var I = bj.invInertiaWorld;
        bj.wlambda.vadd(I.vmult(axisB).mult(deltalambda),bj.wlambda);
    }
};
*/
