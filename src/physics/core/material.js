export default class createMaterial {
  constructor(material, friction, restitution) {
    let physijs_material = function () {
    };

    physijs_material.prototype = material;
    physijs_material = new physijs_material();

    physijs_material._physijs = {
      id: material.id,
      friction: friction === undefined ? 0.8 : friction,
      restitution: restitution === undefined ? 0.2 : restitution
    };

    return physijs_material;
  }
}
