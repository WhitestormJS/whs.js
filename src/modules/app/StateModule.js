import {createStore} from 'redux';

const isEqualDefault = (a, b) => {
  if (a === b) return true;
  else if (a && a.equals && a.equals(b)) return true;

  return false;
};

/**
 * @class StateModule
 * @description `StateModule` is useful for apps, where you need state manipulation.
 * This can be: _transitions between screens, games, development moments_.
 * You can check [basic/state](https://whs-dev.surge.sh/examples/?basic/state) example.
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
   * @example
   * new WHS.StateModule().default({
   *   sphereColor: UTILS.$colors.mesh,
   *   planeColor: 0x447F8B
   * })
   */
  default(data) {
    this.config({default: data});
    return this;
  }

  /**
   * @method setEqualCheck
   * @description Sets an equalCheck function
   * @param {Function} func function to generate equal check
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

  /**
   * @method config
   * @description Load configurations from object.
   * @param {Object} configs Configuration data
   * @memberof module:modules/app.StateModule
   * @example <caption> Adding `green` configuration</caption>
   * state.config({
   *   green: {
   *     sphereColor: 0x00ff00,
   *     planeColor: 0x00ff00
   *   }
   * });
   */
  config(configs) {
    for (const key in configs) {
      if (key) {
        this.configuration[key] = key === 'default'
          ? configs[key]
          : Object.assign({}, this.configuration.default, configs[key]);
      }
    }
  }

  /**
   * @method update
   * @description Load updates from object.
   * @param {Object} updates Updates data
   * @memberof module:modules/app.StateModule
   * @example <caption> Update callback for `sphereColor`</caption>
   * state.update({
   *   sphereColor: color => sphere.material.color.setHex(color)
   * });
   */
  update(updates = {}) {
    this.store.subscribe(() => {
      const [data, changedKey] = this.store.getState();
      const callback = updates[changedKey];

      if (callback) callback(data[changedKey]);
    });
  }

  /**
   * @method to
   * @description Switch to configuration.
   * @param {String} configName Configuration name.
   * @memberof module:modules/app.StateModule
   * @example <caption> Changes configuration to `green`</caption>
   * state.to('green');
   */
  to(configName) {
    this.prevConfig = this.currentConfig;
    this.currentConfig = configName;

    const config = this.configuration[configName]
      ? this.configuration[configName]
      : this.configuration.default;

    this.set(config);
  }

  /**
   * @method set
   * @description Set current parameters.
   * @param {Object} data Configuration parameters.
   * @memberof module:modules/app.StateModule
   * @example
   * state.set({
   *   sphereColor: 0x00ff00
   * });
   */
  set(data) {
    for (const key in data)
      if (key) this.store.dispatch({type: 'ADD', key, data: data[key]});
  }

  /**
   * @method get
   * @description Return data of parameter.
   * @param {String} key Parameter name.
   * @memberof module:modules/app.StateModule
   * @example
   * state.get('sphereColor'); // 0x00ff00
   */
  get(key) {
    return this.store.getState()[0][key];
  }

  /**
   * @method prev
   * @description Return `trueVal` if `config` match previous configuration, in other case - return `falseVal`.
   * @param {String} config Configuration name.
   * @param {Any} trueVal Value returned if condition is truthy.
   * @param {Any} falseVal Value returned if condition is falsy.
   * @memberof module:modules/app.StateModule
   */
  prev(config, trueVal, falseVal) {
    return this.prevConfig === config ? trueVal : falseVal;
  }

  /**
   * @method current
   * @description Return `trueVal` if `config` match current configuration, in other case - return `falseVal`.
   * @param {String} config Configuration name.
   * @param {Any} trueVal Value returned if condition is truthy.
   * @param {Any} falseVal Value returned if condition is falsy.
   * @memberof module:modules/app.StateModule
   */
  current(config, trueVal, falseVal) {
    return this.currentConfig === config ? trueVal : falseVal;
  }
}
