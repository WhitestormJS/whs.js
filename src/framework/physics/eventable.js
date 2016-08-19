export class Eventable {
  constructor() {
    this._eventListeners = {};
  }

  addEventListener(event_name, callback) {
    if (!this._eventListeners.hasOwnProperty(event_name))
      this._eventListeners[event_name] = [];

    this._eventListeners[event_name].push(callback);
  }

  removeEventListener(event_name, callback) {
    let index;

    if (!this._eventListeners.hasOwnProperty(event_name)) return false;

    if ((index = this._eventListeners[event_name].indexOf(callback)) >= 0) {
      this._eventListeners[event_name].splice(index, 1);
      return true;
    }

    return false;
  }

  dispatchEvent(event_name) {
    let i;
    const parameters = Array.prototype.splice.call(arguments, 1);

    if (this._eventListeners.hasOwnProperty(event_name)) {
      for (i = 0; i < this._eventListeners[event_name].length; i++)
        this._eventListeners[event_name][i].apply(this, parameters);
    }
  }

  static make(obj) {
    obj.prototype.addEventListener = Eventable.prototype.addEventListener;
    obj.prototype.removeEventListener = Eventable.prototype.removeEventListener;
    obj.prototype.dispatchEvent = Eventable.prototype.dispatchEvent;
  }
}
