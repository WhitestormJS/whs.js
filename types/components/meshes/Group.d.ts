import {
  MeshComponent, 
  MeshComponentParams
} from '../../core/MeshComponent';

import {Object3D} from 'three';

 export class Group extends MeshComponent {

  /**
   * @description Creates a Group of meshes
   * @constructor
   * @param objects spread Meshes
   */
  constructor(...objects: Array<MeshComponent>);

  /**
   * Returns a new Object3D
   */
  build(): Object3D;

}
