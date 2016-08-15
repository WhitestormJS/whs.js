import {Line} from '../core/line';

export class RopeMesh extends Line {
  constructor(geometry, material, params = {}) {
    const physParams = params.physics;

    const mass = physParams.mass || params.mass;
    super(geometry, material, mass);

    this._physijs.type = 'softRopeMesh';

    const v1 = params.geometry.curve.getPoint(0);
    const v2 = params.geometry.curve.getPoint(1);

    this._physijs.data = [
      v1.x, v1.y, v1.z,
      v2.x, v2.y, v2.z,
      params.geometry.points
    ];

    this._physijs.params = {
      friction: physParams.friction,
      damping: physParams.damping,
      margin: physParams.margin,
      klst: physParams.klst,
      kast: physParams.kast,
      kvst: physParams.kvst,
      drag: physParams.drag,
      lift: physParams.lift,
      piterations: physParams.piterations,
      viterations: physParams.viterations,
      diterations: physParams.diterations,
      citerations: physParams.citerations,
      anchorHardness: physParams.anchorHardness,
      rigidHardness: physParams.rigidHardness,
    };

    this._physijs.mass = mass;
  }

  appendAnchor(world, object, node, influence, collisionBetweenLinkedBodies = true) {
    const o1 = this._physijs.id;
    const o2 = object._physijs.id;

    world.execute('appendAnchor', {
      obj: o1,
      obj2: o2,
      node,
      influence,
      collisionBetweenLinkedBodies
    });
  }
}
