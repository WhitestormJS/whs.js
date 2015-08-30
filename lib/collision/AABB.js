var Vec3 = require('../math/Vec3');
var Utils = require('../utils/Utils');

module.exports = AABB;

/**
 * Axis aligned bounding box class.
 * @class AABB
 * @constructor
 * @param {Object}  [options]
 * @param {Array}   [options.upperBound]
 * @param {Array}   [options.lowerBound]
 */
function AABB(options){
    options = options || {};

    /**
     * The lower bound of the bounding box.
     * @property lowerBound
     * @type {Array}
     */
    this.lowerBound = new Vec3();
    if(options.lowerBound){
        this.lowerBound.copy(options.lowerBound);
    }

    /**
     * The upper bound of the bounding box.
     * @property upperBound
     * @type {Array}
     */
    this.upperBound = new Vec3();
    if(options.upperBound){
        this.upperBound.copy(options.upperBound);
    }
}

var tmp = new Vec3();

/**
 * Set the AABB bounds from a set of points.
 * @method setFromPoints
 * @param {Array} points An array of Vec3's.
 * @param {Vec3} position
 * @param {Quaternion} quaternion
 * @param {number} skinSize
 */
AABB.prototype.setFromPoints = function(points, position, quaternion, skinSize){
    var l = this.lowerBound,
        u = this.upperBound,
        q = quaternion;

    // Set to the first point
    l.copy(points[0]);
    if(q){
        q.vmult(l, l);
    }
    u.copy(l);

    for(var i = 1; i<points.length; i++){
        var p = points[i];

        if(q){
            q.vmult(p, tmp);
            p = tmp;
        }

        if(p.x > u.x){ u.x = p.x; }
        if(p.x < l.x){ l.x = p.x; }
        if(p.y > u.y){ u.y = p.y; }
        if(p.y < l.y){ l.y = p.y; }
        if(p.z > u.z){ u.z = p.z; }
        if(p.z < l.z){ l.z = p.z; }
    }

    // Add offset
    if (position) {
        position.vadd(l, l);
        position.vadd(u, u);
    }

    if(skinSize){
        l.x -= skinSize;
        l.y -= skinSize;
        l.z -= skinSize;
        u.x += skinSize;
        u.y += skinSize;
        u.z += skinSize;
    }
};

/**
 * Copy bounds from an AABB to this AABB
 * @method copy
 * @param  {AABB} aabb Source to copy from
 */
AABB.prototype.copy = function(aabb){
    this.lowerBound.copy(aabb.lowerBound);
    this.upperBound.copy(aabb.upperBound);
};

/**
 * Extend this AABB so that it covers the given AABB too.
 * @method extend
 * @param  {AABB} aabb
 */
AABB.prototype.extend = function(aabb){
    // Extend lower bound
    var l = aabb.lowerBound.x;
    if(this.lowerBound.x > l){
        this.lowerBound.x = l;
    }

    // Upper
    var u = aabb.upperBound.x;
    if(this.upperBound.x < u){
        this.upperBound.x = u;
    }

    // Extend lower bound
    var l = aabb.lowerBound.y;
    if(this.lowerBound.y > l){
        this.lowerBound.y = l;
    }

    // Upper
    var u = aabb.upperBound.y;
    if(this.upperBound.y < u){
        this.upperBound.y = u;
    }

    // Extend lower bound
    var l = aabb.lowerBound.z;
    if(this.lowerBound.z > l){
        this.lowerBound.z = l;
    }

    // Upper
    var u = aabb.upperBound.z;
    if(this.upperBound.z < u){
        this.upperBound.z = u;
    }
};

/**
 * Returns true if the given AABB overlaps this AABB.
 * @method overlaps
 * @param  {AABB} aabb
 * @return {Boolean}
 */
AABB.prototype.overlaps = function(aabb){
    var l1 = this.lowerBound,
        u1 = this.upperBound,
        l2 = aabb.lowerBound,
        u2 = aabb.upperBound;

    //      l2        u2
    //      |---------|
    // |--------|
    // l1       u1

    return ((l2.x <= u1.x && u1.x <= u2.x) || (l1.x <= u2.x && u2.x <= u1.x)) &&
           ((l2.y <= u1.y && u1.y <= u2.y) || (l1.y <= u2.y && u2.y <= u1.y)) &&
           ((l2.z <= u1.z && u1.z <= u2.z) || (l1.z <= u2.z && u2.z <= u1.z));
};
