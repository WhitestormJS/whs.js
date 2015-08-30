module.exports = Pool;

/**
 * For pooling objects that can be reused.
 * @class Pool
 * @constructor
 */
function Pool(){
    /**
     * The pooled objects
     * @property {Array} objects
     */
    this.objects = [];

    /**
     * Constructor of the objects
     * @property {mixed} type
     */
    this.type = Object;
}

/**
 * Release an object after use
 * @method release
 * @param {Object} obj
 */
Pool.prototype.release = function(){
    var Nargs = arguments.length;
    for(var i=0; i!==Nargs; i++){
        this.objects.push(arguments[i]);
    }
};

/**
 * Get an object
 * @method get
 * @return {mixed}
 */
Pool.prototype.get = function(){
    if(this.objects.length===0){
        return this.constructObject();
    } else {
        return this.objects.pop();
    }
};

/**
 * Construct an object. Should be implmented in each subclass.
 * @method constructObject
 * @return {mixed}
 */
Pool.prototype.constructObject = function(){
    throw new Error("constructObject() not implemented in this Pool subclass yet!");
};
