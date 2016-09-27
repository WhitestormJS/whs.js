export function $wrap(target) {
  return {
    onCallConstructor(callback) {
      target.prototype.callConstructor = (function(old) {
        return function(scope) {
          old(scope);
          callback(scope);
        }
      })(target.prototype.callConstructor);
    },

    onCallWrap(callback) {
      target.prototype.callWrap = (function(old) {
        return function(scope, ...tags) {
          old(scope, ...tags);
          callback(scope, ...tags);
        }
      })(target.prototype.callWrap);
    },

    onCallAddTo(callback) {
      target.prototype.callAddTo = (function(old) {
        return function(scope) {
          old(scope);
          callback(scope);
        }
      })(target.prototype.callAddTo);
    },

    onCallCopy(callback) {
      target.prototype.callCopy = (function(old) {
        return function(scope) {
          old(scope);
          callback(scope);
        }
      })(target.prototype.callCopy);
    }
  };

}

export function $define(target, obj) {
  for (let key in obj) {
    const value = obj[key];
    value.configurable = true;

    Object.defineProperty(target.prototype, key, value);
  }
}
