WHS.Curve = class Curve extends WHS.Object {
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

        let curve = new THREE.Line(
            geometry,
            WHS.API.loadMaterial( params.material, false )._material
        );

        this.setNative( curve );

        let scope = Object.assign( this,
        {
            _type: "curve",
            __path: params.geometry.curve
        });

        return scope;

	}

    addTo( parent ) {

        'use strict';

        this.parent = parent;

        let _scope = this;

        return new Promise( (resolve, reject) => {

            try {

                _scope.parent.getScene().add( _scope.getNative() );
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

    setNative( curve ) {

        return native.set( this, curve );

    }

    getNative() {

        return native.get( this );

    }

    clone() {

        return new WHS.Curve( this.__params ).copy( this );

    }

    copy( source ) {

        this.setNative( source.getNative().clone() );

        this._type = source._type;

        return this;

    }

    remove() {

        this.parent.getScene().remove( this.getNative() );

        this.parent.children.splice( this.parent.children.indexOf( this ), 1);
        this.parent = null;

        this.emit("remove");

        if ( WHS.debug ) console.debug("@WHS.Curve: Curve "
            + this._type + " was removed from world",
            [_scope]);

        return this;

    }

}
