module.exports = ContactEquation;

var Equation = require('./Equation');
var Vec3 = require('../math/Vec3');
var Mat3 = require('../math/Mat3');

/**
 * Contact/non-penetration constraint equation
 * @class ContactEquation
 * @constructor
 * @author schteppe
 * @param {Body} bj
 * @param {Body} bi
 * @extends Equation
 */
function ContactEquation(bi,bj){
    Equation.call(this,bi,bj,0,1e6);

    /**
     * @property restitution
     * @type {Number}
     */
    this.restitution = 0.0; // "bounciness": u1 = -e*u0

    /**
     * World-oriented vector that goes from the center of bi to the contact point.
     * @property {Vec3} ri
     */
    this.ri = new Vec3();

    /**
     * World-oriented vector that starts in body j position and goes to the contact point.
     * @property {Vec3} rj
     */
    this.rj = new Vec3();

    this.penetrationVec = new Vec3();

    /**
     * Contact normal, pointing out of body i.
     * @property {Vec3} ni
     */
    this.ni = new Vec3();

    this.rixn = new Vec3();
    this.rjxn = new Vec3();

    this.invIi = new Mat3();
    this.invIj = new Mat3();

    // Cache
    this.biInvInertiaTimesRixn =  new Vec3();
    this.bjInvInertiaTimesRjxn =  new Vec3();
}

ContactEquation.prototype = new Equation();
ContactEquation.prototype.constructor = ContactEquation;

var ContactEquation_computeB_temp1 = new Vec3(); // Temp vectors
var ContactEquation_computeB_temp2 = new Vec3();
var ContactEquation_computeB_zero = new Vec3();
ContactEquation.prototype.computeB = function(h){
    var a = this.a,
        b = this.b,
        bi = this.bi,
        bj = this.bj,
        ri = this.ri,
        rj = this.rj,
        rixn = this.rixn,
        rjxn = this.rjxn,

        zero = ContactEquation_computeB_zero,

        vi = bi.velocity,
        wi = bi.angularVelocity ? bi.angularVelocity : zero,
        fi = bi.force,
        taui = bi.torque ? bi.torque : zero,

        vj = bj.velocity,
        wj = bj.angularVelocity ? bj.angularVelocity : zero,
        fj = bj.force,
        tauj = bj.torque ? bj.torque : zero,

        penetrationVec = this.penetrationVec,
        invMassi = bi.invMass,
        invMassj = bj.invMass,

        invIi = this.invIi,
        invIj = this.invIj,

        GA = this.jacobianElementA,
        GB = this.jacobianElementB,

        n = this.ni;

    // Caluclate cross products
    ri.cross(n,rixn);
    rj.cross(n,rjxn);

    // g = xj+rj -(xi+ri)
    // G = [ -ni  -rixn  ni  rjxn ]
    n.negate(GA.spatial);
    rixn.negate(GA.rotational);
    GB.spatial.copy(n);
    GB.rotational.copy(rjxn);

    // Calculate the penetration vector
    var penetrationVec = this.penetrationVec;
    penetrationVec.set(0,0,0);
    penetrationVec.vadd(bj.position,penetrationVec);
    penetrationVec.vadd(rj,penetrationVec);
    penetrationVec.vsub(bi.position,penetrationVec);
    penetrationVec.vsub(ri,penetrationVec);

    var g = n.dot(penetrationVec);

    var invIi_vmult_taui = ContactEquation_computeB_temp1;
    var invIj_vmult_tauj = ContactEquation_computeB_temp2;
    if(bi.invInertiaWorld){
        bi.invInertiaWorld.vmult(taui,invIi_vmult_taui);
    } else {
        invIi_vmult_taui.set(0,0,0);
    }
    if(bj.invInertiaWorld){
        bj.invInertiaWorld.vmult(tauj,invIj_vmult_tauj);
    } else {
        invIj_vmult_tauj.set(0,0,0);
    }

    // Compute iteration
    var ePlusOne = this.restitution+1;
    var GW = ePlusOne*vj.dot(n) - ePlusOne*vi.dot(n) + wj.dot(rjxn) - wi.dot(rixn);
    var GiMf = this.computeGiMf();//fj.dot(n)*invMassj - fi.dot(n)*invMassi + rjxn.dot(invIj_vmult_tauj) - rixn.dot(invIi_vmult_taui);

    var B = - g * a - GW * b - h*GiMf;

    return B;
};

// Compute C = GMG+eps in the SPOOK equation
/*
var computeC_temp1 = new Vec3();
var computeC_temp2 = new Vec3();
ContactEquation.prototype.computeC = function(){
    var bi = this.bi;
    var bj = this.bj;
    var rixn = this.rixn;
    var rjxn = this.rjxn;
    var invMassi = bi.invMass;
    var invMassj = bj.invMass;

    var C = invMassi + invMassj + this.eps;

    var invIi = this.invIi;
    var invIj = this.invIj;

    // Compute rxn * I * rxn for each body
    if(bi.invInertiaWorld) bi.invInertiaWorld.vmult(rixn, this.biInvInertiaTimesRixn);
    if(bj.invInertiaWorld) bj.invInertiaWorld.vmult(rjxn, this.bjInvInertiaTimesRjxn);

    C += this.biInvInertiaTimesRixn.dot(rixn);
    C += this.bjInvInertiaTimesRjxn.dot(rjxn);

    return C;
};

var computeGWlambda_ulambda = new Vec3();
ContactEquation.prototype.computeGWlambda = function(){
    var bi = this.bi;
    var bj = this.bj;
    var ulambda = computeGWlambda_ulambda;

    var GWlambda = 0.0;

    bj.vlambda.vsub(bi.vlambda, ulambda);
    GWlambda += ulambda.dot(this.ni);

    // Angular
    if(bi.wlambda){
        GWlambda -= bi.wlambda.dot(this.rixn);
    }
    if(bj.wlambda){
        GWlambda += bj.wlambda.dot(this.rjxn);
    }

    return GWlambda;
};

var ContactEquation_addToWlambda_temp1 = new Vec3();
var ContactEquation_addToWlambda_temp2 = new Vec3();
ContactEquation.prototype.addToWlambda = function(deltalambda){
    var bi = this.bi,
        bj = this.bj,
        rixn = this.rixn,
        rjxn = this.rjxn,
        invMassi = bi.invMass,
        invMassj = bj.invMass,
        n = this.ni,
        temp1 = ContactEquation_addToWlambda_temp1,
        temp2 = ContactEquation_addToWlambda_temp2;


    // Add to linear velocity
    n.mult(invMassi * deltalambda, temp2);
    bi.vlambda.vsub(temp2,bi.vlambda);
    n.mult(invMassj * deltalambda, temp2);
    bj.vlambda.vadd(temp2,bj.vlambda);

    // Add to angular velocity
    if(bi.wlambda !== undefined){
        this.biInvInertiaTimesRixn.mult(deltalambda,temp1);

        bi.wlambda.vsub(temp1,bi.wlambda);
    }
    if(bj.wlambda !== undefined){
        this.bjInvInertiaTimesRjxn.mult(deltalambda,temp1);
        bj.wlambda.vadd(temp1,bj.wlambda);
    }
};
*/
