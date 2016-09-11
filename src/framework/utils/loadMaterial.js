import * as THREE from 'three';

export const loadMaterial = (material = {}) => {
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
