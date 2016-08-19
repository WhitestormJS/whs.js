import * as THREE from 'three';
import * as Physijs from '../physics/index.js';

import {JSONLoader, TextureLoader, FontLoader} from '../utils/loaders';

const extend = (object, ...extensions) => { // $.extend alternative, ... is the spread operator.
  for (const extension of extensions) {
    // console.log(extension);
    // console.log(typeof extension);

    if (!extension)
      continue; // Ignore null and undefined objects and paramaters.

    for (const prop of Object.getOwnPropertyNames(extension)) { // Do not traverse the prototype chain.
      if (object[prop] !== undefined
        && object[prop].toString() === '[object Object]'
        && extension[prop].toString() === '[object Object]') {

        // Goes deep only if object[prop] and extension[prop] are both objects !
        if (extension[prop].uuid) object[prop] = extension[prop];
        else extend(object[prop], extension[prop]);

      } else
        object[prop] = (object[prop] === 0) ? 0 : object[prop];
      if (typeof object[prop] === 'undefined') object[prop] = extension[prop]; // Add values that do not already exist.
    }
  }

  return object;
};

const texture = (url, repeat = {}) => {
  const texture = TextureLoader.load(url);

  if (repeat) {
    const opt = extend(repeat, {
      offset: {
        x: 0,
        y: 0
      },
      repeat: {
        x: 1,
        y: 1
      }
    });

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

    texture.offset.set(opt.offset.x, opt.offset.y);
    texture.repeat.set(opt.repeat.x, opt.repeat.y);

    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;
  }

  return texture;
};

const loadMaterial = (material = {}) => {
  if (material instanceof THREE.Material) {
    return material;
  }
  else {
    let materialThree;

    const params = Object.assign({}, material);

    delete params.kind;
    delete params.useCustomMaterial;
    delete params.useVertexColors;

    switch (material.kind) {
      case 'basic':
        materialThree = new THREE.MeshBasicMaterial(params);
        break;

      case 'linebasic':
        materialThree = new THREE.LineBasicMaterial(params);
        break;

      case 'linedashed':
        materialThree = new THREE.LineDashedMaterial(params);
        break;

      case 'material':
        materialThree = new THREE.Material(params);
        break;

      case 'depth':
        materialThree = new THREE.MeshDepthMaterial(params);
        break;

      case 'face':
        materialThree = new THREE.MeshFaceMaterial(params);
        break;

      case 'lambert':
        materialThree = new THREE.MeshLambertMaterial(params);
        break;

      case 'normal':
        materialThree = new THREE.MeshNormalMaterial(params);
        break;

      case 'phong':
        materialThree = new THREE.MeshPhongMaterial(params);
        break;

      case 'points':
        materialThree = new THREE.PointsMaterial(params);
        break;

      case 'standard':
        materialThree = new THREE.MeshStandardMaterial(params);
        break;

      case 'pointcloud':
        materialThree = new THREE.PointCloudMaterial(params);
        break;

      case 'rawshader':
        materialThree = new THREE.RawShaderMaterial(params);
        break;

      case 'shader':
        materialThree = new THREE.ShaderMaterial(params);
        break;

      case 'spritecanvas':
        materialThree = new THREE.SpriteCanvasMaterial(params);
        break;

      case 'sprite':
        materialThree = new THREE.SpriteMaterial(params);
        break;

      default:
        materialThree = new THREE.MeshBasicMaterial(params);
        break;
    }

    return materialThree;
  }
};

export {
  FontLoader,
  JSONLoader,
  TextureLoader,
  texture,
  extend,
  loadMaterial
};
