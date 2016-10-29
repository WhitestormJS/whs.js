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

export const instruct = (object, instruction) => {
  const tempObject = new Object();

  for (let i = 0, max = instruction.length; i < max; i++) {
    const guide = instruction[i];

    tempObject[guide] = object[i];
  }

  return tempObject;
};

export const toArray = (object, instruction) => {
  const tempArray = new Array();

  for (let i = 0, max = instruction.length; i < max; i++) {
    const guide = instruction[i];

    tempArray[i] = object[guide];
  }

  return tempArray;
};
