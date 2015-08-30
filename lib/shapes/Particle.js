module.exports = Particle;

var Shape = require('./Shape');
var Vec3 = require('../math/Vec3');

/**
 * Particle shape.
 * @class Particle
 * @constructor
 * @author schteppe
 * @extends Shape
 */
function Particle(){
    Shape.call(this);

    this.type = Shape.types.PARTICLE;
}
Particle.prototype = new Shape();
Particle.prototype.constructor = Particle;

/**
 * @method calculateLocalInertia
 * @param  {Number} mass
 * @param  {Vec3} target
 * @return {Vec3}
 */
Particle.prototype.calculateLocalInertia = function(mass,target){
    target = target || new Vec3();
    target.set(0, 0, 0);
    return target;
};

Particle.prototype.volume = function(){
    return 0;
};

Particle.prototype.updateBoundingSphereRadius = function(){
    this.boundingSphereRadius = 0;
};

Particle.prototype.calculateWorldAABB = function(pos,quat,min,max){
    // Get each axis max
    min.copy(pos);
    max.copy(pos);
};
