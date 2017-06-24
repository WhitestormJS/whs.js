import {createStore} from 'redux';

const isEqualDefault = (a, b) => {
  if (a === b) return true;
  else if (a && a.equals && a.equals(b)) return true;

  return false;
};

/**
 * @class StateModule
 * @category modules/app
 * @param {Object} [params]
 * @memberof module:modules/app
 * @example <caption> Creating a state module</caption>
 * new App([
 *   // ...
 *   new StateModule().default({
 *     sphereColor: 0xff0000
 *   })
 * ]);
 */
export class StateModule {
  static actionGenerate(isEqual) {
    return (state = [{}, ''], {key, data}) => {
      if (isEqual(state[0][key], data)) return state;

      state[0][key] = data;
      state[1] = key;

      return state;
    };
  }

  constructor(equalCheck = isEqualDefault) {
    this.store = createStore(
      StateModule.actionGenerate(equalCheck)
    );

    this.configuration = {};
    this.currentConfig = 'default';
    this.prevConfig = 'default';
  }

  /**
   * @method default
   * @description Add default configuration.
   * @param {Object} data Configuration setup
   * @memberof module:modules/app.StateModule
   */
  default(data) {
    this.config({default: data});
    return this;
  }

  /**
   * @method setEqualCheck
   * @description Sets an equalCheck function
   * @param {Object} data Configuration setup
   * @memberof module:modules/app.StateModule
   */
  setEqualCheck(func) {
    this.store.replaceReducer(
      StateModule.actionGenerate(func)
    );
  }

  manager(manager) {
    manager.define('state');
  }

  config(configs) {
    for (const key in configs) {
      if (key) {
        this.configuration[key] = key === 'default'
          ? configs[key]
          : Object.assign({}, this.configuration.default, configs[key]);
      }
    }
  }

  update(updates = {}) {
    this.store.subscribe(() => {
      const [data, changedKey] = this.store.getState();
      const callback = updates[changedKey];

      if (callback) callback(data[changedKey]);
    });
  }

  to(configName) {
    this.prevConfig = this.currentConfig;
    this.currentConfig = configName;

    const config = this.configuration[configName]
      ? this.configuration[configName]
      : this.configuration.default;

    this.set(config);
  }

  set(data) {
    for (const key in data)
      if (key) this.store.dispatch({type: 'ADD', key, data: data[key]});
  }

  get(key) {
    return this.store.getState()[0][key];
  }

  prev(config, trueVal, falseVal) {
    if (this.prevConfig === config) return trueVal;
    return falseVal;
  }

  current(config, trueVal, falseVal) {
    if (this.currentConfig === config) return trueVal;
    return falseVal;
  }
}
