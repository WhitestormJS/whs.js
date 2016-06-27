const getEulerXYZFromQuaternion = (x, y, z, w) => {
  return new THREE.Vector3(
    Math.atan2(2 * (x * w - y * z), (w * w - x * x - y * y + z * z)),
    Math.asin(2 * (x * z + y * w)),
    Math.atan2(2 * (z * w - x * y), (w * w + x * x - y * y - z * z))
  );
};

const getQuatertionFromEuler = (x, y, z) => {
  const c1 = Math.cos(y);
  const s1 = Math.sin(y);
  const c2 = Math.cos(-z);
  const s2 = Math.sin(-z);
  const c3 = Math.cos(x);
  const s3 = Math.sin(x);
  const c1c2 = c1 * c2;
  const s1s2 = s1 * s2;

  return {
    w: c1c2 * c3 - s1s2 * s3,
    x: c1c2 * s3 + s1s2 * c3,
    y: s1 * c2 * c3 + c1 * s2 * s3,
    z: c1 * s2 * c3 - s1 * c2 * s3
  };
};

const convertWorldPositionToObject = (position, object) => {
  temp1Matrix4.identity(); // reset temp matrix

  // Set the temp matrix's rotation to the object's rotation
  temp1Matrix4.identity().makeRotationFromQuaternion(object.quaternion);

  // Invert rotation matrix in order to "unrotate" a point back to object space
  temp1Matrix4.getInverse(temp1Matrix4);

  // Yay! Temp vars!
  temp1Vector3.copy(position);
  temp2Vector3.copy(object.position);

  // Apply the rotation

  return temp1Vector3.sub(temp2Vector3).applyMatrix4(temp1Matrix4);
};

const getObjectId = (() => {
  let _id = 1;
  return () => {
    return _id++;
  };
})();

export {
  getEulerXYZFromQuaternion,
  getQuatertionFromEuler,
  convertWorldPositionToObject,
  getObjectId
};
