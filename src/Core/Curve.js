/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * Whitestormjs curve.
 */
WHS.Curve = class Curve extends WHS.Object {
    /**
     * Create curve.
     *
     * Todo
     */
	constructor( params ) {

        super({
            geometry: {
                curve: false,
                points: 50
            }
        });

        super.setParams( params );

        let geometry = new THREE.Geometry();

        geometry.vertices = params.geometry.curve.getPoints( params.geometry.points );

        let mesh = new THREE.Line(
            geometry,
            WHS.API.loadMaterial( params.material, false )._material
        );

        let scope = Object.assign( this,
        {
            _type: "curve",
            curve: mesh,
            __path: params.geometry.curve
        });

        return scope;

	}

    /**
     * Add curve to scene.
     */
    addTo( parent ) {

        'use strict';

        this.parent = parent;

        let _scope = this;

        return new Promise( (resolve, reject) => {

            try {

                _scope.parent.scene.add( _scope.curve );
                _scope.parent.children.push( _scope );

            } catch(err) {

                console.error( err.message );
                reject();

            } finally {

                if ( WHS.debug ) console.debug("@WHS.Curve: Curve " 
                            + _scope._type + " was added to world.", 
                            [_scope, _scope.parent]);

                resolve( _scope );

            }

        });

    }

    /**
     * Clone curve.
     */
    clone() {

        return new WHS.Curve( this.__params ).copy( this );

    }

    /**
     * Copy curve.
     *
     * @param {WHS.Curve} source - Source object, that will be applied to this.
     */
    copy( source ) {

        this.curve = source.curve.clone();

        this._type = source._type;

        return this;

    }

    /**
     * Remove this curve from world.
     *
     * @return {THREE.Curve} - this.
     */
    remove() {
        
        this.parent.scene.remove( this.curve );

        this.parent.children.splice( this.parent.children.indexOf( this ), 1);
        this.parent = null;

        this.emit("remove");

        if ( WHS.debug ) console.debug("@WHS.Curve: Curve " 
            + this._type + " was removed from world", 
            [_scope]);

        return this;

    }

}