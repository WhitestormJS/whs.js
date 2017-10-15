import {
    CameraComponent, 
    CameraComponentParams
} from '../../core';

import {CubeCamera as CubeCameraNative} from 'three';

export interface CubeCameraParams extends CameraComponentParams {
    near?: number,
    far?: number,
    cubeResolution?: number
}

 export class CubeCamera extends CameraComponent {

    /**
    * @param params
    */
    constructor(params?: CubeCameraParams);

    build(): CubeCameraNative;
}
