import * as THREE from 'three';
import {$wrap, $define} from '../utils/ComponentUtils';

function RenderingComponent(target) {
  Object.assign(target.defaults, {
    background: {
      color: 0x000000,
      opacity: 1
    },

    shadowmap: {
      enabled: true,
      type: THREE.PCFSoftShadowMap
    },

    renderer: {}
  });

  $define(target, {

  });

  Object.assign(target.prototype, {

  });

  $wrap(target).onCallConstructor(scope => {
    scope.helper = null;
  });

  $wrap(target).onCallWrap((scope, ...tags) => {
    const _native = scope.native,
      _params = scope.params;
  });
}

export {
  RenderingComponent
};
