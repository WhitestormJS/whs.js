module.exports = ObjectCollisionMatrix;

/**
 * Records what objects are colliding with each other
 * @class ObjectCollisionMatrix
 * @constructor
 */
function ObjectCollisionMatrix() {

    /**
     * The matrix storage
     * @property matrix
     * @type {Object}
     */
	this.matrix = {};
}

/**
 * @method get
 * @param  {Number} i
 * @param  {Number} j
 * @return {Number}
 */
ObjectCollisionMatrix.prototype.get = function(i, j) {
	i = i.id;
	j = j.id;
    if (j > i) {
        var temp = j;
        j = i;
        i = temp;
    }
	return i+'-'+j in this.matrix;
};

/**
 * @method set
 * @param  {Number} i
 * @param  {Number} j
 * @param {Number} value
 */
ObjectCollisionMatrix.prototype.set = function(i, j, value) {
	i = i.id;
	j = j.id;
    if (j > i) {
        var temp = j;
        j = i;
        i = temp;
	}
	if (value) {
		this.matrix[i+'-'+j] = true;
	}
	else {
		delete this.matrix[i+'-'+j];
	}
};

/**
 * Empty the matrix
 * @method reset
 */
ObjectCollisionMatrix.prototype.reset = function() {
	this.matrix = {};
};

/**
 * Set max number of objects
 * @method setNumObjects
 * @param {Number} n
 */
ObjectCollisionMatrix.prototype.setNumObjects = function(n) {
};
