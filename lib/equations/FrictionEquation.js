module.exports = FrictionEquation;

var Equation = require('./Equation');
var Vec3 = require('../math/Vec3');
var Mat3 = require('../math/Mat3');

/**
 * Constrains the slipping in a contact along a tangent
 * @class FrictionEquation
 * @constructor
 * @author schteppe
 * @param {Body} bi
 * @param {Body} bj
 * @param {Number} slipForce should be +-F_friction = +-mu * F_normal = +-mu * m * g
 * @extends Equation
 */
function FrictionEquation(bi,bj,slipForce){
    Equation.call(this,bi,bj,-slipForce,slipForce);
    this.ri = new Vec3();
    this.rj = new Vec3();
    this.t = new Vec3(); // tangent


    // The following is just cache
    this.rixt = new Vec3();
    this.rjxt = new Vec3();
    this.wixri = new Vec3();
    this.wjxrj = new Vec3();

    this.invIi = new Mat3();
    this.invIj = new Mat3();

    this.relVel = new Vec3();
    this.relForce = new Vec3();

    this.biInvInertiaTimesRixt =  new Vec3();
    this.bjInvInertiaTimesRjxt =  new Vec3();
}

FrictionEquation.prototype = new Equation();
FrictionEquation.prototype.constructor = FrictionEquation;

var FrictionEquation_computeB_temp1 = new Vec3();
var FrictionEquation_computeB_temp2 = new Vec3();
var FrictionEquation_computeB_zero = new Vec3();
FrictionEquation.prototype.computeB = function(h){
    var a = this.a,
        b = this.b,
        bi = this.bi,
        bj = this.bj,
        ri = this.ri,
        rj = this.rj,
        rixt = this.rixt,
        rjxt = this.rjxt,
        wixri = this.wixri,
        wjxrj = this.wjxrj,
        zero = FrictionEquation_computeB_zero;

    var vi = bi.velocity,
        wi = bi.angularVelocity ? bi.angularVelocity : zero,
        fi = bi.force,
        taui = bi.torque ? bi.torque : zero,

        vj = bj.velocity,
        wj = bj.angularVelocity ? bj.angularVelocity : zero,
        fj = bj.force,
        tauj = bj.torque ? bj.torque : zero,

        relVel = this.relVel,
        relForce = this.relForce,
        invMassi = bi.invMass,
        invMassj = bj.invMass,

        invIi = this.invIi,
        invIj = this.invIj,

        t = this.t,

        invIi_vmult_taui = FrictionEquation_computeB_temp1,
        invIj_vmult_tauj = FrictionEquation_computeB_temp2;

    // Caluclate cross products
    ri.cross(t,rixt);
    rj.cross(t,rjxt);

    wi.cross(ri,wixri);
    wj.cross(rj,wjxrj);

    // G = [-t -rixt t rjxt]
    // And remember, this is a pure velocity constraint, g is always zero!
    var GA = this.jacobianElementA,
        GB = this.jacobianElementB;
    t.negate(GA.spatial);
    rixt.negate(GA.rotational);
    GB.spatial.copy(t);
    GB.rotational.copy(rjxt);

    if(bi.invInertiaWorld){ bi.invInertiaWorld.vmult(taui,invIi_vmult_taui); }
    else { invIi_vmult_taui.set(0,0,0); }
    if(bj.invInertiaWorld){ bj.invInertiaWorld.vmult(tauj,invIj_vmult_tauj); }
    else { invIj_vmult_tauj.set(0,0,0); }

    var GW = this.computeGW();//vj.dot(t) - vi.dot(t) + wjxrj.dot(t) - wixri.dot(t), // eq. 40
    var GiMf = this.computeGiMf();//fj.dot(t)*invMassj - fi.dot(t)*invMassi + rjxt.dot(invIj_vmult_tauj) - rixt.dot(invIi_vmult_taui);

    // we do only want to constrain velocity, so g=0
    var B = - GW * b - h*GiMf;

    return B;
};

/*
// Compute C = G * Minv * G + eps
//var FEcomputeC_temp1 = new Vec3();
//var FEcomputeC_temp2 = new Vec3();
FrictionEquation.prototype.computeC = function(){
    var bi = this.bi,
        bj = this.bj,
        rixt = this.rixt,
        rjxt = this.rjxt,
        invMassi = bi.invMass,
        invMassj = bj.invMass,
        C = invMassi + invMassj + this.eps,
        invIi = this.invIi,
        invIj = this.invIj;

    // Compute rxt * I * rxt for each body
    if(bi.invInertiaWorld) bi.invInertiaWorld.vmult(rixt,this.biInvInertiaTimesRixt);
    if(bj.invInertiaWorld) bj.invInertiaWorld.vmult(rjxt,this.bjInvInertiaTimesRjxt);
    C += this.biInvInertiaTimesRixt.dot(rixt);
    C += this.bjInvInertiaTimesRjxt.dot(rjxt);

    return C;
};

var FrictionEquation_computeGWlambda_ulambda = new Vec3();
FrictionEquation.prototype.computeGWlambda = function(){
    var bi = this.bi;
    var bj = this.bj;

    var GWlambda = 0.0;
    var ulambda = FrictionEquation_computeGWlambda_ulambda;
    bj.vlambda.vsub(bi.vlambda,ulambda);
    GWlambda += ulambda.dot(this.t);

    // Angular
    if(bi.wlambda){
        GWlambda -= bi.wlambda.dot(this.rixt);
    }
    if(bj.wlambda){
        GWlambda += bj.wlambda.dot(this.rjxt);
    }

    return GWlambda;
};

var FrictionEquation_addToWlambda_tmp = new Vec3();
FrictionEquation.prototype.addToWlambda = function(deltalambda){
    var bi = this.bi,
        bj = this.bj,
        rixt = this.rixt,
        rjxt = this.rjxt,
        invMassi = bi.invMass,
        invMassj = bj.invMass,
        t = this.t,
        tmp = FrictionEquation_addToWlambda_tmp,
        wi = bi.wlambda,
        wj = bj.wlambda;

    // Add to linear velocity
    t.mult(invMassi * deltalambda, tmp);
    bi.vlambda.vsub(tmp,bi.vlambda);

    t.mult(invMassj * deltalambda, tmp);
    bj.vlambda.vadd(tmp,bj.vlambda);

    // Add to angular velocity
    if(wi){
        this.biInvInertiaTimesRixt.mult(deltalambda,tmp);
        wi.vsub(tmp,wi);
    }
    if(wj){
        this.bjInvInertiaTimesRjxt.mult(deltalambda,tmp);
        wj.vadd(tmp,wj);
    }
};
*/
