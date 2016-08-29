import * as THREE from 'three';

import {extend, texture} from '../utils/index';
import {Shape} from '../core/Shape';
import {deprecate} from '../utils/decorators';

@deprecate('0.0.11')
class Skybox extends Shape {
  constructor(params = {}) {
    super(params, 'skybox');

    extend(params, {
      skyType: 'box',
      imgSuffix: '.png',
      radius: 10,
      fog: true,
      path: ''
    });

    let skyGeometry, skyMat;

    switch (params.skyType) {
      case 'box': {
        const directions = ['xpos', 'xneg', 'ypos', 'yneg', 'zpos', 'zneg'],
          matArray = [];

        skyGeometry = new THREE.CubeGeometry(params.radius, params.radius, params.radius);

        for (let i = 0; i < 6; i++) {
          matArray.push(new THREE.MeshBasicMaterial({
            map: texture(params.path + directions[i] + params.imgSuffix, false),
            side: THREE.BackSide,
            fog: params.fog
          }));
        }

        skyMat = new THREE.MeshFaceMaterial(matArray);

        break;
      }
      case 'sphere': {
        skyGeometry = new THREE.SphereGeometry(params.radius / 2, 60, 40);
        skyMat = new THREE.MeshBasicMaterial({
          map: texture(params.path + params.imgSuffix, false),
          side: THREE.BackSide,
          fog: params.fog
        });

        break;
      }
      default:
    }

    const mesh = new THREE.Mesh(skyGeometry, skyMat);
    mesh.renderDepth = 1000.0;

    super.setNative(mesh);
    super.wrap();
  }
}

export {
  Skybox
};
