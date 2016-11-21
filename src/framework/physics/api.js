import {
  Vector3,
  Matrix4,
  Quaternion
} from 'three';

const MESSAGE_TYPES = {
  WORLDREPORT: 0,
  COLLISIONREPORT: 1,
  VEHICLEREPORT: 2,
  CONSTRAINTREPORT: 3,
  SOFTREPORT: 4
};

const REPORT_ITEMSIZE = 14,
  COLLISIONREPORT_ITEMSIZE = 5,
  VEHICLEREPORT_ITEMSIZE = 9,
  CONSTRAINTREPORT_ITEMSIZE = 6;

const temp1Vector3 = new Vector3(),
  temp2Vector3 = new Vector3(),
  temp1Matrix4 = new Matrix4(),
  temp1Quat = new Quaternion();

const getEulerXYZFromQuaternion = (x, y, z, w) => {
  return new Vector3(
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

const addObjectChildren = function (parent, object) {
  for (let i = 0; i < object.children.length; i++) {
    if (object.children[i]._physijs) {
      object.children[i].updateMatrix();
      object.children[i].updateMatrixWorld();

      temp1Vector3.setFromMatrixPosition(object.children[i].matrixWorld);
      temp1Quat.setFromRotationMatrix(object.children[i].matrixWorld);

      object.children[i]._physijs.position_offset = {
        x: temp1Vector3.x,
        y: temp1Vector3.y,
        z: temp1Vector3.z
      };

      object.children[i]._physijs.rotation = {
        x: temp1Quat.x,
        y: temp1Quat.y,
        z: temp1Quat.z,
        w: temp1Quat.w
      };

      parent._physijs.children.push(object.children[i]._physijs);
    }

    addObjectChildren(parent, object.children[i]);
  }
};

export {
  getEulerXYZFromQuaternion,
  getQuatertionFromEuler,
  convertWorldPositionToObject,
  addObjectChildren,

  MESSAGE_TYPES,
  REPORT_ITEMSIZE,
  COLLISIONREPORT_ITEMSIZE,
  VEHICLEREPORT_ITEMSIZE,
  CONSTRAINTREPORT_ITEMSIZE,

  temp1Vector3,
  temp2Vector3,
  temp1Matrix4,
  temp1Quat
};
