export const instruct = (array, instArray) => {
  const tempObject = {};

  for (let i = 0, max = instArray.length; i < max; i++) {
    const guide = instArray[i];

    tempObject[guide] = array[i];
  }

  return tempObject;
};

export const transformData = (object, instructions) => {
  for (const key in instructions) {
    if (Array.isArray(object[key]))
      object[key] = instruct(object[key], instructions[key]);
    else if (object[key] instanceof Object && !(Array.isArray(instructions[key])))
      object[key] = transformData(object[key], instructions[key]);
  }

  return object;
};

export const toArray = (object, instruction) => {
  const tempArray = [];

  for (let i = 0, max = instruction.length; i < max; i++) {
    const guide = instruction[i];

    tempArray[i] = object[guide];
  }

  return tempArray;
};
