export class DatAPI {
  foldObject(object, origin, instance = this.fold, onChange = () => {}) {
    for (let key in origin) {
      const value = object[key];
      if (!value) continue;

      if (value.isColor) {
        this.addColor(object, key, instance);
      } else if (typeof origin[key] === 'object') {
        if (object[key] === object) continue;
        this.foldObject(object[key], origin[key], instance.addFolder(key));
      } else {
        // let range = '1' + '0'.repeat(value.toString().length);
        // if (value.toString().indexOf('.') !== -1) range = 1;

        instance.add(object, key)
          .min(0)
          .step(0.001)
          .onChange(onChange);
      }
    }
  }

  guiTransforms(native, instance = this.fold) {
    if (!this.params.transforms) return;

    const controller = instance.addFolder('transforms');

    // position
    const position = controller.addFolder('position');
    position.add(native.position, 'x');
    position.add(native.position, 'y');
    position.add(native.position, 'z');

    // rotation
    const rotation = controller.addFolder('rotation');
    rotation.add(native.rotation, 'x').step(0.1);
    rotation.add(native.rotation, 'y').step(0.1);
    rotation.add(native.rotation, 'z').step(0.1);

    // scale
    if (!native.scale) return;
    const scale = controller.addFolder('scale');
    scale.add(native.scale, 'x').step(0.1);
    scale.add(native.scale, 'y').step(0.1);
    scale.add(native.scale, 'z').step(0.1);
  }
}
