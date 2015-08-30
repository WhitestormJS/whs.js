module.exports = Ray;

var Vec3 = require('../math/Vec3');
var Quaternion = require('../math/Quaternion');
var Transform = require('../math/Transform');
var ConvexPolyhedron = require('../shapes/ConvexPolyhedron');
var Box = require('../shapes/Box');
var RaycastResult = require('../collision/RaycastResult');
var Shape = require('../shapes/Shape');
var AABB = require('../collision/AABB');

/**
 * A line in 3D space that intersects bodies and return points.
 * @class Ray
 * @constructor
 * @param {Vec3} from
 * @param {Vec3} to
 */
function Ray(from, to){
    /**
     * @property {Vec3} from
     */
    this.from = from ? from.clone() : new Vec3();

    /**
     * @property {Vec3} to
     */
    this.to = to ? to.clone() : new Vec3();

    this._direction = new Vec3();

    /**
     * The precision of the ray. Used when checking parallelity etc.
     * @property {Number} precision
     */
    this.precision = 0.0001;

    /**
     * Set to true if you want the Ray to take .collisionResponse flags into account on bodies and shapes.
     * @property {Boolean} checkCollisionResponse
     */
    this.checkCollisionResponse = true;
}
Ray.prototype.constructor = Ray;

var v1 = new Vec3(),
    v2 = new Vec3();

/*
 * As per "Barycentric Technique" as named here http://www.blackpawn.com/texts/pointinpoly/default.html But without the division
 */
function pointInTriangle(p, a, b, c) {
    c.vsub(a,v0);
    b.vsub(a,v1);
    p.vsub(a,v2);

    var dot00 = v0.dot( v0 );
    var dot01 = v0.dot( v1 );
    var dot02 = v0.dot( v2 );
    var dot11 = v1.dot( v1 );
    var dot12 = v1.dot( v2 );

    var u,v;

    return  ( (u = dot11 * dot02 - dot01 * dot12) >= 0 ) &&
            ( (v = dot00 * dot12 - dot01 * dot02) >= 0 ) &&
            ( u + v < ( dot00 * dot11 - dot01 * dot01 ) );
}

/**
 * Shoot a ray at a body, get back information about the hit.
 * @method intersectBody
 * @private
 * @param {Body} body
 * @param {RaycastResult} result
 * @param {Vec3} [direction]
 */
Ray.prototype.intersectBody = function (body, result, direction) {
    var checkCollisionResponse = this.checkCollisionResponse;

    if(checkCollisionResponse && !body.collisionResponse){
        return result;
    }

    if(!direction){
        this._updateDirection();
        direction = this._direction;
    }

    var xi = new Vec3();
    var qi = new Quaternion();
    for (var i = 0; i < body.shapes.length; i++) {
        var shape = body.shapes[i];

        if(checkCollisionResponse && !shape.collisionResponse){
            continue; // Skip
        }

        body.quaternion.mult(body.shapeOrientations[i], qi);
        body.quaternion.vmult(body.shapeOffsets[i], xi);
        xi.vadd(body.position, xi);

        this.intersectShape(
            shape,
            qi,
            xi,
            body,
            direction,
            result
        );
    }

    return result;
};

/**
 * @method intersectBodies
 * @param {Array} bodies An array of Body objects.
 * @param {RaycastResult} result
 */
Ray.prototype.intersectBodies = function (bodies, result) {
    this._updateDirection();
    var direction = this._direction;

    if(result instanceof RaycastResult){
        result.reset();
    }

    for ( var i = 0, l = bodies.length; i < l; i ++ ) {
        this.intersectBody(bodies[i], result, direction);
    }
};

Ray.prototype._updateDirection = function(){
    this.to.vsub(this.from, this._direction);
    this._direction.normalize();
};

/**
 * @method intersectShape
 * @private
 * @param {Shape} shape
 * @param {Quaternion} quat
 * @param {Vec3} position
 * @param {Body} body
 * @param {Vec3} direction
 * @param {RaycastResult} result
 */
Ray.prototype.intersectShape = function(shape, quat, position, body, direction, result){
    var from = this.from;

    // Checking boundingSphere
    var distance = distanceFromIntersection(from, direction, position);
    if ( distance > shape.boundingSphereRadius ) {
        return result;
    }

    this[shape.type](shape, quat, position, body, direction, result);

    return result;
};

var vector = new Vec3();
var normal = new Vec3();
var intersectPoint = new Vec3();

var a = new Vec3();
var b = new Vec3();
var c = new Vec3();
var d = new Vec3();

var tmpRaycastResult = new RaycastResult();

/**
 * @method intersectBox
 * @private
 * @param  {Shape} shape
 * @param  {Quaternion} quat
 * @param  {Vec3} position
 * @param  {Body} body
 * @param  {Vec3} direction
 * @param  {RaycastResult} result
 */
Ray.prototype.intersectBox = function(shape, quat, position, body, direction, result){
    return this.intersectConvex(shape.convexPolyhedronRepresentation, quat, position, body, direction, result);
};
Ray.prototype[Shape.types.BOX] = Ray.prototype.intersectBox;

/**
 * @method intersectPlane
 * @private
 * @param  {Shape} shape
 * @param  {Quaternion} quat
 * @param  {Vec3} position
 * @param  {Body} body
 * @param  {Vec3} direction
 * @param  {RaycastResult} result
 */
Ray.prototype.intersectPlane = function(shape, quat, position, body, direction, result){
    var from = this.from;
    var to = this.to;

    // Get plane normal
    var worldNormal = new Vec3(0, 0, 1);
    quat.vmult(worldNormal, worldNormal);

    var len = new Vec3();
    from.vsub(position, len);
    var planeToFrom = len.dot(worldNormal);
    to.vsub(position, len);
    var planeToTo = len.dot(worldNormal);

    if(planeToFrom * planeToTo > 0){
        // "from" and "to" are on the same side of the plane... bail out
        return result;
    }

    if(from.distanceTo(to) < planeToFrom){
        return result;
    }

    var n_dot_dir = worldNormal.dot(direction);

    if (Math.abs(n_dot_dir) < this.precision) {
        // No intersection
        return result;
    }

    var planePointToFrom = new Vec3();
    var dir_scaled_with_t = new Vec3();
    var hitPointWorld = new Vec3();

    from.vsub(position, planePointToFrom);
    var t = -worldNormal.dot(planePointToFrom) / n_dot_dir;
    direction.scale(t, dir_scaled_with_t);
    from.vadd(dir_scaled_with_t, hitPointWorld);

    if(this.reportIntersection(worldNormal, hitPointWorld, shape, body, result)){
        return result;
    }

    return result;
};
Ray.prototype[Shape.types.PLANE] = Ray.prototype.intersectPlane;

/**
 * Get the AABB of the ray.
 * @method getAABB
 * @param  {AABB} aabb
 */
Ray.prototype.getAABB = function(result){
    var to = this.to;
    var from = this.from;
    result.lowerBound.x = Math.min(to.x, from.x);
    result.lowerBound.y = Math.min(to.y, from.y);
    result.lowerBound.z = Math.min(to.z, from.z);
    result.upperBound.x = Math.max(to.x, from.x);
    result.upperBound.y = Math.max(to.y, from.y);
    result.upperBound.z = Math.max(to.z, from.z);
};

var intersectConvexOptions = {
    faceList: [0]
};

/**
 * @method intersectHeightfield
 * @private
 * @param  {Shape} shape
 * @param  {Quaternion} quat
 * @param  {Vec3} position
 * @param  {Body} body
 * @param  {Vec3} direction
 * @param  {RaycastResult} result
 */
Ray.prototype.intersectHeightfield = function(shape, quat, position, body, direction, result){
    var data = shape.data,
        w = shape.elementSize,
        worldPillarOffset = new Vec3();

    // Convert the ray to local heightfield coordinates
    var localRay = new Ray(this.from, this.to);
    Transform.pointToLocalFrame(position, quat, localRay.from, localRay.from);
    Transform.pointToLocalFrame(position, quat, localRay.to, localRay.to);

    // Get the index of the data points to test against
    var index = [];
    var iMinX = null;
    var iMinY = null;
    var iMaxX = null;
    var iMaxY = null;

    var inside = shape.getIndexOfPosition(localRay.from.x, localRay.from.y, index, false);
    if(inside){
        iMinX = index[0];
        iMinY = index[1];
        iMaxX = index[0];
        iMaxY = index[1];
    }
    inside = shape.getIndexOfPosition(localRay.to.x, localRay.to.y, index, false);
    if(inside){
        if (iMinX === null || index[0] < iMinX) { iMinX = index[0]; }
        if (iMaxX === null || index[0] > iMaxX) { iMaxX = index[0]; }
        if (iMinY === null || index[1] < iMinY) { iMinY = index[1]; }
        if (iMaxY === null || index[1] > iMaxY) { iMaxY = index[1]; }
    }

    if(iMinX === null){
        return result;
    }

    var minMax = [];
    shape.getRectMinMax(iMinX, iMinY, iMaxX, iMaxY, minMax);
    var min = minMax[0];
    var max = minMax[1];

    // // Bail out if the ray can't touch the bounding box
    // // TODO
    // var aabb = new AABB();
    // this.getAABB(aabb);
    // if(aabb.intersects()){
    //     return;
    // }

    for(var i = iMinX; i <= iMaxX; i++){
        for(var j = iMinY; j <= iMaxY; j++){

            // Lower triangle
            shape.getConvexTrianglePillar(i, j, false);
            Transform.pointToWorldFrame(position, quat, shape.pillarOffset, worldPillarOffset);
            this.intersectConvex(shape.pillarConvex, quat, worldPillarOffset, body, direction, result, intersectConvexOptions);

            // Upper triangle
            shape.getConvexTrianglePillar(i, j, true);
            Transform.pointToWorldFrame(position, quat, shape.pillarOffset, worldPillarOffset);
            this.intersectConvex(shape.pillarConvex, quat, worldPillarOffset, body, direction, result, intersectConvexOptions);
        }
    }

    return result;
};
Ray.prototype[Shape.types.HEIGHTFIELD] = Ray.prototype.intersectHeightfield;

/**
 * @method intersectSphere
 * @private
 * @param  {Shape} shape
 * @param  {Quaternion} quat
 * @param  {Vec3} position
 * @param  {Body} body
 * @param  {Vec3} direction
 * @param  {RaycastResult} result
 */
Ray.prototype.intersectSphere = function(shape, quat, position, body, direction, result){
    var from = this.from,
        to = this.to,
        r = shape.radius;

    var a = Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2) + Math.pow(to.z - from.z, 2);
    var b = 2 * ((to.x - from.x) * (from.x - position.x) + (to.y - from.y) * (from.y - position.y) + (to.z - from.z) * (from.z - position.z));
    var c = Math.pow(from.x - position.x, 2) + Math.pow(from.y - position.y, 2) + Math.pow(from.z - position.z, 2) - Math.pow(r, 2);

    var delta = Math.pow(b, 2) - 4 * a * c;

    if(delta < 0){
        // No intersection
        return result;

    } else if(delta === 0){
        // single intersection point
        var intersectionPoint = new Vec3();
        from.lerp(to, delta, intersectionPoint);

        var normal = new Vec3();
        intersectionPoint.vsub(position, normal);
        normal.normalize();

        if(this.reportIntersection(normal, intersectionPoint, shape, body, result)){
            return result;
        }
    } else {
        var d1 = (- b - Math.sqrt(delta)) / (2 * a);
        var d2 = (- b + Math.sqrt(delta)) / (2 * a);

        var intersectionPoint = new Vec3();
        from.lerp(to, d1, intersectionPoint);
        var normal = new Vec3();
        intersectionPoint.vsub(position, normal);
        normal.normalize();
        if(this.reportIntersection(normal, intersectionPoint, shape, body, result)){
            return result;
        }

        from.lerp(to, d2, intersectionPoint);
        var normal = new Vec3();
        intersectionPoint.vsub(position, normal);
        normal.normalize();
        if(this.reportIntersection(normal, intersectionPoint, shape, body, result)){
            return result;
        }
    }

    return result;
};
Ray.prototype[Shape.types.SPHERE] = Ray.prototype.intersectSphere;


var intersectConvex_normal = new Vec3();
var intersectConvex_minDistNormal = new Vec3();
var intersectConvex_minDistIntersect = new Vec3();
var intersectConvex_vector = new Vec3();

/**
 * @method intersectConvex
 * @private
 * @param  {Shape} shape
 * @param  {Quaternion} quat
 * @param  {Vec3} position
 * @param  {Body} body
 * @param  {Vec3} direction
 * @param  {RaycastResult} result
 * @param {object} [options]
 * @param {array} [options.faceList]
 */
Ray.prototype.intersectConvex = function intersectConvex(shape, quat, position, body, direction, result, options){
    var minDistNormal = intersectConvex_minDistNormal;
    var normal = intersectConvex_normal;
    var vector = intersectConvex_vector;
    var minDistIntersect = intersectConvex_minDistIntersect;
    var faceList = (options && options.faceList) || null;

    // Checking faces
    var faces = shape.faces,
        vertices = shape.vertices,
        normals = shape.faceNormals;

    var from = this.from;
    var to = this.to;
    var fromToDistance = from.distanceTo(to);

    var reportClosest = result instanceof RaycastResult;
    var minDist = -1;
    var Nfaces = faceList ? faceList.length : faces.length;

    for (var j = 0; j < Nfaces; j++) {
        var fi = faceList ? faceList[j] : j;

        var face = faces[fi];
        var faceNormal = normals[fi];
        var q = quat;
        var x = position;

        // determine if ray intersects the plane of the face
        // note: this works regardless of the direction of the face normal

        // Get plane point in world coordinates...
        vector.copy(vertices[face[0]]);
        q.vmult(vector,vector);
        vector.vadd(x,vector);

        // ...but make it relative to the ray from. We'll fix this later.
        vector.vsub(from,vector);

        // Get plane normal
        q.vmult(faceNormal,normal);

        // If this dot product is negative, we have something interesting
        var dot = direction.dot(normal);

        // Bail out if ray and plane are parallel
        if ( Math.abs( dot ) < this.precision ){
            continue;
        }

        // calc distance to plane
        var scalar = normal.dot(vector) / dot;

        // if negative distance, then plane is behind ray
        if (scalar < 0){
            continue;
        }

        if (dot < 0) {

            // Intersection point is from + direction * scalar
            direction.mult(scalar,intersectPoint);
            intersectPoint.vadd(from,intersectPoint);

            // a is the point we compare points b and c with.
            a.copy(vertices[face[0]]);
            q.vmult(a,a);
            x.vadd(a,a);

            for(var i = 1; i < face.length - 1; i++){
                // Transform 3 vertices to world coords
                b.copy(vertices[face[i]]);
                c.copy(vertices[face[i+1]]);
                q.vmult(b,b);
                q.vmult(c,c);
                x.vadd(b,b);
                x.vadd(c,c);

                var distance = intersectPoint.distanceTo(from);

                if(!pointInTriangle(intersectPoint, a, b, c) || distance > fromToDistance){
                    continue;
                }

                if(minDist === -1 || distance < minDist){
                    minDist = distance;
                    minDistNormal.copy(normal);
                    minDistIntersect.copy(intersectPoint);
                }
            }
        }
    }

    if(minDist !== -1 && this.reportIntersection(minDistNormal, minDistIntersect, shape, body, result)){
        return result;
    }

    return result;
};

Ray.prototype[Shape.types.CONVEXPOLYHEDRON] = Ray.prototype.intersectConvex;

/**
 * @method reportIntersection
 * @private
 * @param  {Vec3} normal
 * @param  {Vec3} hitPointWorld
 * @param  {Shape} shape
 * @param  {Body} body
 * @param  {RaycastResult} result
 * @return {boolean} True if the intersections should continue
 */
Ray.prototype.reportIntersection = function(normal, hitPointWorld, shape, body, result){
    var from = this.from;
    var to = this.to;
    var distance = from.distanceTo(hitPointWorld);

    if(!(result instanceof RaycastResult)){
        // Got a callback
        tmpRaycastResult.set(
            from,
            to,
            normal,
            hitPointWorld,
            shape,
            body,
            distance
        );
        tmpRaycastResult.hasHit = true;
        result(tmpRaycastResult);

        return true;

    } else {

        // Store if closer than current cloest
        if(distance < result.distance || !result.hasHit){
            result.hasHit = true;
            result.set(
                from,
                to,
                normal,
                hitPointWorld,
                shape,
                body,
                distance
            );
        }

        return false;
    }
};

var v0 = new Vec3(),
    intersect = new Vec3();
function distanceFromIntersection(from, direction, position) {

    // v0 is vector from from to position
    position.vsub(from,v0);
    var dot = v0.dot( direction );

    // intersect = direction*dot + from
    direction.mult(dot,intersect);
    intersect.vadd(from,intersect);

    var distance = position.distanceTo(intersect);

    return distance;
}

