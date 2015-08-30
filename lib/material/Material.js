module.exports = Material;

/**
 * Defines a physics material.
 * @class Material
 * @constructor
 * @param {String} name
 * @author schteppe
 */
function Material(name){
    /**
     * @property name
     * @type {String}
     */
    this.name = name;

    /**
     * material id.
     * @property id
     */
    this.id = Material.idCounter++;
}

Material.idCounter = 0;
