import {$wrap} from './ComponentUtils';

export const deprecate = (version) => {
  return function (target, name, descriptor) {
    if (descriptor && typeof descriptor.value === 'function') {
      return {
        writable: descriptor.writable,
        configurable: descriptor.configurable,
        enumerable: descriptor.enumerable,
        value: function depricationWrapper() {
          console.warn(`Method ${name}() is deprecated since v${version}`, [target]);
          return descriptor.value.apply(this, arguments);
        }
      };
    } else {
      $wrap(target).onCallConstructor(() => {
        console.warn(`Class WHS.${target.name} is deprecated since v${version}`, [target]);
      });
    }
  };
};
