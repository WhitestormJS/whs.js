import {from
  Material,
  MeshBasicMaterial,
  LineBasicMaterial,
  LineDashedMaterial,
  MeshDepthMaterial,
  MeshFaceMaterial,
  MeshLambertMaterial,
  MeshNormalMaterial,
  MeshPhongMaterial,
  PointsMaterial,
  MeshStandardMaterial,
  PointCloudMaterial,
  RawShaderMaterial,
  ShaderMaterial,
  SpriteCanvasMaterial,
  SpriteMaterial,
  MeshBasicMaterial
} from 'three';

export const loadMaterial = (material = {}) => {
  if (material instanceof Material) {
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
        materialThree = new MeshBasicMaterial(params);
        break;

      case 'linebasic':
        materialThree = new LineBasicMaterial(params);
        break;

      case 'linedashed':
        materialThree = new LineDashedMaterial(params);
        break;

      case 'material':
        materialThree = new Material(params);
        break;

      case 'depth':
        materialThree = new MeshDepthMaterial(params);
        break;

      case 'face':
        materialThree = new MeshFaceMaterial(params);
        break;

      case 'lambert':
        materialThree = new MeshLambertMaterial(params);
        break;

      case 'normal':
        materialThree = new MeshNormalMaterial(params);
        break;

      case 'phong':
        materialThree = new MeshPhongMaterial(params);
        break;

      case 'points':
        materialThree = new PointsMaterial(params);
        break;

      case 'standard':
        materialThree = new MeshStandardMaterial(params);
        break;

      case 'pointcloud':
        materialThree = new PointCloudMaterial(params);
        break;

      case 'rawshader':
        materialThree = new RawShaderMaterial(params);
        break;

      case 'shader':
        materialThree = new ShaderMaterial(params);
        break;

      case 'spritecanvas':
        materialThree = new SpriteCanvasMaterial(params);
        break;

      case 'sprite':
        materialThree = new SpriteMaterial(params);
        break;

      default:
        materialThree = new MeshBasicMaterial(params);
        break;
    }

    return materialThree;
  }
};
