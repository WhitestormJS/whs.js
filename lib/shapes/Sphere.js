module.exports = Sphere;

var Shape = require('./Shape');
var Vec3 = require('../math/Vec3');

/**
 * Spherical shape
 * @class Sphere
 * @constructor
 * @extends Shape
 * @param {Number} radius
 * @author schteppe / http://github.com/schteppe
 */
function Sphere(radius){
    Shape.call(this);

    /**
     * @property {Number} radius
     */
    this.radius = radius!==undefined ? Number(radius) : 1.0;
    this.type = Shape.types.SPHERE;

    this.updateBoundingSphereRadius();
}
Sphere.prototype = new Shape();
Sphere.prototype.constructor = Sphere;

Sphere.prototype.calculateLocalInertia = function(mass,target){
    target = target || new Vec3();
    var I = 2.0*mass*this.radius*this.radius/5.0;
    target.x = I;
    target.y = I;
    target.z = I;
    return target;
};

Sphere.prototype.volume = function(){
    return 4.0 * Math.PI * this.radius / 3.0;
};

Sphere.prototype.updateBoundingSphereRadius = function(){
    this.boundingSphereRadius = this.radius;
};

Sphere.prototype.calculateWorldAABB = function(pos,quat,min,max){
    var r = this.radius;
    var axes = ['x','y','z'];
    for(var i=0; i<axes.length; i++){
        var ax = axes[i];
        min[ax] = pos[ax] - r;
        max[ax] = pos[ax] + r;
    }
};
