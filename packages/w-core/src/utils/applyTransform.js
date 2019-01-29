function applyLocalTransform(mathType, data) {
  if (!data) return;

  let assignData = {};

  if (data instanceof Object.getPrototypeOf(mathType).constructor) { // THREE.Vector3 === THREE.Vector3
    mathType.copy(data);
    return;
  } else if (Array.isArray(data)) {
    assignData = {
      x: data[0],
      y: data[1],
      z: data[2],
      w: data[3]
    };
  } else {
    assignData = {
      x: data.x,
      y: data.y,
      z: data.z,
      w: data.w
    };
  }

  if (mathType.w === undefined) {
    delete assignData.w;
  }

  Object.assign(mathType, assignData);
}

export function applyTransform(native, options) {
  applyLocalTransform(native.position, options.position);
  applyLocalTransform(native.scale, options.scale);
  applyLocalTransform(native.rotation, options.rotation);
}
