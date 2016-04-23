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
	constructor( curve ) {

        super({

            points: []

        });

        var scope = Object.assign( this,
        {
            _type: type,
            __params: params
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

                _scope.parent.scene.add( _scope.mesh );
                _scope.parent.children.push( _scope );

            } catch(err) {

                console.error( err.message );
                reject();

            } finally {

                if ( WHS.debug ) console.debug("@WHS.Shape: Shape " 
                            + _scope._type + " was added to world.", 
                            [_scope, _scope.parent]);

                resolve( _scope );

            }

        });

    }

}