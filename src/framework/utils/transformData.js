import _ from 'lodash';

export const transformData = (object, instructions) => {
  for (let key in instructions) {
    if (_.isArray(object[key])) {
      const tempObject = new Object();

      for (let i = 0, max = instructions[key].length; i < max; i++) {
        const guide = instructions[key][i];

        tempObject[guide] = object[key][i];
      }

      object[key] = tempObject;
    }
  }

  return object;
};
