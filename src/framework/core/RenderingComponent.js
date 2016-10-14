import * as THREE from 'three';
import {$wrap, $defaults, $extend, $define} from '../utils/ComponentUtils';

function RenderingComponent(target) {
  $defaults(target, {
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
    // TODO
  });

  $extend(target, {

  });

  $wrap(target).onCallConstructor(scope => {
    scope.helper = null;
  });

  $wrap(target).onCallWrap((scope, ...tags) => {
    const _native = scope.native,
      _params = scope.params;
  });

  return target;
}

export {
  RenderingComponent
};
