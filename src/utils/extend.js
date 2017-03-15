export const extend = (object, ...extensions) => { // $.extend alternative, ... is the spread operator.
  for (const extension of extensions) {
    // console.log(extension);
    // console.log(typeof extension);

    if (!extension)
      continue; // Ignore null and undefined objects and paramaters.

    for (const prop of Object.getOwnPropertyNames(extension)) { // Do not traverse the prototype chain.
      if (object[prop] !== undefined
        && object[prop].toString() === '[object Object]'
        && extension[prop].toString() === '[object Object]') {
        // Goes deep only if object[prop] and extension[prop] are both objects !
        if (extension[prop].uuid) object[prop] = extension[prop];
        else if (Array.isArray(object)) continue;
        else extend(object[prop], extension[prop]);
      } else
        object[prop] = typeof object[prop] === 'undefined' ? extension[prop] : object[prop];

      if (typeof object[prop] === 'undefined') object[prop] = extension[prop]; // Add values that do not already exist.
    }
  }

  return object;
};
