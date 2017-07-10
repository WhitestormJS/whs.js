/* Built for whs v2.1.3 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('three')) :
	typeof define === 'function' && define.amd ? define(['three'], factory) :
	(global.DatGUIModule = factory(global.THREE));
}(this, (function (three) { 'use strict';

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var dat_gui = createCommonjsModule(function (module) {
/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

/** @namespace */
var dat = module.exports = dat || {};

/** @namespace */
dat.gui = dat.gui || {};

/** @namespace */
dat.utils = dat.utils || {};

/** @namespace */
dat.controllers = dat.controllers || {};

/** @namespace */
dat.dom = dat.dom || {};

/** @namespace */
dat.color = dat.color || {};

dat.utils.css = (function () {
  return {
    load: function (url, doc) {
      doc = doc || document;
      var link = doc.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = url;
      doc.getElementsByTagName('head')[0].appendChild(link);
    },
    inject: function(css, doc) {
      doc = doc || document;
      var injected = document.createElement('style');
      injected.type = 'text/css';
      injected.innerHTML = css;
      doc.getElementsByTagName('head')[0].appendChild(injected);
    }
  }
})();


dat.utils.common = (function () {
  
  var ARR_EACH = Array.prototype.forEach;
  var ARR_SLICE = Array.prototype.slice;

  /**
   * Band-aid methods for things that should be a lot easier in JavaScript.
   * Implementation and structure inspired by underscore.js
   * http://documentcloud.github.com/underscore/
   */

  return { 
    
    BREAK: {},
  
    extend: function(target) {
      
      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
        
        for (var key in obj)
          if (!this.isUndefined(obj[key])) 
            target[key] = obj[key];
        
      }, this);
      
      return target;
      
    },
    
    defaults: function(target) {
      
      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
        
        for (var key in obj)
          if (this.isUndefined(target[key])) 
            target[key] = obj[key];
        
      }, this);
      
      return target;
    
    },
    
    compose: function() {
      var toCall = ARR_SLICE.call(arguments);
            return function() {
              var args = ARR_SLICE.call(arguments);
              for (var i = toCall.length -1; i >= 0; i--) {
                args = [toCall[i].apply(this, args)];
              }
              return args[0];
            }
    },
    
    each: function(obj, itr, scope) {

      
      if (ARR_EACH && obj.forEach === ARR_EACH) { 
        
        obj.forEach(itr, scope);
        
      } else if (obj.length === obj.length + 0) { // Is number but not NaN
        
        for (var key = 0, l = obj.length; key < l; key++)
          if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) 
            return;
            
      } else {

        for (var key in obj) 
          if (itr.call(scope, obj[key], key) === this.BREAK)
            return;
            
      }
            
    },
    
    defer: function(fnc) {
      setTimeout(fnc, 0);
    },
    
    toArray: function(obj) {
      if (obj.toArray) return obj.toArray();
      return ARR_SLICE.call(obj);
    },

    isUndefined: function(obj) {
      return obj === undefined;
    },
    
    isNull: function(obj) {
      return obj === null;
    },
    
    isNaN: function(obj) {
      return obj !== obj;
    },
    
    isArray: Array.isArray || function(obj) {
      return obj.constructor === Array;
    },
    
    isObject: function(obj) {
      return obj === Object(obj);
    },
    
    isNumber: function(obj) {
      return obj === obj+0;
    },
    
    isString: function(obj) {
      return obj === obj+'';
    },
    
    isBoolean: function(obj) {
      return obj === false || obj === true;
    },
    
    isFunction: function(obj) {
      return Object.prototype.toString.call(obj) === '[object Function]';
    }
  
  };
    
})();


dat.controllers.Controller = (function (common) {

  /**
   * @class An "abstract" class that represents a given property of an object.
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   *
   * @member dat.controllers
   */
  var Controller = function(object, property) {

    this.initialValue = object[property];

    /**
     * Those who extend this class will put their DOM elements in here.
     * @type {DOMElement}
     */
    this.domElement = document.createElement('div');

    /**
     * The object to manipulate
     * @type {Object}
     */
    this.object = object;

    /**
     * The name of the property to manipulate
     * @type {String}
     */
    this.property = property;

    /**
     * The function to be called on change.
     * @type {Function}
     * @ignore
     */
    this.__onChange = undefined;

    /**
     * The function to be called on finishing change.
     * @type {Function}
     * @ignore
     */
    this.__onFinishChange = undefined;

  };

  common.extend(

      Controller.prototype,

      /** @lends dat.controllers.Controller.prototype */
      {

        /**
         * Specify that a function fire every time someone changes the value with
         * this Controller.
         *
         * @param {Function} fnc This function will be called whenever the value
         * is modified via this Controller.
         * @returns {dat.controllers.Controller} this
         */
        onChange: function(fnc) {
          this.__onChange = fnc;
          return this;
        },

        /**
         * Specify that a function fire every time someone "finishes" changing
         * the value wih this Controller. Useful for values that change
         * incrementally like numbers or strings.
         *
         * @param {Function} fnc This function will be called whenever
         * someone "finishes" changing the value via this Controller.
         * @returns {dat.controllers.Controller} this
         */
        onFinishChange: function(fnc) {
          this.__onFinishChange = fnc;
          return this;
        },

        /**
         * Change the value of <code>object[property]</code>
         *
         * @param {Object} newValue The new value of <code>object[property]</code>
         */
        setValue: function(newValue) {
          this.object[this.property] = newValue;
          if (this.__onChange) {
            this.__onChange.call(this, newValue);
          }
          this.updateDisplay();
          return this;
        },

        /**
         * Gets the value of <code>object[property]</code>
         *
         * @returns {Object} The current value of <code>object[property]</code>
         */
        getValue: function() {
          return this.object[this.property];
        },

        /**
         * Refreshes the visual display of a Controller in order to keep sync
         * with the object's current value.
         * @returns {dat.controllers.Controller} this
         */
        updateDisplay: function() {
          return this;
        },

        /**
         * @returns {Boolean} true if the value has deviated from initialValue
         */
        isModified: function() {
          return this.initialValue !== this.getValue()
        }

      }

  );

  return Controller;


})(dat.utils.common);


dat.dom.dom = (function (common) {

  var EVENT_MAP = {
    'HTMLEvents': ['change'],
    'MouseEvents': ['click','mousemove','mousedown','mouseup', 'mouseover'],
    'KeyboardEvents': ['keydown']
  };

  var EVENT_MAP_INV = {};
  common.each(EVENT_MAP, function(v, k) {
    common.each(v, function(e) {
      EVENT_MAP_INV[e] = k;
    });
  });

  var CSS_VALUE_PIXELS = /(\d+(\.\d+)?)px/;

  function cssValueToPixels(val) {

    if (val === '0' || common.isUndefined(val)) return 0;

    var match = val.match(CSS_VALUE_PIXELS);

    if (!common.isNull(match)) {
      return parseFloat(match[1]);
    }

    // TODO ...ems? %?

    return 0;

  }

  /**
   * @namespace
   * @member dat.dom
   */
  var dom = {

    /**
     * 
     * @param elem
     * @param selectable
     */
    makeSelectable: function(elem, selectable) {

      if (elem === undefined || elem.style === undefined) return;

      elem.onselectstart = selectable ? function() {
        return false;
      } : function() {
      };

      elem.style.MozUserSelect = selectable ? 'auto' : 'none';
      elem.style.KhtmlUserSelect = selectable ? 'auto' : 'none';
      elem.unselectable = selectable ? 'on' : 'off';

    },

    /**
     *
     * @param elem
     * @param horizontal
     * @param vertical
     */
    makeFullscreen: function(elem, horizontal, vertical) {

      if (common.isUndefined(horizontal)) horizontal = true;
      if (common.isUndefined(vertical)) vertical = true;

      elem.style.position = 'absolute';

      if (horizontal) {
        elem.style.left = 0;
        elem.style.right = 0;
      }
      if (vertical) {
        elem.style.top = 0;
        elem.style.bottom = 0;
      }

    },

    /**
     *
     * @param elem
     * @param eventType
     * @param params
     */
    fakeEvent: function(elem, eventType, params, aux) {
      params = params || {};
      var className = EVENT_MAP_INV[eventType];
      if (!className) {
        throw new Error('Event type ' + eventType + ' not supported.');
      }
      var evt = document.createEvent(className);
      switch (className) {
        case 'MouseEvents':
          var clientX = params.x || params.clientX || 0;
          var clientY = params.y || params.clientY || 0;
          evt.initMouseEvent(eventType, params.bubbles || false,
              params.cancelable || true, window, params.clickCount || 1,
              0, //screen X
              0, //screen Y
              clientX, //client X
              clientY, //client Y
              false, false, false, false, 0, null);
          break;
        case 'KeyboardEvents':
          var init = evt.initKeyboardEvent || evt.initKeyEvent; // webkit || moz
          common.defaults(params, {
            cancelable: true,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            keyCode: undefined,
            charCode: undefined
          });
          init(eventType, params.bubbles || false,
              params.cancelable, window,
              params.ctrlKey, params.altKey,
              params.shiftKey, params.metaKey,
              params.keyCode, params.charCode);
          break;
        default:
          evt.initEvent(eventType, params.bubbles || false,
              params.cancelable || true);
          break;
      }
      common.defaults(evt, aux);
      elem.dispatchEvent(evt);
    },

    /**
     *
     * @param elem
     * @param event
     * @param func
     * @param bool
     */
    bind: function(elem, event, func, bool) {
      bool = bool || false;
      if (elem.addEventListener)
        elem.addEventListener(event, func, bool);
      else if (elem.attachEvent)
        elem.attachEvent('on' + event, func);
      return dom;
    },

    /**
     *
     * @param elem
     * @param event
     * @param func
     * @param bool
     */
    unbind: function(elem, event, func, bool) {
      bool = bool || false;
      if (elem.removeEventListener)
        elem.removeEventListener(event, func, bool);
      else if (elem.detachEvent)
        elem.detachEvent('on' + event, func);
      return dom;
    },

    /**
     *
     * @param elem
     * @param className
     */
    addClass: function(elem, className) {
      if (elem.className === undefined) {
        elem.className = className;
      } else if (elem.className !== className) {
        var classes = elem.className.split(/ +/);
        if (classes.indexOf(className) == -1) {
          classes.push(className);
          elem.className = classes.join(' ').replace(/^\s+/, '').replace(/\s+$/, '');
        }
      }
      return dom;
    },

    /**
     *
     * @param elem
     * @param className
     */
    removeClass: function(elem, className) {
      if (className) {
        if (elem.className === undefined) {
          // elem.className = className;
        } else if (elem.className === className) {
          elem.removeAttribute('class');
        } else {
          var classes = elem.className.split(/ +/);
          var index = classes.indexOf(className);
          if (index != -1) {
            classes.splice(index, 1);
            elem.className = classes.join(' ');
          }
        }
      } else {
        elem.className = undefined;
      }
      return dom;
    },

    hasClass: function(elem, className) {
      return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(elem.className) || false;
    },

    /**
     *
     * @param elem
     */
    getWidth: function(elem) {

      var style = getComputedStyle(elem);

      return cssValueToPixels(style['border-left-width']) +
          cssValueToPixels(style['border-right-width']) +
          cssValueToPixels(style['padding-left']) +
          cssValueToPixels(style['padding-right']) +
          cssValueToPixels(style['width']);
    },

    /**
     *
     * @param elem
     */
    getHeight: function(elem) {

      var style = getComputedStyle(elem);

      return cssValueToPixels(style['border-top-width']) +
          cssValueToPixels(style['border-bottom-width']) +
          cssValueToPixels(style['padding-top']) +
          cssValueToPixels(style['padding-bottom']) +
          cssValueToPixels(style['height']);
    },

    /**
     *
     * @param elem
     */
    getOffset: function(elem) {
      var offset = {left: 0, top:0};
      if (elem.offsetParent) {
        do {
          offset.left += elem.offsetLeft;
          offset.top += elem.offsetTop;
        } while (elem = elem.offsetParent);
      }
      return offset;
    },

    // http://stackoverflow.com/posts/2684561/revisions
    /**
     * 
     * @param elem
     */
    isActive: function(elem) {
      return elem === document.activeElement && ( elem.type || elem.href );
    }

  };

  return dom;

})(dat.utils.common);


dat.controllers.OptionController = (function (Controller, dom, common) {

  /**
   * @class Provides a select input to alter the property of an object, using a
   * list of accepted values.
   *
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   * @param {Object|string[]} options A map of labels to acceptable values, or
   * a list of acceptable string values.
   *
   * @member dat.controllers
   */
  var OptionController = function(object, property, options) {

    OptionController.superclass.call(this, object, property);

    var _this = this;

    /**
     * The drop down menu
     * @ignore
     */
    this.__select = document.createElement('select');

    if (common.isArray(options)) {
      var map = {};
      common.each(options, function(element) {
        map[element] = element;
      });
      options = map;
    }

    common.each(options, function(value, key) {

      var opt = document.createElement('option');
      opt.innerHTML = key;
      opt.setAttribute('value', value);
      _this.__select.appendChild(opt);

    });

    // Acknowledge original value
    this.updateDisplay();

    dom.bind(this.__select, 'change', function() {
      var desiredValue = this.options[this.selectedIndex].value;
      _this.setValue(desiredValue);
    });

    this.domElement.appendChild(this.__select);

  };

  OptionController.superclass = Controller;

  common.extend(

      OptionController.prototype,
      Controller.prototype,

      {

        setValue: function(v) {
          var toReturn = OptionController.superclass.prototype.setValue.call(this, v);
          if (this.__onFinishChange) {
            this.__onFinishChange.call(this, this.getValue());
          }
          return toReturn;
        },

        updateDisplay: function() {
          this.__select.value = this.getValue();
          return OptionController.superclass.prototype.updateDisplay.call(this);
        }

      }

  );

  return OptionController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.utils.common);


dat.controllers.NumberController = (function (Controller, common) {

  /**
   * @class Represents a given property of an object that is a number.
   *
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   * @param {Object} [params] Optional parameters
   * @param {Number} [params.min] Minimum allowed value
   * @param {Number} [params.max] Maximum allowed value
   * @param {Number} [params.step] Increment by which to change value
   *
   * @member dat.controllers
   */
  var NumberController = function(object, property, params) {

    NumberController.superclass.call(this, object, property);

    params = params || {};

    this.__min = params.min;
    this.__max = params.max;
    this.__step = params.step;

    if (common.isUndefined(this.__step)) {

      if (this.initialValue == 0) {
        this.__impliedStep = 1; // What are we, psychics?
      } else {
        // Hey Doug, check this out.
        this.__impliedStep = Math.pow(10, Math.floor(Math.log(this.initialValue)/Math.LN10))/10;
      }

    } else {

      this.__impliedStep = this.__step;

    }

    this.__precision = numDecimals(this.__impliedStep);


  };

  NumberController.superclass = Controller;

  common.extend(

      NumberController.prototype,
      Controller.prototype,

      /** @lends dat.controllers.NumberController.prototype */
      {

        setValue: function(v) {

          if (this.__min !== undefined && v < this.__min) {
            v = this.__min;
          } else if (this.__max !== undefined && v > this.__max) {
            v = this.__max;
          }

          if (this.__step !== undefined && v % this.__step != 0) {
            v = Math.round(v / this.__step) * this.__step;
          }

          return NumberController.superclass.prototype.setValue.call(this, v);

        },

        /**
         * Specify a minimum value for <code>object[property]</code>.
         *
         * @param {Number} minValue The minimum value for
         * <code>object[property]</code>
         * @returns {dat.controllers.NumberController} this
         */
        min: function(v) {
          this.__min = v;
          return this;
        },

        /**
         * Specify a maximum value for <code>object[property]</code>.
         *
         * @param {Number} maxValue The maximum value for
         * <code>object[property]</code>
         * @returns {dat.controllers.NumberController} this
         */
        max: function(v) {
          this.__max = v;
          return this;
        },

        /**
         * Specify a step value that dat.controllers.NumberController
         * increments by.
         *
         * @param {Number} stepValue The step value for
         * dat.controllers.NumberController
         * @default if minimum and maximum specified increment is 1% of the
         * difference otherwise stepValue is 1
         * @returns {dat.controllers.NumberController} this
         */
        step: function(v) {
          this.__step = v;
          return this;
        }

      }

  );

  function numDecimals(x) {
    x = x.toString();
    if (x.indexOf('.') > -1) {
      return x.length - x.indexOf('.') - 1;
    } else {
      return 0;
    }
  }

  return NumberController;

})(dat.controllers.Controller,
dat.utils.common);


dat.controllers.NumberControllerBox = (function (NumberController, dom, common) {

  /**
   * @class Represents a given property of an object that is a number and
   * provides an input element with which to manipulate it.
   *
   * @extends dat.controllers.Controller
   * @extends dat.controllers.NumberController
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   * @param {Object} [params] Optional parameters
   * @param {Number} [params.min] Minimum allowed value
   * @param {Number} [params.max] Maximum allowed value
   * @param {Number} [params.step] Increment by which to change value
   *
   * @member dat.controllers
   */
  var NumberControllerBox = function(object, property, params) {

    this.__truncationSuspended = false;

    NumberControllerBox.superclass.call(this, object, property, params);

    var _this = this;

    /**
     * {Number} Previous mouse y position
     * @ignore
     */
    var prev_y;

    this.__input = document.createElement('input');
    this.__input.setAttribute('type', 'text');

    // Makes it so manually specified values are not truncated.

    dom.bind(this.__input, 'change', onChange);
    dom.bind(this.__input, 'blur', onBlur);
    dom.bind(this.__input, 'mousedown', onMouseDown);
    dom.bind(this.__input, 'keydown', function(e) {

      // When pressing entire, you can be as precise as you want.
      if (e.keyCode === 13) {
        _this.__truncationSuspended = true;
        this.blur();
        _this.__truncationSuspended = false;
      }

    });

    function onChange() {
      var attempted = parseFloat(_this.__input.value);
      if (!common.isNaN(attempted)) _this.setValue(attempted);
    }

    function onBlur() {
      onChange();
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    function onMouseDown(e) {
      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);
      prev_y = e.clientY;
    }

    function onMouseDrag(e) {

      var diff = prev_y - e.clientY;
      _this.setValue(_this.getValue() + diff * _this.__impliedStep);

      prev_y = e.clientY;

    }

    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
    }

    this.updateDisplay();

    this.domElement.appendChild(this.__input);

  };

  NumberControllerBox.superclass = NumberController;

  common.extend(

      NumberControllerBox.prototype,
      NumberController.prototype,

      {

        updateDisplay: function() {

          this.__input.value = this.__truncationSuspended ? this.getValue() : roundToDecimal(this.getValue(), this.__precision);
          return NumberControllerBox.superclass.prototype.updateDisplay.call(this);
        }

      }

  );

  function roundToDecimal(value, decimals) {
    var tenTo = Math.pow(10, decimals);
    return Math.round(value * tenTo) / tenTo;
  }

  return NumberControllerBox;

})(dat.controllers.NumberController,
dat.dom.dom,
dat.utils.common);


dat.controllers.NumberControllerSlider = (function (NumberController, dom, css, common, styleSheet) {

  /**
   * @class Represents a given property of an object that is a number, contains
   * a minimum and maximum, and provides a slider element with which to
   * manipulate it. It should be noted that the slider element is made up of
   * <code>&lt;div&gt;</code> tags, <strong>not</strong> the html5
   * <code>&lt;slider&gt;</code> element.
   *
   * @extends dat.controllers.Controller
   * @extends dat.controllers.NumberController
   * 
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   * @param {Number} minValue Minimum allowed value
   * @param {Number} maxValue Maximum allowed value
   * @param {Number} stepValue Increment by which to change value
   *
   * @member dat.controllers
   */
  var NumberControllerSlider = function(object, property, min, max, step) {

    NumberControllerSlider.superclass.call(this, object, property, { min: min, max: max, step: step });

    var _this = this;

    this.__background = document.createElement('div');
    this.__foreground = document.createElement('div');
    


    dom.bind(this.__background, 'mousedown', onMouseDown);
    
    dom.addClass(this.__background, 'slider');
    dom.addClass(this.__foreground, 'slider-fg');

    function onMouseDown(e) {

      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);

      onMouseDrag(e);
    }

    function onMouseDrag(e) {

      e.preventDefault();

      var offset = dom.getOffset(_this.__background);
      var width = dom.getWidth(_this.__background);
      
      _this.setValue(
        map(e.clientX, offset.left, offset.left + width, _this.__min, _this.__max)
      );

      return false;

    }

    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    this.updateDisplay();

    this.__background.appendChild(this.__foreground);
    this.domElement.appendChild(this.__background);

  };

  NumberControllerSlider.superclass = NumberController;

  /**
   * Injects default stylesheet for slider elements.
   */
  NumberControllerSlider.useDefaultStyles = function() {
    css.inject(styleSheet);
  };

  common.extend(

      NumberControllerSlider.prototype,
      NumberController.prototype,

      {

        updateDisplay: function() {
          var pct = (this.getValue() - this.__min)/(this.__max - this.__min);
          this.__foreground.style.width = pct*100+'%';
          return NumberControllerSlider.superclass.prototype.updateDisplay.call(this);
        }

      }



  );

  function map(v, i1, i2, o1, o2) {
    return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
  }

  return NumberControllerSlider;
  
})(dat.controllers.NumberController,
dat.dom.dom,
dat.utils.css,
dat.utils.common,
".slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 1em;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: '';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}");


dat.controllers.FunctionController = (function (Controller, dom, common) {

  /**
   * @class Provides a GUI interface to fire a specified method, a property of an object.
   *
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   *
   * @member dat.controllers
   */
  var FunctionController = function(object, property, text) {

    FunctionController.superclass.call(this, object, property);

    var _this = this;

    this.__button = document.createElement('div');
    this.__button.innerHTML = text === undefined ? 'Fire' : text;
    dom.bind(this.__button, 'click', function(e) {
      e.preventDefault();
      _this.fire();
      return false;
    });

    dom.addClass(this.__button, 'button');

    this.domElement.appendChild(this.__button);


  };

  FunctionController.superclass = Controller;

  common.extend(

      FunctionController.prototype,
      Controller.prototype,
      {
        
        fire: function() {
          if (this.__onChange) {
            this.__onChange.call(this);
          }
          if (this.__onFinishChange) {
            this.__onFinishChange.call(this, this.getValue());
          }
          this.getValue().call(this.object);
        }
      }

  );

  return FunctionController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.utils.common);


dat.controllers.BooleanController = (function (Controller, dom, common) {

  /**
   * @class Provides a checkbox input to alter the boolean property of an object.
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   *
   * @member dat.controllers
   */
  var BooleanController = function(object, property) {

    BooleanController.superclass.call(this, object, property);

    var _this = this;
    this.__prev = this.getValue();

    this.__checkbox = document.createElement('input');
    this.__checkbox.setAttribute('type', 'checkbox');


    dom.bind(this.__checkbox, 'change', onChange, false);

    this.domElement.appendChild(this.__checkbox);

    // Match original value
    this.updateDisplay();

    function onChange() {
      _this.setValue(!_this.__prev);
    }

  };

  BooleanController.superclass = Controller;

  common.extend(

      BooleanController.prototype,
      Controller.prototype,

      {

        setValue: function(v) {
          var toReturn = BooleanController.superclass.prototype.setValue.call(this, v);
          if (this.__onFinishChange) {
            this.__onFinishChange.call(this, this.getValue());
          }
          this.__prev = this.getValue();
          return toReturn;
        },

        updateDisplay: function() {
          
          if (this.getValue() === true) {
            this.__checkbox.setAttribute('checked', 'checked');
            this.__checkbox.checked = true;    
          } else {
              this.__checkbox.checked = false;
          }

          return BooleanController.superclass.prototype.updateDisplay.call(this);

        }


      }

  );

  return BooleanController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.utils.common);


dat.color.toString = (function (common) {

  return function(color) {

    if (color.a == 1 || common.isUndefined(color.a)) {

      var s = color.hex.toString(16);
      while (s.length < 6) {
        s = '0' + s;
      }

      return '#' + s;

    } else {

      return 'rgba(' + Math.round(color.r) + ',' + Math.round(color.g) + ',' + Math.round(color.b) + ',' + color.a + ')';

    }

  }

})(dat.utils.common);


dat.color.interpret = (function (toString, common) {

  var result, toReturn;

  var interpret = function() {

    toReturn = false;

    var original = arguments.length > 1 ? common.toArray(arguments) : arguments[0];

    common.each(INTERPRETATIONS, function(family) {

      if (family.litmus(original)) {

        common.each(family.conversions, function(conversion, conversionName) {

          result = conversion.read(original);

          if (toReturn === false && result !== false) {
            toReturn = result;
            result.conversionName = conversionName;
            result.conversion = conversion;
            return common.BREAK;

          }

        });

        return common.BREAK;

      }

    });

    return toReturn;

  };

  var INTERPRETATIONS = [

    // Strings
    {

      litmus: common.isString,

      conversions: {

        THREE_CHAR_HEX: {

          read: function(original) {

            var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
            if (test === null) return false;

            return {
              space: 'HEX',
              hex: parseInt(
                  '0x' +
                      test[1].toString() + test[1].toString() +
                      test[2].toString() + test[2].toString() +
                      test[3].toString() + test[3].toString())
            };

          },

          write: toString

        },

        SIX_CHAR_HEX: {

          read: function(original) {

            var test = original.match(/^#([A-F0-9]{6})$/i);
            if (test === null) return false;

            return {
              space: 'HEX',
              hex: parseInt('0x' + test[1].toString())
            };

          },

          write: toString

        },

        CSS_RGB: {

          read: function(original) {

            var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
            if (test === null) return false;

            return {
              space: 'RGB',
              r: parseFloat(test[1]),
              g: parseFloat(test[2]),
              b: parseFloat(test[3])
            };

          },

          write: toString

        },

        CSS_RGBA: {

          read: function(original) {

            var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
            if (test === null) return false;

            return {
              space: 'RGB',
              r: parseFloat(test[1]),
              g: parseFloat(test[2]),
              b: parseFloat(test[3]),
              a: parseFloat(test[4])
            };

          },

          write: toString

        }

      }

    },

    // Numbers
    {

      litmus: common.isNumber,

      conversions: {

        HEX: {
          read: function(original) {
            return {
              space: 'HEX',
              hex: original,
              conversionName: 'HEX'
            }
          },

          write: function(color) {
            return color.hex;
          }
        }

      }

    },

    // Arrays
    {

      litmus: common.isArray,

      conversions: {

        RGB_ARRAY: {
          read: function(original) {
            if (original.length != 3) return false;
            return {
              space: 'RGB',
              r: original[0],
              g: original[1],
              b: original[2]
            };
          },

          write: function(color) {
            return [color.r, color.g, color.b];
          }

        },

        RGBA_ARRAY: {
          read: function(original) {
            if (original.length != 4) return false;
            return {
              space: 'RGB',
              r: original[0],
              g: original[1],
              b: original[2],
              a: original[3]
            };
          },

          write: function(color) {
            return [color.r, color.g, color.b, color.a];
          }

        }

      }

    },

    // Objects
    {

      litmus: common.isObject,

      conversions: {

        RGBA_OBJ: {
          read: function(original) {
            if (common.isNumber(original.r) &&
                common.isNumber(original.g) &&
                common.isNumber(original.b) &&
                common.isNumber(original.a)) {
              return {
                space: 'RGB',
                r: original.r,
                g: original.g,
                b: original.b,
                a: original.a
              }
            }
            return false;
          },

          write: function(color) {
            return {
              r: color.r,
              g: color.g,
              b: color.b,
              a: color.a
            }
          }
        },

        RGB_OBJ: {
          read: function(original) {
            if (common.isNumber(original.r) &&
                common.isNumber(original.g) &&
                common.isNumber(original.b)) {
              return {
                space: 'RGB',
                r: original.r,
                g: original.g,
                b: original.b
              }
            }
            return false;
          },

          write: function(color) {
            return {
              r: color.r,
              g: color.g,
              b: color.b
            }
          }
        },

        HSVA_OBJ: {
          read: function(original) {
            if (common.isNumber(original.h) &&
                common.isNumber(original.s) &&
                common.isNumber(original.v) &&
                common.isNumber(original.a)) {
              return {
                space: 'HSV',
                h: original.h,
                s: original.s,
                v: original.v,
                a: original.a
              }
            }
            return false;
          },

          write: function(color) {
            return {
              h: color.h,
              s: color.s,
              v: color.v,
              a: color.a
            }
          }
        },

        HSV_OBJ: {
          read: function(original) {
            if (common.isNumber(original.h) &&
                common.isNumber(original.s) &&
                common.isNumber(original.v)) {
              return {
                space: 'HSV',
                h: original.h,
                s: original.s,
                v: original.v
              }
            }
            return false;
          },

          write: function(color) {
            return {
              h: color.h,
              s: color.s,
              v: color.v
            }
          }

        }

      }

    }


  ];

  return interpret;


})(dat.color.toString,
dat.utils.common);


dat.GUI = dat.gui.GUI = (function (css, saveDialogueContents, styleSheet, controllerFactory, Controller, BooleanController, FunctionController, NumberControllerBox, NumberControllerSlider, OptionController, ColorController, requestAnimationFrame, CenteredDiv, dom, common) {

  css.inject(styleSheet);

  /** Outer-most className for GUI's */
  var CSS_NAMESPACE = 'dg';

  var HIDE_KEY_CODE = 72;

  /** The only value shared between the JS and SCSS. Use caution. */
  var CLOSE_BUTTON_HEIGHT = 20;

  var DEFAULT_DEFAULT_PRESET_NAME = 'Default';

  var SUPPORTS_LOCAL_STORAGE = (function() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  })();

  var SAVE_DIALOGUE;

  /** Have we yet to create an autoPlace GUI? */
  var auto_place_virgin = true;

  /** Fixed position div that auto place GUI's go inside */
  var auto_place_container;

  /** Are we hiding the GUI's ? */
  var hide = false;

  /** GUI's which should be hidden */
  var hideable_guis = [];

  /**
   * A lightweight controller library for JavaScript. It allows you to easily
   * manipulate variables and fire functions on the fly.
   * @class
   *
   * @member dat.gui
   *
   * @param {Object} [params]
   * @param {String} [params.name] The name of this GUI.
   * @param {Object} [params.load] JSON object representing the saved state of
   * this GUI.
   * @param {Boolean} [params.auto=true]
   * @param {dat.gui.GUI} [params.parent] The GUI I'm nested in.
   * @param {Boolean} [params.closed] If true, starts closed
   */
  var GUI = function(params) {

    var _this = this;

    /**
     * Outermost DOM Element
     * @type DOMElement
     */
    this.domElement = document.createElement('div');
    this.__ul = document.createElement('ul');
    this.domElement.appendChild(this.__ul);

    dom.addClass(this.domElement, CSS_NAMESPACE);

    /**
     * Nested GUI's by name
     * @ignore
     */
    this.__folders = {};

    this.__controllers = [];

    /**
     * List of objects I'm remembering for save, only used in top level GUI
     * @ignore
     */
    this.__rememberedObjects = [];

    /**
     * Maps the index of remembered objects to a map of controllers, only used
     * in top level GUI.
     *
     * @private
     * @ignore
     *
     * @example
     * [
     *  {
     *    propertyName: Controller,
     *    anotherPropertyName: Controller
     *  },
     *  {
     *    propertyName: Controller
     *  }
     * ]
     */
    this.__rememberedObjectIndecesToControllers = [];

    this.__listening = [];

    params = params || {};

    // Default parameters
    params = common.defaults(params, {
      autoPlace: true,
      width: GUI.DEFAULT_WIDTH
    });

    params = common.defaults(params, {
      resizable: params.autoPlace,
      hideable: params.autoPlace
    });


    if (!common.isUndefined(params.load)) {

      // Explicit preset
      if (params.preset) params.load.preset = params.preset;

    } else {

      params.load = { preset: DEFAULT_DEFAULT_PRESET_NAME };

    }

    if (common.isUndefined(params.parent) && params.hideable) {
      hideable_guis.push(this);
    }

    // Only root level GUI's are resizable.
    params.resizable = common.isUndefined(params.parent) && params.resizable;


    if (params.autoPlace && common.isUndefined(params.scrollable)) {
      params.scrollable = true;
    }
//    params.scrollable = common.isUndefined(params.parent) && params.scrollable === true;

    // Not part of params because I don't want people passing this in via
    // constructor. Should be a 'remembered' value.
    var use_local_storage =
        SUPPORTS_LOCAL_STORAGE &&
            localStorage.getItem(getLocalStorageHash(this, 'isLocal')) === 'true';

    Object.defineProperties(this,

        /** @lends dat.gui.GUI.prototype */
        {

          /**
           * The parent <code>GUI</code>
           * @type dat.gui.GUI
           */
          parent: {
            get: function() {
              return params.parent;
            }
          },

          scrollable: {
            get: function() {
              return params.scrollable;
            }
          },

          /**
           * Handles <code>GUI</code>'s element placement for you
           * @type Boolean
           */
          autoPlace: {
            get: function() {
              return params.autoPlace;
            }
          },

          /**
           * The identifier for a set of saved values
           * @type String
           */
          preset: {

            get: function() {
              if (_this.parent) {
                return _this.getRoot().preset;
              } else {
                return params.load.preset;
              }
            },

            set: function(v) {
              if (_this.parent) {
                _this.getRoot().preset = v;
              } else {
                params.load.preset = v;
              }
              setPresetSelectIndex(this);
              _this.revert();
            }

          },

          /**
           * The width of <code>GUI</code> element
           * @type Number
           */
          width: {
            get: function() {
              return params.width;
            },
            set: function(v) {
              params.width = v;
              setWidth(_this, v);
            }
          },

          /**
           * The name of <code>GUI</code>. Used for folders. i.e
           * a folder's name
           * @type String
           */
          name: {
            get: function() {
              return params.name;
            },
            set: function(v) {
              // TODO Check for collisions among sibling folders
              params.name = v;
              if (title_row_name) {
                title_row_name.innerHTML = params.name;
              }
            }
          },

          /**
           * Whether the <code>GUI</code> is collapsed or not
           * @type Boolean
           */
          closed: {
            get: function() {
              return params.closed;
            },
            set: function(v) {
              params.closed = v;
              if (params.closed) {
                dom.addClass(_this.__ul, GUI.CLASS_CLOSED);
              } else {
                dom.removeClass(_this.__ul, GUI.CLASS_CLOSED);
              }
              // For browsers that aren't going to respect the CSS transition,
              // Lets just check our height against the window height right off
              // the bat.
              this.onResize();

              if (_this.__closeButton) {
                _this.__closeButton.innerHTML = v ? GUI.TEXT_OPEN : GUI.TEXT_CLOSED;
              }
            }
          },

          /**
           * Contains all presets
           * @type Object
           */
          load: {
            get: function() {
              return params.load;
            }
          },

          /**
           * Determines whether or not to use <a href="https://developer.mozilla.org/en/DOM/Storage#localStorage">localStorage</a> as the means for
           * <code>remember</code>ing
           * @type Boolean
           */
          useLocalStorage: {

            get: function() {
              return use_local_storage;
            },
            set: function(bool) {
              if (SUPPORTS_LOCAL_STORAGE) {
                use_local_storage = bool;
                if (bool) {
                  dom.bind(window, 'unload', saveToLocalStorage);
                } else {
                  dom.unbind(window, 'unload', saveToLocalStorage);
                }
                localStorage.setItem(getLocalStorageHash(_this, 'isLocal'), bool);
              }
            }

          }

        });

    // Are we a root level GUI?
    if (common.isUndefined(params.parent)) {

      params.closed = false;

      dom.addClass(this.domElement, GUI.CLASS_MAIN);
      dom.makeSelectable(this.domElement, false);

      // Are we supposed to be loading locally?
      if (SUPPORTS_LOCAL_STORAGE) {

        if (use_local_storage) {

          _this.useLocalStorage = true;

          var saved_gui = localStorage.getItem(getLocalStorageHash(this, 'gui'));

          if (saved_gui) {
            params.load = JSON.parse(saved_gui);
          }

        }

      }

      this.__closeButton = document.createElement('div');
      this.__closeButton.innerHTML = GUI.TEXT_CLOSED;
      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BUTTON);
      this.domElement.appendChild(this.__closeButton);

      dom.bind(this.__closeButton, 'click', function() {

        _this.closed = !_this.closed;


      });


      // Oh, you're a nested GUI!
    } else {

      if (params.closed === undefined) {
        params.closed = true;
      }

      var title_row_name = document.createTextNode(params.name);
      dom.addClass(title_row_name, 'controller-name');

      var title_row = addRow(_this, title_row_name);

      var on_click_title = function(e) {
        e.preventDefault();
        _this.closed = !_this.closed;
        return false;
      };

      dom.addClass(this.__ul, GUI.CLASS_CLOSED);

      dom.addClass(title_row, 'title');
      dom.bind(title_row, 'click', on_click_title);

      if (!params.closed) {
        this.closed = false;
      }

    }

    if (params.autoPlace) {

      if (common.isUndefined(params.parent)) {

        if (auto_place_virgin) {
          auto_place_container = document.createElement('div');
          dom.addClass(auto_place_container, CSS_NAMESPACE);
          dom.addClass(auto_place_container, GUI.CLASS_AUTO_PLACE_CONTAINER);
          document.body.appendChild(auto_place_container);
          auto_place_virgin = false;
        }

        // Put it in the dom for you.
        auto_place_container.appendChild(this.domElement);

        // Apply the auto styles
        dom.addClass(this.domElement, GUI.CLASS_AUTO_PLACE);

      }


      // Make it not elastic.
      if (!this.parent) setWidth(_this, params.width);

    }

    dom.bind(window, 'resize', function() { _this.onResize(); });
    dom.bind(this.__ul, 'webkitTransitionEnd', function() { _this.onResize(); });
    dom.bind(this.__ul, 'transitionend', function() { _this.onResize(); });
    dom.bind(this.__ul, 'oTransitionEnd', function() { _this.onResize(); });
    this.onResize();


    if (params.resizable) {
      addResizeHandle(this);
    }

    function saveToLocalStorage() {
      localStorage.setItem(getLocalStorageHash(_this, 'gui'), JSON.stringify(_this.getSaveObject()));
    }

    var root = _this.getRoot();
    function resetWidth() {
        var root = _this.getRoot();
        root.width += 1;
        common.defer(function() {
          root.width -= 1;
        });
      }

      if (!params.parent) {
        resetWidth();
      }

  };

  GUI.toggleHide = function() {

    hide = !hide;
    common.each(hideable_guis, function(gui) {
      gui.domElement.style.zIndex = hide ? -999 : 999;
      gui.domElement.style.opacity = hide ? 0 : 1;
    });
  };

  GUI.CLASS_AUTO_PLACE = 'a';
  GUI.CLASS_AUTO_PLACE_CONTAINER = 'ac';
  GUI.CLASS_MAIN = 'main';
  GUI.CLASS_CONTROLLER_ROW = 'cr';
  GUI.CLASS_TOO_TALL = 'taller-than-window';
  GUI.CLASS_CLOSED = 'closed';
  GUI.CLASS_CLOSE_BUTTON = 'close-button';
  GUI.CLASS_DRAG = 'drag';

  GUI.DEFAULT_WIDTH = 245;
  GUI.TEXT_CLOSED = 'Close Controls';
  GUI.TEXT_OPEN = 'Open Controls';

  dom.bind(window, 'keydown', function(e) {

    if (document.activeElement.type !== 'text' &&
        (e.which === HIDE_KEY_CODE || e.keyCode == HIDE_KEY_CODE)) {
      GUI.toggleHide();
    }

  }, false);

  common.extend(

      GUI.prototype,

      /** @lends dat.gui.GUI */
      {

        /**
         * @param object
         * @param property
         * @returns {dat.controllers.Controller} The new controller that was added.
         * @instance
         */
        add: function(object, property) {

          return add(
              this,
              object,
              property,
              {
                factoryArgs: Array.prototype.slice.call(arguments, 2)
              }
          );

        },

        /**
         * @param object
         * @param property
         * @returns {dat.controllers.ColorController} The new controller that was added.
         * @instance
         */
        addColor: function(object, property) {

          return add(
              this,
              object,
              property,
              {
                color: true
              }
          );

        },

        /**
         * @param controller
         * @instance
         */
        remove: function(controller) {

          // TODO listening?
          this.__ul.removeChild(controller.__li);
          this.__controllers.slice(this.__controllers.indexOf(controller), 1);
          var _this = this;
          common.defer(function() {
            _this.onResize();
          });

        },

        destroy: function() {

          if (this.autoPlace) {
            auto_place_container.removeChild(this.domElement);
          }

        },

        /**
         * @param name
         * @returns {dat.gui.GUI} The new folder.
         * @throws {Error} if this GUI already has a folder by the specified
         * name
         * @instance
         */
        addFolder: function(name) {

          // We have to prevent collisions on names in order to have a key
          // by which to remember saved values
          if (this.__folders[name] !== undefined) {
            throw new Error('You already have a folder in this GUI by the' +
                ' name "' + name + '"');
          }

          var new_gui_params = { name: name, parent: this };

          // We need to pass down the autoPlace trait so that we can
          // attach event listeners to open/close folder actions to
          // ensure that a scrollbar appears if the window is too short.
          new_gui_params.autoPlace = this.autoPlace;

          // Do we have saved appearance data for this folder?

          if (this.load && // Anything loaded?
              this.load.folders && // Was my parent a dead-end?
              this.load.folders[name]) { // Did daddy remember me?

            // Start me closed if I was closed
            new_gui_params.closed = this.load.folders[name].closed;

            // Pass down the loaded data
            new_gui_params.load = this.load.folders[name];

          }

          var gui = new GUI(new_gui_params);
          this.__folders[name] = gui;

          var li = addRow(this, gui.domElement);
          dom.addClass(li, 'folder');
          return gui;

        },

        open: function() {
          this.closed = false;
        },

        close: function() {
          this.closed = true;
        },

        onResize: function() {

          var root = this.getRoot();

          if (root.scrollable) {

            var top = dom.getOffset(root.__ul).top;
            var h = 0;

            common.each(root.__ul.childNodes, function(node) {
              if (! (root.autoPlace && node === root.__save_row))
                h += dom.getHeight(node);
            });

            if (window.innerHeight - top - CLOSE_BUTTON_HEIGHT < h) {
              dom.addClass(root.domElement, GUI.CLASS_TOO_TALL);
              root.__ul.style.height = window.innerHeight - top - CLOSE_BUTTON_HEIGHT + 'px';
            } else {
              dom.removeClass(root.domElement, GUI.CLASS_TOO_TALL);
              root.__ul.style.height = 'auto';
            }

          }

          if (root.__resize_handle) {
            common.defer(function() {
              root.__resize_handle.style.height = root.__ul.offsetHeight + 'px';
            });
          }

          if (root.__closeButton) {
            root.__closeButton.style.width = root.width + 'px';
          }

        },

        /**
         * Mark objects for saving. The order of these objects cannot change as
         * the GUI grows. When remembering new objects, append them to the end
         * of the list.
         *
         * @param {Object...} objects
         * @throws {Error} if not called on a top level GUI.
         * @instance
         */
        remember: function() {

          if (common.isUndefined(SAVE_DIALOGUE)) {
            SAVE_DIALOGUE = new CenteredDiv();
            SAVE_DIALOGUE.domElement.innerHTML = saveDialogueContents;
          }

          if (this.parent) {
            throw new Error("You can only call remember on a top level GUI.");
          }

          var _this = this;

          common.each(Array.prototype.slice.call(arguments), function(object) {
            if (_this.__rememberedObjects.length == 0) {
              addSaveMenu(_this);
            }
            if (_this.__rememberedObjects.indexOf(object) == -1) {
              _this.__rememberedObjects.push(object);
            }
          });

          if (this.autoPlace) {
            // Set save row width
            setWidth(this, this.width);
          }

        },

        /**
         * @returns {dat.gui.GUI} the topmost parent GUI of a nested GUI.
         * @instance
         */
        getRoot: function() {
          var gui = this;
          while (gui.parent) {
            gui = gui.parent;
          }
          return gui;
        },

        /**
         * @returns {Object} a JSON object representing the current state of
         * this GUI as well as its remembered properties.
         * @instance
         */
        getSaveObject: function() {

          var toReturn = this.load;

          toReturn.closed = this.closed;

          // Am I remembering any values?
          if (this.__rememberedObjects.length > 0) {

            toReturn.preset = this.preset;

            if (!toReturn.remembered) {
              toReturn.remembered = {};
            }

            toReturn.remembered[this.preset] = getCurrentPreset(this);

          }

          toReturn.folders = {};
          common.each(this.__folders, function(element, key) {
            toReturn.folders[key] = element.getSaveObject();
          });

          return toReturn;

        },

        save: function() {

          if (!this.load.remembered) {
            this.load.remembered = {};
          }

          this.load.remembered[this.preset] = getCurrentPreset(this);
          markPresetModified(this, false);

        },

        saveAs: function(presetName) {

          if (!this.load.remembered) {

            // Retain default values upon first save
            this.load.remembered = {};
            this.load.remembered[DEFAULT_DEFAULT_PRESET_NAME] = getCurrentPreset(this, true);

          }

          this.load.remembered[presetName] = getCurrentPreset(this);
          this.preset = presetName;
          addPresetOption(this, presetName, true);

        },

        revert: function(gui) {

          common.each(this.__controllers, function(controller) {
            // Make revert work on Default.
            if (!this.getRoot().load.remembered) {
              controller.setValue(controller.initialValue);
            } else {
              recallSavedValue(gui || this.getRoot(), controller);
            }
          }, this);

          common.each(this.__folders, function(folder) {
            folder.revert(folder);
          });

          if (!gui) {
            markPresetModified(this.getRoot(), false);
          }


        },

        listen: function(controller) {

          var init = this.__listening.length == 0;
          this.__listening.push(controller);
          if (init) updateDisplays(this.__listening);

        }

      }

  );

  function add(gui, object, property, params) {

    if (object[property] === undefined) {
      throw new Error("Object " + object + " has no property \"" + property + "\"");
    }

    var controller;

    if (params.color) {

      controller = new ColorController(object, property);

    } else {

      var factoryArgs = [object,property].concat(params.factoryArgs);
      controller = controllerFactory.apply(gui, factoryArgs);

    }

    if (params.before instanceof Controller) {
      params.before = params.before.__li;
    }

    recallSavedValue(gui, controller);

    dom.addClass(controller.domElement, 'c');

    var name = document.createElement('span');
    dom.addClass(name, 'property-name');
    name.innerHTML = controller.property;

    var container = document.createElement('div');
    container.appendChild(name);
    container.appendChild(controller.domElement);

    var li = addRow(gui, container, params.before);

    dom.addClass(li, GUI.CLASS_CONTROLLER_ROW);
    dom.addClass(li, typeof controller.getValue());

    augmentController(gui, li, controller);

    gui.__controllers.push(controller);

    return controller;

  }

  /**
   * Add a row to the end of the GUI or before another row.
   *
   * @param gui
   * @param [dom] If specified, inserts the dom content in the new row
   * @param [liBefore] If specified, places the new row before another row
   */
  function addRow(gui, dom, liBefore) {
    var li = document.createElement('li');
    if (dom) li.appendChild(dom);
    if (liBefore) {
      gui.__ul.insertBefore(li, params.before);
    } else {
      gui.__ul.appendChild(li);
    }
    gui.onResize();
    return li;
  }

  function augmentController(gui, li, controller) {

    controller.__li = li;
    controller.__gui = gui;

    common.extend(controller, {

      options: function(options) {

        if (arguments.length > 1) {
          controller.remove();

          return add(
              gui,
              controller.object,
              controller.property,
              {
                before: controller.__li.nextElementSibling,
                factoryArgs: [common.toArray(arguments)]
              }
          );

        }

        if (common.isArray(options) || common.isObject(options)) {
          controller.remove();

          return add(
              gui,
              controller.object,
              controller.property,
              {
                before: controller.__li.nextElementSibling,
                factoryArgs: [options]
              }
          );

        }

      },

      name: function(v) {
        controller.__li.firstElementChild.firstElementChild.innerHTML = v;
        return controller;
      },

      listen: function() {
        controller.__gui.listen(controller);
        return controller;
      },

      remove: function() {
        controller.__gui.remove(controller);
        return controller;
      }

    });

    // All sliders should be accompanied by a box.
    if (controller instanceof NumberControllerSlider) {

      var box = new NumberControllerBox(controller.object, controller.property,
          { min: controller.__min, max: controller.__max, step: controller.__step });

      common.each(['updateDisplay', 'onChange', 'onFinishChange'], function(method) {
        var pc = controller[method];
        var pb = box[method];
        controller[method] = box[method] = function() {
          var args = Array.prototype.slice.call(arguments);
          pc.apply(controller, args);
          return pb.apply(box, args);
        };
      });

      dom.addClass(li, 'has-slider');
      controller.domElement.insertBefore(box.domElement, controller.domElement.firstElementChild);

    }
    else if (controller instanceof NumberControllerBox) {

      var r = function(returned) {

        // Have we defined both boundaries?
        if (common.isNumber(controller.__min) && common.isNumber(controller.__max)) {

          // Well, then lets just replace this with a slider.
          controller.remove();
          return add(
              gui,
              controller.object,
              controller.property,
              {
                before: controller.__li.nextElementSibling,
                factoryArgs: [controller.__min, controller.__max, controller.__step]
              });

        }

        return returned;

      };

      controller.min = common.compose(r, controller.min);
      controller.max = common.compose(r, controller.max);

    }
    else if (controller instanceof BooleanController) {

      dom.bind(li, 'click', function() {
        dom.fakeEvent(controller.__checkbox, 'click');
      });

      dom.bind(controller.__checkbox, 'click', function(e) {
        e.stopPropagation(); // Prevents double-toggle
      });

    }
    else if (controller instanceof FunctionController) {

      dom.bind(li, 'click', function() {
        dom.fakeEvent(controller.__button, 'click');
      });

      dom.bind(li, 'mouseover', function() {
        dom.addClass(controller.__button, 'hover');
      });

      dom.bind(li, 'mouseout', function() {
        dom.removeClass(controller.__button, 'hover');
      });

    }
    else if (controller instanceof ColorController) {

      dom.addClass(li, 'color');
      controller.updateDisplay = common.compose(function(r) {
        li.style.borderLeftColor = controller.__color.toString();
        return r;
      }, controller.updateDisplay);

      controller.updateDisplay();

    }

    controller.setValue = common.compose(function(r) {
      if (gui.getRoot().__preset_select && controller.isModified()) {
        markPresetModified(gui.getRoot(), true);
      }
      return r;
    }, controller.setValue);

  }

  function recallSavedValue(gui, controller) {

    // Find the topmost GUI, that's where remembered objects live.
    var root = gui.getRoot();

    // Does the object we're controlling match anything we've been told to
    // remember?
    var matched_index = root.__rememberedObjects.indexOf(controller.object);

    // Why yes, it does!
    if (matched_index != -1) {

      // Let me fetch a map of controllers for thcommon.isObject.
      var controller_map =
          root.__rememberedObjectIndecesToControllers[matched_index];

      // Ohp, I believe this is the first controller we've created for this
      // object. Lets make the map fresh.
      if (controller_map === undefined) {
        controller_map = {};
        root.__rememberedObjectIndecesToControllers[matched_index] =
            controller_map;
      }

      // Keep track of this controller
      controller_map[controller.property] = controller;

      // Okay, now have we saved any values for this controller?
      if (root.load && root.load.remembered) {

        var preset_map = root.load.remembered;

        // Which preset are we trying to load?
        var preset;

        if (preset_map[gui.preset]) {

          preset = preset_map[gui.preset];

        } else if (preset_map[DEFAULT_DEFAULT_PRESET_NAME]) {

          // Uhh, you can have the default instead?
          preset = preset_map[DEFAULT_DEFAULT_PRESET_NAME];

        } else {

          // Nada.

          return;

        }


        // Did the loaded object remember thcommon.isObject?
        if (preset[matched_index] &&

          // Did we remember this particular property?
            preset[matched_index][controller.property] !== undefined) {

          // We did remember something for this guy ...
          var value = preset[matched_index][controller.property];

          // And that's what it is.
          controller.initialValue = value;
          controller.setValue(value);

        }

      }

    }

  }

  function getLocalStorageHash(gui, key) {
    // TODO how does this deal with multiple GUI's?
    return document.location.href + '.' + key;

  }

  function addSaveMenu(gui) {

    var div = gui.__save_row = document.createElement('li');

    dom.addClass(gui.domElement, 'has-save');

    gui.__ul.insertBefore(div, gui.__ul.firstChild);

    dom.addClass(div, 'save-row');

    var gears = document.createElement('span');
    gears.innerHTML = '&nbsp;';
    dom.addClass(gears, 'button gears');

    // TODO replace with FunctionController
    var button = document.createElement('span');
    button.innerHTML = 'Save';
    dom.addClass(button, 'button');
    dom.addClass(button, 'save');

    var button2 = document.createElement('span');
    button2.innerHTML = 'New';
    dom.addClass(button2, 'button');
    dom.addClass(button2, 'save-as');

    var button3 = document.createElement('span');
    button3.innerHTML = 'Revert';
    dom.addClass(button3, 'button');
    dom.addClass(button3, 'revert');

    var select = gui.__preset_select = document.createElement('select');

    if (gui.load && gui.load.remembered) {

      common.each(gui.load.remembered, function(value, key) {
        addPresetOption(gui, key, key == gui.preset);
      });

    } else {
      addPresetOption(gui, DEFAULT_DEFAULT_PRESET_NAME, false);
    }

    dom.bind(select, 'change', function() {


      for (var index = 0; index < gui.__preset_select.length; index++) {
        gui.__preset_select[index].innerHTML = gui.__preset_select[index].value;
      }

      gui.preset = this.value;

    });

    div.appendChild(select);
    div.appendChild(gears);
    div.appendChild(button);
    div.appendChild(button2);
    div.appendChild(button3);

    if (SUPPORTS_LOCAL_STORAGE) {

      var saveLocally = document.getElementById('dg-save-locally');
      var explain = document.getElementById('dg-local-explain');

      saveLocally.style.display = 'block';

      var localStorageCheckBox = document.getElementById('dg-local-storage');

      if (localStorage.getItem(getLocalStorageHash(gui, 'isLocal')) === 'true') {
        localStorageCheckBox.setAttribute('checked', 'checked');
      }

      function showHideExplain() {
        explain.style.display = gui.useLocalStorage ? 'block' : 'none';
      }

      showHideExplain();

      // TODO: Use a boolean controller, fool!
      dom.bind(localStorageCheckBox, 'change', function() {
        gui.useLocalStorage = !gui.useLocalStorage;
        showHideExplain();
      });

    }

    var newConstructorTextArea = document.getElementById('dg-new-constructor');

    dom.bind(newConstructorTextArea, 'keydown', function(e) {
      if (e.metaKey && (e.which === 67 || e.keyCode == 67)) {
        SAVE_DIALOGUE.hide();
      }
    });

    dom.bind(gears, 'click', function() {
      newConstructorTextArea.innerHTML = JSON.stringify(gui.getSaveObject(), undefined, 2);
      SAVE_DIALOGUE.show();
      newConstructorTextArea.focus();
      newConstructorTextArea.select();
    });

    dom.bind(button, 'click', function() {
      gui.save();
    });

    dom.bind(button2, 'click', function() {
      var presetName = prompt('Enter a new preset name.');
      if (presetName) gui.saveAs(presetName);
    });

    dom.bind(button3, 'click', function() {
      gui.revert();
    });

//    div.appendChild(button2);

  }

  function addResizeHandle(gui) {

    gui.__resize_handle = document.createElement('div');

    common.extend(gui.__resize_handle.style, {

      width: '6px',
      marginLeft: '-3px',
      height: '200px',
      cursor: 'ew-resize',
      position: 'absolute'
//      border: '1px solid blue'

    });

    var pmouseX;

    dom.bind(gui.__resize_handle, 'mousedown', dragStart);
    dom.bind(gui.__closeButton, 'mousedown', dragStart);

    gui.domElement.insertBefore(gui.__resize_handle, gui.domElement.firstElementChild);

    function dragStart(e) {

      e.preventDefault();

      pmouseX = e.clientX;

      dom.addClass(gui.__closeButton, GUI.CLASS_DRAG);
      dom.bind(window, 'mousemove', drag);
      dom.bind(window, 'mouseup', dragStop);

      return false;

    }

    function drag(e) {

      e.preventDefault();

      gui.width += pmouseX - e.clientX;
      gui.onResize();
      pmouseX = e.clientX;

      return false;

    }

    function dragStop() {

      dom.removeClass(gui.__closeButton, GUI.CLASS_DRAG);
      dom.unbind(window, 'mousemove', drag);
      dom.unbind(window, 'mouseup', dragStop);

    }

  }

  function setWidth(gui, w) {
    gui.domElement.style.width = w + 'px';
    // Auto placed save-rows are position fixed, so we have to
    // set the width manually if we want it to bleed to the edge
    if (gui.__save_row && gui.autoPlace) {
      gui.__save_row.style.width = w + 'px';
    }if (gui.__closeButton) {
      gui.__closeButton.style.width = w + 'px';
    }
  }

  function getCurrentPreset(gui, useInitialValues) {

    var toReturn = {};

    // For each object I'm remembering
    common.each(gui.__rememberedObjects, function(val, index) {

      var saved_values = {};

      // The controllers I've made for thcommon.isObject by property
      var controller_map =
          gui.__rememberedObjectIndecesToControllers[index];

      // Remember each value for each property
      common.each(controller_map, function(controller, property) {
        saved_values[property] = useInitialValues ? controller.initialValue : controller.getValue();
      });

      // Save the values for thcommon.isObject
      toReturn[index] = saved_values;

    });

    return toReturn;

  }

  function addPresetOption(gui, name, setSelected) {
    var opt = document.createElement('option');
    opt.innerHTML = name;
    opt.value = name;
    gui.__preset_select.appendChild(opt);
    if (setSelected) {
      gui.__preset_select.selectedIndex = gui.__preset_select.length - 1;
    }
  }

  function setPresetSelectIndex(gui) {
    for (var index = 0; index < gui.__preset_select.length; index++) {
      if (gui.__preset_select[index].value == gui.preset) {
        gui.__preset_select.selectedIndex = index;
      }
    }
  }

  function markPresetModified(gui, modified) {
    var opt = gui.__preset_select[gui.__preset_select.selectedIndex];
//    console.log('mark', modified, opt);
    if (modified) {
      opt.innerHTML = opt.value + "*";
    } else {
      opt.innerHTML = opt.value;
    }
  }

  function updateDisplays(controllerArray) {


    if (controllerArray.length != 0) {

      requestAnimationFrame(function() {
        updateDisplays(controllerArray);
      });

    }

    common.each(controllerArray, function(c) {
      c.updateDisplay();
    });

  }

  return GUI;

})(dat.utils.css,
"<div id=\"dg-save\" class=\"dg dialogue\">\n\n  Here's the new load parameter for your <code>GUI</code>'s constructor:\n\n  <textarea id=\"dg-new-constructor\"></textarea>\n\n  <div id=\"dg-save-locally\">\n\n    <input id=\"dg-local-storage\" type=\"checkbox\"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id=\"dg-local-explain\">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>",
".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear;border:0;position:absolute;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-x:hidden}.dg.a.has-save ul{margin-top:27px}.dg.a.has-save ul.closed{margin-top:0}.dg.a .save-row{position:fixed;top:0;z-index:1002}.dg li{-webkit-transition:height 0.1s ease-out;-o-transition:height 0.1s ease-out;-moz-transition:height 0.1s ease-out;transition:height 0.1s ease-out}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;overflow:hidden;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li > *{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:9px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2fa1d6}.dg .cr.number input[type=text]{color:#2fa1d6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2fa1d6}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n",
dat.controllers.factory = (function (OptionController, NumberControllerBox, NumberControllerSlider, StringController, FunctionController, BooleanController, common) {

      return function(object, property) {

        var initialValue = object[property];

        // Providing options?
        if (common.isArray(arguments[2]) || common.isObject(arguments[2])) {
          return new OptionController(object, property, arguments[2]);
        }

        // Providing a map?

        if (common.isNumber(initialValue)) {

          if (common.isNumber(arguments[2]) && common.isNumber(arguments[3])) {

            // Has min and max.
            return new NumberControllerSlider(object, property, arguments[2], arguments[3]);

          } else {

            return new NumberControllerBox(object, property, { min: arguments[2], max: arguments[3] });

          }

        }

        if (common.isString(initialValue)) {
          return new StringController(object, property);
        }

        if (common.isFunction(initialValue)) {
          return new FunctionController(object, property, '');
        }

        if (common.isBoolean(initialValue)) {
          return new BooleanController(object, property);
        }

      }

    })(dat.controllers.OptionController,
dat.controllers.NumberControllerBox,
dat.controllers.NumberControllerSlider,
dat.controllers.StringController = (function (Controller, dom, common) {

  /**
   * @class Provides a text input to alter the string property of an object.
   *
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   *
   * @member dat.controllers
   */
  var StringController = function(object, property) {

    StringController.superclass.call(this, object, property);

    var _this = this;

    this.__input = document.createElement('input');
    this.__input.setAttribute('type', 'text');

    dom.bind(this.__input, 'keyup', onChange);
    dom.bind(this.__input, 'change', onChange);
    dom.bind(this.__input, 'blur', onBlur);
    dom.bind(this.__input, 'keydown', function(e) {
      if (e.keyCode === 13) {
        this.blur();
      }
    });
    

    function onChange() {
      _this.setValue(_this.__input.value);
    }

    function onBlur() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    this.updateDisplay();

    this.domElement.appendChild(this.__input);

  };

  StringController.superclass = Controller;

  common.extend(

      StringController.prototype,
      Controller.prototype,

      {

        updateDisplay: function() {
          // Stops the caret from moving on account of:
          // keyup -> setValue -> updateDisplay
          if (!dom.isActive(this.__input)) {
            this.__input.value = this.getValue();
          }
          return StringController.superclass.prototype.updateDisplay.call(this);
        }

      }

  );

  return StringController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.utils.common),
dat.controllers.FunctionController,
dat.controllers.BooleanController,
dat.utils.common),
dat.controllers.Controller,
dat.controllers.BooleanController,
dat.controllers.FunctionController,
dat.controllers.NumberControllerBox,
dat.controllers.NumberControllerSlider,
dat.controllers.OptionController,
dat.controllers.ColorController = (function (Controller, dom, Color, interpret, common) {

  var ColorController = function(object, property) {

    ColorController.superclass.call(this, object, property);

    this.__color = new Color(this.getValue());
    this.__temp = new Color(0);

    var _this = this;

    this.domElement = document.createElement('div');

    dom.makeSelectable(this.domElement, false);

    this.__selector = document.createElement('div');
    this.__selector.className = 'selector';

    this.__saturation_field = document.createElement('div');
    this.__saturation_field.className = 'saturation-field';

    this.__field_knob = document.createElement('div');
    this.__field_knob.className = 'field-knob';
    this.__field_knob_border = '2px solid ';

    this.__hue_knob = document.createElement('div');
    this.__hue_knob.className = 'hue-knob';

    this.__hue_field = document.createElement('div');
    this.__hue_field.className = 'hue-field';

    this.__input = document.createElement('input');
    this.__input.type = 'text';
    this.__input_textShadow = '0 1px 1px ';

    dom.bind(this.__input, 'keydown', function(e) {
      if (e.keyCode === 13) { // on enter
        onBlur.call(this);
      }
    });

    dom.bind(this.__input, 'blur', onBlur);

    dom.bind(this.__selector, 'mousedown', function(e) {

      dom
        .addClass(this, 'drag')
        .bind(window, 'mouseup', function(e) {
          dom.removeClass(_this.__selector, 'drag');
        });

    });

    var value_field = document.createElement('div');

    common.extend(this.__selector.style, {
      width: '122px',
      height: '102px',
      padding: '3px',
      backgroundColor: '#222',
      boxShadow: '0px 1px 3px rgba(0,0,0,0.3)'
    });

    common.extend(this.__field_knob.style, {
      position: 'absolute',
      width: '12px',
      height: '12px',
      border: this.__field_knob_border + (this.__color.v < .5 ? '#fff' : '#000'),
      boxShadow: '0px 1px 3px rgba(0,0,0,0.5)',
      borderRadius: '12px',
      zIndex: 1
    });
    
    common.extend(this.__hue_knob.style, {
      position: 'absolute',
      width: '15px',
      height: '2px',
      borderRight: '4px solid #fff',
      zIndex: 1
    });

    common.extend(this.__saturation_field.style, {
      width: '100px',
      height: '100px',
      border: '1px solid #555',
      marginRight: '3px',
      display: 'inline-block',
      cursor: 'pointer'
    });

    common.extend(value_field.style, {
      width: '100%',
      height: '100%',
      background: 'none'
    });
    
    linearGradient(value_field, 'top', 'rgba(0,0,0,0)', '#000');

    common.extend(this.__hue_field.style, {
      width: '15px',
      height: '100px',
      display: 'inline-block',
      border: '1px solid #555',
      cursor: 'ns-resize'
    });

    hueGradient(this.__hue_field);

    common.extend(this.__input.style, {
      outline: 'none',
//      width: '120px',
      textAlign: 'center',
//      padding: '4px',
//      marginBottom: '6px',
      color: '#fff',
      border: 0,
      fontWeight: 'bold',
      textShadow: this.__input_textShadow + 'rgba(0,0,0,0.7)'
    });

    dom.bind(this.__saturation_field, 'mousedown', fieldDown);
    dom.bind(this.__field_knob, 'mousedown', fieldDown);

    dom.bind(this.__hue_field, 'mousedown', function(e) {
      setH(e);
      dom.bind(window, 'mousemove', setH);
      dom.bind(window, 'mouseup', unbindH);
    });

    function fieldDown(e) {
      setSV(e);
      // document.body.style.cursor = 'none';
      dom.bind(window, 'mousemove', setSV);
      dom.bind(window, 'mouseup', unbindSV);
    }

    function unbindSV() {
      dom.unbind(window, 'mousemove', setSV);
      dom.unbind(window, 'mouseup', unbindSV);
      // document.body.style.cursor = 'default';
    }

    function onBlur() {
      var i = interpret(this.value);
      if (i !== false) {
        _this.__color.__state = i;
        _this.setValue(_this.__color.toOriginal());
      } else {
        this.value = _this.__color.toString();
      }
    }

    function unbindH() {
      dom.unbind(window, 'mousemove', setH);
      dom.unbind(window, 'mouseup', unbindH);
    }

    this.__saturation_field.appendChild(value_field);
    this.__selector.appendChild(this.__field_knob);
    this.__selector.appendChild(this.__saturation_field);
    this.__selector.appendChild(this.__hue_field);
    this.__hue_field.appendChild(this.__hue_knob);

    this.domElement.appendChild(this.__input);
    this.domElement.appendChild(this.__selector);

    this.updateDisplay();

    function setSV(e) {

      e.preventDefault();

      var w = dom.getWidth(_this.__saturation_field);
      var o = dom.getOffset(_this.__saturation_field);
      var s = (e.clientX - o.left + document.body.scrollLeft) / w;
      var v = 1 - (e.clientY - o.top + document.body.scrollTop) / w;

      if (v > 1) v = 1;
      else if (v < 0) v = 0;

      if (s > 1) s = 1;
      else if (s < 0) s = 0;

      _this.__color.v = v;
      _this.__color.s = s;

      _this.setValue(_this.__color.toOriginal());


      return false;

    }

    function setH(e) {

      e.preventDefault();

      var s = dom.getHeight(_this.__hue_field);
      var o = dom.getOffset(_this.__hue_field);
      var h = 1 - (e.clientY - o.top + document.body.scrollTop) / s;

      if (h > 1) h = 1;
      else if (h < 0) h = 0;

      _this.__color.h = h * 360;

      _this.setValue(_this.__color.toOriginal());

      return false;

    }

  };

  ColorController.superclass = Controller;

  common.extend(

      ColorController.prototype,
      Controller.prototype,

      {

        updateDisplay: function() {

          var i = interpret(this.getValue());

          if (i !== false) {

            var mismatch = false;

            // Check for mismatch on the interpreted value.

            common.each(Color.COMPONENTS, function(component) {
              if (!common.isUndefined(i[component]) &&
                  !common.isUndefined(this.__color.__state[component]) &&
                  i[component] !== this.__color.__state[component]) {
                mismatch = true;
                return {}; // break
              }
            }, this);

            // If nothing diverges, we keep our previous values
            // for statefulness, otherwise we recalculate fresh
            if (mismatch) {
              common.extend(this.__color.__state, i);
            }

          }

          common.extend(this.__temp.__state, this.__color.__state);

          this.__temp.a = 1;

          var flip = (this.__color.v < .5 || this.__color.s > .5) ? 255 : 0;
          var _flip = 255 - flip;

          common.extend(this.__field_knob.style, {
            marginLeft: 100 * this.__color.s - 7 + 'px',
            marginTop: 100 * (1 - this.__color.v) - 7 + 'px',
            backgroundColor: this.__temp.toString(),
            border: this.__field_knob_border + 'rgb(' + flip + ',' + flip + ',' + flip +')'
          });

          this.__hue_knob.style.marginTop = (1 - this.__color.h / 360) * 100 + 'px';

          this.__temp.s = 1;
          this.__temp.v = 1;

          linearGradient(this.__saturation_field, 'left', '#fff', this.__temp.toString());

          common.extend(this.__input.style, {
            backgroundColor: this.__input.value = this.__color.toString(),
            color: 'rgb(' + flip + ',' + flip + ',' + flip +')',
            textShadow: this.__input_textShadow + 'rgba(' + _flip + ',' + _flip + ',' + _flip +',.7)'
          });

        }

      }

  );
  
  var vendors = ['-moz-','-o-','-webkit-','-ms-',''];
  
  function linearGradient(elem, x, a, b) {
    elem.style.background = '';
    common.each(vendors, function(vendor) {
      elem.style.cssText += 'background: ' + vendor + 'linear-gradient('+x+', '+a+' 0%, ' + b + ' 100%); ';
    });
  }
  
  function hueGradient(elem) {
    elem.style.background = '';
    elem.style.cssText += 'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);';
    elem.style.cssText += 'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
    elem.style.cssText += 'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
    elem.style.cssText += 'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
    elem.style.cssText += 'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  }


  return ColorController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.color.Color = (function (interpret, math, toString, common) {

  var Color = function() {

    this.__state = interpret.apply(this, arguments);

    if (this.__state === false) {
      throw 'Failed to interpret color arguments';
    }

    this.__state.a = this.__state.a || 1;


  };

  Color.COMPONENTS = ['r','g','b','h','s','v','hex','a'];

  common.extend(Color.prototype, {

    toString: function() {
      return toString(this);
    },

    toOriginal: function() {
      return this.__state.conversion.write(this);
    }

  });

  defineRGBComponent(Color.prototype, 'r', 2);
  defineRGBComponent(Color.prototype, 'g', 1);
  defineRGBComponent(Color.prototype, 'b', 0);

  defineHSVComponent(Color.prototype, 'h');
  defineHSVComponent(Color.prototype, 's');
  defineHSVComponent(Color.prototype, 'v');

  Object.defineProperty(Color.prototype, 'a', {

    get: function() {
      return this.__state.a;
    },

    set: function(v) {
      this.__state.a = v;
    }

  });

  Object.defineProperty(Color.prototype, 'hex', {

    get: function() {

      if (!this.__state.space !== 'HEX') {
        this.__state.hex = math.rgb_to_hex(this.r, this.g, this.b);
      }

      return this.__state.hex;

    },

    set: function(v) {

      this.__state.space = 'HEX';
      this.__state.hex = v;

    }

  });

  function defineRGBComponent(target, component, componentHexIndex) {

    Object.defineProperty(target, component, {

      get: function() {

        if (this.__state.space === 'RGB') {
          return this.__state[component];
        }

        recalculateRGB(this, component, componentHexIndex);

        return this.__state[component];

      },

      set: function(v) {

        if (this.__state.space !== 'RGB') {
          recalculateRGB(this, component, componentHexIndex);
          this.__state.space = 'RGB';
        }

        this.__state[component] = v;

      }

    });

  }

  function defineHSVComponent(target, component) {

    Object.defineProperty(target, component, {

      get: function() {

        if (this.__state.space === 'HSV')
          return this.__state[component];

        recalculateHSV(this);

        return this.__state[component];

      },

      set: function(v) {

        if (this.__state.space !== 'HSV') {
          recalculateHSV(this);
          this.__state.space = 'HSV';
        }

        this.__state[component] = v;

      }

    });

  }

  function recalculateRGB(color, component, componentHexIndex) {

    if (color.__state.space === 'HEX') {

      color.__state[component] = math.component_from_hex(color.__state.hex, componentHexIndex);

    } else if (color.__state.space === 'HSV') {

      common.extend(color.__state, math.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));

    } else {

      throw 'Corrupted color state';

    }

  }

  function recalculateHSV(color) {

    var result = math.rgb_to_hsv(color.r, color.g, color.b);

    common.extend(color.__state,
        {
          s: result.s,
          v: result.v
        }
    );

    if (!common.isNaN(result.h)) {
      color.__state.h = result.h;
    } else if (common.isUndefined(color.__state.h)) {
      color.__state.h = 0;
    }

  }

  return Color;

})(dat.color.interpret,
dat.color.math = (function () {

  var tmpComponent;

  return {

    hsv_to_rgb: function(h, s, v) {

      var hi = Math.floor(h / 60) % 6;

      var f = h / 60 - Math.floor(h / 60);
      var p = v * (1.0 - s);
      var q = v * (1.0 - (f * s));
      var t = v * (1.0 - ((1.0 - f) * s));
      var c = [
        [v, t, p],
        [q, v, p],
        [p, v, t],
        [p, q, v],
        [t, p, v],
        [v, p, q]
      ][hi];

      return {
        r: c[0] * 255,
        g: c[1] * 255,
        b: c[2] * 255
      };

    },

    rgb_to_hsv: function(r, g, b) {

      var min = Math.min(r, g, b),
          max = Math.max(r, g, b),
          delta = max - min,
          h, s;

      if (max != 0) {
        s = delta / max;
      } else {
        return {
          h: NaN,
          s: 0,
          v: 0
        };
      }

      if (r == max) {
        h = (g - b) / delta;
      } else if (g == max) {
        h = 2 + (b - r) / delta;
      } else {
        h = 4 + (r - g) / delta;
      }
      h /= 6;
      if (h < 0) {
        h += 1;
      }

      return {
        h: h * 360,
        s: s,
        v: max / 255
      };
    },

    rgb_to_hex: function(r, g, b) {
      var hex = this.hex_with_component(0, 2, r);
      hex = this.hex_with_component(hex, 1, g);
      hex = this.hex_with_component(hex, 0, b);
      return hex;
    },

    component_from_hex: function(hex, componentIndex) {
      return (hex >> (componentIndex * 8)) & 0xFF;
    },

    hex_with_component: function(hex, componentIndex, value) {
      return value << (tmpComponent = componentIndex * 8) | (hex & ~ (0xFF << tmpComponent));
    }

  }

})(),
dat.color.toString,
dat.utils.common),
dat.color.interpret,
dat.utils.common),
dat.utils.requestAnimationFrame = (function () {

  /**
   * requirejs version of Paul Irish's RequestAnimationFrame
   * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
   */

  return window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback, element) {

        window.setTimeout(callback, 1000 / 60);

      };
})(),
dat.dom.CenteredDiv = (function (dom, common) {


  var CenteredDiv = function() {

    this.backgroundElement = document.createElement('div');
    common.extend(this.backgroundElement.style, {
      backgroundColor: 'rgba(0,0,0,0.8)',
      top: 0,
      left: 0,
      display: 'none',
      zIndex: '1000',
      opacity: 0,
      WebkitTransition: 'opacity 0.2s linear'
    });

    dom.makeFullscreen(this.backgroundElement);
    this.backgroundElement.style.position = 'fixed';

    this.domElement = document.createElement('div');
    common.extend(this.domElement.style, {
      position: 'fixed',
      display: 'none',
      zIndex: '1001',
      opacity: 0,
      WebkitTransition: '-webkit-transform 0.2s ease-out, opacity 0.2s linear'
    });


    document.body.appendChild(this.backgroundElement);
    document.body.appendChild(this.domElement);

    var _this = this;
    dom.bind(this.backgroundElement, 'click', function() {
      _this.hide();
    });


  };

  CenteredDiv.prototype.show = function() {

    var _this = this;
    


    this.backgroundElement.style.display = 'block';

    this.domElement.style.display = 'block';
    this.domElement.style.opacity = 0;
//    this.domElement.style.top = '52%';
    this.domElement.style.webkitTransform = 'scale(1.1)';

    this.layout();

    common.defer(function() {
      _this.backgroundElement.style.opacity = 1;
      _this.domElement.style.opacity = 1;
      _this.domElement.style.webkitTransform = 'scale(1)';
    });

  };

  CenteredDiv.prototype.hide = function() {

    var _this = this;

    var hide = function() {

      _this.domElement.style.display = 'none';
      _this.backgroundElement.style.display = 'none';

      dom.unbind(_this.domElement, 'webkitTransitionEnd', hide);
      dom.unbind(_this.domElement, 'transitionend', hide);
      dom.unbind(_this.domElement, 'oTransitionEnd', hide);

    };

    dom.bind(this.domElement, 'webkitTransitionEnd', hide);
    dom.bind(this.domElement, 'transitionend', hide);
    dom.bind(this.domElement, 'oTransitionEnd', hide);

    this.backgroundElement.style.opacity = 0;
//    this.domElement.style.top = '48%';
    this.domElement.style.opacity = 0;
    this.domElement.style.webkitTransform = 'scale(1.1)';

  };

  CenteredDiv.prototype.layout = function() {
    this.domElement.style.left = window.innerWidth/2 - dom.getWidth(this.domElement) / 2 + 'px';
    this.domElement.style.top = window.innerHeight/2 - dom.getHeight(this.domElement) / 2 + 'px';
  };
  
  return CenteredDiv;

})(dat.dom.dom,
dat.utils.common),
dat.dom.dom,
dat.utils.common);
});

var dat_color = createCommonjsModule(function (module) {
/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

/** @namespace */
var dat = module.exports = dat || {};

/** @namespace */
dat.color = dat.color || {};

/** @namespace */
dat.utils = dat.utils || {};

dat.utils.common = (function () {
  
  var ARR_EACH = Array.prototype.forEach;
  var ARR_SLICE = Array.prototype.slice;

  /**
   * Band-aid methods for things that should be a lot easier in JavaScript.
   * Implementation and structure inspired by underscore.js
   * http://documentcloud.github.com/underscore/
   */

  return { 
    
    BREAK: {},
  
    extend: function(target) {
      
      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
        
        for (var key in obj)
          if (!this.isUndefined(obj[key])) 
            target[key] = obj[key];
        
      }, this);
      
      return target;
      
    },
    
    defaults: function(target) {
      
      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
        
        for (var key in obj)
          if (this.isUndefined(target[key])) 
            target[key] = obj[key];
        
      }, this);
      
      return target;
    
    },
    
    compose: function() {
      var toCall = ARR_SLICE.call(arguments);
            return function() {
              var args = ARR_SLICE.call(arguments);
              for (var i = toCall.length -1; i >= 0; i--) {
                args = [toCall[i].apply(this, args)];
              }
              return args[0];
            }
    },
    
    each: function(obj, itr, scope) {

      
      if (ARR_EACH && obj.forEach === ARR_EACH) { 
        
        obj.forEach(itr, scope);
        
      } else if (obj.length === obj.length + 0) { // Is number but not NaN
        
        for (var key = 0, l = obj.length; key < l; key++)
          if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) 
            return;
            
      } else {

        for (var key in obj) 
          if (itr.call(scope, obj[key], key) === this.BREAK)
            return;
            
      }
            
    },
    
    defer: function(fnc) {
      setTimeout(fnc, 0);
    },
    
    toArray: function(obj) {
      if (obj.toArray) return obj.toArray();
      return ARR_SLICE.call(obj);
    },

    isUndefined: function(obj) {
      return obj === undefined;
    },
    
    isNull: function(obj) {
      return obj === null;
    },
    
    isNaN: function(obj) {
      return obj !== obj;
    },
    
    isArray: Array.isArray || function(obj) {
      return obj.constructor === Array;
    },
    
    isObject: function(obj) {
      return obj === Object(obj);
    },
    
    isNumber: function(obj) {
      return obj === obj+0;
    },
    
    isString: function(obj) {
      return obj === obj+'';
    },
    
    isBoolean: function(obj) {
      return obj === false || obj === true;
    },
    
    isFunction: function(obj) {
      return Object.prototype.toString.call(obj) === '[object Function]';
    }
  
  };
    
})();


dat.color.toString = (function (common) {

  return function(color) {

    if (color.a == 1 || common.isUndefined(color.a)) {

      var s = color.hex.toString(16);
      while (s.length < 6) {
        s = '0' + s;
      }

      return '#' + s;

    } else {

      return 'rgba(' + Math.round(color.r) + ',' + Math.round(color.g) + ',' + Math.round(color.b) + ',' + color.a + ')';

    }

  }

})(dat.utils.common);


dat.Color = dat.color.Color = (function (interpret, math, toString, common) {

  var Color = function() {

    this.__state = interpret.apply(this, arguments);

    if (this.__state === false) {
      throw 'Failed to interpret color arguments';
    }

    this.__state.a = this.__state.a || 1;


  };

  Color.COMPONENTS = ['r','g','b','h','s','v','hex','a'];

  common.extend(Color.prototype, {

    toString: function() {
      return toString(this);
    },

    toOriginal: function() {
      return this.__state.conversion.write(this);
    }

  });

  defineRGBComponent(Color.prototype, 'r', 2);
  defineRGBComponent(Color.prototype, 'g', 1);
  defineRGBComponent(Color.prototype, 'b', 0);

  defineHSVComponent(Color.prototype, 'h');
  defineHSVComponent(Color.prototype, 's');
  defineHSVComponent(Color.prototype, 'v');

  Object.defineProperty(Color.prototype, 'a', {

    get: function() {
      return this.__state.a;
    },

    set: function(v) {
      this.__state.a = v;
    }

  });

  Object.defineProperty(Color.prototype, 'hex', {

    get: function() {

      if (!this.__state.space !== 'HEX') {
        this.__state.hex = math.rgb_to_hex(this.r, this.g, this.b);
      }

      return this.__state.hex;

    },

    set: function(v) {

      this.__state.space = 'HEX';
      this.__state.hex = v;

    }

  });

  function defineRGBComponent(target, component, componentHexIndex) {

    Object.defineProperty(target, component, {

      get: function() {

        if (this.__state.space === 'RGB') {
          return this.__state[component];
        }

        recalculateRGB(this, component, componentHexIndex);

        return this.__state[component];

      },

      set: function(v) {

        if (this.__state.space !== 'RGB') {
          recalculateRGB(this, component, componentHexIndex);
          this.__state.space = 'RGB';
        }

        this.__state[component] = v;

      }

    });

  }

  function defineHSVComponent(target, component) {

    Object.defineProperty(target, component, {

      get: function() {

        if (this.__state.space === 'HSV')
          return this.__state[component];

        recalculateHSV(this);

        return this.__state[component];

      },

      set: function(v) {

        if (this.__state.space !== 'HSV') {
          recalculateHSV(this);
          this.__state.space = 'HSV';
        }

        this.__state[component] = v;

      }

    });

  }

  function recalculateRGB(color, component, componentHexIndex) {

    if (color.__state.space === 'HEX') {

      color.__state[component] = math.component_from_hex(color.__state.hex, componentHexIndex);

    } else if (color.__state.space === 'HSV') {

      common.extend(color.__state, math.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));

    } else {

      throw 'Corrupted color state';

    }

  }

  function recalculateHSV(color) {

    var result = math.rgb_to_hsv(color.r, color.g, color.b);

    common.extend(color.__state,
        {
          s: result.s,
          v: result.v
        }
    );

    if (!common.isNaN(result.h)) {
      color.__state.h = result.h;
    } else if (common.isUndefined(color.__state.h)) {
      color.__state.h = 0;
    }

  }

  return Color;

})(dat.color.interpret = (function (toString, common) {

  var result, toReturn;

  var interpret = function() {

    toReturn = false;

    var original = arguments.length > 1 ? common.toArray(arguments) : arguments[0];

    common.each(INTERPRETATIONS, function(family) {

      if (family.litmus(original)) {

        common.each(family.conversions, function(conversion, conversionName) {

          result = conversion.read(original);

          if (toReturn === false && result !== false) {
            toReturn = result;
            result.conversionName = conversionName;
            result.conversion = conversion;
            return common.BREAK;

          }

        });

        return common.BREAK;

      }

    });

    return toReturn;

  };

  var INTERPRETATIONS = [

    // Strings
    {

      litmus: common.isString,

      conversions: {

        THREE_CHAR_HEX: {

          read: function(original) {

            var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
            if (test === null) return false;

            return {
              space: 'HEX',
              hex: parseInt(
                  '0x' +
                      test[1].toString() + test[1].toString() +
                      test[2].toString() + test[2].toString() +
                      test[3].toString() + test[3].toString())
            };

          },

          write: toString

        },

        SIX_CHAR_HEX: {

          read: function(original) {

            var test = original.match(/^#([A-F0-9]{6})$/i);
            if (test === null) return false;

            return {
              space: 'HEX',
              hex: parseInt('0x' + test[1].toString())
            };

          },

          write: toString

        },

        CSS_RGB: {

          read: function(original) {

            var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
            if (test === null) return false;

            return {
              space: 'RGB',
              r: parseFloat(test[1]),
              g: parseFloat(test[2]),
              b: parseFloat(test[3])
            };

          },

          write: toString

        },

        CSS_RGBA: {

          read: function(original) {

            var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
            if (test === null) return false;

            return {
              space: 'RGB',
              r: parseFloat(test[1]),
              g: parseFloat(test[2]),
              b: parseFloat(test[3]),
              a: parseFloat(test[4])
            };

          },

          write: toString

        }

      }

    },

    // Numbers
    {

      litmus: common.isNumber,

      conversions: {

        HEX: {
          read: function(original) {
            return {
              space: 'HEX',
              hex: original,
              conversionName: 'HEX'
            }
          },

          write: function(color) {
            return color.hex;
          }
        }

      }

    },

    // Arrays
    {

      litmus: common.isArray,

      conversions: {

        RGB_ARRAY: {
          read: function(original) {
            if (original.length != 3) return false;
            return {
              space: 'RGB',
              r: original[0],
              g: original[1],
              b: original[2]
            };
          },

          write: function(color) {
            return [color.r, color.g, color.b];
          }

        },

        RGBA_ARRAY: {
          read: function(original) {
            if (original.length != 4) return false;
            return {
              space: 'RGB',
              r: original[0],
              g: original[1],
              b: original[2],
              a: original[3]
            };
          },

          write: function(color) {
            return [color.r, color.g, color.b, color.a];
          }

        }

      }

    },

    // Objects
    {

      litmus: common.isObject,

      conversions: {

        RGBA_OBJ: {
          read: function(original) {
            if (common.isNumber(original.r) &&
                common.isNumber(original.g) &&
                common.isNumber(original.b) &&
                common.isNumber(original.a)) {
              return {
                space: 'RGB',
                r: original.r,
                g: original.g,
                b: original.b,
                a: original.a
              }
            }
            return false;
          },

          write: function(color) {
            return {
              r: color.r,
              g: color.g,
              b: color.b,
              a: color.a
            }
          }
        },

        RGB_OBJ: {
          read: function(original) {
            if (common.isNumber(original.r) &&
                common.isNumber(original.g) &&
                common.isNumber(original.b)) {
              return {
                space: 'RGB',
                r: original.r,
                g: original.g,
                b: original.b
              }
            }
            return false;
          },

          write: function(color) {
            return {
              r: color.r,
              g: color.g,
              b: color.b
            }
          }
        },

        HSVA_OBJ: {
          read: function(original) {
            if (common.isNumber(original.h) &&
                common.isNumber(original.s) &&
                common.isNumber(original.v) &&
                common.isNumber(original.a)) {
              return {
                space: 'HSV',
                h: original.h,
                s: original.s,
                v: original.v,
                a: original.a
              }
            }
            return false;
          },

          write: function(color) {
            return {
              h: color.h,
              s: color.s,
              v: color.v,
              a: color.a
            }
          }
        },

        HSV_OBJ: {
          read: function(original) {
            if (common.isNumber(original.h) &&
                common.isNumber(original.s) &&
                common.isNumber(original.v)) {
              return {
                space: 'HSV',
                h: original.h,
                s: original.s,
                v: original.v
              }
            }
            return false;
          },

          write: function(color) {
            return {
              h: color.h,
              s: color.s,
              v: color.v
            }
          }

        }

      }

    }


  ];

  return interpret;


})(dat.color.toString,
dat.utils.common),
dat.color.math = (function () {

  var tmpComponent;

  return {

    hsv_to_rgb: function(h, s, v) {

      var hi = Math.floor(h / 60) % 6;

      var f = h / 60 - Math.floor(h / 60);
      var p = v * (1.0 - s);
      var q = v * (1.0 - (f * s));
      var t = v * (1.0 - ((1.0 - f) * s));
      var c = [
        [v, t, p],
        [q, v, p],
        [p, v, t],
        [p, q, v],
        [t, p, v],
        [v, p, q]
      ][hi];

      return {
        r: c[0] * 255,
        g: c[1] * 255,
        b: c[2] * 255
      };

    },

    rgb_to_hsv: function(r, g, b) {

      var min = Math.min(r, g, b),
          max = Math.max(r, g, b),
          delta = max - min,
          h, s;

      if (max != 0) {
        s = delta / max;
      } else {
        return {
          h: NaN,
          s: 0,
          v: 0
        };
      }

      if (r == max) {
        h = (g - b) / delta;
      } else if (g == max) {
        h = 2 + (b - r) / delta;
      } else {
        h = 4 + (r - g) / delta;
      }
      h /= 6;
      if (h < 0) {
        h += 1;
      }

      return {
        h: h * 360,
        s: s,
        v: max / 255
      };
    },

    rgb_to_hex: function(r, g, b) {
      var hex = this.hex_with_component(0, 2, r);
      hex = this.hex_with_component(hex, 1, g);
      hex = this.hex_with_component(hex, 0, b);
      return hex;
    },

    component_from_hex: function(hex, componentIndex) {
      return (hex >> (componentIndex * 8)) & 0xFF;
    },

    hex_with_component: function(hex, componentIndex, value) {
      return value << (tmpComponent = componentIndex * 8) | (hex & ~ (0xFF << tmpComponent));
    }

  }

})(),
dat.color.toString,
dat.utils.common);
});

var index = dat_gui;
var color = dat_color;

index.color = color;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var additional = {
  wireframe: {
    wireframe: 'boolean',
    wireframeLinecap: ['butt', 'round', 'square'],
    wireframeLinejoin: ['round', 'bevel', 'miter'],
    wireframeLinewidth: 'number'
  },

  refr: {
    reflectivity: 'number',
    refractionRatio: 'number'
  },

  light: {
    lightMap: 'texture',
    lightMapIntensity: 'number'
  },

  displacement: {
    displacementScale: 'number',
    displacementBias: 'number',
    displacementMap: 'texture'
  },

  emissive: {
    emissive: 'color',
    emissiveMap: 'texture',
    emissiveIntensity: 'number'
  }
};

var add = function add(origin) {
  for (var _len = arguments.length, addv = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    addv[_key - 1] = arguments[_key];
  }

  return Object.assign.apply(Object, [origin].concat(toConsumableArray(addv.map(function (value) {
    return additional[value];
  }))));
};

var materials = {
  any: add({
    side: { FrontSide: three.FrontSide, BackSide: three.BackSide, DoubleSide: three.DoubleSide },
    shading: { SmoothShading: three.SmoothShading, FlatShading: three.FlatShading },
    blending: {
      NoBlending: three.NoBlending, NormalBlending: three.NormalBlending, AdditiveBlending: three.AdditiveBlending, SubtractiveBlending: three.SubtractiveBlending, MultiplyBlending: three.MultiplyBlending, CustomBlending: three.CustomBlending
    },
    depthFunc: {
      NeverDepth: three.NeverDepth, AlwaysDepth: three.AlwaysDepth, LessDepth: three.LessDepth, LessEqualDepth: three.LessEqualDepth, GreaterEqualDepth: three.GreaterEqualDepth, GreaterDepth: three.GreaterDepth, NotEqualDepth: three.NotEqualDepth
    }
  }, 'wireframe'),

  MeshBasicMaterial: {
    color: 'color',
    lights: 'boolean',
    linewidth: 'number',
    linecap: ['butt', 'round', 'square'],
    linejoin: ['round', 'bevel', 'miter']
  },

  MeshLambertMaterial: add({
    color: 'color'
  }, 'emissive', 'refr', 'light'),

  MeshPhongMaterial: add({
    color: 'color'
  }, 'displacement', 'emissive'),

  MeshDepthMaterial: {}
  // To be continued...
};

var DatAPI = function () {
  function DatAPI() {
    classCallCheck(this, DatAPI);
  }

  createClass(DatAPI, [{
    key: 'foldObject',
    value: function foldObject(object, origin) {
      var instance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.fold;
      var onChange = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

      for (var key in origin) {
        var value = object[key];
        if (!value) continue;

        if (value.isColor) {
          this.addColor(object, key, instance);
        } else if (_typeof(origin[key]) === 'object') {
          if (object[key] === object) continue;
          this.foldObject(object[key], origin[key], instance.addFolder(key));
        } else {
          var range = '1' + '0'.repeat(value.toString().length);

          instance.add(object, key).min(0).step(range > 10 ? 1 : 0.1).onChange(onChange);
        }
      }
    }
  }, {
    key: 'guiTransforms',
    value: function guiTransforms(native) {
      var instance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.fold;

      if (!this.params.transforms) return;

      var controller = instance.addFolder('transforms');

      // position
      var position = controller.addFolder('position');
      position.add(native.position, 'x');
      position.add(native.position, 'y');
      position.add(native.position, 'z');

      // rotation
      var rotation = controller.addFolder('rotation');
      rotation.add(native.rotation, 'x').step(0.1);
      rotation.add(native.rotation, 'y').step(0.1);
      rotation.add(native.rotation, 'z').step(0.1);

      // scale
      if (!native.scale) return;
      var scale = controller.addFolder('scale');
      scale.add(native.scale, 'x').step(0.1);
      scale.add(native.scale, 'y').step(0.1);
      scale.add(native.scale, 'z').step(0.1);
    }
  }]);
  return DatAPI;
}();

var DatMeshModule = function (_DatAPI) {
  inherits(DatMeshModule, _DatAPI);

  function DatMeshModule() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var gui = arguments[1];
    classCallCheck(this, DatMeshModule);

    var _this = possibleConstructorReturn(this, (DatMeshModule.__proto__ || Object.getPrototypeOf(DatMeshModule)).call(this));

    _this.bridge = {
      material: function material(_material, self) {
        if (!self.params.material) return _material;

        var folder = self.fold.addFolder('material');
        self.guiMaterial(this, _material, folder);

        return _material;
      },
      geometry: function geometry(_geometry, self) {
        if (!self.params.geometry) return _geometry;
        if (!this.g_) throw new Error('WHS.DynamicGeometryModule should be used in a component (before gui)');

        var folder = self.fold.addFolder('geometry');
        self.guiGeometry(this, folder);

        return _geometry;
      },
      mesh: function mesh(_mesh, self) {
        var _this2 = this;

        if (!self.customMaterials) return _mesh;

        self.customMaterials.current = _mesh.material;

        // const matAlias = {material: 'current'};
        var keys = Object.keys(self.customMaterials);
        var folder = self.fold;

        folder.add({ type: 'current' }, 'type', keys).onChange(function (v) {
          _mesh.material = self.customMaterials[v];
          folder.removeFolder('material');
          self.guiMaterial(_this2, _mesh.material, folder.addFolder('material'));
        });

        return _mesh;
      },
      onWrap: function onWrap(a, self) {
        self.guiTransforms(this.native, self.fold);
      }
    };


    _this.params = Object.assign({
      name: 'Unknown mesh',
      geometry: true,
      material: true,
      transforms: true,
      gui: false
    }, params);

    _this.gui = gui;
    _this.fold = _this.gui.addFolder(_this.params.name);
    _this.customMaterials = false;
    return _this;
  }

  createClass(DatMeshModule, [{
    key: 'addColor',
    value: function addColor(object, property) {
      var instance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.fold;

      var color = object[property];

      instance.addColor(defineProperty({}, property, color.getHex()), property).onChange(function (value) {
        if (typeof value === 'string') value.replace('#', '0x');
        color.setHex(value);
      });
    }
  }, {
    key: 'guiMaterial',
    value: function guiMaterial(component, material) {
      var _this3 = this;

      var instance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.fold;

      var paramsProcessor = function paramsProcessor(params) {
        for (var key in params) {
          if (params[key] && material[key] !== undefined) {
            switch (params[key]) {
              case 'color':
                _this3.addColor(material, key, instance);
                break;
              case 'boolean':
                instance.add(material, key);
                break;
              case 'number':
                instance.add(material, key);
                break;
              case 'texture':
                // TODO
                break;
              default:
                instance.add(material, key, params[key]);
            }
          }
        }
      };

      paramsProcessor(materials[material.type]);
      paramsProcessor(materials.any);
    }
  }, {
    key: 'guiGeometry',
    value: function guiGeometry(component) {
      var instance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.fold;

      if (!component.g_) throw new Error('DatGUIModule requires WHS.DynamicGeometryModule for geometry updates.');

      var geomParams = component.params.geometry;
      var geomData = this.params.geometry;

      var _loop = function _loop(key) {
        var data = geomData[key];

        var range = data && data.range ? data.range : [0, 100];

        instance.add(geomParams, key).min(range[0]).max(range[1]).step(key.indexOf('Segments') > 0 ? 1 : 0.1).onChange(function (value) {
          component.g_(defineProperty({}, key, value));
        });
      };

      for (var key in geomParams) {
        _loop(key);
      }
    }
  }, {
    key: 'materials',
    value: function materials$$1() {
      var _materials = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.customMaterials = _materials;

      return this;
    }
  }]);
  return DatMeshModule;
}(DatAPI);

var DatLightModule = function (_DatAPI) {
  inherits(DatLightModule, _DatAPI);

  function DatLightModule() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var gui = arguments[1];
    classCallCheck(this, DatLightModule);

    var _this = possibleConstructorReturn(this, (DatLightModule.__proto__ || Object.getPrototypeOf(DatLightModule)).call(this));

    _this.bridge = {
      light: function light(_light, self) {
        if (!self.params.light) return _light;

        self.foldObject(_light, this.params, self.fold.addFolder('light'));
        self.foldObject(_light.shadow, this.params.shadow, self.fold.addFolder('shadow'));

        return _light;
      },
      onWrap: function onWrap(a, self) {
        self.guiTransforms(this.native, self.fold);
      }
    };


    _this.params = Object.assign({
      name: 'Unknown light',
      light: true,
      shadow: true,
      transforms: true,
      gui: false
    }, params);

    _this.gui = gui;
    _this.fold = _this.gui.addFolder(_this.params.name);
    return _this;
  }

  createClass(DatLightModule, [{
    key: 'addColor',
    value: function addColor(object, property) {
      var instance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.fold;

      var color = object[property];

      instance.addColor(defineProperty({}, property, color.getHex()), property).onChange(function (value) {
        if (typeof value === 'string') value.replace('#', '0x');
        color.setHex(value);
      });
    }
  }]);
  return DatLightModule;
}(DatAPI);

var DatCameraModule = function (_DatAPI) {
  inherits(DatCameraModule, _DatAPI);

  function DatCameraModule() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var gui = arguments[1];
    classCallCheck(this, DatCameraModule);

    var _this = possibleConstructorReturn(this, (DatCameraModule.__proto__ || Object.getPrototypeOf(DatCameraModule)).call(this));

    _this.bridge = {
      camera: function camera(_camera, self) {
        if (!self.params.camera) return _camera;
        self.foldObject(_camera, this.params, self.fold, function () {
          _camera.updateProjectionMatrix();
        });

        return _camera;
      },
      onWrap: function onWrap(a, self) {
        self.guiTransforms(this.native, self.fold);
      }
    };


    _this.params = Object.assign({
      name: 'Unknown camera',
      transforms: true,
      camera: true
    }, params);

    _this.gui = gui;
    _this.fold = _this.gui.addFolder(_this.params.name);
    return _this;
  }

  return DatCameraModule;
}(DatAPI);

var DatCustomModule = function () {
  function DatCustomModule() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var gui = arguments[1];
    classCallCheck(this, DatCustomModule);

    this.props = props;
    this.gui = gui;

    props.forEach(this.add.bind(this));
  }

  createClass(DatCustomModule, [{
    key: "add",
    value: function add(_ref) {
      var name = _ref.name,
          value = _ref.value,
          _ref$range = _ref.range,
          range = _ref$range === undefined ? [false, false] : _ref$range,
          _ref$step = _ref.step,
          step = _ref$step === undefined ? 1 : _ref$step,
          onChange = _ref.onChange,
          onFinishChange = _ref.onFinishChange,
          _ref$listen = _ref.listen,
          listen = _ref$listen === undefined ? false : _ref$listen;

      var controller = this.gui.add(defineProperty({}, name, value), name);

      if (range[0] !== false) controller.min(range[0]);
      if (range[1] !== false) controller.max(range[1]);

      controller.step(step);

      if (onChange) controller.onChange(onChange);
      if (onFinishChange) controller.onFinishChange(onFinishChange);
      if (listen) controller.listen();

      return controller;
    }
  }]);
  return DatCustomModule;
}();

// Polyfill
index.GUI.prototype.removeFolder = function (name) {
  var folder = this.__folders[name];
  if (!folder) {
    return;
  }
  folder.close();
  this.__ul.removeChild(folder.domElement.parentNode);
  delete this.__folders[name];
  this.onResize();
};

var DatGUIModule = function () {
  createClass(DatGUIModule, null, [{
    key: 'new',
    value: function _new(params) {
      return new DatGUIModule(new index.GUI(params));
    }
  }]);

  function DatGUIModule() {
    var gui = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new index.GUI({ autoPlace: false });
    classCallCheck(this, DatGUIModule);

    this.gui = gui;
  }

  createClass(DatGUIModule, [{
    key: 'manager',
    value: function manager(_manager) {
      _manager.define('gui/dat.gui');
      var dom = this.gui.domElement;
      var style = dom.style;

      style.position = 'absolute';
      style.top = 0;
      style.right = '20px';

      _manager.get('element').appendChild(this.gui.domElement);
    }
  }, {
    key: 'set',
    value: function set$$1(gui) {
      this.gui = gui;
      return this;
    }
  }, {
    key: 'folder',
    value: function folder() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'folder';

      return new DatGUIModule(this.gui.addFolder(name));
    }
  }, {
    key: 'Mesh',
    value: function Mesh() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var gui = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.gui;

      return new DatMeshModule(params, gui);
    }
  }, {
    key: 'Light',
    value: function Light() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var gui = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.gui;

      return new DatLightModule(params, gui);
    }
  }, {
    key: 'Camera',
    value: function Camera() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var gui = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.gui;

      return new DatCameraModule(params, gui);
    }
  }, {
    key: 'Custom',
    value: function Custom() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var gui = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.gui;

      return new DatCustomModule(params, gui);
    }
  }]);
  return DatGUIModule;
}();

DatGUIModule.dat = index;

return DatGUIModule;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0R1VJTW9kdWxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvbW9kdWxlcy9leHRyYS9ub2RlX21vZHVsZXMvZGF0LWd1aS92ZW5kb3IvZGF0Lmd1aS5qcyIsIi4uL3NyYy9tb2R1bGVzL2V4dHJhL25vZGVfbW9kdWxlcy9kYXQtZ3VpL3ZlbmRvci9kYXQuY29sb3IuanMiLCIuLi9zcmMvbW9kdWxlcy9leHRyYS9ub2RlX21vZHVsZXMvZGF0LWd1aS9pbmRleC5qcyIsIi4uL3NyYy9tb2R1bGVzL2V4dHJhL2RhdGd1aS9tYXRlcmlhbHMuanMiLCIuLi9zcmMvbW9kdWxlcy9leHRyYS9kYXRndWkvRGF0QVBJLmpzIiwiLi4vc3JjL21vZHVsZXMvZXh0cmEvZGF0Z3VpL0RhdE1lc2hNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9leHRyYS9kYXRndWkvRGF0TGlnaHRNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9leHRyYS9kYXRndWkvRGF0Q2FtZXJhTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvZXh0cmEvZGF0Z3VpL0RhdEN1c3RvbU1vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2V4dHJhL0RhdEdVSU1vZHVsZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGRhdC1ndWkgSmF2YVNjcmlwdCBDb250cm9sbGVyIExpYnJhcnlcbiAqIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9kYXQtZ3VpXG4gKlxuICogQ29weXJpZ2h0IDIwMTEgRGF0YSBBcnRzIFRlYW0sIEdvb2dsZSBDcmVhdGl2ZSBMYWJcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKi9cblxuLyoqIEBuYW1lc3BhY2UgKi9cbnZhciBkYXQgPSBtb2R1bGUuZXhwb3J0cyA9IGRhdCB8fCB7fTtcblxuLyoqIEBuYW1lc3BhY2UgKi9cbmRhdC5ndWkgPSBkYXQuZ3VpIHx8IHt9O1xuXG4vKiogQG5hbWVzcGFjZSAqL1xuZGF0LnV0aWxzID0gZGF0LnV0aWxzIHx8IHt9O1xuXG4vKiogQG5hbWVzcGFjZSAqL1xuZGF0LmNvbnRyb2xsZXJzID0gZGF0LmNvbnRyb2xsZXJzIHx8IHt9O1xuXG4vKiogQG5hbWVzcGFjZSAqL1xuZGF0LmRvbSA9IGRhdC5kb20gfHwge307XG5cbi8qKiBAbmFtZXNwYWNlICovXG5kYXQuY29sb3IgPSBkYXQuY29sb3IgfHwge307XG5cbmRhdC51dGlscy5jc3MgPSAoZnVuY3Rpb24gKCkge1xuICByZXR1cm4ge1xuICAgIGxvYWQ6IGZ1bmN0aW9uICh1cmwsIGRvYykge1xuICAgICAgZG9jID0gZG9jIHx8IGRvY3VtZW50O1xuICAgICAgdmFyIGxpbmsgPSBkb2MuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgICAgbGluay50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgICAgbGluay5ocmVmID0gdXJsO1xuICAgICAgZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQobGluayk7XG4gICAgfSxcbiAgICBpbmplY3Q6IGZ1bmN0aW9uKGNzcywgZG9jKSB7XG4gICAgICBkb2MgPSBkb2MgfHwgZG9jdW1lbnQ7XG4gICAgICB2YXIgaW5qZWN0ZWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgaW5qZWN0ZWQudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICBpbmplY3RlZC5pbm5lckhUTUwgPSBjc3M7XG4gICAgICBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChpbmplY3RlZCk7XG4gICAgfVxuICB9XG59KSgpO1xuXG5cbmRhdC51dGlscy5jb21tb24gPSAoZnVuY3Rpb24gKCkge1xuICBcbiAgdmFyIEFSUl9FQUNIID0gQXJyYXkucHJvdG90eXBlLmZvckVhY2g7XG4gIHZhciBBUlJfU0xJQ0UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG5cbiAgLyoqXG4gICAqIEJhbmQtYWlkIG1ldGhvZHMgZm9yIHRoaW5ncyB0aGF0IHNob3VsZCBiZSBhIGxvdCBlYXNpZXIgaW4gSmF2YVNjcmlwdC5cbiAgICogSW1wbGVtZW50YXRpb24gYW5kIHN0cnVjdHVyZSBpbnNwaXJlZCBieSB1bmRlcnNjb3JlLmpzXG4gICAqIGh0dHA6Ly9kb2N1bWVudGNsb3VkLmdpdGh1Yi5jb20vdW5kZXJzY29yZS9cbiAgICovXG5cbiAgcmV0dXJuIHsgXG4gICAgXG4gICAgQlJFQUs6IHt9LFxuICBcbiAgICBleHRlbmQ6IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgXG4gICAgICB0aGlzLmVhY2goQVJSX1NMSUNFLmNhbGwoYXJndW1lbnRzLCAxKSwgZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIFxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKVxuICAgICAgICAgIGlmICghdGhpcy5pc1VuZGVmaW5lZChvYmpba2V5XSkpIFxuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgXG4gICAgICB9LCB0aGlzKTtcbiAgICAgIFxuICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgIFxuICAgIH0sXG4gICAgXG4gICAgZGVmYXVsdHM6IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgXG4gICAgICB0aGlzLmVhY2goQVJSX1NMSUNFLmNhbGwoYXJndW1lbnRzLCAxKSwgZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIFxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKVxuICAgICAgICAgIGlmICh0aGlzLmlzVW5kZWZpbmVkKHRhcmdldFtrZXldKSkgXG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IG9ialtrZXldO1xuICAgICAgICBcbiAgICAgIH0sIHRoaXMpO1xuICAgICAgXG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIFxuICAgIH0sXG4gICAgXG4gICAgY29tcG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdG9DYWxsID0gQVJSX1NMSUNFLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBBUlJfU0xJQ0UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgICAgICBmb3IgKHZhciBpID0gdG9DYWxsLmxlbmd0aCAtMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICBhcmdzID0gW3RvQ2FsbFtpXS5hcHBseSh0aGlzLCBhcmdzKV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIGFyZ3NbMF07XG4gICAgICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICBlYWNoOiBmdW5jdGlvbihvYmosIGl0ciwgc2NvcGUpIHtcblxuICAgICAgXG4gICAgICBpZiAoQVJSX0VBQ0ggJiYgb2JqLmZvckVhY2ggPT09IEFSUl9FQUNIKSB7IFxuICAgICAgICBcbiAgICAgICAgb2JqLmZvckVhY2goaXRyLCBzY29wZSk7XG4gICAgICAgIFxuICAgICAgfSBlbHNlIGlmIChvYmoubGVuZ3RoID09PSBvYmoubGVuZ3RoICsgMCkgeyAvLyBJcyBudW1iZXIgYnV0IG5vdCBOYU5cbiAgICAgICAgXG4gICAgICAgIGZvciAodmFyIGtleSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBrZXkgPCBsOyBrZXkrKylcbiAgICAgICAgICBpZiAoa2V5IGluIG9iaiAmJiBpdHIuY2FsbChzY29wZSwgb2JqW2tleV0sIGtleSkgPT09IHRoaXMuQlJFQUspIFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIFxuICAgICAgICAgIGlmIChpdHIuY2FsbChzY29wZSwgb2JqW2tleV0sIGtleSkgPT09IHRoaXMuQlJFQUspXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBcbiAgICAgIH1cbiAgICAgICAgICAgIFxuICAgIH0sXG4gICAgXG4gICAgZGVmZXI6IGZ1bmN0aW9uKGZuYykge1xuICAgICAgc2V0VGltZW91dChmbmMsIDApO1xuICAgIH0sXG4gICAgXG4gICAgdG9BcnJheTogZnVuY3Rpb24ob2JqKSB7XG4gICAgICBpZiAob2JqLnRvQXJyYXkpIHJldHVybiBvYmoudG9BcnJheSgpO1xuICAgICAgcmV0dXJuIEFSUl9TTElDRS5jYWxsKG9iaik7XG4gICAgfSxcblxuICAgIGlzVW5kZWZpbmVkOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IHVuZGVmaW5lZDtcbiAgICB9LFxuICAgIFxuICAgIGlzTnVsbDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09PSBudWxsO1xuICAgIH0sXG4gICAgXG4gICAgaXNOYU46IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAhPT0gb2JqO1xuICAgIH0sXG4gICAgXG4gICAgaXNBcnJheTogQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmouY29uc3RydWN0b3IgPT09IEFycmF5O1xuICAgIH0sXG4gICAgXG4gICAgaXNPYmplY3Q6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gT2JqZWN0KG9iaik7XG4gICAgfSxcbiAgICBcbiAgICBpc051bWJlcjogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09PSBvYmorMDtcbiAgICB9LFxuICAgIFxuICAgIGlzU3RyaW5nOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IG9iaisnJztcbiAgICB9LFxuICAgIFxuICAgIGlzQm9vbGVhbjogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09PSBmYWxzZSB8fCBvYmogPT09IHRydWU7XG4gICAgfSxcbiAgICBcbiAgICBpc0Z1bmN0aW9uOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgICB9XG4gIFxuICB9O1xuICAgIFxufSkoKTtcblxuXG5kYXQuY29udHJvbGxlcnMuQ29udHJvbGxlciA9IChmdW5jdGlvbiAoY29tbW9uKSB7XG5cbiAgLyoqXG4gICAqIEBjbGFzcyBBbiBcImFic3RyYWN0XCIgY2xhc3MgdGhhdCByZXByZXNlbnRzIGEgZ2l2ZW4gcHJvcGVydHkgb2YgYW4gb2JqZWN0LlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSBtYW5pcHVsYXRlZFxuICAgKlxuICAgKiBAbWVtYmVyIGRhdC5jb250cm9sbGVyc1xuICAgKi9cbiAgdmFyIENvbnRyb2xsZXIgPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7XG5cbiAgICB0aGlzLmluaXRpYWxWYWx1ZSA9IG9iamVjdFtwcm9wZXJ0eV07XG5cbiAgICAvKipcbiAgICAgKiBUaG9zZSB3aG8gZXh0ZW5kIHRoaXMgY2xhc3Mgd2lsbCBwdXQgdGhlaXIgRE9NIGVsZW1lbnRzIGluIGhlcmUuXG4gICAgICogQHR5cGUge0RPTUVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy5kb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgb2JqZWN0IHRvIG1hbmlwdWxhdGVcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHRoaXMub2JqZWN0ID0gb2JqZWN0O1xuXG4gICAgLyoqXG4gICAgICogVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIG1hbmlwdWxhdGVcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMucHJvcGVydHkgPSBwcm9wZXJ0eTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgb24gY2hhbmdlLlxuICAgICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgdGhpcy5fX29uQ2hhbmdlID0gdW5kZWZpbmVkO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBvbiBmaW5pc2hpbmcgY2hhbmdlLlxuICAgICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgdGhpcy5fX29uRmluaXNoQ2hhbmdlID0gdW5kZWZpbmVkO1xuXG4gIH07XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgQ29udHJvbGxlci5wcm90b3R5cGUsXG5cbiAgICAgIC8qKiBAbGVuZHMgZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXIucHJvdG90eXBlICovXG4gICAgICB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNwZWNpZnkgdGhhdCBhIGZ1bmN0aW9uIGZpcmUgZXZlcnkgdGltZSBzb21lb25lIGNoYW5nZXMgdGhlIHZhbHVlIHdpdGhcbiAgICAgICAgICogdGhpcyBDb250cm9sbGVyLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbmMgVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aGVuZXZlciB0aGUgdmFsdWVcbiAgICAgICAgICogaXMgbW9kaWZpZWQgdmlhIHRoaXMgQ29udHJvbGxlci5cbiAgICAgICAgICogQHJldHVybnMge2RhdC5jb250cm9sbGVycy5Db250cm9sbGVyfSB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24oZm5jKSB7XG4gICAgICAgICAgdGhpcy5fX29uQ2hhbmdlID0gZm5jO1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTcGVjaWZ5IHRoYXQgYSBmdW5jdGlvbiBmaXJlIGV2ZXJ5IHRpbWUgc29tZW9uZSBcImZpbmlzaGVzXCIgY2hhbmdpbmdcbiAgICAgICAgICogdGhlIHZhbHVlIHdpaCB0aGlzIENvbnRyb2xsZXIuIFVzZWZ1bCBmb3IgdmFsdWVzIHRoYXQgY2hhbmdlXG4gICAgICAgICAqIGluY3JlbWVudGFsbHkgbGlrZSBudW1iZXJzIG9yIHN0cmluZ3MuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuYyBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdoZW5ldmVyXG4gICAgICAgICAqIHNvbWVvbmUgXCJmaW5pc2hlc1wiIGNoYW5naW5nIHRoZSB2YWx1ZSB2aWEgdGhpcyBDb250cm9sbGVyLlxuICAgICAgICAgKiBAcmV0dXJucyB7ZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXJ9IHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIG9uRmluaXNoQ2hhbmdlOiBmdW5jdGlvbihmbmMpIHtcbiAgICAgICAgICB0aGlzLl9fb25GaW5pc2hDaGFuZ2UgPSBmbmM7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoYW5nZSB0aGUgdmFsdWUgb2YgPGNvZGU+b2JqZWN0W3Byb3BlcnR5XTwvY29kZT5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG5ld1ZhbHVlIFRoZSBuZXcgdmFsdWUgb2YgPGNvZGU+b2JqZWN0W3Byb3BlcnR5XTwvY29kZT5cbiAgICAgICAgICovXG4gICAgICAgIHNldFZhbHVlOiBmdW5jdGlvbihuZXdWYWx1ZSkge1xuICAgICAgICAgIHRoaXMub2JqZWN0W3RoaXMucHJvcGVydHldID0gbmV3VmFsdWU7XG4gICAgICAgICAgaWYgKHRoaXMuX19vbkNoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5fX29uQ2hhbmdlLmNhbGwodGhpcywgbmV3VmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnVwZGF0ZURpc3BsYXkoKTtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB0aGUgdmFsdWUgb2YgPGNvZGU+b2JqZWN0W3Byb3BlcnR5XTwvY29kZT5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMge09iamVjdH0gVGhlIGN1cnJlbnQgdmFsdWUgb2YgPGNvZGU+b2JqZWN0W3Byb3BlcnR5XTwvY29kZT5cbiAgICAgICAgICovXG4gICAgICAgIGdldFZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RbdGhpcy5wcm9wZXJ0eV07XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlZnJlc2hlcyB0aGUgdmlzdWFsIGRpc3BsYXkgb2YgYSBDb250cm9sbGVyIGluIG9yZGVyIHRvIGtlZXAgc3luY1xuICAgICAgICAgKiB3aXRoIHRoZSBvYmplY3QncyBjdXJyZW50IHZhbHVlLlxuICAgICAgICAgKiBAcmV0dXJucyB7ZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXJ9IHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIHVwZGF0ZURpc3BsYXk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gdHJ1ZSBpZiB0aGUgdmFsdWUgaGFzIGRldmlhdGVkIGZyb20gaW5pdGlhbFZhbHVlXG4gICAgICAgICAqL1xuICAgICAgICBpc01vZGlmaWVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5pbml0aWFsVmFsdWUgIT09IHRoaXMuZ2V0VmFsdWUoKVxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICApO1xuXG4gIHJldHVybiBDb250cm9sbGVyO1xuXG5cbn0pKGRhdC51dGlscy5jb21tb24pO1xuXG5cbmRhdC5kb20uZG9tID0gKGZ1bmN0aW9uIChjb21tb24pIHtcblxuICB2YXIgRVZFTlRfTUFQID0ge1xuICAgICdIVE1MRXZlbnRzJzogWydjaGFuZ2UnXSxcbiAgICAnTW91c2VFdmVudHMnOiBbJ2NsaWNrJywnbW91c2Vtb3ZlJywnbW91c2Vkb3duJywnbW91c2V1cCcsICdtb3VzZW92ZXInXSxcbiAgICAnS2V5Ym9hcmRFdmVudHMnOiBbJ2tleWRvd24nXVxuICB9O1xuXG4gIHZhciBFVkVOVF9NQVBfSU5WID0ge307XG4gIGNvbW1vbi5lYWNoKEVWRU5UX01BUCwgZnVuY3Rpb24odiwgaykge1xuICAgIGNvbW1vbi5lYWNoKHYsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIEVWRU5UX01BUF9JTlZbZV0gPSBrO1xuICAgIH0pO1xuICB9KTtcblxuICB2YXIgQ1NTX1ZBTFVFX1BJWEVMUyA9IC8oXFxkKyhcXC5cXGQrKT8pcHgvO1xuXG4gIGZ1bmN0aW9uIGNzc1ZhbHVlVG9QaXhlbHModmFsKSB7XG5cbiAgICBpZiAodmFsID09PSAnMCcgfHwgY29tbW9uLmlzVW5kZWZpbmVkKHZhbCkpIHJldHVybiAwO1xuXG4gICAgdmFyIG1hdGNoID0gdmFsLm1hdGNoKENTU19WQUxVRV9QSVhFTFMpO1xuXG4gICAgaWYgKCFjb21tb24uaXNOdWxsKG1hdGNoKSkge1xuICAgICAgcmV0dXJuIHBhcnNlRmxvYXQobWF0Y2hbMV0pO1xuICAgIH1cblxuICAgIC8vIFRPRE8gLi4uZW1zPyAlP1xuXG4gICAgcmV0dXJuIDA7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBAbmFtZXNwYWNlXG4gICAqIEBtZW1iZXIgZGF0LmRvbVxuICAgKi9cbiAgdmFyIGRvbSA9IHtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICogQHBhcmFtIHNlbGVjdGFibGVcbiAgICAgKi9cbiAgICBtYWtlU2VsZWN0YWJsZTogZnVuY3Rpb24oZWxlbSwgc2VsZWN0YWJsZSkge1xuXG4gICAgICBpZiAoZWxlbSA9PT0gdW5kZWZpbmVkIHx8IGVsZW0uc3R5bGUgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuXG4gICAgICBlbGVtLm9uc2VsZWN0c3RhcnQgPSBzZWxlY3RhYmxlID8gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gOiBmdW5jdGlvbigpIHtcbiAgICAgIH07XG5cbiAgICAgIGVsZW0uc3R5bGUuTW96VXNlclNlbGVjdCA9IHNlbGVjdGFibGUgPyAnYXV0bycgOiAnbm9uZSc7XG4gICAgICBlbGVtLnN0eWxlLktodG1sVXNlclNlbGVjdCA9IHNlbGVjdGFibGUgPyAnYXV0bycgOiAnbm9uZSc7XG4gICAgICBlbGVtLnVuc2VsZWN0YWJsZSA9IHNlbGVjdGFibGUgPyAnb24nIDogJ29mZic7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWxlbVxuICAgICAqIEBwYXJhbSBob3Jpem9udGFsXG4gICAgICogQHBhcmFtIHZlcnRpY2FsXG4gICAgICovXG4gICAgbWFrZUZ1bGxzY3JlZW46IGZ1bmN0aW9uKGVsZW0sIGhvcml6b250YWwsIHZlcnRpY2FsKSB7XG5cbiAgICAgIGlmIChjb21tb24uaXNVbmRlZmluZWQoaG9yaXpvbnRhbCkpIGhvcml6b250YWwgPSB0cnVlO1xuICAgICAgaWYgKGNvbW1vbi5pc1VuZGVmaW5lZCh2ZXJ0aWNhbCkpIHZlcnRpY2FsID0gdHJ1ZTtcblxuICAgICAgZWxlbS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cbiAgICAgIGlmIChob3Jpem9udGFsKSB7XG4gICAgICAgIGVsZW0uc3R5bGUubGVmdCA9IDA7XG4gICAgICAgIGVsZW0uc3R5bGUucmlnaHQgPSAwO1xuICAgICAgfVxuICAgICAgaWYgKHZlcnRpY2FsKSB7XG4gICAgICAgIGVsZW0uc3R5bGUudG9wID0gMDtcbiAgICAgICAgZWxlbS5zdHlsZS5ib3R0b20gPSAwO1xuICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGVsZW1cbiAgICAgKiBAcGFyYW0gZXZlbnRUeXBlXG4gICAgICogQHBhcmFtIHBhcmFtc1xuICAgICAqL1xuICAgIGZha2VFdmVudDogZnVuY3Rpb24oZWxlbSwgZXZlbnRUeXBlLCBwYXJhbXMsIGF1eCkge1xuICAgICAgcGFyYW1zID0gcGFyYW1zIHx8IHt9O1xuICAgICAgdmFyIGNsYXNzTmFtZSA9IEVWRU5UX01BUF9JTlZbZXZlbnRUeXBlXTtcbiAgICAgIGlmICghY2xhc3NOYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRXZlbnQgdHlwZSAnICsgZXZlbnRUeXBlICsgJyBub3Qgc3VwcG9ydGVkLicpO1xuICAgICAgfVxuICAgICAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KGNsYXNzTmFtZSk7XG4gICAgICBzd2l0Y2ggKGNsYXNzTmFtZSkge1xuICAgICAgICBjYXNlICdNb3VzZUV2ZW50cyc6XG4gICAgICAgICAgdmFyIGNsaWVudFggPSBwYXJhbXMueCB8fCBwYXJhbXMuY2xpZW50WCB8fCAwO1xuICAgICAgICAgIHZhciBjbGllbnRZID0gcGFyYW1zLnkgfHwgcGFyYW1zLmNsaWVudFkgfHwgMDtcbiAgICAgICAgICBldnQuaW5pdE1vdXNlRXZlbnQoZXZlbnRUeXBlLCBwYXJhbXMuYnViYmxlcyB8fCBmYWxzZSxcbiAgICAgICAgICAgICAgcGFyYW1zLmNhbmNlbGFibGUgfHwgdHJ1ZSwgd2luZG93LCBwYXJhbXMuY2xpY2tDb3VudCB8fCAxLFxuICAgICAgICAgICAgICAwLCAvL3NjcmVlbiBYXG4gICAgICAgICAgICAgIDAsIC8vc2NyZWVuIFlcbiAgICAgICAgICAgICAgY2xpZW50WCwgLy9jbGllbnQgWFxuICAgICAgICAgICAgICBjbGllbnRZLCAvL2NsaWVudCBZXG4gICAgICAgICAgICAgIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCAwLCBudWxsKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnS2V5Ym9hcmRFdmVudHMnOlxuICAgICAgICAgIHZhciBpbml0ID0gZXZ0LmluaXRLZXlib2FyZEV2ZW50IHx8IGV2dC5pbml0S2V5RXZlbnQ7IC8vIHdlYmtpdCB8fCBtb3pcbiAgICAgICAgICBjb21tb24uZGVmYXVsdHMocGFyYW1zLCB7XG4gICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY3RybEtleTogZmFsc2UsXG4gICAgICAgICAgICBhbHRLZXk6IGZhbHNlLFxuICAgICAgICAgICAgc2hpZnRLZXk6IGZhbHNlLFxuICAgICAgICAgICAgbWV0YUtleTogZmFsc2UsXG4gICAgICAgICAgICBrZXlDb2RlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBjaGFyQ29kZTogdW5kZWZpbmVkXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaW5pdChldmVudFR5cGUsIHBhcmFtcy5idWJibGVzIHx8IGZhbHNlLFxuICAgICAgICAgICAgICBwYXJhbXMuY2FuY2VsYWJsZSwgd2luZG93LFxuICAgICAgICAgICAgICBwYXJhbXMuY3RybEtleSwgcGFyYW1zLmFsdEtleSxcbiAgICAgICAgICAgICAgcGFyYW1zLnNoaWZ0S2V5LCBwYXJhbXMubWV0YUtleSxcbiAgICAgICAgICAgICAgcGFyYW1zLmtleUNvZGUsIHBhcmFtcy5jaGFyQ29kZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgZXZ0LmluaXRFdmVudChldmVudFR5cGUsIHBhcmFtcy5idWJibGVzIHx8IGZhbHNlLFxuICAgICAgICAgICAgICBwYXJhbXMuY2FuY2VsYWJsZSB8fCB0cnVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNvbW1vbi5kZWZhdWx0cyhldnQsIGF1eCk7XG4gICAgICBlbGVtLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWxlbVxuICAgICAqIEBwYXJhbSBldmVudFxuICAgICAqIEBwYXJhbSBmdW5jXG4gICAgICogQHBhcmFtIGJvb2xcbiAgICAgKi9cbiAgICBiaW5kOiBmdW5jdGlvbihlbGVtLCBldmVudCwgZnVuYywgYm9vbCkge1xuICAgICAgYm9vbCA9IGJvb2wgfHwgZmFsc2U7XG4gICAgICBpZiAoZWxlbS5hZGRFdmVudExpc3RlbmVyKVxuICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmMsIGJvb2wpO1xuICAgICAgZWxzZSBpZiAoZWxlbS5hdHRhY2hFdmVudClcbiAgICAgICAgZWxlbS5hdHRhY2hFdmVudCgnb24nICsgZXZlbnQsIGZ1bmMpO1xuICAgICAgcmV0dXJuIGRvbTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWxlbVxuICAgICAqIEBwYXJhbSBldmVudFxuICAgICAqIEBwYXJhbSBmdW5jXG4gICAgICogQHBhcmFtIGJvb2xcbiAgICAgKi9cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uKGVsZW0sIGV2ZW50LCBmdW5jLCBib29sKSB7XG4gICAgICBib29sID0gYm9vbCB8fCBmYWxzZTtcbiAgICAgIGlmIChlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIpXG4gICAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuYywgYm9vbCk7XG4gICAgICBlbHNlIGlmIChlbGVtLmRldGFjaEV2ZW50KVxuICAgICAgICBlbGVtLmRldGFjaEV2ZW50KCdvbicgKyBldmVudCwgZnVuYyk7XG4gICAgICByZXR1cm4gZG9tO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICogQHBhcmFtIGNsYXNzTmFtZVxuICAgICAqL1xuICAgIGFkZENsYXNzOiBmdW5jdGlvbihlbGVtLCBjbGFzc05hbWUpIHtcbiAgICAgIGlmIChlbGVtLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGVsZW0uY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICAgICAgfSBlbHNlIGlmIChlbGVtLmNsYXNzTmFtZSAhPT0gY2xhc3NOYW1lKSB7XG4gICAgICAgIHZhciBjbGFzc2VzID0gZWxlbS5jbGFzc05hbWUuc3BsaXQoLyArLyk7XG4gICAgICAgIGlmIChjbGFzc2VzLmluZGV4T2YoY2xhc3NOYW1lKSA9PSAtMSkge1xuICAgICAgICAgIGNsYXNzZXMucHVzaChjbGFzc05hbWUpO1xuICAgICAgICAgIGVsZW0uY2xhc3NOYW1lID0gY2xhc3Nlcy5qb2luKCcgJykucmVwbGFjZSgvXlxccysvLCAnJykucmVwbGFjZSgvXFxzKyQvLCAnJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBkb207XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGVsZW1cbiAgICAgKiBAcGFyYW0gY2xhc3NOYW1lXG4gICAgICovXG4gICAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uKGVsZW0sIGNsYXNzTmFtZSkge1xuICAgICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgICBpZiAoZWxlbS5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIC8vIGVsZW0uY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICAgICAgICB9IGVsc2UgaWYgKGVsZW0uY2xhc3NOYW1lID09PSBjbGFzc05hbWUpIHtcbiAgICAgICAgICBlbGVtLnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgY2xhc3NlcyA9IGVsZW0uY2xhc3NOYW1lLnNwbGl0KC8gKy8pO1xuICAgICAgICAgIHZhciBpbmRleCA9IGNsYXNzZXMuaW5kZXhPZihjbGFzc05hbWUpO1xuICAgICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xuICAgICAgICAgICAgY2xhc3Nlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgZWxlbS5jbGFzc05hbWUgPSBjbGFzc2VzLmpvaW4oJyAnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW0uY2xhc3NOYW1lID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRvbTtcbiAgICB9LFxuXG4gICAgaGFzQ2xhc3M6IGZ1bmN0aW9uKGVsZW0sIGNsYXNzTmFtZSkge1xuICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJyg/Ol58XFxcXHMrKScgKyBjbGFzc05hbWUgKyAnKD86XFxcXHMrfCQpJykudGVzdChlbGVtLmNsYXNzTmFtZSkgfHwgZmFsc2U7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGVsZW1cbiAgICAgKi9cbiAgICBnZXRXaWR0aDogZnVuY3Rpb24oZWxlbSkge1xuXG4gICAgICB2YXIgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW0pO1xuXG4gICAgICByZXR1cm4gY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsnYm9yZGVyLWxlZnQtd2lkdGgnXSkgK1xuICAgICAgICAgIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ2JvcmRlci1yaWdodC13aWR0aCddKSArXG4gICAgICAgICAgY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsncGFkZGluZy1sZWZ0J10pICtcbiAgICAgICAgICBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydwYWRkaW5nLXJpZ2h0J10pICtcbiAgICAgICAgICBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWyd3aWR0aCddKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWxlbVxuICAgICAqL1xuICAgIGdldEhlaWdodDogZnVuY3Rpb24oZWxlbSkge1xuXG4gICAgICB2YXIgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW0pO1xuXG4gICAgICByZXR1cm4gY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsnYm9yZGVyLXRvcC13aWR0aCddKSArXG4gICAgICAgICAgY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsnYm9yZGVyLWJvdHRvbS13aWR0aCddKSArXG4gICAgICAgICAgY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsncGFkZGluZy10b3AnXSkgK1xuICAgICAgICAgIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ3BhZGRpbmctYm90dG9tJ10pICtcbiAgICAgICAgICBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydoZWlnaHQnXSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGVsZW1cbiAgICAgKi9cbiAgICBnZXRPZmZzZXQ6IGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAgIHZhciBvZmZzZXQgPSB7bGVmdDogMCwgdG9wOjB9O1xuICAgICAgaWYgKGVsZW0ub2Zmc2V0UGFyZW50KSB7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICBvZmZzZXQubGVmdCArPSBlbGVtLm9mZnNldExlZnQ7XG4gICAgICAgICAgb2Zmc2V0LnRvcCArPSBlbGVtLm9mZnNldFRvcDtcbiAgICAgICAgfSB3aGlsZSAoZWxlbSA9IGVsZW0ub2Zmc2V0UGFyZW50KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvZmZzZXQ7XG4gICAgfSxcblxuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9wb3N0cy8yNjg0NTYxL3JldmlzaW9uc1xuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICovXG4gICAgaXNBY3RpdmU6IGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAgIHJldHVybiBlbGVtID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmICggZWxlbS50eXBlIHx8IGVsZW0uaHJlZiApO1xuICAgIH1cblxuICB9O1xuXG4gIHJldHVybiBkb207XG5cbn0pKGRhdC51dGlscy5jb21tb24pO1xuXG5cbmRhdC5jb250cm9sbGVycy5PcHRpb25Db250cm9sbGVyID0gKGZ1bmN0aW9uIChDb250cm9sbGVyLCBkb20sIGNvbW1vbikge1xuXG4gIC8qKlxuICAgKiBAY2xhc3MgUHJvdmlkZXMgYSBzZWxlY3QgaW5wdXQgdG8gYWx0ZXIgdGhlIHByb3BlcnR5IG9mIGFuIG9iamVjdCwgdXNpbmcgYVxuICAgKiBsaXN0IG9mIGFjY2VwdGVkIHZhbHVlcy5cbiAgICpcbiAgICogQGV4dGVuZHMgZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXJcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtPYmplY3R8c3RyaW5nW119IG9wdGlvbnMgQSBtYXAgb2YgbGFiZWxzIHRvIGFjY2VwdGFibGUgdmFsdWVzLCBvclxuICAgKiBhIGxpc3Qgb2YgYWNjZXB0YWJsZSBzdHJpbmcgdmFsdWVzLlxuICAgKlxuICAgKiBAbWVtYmVyIGRhdC5jb250cm9sbGVyc1xuICAgKi9cbiAgdmFyIE9wdGlvbkNvbnRyb2xsZXIgPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5LCBvcHRpb25zKSB7XG5cbiAgICBPcHRpb25Db250cm9sbGVyLnN1cGVyY2xhc3MuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5KTtcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZHJvcCBkb3duIG1lbnVcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgdGhpcy5fX3NlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuXG4gICAgaWYgKGNvbW1vbi5pc0FycmF5KG9wdGlvbnMpKSB7XG4gICAgICB2YXIgbWFwID0ge307XG4gICAgICBjb21tb24uZWFjaChvcHRpb25zLCBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIG1hcFtlbGVtZW50XSA9IGVsZW1lbnQ7XG4gICAgICB9KTtcbiAgICAgIG9wdGlvbnMgPSBtYXA7XG4gICAgfVxuXG4gICAgY29tbW9uLmVhY2gob3B0aW9ucywgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuXG4gICAgICB2YXIgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICBvcHQuaW5uZXJIVE1MID0ga2V5O1xuICAgICAgb3B0LnNldEF0dHJpYnV0ZSgndmFsdWUnLCB2YWx1ZSk7XG4gICAgICBfdGhpcy5fX3NlbGVjdC5hcHBlbmRDaGlsZChvcHQpO1xuXG4gICAgfSk7XG5cbiAgICAvLyBBY2tub3dsZWRnZSBvcmlnaW5hbCB2YWx1ZVxuICAgIHRoaXMudXBkYXRlRGlzcGxheSgpO1xuXG4gICAgZG9tLmJpbmQodGhpcy5fX3NlbGVjdCwgJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGRlc2lyZWRWYWx1ZSA9IHRoaXMub3B0aW9uc1t0aGlzLnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xuICAgICAgX3RoaXMuc2V0VmFsdWUoZGVzaXJlZFZhbHVlKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZG9tRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9fc2VsZWN0KTtcblxuICB9O1xuXG4gIE9wdGlvbkNvbnRyb2xsZXIuc3VwZXJjbGFzcyA9IENvbnRyb2xsZXI7XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgT3B0aW9uQ29udHJvbGxlci5wcm90b3R5cGUsXG4gICAgICBDb250cm9sbGVyLnByb3RvdHlwZSxcblxuICAgICAge1xuXG4gICAgICAgIHNldFZhbHVlOiBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgdmFyIHRvUmV0dXJuID0gT3B0aW9uQ29udHJvbGxlci5zdXBlcmNsYXNzLnByb3RvdHlwZS5zZXRWYWx1ZS5jYWxsKHRoaXMsIHYpO1xuICAgICAgICAgIGlmICh0aGlzLl9fb25GaW5pc2hDaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuX19vbkZpbmlzaENoYW5nZS5jYWxsKHRoaXMsIHRoaXMuZ2V0VmFsdWUoKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0b1JldHVybjtcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGVEaXNwbGF5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGlzLl9fc2VsZWN0LnZhbHVlID0gdGhpcy5nZXRWYWx1ZSgpO1xuICAgICAgICAgIHJldHVybiBPcHRpb25Db250cm9sbGVyLnN1cGVyY2xhc3MucHJvdG90eXBlLnVwZGF0ZURpc3BsYXkuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgKTtcblxuICByZXR1cm4gT3B0aW9uQ29udHJvbGxlcjtcblxufSkoZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXIsXG5kYXQuZG9tLmRvbSxcbmRhdC51dGlscy5jb21tb24pO1xuXG5cbmRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyID0gKGZ1bmN0aW9uIChDb250cm9sbGVyLCBjb21tb24pIHtcblxuICAvKipcbiAgICogQGNsYXNzIFJlcHJlc2VudHMgYSBnaXZlbiBwcm9wZXJ0eSBvZiBhbiBvYmplY3QgdGhhdCBpcyBhIG51bWJlci5cbiAgICpcbiAgICogQGV4dGVuZHMgZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXJcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIE9wdGlvbmFsIHBhcmFtZXRlcnNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtwYXJhbXMubWluXSBNaW5pbXVtIGFsbG93ZWQgdmFsdWVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtwYXJhbXMubWF4XSBNYXhpbXVtIGFsbG93ZWQgdmFsdWVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtwYXJhbXMuc3RlcF0gSW5jcmVtZW50IGJ5IHdoaWNoIHRvIGNoYW5nZSB2YWx1ZVxuICAgKlxuICAgKiBAbWVtYmVyIGRhdC5jb250cm9sbGVyc1xuICAgKi9cbiAgdmFyIE51bWJlckNvbnRyb2xsZXIgPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5LCBwYXJhbXMpIHtcblxuICAgIE51bWJlckNvbnRyb2xsZXIuc3VwZXJjbGFzcy5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHkpO1xuXG4gICAgcGFyYW1zID0gcGFyYW1zIHx8IHt9O1xuXG4gICAgdGhpcy5fX21pbiA9IHBhcmFtcy5taW47XG4gICAgdGhpcy5fX21heCA9IHBhcmFtcy5tYXg7XG4gICAgdGhpcy5fX3N0ZXAgPSBwYXJhbXMuc3RlcDtcblxuICAgIGlmIChjb21tb24uaXNVbmRlZmluZWQodGhpcy5fX3N0ZXApKSB7XG5cbiAgICAgIGlmICh0aGlzLmluaXRpYWxWYWx1ZSA9PSAwKSB7XG4gICAgICAgIHRoaXMuX19pbXBsaWVkU3RlcCA9IDE7IC8vIFdoYXQgYXJlIHdlLCBwc3ljaGljcz9cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEhleSBEb3VnLCBjaGVjayB0aGlzIG91dC5cbiAgICAgICAgdGhpcy5fX2ltcGxpZWRTdGVwID0gTWF0aC5wb3coMTAsIE1hdGguZmxvb3IoTWF0aC5sb2codGhpcy5pbml0aWFsVmFsdWUpL01hdGguTE4xMCkpLzEwO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhpcy5fX2ltcGxpZWRTdGVwID0gdGhpcy5fX3N0ZXA7XG5cbiAgICB9XG5cbiAgICB0aGlzLl9fcHJlY2lzaW9uID0gbnVtRGVjaW1hbHModGhpcy5fX2ltcGxpZWRTdGVwKTtcblxuXG4gIH07XG5cbiAgTnVtYmVyQ29udHJvbGxlci5zdXBlcmNsYXNzID0gQ29udHJvbGxlcjtcblxuICBjb21tb24uZXh0ZW5kKFxuXG4gICAgICBOdW1iZXJDb250cm9sbGVyLnByb3RvdHlwZSxcbiAgICAgIENvbnRyb2xsZXIucHJvdG90eXBlLFxuXG4gICAgICAvKiogQGxlbmRzIGRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyLnByb3RvdHlwZSAqL1xuICAgICAge1xuXG4gICAgICAgIHNldFZhbHVlOiBmdW5jdGlvbih2KSB7XG5cbiAgICAgICAgICBpZiAodGhpcy5fX21pbiAhPT0gdW5kZWZpbmVkICYmIHYgPCB0aGlzLl9fbWluKSB7XG4gICAgICAgICAgICB2ID0gdGhpcy5fX21pbjtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX19tYXggIT09IHVuZGVmaW5lZCAmJiB2ID4gdGhpcy5fX21heCkge1xuICAgICAgICAgICAgdiA9IHRoaXMuX19tYXg7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuX19zdGVwICE9PSB1bmRlZmluZWQgJiYgdiAlIHRoaXMuX19zdGVwICE9IDApIHtcbiAgICAgICAgICAgIHYgPSBNYXRoLnJvdW5kKHYgLyB0aGlzLl9fc3RlcCkgKiB0aGlzLl9fc3RlcDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gTnVtYmVyQ29udHJvbGxlci5zdXBlcmNsYXNzLnByb3RvdHlwZS5zZXRWYWx1ZS5jYWxsKHRoaXMsIHYpO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNwZWNpZnkgYSBtaW5pbXVtIHZhbHVlIGZvciA8Y29kZT5vYmplY3RbcHJvcGVydHldPC9jb2RlPi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IG1pblZhbHVlIFRoZSBtaW5pbXVtIHZhbHVlIGZvclxuICAgICAgICAgKiA8Y29kZT5vYmplY3RbcHJvcGVydHldPC9jb2RlPlxuICAgICAgICAgKiBAcmV0dXJucyB7ZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJ9IHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIG1pbjogZnVuY3Rpb24odikge1xuICAgICAgICAgIHRoaXMuX19taW4gPSB2O1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTcGVjaWZ5IGEgbWF4aW11bSB2YWx1ZSBmb3IgPGNvZGU+b2JqZWN0W3Byb3BlcnR5XTwvY29kZT4uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBtYXhWYWx1ZSBUaGUgbWF4aW11bSB2YWx1ZSBmb3JcbiAgICAgICAgICogPGNvZGU+b2JqZWN0W3Byb3BlcnR5XTwvY29kZT5cbiAgICAgICAgICogQHJldHVybnMge2RhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyfSB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBtYXg6IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICB0aGlzLl9fbWF4ID0gdjtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU3BlY2lmeSBhIHN0ZXAgdmFsdWUgdGhhdCBkYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlclxuICAgICAgICAgKiBpbmNyZW1lbnRzIGJ5LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gc3RlcFZhbHVlIFRoZSBzdGVwIHZhbHVlIGZvclxuICAgICAgICAgKiBkYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlclxuICAgICAgICAgKiBAZGVmYXVsdCBpZiBtaW5pbXVtIGFuZCBtYXhpbXVtIHNwZWNpZmllZCBpbmNyZW1lbnQgaXMgMSUgb2YgdGhlXG4gICAgICAgICAqIGRpZmZlcmVuY2Ugb3RoZXJ3aXNlIHN0ZXBWYWx1ZSBpcyAxXG4gICAgICAgICAqIEByZXR1cm5zIHtkYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlcn0gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgc3RlcDogZnVuY3Rpb24odikge1xuICAgICAgICAgIHRoaXMuX19zdGVwID0gdjtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgKTtcblxuICBmdW5jdGlvbiBudW1EZWNpbWFscyh4KSB7XG4gICAgeCA9IHgudG9TdHJpbmcoKTtcbiAgICBpZiAoeC5pbmRleE9mKCcuJykgPiAtMSkge1xuICAgICAgcmV0dXJuIHgubGVuZ3RoIC0geC5pbmRleE9mKCcuJykgLSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gTnVtYmVyQ29udHJvbGxlcjtcblxufSkoZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXIsXG5kYXQudXRpbHMuY29tbW9uKTtcblxuXG5kYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlckJveCA9IChmdW5jdGlvbiAoTnVtYmVyQ29udHJvbGxlciwgZG9tLCBjb21tb24pIHtcblxuICAvKipcbiAgICogQGNsYXNzIFJlcHJlc2VudHMgYSBnaXZlbiBwcm9wZXJ0eSBvZiBhbiBvYmplY3QgdGhhdCBpcyBhIG51bWJlciBhbmRcbiAgICogcHJvdmlkZXMgYW4gaW5wdXQgZWxlbWVudCB3aXRoIHdoaWNoIHRvIG1hbmlwdWxhdGUgaXQuXG4gICAqXG4gICAqIEBleHRlbmRzIGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyXG4gICAqIEBleHRlbmRzIGRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSBPcHRpb25hbCBwYXJhbWV0ZXJzXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcGFyYW1zLm1pbl0gTWluaW11bSBhbGxvd2VkIHZhbHVlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcGFyYW1zLm1heF0gTWF4aW11bSBhbGxvd2VkIHZhbHVlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcGFyYW1zLnN0ZXBdIEluY3JlbWVudCBieSB3aGljaCB0byBjaGFuZ2UgdmFsdWVcbiAgICpcbiAgICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcbiAgICovXG4gIHZhciBOdW1iZXJDb250cm9sbGVyQm94ID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSwgcGFyYW1zKSB7XG5cbiAgICB0aGlzLl9fdHJ1bmNhdGlvblN1c3BlbmRlZCA9IGZhbHNlO1xuXG4gICAgTnVtYmVyQ29udHJvbGxlckJveC5zdXBlcmNsYXNzLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSwgcGFyYW1zKTtcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAvKipcbiAgICAgKiB7TnVtYmVyfSBQcmV2aW91cyBtb3VzZSB5IHBvc2l0aW9uXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHZhciBwcmV2X3k7XG5cbiAgICB0aGlzLl9faW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHRoaXMuX19pbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xuXG4gICAgLy8gTWFrZXMgaXQgc28gbWFudWFsbHkgc3BlY2lmaWVkIHZhbHVlcyBhcmUgbm90IHRydW5jYXRlZC5cblxuICAgIGRvbS5iaW5kKHRoaXMuX19pbnB1dCwgJ2NoYW5nZScsIG9uQ2hhbmdlKTtcbiAgICBkb20uYmluZCh0aGlzLl9faW5wdXQsICdibHVyJywgb25CbHVyKTtcbiAgICBkb20uYmluZCh0aGlzLl9faW5wdXQsICdtb3VzZWRvd24nLCBvbk1vdXNlRG93bik7XG4gICAgZG9tLmJpbmQodGhpcy5fX2lucHV0LCAna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcblxuICAgICAgLy8gV2hlbiBwcmVzc2luZyBlbnRpcmUsIHlvdSBjYW4gYmUgYXMgcHJlY2lzZSBhcyB5b3Ugd2FudC5cbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgIF90aGlzLl9fdHJ1bmNhdGlvblN1c3BlbmRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuYmx1cigpO1xuICAgICAgICBfdGhpcy5fX3RydW5jYXRpb25TdXNwZW5kZWQgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gb25DaGFuZ2UoKSB7XG4gICAgICB2YXIgYXR0ZW1wdGVkID0gcGFyc2VGbG9hdChfdGhpcy5fX2lucHV0LnZhbHVlKTtcbiAgICAgIGlmICghY29tbW9uLmlzTmFOKGF0dGVtcHRlZCkpIF90aGlzLnNldFZhbHVlKGF0dGVtcHRlZCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25CbHVyKCkge1xuICAgICAgb25DaGFuZ2UoKTtcbiAgICAgIGlmIChfdGhpcy5fX29uRmluaXNoQ2hhbmdlKSB7XG4gICAgICAgIF90aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbChfdGhpcywgX3RoaXMuZ2V0VmFsdWUoKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3VzZURvd24oZSkge1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgb25Nb3VzZURyYWcpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2V1cCcsIG9uTW91c2VVcCk7XG4gICAgICBwcmV2X3kgPSBlLmNsaWVudFk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3VzZURyYWcoZSkge1xuXG4gICAgICB2YXIgZGlmZiA9IHByZXZfeSAtIGUuY2xpZW50WTtcbiAgICAgIF90aGlzLnNldFZhbHVlKF90aGlzLmdldFZhbHVlKCkgKyBkaWZmICogX3RoaXMuX19pbXBsaWVkU3RlcCk7XG5cbiAgICAgIHByZXZfeSA9IGUuY2xpZW50WTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2VVcCgpIHtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgb25Nb3VzZURyYWcpO1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZXVwJywgb25Nb3VzZVVwKTtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZURpc3BsYXkoKTtcblxuICAgIHRoaXMuZG9tRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9faW5wdXQpO1xuXG4gIH07XG5cbiAgTnVtYmVyQ29udHJvbGxlckJveC5zdXBlcmNsYXNzID0gTnVtYmVyQ29udHJvbGxlcjtcblxuICBjb21tb24uZXh0ZW5kKFxuXG4gICAgICBOdW1iZXJDb250cm9sbGVyQm94LnByb3RvdHlwZSxcbiAgICAgIE51bWJlckNvbnRyb2xsZXIucHJvdG90eXBlLFxuXG4gICAgICB7XG5cbiAgICAgICAgdXBkYXRlRGlzcGxheTogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICB0aGlzLl9faW5wdXQudmFsdWUgPSB0aGlzLl9fdHJ1bmNhdGlvblN1c3BlbmRlZCA/IHRoaXMuZ2V0VmFsdWUoKSA6IHJvdW5kVG9EZWNpbWFsKHRoaXMuZ2V0VmFsdWUoKSwgdGhpcy5fX3ByZWNpc2lvbik7XG4gICAgICAgICAgcmV0dXJuIE51bWJlckNvbnRyb2xsZXJCb3guc3VwZXJjbGFzcy5wcm90b3R5cGUudXBkYXRlRGlzcGxheS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgIH1cblxuICApO1xuXG4gIGZ1bmN0aW9uIHJvdW5kVG9EZWNpbWFsKHZhbHVlLCBkZWNpbWFscykge1xuICAgIHZhciB0ZW5UbyA9IE1hdGgucG93KDEwLCBkZWNpbWFscyk7XG4gICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgKiB0ZW5UbykgLyB0ZW5UbztcbiAgfVxuXG4gIHJldHVybiBOdW1iZXJDb250cm9sbGVyQm94O1xuXG59KShkYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlcixcbmRhdC5kb20uZG9tLFxuZGF0LnV0aWxzLmNvbW1vbik7XG5cblxuZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJTbGlkZXIgPSAoZnVuY3Rpb24gKE51bWJlckNvbnRyb2xsZXIsIGRvbSwgY3NzLCBjb21tb24sIHN0eWxlU2hlZXQpIHtcblxuICAvKipcbiAgICogQGNsYXNzIFJlcHJlc2VudHMgYSBnaXZlbiBwcm9wZXJ0eSBvZiBhbiBvYmplY3QgdGhhdCBpcyBhIG51bWJlciwgY29udGFpbnNcbiAgICogYSBtaW5pbXVtIGFuZCBtYXhpbXVtLCBhbmQgcHJvdmlkZXMgYSBzbGlkZXIgZWxlbWVudCB3aXRoIHdoaWNoIHRvXG4gICAqIG1hbmlwdWxhdGUgaXQuIEl0IHNob3VsZCBiZSBub3RlZCB0aGF0IHRoZSBzbGlkZXIgZWxlbWVudCBpcyBtYWRlIHVwIG9mXG4gICAqIDxjb2RlPiZsdDtkaXYmZ3Q7PC9jb2RlPiB0YWdzLCA8c3Ryb25nPm5vdDwvc3Ryb25nPiB0aGUgaHRtbDVcbiAgICogPGNvZGU+Jmx0O3NsaWRlciZndDs8L2NvZGU+IGVsZW1lbnQuXG4gICAqXG4gICAqIEBleHRlbmRzIGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyXG4gICAqIEBleHRlbmRzIGRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyXG4gICAqIFxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge051bWJlcn0gbWluVmFsdWUgTWluaW11bSBhbGxvd2VkIHZhbHVlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtYXhWYWx1ZSBNYXhpbXVtIGFsbG93ZWQgdmFsdWVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHN0ZXBWYWx1ZSBJbmNyZW1lbnQgYnkgd2hpY2ggdG8gY2hhbmdlIHZhbHVlXG4gICAqXG4gICAqIEBtZW1iZXIgZGF0LmNvbnRyb2xsZXJzXG4gICAqL1xuICB2YXIgTnVtYmVyQ29udHJvbGxlclNsaWRlciA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHksIG1pbiwgbWF4LCBzdGVwKSB7XG5cbiAgICBOdW1iZXJDb250cm9sbGVyU2xpZGVyLnN1cGVyY2xhc3MuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5LCB7IG1pbjogbWluLCBtYXg6IG1heCwgc3RlcDogc3RlcCB9KTtcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLl9fYmFja2dyb3VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX19mb3JlZ3JvdW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgXG5cblxuICAgIGRvbS5iaW5kKHRoaXMuX19iYWNrZ3JvdW5kLCAnbW91c2Vkb3duJywgb25Nb3VzZURvd24pO1xuICAgIFxuICAgIGRvbS5hZGRDbGFzcyh0aGlzLl9fYmFja2dyb3VuZCwgJ3NsaWRlcicpO1xuICAgIGRvbS5hZGRDbGFzcyh0aGlzLl9fZm9yZWdyb3VuZCwgJ3NsaWRlci1mZycpO1xuXG4gICAgZnVuY3Rpb24gb25Nb3VzZURvd24oZSkge1xuXG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBvbk1vdXNlRHJhZyk7XG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZXVwJywgb25Nb3VzZVVwKTtcblxuICAgICAgb25Nb3VzZURyYWcoZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3VzZURyYWcoZSkge1xuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHZhciBvZmZzZXQgPSBkb20uZ2V0T2Zmc2V0KF90aGlzLl9fYmFja2dyb3VuZCk7XG4gICAgICB2YXIgd2lkdGggPSBkb20uZ2V0V2lkdGgoX3RoaXMuX19iYWNrZ3JvdW5kKTtcbiAgICAgIFxuICAgICAgX3RoaXMuc2V0VmFsdWUoXG4gICAgICAgIG1hcChlLmNsaWVudFgsIG9mZnNldC5sZWZ0LCBvZmZzZXQubGVmdCArIHdpZHRoLCBfdGhpcy5fX21pbiwgX3RoaXMuX19tYXgpXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1vdXNlVXAoKSB7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIG9uTW91c2VEcmFnKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2V1cCcsIG9uTW91c2VVcCk7XG4gICAgICBpZiAoX3RoaXMuX19vbkZpbmlzaENoYW5nZSkge1xuICAgICAgICBfdGhpcy5fX29uRmluaXNoQ2hhbmdlLmNhbGwoX3RoaXMsIF90aGlzLmdldFZhbHVlKCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudXBkYXRlRGlzcGxheSgpO1xuXG4gICAgdGhpcy5fX2JhY2tncm91bmQuYXBwZW5kQ2hpbGQodGhpcy5fX2ZvcmVncm91bmQpO1xuICAgIHRoaXMuZG9tRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9fYmFja2dyb3VuZCk7XG5cbiAgfTtcblxuICBOdW1iZXJDb250cm9sbGVyU2xpZGVyLnN1cGVyY2xhc3MgPSBOdW1iZXJDb250cm9sbGVyO1xuXG4gIC8qKlxuICAgKiBJbmplY3RzIGRlZmF1bHQgc3R5bGVzaGVldCBmb3Igc2xpZGVyIGVsZW1lbnRzLlxuICAgKi9cbiAgTnVtYmVyQ29udHJvbGxlclNsaWRlci51c2VEZWZhdWx0U3R5bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgY3NzLmluamVjdChzdHlsZVNoZWV0KTtcbiAgfTtcblxuICBjb21tb24uZXh0ZW5kKFxuXG4gICAgICBOdW1iZXJDb250cm9sbGVyU2xpZGVyLnByb3RvdHlwZSxcbiAgICAgIE51bWJlckNvbnRyb2xsZXIucHJvdG90eXBlLFxuXG4gICAgICB7XG5cbiAgICAgICAgdXBkYXRlRGlzcGxheTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHBjdCA9ICh0aGlzLmdldFZhbHVlKCkgLSB0aGlzLl9fbWluKS8odGhpcy5fX21heCAtIHRoaXMuX19taW4pO1xuICAgICAgICAgIHRoaXMuX19mb3JlZ3JvdW5kLnN0eWxlLndpZHRoID0gcGN0KjEwMCsnJSc7XG4gICAgICAgICAgcmV0dXJuIE51bWJlckNvbnRyb2xsZXJTbGlkZXIuc3VwZXJjbGFzcy5wcm90b3R5cGUudXBkYXRlRGlzcGxheS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgIH1cblxuXG5cbiAgKTtcblxuICBmdW5jdGlvbiBtYXAodiwgaTEsIGkyLCBvMSwgbzIpIHtcbiAgICByZXR1cm4gbzEgKyAobzIgLSBvMSkgKiAoKHYgLSBpMSkgLyAoaTIgLSBpMSkpO1xuICB9XG5cbiAgcmV0dXJuIE51bWJlckNvbnRyb2xsZXJTbGlkZXI7XG4gIFxufSkoZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXIsXG5kYXQuZG9tLmRvbSxcbmRhdC51dGlscy5jc3MsXG5kYXQudXRpbHMuY29tbW9uLFxuXCIuc2xpZGVyIHtcXG4gIGJveC1zaGFkb3c6IGluc2V0IDAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMTUpO1xcbiAgaGVpZ2h0OiAxZW07XFxuICBib3JkZXItcmFkaXVzOiAxZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xcbiAgcGFkZGluZzogMCAwLjVlbTtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbi5zbGlkZXItZmcge1xcbiAgcGFkZGluZzogMXB4IDAgMnB4IDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWFhO1xcbiAgaGVpZ2h0OiAxZW07XFxuICBtYXJnaW4tbGVmdDogLTAuNWVtO1xcbiAgcGFkZGluZy1yaWdodDogMC41ZW07XFxuICBib3JkZXItcmFkaXVzOiAxZW0gMCAwIDFlbTtcXG59XFxuXFxuLnNsaWRlci1mZzphZnRlciB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBib3JkZXItcmFkaXVzOiAxZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgYm9yZGVyOiAgMXB4IHNvbGlkICNhYWE7XFxuICBjb250ZW50OiAnJztcXG4gIGZsb2F0OiByaWdodDtcXG4gIG1hcmdpbi1yaWdodDogLTFlbTtcXG4gIG1hcmdpbi10b3A6IC0xcHg7XFxuICBoZWlnaHQ6IDAuOWVtO1xcbiAgd2lkdGg6IDAuOWVtO1xcbn1cIik7XG5cblxuZGF0LmNvbnRyb2xsZXJzLkZ1bmN0aW9uQ29udHJvbGxlciA9IChmdW5jdGlvbiAoQ29udHJvbGxlciwgZG9tLCBjb21tb24pIHtcblxuICAvKipcbiAgICogQGNsYXNzIFByb3ZpZGVzIGEgR1VJIGludGVyZmFjZSB0byBmaXJlIGEgc3BlY2lmaWVkIG1ldGhvZCwgYSBwcm9wZXJ0eSBvZiBhbiBvYmplY3QuXG4gICAqXG4gICAqIEBleHRlbmRzIGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqXG4gICAqIEBtZW1iZXIgZGF0LmNvbnRyb2xsZXJzXG4gICAqL1xuICB2YXIgRnVuY3Rpb25Db250cm9sbGVyID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSwgdGV4dCkge1xuXG4gICAgRnVuY3Rpb25Db250cm9sbGVyLnN1cGVyY2xhc3MuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5KTtcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLl9fYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fX2J1dHRvbi5pbm5lckhUTUwgPSB0ZXh0ID09PSB1bmRlZmluZWQgPyAnRmlyZScgOiB0ZXh0O1xuICAgIGRvbS5iaW5kKHRoaXMuX19idXR0b24sICdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIF90aGlzLmZpcmUoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgIGRvbS5hZGRDbGFzcyh0aGlzLl9fYnV0dG9uLCAnYnV0dG9uJyk7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX2J1dHRvbik7XG5cblxuICB9O1xuXG4gIEZ1bmN0aW9uQ29udHJvbGxlci5zdXBlcmNsYXNzID0gQ29udHJvbGxlcjtcblxuICBjb21tb24uZXh0ZW5kKFxuXG4gICAgICBGdW5jdGlvbkNvbnRyb2xsZXIucHJvdG90eXBlLFxuICAgICAgQ29udHJvbGxlci5wcm90b3R5cGUsXG4gICAgICB7XG4gICAgICAgIFxuICAgICAgICBmaXJlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAodGhpcy5fX29uQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLl9fb25DaGFuZ2UuY2FsbCh0aGlzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMuX19vbkZpbmlzaENoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5fX29uRmluaXNoQ2hhbmdlLmNhbGwodGhpcywgdGhpcy5nZXRWYWx1ZSgpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5nZXRWYWx1ZSgpLmNhbGwodGhpcy5vYmplY3QpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgKTtcblxuICByZXR1cm4gRnVuY3Rpb25Db250cm9sbGVyO1xuXG59KShkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlcixcbmRhdC5kb20uZG9tLFxuZGF0LnV0aWxzLmNvbW1vbik7XG5cblxuZGF0LmNvbnRyb2xsZXJzLkJvb2xlYW5Db250cm9sbGVyID0gKGZ1bmN0aW9uIChDb250cm9sbGVyLCBkb20sIGNvbW1vbikge1xuXG4gIC8qKlxuICAgKiBAY2xhc3MgUHJvdmlkZXMgYSBjaGVja2JveCBpbnB1dCB0byBhbHRlciB0aGUgYm9vbGVhbiBwcm9wZXJ0eSBvZiBhbiBvYmplY3QuXG4gICAqIEBleHRlbmRzIGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqXG4gICAqIEBtZW1iZXIgZGF0LmNvbnRyb2xsZXJzXG4gICAqL1xuICB2YXIgQm9vbGVhbkNvbnRyb2xsZXIgPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7XG5cbiAgICBCb29sZWFuQ29udHJvbGxlci5zdXBlcmNsYXNzLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHRoaXMuX19wcmV2ID0gdGhpcy5nZXRWYWx1ZSgpO1xuXG4gICAgdGhpcy5fX2NoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICB0aGlzLl9fY2hlY2tib3guc2V0QXR0cmlidXRlKCd0eXBlJywgJ2NoZWNrYm94Jyk7XG5cblxuICAgIGRvbS5iaW5kKHRoaXMuX19jaGVja2JveCwgJ2NoYW5nZScsIG9uQ2hhbmdlLCBmYWxzZSk7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX2NoZWNrYm94KTtcblxuICAgIC8vIE1hdGNoIG9yaWdpbmFsIHZhbHVlXG4gICAgdGhpcy51cGRhdGVEaXNwbGF5KCk7XG5cbiAgICBmdW5jdGlvbiBvbkNoYW5nZSgpIHtcbiAgICAgIF90aGlzLnNldFZhbHVlKCFfdGhpcy5fX3ByZXYpO1xuICAgIH1cblxuICB9O1xuXG4gIEJvb2xlYW5Db250cm9sbGVyLnN1cGVyY2xhc3MgPSBDb250cm9sbGVyO1xuXG4gIGNvbW1vbi5leHRlbmQoXG5cbiAgICAgIEJvb2xlYW5Db250cm9sbGVyLnByb3RvdHlwZSxcbiAgICAgIENvbnRyb2xsZXIucHJvdG90eXBlLFxuXG4gICAgICB7XG5cbiAgICAgICAgc2V0VmFsdWU6IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICB2YXIgdG9SZXR1cm4gPSBCb29sZWFuQ29udHJvbGxlci5zdXBlcmNsYXNzLnByb3RvdHlwZS5zZXRWYWx1ZS5jYWxsKHRoaXMsIHYpO1xuICAgICAgICAgIGlmICh0aGlzLl9fb25GaW5pc2hDaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuX19vbkZpbmlzaENoYW5nZS5jYWxsKHRoaXMsIHRoaXMuZ2V0VmFsdWUoKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX19wcmV2ID0gdGhpcy5nZXRWYWx1ZSgpO1xuICAgICAgICAgIHJldHVybiB0b1JldHVybjtcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGVEaXNwbGF5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBcbiAgICAgICAgICBpZiAodGhpcy5nZXRWYWx1ZSgpID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLl9fY2hlY2tib3guc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJ2NoZWNrZWQnKTtcbiAgICAgICAgICAgIHRoaXMuX19jaGVja2JveC5jaGVja2VkID0gdHJ1ZTsgICAgXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5fX2NoZWNrYm94LmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gQm9vbGVhbkNvbnRyb2xsZXIuc3VwZXJjbGFzcy5wcm90b3R5cGUudXBkYXRlRGlzcGxheS5jYWxsKHRoaXMpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICB9XG5cbiAgKTtcblxuICByZXR1cm4gQm9vbGVhbkNvbnRyb2xsZXI7XG5cbn0pKGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyLFxuZGF0LmRvbS5kb20sXG5kYXQudXRpbHMuY29tbW9uKTtcblxuXG5kYXQuY29sb3IudG9TdHJpbmcgPSAoZnVuY3Rpb24gKGNvbW1vbikge1xuXG4gIHJldHVybiBmdW5jdGlvbihjb2xvcikge1xuXG4gICAgaWYgKGNvbG9yLmEgPT0gMSB8fCBjb21tb24uaXNVbmRlZmluZWQoY29sb3IuYSkpIHtcblxuICAgICAgdmFyIHMgPSBjb2xvci5oZXgudG9TdHJpbmcoMTYpO1xuICAgICAgd2hpbGUgKHMubGVuZ3RoIDwgNikge1xuICAgICAgICBzID0gJzAnICsgcztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICcjJyArIHM7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICByZXR1cm4gJ3JnYmEoJyArIE1hdGgucm91bmQoY29sb3IucikgKyAnLCcgKyBNYXRoLnJvdW5kKGNvbG9yLmcpICsgJywnICsgTWF0aC5yb3VuZChjb2xvci5iKSArICcsJyArIGNvbG9yLmEgKyAnKSc7XG5cbiAgICB9XG5cbiAgfVxuXG59KShkYXQudXRpbHMuY29tbW9uKTtcblxuXG5kYXQuY29sb3IuaW50ZXJwcmV0ID0gKGZ1bmN0aW9uICh0b1N0cmluZywgY29tbW9uKSB7XG5cbiAgdmFyIHJlc3VsdCwgdG9SZXR1cm47XG5cbiAgdmFyIGludGVycHJldCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdG9SZXR1cm4gPSBmYWxzZTtcblxuICAgIHZhciBvcmlnaW5hbCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gY29tbW9uLnRvQXJyYXkoYXJndW1lbnRzKSA6IGFyZ3VtZW50c1swXTtcblxuICAgIGNvbW1vbi5lYWNoKElOVEVSUFJFVEFUSU9OUywgZnVuY3Rpb24oZmFtaWx5KSB7XG5cbiAgICAgIGlmIChmYW1pbHkubGl0bXVzKG9yaWdpbmFsKSkge1xuXG4gICAgICAgIGNvbW1vbi5lYWNoKGZhbWlseS5jb252ZXJzaW9ucywgZnVuY3Rpb24oY29udmVyc2lvbiwgY29udmVyc2lvbk5hbWUpIHtcblxuICAgICAgICAgIHJlc3VsdCA9IGNvbnZlcnNpb24ucmVhZChvcmlnaW5hbCk7XG5cbiAgICAgICAgICBpZiAodG9SZXR1cm4gPT09IGZhbHNlICYmIHJlc3VsdCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRvUmV0dXJuID0gcmVzdWx0O1xuICAgICAgICAgICAgcmVzdWx0LmNvbnZlcnNpb25OYW1lID0gY29udmVyc2lvbk5hbWU7XG4gICAgICAgICAgICByZXN1bHQuY29udmVyc2lvbiA9IGNvbnZlcnNpb247XG4gICAgICAgICAgICByZXR1cm4gY29tbW9uLkJSRUFLO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBjb21tb24uQlJFQUs7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRvUmV0dXJuO1xuXG4gIH07XG5cbiAgdmFyIElOVEVSUFJFVEFUSU9OUyA9IFtcblxuICAgIC8vIFN0cmluZ3NcbiAgICB7XG5cbiAgICAgIGxpdG11czogY29tbW9uLmlzU3RyaW5nLFxuXG4gICAgICBjb252ZXJzaW9uczoge1xuXG4gICAgICAgIFRIUkVFX0NIQVJfSEVYOiB7XG5cbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuXG4gICAgICAgICAgICB2YXIgdGVzdCA9IG9yaWdpbmFsLm1hdGNoKC9eIyhbQS1GMC05XSkoW0EtRjAtOV0pKFtBLUYwLTldKSQvaSk7XG4gICAgICAgICAgICBpZiAodGVzdCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ0hFWCcsXG4gICAgICAgICAgICAgIGhleDogcGFyc2VJbnQoXG4gICAgICAgICAgICAgICAgICAnMHgnICtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXN0WzFdLnRvU3RyaW5nKCkgKyB0ZXN0WzFdLnRvU3RyaW5nKCkgK1xuICAgICAgICAgICAgICAgICAgICAgIHRlc3RbMl0udG9TdHJpbmcoKSArIHRlc3RbMl0udG9TdHJpbmcoKSArXG4gICAgICAgICAgICAgICAgICAgICAgdGVzdFszXS50b1N0cmluZygpICsgdGVzdFszXS50b1N0cmluZygpKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogdG9TdHJpbmdcblxuICAgICAgICB9LFxuXG4gICAgICAgIFNJWF9DSEFSX0hFWDoge1xuXG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcblxuICAgICAgICAgICAgdmFyIHRlc3QgPSBvcmlnaW5hbC5tYXRjaCgvXiMoW0EtRjAtOV17Nn0pJC9pKTtcbiAgICAgICAgICAgIGlmICh0ZXN0ID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnSEVYJyxcbiAgICAgICAgICAgICAgaGV4OiBwYXJzZUludCgnMHgnICsgdGVzdFsxXS50b1N0cmluZygpKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogdG9TdHJpbmdcblxuICAgICAgICB9LFxuXG4gICAgICAgIENTU19SR0I6IHtcblxuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG5cbiAgICAgICAgICAgIHZhciB0ZXN0ID0gb3JpZ2luYWwubWF0Y2goL15yZ2JcXChcXHMqKC4rKVxccyosXFxzKiguKylcXHMqLFxccyooLispXFxzKlxcKS8pO1xuICAgICAgICAgICAgaWYgKHRlc3QgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICByOiBwYXJzZUZsb2F0KHRlc3RbMV0pLFxuICAgICAgICAgICAgICBnOiBwYXJzZUZsb2F0KHRlc3RbMl0pLFxuICAgICAgICAgICAgICBiOiBwYXJzZUZsb2F0KHRlc3RbM10pXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiB0b1N0cmluZ1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgQ1NTX1JHQkE6IHtcblxuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG5cbiAgICAgICAgICAgIHZhciB0ZXN0ID0gb3JpZ2luYWwubWF0Y2goL15yZ2JhXFwoXFxzKiguKylcXHMqLFxccyooLispXFxzKixcXHMqKC4rKVxccypcXCxcXHMqKC4rKVxccypcXCkvKTtcbiAgICAgICAgICAgIGlmICh0ZXN0ID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgcjogcGFyc2VGbG9hdCh0ZXN0WzFdKSxcbiAgICAgICAgICAgICAgZzogcGFyc2VGbG9hdCh0ZXN0WzJdKSxcbiAgICAgICAgICAgICAgYjogcGFyc2VGbG9hdCh0ZXN0WzNdKSxcbiAgICAgICAgICAgICAgYTogcGFyc2VGbG9hdCh0ZXN0WzRdKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogdG9TdHJpbmdcblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvLyBOdW1iZXJzXG4gICAge1xuXG4gICAgICBsaXRtdXM6IGNvbW1vbi5pc051bWJlcixcblxuICAgICAgY29udmVyc2lvbnM6IHtcblxuICAgICAgICBIRVg6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdIRVgnLFxuICAgICAgICAgICAgICBoZXg6IG9yaWdpbmFsLFxuICAgICAgICAgICAgICBjb252ZXJzaW9uTmFtZTogJ0hFWCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gY29sb3IuaGV4O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgLy8gQXJyYXlzXG4gICAge1xuXG4gICAgICBsaXRtdXM6IGNvbW1vbi5pc0FycmF5LFxuXG4gICAgICBjb252ZXJzaW9uczoge1xuXG4gICAgICAgIFJHQl9BUlJBWToge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAob3JpZ2luYWwubGVuZ3RoICE9IDMpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgcjogb3JpZ2luYWxbMF0sXG4gICAgICAgICAgICAgIGc6IG9yaWdpbmFsWzFdLFxuICAgICAgICAgICAgICBiOiBvcmlnaW5hbFsyXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gW2NvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmJdO1xuICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIFJHQkFfQVJSQVk6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgaWYgKG9yaWdpbmFsLmxlbmd0aCAhPSA0KSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICAgIHI6IG9yaWdpbmFsWzBdLFxuICAgICAgICAgICAgICBnOiBvcmlnaW5hbFsxXSxcbiAgICAgICAgICAgICAgYjogb3JpZ2luYWxbMl0sXG4gICAgICAgICAgICAgIGE6IG9yaWdpbmFsWzNdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBbY29sb3IuciwgY29sb3IuZywgY29sb3IuYiwgY29sb3IuYV07XG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8vIE9iamVjdHNcbiAgICB7XG5cbiAgICAgIGxpdG11czogY29tbW9uLmlzT2JqZWN0LFxuXG4gICAgICBjb252ZXJzaW9uczoge1xuXG4gICAgICAgIFJHQkFfT0JKOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChjb21tb24uaXNOdW1iZXIob3JpZ2luYWwucikgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuZykgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuYikgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuYSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICAgICAgcjogb3JpZ2luYWwucixcbiAgICAgICAgICAgICAgICBnOiBvcmlnaW5hbC5nLFxuICAgICAgICAgICAgICAgIGI6IG9yaWdpbmFsLmIsXG4gICAgICAgICAgICAgICAgYTogb3JpZ2luYWwuYVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgcjogY29sb3IucixcbiAgICAgICAgICAgICAgZzogY29sb3IuZyxcbiAgICAgICAgICAgICAgYjogY29sb3IuYixcbiAgICAgICAgICAgICAgYTogY29sb3IuYVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBSR0JfT0JKOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChjb21tb24uaXNOdW1iZXIob3JpZ2luYWwucikgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuZykgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuYikpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICAgICAgcjogb3JpZ2luYWwucixcbiAgICAgICAgICAgICAgICBnOiBvcmlnaW5hbC5nLFxuICAgICAgICAgICAgICAgIGI6IG9yaWdpbmFsLmJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHI6IGNvbG9yLnIsXG4gICAgICAgICAgICAgIGc6IGNvbG9yLmcsXG4gICAgICAgICAgICAgIGI6IGNvbG9yLmJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgSFNWQV9PQko6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgaWYgKGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5oKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5zKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC52KSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5hKSkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNwYWNlOiAnSFNWJyxcbiAgICAgICAgICAgICAgICBoOiBvcmlnaW5hbC5oLFxuICAgICAgICAgICAgICAgIHM6IG9yaWdpbmFsLnMsXG4gICAgICAgICAgICAgICAgdjogb3JpZ2luYWwudixcbiAgICAgICAgICAgICAgICBhOiBvcmlnaW5hbC5hXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBoOiBjb2xvci5oLFxuICAgICAgICAgICAgICBzOiBjb2xvci5zLFxuICAgICAgICAgICAgICB2OiBjb2xvci52LFxuICAgICAgICAgICAgICBhOiBjb2xvci5hXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIEhTVl9PQko6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgaWYgKGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5oKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5zKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC52KSkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNwYWNlOiAnSFNWJyxcbiAgICAgICAgICAgICAgICBoOiBvcmlnaW5hbC5oLFxuICAgICAgICAgICAgICAgIHM6IG9yaWdpbmFsLnMsXG4gICAgICAgICAgICAgICAgdjogb3JpZ2luYWwudlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgaDogY29sb3IuaCxcbiAgICAgICAgICAgICAgczogY29sb3IucyxcbiAgICAgICAgICAgICAgdjogY29sb3IudlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH1cblxuXG4gIF07XG5cbiAgcmV0dXJuIGludGVycHJldDtcblxuXG59KShkYXQuY29sb3IudG9TdHJpbmcsXG5kYXQudXRpbHMuY29tbW9uKTtcblxuXG5kYXQuR1VJID0gZGF0Lmd1aS5HVUkgPSAoZnVuY3Rpb24gKGNzcywgc2F2ZURpYWxvZ3VlQ29udGVudHMsIHN0eWxlU2hlZXQsIGNvbnRyb2xsZXJGYWN0b3J5LCBDb250cm9sbGVyLCBCb29sZWFuQ29udHJvbGxlciwgRnVuY3Rpb25Db250cm9sbGVyLCBOdW1iZXJDb250cm9sbGVyQm94LCBOdW1iZXJDb250cm9sbGVyU2xpZGVyLCBPcHRpb25Db250cm9sbGVyLCBDb2xvckNvbnRyb2xsZXIsIHJlcXVlc3RBbmltYXRpb25GcmFtZSwgQ2VudGVyZWREaXYsIGRvbSwgY29tbW9uKSB7XG5cbiAgY3NzLmluamVjdChzdHlsZVNoZWV0KTtcblxuICAvKiogT3V0ZXItbW9zdCBjbGFzc05hbWUgZm9yIEdVSSdzICovXG4gIHZhciBDU1NfTkFNRVNQQUNFID0gJ2RnJztcblxuICB2YXIgSElERV9LRVlfQ09ERSA9IDcyO1xuXG4gIC8qKiBUaGUgb25seSB2YWx1ZSBzaGFyZWQgYmV0d2VlbiB0aGUgSlMgYW5kIFNDU1MuIFVzZSBjYXV0aW9uLiAqL1xuICB2YXIgQ0xPU0VfQlVUVE9OX0hFSUdIVCA9IDIwO1xuXG4gIHZhciBERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUUgPSAnRGVmYXVsdCc7XG5cbiAgdmFyIFNVUFBPUlRTX0xPQ0FMX1NUT1JBR0UgPSAoZnVuY3Rpb24oKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAnbG9jYWxTdG9yYWdlJyBpbiB3aW5kb3cgJiYgd2luZG93Wydsb2NhbFN0b3JhZ2UnXSAhPT0gbnVsbDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KSgpO1xuXG4gIHZhciBTQVZFX0RJQUxPR1VFO1xuXG4gIC8qKiBIYXZlIHdlIHlldCB0byBjcmVhdGUgYW4gYXV0b1BsYWNlIEdVST8gKi9cbiAgdmFyIGF1dG9fcGxhY2VfdmlyZ2luID0gdHJ1ZTtcblxuICAvKiogRml4ZWQgcG9zaXRpb24gZGl2IHRoYXQgYXV0byBwbGFjZSBHVUkncyBnbyBpbnNpZGUgKi9cbiAgdmFyIGF1dG9fcGxhY2VfY29udGFpbmVyO1xuXG4gIC8qKiBBcmUgd2UgaGlkaW5nIHRoZSBHVUkncyA/ICovXG4gIHZhciBoaWRlID0gZmFsc2U7XG5cbiAgLyoqIEdVSSdzIHdoaWNoIHNob3VsZCBiZSBoaWRkZW4gKi9cbiAgdmFyIGhpZGVhYmxlX2d1aXMgPSBbXTtcblxuICAvKipcbiAgICogQSBsaWdodHdlaWdodCBjb250cm9sbGVyIGxpYnJhcnkgZm9yIEphdmFTY3JpcHQuIEl0IGFsbG93cyB5b3UgdG8gZWFzaWx5XG4gICAqIG1hbmlwdWxhdGUgdmFyaWFibGVzIGFuZCBmaXJlIGZ1bmN0aW9ucyBvbiB0aGUgZmx5LlxuICAgKiBAY2xhc3NcbiAgICpcbiAgICogQG1lbWJlciBkYXQuZ3VpXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW3BhcmFtcy5uYW1lXSBUaGUgbmFtZSBvZiB0aGlzIEdVSS5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXMubG9hZF0gSlNPTiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBzYXZlZCBzdGF0ZSBvZlxuICAgKiB0aGlzIEdVSS5cbiAgICogQHBhcmFtIHtCb29sZWFufSBbcGFyYW1zLmF1dG89dHJ1ZV1cbiAgICogQHBhcmFtIHtkYXQuZ3VpLkdVSX0gW3BhcmFtcy5wYXJlbnRdIFRoZSBHVUkgSSdtIG5lc3RlZCBpbi5cbiAgICogQHBhcmFtIHtCb29sZWFufSBbcGFyYW1zLmNsb3NlZF0gSWYgdHJ1ZSwgc3RhcnRzIGNsb3NlZFxuICAgKi9cbiAgdmFyIEdVSSA9IGZ1bmN0aW9uKHBhcmFtcykge1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIC8qKlxuICAgICAqIE91dGVybW9zdCBET00gRWxlbWVudFxuICAgICAqIEB0eXBlIERPTUVsZW1lbnRcbiAgICAgKi9cbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9fdWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgIHRoaXMuZG9tRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9fdWwpO1xuXG4gICAgZG9tLmFkZENsYXNzKHRoaXMuZG9tRWxlbWVudCwgQ1NTX05BTUVTUEFDRSk7XG5cbiAgICAvKipcbiAgICAgKiBOZXN0ZWQgR1VJJ3MgYnkgbmFtZVxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICB0aGlzLl9fZm9sZGVycyA9IHt9O1xuXG4gICAgdGhpcy5fX2NvbnRyb2xsZXJzID0gW107XG5cbiAgICAvKipcbiAgICAgKiBMaXN0IG9mIG9iamVjdHMgSSdtIHJlbWVtYmVyaW5nIGZvciBzYXZlLCBvbmx5IHVzZWQgaW4gdG9wIGxldmVsIEdVSVxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICB0aGlzLl9fcmVtZW1iZXJlZE9iamVjdHMgPSBbXTtcblxuICAgIC8qKlxuICAgICAqIE1hcHMgdGhlIGluZGV4IG9mIHJlbWVtYmVyZWQgb2JqZWN0cyB0byBhIG1hcCBvZiBjb250cm9sbGVycywgb25seSB1c2VkXG4gICAgICogaW4gdG9wIGxldmVsIEdVSS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQGlnbm9yZVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBbXG4gICAgICogIHtcbiAgICAgKiAgICBwcm9wZXJ0eU5hbWU6IENvbnRyb2xsZXIsXG4gICAgICogICAgYW5vdGhlclByb3BlcnR5TmFtZTogQ29udHJvbGxlclxuICAgICAqICB9LFxuICAgICAqICB7XG4gICAgICogICAgcHJvcGVydHlOYW1lOiBDb250cm9sbGVyXG4gICAgICogIH1cbiAgICAgKiBdXG4gICAgICovXG4gICAgdGhpcy5fX3JlbWVtYmVyZWRPYmplY3RJbmRlY2VzVG9Db250cm9sbGVycyA9IFtdO1xuXG4gICAgdGhpcy5fX2xpc3RlbmluZyA9IFtdO1xuXG4gICAgcGFyYW1zID0gcGFyYW1zIHx8IHt9O1xuXG4gICAgLy8gRGVmYXVsdCBwYXJhbWV0ZXJzXG4gICAgcGFyYW1zID0gY29tbW9uLmRlZmF1bHRzKHBhcmFtcywge1xuICAgICAgYXV0b1BsYWNlOiB0cnVlLFxuICAgICAgd2lkdGg6IEdVSS5ERUZBVUxUX1dJRFRIXG4gICAgfSk7XG5cbiAgICBwYXJhbXMgPSBjb21tb24uZGVmYXVsdHMocGFyYW1zLCB7XG4gICAgICByZXNpemFibGU6IHBhcmFtcy5hdXRvUGxhY2UsXG4gICAgICBoaWRlYWJsZTogcGFyYW1zLmF1dG9QbGFjZVxuICAgIH0pO1xuXG5cbiAgICBpZiAoIWNvbW1vbi5pc1VuZGVmaW5lZChwYXJhbXMubG9hZCkpIHtcblxuICAgICAgLy8gRXhwbGljaXQgcHJlc2V0XG4gICAgICBpZiAocGFyYW1zLnByZXNldCkgcGFyYW1zLmxvYWQucHJlc2V0ID0gcGFyYW1zLnByZXNldDtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHBhcmFtcy5sb2FkID0geyBwcmVzZXQ6IERFRkFVTFRfREVGQVVMVF9QUkVTRVRfTkFNRSB9O1xuXG4gICAgfVxuXG4gICAgaWYgKGNvbW1vbi5pc1VuZGVmaW5lZChwYXJhbXMucGFyZW50KSAmJiBwYXJhbXMuaGlkZWFibGUpIHtcbiAgICAgIGhpZGVhYmxlX2d1aXMucHVzaCh0aGlzKTtcbiAgICB9XG5cbiAgICAvLyBPbmx5IHJvb3QgbGV2ZWwgR1VJJ3MgYXJlIHJlc2l6YWJsZS5cbiAgICBwYXJhbXMucmVzaXphYmxlID0gY29tbW9uLmlzVW5kZWZpbmVkKHBhcmFtcy5wYXJlbnQpICYmIHBhcmFtcy5yZXNpemFibGU7XG5cblxuICAgIGlmIChwYXJhbXMuYXV0b1BsYWNlICYmIGNvbW1vbi5pc1VuZGVmaW5lZChwYXJhbXMuc2Nyb2xsYWJsZSkpIHtcbiAgICAgIHBhcmFtcy5zY3JvbGxhYmxlID0gdHJ1ZTtcbiAgICB9XG4vLyAgICBwYXJhbXMuc2Nyb2xsYWJsZSA9IGNvbW1vbi5pc1VuZGVmaW5lZChwYXJhbXMucGFyZW50KSAmJiBwYXJhbXMuc2Nyb2xsYWJsZSA9PT0gdHJ1ZTtcblxuICAgIC8vIE5vdCBwYXJ0IG9mIHBhcmFtcyBiZWNhdXNlIEkgZG9uJ3Qgd2FudCBwZW9wbGUgcGFzc2luZyB0aGlzIGluIHZpYVxuICAgIC8vIGNvbnN0cnVjdG9yLiBTaG91bGQgYmUgYSAncmVtZW1iZXJlZCcgdmFsdWUuXG4gICAgdmFyIHVzZV9sb2NhbF9zdG9yYWdlID1cbiAgICAgICAgU1VQUE9SVFNfTE9DQUxfU1RPUkFHRSAmJlxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oZ2V0TG9jYWxTdG9yYWdlSGFzaCh0aGlzLCAnaXNMb2NhbCcpKSA9PT0gJ3RydWUnO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcyxcblxuICAgICAgICAvKiogQGxlbmRzIGRhdC5ndWkuR1VJLnByb3RvdHlwZSAqL1xuICAgICAgICB7XG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBUaGUgcGFyZW50IDxjb2RlPkdVSTwvY29kZT5cbiAgICAgICAgICAgKiBAdHlwZSBkYXQuZ3VpLkdVSVxuICAgICAgICAgICAqL1xuICAgICAgICAgIHBhcmVudDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcy5wYXJlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHNjcm9sbGFibGU6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwYXJhbXMuc2Nyb2xsYWJsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogSGFuZGxlcyA8Y29kZT5HVUk8L2NvZGU+J3MgZWxlbWVudCBwbGFjZW1lbnQgZm9yIHlvdVxuICAgICAgICAgICAqIEB0eXBlIEJvb2xlYW5cbiAgICAgICAgICAgKi9cbiAgICAgICAgICBhdXRvUGxhY2U6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwYXJhbXMuYXV0b1BsYWNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBUaGUgaWRlbnRpZmllciBmb3IgYSBzZXQgb2Ygc2F2ZWQgdmFsdWVzXG4gICAgICAgICAgICogQHR5cGUgU3RyaW5nXG4gICAgICAgICAgICovXG4gICAgICAgICAgcHJlc2V0OiB7XG5cbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmIChfdGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuZ2V0Um9vdCgpLnByZXNldDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zLmxvYWQucHJlc2V0O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICAgICAgaWYgKF90aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmdldFJvb3QoKS5wcmVzZXQgPSB2O1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhcmFtcy5sb2FkLnByZXNldCA9IHY7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2V0UHJlc2V0U2VsZWN0SW5kZXgodGhpcyk7XG4gICAgICAgICAgICAgIF90aGlzLnJldmVydCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIFRoZSB3aWR0aCBvZiA8Y29kZT5HVUk8L2NvZGU+IGVsZW1lbnRcbiAgICAgICAgICAgKiBAdHlwZSBOdW1iZXJcbiAgICAgICAgICAgKi9cbiAgICAgICAgICB3aWR0aDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcy53aWR0aDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICAgICAgcGFyYW1zLndpZHRoID0gdjtcbiAgICAgICAgICAgICAgc2V0V2lkdGgoX3RoaXMsIHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBUaGUgbmFtZSBvZiA8Y29kZT5HVUk8L2NvZGU+LiBVc2VkIGZvciBmb2xkZXJzLiBpLmVcbiAgICAgICAgICAgKiBhIGZvbGRlcidzIG5hbWVcbiAgICAgICAgICAgKiBAdHlwZSBTdHJpbmdcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zLm5hbWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICAgIC8vIFRPRE8gQ2hlY2sgZm9yIGNvbGxpc2lvbnMgYW1vbmcgc2libGluZyBmb2xkZXJzXG4gICAgICAgICAgICAgIHBhcmFtcy5uYW1lID0gdjtcbiAgICAgICAgICAgICAgaWYgKHRpdGxlX3Jvd19uYW1lKSB7XG4gICAgICAgICAgICAgICAgdGl0bGVfcm93X25hbWUuaW5uZXJIVE1MID0gcGFyYW1zLm5hbWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogV2hldGhlciB0aGUgPGNvZGU+R1VJPC9jb2RlPiBpcyBjb2xsYXBzZWQgb3Igbm90XG4gICAgICAgICAgICogQHR5cGUgQm9vbGVhblxuICAgICAgICAgICAqL1xuICAgICAgICAgIGNsb3NlZDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcy5jbG9zZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICAgIHBhcmFtcy5jbG9zZWQgPSB2O1xuICAgICAgICAgICAgICBpZiAocGFyYW1zLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgIGRvbS5hZGRDbGFzcyhfdGhpcy5fX3VsLCBHVUkuQ0xBU1NfQ0xPU0VEKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb20ucmVtb3ZlQ2xhc3MoX3RoaXMuX191bCwgR1VJLkNMQVNTX0NMT1NFRCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gRm9yIGJyb3dzZXJzIHRoYXQgYXJlbid0IGdvaW5nIHRvIHJlc3BlY3QgdGhlIENTUyB0cmFuc2l0aW9uLFxuICAgICAgICAgICAgICAvLyBMZXRzIGp1c3QgY2hlY2sgb3VyIGhlaWdodCBhZ2FpbnN0IHRoZSB3aW5kb3cgaGVpZ2h0IHJpZ2h0IG9mZlxuICAgICAgICAgICAgICAvLyB0aGUgYmF0LlxuICAgICAgICAgICAgICB0aGlzLm9uUmVzaXplKCk7XG5cbiAgICAgICAgICAgICAgaWYgKF90aGlzLl9fY2xvc2VCdXR0b24pIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fX2Nsb3NlQnV0dG9uLmlubmVySFRNTCA9IHYgPyBHVUkuVEVYVF9PUEVOIDogR1VJLlRFWFRfQ0xPU0VEO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIENvbnRhaW5zIGFsbCBwcmVzZXRzXG4gICAgICAgICAgICogQHR5cGUgT2JqZWN0XG4gICAgICAgICAgICovXG4gICAgICAgICAgbG9hZDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcy5sb2FkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IHRvIHVzZSA8YSBocmVmPVwiaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vRE9NL1N0b3JhZ2UjbG9jYWxTdG9yYWdlXCI+bG9jYWxTdG9yYWdlPC9hPiBhcyB0aGUgbWVhbnMgZm9yXG4gICAgICAgICAgICogPGNvZGU+cmVtZW1iZXI8L2NvZGU+aW5nXG4gICAgICAgICAgICogQHR5cGUgQm9vbGVhblxuICAgICAgICAgICAqL1xuICAgICAgICAgIHVzZUxvY2FsU3RvcmFnZToge1xuXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gdXNlX2xvY2FsX3N0b3JhZ2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbihib29sKSB7XG4gICAgICAgICAgICAgIGlmIChTVVBQT1JUU19MT0NBTF9TVE9SQUdFKSB7XG4gICAgICAgICAgICAgICAgdXNlX2xvY2FsX3N0b3JhZ2UgPSBib29sO1xuICAgICAgICAgICAgICAgIGlmIChib29sKSB7XG4gICAgICAgICAgICAgICAgICBkb20uYmluZCh3aW5kb3csICd1bmxvYWQnLCBzYXZlVG9Mb2NhbFN0b3JhZ2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBkb20udW5iaW5kKHdpbmRvdywgJ3VubG9hZCcsIHNhdmVUb0xvY2FsU3RvcmFnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGdldExvY2FsU3RvcmFnZUhhc2goX3RoaXMsICdpc0xvY2FsJyksIGJvb2wpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAvLyBBcmUgd2UgYSByb290IGxldmVsIEdVST9cbiAgICBpZiAoY29tbW9uLmlzVW5kZWZpbmVkKHBhcmFtcy5wYXJlbnQpKSB7XG5cbiAgICAgIHBhcmFtcy5jbG9zZWQgPSBmYWxzZTtcblxuICAgICAgZG9tLmFkZENsYXNzKHRoaXMuZG9tRWxlbWVudCwgR1VJLkNMQVNTX01BSU4pO1xuICAgICAgZG9tLm1ha2VTZWxlY3RhYmxlKHRoaXMuZG9tRWxlbWVudCwgZmFsc2UpO1xuXG4gICAgICAvLyBBcmUgd2Ugc3VwcG9zZWQgdG8gYmUgbG9hZGluZyBsb2NhbGx5P1xuICAgICAgaWYgKFNVUFBPUlRTX0xPQ0FMX1NUT1JBR0UpIHtcblxuICAgICAgICBpZiAodXNlX2xvY2FsX3N0b3JhZ2UpIHtcblxuICAgICAgICAgIF90aGlzLnVzZUxvY2FsU3RvcmFnZSA9IHRydWU7XG5cbiAgICAgICAgICB2YXIgc2F2ZWRfZ3VpID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oZ2V0TG9jYWxTdG9yYWdlSGFzaCh0aGlzLCAnZ3VpJykpO1xuXG4gICAgICAgICAgaWYgKHNhdmVkX2d1aSkge1xuICAgICAgICAgICAgcGFyYW1zLmxvYWQgPSBKU09OLnBhcnNlKHNhdmVkX2d1aSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgICB0aGlzLl9fY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRoaXMuX19jbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSBHVUkuVEVYVF9DTE9TRUQ7XG4gICAgICBkb20uYWRkQ2xhc3ModGhpcy5fX2Nsb3NlQnV0dG9uLCBHVUkuQ0xBU1NfQ0xPU0VfQlVUVE9OKTtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9fY2xvc2VCdXR0b24pO1xuXG4gICAgICBkb20uYmluZCh0aGlzLl9fY2xvc2VCdXR0b24sICdjbGljaycsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIF90aGlzLmNsb3NlZCA9ICFfdGhpcy5jbG9zZWQ7XG5cblxuICAgICAgfSk7XG5cblxuICAgICAgLy8gT2gsIHlvdSdyZSBhIG5lc3RlZCBHVUkhXG4gICAgfSBlbHNlIHtcblxuICAgICAgaWYgKHBhcmFtcy5jbG9zZWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwYXJhbXMuY2xvc2VkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIHRpdGxlX3Jvd19uYW1lID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocGFyYW1zLm5hbWUpO1xuICAgICAgZG9tLmFkZENsYXNzKHRpdGxlX3Jvd19uYW1lLCAnY29udHJvbGxlci1uYW1lJyk7XG5cbiAgICAgIHZhciB0aXRsZV9yb3cgPSBhZGRSb3coX3RoaXMsIHRpdGxlX3Jvd19uYW1lKTtcblxuICAgICAgdmFyIG9uX2NsaWNrX3RpdGxlID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIF90aGlzLmNsb3NlZCA9ICFfdGhpcy5jbG9zZWQ7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH07XG5cbiAgICAgIGRvbS5hZGRDbGFzcyh0aGlzLl9fdWwsIEdVSS5DTEFTU19DTE9TRUQpO1xuXG4gICAgICBkb20uYWRkQ2xhc3ModGl0bGVfcm93LCAndGl0bGUnKTtcbiAgICAgIGRvbS5iaW5kKHRpdGxlX3JvdywgJ2NsaWNrJywgb25fY2xpY2tfdGl0bGUpO1xuXG4gICAgICBpZiAoIXBhcmFtcy5jbG9zZWQpIHtcbiAgICAgICAgdGhpcy5jbG9zZWQgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIGlmIChwYXJhbXMuYXV0b1BsYWNlKSB7XG5cbiAgICAgIGlmIChjb21tb24uaXNVbmRlZmluZWQocGFyYW1zLnBhcmVudCkpIHtcblxuICAgICAgICBpZiAoYXV0b19wbGFjZV92aXJnaW4pIHtcbiAgICAgICAgICBhdXRvX3BsYWNlX2NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIGRvbS5hZGRDbGFzcyhhdXRvX3BsYWNlX2NvbnRhaW5lciwgQ1NTX05BTUVTUEFDRSk7XG4gICAgICAgICAgZG9tLmFkZENsYXNzKGF1dG9fcGxhY2VfY29udGFpbmVyLCBHVUkuQ0xBU1NfQVVUT19QTEFDRV9DT05UQUlORVIpO1xuICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYXV0b19wbGFjZV9jb250YWluZXIpO1xuICAgICAgICAgIGF1dG9fcGxhY2VfdmlyZ2luID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQdXQgaXQgaW4gdGhlIGRvbSBmb3IgeW91LlxuICAgICAgICBhdXRvX3BsYWNlX2NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmRvbUVsZW1lbnQpO1xuXG4gICAgICAgIC8vIEFwcGx5IHRoZSBhdXRvIHN0eWxlc1xuICAgICAgICBkb20uYWRkQ2xhc3ModGhpcy5kb21FbGVtZW50LCBHVUkuQ0xBU1NfQVVUT19QTEFDRSk7XG5cbiAgICAgIH1cblxuXG4gICAgICAvLyBNYWtlIGl0IG5vdCBlbGFzdGljLlxuICAgICAgaWYgKCF0aGlzLnBhcmVudCkgc2V0V2lkdGgoX3RoaXMsIHBhcmFtcy53aWR0aCk7XG5cbiAgICB9XG5cbiAgICBkb20uYmluZCh3aW5kb3csICdyZXNpemUnLCBmdW5jdGlvbigpIHsgX3RoaXMub25SZXNpemUoKSB9KTtcbiAgICBkb20uYmluZCh0aGlzLl9fdWwsICd3ZWJraXRUcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24oKSB7IF90aGlzLm9uUmVzaXplKCk7IH0pO1xuICAgIGRvbS5iaW5kKHRoaXMuX191bCwgJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbigpIHsgX3RoaXMub25SZXNpemUoKSB9KTtcbiAgICBkb20uYmluZCh0aGlzLl9fdWwsICdvVHJhbnNpdGlvbkVuZCcsIGZ1bmN0aW9uKCkgeyBfdGhpcy5vblJlc2l6ZSgpIH0pO1xuICAgIHRoaXMub25SZXNpemUoKTtcblxuXG4gICAgaWYgKHBhcmFtcy5yZXNpemFibGUpIHtcbiAgICAgIGFkZFJlc2l6ZUhhbmRsZSh0aGlzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzYXZlVG9Mb2NhbFN0b3JhZ2UoKSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShnZXRMb2NhbFN0b3JhZ2VIYXNoKF90aGlzLCAnZ3VpJyksIEpTT04uc3RyaW5naWZ5KF90aGlzLmdldFNhdmVPYmplY3QoKSkpO1xuICAgIH1cblxuICAgIHZhciByb290ID0gX3RoaXMuZ2V0Um9vdCgpO1xuICAgIGZ1bmN0aW9uIHJlc2V0V2lkdGgoKSB7XG4gICAgICAgIHZhciByb290ID0gX3RoaXMuZ2V0Um9vdCgpO1xuICAgICAgICByb290LndpZHRoICs9IDE7XG4gICAgICAgIGNvbW1vbi5kZWZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICByb290LndpZHRoIC09IDE7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXBhcmFtcy5wYXJlbnQpIHtcbiAgICAgICAgcmVzZXRXaWR0aCgpO1xuICAgICAgfVxuXG4gIH07XG5cbiAgR1VJLnRvZ2dsZUhpZGUgPSBmdW5jdGlvbigpIHtcblxuICAgIGhpZGUgPSAhaGlkZTtcbiAgICBjb21tb24uZWFjaChoaWRlYWJsZV9ndWlzLCBmdW5jdGlvbihndWkpIHtcbiAgICAgIGd1aS5kb21FbGVtZW50LnN0eWxlLnpJbmRleCA9IGhpZGUgPyAtOTk5IDogOTk5O1xuICAgICAgZ3VpLmRvbUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IGhpZGUgPyAwIDogMTtcbiAgICB9KTtcbiAgfTtcblxuICBHVUkuQ0xBU1NfQVVUT19QTEFDRSA9ICdhJztcbiAgR1VJLkNMQVNTX0FVVE9fUExBQ0VfQ09OVEFJTkVSID0gJ2FjJztcbiAgR1VJLkNMQVNTX01BSU4gPSAnbWFpbic7XG4gIEdVSS5DTEFTU19DT05UUk9MTEVSX1JPVyA9ICdjcic7XG4gIEdVSS5DTEFTU19UT09fVEFMTCA9ICd0YWxsZXItdGhhbi13aW5kb3cnO1xuICBHVUkuQ0xBU1NfQ0xPU0VEID0gJ2Nsb3NlZCc7XG4gIEdVSS5DTEFTU19DTE9TRV9CVVRUT04gPSAnY2xvc2UtYnV0dG9uJztcbiAgR1VJLkNMQVNTX0RSQUcgPSAnZHJhZyc7XG5cbiAgR1VJLkRFRkFVTFRfV0lEVEggPSAyNDU7XG4gIEdVSS5URVhUX0NMT1NFRCA9ICdDbG9zZSBDb250cm9scyc7XG4gIEdVSS5URVhUX09QRU4gPSAnT3BlbiBDb250cm9scyc7XG5cbiAgZG9tLmJpbmQod2luZG93LCAna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcblxuICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50LnR5cGUgIT09ICd0ZXh0JyAmJlxuICAgICAgICAoZS53aGljaCA9PT0gSElERV9LRVlfQ09ERSB8fCBlLmtleUNvZGUgPT0gSElERV9LRVlfQ09ERSkpIHtcbiAgICAgIEdVSS50b2dnbGVIaWRlKCk7XG4gICAgfVxuXG4gIH0sIGZhbHNlKTtcblxuICBjb21tb24uZXh0ZW5kKFxuXG4gICAgICBHVUkucHJvdG90eXBlLFxuXG4gICAgICAvKiogQGxlbmRzIGRhdC5ndWkuR1VJICovXG4gICAgICB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSBvYmplY3RcbiAgICAgICAgICogQHBhcmFtIHByb3BlcnR5XG4gICAgICAgICAqIEByZXR1cm5zIHtkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlcn0gVGhlIG5ldyBjb250cm9sbGVyIHRoYXQgd2FzIGFkZGVkLlxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIGFkZDogZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkge1xuXG4gICAgICAgICAgcmV0dXJuIGFkZChcbiAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgb2JqZWN0LFxuICAgICAgICAgICAgICBwcm9wZXJ0eSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZhY3RvcnlBcmdzOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSBvYmplY3RcbiAgICAgICAgICogQHBhcmFtIHByb3BlcnR5XG4gICAgICAgICAqIEByZXR1cm5zIHtkYXQuY29udHJvbGxlcnMuQ29sb3JDb250cm9sbGVyfSBUaGUgbmV3IGNvbnRyb2xsZXIgdGhhdCB3YXMgYWRkZWQuXG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgYWRkQ29sb3I6IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHtcblxuICAgICAgICAgIHJldHVybiBhZGQoXG4gICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgIG9iamVjdCxcbiAgICAgICAgICAgICAgcHJvcGVydHksXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogdHJ1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgKTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0gY29udHJvbGxlclxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24oY29udHJvbGxlcikge1xuXG4gICAgICAgICAgLy8gVE9ETyBsaXN0ZW5pbmc/XG4gICAgICAgICAgdGhpcy5fX3VsLnJlbW92ZUNoaWxkKGNvbnRyb2xsZXIuX19saSk7XG4gICAgICAgICAgdGhpcy5fX2NvbnRyb2xsZXJzLnNsaWNlKHRoaXMuX19jb250cm9sbGVycy5pbmRleE9mKGNvbnRyb2xsZXIpLCAxKTtcbiAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgIGNvbW1vbi5kZWZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIF90aGlzLm9uUmVzaXplKCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcblxuICAgICAgICAgIGlmICh0aGlzLmF1dG9QbGFjZSkge1xuICAgICAgICAgICAgYXV0b19wbGFjZV9jb250YWluZXIucmVtb3ZlQ2hpbGQodGhpcy5kb21FbGVtZW50KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIG5hbWVcbiAgICAgICAgICogQHJldHVybnMge2RhdC5ndWkuR1VJfSBUaGUgbmV3IGZvbGRlci5cbiAgICAgICAgICogQHRocm93cyB7RXJyb3J9IGlmIHRoaXMgR1VJIGFscmVhZHkgaGFzIGEgZm9sZGVyIGJ5IHRoZSBzcGVjaWZpZWRcbiAgICAgICAgICogbmFtZVxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIGFkZEZvbGRlcjogZnVuY3Rpb24obmFtZSkge1xuXG4gICAgICAgICAgLy8gV2UgaGF2ZSB0byBwcmV2ZW50IGNvbGxpc2lvbnMgb24gbmFtZXMgaW4gb3JkZXIgdG8gaGF2ZSBhIGtleVxuICAgICAgICAgIC8vIGJ5IHdoaWNoIHRvIHJlbWVtYmVyIHNhdmVkIHZhbHVlc1xuICAgICAgICAgIGlmICh0aGlzLl9fZm9sZGVyc1tuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBhbHJlYWR5IGhhdmUgYSBmb2xkZXIgaW4gdGhpcyBHVUkgYnkgdGhlJyArXG4gICAgICAgICAgICAgICAgJyBuYW1lIFwiJyArIG5hbWUgKyAnXCInKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgbmV3X2d1aV9wYXJhbXMgPSB7IG5hbWU6IG5hbWUsIHBhcmVudDogdGhpcyB9O1xuXG4gICAgICAgICAgLy8gV2UgbmVlZCB0byBwYXNzIGRvd24gdGhlIGF1dG9QbGFjZSB0cmFpdCBzbyB0aGF0IHdlIGNhblxuICAgICAgICAgIC8vIGF0dGFjaCBldmVudCBsaXN0ZW5lcnMgdG8gb3Blbi9jbG9zZSBmb2xkZXIgYWN0aW9ucyB0b1xuICAgICAgICAgIC8vIGVuc3VyZSB0aGF0IGEgc2Nyb2xsYmFyIGFwcGVhcnMgaWYgdGhlIHdpbmRvdyBpcyB0b28gc2hvcnQuXG4gICAgICAgICAgbmV3X2d1aV9wYXJhbXMuYXV0b1BsYWNlID0gdGhpcy5hdXRvUGxhY2U7XG5cbiAgICAgICAgICAvLyBEbyB3ZSBoYXZlIHNhdmVkIGFwcGVhcmFuY2UgZGF0YSBmb3IgdGhpcyBmb2xkZXI/XG5cbiAgICAgICAgICBpZiAodGhpcy5sb2FkICYmIC8vIEFueXRoaW5nIGxvYWRlZD9cbiAgICAgICAgICAgICAgdGhpcy5sb2FkLmZvbGRlcnMgJiYgLy8gV2FzIG15IHBhcmVudCBhIGRlYWQtZW5kP1xuICAgICAgICAgICAgICB0aGlzLmxvYWQuZm9sZGVyc1tuYW1lXSkgeyAvLyBEaWQgZGFkZHkgcmVtZW1iZXIgbWU/XG5cbiAgICAgICAgICAgIC8vIFN0YXJ0IG1lIGNsb3NlZCBpZiBJIHdhcyBjbG9zZWRcbiAgICAgICAgICAgIG5ld19ndWlfcGFyYW1zLmNsb3NlZCA9IHRoaXMubG9hZC5mb2xkZXJzW25hbWVdLmNsb3NlZDtcblxuICAgICAgICAgICAgLy8gUGFzcyBkb3duIHRoZSBsb2FkZWQgZGF0YVxuICAgICAgICAgICAgbmV3X2d1aV9wYXJhbXMubG9hZCA9IHRoaXMubG9hZC5mb2xkZXJzW25hbWVdO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGd1aSA9IG5ldyBHVUkobmV3X2d1aV9wYXJhbXMpO1xuICAgICAgICAgIHRoaXMuX19mb2xkZXJzW25hbWVdID0gZ3VpO1xuXG4gICAgICAgICAgdmFyIGxpID0gYWRkUm93KHRoaXMsIGd1aS5kb21FbGVtZW50KTtcbiAgICAgICAgICBkb20uYWRkQ2xhc3MobGksICdmb2xkZXInKTtcbiAgICAgICAgICByZXR1cm4gZ3VpO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgb3BlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhpcy5jbG9zZWQgPSBmYWxzZTtcbiAgICAgICAgfSxcblxuICAgICAgICBjbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhpcy5jbG9zZWQgPSB0cnVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIG9uUmVzaXplOiBmdW5jdGlvbigpIHtcblxuICAgICAgICAgIHZhciByb290ID0gdGhpcy5nZXRSb290KCk7XG5cbiAgICAgICAgICBpZiAocm9vdC5zY3JvbGxhYmxlKSB7XG5cbiAgICAgICAgICAgIHZhciB0b3AgPSBkb20uZ2V0T2Zmc2V0KHJvb3QuX191bCkudG9wO1xuICAgICAgICAgICAgdmFyIGggPSAwO1xuXG4gICAgICAgICAgICBjb21tb24uZWFjaChyb290Ll9fdWwuY2hpbGROb2RlcywgZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgICAgICBpZiAoISAocm9vdC5hdXRvUGxhY2UgJiYgbm9kZSA9PT0gcm9vdC5fX3NhdmVfcm93KSlcbiAgICAgICAgICAgICAgICBoICs9IGRvbS5nZXRIZWlnaHQobm9kZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHdpbmRvdy5pbm5lckhlaWdodCAtIHRvcCAtIENMT1NFX0JVVFRPTl9IRUlHSFQgPCBoKSB7XG4gICAgICAgICAgICAgIGRvbS5hZGRDbGFzcyhyb290LmRvbUVsZW1lbnQsIEdVSS5DTEFTU19UT09fVEFMTCk7XG4gICAgICAgICAgICAgIHJvb3QuX191bC5zdHlsZS5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSB0b3AgLSBDTE9TRV9CVVRUT05fSEVJR0hUICsgJ3B4JztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRvbS5yZW1vdmVDbGFzcyhyb290LmRvbUVsZW1lbnQsIEdVSS5DTEFTU19UT09fVEFMTCk7XG4gICAgICAgICAgICAgIHJvb3QuX191bC5zdHlsZS5oZWlnaHQgPSAnYXV0byc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocm9vdC5fX3Jlc2l6ZV9oYW5kbGUpIHtcbiAgICAgICAgICAgIGNvbW1vbi5kZWZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcm9vdC5fX3Jlc2l6ZV9oYW5kbGUuc3R5bGUuaGVpZ2h0ID0gcm9vdC5fX3VsLm9mZnNldEhlaWdodCArICdweCc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocm9vdC5fX2Nsb3NlQnV0dG9uKSB7XG4gICAgICAgICAgICByb290Ll9fY2xvc2VCdXR0b24uc3R5bGUud2lkdGggPSByb290LndpZHRoICsgJ3B4JztcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogTWFyayBvYmplY3RzIGZvciBzYXZpbmcuIFRoZSBvcmRlciBvZiB0aGVzZSBvYmplY3RzIGNhbm5vdCBjaGFuZ2UgYXNcbiAgICAgICAgICogdGhlIEdVSSBncm93cy4gV2hlbiByZW1lbWJlcmluZyBuZXcgb2JqZWN0cywgYXBwZW5kIHRoZW0gdG8gdGhlIGVuZFxuICAgICAgICAgKiBvZiB0aGUgbGlzdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3QuLi59IG9iamVjdHNcbiAgICAgICAgICogQHRocm93cyB7RXJyb3J9IGlmIG5vdCBjYWxsZWQgb24gYSB0b3AgbGV2ZWwgR1VJLlxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIHJlbWVtYmVyOiBmdW5jdGlvbigpIHtcblxuICAgICAgICAgIGlmIChjb21tb24uaXNVbmRlZmluZWQoU0FWRV9ESUFMT0dVRSkpIHtcbiAgICAgICAgICAgIFNBVkVfRElBTE9HVUUgPSBuZXcgQ2VudGVyZWREaXYoKTtcbiAgICAgICAgICAgIFNBVkVfRElBTE9HVUUuZG9tRWxlbWVudC5pbm5lckhUTUwgPSBzYXZlRGlhbG9ndWVDb250ZW50cztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIllvdSBjYW4gb25seSBjYWxsIHJlbWVtYmVyIG9uIGEgdG9wIGxldmVsIEdVSS5cIik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgIGNvbW1vbi5lYWNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyksIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgICAgICAgICAgaWYgKF90aGlzLl9fcmVtZW1iZXJlZE9iamVjdHMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgYWRkU2F2ZU1lbnUoX3RoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKF90aGlzLl9fcmVtZW1iZXJlZE9iamVjdHMuaW5kZXhPZihvYmplY3QpID09IC0xKSB7XG4gICAgICAgICAgICAgIF90aGlzLl9fcmVtZW1iZXJlZE9iamVjdHMucHVzaChvYmplY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYgKHRoaXMuYXV0b1BsYWNlKSB7XG4gICAgICAgICAgICAvLyBTZXQgc2F2ZSByb3cgd2lkdGhcbiAgICAgICAgICAgIHNldFdpZHRoKHRoaXMsIHRoaXMud2lkdGgpO1xuICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJucyB7ZGF0Lmd1aS5HVUl9IHRoZSB0b3Btb3N0IHBhcmVudCBHVUkgb2YgYSBuZXN0ZWQgR1VJLlxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIGdldFJvb3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBndWkgPSB0aGlzO1xuICAgICAgICAgIHdoaWxlIChndWkucGFyZW50KSB7XG4gICAgICAgICAgICBndWkgPSBndWkucGFyZW50O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZ3VpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBhIEpTT04gb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgY3VycmVudCBzdGF0ZSBvZlxuICAgICAgICAgKiB0aGlzIEdVSSBhcyB3ZWxsIGFzIGl0cyByZW1lbWJlcmVkIHByb3BlcnRpZXMuXG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0U2F2ZU9iamVjdDogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICB2YXIgdG9SZXR1cm4gPSB0aGlzLmxvYWQ7XG5cbiAgICAgICAgICB0b1JldHVybi5jbG9zZWQgPSB0aGlzLmNsb3NlZDtcblxuICAgICAgICAgIC8vIEFtIEkgcmVtZW1iZXJpbmcgYW55IHZhbHVlcz9cbiAgICAgICAgICBpZiAodGhpcy5fX3JlbWVtYmVyZWRPYmplY3RzLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgdG9SZXR1cm4ucHJlc2V0ID0gdGhpcy5wcmVzZXQ7XG5cbiAgICAgICAgICAgIGlmICghdG9SZXR1cm4ucmVtZW1iZXJlZCkge1xuICAgICAgICAgICAgICB0b1JldHVybi5yZW1lbWJlcmVkID0ge307XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRvUmV0dXJuLnJlbWVtYmVyZWRbdGhpcy5wcmVzZXRdID0gZ2V0Q3VycmVudFByZXNldCh0aGlzKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICAgIHRvUmV0dXJuLmZvbGRlcnMgPSB7fTtcbiAgICAgICAgICBjb21tb24uZWFjaCh0aGlzLl9fZm9sZGVycywgZnVuY3Rpb24oZWxlbWVudCwga2V5KSB7XG4gICAgICAgICAgICB0b1JldHVybi5mb2xkZXJzW2tleV0gPSBlbGVtZW50LmdldFNhdmVPYmplY3QoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJldHVybiB0b1JldHVybjtcblxuICAgICAgICB9LFxuXG4gICAgICAgIHNhdmU6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgaWYgKCF0aGlzLmxvYWQucmVtZW1iZXJlZCkge1xuICAgICAgICAgICAgdGhpcy5sb2FkLnJlbWVtYmVyZWQgPSB7fTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmxvYWQucmVtZW1iZXJlZFt0aGlzLnByZXNldF0gPSBnZXRDdXJyZW50UHJlc2V0KHRoaXMpO1xuICAgICAgICAgIG1hcmtQcmVzZXRNb2RpZmllZCh0aGlzLCBmYWxzZSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBzYXZlQXM6IGZ1bmN0aW9uKHByZXNldE5hbWUpIHtcblxuICAgICAgICAgIGlmICghdGhpcy5sb2FkLnJlbWVtYmVyZWQpIHtcblxuICAgICAgICAgICAgLy8gUmV0YWluIGRlZmF1bHQgdmFsdWVzIHVwb24gZmlyc3Qgc2F2ZVxuICAgICAgICAgICAgdGhpcy5sb2FkLnJlbWVtYmVyZWQgPSB7fTtcbiAgICAgICAgICAgIHRoaXMubG9hZC5yZW1lbWJlcmVkW0RFRkFVTFRfREVGQVVMVF9QUkVTRVRfTkFNRV0gPSBnZXRDdXJyZW50UHJlc2V0KHRoaXMsIHRydWUpO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5sb2FkLnJlbWVtYmVyZWRbcHJlc2V0TmFtZV0gPSBnZXRDdXJyZW50UHJlc2V0KHRoaXMpO1xuICAgICAgICAgIHRoaXMucHJlc2V0ID0gcHJlc2V0TmFtZTtcbiAgICAgICAgICBhZGRQcmVzZXRPcHRpb24odGhpcywgcHJlc2V0TmFtZSwgdHJ1ZSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICByZXZlcnQ6IGZ1bmN0aW9uKGd1aSkge1xuXG4gICAgICAgICAgY29tbW9uLmVhY2godGhpcy5fX2NvbnRyb2xsZXJzLCBmdW5jdGlvbihjb250cm9sbGVyKSB7XG4gICAgICAgICAgICAvLyBNYWtlIHJldmVydCB3b3JrIG9uIERlZmF1bHQuXG4gICAgICAgICAgICBpZiAoIXRoaXMuZ2V0Um9vdCgpLmxvYWQucmVtZW1iZXJlZCkge1xuICAgICAgICAgICAgICBjb250cm9sbGVyLnNldFZhbHVlKGNvbnRyb2xsZXIuaW5pdGlhbFZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlY2FsbFNhdmVkVmFsdWUoZ3VpIHx8IHRoaXMuZ2V0Um9vdCgpLCBjb250cm9sbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICAgIGNvbW1vbi5lYWNoKHRoaXMuX19mb2xkZXJzLCBmdW5jdGlvbihmb2xkZXIpIHtcbiAgICAgICAgICAgIGZvbGRlci5yZXZlcnQoZm9sZGVyKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmICghZ3VpKSB7XG4gICAgICAgICAgICBtYXJrUHJlc2V0TW9kaWZpZWQodGhpcy5nZXRSb290KCksIGZhbHNlKTtcbiAgICAgICAgICB9XG5cblxuICAgICAgICB9LFxuXG4gICAgICAgIGxpc3RlbjogZnVuY3Rpb24oY29udHJvbGxlcikge1xuXG4gICAgICAgICAgdmFyIGluaXQgPSB0aGlzLl9fbGlzdGVuaW5nLmxlbmd0aCA9PSAwO1xuICAgICAgICAgIHRoaXMuX19saXN0ZW5pbmcucHVzaChjb250cm9sbGVyKTtcbiAgICAgICAgICBpZiAoaW5pdCkgdXBkYXRlRGlzcGxheXModGhpcy5fX2xpc3RlbmluZyk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgKTtcblxuICBmdW5jdGlvbiBhZGQoZ3VpLCBvYmplY3QsIHByb3BlcnR5LCBwYXJhbXMpIHtcblxuICAgIGlmIChvYmplY3RbcHJvcGVydHldID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk9iamVjdCBcIiArIG9iamVjdCArIFwiIGhhcyBubyBwcm9wZXJ0eSBcXFwiXCIgKyBwcm9wZXJ0eSArIFwiXFxcIlwiKTtcbiAgICB9XG5cbiAgICB2YXIgY29udHJvbGxlcjtcblxuICAgIGlmIChwYXJhbXMuY29sb3IpIHtcblxuICAgICAgY29udHJvbGxlciA9IG5ldyBDb2xvckNvbnRyb2xsZXIob2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB2YXIgZmFjdG9yeUFyZ3MgPSBbb2JqZWN0LHByb3BlcnR5XS5jb25jYXQocGFyYW1zLmZhY3RvcnlBcmdzKTtcbiAgICAgIGNvbnRyb2xsZXIgPSBjb250cm9sbGVyRmFjdG9yeS5hcHBseShndWksIGZhY3RvcnlBcmdzKTtcblxuICAgIH1cblxuICAgIGlmIChwYXJhbXMuYmVmb3JlIGluc3RhbmNlb2YgQ29udHJvbGxlcikge1xuICAgICAgcGFyYW1zLmJlZm9yZSA9IHBhcmFtcy5iZWZvcmUuX19saTtcbiAgICB9XG5cbiAgICByZWNhbGxTYXZlZFZhbHVlKGd1aSwgY29udHJvbGxlcik7XG5cbiAgICBkb20uYWRkQ2xhc3MoY29udHJvbGxlci5kb21FbGVtZW50LCAnYycpO1xuXG4gICAgdmFyIG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgZG9tLmFkZENsYXNzKG5hbWUsICdwcm9wZXJ0eS1uYW1lJyk7XG4gICAgbmFtZS5pbm5lckhUTUwgPSBjb250cm9sbGVyLnByb3BlcnR5O1xuXG4gICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChuYW1lKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY29udHJvbGxlci5kb21FbGVtZW50KTtcblxuICAgIHZhciBsaSA9IGFkZFJvdyhndWksIGNvbnRhaW5lciwgcGFyYW1zLmJlZm9yZSk7XG5cbiAgICBkb20uYWRkQ2xhc3MobGksIEdVSS5DTEFTU19DT05UUk9MTEVSX1JPVyk7XG4gICAgZG9tLmFkZENsYXNzKGxpLCB0eXBlb2YgY29udHJvbGxlci5nZXRWYWx1ZSgpKTtcblxuICAgIGF1Z21lbnRDb250cm9sbGVyKGd1aSwgbGksIGNvbnRyb2xsZXIpO1xuXG4gICAgZ3VpLl9fY29udHJvbGxlcnMucHVzaChjb250cm9sbGVyKTtcblxuICAgIHJldHVybiBjb250cm9sbGVyO1xuXG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgcm93IHRvIHRoZSBlbmQgb2YgdGhlIEdVSSBvciBiZWZvcmUgYW5vdGhlciByb3cuXG4gICAqXG4gICAqIEBwYXJhbSBndWlcbiAgICogQHBhcmFtIFtkb21dIElmIHNwZWNpZmllZCwgaW5zZXJ0cyB0aGUgZG9tIGNvbnRlbnQgaW4gdGhlIG5ldyByb3dcbiAgICogQHBhcmFtIFtsaUJlZm9yZV0gSWYgc3BlY2lmaWVkLCBwbGFjZXMgdGhlIG5ldyByb3cgYmVmb3JlIGFub3RoZXIgcm93XG4gICAqL1xuICBmdW5jdGlvbiBhZGRSb3coZ3VpLCBkb20sIGxpQmVmb3JlKSB7XG4gICAgdmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBpZiAoZG9tKSBsaS5hcHBlbmRDaGlsZChkb20pO1xuICAgIGlmIChsaUJlZm9yZSkge1xuICAgICAgZ3VpLl9fdWwuaW5zZXJ0QmVmb3JlKGxpLCBwYXJhbXMuYmVmb3JlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ3VpLl9fdWwuYXBwZW5kQ2hpbGQobGkpO1xuICAgIH1cbiAgICBndWkub25SZXNpemUoKTtcbiAgICByZXR1cm4gbGk7XG4gIH1cblxuICBmdW5jdGlvbiBhdWdtZW50Q29udHJvbGxlcihndWksIGxpLCBjb250cm9sbGVyKSB7XG5cbiAgICBjb250cm9sbGVyLl9fbGkgPSBsaTtcbiAgICBjb250cm9sbGVyLl9fZ3VpID0gZ3VpO1xuXG4gICAgY29tbW9uLmV4dGVuZChjb250cm9sbGVyLCB7XG5cbiAgICAgIG9wdGlvbnM6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBjb250cm9sbGVyLnJlbW92ZSgpO1xuXG4gICAgICAgICAgcmV0dXJuIGFkZChcbiAgICAgICAgICAgICAgZ3VpLFxuICAgICAgICAgICAgICBjb250cm9sbGVyLm9iamVjdCxcbiAgICAgICAgICAgICAgY29udHJvbGxlci5wcm9wZXJ0eSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJlZm9yZTogY29udHJvbGxlci5fX2xpLm5leHRFbGVtZW50U2libGluZyxcbiAgICAgICAgICAgICAgICBmYWN0b3J5QXJnczogW2NvbW1vbi50b0FycmF5KGFyZ3VtZW50cyldXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29tbW9uLmlzQXJyYXkob3B0aW9ucykgfHwgY29tbW9uLmlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgICAgICAgY29udHJvbGxlci5yZW1vdmUoKTtcblxuICAgICAgICAgIHJldHVybiBhZGQoXG4gICAgICAgICAgICAgIGd1aSxcbiAgICAgICAgICAgICAgY29udHJvbGxlci5vYmplY3QsXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIucHJvcGVydHksXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBiZWZvcmU6IGNvbnRyb2xsZXIuX19saS5uZXh0RWxlbWVudFNpYmxpbmcsXG4gICAgICAgICAgICAgICAgZmFjdG9yeUFyZ3M6IFtvcHRpb25zXVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgKTtcblxuICAgICAgICB9XG5cbiAgICAgIH0sXG5cbiAgICAgIG5hbWU6IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgY29udHJvbGxlci5fX2xpLmZpcnN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkLmlubmVySFRNTCA9IHY7XG4gICAgICAgIHJldHVybiBjb250cm9sbGVyO1xuICAgICAgfSxcblxuICAgICAgbGlzdGVuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udHJvbGxlci5fX2d1aS5saXN0ZW4oY29udHJvbGxlcik7XG4gICAgICAgIHJldHVybiBjb250cm9sbGVyO1xuICAgICAgfSxcblxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udHJvbGxlci5fX2d1aS5yZW1vdmUoY29udHJvbGxlcik7XG4gICAgICAgIHJldHVybiBjb250cm9sbGVyO1xuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICAvLyBBbGwgc2xpZGVycyBzaG91bGQgYmUgYWNjb21wYW5pZWQgYnkgYSBib3guXG4gICAgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBOdW1iZXJDb250cm9sbGVyU2xpZGVyKSB7XG5cbiAgICAgIHZhciBib3ggPSBuZXcgTnVtYmVyQ29udHJvbGxlckJveChjb250cm9sbGVyLm9iamVjdCwgY29udHJvbGxlci5wcm9wZXJ0eSxcbiAgICAgICAgICB7IG1pbjogY29udHJvbGxlci5fX21pbiwgbWF4OiBjb250cm9sbGVyLl9fbWF4LCBzdGVwOiBjb250cm9sbGVyLl9fc3RlcCB9KTtcblxuICAgICAgY29tbW9uLmVhY2goWyd1cGRhdGVEaXNwbGF5JywgJ29uQ2hhbmdlJywgJ29uRmluaXNoQ2hhbmdlJ10sIGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICB2YXIgcGMgPSBjb250cm9sbGVyW21ldGhvZF07XG4gICAgICAgIHZhciBwYiA9IGJveFttZXRob2RdO1xuICAgICAgICBjb250cm9sbGVyW21ldGhvZF0gPSBib3hbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICBwYy5hcHBseShjb250cm9sbGVyLCBhcmdzKTtcbiAgICAgICAgICByZXR1cm4gcGIuYXBwbHkoYm94LCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGRvbS5hZGRDbGFzcyhsaSwgJ2hhcy1zbGlkZXInKTtcbiAgICAgIGNvbnRyb2xsZXIuZG9tRWxlbWVudC5pbnNlcnRCZWZvcmUoYm94LmRvbUVsZW1lbnQsIGNvbnRyb2xsZXIuZG9tRWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZCk7XG5cbiAgICB9XG4gICAgZWxzZSBpZiAoY29udHJvbGxlciBpbnN0YW5jZW9mIE51bWJlckNvbnRyb2xsZXJCb3gpIHtcblxuICAgICAgdmFyIHIgPSBmdW5jdGlvbihyZXR1cm5lZCkge1xuXG4gICAgICAgIC8vIEhhdmUgd2UgZGVmaW5lZCBib3RoIGJvdW5kYXJpZXM/XG4gICAgICAgIGlmIChjb21tb24uaXNOdW1iZXIoY29udHJvbGxlci5fX21pbikgJiYgY29tbW9uLmlzTnVtYmVyKGNvbnRyb2xsZXIuX19tYXgpKSB7XG5cbiAgICAgICAgICAvLyBXZWxsLCB0aGVuIGxldHMganVzdCByZXBsYWNlIHRoaXMgd2l0aCBhIHNsaWRlci5cbiAgICAgICAgICBjb250cm9sbGVyLnJlbW92ZSgpO1xuICAgICAgICAgIHJldHVybiBhZGQoXG4gICAgICAgICAgICAgIGd1aSxcbiAgICAgICAgICAgICAgY29udHJvbGxlci5vYmplY3QsXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIucHJvcGVydHksXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBiZWZvcmU6IGNvbnRyb2xsZXIuX19saS5uZXh0RWxlbWVudFNpYmxpbmcsXG4gICAgICAgICAgICAgICAgZmFjdG9yeUFyZ3M6IFtjb250cm9sbGVyLl9fbWluLCBjb250cm9sbGVyLl9fbWF4LCBjb250cm9sbGVyLl9fc3RlcF1cbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXR1cm5lZDtcblxuICAgICAgfTtcblxuICAgICAgY29udHJvbGxlci5taW4gPSBjb21tb24uY29tcG9zZShyLCBjb250cm9sbGVyLm1pbik7XG4gICAgICBjb250cm9sbGVyLm1heCA9IGNvbW1vbi5jb21wb3NlKHIsIGNvbnRyb2xsZXIubWF4KTtcblxuICAgIH1cbiAgICBlbHNlIGlmIChjb250cm9sbGVyIGluc3RhbmNlb2YgQm9vbGVhbkNvbnRyb2xsZXIpIHtcblxuICAgICAgZG9tLmJpbmQobGksICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBkb20uZmFrZUV2ZW50KGNvbnRyb2xsZXIuX19jaGVja2JveCwgJ2NsaWNrJyk7XG4gICAgICB9KTtcblxuICAgICAgZG9tLmJpbmQoY29udHJvbGxlci5fX2NoZWNrYm94LCAnY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7IC8vIFByZXZlbnRzIGRvdWJsZS10b2dnbGVcbiAgICAgIH0pXG5cbiAgICB9XG4gICAgZWxzZSBpZiAoY29udHJvbGxlciBpbnN0YW5jZW9mIEZ1bmN0aW9uQ29udHJvbGxlcikge1xuXG4gICAgICBkb20uYmluZChsaSwgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGRvbS5mYWtlRXZlbnQoY29udHJvbGxlci5fX2J1dHRvbiwgJ2NsaWNrJyk7XG4gICAgICB9KTtcblxuICAgICAgZG9tLmJpbmQobGksICdtb3VzZW92ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZG9tLmFkZENsYXNzKGNvbnRyb2xsZXIuX19idXR0b24sICdob3ZlcicpO1xuICAgICAgfSk7XG5cbiAgICAgIGRvbS5iaW5kKGxpLCAnbW91c2VvdXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZG9tLnJlbW92ZUNsYXNzKGNvbnRyb2xsZXIuX19idXR0b24sICdob3ZlcicpO1xuICAgICAgfSk7XG5cbiAgICB9XG4gICAgZWxzZSBpZiAoY29udHJvbGxlciBpbnN0YW5jZW9mIENvbG9yQ29udHJvbGxlcikge1xuXG4gICAgICBkb20uYWRkQ2xhc3MobGksICdjb2xvcicpO1xuICAgICAgY29udHJvbGxlci51cGRhdGVEaXNwbGF5ID0gY29tbW9uLmNvbXBvc2UoZnVuY3Rpb24ocikge1xuICAgICAgICBsaS5zdHlsZS5ib3JkZXJMZWZ0Q29sb3IgPSBjb250cm9sbGVyLl9fY29sb3IudG9TdHJpbmcoKTtcbiAgICAgICAgcmV0dXJuIHI7XG4gICAgICB9LCBjb250cm9sbGVyLnVwZGF0ZURpc3BsYXkpO1xuXG4gICAgICBjb250cm9sbGVyLnVwZGF0ZURpc3BsYXkoKTtcblxuICAgIH1cblxuICAgIGNvbnRyb2xsZXIuc2V0VmFsdWUgPSBjb21tb24uY29tcG9zZShmdW5jdGlvbihyKSB7XG4gICAgICBpZiAoZ3VpLmdldFJvb3QoKS5fX3ByZXNldF9zZWxlY3QgJiYgY29udHJvbGxlci5pc01vZGlmaWVkKCkpIHtcbiAgICAgICAgbWFya1ByZXNldE1vZGlmaWVkKGd1aS5nZXRSb290KCksIHRydWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHI7XG4gICAgfSwgY29udHJvbGxlci5zZXRWYWx1ZSk7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlY2FsbFNhdmVkVmFsdWUoZ3VpLCBjb250cm9sbGVyKSB7XG5cbiAgICAvLyBGaW5kIHRoZSB0b3Btb3N0IEdVSSwgdGhhdCdzIHdoZXJlIHJlbWVtYmVyZWQgb2JqZWN0cyBsaXZlLlxuICAgIHZhciByb290ID0gZ3VpLmdldFJvb3QoKTtcblxuICAgIC8vIERvZXMgdGhlIG9iamVjdCB3ZSdyZSBjb250cm9sbGluZyBtYXRjaCBhbnl0aGluZyB3ZSd2ZSBiZWVuIHRvbGQgdG9cbiAgICAvLyByZW1lbWJlcj9cbiAgICB2YXIgbWF0Y2hlZF9pbmRleCA9IHJvb3QuX19yZW1lbWJlcmVkT2JqZWN0cy5pbmRleE9mKGNvbnRyb2xsZXIub2JqZWN0KTtcblxuICAgIC8vIFdoeSB5ZXMsIGl0IGRvZXMhXG4gICAgaWYgKG1hdGNoZWRfaW5kZXggIT0gLTEpIHtcblxuICAgICAgLy8gTGV0IG1lIGZldGNoIGEgbWFwIG9mIGNvbnRyb2xsZXJzIGZvciB0aGNvbW1vbi5pc09iamVjdC5cbiAgICAgIHZhciBjb250cm9sbGVyX21hcCA9XG4gICAgICAgICAgcm9vdC5fX3JlbWVtYmVyZWRPYmplY3RJbmRlY2VzVG9Db250cm9sbGVyc1ttYXRjaGVkX2luZGV4XTtcblxuICAgICAgLy8gT2hwLCBJIGJlbGlldmUgdGhpcyBpcyB0aGUgZmlyc3QgY29udHJvbGxlciB3ZSd2ZSBjcmVhdGVkIGZvciB0aGlzXG4gICAgICAvLyBvYmplY3QuIExldHMgbWFrZSB0aGUgbWFwIGZyZXNoLlxuICAgICAgaWYgKGNvbnRyb2xsZXJfbWFwID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29udHJvbGxlcl9tYXAgPSB7fTtcbiAgICAgICAgcm9vdC5fX3JlbWVtYmVyZWRPYmplY3RJbmRlY2VzVG9Db250cm9sbGVyc1ttYXRjaGVkX2luZGV4XSA9XG4gICAgICAgICAgICBjb250cm9sbGVyX21hcDtcbiAgICAgIH1cblxuICAgICAgLy8gS2VlcCB0cmFjayBvZiB0aGlzIGNvbnRyb2xsZXJcbiAgICAgIGNvbnRyb2xsZXJfbWFwW2NvbnRyb2xsZXIucHJvcGVydHldID0gY29udHJvbGxlcjtcblxuICAgICAgLy8gT2theSwgbm93IGhhdmUgd2Ugc2F2ZWQgYW55IHZhbHVlcyBmb3IgdGhpcyBjb250cm9sbGVyP1xuICAgICAgaWYgKHJvb3QubG9hZCAmJiByb290LmxvYWQucmVtZW1iZXJlZCkge1xuXG4gICAgICAgIHZhciBwcmVzZXRfbWFwID0gcm9vdC5sb2FkLnJlbWVtYmVyZWQ7XG5cbiAgICAgICAgLy8gV2hpY2ggcHJlc2V0IGFyZSB3ZSB0cnlpbmcgdG8gbG9hZD9cbiAgICAgICAgdmFyIHByZXNldDtcblxuICAgICAgICBpZiAocHJlc2V0X21hcFtndWkucHJlc2V0XSkge1xuXG4gICAgICAgICAgcHJlc2V0ID0gcHJlc2V0X21hcFtndWkucHJlc2V0XTtcblxuICAgICAgICB9IGVsc2UgaWYgKHByZXNldF9tYXBbREVGQVVMVF9ERUZBVUxUX1BSRVNFVF9OQU1FXSkge1xuXG4gICAgICAgICAgLy8gVWhoLCB5b3UgY2FuIGhhdmUgdGhlIGRlZmF1bHQgaW5zdGVhZD9cbiAgICAgICAgICBwcmVzZXQgPSBwcmVzZXRfbWFwW0RFRkFVTFRfREVGQVVMVF9QUkVTRVRfTkFNRV07XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIC8vIE5hZGEuXG5cbiAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8gRGlkIHRoZSBsb2FkZWQgb2JqZWN0IHJlbWVtYmVyIHRoY29tbW9uLmlzT2JqZWN0P1xuICAgICAgICBpZiAocHJlc2V0W21hdGNoZWRfaW5kZXhdICYmXG5cbiAgICAgICAgICAvLyBEaWQgd2UgcmVtZW1iZXIgdGhpcyBwYXJ0aWN1bGFyIHByb3BlcnR5P1xuICAgICAgICAgICAgcHJlc2V0W21hdGNoZWRfaW5kZXhdW2NvbnRyb2xsZXIucHJvcGVydHldICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgIC8vIFdlIGRpZCByZW1lbWJlciBzb21ldGhpbmcgZm9yIHRoaXMgZ3V5IC4uLlxuICAgICAgICAgIHZhciB2YWx1ZSA9IHByZXNldFttYXRjaGVkX2luZGV4XVtjb250cm9sbGVyLnByb3BlcnR5XTtcblxuICAgICAgICAgIC8vIEFuZCB0aGF0J3Mgd2hhdCBpdCBpcy5cbiAgICAgICAgICBjb250cm9sbGVyLmluaXRpYWxWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgIGNvbnRyb2xsZXIuc2V0VmFsdWUodmFsdWUpO1xuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cblxuICBmdW5jdGlvbiBnZXRMb2NhbFN0b3JhZ2VIYXNoKGd1aSwga2V5KSB7XG4gICAgLy8gVE9ETyBob3cgZG9lcyB0aGlzIGRlYWwgd2l0aCBtdWx0aXBsZSBHVUkncz9cbiAgICByZXR1cm4gZG9jdW1lbnQubG9jYXRpb24uaHJlZiArICcuJyArIGtleTtcblxuICB9XG5cbiAgZnVuY3Rpb24gYWRkU2F2ZU1lbnUoZ3VpKSB7XG5cbiAgICB2YXIgZGl2ID0gZ3VpLl9fc2F2ZV9yb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuXG4gICAgZG9tLmFkZENsYXNzKGd1aS5kb21FbGVtZW50LCAnaGFzLXNhdmUnKTtcblxuICAgIGd1aS5fX3VsLmluc2VydEJlZm9yZShkaXYsIGd1aS5fX3VsLmZpcnN0Q2hpbGQpO1xuXG4gICAgZG9tLmFkZENsYXNzKGRpdiwgJ3NhdmUtcm93Jyk7XG5cbiAgICB2YXIgZ2VhcnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgZ2VhcnMuaW5uZXJIVE1MID0gJyZuYnNwOyc7XG4gICAgZG9tLmFkZENsYXNzKGdlYXJzLCAnYnV0dG9uIGdlYXJzJyk7XG5cbiAgICAvLyBUT0RPIHJlcGxhY2Ugd2l0aCBGdW5jdGlvbkNvbnRyb2xsZXJcbiAgICB2YXIgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGJ1dHRvbi5pbm5lckhUTUwgPSAnU2F2ZSc7XG4gICAgZG9tLmFkZENsYXNzKGJ1dHRvbiwgJ2J1dHRvbicpO1xuICAgIGRvbS5hZGRDbGFzcyhidXR0b24sICdzYXZlJyk7XG5cbiAgICB2YXIgYnV0dG9uMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBidXR0b24yLmlubmVySFRNTCA9ICdOZXcnO1xuICAgIGRvbS5hZGRDbGFzcyhidXR0b24yLCAnYnV0dG9uJyk7XG4gICAgZG9tLmFkZENsYXNzKGJ1dHRvbjIsICdzYXZlLWFzJyk7XG5cbiAgICB2YXIgYnV0dG9uMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBidXR0b24zLmlubmVySFRNTCA9ICdSZXZlcnQnO1xuICAgIGRvbS5hZGRDbGFzcyhidXR0b24zLCAnYnV0dG9uJyk7XG4gICAgZG9tLmFkZENsYXNzKGJ1dHRvbjMsICdyZXZlcnQnKTtcblxuICAgIHZhciBzZWxlY3QgPSBndWkuX19wcmVzZXRfc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XG5cbiAgICBpZiAoZ3VpLmxvYWQgJiYgZ3VpLmxvYWQucmVtZW1iZXJlZCkge1xuXG4gICAgICBjb21tb24uZWFjaChndWkubG9hZC5yZW1lbWJlcmVkLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgIGFkZFByZXNldE9wdGlvbihndWksIGtleSwga2V5ID09IGd1aS5wcmVzZXQpO1xuICAgICAgfSk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgYWRkUHJlc2V0T3B0aW9uKGd1aSwgREVGQVVMVF9ERUZBVUxUX1BSRVNFVF9OQU1FLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgZG9tLmJpbmQoc2VsZWN0LCAnY2hhbmdlJywgZnVuY3Rpb24oKSB7XG5cblxuICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGd1aS5fX3ByZXNldF9zZWxlY3QubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIGd1aS5fX3ByZXNldF9zZWxlY3RbaW5kZXhdLmlubmVySFRNTCA9IGd1aS5fX3ByZXNldF9zZWxlY3RbaW5kZXhdLnZhbHVlO1xuICAgICAgfVxuXG4gICAgICBndWkucHJlc2V0ID0gdGhpcy52YWx1ZTtcblxuICAgIH0pO1xuXG4gICAgZGl2LmFwcGVuZENoaWxkKHNlbGVjdCk7XG4gICAgZGl2LmFwcGVuZENoaWxkKGdlYXJzKTtcbiAgICBkaXYuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgICBkaXYuYXBwZW5kQ2hpbGQoYnV0dG9uMik7XG4gICAgZGl2LmFwcGVuZENoaWxkKGJ1dHRvbjMpO1xuXG4gICAgaWYgKFNVUFBPUlRTX0xPQ0FMX1NUT1JBR0UpIHtcblxuICAgICAgdmFyIHNhdmVMb2NhbGx5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RnLXNhdmUtbG9jYWxseScpO1xuICAgICAgdmFyIGV4cGxhaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGctbG9jYWwtZXhwbGFpbicpO1xuXG4gICAgICBzYXZlTG9jYWxseS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICAgICAgdmFyIGxvY2FsU3RvcmFnZUNoZWNrQm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RnLWxvY2FsLXN0b3JhZ2UnKTtcblxuICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGdldExvY2FsU3RvcmFnZUhhc2goZ3VpLCAnaXNMb2NhbCcpKSA9PT0gJ3RydWUnKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZUNoZWNrQm94LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICdjaGVja2VkJyk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHNob3dIaWRlRXhwbGFpbigpIHtcbiAgICAgICAgZXhwbGFpbi5zdHlsZS5kaXNwbGF5ID0gZ3VpLnVzZUxvY2FsU3RvcmFnZSA/ICdibG9jaycgOiAnbm9uZSc7XG4gICAgICB9XG5cbiAgICAgIHNob3dIaWRlRXhwbGFpbigpO1xuXG4gICAgICAvLyBUT0RPOiBVc2UgYSBib29sZWFuIGNvbnRyb2xsZXIsIGZvb2whXG4gICAgICBkb20uYmluZChsb2NhbFN0b3JhZ2VDaGVja0JveCwgJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBndWkudXNlTG9jYWxTdG9yYWdlID0gIWd1aS51c2VMb2NhbFN0b3JhZ2U7XG4gICAgICAgIHNob3dIaWRlRXhwbGFpbigpO1xuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICB2YXIgbmV3Q29uc3RydWN0b3JUZXh0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZy1uZXctY29uc3RydWN0b3InKTtcblxuICAgIGRvbS5iaW5kKG5ld0NvbnN0cnVjdG9yVGV4dEFyZWEsICdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgaWYgKGUubWV0YUtleSAmJiAoZS53aGljaCA9PT0gNjcgfHwgZS5rZXlDb2RlID09IDY3KSkge1xuICAgICAgICBTQVZFX0RJQUxPR1VFLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGRvbS5iaW5kKGdlYXJzLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIG5ld0NvbnN0cnVjdG9yVGV4dEFyZWEuaW5uZXJIVE1MID0gSlNPTi5zdHJpbmdpZnkoZ3VpLmdldFNhdmVPYmplY3QoKSwgdW5kZWZpbmVkLCAyKTtcbiAgICAgIFNBVkVfRElBTE9HVUUuc2hvdygpO1xuICAgICAgbmV3Q29uc3RydWN0b3JUZXh0QXJlYS5mb2N1cygpO1xuICAgICAgbmV3Q29uc3RydWN0b3JUZXh0QXJlYS5zZWxlY3QoKTtcbiAgICB9KTtcblxuICAgIGRvbS5iaW5kKGJ1dHRvbiwgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICBndWkuc2F2ZSgpO1xuICAgIH0pO1xuXG4gICAgZG9tLmJpbmQoYnV0dG9uMiwgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcHJlc2V0TmFtZSA9IHByb21wdCgnRW50ZXIgYSBuZXcgcHJlc2V0IG5hbWUuJyk7XG4gICAgICBpZiAocHJlc2V0TmFtZSkgZ3VpLnNhdmVBcyhwcmVzZXROYW1lKTtcbiAgICB9KTtcblxuICAgIGRvbS5iaW5kKGJ1dHRvbjMsICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgZ3VpLnJldmVydCgpO1xuICAgIH0pO1xuXG4vLyAgICBkaXYuYXBwZW5kQ2hpbGQoYnV0dG9uMik7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFJlc2l6ZUhhbmRsZShndWkpIHtcblxuICAgIGd1aS5fX3Jlc2l6ZV9oYW5kbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGNvbW1vbi5leHRlbmQoZ3VpLl9fcmVzaXplX2hhbmRsZS5zdHlsZSwge1xuXG4gICAgICB3aWR0aDogJzZweCcsXG4gICAgICBtYXJnaW5MZWZ0OiAnLTNweCcsXG4gICAgICBoZWlnaHQ6ICcyMDBweCcsXG4gICAgICBjdXJzb3I6ICdldy1yZXNpemUnLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcbi8vICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIGJsdWUnXG5cbiAgICB9KTtcblxuICAgIHZhciBwbW91c2VYO1xuXG4gICAgZG9tLmJpbmQoZ3VpLl9fcmVzaXplX2hhbmRsZSwgJ21vdXNlZG93bicsIGRyYWdTdGFydCk7XG4gICAgZG9tLmJpbmQoZ3VpLl9fY2xvc2VCdXR0b24sICdtb3VzZWRvd24nLCBkcmFnU3RhcnQpO1xuXG4gICAgZ3VpLmRvbUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGd1aS5fX3Jlc2l6ZV9oYW5kbGUsIGd1aS5kb21FbGVtZW50LmZpcnN0RWxlbWVudENoaWxkKTtcblxuICAgIGZ1bmN0aW9uIGRyYWdTdGFydChlKSB7XG5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgcG1vdXNlWCA9IGUuY2xpZW50WDtcblxuICAgICAgZG9tLmFkZENsYXNzKGd1aS5fX2Nsb3NlQnV0dG9uLCBHVUkuQ0xBU1NfRFJBRyk7XG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBkcmFnKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBkcmFnU3RvcCk7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyYWcoZSkge1xuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGd1aS53aWR0aCArPSBwbW91c2VYIC0gZS5jbGllbnRYO1xuICAgICAgZ3VpLm9uUmVzaXplKCk7XG4gICAgICBwbW91c2VYID0gZS5jbGllbnRYO1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkcmFnU3RvcCgpIHtcblxuICAgICAgZG9tLnJlbW92ZUNsYXNzKGd1aS5fX2Nsb3NlQnV0dG9uLCBHVUkuQ0xBU1NfRFJBRyk7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIGRyYWcpO1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZXVwJywgZHJhZ1N0b3ApO1xuXG4gICAgfVxuXG4gIH1cblxuICBmdW5jdGlvbiBzZXRXaWR0aChndWksIHcpIHtcbiAgICBndWkuZG9tRWxlbWVudC5zdHlsZS53aWR0aCA9IHcgKyAncHgnO1xuICAgIC8vIEF1dG8gcGxhY2VkIHNhdmUtcm93cyBhcmUgcG9zaXRpb24gZml4ZWQsIHNvIHdlIGhhdmUgdG9cbiAgICAvLyBzZXQgdGhlIHdpZHRoIG1hbnVhbGx5IGlmIHdlIHdhbnQgaXQgdG8gYmxlZWQgdG8gdGhlIGVkZ2VcbiAgICBpZiAoZ3VpLl9fc2F2ZV9yb3cgJiYgZ3VpLmF1dG9QbGFjZSkge1xuICAgICAgZ3VpLl9fc2F2ZV9yb3cuc3R5bGUud2lkdGggPSB3ICsgJ3B4JztcbiAgICB9aWYgKGd1aS5fX2Nsb3NlQnV0dG9uKSB7XG4gICAgICBndWkuX19jbG9zZUJ1dHRvbi5zdHlsZS53aWR0aCA9IHcgKyAncHgnO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEN1cnJlbnRQcmVzZXQoZ3VpLCB1c2VJbml0aWFsVmFsdWVzKSB7XG5cbiAgICB2YXIgdG9SZXR1cm4gPSB7fTtcblxuICAgIC8vIEZvciBlYWNoIG9iamVjdCBJJ20gcmVtZW1iZXJpbmdcbiAgICBjb21tb24uZWFjaChndWkuX19yZW1lbWJlcmVkT2JqZWN0cywgZnVuY3Rpb24odmFsLCBpbmRleCkge1xuXG4gICAgICB2YXIgc2F2ZWRfdmFsdWVzID0ge307XG5cbiAgICAgIC8vIFRoZSBjb250cm9sbGVycyBJJ3ZlIG1hZGUgZm9yIHRoY29tbW9uLmlzT2JqZWN0IGJ5IHByb3BlcnR5XG4gICAgICB2YXIgY29udHJvbGxlcl9tYXAgPVxuICAgICAgICAgIGd1aS5fX3JlbWVtYmVyZWRPYmplY3RJbmRlY2VzVG9Db250cm9sbGVyc1tpbmRleF07XG5cbiAgICAgIC8vIFJlbWVtYmVyIGVhY2ggdmFsdWUgZm9yIGVhY2ggcHJvcGVydHlcbiAgICAgIGNvbW1vbi5lYWNoKGNvbnRyb2xsZXJfbWFwLCBmdW5jdGlvbihjb250cm9sbGVyLCBwcm9wZXJ0eSkge1xuICAgICAgICBzYXZlZF92YWx1ZXNbcHJvcGVydHldID0gdXNlSW5pdGlhbFZhbHVlcyA/IGNvbnRyb2xsZXIuaW5pdGlhbFZhbHVlIDogY29udHJvbGxlci5nZXRWYWx1ZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFNhdmUgdGhlIHZhbHVlcyBmb3IgdGhjb21tb24uaXNPYmplY3RcbiAgICAgIHRvUmV0dXJuW2luZGV4XSA9IHNhdmVkX3ZhbHVlcztcblxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRvUmV0dXJuO1xuXG4gIH1cblxuICBmdW5jdGlvbiBhZGRQcmVzZXRPcHRpb24oZ3VpLCBuYW1lLCBzZXRTZWxlY3RlZCkge1xuICAgIHZhciBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICBvcHQuaW5uZXJIVE1MID0gbmFtZTtcbiAgICBvcHQudmFsdWUgPSBuYW1lO1xuICAgIGd1aS5fX3ByZXNldF9zZWxlY3QuYXBwZW5kQ2hpbGQob3B0KTtcbiAgICBpZiAoc2V0U2VsZWN0ZWQpIHtcbiAgICAgIGd1aS5fX3ByZXNldF9zZWxlY3Quc2VsZWN0ZWRJbmRleCA9IGd1aS5fX3ByZXNldF9zZWxlY3QubGVuZ3RoIC0gMTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZXRQcmVzZXRTZWxlY3RJbmRleChndWkpIHtcbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgZ3VpLl9fcHJlc2V0X3NlbGVjdC5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGlmIChndWkuX19wcmVzZXRfc2VsZWN0W2luZGV4XS52YWx1ZSA9PSBndWkucHJlc2V0KSB7XG4gICAgICAgIGd1aS5fX3ByZXNldF9zZWxlY3Quc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1hcmtQcmVzZXRNb2RpZmllZChndWksIG1vZGlmaWVkKSB7XG4gICAgdmFyIG9wdCA9IGd1aS5fX3ByZXNldF9zZWxlY3RbZ3VpLl9fcHJlc2V0X3NlbGVjdC5zZWxlY3RlZEluZGV4XTtcbi8vICAgIGNvbnNvbGUubG9nKCdtYXJrJywgbW9kaWZpZWQsIG9wdCk7XG4gICAgaWYgKG1vZGlmaWVkKSB7XG4gICAgICBvcHQuaW5uZXJIVE1MID0gb3B0LnZhbHVlICsgXCIqXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdC5pbm5lckhUTUwgPSBvcHQudmFsdWU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlRGlzcGxheXMoY29udHJvbGxlckFycmF5KSB7XG5cblxuICAgIGlmIChjb250cm9sbGVyQXJyYXkubGVuZ3RoICE9IDApIHtcblxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xuICAgICAgICB1cGRhdGVEaXNwbGF5cyhjb250cm9sbGVyQXJyYXkpO1xuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBjb21tb24uZWFjaChjb250cm9sbGVyQXJyYXksIGZ1bmN0aW9uKGMpIHtcbiAgICAgIGMudXBkYXRlRGlzcGxheSgpO1xuICAgIH0pO1xuXG4gIH1cblxuICByZXR1cm4gR1VJO1xuXG59KShkYXQudXRpbHMuY3NzLFxuXCI8ZGl2IGlkPVxcXCJkZy1zYXZlXFxcIiBjbGFzcz1cXFwiZGcgZGlhbG9ndWVcXFwiPlxcblxcbiAgSGVyZSdzIHRoZSBuZXcgbG9hZCBwYXJhbWV0ZXIgZm9yIHlvdXIgPGNvZGU+R1VJPC9jb2RlPidzIGNvbnN0cnVjdG9yOlxcblxcbiAgPHRleHRhcmVhIGlkPVxcXCJkZy1uZXctY29uc3RydWN0b3JcXFwiPjwvdGV4dGFyZWE+XFxuXFxuICA8ZGl2IGlkPVxcXCJkZy1zYXZlLWxvY2FsbHlcXFwiPlxcblxcbiAgICA8aW5wdXQgaWQ9XFxcImRnLWxvY2FsLXN0b3JhZ2VcXFwiIHR5cGU9XFxcImNoZWNrYm94XFxcIi8+IEF1dG9tYXRpY2FsbHkgc2F2ZVxcbiAgICB2YWx1ZXMgdG8gPGNvZGU+bG9jYWxTdG9yYWdlPC9jb2RlPiBvbiBleGl0LlxcblxcbiAgICA8ZGl2IGlkPVxcXCJkZy1sb2NhbC1leHBsYWluXFxcIj5UaGUgdmFsdWVzIHNhdmVkIHRvIDxjb2RlPmxvY2FsU3RvcmFnZTwvY29kZT4gd2lsbFxcbiAgICAgIG92ZXJyaWRlIHRob3NlIHBhc3NlZCB0byA8Y29kZT5kYXQuR1VJPC9jb2RlPidzIGNvbnN0cnVjdG9yLiBUaGlzIG1ha2VzIGl0XFxuICAgICAgZWFzaWVyIHRvIHdvcmsgaW5jcmVtZW50YWxseSwgYnV0IDxjb2RlPmxvY2FsU3RvcmFnZTwvY29kZT4gaXMgZnJhZ2lsZSxcXG4gICAgICBhbmQgeW91ciBmcmllbmRzIG1heSBub3Qgc2VlIHRoZSBzYW1lIHZhbHVlcyB5b3UgZG8uXFxuICAgICAgXFxuICAgIDwvZGl2PlxcbiAgICBcXG4gIDwvZGl2PlxcblxcbjwvZGl2PlwiLFxuXCIuZGcgdWx7bGlzdC1zdHlsZTpub25lO21hcmdpbjowO3BhZGRpbmc6MDt3aWR0aDoxMDAlO2NsZWFyOmJvdGh9LmRnLmFje3Bvc2l0aW9uOmZpeGVkO3RvcDowO2xlZnQ6MDtyaWdodDowO2hlaWdodDowO3otaW5kZXg6MH0uZGc6bm90KC5hYykgLm1haW57b3ZlcmZsb3c6aGlkZGVufS5kZy5tYWluey13ZWJraXQtdHJhbnNpdGlvbjpvcGFjaXR5IDAuMXMgbGluZWFyOy1vLXRyYW5zaXRpb246b3BhY2l0eSAwLjFzIGxpbmVhcjstbW96LXRyYW5zaXRpb246b3BhY2l0eSAwLjFzIGxpbmVhcjt0cmFuc2l0aW9uOm9wYWNpdHkgMC4xcyBsaW5lYXJ9LmRnLm1haW4udGFsbGVyLXRoYW4td2luZG93e292ZXJmbG93LXk6YXV0b30uZGcubWFpbi50YWxsZXItdGhhbi13aW5kb3cgLmNsb3NlLWJ1dHRvbntvcGFjaXR5OjE7bWFyZ2luLXRvcDotMXB4O2JvcmRlci10b3A6MXB4IHNvbGlkICMyYzJjMmN9LmRnLm1haW4gdWwuY2xvc2VkIC5jbG9zZS1idXR0b257b3BhY2l0eToxICFpbXBvcnRhbnR9LmRnLm1haW46aG92ZXIgLmNsb3NlLWJ1dHRvbiwuZGcubWFpbiAuY2xvc2UtYnV0dG9uLmRyYWd7b3BhY2l0eToxfS5kZy5tYWluIC5jbG9zZS1idXR0b257LXdlYmtpdC10cmFuc2l0aW9uOm9wYWNpdHkgMC4xcyBsaW5lYXI7LW8tdHJhbnNpdGlvbjpvcGFjaXR5IDAuMXMgbGluZWFyOy1tb3otdHJhbnNpdGlvbjpvcGFjaXR5IDAuMXMgbGluZWFyO3RyYW5zaXRpb246b3BhY2l0eSAwLjFzIGxpbmVhcjtib3JkZXI6MDtwb3NpdGlvbjphYnNvbHV0ZTtsaW5lLWhlaWdodDoxOXB4O2hlaWdodDoyMHB4O2N1cnNvcjpwb2ludGVyO3RleHQtYWxpZ246Y2VudGVyO2JhY2tncm91bmQtY29sb3I6IzAwMH0uZGcubWFpbiAuY2xvc2UtYnV0dG9uOmhvdmVye2JhY2tncm91bmQtY29sb3I6IzExMX0uZGcuYXtmbG9hdDpyaWdodDttYXJnaW4tcmlnaHQ6MTVweDtvdmVyZmxvdy14OmhpZGRlbn0uZGcuYS5oYXMtc2F2ZSB1bHttYXJnaW4tdG9wOjI3cHh9LmRnLmEuaGFzLXNhdmUgdWwuY2xvc2Vke21hcmdpbi10b3A6MH0uZGcuYSAuc2F2ZS1yb3d7cG9zaXRpb246Zml4ZWQ7dG9wOjA7ei1pbmRleDoxMDAyfS5kZyBsaXstd2Via2l0LXRyYW5zaXRpb246aGVpZ2h0IDAuMXMgZWFzZS1vdXQ7LW8tdHJhbnNpdGlvbjpoZWlnaHQgMC4xcyBlYXNlLW91dDstbW96LXRyYW5zaXRpb246aGVpZ2h0IDAuMXMgZWFzZS1vdXQ7dHJhbnNpdGlvbjpoZWlnaHQgMC4xcyBlYXNlLW91dH0uZGcgbGk6bm90KC5mb2xkZXIpe2N1cnNvcjphdXRvO2hlaWdodDoyN3B4O2xpbmUtaGVpZ2h0OjI3cHg7b3ZlcmZsb3c6aGlkZGVuO3BhZGRpbmc6MCA0cHggMCA1cHh9LmRnIGxpLmZvbGRlcntwYWRkaW5nOjA7Ym9yZGVyLWxlZnQ6NHB4IHNvbGlkIHJnYmEoMCwwLDAsMCl9LmRnIGxpLnRpdGxle2N1cnNvcjpwb2ludGVyO21hcmdpbi1sZWZ0Oi00cHh9LmRnIC5jbG9zZWQgbGk6bm90KC50aXRsZSksLmRnIC5jbG9zZWQgdWwgbGksLmRnIC5jbG9zZWQgdWwgbGkgPiAqe2hlaWdodDowO292ZXJmbG93OmhpZGRlbjtib3JkZXI6MH0uZGcgLmNye2NsZWFyOmJvdGg7cGFkZGluZy1sZWZ0OjNweDtoZWlnaHQ6MjdweH0uZGcgLnByb3BlcnR5LW5hbWV7Y3Vyc29yOmRlZmF1bHQ7ZmxvYXQ6bGVmdDtjbGVhcjpsZWZ0O3dpZHRoOjQwJTtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpc30uZGcgLmN7ZmxvYXQ6bGVmdDt3aWR0aDo2MCV9LmRnIC5jIGlucHV0W3R5cGU9dGV4dF17Ym9yZGVyOjA7bWFyZ2luLXRvcDo0cHg7cGFkZGluZzozcHg7d2lkdGg6MTAwJTtmbG9hdDpyaWdodH0uZGcgLmhhcy1zbGlkZXIgaW5wdXRbdHlwZT10ZXh0XXt3aWR0aDozMCU7bWFyZ2luLWxlZnQ6MH0uZGcgLnNsaWRlcntmbG9hdDpsZWZ0O3dpZHRoOjY2JTttYXJnaW4tbGVmdDotNXB4O21hcmdpbi1yaWdodDowO2hlaWdodDoxOXB4O21hcmdpbi10b3A6NHB4fS5kZyAuc2xpZGVyLWZne2hlaWdodDoxMDAlfS5kZyAuYyBpbnB1dFt0eXBlPWNoZWNrYm94XXttYXJnaW4tdG9wOjlweH0uZGcgLmMgc2VsZWN0e21hcmdpbi10b3A6NXB4fS5kZyAuY3IuZnVuY3Rpb24sLmRnIC5jci5mdW5jdGlvbiAucHJvcGVydHktbmFtZSwuZGcgLmNyLmZ1bmN0aW9uICosLmRnIC5jci5ib29sZWFuLC5kZyAuY3IuYm9vbGVhbiAqe2N1cnNvcjpwb2ludGVyfS5kZyAuc2VsZWN0b3J7ZGlzcGxheTpub25lO3Bvc2l0aW9uOmFic29sdXRlO21hcmdpbi1sZWZ0Oi05cHg7bWFyZ2luLXRvcDoyM3B4O3otaW5kZXg6MTB9LmRnIC5jOmhvdmVyIC5zZWxlY3RvciwuZGcgLnNlbGVjdG9yLmRyYWd7ZGlzcGxheTpibG9ja30uZGcgbGkuc2F2ZS1yb3d7cGFkZGluZzowfS5kZyBsaS5zYXZlLXJvdyAuYnV0dG9ue2Rpc3BsYXk6aW5saW5lLWJsb2NrO3BhZGRpbmc6MHB4IDZweH0uZGcuZGlhbG9ndWV7YmFja2dyb3VuZC1jb2xvcjojMjIyO3dpZHRoOjQ2MHB4O3BhZGRpbmc6MTVweDtmb250LXNpemU6MTNweDtsaW5lLWhlaWdodDoxNXB4fSNkZy1uZXctY29uc3RydWN0b3J7cGFkZGluZzoxMHB4O2NvbG9yOiMyMjI7Zm9udC1mYW1pbHk6TW9uYWNvLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHg7Ym9yZGVyOjA7cmVzaXplOm5vbmU7Ym94LXNoYWRvdzppbnNldCAxcHggMXB4IDFweCAjODg4O3dvcmQtd3JhcDpicmVhay13b3JkO21hcmdpbjoxMnB4IDA7ZGlzcGxheTpibG9jazt3aWR0aDo0NDBweDtvdmVyZmxvdy15OnNjcm9sbDtoZWlnaHQ6MTAwcHg7cG9zaXRpb246cmVsYXRpdmV9I2RnLWxvY2FsLWV4cGxhaW57ZGlzcGxheTpub25lO2ZvbnQtc2l6ZToxMXB4O2xpbmUtaGVpZ2h0OjE3cHg7Ym9yZGVyLXJhZGl1czozcHg7YmFja2dyb3VuZC1jb2xvcjojMzMzO3BhZGRpbmc6OHB4O21hcmdpbi10b3A6MTBweH0jZGctbG9jYWwtZXhwbGFpbiBjb2Rle2ZvbnQtc2l6ZToxMHB4fSNkYXQtZ3VpLXNhdmUtbG9jYWxseXtkaXNwbGF5Om5vbmV9LmRne2NvbG9yOiNlZWU7Zm9udDoxMXB4ICdMdWNpZGEgR3JhbmRlJywgc2Fucy1zZXJpZjt0ZXh0LXNoYWRvdzowIC0xcHggMCAjMTExfS5kZy5tYWluOjotd2Via2l0LXNjcm9sbGJhcnt3aWR0aDo1cHg7YmFja2dyb3VuZDojMWExYTFhfS5kZy5tYWluOjotd2Via2l0LXNjcm9sbGJhci1jb3JuZXJ7aGVpZ2h0OjA7ZGlzcGxheTpub25lfS5kZy5tYWluOjotd2Via2l0LXNjcm9sbGJhci10aHVtYntib3JkZXItcmFkaXVzOjVweDtiYWNrZ3JvdW5kOiM2NzY3Njd9LmRnIGxpOm5vdCguZm9sZGVyKXtiYWNrZ3JvdW5kOiMxYTFhMWE7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgIzJjMmMyY30uZGcgbGkuc2F2ZS1yb3d7bGluZS1oZWlnaHQ6MjVweDtiYWNrZ3JvdW5kOiNkYWQ1Y2I7Ym9yZGVyOjB9LmRnIGxpLnNhdmUtcm93IHNlbGVjdHttYXJnaW4tbGVmdDo1cHg7d2lkdGg6MTA4cHh9LmRnIGxpLnNhdmUtcm93IC5idXR0b257bWFyZ2luLWxlZnQ6NXB4O21hcmdpbi10b3A6MXB4O2JvcmRlci1yYWRpdXM6MnB4O2ZvbnQtc2l6ZTo5cHg7bGluZS1oZWlnaHQ6N3B4O3BhZGRpbmc6NHB4IDRweCA1cHggNHB4O2JhY2tncm91bmQ6I2M1YmRhZDtjb2xvcjojZmZmO3RleHQtc2hhZG93OjAgMXB4IDAgI2IwYTU4Zjtib3gtc2hhZG93OjAgLTFweCAwICNiMGE1OGY7Y3Vyc29yOnBvaW50ZXJ9LmRnIGxpLnNhdmUtcm93IC5idXR0b24uZ2VhcnN7YmFja2dyb3VuZDojYzViZGFkIHVybChkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFzQUFBQU5DQVlBQUFCLzlaUTdBQUFBR1hSRldIUlRiMlowZDJGeVpRQkJaRzlpWlNCSmJXRm5aVkpsWVdSNWNjbGxQQUFBQVFKSlJFRlVlTnBpWUtBVS9QLy9Qd0dJQy9BcENBQmlCU0FXK0k4QUNsQWNnS3hRNFQ5aG9NQUVVcnh4MlFTR042K2VnRFgrL3ZXVDRlN044MkFNWW9QQXgvZXZ3V29Zb1NZYkFDWDJzN0t4Q3h6Y3NlekRoM2V2Rm9ERUJZVEVFcXljZ2dXQXpBOUF1VVNRUWdlWVBhOWZQdjYvWVdtL0FjeDVJUGI3dHkvZncrUVpibHc2N3ZEczhSMFlIeVFoZ09ieCt5QUprQnFtRzVkUFBEaDFhUE9HUi9ldWdXMEc0dmxJb1RJZnlGY0ErUWVraGhISmhQZFF4YmlBSWd1TUJUUVpyUEQ3MTA4TTZyb1dZREZRaUlBQXY2QW93LzFiRndYZ2lzK2YyTFVBeW53b0lhTmN6OFhOeDNEbDdNRUpVREdRcHg5Z3RROFlDdWVCK0QyNk9FQ0FBUURhZHQ3ZTQ2RDQyUUFBQUFCSlJVNUVya0pnZ2c9PSkgMnB4IDFweCBuby1yZXBlYXQ7aGVpZ2h0OjdweDt3aWR0aDo4cHh9LmRnIGxpLnNhdmUtcm93IC5idXR0b246aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojYmFiMTllO2JveC1zaGFkb3c6MCAtMXB4IDAgI2IwYTU4Zn0uZGcgbGkuZm9sZGVye2JvcmRlci1ib3R0b206MH0uZGcgbGkudGl0bGV7cGFkZGluZy1sZWZ0OjE2cHg7YmFja2dyb3VuZDojMDAwIHVybChkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhCUUFGQUpFQUFQLy8vL1B6OC8vLy8vLy8veUg1QkFFQUFBSUFMQUFBQUFBRkFBVUFBQUlJbEkraEtnRnhvQ2dBT3c9PSkgNnB4IDEwcHggbm8tcmVwZWF0O2N1cnNvcjpwb2ludGVyO2JvcmRlci1ib3R0b206MXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsMC4yKX0uZGcgLmNsb3NlZCBsaS50aXRsZXtiYWNrZ3JvdW5kLWltYWdlOnVybChkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhCUUFGQUpFQUFQLy8vL1B6OC8vLy8vLy8veUg1QkFFQUFBSUFMQUFBQUFBRkFBVUFBQUlJbEdJV3FNQ2JXQUVBT3c9PSl9LmRnIC5jci5ib29sZWFue2JvcmRlci1sZWZ0OjNweCBzb2xpZCAjODA2Nzg3fS5kZyAuY3IuZnVuY3Rpb257Ym9yZGVyLWxlZnQ6M3B4IHNvbGlkICNlNjFkNWZ9LmRnIC5jci5udW1iZXJ7Ym9yZGVyLWxlZnQ6M3B4IHNvbGlkICMyZmExZDZ9LmRnIC5jci5udW1iZXIgaW5wdXRbdHlwZT10ZXh0XXtjb2xvcjojMmZhMWQ2fS5kZyAuY3Iuc3RyaW5ne2JvcmRlci1sZWZ0OjNweCBzb2xpZCAjMWVkMzZmfS5kZyAuY3Iuc3RyaW5nIGlucHV0W3R5cGU9dGV4dF17Y29sb3I6IzFlZDM2Zn0uZGcgLmNyLmZ1bmN0aW9uOmhvdmVyLC5kZyAuY3IuYm9vbGVhbjpob3ZlcntiYWNrZ3JvdW5kOiMxMTF9LmRnIC5jIGlucHV0W3R5cGU9dGV4dF17YmFja2dyb3VuZDojMzAzMDMwO291dGxpbmU6bm9uZX0uZGcgLmMgaW5wdXRbdHlwZT10ZXh0XTpob3ZlcntiYWNrZ3JvdW5kOiMzYzNjM2N9LmRnIC5jIGlucHV0W3R5cGU9dGV4dF06Zm9jdXN7YmFja2dyb3VuZDojNDk0OTQ5O2NvbG9yOiNmZmZ9LmRnIC5jIC5zbGlkZXJ7YmFja2dyb3VuZDojMzAzMDMwO2N1cnNvcjpldy1yZXNpemV9LmRnIC5jIC5zbGlkZXItZmd7YmFja2dyb3VuZDojMmZhMWQ2fS5kZyAuYyAuc2xpZGVyOmhvdmVye2JhY2tncm91bmQ6IzNjM2MzY30uZGcgLmMgLnNsaWRlcjpob3ZlciAuc2xpZGVyLWZne2JhY2tncm91bmQ6IzQ0YWJkYX1cXG5cIixcbmRhdC5jb250cm9sbGVycy5mYWN0b3J5ID0gKGZ1bmN0aW9uIChPcHRpb25Db250cm9sbGVyLCBOdW1iZXJDb250cm9sbGVyQm94LCBOdW1iZXJDb250cm9sbGVyU2xpZGVyLCBTdHJpbmdDb250cm9sbGVyLCBGdW5jdGlvbkNvbnRyb2xsZXIsIEJvb2xlYW5Db250cm9sbGVyLCBjb21tb24pIHtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHtcblxuICAgICAgICB2YXIgaW5pdGlhbFZhbHVlID0gb2JqZWN0W3Byb3BlcnR5XTtcblxuICAgICAgICAvLyBQcm92aWRpbmcgb3B0aW9ucz9cbiAgICAgICAgaWYgKGNvbW1vbi5pc0FycmF5KGFyZ3VtZW50c1syXSkgfHwgY29tbW9uLmlzT2JqZWN0KGFyZ3VtZW50c1syXSkpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IE9wdGlvbkNvbnRyb2xsZXIob2JqZWN0LCBwcm9wZXJ0eSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFByb3ZpZGluZyBhIG1hcD9cblxuICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKGluaXRpYWxWYWx1ZSkpIHtcblxuICAgICAgICAgIGlmIChjb21tb24uaXNOdW1iZXIoYXJndW1lbnRzWzJdKSAmJiBjb21tb24uaXNOdW1iZXIoYXJndW1lbnRzWzNdKSkge1xuXG4gICAgICAgICAgICAvLyBIYXMgbWluIGFuZCBtYXguXG4gICAgICAgICAgICByZXR1cm4gbmV3IE51bWJlckNvbnRyb2xsZXJTbGlkZXIob2JqZWN0LCBwcm9wZXJ0eSwgYXJndW1lbnRzWzJdLCBhcmd1bWVudHNbM10pO1xuXG4gICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBOdW1iZXJDb250cm9sbGVyQm94KG9iamVjdCwgcHJvcGVydHksIHsgbWluOiBhcmd1bWVudHNbMl0sIG1heDogYXJndW1lbnRzWzNdIH0pO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29tbW9uLmlzU3RyaW5nKGluaXRpYWxWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFN0cmluZ0NvbnRyb2xsZXIob2JqZWN0LCBwcm9wZXJ0eSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29tbW9uLmlzRnVuY3Rpb24oaW5pdGlhbFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiBuZXcgRnVuY3Rpb25Db250cm9sbGVyKG9iamVjdCwgcHJvcGVydHksICcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb21tb24uaXNCb29sZWFuKGluaXRpYWxWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IEJvb2xlYW5Db250cm9sbGVyKG9iamVjdCwgcHJvcGVydHkpO1xuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH0pKGRhdC5jb250cm9sbGVycy5PcHRpb25Db250cm9sbGVyLFxuZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJCb3gsXG5kYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlclNsaWRlcixcbmRhdC5jb250cm9sbGVycy5TdHJpbmdDb250cm9sbGVyID0gKGZ1bmN0aW9uIChDb250cm9sbGVyLCBkb20sIGNvbW1vbikge1xuXG4gIC8qKlxuICAgKiBAY2xhc3MgUHJvdmlkZXMgYSB0ZXh0IGlucHV0IHRvIGFsdGVyIHRoZSBzdHJpbmcgcHJvcGVydHkgb2YgYW4gb2JqZWN0LlxuICAgKlxuICAgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlclxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSBtYW5pcHVsYXRlZFxuICAgKlxuICAgKiBAbWVtYmVyIGRhdC5jb250cm9sbGVyc1xuICAgKi9cbiAgdmFyIFN0cmluZ0NvbnRyb2xsZXIgPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7XG5cbiAgICBTdHJpbmdDb250cm9sbGVyLnN1cGVyY2xhc3MuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5KTtcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLl9faW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHRoaXMuX19pbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xuXG4gICAgZG9tLmJpbmQodGhpcy5fX2lucHV0LCAna2V5dXAnLCBvbkNoYW5nZSk7XG4gICAgZG9tLmJpbmQodGhpcy5fX2lucHV0LCAnY2hhbmdlJywgb25DaGFuZ2UpO1xuICAgIGRvbS5iaW5kKHRoaXMuX19pbnB1dCwgJ2JsdXInLCBvbkJsdXIpO1xuICAgIGRvbS5iaW5kKHRoaXMuX19pbnB1dCwgJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgICB0aGlzLmJsdXIoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBcblxuICAgIGZ1bmN0aW9uIG9uQ2hhbmdlKCkge1xuICAgICAgX3RoaXMuc2V0VmFsdWUoX3RoaXMuX19pbnB1dC52YWx1ZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25CbHVyKCkge1xuICAgICAgaWYgKF90aGlzLl9fb25GaW5pc2hDaGFuZ2UpIHtcbiAgICAgICAgX3RoaXMuX19vbkZpbmlzaENoYW5nZS5jYWxsKF90aGlzLCBfdGhpcy5nZXRWYWx1ZSgpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZURpc3BsYXkoKTtcblxuICAgIHRoaXMuZG9tRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9faW5wdXQpO1xuXG4gIH07XG5cbiAgU3RyaW5nQ29udHJvbGxlci5zdXBlcmNsYXNzID0gQ29udHJvbGxlcjtcblxuICBjb21tb24uZXh0ZW5kKFxuXG4gICAgICBTdHJpbmdDb250cm9sbGVyLnByb3RvdHlwZSxcbiAgICAgIENvbnRyb2xsZXIucHJvdG90eXBlLFxuXG4gICAgICB7XG5cbiAgICAgICAgdXBkYXRlRGlzcGxheTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gU3RvcHMgdGhlIGNhcmV0IGZyb20gbW92aW5nIG9uIGFjY291bnQgb2Y6XG4gICAgICAgICAgLy8ga2V5dXAgLT4gc2V0VmFsdWUgLT4gdXBkYXRlRGlzcGxheVxuICAgICAgICAgIGlmICghZG9tLmlzQWN0aXZlKHRoaXMuX19pbnB1dCkpIHtcbiAgICAgICAgICAgIHRoaXMuX19pbnB1dC52YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIFN0cmluZ0NvbnRyb2xsZXIuc3VwZXJjbGFzcy5wcm90b3R5cGUudXBkYXRlRGlzcGxheS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgIH1cblxuICApO1xuXG4gIHJldHVybiBTdHJpbmdDb250cm9sbGVyO1xuXG59KShkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlcixcbmRhdC5kb20uZG9tLFxuZGF0LnV0aWxzLmNvbW1vbiksXG5kYXQuY29udHJvbGxlcnMuRnVuY3Rpb25Db250cm9sbGVyLFxuZGF0LmNvbnRyb2xsZXJzLkJvb2xlYW5Db250cm9sbGVyLFxuZGF0LnV0aWxzLmNvbW1vbiksXG5kYXQuY29udHJvbGxlcnMuQ29udHJvbGxlcixcbmRhdC5jb250cm9sbGVycy5Cb29sZWFuQ29udHJvbGxlcixcbmRhdC5jb250cm9sbGVycy5GdW5jdGlvbkNvbnRyb2xsZXIsXG5kYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlckJveCxcbmRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyU2xpZGVyLFxuZGF0LmNvbnRyb2xsZXJzLk9wdGlvbkNvbnRyb2xsZXIsXG5kYXQuY29udHJvbGxlcnMuQ29sb3JDb250cm9sbGVyID0gKGZ1bmN0aW9uIChDb250cm9sbGVyLCBkb20sIENvbG9yLCBpbnRlcnByZXQsIGNvbW1vbikge1xuXG4gIHZhciBDb2xvckNvbnRyb2xsZXIgPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7XG5cbiAgICBDb2xvckNvbnRyb2xsZXIuc3VwZXJjbGFzcy5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHkpO1xuXG4gICAgdGhpcy5fX2NvbG9yID0gbmV3IENvbG9yKHRoaXMuZ2V0VmFsdWUoKSk7XG4gICAgdGhpcy5fX3RlbXAgPSBuZXcgQ29sb3IoMCk7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5kb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBkb20ubWFrZVNlbGVjdGFibGUodGhpcy5kb21FbGVtZW50LCBmYWxzZSk7XG5cbiAgICB0aGlzLl9fc2VsZWN0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9fc2VsZWN0b3IuY2xhc3NOYW1lID0gJ3NlbGVjdG9yJztcblxuICAgIHRoaXMuX19zYXR1cmF0aW9uX2ZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fX3NhdHVyYXRpb25fZmllbGQuY2xhc3NOYW1lID0gJ3NhdHVyYXRpb24tZmllbGQnO1xuXG4gICAgdGhpcy5fX2ZpZWxkX2tub2IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9fZmllbGRfa25vYi5jbGFzc05hbWUgPSAnZmllbGQta25vYic7XG4gICAgdGhpcy5fX2ZpZWxkX2tub2JfYm9yZGVyID0gJzJweCBzb2xpZCAnO1xuXG4gICAgdGhpcy5fX2h1ZV9rbm9iID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fX2h1ZV9rbm9iLmNsYXNzTmFtZSA9ICdodWUta25vYic7XG5cbiAgICB0aGlzLl9faHVlX2ZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fX2h1ZV9maWVsZC5jbGFzc05hbWUgPSAnaHVlLWZpZWxkJztcblxuICAgIHRoaXMuX19pbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgdGhpcy5fX2lucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgdGhpcy5fX2lucHV0X3RleHRTaGFkb3cgPSAnMCAxcHggMXB4ICc7XG5cbiAgICBkb20uYmluZCh0aGlzLl9faW5wdXQsICdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHsgLy8gb24gZW50ZXJcbiAgICAgICAgb25CbHVyLmNhbGwodGhpcyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBkb20uYmluZCh0aGlzLl9faW5wdXQsICdibHVyJywgb25CbHVyKTtcblxuICAgIGRvbS5iaW5kKHRoaXMuX19zZWxlY3RvciwgJ21vdXNlZG93bicsIGZ1bmN0aW9uKGUpIHtcblxuICAgICAgZG9tXG4gICAgICAgIC5hZGRDbGFzcyh0aGlzLCAnZHJhZycpXG4gICAgICAgIC5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgZG9tLnJlbW92ZUNsYXNzKF90aGlzLl9fc2VsZWN0b3IsICdkcmFnJyk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICB2YXIgdmFsdWVfZmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGNvbW1vbi5leHRlbmQodGhpcy5fX3NlbGVjdG9yLnN0eWxlLCB7XG4gICAgICB3aWR0aDogJzEyMnB4JyxcbiAgICAgIGhlaWdodDogJzEwMnB4JyxcbiAgICAgIHBhZGRpbmc6ICczcHgnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzIyMicsXG4gICAgICBib3hTaGFkb3c6ICcwcHggMXB4IDNweCByZ2JhKDAsMCwwLDAuMyknXG4gICAgfSk7XG5cbiAgICBjb21tb24uZXh0ZW5kKHRoaXMuX19maWVsZF9rbm9iLnN0eWxlLCB7XG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIHdpZHRoOiAnMTJweCcsXG4gICAgICBoZWlnaHQ6ICcxMnB4JyxcbiAgICAgIGJvcmRlcjogdGhpcy5fX2ZpZWxkX2tub2JfYm9yZGVyICsgKHRoaXMuX19jb2xvci52IDwgLjUgPyAnI2ZmZicgOiAnIzAwMCcpLFxuICAgICAgYm94U2hhZG93OiAnMHB4IDFweCAzcHggcmdiYSgwLDAsMCwwLjUpJyxcbiAgICAgIGJvcmRlclJhZGl1czogJzEycHgnLFxuICAgICAgekluZGV4OiAxXG4gICAgfSk7XG4gICAgXG4gICAgY29tbW9uLmV4dGVuZCh0aGlzLl9faHVlX2tub2Iuc3R5bGUsIHtcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgd2lkdGg6ICcxNXB4JyxcbiAgICAgIGhlaWdodDogJzJweCcsXG4gICAgICBib3JkZXJSaWdodDogJzRweCBzb2xpZCAjZmZmJyxcbiAgICAgIHpJbmRleDogMVxuICAgIH0pO1xuXG4gICAgY29tbW9uLmV4dGVuZCh0aGlzLl9fc2F0dXJhdGlvbl9maWVsZC5zdHlsZSwge1xuICAgICAgd2lkdGg6ICcxMDBweCcsXG4gICAgICBoZWlnaHQ6ICcxMDBweCcsXG4gICAgICBib3JkZXI6ICcxcHggc29saWQgIzU1NScsXG4gICAgICBtYXJnaW5SaWdodDogJzNweCcsXG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgIGN1cnNvcjogJ3BvaW50ZXInXG4gICAgfSk7XG5cbiAgICBjb21tb24uZXh0ZW5kKHZhbHVlX2ZpZWxkLnN0eWxlLCB7XG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICBiYWNrZ3JvdW5kOiAnbm9uZSdcbiAgICB9KTtcbiAgICBcbiAgICBsaW5lYXJHcmFkaWVudCh2YWx1ZV9maWVsZCwgJ3RvcCcsICdyZ2JhKDAsMCwwLDApJywgJyMwMDAnKTtcblxuICAgIGNvbW1vbi5leHRlbmQodGhpcy5fX2h1ZV9maWVsZC5zdHlsZSwge1xuICAgICAgd2lkdGg6ICcxNXB4JyxcbiAgICAgIGhlaWdodDogJzEwMHB4JyxcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICM1NTUnLFxuICAgICAgY3Vyc29yOiAnbnMtcmVzaXplJ1xuICAgIH0pO1xuXG4gICAgaHVlR3JhZGllbnQodGhpcy5fX2h1ZV9maWVsZCk7XG5cbiAgICBjb21tb24uZXh0ZW5kKHRoaXMuX19pbnB1dC5zdHlsZSwge1xuICAgICAgb3V0bGluZTogJ25vbmUnLFxuLy8gICAgICB3aWR0aDogJzEyMHB4JyxcbiAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4vLyAgICAgIHBhZGRpbmc6ICc0cHgnLFxuLy8gICAgICBtYXJnaW5Cb3R0b206ICc2cHgnLFxuICAgICAgY29sb3I6ICcjZmZmJyxcbiAgICAgIGJvcmRlcjogMCxcbiAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgIHRleHRTaGFkb3c6IHRoaXMuX19pbnB1dF90ZXh0U2hhZG93ICsgJ3JnYmEoMCwwLDAsMC43KSdcbiAgICB9KTtcblxuICAgIGRvbS5iaW5kKHRoaXMuX19zYXR1cmF0aW9uX2ZpZWxkLCAnbW91c2Vkb3duJywgZmllbGREb3duKTtcbiAgICBkb20uYmluZCh0aGlzLl9fZmllbGRfa25vYiwgJ21vdXNlZG93bicsIGZpZWxkRG93bik7XG5cbiAgICBkb20uYmluZCh0aGlzLl9faHVlX2ZpZWxkLCAnbW91c2Vkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgc2V0SChlKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIHNldEgpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2V1cCcsIHVuYmluZEgpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gZmllbGREb3duKGUpIHtcbiAgICAgIHNldFNWKGUpO1xuICAgICAgLy8gZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3IgPSAnbm9uZSc7XG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBzZXRTVik7XG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZXVwJywgdW5iaW5kU1YpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVuYmluZFNWKCkge1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBzZXRTVik7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCB1bmJpbmRTVik7XG4gICAgICAvLyBkb2N1bWVudC5ib2R5LnN0eWxlLmN1cnNvciA9ICdkZWZhdWx0JztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkJsdXIoKSB7XG4gICAgICB2YXIgaSA9IGludGVycHJldCh0aGlzLnZhbHVlKTtcbiAgICAgIGlmIChpICE9PSBmYWxzZSkge1xuICAgICAgICBfdGhpcy5fX2NvbG9yLl9fc3RhdGUgPSBpO1xuICAgICAgICBfdGhpcy5zZXRWYWx1ZShfdGhpcy5fX2NvbG9yLnRvT3JpZ2luYWwoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnZhbHVlID0gX3RoaXMuX19jb2xvci50b1N0cmluZygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVuYmluZEgoKSB7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIHNldEgpO1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZXVwJywgdW5iaW5kSCk7XG4gICAgfVxuXG4gICAgdGhpcy5fX3NhdHVyYXRpb25fZmllbGQuYXBwZW5kQ2hpbGQodmFsdWVfZmllbGQpO1xuICAgIHRoaXMuX19zZWxlY3Rvci5hcHBlbmRDaGlsZCh0aGlzLl9fZmllbGRfa25vYik7XG4gICAgdGhpcy5fX3NlbGVjdG9yLmFwcGVuZENoaWxkKHRoaXMuX19zYXR1cmF0aW9uX2ZpZWxkKTtcbiAgICB0aGlzLl9fc2VsZWN0b3IuYXBwZW5kQ2hpbGQodGhpcy5fX2h1ZV9maWVsZCk7XG4gICAgdGhpcy5fX2h1ZV9maWVsZC5hcHBlbmRDaGlsZCh0aGlzLl9faHVlX2tub2IpO1xuXG4gICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX19pbnB1dCk7XG4gICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX19zZWxlY3Rvcik7XG5cbiAgICB0aGlzLnVwZGF0ZURpc3BsYXkoKTtcblxuICAgIGZ1bmN0aW9uIHNldFNWKGUpIHtcblxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB2YXIgdyA9IGRvbS5nZXRXaWR0aChfdGhpcy5fX3NhdHVyYXRpb25fZmllbGQpO1xuICAgICAgdmFyIG8gPSBkb20uZ2V0T2Zmc2V0KF90aGlzLl9fc2F0dXJhdGlvbl9maWVsZCk7XG4gICAgICB2YXIgcyA9IChlLmNsaWVudFggLSBvLmxlZnQgKyBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQpIC8gdztcbiAgICAgIHZhciB2ID0gMSAtIChlLmNsaWVudFkgLSBvLnRvcCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wKSAvIHc7XG5cbiAgICAgIGlmICh2ID4gMSkgdiA9IDE7XG4gICAgICBlbHNlIGlmICh2IDwgMCkgdiA9IDA7XG5cbiAgICAgIGlmIChzID4gMSkgcyA9IDE7XG4gICAgICBlbHNlIGlmIChzIDwgMCkgcyA9IDA7XG5cbiAgICAgIF90aGlzLl9fY29sb3IudiA9IHY7XG4gICAgICBfdGhpcy5fX2NvbG9yLnMgPSBzO1xuXG4gICAgICBfdGhpcy5zZXRWYWx1ZShfdGhpcy5fX2NvbG9yLnRvT3JpZ2luYWwoKSk7XG5cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0SChlKSB7XG5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdmFyIHMgPSBkb20uZ2V0SGVpZ2h0KF90aGlzLl9faHVlX2ZpZWxkKTtcbiAgICAgIHZhciBvID0gZG9tLmdldE9mZnNldChfdGhpcy5fX2h1ZV9maWVsZCk7XG4gICAgICB2YXIgaCA9IDEgLSAoZS5jbGllbnRZIC0gby50b3AgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCkgLyBzO1xuXG4gICAgICBpZiAoaCA+IDEpIGggPSAxO1xuICAgICAgZWxzZSBpZiAoaCA8IDApIGggPSAwO1xuXG4gICAgICBfdGhpcy5fX2NvbG9yLmggPSBoICogMzYwO1xuXG4gICAgICBfdGhpcy5zZXRWYWx1ZShfdGhpcy5fX2NvbG9yLnRvT3JpZ2luYWwoKSk7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIH1cblxuICB9O1xuXG4gIENvbG9yQ29udHJvbGxlci5zdXBlcmNsYXNzID0gQ29udHJvbGxlcjtcblxuICBjb21tb24uZXh0ZW5kKFxuXG4gICAgICBDb2xvckNvbnRyb2xsZXIucHJvdG90eXBlLFxuICAgICAgQ29udHJvbGxlci5wcm90b3R5cGUsXG5cbiAgICAgIHtcblxuICAgICAgICB1cGRhdGVEaXNwbGF5OiBmdW5jdGlvbigpIHtcblxuICAgICAgICAgIHZhciBpID0gaW50ZXJwcmV0KHRoaXMuZ2V0VmFsdWUoKSk7XG5cbiAgICAgICAgICBpZiAoaSAhPT0gZmFsc2UpIHtcblxuICAgICAgICAgICAgdmFyIG1pc21hdGNoID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIENoZWNrIGZvciBtaXNtYXRjaCBvbiB0aGUgaW50ZXJwcmV0ZWQgdmFsdWUuXG5cbiAgICAgICAgICAgIGNvbW1vbi5lYWNoKENvbG9yLkNPTVBPTkVOVFMsIGZ1bmN0aW9uKGNvbXBvbmVudCkge1xuICAgICAgICAgICAgICBpZiAoIWNvbW1vbi5pc1VuZGVmaW5lZChpW2NvbXBvbmVudF0pICYmXG4gICAgICAgICAgICAgICAgICAhY29tbW9uLmlzVW5kZWZpbmVkKHRoaXMuX19jb2xvci5fX3N0YXRlW2NvbXBvbmVudF0pICYmXG4gICAgICAgICAgICAgICAgICBpW2NvbXBvbmVudF0gIT09IHRoaXMuX19jb2xvci5fX3N0YXRlW2NvbXBvbmVudF0pIHtcbiAgICAgICAgICAgICAgICBtaXNtYXRjaCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHt9OyAvLyBicmVha1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICAgICAgLy8gSWYgbm90aGluZyBkaXZlcmdlcywgd2Uga2VlcCBvdXIgcHJldmlvdXMgdmFsdWVzXG4gICAgICAgICAgICAvLyBmb3Igc3RhdGVmdWxuZXNzLCBvdGhlcndpc2Ugd2UgcmVjYWxjdWxhdGUgZnJlc2hcbiAgICAgICAgICAgIGlmIChtaXNtYXRjaCkge1xuICAgICAgICAgICAgICBjb21tb24uZXh0ZW5kKHRoaXMuX19jb2xvci5fX3N0YXRlLCBpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbW1vbi5leHRlbmQodGhpcy5fX3RlbXAuX19zdGF0ZSwgdGhpcy5fX2NvbG9yLl9fc3RhdGUpO1xuXG4gICAgICAgICAgdGhpcy5fX3RlbXAuYSA9IDE7XG5cbiAgICAgICAgICB2YXIgZmxpcCA9ICh0aGlzLl9fY29sb3IudiA8IC41IHx8IHRoaXMuX19jb2xvci5zID4gLjUpID8gMjU1IDogMDtcbiAgICAgICAgICB2YXIgX2ZsaXAgPSAyNTUgLSBmbGlwO1xuXG4gICAgICAgICAgY29tbW9uLmV4dGVuZCh0aGlzLl9fZmllbGRfa25vYi5zdHlsZSwge1xuICAgICAgICAgICAgbWFyZ2luTGVmdDogMTAwICogdGhpcy5fX2NvbG9yLnMgLSA3ICsgJ3B4JyxcbiAgICAgICAgICAgIG1hcmdpblRvcDogMTAwICogKDEgLSB0aGlzLl9fY29sb3IudikgLSA3ICsgJ3B4JyxcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5fX3RlbXAudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIGJvcmRlcjogdGhpcy5fX2ZpZWxkX2tub2JfYm9yZGVyICsgJ3JnYignICsgZmxpcCArICcsJyArIGZsaXAgKyAnLCcgKyBmbGlwICsnKSdcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuX19odWVfa25vYi5zdHlsZS5tYXJnaW5Ub3AgPSAoMSAtIHRoaXMuX19jb2xvci5oIC8gMzYwKSAqIDEwMCArICdweCdcblxuICAgICAgICAgIHRoaXMuX190ZW1wLnMgPSAxO1xuICAgICAgICAgIHRoaXMuX190ZW1wLnYgPSAxO1xuXG4gICAgICAgICAgbGluZWFyR3JhZGllbnQodGhpcy5fX3NhdHVyYXRpb25fZmllbGQsICdsZWZ0JywgJyNmZmYnLCB0aGlzLl9fdGVtcC50b1N0cmluZygpKTtcblxuICAgICAgICAgIGNvbW1vbi5leHRlbmQodGhpcy5fX2lucHV0LnN0eWxlLCB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuX19pbnB1dC52YWx1ZSA9IHRoaXMuX19jb2xvci50b1N0cmluZygpLFxuICAgICAgICAgICAgY29sb3I6ICdyZ2IoJyArIGZsaXAgKyAnLCcgKyBmbGlwICsgJywnICsgZmxpcCArJyknLFxuICAgICAgICAgICAgdGV4dFNoYWRvdzogdGhpcy5fX2lucHV0X3RleHRTaGFkb3cgKyAncmdiYSgnICsgX2ZsaXAgKyAnLCcgKyBfZmxpcCArICcsJyArIF9mbGlwICsnLC43KSdcbiAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICApO1xuICBcbiAgdmFyIHZlbmRvcnMgPSBbJy1tb3otJywnLW8tJywnLXdlYmtpdC0nLCctbXMtJywnJ107XG4gIFxuICBmdW5jdGlvbiBsaW5lYXJHcmFkaWVudChlbGVtLCB4LCBhLCBiKSB7XG4gICAgZWxlbS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgY29tbW9uLmVhY2godmVuZG9ycywgZnVuY3Rpb24odmVuZG9yKSB7XG4gICAgICBlbGVtLnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQ6ICcgKyB2ZW5kb3IgKyAnbGluZWFyLWdyYWRpZW50KCcreCsnLCAnK2ErJyAwJSwgJyArIGIgKyAnIDEwMCUpOyAnO1xuICAgIH0pO1xuICB9XG4gIFxuICBmdW5jdGlvbiBodWVHcmFkaWVudChlbGVtKSB7XG4gICAgZWxlbS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgZWxlbS5zdHlsZS5jc3NUZXh0ICs9ICdiYWNrZ3JvdW5kOiAtbW96LWxpbmVhci1ncmFkaWVudCh0b3AsICAjZmYwMDAwIDAlLCAjZmYwMGZmIDE3JSwgIzAwMDBmZiAzNCUsICMwMGZmZmYgNTAlLCAjMDBmZjAwIDY3JSwgI2ZmZmYwMCA4NCUsICNmZjAwMDAgMTAwJSk7J1xuICAgIGVsZW0uc3R5bGUuY3NzVGV4dCArPSAnYmFja2dyb3VuZDogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG9wLCAgI2ZmMDAwMCAwJSwjZmYwMGZmIDE3JSwjMDAwMGZmIDM0JSwjMDBmZmZmIDUwJSwjMDBmZjAwIDY3JSwjZmZmZjAwIDg0JSwjZmYwMDAwIDEwMCUpOydcbiAgICBlbGVtLnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQ6IC1vLWxpbmVhci1ncmFkaWVudCh0b3AsICAjZmYwMDAwIDAlLCNmZjAwZmYgMTclLCMwMDAwZmYgMzQlLCMwMGZmZmYgNTAlLCMwMGZmMDAgNjclLCNmZmZmMDAgODQlLCNmZjAwMDAgMTAwJSk7J1xuICAgIGVsZW0uc3R5bGUuY3NzVGV4dCArPSAnYmFja2dyb3VuZDogLW1zLWxpbmVhci1ncmFkaWVudCh0b3AsICAjZmYwMDAwIDAlLCNmZjAwZmYgMTclLCMwMDAwZmYgMzQlLCMwMGZmZmYgNTAlLCMwMGZmMDAgNjclLCNmZmZmMDAgODQlLCNmZjAwMDAgMTAwJSk7J1xuICAgIGVsZW0uc3R5bGUuY3NzVGV4dCArPSAnYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvcCwgICNmZjAwMDAgMCUsI2ZmMDBmZiAxNyUsIzAwMDBmZiAzNCUsIzAwZmZmZiA1MCUsIzAwZmYwMCA2NyUsI2ZmZmYwMCA4NCUsI2ZmMDAwMCAxMDAlKTsnXG4gIH1cblxuXG4gIHJldHVybiBDb2xvckNvbnRyb2xsZXI7XG5cbn0pKGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyLFxuZGF0LmRvbS5kb20sXG5kYXQuY29sb3IuQ29sb3IgPSAoZnVuY3Rpb24gKGludGVycHJldCwgbWF0aCwgdG9TdHJpbmcsIGNvbW1vbikge1xuXG4gIHZhciBDb2xvciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5fX3N0YXRlID0gaW50ZXJwcmV0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICBpZiAodGhpcy5fX3N0YXRlID09PSBmYWxzZSkge1xuICAgICAgdGhyb3cgJ0ZhaWxlZCB0byBpbnRlcnByZXQgY29sb3IgYXJndW1lbnRzJztcbiAgICB9XG5cbiAgICB0aGlzLl9fc3RhdGUuYSA9IHRoaXMuX19zdGF0ZS5hIHx8IDE7XG5cblxuICB9O1xuXG4gIENvbG9yLkNPTVBPTkVOVFMgPSBbJ3InLCdnJywnYicsJ2gnLCdzJywndicsJ2hleCcsJ2EnXTtcblxuICBjb21tb24uZXh0ZW5kKENvbG9yLnByb3RvdHlwZSwge1xuXG4gICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRvU3RyaW5nKHRoaXMpO1xuICAgIH0sXG5cbiAgICB0b09yaWdpbmFsOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLl9fc3RhdGUuY29udmVyc2lvbi53cml0ZSh0aGlzKTtcbiAgICB9XG5cbiAgfSk7XG5cbiAgZGVmaW5lUkdCQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ3InLCAyKTtcbiAgZGVmaW5lUkdCQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ2cnLCAxKTtcbiAgZGVmaW5lUkdCQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ2InLCAwKTtcblxuICBkZWZpbmVIU1ZDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAnaCcpO1xuICBkZWZpbmVIU1ZDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAncycpO1xuICBkZWZpbmVIU1ZDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAndicpO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb2xvci5wcm90b3R5cGUsICdhJywge1xuXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLl9fc3RhdGUuYTtcbiAgICB9LFxuXG4gICAgc2V0OiBmdW5jdGlvbih2KSB7XG4gICAgICB0aGlzLl9fc3RhdGUuYSA9IHY7XG4gICAgfVxuXG4gIH0pO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb2xvci5wcm90b3R5cGUsICdoZXgnLCB7XG5cbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgICBpZiAoIXRoaXMuX19zdGF0ZS5zcGFjZSAhPT0gJ0hFWCcpIHtcbiAgICAgICAgdGhpcy5fX3N0YXRlLmhleCA9IG1hdGgucmdiX3RvX2hleCh0aGlzLnIsIHRoaXMuZywgdGhpcy5iKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZS5oZXg7XG5cbiAgICB9LFxuXG4gICAgc2V0OiBmdW5jdGlvbih2KSB7XG5cbiAgICAgIHRoaXMuX19zdGF0ZS5zcGFjZSA9ICdIRVgnO1xuICAgICAgdGhpcy5fX3N0YXRlLmhleCA9IHY7XG5cbiAgICB9XG5cbiAgfSk7XG5cbiAgZnVuY3Rpb24gZGVmaW5lUkdCQ29tcG9uZW50KHRhcmdldCwgY29tcG9uZW50LCBjb21wb25lbnRIZXhJbmRleCkge1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29tcG9uZW50LCB7XG5cbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX19zdGF0ZS5zcGFjZSA9PT0gJ1JHQicpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fX3N0YXRlW2NvbXBvbmVudF07XG4gICAgICAgIH1cblxuICAgICAgICByZWNhbGN1bGF0ZVJHQih0aGlzLCBjb21wb25lbnQsIGNvbXBvbmVudEhleEluZGV4KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5fX3N0YXRlW2NvbXBvbmVudF07XG5cbiAgICAgIH0sXG5cbiAgICAgIHNldDogZnVuY3Rpb24odikge1xuXG4gICAgICAgIGlmICh0aGlzLl9fc3RhdGUuc3BhY2UgIT09ICdSR0InKSB7XG4gICAgICAgICAgcmVjYWxjdWxhdGVSR0IodGhpcywgY29tcG9uZW50LCBjb21wb25lbnRIZXhJbmRleCk7XG4gICAgICAgICAgdGhpcy5fX3N0YXRlLnNwYWNlID0gJ1JHQic7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9fc3RhdGVbY29tcG9uZW50XSA9IHY7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH1cblxuICBmdW5jdGlvbiBkZWZpbmVIU1ZDb21wb25lbnQodGFyZ2V0LCBjb21wb25lbnQpIHtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbXBvbmVudCwge1xuXG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGlmICh0aGlzLl9fc3RhdGUuc3BhY2UgPT09ICdIU1YnKVxuICAgICAgICAgIHJldHVybiB0aGlzLl9fc3RhdGVbY29tcG9uZW50XTtcblxuICAgICAgICByZWNhbGN1bGF0ZUhTVih0aGlzKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5fX3N0YXRlW2NvbXBvbmVudF07XG5cbiAgICAgIH0sXG5cbiAgICAgIHNldDogZnVuY3Rpb24odikge1xuXG4gICAgICAgIGlmICh0aGlzLl9fc3RhdGUuc3BhY2UgIT09ICdIU1YnKSB7XG4gICAgICAgICAgcmVjYWxjdWxhdGVIU1YodGhpcyk7XG4gICAgICAgICAgdGhpcy5fX3N0YXRlLnNwYWNlID0gJ0hTVic7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9fc3RhdGVbY29tcG9uZW50XSA9IHY7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH1cblxuICBmdW5jdGlvbiByZWNhbGN1bGF0ZVJHQihjb2xvciwgY29tcG9uZW50LCBjb21wb25lbnRIZXhJbmRleCkge1xuXG4gICAgaWYgKGNvbG9yLl9fc3RhdGUuc3BhY2UgPT09ICdIRVgnKSB7XG5cbiAgICAgIGNvbG9yLl9fc3RhdGVbY29tcG9uZW50XSA9IG1hdGguY29tcG9uZW50X2Zyb21faGV4KGNvbG9yLl9fc3RhdGUuaGV4LCBjb21wb25lbnRIZXhJbmRleCk7XG5cbiAgICB9IGVsc2UgaWYgKGNvbG9yLl9fc3RhdGUuc3BhY2UgPT09ICdIU1YnKSB7XG5cbiAgICAgIGNvbW1vbi5leHRlbmQoY29sb3IuX19zdGF0ZSwgbWF0aC5oc3ZfdG9fcmdiKGNvbG9yLl9fc3RhdGUuaCwgY29sb3IuX19zdGF0ZS5zLCBjb2xvci5fX3N0YXRlLnYpKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRocm93ICdDb3JydXB0ZWQgY29sb3Igc3RhdGUnO1xuXG4gICAgfVxuXG4gIH1cblxuICBmdW5jdGlvbiByZWNhbGN1bGF0ZUhTVihjb2xvcikge1xuXG4gICAgdmFyIHJlc3VsdCA9IG1hdGgucmdiX3RvX2hzdihjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iKTtcblxuICAgIGNvbW1vbi5leHRlbmQoY29sb3IuX19zdGF0ZSxcbiAgICAgICAge1xuICAgICAgICAgIHM6IHJlc3VsdC5zLFxuICAgICAgICAgIHY6IHJlc3VsdC52XG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgaWYgKCFjb21tb24uaXNOYU4ocmVzdWx0LmgpKSB7XG4gICAgICBjb2xvci5fX3N0YXRlLmggPSByZXN1bHQuaDtcbiAgICB9IGVsc2UgaWYgKGNvbW1vbi5pc1VuZGVmaW5lZChjb2xvci5fX3N0YXRlLmgpKSB7XG4gICAgICBjb2xvci5fX3N0YXRlLmggPSAwO1xuICAgIH1cblxuICB9XG5cbiAgcmV0dXJuIENvbG9yO1xuXG59KShkYXQuY29sb3IuaW50ZXJwcmV0LFxuZGF0LmNvbG9yLm1hdGggPSAoZnVuY3Rpb24gKCkge1xuXG4gIHZhciB0bXBDb21wb25lbnQ7XG5cbiAgcmV0dXJuIHtcblxuICAgIGhzdl90b19yZ2I6IGZ1bmN0aW9uKGgsIHMsIHYpIHtcblxuICAgICAgdmFyIGhpID0gTWF0aC5mbG9vcihoIC8gNjApICUgNjtcblxuICAgICAgdmFyIGYgPSBoIC8gNjAgLSBNYXRoLmZsb29yKGggLyA2MCk7XG4gICAgICB2YXIgcCA9IHYgKiAoMS4wIC0gcyk7XG4gICAgICB2YXIgcSA9IHYgKiAoMS4wIC0gKGYgKiBzKSk7XG4gICAgICB2YXIgdCA9IHYgKiAoMS4wIC0gKCgxLjAgLSBmKSAqIHMpKTtcbiAgICAgIHZhciBjID0gW1xuICAgICAgICBbdiwgdCwgcF0sXG4gICAgICAgIFtxLCB2LCBwXSxcbiAgICAgICAgW3AsIHYsIHRdLFxuICAgICAgICBbcCwgcSwgdl0sXG4gICAgICAgIFt0LCBwLCB2XSxcbiAgICAgICAgW3YsIHAsIHFdXG4gICAgICBdW2hpXTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcjogY1swXSAqIDI1NSxcbiAgICAgICAgZzogY1sxXSAqIDI1NSxcbiAgICAgICAgYjogY1syXSAqIDI1NVxuICAgICAgfTtcblxuICAgIH0sXG5cbiAgICByZ2JfdG9faHN2OiBmdW5jdGlvbihyLCBnLCBiKSB7XG5cbiAgICAgIHZhciBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKSxcbiAgICAgICAgICBtYXggPSBNYXRoLm1heChyLCBnLCBiKSxcbiAgICAgICAgICBkZWx0YSA9IG1heCAtIG1pbixcbiAgICAgICAgICBoLCBzO1xuXG4gICAgICBpZiAobWF4ICE9IDApIHtcbiAgICAgICAgcyA9IGRlbHRhIC8gbWF4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBoOiBOYU4sXG4gICAgICAgICAgczogMCxcbiAgICAgICAgICB2OiAwXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGlmIChyID09IG1heCkge1xuICAgICAgICBoID0gKGcgLSBiKSAvIGRlbHRhO1xuICAgICAgfSBlbHNlIGlmIChnID09IG1heCkge1xuICAgICAgICBoID0gMiArIChiIC0gcikgLyBkZWx0YTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGggPSA0ICsgKHIgLSBnKSAvIGRlbHRhO1xuICAgICAgfVxuICAgICAgaCAvPSA2O1xuICAgICAgaWYgKGggPCAwKSB7XG4gICAgICAgIGggKz0gMTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaDogaCAqIDM2MCxcbiAgICAgICAgczogcyxcbiAgICAgICAgdjogbWF4IC8gMjU1XG4gICAgICB9O1xuICAgIH0sXG5cbiAgICByZ2JfdG9faGV4OiBmdW5jdGlvbihyLCBnLCBiKSB7XG4gICAgICB2YXIgaGV4ID0gdGhpcy5oZXhfd2l0aF9jb21wb25lbnQoMCwgMiwgcik7XG4gICAgICBoZXggPSB0aGlzLmhleF93aXRoX2NvbXBvbmVudChoZXgsIDEsIGcpO1xuICAgICAgaGV4ID0gdGhpcy5oZXhfd2l0aF9jb21wb25lbnQoaGV4LCAwLCBiKTtcbiAgICAgIHJldHVybiBoZXg7XG4gICAgfSxcblxuICAgIGNvbXBvbmVudF9mcm9tX2hleDogZnVuY3Rpb24oaGV4LCBjb21wb25lbnRJbmRleCkge1xuICAgICAgcmV0dXJuIChoZXggPj4gKGNvbXBvbmVudEluZGV4ICogOCkpICYgMHhGRjtcbiAgICB9LFxuXG4gICAgaGV4X3dpdGhfY29tcG9uZW50OiBmdW5jdGlvbihoZXgsIGNvbXBvbmVudEluZGV4LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlIDw8ICh0bXBDb21wb25lbnQgPSBjb21wb25lbnRJbmRleCAqIDgpIHwgKGhleCAmIH4gKDB4RkYgPDwgdG1wQ29tcG9uZW50KSk7XG4gICAgfVxuXG4gIH1cblxufSkoKSxcbmRhdC5jb2xvci50b1N0cmluZyxcbmRhdC51dGlscy5jb21tb24pLFxuZGF0LmNvbG9yLmludGVycHJldCxcbmRhdC51dGlscy5jb21tb24pLFxuZGF0LnV0aWxzLnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IChmdW5jdGlvbiAoKSB7XG5cbiAgLyoqXG4gICAqIHJlcXVpcmVqcyB2ZXJzaW9uIG9mIFBhdWwgSXJpc2gncyBSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICogaHR0cDovL3BhdWxpcmlzaC5jb20vMjAxMS9yZXF1ZXN0YW5pbWF0aW9uZnJhbWUtZm9yLXNtYXJ0LWFuaW1hdGluZy9cbiAgICovXG5cbiAgcmV0dXJuIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgIHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgIGZ1bmN0aW9uKGNhbGxiYWNrLCBlbGVtZW50KSB7XG5cbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XG5cbiAgICAgIH07XG59KSgpLFxuZGF0LmRvbS5DZW50ZXJlZERpdiA9IChmdW5jdGlvbiAoZG9tLCBjb21tb24pIHtcblxuXG4gIHZhciBDZW50ZXJlZERpdiA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5iYWNrZ3JvdW5kRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbW1vbi5leHRlbmQodGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZSwge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgwLDAsMCwwLjgpJyxcbiAgICAgIHRvcDogMCxcbiAgICAgIGxlZnQ6IDAsXG4gICAgICBkaXNwbGF5OiAnbm9uZScsXG4gICAgICB6SW5kZXg6ICcxMDAwJyxcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICBXZWJraXRUcmFuc2l0aW9uOiAnb3BhY2l0eSAwLjJzIGxpbmVhcidcbiAgICB9KTtcblxuICAgIGRvbS5tYWtlRnVsbHNjcmVlbih0aGlzLmJhY2tncm91bmRFbGVtZW50KTtcbiAgICB0aGlzLmJhY2tncm91bmRFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcblxuICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbW1vbi5leHRlbmQodGhpcy5kb21FbGVtZW50LnN0eWxlLCB7XG4gICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgIGRpc3BsYXk6ICdub25lJyxcbiAgICAgIHpJbmRleDogJzEwMDEnLFxuICAgICAgb3BhY2l0eTogMCxcbiAgICAgIFdlYmtpdFRyYW5zaXRpb246ICctd2Via2l0LXRyYW5zZm9ybSAwLjJzIGVhc2Utb3V0LCBvcGFjaXR5IDAuMnMgbGluZWFyJ1xuICAgIH0pO1xuXG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuYmFja2dyb3VuZEVsZW1lbnQpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5kb21FbGVtZW50KTtcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgZG9tLmJpbmQodGhpcy5iYWNrZ3JvdW5kRWxlbWVudCwgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICBfdGhpcy5oaWRlKCk7XG4gICAgfSk7XG5cblxuICB9O1xuXG4gIENlbnRlcmVkRGl2LnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIFxuXG5cbiAgICB0aGlzLmJhY2tncm91bmRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcbi8vICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS50b3AgPSAnNTIlJztcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKDEuMSknO1xuXG4gICAgdGhpcy5sYXlvdXQoKTtcblxuICAgIGNvbW1vbi5kZWZlcihmdW5jdGlvbigpIHtcbiAgICAgIF90aGlzLmJhY2tncm91bmRFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgX3RoaXMuZG9tRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgIF90aGlzLmRvbUVsZW1lbnQuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKDEpJztcbiAgICB9KTtcblxuICB9O1xuXG4gIENlbnRlcmVkRGl2LnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdmFyIGhpZGUgPSBmdW5jdGlvbigpIHtcblxuICAgICAgX3RoaXMuZG9tRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgX3RoaXMuYmFja2dyb3VuZEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICAgICAgZG9tLnVuYmluZChfdGhpcy5kb21FbGVtZW50LCAnd2Via2l0VHJhbnNpdGlvbkVuZCcsIGhpZGUpO1xuICAgICAgZG9tLnVuYmluZChfdGhpcy5kb21FbGVtZW50LCAndHJhbnNpdGlvbmVuZCcsIGhpZGUpO1xuICAgICAgZG9tLnVuYmluZChfdGhpcy5kb21FbGVtZW50LCAnb1RyYW5zaXRpb25FbmQnLCBoaWRlKTtcblxuICAgIH07XG5cbiAgICBkb20uYmluZCh0aGlzLmRvbUVsZW1lbnQsICd3ZWJraXRUcmFuc2l0aW9uRW5kJywgaGlkZSk7XG4gICAgZG9tLmJpbmQodGhpcy5kb21FbGVtZW50LCAndHJhbnNpdGlvbmVuZCcsIGhpZGUpO1xuICAgIGRvbS5iaW5kKHRoaXMuZG9tRWxlbWVudCwgJ29UcmFuc2l0aW9uRW5kJywgaGlkZSk7XG5cbiAgICB0aGlzLmJhY2tncm91bmRFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAwO1xuLy8gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLnRvcCA9ICc0OCUnO1xuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKDEuMSknO1xuXG4gIH07XG5cbiAgQ2VudGVyZWREaXYucHJvdG90eXBlLmxheW91dCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS5sZWZ0ID0gd2luZG93LmlubmVyV2lkdGgvMiAtIGRvbS5nZXRXaWR0aCh0aGlzLmRvbUVsZW1lbnQpIC8gMiArICdweCc7XG4gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLnRvcCA9IHdpbmRvdy5pbm5lckhlaWdodC8yIC0gZG9tLmdldEhlaWdodCh0aGlzLmRvbUVsZW1lbnQpIC8gMiArICdweCc7XG4gIH07XG4gIFxuICBmdW5jdGlvbiBsb2NrU2Nyb2xsKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgfVxuXG4gIHJldHVybiBDZW50ZXJlZERpdjtcblxufSkoZGF0LmRvbS5kb20sXG5kYXQudXRpbHMuY29tbW9uKSxcbmRhdC5kb20uZG9tLFxuZGF0LnV0aWxzLmNvbW1vbik7IiwiLyoqXG4gKiBkYXQtZ3VpIEphdmFTY3JpcHQgQ29udHJvbGxlciBMaWJyYXJ5XG4gKiBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvZGF0LWd1aVxuICpcbiAqIENvcHlyaWdodCAyMDExIERhdGEgQXJ0cyBUZWFtLCBHb29nbGUgQ3JlYXRpdmUgTGFiXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICovXG5cbi8qKiBAbmFtZXNwYWNlICovXG52YXIgZGF0ID0gbW9kdWxlLmV4cG9ydHMgPSBkYXQgfHwge307XG5cbi8qKiBAbmFtZXNwYWNlICovXG5kYXQuY29sb3IgPSBkYXQuY29sb3IgfHwge307XG5cbi8qKiBAbmFtZXNwYWNlICovXG5kYXQudXRpbHMgPSBkYXQudXRpbHMgfHwge307XG5cbmRhdC51dGlscy5jb21tb24gPSAoZnVuY3Rpb24gKCkge1xuICBcbiAgdmFyIEFSUl9FQUNIID0gQXJyYXkucHJvdG90eXBlLmZvckVhY2g7XG4gIHZhciBBUlJfU0xJQ0UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG5cbiAgLyoqXG4gICAqIEJhbmQtYWlkIG1ldGhvZHMgZm9yIHRoaW5ncyB0aGF0IHNob3VsZCBiZSBhIGxvdCBlYXNpZXIgaW4gSmF2YVNjcmlwdC5cbiAgICogSW1wbGVtZW50YXRpb24gYW5kIHN0cnVjdHVyZSBpbnNwaXJlZCBieSB1bmRlcnNjb3JlLmpzXG4gICAqIGh0dHA6Ly9kb2N1bWVudGNsb3VkLmdpdGh1Yi5jb20vdW5kZXJzY29yZS9cbiAgICovXG5cbiAgcmV0dXJuIHsgXG4gICAgXG4gICAgQlJFQUs6IHt9LFxuICBcbiAgICBleHRlbmQ6IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgXG4gICAgICB0aGlzLmVhY2goQVJSX1NMSUNFLmNhbGwoYXJndW1lbnRzLCAxKSwgZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIFxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKVxuICAgICAgICAgIGlmICghdGhpcy5pc1VuZGVmaW5lZChvYmpba2V5XSkpIFxuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgXG4gICAgICB9LCB0aGlzKTtcbiAgICAgIFxuICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgIFxuICAgIH0sXG4gICAgXG4gICAgZGVmYXVsdHM6IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgXG4gICAgICB0aGlzLmVhY2goQVJSX1NMSUNFLmNhbGwoYXJndW1lbnRzLCAxKSwgZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIFxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKVxuICAgICAgICAgIGlmICh0aGlzLmlzVW5kZWZpbmVkKHRhcmdldFtrZXldKSkgXG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IG9ialtrZXldO1xuICAgICAgICBcbiAgICAgIH0sIHRoaXMpO1xuICAgICAgXG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIFxuICAgIH0sXG4gICAgXG4gICAgY29tcG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdG9DYWxsID0gQVJSX1NMSUNFLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBBUlJfU0xJQ0UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgICAgICBmb3IgKHZhciBpID0gdG9DYWxsLmxlbmd0aCAtMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICBhcmdzID0gW3RvQ2FsbFtpXS5hcHBseSh0aGlzLCBhcmdzKV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIGFyZ3NbMF07XG4gICAgICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICBlYWNoOiBmdW5jdGlvbihvYmosIGl0ciwgc2NvcGUpIHtcblxuICAgICAgXG4gICAgICBpZiAoQVJSX0VBQ0ggJiYgb2JqLmZvckVhY2ggPT09IEFSUl9FQUNIKSB7IFxuICAgICAgICBcbiAgICAgICAgb2JqLmZvckVhY2goaXRyLCBzY29wZSk7XG4gICAgICAgIFxuICAgICAgfSBlbHNlIGlmIChvYmoubGVuZ3RoID09PSBvYmoubGVuZ3RoICsgMCkgeyAvLyBJcyBudW1iZXIgYnV0IG5vdCBOYU5cbiAgICAgICAgXG4gICAgICAgIGZvciAodmFyIGtleSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBrZXkgPCBsOyBrZXkrKylcbiAgICAgICAgICBpZiAoa2V5IGluIG9iaiAmJiBpdHIuY2FsbChzY29wZSwgb2JqW2tleV0sIGtleSkgPT09IHRoaXMuQlJFQUspIFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIFxuICAgICAgICAgIGlmIChpdHIuY2FsbChzY29wZSwgb2JqW2tleV0sIGtleSkgPT09IHRoaXMuQlJFQUspXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBcbiAgICAgIH1cbiAgICAgICAgICAgIFxuICAgIH0sXG4gICAgXG4gICAgZGVmZXI6IGZ1bmN0aW9uKGZuYykge1xuICAgICAgc2V0VGltZW91dChmbmMsIDApO1xuICAgIH0sXG4gICAgXG4gICAgdG9BcnJheTogZnVuY3Rpb24ob2JqKSB7XG4gICAgICBpZiAob2JqLnRvQXJyYXkpIHJldHVybiBvYmoudG9BcnJheSgpO1xuICAgICAgcmV0dXJuIEFSUl9TTElDRS5jYWxsKG9iaik7XG4gICAgfSxcblxuICAgIGlzVW5kZWZpbmVkOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IHVuZGVmaW5lZDtcbiAgICB9LFxuICAgIFxuICAgIGlzTnVsbDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09PSBudWxsO1xuICAgIH0sXG4gICAgXG4gICAgaXNOYU46IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAhPT0gb2JqO1xuICAgIH0sXG4gICAgXG4gICAgaXNBcnJheTogQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmouY29uc3RydWN0b3IgPT09IEFycmF5O1xuICAgIH0sXG4gICAgXG4gICAgaXNPYmplY3Q6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gT2JqZWN0KG9iaik7XG4gICAgfSxcbiAgICBcbiAgICBpc051bWJlcjogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09PSBvYmorMDtcbiAgICB9LFxuICAgIFxuICAgIGlzU3RyaW5nOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IG9iaisnJztcbiAgICB9LFxuICAgIFxuICAgIGlzQm9vbGVhbjogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09PSBmYWxzZSB8fCBvYmogPT09IHRydWU7XG4gICAgfSxcbiAgICBcbiAgICBpc0Z1bmN0aW9uOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgICB9XG4gIFxuICB9O1xuICAgIFxufSkoKTtcblxuXG5kYXQuY29sb3IudG9TdHJpbmcgPSAoZnVuY3Rpb24gKGNvbW1vbikge1xuXG4gIHJldHVybiBmdW5jdGlvbihjb2xvcikge1xuXG4gICAgaWYgKGNvbG9yLmEgPT0gMSB8fCBjb21tb24uaXNVbmRlZmluZWQoY29sb3IuYSkpIHtcblxuICAgICAgdmFyIHMgPSBjb2xvci5oZXgudG9TdHJpbmcoMTYpO1xuICAgICAgd2hpbGUgKHMubGVuZ3RoIDwgNikge1xuICAgICAgICBzID0gJzAnICsgcztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICcjJyArIHM7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICByZXR1cm4gJ3JnYmEoJyArIE1hdGgucm91bmQoY29sb3IucikgKyAnLCcgKyBNYXRoLnJvdW5kKGNvbG9yLmcpICsgJywnICsgTWF0aC5yb3VuZChjb2xvci5iKSArICcsJyArIGNvbG9yLmEgKyAnKSc7XG5cbiAgICB9XG5cbiAgfVxuXG59KShkYXQudXRpbHMuY29tbW9uKTtcblxuXG5kYXQuQ29sb3IgPSBkYXQuY29sb3IuQ29sb3IgPSAoZnVuY3Rpb24gKGludGVycHJldCwgbWF0aCwgdG9TdHJpbmcsIGNvbW1vbikge1xuXG4gIHZhciBDb2xvciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5fX3N0YXRlID0gaW50ZXJwcmV0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICBpZiAodGhpcy5fX3N0YXRlID09PSBmYWxzZSkge1xuICAgICAgdGhyb3cgJ0ZhaWxlZCB0byBpbnRlcnByZXQgY29sb3IgYXJndW1lbnRzJztcbiAgICB9XG5cbiAgICB0aGlzLl9fc3RhdGUuYSA9IHRoaXMuX19zdGF0ZS5hIHx8IDE7XG5cblxuICB9O1xuXG4gIENvbG9yLkNPTVBPTkVOVFMgPSBbJ3InLCdnJywnYicsJ2gnLCdzJywndicsJ2hleCcsJ2EnXTtcblxuICBjb21tb24uZXh0ZW5kKENvbG9yLnByb3RvdHlwZSwge1xuXG4gICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRvU3RyaW5nKHRoaXMpO1xuICAgIH0sXG5cbiAgICB0b09yaWdpbmFsOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLl9fc3RhdGUuY29udmVyc2lvbi53cml0ZSh0aGlzKTtcbiAgICB9XG5cbiAgfSk7XG5cbiAgZGVmaW5lUkdCQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ3InLCAyKTtcbiAgZGVmaW5lUkdCQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ2cnLCAxKTtcbiAgZGVmaW5lUkdCQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ2InLCAwKTtcblxuICBkZWZpbmVIU1ZDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAnaCcpO1xuICBkZWZpbmVIU1ZDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAncycpO1xuICBkZWZpbmVIU1ZDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAndicpO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb2xvci5wcm90b3R5cGUsICdhJywge1xuXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLl9fc3RhdGUuYTtcbiAgICB9LFxuXG4gICAgc2V0OiBmdW5jdGlvbih2KSB7XG4gICAgICB0aGlzLl9fc3RhdGUuYSA9IHY7XG4gICAgfVxuXG4gIH0pO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb2xvci5wcm90b3R5cGUsICdoZXgnLCB7XG5cbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgICBpZiAoIXRoaXMuX19zdGF0ZS5zcGFjZSAhPT0gJ0hFWCcpIHtcbiAgICAgICAgdGhpcy5fX3N0YXRlLmhleCA9IG1hdGgucmdiX3RvX2hleCh0aGlzLnIsIHRoaXMuZywgdGhpcy5iKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZS5oZXg7XG5cbiAgICB9LFxuXG4gICAgc2V0OiBmdW5jdGlvbih2KSB7XG5cbiAgICAgIHRoaXMuX19zdGF0ZS5zcGFjZSA9ICdIRVgnO1xuICAgICAgdGhpcy5fX3N0YXRlLmhleCA9IHY7XG5cbiAgICB9XG5cbiAgfSk7XG5cbiAgZnVuY3Rpb24gZGVmaW5lUkdCQ29tcG9uZW50KHRhcmdldCwgY29tcG9uZW50LCBjb21wb25lbnRIZXhJbmRleCkge1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29tcG9uZW50LCB7XG5cbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX19zdGF0ZS5zcGFjZSA9PT0gJ1JHQicpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fX3N0YXRlW2NvbXBvbmVudF07XG4gICAgICAgIH1cblxuICAgICAgICByZWNhbGN1bGF0ZVJHQih0aGlzLCBjb21wb25lbnQsIGNvbXBvbmVudEhleEluZGV4KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5fX3N0YXRlW2NvbXBvbmVudF07XG5cbiAgICAgIH0sXG5cbiAgICAgIHNldDogZnVuY3Rpb24odikge1xuXG4gICAgICAgIGlmICh0aGlzLl9fc3RhdGUuc3BhY2UgIT09ICdSR0InKSB7XG4gICAgICAgICAgcmVjYWxjdWxhdGVSR0IodGhpcywgY29tcG9uZW50LCBjb21wb25lbnRIZXhJbmRleCk7XG4gICAgICAgICAgdGhpcy5fX3N0YXRlLnNwYWNlID0gJ1JHQic7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9fc3RhdGVbY29tcG9uZW50XSA9IHY7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH1cblxuICBmdW5jdGlvbiBkZWZpbmVIU1ZDb21wb25lbnQodGFyZ2V0LCBjb21wb25lbnQpIHtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbXBvbmVudCwge1xuXG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGlmICh0aGlzLl9fc3RhdGUuc3BhY2UgPT09ICdIU1YnKVxuICAgICAgICAgIHJldHVybiB0aGlzLl9fc3RhdGVbY29tcG9uZW50XTtcblxuICAgICAgICByZWNhbGN1bGF0ZUhTVih0aGlzKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5fX3N0YXRlW2NvbXBvbmVudF07XG5cbiAgICAgIH0sXG5cbiAgICAgIHNldDogZnVuY3Rpb24odikge1xuXG4gICAgICAgIGlmICh0aGlzLl9fc3RhdGUuc3BhY2UgIT09ICdIU1YnKSB7XG4gICAgICAgICAgcmVjYWxjdWxhdGVIU1YodGhpcyk7XG4gICAgICAgICAgdGhpcy5fX3N0YXRlLnNwYWNlID0gJ0hTVic7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9fc3RhdGVbY29tcG9uZW50XSA9IHY7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH1cblxuICBmdW5jdGlvbiByZWNhbGN1bGF0ZVJHQihjb2xvciwgY29tcG9uZW50LCBjb21wb25lbnRIZXhJbmRleCkge1xuXG4gICAgaWYgKGNvbG9yLl9fc3RhdGUuc3BhY2UgPT09ICdIRVgnKSB7XG5cbiAgICAgIGNvbG9yLl9fc3RhdGVbY29tcG9uZW50XSA9IG1hdGguY29tcG9uZW50X2Zyb21faGV4KGNvbG9yLl9fc3RhdGUuaGV4LCBjb21wb25lbnRIZXhJbmRleCk7XG5cbiAgICB9IGVsc2UgaWYgKGNvbG9yLl9fc3RhdGUuc3BhY2UgPT09ICdIU1YnKSB7XG5cbiAgICAgIGNvbW1vbi5leHRlbmQoY29sb3IuX19zdGF0ZSwgbWF0aC5oc3ZfdG9fcmdiKGNvbG9yLl9fc3RhdGUuaCwgY29sb3IuX19zdGF0ZS5zLCBjb2xvci5fX3N0YXRlLnYpKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRocm93ICdDb3JydXB0ZWQgY29sb3Igc3RhdGUnO1xuXG4gICAgfVxuXG4gIH1cblxuICBmdW5jdGlvbiByZWNhbGN1bGF0ZUhTVihjb2xvcikge1xuXG4gICAgdmFyIHJlc3VsdCA9IG1hdGgucmdiX3RvX2hzdihjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iKTtcblxuICAgIGNvbW1vbi5leHRlbmQoY29sb3IuX19zdGF0ZSxcbiAgICAgICAge1xuICAgICAgICAgIHM6IHJlc3VsdC5zLFxuICAgICAgICAgIHY6IHJlc3VsdC52XG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgaWYgKCFjb21tb24uaXNOYU4ocmVzdWx0LmgpKSB7XG4gICAgICBjb2xvci5fX3N0YXRlLmggPSByZXN1bHQuaDtcbiAgICB9IGVsc2UgaWYgKGNvbW1vbi5pc1VuZGVmaW5lZChjb2xvci5fX3N0YXRlLmgpKSB7XG4gICAgICBjb2xvci5fX3N0YXRlLmggPSAwO1xuICAgIH1cblxuICB9XG5cbiAgcmV0dXJuIENvbG9yO1xuXG59KShkYXQuY29sb3IuaW50ZXJwcmV0ID0gKGZ1bmN0aW9uICh0b1N0cmluZywgY29tbW9uKSB7XG5cbiAgdmFyIHJlc3VsdCwgdG9SZXR1cm47XG5cbiAgdmFyIGludGVycHJldCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdG9SZXR1cm4gPSBmYWxzZTtcblxuICAgIHZhciBvcmlnaW5hbCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gY29tbW9uLnRvQXJyYXkoYXJndW1lbnRzKSA6IGFyZ3VtZW50c1swXTtcblxuICAgIGNvbW1vbi5lYWNoKElOVEVSUFJFVEFUSU9OUywgZnVuY3Rpb24oZmFtaWx5KSB7XG5cbiAgICAgIGlmIChmYW1pbHkubGl0bXVzKG9yaWdpbmFsKSkge1xuXG4gICAgICAgIGNvbW1vbi5lYWNoKGZhbWlseS5jb252ZXJzaW9ucywgZnVuY3Rpb24oY29udmVyc2lvbiwgY29udmVyc2lvbk5hbWUpIHtcblxuICAgICAgICAgIHJlc3VsdCA9IGNvbnZlcnNpb24ucmVhZChvcmlnaW5hbCk7XG5cbiAgICAgICAgICBpZiAodG9SZXR1cm4gPT09IGZhbHNlICYmIHJlc3VsdCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRvUmV0dXJuID0gcmVzdWx0O1xuICAgICAgICAgICAgcmVzdWx0LmNvbnZlcnNpb25OYW1lID0gY29udmVyc2lvbk5hbWU7XG4gICAgICAgICAgICByZXN1bHQuY29udmVyc2lvbiA9IGNvbnZlcnNpb247XG4gICAgICAgICAgICByZXR1cm4gY29tbW9uLkJSRUFLO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBjb21tb24uQlJFQUs7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRvUmV0dXJuO1xuXG4gIH07XG5cbiAgdmFyIElOVEVSUFJFVEFUSU9OUyA9IFtcblxuICAgIC8vIFN0cmluZ3NcbiAgICB7XG5cbiAgICAgIGxpdG11czogY29tbW9uLmlzU3RyaW5nLFxuXG4gICAgICBjb252ZXJzaW9uczoge1xuXG4gICAgICAgIFRIUkVFX0NIQVJfSEVYOiB7XG5cbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuXG4gICAgICAgICAgICB2YXIgdGVzdCA9IG9yaWdpbmFsLm1hdGNoKC9eIyhbQS1GMC05XSkoW0EtRjAtOV0pKFtBLUYwLTldKSQvaSk7XG4gICAgICAgICAgICBpZiAodGVzdCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ0hFWCcsXG4gICAgICAgICAgICAgIGhleDogcGFyc2VJbnQoXG4gICAgICAgICAgICAgICAgICAnMHgnICtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXN0WzFdLnRvU3RyaW5nKCkgKyB0ZXN0WzFdLnRvU3RyaW5nKCkgK1xuICAgICAgICAgICAgICAgICAgICAgIHRlc3RbMl0udG9TdHJpbmcoKSArIHRlc3RbMl0udG9TdHJpbmcoKSArXG4gICAgICAgICAgICAgICAgICAgICAgdGVzdFszXS50b1N0cmluZygpICsgdGVzdFszXS50b1N0cmluZygpKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogdG9TdHJpbmdcblxuICAgICAgICB9LFxuXG4gICAgICAgIFNJWF9DSEFSX0hFWDoge1xuXG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcblxuICAgICAgICAgICAgdmFyIHRlc3QgPSBvcmlnaW5hbC5tYXRjaCgvXiMoW0EtRjAtOV17Nn0pJC9pKTtcbiAgICAgICAgICAgIGlmICh0ZXN0ID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnSEVYJyxcbiAgICAgICAgICAgICAgaGV4OiBwYXJzZUludCgnMHgnICsgdGVzdFsxXS50b1N0cmluZygpKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogdG9TdHJpbmdcblxuICAgICAgICB9LFxuXG4gICAgICAgIENTU19SR0I6IHtcblxuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG5cbiAgICAgICAgICAgIHZhciB0ZXN0ID0gb3JpZ2luYWwubWF0Y2goL15yZ2JcXChcXHMqKC4rKVxccyosXFxzKiguKylcXHMqLFxccyooLispXFxzKlxcKS8pO1xuICAgICAgICAgICAgaWYgKHRlc3QgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICByOiBwYXJzZUZsb2F0KHRlc3RbMV0pLFxuICAgICAgICAgICAgICBnOiBwYXJzZUZsb2F0KHRlc3RbMl0pLFxuICAgICAgICAgICAgICBiOiBwYXJzZUZsb2F0KHRlc3RbM10pXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiB0b1N0cmluZ1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgQ1NTX1JHQkE6IHtcblxuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG5cbiAgICAgICAgICAgIHZhciB0ZXN0ID0gb3JpZ2luYWwubWF0Y2goL15yZ2JhXFwoXFxzKiguKylcXHMqLFxccyooLispXFxzKixcXHMqKC4rKVxccypcXCxcXHMqKC4rKVxccypcXCkvKTtcbiAgICAgICAgICAgIGlmICh0ZXN0ID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgcjogcGFyc2VGbG9hdCh0ZXN0WzFdKSxcbiAgICAgICAgICAgICAgZzogcGFyc2VGbG9hdCh0ZXN0WzJdKSxcbiAgICAgICAgICAgICAgYjogcGFyc2VGbG9hdCh0ZXN0WzNdKSxcbiAgICAgICAgICAgICAgYTogcGFyc2VGbG9hdCh0ZXN0WzRdKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogdG9TdHJpbmdcblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvLyBOdW1iZXJzXG4gICAge1xuXG4gICAgICBsaXRtdXM6IGNvbW1vbi5pc051bWJlcixcblxuICAgICAgY29udmVyc2lvbnM6IHtcblxuICAgICAgICBIRVg6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdIRVgnLFxuICAgICAgICAgICAgICBoZXg6IG9yaWdpbmFsLFxuICAgICAgICAgICAgICBjb252ZXJzaW9uTmFtZTogJ0hFWCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gY29sb3IuaGV4O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgLy8gQXJyYXlzXG4gICAge1xuXG4gICAgICBsaXRtdXM6IGNvbW1vbi5pc0FycmF5LFxuXG4gICAgICBjb252ZXJzaW9uczoge1xuXG4gICAgICAgIFJHQl9BUlJBWToge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAob3JpZ2luYWwubGVuZ3RoICE9IDMpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgcjogb3JpZ2luYWxbMF0sXG4gICAgICAgICAgICAgIGc6IG9yaWdpbmFsWzFdLFxuICAgICAgICAgICAgICBiOiBvcmlnaW5hbFsyXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gW2NvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmJdO1xuICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIFJHQkFfQVJSQVk6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgaWYgKG9yaWdpbmFsLmxlbmd0aCAhPSA0KSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICAgIHI6IG9yaWdpbmFsWzBdLFxuICAgICAgICAgICAgICBnOiBvcmlnaW5hbFsxXSxcbiAgICAgICAgICAgICAgYjogb3JpZ2luYWxbMl0sXG4gICAgICAgICAgICAgIGE6IG9yaWdpbmFsWzNdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBbY29sb3IuciwgY29sb3IuZywgY29sb3IuYiwgY29sb3IuYV07XG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8vIE9iamVjdHNcbiAgICB7XG5cbiAgICAgIGxpdG11czogY29tbW9uLmlzT2JqZWN0LFxuXG4gICAgICBjb252ZXJzaW9uczoge1xuXG4gICAgICAgIFJHQkFfT0JKOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChjb21tb24uaXNOdW1iZXIob3JpZ2luYWwucikgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuZykgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuYikgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuYSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICAgICAgcjogb3JpZ2luYWwucixcbiAgICAgICAgICAgICAgICBnOiBvcmlnaW5hbC5nLFxuICAgICAgICAgICAgICAgIGI6IG9yaWdpbmFsLmIsXG4gICAgICAgICAgICAgICAgYTogb3JpZ2luYWwuYVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgcjogY29sb3IucixcbiAgICAgICAgICAgICAgZzogY29sb3IuZyxcbiAgICAgICAgICAgICAgYjogY29sb3IuYixcbiAgICAgICAgICAgICAgYTogY29sb3IuYVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBSR0JfT0JKOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChjb21tb24uaXNOdW1iZXIob3JpZ2luYWwucikgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuZykgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuYikpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICAgICAgcjogb3JpZ2luYWwucixcbiAgICAgICAgICAgICAgICBnOiBvcmlnaW5hbC5nLFxuICAgICAgICAgICAgICAgIGI6IG9yaWdpbmFsLmJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHI6IGNvbG9yLnIsXG4gICAgICAgICAgICAgIGc6IGNvbG9yLmcsXG4gICAgICAgICAgICAgIGI6IGNvbG9yLmJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgSFNWQV9PQko6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgaWYgKGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5oKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5zKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC52KSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5hKSkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNwYWNlOiAnSFNWJyxcbiAgICAgICAgICAgICAgICBoOiBvcmlnaW5hbC5oLFxuICAgICAgICAgICAgICAgIHM6IG9yaWdpbmFsLnMsXG4gICAgICAgICAgICAgICAgdjogb3JpZ2luYWwudixcbiAgICAgICAgICAgICAgICBhOiBvcmlnaW5hbC5hXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBoOiBjb2xvci5oLFxuICAgICAgICAgICAgICBzOiBjb2xvci5zLFxuICAgICAgICAgICAgICB2OiBjb2xvci52LFxuICAgICAgICAgICAgICBhOiBjb2xvci5hXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIEhTVl9PQko6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgaWYgKGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5oKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5zKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC52KSkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNwYWNlOiAnSFNWJyxcbiAgICAgICAgICAgICAgICBoOiBvcmlnaW5hbC5oLFxuICAgICAgICAgICAgICAgIHM6IG9yaWdpbmFsLnMsXG4gICAgICAgICAgICAgICAgdjogb3JpZ2luYWwudlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgaDogY29sb3IuaCxcbiAgICAgICAgICAgICAgczogY29sb3IucyxcbiAgICAgICAgICAgICAgdjogY29sb3IudlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH1cblxuXG4gIF07XG5cbiAgcmV0dXJuIGludGVycHJldDtcblxuXG59KShkYXQuY29sb3IudG9TdHJpbmcsXG5kYXQudXRpbHMuY29tbW9uKSxcbmRhdC5jb2xvci5tYXRoID0gKGZ1bmN0aW9uICgpIHtcblxuICB2YXIgdG1wQ29tcG9uZW50O1xuXG4gIHJldHVybiB7XG5cbiAgICBoc3ZfdG9fcmdiOiBmdW5jdGlvbihoLCBzLCB2KSB7XG5cbiAgICAgIHZhciBoaSA9IE1hdGguZmxvb3IoaCAvIDYwKSAlIDY7XG5cbiAgICAgIHZhciBmID0gaCAvIDYwIC0gTWF0aC5mbG9vcihoIC8gNjApO1xuICAgICAgdmFyIHAgPSB2ICogKDEuMCAtIHMpO1xuICAgICAgdmFyIHEgPSB2ICogKDEuMCAtIChmICogcykpO1xuICAgICAgdmFyIHQgPSB2ICogKDEuMCAtICgoMS4wIC0gZikgKiBzKSk7XG4gICAgICB2YXIgYyA9IFtcbiAgICAgICAgW3YsIHQsIHBdLFxuICAgICAgICBbcSwgdiwgcF0sXG4gICAgICAgIFtwLCB2LCB0XSxcbiAgICAgICAgW3AsIHEsIHZdLFxuICAgICAgICBbdCwgcCwgdl0sXG4gICAgICAgIFt2LCBwLCBxXVxuICAgICAgXVtoaV07XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHI6IGNbMF0gKiAyNTUsXG4gICAgICAgIGc6IGNbMV0gKiAyNTUsXG4gICAgICAgIGI6IGNbMl0gKiAyNTVcbiAgICAgIH07XG5cbiAgICB9LFxuXG4gICAgcmdiX3RvX2hzdjogZnVuY3Rpb24ociwgZywgYikge1xuXG4gICAgICB2YXIgbWluID0gTWF0aC5taW4ociwgZywgYiksXG4gICAgICAgICAgbWF4ID0gTWF0aC5tYXgociwgZywgYiksXG4gICAgICAgICAgZGVsdGEgPSBtYXggLSBtaW4sXG4gICAgICAgICAgaCwgcztcblxuICAgICAgaWYgKG1heCAhPSAwKSB7XG4gICAgICAgIHMgPSBkZWx0YSAvIG1heDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaDogTmFOLFxuICAgICAgICAgIHM6IDAsXG4gICAgICAgICAgdjogMFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBpZiAociA9PSBtYXgpIHtcbiAgICAgICAgaCA9IChnIC0gYikgLyBkZWx0YTtcbiAgICAgIH0gZWxzZSBpZiAoZyA9PSBtYXgpIHtcbiAgICAgICAgaCA9IDIgKyAoYiAtIHIpIC8gZGVsdGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoID0gNCArIChyIC0gZykgLyBkZWx0YTtcbiAgICAgIH1cbiAgICAgIGggLz0gNjtcbiAgICAgIGlmIChoIDwgMCkge1xuICAgICAgICBoICs9IDE7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGg6IGggKiAzNjAsXG4gICAgICAgIHM6IHMsXG4gICAgICAgIHY6IG1heCAvIDI1NVxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgcmdiX3RvX2hleDogZnVuY3Rpb24ociwgZywgYikge1xuICAgICAgdmFyIGhleCA9IHRoaXMuaGV4X3dpdGhfY29tcG9uZW50KDAsIDIsIHIpO1xuICAgICAgaGV4ID0gdGhpcy5oZXhfd2l0aF9jb21wb25lbnQoaGV4LCAxLCBnKTtcbiAgICAgIGhleCA9IHRoaXMuaGV4X3dpdGhfY29tcG9uZW50KGhleCwgMCwgYik7XG4gICAgICByZXR1cm4gaGV4O1xuICAgIH0sXG5cbiAgICBjb21wb25lbnRfZnJvbV9oZXg6IGZ1bmN0aW9uKGhleCwgY29tcG9uZW50SW5kZXgpIHtcbiAgICAgIHJldHVybiAoaGV4ID4+IChjb21wb25lbnRJbmRleCAqIDgpKSAmIDB4RkY7XG4gICAgfSxcblxuICAgIGhleF93aXRoX2NvbXBvbmVudDogZnVuY3Rpb24oaGV4LCBjb21wb25lbnRJbmRleCwgdmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZSA8PCAodG1wQ29tcG9uZW50ID0gY29tcG9uZW50SW5kZXggKiA4KSB8IChoZXggJiB+ICgweEZGIDw8IHRtcENvbXBvbmVudCkpO1xuICAgIH1cblxuICB9XG5cbn0pKCksXG5kYXQuY29sb3IudG9TdHJpbmcsXG5kYXQudXRpbHMuY29tbW9uKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vdmVuZG9yL2RhdC5ndWknKVxubW9kdWxlLmV4cG9ydHMuY29sb3IgPSByZXF1aXJlKCcuL3ZlbmRvci9kYXQuY29sb3InKSIsImltcG9ydCB7XG4gIEZyb250U2lkZSxcbiAgQmFja1NpZGUsXG4gIERvdWJsZVNpZGUsXG5cbiAgU21vb3RoU2hhZGluZyxcbiAgRmxhdFNoYWRpbmcsXG5cbiAgTm9CbGVuZGluZyxcbiAgTm9ybWFsQmxlbmRpbmcsXG4gIEFkZGl0aXZlQmxlbmRpbmcsXG4gIFN1YnRyYWN0aXZlQmxlbmRpbmcsXG4gIE11bHRpcGx5QmxlbmRpbmcsXG4gIEN1c3RvbUJsZW5kaW5nLFxuXG4gIE5ldmVyRGVwdGgsXG4gIEFsd2F5c0RlcHRoLFxuICBMZXNzRGVwdGgsXG4gIExlc3NFcXVhbERlcHRoLFxuICBHcmVhdGVyRXF1YWxEZXB0aCxcbiAgR3JlYXRlckRlcHRoLFxuICBOb3RFcXVhbERlcHRoXG59IGZyb20gJ3RocmVlJztcblxuY29uc3QgYWRkaXRpb25hbCA9IHtcbiAgd2lyZWZyYW1lOiB7XG4gICAgd2lyZWZyYW1lOiAnYm9vbGVhbicsXG4gICAgd2lyZWZyYW1lTGluZWNhcDogWydidXR0JywgJ3JvdW5kJywgJ3NxdWFyZSddLFxuICAgIHdpcmVmcmFtZUxpbmVqb2luOiBbJ3JvdW5kJywgJ2JldmVsJywgJ21pdGVyJ10sXG4gICAgd2lyZWZyYW1lTGluZXdpZHRoOiAnbnVtYmVyJ1xuICB9LFxuXG4gIHJlZnI6IHtcbiAgICByZWZsZWN0aXZpdHk6ICdudW1iZXInLFxuICAgIHJlZnJhY3Rpb25SYXRpbzogJ251bWJlcidcbiAgfSxcblxuICBsaWdodDoge1xuICAgIGxpZ2h0TWFwOiAndGV4dHVyZScsXG4gICAgbGlnaHRNYXBJbnRlbnNpdHk6ICdudW1iZXInXG4gIH0sXG5cbiAgZGlzcGxhY2VtZW50OiB7XG4gICAgZGlzcGxhY2VtZW50U2NhbGU6ICdudW1iZXInLFxuICAgIGRpc3BsYWNlbWVudEJpYXM6ICdudW1iZXInLFxuICAgIGRpc3BsYWNlbWVudE1hcDogJ3RleHR1cmUnXG4gIH0sXG5cbiAgZW1pc3NpdmU6IHtcbiAgICBlbWlzc2l2ZTogJ2NvbG9yJyxcbiAgICBlbWlzc2l2ZU1hcDogJ3RleHR1cmUnLFxuICAgIGVtaXNzaXZlSW50ZW5zaXR5OiAnbnVtYmVyJ1xuICB9XG59XG5cbmNvbnN0IGFkZCA9IChvcmlnaW4sIC4uLmFkZHYpID0+IHtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24ob3JpZ2luLCAuLi5hZGR2Lm1hcCh2YWx1ZSA9PiBhZGRpdGlvbmFsW3ZhbHVlXSkpXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYW55OiBhZGQoe1xuICAgIHNpZGU6IHtGcm9udFNpZGUsIEJhY2tTaWRlLCBEb3VibGVTaWRlfSxcbiAgICBzaGFkaW5nOiB7U21vb3RoU2hhZGluZywgRmxhdFNoYWRpbmd9LFxuICAgIGJsZW5kaW5nOiB7XG4gICAgICBOb0JsZW5kaW5nLCBOb3JtYWxCbGVuZGluZywgQWRkaXRpdmVCbGVuZGluZywgU3VidHJhY3RpdmVCbGVuZGluZywgTXVsdGlwbHlCbGVuZGluZywgQ3VzdG9tQmxlbmRpbmdcbiAgICB9LFxuICAgIGRlcHRoRnVuYzoge1xuICAgICAgTmV2ZXJEZXB0aCwgQWx3YXlzRGVwdGgsIExlc3NEZXB0aCwgTGVzc0VxdWFsRGVwdGgsIEdyZWF0ZXJFcXVhbERlcHRoLCBHcmVhdGVyRGVwdGgsIE5vdEVxdWFsRGVwdGhcbiAgICB9XG4gIH0sICd3aXJlZnJhbWUnKSxcblxuICBNZXNoQmFzaWNNYXRlcmlhbDoge1xuICAgIGNvbG9yOiAnY29sb3InLFxuICAgIGxpZ2h0czogJ2Jvb2xlYW4nLFxuICAgIGxpbmV3aWR0aDogJ251bWJlcicsXG4gICAgbGluZWNhcDogWydidXR0JywgJ3JvdW5kJywgJ3NxdWFyZSddLFxuICAgIGxpbmVqb2luOiBbJ3JvdW5kJywgJ2JldmVsJywgJ21pdGVyJ11cbiAgfSxcblxuICBNZXNoTGFtYmVydE1hdGVyaWFsOiBhZGQoe1xuICAgIGNvbG9yOiAnY29sb3InXG4gIH0sICdlbWlzc2l2ZScsICdyZWZyJywgJ2xpZ2h0JyksXG5cbiAgTWVzaFBob25nTWF0ZXJpYWw6IGFkZCh7XG4gICAgY29sb3I6ICdjb2xvcidcbiAgfSwgJ2Rpc3BsYWNlbWVudCcsICdlbWlzc2l2ZScpLFxuXG4gIE1lc2hEZXB0aE1hdGVyaWFsOiB7XG5cbiAgfVxuICAvLyBUbyBiZSBjb250aW51ZWQuLi5cbn1cbiIsImV4cG9ydCBjbGFzcyBEYXRBUEkge1xuICBmb2xkT2JqZWN0KG9iamVjdCwgb3JpZ2luLCBpbnN0YW5jZSA9IHRoaXMuZm9sZCwgb25DaGFuZ2UgPSAoKSA9PiB7fSkge1xuICAgIGZvciAobGV0IGtleSBpbiBvcmlnaW4pIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gb2JqZWN0W2tleV07XG4gICAgICBpZiAoIXZhbHVlKSBjb250aW51ZTtcblxuICAgICAgaWYgKHZhbHVlLmlzQ29sb3IpIHtcbiAgICAgICAgdGhpcy5hZGRDb2xvcihvYmplY3QsIGtleSwgaW5zdGFuY2UpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb3JpZ2luW2tleV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChvYmplY3Rba2V5XSA9PT0gb2JqZWN0KSBjb250aW51ZTtcbiAgICAgICAgdGhpcy5mb2xkT2JqZWN0KG9iamVjdFtrZXldLCBvcmlnaW5ba2V5XSwgaW5zdGFuY2UuYWRkRm9sZGVyKGtleSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcmFuZ2UgPSAnMScgKyAnMCcucmVwZWF0KHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoKTtcblxuICAgICAgICBpbnN0YW5jZS5hZGQob2JqZWN0LCBrZXkpXG4gICAgICAgICAgLm1pbigwKVxuICAgICAgICAgIC5zdGVwKHJhbmdlID4gMTAgPyAxIDogMC4xKVxuICAgICAgICAgIC5vbkNoYW5nZShvbkNoYW5nZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ3VpVHJhbnNmb3JtcyhuYXRpdmUsIGluc3RhbmNlID0gdGhpcy5mb2xkKSB7XG4gICAgaWYgKCF0aGlzLnBhcmFtcy50cmFuc2Zvcm1zKSByZXR1cm47XG5cbiAgICBjb25zdCBjb250cm9sbGVyID0gaW5zdGFuY2UuYWRkRm9sZGVyKCd0cmFuc2Zvcm1zJyk7XG5cbiAgICAvLyBwb3NpdGlvblxuICAgIGNvbnN0IHBvc2l0aW9uID0gY29udHJvbGxlci5hZGRGb2xkZXIoJ3Bvc2l0aW9uJyk7XG4gICAgcG9zaXRpb24uYWRkKG5hdGl2ZS5wb3NpdGlvbiwgJ3gnKTtcbiAgICBwb3NpdGlvbi5hZGQobmF0aXZlLnBvc2l0aW9uLCAneScpO1xuICAgIHBvc2l0aW9uLmFkZChuYXRpdmUucG9zaXRpb24sICd6Jyk7XG5cbiAgICAvLyByb3RhdGlvblxuICAgIGNvbnN0IHJvdGF0aW9uID0gY29udHJvbGxlci5hZGRGb2xkZXIoJ3JvdGF0aW9uJyk7XG4gICAgcm90YXRpb24uYWRkKG5hdGl2ZS5yb3RhdGlvbiwgJ3gnKS5zdGVwKDAuMSk7XG4gICAgcm90YXRpb24uYWRkKG5hdGl2ZS5yb3RhdGlvbiwgJ3knKS5zdGVwKDAuMSk7XG4gICAgcm90YXRpb24uYWRkKG5hdGl2ZS5yb3RhdGlvbiwgJ3onKS5zdGVwKDAuMSk7XG5cbiAgICAvLyBzY2FsZVxuICAgIGlmICghbmF0aXZlLnNjYWxlKSByZXR1cm47XG4gICAgY29uc3Qgc2NhbGUgPSBjb250cm9sbGVyLmFkZEZvbGRlcignc2NhbGUnKTtcbiAgICBzY2FsZS5hZGQobmF0aXZlLnNjYWxlLCAneCcpLnN0ZXAoMC4xKTtcbiAgICBzY2FsZS5hZGQobmF0aXZlLnNjYWxlLCAneScpLnN0ZXAoMC4xKTtcbiAgICBzY2FsZS5hZGQobmF0aXZlLnNjYWxlLCAneicpLnN0ZXAoMC4xKTtcbiAgfVxufVxuIiwiaW1wb3J0IG1hdGVyaWFscyBmcm9tICcuL21hdGVyaWFscyc7XG5pbXBvcnQge0RhdEFQSX0gZnJvbSAnLi9EYXRBUEknO1xuXG5leHBvcnQgY2xhc3MgRGF0TWVzaE1vZHVsZSBleHRlbmRzIERhdEFQSSB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9LCBndWkpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIG5hbWU6ICdVbmtub3duIG1lc2gnLFxuICAgICAgZ2VvbWV0cnk6IHRydWUsXG4gICAgICBtYXRlcmlhbDogdHJ1ZSxcbiAgICAgIHRyYW5zZm9ybXM6IHRydWUsXG4gICAgICBndWk6IGZhbHNlXG4gICAgfSwgcGFyYW1zKTtcblxuICAgIHRoaXMuZ3VpID0gZ3VpO1xuICAgIHRoaXMuZm9sZCA9IHRoaXMuZ3VpLmFkZEZvbGRlcih0aGlzLnBhcmFtcy5uYW1lKTtcbiAgICB0aGlzLmN1c3RvbU1hdGVyaWFscyA9IGZhbHNlO1xuICB9XG5cbiAgYWRkQ29sb3Iob2JqZWN0LCBwcm9wZXJ0eSwgaW5zdGFuY2UgPSB0aGlzLmZvbGQpIHtcbiAgICBjb25zdCBjb2xvciA9IG9iamVjdFtwcm9wZXJ0eV07XG5cbiAgICBpbnN0YW5jZS5hZGRDb2xvcih7W3Byb3BlcnR5XTogY29sb3IuZ2V0SGV4KCl9LCBwcm9wZXJ0eSkub25DaGFuZ2UodmFsdWUgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHZhbHVlLnJlcGxhY2UoJyMnLCAnMHgnKTtcbiAgICAgIGNvbG9yLnNldEhleCh2YWx1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBndWlNYXRlcmlhbChjb21wb25lbnQsIG1hdGVyaWFsLCBpbnN0YW5jZSA9IHRoaXMuZm9sZCkge1xuICAgIGNvbnN0IHBhcmFtc1Byb2Nlc3NvciA9IHBhcmFtcyA9PiB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBwYXJhbXMpIHtcbiAgICAgICAgaWYgKHBhcmFtc1trZXldICYmIG1hdGVyaWFsW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHN3aXRjaCAocGFyYW1zW2tleV0pIHtcbiAgICAgICAgICAgIGNhc2UgJ2NvbG9yJzpcbiAgICAgICAgICAgICAgdGhpcy5hZGRDb2xvcihtYXRlcmlhbCwga2V5LCBpbnN0YW5jZSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgICAgIGluc3RhbmNlLmFkZChtYXRlcmlhbCwga2V5KTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgICBpbnN0YW5jZS5hZGQobWF0ZXJpYWwsIGtleSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndGV4dHVyZSc6XG4gICAgICAgICAgICAgIC8vIFRPRE9cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBpbnN0YW5jZS5hZGQobWF0ZXJpYWwsIGtleSwgcGFyYW1zW2tleV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBwYXJhbXNQcm9jZXNzb3IobWF0ZXJpYWxzW21hdGVyaWFsLnR5cGVdKTtcbiAgICBwYXJhbXNQcm9jZXNzb3IobWF0ZXJpYWxzLmFueSk7XG4gIH1cblxuICBndWlHZW9tZXRyeShjb21wb25lbnQsIGluc3RhbmNlID0gdGhpcy5mb2xkKSB7XG4gICAgaWYgKCFjb21wb25lbnQuZ18pIHRocm93IG5ldyBFcnJvcignRGF0R1VJTW9kdWxlIHJlcXVpcmVzIFdIUy5EeW5hbWljR2VvbWV0cnlNb2R1bGUgZm9yIGdlb21ldHJ5IHVwZGF0ZXMuJyk7XG5cbiAgICBjb25zdCBnZW9tUGFyYW1zID0gY29tcG9uZW50LnBhcmFtcy5nZW9tZXRyeTtcbiAgICBjb25zdCBnZW9tRGF0YSA9IHRoaXMucGFyYW1zLmdlb21ldHJ5O1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gZ2VvbVBhcmFtcykge1xuICAgICAgY29uc3QgZGF0YSA9IGdlb21EYXRhW2tleV07XG5cbiAgICAgIGNvbnN0IHJhbmdlID0gZGF0YSAmJiBkYXRhLnJhbmdlID8gZGF0YS5yYW5nZSA6IFswLCAxMDBdO1xuXG4gICAgICBpbnN0YW5jZS5hZGQoZ2VvbVBhcmFtcywga2V5KVxuICAgICAgICAubWluKHJhbmdlWzBdKVxuICAgICAgICAubWF4KHJhbmdlWzFdKVxuICAgICAgICAuc3RlcChrZXkuaW5kZXhPZignU2VnbWVudHMnKSA+IDAgPyAxIDogMC4xKVxuICAgICAgICAub25DaGFuZ2UodmFsdWUgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudC5nXyh7W2tleV06IHZhbHVlfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG1hdGVyaWFscyhtYXRlcmlhbHMgPSB7fSkge1xuICAgIHRoaXMuY3VzdG9tTWF0ZXJpYWxzID0gbWF0ZXJpYWxzO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBicmlkZ2UgPSB7XG4gICAgbWF0ZXJpYWwobWF0ZXJpYWwsIHNlbGYpIHtcbiAgICAgIGlmICghc2VsZi5wYXJhbXMubWF0ZXJpYWwpIHJldHVybiBtYXRlcmlhbDtcblxuICAgICAgY29uc3QgZm9sZGVyID0gc2VsZi5mb2xkLmFkZEZvbGRlcignbWF0ZXJpYWwnKTtcbiAgICAgIHNlbGYuZ3VpTWF0ZXJpYWwodGhpcywgbWF0ZXJpYWwsIGZvbGRlcik7XG5cbiAgICAgIHJldHVybiBtYXRlcmlhbDtcbiAgICB9LFxuXG4gICAgZ2VvbWV0cnkoZ2VvbWV0cnksIHNlbGYpIHtcbiAgICAgIGlmICghc2VsZi5wYXJhbXMuZ2VvbWV0cnkpIHJldHVybiBnZW9tZXRyeTtcbiAgICAgIGlmICghdGhpcy5nXykgdGhyb3cgbmV3IEVycm9yKCdXSFMuRHluYW1pY0dlb21ldHJ5TW9kdWxlIHNob3VsZCBiZSB1c2VkIGluIGEgY29tcG9uZW50IChiZWZvcmUgZ3VpKScpO1xuXG4gICAgICBjb25zdCBmb2xkZXIgPSBzZWxmLmZvbGQuYWRkRm9sZGVyKCdnZW9tZXRyeScpO1xuICAgICAgc2VsZi5ndWlHZW9tZXRyeSh0aGlzLCBmb2xkZXIpO1xuXG4gICAgICByZXR1cm4gZ2VvbWV0cnk7XG4gICAgfSxcblxuICAgIG1lc2gobWVzaCwgc2VsZikge1xuICAgICAgaWYgKCFzZWxmLmN1c3RvbU1hdGVyaWFscykgcmV0dXJuIG1lc2g7XG5cbiAgICAgIHNlbGYuY3VzdG9tTWF0ZXJpYWxzLmN1cnJlbnQgPSBtZXNoLm1hdGVyaWFsO1xuXG4gICAgICAvLyBjb25zdCBtYXRBbGlhcyA9IHttYXRlcmlhbDogJ2N1cnJlbnQnfTtcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhzZWxmLmN1c3RvbU1hdGVyaWFscyk7XG4gICAgICBjb25zdCBmb2xkZXIgPSBzZWxmLmZvbGQ7XG5cbiAgICAgIGZvbGRlci5hZGQoe3R5cGU6ICdjdXJyZW50J30sICd0eXBlJywga2V5cykub25DaGFuZ2UodiA9PiB7XG4gICAgICAgIG1lc2gubWF0ZXJpYWwgPSBzZWxmLmN1c3RvbU1hdGVyaWFsc1t2XTtcbiAgICAgICAgZm9sZGVyLnJlbW92ZUZvbGRlcignbWF0ZXJpYWwnKTtcbiAgICAgICAgc2VsZi5ndWlNYXRlcmlhbCh0aGlzLCBtZXNoLm1hdGVyaWFsLCBmb2xkZXIuYWRkRm9sZGVyKCdtYXRlcmlhbCcpKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gbWVzaDtcbiAgICB9LFxuXG4gICAgb25XcmFwKGEsIHNlbGYpIHtcbiAgICAgIHNlbGYuZ3VpVHJhbnNmb3Jtcyh0aGlzLm5hdGl2ZSwgc2VsZi5mb2xkKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7RGF0QVBJfSBmcm9tICcuL0RhdEFQSSc7XG5cbmV4cG9ydCBjbGFzcyBEYXRMaWdodE1vZHVsZSBleHRlbmRzIERhdEFQSSB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcyA9IHt9LCBndWkpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIG5hbWU6ICdVbmtub3duIGxpZ2h0JyxcbiAgICAgIGxpZ2h0OiB0cnVlLFxuICAgICAgc2hhZG93OiB0cnVlLFxuICAgICAgdHJhbnNmb3JtczogdHJ1ZSxcbiAgICAgIGd1aTogZmFsc2VcbiAgICB9LCBwYXJhbXMpO1xuXG4gICAgdGhpcy5ndWkgPSBndWk7XG4gICAgdGhpcy5mb2xkID0gdGhpcy5ndWkuYWRkRm9sZGVyKHRoaXMucGFyYW1zLm5hbWUpO1xuICB9XG5cbiAgYWRkQ29sb3Iob2JqZWN0LCBwcm9wZXJ0eSwgaW5zdGFuY2UgPSB0aGlzLmZvbGQpIHtcbiAgICBjb25zdCBjb2xvciA9IG9iamVjdFtwcm9wZXJ0eV07XG5cbiAgICBpbnN0YW5jZS5hZGRDb2xvcih7W3Byb3BlcnR5XTogY29sb3IuZ2V0SGV4KCl9LCBwcm9wZXJ0eSkub25DaGFuZ2UodmFsdWUgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHZhbHVlLnJlcGxhY2UoJyMnLCAnMHgnKTtcbiAgICAgIGNvbG9yLnNldEhleCh2YWx1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBicmlkZ2UgPSB7XG4gICAgbGlnaHQobGlnaHQsIHNlbGYpIHtcbiAgICAgIGlmICghc2VsZi5wYXJhbXMubGlnaHQpIHJldHVybiBsaWdodDtcblxuICAgICAgc2VsZi5mb2xkT2JqZWN0KGxpZ2h0LCB0aGlzLnBhcmFtcywgc2VsZi5mb2xkLmFkZEZvbGRlcignbGlnaHQnKSk7XG4gICAgICBzZWxmLmZvbGRPYmplY3QobGlnaHQuc2hhZG93LCB0aGlzLnBhcmFtcy5zaGFkb3csIHNlbGYuZm9sZC5hZGRGb2xkZXIoJ3NoYWRvdycpKTtcblxuICAgICAgcmV0dXJuIGxpZ2h0O1xuICAgIH0sXG5cbiAgICBvbldyYXAoYSwgc2VsZikge1xuICAgICAgc2VsZi5ndWlUcmFuc2Zvcm1zKHRoaXMubmF0aXZlLCBzZWxmLmZvbGQpO1xuICAgIH1cbiAgfVxufTtcbiIsImltcG9ydCB7RGF0QVBJfSBmcm9tICcuL0RhdEFQSSc7XG5cbmV4cG9ydCBjbGFzcyBEYXRDYW1lcmFNb2R1bGUgZXh0ZW5kcyBEYXRBUEkge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSwgZ3VpKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBuYW1lOiAnVW5rbm93biBjYW1lcmEnLFxuICAgICAgdHJhbnNmb3JtczogdHJ1ZSxcbiAgICAgIGNhbWVyYTogdHJ1ZVxuICAgIH0sIHBhcmFtcyk7XG5cbiAgICB0aGlzLmd1aSA9IGd1aTtcbiAgICB0aGlzLmZvbGQgPSB0aGlzLmd1aS5hZGRGb2xkZXIodGhpcy5wYXJhbXMubmFtZSk7XG4gIH1cblxuICBicmlkZ2UgPSB7XG4gICAgY2FtZXJhKGNhbWVyYSwgc2VsZikge1xuICAgICAgaWYgKCFzZWxmLnBhcmFtcy5jYW1lcmEpIHJldHVybiBjYW1lcmE7XG4gICAgICBzZWxmLmZvbGRPYmplY3QoY2FtZXJhLCB0aGlzLnBhcmFtcywgc2VsZi5mb2xkLCAoKSA9PiB7XG4gICAgICAgIGNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGNhbWVyYTtcbiAgICB9LFxuXG4gICAgb25XcmFwKGEsIHNlbGYpIHtcbiAgICAgIHNlbGYuZ3VpVHJhbnNmb3Jtcyh0aGlzLm5hdGl2ZSwgc2VsZi5mb2xkKTtcbiAgICB9XG4gIH1cbn07XG4iLCJleHBvcnQgY2xhc3MgRGF0Q3VzdG9tTW9kdWxlIHtcbiAgY29uc3RydWN0b3IocHJvcHMgPSBbXSwgZ3VpKSB7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgIHRoaXMuZ3VpID0gZ3VpO1xuXG4gICAgcHJvcHMuZm9yRWFjaCh0aGlzLmFkZC5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGFkZCh7XG4gICAgbmFtZSxcbiAgICB2YWx1ZSxcbiAgICByYW5nZSA9IFtmYWxzZSwgZmFsc2VdLFxuICAgIHN0ZXAgPSAxLFxuICAgIG9uQ2hhbmdlLFxuICAgIG9uRmluaXNoQ2hhbmdlLFxuICAgIGxpc3RlbiA9IGZhbHNlXG4gIH0pIHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gdGhpcy5ndWkuYWRkKHtbbmFtZV06IHZhbHVlfSwgbmFtZSk7XG5cbiAgICBpZiAocmFuZ2VbMF0gIT09IGZhbHNlKSBjb250cm9sbGVyLm1pbihyYW5nZVswXSlcbiAgICBpZiAocmFuZ2VbMV0gIT09IGZhbHNlKSBjb250cm9sbGVyLm1heChyYW5nZVsxXSlcblxuICAgIGNvbnRyb2xsZXIuc3RlcChzdGVwKTtcblxuICAgIGlmIChvbkNoYW5nZSkgY29udHJvbGxlci5vbkNoYW5nZShvbkNoYW5nZSk7XG4gICAgaWYgKG9uRmluaXNoQ2hhbmdlKSBjb250cm9sbGVyLm9uRmluaXNoQ2hhbmdlKG9uRmluaXNoQ2hhbmdlKTtcbiAgICBpZiAobGlzdGVuKSBjb250cm9sbGVyLmxpc3RlbigpO1xuXG4gICAgcmV0dXJuIGNvbnRyb2xsZXI7XG4gIH1cbn07XG4iLCJpbXBvcnQgZGF0IGZyb20gJ2RhdC1ndWknO1xuXG5pbXBvcnQge0RhdE1lc2hNb2R1bGV9IGZyb20gJy4vZGF0Z3VpL0RhdE1lc2hNb2R1bGUnO1xuaW1wb3J0IHtEYXRMaWdodE1vZHVsZX0gZnJvbSAnLi9kYXRndWkvRGF0TGlnaHRNb2R1bGUnO1xuaW1wb3J0IHtEYXRDYW1lcmFNb2R1bGV9IGZyb20gJy4vZGF0Z3VpL0RhdENhbWVyYU1vZHVsZSc7XG5pbXBvcnQge0RhdEN1c3RvbU1vZHVsZX0gZnJvbSAnLi9kYXRndWkvRGF0Q3VzdG9tTW9kdWxlJztcblxuLy8gUG9seWZpbGxcbmRhdC5HVUkucHJvdG90eXBlLnJlbW92ZUZvbGRlciA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgdmFyIGZvbGRlciA9IHRoaXMuX19mb2xkZXJzW25hbWVdO1xuICBpZiAoIWZvbGRlcikge1xuICAgIHJldHVybjtcbiAgfVxuICBmb2xkZXIuY2xvc2UoKTtcbiAgdGhpcy5fX3VsLnJlbW92ZUNoaWxkKGZvbGRlci5kb21FbGVtZW50LnBhcmVudE5vZGUpO1xuICBkZWxldGUgdGhpcy5fX2ZvbGRlcnNbbmFtZV07XG4gIHRoaXMub25SZXNpemUoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0R1VJTW9kdWxlIHtcbiAgc3RhdGljIG5ldyhwYXJhbXMpIHtcbiAgICByZXR1cm4gbmV3IERhdEdVSU1vZHVsZShuZXcgZGF0LkdVSShwYXJhbXMpKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGd1aSA9IG5ldyBkYXQuR1VJKHthdXRvUGxhY2U6IGZhbHNlfSkpIHtcbiAgICB0aGlzLmd1aSA9IGd1aTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuZGVmaW5lKCdndWkvZGF0Lmd1aScpO1xuICAgIGNvbnN0IGRvbSA9IHRoaXMuZ3VpLmRvbUVsZW1lbnQ7XG4gICAgY29uc3Qgc3R5bGUgPSBkb20uc3R5bGU7XG5cbiAgICBzdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgc3R5bGUudG9wID0gMDtcbiAgICBzdHlsZS5yaWdodCA9ICcyMHB4JztcblxuICAgIG1hbmFnZXIuZ2V0KCdlbGVtZW50JykuYXBwZW5kQ2hpbGQodGhpcy5ndWkuZG9tRWxlbWVudCk7XG4gIH1cblxuICBzZXQoZ3VpKSB7XG4gICAgdGhpcy5ndWkgPSBndWk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBmb2xkZXIobmFtZSA9ICdmb2xkZXInKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRHVUlNb2R1bGUodGhpcy5ndWkuYWRkRm9sZGVyKG5hbWUpKTtcbiAgfVxuXG4gIE1lc2gocGFyYW1zID0ge30sIGd1aSA9IHRoaXMuZ3VpKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRNZXNoTW9kdWxlKHBhcmFtcywgZ3VpKTtcbiAgfVxuXG4gIExpZ2h0KHBhcmFtcyA9IHt9LCBndWkgPSB0aGlzLmd1aSkge1xuICAgIHJldHVybiBuZXcgRGF0TGlnaHRNb2R1bGUocGFyYW1zLCBndWkpO1xuICB9XG5cbiAgQ2FtZXJhKHBhcmFtcyA9IHt9LCBndWkgPSB0aGlzLmd1aSkge1xuICAgIHJldHVybiBuZXcgRGF0Q2FtZXJhTW9kdWxlKHBhcmFtcywgZ3VpKTtcbiAgfVxuXG4gIEN1c3RvbShwYXJhbXMgPSB7fSwgZ3VpID0gdGhpcy5ndWkpIHtcbiAgICByZXR1cm4gbmV3IERhdEN1c3RvbU1vZHVsZShwYXJhbXMsIGd1aSk7XG4gIH1cbn1cblxuRGF0R1VJTW9kdWxlLmRhdCA9IGRhdDtcbiJdLCJuYW1lcyI6WyJyZXF1aXJlJCQwIiwicmVxdWlyZSQkMSIsImFkZGl0aW9uYWwiLCJhZGQiLCJvcmlnaW4iLCJhZGR2IiwiT2JqZWN0IiwiYXNzaWduIiwibWFwIiwidmFsdWUiLCJGcm9udFNpZGUiLCJCYWNrU2lkZSIsIkRvdWJsZVNpZGUiLCJTbW9vdGhTaGFkaW5nIiwiRmxhdFNoYWRpbmciLCJOb3JtYWxCbGVuZGluZyIsIkFkZGl0aXZlQmxlbmRpbmciLCJTdWJ0cmFjdGl2ZUJsZW5kaW5nIiwiTXVsdGlwbHlCbGVuZGluZyIsIkN1c3RvbUJsZW5kaW5nIiwiQWx3YXlzRGVwdGgiLCJMZXNzRGVwdGgiLCJMZXNzRXF1YWxEZXB0aCIsIkdyZWF0ZXJFcXVhbERlcHRoIiwiR3JlYXRlckRlcHRoIiwiTm90RXF1YWxEZXB0aCIsIkRhdEFQSSIsIm9iamVjdCIsImluc3RhbmNlIiwiZm9sZCIsIm9uQ2hhbmdlIiwia2V5IiwiaXNDb2xvciIsImFkZENvbG9yIiwiYmFiZWxIZWxwZXJzLnR5cGVvZiIsImZvbGRPYmplY3QiLCJhZGRGb2xkZXIiLCJyYW5nZSIsInJlcGVhdCIsInRvU3RyaW5nIiwibGVuZ3RoIiwibWluIiwic3RlcCIsIm5hdGl2ZSIsInBhcmFtcyIsInRyYW5zZm9ybXMiLCJjb250cm9sbGVyIiwicG9zaXRpb24iLCJyb3RhdGlvbiIsInNjYWxlIiwiRGF0TWVzaE1vZHVsZSIsImd1aSIsImJyaWRnZSIsIm1hdGVyaWFsIiwic2VsZiIsImZvbGRlciIsImd1aU1hdGVyaWFsIiwiZ2VvbWV0cnkiLCJnXyIsIkVycm9yIiwiZ3VpR2VvbWV0cnkiLCJtZXNoIiwiY3VzdG9tTWF0ZXJpYWxzIiwiY3VycmVudCIsImtleXMiLCJ0eXBlIiwidiIsInJlbW92ZUZvbGRlciIsImEiLCJndWlUcmFuc2Zvcm1zIiwibmFtZSIsInByb3BlcnR5IiwiY29sb3IiLCJnZXRIZXgiLCJyZXBsYWNlIiwic2V0SGV4IiwiY29tcG9uZW50IiwicGFyYW1zUHJvY2Vzc29yIiwidW5kZWZpbmVkIiwibWF0ZXJpYWxzIiwiYW55IiwiZ2VvbVBhcmFtcyIsImdlb21EYXRhIiwiZGF0YSIsIm1heCIsImluZGV4T2YiLCJEYXRMaWdodE1vZHVsZSIsImxpZ2h0Iiwic2hhZG93IiwiRGF0Q2FtZXJhTW9kdWxlIiwiY2FtZXJhIiwidXBkYXRlUHJvamVjdGlvbk1hdHJpeCIsIkRhdEN1c3RvbU1vZHVsZSIsInByb3BzIiwiZm9yRWFjaCIsImJpbmQiLCJvbkZpbmlzaENoYW5nZSIsImxpc3RlbiIsImRhdCIsIkdVSSIsInByb3RvdHlwZSIsIl9fZm9sZGVycyIsImNsb3NlIiwiX191bCIsInJlbW92ZUNoaWxkIiwiZG9tRWxlbWVudCIsInBhcmVudE5vZGUiLCJvblJlc2l6ZSIsIkRhdEdVSU1vZHVsZSIsImF1dG9QbGFjZSIsIm1hbmFnZXIiLCJkZWZpbmUiLCJkb20iLCJzdHlsZSIsInRvcCIsInJpZ2h0IiwiZ2V0IiwiYXBwZW5kQ2hpbGQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBY0EsSUFBSSxHQUFHLEdBQUcsY0FBYyxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUM7OztBQUdyQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDOzs7QUFHeEIsR0FBRyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQzs7O0FBRzVCLEdBQUcsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7OztBQUd4QyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDOzs7QUFHeEIsR0FBRyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQzs7QUFFNUIsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxZQUFZO0VBQzNCLE9BQU87SUFDTCxJQUFJLEVBQUUsVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFO01BQ3hCLEdBQUcsR0FBRyxHQUFHLElBQUksUUFBUSxDQUFDO01BQ3RCLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7TUFDckMsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7TUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxZQUFZLENBQUM7TUFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7TUFDaEIsR0FBRyxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN2RDtJQUNELE1BQU0sRUFBRSxTQUFTLEdBQUcsRUFBRSxHQUFHLEVBQUU7TUFDekIsR0FBRyxHQUFHLEdBQUcsSUFBSSxRQUFRLENBQUM7TUFDdEIsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztNQUMvQyxRQUFRLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztNQUMzQixRQUFRLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztNQUN6QixHQUFHLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQzNEO0dBQ0Y7Q0FDRixHQUFHLENBQUM7OztBQUdMLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsWUFBWTs7RUFFOUIsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7RUFDdkMsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7Ozs7Ozs7O0VBUXRDLE9BQU87O0lBRUwsS0FBSyxFQUFFLEVBQUU7O0lBRVQsTUFBTSxFQUFFLFNBQVMsTUFBTSxFQUFFOztNQUV2QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFLFNBQVMsR0FBRyxFQUFFOztRQUVwRCxLQUFLLElBQUksR0FBRyxJQUFJLEdBQUc7VUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7O09BRTVCLEVBQUUsSUFBSSxDQUFDLENBQUM7O01BRVQsT0FBTyxNQUFNLENBQUM7O0tBRWY7O0lBRUQsUUFBUSxFQUFFLFNBQVMsTUFBTSxFQUFFOztNQUV6QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFLFNBQVMsR0FBRyxFQUFFOztRQUVwRCxLQUFLLElBQUksR0FBRyxJQUFJLEdBQUc7VUFDakIsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMvQixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztPQUU1QixFQUFFLElBQUksQ0FBQyxDQUFDOztNQUVULE9BQU8sTUFBTSxDQUFDOztLQUVmOztJQUVELE9BQU8sRUFBRSxXQUFXO01BQ2xCLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDakMsT0FBTyxXQUFXO2NBQ2hCLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Y0FDckMsS0FBSyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUMxQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2VBQ3RDO2NBQ0QsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDaEI7S0FDUjs7SUFFRCxJQUFJLEVBQUUsU0FBUyxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRTs7O01BRzlCLElBQUksUUFBUSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFOztRQUV4QyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQzs7T0FFekIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7O1FBRXhDLEtBQUssSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFO1VBQzlDLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUs7WUFDN0QsT0FBTzs7T0FFWixNQUFNOztRQUVMLEtBQUssSUFBSSxHQUFHLElBQUksR0FBRztVQUNqQixJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSztZQUMvQyxPQUFPOztPQUVaOztLQUVGOztJQUVELEtBQUssRUFBRSxTQUFTLEdBQUcsRUFBRTtNQUNuQixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ3BCOztJQUVELE9BQU8sRUFBRSxTQUFTLEdBQUcsRUFBRTtNQUNyQixJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7TUFDdEMsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzVCOztJQUVELFdBQVcsRUFBRSxTQUFTLEdBQUcsRUFBRTtNQUN6QixPQUFPLEdBQUcsS0FBSyxTQUFTLENBQUM7S0FDMUI7O0lBRUQsTUFBTSxFQUFFLFNBQVMsR0FBRyxFQUFFO01BQ3BCLE9BQU8sR0FBRyxLQUFLLElBQUksQ0FBQztLQUNyQjs7SUFFRCxLQUFLLEVBQUUsU0FBUyxHQUFHLEVBQUU7TUFDbkIsT0FBTyxHQUFHLEtBQUssR0FBRyxDQUFDO0tBQ3BCOztJQUVELE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxJQUFJLFNBQVMsR0FBRyxFQUFFO01BQ3RDLE9BQU8sR0FBRyxDQUFDLFdBQVcsS0FBSyxLQUFLLENBQUM7S0FDbEM7O0lBRUQsUUFBUSxFQUFFLFNBQVMsR0FBRyxFQUFFO01BQ3RCLE9BQU8sR0FBRyxLQUFLLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUM1Qjs7SUFFRCxRQUFRLEVBQUUsU0FBUyxHQUFHLEVBQUU7TUFDdEIsT0FBTyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztLQUN0Qjs7SUFFRCxRQUFRLEVBQUUsU0FBUyxHQUFHLEVBQUU7TUFDdEIsT0FBTyxHQUFHLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQztLQUN2Qjs7SUFFRCxTQUFTLEVBQUUsU0FBUyxHQUFHLEVBQUU7TUFDdkIsT0FBTyxHQUFHLEtBQUssS0FBSyxJQUFJLEdBQUcsS0FBSyxJQUFJLENBQUM7S0FDdEM7O0lBRUQsVUFBVSxFQUFFLFNBQVMsR0FBRyxFQUFFO01BQ3hCLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLG1CQUFtQixDQUFDO0tBQ3BFOztHQUVGLENBQUM7O0NBRUgsR0FBRyxDQUFDOzs7QUFHTCxHQUFHLENBQUMsV0FBVyxDQUFDLFVBQVUsR0FBRyxDQUFDLFVBQVUsTUFBTSxFQUFFOzs7Ozs7Ozs7O0VBVTlDLElBQUksVUFBVSxHQUFHLFNBQVMsTUFBTSxFQUFFLFFBQVEsRUFBRTs7SUFFMUMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7OztJQU1yQyxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7OztJQU1oRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzs7Ozs7O0lBTXJCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDOzs7Ozs7O0lBT3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDOzs7Ozs7O0lBTzVCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUM7O0dBRW5DLENBQUM7O0VBRUYsTUFBTSxDQUFDLE1BQU07O01BRVQsVUFBVSxDQUFDLFNBQVM7OztNQUdwQjs7Ozs7Ozs7OztRQVVFLFFBQVEsRUFBRSxTQUFTLEdBQUcsRUFBRTtVQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztVQUN0QixPQUFPLElBQUksQ0FBQztTQUNiOzs7Ozs7Ozs7OztRQVdELGNBQWMsRUFBRSxTQUFTLEdBQUcsRUFBRTtVQUM1QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxDQUFDO1VBQzVCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7Ozs7Ozs7UUFPRCxRQUFRLEVBQUUsU0FBUyxRQUFRLEVBQUU7VUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsUUFBUSxDQUFDO1VBQ3RDLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7V0FDdEM7VUFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7VUFDckIsT0FBTyxJQUFJLENBQUM7U0FDYjs7Ozs7OztRQU9ELFFBQVEsRUFBRSxXQUFXO1VBQ25CLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbkM7Ozs7Ozs7UUFPRCxhQUFhLEVBQUUsV0FBVztVQUN4QixPQUFPLElBQUksQ0FBQztTQUNiOzs7OztRQUtELFVBQVUsRUFBRSxXQUFXO1VBQ3JCLE9BQU8sSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsUUFBUSxFQUFFO1NBQzdDOztPQUVGOztHQUVKLENBQUM7O0VBRUYsT0FBTyxVQUFVLENBQUM7OztDQUduQixFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7OztBQUdyQixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLFVBQVUsTUFBTSxFQUFFOztFQUUvQixJQUFJLFNBQVMsR0FBRztJQUNkLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQztJQUN4QixhQUFhLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDO0lBQ3ZFLGdCQUFnQixFQUFFLENBQUMsU0FBUyxDQUFDO0dBQzlCLENBQUM7O0VBRUYsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDO0VBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsRUFBRTtNQUN6QixhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3RCLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQzs7RUFFSCxJQUFJLGdCQUFnQixHQUFHLGlCQUFpQixDQUFDOztFQUV6QyxTQUFTLGdCQUFnQixDQUFDLEdBQUcsRUFBRTs7SUFFN0IsSUFBSSxHQUFHLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7O0lBRXJELElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7SUFFeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7TUFDekIsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDN0I7Ozs7SUFJRCxPQUFPLENBQUMsQ0FBQzs7R0FFVjs7Ozs7O0VBTUQsSUFBSSxHQUFHLEdBQUc7Ozs7Ozs7SUFPUixjQUFjLEVBQUUsU0FBUyxJQUFJLEVBQUUsVUFBVSxFQUFFOztNQUV6QyxJQUFJLElBQUksS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUUsT0FBTzs7TUFFM0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLEdBQUcsV0FBVztRQUMzQyxPQUFPLEtBQUssQ0FBQztPQUNkLEdBQUcsV0FBVztPQUNkLENBQUM7O01BRUYsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsVUFBVSxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUM7TUFDeEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsVUFBVSxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUM7TUFDMUQsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQzs7S0FFL0M7Ozs7Ozs7O0lBUUQsY0FBYyxFQUFFLFNBQVMsSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUU7O01BRW5ELElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsRUFBRSxVQUFVLEdBQUcsSUFBSSxDQUFDO01BQ3RELElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLEdBQUcsSUFBSSxDQUFDOztNQUVsRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7O01BRWpDLElBQUksVUFBVSxFQUFFO1FBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztPQUN0QjtNQUNELElBQUksUUFBUSxFQUFFO1FBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztPQUN2Qjs7S0FFRjs7Ozs7Ozs7SUFRRCxTQUFTLEVBQUUsU0FBUyxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7TUFDaEQsTUFBTSxHQUFHLE1BQU0sSUFBSSxFQUFFLENBQUM7TUFDdEIsSUFBSSxTQUFTLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO01BQ3pDLElBQUksQ0FBQyxTQUFTLEVBQUU7UUFDZCxNQUFNLElBQUksS0FBSyxDQUFDLGFBQWEsR0FBRyxTQUFTLEdBQUcsaUJBQWlCLENBQUMsQ0FBQztPQUNoRTtNQUNELElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7TUFDMUMsUUFBUSxTQUFTO1FBQ2YsS0FBSyxhQUFhO1VBQ2hCLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7VUFDOUMsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQztVQUM5QyxHQUFHLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsT0FBTyxJQUFJLEtBQUs7Y0FDakQsTUFBTSxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxVQUFVLElBQUksQ0FBQztjQUN6RCxDQUFDO2NBQ0QsQ0FBQztjQUNELE9BQU87Y0FDUCxPQUFPO2NBQ1AsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztVQUN6QyxNQUFNO1FBQ1IsS0FBSyxnQkFBZ0I7VUFDbkIsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLGlCQUFpQixJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUM7VUFDckQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDdEIsVUFBVSxFQUFFLElBQUk7WUFDaEIsT0FBTyxFQUFFLEtBQUs7WUFDZCxNQUFNLEVBQUUsS0FBSztZQUNiLFFBQVEsRUFBRSxLQUFLO1lBQ2YsT0FBTyxFQUFFLEtBQUs7WUFDZCxPQUFPLEVBQUUsU0FBUztZQUNsQixRQUFRLEVBQUUsU0FBUztXQUNwQixDQUFDLENBQUM7VUFDSCxJQUFJLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxPQUFPLElBQUksS0FBSztjQUNuQyxNQUFNLENBQUMsVUFBVSxFQUFFLE1BQU07Y0FDekIsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsTUFBTTtjQUM3QixNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxPQUFPO2NBQy9CLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1VBQ3JDLE1BQU07UUFDUjtVQUNFLEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxPQUFPLElBQUksS0FBSztjQUM1QyxNQUFNLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxDQUFDO1VBQy9CLE1BQU07T0FDVDtNQUNELE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO01BQzFCLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDekI7Ozs7Ozs7OztJQVNELElBQUksRUFBRSxTQUFTLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtNQUN0QyxJQUFJLEdBQUcsSUFBSSxJQUFJLEtBQUssQ0FBQztNQUNyQixJQUFJLElBQUksQ0FBQyxnQkFBZ0I7UUFDdkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7V0FDdEMsSUFBSSxJQUFJLENBQUMsV0FBVztRQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7TUFDdkMsT0FBTyxHQUFHLENBQUM7S0FDWjs7Ozs7Ozs7O0lBU0QsTUFBTSxFQUFFLFNBQVMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO01BQ3hDLElBQUksR0FBRyxJQUFJLElBQUksS0FBSyxDQUFDO01BQ3JCLElBQUksSUFBSSxDQUFDLG1CQUFtQjtRQUMxQixJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztXQUN6QyxJQUFJLElBQUksQ0FBQyxXQUFXO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztNQUN2QyxPQUFPLEdBQUcsQ0FBQztLQUNaOzs7Ozs7O0lBT0QsUUFBUSxFQUFFLFNBQVMsSUFBSSxFQUFFLFNBQVMsRUFBRTtNQUNsQyxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO1FBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO09BQzVCLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtRQUN2QyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7VUFDcEMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztVQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzVFO09BQ0Y7TUFDRCxPQUFPLEdBQUcsQ0FBQztLQUNaOzs7Ozs7O0lBT0QsV0FBVyxFQUFFLFNBQVMsSUFBSSxFQUFFLFNBQVMsRUFBRTtNQUNyQyxJQUFJLFNBQVMsRUFBRTtRQUNiLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7O1NBRWpDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtVQUN2QyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQy9CLE1BQU07VUFDTCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztVQUN6QyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1VBQ3ZDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQ2YsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1dBQ3BDO1NBQ0Y7T0FDRixNQUFNO1FBQ0wsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7T0FDNUI7TUFDRCxPQUFPLEdBQUcsQ0FBQztLQUNaOztJQUVELFFBQVEsRUFBRSxTQUFTLElBQUksRUFBRSxTQUFTLEVBQUU7TUFDbEMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxZQUFZLEdBQUcsU0FBUyxHQUFHLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksS0FBSyxDQUFDO0tBQzFGOzs7Ozs7SUFNRCxRQUFRLEVBQUUsU0FBUyxJQUFJLEVBQUU7O01BRXZCLElBQUksS0FBSyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDOztNQUVuQyxPQUFPLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1VBQy9DLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1VBQzdDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztVQUN2QyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7VUFDeEMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7S0FDdEM7Ozs7OztJQU1ELFNBQVMsRUFBRSxTQUFTLElBQUksRUFBRTs7TUFFeEIsSUFBSSxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7O01BRW5DLE9BQU8sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7VUFDOUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7VUFDOUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1VBQ3RDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1VBQ3pDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0tBQ3ZDOzs7Ozs7SUFNRCxTQUFTLEVBQUUsU0FBUyxJQUFJLEVBQUU7TUFDeEIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUM5QixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7UUFDckIsR0FBRztVQUNELE1BQU0sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQztVQUMvQixNQUFNLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDOUIsUUFBUSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRTtPQUNwQztNQUNELE9BQU8sTUFBTSxDQUFDO0tBQ2Y7Ozs7Ozs7SUFPRCxRQUFRLEVBQUUsU0FBUyxJQUFJLEVBQUU7TUFDdkIsT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLGFBQWEsTUFBTSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUN0RTs7R0FFRixDQUFDOztFQUVGLE9BQU8sR0FBRyxDQUFDOztDQUVaLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzs7O0FBR3JCLEdBQUcsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxVQUFVLFVBQVUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7RUFlckUsSUFBSSxnQkFBZ0IsR0FBRyxTQUFTLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFOztJQUV6RCxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7O0lBRXpELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQzs7Ozs7O0lBTWpCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7SUFFakQsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO01BQzNCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztNQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsT0FBTyxFQUFFO1FBQ3JDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxPQUFPLENBQUM7T0FDeEIsQ0FBQyxDQUFDO01BQ0gsT0FBTyxHQUFHLEdBQUcsQ0FBQztLQUNmOztJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsS0FBSyxFQUFFLEdBQUcsRUFBRTs7TUFFeEMsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztNQUMzQyxHQUFHLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztNQUNwQixHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztNQUNqQyxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7S0FFakMsQ0FBQyxDQUFDOzs7SUFHSCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7O0lBRXJCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsV0FBVztNQUMzQyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUM7TUFDMUQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUM5QixDQUFDLENBQUM7O0lBRUgsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztHQUU1QyxDQUFDOztFQUVGLGdCQUFnQixDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7O0VBRXpDLE1BQU0sQ0FBQyxNQUFNOztNQUVULGdCQUFnQixDQUFDLFNBQVM7TUFDMUIsVUFBVSxDQUFDLFNBQVM7O01BRXBCOztRQUVFLFFBQVEsRUFBRSxTQUFTLENBQUMsRUFBRTtVQUNwQixJQUFJLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1VBQzVFLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1dBQ25EO1VBQ0QsT0FBTyxRQUFRLENBQUM7U0FDakI7O1FBRUQsYUFBYSxFQUFFLFdBQVc7VUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1VBQ3RDLE9BQU8sZ0JBQWdCLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3ZFOztPQUVGOztHQUVKLENBQUM7O0VBRUYsT0FBTyxnQkFBZ0IsQ0FBQzs7Q0FFekIsRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLFVBQVU7QUFDN0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHO0FBQ1gsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzs7O0FBR2xCLEdBQUcsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxVQUFVLFVBQVUsRUFBRSxNQUFNLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7RUFnQmhFLElBQUksZ0JBQWdCLEdBQUcsU0FBUyxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTs7SUFFeEQsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDOztJQUV6RCxNQUFNLEdBQUcsTUFBTSxJQUFJLEVBQUUsQ0FBQzs7SUFFdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7O0lBRTFCLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7O01BRW5DLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLEVBQUU7UUFDMUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7T0FDeEIsTUFBTTs7UUFFTCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO09BQ3pGOztLQUVGLE1BQU07O01BRUwsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDOztLQUVsQzs7SUFFRCxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7OztHQUdwRCxDQUFDOztFQUVGLGdCQUFnQixDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7O0VBRXpDLE1BQU0sQ0FBQyxNQUFNOztNQUVULGdCQUFnQixDQUFDLFNBQVM7TUFDMUIsVUFBVSxDQUFDLFNBQVM7OztNQUdwQjs7UUFFRSxRQUFRLEVBQUUsU0FBUyxDQUFDLEVBQUU7O1VBRXBCLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDOUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7V0FDaEIsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3JELENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1dBQ2hCOztVQUVELElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ3JELENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztXQUMvQzs7VUFFRCxPQUFPLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7O1NBRXJFOzs7Ozs7Ozs7UUFTRCxHQUFHLEVBQUUsU0FBUyxDQUFDLEVBQUU7VUFDZixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztVQUNmLE9BQU8sSUFBSSxDQUFDO1NBQ2I7Ozs7Ozs7OztRQVNELEdBQUcsRUFBRSxTQUFTLENBQUMsRUFBRTtVQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1VBQ2YsT0FBTyxJQUFJLENBQUM7U0FDYjs7Ozs7Ozs7Ozs7O1FBWUQsSUFBSSxFQUFFLFNBQVMsQ0FBQyxFQUFFO1VBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1VBQ2hCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7O09BRUY7O0dBRUosQ0FBQzs7RUFFRixTQUFTLFdBQVcsQ0FBQyxDQUFDLEVBQUU7SUFDdEIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNqQixJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7TUFDdkIsT0FBTyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3RDLE1BQU07TUFDTCxPQUFPLENBQUMsQ0FBQztLQUNWO0dBQ0Y7O0VBRUQsT0FBTyxnQkFBZ0IsQ0FBQzs7Q0FFekIsRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLFVBQVU7QUFDN0IsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzs7O0FBR2xCLEdBQUcsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxVQUFVLGdCQUFnQixFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQWtCOUUsSUFBSSxtQkFBbUIsR0FBRyxTQUFTLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFOztJQUUzRCxJQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDOztJQUVuQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDOztJQUVwRSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7Ozs7OztJQU1qQixJQUFJLE1BQU0sQ0FBQzs7SUFFWCxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDOzs7O0lBSTFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDM0MsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN2QyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ2pELEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUU7OztNQUc1QyxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssRUFBRSxFQUFFO1FBQ3BCLEtBQUssQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFDbkMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osS0FBSyxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztPQUNyQzs7S0FFRixDQUFDLENBQUM7O0lBRUgsU0FBUyxRQUFRLEdBQUc7TUFDbEIsSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7TUFDaEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUN6RDs7SUFFRCxTQUFTLE1BQU0sR0FBRztNQUNoQixRQUFRLEVBQUUsQ0FBQztNQUNYLElBQUksS0FBSyxDQUFDLGdCQUFnQixFQUFFO1FBQzFCLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO09BQ3REO0tBQ0Y7O0lBRUQsU0FBUyxXQUFXLENBQUMsQ0FBQyxFQUFFO01BQ3RCLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztNQUMzQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7TUFDdkMsTUFBTSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7S0FDcEI7O0lBRUQsU0FBUyxXQUFXLENBQUMsQ0FBQyxFQUFFOztNQUV0QixJQUFJLElBQUksR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztNQUM5QixLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDOztNQUU5RCxNQUFNLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQzs7S0FFcEI7O0lBRUQsU0FBUyxTQUFTLEdBQUc7TUFDbkIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO01BQzdDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztLQUMxQzs7SUFFRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7O0lBRXJCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs7R0FFM0MsQ0FBQzs7RUFFRixtQkFBbUIsQ0FBQyxVQUFVLEdBQUcsZ0JBQWdCLENBQUM7O0VBRWxELE1BQU0sQ0FBQyxNQUFNOztNQUVULG1CQUFtQixDQUFDLFNBQVM7TUFDN0IsZ0JBQWdCLENBQUMsU0FBUzs7TUFFMUI7O1FBRUUsYUFBYSxFQUFFLFdBQVc7O1VBRXhCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7VUFDdEgsT0FBTyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDMUU7O09BRUY7O0dBRUosQ0FBQzs7RUFFRixTQUFTLGNBQWMsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFO0lBQ3ZDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDO0dBQzFDOztFQUVELE9BQU8sbUJBQW1CLENBQUM7O0NBRTVCLEVBQUUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0I7QUFDbkMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHO0FBQ1gsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzs7O0FBR2xCLEdBQUcsQ0FBQyxXQUFXLENBQUMsc0JBQXNCLEdBQUcsQ0FBQyxVQUFVLGdCQUFnQixFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFvQmxHLElBQUksc0JBQXNCLEdBQUcsU0FBUyxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFOztJQUV0RSxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDOztJQUVuRyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7O0lBRWpCLElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsRCxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7SUFJbEQsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQzs7SUFFdEQsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsQ0FBQzs7SUFFN0MsU0FBUyxXQUFXLENBQUMsQ0FBQyxFQUFFOztNQUV0QixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7TUFDM0MsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDOztNQUV2QyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDaEI7O0lBRUQsU0FBUyxXQUFXLENBQUMsQ0FBQyxFQUFFOztNQUV0QixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7O01BRW5CLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO01BQy9DLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDOztNQUU3QyxLQUFLLENBQUMsUUFBUTtRQUNaLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDO09BQzNFLENBQUM7O01BRUYsT0FBTyxLQUFLLENBQUM7O0tBRWQ7O0lBRUQsU0FBUyxTQUFTLEdBQUc7TUFDbkIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO01BQzdDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztNQUN6QyxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRTtRQUMxQixLQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztPQUN0RDtLQUNGOztJQUVELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7SUFFckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2pELElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzs7R0FFaEQsQ0FBQzs7RUFFRixzQkFBc0IsQ0FBQyxVQUFVLEdBQUcsZ0JBQWdCLENBQUM7Ozs7O0VBS3JELHNCQUFzQixDQUFDLGdCQUFnQixHQUFHLFdBQVc7SUFDbkQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztHQUN4QixDQUFDOztFQUVGLE1BQU0sQ0FBQyxNQUFNOztNQUVULHNCQUFzQixDQUFDLFNBQVM7TUFDaEMsZ0JBQWdCLENBQUMsU0FBUzs7TUFFMUI7O1FBRUUsYUFBYSxFQUFFLFdBQVc7VUFDeEIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztVQUNuRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7VUFDNUMsT0FBTyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0U7O09BRUY7Ozs7R0FJSixDQUFDOztFQUVGLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7SUFDOUIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztHQUNoRDs7RUFFRCxPQUFPLHNCQUFzQixDQUFDOztDQUUvQixFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCO0FBQ25DLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRztBQUNYLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRztBQUNiLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTTtBQUNoQixta0JBQW1rQixDQUFDLENBQUM7OztBQUdya0IsR0FBRyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLFVBQVUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUU7Ozs7Ozs7Ozs7OztFQVl2RSxJQUFJLGtCQUFrQixHQUFHLFNBQVMsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7O0lBRXhELGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQzs7SUFFM0QsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDOztJQUVqQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxLQUFLLFNBQVMsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQzdELEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLEVBQUU7TUFDM0MsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO01BQ25CLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztNQUNiLE9BQU8sS0FBSyxDQUFDO0tBQ2QsQ0FBQyxDQUFDOztJQUVILEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQzs7SUFFdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7R0FHNUMsQ0FBQzs7RUFFRixrQkFBa0IsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDOztFQUUzQyxNQUFNLENBQUMsTUFBTTs7TUFFVCxrQkFBa0IsQ0FBQyxTQUFTO01BQzVCLFVBQVUsQ0FBQyxTQUFTO01BQ3BCOztRQUVFLElBQUksRUFBRSxXQUFXO1VBQ2YsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1dBQzVCO1VBQ0QsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7V0FDbkQ7VUFDRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNuQztPQUNGOztHQUVKLENBQUM7O0VBRUYsT0FBTyxrQkFBa0IsQ0FBQzs7Q0FFM0IsRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLFVBQVU7QUFDN0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHO0FBQ1gsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzs7O0FBR2xCLEdBQUcsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxVQUFVLFVBQVUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFOzs7Ozs7Ozs7OztFQVd0RSxJQUFJLGlCQUFpQixHQUFHLFNBQVMsTUFBTSxFQUFFLFFBQVEsRUFBRTs7SUFFakQsaUJBQWlCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDOztJQUUxRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7O0lBRTlCLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsRCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7OztJQUdqRCxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQzs7SUFFckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzs7SUFHN0MsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOztJQUVyQixTQUFTLFFBQVEsR0FBRztNQUNsQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQy9COztHQUVGLENBQUM7O0VBRUYsaUJBQWlCLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQzs7RUFFMUMsTUFBTSxDQUFDLE1BQU07O01BRVQsaUJBQWlCLENBQUMsU0FBUztNQUMzQixVQUFVLENBQUMsU0FBUzs7TUFFcEI7O1FBRUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxFQUFFO1VBQ3BCLElBQUksUUFBUSxHQUFHLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7VUFDN0UsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7V0FDbkQ7VUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztVQUM5QixPQUFPLFFBQVEsQ0FBQztTQUNqQjs7UUFFRCxhQUFhLEVBQUUsV0FBVzs7VUFFeEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssSUFBSSxFQUFFO1lBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7V0FDaEMsTUFBTTtjQUNILElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztXQUNuQzs7VUFFRCxPQUFPLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7U0FFeEU7OztPQUdGOztHQUVKLENBQUM7O0VBRUYsT0FBTyxpQkFBaUIsQ0FBQzs7Q0FFMUIsRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLFVBQVU7QUFDN0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHO0FBQ1gsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzs7O0FBR2xCLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLENBQUMsVUFBVSxNQUFNLEVBQUU7O0VBRXRDLE9BQU8sU0FBUyxLQUFLLEVBQUU7O0lBRXJCLElBQUksS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7O01BRS9DLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO01BQy9CLE9BQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDbkIsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7T0FDYjs7TUFFRCxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUM7O0tBRWhCLE1BQU07O01BRUwsT0FBTyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7O0tBRXBIOztHQUVGOztDQUVGLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzs7O0FBR3JCLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLENBQUMsVUFBVSxRQUFRLEVBQUUsTUFBTSxFQUFFOztFQUVqRCxJQUFJLE1BQU0sRUFBRSxRQUFRLENBQUM7O0VBRXJCLElBQUksU0FBUyxHQUFHLFdBQVc7O0lBRXpCLFFBQVEsR0FBRyxLQUFLLENBQUM7O0lBRWpCLElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDOztJQUUvRSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxTQUFTLE1BQU0sRUFBRTs7TUFFNUMsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFOztRQUUzQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsU0FBUyxVQUFVLEVBQUUsY0FBYyxFQUFFOztVQUVuRSxNQUFNLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7VUFFbkMsSUFBSSxRQUFRLEtBQUssS0FBSyxJQUFJLE1BQU0sS0FBSyxLQUFLLEVBQUU7WUFDMUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztZQUNsQixNQUFNLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztZQUN2QyxNQUFNLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUMvQixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUM7O1dBRXJCOztTQUVGLENBQUMsQ0FBQzs7UUFFSCxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUM7O09BRXJCOztLQUVGLENBQUMsQ0FBQzs7SUFFSCxPQUFPLFFBQVEsQ0FBQzs7R0FFakIsQ0FBQzs7RUFFRixJQUFJLGVBQWUsR0FBRzs7O0lBR3BCOztNQUVFLE1BQU0sRUFBRSxNQUFNLENBQUMsUUFBUTs7TUFFdkIsV0FBVyxFQUFFOztRQUVYLGNBQWMsRUFBRTs7VUFFZCxJQUFJLEVBQUUsU0FBUyxRQUFRLEVBQUU7O1lBRXZCLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQztZQUNoRSxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUUsT0FBTyxLQUFLLENBQUM7O1lBRWhDLE9BQU87Y0FDTCxLQUFLLEVBQUUsS0FBSztjQUNaLEdBQUcsRUFBRSxRQUFRO2tCQUNULElBQUk7c0JBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7c0JBQ3ZDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO3NCQUN2QyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ2pELENBQUM7O1dBRUg7O1VBRUQsS0FBSyxFQUFFLFFBQVE7O1NBRWhCOztRQUVELFlBQVksRUFBRTs7VUFFWixJQUFJLEVBQUUsU0FBUyxRQUFRLEVBQUU7O1lBRXZCLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUMvQyxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUUsT0FBTyxLQUFLLENBQUM7O1lBRWhDLE9BQU87Y0FDTCxLQUFLLEVBQUUsS0FBSztjQUNaLEdBQUcsRUFBRSxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUN6QyxDQUFDOztXQUVIOztVQUVELEtBQUssRUFBRSxRQUFROztTQUVoQjs7UUFFRCxPQUFPLEVBQUU7O1VBRVAsSUFBSSxFQUFFLFNBQVMsUUFBUSxFQUFFOztZQUV2QixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7WUFDdEUsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFLE9BQU8sS0FBSyxDQUFDOztZQUVoQyxPQUFPO2NBQ0wsS0FBSyxFQUFFLEtBQUs7Y0FDWixDQUFDLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztjQUN0QixDQUFDLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztjQUN0QixDQUFDLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN2QixDQUFDOztXQUVIOztVQUVELEtBQUssRUFBRSxRQUFROztTQUVoQjs7UUFFRCxRQUFRLEVBQUU7O1VBRVIsSUFBSSxFQUFFLFNBQVMsUUFBUSxFQUFFOztZQUV2QixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLHVEQUF1RCxDQUFDLENBQUM7WUFDbkYsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFLE9BQU8sS0FBSyxDQUFDOztZQUVoQyxPQUFPO2NBQ0wsS0FBSyxFQUFFLEtBQUs7Y0FDWixDQUFDLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztjQUN0QixDQUFDLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztjQUN0QixDQUFDLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztjQUN0QixDQUFDLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN2QixDQUFDOztXQUVIOztVQUVELEtBQUssRUFBRSxRQUFROztTQUVoQjs7T0FFRjs7S0FFRjs7O0lBR0Q7O01BRUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxRQUFROztNQUV2QixXQUFXLEVBQUU7O1FBRVgsR0FBRyxFQUFFO1VBQ0gsSUFBSSxFQUFFLFNBQVMsUUFBUSxFQUFFO1lBQ3ZCLE9BQU87Y0FDTCxLQUFLLEVBQUUsS0FBSztjQUNaLEdBQUcsRUFBRSxRQUFRO2NBQ2IsY0FBYyxFQUFFLEtBQUs7YUFDdEI7V0FDRjs7VUFFRCxLQUFLLEVBQUUsU0FBUyxLQUFLLEVBQUU7WUFDckIsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDO1dBQ2xCO1NBQ0Y7O09BRUY7O0tBRUY7OztJQUdEOztNQUVFLE1BQU0sRUFBRSxNQUFNLENBQUMsT0FBTzs7TUFFdEIsV0FBVyxFQUFFOztRQUVYLFNBQVMsRUFBRTtVQUNULElBQUksRUFBRSxTQUFTLFFBQVEsRUFBRTtZQUN2QixJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFLE9BQU8sS0FBSyxDQUFDO1lBQ3ZDLE9BQU87Y0FDTCxLQUFLLEVBQUUsS0FBSztjQUNaLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO2NBQ2QsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7Y0FDZCxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQzthQUNmLENBQUM7V0FDSDs7VUFFRCxLQUFLLEVBQUUsU0FBUyxLQUFLLEVBQUU7WUFDckIsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7V0FDcEM7O1NBRUY7O1FBRUQsVUFBVSxFQUFFO1VBQ1YsSUFBSSxFQUFFLFNBQVMsUUFBUSxFQUFFO1lBQ3ZCLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsT0FBTyxLQUFLLENBQUM7WUFDdkMsT0FBTztjQUNMLEtBQUssRUFBRSxLQUFLO2NBQ1osQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7Y0FDZCxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztjQUNkLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO2NBQ2QsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7YUFDZixDQUFDO1dBQ0g7O1VBRUQsS0FBSyxFQUFFLFNBQVMsS0FBSyxFQUFFO1lBQ3JCLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7V0FDN0M7O1NBRUY7O09BRUY7O0tBRUY7OztJQUdEOztNQUVFLE1BQU0sRUFBRSxNQUFNLENBQUMsUUFBUTs7TUFFdkIsV0FBVyxFQUFFOztRQUVYLFFBQVEsRUFBRTtVQUNSLElBQUksRUFBRSxTQUFTLFFBQVEsRUFBRTtZQUN2QixJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFO2NBQy9CLE9BQU87Z0JBQ0wsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNiLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDYixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ2IsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2VBQ2Q7YUFDRjtZQUNELE9BQU8sS0FBSyxDQUFDO1dBQ2Q7O1VBRUQsS0FBSyxFQUFFLFNBQVMsS0FBSyxFQUFFO1lBQ3JCLE9BQU87Y0FDTCxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7Y0FDVixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7Y0FDVixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7Y0FDVixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDWDtXQUNGO1NBQ0Y7O1FBRUQsT0FBTyxFQUFFO1VBQ1AsSUFBSSxFQUFFLFNBQVMsUUFBUSxFQUFFO1lBQ3ZCLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFO2NBQy9CLE9BQU87Z0JBQ0wsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNiLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDYixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7ZUFDZDthQUNGO1lBQ0QsT0FBTyxLQUFLLENBQUM7V0FDZDs7VUFFRCxLQUFLLEVBQUUsU0FBUyxLQUFLLEVBQUU7WUFDckIsT0FBTztjQUNMLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztjQUNWLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztjQUNWLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUNYO1dBQ0Y7U0FDRjs7UUFFRCxRQUFRLEVBQUU7VUFDUixJQUFJLEVBQUUsU0FBUyxRQUFRLEVBQUU7WUFDdkIsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtjQUMvQixPQUFPO2dCQUNMLEtBQUssRUFBRSxLQUFLO2dCQUNaLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDYixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ2IsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNiLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztlQUNkO2FBQ0Y7WUFDRCxPQUFPLEtBQUssQ0FBQztXQUNkOztVQUVELEtBQUssRUFBRSxTQUFTLEtBQUssRUFBRTtZQUNyQixPQUFPO2NBQ0wsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2NBQ1YsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2NBQ1YsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2NBQ1YsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ1g7V0FDRjtTQUNGOztRQUVELE9BQU8sRUFBRTtVQUNQLElBQUksRUFBRSxTQUFTLFFBQVEsRUFBRTtZQUN2QixJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtjQUMvQixPQUFPO2dCQUNMLEtBQUssRUFBRSxLQUFLO2dCQUNaLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDYixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ2IsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2VBQ2Q7YUFDRjtZQUNELE9BQU8sS0FBSyxDQUFDO1dBQ2Q7O1VBRUQsS0FBSyxFQUFFLFNBQVMsS0FBSyxFQUFFO1lBQ3JCLE9BQU87Y0FDTCxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7Y0FDVixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7Y0FDVixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDWDtXQUNGOztTQUVGOztPQUVGOztLQUVGOzs7R0FHRixDQUFDOztFQUVGLE9BQU8sU0FBUyxDQUFDOzs7Q0FHbEIsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVE7QUFDckIsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzs7O0FBR2xCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxVQUFVLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLGtCQUFrQixFQUFFLG1CQUFtQixFQUFFLHNCQUFzQixFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxxQkFBcUIsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRTs7RUFFL1EsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7O0VBR3ZCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQzs7RUFFekIsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDOzs7RUFHdkIsSUFBSSxtQkFBbUIsR0FBRyxFQUFFLENBQUM7O0VBRTdCLElBQUksMkJBQTJCLEdBQUcsU0FBUyxDQUFDOztFQUU1QyxJQUFJLHNCQUFzQixHQUFHLENBQUMsV0FBVztJQUN2QyxJQUFJO01BQ0YsT0FBTyxjQUFjLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxJQUFJLENBQUM7S0FDcEUsQ0FBQyxPQUFPLENBQUMsRUFBRTtNQUNWLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7R0FDRixHQUFHLENBQUM7O0VBRUwsSUFBSSxhQUFhLENBQUM7OztFQUdsQixJQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQzs7O0VBRzdCLElBQUksb0JBQW9CLENBQUM7OztFQUd6QixJQUFJLElBQUksR0FBRyxLQUFLLENBQUM7OztFQUdqQixJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBaUJ2QixJQUFJLEdBQUcsR0FBRyxTQUFTLE1BQU0sRUFBRTs7SUFFekIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDOzs7Ozs7SUFNakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hELElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7O0lBRXZDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQzs7Ozs7O0lBTTdDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDOztJQUVwQixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQzs7Ozs7O0lBTXhCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBb0I5QixJQUFJLENBQUMsc0NBQXNDLEdBQUcsRUFBRSxDQUFDOztJQUVqRCxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQzs7SUFFdEIsTUFBTSxHQUFHLE1BQU0sSUFBSSxFQUFFLENBQUM7OztJQUd0QixNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7TUFDL0IsU0FBUyxFQUFFLElBQUk7TUFDZixLQUFLLEVBQUUsR0FBRyxDQUFDLGFBQWE7S0FDekIsQ0FBQyxDQUFDOztJQUVILE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtNQUMvQixTQUFTLEVBQUUsTUFBTSxDQUFDLFNBQVM7TUFDM0IsUUFBUSxFQUFFLE1BQU0sQ0FBQyxTQUFTO0tBQzNCLENBQUMsQ0FBQzs7O0lBR0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFOzs7TUFHcEMsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7O0tBRXZELE1BQU07O01BRUwsTUFBTSxDQUFDLElBQUksR0FBRyxFQUFFLE1BQU0sRUFBRSwyQkFBMkIsRUFBRSxDQUFDOztLQUV2RDs7SUFFRCxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7TUFDeEQsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMxQjs7O0lBR0QsTUFBTSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDOzs7SUFHekUsSUFBSSxNQUFNLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFO01BQzdELE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0tBQzFCOzs7OztJQUtELElBQUksaUJBQWlCO1FBQ2pCLHNCQUFzQjtZQUNsQixZQUFZLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxLQUFLLE1BQU0sQ0FBQzs7SUFFOUUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUk7OztRQUd4Qjs7Ozs7O1VBTUUsTUFBTSxFQUFFO1lBQ04sR0FBRyxFQUFFLFdBQVc7Y0FDZCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUM7YUFDdEI7V0FDRjs7VUFFRCxVQUFVLEVBQUU7WUFDVixHQUFHLEVBQUUsV0FBVztjQUNkLE9BQU8sTUFBTSxDQUFDLFVBQVUsQ0FBQzthQUMxQjtXQUNGOzs7Ozs7VUFNRCxTQUFTLEVBQUU7WUFDVCxHQUFHLEVBQUUsV0FBVztjQUNkLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQzthQUN6QjtXQUNGOzs7Ozs7VUFNRCxNQUFNLEVBQUU7O1lBRU4sR0FBRyxFQUFFLFdBQVc7Y0FDZCxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQ2hCLE9BQU8sS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztlQUMvQixNQUFNO2dCQUNMLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7ZUFDM0I7YUFDRjs7WUFFRCxHQUFHLEVBQUUsU0FBUyxDQUFDLEVBQUU7Y0FDZixJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQ2hCLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2VBQzVCLE1BQU07Z0JBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2VBQ3hCO2NBQ0Qsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7Y0FDM0IsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2hCOztXQUVGOzs7Ozs7VUFNRCxLQUFLLEVBQUU7WUFDTCxHQUFHLEVBQUUsV0FBVztjQUNkLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQzthQUNyQjtZQUNELEdBQUcsRUFBRSxTQUFTLENBQUMsRUFBRTtjQUNmLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2NBQ2pCLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDcEI7V0FDRjs7Ozs7OztVQU9ELElBQUksRUFBRTtZQUNKLEdBQUcsRUFBRSxXQUFXO2NBQ2QsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ3BCO1lBQ0QsR0FBRyxFQUFFLFNBQVMsQ0FBQyxFQUFFOztjQUVmLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO2NBQ2hCLElBQUksY0FBYyxFQUFFO2dCQUNsQixjQUFjLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7ZUFDeEM7YUFDRjtXQUNGOzs7Ozs7VUFNRCxNQUFNLEVBQUU7WUFDTixHQUFHLEVBQUUsV0FBVztjQUNkLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQzthQUN0QjtZQUNELEdBQUcsRUFBRSxTQUFTLENBQUMsRUFBRTtjQUNmLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2NBQ2xCLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtnQkFDakIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztlQUM1QyxNQUFNO2dCQUNMLEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7ZUFDL0M7Ozs7Y0FJRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7O2NBRWhCLElBQUksS0FBSyxDQUFDLGFBQWEsRUFBRTtnQkFDdkIsS0FBSyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQztlQUNyRTthQUNGO1dBQ0Y7Ozs7OztVQU1ELElBQUksRUFBRTtZQUNKLEdBQUcsRUFBRSxXQUFXO2NBQ2QsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ3BCO1dBQ0Y7Ozs7Ozs7VUFPRCxlQUFlLEVBQUU7O1lBRWYsR0FBRyxFQUFFLFdBQVc7Y0FDZCxPQUFPLGlCQUFpQixDQUFDO2FBQzFCO1lBQ0QsR0FBRyxFQUFFLFNBQVMsSUFBSSxFQUFFO2NBQ2xCLElBQUksc0JBQXNCLEVBQUU7Z0JBQzFCLGlCQUFpQixHQUFHLElBQUksQ0FBQztnQkFDekIsSUFBSSxJQUFJLEVBQUU7a0JBQ1IsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixDQUFDLENBQUM7aUJBQ2hELE1BQU07a0JBQ0wsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixDQUFDLENBQUM7aUJBQ2xEO2dCQUNELFlBQVksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2VBQ25FO2FBQ0Y7O1dBRUY7O1NBRUYsQ0FBQyxDQUFDOzs7SUFHUCxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFOztNQUVyQyxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzs7TUFFdEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztNQUM5QyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7OztNQUczQyxJQUFJLHNCQUFzQixFQUFFOztRQUUxQixJQUFJLGlCQUFpQixFQUFFOztVQUVyQixLQUFLLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQzs7VUFFN0IsSUFBSSxTQUFTLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQzs7VUFFdkUsSUFBSSxTQUFTLEVBQUU7WUFDYixNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7V0FDckM7O1NBRUY7O09BRUY7O01BRUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO01BQ25ELElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUM7TUFDL0MsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO01BQ3pELElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzs7TUFFaEQsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxXQUFXOztRQUUvQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQzs7O09BRzlCLENBQUMsQ0FBQzs7OztLQUlKLE1BQU07O01BRUwsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRTtRQUMvQixNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztPQUN0Qjs7TUFFRCxJQUFJLGNBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztNQUMxRCxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDOztNQUVoRCxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFLGNBQWMsQ0FBQyxDQUFDOztNQUU5QyxJQUFJLGNBQWMsR0FBRyxTQUFTLENBQUMsRUFBRTtRQUMvQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDbkIsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDN0IsT0FBTyxLQUFLLENBQUM7T0FDZCxDQUFDOztNQUVGLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7O01BRTFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO01BQ2pDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQzs7TUFFN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7UUFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7T0FDckI7O0tBRUY7O0lBRUQsSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFOztNQUVwQixJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFOztRQUVyQyxJQUFJLGlCQUFpQixFQUFFO1VBQ3JCLG9CQUFvQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7VUFDckQsR0FBRyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxhQUFhLENBQUMsQ0FBQztVQUNsRCxHQUFHLENBQUMsUUFBUSxDQUFDLG9CQUFvQixFQUFFLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1VBQ25FLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLG9CQUFvQixDQUFDLENBQUM7VUFDaEQsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1NBQzNCOzs7UUFHRCxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzs7UUFHbEQsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOztPQUVyRDs7OztNQUlELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDOztLQUVqRDs7SUFFRCxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLEtBQUssQ0FBQyxRQUFRLEdBQUUsRUFBRSxDQUFDLENBQUM7SUFDNUQsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLHFCQUFxQixFQUFFLFdBQVcsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0UsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsS0FBSyxDQUFDLFFBQVEsR0FBRSxFQUFFLENBQUMsQ0FBQztJQUN0RSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLEtBQUssQ0FBQyxRQUFRLEdBQUUsRUFBRSxDQUFDLENBQUM7SUFDdkUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDOzs7SUFHaEIsSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFO01BQ3BCLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN2Qjs7SUFFRCxTQUFTLGtCQUFrQixHQUFHO01BQzVCLFlBQVksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUNoRzs7SUFFRCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDM0IsU0FBUyxVQUFVLEdBQUc7UUFDbEIsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO1FBQ2hCLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVztVQUN0QixJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztTQUNqQixDQUFDLENBQUM7T0FDSjs7TUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtRQUNsQixVQUFVLEVBQUUsQ0FBQztPQUNkOztHQUVKLENBQUM7O0VBRUYsR0FBRyxDQUFDLFVBQVUsR0FBRyxXQUFXOztJQUUxQixJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxTQUFTLEdBQUcsRUFBRTtNQUN2QyxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztNQUNoRCxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDN0MsQ0FBQyxDQUFDO0dBQ0osQ0FBQzs7RUFFRixHQUFHLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxDQUFDO0VBQzNCLEdBQUcsQ0FBQywwQkFBMEIsR0FBRyxJQUFJLENBQUM7RUFDdEMsR0FBRyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7RUFDeEIsR0FBRyxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQztFQUNoQyxHQUFHLENBQUMsY0FBYyxHQUFHLG9CQUFvQixDQUFDO0VBQzFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDO0VBQzVCLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxjQUFjLENBQUM7RUFDeEMsR0FBRyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7O0VBRXhCLEdBQUcsQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDO0VBQ3hCLEdBQUcsQ0FBQyxXQUFXLEdBQUcsZ0JBQWdCLENBQUM7RUFDbkMsR0FBRyxDQUFDLFNBQVMsR0FBRyxlQUFlLENBQUM7O0VBRWhDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsRUFBRTs7SUFFdEMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSyxNQUFNO1NBQ3JDLENBQUMsQ0FBQyxLQUFLLEtBQUssYUFBYSxJQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksYUFBYSxDQUFDLEVBQUU7TUFDN0QsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDO0tBQ2xCOztHQUVGLEVBQUUsS0FBSyxDQUFDLENBQUM7O0VBRVYsTUFBTSxDQUFDLE1BQU07O01BRVQsR0FBRyxDQUFDLFNBQVM7OztNQUdiOzs7Ozs7OztRQVFFLEdBQUcsRUFBRSxTQUFTLE1BQU0sRUFBRSxRQUFRLEVBQUU7O1VBRTlCLE9BQU8sR0FBRztjQUNOLElBQUk7Y0FDSixNQUFNO2NBQ04sUUFBUTtjQUNSO2dCQUNFLFdBQVcsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztlQUN0RDtXQUNKLENBQUM7O1NBRUg7Ozs7Ozs7O1FBUUQsUUFBUSxFQUFFLFNBQVMsTUFBTSxFQUFFLFFBQVEsRUFBRTs7VUFFbkMsT0FBTyxHQUFHO2NBQ04sSUFBSTtjQUNKLE1BQU07Y0FDTixRQUFRO2NBQ1I7Z0JBQ0UsS0FBSyxFQUFFLElBQUk7ZUFDWjtXQUNKLENBQUM7O1NBRUg7Ozs7OztRQU1ELE1BQU0sRUFBRSxTQUFTLFVBQVUsRUFBRTs7O1VBRzNCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztVQUN2QyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztVQUNwRSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7VUFDakIsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXO1lBQ3RCLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztXQUNsQixDQUFDLENBQUM7O1NBRUo7O1FBRUQsT0FBTyxFQUFFLFdBQVc7O1VBRWxCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixvQkFBb0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1dBQ25EOztTQUVGOzs7Ozs7Ozs7UUFTRCxTQUFTLEVBQUUsU0FBUyxJQUFJLEVBQUU7Ozs7VUFJeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUN0QyxNQUFNLElBQUksS0FBSyxDQUFDLDhDQUE4QztnQkFDMUQsU0FBUyxHQUFHLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztXQUM3Qjs7VUFFRCxJQUFJLGNBQWMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDOzs7OztVQUtsRCxjQUFjLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7Ozs7VUFJMUMsSUFBSSxJQUFJLENBQUMsSUFBSTtjQUNULElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTztjQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTs7O1lBRzNCLGNBQWMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDOzs7WUFHdkQsY0FBYyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7V0FFL0M7O1VBRUQsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7VUFDbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7O1VBRTNCLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1VBQ3RDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1VBQzNCLE9BQU8sR0FBRyxDQUFDOztTQUVaOztRQUVELElBQUksRUFBRSxXQUFXO1VBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDckI7O1FBRUQsS0FBSyxFQUFFLFdBQVc7VUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDcEI7O1FBRUQsUUFBUSxFQUFFLFdBQVc7O1VBRW5CLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7VUFFMUIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFOztZQUVuQixJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDdkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztZQUVWLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsU0FBUyxJQUFJLEVBQUU7Y0FDL0MsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQ2hELENBQUMsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzVCLENBQUMsQ0FBQzs7WUFFSCxJQUFJLE1BQU0sQ0FBQyxXQUFXLEdBQUcsR0FBRyxHQUFHLG1CQUFtQixHQUFHLENBQUMsRUFBRTtjQUN0RCxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2NBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxHQUFHLEdBQUcsR0FBRyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7YUFDaEYsTUFBTTtjQUNMLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7Y0FDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzthQUNqQzs7V0FFRjs7VUFFRCxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXO2NBQ3RCLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7YUFDbkUsQ0FBQyxDQUFDO1dBQ0o7O1VBRUQsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztXQUNwRDs7U0FFRjs7Ozs7Ozs7Ozs7UUFXRCxRQUFRLEVBQUUsV0FBVzs7VUFFbkIsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ3JDLGFBQWEsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1lBQ2xDLGFBQWEsQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLG9CQUFvQixDQUFDO1dBQzNEOztVQUVELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQztXQUNuRTs7VUFFRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7O1VBRWpCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLFNBQVMsTUFBTSxFQUFFO1lBQ2xFLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Y0FDekMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3BCO1lBQ0QsSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO2NBQ25ELEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDeEM7V0FDRixDQUFDLENBQUM7O1VBRUgsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFOztZQUVsQixRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztXQUM1Qjs7U0FFRjs7Ozs7O1FBTUQsT0FBTyxFQUFFLFdBQVc7VUFDbEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO1VBQ2YsT0FBTyxHQUFHLENBQUMsTUFBTSxFQUFFO1lBQ2pCLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO1dBQ2xCO1VBQ0QsT0FBTyxHQUFHLENBQUM7U0FDWjs7Ozs7OztRQU9ELGFBQWEsRUFBRSxXQUFXOztVQUV4QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDOztVQUV6QixRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7OztVQUc5QixJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOztZQUV2QyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7O1lBRTlCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFO2NBQ3hCLFFBQVEsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO2FBQzFCOztZQUVELFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDOztXQUUzRDs7VUFFRCxRQUFRLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztVQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsU0FBUyxPQUFPLEVBQUUsR0FBRyxFQUFFO1lBQ2pELFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO1dBQ2pELENBQUMsQ0FBQzs7VUFFSCxPQUFPLFFBQVEsQ0FBQzs7U0FFakI7O1FBRUQsSUFBSSxFQUFFLFdBQVc7O1VBRWYsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztXQUMzQjs7VUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7VUFDM0Qsa0JBQWtCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDOztTQUVqQzs7UUFFRCxNQUFNLEVBQUUsU0FBUyxVQUFVLEVBQUU7O1VBRTNCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTs7O1lBR3pCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztZQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQywyQkFBMkIsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzs7V0FFbEY7O1VBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7VUFDMUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7VUFDekIsZUFBZSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7O1NBRXpDOztRQUVELE1BQU0sRUFBRSxTQUFTLEdBQUcsRUFBRTs7VUFFcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFNBQVMsVUFBVSxFQUFFOztZQUVuRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7Y0FDbkMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDOUMsTUFBTTtjQUNMLGdCQUFnQixDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDckQ7V0FDRixFQUFFLElBQUksQ0FBQyxDQUFDOztVQUVULE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxTQUFTLE1BQU0sRUFBRTtZQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1dBQ3ZCLENBQUMsQ0FBQzs7VUFFSCxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1Isa0JBQWtCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1dBQzNDOzs7U0FHRjs7UUFFRCxNQUFNLEVBQUUsU0FBUyxVQUFVLEVBQUU7O1VBRTNCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztVQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztVQUNsQyxJQUFJLElBQUksRUFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDOztTQUU1Qzs7T0FFRjs7R0FFSixDQUFDOztFQUVGLFNBQVMsR0FBRyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTs7SUFFMUMsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssU0FBUyxFQUFFO01BQ2xDLE1BQU0sSUFBSSxLQUFLLENBQUMsU0FBUyxHQUFHLE1BQU0sR0FBRyxxQkFBcUIsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUM7S0FDL0U7O0lBRUQsSUFBSSxVQUFVLENBQUM7O0lBRWYsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFOztNQUVoQixVQUFVLEdBQUcsSUFBSSxlQUFlLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDOztLQUVwRCxNQUFNOztNQUVMLElBQUksV0FBVyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7TUFDL0QsVUFBVSxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7O0tBRXhEOztJQUVELElBQUksTUFBTSxDQUFDLE1BQU0sWUFBWSxVQUFVLEVBQUU7TUFDdkMsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNwQzs7SUFFRCxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7O0lBRWxDLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQzs7SUFFekMsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQztJQUNwQyxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7O0lBRXJDLElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixTQUFTLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7SUFFN0MsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztJQUUvQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUMzQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxPQUFPLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDOztJQUUvQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDOztJQUV2QyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzs7SUFFbkMsT0FBTyxVQUFVLENBQUM7O0dBRW5COzs7Ozs7Ozs7RUFTRCxTQUFTLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRTtJQUNsQyxJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLElBQUksR0FBRyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsSUFBSSxRQUFRLEVBQUU7TUFDWixHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzFDLE1BQU07TUFDTCxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUMxQjtJQUNELEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNmLE9BQU8sRUFBRSxDQUFDO0dBQ1g7O0VBRUQsU0FBUyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRTs7SUFFOUMsVUFBVSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7SUFDckIsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7O0lBRXZCLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFOztNQUV4QixPQUFPLEVBQUUsU0FBUyxPQUFPLEVBQUU7O1FBRXpCLElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7VUFDeEIsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDOztVQUVwQixPQUFPLEdBQUc7Y0FDTixHQUFHO2NBQ0gsVUFBVSxDQUFDLE1BQU07Y0FDakIsVUFBVSxDQUFDLFFBQVE7Y0FDbkI7Z0JBQ0UsTUFBTSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCO2dCQUMxQyxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2VBQ3pDO1dBQ0osQ0FBQzs7U0FFSDs7UUFFRCxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtVQUN2RCxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7O1VBRXBCLE9BQU8sR0FBRztjQUNOLEdBQUc7Y0FDSCxVQUFVLENBQUMsTUFBTTtjQUNqQixVQUFVLENBQUMsUUFBUTtjQUNuQjtnQkFDRSxNQUFNLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxrQkFBa0I7Z0JBQzFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQztlQUN2QjtXQUNKLENBQUM7O1NBRUg7O09BRUY7O01BRUQsSUFBSSxFQUFFLFNBQVMsQ0FBQyxFQUFFO1FBQ2hCLFVBQVUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNsRSxPQUFPLFVBQVUsQ0FBQztPQUNuQjs7TUFFRCxNQUFNLEVBQUUsV0FBVztRQUNqQixVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNwQyxPQUFPLFVBQVUsQ0FBQztPQUNuQjs7TUFFRCxNQUFNLEVBQUUsV0FBVztRQUNqQixVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNwQyxPQUFPLFVBQVUsQ0FBQztPQUNuQjs7S0FFRixDQUFDLENBQUM7OztJQUdILElBQUksVUFBVSxZQUFZLHNCQUFzQixFQUFFOztNQUVoRCxJQUFJLEdBQUcsR0FBRyxJQUFJLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLFFBQVE7VUFDcEUsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7O01BRS9FLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxlQUFlLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixDQUFDLEVBQUUsU0FBUyxNQUFNLEVBQUU7UUFDNUUsSUFBSSxFQUFFLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVCLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQixVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFdBQVc7VUFDNUMsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1VBQ2pELEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1VBQzNCLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7VUFDNUI7T0FDRixDQUFDLENBQUM7O01BRUgsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7TUFDL0IsVUFBVSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUM7O0tBRTdGO1NBQ0ksSUFBSSxVQUFVLFlBQVksbUJBQW1CLEVBQUU7O01BRWxELElBQUksQ0FBQyxHQUFHLFNBQVMsUUFBUSxFQUFFOzs7UUFHekIsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRTs7O1VBRzFFLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztVQUNwQixPQUFPLEdBQUc7Y0FDTixHQUFHO2NBQ0gsVUFBVSxDQUFDLE1BQU07Y0FDakIsVUFBVSxDQUFDLFFBQVE7Y0FDbkI7Z0JBQ0UsTUFBTSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCO2dCQUMxQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQztlQUNyRSxDQUFDLENBQUM7O1NBRVI7O1FBRUQsT0FBTyxRQUFRLENBQUM7O09BRWpCLENBQUM7O01BRUYsVUFBVSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7TUFDbkQsVUFBVSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7O0tBRXBEO1NBQ0ksSUFBSSxVQUFVLFlBQVksaUJBQWlCLEVBQUU7O01BRWhELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxXQUFXO1FBQy9CLEdBQUcsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztPQUMvQyxDQUFDLENBQUM7O01BRUgsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUMsRUFBRTtRQUNuRCxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7T0FDckIsRUFBQzs7S0FFSDtTQUNJLElBQUksVUFBVSxZQUFZLGtCQUFrQixFQUFFOztNQUVqRCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsV0FBVztRQUMvQixHQUFHLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7T0FDN0MsQ0FBQyxDQUFDOztNQUVILEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFdBQVcsRUFBRSxXQUFXO1FBQ25DLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztPQUM1QyxDQUFDLENBQUM7O01BRUgsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLFdBQVc7UUFDbEMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO09BQy9DLENBQUMsQ0FBQzs7S0FFSjtTQUNJLElBQUksVUFBVSxZQUFZLGVBQWUsRUFBRTs7TUFFOUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7TUFDMUIsVUFBVSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ3BELEVBQUUsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDekQsT0FBTyxDQUFDLENBQUM7T0FDVixFQUFFLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7TUFFN0IsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDOztLQUU1Qjs7SUFFRCxVQUFVLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7TUFDL0MsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsZUFBZSxJQUFJLFVBQVUsQ0FBQyxVQUFVLEVBQUUsRUFBRTtRQUM1RCxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7T0FDekM7TUFDRCxPQUFPLENBQUMsQ0FBQztLQUNWLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztHQUV6Qjs7RUFFRCxTQUFTLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUU7OztJQUd6QyxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7Ozs7SUFJekIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7OztJQUd4RSxJQUFJLGFBQWEsSUFBSSxDQUFDLENBQUMsRUFBRTs7O01BR3ZCLElBQUksY0FBYztVQUNkLElBQUksQ0FBQyxzQ0FBc0MsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7OztNQUkvRCxJQUFJLGNBQWMsS0FBSyxTQUFTLEVBQUU7UUFDaEMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsc0NBQXNDLENBQUMsYUFBYSxDQUFDO1lBQ3RELGNBQWMsQ0FBQztPQUNwQjs7O01BR0QsY0FBYyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxVQUFVLENBQUM7OztNQUdqRCxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7O1FBRXJDLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDOzs7UUFHdEMsSUFBSSxNQUFNLENBQUM7O1FBRVgsSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFOztVQUUxQixNQUFNLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7U0FFakMsTUFBTSxJQUFJLFVBQVUsQ0FBQywyQkFBMkIsQ0FBQyxFQUFFOzs7VUFHbEQsTUFBTSxHQUFHLFVBQVUsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDOztTQUVsRCxNQUFNOzs7O1VBSUwsT0FBTzs7U0FFUjs7OztRQUlELElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQzs7O1lBR3JCLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssU0FBUyxFQUFFOzs7VUFHNUQsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7O1VBR3ZELFVBQVUsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1VBQ2hDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7O1NBRTVCOztPQUVGOztLQUVGOztHQUVGOztFQUVELFNBQVMsbUJBQW1CLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTs7SUFFckMsT0FBTyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDOztHQUUzQzs7RUFFRCxTQUFTLFdBQVcsQ0FBQyxHQUFHLEVBQUU7O0lBRXhCLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7SUFFeEQsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDOztJQUV6QyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzs7SUFFaEQsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7O0lBRTlCLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0MsS0FBSyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7SUFDM0IsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsY0FBYyxDQUFDLENBQUM7OztJQUdwQyxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO0lBQzFCLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQy9CLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDOztJQUU3QixJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQzFCLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDOztJQUVqQyxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO0lBQzdCLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDOztJQUVoQyxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7O0lBRXBFLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTs7TUFFbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxTQUFTLEtBQUssRUFBRSxHQUFHLEVBQUU7UUFDcEQsZUFBZSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztPQUM5QyxDQUFDLENBQUM7O0tBRUosTUFBTTtNQUNMLGVBQWUsQ0FBQyxHQUFHLEVBQUUsMkJBQTJCLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDMUQ7O0lBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVc7OztNQUdwQyxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDL0QsR0FBRyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUM7T0FDekU7O01BRUQsR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDOztLQUV6QixDQUFDLENBQUM7O0lBRUgsR0FBRyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QixHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZCLEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6QixHQUFHLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztJQUV6QixJQUFJLHNCQUFzQixFQUFFOztNQUUxQixJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLENBQUM7TUFDN0QsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOztNQUUxRCxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7O01BRXBDLElBQUksb0JBQW9CLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOztNQUV2RSxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDLEtBQUssTUFBTSxFQUFFO1FBQ3hFLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7T0FDekQ7O01BRUQsU0FBUyxlQUFlLEdBQUc7UUFDekIsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLGVBQWUsR0FBRyxPQUFPLEdBQUcsTUFBTSxDQUFDO09BQ2hFOztNQUVELGVBQWUsRUFBRSxDQUFDOzs7TUFHbEIsR0FBRyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsV0FBVztRQUNsRCxHQUFHLENBQUMsZUFBZSxHQUFHLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQztRQUMzQyxlQUFlLEVBQUUsQ0FBQztPQUNuQixDQUFDLENBQUM7O0tBRUo7O0lBRUQsSUFBSSxzQkFBc0IsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLENBQUM7O0lBRTNFLEdBQUcsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxFQUFFO01BQ3RELElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxFQUFFO1FBQ3BELGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztPQUN0QjtLQUNGLENBQUMsQ0FBQzs7SUFFSCxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsV0FBVztNQUNsQyxzQkFBc0IsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO01BQ3JGLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztNQUNyQixzQkFBc0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztNQUMvQixzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNqQyxDQUFDLENBQUM7O0lBRUgsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFdBQVc7TUFDbkMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ1osQ0FBQyxDQUFDOztJQUVILEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxXQUFXO01BQ3BDLElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO01BQ3BELElBQUksVUFBVSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDeEMsQ0FBQyxDQUFDOztJQUVILEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxXQUFXO01BQ3BDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNkLENBQUMsQ0FBQzs7OztHQUlKOztFQUVELFNBQVMsZUFBZSxDQUFDLEdBQUcsRUFBRTs7SUFFNUIsR0FBRyxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDOztJQUVwRCxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFOztNQUV2QyxLQUFLLEVBQUUsS0FBSztNQUNaLFVBQVUsRUFBRSxNQUFNO01BQ2xCLE1BQU0sRUFBRSxPQUFPO01BQ2YsTUFBTSxFQUFFLFdBQVc7TUFDbkIsUUFBUSxFQUFFLFVBQVU7OztLQUdyQixDQUFDLENBQUM7O0lBRUgsSUFBSSxPQUFPLENBQUM7O0lBRVosR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN0RCxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDOztJQUVwRCxHQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQzs7SUFFbkYsU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFFOztNQUVwQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7O01BRW5CLE9BQU8sR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDOztNQUVwQixHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO01BQ2hELEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztNQUNwQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7O01BRXRDLE9BQU8sS0FBSyxDQUFDOztLQUVkOztJQUVELFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRTs7TUFFZixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7O01BRW5CLEdBQUcsQ0FBQyxLQUFLLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7TUFDakMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO01BQ2YsT0FBTyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7O01BRXBCLE9BQU8sS0FBSyxDQUFDOztLQUVkOztJQUVELFNBQVMsUUFBUSxHQUFHOztNQUVsQixHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO01BQ25ELEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztNQUN0QyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7O0tBRXpDOztHQUVGOztFQUVELFNBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUU7SUFDeEIsR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7OztJQUd0QyxJQUFJLEdBQUcsQ0FBQyxVQUFVLElBQUksR0FBRyxDQUFDLFNBQVMsRUFBRTtNQUNuQyxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztLQUN2QyxJQUFJLEdBQUcsQ0FBQyxhQUFhLEVBQUU7TUFDdEIsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7S0FDMUM7R0FDRjs7RUFFRCxTQUFTLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRTs7SUFFL0MsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDOzs7SUFHbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsU0FBUyxHQUFHLEVBQUUsS0FBSyxFQUFFOztNQUV4RCxJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7OztNQUd0QixJQUFJLGNBQWM7VUFDZCxHQUFHLENBQUMsc0NBQXNDLENBQUMsS0FBSyxDQUFDLENBQUM7OztNQUd0RCxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxTQUFTLFVBQVUsRUFBRSxRQUFRLEVBQUU7UUFDekQsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO09BQzdGLENBQUMsQ0FBQzs7O01BR0gsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLFlBQVksQ0FBQzs7S0FFaEMsQ0FBQyxDQUFDOztJQUVILE9BQU8sUUFBUSxDQUFDOztHQUVqQjs7RUFFRCxTQUFTLGVBQWUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTtJQUMvQyxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ2pCLEdBQUcsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JDLElBQUksV0FBVyxFQUFFO01BQ2YsR0FBRyxDQUFDLGVBQWUsQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0tBQ3BFO0dBQ0Y7O0VBRUQsU0FBUyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUU7SUFDakMsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO01BQy9ELElBQUksR0FBRyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtRQUNsRCxHQUFHLENBQUMsZUFBZSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7T0FDM0M7S0FDRjtHQUNGOztFQUVELFNBQVMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRTtJQUN6QyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7O0lBRWpFLElBQUksUUFBUSxFQUFFO01BQ1osR0FBRyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztLQUNqQyxNQUFNO01BQ0wsR0FBRyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO0tBQzNCO0dBQ0Y7O0VBRUQsU0FBUyxjQUFjLENBQUMsZUFBZSxFQUFFOzs7SUFHdkMsSUFBSSxlQUFlLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTs7TUFFL0IscUJBQXFCLENBQUMsV0FBVztRQUMvQixjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7T0FDakMsQ0FBQyxDQUFDOztLQUVKOztJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFNBQVMsQ0FBQyxFQUFFO01BQ3ZDLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztLQUNuQixDQUFDLENBQUM7O0dBRUo7O0VBRUQsT0FBTyxHQUFHLENBQUM7O0NBRVosRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUc7QUFDaEIsZ3JCQUFnckI7QUFDaHJCLDJ2S0FBMnZLO0FBQzN2SyxHQUFHLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBRyxDQUFDLFVBQVUsZ0JBQWdCLEVBQUUsbUJBQW1CLEVBQUUsc0JBQXNCLEVBQUUsZ0JBQWdCLEVBQUUsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxFQUFFOztNQUUvSixPQUFPLFNBQVMsTUFBTSxFQUFFLFFBQVEsRUFBRTs7UUFFaEMsSUFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7UUFHcEMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7VUFDakUsT0FBTyxJQUFJLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0Q7Ozs7UUFJRCxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7O1VBRWpDLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFOzs7WUFHbEUsT0FBTyxJQUFJLHNCQUFzQixDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztXQUVqRixNQUFNOztZQUVMLE9BQU8sSUFBSSxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7V0FFNUY7O1NBRUY7O1FBRUQsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO1VBQ2pDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDL0M7O1FBRUQsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFO1VBQ25DLE9BQU8sSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3JEOztRQUVELElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRTtVQUNsQyxPQUFPLElBQUksaUJBQWlCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ2hEOztPQUVGOztLQUVGLEVBQUUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0I7QUFDdkMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxtQkFBbUI7QUFDbkMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxzQkFBc0I7QUFDdEMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLFVBQVUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUU7Ozs7Ozs7Ozs7OztFQVlyRSxJQUFJLGdCQUFnQixHQUFHLFNBQVMsTUFBTSxFQUFFLFFBQVEsRUFBRTs7SUFFaEQsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDOztJQUV6RCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7O0lBRWpCLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7O0lBRTFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDMUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMzQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUU7TUFDNUMsSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLEVBQUUsRUFBRTtRQUNwQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7T0FDYjtLQUNGLENBQUMsQ0FBQzs7O0lBR0gsU0FBUyxRQUFRLEdBQUc7TUFDbEIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3JDOztJQUVELFNBQVMsTUFBTSxHQUFHO01BQ2hCLElBQUksS0FBSyxDQUFDLGdCQUFnQixFQUFFO1FBQzFCLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO09BQ3REO0tBQ0Y7O0lBRUQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOztJQUVyQixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7O0dBRTNDLENBQUM7O0VBRUYsZ0JBQWdCLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQzs7RUFFekMsTUFBTSxDQUFDLE1BQU07O01BRVQsZ0JBQWdCLENBQUMsU0FBUztNQUMxQixVQUFVLENBQUMsU0FBUzs7TUFFcEI7O1FBRUUsYUFBYSxFQUFFLFdBQVc7OztVQUd4QixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1dBQ3RDO1VBQ0QsT0FBTyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdkU7O09BRUY7O0dBRUosQ0FBQzs7RUFFRixPQUFPLGdCQUFnQixDQUFDOztDQUV6QixFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsVUFBVTtBQUM3QixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUc7QUFDWCxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztBQUNqQixHQUFHLENBQUMsV0FBVyxDQUFDLGtCQUFrQjtBQUNsQyxHQUFHLENBQUMsV0FBVyxDQUFDLGlCQUFpQjtBQUNqQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztBQUNqQixHQUFHLENBQUMsV0FBVyxDQUFDLFVBQVU7QUFDMUIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUI7QUFDakMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0I7QUFDbEMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxtQkFBbUI7QUFDbkMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxzQkFBc0I7QUFDdEMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0I7QUFDaEMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxlQUFlLEdBQUcsQ0FBQyxVQUFVLFVBQVUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7O0VBRXRGLElBQUksZUFBZSxHQUFHLFNBQVMsTUFBTSxFQUFFLFFBQVEsRUFBRTs7SUFFL0MsZUFBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQzs7SUFFeEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUMxQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOztJQUUzQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7O0lBRWpCLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7SUFFaEQsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDOztJQUUzQyxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDOztJQUV2QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4RCxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxHQUFHLGtCQUFrQixDQUFDOztJQUV2RCxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDO0lBQzNDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxZQUFZLENBQUM7O0lBRXhDLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7O0lBRXZDLElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRCxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUM7O0lBRXpDLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7SUFDM0IsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFlBQVksQ0FBQzs7SUFFdkMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsRUFBRTtNQUM1QyxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssRUFBRSxFQUFFO1FBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7T0FDbkI7S0FDRixDQUFDLENBQUM7O0lBRUgsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQzs7SUFFdkMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUMsRUFBRTs7TUFFakQsR0FBRztTQUNBLFFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDO1NBQ3RCLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxFQUFFO1VBQ25DLEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUMzQyxDQUFDLENBQUM7O0tBRU4sQ0FBQyxDQUFDOztJQUVILElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7O0lBRWhELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUU7TUFDbkMsS0FBSyxFQUFFLE9BQU87TUFDZCxNQUFNLEVBQUUsT0FBTztNQUNmLE9BQU8sRUFBRSxLQUFLO01BQ2QsZUFBZSxFQUFFLE1BQU07TUFDdkIsU0FBUyxFQUFFLDZCQUE2QjtLQUN6QyxDQUFDLENBQUM7O0lBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRTtNQUNyQyxRQUFRLEVBQUUsVUFBVTtNQUNwQixLQUFLLEVBQUUsTUFBTTtNQUNiLE1BQU0sRUFBRSxNQUFNO01BQ2QsTUFBTSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQztNQUMxRSxTQUFTLEVBQUUsNkJBQTZCO01BQ3hDLFlBQVksRUFBRSxNQUFNO01BQ3BCLE1BQU0sRUFBRSxDQUFDO0tBQ1YsQ0FBQyxDQUFDOztJQUVILE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUU7TUFDbkMsUUFBUSxFQUFFLFVBQVU7TUFDcEIsS0FBSyxFQUFFLE1BQU07TUFDYixNQUFNLEVBQUUsS0FBSztNQUNiLFdBQVcsRUFBRSxnQkFBZ0I7TUFDN0IsTUFBTSxFQUFFLENBQUM7S0FDVixDQUFDLENBQUM7O0lBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFO01BQzNDLEtBQUssRUFBRSxPQUFPO01BQ2QsTUFBTSxFQUFFLE9BQU87TUFDZixNQUFNLEVBQUUsZ0JBQWdCO01BQ3hCLFdBQVcsRUFBRSxLQUFLO01BQ2xCLE9BQU8sRUFBRSxjQUFjO01BQ3ZCLE1BQU0sRUFBRSxTQUFTO0tBQ2xCLENBQUMsQ0FBQzs7SUFFSCxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7TUFDL0IsS0FBSyxFQUFFLE1BQU07TUFDYixNQUFNLEVBQUUsTUFBTTtNQUNkLFVBQVUsRUFBRSxNQUFNO0tBQ25CLENBQUMsQ0FBQzs7SUFFSCxjQUFjLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUM7O0lBRTVELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7TUFDcEMsS0FBSyxFQUFFLE1BQU07TUFDYixNQUFNLEVBQUUsT0FBTztNQUNmLE9BQU8sRUFBRSxjQUFjO01BQ3ZCLE1BQU0sRUFBRSxnQkFBZ0I7TUFDeEIsTUFBTSxFQUFFLFdBQVc7S0FDcEIsQ0FBQyxDQUFDOztJQUVILFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7O0lBRTlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7TUFDaEMsT0FBTyxFQUFFLE1BQU07O01BRWYsU0FBUyxFQUFFLFFBQVE7OztNQUduQixLQUFLLEVBQUUsTUFBTTtNQUNiLE1BQU0sRUFBRSxDQUFDO01BQ1QsVUFBVSxFQUFFLE1BQU07TUFDbEIsVUFBVSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxpQkFBaUI7S0FDeEQsQ0FBQyxDQUFDOztJQUVILEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUMxRCxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDOztJQUVwRCxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLFNBQVMsQ0FBQyxFQUFFO01BQ2xELElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUNSLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztNQUNwQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDdEMsQ0FBQyxDQUFDOztJQUVILFNBQVMsU0FBUyxDQUFDLENBQUMsRUFBRTtNQUNwQixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7O01BRVQsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO01BQ3JDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztLQUN2Qzs7SUFFRCxTQUFTLFFBQVEsR0FBRztNQUNsQixHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7TUFDdkMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDOztLQUV6Qzs7SUFFRCxTQUFTLE1BQU0sR0FBRztNQUNoQixJQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO01BQzlCLElBQUksQ0FBQyxLQUFLLEtBQUssRUFBRTtRQUNmLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUMxQixLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztPQUM1QyxNQUFNO1FBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO09BQ3ZDO0tBQ0Y7O0lBRUQsU0FBUyxPQUFPLEdBQUc7TUFDakIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO01BQ3RDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUN4Qzs7SUFFRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pELElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNyRCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDOUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztJQUU5QyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztJQUU3QyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7O0lBRXJCLFNBQVMsS0FBSyxDQUFDLENBQUMsRUFBRTs7TUFFaEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDOztNQUVuQixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO01BQy9DLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7TUFDaEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDO01BQzVELElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUM7O01BRTlELElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1dBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7O01BRXRCLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1dBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7O01BRXRCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztNQUNwQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7O01BRXBCLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDOzs7TUFHM0MsT0FBTyxLQUFLLENBQUM7O0tBRWQ7O0lBRUQsU0FBUyxJQUFJLENBQUMsQ0FBQyxFQUFFOztNQUVmLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7TUFFbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7TUFDekMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7TUFDekMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQzs7TUFFOUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7V0FDWixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7TUFFdEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQzs7TUFFMUIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7O01BRTNDLE9BQU8sS0FBSyxDQUFDOztLQUVkOztHQUVGLENBQUM7O0VBRUYsZUFBZSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7O0VBRXhDLE1BQU0sQ0FBQyxNQUFNOztNQUVULGVBQWUsQ0FBQyxTQUFTO01BQ3pCLFVBQVUsQ0FBQyxTQUFTOztNQUVwQjs7UUFFRSxhQUFhLEVBQUUsV0FBVzs7VUFFeEIsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDOztVQUVuQyxJQUFJLENBQUMsS0FBSyxLQUFLLEVBQUU7O1lBRWYsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDOzs7O1lBSXJCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxTQUFTLFNBQVMsRUFBRTtjQUNoRCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7a0JBQ2pDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztrQkFDcEQsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUNwRCxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUNoQixPQUFPLEVBQUUsQ0FBQztlQUNYO2FBQ0YsRUFBRSxJQUFJLENBQUMsQ0FBQzs7OztZQUlULElBQUksUUFBUSxFQUFFO2NBQ1osTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQzthQUN4Qzs7V0FFRjs7VUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7O1VBRXpELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7VUFFbEIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7VUFDbEUsSUFBSSxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQzs7VUFFdkIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRTtZQUNyQyxVQUFVLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJO1lBQzNDLFNBQVMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUk7WUFDaEQsZUFBZSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQ3ZDLE1BQU0sRUFBRSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsTUFBTSxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLEVBQUUsR0FBRztXQUNoRixDQUFDLENBQUM7O1VBRUgsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsS0FBSTs7VUFFekUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1VBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7VUFFbEIsY0FBYyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzs7VUFFaEYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtZQUNoQyxlQUFlLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDN0QsS0FBSyxFQUFFLE1BQU0sR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxFQUFFLEdBQUc7WUFDbkQsVUFBVSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxPQUFPLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLEtBQUssRUFBRSxNQUFNO1dBQzFGLENBQUMsQ0FBQzs7U0FFSjs7T0FFRjs7R0FFSixDQUFDOztFQUVGLElBQUksT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDOztFQUVuRCxTQUFTLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDckMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsTUFBTSxFQUFFO01BQ3BDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLGNBQWMsR0FBRyxNQUFNLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUM7S0FDdEcsQ0FBQyxDQUFDO0dBQ0o7O0VBRUQsU0FBUyxXQUFXLENBQUMsSUFBSSxFQUFFO0lBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxxSUFBb0k7SUFDMUosSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksa0lBQWlJO0lBQ3ZKLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLDZIQUE0SDtJQUNsSixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSw4SEFBNkg7SUFDbkosSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksMEhBQXlIO0dBQ2hKOzs7RUFHRCxPQUFPLGVBQWUsQ0FBQzs7Q0FFeEIsRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLFVBQVU7QUFDN0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHO0FBQ1gsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxVQUFVLFNBQVMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTs7RUFFOUQsSUFBSSxLQUFLLEdBQUcsV0FBVzs7SUFFckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQzs7SUFFaEQsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLEtBQUssRUFBRTtNQUMxQixNQUFNLHFDQUFxQyxDQUFDO0tBQzdDOztJQUVELElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7O0dBR3RDLENBQUM7O0VBRUYsS0FBSyxDQUFDLFVBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzs7RUFFdkQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFOztJQUU3QixRQUFRLEVBQUUsV0FBVztNQUNuQixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN2Qjs7SUFFRCxVQUFVLEVBQUUsV0FBVztNQUNyQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM1Qzs7R0FFRixDQUFDLENBQUM7O0VBRUgsa0JBQWtCLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDNUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDNUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0VBRTVDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDekMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztFQUN6QyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDOztFQUV6QyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFOztJQUUxQyxHQUFHLEVBQUUsV0FBVztNQUNkLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7S0FDdkI7O0lBRUQsR0FBRyxFQUFFLFNBQVMsQ0FBQyxFQUFFO01BQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3BCOztHQUVGLENBQUMsQ0FBQzs7RUFFSCxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFOztJQUU1QyxHQUFHLEVBQUUsV0FBVzs7TUFFZCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssS0FBSyxFQUFFO1FBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztPQUM1RDs7TUFFRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDOztLQUV6Qjs7SUFFRCxHQUFHLEVBQUUsU0FBUyxDQUFDLEVBQUU7O01BRWYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO01BQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQzs7S0FFdEI7O0dBRUYsQ0FBQyxDQUFDOztFQUVILFNBQVMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRTs7SUFFaEUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFOztNQUV2QyxHQUFHLEVBQUUsV0FBVzs7UUFFZCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBRTtVQUNoQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDaEM7O1FBRUQsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsaUJBQWlCLENBQUMsQ0FBQzs7UUFFbkQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztPQUVoQzs7TUFFRCxHQUFHLEVBQUUsU0FBUyxDQUFDLEVBQUU7O1FBRWYsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxLQUFLLEVBQUU7VUFDaEMsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztVQUNuRCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDNUI7O1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7O09BRTdCOztLQUVGLENBQUMsQ0FBQzs7R0FFSjs7RUFFRCxTQUFTLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUU7O0lBRTdDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRTs7TUFFdkMsR0FBRyxFQUFFLFdBQVc7O1FBRWQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxLQUFLO1VBQzlCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7UUFFakMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDOztRQUVyQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7O09BRWhDOztNQUVELEdBQUcsRUFBRSxTQUFTLENBQUMsRUFBRTs7UUFFZixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBRTtVQUNoQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7VUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1NBQzVCOztRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztPQUU3Qjs7S0FFRixDQUFDLENBQUM7O0dBRUo7O0VBRUQsU0FBUyxjQUFjLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRTs7SUFFM0QsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxLQUFLLEVBQUU7O01BRWpDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDLENBQUM7O0tBRTFGLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxLQUFLLEVBQUU7O01BRXhDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7S0FFbEcsTUFBTTs7TUFFTCxNQUFNLHVCQUF1QixDQUFDOztLQUUvQjs7R0FFRjs7RUFFRCxTQUFTLGNBQWMsQ0FBQyxLQUFLLEVBQUU7O0lBRTdCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7SUFFeEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTztRQUN2QjtVQUNFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztVQUNYLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNaO0tBQ0osQ0FBQzs7SUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7TUFDM0IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztLQUM1QixNQUFNLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO01BQzlDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNyQjs7R0FFRjs7RUFFRCxPQUFPLEtBQUssQ0FBQzs7Q0FFZCxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUztBQUN0QixHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLFlBQVk7O0VBRTVCLElBQUksWUFBWSxDQUFDOztFQUVqQixPQUFPOztJQUVMLFVBQVUsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFOztNQUU1QixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7O01BRWhDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7TUFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztNQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDcEMsSUFBSSxDQUFDLEdBQUc7UUFDTixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDVCxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7T0FDVixDQUFDLEVBQUUsQ0FBQyxDQUFDOztNQUVOLE9BQU87UUFDTCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUc7UUFDYixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUc7UUFDYixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUc7T0FDZCxDQUFDOztLQUVIOztJQUVELFVBQVUsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFOztNQUU1QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1VBQ3ZCLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1VBQ3ZCLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRztVQUNqQixDQUFDLEVBQUUsQ0FBQyxDQUFDOztNQUVULElBQUksR0FBRyxJQUFJLENBQUMsRUFBRTtRQUNaLENBQUMsR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDO09BQ2pCLE1BQU07UUFDTCxPQUFPO1VBQ0wsQ0FBQyxFQUFFLEdBQUc7VUFDTixDQUFDLEVBQUUsQ0FBQztVQUNKLENBQUMsRUFBRSxDQUFDO1NBQ0wsQ0FBQztPQUNIOztNQUVELElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRTtRQUNaLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDO09BQ3JCLE1BQU0sSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFO1FBQ25CLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQztPQUN6QixNQUFNO1FBQ0wsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDO09BQ3pCO01BQ0QsQ0FBQyxJQUFJLENBQUMsQ0FBQztNQUNQLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNULENBQUMsSUFBSSxDQUFDLENBQUM7T0FDUjs7TUFFRCxPQUFPO1FBQ0wsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHO1FBQ1YsQ0FBQyxFQUFFLENBQUM7UUFDSixDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUc7T0FDYixDQUFDO0tBQ0g7O0lBRUQsVUFBVSxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7TUFDNUIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7TUFDM0MsR0FBRyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO01BQ3pDLEdBQUcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztNQUN6QyxPQUFPLEdBQUcsQ0FBQztLQUNaOztJQUVELGtCQUFrQixFQUFFLFNBQVMsR0FBRyxFQUFFLGNBQWMsRUFBRTtNQUNoRCxPQUFPLENBQUMsR0FBRyxLQUFLLGNBQWMsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUM7S0FDN0M7O0lBRUQsa0JBQWtCLEVBQUUsU0FBUyxHQUFHLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRTtNQUN2RCxPQUFPLEtBQUssS0FBSyxZQUFZLEdBQUcsY0FBYyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDO0tBQ3hGOztHQUVGOztDQUVGLEdBQUc7QUFDSixHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVE7QUFDbEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7QUFDakIsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTO0FBQ25CLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQ2pCLEdBQUcsQ0FBQyxLQUFLLENBQUMscUJBQXFCLEdBQUcsQ0FBQyxZQUFZOzs7Ozs7O0VBTzdDLE9BQU8sTUFBTSxDQUFDLDJCQUEyQjtNQUNyQyxNQUFNLENBQUMsd0JBQXdCO01BQy9CLE1BQU0sQ0FBQyxzQkFBc0I7TUFDN0IsTUFBTSxDQUFDLHVCQUF1QjtNQUM5QixTQUFTLFFBQVEsRUFBRSxPQUFPLEVBQUU7O1FBRTFCLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQzs7T0FFeEMsQ0FBQztDQUNQLEdBQUc7QUFDSixHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxDQUFDLFVBQVUsR0FBRyxFQUFFLE1BQU0sRUFBRTs7O0VBRzVDLElBQUksV0FBVyxHQUFHLFdBQVc7O0lBRTNCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRTtNQUMxQyxlQUFlLEVBQUUsaUJBQWlCO01BQ2xDLEdBQUcsRUFBRSxDQUFDO01BQ04sSUFBSSxFQUFFLENBQUM7TUFDUCxPQUFPLEVBQUUsTUFBTTtNQUNmLE1BQU0sRUFBRSxNQUFNO01BQ2QsT0FBTyxFQUFFLENBQUM7TUFDVixnQkFBZ0IsRUFBRSxxQkFBcUI7S0FDeEMsQ0FBQyxDQUFDOztJQUVILEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDM0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDOztJQUVoRCxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRTtNQUNuQyxRQUFRLEVBQUUsT0FBTztNQUNqQixPQUFPLEVBQUUsTUFBTTtNQUNmLE1BQU0sRUFBRSxNQUFNO01BQ2QsT0FBTyxFQUFFLENBQUM7TUFDVixnQkFBZ0IsRUFBRSxzREFBc0Q7S0FDekUsQ0FBQyxDQUFDOzs7SUFHSCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNsRCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7O0lBRTNDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztJQUNqQixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsV0FBVztNQUNuRCxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDZCxDQUFDLENBQUM7OztHQUdKLENBQUM7O0VBRUYsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsV0FBVzs7SUFFdEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDOzs7O0lBSWpCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzs7SUFFL0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN4QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDOztJQUVsQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsWUFBWSxDQUFDOztJQUVyRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7O0lBRWQsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXO01BQ3RCLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztNQUMxQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO01BQ25DLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUM7S0FDckQsQ0FBQyxDQUFDOztHQUVKLENBQUM7O0VBRUYsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsV0FBVzs7SUFFdEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDOztJQUVqQixJQUFJLElBQUksR0FBRyxXQUFXOztNQUVwQixLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO01BQ3hDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQzs7TUFFL0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLHFCQUFxQixFQUFFLElBQUksQ0FBQyxDQUFDO01BQzFELEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7TUFDcEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDOztLQUV0RCxDQUFDOztJQUVGLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxxQkFBcUIsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN2RCxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2pELEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQzs7SUFFbEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDOztJQUV6QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxZQUFZLENBQUM7O0dBRXRELENBQUM7O0VBRUYsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsV0FBVztJQUN4QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUM1RixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztHQUM5RixDQUFDOztFQUVGLEFBSUEsT0FBTyxXQUFXLENBQUM7O0NBRXBCLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHO0FBQ2QsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7QUFDakIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHO0FBQ1gsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdqSGpCLElBQUksR0FBRyxHQUFHLGNBQWMsR0FBRyxHQUFHLElBQUksRUFBRSxDQUFDOzs7QUFHckMsR0FBRyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQzs7O0FBRzVCLEdBQUcsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7O0FBRTVCLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsWUFBWTs7RUFFOUIsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7RUFDdkMsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7Ozs7Ozs7O0VBUXRDLE9BQU87O0lBRUwsS0FBSyxFQUFFLEVBQUU7O0lBRVQsTUFBTSxFQUFFLFNBQVMsTUFBTSxFQUFFOztNQUV2QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFLFNBQVMsR0FBRyxFQUFFOztRQUVwRCxLQUFLLElBQUksR0FBRyxJQUFJLEdBQUc7VUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7O09BRTVCLEVBQUUsSUFBSSxDQUFDLENBQUM7O01BRVQsT0FBTyxNQUFNLENBQUM7O0tBRWY7O0lBRUQsUUFBUSxFQUFFLFNBQVMsTUFBTSxFQUFFOztNQUV6QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFLFNBQVMsR0FBRyxFQUFFOztRQUVwRCxLQUFLLElBQUksR0FBRyxJQUFJLEdBQUc7VUFDakIsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMvQixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztPQUU1QixFQUFFLElBQUksQ0FBQyxDQUFDOztNQUVULE9BQU8sTUFBTSxDQUFDOztLQUVmOztJQUVELE9BQU8sRUFBRSxXQUFXO01BQ2xCLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDakMsT0FBTyxXQUFXO2NBQ2hCLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Y0FDckMsS0FBSyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUMxQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2VBQ3RDO2NBQ0QsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDaEI7S0FDUjs7SUFFRCxJQUFJLEVBQUUsU0FBUyxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRTs7O01BRzlCLElBQUksUUFBUSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFOztRQUV4QyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQzs7T0FFekIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7O1FBRXhDLEtBQUssSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFO1VBQzlDLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUs7WUFDN0QsT0FBTzs7T0FFWixNQUFNOztRQUVMLEtBQUssSUFBSSxHQUFHLElBQUksR0FBRztVQUNqQixJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSztZQUMvQyxPQUFPOztPQUVaOztLQUVGOztJQUVELEtBQUssRUFBRSxTQUFTLEdBQUcsRUFBRTtNQUNuQixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ3BCOztJQUVELE9BQU8sRUFBRSxTQUFTLEdBQUcsRUFBRTtNQUNyQixJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7TUFDdEMsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzVCOztJQUVELFdBQVcsRUFBRSxTQUFTLEdBQUcsRUFBRTtNQUN6QixPQUFPLEdBQUcsS0FBSyxTQUFTLENBQUM7S0FDMUI7O0lBRUQsTUFBTSxFQUFFLFNBQVMsR0FBRyxFQUFFO01BQ3BCLE9BQU8sR0FBRyxLQUFLLElBQUksQ0FBQztLQUNyQjs7SUFFRCxLQUFLLEVBQUUsU0FBUyxHQUFHLEVBQUU7TUFDbkIsT0FBTyxHQUFHLEtBQUssR0FBRyxDQUFDO0tBQ3BCOztJQUVELE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxJQUFJLFNBQVMsR0FBRyxFQUFFO01BQ3RDLE9BQU8sR0FBRyxDQUFDLFdBQVcsS0FBSyxLQUFLLENBQUM7S0FDbEM7O0lBRUQsUUFBUSxFQUFFLFNBQVMsR0FBRyxFQUFFO01BQ3RCLE9BQU8sR0FBRyxLQUFLLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUM1Qjs7SUFFRCxRQUFRLEVBQUUsU0FBUyxHQUFHLEVBQUU7TUFDdEIsT0FBTyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztLQUN0Qjs7SUFFRCxRQUFRLEVBQUUsU0FBUyxHQUFHLEVBQUU7TUFDdEIsT0FBTyxHQUFHLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQztLQUN2Qjs7SUFFRCxTQUFTLEVBQUUsU0FBUyxHQUFHLEVBQUU7TUFDdkIsT0FBTyxHQUFHLEtBQUssS0FBSyxJQUFJLEdBQUcsS0FBSyxJQUFJLENBQUM7S0FDdEM7O0lBRUQsVUFBVSxFQUFFLFNBQVMsR0FBRyxFQUFFO01BQ3hCLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLG1CQUFtQixDQUFDO0tBQ3BFOztHQUVGLENBQUM7O0NBRUgsR0FBRyxDQUFDOzs7QUFHTCxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxDQUFDLFVBQVUsTUFBTSxFQUFFOztFQUV0QyxPQUFPLFNBQVMsS0FBSyxFQUFFOztJQUVyQixJQUFJLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFOztNQUUvQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztNQUMvQixPQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ25CLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO09BQ2I7O01BRUQsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDOztLQUVoQixNQUFNOztNQUVMLE9BQU8sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDOztLQUVwSDs7R0FFRjs7Q0FFRixFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7OztBQUdyQixHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsVUFBVSxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUU7O0VBRTFFLElBQUksS0FBSyxHQUFHLFdBQVc7O0lBRXJCLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7O0lBRWhELElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxLQUFLLEVBQUU7TUFDMUIsTUFBTSxxQ0FBcUMsQ0FBQztLQUM3Qzs7SUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7OztHQUd0QyxDQUFDOztFQUVGLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7O0VBRXZELE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTs7SUFFN0IsUUFBUSxFQUFFLFdBQVc7TUFDbkIsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdkI7O0lBRUQsVUFBVSxFQUFFLFdBQVc7TUFDckIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDNUM7O0dBRUYsQ0FBQyxDQUFDOztFQUVILGtCQUFrQixDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQzVDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQzVDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDOztFQUU1QyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0VBQ3pDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDekMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQzs7RUFFekMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTs7SUFFMUMsR0FBRyxFQUFFLFdBQVc7TUFDZCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0tBQ3ZCOztJQUVELEdBQUcsRUFBRSxTQUFTLENBQUMsRUFBRTtNQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNwQjs7R0FFRixDQUFDLENBQUM7O0VBRUgsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRTs7SUFFNUMsR0FBRyxFQUFFLFdBQVc7O01BRWQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBRTtRQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7T0FDNUQ7O01BRUQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQzs7S0FFekI7O0lBRUQsR0FBRyxFQUFFLFNBQVMsQ0FBQyxFQUFFOztNQUVmLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztNQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7O0tBRXRCOztHQUVGLENBQUMsQ0FBQzs7RUFFSCxTQUFTLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUU7O0lBRWhFLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRTs7TUFFdkMsR0FBRyxFQUFFLFdBQVc7O1FBRWQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxLQUFLLEVBQUU7VUFDaEMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ2hDOztRQUVELGNBQWMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixDQUFDLENBQUM7O1FBRW5ELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7T0FFaEM7O01BRUQsR0FBRyxFQUFFLFNBQVMsQ0FBQyxFQUFFOztRQUVmLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssS0FBSyxFQUFFO1VBQ2hDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixDQUFDLENBQUM7VUFDbkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1NBQzVCOztRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztPQUU3Qjs7S0FFRixDQUFDLENBQUM7O0dBRUo7O0VBRUQsU0FBUyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFOztJQUU3QyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUU7O01BRXZDLEdBQUcsRUFBRSxXQUFXOztRQUVkLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssS0FBSztVQUM5QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7O1FBRWpDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7UUFFckIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztPQUVoQzs7TUFFRCxHQUFHLEVBQUUsU0FBUyxDQUFDLEVBQUU7O1FBRWYsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxLQUFLLEVBQUU7VUFDaEMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1VBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUM1Qjs7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7T0FFN0I7O0tBRUYsQ0FBQyxDQUFDOztHQUVKOztFQUVELFNBQVMsY0FBYyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUU7O0lBRTNELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssS0FBSyxFQUFFOztNQUVqQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDOztLQUUxRixNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssS0FBSyxFQUFFOztNQUV4QyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O0tBRWxHLE1BQU07O01BRUwsTUFBTSx1QkFBdUIsQ0FBQzs7S0FFL0I7O0dBRUY7O0VBRUQsU0FBUyxjQUFjLENBQUMsS0FBSyxFQUFFOztJQUU3QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7O0lBRXhELE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU87UUFDdkI7VUFDRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7VUFDWCxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDWjtLQUNKLENBQUM7O0lBRUYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO01BQzNCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDNUIsTUFBTSxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtNQUM5QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDckI7O0dBRUY7O0VBRUQsT0FBTyxLQUFLLENBQUM7O0NBRWQsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxDQUFDLFVBQVUsUUFBUSxFQUFFLE1BQU0sRUFBRTs7RUFFcEQsSUFBSSxNQUFNLEVBQUUsUUFBUSxDQUFDOztFQUVyQixJQUFJLFNBQVMsR0FBRyxXQUFXOztJQUV6QixRQUFRLEdBQUcsS0FBSyxDQUFDOztJQUVqQixJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7SUFFL0UsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsU0FBUyxNQUFNLEVBQUU7O01BRTVDLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRTs7UUFFM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLFNBQVMsVUFBVSxFQUFFLGNBQWMsRUFBRTs7VUFFbkUsTUFBTSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7O1VBRW5DLElBQUksUUFBUSxLQUFLLEtBQUssSUFBSSxNQUFNLEtBQUssS0FBSyxFQUFFO1lBQzFDLFFBQVEsR0FBRyxNQUFNLENBQUM7WUFDbEIsTUFBTSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7WUFDdkMsTUFBTSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDL0IsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDOztXQUVyQjs7U0FFRixDQUFDLENBQUM7O1FBRUgsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDOztPQUVyQjs7S0FFRixDQUFDLENBQUM7O0lBRUgsT0FBTyxRQUFRLENBQUM7O0dBRWpCLENBQUM7O0VBRUYsSUFBSSxlQUFlLEdBQUc7OztJQUdwQjs7TUFFRSxNQUFNLEVBQUUsTUFBTSxDQUFDLFFBQVE7O01BRXZCLFdBQVcsRUFBRTs7UUFFWCxjQUFjLEVBQUU7O1VBRWQsSUFBSSxFQUFFLFNBQVMsUUFBUSxFQUFFOztZQUV2QixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7WUFDaEUsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFLE9BQU8sS0FBSyxDQUFDOztZQUVoQyxPQUFPO2NBQ0wsS0FBSyxFQUFFLEtBQUs7Y0FDWixHQUFHLEVBQUUsUUFBUTtrQkFDVCxJQUFJO3NCQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO3NCQUN2QyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtzQkFDdkMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNqRCxDQUFDOztXQUVIOztVQUVELEtBQUssRUFBRSxRQUFROztTQUVoQjs7UUFFRCxZQUFZLEVBQUU7O1VBRVosSUFBSSxFQUFFLFNBQVMsUUFBUSxFQUFFOztZQUV2QixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDL0MsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFLE9BQU8sS0FBSyxDQUFDOztZQUVoQyxPQUFPO2NBQ0wsS0FBSyxFQUFFLEtBQUs7Y0FDWixHQUFHLEVBQUUsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDekMsQ0FBQzs7V0FFSDs7VUFFRCxLQUFLLEVBQUUsUUFBUTs7U0FFaEI7O1FBRUQsT0FBTyxFQUFFOztVQUVQLElBQUksRUFBRSxTQUFTLFFBQVEsRUFBRTs7WUFFdkIsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO1lBQ3RFLElBQUksSUFBSSxLQUFLLElBQUksRUFBRSxPQUFPLEtBQUssQ0FBQzs7WUFFaEMsT0FBTztjQUNMLEtBQUssRUFBRSxLQUFLO2NBQ1osQ0FBQyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Y0FDdEIsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Y0FDdEIsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdkIsQ0FBQzs7V0FFSDs7VUFFRCxLQUFLLEVBQUUsUUFBUTs7U0FFaEI7O1FBRUQsUUFBUSxFQUFFOztVQUVSLElBQUksRUFBRSxTQUFTLFFBQVEsRUFBRTs7WUFFdkIsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO1lBQ25GLElBQUksSUFBSSxLQUFLLElBQUksRUFBRSxPQUFPLEtBQUssQ0FBQzs7WUFFaEMsT0FBTztjQUNMLEtBQUssRUFBRSxLQUFLO2NBQ1osQ0FBQyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Y0FDdEIsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Y0FDdEIsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Y0FDdEIsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdkIsQ0FBQzs7V0FFSDs7VUFFRCxLQUFLLEVBQUUsUUFBUTs7U0FFaEI7O09BRUY7O0tBRUY7OztJQUdEOztNQUVFLE1BQU0sRUFBRSxNQUFNLENBQUMsUUFBUTs7TUFFdkIsV0FBVyxFQUFFOztRQUVYLEdBQUcsRUFBRTtVQUNILElBQUksRUFBRSxTQUFTLFFBQVEsRUFBRTtZQUN2QixPQUFPO2NBQ0wsS0FBSyxFQUFFLEtBQUs7Y0FDWixHQUFHLEVBQUUsUUFBUTtjQUNiLGNBQWMsRUFBRSxLQUFLO2FBQ3RCO1dBQ0Y7O1VBRUQsS0FBSyxFQUFFLFNBQVMsS0FBSyxFQUFFO1lBQ3JCLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQztXQUNsQjtTQUNGOztPQUVGOztLQUVGOzs7SUFHRDs7TUFFRSxNQUFNLEVBQUUsTUFBTSxDQUFDLE9BQU87O01BRXRCLFdBQVcsRUFBRTs7UUFFWCxTQUFTLEVBQUU7VUFDVCxJQUFJLEVBQUUsU0FBUyxRQUFRLEVBQUU7WUFDdkIsSUFBSSxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxPQUFPLEtBQUssQ0FBQztZQUN2QyxPQUFPO2NBQ0wsS0FBSyxFQUFFLEtBQUs7Y0FDWixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztjQUNkLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO2NBQ2QsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7YUFDZixDQUFDO1dBQ0g7O1VBRUQsS0FBSyxFQUFFLFNBQVMsS0FBSyxFQUFFO1lBQ3JCLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1dBQ3BDOztTQUVGOztRQUVELFVBQVUsRUFBRTtVQUNWLElBQUksRUFBRSxTQUFTLFFBQVEsRUFBRTtZQUN2QixJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFLE9BQU8sS0FBSyxDQUFDO1lBQ3ZDLE9BQU87Y0FDTCxLQUFLLEVBQUUsS0FBSztjQUNaLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO2NBQ2QsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7Y0FDZCxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztjQUNkLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO2FBQ2YsQ0FBQztXQUNIOztVQUVELEtBQUssRUFBRSxTQUFTLEtBQUssRUFBRTtZQUNyQixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1dBQzdDOztTQUVGOztPQUVGOztLQUVGOzs7SUFHRDs7TUFFRSxNQUFNLEVBQUUsTUFBTSxDQUFDLFFBQVE7O01BRXZCLFdBQVcsRUFBRTs7UUFFWCxRQUFRLEVBQUU7VUFDUixJQUFJLEVBQUUsU0FBUyxRQUFRLEVBQUU7WUFDdkIsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtjQUMvQixPQUFPO2dCQUNMLEtBQUssRUFBRSxLQUFLO2dCQUNaLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDYixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ2IsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNiLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztlQUNkO2FBQ0Y7WUFDRCxPQUFPLEtBQUssQ0FBQztXQUNkOztVQUVELEtBQUssRUFBRSxTQUFTLEtBQUssRUFBRTtZQUNyQixPQUFPO2NBQ0wsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2NBQ1YsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2NBQ1YsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2NBQ1YsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ1g7V0FDRjtTQUNGOztRQUVELE9BQU8sRUFBRTtVQUNQLElBQUksRUFBRSxTQUFTLFFBQVEsRUFBRTtZQUN2QixJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtjQUMvQixPQUFPO2dCQUNMLEtBQUssRUFBRSxLQUFLO2dCQUNaLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDYixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ2IsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2VBQ2Q7YUFDRjtZQUNELE9BQU8sS0FBSyxDQUFDO1dBQ2Q7O1VBRUQsS0FBSyxFQUFFLFNBQVMsS0FBSyxFQUFFO1lBQ3JCLE9BQU87Y0FDTCxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7Y0FDVixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7Y0FDVixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDWDtXQUNGO1NBQ0Y7O1FBRUQsUUFBUSxFQUFFO1VBQ1IsSUFBSSxFQUFFLFNBQVMsUUFBUSxFQUFFO1lBQ3ZCLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7Y0FDL0IsT0FBTztnQkFDTCxLQUFLLEVBQUUsS0FBSztnQkFDWixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ2IsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNiLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDYixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7ZUFDZDthQUNGO1lBQ0QsT0FBTyxLQUFLLENBQUM7V0FDZDs7VUFFRCxLQUFLLEVBQUUsU0FBUyxLQUFLLEVBQUU7WUFDckIsT0FBTztjQUNMLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztjQUNWLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztjQUNWLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztjQUNWLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUNYO1dBQ0Y7U0FDRjs7UUFFRCxPQUFPLEVBQUU7VUFDUCxJQUFJLEVBQUUsU0FBUyxRQUFRLEVBQUU7WUFDdkIsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7Y0FDL0IsT0FBTztnQkFDTCxLQUFLLEVBQUUsS0FBSztnQkFDWixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ2IsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNiLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztlQUNkO2FBQ0Y7WUFDRCxPQUFPLEtBQUssQ0FBQztXQUNkOztVQUVELEtBQUssRUFBRSxTQUFTLEtBQUssRUFBRTtZQUNyQixPQUFPO2NBQ0wsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2NBQ1YsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2NBQ1YsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ1g7V0FDRjs7U0FFRjs7T0FFRjs7S0FFRjs7O0dBR0YsQ0FBQzs7RUFFRixPQUFPLFNBQVMsQ0FBQzs7O0NBR2xCLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRO0FBQ3JCLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQ2pCLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsWUFBWTs7RUFFNUIsSUFBSSxZQUFZLENBQUM7O0VBRWpCLE9BQU87O0lBRUwsVUFBVSxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7O01BRTVCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7TUFFaEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztNQUNwQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO01BQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUNwQyxJQUFJLENBQUMsR0FBRztRQUNOLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDVCxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDVCxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztPQUNWLENBQUMsRUFBRSxDQUFDLENBQUM7O01BRU4sT0FBTztRQUNMLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRztRQUNiLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRztRQUNiLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRztPQUNkLENBQUM7O0tBRUg7O0lBRUQsVUFBVSxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7O01BRTVCLElBQUksR0FBRyxHQUFHLElBQUksQ0FB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
