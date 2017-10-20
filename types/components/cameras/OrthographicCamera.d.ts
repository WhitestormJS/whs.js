import {
    CameraComponent, 
    CameraComponentParams
} from '../../core';

import {OrthographicCamera as OrthographicCameraNative} from 'three';

export interface OrthographicCameraParams extends CameraComponentParams {
    near?: number,
    far?: number,
    left?: number,
    right?: number,
    top?: number,
    bottom?: number
}

 export class OrthographicCamera extends CameraComponent {

    /**
    * @param params
    */
    constructor(params?: OrthographicCameraParams);

    build(): OrthographicCameraNative;
}
