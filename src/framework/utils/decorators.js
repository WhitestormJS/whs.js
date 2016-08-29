export const deprecate = (version) => {
  return function (target, name, description) {
      console.warn(`Class WHS.${target.name} is deprecated since v${version}`);
  };
};
