/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS group.
 *
 * @extends WHS.Shape
 */

WHS.Group = class Group extends WHS.Shape {
    /**
     * Create a group of shapes.
     */
	constructor() {

		super({}, "group");

		super.setNative(
			new THREE.Object3D()
		);

		super.wrap();

	}

}