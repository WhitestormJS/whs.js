import {
  RepeatWrapping as TRepeatWrapping,
  NearestFilter as TNearestFilter,
  LinearMipMapLinearFilter as TLinearMipMapLinearFilter,
  // Materials.
  MeshBasicMaterial as TMeshBasicMaterial,
  LineBasicMaterial as TLineBasicMaterial,
  LineDashedMaterial as TLineDashedMaterial,
  Material as TMaterial,
  MeshDepthMaterial as TMeshDepthMaterial,
  MeshFaceMaterial as TMeshFaceMaterial,
  MeshLambertMaterial as TMeshLambertMaterial,
  MeshNormalMaterial as TMeshNormalMaterial,
  MeshPhongMaterial as TMeshPhongMaterial,
  PointCloudMaterial as TPointCloudMaterial,
  RawShaderMaterial as TRawShaderMaterial,
  ShaderMaterial as TShaderMaterial,
  SpriteCanvasMaterial as TSpriteCanvasMaterial,
  SpriteMaterial as TSpriteMaterial
} from 'three';

import {createMaterial as pcreateMaterial} from 'whitestormjs-physijs';
import {loadJson, loadTexture, loadFont} from '../utils/loader';

const extend = Object.assign;

const texture = (url, options) => {
  const texture = loadTexture(url);

  if (options) {
    const opt = Object.assign({}, options, {
      offset: {
        x: 0,
        y: 0
      },
      repeat: {
        x: 1,
        y: 1
      }
    });

    texture.wrapS = texture.wrapT = TRepeatWrapping;

    texture.offset.set(opt.offset.x, opt.offset.y);
    texture.repeat.set(opt.repeat.x, opt.repeat.y);

    texture.magFilter = TNearestFilter;
    texture.minFilter = TLinearMipMapLinearFilter;
  }

  return texture;
};

const loadMaterial = (material = {}, isPhysics = true) => {
  if (typeof material.kind !== 'string')
    console.error('Type of material is undefined or not a string. @loadMaterial');

  const scope = {
    _type: material.kind,
    _restitution: !isNaN(parseFloat(material.restitution)) ?
      material.restitution : !isNaN(parseFloat(material.rest)) ?
      material.rest : 0.3,
    _friction: !isNaN(parseFloat(material.friction)) ?
      material.friction : !isNaN(parseFloat(material.fri)) ?
      material.fri : 0.8,
  };

  if (material.texture) material.map = texture(material.texture);

  const params = Object.assign({}, material);

  delete params.kind;

  delete params.friction;
  delete params.fri;

  delete params.restitution;
  delete params.rest;

  delete params.useCustomMaterial;
  delete params.useVertexColors;

  switch (material.kind) {
    case 'basic':
      scope._material = new TMeshBasicMaterial(params);
      break;

    case 'linebasic':
      scope._material = new TLineBasicMaterial(params);
      break;

    case 'linedashed':
      scope._material = new TLineDashedMaterial(params);
      break;

    case 'material':
      scope._material = new TMaterial(params);
      break;

    case 'depth':
      scope._material = new TMeshDepthMaterial(params);
      break;

    case 'face':
      scope._material = new TMeshFaceMaterial(params);
      break;

    case 'lambert':
      scope._material = new TMeshLambertMaterial(params);
      break;

    case 'normal':
      scope._material = new TMeshNormalMaterial(params);
      break;

    case 'phong':
      scope._material = new TMeshPhongMaterial(params);
      break;

    case 'pointcloud':
      scope._material = new TPointCloudMaterial(params);
      break;

    case 'rawshader':
      scope._material = new TRawShaderMaterial(params);
      break;

    case 'shader':
      scope._material = new TShaderMaterial(params);
      break;

    case 'spritecanvas':
      scope._material = new TSpriteCanvasMaterial(params);
      break;

    case 'sprite':
      scope._material = new TSpriteMaterial(params);
      break;

    default:
  }

  if (isPhysics) {
    scope._materialP = pcreateMaterial(
      scope._material,
      scope._friction,
      scope._restitution
    );
  }

  return scope;
};

export {
  loadFont,
  loadJson,
  loadTexture,
  texture,
  extend,
  loadMaterial
};
