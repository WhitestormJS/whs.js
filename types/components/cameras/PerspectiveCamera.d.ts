import {
    CameraComponent, 
    CameraComponentParams
} from '../../core';

import {PerspectiveCamera as PerspectiveCameraNative} from 'three';

interface PerspectiveCameraParams extends CameraComponentParams {
    near?: number,
    far?: number,
    fov?: number,
    aspect?: number
}

 export class PerspectiveCamera extends CameraComponent {

    /**
    * @param params
    */
    constructor(params?: PerspectiveCameraParams);

    build(): PerspectiveCameraNative;
}
