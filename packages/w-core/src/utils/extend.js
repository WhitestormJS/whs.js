export const extend = (object, ...extensions) => { // $.extend alternative, ... is the spread operator.
  for (const extension of extensions) {
    // console.log(extension);
    // console.log(typeof extension);

    if (!extension)
      continue; // Ignore null and undefined objects and parameters.

    for (const prop of Object.getOwnPropertyNames(extension)) { // Do not traverse the prototype chain.
      if (object[prop] !== undefined && extension[prop]
        && object[prop].toString() === '[object Object]'
        && extension[prop].toString() === '[object Object]') {
        // Goes deep only if object[prop] and extension[prop] are both objects !
        if (object[prop].constructor === Object) extend(object[prop], extension[prop]);
      } else
        object[prop] = typeof object[prop] === 'undefined' ? extension[prop] : object[prop];

      if (typeof object[prop] === 'undefined' && Array.isArray(extension[prop])) object[prop] = extension[prop].slice(); // Add values that do not already exist.
      else if (typeof object[prop] === 'undefined' && Array.isArray(extension[prop])) object[prop] = extension[prop];
    }
  }

  return object;
};
