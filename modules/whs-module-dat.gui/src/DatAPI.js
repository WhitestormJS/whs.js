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
        const range = '1' + '0'.repeat(value.toString().length);

        instance.add(object, key)
          .min(0)
          .step(range > 10 ? 1 : 0.1)
          .onChange(onChange);
      }
    }
  }
}
