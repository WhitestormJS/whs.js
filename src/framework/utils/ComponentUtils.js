export function $wrap(target) {
  const _proto = target.prototype || target.__proto__;

  return {
    onCallConstructor(callback) {
      _proto.callConstructor = (function(old) {
        return function(scope) {
          old(scope);
          callback(scope);
        }
      })(_proto.callConstructor);
    },

    onCallWrap(callback) {
      _proto.callWrap = (function(old) {
        return function(scope, ...tags) {
          old(scope, ...tags);
          callback(scope, ...tags);
        }
      })(_proto.callWrap);
    },

    onCallAddTo(callback) {
      _proto.callAddTo = (function(old) {
        return function(scope) {
          old(scope);
          callback(scope);
        }
      })(_proto.callAddTo);
    },

    onCallCopy(callback) {
      _proto.callCopy = (function(old) {
        return function(scope) {
          old(scope);
          callback(scope);
        }
      })(_proto.callCopy);
    }
  };
}

export function $extend(target, obj) {
  const _proto = target.prototype || target.__proto__;
  Object.assign(_proto, obj);
}

export function $define(target, obj) {
  for (let key in obj) {
    const value = obj[key];
    const _proto = target.prototype || target.__proto__;

    value.configurable = true;

    Object.defineProperty(_proto, key, value);
  }
}

export function $defaults(target, obj) {
  const defs = target.defaults || {};
  target.defaults = Object.assign(defs, obj);
}
