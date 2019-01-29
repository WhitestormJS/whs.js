/**
 * @class Loop
 * @category core
 * @param {Function} func function to execute on each animation frame
 * @param {Boolean} [useClock=true] passes a Clock to the function when called, if true
 * @memberof module:core
 */
class Loop {
  constructor(func) {
    this.func = func;
    this.enabled = true;
  }
}

export {
  Loop
};
