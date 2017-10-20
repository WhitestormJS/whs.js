/* Built for whs v2.1.8-vrfix.3 */
import { AdditiveBlending, AlwaysDepth, BackSide, CustomBlending, DoubleSide, FlatShading, FrontSide, GreaterDepth, GreaterEqualDepth, LessDepth, LessEqualDepth, MultiplyBlending, NeverDepth, NoBlending, NormalBlending, NotEqualDepth, SmoothShading, SubtractiveBlending } from 'three';

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

  maps: {
    map: 'texture',
    alphaMap: 'texture',
    envMap: 'texture',
    lightMap: 'texture',
    lightMapIntensity: 'number'
  },

  normal: {
    normalMap: 'texture',
    normalScale: 'number'
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
  },

  specular: {
    specular: 'color',
    specularMap: 'texture'
  },

  ao: {
    aoMap: 'texture',
    aoMapIntensity: 'number'
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
    side: { FrontSide: FrontSide, BackSide: BackSide, DoubleSide: DoubleSide },
    shading: { SmoothShading: SmoothShading, FlatShading: FlatShading },
    blending: {
      NoBlending: NoBlending, NormalBlending: NormalBlending, AdditiveBlending: AdditiveBlending, SubtractiveBlending: SubtractiveBlending, MultiplyBlending: MultiplyBlending, CustomBlending: CustomBlending
    },
    depthFunc: {
      NeverDepth: NeverDepth, AlwaysDepth: AlwaysDepth, LessDepth: LessDepth, LessEqualDepth: LessEqualDepth, GreaterEqualDepth: GreaterEqualDepth, GreaterDepth: GreaterDepth, NotEqualDepth: NotEqualDepth
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
    color: 'color',
    skinning: 'boolean',
    morphTargets: 'boolean',
    morphNormals: 'boolean'
  }, 'emissive', 'refr', 'maps', 'normal', 'specular', 'ao'),

  MeshPhongMaterial: add({
    color: 'color',
    skinning: 'boolean',
    morphTargets: 'boolean',
    morphNormals: 'boolean'
  }, 'displacement', 'emissive', 'maps', 'refr', 'specular', 'ao'),

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
          // let range = '1' + '0'.repeat(value.toString().length);
          // if (value.toString().indexOf('.') !== -1) range = 1;

          instance.add(object, key).min(0).step(0.001).onChange(onChange);
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

        var lightParams = Object.assign({}, this.params);
        delete lightParams.position;
        delete lightParams.rotation;
        delete lightParams.shadow;

        self.foldObject(_light, lightParams, self.fold.addFolder('light'));

        if (_light.shadow) {
          var shadowFolder = self.fold.addFolder('shadow');
          self.foldObject(_light.shadow, this.params.shadow, shadowFolder);

          console.log(_light);

          shadowFolder.add(_light, 'castShadow');
        }

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

      var controller = this.gui.add(defineProperty({}, name, value), name, range[0] || 0, range[1] || 1);

      controller.onChange(onChange);
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

export default DatGUIModule;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0R1VJTW9kdWxlLm1vZHVsZS5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZXMvZXh0cmEvbm9kZV9tb2R1bGVzL2RhdC1ndWkvdmVuZG9yL2RhdC5ndWkuanMiLCIuLi9zcmMvbW9kdWxlcy9leHRyYS9ub2RlX21vZHVsZXMvZGF0LWd1aS92ZW5kb3IvZGF0LmNvbG9yLmpzIiwiLi4vc3JjL21vZHVsZXMvZXh0cmEvbm9kZV9tb2R1bGVzL2RhdC1ndWkvaW5kZXguanMiLCIuLi9zcmMvbW9kdWxlcy9leHRyYS9kYXRndWkvbWF0ZXJpYWxzLmpzIiwiLi4vc3JjL21vZHVsZXMvZXh0cmEvZGF0Z3VpL0RhdEFQSS5qcyIsIi4uL3NyYy9tb2R1bGVzL2V4dHJhL2RhdGd1aS9EYXRNZXNoTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvZXh0cmEvZGF0Z3VpL0RhdExpZ2h0TW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvZXh0cmEvZGF0Z3VpL0RhdENhbWVyYU1vZHVsZS5qcyIsIi4uL3NyYy9tb2R1bGVzL2V4dHJhL2RhdGd1aS9EYXRDdXN0b21Nb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9leHRyYS9EYXRHVUlNb2R1bGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBkYXQtZ3VpIEphdmFTY3JpcHQgQ29udHJvbGxlciBMaWJyYXJ5XG4gKiBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvZGF0LWd1aVxuICpcbiAqIENvcHlyaWdodCAyMDExIERhdGEgQXJ0cyBUZWFtLCBHb29nbGUgQ3JlYXRpdmUgTGFiXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICovXG5cbi8qKiBAbmFtZXNwYWNlICovXG52YXIgZGF0ID0gbW9kdWxlLmV4cG9ydHMgPSBkYXQgfHwge307XG5cbi8qKiBAbmFtZXNwYWNlICovXG5kYXQuZ3VpID0gZGF0Lmd1aSB8fCB7fTtcblxuLyoqIEBuYW1lc3BhY2UgKi9cbmRhdC51dGlscyA9IGRhdC51dGlscyB8fCB7fTtcblxuLyoqIEBuYW1lc3BhY2UgKi9cbmRhdC5jb250cm9sbGVycyA9IGRhdC5jb250cm9sbGVycyB8fCB7fTtcblxuLyoqIEBuYW1lc3BhY2UgKi9cbmRhdC5kb20gPSBkYXQuZG9tIHx8IHt9O1xuXG4vKiogQG5hbWVzcGFjZSAqL1xuZGF0LmNvbG9yID0gZGF0LmNvbG9yIHx8IHt9O1xuXG5kYXQudXRpbHMuY3NzID0gKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHtcbiAgICBsb2FkOiBmdW5jdGlvbiAodXJsLCBkb2MpIHtcbiAgICAgIGRvYyA9IGRvYyB8fCBkb2N1bWVudDtcbiAgICAgIHZhciBsaW5rID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICAgIGxpbmsudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICAgIGxpbmsuaHJlZiA9IHVybDtcbiAgICAgIGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKGxpbmspO1xuICAgIH0sXG4gICAgaW5qZWN0OiBmdW5jdGlvbihjc3MsIGRvYykge1xuICAgICAgZG9jID0gZG9jIHx8IGRvY3VtZW50O1xuICAgICAgdmFyIGluamVjdGVkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgIGluamVjdGVkLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgICAgaW5qZWN0ZWQuaW5uZXJIVE1MID0gY3NzO1xuICAgICAgZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoaW5qZWN0ZWQpO1xuICAgIH1cbiAgfVxufSkoKTtcblxuXG5kYXQudXRpbHMuY29tbW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgXG4gIHZhciBBUlJfRUFDSCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoO1xuICB2YXIgQVJSX1NMSUNFID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuXG4gIC8qKlxuICAgKiBCYW5kLWFpZCBtZXRob2RzIGZvciB0aGluZ3MgdGhhdCBzaG91bGQgYmUgYSBsb3QgZWFzaWVyIGluIEphdmFTY3JpcHQuXG4gICAqIEltcGxlbWVudGF0aW9uIGFuZCBzdHJ1Y3R1cmUgaW5zcGlyZWQgYnkgdW5kZXJzY29yZS5qc1xuICAgKiBodHRwOi8vZG9jdW1lbnRjbG91ZC5naXRodWIuY29tL3VuZGVyc2NvcmUvXG4gICAqL1xuXG4gIHJldHVybiB7IFxuICAgIFxuICAgIEJSRUFLOiB7fSxcbiAgXG4gICAgZXh0ZW5kOiBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgIFxuICAgICAgdGhpcy5lYWNoKEFSUl9TTElDRS5jYWxsKGFyZ3VtZW50cywgMSksIGZ1bmN0aW9uKG9iaikge1xuICAgICAgICBcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iailcbiAgICAgICAgICBpZiAoIXRoaXMuaXNVbmRlZmluZWQob2JqW2tleV0pKSBcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gb2JqW2tleV07XG4gICAgICAgIFxuICAgICAgfSwgdGhpcyk7XG4gICAgICBcbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICBcbiAgICB9LFxuICAgIFxuICAgIGRlZmF1bHRzOiBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgIFxuICAgICAgdGhpcy5lYWNoKEFSUl9TTElDRS5jYWxsKGFyZ3VtZW50cywgMSksIGZ1bmN0aW9uKG9iaikge1xuICAgICAgICBcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iailcbiAgICAgICAgICBpZiAodGhpcy5pc1VuZGVmaW5lZCh0YXJnZXRba2V5XSkpIFxuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgXG4gICAgICB9LCB0aGlzKTtcbiAgICAgIFxuICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICBcbiAgICB9LFxuICAgIFxuICAgIGNvbXBvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHRvQ2FsbCA9IEFSUl9TTElDRS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciBhcmdzID0gQVJSX1NMSUNFLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IHRvQ2FsbC5sZW5ndGggLTE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgYXJncyA9IFt0b0NhbGxbaV0uYXBwbHkodGhpcywgYXJncyldO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBhcmdzWzBdO1xuICAgICAgICAgICAgfVxuICAgIH0sXG4gICAgXG4gICAgZWFjaDogZnVuY3Rpb24ob2JqLCBpdHIsIHNjb3BlKSB7XG5cbiAgICAgIFxuICAgICAgaWYgKEFSUl9FQUNIICYmIG9iai5mb3JFYWNoID09PSBBUlJfRUFDSCkgeyBcbiAgICAgICAgXG4gICAgICAgIG9iai5mb3JFYWNoKGl0ciwgc2NvcGUpO1xuICAgICAgICBcbiAgICAgIH0gZWxzZSBpZiAob2JqLmxlbmd0aCA9PT0gb2JqLmxlbmd0aCArIDApIHsgLy8gSXMgbnVtYmVyIGJ1dCBub3QgTmFOXG4gICAgICAgIFxuICAgICAgICBmb3IgKHZhciBrZXkgPSAwLCBsID0gb2JqLmxlbmd0aDsga2V5IDwgbDsga2V5KyspXG4gICAgICAgICAgaWYgKGtleSBpbiBvYmogJiYgaXRyLmNhbGwoc2NvcGUsIG9ialtrZXldLCBrZXkpID09PSB0aGlzLkJSRUFLKSBcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIFxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSBcbiAgICAgICAgICBpZiAoaXRyLmNhbGwoc2NvcGUsIG9ialtrZXldLCBrZXkpID09PSB0aGlzLkJSRUFLKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgXG4gICAgICB9XG4gICAgICAgICAgICBcbiAgICB9LFxuICAgIFxuICAgIGRlZmVyOiBmdW5jdGlvbihmbmMpIHtcbiAgICAgIHNldFRpbWVvdXQoZm5jLCAwKTtcbiAgICB9LFxuICAgIFxuICAgIHRvQXJyYXk6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgaWYgKG9iai50b0FycmF5KSByZXR1cm4gb2JqLnRvQXJyYXkoKTtcbiAgICAgIHJldHVybiBBUlJfU0xJQ0UuY2FsbChvYmopO1xuICAgIH0sXG5cbiAgICBpc1VuZGVmaW5lZDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09PSB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICBcbiAgICBpc051bGw6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gbnVsbDtcbiAgICB9LFxuICAgIFxuICAgIGlzTmFOOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogIT09IG9iajtcbiAgICB9LFxuICAgIFxuICAgIGlzQXJyYXk6IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqLmNvbnN0cnVjdG9yID09PSBBcnJheTtcbiAgICB9LFxuICAgIFxuICAgIGlzT2JqZWN0OiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IE9iamVjdChvYmopO1xuICAgIH0sXG4gICAgXG4gICAgaXNOdW1iZXI6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gb2JqKzA7XG4gICAgfSxcbiAgICBcbiAgICBpc1N0cmluZzogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09PSBvYmorJyc7XG4gICAgfSxcbiAgICBcbiAgICBpc0Jvb2xlYW46IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gZmFsc2UgfHwgb2JqID09PSB0cnVlO1xuICAgIH0sXG4gICAgXG4gICAgaXNGdW5jdGlvbjogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG4gICAgfVxuICBcbiAgfTtcbiAgICBcbn0pKCk7XG5cblxuZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKGNvbW1vbikge1xuXG4gIC8qKlxuICAgKiBAY2xhc3MgQW4gXCJhYnN0cmFjdFwiIGNsYXNzIHRoYXQgcmVwcmVzZW50cyBhIGdpdmVuIHByb3BlcnR5IG9mIGFuIG9iamVjdC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICpcbiAgICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcbiAgICovXG4gIHZhciBDb250cm9sbGVyID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkge1xuXG4gICAgdGhpcy5pbml0aWFsVmFsdWUgPSBvYmplY3RbcHJvcGVydHldO1xuXG4gICAgLyoqXG4gICAgICogVGhvc2Ugd2hvIGV4dGVuZCB0aGlzIGNsYXNzIHdpbGwgcHV0IHRoZWlyIERPTSBlbGVtZW50cyBpbiBoZXJlLlxuICAgICAqIEB0eXBlIHtET01FbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG9iamVjdCB0byBtYW5pcHVsYXRlXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICB0aGlzLm9iamVjdCA9IG9iamVjdDtcblxuICAgIC8qKlxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBtYW5pcHVsYXRlXG4gICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLnByb3BlcnR5ID0gcHJvcGVydHk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIG9uIGNoYW5nZS5cbiAgICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHRoaXMuX19vbkNoYW5nZSA9IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIFRoZSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgb24gZmluaXNoaW5nIGNoYW5nZS5cbiAgICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHRoaXMuX19vbkZpbmlzaENoYW5nZSA9IHVuZGVmaW5lZDtcblxuICB9O1xuXG4gIGNvbW1vbi5leHRlbmQoXG5cbiAgICAgIENvbnRyb2xsZXIucHJvdG90eXBlLFxuXG4gICAgICAvKiogQGxlbmRzIGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyLnByb3RvdHlwZSAqL1xuICAgICAge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTcGVjaWZ5IHRoYXQgYSBmdW5jdGlvbiBmaXJlIGV2ZXJ5IHRpbWUgc29tZW9uZSBjaGFuZ2VzIHRoZSB2YWx1ZSB3aXRoXG4gICAgICAgICAqIHRoaXMgQ29udHJvbGxlci5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5jIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2hlbmV2ZXIgdGhlIHZhbHVlXG4gICAgICAgICAqIGlzIG1vZGlmaWVkIHZpYSB0aGlzIENvbnRyb2xsZXIuXG4gICAgICAgICAqIEByZXR1cm5zIHtkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlcn0gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uKGZuYykge1xuICAgICAgICAgIHRoaXMuX19vbkNoYW5nZSA9IGZuYztcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU3BlY2lmeSB0aGF0IGEgZnVuY3Rpb24gZmlyZSBldmVyeSB0aW1lIHNvbWVvbmUgXCJmaW5pc2hlc1wiIGNoYW5naW5nXG4gICAgICAgICAqIHRoZSB2YWx1ZSB3aWggdGhpcyBDb250cm9sbGVyLiBVc2VmdWwgZm9yIHZhbHVlcyB0aGF0IGNoYW5nZVxuICAgICAgICAgKiBpbmNyZW1lbnRhbGx5IGxpa2UgbnVtYmVycyBvciBzdHJpbmdzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbmMgVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aGVuZXZlclxuICAgICAgICAgKiBzb21lb25lIFwiZmluaXNoZXNcIiBjaGFuZ2luZyB0aGUgdmFsdWUgdmlhIHRoaXMgQ29udHJvbGxlci5cbiAgICAgICAgICogQHJldHVybnMge2RhdC5jb250cm9sbGVycy5Db250cm9sbGVyfSB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBvbkZpbmlzaENoYW5nZTogZnVuY3Rpb24oZm5jKSB7XG4gICAgICAgICAgdGhpcy5fX29uRmluaXNoQ2hhbmdlID0gZm5jO1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGFuZ2UgdGhlIHZhbHVlIG9mIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBuZXdWYWx1ZSBUaGUgbmV3IHZhbHVlIG9mIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+XG4gICAgICAgICAqL1xuICAgICAgICBzZXRWYWx1ZTogZnVuY3Rpb24obmV3VmFsdWUpIHtcbiAgICAgICAgICB0aGlzLm9iamVjdFt0aGlzLnByb3BlcnR5XSA9IG5ld1ZhbHVlO1xuICAgICAgICAgIGlmICh0aGlzLl9fb25DaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuX19vbkNoYW5nZS5jYWxsKHRoaXMsIG5ld1ZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy51cGRhdGVEaXNwbGF5KCk7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIHZhbHVlIG9mIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+XG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBjdXJyZW50IHZhbHVlIG9mIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+XG4gICAgICAgICAqL1xuICAgICAgICBnZXRWYWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0W3RoaXMucHJvcGVydHldO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWZyZXNoZXMgdGhlIHZpc3VhbCBkaXNwbGF5IG9mIGEgQ29udHJvbGxlciBpbiBvcmRlciB0byBrZWVwIHN5bmNcbiAgICAgICAgICogd2l0aCB0aGUgb2JqZWN0J3MgY3VycmVudCB2YWx1ZS5cbiAgICAgICAgICogQHJldHVybnMge2RhdC5jb250cm9sbGVycy5Db250cm9sbGVyfSB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICB1cGRhdGVEaXNwbGF5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgaWYgdGhlIHZhbHVlIGhhcyBkZXZpYXRlZCBmcm9tIGluaXRpYWxWYWx1ZVxuICAgICAgICAgKi9cbiAgICAgICAgaXNNb2RpZmllZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaW5pdGlhbFZhbHVlICE9PSB0aGlzLmdldFZhbHVlKClcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgKTtcblxuICByZXR1cm4gQ29udHJvbGxlcjtcblxuXG59KShkYXQudXRpbHMuY29tbW9uKTtcblxuXG5kYXQuZG9tLmRvbSA9IChmdW5jdGlvbiAoY29tbW9uKSB7XG5cbiAgdmFyIEVWRU5UX01BUCA9IHtcbiAgICAnSFRNTEV2ZW50cyc6IFsnY2hhbmdlJ10sXG4gICAgJ01vdXNlRXZlbnRzJzogWydjbGljaycsJ21vdXNlbW92ZScsJ21vdXNlZG93bicsJ21vdXNldXAnLCAnbW91c2VvdmVyJ10sXG4gICAgJ0tleWJvYXJkRXZlbnRzJzogWydrZXlkb3duJ11cbiAgfTtcblxuICB2YXIgRVZFTlRfTUFQX0lOViA9IHt9O1xuICBjb21tb24uZWFjaChFVkVOVF9NQVAsIGZ1bmN0aW9uKHYsIGspIHtcbiAgICBjb21tb24uZWFjaCh2LCBmdW5jdGlvbihlKSB7XG4gICAgICBFVkVOVF9NQVBfSU5WW2VdID0gaztcbiAgICB9KTtcbiAgfSk7XG5cbiAgdmFyIENTU19WQUxVRV9QSVhFTFMgPSAvKFxcZCsoXFwuXFxkKyk/KXB4LztcblxuICBmdW5jdGlvbiBjc3NWYWx1ZVRvUGl4ZWxzKHZhbCkge1xuXG4gICAgaWYgKHZhbCA9PT0gJzAnIHx8IGNvbW1vbi5pc1VuZGVmaW5lZCh2YWwpKSByZXR1cm4gMDtcblxuICAgIHZhciBtYXRjaCA9IHZhbC5tYXRjaChDU1NfVkFMVUVfUElYRUxTKTtcblxuICAgIGlmICghY29tbW9uLmlzTnVsbChtYXRjaCkpIHtcbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KG1hdGNoWzFdKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPIC4uLmVtcz8gJT9cblxuICAgIHJldHVybiAwO1xuXG4gIH1cblxuICAvKipcbiAgICogQG5hbWVzcGFjZVxuICAgKiBAbWVtYmVyIGRhdC5kb21cbiAgICovXG4gIHZhciBkb20gPSB7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gZWxlbVxuICAgICAqIEBwYXJhbSBzZWxlY3RhYmxlXG4gICAgICovXG4gICAgbWFrZVNlbGVjdGFibGU6IGZ1bmN0aW9uKGVsZW0sIHNlbGVjdGFibGUpIHtcblxuICAgICAgaWYgKGVsZW0gPT09IHVuZGVmaW5lZCB8fCBlbGVtLnN0eWxlID09PSB1bmRlZmluZWQpIHJldHVybjtcblxuICAgICAgZWxlbS5vbnNlbGVjdHN0YXJ0ID0gc2VsZWN0YWJsZSA/IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IDogZnVuY3Rpb24oKSB7XG4gICAgICB9O1xuXG4gICAgICBlbGVtLnN0eWxlLk1velVzZXJTZWxlY3QgPSBzZWxlY3RhYmxlID8gJ2F1dG8nIDogJ25vbmUnO1xuICAgICAgZWxlbS5zdHlsZS5LaHRtbFVzZXJTZWxlY3QgPSBzZWxlY3RhYmxlID8gJ2F1dG8nIDogJ25vbmUnO1xuICAgICAgZWxlbS51bnNlbGVjdGFibGUgPSBzZWxlY3RhYmxlID8gJ29uJyA6ICdvZmYnO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGVsZW1cbiAgICAgKiBAcGFyYW0gaG9yaXpvbnRhbFxuICAgICAqIEBwYXJhbSB2ZXJ0aWNhbFxuICAgICAqL1xuICAgIG1ha2VGdWxsc2NyZWVuOiBmdW5jdGlvbihlbGVtLCBob3Jpem9udGFsLCB2ZXJ0aWNhbCkge1xuXG4gICAgICBpZiAoY29tbW9uLmlzVW5kZWZpbmVkKGhvcml6b250YWwpKSBob3Jpem9udGFsID0gdHJ1ZTtcbiAgICAgIGlmIChjb21tb24uaXNVbmRlZmluZWQodmVydGljYWwpKSB2ZXJ0aWNhbCA9IHRydWU7XG5cbiAgICAgIGVsZW0uc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXG4gICAgICBpZiAoaG9yaXpvbnRhbCkge1xuICAgICAgICBlbGVtLnN0eWxlLmxlZnQgPSAwO1xuICAgICAgICBlbGVtLnN0eWxlLnJpZ2h0ID0gMDtcbiAgICAgIH1cbiAgICAgIGlmICh2ZXJ0aWNhbCkge1xuICAgICAgICBlbGVtLnN0eWxlLnRvcCA9IDA7XG4gICAgICAgIGVsZW0uc3R5bGUuYm90dG9tID0gMDtcbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICogQHBhcmFtIGV2ZW50VHlwZVxuICAgICAqIEBwYXJhbSBwYXJhbXNcbiAgICAgKi9cbiAgICBmYWtlRXZlbnQ6IGZ1bmN0aW9uKGVsZW0sIGV2ZW50VHlwZSwgcGFyYW1zLCBhdXgpIHtcbiAgICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7fTtcbiAgICAgIHZhciBjbGFzc05hbWUgPSBFVkVOVF9NQVBfSU5WW2V2ZW50VHlwZV07XG4gICAgICBpZiAoIWNsYXNzTmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V2ZW50IHR5cGUgJyArIGV2ZW50VHlwZSArICcgbm90IHN1cHBvcnRlZC4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChjbGFzc05hbWUpO1xuICAgICAgc3dpdGNoIChjbGFzc05hbWUpIHtcbiAgICAgICAgY2FzZSAnTW91c2VFdmVudHMnOlxuICAgICAgICAgIHZhciBjbGllbnRYID0gcGFyYW1zLnggfHwgcGFyYW1zLmNsaWVudFggfHwgMDtcbiAgICAgICAgICB2YXIgY2xpZW50WSA9IHBhcmFtcy55IHx8IHBhcmFtcy5jbGllbnRZIHx8IDA7XG4gICAgICAgICAgZXZ0LmluaXRNb3VzZUV2ZW50KGV2ZW50VHlwZSwgcGFyYW1zLmJ1YmJsZXMgfHwgZmFsc2UsXG4gICAgICAgICAgICAgIHBhcmFtcy5jYW5jZWxhYmxlIHx8IHRydWUsIHdpbmRvdywgcGFyYW1zLmNsaWNrQ291bnQgfHwgMSxcbiAgICAgICAgICAgICAgMCwgLy9zY3JlZW4gWFxuICAgICAgICAgICAgICAwLCAvL3NjcmVlbiBZXG4gICAgICAgICAgICAgIGNsaWVudFgsIC8vY2xpZW50IFhcbiAgICAgICAgICAgICAgY2xpZW50WSwgLy9jbGllbnQgWVxuICAgICAgICAgICAgICBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgMCwgbnVsbCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0tleWJvYXJkRXZlbnRzJzpcbiAgICAgICAgICB2YXIgaW5pdCA9IGV2dC5pbml0S2V5Ym9hcmRFdmVudCB8fCBldnQuaW5pdEtleUV2ZW50OyAvLyB3ZWJraXQgfHwgbW96XG4gICAgICAgICAgY29tbW9uLmRlZmF1bHRzKHBhcmFtcywge1xuICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGN0cmxLZXk6IGZhbHNlLFxuICAgICAgICAgICAgYWx0S2V5OiBmYWxzZSxcbiAgICAgICAgICAgIHNoaWZ0S2V5OiBmYWxzZSxcbiAgICAgICAgICAgIG1ldGFLZXk6IGZhbHNlLFxuICAgICAgICAgICAga2V5Q29kZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgY2hhckNvZGU6IHVuZGVmaW5lZFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGluaXQoZXZlbnRUeXBlLCBwYXJhbXMuYnViYmxlcyB8fCBmYWxzZSxcbiAgICAgICAgICAgICAgcGFyYW1zLmNhbmNlbGFibGUsIHdpbmRvdyxcbiAgICAgICAgICAgICAgcGFyYW1zLmN0cmxLZXksIHBhcmFtcy5hbHRLZXksXG4gICAgICAgICAgICAgIHBhcmFtcy5zaGlmdEtleSwgcGFyYW1zLm1ldGFLZXksXG4gICAgICAgICAgICAgIHBhcmFtcy5rZXlDb2RlLCBwYXJhbXMuY2hhckNvZGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGV2dC5pbml0RXZlbnQoZXZlbnRUeXBlLCBwYXJhbXMuYnViYmxlcyB8fCBmYWxzZSxcbiAgICAgICAgICAgICAgcGFyYW1zLmNhbmNlbGFibGUgfHwgdHJ1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjb21tb24uZGVmYXVsdHMoZXZ0LCBhdXgpO1xuICAgICAgZWxlbS5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGVsZW1cbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKiBAcGFyYW0gZnVuY1xuICAgICAqIEBwYXJhbSBib29sXG4gICAgICovXG4gICAgYmluZDogZnVuY3Rpb24oZWxlbSwgZXZlbnQsIGZ1bmMsIGJvb2wpIHtcbiAgICAgIGJvb2wgPSBib29sIHx8IGZhbHNlO1xuICAgICAgaWYgKGVsZW0uYWRkRXZlbnRMaXN0ZW5lcilcbiAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBmdW5jLCBib29sKTtcbiAgICAgIGVsc2UgaWYgKGVsZW0uYXR0YWNoRXZlbnQpXG4gICAgICAgIGVsZW0uYXR0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBmdW5jKTtcbiAgICAgIHJldHVybiBkb207XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGVsZW1cbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKiBAcGFyYW0gZnVuY1xuICAgICAqIEBwYXJhbSBib29sXG4gICAgICovXG4gICAgdW5iaW5kOiBmdW5jdGlvbihlbGVtLCBldmVudCwgZnVuYywgYm9vbCkge1xuICAgICAgYm9vbCA9IGJvb2wgfHwgZmFsc2U7XG4gICAgICBpZiAoZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKVxuICAgICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmMsIGJvb2wpO1xuICAgICAgZWxzZSBpZiAoZWxlbS5kZXRhY2hFdmVudClcbiAgICAgICAgZWxlbS5kZXRhY2hFdmVudCgnb24nICsgZXZlbnQsIGZ1bmMpO1xuICAgICAgcmV0dXJuIGRvbTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWxlbVxuICAgICAqIEBwYXJhbSBjbGFzc05hbWVcbiAgICAgKi9cbiAgICBhZGRDbGFzczogZnVuY3Rpb24oZWxlbSwgY2xhc3NOYW1lKSB7XG4gICAgICBpZiAoZWxlbS5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBlbGVtLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICAgIH0gZWxzZSBpZiAoZWxlbS5jbGFzc05hbWUgIT09IGNsYXNzTmFtZSkge1xuICAgICAgICB2YXIgY2xhc3NlcyA9IGVsZW0uY2xhc3NOYW1lLnNwbGl0KC8gKy8pO1xuICAgICAgICBpZiAoY2xhc3Nlcy5pbmRleE9mKGNsYXNzTmFtZSkgPT0gLTEpIHtcbiAgICAgICAgICBjbGFzc2VzLnB1c2goY2xhc3NOYW1lKTtcbiAgICAgICAgICBlbGVtLmNsYXNzTmFtZSA9IGNsYXNzZXMuam9pbignICcpLnJlcGxhY2UoL15cXHMrLywgJycpLnJlcGxhY2UoL1xccyskLywgJycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZG9tO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICogQHBhcmFtIGNsYXNzTmFtZVxuICAgICAqL1xuICAgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbihlbGVtLCBjbGFzc05hbWUpIHtcbiAgICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgICAgaWYgKGVsZW0uY2xhc3NOYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAvLyBlbGVtLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtLmNsYXNzTmFtZSA9PT0gY2xhc3NOYW1lKSB7XG4gICAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ2NsYXNzJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGNsYXNzZXMgPSBlbGVtLmNsYXNzTmFtZS5zcGxpdCgvICsvKTtcbiAgICAgICAgICB2YXIgaW5kZXggPSBjbGFzc2VzLmluZGV4T2YoY2xhc3NOYW1lKTtcbiAgICAgICAgICBpZiAoaW5kZXggIT0gLTEpIHtcbiAgICAgICAgICAgIGNsYXNzZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIGVsZW0uY2xhc3NOYW1lID0gY2xhc3Nlcy5qb2luKCcgJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtLmNsYXNzTmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkb207XG4gICAgfSxcblxuICAgIGhhc0NsYXNzOiBmdW5jdGlvbihlbGVtLCBjbGFzc05hbWUpIHtcbiAgICAgIHJldHVybiBuZXcgUmVnRXhwKCcoPzpefFxcXFxzKyknICsgY2xhc3NOYW1lICsgJyg/OlxcXFxzK3wkKScpLnRlc3QoZWxlbS5jbGFzc05hbWUpIHx8IGZhbHNlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICovXG4gICAgZ2V0V2lkdGg6IGZ1bmN0aW9uKGVsZW0pIHtcblxuICAgICAgdmFyIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtKTtcblxuICAgICAgcmV0dXJuIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ2JvcmRlci1sZWZ0LXdpZHRoJ10pICtcbiAgICAgICAgICBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydib3JkZXItcmlnaHQtd2lkdGgnXSkgK1xuICAgICAgICAgIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ3BhZGRpbmctbGVmdCddKSArXG4gICAgICAgICAgY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsncGFkZGluZy1yaWdodCddKSArXG4gICAgICAgICAgY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsnd2lkdGgnXSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGVsZW1cbiAgICAgKi9cbiAgICBnZXRIZWlnaHQ6IGZ1bmN0aW9uKGVsZW0pIHtcblxuICAgICAgdmFyIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtKTtcblxuICAgICAgcmV0dXJuIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ2JvcmRlci10b3Atd2lkdGgnXSkgK1xuICAgICAgICAgIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ2JvcmRlci1ib3R0b20td2lkdGgnXSkgK1xuICAgICAgICAgIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ3BhZGRpbmctdG9wJ10pICtcbiAgICAgICAgICBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydwYWRkaW5nLWJvdHRvbSddKSArXG4gICAgICAgICAgY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsnaGVpZ2h0J10pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICovXG4gICAgZ2V0T2Zmc2V0OiBmdW5jdGlvbihlbGVtKSB7XG4gICAgICB2YXIgb2Zmc2V0ID0ge2xlZnQ6IDAsIHRvcDowfTtcbiAgICAgIGlmIChlbGVtLm9mZnNldFBhcmVudCkge1xuICAgICAgICBkbyB7XG4gICAgICAgICAgb2Zmc2V0LmxlZnQgKz0gZWxlbS5vZmZzZXRMZWZ0O1xuICAgICAgICAgIG9mZnNldC50b3AgKz0gZWxlbS5vZmZzZXRUb3A7XG4gICAgICAgIH0gd2hpbGUgKGVsZW0gPSBlbGVtLm9mZnNldFBhcmVudCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2Zmc2V0O1xuICAgIH0sXG5cbiAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcG9zdHMvMjY4NDU2MS9yZXZpc2lvbnNcbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gZWxlbVxuICAgICAqL1xuICAgIGlzQWN0aXZlOiBmdW5jdGlvbihlbGVtKSB7XG4gICAgICByZXR1cm4gZWxlbSA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiAoIGVsZW0udHlwZSB8fCBlbGVtLmhyZWYgKTtcbiAgICB9XG5cbiAgfTtcblxuICByZXR1cm4gZG9tO1xuXG59KShkYXQudXRpbHMuY29tbW9uKTtcblxuXG5kYXQuY29udHJvbGxlcnMuT3B0aW9uQ29udHJvbGxlciA9IChmdW5jdGlvbiAoQ29udHJvbGxlciwgZG9tLCBjb21tb24pIHtcblxuICAvKipcbiAgICogQGNsYXNzIFByb3ZpZGVzIGEgc2VsZWN0IGlucHV0IHRvIGFsdGVyIHRoZSBwcm9wZXJ0eSBvZiBhbiBvYmplY3QsIHVzaW5nIGFcbiAgICogbGlzdCBvZiBhY2NlcHRlZCB2YWx1ZXMuXG4gICAqXG4gICAqIEBleHRlbmRzIGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7T2JqZWN0fHN0cmluZ1tdfSBvcHRpb25zIEEgbWFwIG9mIGxhYmVscyB0byBhY2NlcHRhYmxlIHZhbHVlcywgb3JcbiAgICogYSBsaXN0IG9mIGFjY2VwdGFibGUgc3RyaW5nIHZhbHVlcy5cbiAgICpcbiAgICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcbiAgICovXG4gIHZhciBPcHRpb25Db250cm9sbGVyID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSwgb3B0aW9ucykge1xuXG4gICAgT3B0aW9uQ29udHJvbGxlci5zdXBlcmNsYXNzLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGRyb3AgZG93biBtZW51XG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHRoaXMuX19zZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcblxuICAgIGlmIChjb21tb24uaXNBcnJheShvcHRpb25zKSkge1xuICAgICAgdmFyIG1hcCA9IHt9O1xuICAgICAgY29tbW9uLmVhY2gob3B0aW9ucywgZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICBtYXBbZWxlbWVudF0gPSBlbGVtZW50O1xuICAgICAgfSk7XG4gICAgICBvcHRpb25zID0gbWFwO1xuICAgIH1cblxuICAgIGNvbW1vbi5lYWNoKG9wdGlvbnMsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcblxuICAgICAgdmFyIG9wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgb3B0LmlubmVySFRNTCA9IGtleTtcbiAgICAgIG9wdC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgdmFsdWUpO1xuICAgICAgX3RoaXMuX19zZWxlY3QuYXBwZW5kQ2hpbGQob3B0KTtcblxuICAgIH0pO1xuXG4gICAgLy8gQWNrbm93bGVkZ2Ugb3JpZ2luYWwgdmFsdWVcbiAgICB0aGlzLnVwZGF0ZURpc3BsYXkoKTtcblxuICAgIGRvbS5iaW5kKHRoaXMuX19zZWxlY3QsICdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBkZXNpcmVkVmFsdWUgPSB0aGlzLm9wdGlvbnNbdGhpcy5zZWxlY3RlZEluZGV4XS52YWx1ZTtcbiAgICAgIF90aGlzLnNldFZhbHVlKGRlc2lyZWRWYWx1ZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX3NlbGVjdCk7XG5cbiAgfTtcblxuICBPcHRpb25Db250cm9sbGVyLnN1cGVyY2xhc3MgPSBDb250cm9sbGVyO1xuXG4gIGNvbW1vbi5leHRlbmQoXG5cbiAgICAgIE9wdGlvbkNvbnRyb2xsZXIucHJvdG90eXBlLFxuICAgICAgQ29udHJvbGxlci5wcm90b3R5cGUsXG5cbiAgICAgIHtcblxuICAgICAgICBzZXRWYWx1ZTogZnVuY3Rpb24odikge1xuICAgICAgICAgIHZhciB0b1JldHVybiA9IE9wdGlvbkNvbnRyb2xsZXIuc3VwZXJjbGFzcy5wcm90b3R5cGUuc2V0VmFsdWUuY2FsbCh0aGlzLCB2KTtcbiAgICAgICAgICBpZiAodGhpcy5fX29uRmluaXNoQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbCh0aGlzLCB0aGlzLmdldFZhbHVlKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdG9SZXR1cm47XG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlRGlzcGxheTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhpcy5fX3NlbGVjdC52YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoKTtcbiAgICAgICAgICByZXR1cm4gT3B0aW9uQ29udHJvbGxlci5zdXBlcmNsYXNzLnByb3RvdHlwZS51cGRhdGVEaXNwbGF5LmNhbGwodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICk7XG5cbiAgcmV0dXJuIE9wdGlvbkNvbnRyb2xsZXI7XG5cbn0pKGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyLFxuZGF0LmRvbS5kb20sXG5kYXQudXRpbHMuY29tbW9uKTtcblxuXG5kYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlciA9IChmdW5jdGlvbiAoQ29udHJvbGxlciwgY29tbW9uKSB7XG5cbiAgLyoqXG4gICAqIEBjbGFzcyBSZXByZXNlbnRzIGEgZ2l2ZW4gcHJvcGVydHkgb2YgYW4gb2JqZWN0IHRoYXQgaXMgYSBudW1iZXIuXG4gICAqXG4gICAqIEBleHRlbmRzIGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSBPcHRpb25hbCBwYXJhbWV0ZXJzXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcGFyYW1zLm1pbl0gTWluaW11bSBhbGxvd2VkIHZhbHVlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcGFyYW1zLm1heF0gTWF4aW11bSBhbGxvd2VkIHZhbHVlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcGFyYW1zLnN0ZXBdIEluY3JlbWVudCBieSB3aGljaCB0byBjaGFuZ2UgdmFsdWVcbiAgICpcbiAgICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcbiAgICovXG4gIHZhciBOdW1iZXJDb250cm9sbGVyID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSwgcGFyYW1zKSB7XG5cbiAgICBOdW1iZXJDb250cm9sbGVyLnN1cGVyY2xhc3MuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5KTtcblxuICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7fTtcblxuICAgIHRoaXMuX19taW4gPSBwYXJhbXMubWluO1xuICAgIHRoaXMuX19tYXggPSBwYXJhbXMubWF4O1xuICAgIHRoaXMuX19zdGVwID0gcGFyYW1zLnN0ZXA7XG5cbiAgICBpZiAoY29tbW9uLmlzVW5kZWZpbmVkKHRoaXMuX19zdGVwKSkge1xuXG4gICAgICBpZiAodGhpcy5pbml0aWFsVmFsdWUgPT0gMCkge1xuICAgICAgICB0aGlzLl9faW1wbGllZFN0ZXAgPSAxOyAvLyBXaGF0IGFyZSB3ZSwgcHN5Y2hpY3M/XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBIZXkgRG91ZywgY2hlY2sgdGhpcyBvdXQuXG4gICAgICAgIHRoaXMuX19pbXBsaWVkU3RlcCA9IE1hdGgucG93KDEwLCBNYXRoLmZsb29yKE1hdGgubG9nKHRoaXMuaW5pdGlhbFZhbHVlKS9NYXRoLkxOMTApKS8xMDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRoaXMuX19pbXBsaWVkU3RlcCA9IHRoaXMuX19zdGVwO1xuXG4gICAgfVxuXG4gICAgdGhpcy5fX3ByZWNpc2lvbiA9IG51bURlY2ltYWxzKHRoaXMuX19pbXBsaWVkU3RlcCk7XG5cblxuICB9O1xuXG4gIE51bWJlckNvbnRyb2xsZXIuc3VwZXJjbGFzcyA9IENvbnRyb2xsZXI7XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgTnVtYmVyQ29udHJvbGxlci5wcm90b3R5cGUsXG4gICAgICBDb250cm9sbGVyLnByb3RvdHlwZSxcblxuICAgICAgLyoqIEBsZW5kcyBkYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlci5wcm90b3R5cGUgKi9cbiAgICAgIHtcblxuICAgICAgICBzZXRWYWx1ZTogZnVuY3Rpb24odikge1xuXG4gICAgICAgICAgaWYgKHRoaXMuX19taW4gIT09IHVuZGVmaW5lZCAmJiB2IDwgdGhpcy5fX21pbikge1xuICAgICAgICAgICAgdiA9IHRoaXMuX19taW47XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9fbWF4ICE9PSB1bmRlZmluZWQgJiYgdiA+IHRoaXMuX19tYXgpIHtcbiAgICAgICAgICAgIHYgPSB0aGlzLl9fbWF4O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLl9fc3RlcCAhPT0gdW5kZWZpbmVkICYmIHYgJSB0aGlzLl9fc3RlcCAhPSAwKSB7XG4gICAgICAgICAgICB2ID0gTWF0aC5yb3VuZCh2IC8gdGhpcy5fX3N0ZXApICogdGhpcy5fX3N0ZXA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIE51bWJlckNvbnRyb2xsZXIuc3VwZXJjbGFzcy5wcm90b3R5cGUuc2V0VmFsdWUuY2FsbCh0aGlzLCB2KTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTcGVjaWZ5IGEgbWluaW11bSB2YWx1ZSBmb3IgPGNvZGU+b2JqZWN0W3Byb3BlcnR5XTwvY29kZT4uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBtaW5WYWx1ZSBUaGUgbWluaW11bSB2YWx1ZSBmb3JcbiAgICAgICAgICogPGNvZGU+b2JqZWN0W3Byb3BlcnR5XTwvY29kZT5cbiAgICAgICAgICogQHJldHVybnMge2RhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyfSB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBtaW46IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICB0aGlzLl9fbWluID0gdjtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU3BlY2lmeSBhIG1heGltdW0gdmFsdWUgZm9yIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gbWF4VmFsdWUgVGhlIG1heGltdW0gdmFsdWUgZm9yXG4gICAgICAgICAqIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+XG4gICAgICAgICAqIEByZXR1cm5zIHtkYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlcn0gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgbWF4OiBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgdGhpcy5fX21heCA9IHY7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNwZWNpZnkgYSBzdGVwIHZhbHVlIHRoYXQgZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJcbiAgICAgICAgICogaW5jcmVtZW50cyBieS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IHN0ZXBWYWx1ZSBUaGUgc3RlcCB2YWx1ZSBmb3JcbiAgICAgICAgICogZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJcbiAgICAgICAgICogQGRlZmF1bHQgaWYgbWluaW11bSBhbmQgbWF4aW11bSBzcGVjaWZpZWQgaW5jcmVtZW50IGlzIDElIG9mIHRoZVxuICAgICAgICAgKiBkaWZmZXJlbmNlIG90aGVyd2lzZSBzdGVwVmFsdWUgaXMgMVxuICAgICAgICAgKiBAcmV0dXJucyB7ZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJ9IHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIHN0ZXA6IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICB0aGlzLl9fc3RlcCA9IHY7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICk7XG5cbiAgZnVuY3Rpb24gbnVtRGVjaW1hbHMoeCkge1xuICAgIHggPSB4LnRvU3RyaW5nKCk7XG4gICAgaWYgKHguaW5kZXhPZignLicpID4gLTEpIHtcbiAgICAgIHJldHVybiB4Lmxlbmd0aCAtIHguaW5kZXhPZignLicpIC0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIE51bWJlckNvbnRyb2xsZXI7XG5cbn0pKGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyLFxuZGF0LnV0aWxzLmNvbW1vbik7XG5cblxuZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJCb3ggPSAoZnVuY3Rpb24gKE51bWJlckNvbnRyb2xsZXIsIGRvbSwgY29tbW9uKSB7XG5cbiAgLyoqXG4gICAqIEBjbGFzcyBSZXByZXNlbnRzIGEgZ2l2ZW4gcHJvcGVydHkgb2YgYW4gb2JqZWN0IHRoYXQgaXMgYSBudW1iZXIgYW5kXG4gICAqIHByb3ZpZGVzIGFuIGlucHV0IGVsZW1lbnQgd2l0aCB3aGljaCB0byBtYW5pcHVsYXRlIGl0LlxuICAgKlxuICAgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlclxuICAgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlclxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gT3B0aW9uYWwgcGFyYW1ldGVyc1xuICAgKiBAcGFyYW0ge051bWJlcn0gW3BhcmFtcy5taW5dIE1pbmltdW0gYWxsb3dlZCB2YWx1ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW3BhcmFtcy5tYXhdIE1heGltdW0gYWxsb3dlZCB2YWx1ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW3BhcmFtcy5zdGVwXSBJbmNyZW1lbnQgYnkgd2hpY2ggdG8gY2hhbmdlIHZhbHVlXG4gICAqXG4gICAqIEBtZW1iZXIgZGF0LmNvbnRyb2xsZXJzXG4gICAqL1xuICB2YXIgTnVtYmVyQ29udHJvbGxlckJveCA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHksIHBhcmFtcykge1xuXG4gICAgdGhpcy5fX3RydW5jYXRpb25TdXNwZW5kZWQgPSBmYWxzZTtcblxuICAgIE51bWJlckNvbnRyb2xsZXJCb3guc3VwZXJjbGFzcy5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHksIHBhcmFtcyk7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgLyoqXG4gICAgICoge051bWJlcn0gUHJldmlvdXMgbW91c2UgeSBwb3NpdGlvblxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICB2YXIgcHJldl95O1xuXG4gICAgdGhpcy5fX2lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICB0aGlzLl9faW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcblxuICAgIC8vIE1ha2VzIGl0IHNvIG1hbnVhbGx5IHNwZWNpZmllZCB2YWx1ZXMgYXJlIG5vdCB0cnVuY2F0ZWQuXG5cbiAgICBkb20uYmluZCh0aGlzLl9faW5wdXQsICdjaGFuZ2UnLCBvbkNoYW5nZSk7XG4gICAgZG9tLmJpbmQodGhpcy5fX2lucHV0LCAnYmx1cicsIG9uQmx1cik7XG4gICAgZG9tLmJpbmQodGhpcy5fX2lucHV0LCAnbW91c2Vkb3duJywgb25Nb3VzZURvd24pO1xuICAgIGRvbS5iaW5kKHRoaXMuX19pbnB1dCwgJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG5cbiAgICAgIC8vIFdoZW4gcHJlc3NpbmcgZW50aXJlLCB5b3UgY2FuIGJlIGFzIHByZWNpc2UgYXMgeW91IHdhbnQuXG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgICBfdGhpcy5fX3RydW5jYXRpb25TdXNwZW5kZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmJsdXIoKTtcbiAgICAgICAgX3RoaXMuX190cnVuY2F0aW9uU3VzcGVuZGVkID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIG9uQ2hhbmdlKCkge1xuICAgICAgdmFyIGF0dGVtcHRlZCA9IHBhcnNlRmxvYXQoX3RoaXMuX19pbnB1dC52YWx1ZSk7XG4gICAgICBpZiAoIWNvbW1vbi5pc05hTihhdHRlbXB0ZWQpKSBfdGhpcy5zZXRWYWx1ZShhdHRlbXB0ZWQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQmx1cigpIHtcbiAgICAgIG9uQ2hhbmdlKCk7XG4gICAgICBpZiAoX3RoaXMuX19vbkZpbmlzaENoYW5nZSkge1xuICAgICAgICBfdGhpcy5fX29uRmluaXNoQ2hhbmdlLmNhbGwoX3RoaXMsIF90aGlzLmdldFZhbHVlKCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2VEb3duKGUpIHtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIG9uTW91c2VEcmFnKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBvbk1vdXNlVXApO1xuICAgICAgcHJldl95ID0gZS5jbGllbnRZO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2VEcmFnKGUpIHtcblxuICAgICAgdmFyIGRpZmYgPSBwcmV2X3kgLSBlLmNsaWVudFk7XG4gICAgICBfdGhpcy5zZXRWYWx1ZShfdGhpcy5nZXRWYWx1ZSgpICsgZGlmZiAqIF90aGlzLl9faW1wbGllZFN0ZXApO1xuXG4gICAgICBwcmV2X3kgPSBlLmNsaWVudFk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1vdXNlVXAoKSB7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIG9uTW91c2VEcmFnKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2V1cCcsIG9uTW91c2VVcCk7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVEaXNwbGF5KCk7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX2lucHV0KTtcblxuICB9O1xuXG4gIE51bWJlckNvbnRyb2xsZXJCb3guc3VwZXJjbGFzcyA9IE51bWJlckNvbnRyb2xsZXI7XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgTnVtYmVyQ29udHJvbGxlckJveC5wcm90b3R5cGUsXG4gICAgICBOdW1iZXJDb250cm9sbGVyLnByb3RvdHlwZSxcblxuICAgICAge1xuXG4gICAgICAgIHVwZGF0ZURpc3BsYXk6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgdGhpcy5fX2lucHV0LnZhbHVlID0gdGhpcy5fX3RydW5jYXRpb25TdXNwZW5kZWQgPyB0aGlzLmdldFZhbHVlKCkgOiByb3VuZFRvRGVjaW1hbCh0aGlzLmdldFZhbHVlKCksIHRoaXMuX19wcmVjaXNpb24pO1xuICAgICAgICAgIHJldHVybiBOdW1iZXJDb250cm9sbGVyQm94LnN1cGVyY2xhc3MucHJvdG90eXBlLnVwZGF0ZURpc3BsYXkuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgKTtcblxuICBmdW5jdGlvbiByb3VuZFRvRGVjaW1hbCh2YWx1ZSwgZGVjaW1hbHMpIHtcbiAgICB2YXIgdGVuVG8gPSBNYXRoLnBvdygxMCwgZGVjaW1hbHMpO1xuICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlICogdGVuVG8pIC8gdGVuVG87XG4gIH1cblxuICByZXR1cm4gTnVtYmVyQ29udHJvbGxlckJveDtcblxufSkoZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXIsXG5kYXQuZG9tLmRvbSxcbmRhdC51dGlscy5jb21tb24pO1xuXG5cbmRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyU2xpZGVyID0gKGZ1bmN0aW9uIChOdW1iZXJDb250cm9sbGVyLCBkb20sIGNzcywgY29tbW9uLCBzdHlsZVNoZWV0KSB7XG5cbiAgLyoqXG4gICAqIEBjbGFzcyBSZXByZXNlbnRzIGEgZ2l2ZW4gcHJvcGVydHkgb2YgYW4gb2JqZWN0IHRoYXQgaXMgYSBudW1iZXIsIGNvbnRhaW5zXG4gICAqIGEgbWluaW11bSBhbmQgbWF4aW11bSwgYW5kIHByb3ZpZGVzIGEgc2xpZGVyIGVsZW1lbnQgd2l0aCB3aGljaCB0b1xuICAgKiBtYW5pcHVsYXRlIGl0LiBJdCBzaG91bGQgYmUgbm90ZWQgdGhhdCB0aGUgc2xpZGVyIGVsZW1lbnQgaXMgbWFkZSB1cCBvZlxuICAgKiA8Y29kZT4mbHQ7ZGl2Jmd0OzwvY29kZT4gdGFncywgPHN0cm9uZz5ub3Q8L3N0cm9uZz4gdGhlIGh0bWw1XG4gICAqIDxjb2RlPiZsdDtzbGlkZXImZ3Q7PC9jb2RlPiBlbGVtZW50LlxuICAgKlxuICAgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlclxuICAgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlclxuICAgKiBcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG1pblZhbHVlIE1pbmltdW0gYWxsb3dlZCB2YWx1ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gbWF4VmFsdWUgTWF4aW11bSBhbGxvd2VkIHZhbHVlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBzdGVwVmFsdWUgSW5jcmVtZW50IGJ5IHdoaWNoIHRvIGNoYW5nZSB2YWx1ZVxuICAgKlxuICAgKiBAbWVtYmVyIGRhdC5jb250cm9sbGVyc1xuICAgKi9cbiAgdmFyIE51bWJlckNvbnRyb2xsZXJTbGlkZXIgPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5LCBtaW4sIG1heCwgc3RlcCkge1xuXG4gICAgTnVtYmVyQ29udHJvbGxlclNsaWRlci5zdXBlcmNsYXNzLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSwgeyBtaW46IG1pbiwgbWF4OiBtYXgsIHN0ZXA6IHN0ZXAgfSk7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5fX2JhY2tncm91bmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9fZm9yZWdyb3VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIFxuXG5cbiAgICBkb20uYmluZCh0aGlzLl9fYmFja2dyb3VuZCwgJ21vdXNlZG93bicsIG9uTW91c2VEb3duKTtcbiAgICBcbiAgICBkb20uYWRkQ2xhc3ModGhpcy5fX2JhY2tncm91bmQsICdzbGlkZXInKTtcbiAgICBkb20uYWRkQ2xhc3ModGhpcy5fX2ZvcmVncm91bmQsICdzbGlkZXItZmcnKTtcblxuICAgIGZ1bmN0aW9uIG9uTW91c2VEb3duKGUpIHtcblxuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgb25Nb3VzZURyYWcpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2V1cCcsIG9uTW91c2VVcCk7XG5cbiAgICAgIG9uTW91c2VEcmFnKGUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2VEcmFnKGUpIHtcblxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB2YXIgb2Zmc2V0ID0gZG9tLmdldE9mZnNldChfdGhpcy5fX2JhY2tncm91bmQpO1xuICAgICAgdmFyIHdpZHRoID0gZG9tLmdldFdpZHRoKF90aGlzLl9fYmFja2dyb3VuZCk7XG4gICAgICBcbiAgICAgIF90aGlzLnNldFZhbHVlKFxuICAgICAgICBtYXAoZS5jbGllbnRYLCBvZmZzZXQubGVmdCwgb2Zmc2V0LmxlZnQgKyB3aWR0aCwgX3RoaXMuX19taW4sIF90aGlzLl9fbWF4KVxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3VzZVVwKCkge1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBvbk1vdXNlRHJhZyk7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBvbk1vdXNlVXApO1xuICAgICAgaWYgKF90aGlzLl9fb25GaW5pc2hDaGFuZ2UpIHtcbiAgICAgICAgX3RoaXMuX19vbkZpbmlzaENoYW5nZS5jYWxsKF90aGlzLCBfdGhpcy5nZXRWYWx1ZSgpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZURpc3BsYXkoKTtcblxuICAgIHRoaXMuX19iYWNrZ3JvdW5kLmFwcGVuZENoaWxkKHRoaXMuX19mb3JlZ3JvdW5kKTtcbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX2JhY2tncm91bmQpO1xuXG4gIH07XG5cbiAgTnVtYmVyQ29udHJvbGxlclNsaWRlci5zdXBlcmNsYXNzID0gTnVtYmVyQ29udHJvbGxlcjtcblxuICAvKipcbiAgICogSW5qZWN0cyBkZWZhdWx0IHN0eWxlc2hlZXQgZm9yIHNsaWRlciBlbGVtZW50cy5cbiAgICovXG4gIE51bWJlckNvbnRyb2xsZXJTbGlkZXIudXNlRGVmYXVsdFN0eWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIGNzcy5pbmplY3Qoc3R5bGVTaGVldCk7XG4gIH07XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgTnVtYmVyQ29udHJvbGxlclNsaWRlci5wcm90b3R5cGUsXG4gICAgICBOdW1iZXJDb250cm9sbGVyLnByb3RvdHlwZSxcblxuICAgICAge1xuXG4gICAgICAgIHVwZGF0ZURpc3BsYXk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBwY3QgPSAodGhpcy5nZXRWYWx1ZSgpIC0gdGhpcy5fX21pbikvKHRoaXMuX19tYXggLSB0aGlzLl9fbWluKTtcbiAgICAgICAgICB0aGlzLl9fZm9yZWdyb3VuZC5zdHlsZS53aWR0aCA9IHBjdCoxMDArJyUnO1xuICAgICAgICAgIHJldHVybiBOdW1iZXJDb250cm9sbGVyU2xpZGVyLnN1cGVyY2xhc3MucHJvdG90eXBlLnVwZGF0ZURpc3BsYXkuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cblxuXG4gICk7XG5cbiAgZnVuY3Rpb24gbWFwKHYsIGkxLCBpMiwgbzEsIG8yKSB7XG4gICAgcmV0dXJuIG8xICsgKG8yIC0gbzEpICogKCh2IC0gaTEpIC8gKGkyIC0gaTEpKTtcbiAgfVxuXG4gIHJldHVybiBOdW1iZXJDb250cm9sbGVyU2xpZGVyO1xuICBcbn0pKGRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyLFxuZGF0LmRvbS5kb20sXG5kYXQudXRpbHMuY3NzLFxuZGF0LnV0aWxzLmNvbW1vbixcblwiLnNsaWRlciB7XFxuICBib3gtc2hhZG93OiBpbnNldCAwIDJweCA0cHggcmdiYSgwLDAsMCwwLjE1KTtcXG4gIGhlaWdodDogMWVtO1xcbiAgYm9yZGVyLXJhZGl1czogMWVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcXG4gIHBhZGRpbmc6IDAgMC41ZW07XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4uc2xpZGVyLWZnIHtcXG4gIHBhZGRpbmc6IDFweCAwIDJweCAwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2FhYTtcXG4gIGhlaWdodDogMWVtO1xcbiAgbWFyZ2luLWxlZnQ6IC0wLjVlbTtcXG4gIHBhZGRpbmctcmlnaHQ6IDAuNWVtO1xcbiAgYm9yZGVyLXJhZGl1czogMWVtIDAgMCAxZW07XFxufVxcblxcbi5zbGlkZXItZmc6YWZ0ZXIge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgYm9yZGVyLXJhZGl1czogMWVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGJvcmRlcjogIDFweCBzb2xpZCAjYWFhO1xcbiAgY29udGVudDogJyc7XFxuICBmbG9hdDogcmlnaHQ7XFxuICBtYXJnaW4tcmlnaHQ6IC0xZW07XFxuICBtYXJnaW4tdG9wOiAtMXB4O1xcbiAgaGVpZ2h0OiAwLjllbTtcXG4gIHdpZHRoOiAwLjllbTtcXG59XCIpO1xuXG5cbmRhdC5jb250cm9sbGVycy5GdW5jdGlvbkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKENvbnRyb2xsZXIsIGRvbSwgY29tbW9uKSB7XG5cbiAgLyoqXG4gICAqIEBjbGFzcyBQcm92aWRlcyBhIEdVSSBpbnRlcmZhY2UgdG8gZmlyZSBhIHNwZWNpZmllZCBtZXRob2QsIGEgcHJvcGVydHkgb2YgYW4gb2JqZWN0LlxuICAgKlxuICAgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlclxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSBtYW5pcHVsYXRlZFxuICAgKlxuICAgKiBAbWVtYmVyIGRhdC5jb250cm9sbGVyc1xuICAgKi9cbiAgdmFyIEZ1bmN0aW9uQ29udHJvbGxlciA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHksIHRleHQpIHtcblxuICAgIEZ1bmN0aW9uQ29udHJvbGxlci5zdXBlcmNsYXNzLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5fX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX19idXR0b24uaW5uZXJIVE1MID0gdGV4dCA9PT0gdW5kZWZpbmVkID8gJ0ZpcmUnIDogdGV4dDtcbiAgICBkb20uYmluZCh0aGlzLl9fYnV0dG9uLCAnY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBfdGhpcy5maXJlKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICBkb20uYWRkQ2xhc3ModGhpcy5fX2J1dHRvbiwgJ2J1dHRvbicpO1xuXG4gICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX19idXR0b24pO1xuXG5cbiAgfTtcblxuICBGdW5jdGlvbkNvbnRyb2xsZXIuc3VwZXJjbGFzcyA9IENvbnRyb2xsZXI7XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgRnVuY3Rpb25Db250cm9sbGVyLnByb3RvdHlwZSxcbiAgICAgIENvbnRyb2xsZXIucHJvdG90eXBlLFxuICAgICAge1xuICAgICAgICBcbiAgICAgICAgZmlyZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX19vbkNoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5fX29uQ2hhbmdlLmNhbGwodGhpcyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGlzLl9fb25GaW5pc2hDaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuX19vbkZpbmlzaENoYW5nZS5jYWxsKHRoaXMsIHRoaXMuZ2V0VmFsdWUoKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuZ2V0VmFsdWUoKS5jYWxsKHRoaXMub2JqZWN0KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICk7XG5cbiAgcmV0dXJuIEZ1bmN0aW9uQ29udHJvbGxlcjtcblxufSkoZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXIsXG5kYXQuZG9tLmRvbSxcbmRhdC51dGlscy5jb21tb24pO1xuXG5cbmRhdC5jb250cm9sbGVycy5Cb29sZWFuQ29udHJvbGxlciA9IChmdW5jdGlvbiAoQ29udHJvbGxlciwgZG9tLCBjb21tb24pIHtcblxuICAvKipcbiAgICogQGNsYXNzIFByb3ZpZGVzIGEgY2hlY2tib3ggaW5wdXQgdG8gYWx0ZXIgdGhlIGJvb2xlYW4gcHJvcGVydHkgb2YgYW4gb2JqZWN0LlxuICAgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlclxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSBtYW5pcHVsYXRlZFxuICAgKlxuICAgKiBAbWVtYmVyIGRhdC5jb250cm9sbGVyc1xuICAgKi9cbiAgdmFyIEJvb2xlYW5Db250cm9sbGVyID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkge1xuXG4gICAgQm9vbGVhbkNvbnRyb2xsZXIuc3VwZXJjbGFzcy5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHkpO1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB0aGlzLl9fcHJldiA9IHRoaXMuZ2V0VmFsdWUoKTtcblxuICAgIHRoaXMuX19jaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgdGhpcy5fX2NoZWNrYm94LnNldEF0dHJpYnV0ZSgndHlwZScsICdjaGVja2JveCcpO1xuXG5cbiAgICBkb20uYmluZCh0aGlzLl9fY2hlY2tib3gsICdjaGFuZ2UnLCBvbkNoYW5nZSwgZmFsc2UpO1xuXG4gICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX19jaGVja2JveCk7XG5cbiAgICAvLyBNYXRjaCBvcmlnaW5hbCB2YWx1ZVxuICAgIHRoaXMudXBkYXRlRGlzcGxheSgpO1xuXG4gICAgZnVuY3Rpb24gb25DaGFuZ2UoKSB7XG4gICAgICBfdGhpcy5zZXRWYWx1ZSghX3RoaXMuX19wcmV2KTtcbiAgICB9XG5cbiAgfTtcblxuICBCb29sZWFuQ29udHJvbGxlci5zdXBlcmNsYXNzID0gQ29udHJvbGxlcjtcblxuICBjb21tb24uZXh0ZW5kKFxuXG4gICAgICBCb29sZWFuQ29udHJvbGxlci5wcm90b3R5cGUsXG4gICAgICBDb250cm9sbGVyLnByb3RvdHlwZSxcblxuICAgICAge1xuXG4gICAgICAgIHNldFZhbHVlOiBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgdmFyIHRvUmV0dXJuID0gQm9vbGVhbkNvbnRyb2xsZXIuc3VwZXJjbGFzcy5wcm90b3R5cGUuc2V0VmFsdWUuY2FsbCh0aGlzLCB2KTtcbiAgICAgICAgICBpZiAodGhpcy5fX29uRmluaXNoQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbCh0aGlzLCB0aGlzLmdldFZhbHVlKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9fcHJldiA9IHRoaXMuZ2V0VmFsdWUoKTtcbiAgICAgICAgICByZXR1cm4gdG9SZXR1cm47XG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlRGlzcGxheTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgXG4gICAgICAgICAgaWYgKHRoaXMuZ2V0VmFsdWUoKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5fX2NoZWNrYm94LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICdjaGVja2VkJyk7XG4gICAgICAgICAgICB0aGlzLl9fY2hlY2tib3guY2hlY2tlZCA9IHRydWU7ICAgIFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuX19jaGVja2JveC5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIEJvb2xlYW5Db250cm9sbGVyLnN1cGVyY2xhc3MucHJvdG90eXBlLnVwZGF0ZURpc3BsYXkuY2FsbCh0aGlzKTtcblxuICAgICAgICB9XG5cblxuICAgICAgfVxuXG4gICk7XG5cbiAgcmV0dXJuIEJvb2xlYW5Db250cm9sbGVyO1xuXG59KShkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlcixcbmRhdC5kb20uZG9tLFxuZGF0LnV0aWxzLmNvbW1vbik7XG5cblxuZGF0LmNvbG9yLnRvU3RyaW5nID0gKGZ1bmN0aW9uIChjb21tb24pIHtcblxuICByZXR1cm4gZnVuY3Rpb24oY29sb3IpIHtcblxuICAgIGlmIChjb2xvci5hID09IDEgfHwgY29tbW9uLmlzVW5kZWZpbmVkKGNvbG9yLmEpKSB7XG5cbiAgICAgIHZhciBzID0gY29sb3IuaGV4LnRvU3RyaW5nKDE2KTtcbiAgICAgIHdoaWxlIChzLmxlbmd0aCA8IDYpIHtcbiAgICAgICAgcyA9ICcwJyArIHM7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAnIycgKyBzO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgcmV0dXJuICdyZ2JhKCcgKyBNYXRoLnJvdW5kKGNvbG9yLnIpICsgJywnICsgTWF0aC5yb3VuZChjb2xvci5nKSArICcsJyArIE1hdGgucm91bmQoY29sb3IuYikgKyAnLCcgKyBjb2xvci5hICsgJyknO1xuXG4gICAgfVxuXG4gIH1cblxufSkoZGF0LnV0aWxzLmNvbW1vbik7XG5cblxuZGF0LmNvbG9yLmludGVycHJldCA9IChmdW5jdGlvbiAodG9TdHJpbmcsIGNvbW1vbikge1xuXG4gIHZhciByZXN1bHQsIHRvUmV0dXJuO1xuXG4gIHZhciBpbnRlcnByZXQgPSBmdW5jdGlvbigpIHtcblxuICAgIHRvUmV0dXJuID0gZmFsc2U7XG5cbiAgICB2YXIgb3JpZ2luYWwgPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGNvbW1vbi50b0FycmF5KGFyZ3VtZW50cykgOiBhcmd1bWVudHNbMF07XG5cbiAgICBjb21tb24uZWFjaChJTlRFUlBSRVRBVElPTlMsIGZ1bmN0aW9uKGZhbWlseSkge1xuXG4gICAgICBpZiAoZmFtaWx5LmxpdG11cyhvcmlnaW5hbCkpIHtcblxuICAgICAgICBjb21tb24uZWFjaChmYW1pbHkuY29udmVyc2lvbnMsIGZ1bmN0aW9uKGNvbnZlcnNpb24sIGNvbnZlcnNpb25OYW1lKSB7XG5cbiAgICAgICAgICByZXN1bHQgPSBjb252ZXJzaW9uLnJlYWQob3JpZ2luYWwpO1xuXG4gICAgICAgICAgaWYgKHRvUmV0dXJuID09PSBmYWxzZSAmJiByZXN1bHQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0b1JldHVybiA9IHJlc3VsdDtcbiAgICAgICAgICAgIHJlc3VsdC5jb252ZXJzaW9uTmFtZSA9IGNvbnZlcnNpb25OYW1lO1xuICAgICAgICAgICAgcmVzdWx0LmNvbnZlcnNpb24gPSBjb252ZXJzaW9uO1xuICAgICAgICAgICAgcmV0dXJuIGNvbW1vbi5CUkVBSztcblxuICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gY29tbW9uLkJSRUFLO1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICAgIHJldHVybiB0b1JldHVybjtcblxuICB9O1xuXG4gIHZhciBJTlRFUlBSRVRBVElPTlMgPSBbXG5cbiAgICAvLyBTdHJpbmdzXG4gICAge1xuXG4gICAgICBsaXRtdXM6IGNvbW1vbi5pc1N0cmluZyxcblxuICAgICAgY29udmVyc2lvbnM6IHtcblxuICAgICAgICBUSFJFRV9DSEFSX0hFWDoge1xuXG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcblxuICAgICAgICAgICAgdmFyIHRlc3QgPSBvcmlnaW5hbC5tYXRjaCgvXiMoW0EtRjAtOV0pKFtBLUYwLTldKShbQS1GMC05XSkkL2kpO1xuICAgICAgICAgICAgaWYgKHRlc3QgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdIRVgnLFxuICAgICAgICAgICAgICBoZXg6IHBhcnNlSW50KFxuICAgICAgICAgICAgICAgICAgJzB4JyArXG4gICAgICAgICAgICAgICAgICAgICAgdGVzdFsxXS50b1N0cmluZygpICsgdGVzdFsxXS50b1N0cmluZygpICtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXN0WzJdLnRvU3RyaW5nKCkgKyB0ZXN0WzJdLnRvU3RyaW5nKCkgK1xuICAgICAgICAgICAgICAgICAgICAgIHRlc3RbM10udG9TdHJpbmcoKSArIHRlc3RbM10udG9TdHJpbmcoKSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IHRvU3RyaW5nXG5cbiAgICAgICAgfSxcblxuICAgICAgICBTSVhfQ0hBUl9IRVg6IHtcblxuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG5cbiAgICAgICAgICAgIHZhciB0ZXN0ID0gb3JpZ2luYWwubWF0Y2goL14jKFtBLUYwLTldezZ9KSQvaSk7XG4gICAgICAgICAgICBpZiAodGVzdCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ0hFWCcsXG4gICAgICAgICAgICAgIGhleDogcGFyc2VJbnQoJzB4JyArIHRlc3RbMV0udG9TdHJpbmcoKSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IHRvU3RyaW5nXG5cbiAgICAgICAgfSxcblxuICAgICAgICBDU1NfUkdCOiB7XG5cbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuXG4gICAgICAgICAgICB2YXIgdGVzdCA9IG9yaWdpbmFsLm1hdGNoKC9ecmdiXFwoXFxzKiguKylcXHMqLFxccyooLispXFxzKixcXHMqKC4rKVxccypcXCkvKTtcbiAgICAgICAgICAgIGlmICh0ZXN0ID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgcjogcGFyc2VGbG9hdCh0ZXN0WzFdKSxcbiAgICAgICAgICAgICAgZzogcGFyc2VGbG9hdCh0ZXN0WzJdKSxcbiAgICAgICAgICAgICAgYjogcGFyc2VGbG9hdCh0ZXN0WzNdKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogdG9TdHJpbmdcblxuICAgICAgICB9LFxuXG4gICAgICAgIENTU19SR0JBOiB7XG5cbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuXG4gICAgICAgICAgICB2YXIgdGVzdCA9IG9yaWdpbmFsLm1hdGNoKC9ecmdiYVxcKFxccyooLispXFxzKixcXHMqKC4rKVxccyosXFxzKiguKylcXHMqXFwsXFxzKiguKylcXHMqXFwpLyk7XG4gICAgICAgICAgICBpZiAodGVzdCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICAgIHI6IHBhcnNlRmxvYXQodGVzdFsxXSksXG4gICAgICAgICAgICAgIGc6IHBhcnNlRmxvYXQodGVzdFsyXSksXG4gICAgICAgICAgICAgIGI6IHBhcnNlRmxvYXQodGVzdFszXSksXG4gICAgICAgICAgICAgIGE6IHBhcnNlRmxvYXQodGVzdFs0XSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IHRvU3RyaW5nXG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgLy8gTnVtYmVyc1xuICAgIHtcblxuICAgICAgbGl0bXVzOiBjb21tb24uaXNOdW1iZXIsXG5cbiAgICAgIGNvbnZlcnNpb25zOiB7XG5cbiAgICAgICAgSEVYOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnSEVYJyxcbiAgICAgICAgICAgICAgaGV4OiBvcmlnaW5hbCxcbiAgICAgICAgICAgICAgY29udmVyc2lvbk5hbWU6ICdIRVgnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIGNvbG9yLmhleDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8vIEFycmF5c1xuICAgIHtcblxuICAgICAgbGl0bXVzOiBjb21tb24uaXNBcnJheSxcblxuICAgICAgY29udmVyc2lvbnM6IHtcblxuICAgICAgICBSR0JfQVJSQVk6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgaWYgKG9yaWdpbmFsLmxlbmd0aCAhPSAzKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICAgIHI6IG9yaWdpbmFsWzBdLFxuICAgICAgICAgICAgICBnOiBvcmlnaW5hbFsxXSxcbiAgICAgICAgICAgICAgYjogb3JpZ2luYWxbMl1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIFtjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBSR0JBX0FSUkFZOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChvcmlnaW5hbC5sZW5ndGggIT0gNCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICByOiBvcmlnaW5hbFswXSxcbiAgICAgICAgICAgICAgZzogb3JpZ2luYWxbMV0sXG4gICAgICAgICAgICAgIGI6IG9yaWdpbmFsWzJdLFxuICAgICAgICAgICAgICBhOiBvcmlnaW5hbFszXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gW2NvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmIsIGNvbG9yLmFdO1xuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvLyBPYmplY3RzXG4gICAge1xuXG4gICAgICBsaXRtdXM6IGNvbW1vbi5pc09iamVjdCxcblxuICAgICAgY29udmVyc2lvbnM6IHtcblxuICAgICAgICBSR0JBX09CSjoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnIpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmcpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmIpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmEpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICAgIHI6IG9yaWdpbmFsLnIsXG4gICAgICAgICAgICAgICAgZzogb3JpZ2luYWwuZyxcbiAgICAgICAgICAgICAgICBiOiBvcmlnaW5hbC5iLFxuICAgICAgICAgICAgICAgIGE6IG9yaWdpbmFsLmFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHI6IGNvbG9yLnIsXG4gICAgICAgICAgICAgIGc6IGNvbG9yLmcsXG4gICAgICAgICAgICAgIGI6IGNvbG9yLmIsXG4gICAgICAgICAgICAgIGE6IGNvbG9yLmFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgUkdCX09CSjoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnIpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmcpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmIpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICAgIHI6IG9yaWdpbmFsLnIsXG4gICAgICAgICAgICAgICAgZzogb3JpZ2luYWwuZyxcbiAgICAgICAgICAgICAgICBiOiBvcmlnaW5hbC5iXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICByOiBjb2xvci5yLFxuICAgICAgICAgICAgICBnOiBjb2xvci5nLFxuICAgICAgICAgICAgICBiOiBjb2xvci5iXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIEhTVkFfT0JKOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuaCkgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwucykgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwudikgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuYSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzcGFjZTogJ0hTVicsXG4gICAgICAgICAgICAgICAgaDogb3JpZ2luYWwuaCxcbiAgICAgICAgICAgICAgICBzOiBvcmlnaW5hbC5zLFxuICAgICAgICAgICAgICAgIHY6IG9yaWdpbmFsLnYsXG4gICAgICAgICAgICAgICAgYTogb3JpZ2luYWwuYVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgaDogY29sb3IuaCxcbiAgICAgICAgICAgICAgczogY29sb3IucyxcbiAgICAgICAgICAgICAgdjogY29sb3IudixcbiAgICAgICAgICAgICAgYTogY29sb3IuYVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBIU1ZfT0JKOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuaCkgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwucykgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwudikpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzcGFjZTogJ0hTVicsXG4gICAgICAgICAgICAgICAgaDogb3JpZ2luYWwuaCxcbiAgICAgICAgICAgICAgICBzOiBvcmlnaW5hbC5zLFxuICAgICAgICAgICAgICAgIHY6IG9yaWdpbmFsLnZcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGg6IGNvbG9yLmgsXG4gICAgICAgICAgICAgIHM6IGNvbG9yLnMsXG4gICAgICAgICAgICAgIHY6IGNvbG9yLnZcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9XG5cblxuICBdO1xuXG4gIHJldHVybiBpbnRlcnByZXQ7XG5cblxufSkoZGF0LmNvbG9yLnRvU3RyaW5nLFxuZGF0LnV0aWxzLmNvbW1vbik7XG5cblxuZGF0LkdVSSA9IGRhdC5ndWkuR1VJID0gKGZ1bmN0aW9uIChjc3MsIHNhdmVEaWFsb2d1ZUNvbnRlbnRzLCBzdHlsZVNoZWV0LCBjb250cm9sbGVyRmFjdG9yeSwgQ29udHJvbGxlciwgQm9vbGVhbkNvbnRyb2xsZXIsIEZ1bmN0aW9uQ29udHJvbGxlciwgTnVtYmVyQ29udHJvbGxlckJveCwgTnVtYmVyQ29udHJvbGxlclNsaWRlciwgT3B0aW9uQ29udHJvbGxlciwgQ29sb3JDb250cm9sbGVyLCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUsIENlbnRlcmVkRGl2LCBkb20sIGNvbW1vbikge1xuXG4gIGNzcy5pbmplY3Qoc3R5bGVTaGVldCk7XG5cbiAgLyoqIE91dGVyLW1vc3QgY2xhc3NOYW1lIGZvciBHVUkncyAqL1xuICB2YXIgQ1NTX05BTUVTUEFDRSA9ICdkZyc7XG5cbiAgdmFyIEhJREVfS0VZX0NPREUgPSA3MjtcblxuICAvKiogVGhlIG9ubHkgdmFsdWUgc2hhcmVkIGJldHdlZW4gdGhlIEpTIGFuZCBTQ1NTLiBVc2UgY2F1dGlvbi4gKi9cbiAgdmFyIENMT1NFX0JVVFRPTl9IRUlHSFQgPSAyMDtcblxuICB2YXIgREVGQVVMVF9ERUZBVUxUX1BSRVNFVF9OQU1FID0gJ0RlZmF1bHQnO1xuXG4gIHZhciBTVVBQT1JUU19MT0NBTF9TVE9SQUdFID0gKGZ1bmN0aW9uKCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gJ2xvY2FsU3RvcmFnZScgaW4gd2luZG93ICYmIHdpbmRvd1snbG9jYWxTdG9yYWdlJ10gIT09IG51bGw7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSkoKTtcblxuICB2YXIgU0FWRV9ESUFMT0dVRTtcblxuICAvKiogSGF2ZSB3ZSB5ZXQgdG8gY3JlYXRlIGFuIGF1dG9QbGFjZSBHVUk/ICovXG4gIHZhciBhdXRvX3BsYWNlX3ZpcmdpbiA9IHRydWU7XG5cbiAgLyoqIEZpeGVkIHBvc2l0aW9uIGRpdiB0aGF0IGF1dG8gcGxhY2UgR1VJJ3MgZ28gaW5zaWRlICovXG4gIHZhciBhdXRvX3BsYWNlX2NvbnRhaW5lcjtcblxuICAvKiogQXJlIHdlIGhpZGluZyB0aGUgR1VJJ3MgPyAqL1xuICB2YXIgaGlkZSA9IGZhbHNlO1xuXG4gIC8qKiBHVUkncyB3aGljaCBzaG91bGQgYmUgaGlkZGVuICovXG4gIHZhciBoaWRlYWJsZV9ndWlzID0gW107XG5cbiAgLyoqXG4gICAqIEEgbGlnaHR3ZWlnaHQgY29udHJvbGxlciBsaWJyYXJ5IGZvciBKYXZhU2NyaXB0LiBJdCBhbGxvd3MgeW91IHRvIGVhc2lseVxuICAgKiBtYW5pcHVsYXRlIHZhcmlhYmxlcyBhbmQgZmlyZSBmdW5jdGlvbnMgb24gdGhlIGZseS5cbiAgICogQGNsYXNzXG4gICAqXG4gICAqIEBtZW1iZXIgZGF0Lmd1aVxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc11cbiAgICogQHBhcmFtIHtTdHJpbmd9IFtwYXJhbXMubmFtZV0gVGhlIG5hbWUgb2YgdGhpcyBHVUkuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zLmxvYWRdIEpTT04gb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgc2F2ZWQgc3RhdGUgb2ZcbiAgICogdGhpcyBHVUkuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3BhcmFtcy5hdXRvPXRydWVdXG4gICAqIEBwYXJhbSB7ZGF0Lmd1aS5HVUl9IFtwYXJhbXMucGFyZW50XSBUaGUgR1VJIEknbSBuZXN0ZWQgaW4uXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3BhcmFtcy5jbG9zZWRdIElmIHRydWUsIHN0YXJ0cyBjbG9zZWRcbiAgICovXG4gIHZhciBHVUkgPSBmdW5jdGlvbihwYXJhbXMpIHtcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAvKipcbiAgICAgKiBPdXRlcm1vc3QgRE9NIEVsZW1lbnRcbiAgICAgKiBAdHlwZSBET01FbGVtZW50XG4gICAgICovXG4gICAgdGhpcy5kb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fX3VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX3VsKTtcblxuICAgIGRvbS5hZGRDbGFzcyh0aGlzLmRvbUVsZW1lbnQsIENTU19OQU1FU1BBQ0UpO1xuXG4gICAgLyoqXG4gICAgICogTmVzdGVkIEdVSSdzIGJ5IG5hbWVcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgdGhpcy5fX2ZvbGRlcnMgPSB7fTtcblxuICAgIHRoaXMuX19jb250cm9sbGVycyA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogTGlzdCBvZiBvYmplY3RzIEknbSByZW1lbWJlcmluZyBmb3Igc2F2ZSwgb25seSB1c2VkIGluIHRvcCBsZXZlbCBHVUlcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgdGhpcy5fX3JlbWVtYmVyZWRPYmplY3RzID0gW107XG5cbiAgICAvKipcbiAgICAgKiBNYXBzIHRoZSBpbmRleCBvZiByZW1lbWJlcmVkIG9iamVjdHMgdG8gYSBtYXAgb2YgY29udHJvbGxlcnMsIG9ubHkgdXNlZFxuICAgICAqIGluIHRvcCBsZXZlbCBHVUkuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBpZ25vcmVcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogW1xuICAgICAqICB7XG4gICAgICogICAgcHJvcGVydHlOYW1lOiBDb250cm9sbGVyLFxuICAgICAqICAgIGFub3RoZXJQcm9wZXJ0eU5hbWU6IENvbnRyb2xsZXJcbiAgICAgKiAgfSxcbiAgICAgKiAge1xuICAgICAqICAgIHByb3BlcnR5TmFtZTogQ29udHJvbGxlclxuICAgICAqICB9XG4gICAgICogXVxuICAgICAqL1xuICAgIHRoaXMuX19yZW1lbWJlcmVkT2JqZWN0SW5kZWNlc1RvQ29udHJvbGxlcnMgPSBbXTtcblxuICAgIHRoaXMuX19saXN0ZW5pbmcgPSBbXTtcblxuICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7fTtcblxuICAgIC8vIERlZmF1bHQgcGFyYW1ldGVyc1xuICAgIHBhcmFtcyA9IGNvbW1vbi5kZWZhdWx0cyhwYXJhbXMsIHtcbiAgICAgIGF1dG9QbGFjZTogdHJ1ZSxcbiAgICAgIHdpZHRoOiBHVUkuREVGQVVMVF9XSURUSFxuICAgIH0pO1xuXG4gICAgcGFyYW1zID0gY29tbW9uLmRlZmF1bHRzKHBhcmFtcywge1xuICAgICAgcmVzaXphYmxlOiBwYXJhbXMuYXV0b1BsYWNlLFxuICAgICAgaGlkZWFibGU6IHBhcmFtcy5hdXRvUGxhY2VcbiAgICB9KTtcblxuXG4gICAgaWYgKCFjb21tb24uaXNVbmRlZmluZWQocGFyYW1zLmxvYWQpKSB7XG5cbiAgICAgIC8vIEV4cGxpY2l0IHByZXNldFxuICAgICAgaWYgKHBhcmFtcy5wcmVzZXQpIHBhcmFtcy5sb2FkLnByZXNldCA9IHBhcmFtcy5wcmVzZXQ7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBwYXJhbXMubG9hZCA9IHsgcHJlc2V0OiBERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUUgfTtcblxuICAgIH1cblxuICAgIGlmIChjb21tb24uaXNVbmRlZmluZWQocGFyYW1zLnBhcmVudCkgJiYgcGFyYW1zLmhpZGVhYmxlKSB7XG4gICAgICBoaWRlYWJsZV9ndWlzLnB1c2godGhpcyk7XG4gICAgfVxuXG4gICAgLy8gT25seSByb290IGxldmVsIEdVSSdzIGFyZSByZXNpemFibGUuXG4gICAgcGFyYW1zLnJlc2l6YWJsZSA9IGNvbW1vbi5pc1VuZGVmaW5lZChwYXJhbXMucGFyZW50KSAmJiBwYXJhbXMucmVzaXphYmxlO1xuXG5cbiAgICBpZiAocGFyYW1zLmF1dG9QbGFjZSAmJiBjb21tb24uaXNVbmRlZmluZWQocGFyYW1zLnNjcm9sbGFibGUpKSB7XG4gICAgICBwYXJhbXMuc2Nyb2xsYWJsZSA9IHRydWU7XG4gICAgfVxuLy8gICAgcGFyYW1zLnNjcm9sbGFibGUgPSBjb21tb24uaXNVbmRlZmluZWQocGFyYW1zLnBhcmVudCkgJiYgcGFyYW1zLnNjcm9sbGFibGUgPT09IHRydWU7XG5cbiAgICAvLyBOb3QgcGFydCBvZiBwYXJhbXMgYmVjYXVzZSBJIGRvbid0IHdhbnQgcGVvcGxlIHBhc3NpbmcgdGhpcyBpbiB2aWFcbiAgICAvLyBjb25zdHJ1Y3Rvci4gU2hvdWxkIGJlIGEgJ3JlbWVtYmVyZWQnIHZhbHVlLlxuICAgIHZhciB1c2VfbG9jYWxfc3RvcmFnZSA9XG4gICAgICAgIFNVUFBPUlRTX0xPQ0FMX1NUT1JBR0UgJiZcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGdldExvY2FsU3RvcmFnZUhhc2godGhpcywgJ2lzTG9jYWwnKSkgPT09ICd0cnVlJztcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsXG5cbiAgICAgICAgLyoqIEBsZW5kcyBkYXQuZ3VpLkdVSS5wcm90b3R5cGUgKi9cbiAgICAgICAge1xuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogVGhlIHBhcmVudCA8Y29kZT5HVUk8L2NvZGU+XG4gICAgICAgICAgICogQHR5cGUgZGF0Lmd1aS5HVUlcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBwYXJlbnQ6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwYXJhbXMucGFyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBzY3JvbGxhYmxlOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zLnNjcm9sbGFibGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIEhhbmRsZXMgPGNvZGU+R1VJPC9jb2RlPidzIGVsZW1lbnQgcGxhY2VtZW50IGZvciB5b3VcbiAgICAgICAgICAgKiBAdHlwZSBCb29sZWFuXG4gICAgICAgICAgICovXG4gICAgICAgICAgYXV0b1BsYWNlOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zLmF1dG9QbGFjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogVGhlIGlkZW50aWZpZXIgZm9yIGEgc2V0IG9mIHNhdmVkIHZhbHVlc1xuICAgICAgICAgICAqIEB0eXBlIFN0cmluZ1xuICAgICAgICAgICAqL1xuICAgICAgICAgIHByZXNldDoge1xuXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpZiAoX3RoaXMucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmdldFJvb3QoKS5wcmVzZXQ7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcy5sb2FkLnByZXNldDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICAgIGlmIChfdGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5nZXRSb290KCkucHJlc2V0ID0gdjtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJhbXMubG9hZC5wcmVzZXQgPSB2O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNldFByZXNldFNlbGVjdEluZGV4KHRoaXMpO1xuICAgICAgICAgICAgICBfdGhpcy5yZXZlcnQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBUaGUgd2lkdGggb2YgPGNvZGU+R1VJPC9jb2RlPiBlbGVtZW50XG4gICAgICAgICAgICogQHR5cGUgTnVtYmVyXG4gICAgICAgICAgICovXG4gICAgICAgICAgd2lkdGg6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwYXJhbXMud2lkdGg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICAgIHBhcmFtcy53aWR0aCA9IHY7XG4gICAgICAgICAgICAgIHNldFdpZHRoKF90aGlzLCB2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogVGhlIG5hbWUgb2YgPGNvZGU+R1VJPC9jb2RlPi4gVXNlZCBmb3IgZm9sZGVycy4gaS5lXG4gICAgICAgICAgICogYSBmb2xkZXIncyBuYW1lXG4gICAgICAgICAgICogQHR5cGUgU3RyaW5nXG4gICAgICAgICAgICovXG4gICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcy5uYW1lO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odikge1xuICAgICAgICAgICAgICAvLyBUT0RPIENoZWNrIGZvciBjb2xsaXNpb25zIGFtb25nIHNpYmxpbmcgZm9sZGVyc1xuICAgICAgICAgICAgICBwYXJhbXMubmFtZSA9IHY7XG4gICAgICAgICAgICAgIGlmICh0aXRsZV9yb3dfbmFtZSkge1xuICAgICAgICAgICAgICAgIHRpdGxlX3Jvd19uYW1lLmlubmVySFRNTCA9IHBhcmFtcy5uYW1lO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIFdoZXRoZXIgdGhlIDxjb2RlPkdVSTwvY29kZT4gaXMgY29sbGFwc2VkIG9yIG5vdFxuICAgICAgICAgICAqIEB0eXBlIEJvb2xlYW5cbiAgICAgICAgICAgKi9cbiAgICAgICAgICBjbG9zZWQ6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwYXJhbXMuY2xvc2VkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odikge1xuICAgICAgICAgICAgICBwYXJhbXMuY2xvc2VkID0gdjtcbiAgICAgICAgICAgICAgaWYgKHBhcmFtcy5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICBkb20uYWRkQ2xhc3MoX3RoaXMuX191bCwgR1VJLkNMQVNTX0NMT1NFRCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9tLnJlbW92ZUNsYXNzKF90aGlzLl9fdWwsIEdVSS5DTEFTU19DTE9TRUQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIEZvciBicm93c2VycyB0aGF0IGFyZW4ndCBnb2luZyB0byByZXNwZWN0IHRoZSBDU1MgdHJhbnNpdGlvbixcbiAgICAgICAgICAgICAgLy8gTGV0cyBqdXN0IGNoZWNrIG91ciBoZWlnaHQgYWdhaW5zdCB0aGUgd2luZG93IGhlaWdodCByaWdodCBvZmZcbiAgICAgICAgICAgICAgLy8gdGhlIGJhdC5cbiAgICAgICAgICAgICAgdGhpcy5vblJlc2l6ZSgpO1xuXG4gICAgICAgICAgICAgIGlmIChfdGhpcy5fX2Nsb3NlQnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX19jbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSB2ID8gR1VJLlRFWFRfT1BFTiA6IEdVSS5URVhUX0NMT1NFRDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBDb250YWlucyBhbGwgcHJlc2V0c1xuICAgICAgICAgICAqIEB0eXBlIE9iamVjdFxuICAgICAgICAgICAqL1xuICAgICAgICAgIGxvYWQ6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwYXJhbXMubG9hZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCB0byB1c2UgPGEgaHJlZj1cImh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0RPTS9TdG9yYWdlI2xvY2FsU3RvcmFnZVwiPmxvY2FsU3RvcmFnZTwvYT4gYXMgdGhlIG1lYW5zIGZvclxuICAgICAgICAgICAqIDxjb2RlPnJlbWVtYmVyPC9jb2RlPmluZ1xuICAgICAgICAgICAqIEB0eXBlIEJvb2xlYW5cbiAgICAgICAgICAgKi9cbiAgICAgICAgICB1c2VMb2NhbFN0b3JhZ2U6IHtcblxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHVzZV9sb2NhbF9zdG9yYWdlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24oYm9vbCkge1xuICAgICAgICAgICAgICBpZiAoU1VQUE9SVFNfTE9DQUxfU1RPUkFHRSkge1xuICAgICAgICAgICAgICAgIHVzZV9sb2NhbF9zdG9yYWdlID0gYm9vbDtcbiAgICAgICAgICAgICAgICBpZiAoYm9vbCkge1xuICAgICAgICAgICAgICAgICAgZG9tLmJpbmQod2luZG93LCAndW5sb2FkJywgc2F2ZVRvTG9jYWxTdG9yYWdlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZG9tLnVuYmluZCh3aW5kb3csICd1bmxvYWQnLCBzYXZlVG9Mb2NhbFN0b3JhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShnZXRMb2NhbFN0b3JhZ2VIYXNoKF90aGlzLCAnaXNMb2NhbCcpLCBib29sKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgLy8gQXJlIHdlIGEgcm9vdCBsZXZlbCBHVUk/XG4gICAgaWYgKGNvbW1vbi5pc1VuZGVmaW5lZChwYXJhbXMucGFyZW50KSkge1xuXG4gICAgICBwYXJhbXMuY2xvc2VkID0gZmFsc2U7XG5cbiAgICAgIGRvbS5hZGRDbGFzcyh0aGlzLmRvbUVsZW1lbnQsIEdVSS5DTEFTU19NQUlOKTtcbiAgICAgIGRvbS5tYWtlU2VsZWN0YWJsZSh0aGlzLmRvbUVsZW1lbnQsIGZhbHNlKTtcblxuICAgICAgLy8gQXJlIHdlIHN1cHBvc2VkIHRvIGJlIGxvYWRpbmcgbG9jYWxseT9cbiAgICAgIGlmIChTVVBQT1JUU19MT0NBTF9TVE9SQUdFKSB7XG5cbiAgICAgICAgaWYgKHVzZV9sb2NhbF9zdG9yYWdlKSB7XG5cbiAgICAgICAgICBfdGhpcy51c2VMb2NhbFN0b3JhZ2UgPSB0cnVlO1xuXG4gICAgICAgICAgdmFyIHNhdmVkX2d1aSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGdldExvY2FsU3RvcmFnZUhhc2godGhpcywgJ2d1aScpKTtcblxuICAgICAgICAgIGlmIChzYXZlZF9ndWkpIHtcbiAgICAgICAgICAgIHBhcmFtcy5sb2FkID0gSlNPTi5wYXJzZShzYXZlZF9ndWkpO1xuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgICAgdGhpcy5fX2Nsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0aGlzLl9fY2xvc2VCdXR0b24uaW5uZXJIVE1MID0gR1VJLlRFWFRfQ0xPU0VEO1xuICAgICAgZG9tLmFkZENsYXNzKHRoaXMuX19jbG9zZUJ1dHRvbiwgR1VJLkNMQVNTX0NMT1NFX0JVVFRPTik7XG4gICAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX2Nsb3NlQnV0dG9uKTtcblxuICAgICAgZG9tLmJpbmQodGhpcy5fX2Nsb3NlQnV0dG9uLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcblxuICAgICAgICBfdGhpcy5jbG9zZWQgPSAhX3RoaXMuY2xvc2VkO1xuXG5cbiAgICAgIH0pO1xuXG5cbiAgICAgIC8vIE9oLCB5b3UncmUgYSBuZXN0ZWQgR1VJIVxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGlmIChwYXJhbXMuY2xvc2VkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcGFyYW1zLmNsb3NlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHZhciB0aXRsZV9yb3dfbmFtZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHBhcmFtcy5uYW1lKTtcbiAgICAgIGRvbS5hZGRDbGFzcyh0aXRsZV9yb3dfbmFtZSwgJ2NvbnRyb2xsZXItbmFtZScpO1xuXG4gICAgICB2YXIgdGl0bGVfcm93ID0gYWRkUm93KF90aGlzLCB0aXRsZV9yb3dfbmFtZSk7XG5cbiAgICAgIHZhciBvbl9jbGlja190aXRsZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBfdGhpcy5jbG9zZWQgPSAhX3RoaXMuY2xvc2VkO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgICBkb20uYWRkQ2xhc3ModGhpcy5fX3VsLCBHVUkuQ0xBU1NfQ0xPU0VEKTtcblxuICAgICAgZG9tLmFkZENsYXNzKHRpdGxlX3JvdywgJ3RpdGxlJyk7XG4gICAgICBkb20uYmluZCh0aXRsZV9yb3csICdjbGljaycsIG9uX2NsaWNrX3RpdGxlKTtcblxuICAgICAgaWYgKCFwYXJhbXMuY2xvc2VkKSB7XG4gICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBpZiAocGFyYW1zLmF1dG9QbGFjZSkge1xuXG4gICAgICBpZiAoY29tbW9uLmlzVW5kZWZpbmVkKHBhcmFtcy5wYXJlbnQpKSB7XG5cbiAgICAgICAgaWYgKGF1dG9fcGxhY2VfdmlyZ2luKSB7XG4gICAgICAgICAgYXV0b19wbGFjZV9jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICBkb20uYWRkQ2xhc3MoYXV0b19wbGFjZV9jb250YWluZXIsIENTU19OQU1FU1BBQ0UpO1xuICAgICAgICAgIGRvbS5hZGRDbGFzcyhhdXRvX3BsYWNlX2NvbnRhaW5lciwgR1VJLkNMQVNTX0FVVE9fUExBQ0VfQ09OVEFJTkVSKTtcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGF1dG9fcGxhY2VfY29udGFpbmVyKTtcbiAgICAgICAgICBhdXRvX3BsYWNlX3ZpcmdpbiA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUHV0IGl0IGluIHRoZSBkb20gZm9yIHlvdS5cbiAgICAgICAgYXV0b19wbGFjZV9jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5kb21FbGVtZW50KTtcblxuICAgICAgICAvLyBBcHBseSB0aGUgYXV0byBzdHlsZXNcbiAgICAgICAgZG9tLmFkZENsYXNzKHRoaXMuZG9tRWxlbWVudCwgR1VJLkNMQVNTX0FVVE9fUExBQ0UpO1xuXG4gICAgICB9XG5cblxuICAgICAgLy8gTWFrZSBpdCBub3QgZWxhc3RpYy5cbiAgICAgIGlmICghdGhpcy5wYXJlbnQpIHNldFdpZHRoKF90aGlzLCBwYXJhbXMud2lkdGgpO1xuXG4gICAgfVxuXG4gICAgZG9tLmJpbmQod2luZG93LCAncmVzaXplJywgZnVuY3Rpb24oKSB7IF90aGlzLm9uUmVzaXplKCkgfSk7XG4gICAgZG9tLmJpbmQodGhpcy5fX3VsLCAnd2Via2l0VHJhbnNpdGlvbkVuZCcsIGZ1bmN0aW9uKCkgeyBfdGhpcy5vblJlc2l6ZSgpOyB9KTtcbiAgICBkb20uYmluZCh0aGlzLl9fdWwsICd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24oKSB7IF90aGlzLm9uUmVzaXplKCkgfSk7XG4gICAgZG9tLmJpbmQodGhpcy5fX3VsLCAnb1RyYW5zaXRpb25FbmQnLCBmdW5jdGlvbigpIHsgX3RoaXMub25SZXNpemUoKSB9KTtcbiAgICB0aGlzLm9uUmVzaXplKCk7XG5cblxuICAgIGlmIChwYXJhbXMucmVzaXphYmxlKSB7XG4gICAgICBhZGRSZXNpemVIYW5kbGUodGhpcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2F2ZVRvTG9jYWxTdG9yYWdlKCkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oZ2V0TG9jYWxTdG9yYWdlSGFzaChfdGhpcywgJ2d1aScpLCBKU09OLnN0cmluZ2lmeShfdGhpcy5nZXRTYXZlT2JqZWN0KCkpKTtcbiAgICB9XG5cbiAgICB2YXIgcm9vdCA9IF90aGlzLmdldFJvb3QoKTtcbiAgICBmdW5jdGlvbiByZXNldFdpZHRoKCkge1xuICAgICAgICB2YXIgcm9vdCA9IF90aGlzLmdldFJvb3QoKTtcbiAgICAgICAgcm9vdC53aWR0aCArPSAxO1xuICAgICAgICBjb21tb24uZGVmZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcm9vdC53aWR0aCAtPSAxO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFwYXJhbXMucGFyZW50KSB7XG4gICAgICAgIHJlc2V0V2lkdGgoKTtcbiAgICAgIH1cblxuICB9O1xuXG4gIEdVSS50b2dnbGVIaWRlID0gZnVuY3Rpb24oKSB7XG5cbiAgICBoaWRlID0gIWhpZGU7XG4gICAgY29tbW9uLmVhY2goaGlkZWFibGVfZ3VpcywgZnVuY3Rpb24oZ3VpKSB7XG4gICAgICBndWkuZG9tRWxlbWVudC5zdHlsZS56SW5kZXggPSBoaWRlID8gLTk5OSA6IDk5OTtcbiAgICAgIGd1aS5kb21FbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBoaWRlID8gMCA6IDE7XG4gICAgfSk7XG4gIH07XG5cbiAgR1VJLkNMQVNTX0FVVE9fUExBQ0UgPSAnYSc7XG4gIEdVSS5DTEFTU19BVVRPX1BMQUNFX0NPTlRBSU5FUiA9ICdhYyc7XG4gIEdVSS5DTEFTU19NQUlOID0gJ21haW4nO1xuICBHVUkuQ0xBU1NfQ09OVFJPTExFUl9ST1cgPSAnY3InO1xuICBHVUkuQ0xBU1NfVE9PX1RBTEwgPSAndGFsbGVyLXRoYW4td2luZG93JztcbiAgR1VJLkNMQVNTX0NMT1NFRCA9ICdjbG9zZWQnO1xuICBHVUkuQ0xBU1NfQ0xPU0VfQlVUVE9OID0gJ2Nsb3NlLWJ1dHRvbic7XG4gIEdVSS5DTEFTU19EUkFHID0gJ2RyYWcnO1xuXG4gIEdVSS5ERUZBVUxUX1dJRFRIID0gMjQ1O1xuICBHVUkuVEVYVF9DTE9TRUQgPSAnQ2xvc2UgQ29udHJvbHMnO1xuICBHVUkuVEVYVF9PUEVOID0gJ09wZW4gQ29udHJvbHMnO1xuXG4gIGRvbS5iaW5kKHdpbmRvdywgJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG5cbiAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudC50eXBlICE9PSAndGV4dCcgJiZcbiAgICAgICAgKGUud2hpY2ggPT09IEhJREVfS0VZX0NPREUgfHwgZS5rZXlDb2RlID09IEhJREVfS0VZX0NPREUpKSB7XG4gICAgICBHVUkudG9nZ2xlSGlkZSgpO1xuICAgIH1cblxuICB9LCBmYWxzZSk7XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgR1VJLnByb3RvdHlwZSxcblxuICAgICAgLyoqIEBsZW5kcyBkYXQuZ3VpLkdVSSAqL1xuICAgICAge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0gb2JqZWN0XG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eVxuICAgICAgICAgKiBAcmV0dXJucyB7ZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXJ9IFRoZSBuZXcgY29udHJvbGxlciB0aGF0IHdhcyBhZGRlZC5cbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBhZGQ6IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHtcblxuICAgICAgICAgIHJldHVybiBhZGQoXG4gICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgIG9iamVjdCxcbiAgICAgICAgICAgICAgcHJvcGVydHksXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmYWN0b3J5QXJnczogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgKTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0gb2JqZWN0XG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eVxuICAgICAgICAgKiBAcmV0dXJucyB7ZGF0LmNvbnRyb2xsZXJzLkNvbG9yQ29udHJvbGxlcn0gVGhlIG5ldyBjb250cm9sbGVyIHRoYXQgd2FzIGFkZGVkLlxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIGFkZENvbG9yOiBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7XG5cbiAgICAgICAgICByZXR1cm4gYWRkKFxuICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICBvYmplY3QsXG4gICAgICAgICAgICAgIHByb3BlcnR5LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29sb3I6IHRydWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIGNvbnRyb2xsZXJcbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uKGNvbnRyb2xsZXIpIHtcblxuICAgICAgICAgIC8vIFRPRE8gbGlzdGVuaW5nP1xuICAgICAgICAgIHRoaXMuX191bC5yZW1vdmVDaGlsZChjb250cm9sbGVyLl9fbGkpO1xuICAgICAgICAgIHRoaXMuX19jb250cm9sbGVycy5zbGljZSh0aGlzLl9fY29udHJvbGxlcnMuaW5kZXhPZihjb250cm9sbGVyKSwgMSk7XG4gICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICBjb21tb24uZGVmZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBfdGhpcy5vblJlc2l6ZSgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICBpZiAodGhpcy5hdXRvUGxhY2UpIHtcbiAgICAgICAgICAgIGF1dG9fcGxhY2VfY29udGFpbmVyLnJlbW92ZUNoaWxkKHRoaXMuZG9tRWxlbWVudCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICAgICAqIEByZXR1cm5zIHtkYXQuZ3VpLkdVSX0gVGhlIG5ldyBmb2xkZXIuXG4gICAgICAgICAqIEB0aHJvd3Mge0Vycm9yfSBpZiB0aGlzIEdVSSBhbHJlYWR5IGhhcyBhIGZvbGRlciBieSB0aGUgc3BlY2lmaWVkXG4gICAgICAgICAqIG5hbWVcbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBhZGRGb2xkZXI6IGZ1bmN0aW9uKG5hbWUpIHtcblxuICAgICAgICAgIC8vIFdlIGhhdmUgdG8gcHJldmVudCBjb2xsaXNpb25zIG9uIG5hbWVzIGluIG9yZGVyIHRvIGhhdmUgYSBrZXlcbiAgICAgICAgICAvLyBieSB3aGljaCB0byByZW1lbWJlciBzYXZlZCB2YWx1ZXNcbiAgICAgICAgICBpZiAodGhpcy5fX2ZvbGRlcnNbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgYWxyZWFkeSBoYXZlIGEgZm9sZGVyIGluIHRoaXMgR1VJIGJ5IHRoZScgK1xuICAgICAgICAgICAgICAgICcgbmFtZSBcIicgKyBuYW1lICsgJ1wiJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIG5ld19ndWlfcGFyYW1zID0geyBuYW1lOiBuYW1lLCBwYXJlbnQ6IHRoaXMgfTtcblxuICAgICAgICAgIC8vIFdlIG5lZWQgdG8gcGFzcyBkb3duIHRoZSBhdXRvUGxhY2UgdHJhaXQgc28gdGhhdCB3ZSBjYW5cbiAgICAgICAgICAvLyBhdHRhY2ggZXZlbnQgbGlzdGVuZXJzIHRvIG9wZW4vY2xvc2UgZm9sZGVyIGFjdGlvbnMgdG9cbiAgICAgICAgICAvLyBlbnN1cmUgdGhhdCBhIHNjcm9sbGJhciBhcHBlYXJzIGlmIHRoZSB3aW5kb3cgaXMgdG9vIHNob3J0LlxuICAgICAgICAgIG5ld19ndWlfcGFyYW1zLmF1dG9QbGFjZSA9IHRoaXMuYXV0b1BsYWNlO1xuXG4gICAgICAgICAgLy8gRG8gd2UgaGF2ZSBzYXZlZCBhcHBlYXJhbmNlIGRhdGEgZm9yIHRoaXMgZm9sZGVyP1xuXG4gICAgICAgICAgaWYgKHRoaXMubG9hZCAmJiAvLyBBbnl0aGluZyBsb2FkZWQ/XG4gICAgICAgICAgICAgIHRoaXMubG9hZC5mb2xkZXJzICYmIC8vIFdhcyBteSBwYXJlbnQgYSBkZWFkLWVuZD9cbiAgICAgICAgICAgICAgdGhpcy5sb2FkLmZvbGRlcnNbbmFtZV0pIHsgLy8gRGlkIGRhZGR5IHJlbWVtYmVyIG1lP1xuXG4gICAgICAgICAgICAvLyBTdGFydCBtZSBjbG9zZWQgaWYgSSB3YXMgY2xvc2VkXG4gICAgICAgICAgICBuZXdfZ3VpX3BhcmFtcy5jbG9zZWQgPSB0aGlzLmxvYWQuZm9sZGVyc1tuYW1lXS5jbG9zZWQ7XG5cbiAgICAgICAgICAgIC8vIFBhc3MgZG93biB0aGUgbG9hZGVkIGRhdGFcbiAgICAgICAgICAgIG5ld19ndWlfcGFyYW1zLmxvYWQgPSB0aGlzLmxvYWQuZm9sZGVyc1tuYW1lXTtcblxuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBndWkgPSBuZXcgR1VJKG5ld19ndWlfcGFyYW1zKTtcbiAgICAgICAgICB0aGlzLl9fZm9sZGVyc1tuYW1lXSA9IGd1aTtcblxuICAgICAgICAgIHZhciBsaSA9IGFkZFJvdyh0aGlzLCBndWkuZG9tRWxlbWVudCk7XG4gICAgICAgICAgZG9tLmFkZENsYXNzKGxpLCAnZm9sZGVyJyk7XG4gICAgICAgICAgcmV0dXJuIGd1aTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIG9wZW46IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICBvblJlc2l6ZTogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICB2YXIgcm9vdCA9IHRoaXMuZ2V0Um9vdCgpO1xuXG4gICAgICAgICAgaWYgKHJvb3Quc2Nyb2xsYWJsZSkge1xuXG4gICAgICAgICAgICB2YXIgdG9wID0gZG9tLmdldE9mZnNldChyb290Ll9fdWwpLnRvcDtcbiAgICAgICAgICAgIHZhciBoID0gMDtcblxuICAgICAgICAgICAgY29tbW9uLmVhY2gocm9vdC5fX3VsLmNoaWxkTm9kZXMsIGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgICAgICAgaWYgKCEgKHJvb3QuYXV0b1BsYWNlICYmIG5vZGUgPT09IHJvb3QuX19zYXZlX3JvdykpXG4gICAgICAgICAgICAgICAgaCArPSBkb20uZ2V0SGVpZ2h0KG5vZGUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICh3aW5kb3cuaW5uZXJIZWlnaHQgLSB0b3AgLSBDTE9TRV9CVVRUT05fSEVJR0hUIDwgaCkge1xuICAgICAgICAgICAgICBkb20uYWRkQ2xhc3Mocm9vdC5kb21FbGVtZW50LCBHVUkuQ0xBU1NfVE9PX1RBTEwpO1xuICAgICAgICAgICAgICByb290Ll9fdWwuc3R5bGUuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC0gdG9wIC0gQ0xPU0VfQlVUVE9OX0hFSUdIVCArICdweCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkb20ucmVtb3ZlQ2xhc3Mocm9vdC5kb21FbGVtZW50LCBHVUkuQ0xBU1NfVE9PX1RBTEwpO1xuICAgICAgICAgICAgICByb290Ll9fdWwuc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHJvb3QuX19yZXNpemVfaGFuZGxlKSB7XG4gICAgICAgICAgICBjb21tb24uZGVmZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJvb3QuX19yZXNpemVfaGFuZGxlLnN0eWxlLmhlaWdodCA9IHJvb3QuX191bC5vZmZzZXRIZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHJvb3QuX19jbG9zZUJ1dHRvbikge1xuICAgICAgICAgICAgcm9vdC5fX2Nsb3NlQnV0dG9uLnN0eWxlLndpZHRoID0gcm9vdC53aWR0aCArICdweCc7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE1hcmsgb2JqZWN0cyBmb3Igc2F2aW5nLiBUaGUgb3JkZXIgb2YgdGhlc2Ugb2JqZWN0cyBjYW5ub3QgY2hhbmdlIGFzXG4gICAgICAgICAqIHRoZSBHVUkgZ3Jvd3MuIFdoZW4gcmVtZW1iZXJpbmcgbmV3IG9iamVjdHMsIGFwcGVuZCB0aGVtIHRvIHRoZSBlbmRcbiAgICAgICAgICogb2YgdGhlIGxpc3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0Li4ufSBvYmplY3RzXG4gICAgICAgICAqIEB0aHJvd3Mge0Vycm9yfSBpZiBub3QgY2FsbGVkIG9uIGEgdG9wIGxldmVsIEdVSS5cbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICByZW1lbWJlcjogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICBpZiAoY29tbW9uLmlzVW5kZWZpbmVkKFNBVkVfRElBTE9HVUUpKSB7XG4gICAgICAgICAgICBTQVZFX0RJQUxPR1VFID0gbmV3IENlbnRlcmVkRGl2KCk7XG4gICAgICAgICAgICBTQVZFX0RJQUxPR1VFLmRvbUVsZW1lbnQuaW5uZXJIVE1MID0gc2F2ZURpYWxvZ3VlQ29udGVudHM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJZb3UgY2FuIG9ubHkgY2FsbCByZW1lbWJlciBvbiBhIHRvcCBsZXZlbCBHVUkuXCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICBjb21tb24uZWFjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpLCBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgICAgICAgIGlmIChfdGhpcy5fX3JlbWVtYmVyZWRPYmplY3RzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgIGFkZFNhdmVNZW51KF90aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChfdGhpcy5fX3JlbWVtYmVyZWRPYmplY3RzLmluZGV4T2Yob2JqZWN0KSA9PSAtMSkge1xuICAgICAgICAgICAgICBfdGhpcy5fX3JlbWVtYmVyZWRPYmplY3RzLnB1c2gob2JqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmICh0aGlzLmF1dG9QbGFjZSkge1xuICAgICAgICAgICAgLy8gU2V0IHNhdmUgcm93IHdpZHRoXG4gICAgICAgICAgICBzZXRXaWR0aCh0aGlzLCB0aGlzLndpZHRoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybnMge2RhdC5ndWkuR1VJfSB0aGUgdG9wbW9zdCBwYXJlbnQgR1VJIG9mIGEgbmVzdGVkIEdVSS5cbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBnZXRSb290OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgZ3VpID0gdGhpcztcbiAgICAgICAgICB3aGlsZSAoZ3VpLnBhcmVudCkge1xuICAgICAgICAgICAgZ3VpID0gZ3VpLnBhcmVudDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGd1aTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybnMge09iamVjdH0gYSBKU09OIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGN1cnJlbnQgc3RhdGUgb2ZcbiAgICAgICAgICogdGhpcyBHVUkgYXMgd2VsbCBhcyBpdHMgcmVtZW1iZXJlZCBwcm9wZXJ0aWVzLlxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIGdldFNhdmVPYmplY3Q6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgdmFyIHRvUmV0dXJuID0gdGhpcy5sb2FkO1xuXG4gICAgICAgICAgdG9SZXR1cm4uY2xvc2VkID0gdGhpcy5jbG9zZWQ7XG5cbiAgICAgICAgICAvLyBBbSBJIHJlbWVtYmVyaW5nIGFueSB2YWx1ZXM/XG4gICAgICAgICAgaWYgKHRoaXMuX19yZW1lbWJlcmVkT2JqZWN0cy5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIHRvUmV0dXJuLnByZXNldCA9IHRoaXMucHJlc2V0O1xuXG4gICAgICAgICAgICBpZiAoIXRvUmV0dXJuLnJlbWVtYmVyZWQpIHtcbiAgICAgICAgICAgICAgdG9SZXR1cm4ucmVtZW1iZXJlZCA9IHt9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0b1JldHVybi5yZW1lbWJlcmVkW3RoaXMucHJlc2V0XSA9IGdldEN1cnJlbnRQcmVzZXQodGhpcyk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0b1JldHVybi5mb2xkZXJzID0ge307XG4gICAgICAgICAgY29tbW9uLmVhY2godGhpcy5fX2ZvbGRlcnMsIGZ1bmN0aW9uKGVsZW1lbnQsIGtleSkge1xuICAgICAgICAgICAgdG9SZXR1cm4uZm9sZGVyc1trZXldID0gZWxlbWVudC5nZXRTYXZlT2JqZWN0KCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gdG9SZXR1cm47XG5cbiAgICAgICAgfSxcblxuICAgICAgICBzYXZlOiBmdW5jdGlvbigpIHtcblxuICAgICAgICAgIGlmICghdGhpcy5sb2FkLnJlbWVtYmVyZWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZC5yZW1lbWJlcmVkID0ge307XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5sb2FkLnJlbWVtYmVyZWRbdGhpcy5wcmVzZXRdID0gZ2V0Q3VycmVudFByZXNldCh0aGlzKTtcbiAgICAgICAgICBtYXJrUHJlc2V0TW9kaWZpZWQodGhpcywgZmFsc2UpO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2F2ZUFzOiBmdW5jdGlvbihwcmVzZXROYW1lKSB7XG5cbiAgICAgICAgICBpZiAoIXRoaXMubG9hZC5yZW1lbWJlcmVkKSB7XG5cbiAgICAgICAgICAgIC8vIFJldGFpbiBkZWZhdWx0IHZhbHVlcyB1cG9uIGZpcnN0IHNhdmVcbiAgICAgICAgICAgIHRoaXMubG9hZC5yZW1lbWJlcmVkID0ge307XG4gICAgICAgICAgICB0aGlzLmxvYWQucmVtZW1iZXJlZFtERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUVdID0gZ2V0Q3VycmVudFByZXNldCh0aGlzLCB0cnVlKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMubG9hZC5yZW1lbWJlcmVkW3ByZXNldE5hbWVdID0gZ2V0Q3VycmVudFByZXNldCh0aGlzKTtcbiAgICAgICAgICB0aGlzLnByZXNldCA9IHByZXNldE5hbWU7XG4gICAgICAgICAgYWRkUHJlc2V0T3B0aW9uKHRoaXMsIHByZXNldE5hbWUsIHRydWUpO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgcmV2ZXJ0OiBmdW5jdGlvbihndWkpIHtcblxuICAgICAgICAgIGNvbW1vbi5lYWNoKHRoaXMuX19jb250cm9sbGVycywgZnVuY3Rpb24oY29udHJvbGxlcikge1xuICAgICAgICAgICAgLy8gTWFrZSByZXZlcnQgd29yayBvbiBEZWZhdWx0LlxuICAgICAgICAgICAgaWYgKCF0aGlzLmdldFJvb3QoKS5sb2FkLnJlbWVtYmVyZWQpIHtcbiAgICAgICAgICAgICAgY29udHJvbGxlci5zZXRWYWx1ZShjb250cm9sbGVyLmluaXRpYWxWYWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZWNhbGxTYXZlZFZhbHVlKGd1aSB8fCB0aGlzLmdldFJvb3QoKSwgY29udHJvbGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgICBjb21tb24uZWFjaCh0aGlzLl9fZm9sZGVycywgZnVuY3Rpb24oZm9sZGVyKSB7XG4gICAgICAgICAgICBmb2xkZXIucmV2ZXJ0KGZvbGRlcik7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoIWd1aSkge1xuICAgICAgICAgICAgbWFya1ByZXNldE1vZGlmaWVkKHRoaXMuZ2V0Um9vdCgpLCBmYWxzZSk7XG4gICAgICAgICAgfVxuXG5cbiAgICAgICAgfSxcblxuICAgICAgICBsaXN0ZW46IGZ1bmN0aW9uKGNvbnRyb2xsZXIpIHtcblxuICAgICAgICAgIHZhciBpbml0ID0gdGhpcy5fX2xpc3RlbmluZy5sZW5ndGggPT0gMDtcbiAgICAgICAgICB0aGlzLl9fbGlzdGVuaW5nLnB1c2goY29udHJvbGxlcik7XG4gICAgICAgICAgaWYgKGluaXQpIHVwZGF0ZURpc3BsYXlzKHRoaXMuX19saXN0ZW5pbmcpO1xuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICk7XG5cbiAgZnVuY3Rpb24gYWRkKGd1aSwgb2JqZWN0LCBwcm9wZXJ0eSwgcGFyYW1zKSB7XG5cbiAgICBpZiAob2JqZWN0W3Byb3BlcnR5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPYmplY3QgXCIgKyBvYmplY3QgKyBcIiBoYXMgbm8gcHJvcGVydHkgXFxcIlwiICsgcHJvcGVydHkgKyBcIlxcXCJcIik7XG4gICAgfVxuXG4gICAgdmFyIGNvbnRyb2xsZXI7XG5cbiAgICBpZiAocGFyYW1zLmNvbG9yKSB7XG5cbiAgICAgIGNvbnRyb2xsZXIgPSBuZXcgQ29sb3JDb250cm9sbGVyKG9iamVjdCwgcHJvcGVydHkpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdmFyIGZhY3RvcnlBcmdzID0gW29iamVjdCxwcm9wZXJ0eV0uY29uY2F0KHBhcmFtcy5mYWN0b3J5QXJncyk7XG4gICAgICBjb250cm9sbGVyID0gY29udHJvbGxlckZhY3RvcnkuYXBwbHkoZ3VpLCBmYWN0b3J5QXJncyk7XG5cbiAgICB9XG5cbiAgICBpZiAocGFyYW1zLmJlZm9yZSBpbnN0YW5jZW9mIENvbnRyb2xsZXIpIHtcbiAgICAgIHBhcmFtcy5iZWZvcmUgPSBwYXJhbXMuYmVmb3JlLl9fbGk7XG4gICAgfVxuXG4gICAgcmVjYWxsU2F2ZWRWYWx1ZShndWksIGNvbnRyb2xsZXIpO1xuXG4gICAgZG9tLmFkZENsYXNzKGNvbnRyb2xsZXIuZG9tRWxlbWVudCwgJ2MnKTtcblxuICAgIHZhciBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGRvbS5hZGRDbGFzcyhuYW1lLCAncHJvcGVydHktbmFtZScpO1xuICAgIG5hbWUuaW5uZXJIVE1MID0gY29udHJvbGxlci5wcm9wZXJ0eTtcblxuICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobmFtZSk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRyb2xsZXIuZG9tRWxlbWVudCk7XG5cbiAgICB2YXIgbGkgPSBhZGRSb3coZ3VpLCBjb250YWluZXIsIHBhcmFtcy5iZWZvcmUpO1xuXG4gICAgZG9tLmFkZENsYXNzKGxpLCBHVUkuQ0xBU1NfQ09OVFJPTExFUl9ST1cpO1xuICAgIGRvbS5hZGRDbGFzcyhsaSwgdHlwZW9mIGNvbnRyb2xsZXIuZ2V0VmFsdWUoKSk7XG5cbiAgICBhdWdtZW50Q29udHJvbGxlcihndWksIGxpLCBjb250cm9sbGVyKTtcblxuICAgIGd1aS5fX2NvbnRyb2xsZXJzLnB1c2goY29udHJvbGxlcik7XG5cbiAgICByZXR1cm4gY29udHJvbGxlcjtcblxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIHJvdyB0byB0aGUgZW5kIG9mIHRoZSBHVUkgb3IgYmVmb3JlIGFub3RoZXIgcm93LlxuICAgKlxuICAgKiBAcGFyYW0gZ3VpXG4gICAqIEBwYXJhbSBbZG9tXSBJZiBzcGVjaWZpZWQsIGluc2VydHMgdGhlIGRvbSBjb250ZW50IGluIHRoZSBuZXcgcm93XG4gICAqIEBwYXJhbSBbbGlCZWZvcmVdIElmIHNwZWNpZmllZCwgcGxhY2VzIHRoZSBuZXcgcm93IGJlZm9yZSBhbm90aGVyIHJvd1xuICAgKi9cbiAgZnVuY3Rpb24gYWRkUm93KGd1aSwgZG9tLCBsaUJlZm9yZSkge1xuICAgIHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgaWYgKGRvbSkgbGkuYXBwZW5kQ2hpbGQoZG9tKTtcbiAgICBpZiAobGlCZWZvcmUpIHtcbiAgICAgIGd1aS5fX3VsLmluc2VydEJlZm9yZShsaSwgcGFyYW1zLmJlZm9yZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGd1aS5fX3VsLmFwcGVuZENoaWxkKGxpKTtcbiAgICB9XG4gICAgZ3VpLm9uUmVzaXplKCk7XG4gICAgcmV0dXJuIGxpO1xuICB9XG5cbiAgZnVuY3Rpb24gYXVnbWVudENvbnRyb2xsZXIoZ3VpLCBsaSwgY29udHJvbGxlcikge1xuXG4gICAgY29udHJvbGxlci5fX2xpID0gbGk7XG4gICAgY29udHJvbGxlci5fX2d1aSA9IGd1aTtcblxuICAgIGNvbW1vbi5leHRlbmQoY29udHJvbGxlciwge1xuXG4gICAgICBvcHRpb25zOiBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgY29udHJvbGxlci5yZW1vdmUoKTtcblxuICAgICAgICAgIHJldHVybiBhZGQoXG4gICAgICAgICAgICAgIGd1aSxcbiAgICAgICAgICAgICAgY29udHJvbGxlci5vYmplY3QsXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIucHJvcGVydHksXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBiZWZvcmU6IGNvbnRyb2xsZXIuX19saS5uZXh0RWxlbWVudFNpYmxpbmcsXG4gICAgICAgICAgICAgICAgZmFjdG9yeUFyZ3M6IFtjb21tb24udG9BcnJheShhcmd1bWVudHMpXVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbW1vbi5pc0FycmF5KG9wdGlvbnMpIHx8IGNvbW1vbi5pc09iamVjdChvcHRpb25zKSkge1xuICAgICAgICAgIGNvbnRyb2xsZXIucmVtb3ZlKCk7XG5cbiAgICAgICAgICByZXR1cm4gYWRkKFxuICAgICAgICAgICAgICBndWksXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIub2JqZWN0LFxuICAgICAgICAgICAgICBjb250cm9sbGVyLnByb3BlcnR5LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYmVmb3JlOiBjb250cm9sbGVyLl9fbGkubmV4dEVsZW1lbnRTaWJsaW5nLFxuICAgICAgICAgICAgICAgIGZhY3RvcnlBcmdzOiBbb3B0aW9uc11cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9LFxuXG4gICAgICBuYW1lOiBmdW5jdGlvbih2KSB7XG4gICAgICAgIGNvbnRyb2xsZXIuX19saS5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC5pbm5lckhUTUwgPSB2O1xuICAgICAgICByZXR1cm4gY29udHJvbGxlcjtcbiAgICAgIH0sXG5cbiAgICAgIGxpc3RlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRyb2xsZXIuX19ndWkubGlzdGVuKGNvbnRyb2xsZXIpO1xuICAgICAgICByZXR1cm4gY29udHJvbGxlcjtcbiAgICAgIH0sXG5cbiAgICAgIHJlbW92ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRyb2xsZXIuX19ndWkucmVtb3ZlKGNvbnRyb2xsZXIpO1xuICAgICAgICByZXR1cm4gY29udHJvbGxlcjtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgLy8gQWxsIHNsaWRlcnMgc2hvdWxkIGJlIGFjY29tcGFuaWVkIGJ5IGEgYm94LlxuICAgIGlmIChjb250cm9sbGVyIGluc3RhbmNlb2YgTnVtYmVyQ29udHJvbGxlclNsaWRlcikge1xuXG4gICAgICB2YXIgYm94ID0gbmV3IE51bWJlckNvbnRyb2xsZXJCb3goY29udHJvbGxlci5vYmplY3QsIGNvbnRyb2xsZXIucHJvcGVydHksXG4gICAgICAgICAgeyBtaW46IGNvbnRyb2xsZXIuX19taW4sIG1heDogY29udHJvbGxlci5fX21heCwgc3RlcDogY29udHJvbGxlci5fX3N0ZXAgfSk7XG5cbiAgICAgIGNvbW1vbi5lYWNoKFsndXBkYXRlRGlzcGxheScsICdvbkNoYW5nZScsICdvbkZpbmlzaENoYW5nZSddLCBmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgdmFyIHBjID0gY29udHJvbGxlclttZXRob2RdO1xuICAgICAgICB2YXIgcGIgPSBib3hbbWV0aG9kXTtcbiAgICAgICAgY29udHJvbGxlclttZXRob2RdID0gYm94W21ldGhvZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgcGMuYXBwbHkoY29udHJvbGxlciwgYXJncyk7XG4gICAgICAgICAgcmV0dXJuIHBiLmFwcGx5KGJveCwgYXJncyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBkb20uYWRkQ2xhc3MobGksICdoYXMtc2xpZGVyJyk7XG4gICAgICBjb250cm9sbGVyLmRvbUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGJveC5kb21FbGVtZW50LCBjb250cm9sbGVyLmRvbUVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQpO1xuXG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBOdW1iZXJDb250cm9sbGVyQm94KSB7XG5cbiAgICAgIHZhciByID0gZnVuY3Rpb24ocmV0dXJuZWQpIHtcblxuICAgICAgICAvLyBIYXZlIHdlIGRlZmluZWQgYm90aCBib3VuZGFyaWVzP1xuICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKGNvbnRyb2xsZXIuX19taW4pICYmIGNvbW1vbi5pc051bWJlcihjb250cm9sbGVyLl9fbWF4KSkge1xuXG4gICAgICAgICAgLy8gV2VsbCwgdGhlbiBsZXRzIGp1c3QgcmVwbGFjZSB0aGlzIHdpdGggYSBzbGlkZXIuXG4gICAgICAgICAgY29udHJvbGxlci5yZW1vdmUoKTtcbiAgICAgICAgICByZXR1cm4gYWRkKFxuICAgICAgICAgICAgICBndWksXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIub2JqZWN0LFxuICAgICAgICAgICAgICBjb250cm9sbGVyLnByb3BlcnR5LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYmVmb3JlOiBjb250cm9sbGVyLl9fbGkubmV4dEVsZW1lbnRTaWJsaW5nLFxuICAgICAgICAgICAgICAgIGZhY3RvcnlBcmdzOiBbY29udHJvbGxlci5fX21pbiwgY29udHJvbGxlci5fX21heCwgY29udHJvbGxlci5fX3N0ZXBdXG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0dXJuZWQ7XG5cbiAgICAgIH07XG5cbiAgICAgIGNvbnRyb2xsZXIubWluID0gY29tbW9uLmNvbXBvc2UociwgY29udHJvbGxlci5taW4pO1xuICAgICAgY29udHJvbGxlci5tYXggPSBjb21tb24uY29tcG9zZShyLCBjb250cm9sbGVyLm1heCk7XG5cbiAgICB9XG4gICAgZWxzZSBpZiAoY29udHJvbGxlciBpbnN0YW5jZW9mIEJvb2xlYW5Db250cm9sbGVyKSB7XG5cbiAgICAgIGRvbS5iaW5kKGxpLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZG9tLmZha2VFdmVudChjb250cm9sbGVyLl9fY2hlY2tib3gsICdjbGljaycpO1xuICAgICAgfSk7XG5cbiAgICAgIGRvbS5iaW5kKGNvbnRyb2xsZXIuX19jaGVja2JveCwgJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpOyAvLyBQcmV2ZW50cyBkb3VibGUtdG9nZ2xlXG4gICAgICB9KVxuXG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBGdW5jdGlvbkNvbnRyb2xsZXIpIHtcblxuICAgICAgZG9tLmJpbmQobGksICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBkb20uZmFrZUV2ZW50KGNvbnRyb2xsZXIuX19idXR0b24sICdjbGljaycpO1xuICAgICAgfSk7XG5cbiAgICAgIGRvbS5iaW5kKGxpLCAnbW91c2VvdmVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGRvbS5hZGRDbGFzcyhjb250cm9sbGVyLl9fYnV0dG9uLCAnaG92ZXInKTtcbiAgICAgIH0pO1xuXG4gICAgICBkb20uYmluZChsaSwgJ21vdXNlb3V0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGRvbS5yZW1vdmVDbGFzcyhjb250cm9sbGVyLl9fYnV0dG9uLCAnaG92ZXInKTtcbiAgICAgIH0pO1xuXG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBDb2xvckNvbnRyb2xsZXIpIHtcblxuICAgICAgZG9tLmFkZENsYXNzKGxpLCAnY29sb3InKTtcbiAgICAgIGNvbnRyb2xsZXIudXBkYXRlRGlzcGxheSA9IGNvbW1vbi5jb21wb3NlKGZ1bmN0aW9uKHIpIHtcbiAgICAgICAgbGkuc3R5bGUuYm9yZGVyTGVmdENvbG9yID0gY29udHJvbGxlci5fX2NvbG9yLnRvU3RyaW5nKCk7XG4gICAgICAgIHJldHVybiByO1xuICAgICAgfSwgY29udHJvbGxlci51cGRhdGVEaXNwbGF5KTtcblxuICAgICAgY29udHJvbGxlci51cGRhdGVEaXNwbGF5KCk7XG5cbiAgICB9XG5cbiAgICBjb250cm9sbGVyLnNldFZhbHVlID0gY29tbW9uLmNvbXBvc2UoZnVuY3Rpb24ocikge1xuICAgICAgaWYgKGd1aS5nZXRSb290KCkuX19wcmVzZXRfc2VsZWN0ICYmIGNvbnRyb2xsZXIuaXNNb2RpZmllZCgpKSB7XG4gICAgICAgIG1hcmtQcmVzZXRNb2RpZmllZChndWkuZ2V0Um9vdCgpLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByO1xuICAgIH0sIGNvbnRyb2xsZXIuc2V0VmFsdWUpO1xuXG4gIH1cblxuICBmdW5jdGlvbiByZWNhbGxTYXZlZFZhbHVlKGd1aSwgY29udHJvbGxlcikge1xuXG4gICAgLy8gRmluZCB0aGUgdG9wbW9zdCBHVUksIHRoYXQncyB3aGVyZSByZW1lbWJlcmVkIG9iamVjdHMgbGl2ZS5cbiAgICB2YXIgcm9vdCA9IGd1aS5nZXRSb290KCk7XG5cbiAgICAvLyBEb2VzIHRoZSBvYmplY3Qgd2UncmUgY29udHJvbGxpbmcgbWF0Y2ggYW55dGhpbmcgd2UndmUgYmVlbiB0b2xkIHRvXG4gICAgLy8gcmVtZW1iZXI/XG4gICAgdmFyIG1hdGNoZWRfaW5kZXggPSByb290Ll9fcmVtZW1iZXJlZE9iamVjdHMuaW5kZXhPZihjb250cm9sbGVyLm9iamVjdCk7XG5cbiAgICAvLyBXaHkgeWVzLCBpdCBkb2VzIVxuICAgIGlmIChtYXRjaGVkX2luZGV4ICE9IC0xKSB7XG5cbiAgICAgIC8vIExldCBtZSBmZXRjaCBhIG1hcCBvZiBjb250cm9sbGVycyBmb3IgdGhjb21tb24uaXNPYmplY3QuXG4gICAgICB2YXIgY29udHJvbGxlcl9tYXAgPVxuICAgICAgICAgIHJvb3QuX19yZW1lbWJlcmVkT2JqZWN0SW5kZWNlc1RvQ29udHJvbGxlcnNbbWF0Y2hlZF9pbmRleF07XG5cbiAgICAgIC8vIE9ocCwgSSBiZWxpZXZlIHRoaXMgaXMgdGhlIGZpcnN0IGNvbnRyb2xsZXIgd2UndmUgY3JlYXRlZCBmb3IgdGhpc1xuICAgICAgLy8gb2JqZWN0LiBMZXRzIG1ha2UgdGhlIG1hcCBmcmVzaC5cbiAgICAgIGlmIChjb250cm9sbGVyX21hcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnRyb2xsZXJfbWFwID0ge307XG4gICAgICAgIHJvb3QuX19yZW1lbWJlcmVkT2JqZWN0SW5kZWNlc1RvQ29udHJvbGxlcnNbbWF0Y2hlZF9pbmRleF0gPVxuICAgICAgICAgICAgY29udHJvbGxlcl9tYXA7XG4gICAgICB9XG5cbiAgICAgIC8vIEtlZXAgdHJhY2sgb2YgdGhpcyBjb250cm9sbGVyXG4gICAgICBjb250cm9sbGVyX21hcFtjb250cm9sbGVyLnByb3BlcnR5XSA9IGNvbnRyb2xsZXI7XG5cbiAgICAgIC8vIE9rYXksIG5vdyBoYXZlIHdlIHNhdmVkIGFueSB2YWx1ZXMgZm9yIHRoaXMgY29udHJvbGxlcj9cbiAgICAgIGlmIChyb290LmxvYWQgJiYgcm9vdC5sb2FkLnJlbWVtYmVyZWQpIHtcblxuICAgICAgICB2YXIgcHJlc2V0X21hcCA9IHJvb3QubG9hZC5yZW1lbWJlcmVkO1xuXG4gICAgICAgIC8vIFdoaWNoIHByZXNldCBhcmUgd2UgdHJ5aW5nIHRvIGxvYWQ/XG4gICAgICAgIHZhciBwcmVzZXQ7XG5cbiAgICAgICAgaWYgKHByZXNldF9tYXBbZ3VpLnByZXNldF0pIHtcblxuICAgICAgICAgIHByZXNldCA9IHByZXNldF9tYXBbZ3VpLnByZXNldF07XG5cbiAgICAgICAgfSBlbHNlIGlmIChwcmVzZXRfbWFwW0RFRkFVTFRfREVGQVVMVF9QUkVTRVRfTkFNRV0pIHtcblxuICAgICAgICAgIC8vIFVoaCwgeW91IGNhbiBoYXZlIHRoZSBkZWZhdWx0IGluc3RlYWQ/XG4gICAgICAgICAgcHJlc2V0ID0gcHJlc2V0X21hcFtERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUVdO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAvLyBOYWRhLlxuXG4gICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIERpZCB0aGUgbG9hZGVkIG9iamVjdCByZW1lbWJlciB0aGNvbW1vbi5pc09iamVjdD9cbiAgICAgICAgaWYgKHByZXNldFttYXRjaGVkX2luZGV4XSAmJlxuXG4gICAgICAgICAgLy8gRGlkIHdlIHJlbWVtYmVyIHRoaXMgcGFydGljdWxhciBwcm9wZXJ0eT9cbiAgICAgICAgICAgIHByZXNldFttYXRjaGVkX2luZGV4XVtjb250cm9sbGVyLnByb3BlcnR5XSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAvLyBXZSBkaWQgcmVtZW1iZXIgc29tZXRoaW5nIGZvciB0aGlzIGd1eSAuLi5cbiAgICAgICAgICB2YXIgdmFsdWUgPSBwcmVzZXRbbWF0Y2hlZF9pbmRleF1bY29udHJvbGxlci5wcm9wZXJ0eV07XG5cbiAgICAgICAgICAvLyBBbmQgdGhhdCdzIHdoYXQgaXQgaXMuXG4gICAgICAgICAgY29udHJvbGxlci5pbml0aWFsVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICBjb250cm9sbGVyLnNldFZhbHVlKHZhbHVlKTtcblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TG9jYWxTdG9yYWdlSGFzaChndWksIGtleSkge1xuICAgIC8vIFRPRE8gaG93IGRvZXMgdGhpcyBkZWFsIHdpdGggbXVsdGlwbGUgR1VJJ3M/XG4gICAgcmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgKyAnLicgKyBrZXk7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFNhdmVNZW51KGd1aSkge1xuXG4gICAgdmFyIGRpdiA9IGd1aS5fX3NhdmVfcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblxuICAgIGRvbS5hZGRDbGFzcyhndWkuZG9tRWxlbWVudCwgJ2hhcy1zYXZlJyk7XG5cbiAgICBndWkuX191bC5pbnNlcnRCZWZvcmUoZGl2LCBndWkuX191bC5maXJzdENoaWxkKTtcblxuICAgIGRvbS5hZGRDbGFzcyhkaXYsICdzYXZlLXJvdycpO1xuXG4gICAgdmFyIGdlYXJzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGdlYXJzLmlubmVySFRNTCA9ICcmbmJzcDsnO1xuICAgIGRvbS5hZGRDbGFzcyhnZWFycywgJ2J1dHRvbiBnZWFycycpO1xuXG4gICAgLy8gVE9ETyByZXBsYWNlIHdpdGggRnVuY3Rpb25Db250cm9sbGVyXG4gICAgdmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBidXR0b24uaW5uZXJIVE1MID0gJ1NhdmUnO1xuICAgIGRvbS5hZGRDbGFzcyhidXR0b24sICdidXR0b24nKTtcbiAgICBkb20uYWRkQ2xhc3MoYnV0dG9uLCAnc2F2ZScpO1xuXG4gICAgdmFyIGJ1dHRvbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgYnV0dG9uMi5pbm5lckhUTUwgPSAnTmV3JztcbiAgICBkb20uYWRkQ2xhc3MoYnV0dG9uMiwgJ2J1dHRvbicpO1xuICAgIGRvbS5hZGRDbGFzcyhidXR0b24yLCAnc2F2ZS1hcycpO1xuXG4gICAgdmFyIGJ1dHRvbjMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgYnV0dG9uMy5pbm5lckhUTUwgPSAnUmV2ZXJ0JztcbiAgICBkb20uYWRkQ2xhc3MoYnV0dG9uMywgJ2J1dHRvbicpO1xuICAgIGRvbS5hZGRDbGFzcyhidXR0b24zLCAncmV2ZXJ0Jyk7XG5cbiAgICB2YXIgc2VsZWN0ID0gZ3VpLl9fcHJlc2V0X3NlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuXG4gICAgaWYgKGd1aS5sb2FkICYmIGd1aS5sb2FkLnJlbWVtYmVyZWQpIHtcblxuICAgICAgY29tbW9uLmVhY2goZ3VpLmxvYWQucmVtZW1iZXJlZCwgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgICBhZGRQcmVzZXRPcHRpb24oZ3VpLCBrZXksIGtleSA9PSBndWkucHJlc2V0KTtcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIGFkZFByZXNldE9wdGlvbihndWksIERFRkFVTFRfREVGQVVMVF9QUkVTRVRfTkFNRSwgZmFsc2UpO1xuICAgIH1cblxuICAgIGRvbS5iaW5kKHNlbGVjdCwgJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuXG5cbiAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBndWkuX19wcmVzZXRfc2VsZWN0Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBndWkuX19wcmVzZXRfc2VsZWN0W2luZGV4XS5pbm5lckhUTUwgPSBndWkuX19wcmVzZXRfc2VsZWN0W2luZGV4XS52YWx1ZTtcbiAgICAgIH1cblxuICAgICAgZ3VpLnByZXNldCA9IHRoaXMudmFsdWU7XG5cbiAgICB9KTtcblxuICAgIGRpdi5hcHBlbmRDaGlsZChzZWxlY3QpO1xuICAgIGRpdi5hcHBlbmRDaGlsZChnZWFycyk7XG4gICAgZGl2LmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgZGl2LmFwcGVuZENoaWxkKGJ1dHRvbjIpO1xuICAgIGRpdi5hcHBlbmRDaGlsZChidXR0b24zKTtcblxuICAgIGlmIChTVVBQT1JUU19MT0NBTF9TVE9SQUdFKSB7XG5cbiAgICAgIHZhciBzYXZlTG9jYWxseSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZy1zYXZlLWxvY2FsbHknKTtcbiAgICAgIHZhciBleHBsYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RnLWxvY2FsLWV4cGxhaW4nKTtcblxuICAgICAgc2F2ZUxvY2FsbHkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICAgIHZhciBsb2NhbFN0b3JhZ2VDaGVja0JveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZy1sb2NhbC1zdG9yYWdlJyk7XG5cbiAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShnZXRMb2NhbFN0b3JhZ2VIYXNoKGd1aSwgJ2lzTG9jYWwnKSkgPT09ICd0cnVlJykge1xuICAgICAgICBsb2NhbFN0b3JhZ2VDaGVja0JveC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBzaG93SGlkZUV4cGxhaW4oKSB7XG4gICAgICAgIGV4cGxhaW4uc3R5bGUuZGlzcGxheSA9IGd1aS51c2VMb2NhbFN0b3JhZ2UgPyAnYmxvY2snIDogJ25vbmUnO1xuICAgICAgfVxuXG4gICAgICBzaG93SGlkZUV4cGxhaW4oKTtcblxuICAgICAgLy8gVE9ETzogVXNlIGEgYm9vbGVhbiBjb250cm9sbGVyLCBmb29sIVxuICAgICAgZG9tLmJpbmQobG9jYWxTdG9yYWdlQ2hlY2tCb3gsICdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZ3VpLnVzZUxvY2FsU3RvcmFnZSA9ICFndWkudXNlTG9jYWxTdG9yYWdlO1xuICAgICAgICBzaG93SGlkZUV4cGxhaW4oKTtcbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgdmFyIG5ld0NvbnN0cnVjdG9yVGV4dEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGctbmV3LWNvbnN0cnVjdG9yJyk7XG5cbiAgICBkb20uYmluZChuZXdDb25zdHJ1Y3RvclRleHRBcmVhLCAna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmIChlLm1ldGFLZXkgJiYgKGUud2hpY2ggPT09IDY3IHx8IGUua2V5Q29kZSA9PSA2NykpIHtcbiAgICAgICAgU0FWRV9ESUFMT0dVRS5oaWRlKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBkb20uYmluZChnZWFycywgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICBuZXdDb25zdHJ1Y3RvclRleHRBcmVhLmlubmVySFRNTCA9IEpTT04uc3RyaW5naWZ5KGd1aS5nZXRTYXZlT2JqZWN0KCksIHVuZGVmaW5lZCwgMik7XG4gICAgICBTQVZFX0RJQUxPR1VFLnNob3coKTtcbiAgICAgIG5ld0NvbnN0cnVjdG9yVGV4dEFyZWEuZm9jdXMoKTtcbiAgICAgIG5ld0NvbnN0cnVjdG9yVGV4dEFyZWEuc2VsZWN0KCk7XG4gICAgfSk7XG5cbiAgICBkb20uYmluZChidXR0b24sICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgZ3VpLnNhdmUoKTtcbiAgICB9KTtcblxuICAgIGRvbS5iaW5kKGJ1dHRvbjIsICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHByZXNldE5hbWUgPSBwcm9tcHQoJ0VudGVyIGEgbmV3IHByZXNldCBuYW1lLicpO1xuICAgICAgaWYgKHByZXNldE5hbWUpIGd1aS5zYXZlQXMocHJlc2V0TmFtZSk7XG4gICAgfSk7XG5cbiAgICBkb20uYmluZChidXR0b24zLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIGd1aS5yZXZlcnQoKTtcbiAgICB9KTtcblxuLy8gICAgZGl2LmFwcGVuZENoaWxkKGJ1dHRvbjIpO1xuXG4gIH1cblxuICBmdW5jdGlvbiBhZGRSZXNpemVIYW5kbGUoZ3VpKSB7XG5cbiAgICBndWkuX19yZXNpemVfaGFuZGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBjb21tb24uZXh0ZW5kKGd1aS5fX3Jlc2l6ZV9oYW5kbGUuc3R5bGUsIHtcblxuICAgICAgd2lkdGg6ICc2cHgnLFxuICAgICAgbWFyZ2luTGVmdDogJy0zcHgnLFxuICAgICAgaGVpZ2h0OiAnMjAwcHgnLFxuICAgICAgY3Vyc29yOiAnZXctcmVzaXplJyxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXG4vLyAgICAgIGJvcmRlcjogJzFweCBzb2xpZCBibHVlJ1xuXG4gICAgfSk7XG5cbiAgICB2YXIgcG1vdXNlWDtcblxuICAgIGRvbS5iaW5kKGd1aS5fX3Jlc2l6ZV9oYW5kbGUsICdtb3VzZWRvd24nLCBkcmFnU3RhcnQpO1xuICAgIGRvbS5iaW5kKGd1aS5fX2Nsb3NlQnV0dG9uLCAnbW91c2Vkb3duJywgZHJhZ1N0YXJ0KTtcblxuICAgIGd1aS5kb21FbGVtZW50Lmluc2VydEJlZm9yZShndWkuX19yZXNpemVfaGFuZGxlLCBndWkuZG9tRWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZCk7XG5cbiAgICBmdW5jdGlvbiBkcmFnU3RhcnQoZSkge1xuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHBtb3VzZVggPSBlLmNsaWVudFg7XG5cbiAgICAgIGRvbS5hZGRDbGFzcyhndWkuX19jbG9zZUJ1dHRvbiwgR1VJLkNMQVNTX0RSQUcpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgZHJhZyk7XG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZXVwJywgZHJhZ1N0b3ApO1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkcmFnKGUpIHtcblxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBndWkud2lkdGggKz0gcG1vdXNlWCAtIGUuY2xpZW50WDtcbiAgICAgIGd1aS5vblJlc2l6ZSgpO1xuICAgICAgcG1vdXNlWCA9IGUuY2xpZW50WDtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhZ1N0b3AoKSB7XG5cbiAgICAgIGRvbS5yZW1vdmVDbGFzcyhndWkuX19jbG9zZUJ1dHRvbiwgR1VJLkNMQVNTX0RSQUcpO1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBkcmFnKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2V1cCcsIGRyYWdTdG9wKTtcblxuICAgIH1cblxuICB9XG5cbiAgZnVuY3Rpb24gc2V0V2lkdGgoZ3VpLCB3KSB7XG4gICAgZ3VpLmRvbUVsZW1lbnQuc3R5bGUud2lkdGggPSB3ICsgJ3B4JztcbiAgICAvLyBBdXRvIHBsYWNlZCBzYXZlLXJvd3MgYXJlIHBvc2l0aW9uIGZpeGVkLCBzbyB3ZSBoYXZlIHRvXG4gICAgLy8gc2V0IHRoZSB3aWR0aCBtYW51YWxseSBpZiB3ZSB3YW50IGl0IHRvIGJsZWVkIHRvIHRoZSBlZGdlXG4gICAgaWYgKGd1aS5fX3NhdmVfcm93ICYmIGd1aS5hdXRvUGxhY2UpIHtcbiAgICAgIGd1aS5fX3NhdmVfcm93LnN0eWxlLndpZHRoID0gdyArICdweCc7XG4gICAgfWlmIChndWkuX19jbG9zZUJ1dHRvbikge1xuICAgICAgZ3VpLl9fY2xvc2VCdXR0b24uc3R5bGUud2lkdGggPSB3ICsgJ3B4JztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDdXJyZW50UHJlc2V0KGd1aSwgdXNlSW5pdGlhbFZhbHVlcykge1xuXG4gICAgdmFyIHRvUmV0dXJuID0ge307XG5cbiAgICAvLyBGb3IgZWFjaCBvYmplY3QgSSdtIHJlbWVtYmVyaW5nXG4gICAgY29tbW9uLmVhY2goZ3VpLl9fcmVtZW1iZXJlZE9iamVjdHMsIGZ1bmN0aW9uKHZhbCwgaW5kZXgpIHtcblxuICAgICAgdmFyIHNhdmVkX3ZhbHVlcyA9IHt9O1xuXG4gICAgICAvLyBUaGUgY29udHJvbGxlcnMgSSd2ZSBtYWRlIGZvciB0aGNvbW1vbi5pc09iamVjdCBieSBwcm9wZXJ0eVxuICAgICAgdmFyIGNvbnRyb2xsZXJfbWFwID1cbiAgICAgICAgICBndWkuX19yZW1lbWJlcmVkT2JqZWN0SW5kZWNlc1RvQ29udHJvbGxlcnNbaW5kZXhdO1xuXG4gICAgICAvLyBSZW1lbWJlciBlYWNoIHZhbHVlIGZvciBlYWNoIHByb3BlcnR5XG4gICAgICBjb21tb24uZWFjaChjb250cm9sbGVyX21hcCwgZnVuY3Rpb24oY29udHJvbGxlciwgcHJvcGVydHkpIHtcbiAgICAgICAgc2F2ZWRfdmFsdWVzW3Byb3BlcnR5XSA9IHVzZUluaXRpYWxWYWx1ZXMgPyBjb250cm9sbGVyLmluaXRpYWxWYWx1ZSA6IGNvbnRyb2xsZXIuZ2V0VmFsdWUoKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBTYXZlIHRoZSB2YWx1ZXMgZm9yIHRoY29tbW9uLmlzT2JqZWN0XG4gICAgICB0b1JldHVybltpbmRleF0gPSBzYXZlZF92YWx1ZXM7XG5cbiAgICB9KTtcblxuICAgIHJldHVybiB0b1JldHVybjtcblxuICB9XG5cbiAgZnVuY3Rpb24gYWRkUHJlc2V0T3B0aW9uKGd1aSwgbmFtZSwgc2V0U2VsZWN0ZWQpIHtcbiAgICB2YXIgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgb3B0LmlubmVySFRNTCA9IG5hbWU7XG4gICAgb3B0LnZhbHVlID0gbmFtZTtcbiAgICBndWkuX19wcmVzZXRfc2VsZWN0LmFwcGVuZENoaWxkKG9wdCk7XG4gICAgaWYgKHNldFNlbGVjdGVkKSB7XG4gICAgICBndWkuX19wcmVzZXRfc2VsZWN0LnNlbGVjdGVkSW5kZXggPSBndWkuX19wcmVzZXRfc2VsZWN0Lmxlbmd0aCAtIDE7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0UHJlc2V0U2VsZWN0SW5kZXgoZ3VpKSB7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGd1aS5fX3ByZXNldF9zZWxlY3QubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBpZiAoZ3VpLl9fcHJlc2V0X3NlbGVjdFtpbmRleF0udmFsdWUgPT0gZ3VpLnByZXNldCkge1xuICAgICAgICBndWkuX19wcmVzZXRfc2VsZWN0LnNlbGVjdGVkSW5kZXggPSBpbmRleDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtYXJrUHJlc2V0TW9kaWZpZWQoZ3VpLCBtb2RpZmllZCkge1xuICAgIHZhciBvcHQgPSBndWkuX19wcmVzZXRfc2VsZWN0W2d1aS5fX3ByZXNldF9zZWxlY3Quc2VsZWN0ZWRJbmRleF07XG4vLyAgICBjb25zb2xlLmxvZygnbWFyaycsIG1vZGlmaWVkLCBvcHQpO1xuICAgIGlmIChtb2RpZmllZCkge1xuICAgICAgb3B0LmlubmVySFRNTCA9IG9wdC52YWx1ZSArIFwiKlwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHQuaW5uZXJIVE1MID0gb3B0LnZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZURpc3BsYXlzKGNvbnRyb2xsZXJBcnJheSkge1xuXG5cbiAgICBpZiAoY29udHJvbGxlckFycmF5Lmxlbmd0aCAhPSAwKSB7XG5cbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcbiAgICAgICAgdXBkYXRlRGlzcGxheXMoY29udHJvbGxlckFycmF5KTtcbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgY29tbW9uLmVhY2goY29udHJvbGxlckFycmF5LCBmdW5jdGlvbihjKSB7XG4gICAgICBjLnVwZGF0ZURpc3BsYXkoKTtcbiAgICB9KTtcblxuICB9XG5cbiAgcmV0dXJuIEdVSTtcblxufSkoZGF0LnV0aWxzLmNzcyxcblwiPGRpdiBpZD1cXFwiZGctc2F2ZVxcXCIgY2xhc3M9XFxcImRnIGRpYWxvZ3VlXFxcIj5cXG5cXG4gIEhlcmUncyB0aGUgbmV3IGxvYWQgcGFyYW1ldGVyIGZvciB5b3VyIDxjb2RlPkdVSTwvY29kZT4ncyBjb25zdHJ1Y3RvcjpcXG5cXG4gIDx0ZXh0YXJlYSBpZD1cXFwiZGctbmV3LWNvbnN0cnVjdG9yXFxcIj48L3RleHRhcmVhPlxcblxcbiAgPGRpdiBpZD1cXFwiZGctc2F2ZS1sb2NhbGx5XFxcIj5cXG5cXG4gICAgPGlucHV0IGlkPVxcXCJkZy1sb2NhbC1zdG9yYWdlXFxcIiB0eXBlPVxcXCJjaGVja2JveFxcXCIvPiBBdXRvbWF0aWNhbGx5IHNhdmVcXG4gICAgdmFsdWVzIHRvIDxjb2RlPmxvY2FsU3RvcmFnZTwvY29kZT4gb24gZXhpdC5cXG5cXG4gICAgPGRpdiBpZD1cXFwiZGctbG9jYWwtZXhwbGFpblxcXCI+VGhlIHZhbHVlcyBzYXZlZCB0byA8Y29kZT5sb2NhbFN0b3JhZ2U8L2NvZGU+IHdpbGxcXG4gICAgICBvdmVycmlkZSB0aG9zZSBwYXNzZWQgdG8gPGNvZGU+ZGF0LkdVSTwvY29kZT4ncyBjb25zdHJ1Y3Rvci4gVGhpcyBtYWtlcyBpdFxcbiAgICAgIGVhc2llciB0byB3b3JrIGluY3JlbWVudGFsbHksIGJ1dCA8Y29kZT5sb2NhbFN0b3JhZ2U8L2NvZGU+IGlzIGZyYWdpbGUsXFxuICAgICAgYW5kIHlvdXIgZnJpZW5kcyBtYXkgbm90IHNlZSB0aGUgc2FtZSB2YWx1ZXMgeW91IGRvLlxcbiAgICAgIFxcbiAgICA8L2Rpdj5cXG4gICAgXFxuICA8L2Rpdj5cXG5cXG48L2Rpdj5cIixcblwiLmRnIHVse2xpc3Qtc3R5bGU6bm9uZTttYXJnaW46MDtwYWRkaW5nOjA7d2lkdGg6MTAwJTtjbGVhcjpib3RofS5kZy5hY3twb3NpdGlvbjpmaXhlZDt0b3A6MDtsZWZ0OjA7cmlnaHQ6MDtoZWlnaHQ6MDt6LWluZGV4OjB9LmRnOm5vdCguYWMpIC5tYWlue292ZXJmbG93OmhpZGRlbn0uZGcubWFpbnstd2Via2l0LXRyYW5zaXRpb246b3BhY2l0eSAwLjFzIGxpbmVhcjstby10cmFuc2l0aW9uOm9wYWNpdHkgMC4xcyBsaW5lYXI7LW1vei10cmFuc2l0aW9uOm9wYWNpdHkgMC4xcyBsaW5lYXI7dHJhbnNpdGlvbjpvcGFjaXR5IDAuMXMgbGluZWFyfS5kZy5tYWluLnRhbGxlci10aGFuLXdpbmRvd3tvdmVyZmxvdy15OmF1dG99LmRnLm1haW4udGFsbGVyLXRoYW4td2luZG93IC5jbG9zZS1idXR0b257b3BhY2l0eToxO21hcmdpbi10b3A6LTFweDtib3JkZXItdG9wOjFweCBzb2xpZCAjMmMyYzJjfS5kZy5tYWluIHVsLmNsb3NlZCAuY2xvc2UtYnV0dG9ue29wYWNpdHk6MSAhaW1wb3J0YW50fS5kZy5tYWluOmhvdmVyIC5jbG9zZS1idXR0b24sLmRnLm1haW4gLmNsb3NlLWJ1dHRvbi5kcmFne29wYWNpdHk6MX0uZGcubWFpbiAuY2xvc2UtYnV0dG9uey13ZWJraXQtdHJhbnNpdGlvbjpvcGFjaXR5IDAuMXMgbGluZWFyOy1vLXRyYW5zaXRpb246b3BhY2l0eSAwLjFzIGxpbmVhcjstbW96LXRyYW5zaXRpb246b3BhY2l0eSAwLjFzIGxpbmVhcjt0cmFuc2l0aW9uOm9wYWNpdHkgMC4xcyBsaW5lYXI7Ym9yZGVyOjA7cG9zaXRpb246YWJzb2x1dGU7bGluZS1oZWlnaHQ6MTlweDtoZWlnaHQ6MjBweDtjdXJzb3I6cG9pbnRlcjt0ZXh0LWFsaWduOmNlbnRlcjtiYWNrZ3JvdW5kLWNvbG9yOiMwMDB9LmRnLm1haW4gLmNsb3NlLWJ1dHRvbjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiMxMTF9LmRnLmF7ZmxvYXQ6cmlnaHQ7bWFyZ2luLXJpZ2h0OjE1cHg7b3ZlcmZsb3cteDpoaWRkZW59LmRnLmEuaGFzLXNhdmUgdWx7bWFyZ2luLXRvcDoyN3B4fS5kZy5hLmhhcy1zYXZlIHVsLmNsb3NlZHttYXJnaW4tdG9wOjB9LmRnLmEgLnNhdmUtcm93e3Bvc2l0aW9uOmZpeGVkO3RvcDowO3otaW5kZXg6MTAwMn0uZGcgbGl7LXdlYmtpdC10cmFuc2l0aW9uOmhlaWdodCAwLjFzIGVhc2Utb3V0Oy1vLXRyYW5zaXRpb246aGVpZ2h0IDAuMXMgZWFzZS1vdXQ7LW1vei10cmFuc2l0aW9uOmhlaWdodCAwLjFzIGVhc2Utb3V0O3RyYW5zaXRpb246aGVpZ2h0IDAuMXMgZWFzZS1vdXR9LmRnIGxpOm5vdCguZm9sZGVyKXtjdXJzb3I6YXV0bztoZWlnaHQ6MjdweDtsaW5lLWhlaWdodDoyN3B4O292ZXJmbG93OmhpZGRlbjtwYWRkaW5nOjAgNHB4IDAgNXB4fS5kZyBsaS5mb2xkZXJ7cGFkZGluZzowO2JvcmRlci1sZWZ0OjRweCBzb2xpZCByZ2JhKDAsMCwwLDApfS5kZyBsaS50aXRsZXtjdXJzb3I6cG9pbnRlcjttYXJnaW4tbGVmdDotNHB4fS5kZyAuY2xvc2VkIGxpOm5vdCgudGl0bGUpLC5kZyAuY2xvc2VkIHVsIGxpLC5kZyAuY2xvc2VkIHVsIGxpID4gKntoZWlnaHQ6MDtvdmVyZmxvdzpoaWRkZW47Ym9yZGVyOjB9LmRnIC5jcntjbGVhcjpib3RoO3BhZGRpbmctbGVmdDozcHg7aGVpZ2h0OjI3cHh9LmRnIC5wcm9wZXJ0eS1uYW1le2N1cnNvcjpkZWZhdWx0O2Zsb2F0OmxlZnQ7Y2xlYXI6bGVmdDt3aWR0aDo0MCU7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXN9LmRnIC5je2Zsb2F0OmxlZnQ7d2lkdGg6NjAlfS5kZyAuYyBpbnB1dFt0eXBlPXRleHRde2JvcmRlcjowO21hcmdpbi10b3A6NHB4O3BhZGRpbmc6M3B4O3dpZHRoOjEwMCU7ZmxvYXQ6cmlnaHR9LmRnIC5oYXMtc2xpZGVyIGlucHV0W3R5cGU9dGV4dF17d2lkdGg6MzAlO21hcmdpbi1sZWZ0OjB9LmRnIC5zbGlkZXJ7ZmxvYXQ6bGVmdDt3aWR0aDo2NiU7bWFyZ2luLWxlZnQ6LTVweDttYXJnaW4tcmlnaHQ6MDtoZWlnaHQ6MTlweDttYXJnaW4tdG9wOjRweH0uZGcgLnNsaWRlci1mZ3toZWlnaHQ6MTAwJX0uZGcgLmMgaW5wdXRbdHlwZT1jaGVja2JveF17bWFyZ2luLXRvcDo5cHh9LmRnIC5jIHNlbGVjdHttYXJnaW4tdG9wOjVweH0uZGcgLmNyLmZ1bmN0aW9uLC5kZyAuY3IuZnVuY3Rpb24gLnByb3BlcnR5LW5hbWUsLmRnIC5jci5mdW5jdGlvbiAqLC5kZyAuY3IuYm9vbGVhbiwuZGcgLmNyLmJvb2xlYW4gKntjdXJzb3I6cG9pbnRlcn0uZGcgLnNlbGVjdG9ye2Rpc3BsYXk6bm9uZTtwb3NpdGlvbjphYnNvbHV0ZTttYXJnaW4tbGVmdDotOXB4O21hcmdpbi10b3A6MjNweDt6LWluZGV4OjEwfS5kZyAuYzpob3ZlciAuc2VsZWN0b3IsLmRnIC5zZWxlY3Rvci5kcmFne2Rpc3BsYXk6YmxvY2t9LmRnIGxpLnNhdmUtcm93e3BhZGRpbmc6MH0uZGcgbGkuc2F2ZS1yb3cgLmJ1dHRvbntkaXNwbGF5OmlubGluZS1ibG9jaztwYWRkaW5nOjBweCA2cHh9LmRnLmRpYWxvZ3Vle2JhY2tncm91bmQtY29sb3I6IzIyMjt3aWR0aDo0NjBweDtwYWRkaW5nOjE1cHg7Zm9udC1zaXplOjEzcHg7bGluZS1oZWlnaHQ6MTVweH0jZGctbmV3LWNvbnN0cnVjdG9ye3BhZGRpbmc6MTBweDtjb2xvcjojMjIyO2ZvbnQtZmFtaWx5Ok1vbmFjbywgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMHB4O2JvcmRlcjowO3Jlc2l6ZTpub25lO2JveC1zaGFkb3c6aW5zZXQgMXB4IDFweCAxcHggIzg4ODt3b3JkLXdyYXA6YnJlYWstd29yZDttYXJnaW46MTJweCAwO2Rpc3BsYXk6YmxvY2s7d2lkdGg6NDQwcHg7b3ZlcmZsb3cteTpzY3JvbGw7aGVpZ2h0OjEwMHB4O3Bvc2l0aW9uOnJlbGF0aXZlfSNkZy1sb2NhbC1leHBsYWlue2Rpc3BsYXk6bm9uZTtmb250LXNpemU6MTFweDtsaW5lLWhlaWdodDoxN3B4O2JvcmRlci1yYWRpdXM6M3B4O2JhY2tncm91bmQtY29sb3I6IzMzMztwYWRkaW5nOjhweDttYXJnaW4tdG9wOjEwcHh9I2RnLWxvY2FsLWV4cGxhaW4gY29kZXtmb250LXNpemU6MTBweH0jZGF0LWd1aS1zYXZlLWxvY2FsbHl7ZGlzcGxheTpub25lfS5kZ3tjb2xvcjojZWVlO2ZvbnQ6MTFweCAnTHVjaWRhIEdyYW5kZScsIHNhbnMtc2VyaWY7dGV4dC1zaGFkb3c6MCAtMXB4IDAgIzExMX0uZGcubWFpbjo6LXdlYmtpdC1zY3JvbGxiYXJ7d2lkdGg6NXB4O2JhY2tncm91bmQ6IzFhMWExYX0uZGcubWFpbjo6LXdlYmtpdC1zY3JvbGxiYXItY29ybmVye2hlaWdodDowO2Rpc3BsYXk6bm9uZX0uZGcubWFpbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWJ7Ym9yZGVyLXJhZGl1czo1cHg7YmFja2dyb3VuZDojNjc2NzY3fS5kZyBsaTpub3QoLmZvbGRlcil7YmFja2dyb3VuZDojMWExYTFhO2JvcmRlci1ib3R0b206MXB4IHNvbGlkICMyYzJjMmN9LmRnIGxpLnNhdmUtcm93e2xpbmUtaGVpZ2h0OjI1cHg7YmFja2dyb3VuZDojZGFkNWNiO2JvcmRlcjowfS5kZyBsaS5zYXZlLXJvdyBzZWxlY3R7bWFyZ2luLWxlZnQ6NXB4O3dpZHRoOjEwOHB4fS5kZyBsaS5zYXZlLXJvdyAuYnV0dG9ue21hcmdpbi1sZWZ0OjVweDttYXJnaW4tdG9wOjFweDtib3JkZXItcmFkaXVzOjJweDtmb250LXNpemU6OXB4O2xpbmUtaGVpZ2h0OjdweDtwYWRkaW5nOjRweCA0cHggNXB4IDRweDtiYWNrZ3JvdW5kOiNjNWJkYWQ7Y29sb3I6I2ZmZjt0ZXh0LXNoYWRvdzowIDFweCAwICNiMGE1OGY7Ym94LXNoYWRvdzowIC0xcHggMCAjYjBhNThmO2N1cnNvcjpwb2ludGVyfS5kZyBsaS5zYXZlLXJvdyAuYnV0dG9uLmdlYXJze2JhY2tncm91bmQ6I2M1YmRhZCB1cmwoZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBc0FBQUFOQ0FZQUFBQi85WlE3QUFBQUdYUkZXSFJUYjJaMGQyRnlaUUJCWkc5aVpTQkpiV0ZuWlZKbFlXUjVjY2xsUEFBQUFRSkpSRUZVZU5waVlLQVUvUC8vUHdHSUMvQXBDQUJpQlNBVytJOEFDbEFjZ0t4UTRUOWhvTUFFVXJ4eDJRU0dONitlZ0RYKy92V1Q0ZTdOODJBTVlvUEF4L2V2d1dvWW9TWWJBQ1gyczdLeEN4emNzZXpEaDNldkZvREVCWVRFRXF5Y2dnV0F6QTlBdVVTUVFnZVlQYTlmUHY2L1lXbS9BY3g1SVBiN3R5L2Z3K1FaYmx3Njd2RHM4UjBZSHlRaGdPYngreUFKa0JxbUc1ZFBQRGgxYVBPR1IvZXVnVzBHNHZsSW9USWZ5RmNBK1Fla2hoSEpoUGRReGJpQUlndU1CVFFaclBENzEwOE02cm9XWURGUWlJQUF2NkFvdy8xYkZ3WGdpcytmMkxVQXlud29JYU5jejhYTngzRGw3TUVKVURHUXB4OWd0UThZQ3VlQitEMjZPRUNBQVFEYWR0N2U0NkQ0MlFBQUFBQkpSVTVFcmtKZ2dnPT0pIDJweCAxcHggbm8tcmVwZWF0O2hlaWdodDo3cHg7d2lkdGg6OHB4fS5kZyBsaS5zYXZlLXJvdyAuYnV0dG9uOmhvdmVye2JhY2tncm91bmQtY29sb3I6I2JhYjE5ZTtib3gtc2hhZG93OjAgLTFweCAwICNiMGE1OGZ9LmRnIGxpLmZvbGRlcntib3JkZXItYm90dG9tOjB9LmRnIGxpLnRpdGxle3BhZGRpbmctbGVmdDoxNnB4O2JhY2tncm91bmQ6IzAwMCB1cmwoZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQlFBRkFKRUFBUC8vLy9QejgvLy8vLy8vL3lINUJBRUFBQUlBTEFBQUFBQUZBQVVBQUFJSWxJK2hLZ0Z4b0NnQU93PT0pIDZweCAxMHB4IG5vLXJlcGVhdDtjdXJzb3I6cG9pbnRlcjtib3JkZXItYm90dG9tOjFweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LDAuMil9LmRnIC5jbG9zZWQgbGkudGl0bGV7YmFja2dyb3VuZC1pbWFnZTp1cmwoZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQlFBRkFKRUFBUC8vLy9QejgvLy8vLy8vL3lINUJBRUFBQUlBTEFBQUFBQUZBQVVBQUFJSWxHSVdxTUNiV0FFQU93PT0pfS5kZyAuY3IuYm9vbGVhbntib3JkZXItbGVmdDozcHggc29saWQgIzgwNjc4N30uZGcgLmNyLmZ1bmN0aW9ue2JvcmRlci1sZWZ0OjNweCBzb2xpZCAjZTYxZDVmfS5kZyAuY3IubnVtYmVye2JvcmRlci1sZWZ0OjNweCBzb2xpZCAjMmZhMWQ2fS5kZyAuY3IubnVtYmVyIGlucHV0W3R5cGU9dGV4dF17Y29sb3I6IzJmYTFkNn0uZGcgLmNyLnN0cmluZ3tib3JkZXItbGVmdDozcHggc29saWQgIzFlZDM2Zn0uZGcgLmNyLnN0cmluZyBpbnB1dFt0eXBlPXRleHRde2NvbG9yOiMxZWQzNmZ9LmRnIC5jci5mdW5jdGlvbjpob3ZlciwuZGcgLmNyLmJvb2xlYW46aG92ZXJ7YmFja2dyb3VuZDojMTExfS5kZyAuYyBpbnB1dFt0eXBlPXRleHRde2JhY2tncm91bmQ6IzMwMzAzMDtvdXRsaW5lOm5vbmV9LmRnIC5jIGlucHV0W3R5cGU9dGV4dF06aG92ZXJ7YmFja2dyb3VuZDojM2MzYzNjfS5kZyAuYyBpbnB1dFt0eXBlPXRleHRdOmZvY3Vze2JhY2tncm91bmQ6IzQ5NDk0OTtjb2xvcjojZmZmfS5kZyAuYyAuc2xpZGVye2JhY2tncm91bmQ6IzMwMzAzMDtjdXJzb3I6ZXctcmVzaXplfS5kZyAuYyAuc2xpZGVyLWZne2JhY2tncm91bmQ6IzJmYTFkNn0uZGcgLmMgLnNsaWRlcjpob3ZlcntiYWNrZ3JvdW5kOiMzYzNjM2N9LmRnIC5jIC5zbGlkZXI6aG92ZXIgLnNsaWRlci1mZ3tiYWNrZ3JvdW5kOiM0NGFiZGF9XFxuXCIsXG5kYXQuY29udHJvbGxlcnMuZmFjdG9yeSA9IChmdW5jdGlvbiAoT3B0aW9uQ29udHJvbGxlciwgTnVtYmVyQ29udHJvbGxlckJveCwgTnVtYmVyQ29udHJvbGxlclNsaWRlciwgU3RyaW5nQ29udHJvbGxlciwgRnVuY3Rpb25Db250cm9sbGVyLCBCb29sZWFuQ29udHJvbGxlciwgY29tbW9uKSB7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7XG5cbiAgICAgICAgdmFyIGluaXRpYWxWYWx1ZSA9IG9iamVjdFtwcm9wZXJ0eV07XG5cbiAgICAgICAgLy8gUHJvdmlkaW5nIG9wdGlvbnM/XG4gICAgICAgIGlmIChjb21tb24uaXNBcnJheShhcmd1bWVudHNbMl0pIHx8IGNvbW1vbi5pc09iamVjdChhcmd1bWVudHNbMl0pKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBPcHRpb25Db250cm9sbGVyKG9iamVjdCwgcHJvcGVydHksIGFyZ3VtZW50c1syXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQcm92aWRpbmcgYSBtYXA/XG5cbiAgICAgICAgaWYgKGNvbW1vbi5pc051bWJlcihpbml0aWFsVmFsdWUpKSB7XG5cbiAgICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKGFyZ3VtZW50c1syXSkgJiYgY29tbW9uLmlzTnVtYmVyKGFyZ3VtZW50c1szXSkpIHtcblxuICAgICAgICAgICAgLy8gSGFzIG1pbiBhbmQgbWF4LlxuICAgICAgICAgICAgcmV0dXJuIG5ldyBOdW1iZXJDb250cm9sbGVyU2xpZGVyKG9iamVjdCwgcHJvcGVydHksIGFyZ3VtZW50c1syXSwgYXJndW1lbnRzWzNdKTtcblxuICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgTnVtYmVyQ29udHJvbGxlckJveChvYmplY3QsIHByb3BlcnR5LCB7IG1pbjogYXJndW1lbnRzWzJdLCBtYXg6IGFyZ3VtZW50c1szXSB9KTtcblxuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbW1vbi5pc1N0cmluZyhpbml0aWFsVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBTdHJpbmdDb250cm9sbGVyKG9iamVjdCwgcHJvcGVydHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbW1vbi5pc0Z1bmN0aW9uKGluaXRpYWxWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IEZ1bmN0aW9uQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5LCAnJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29tbW9uLmlzQm9vbGVhbihpbml0aWFsVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBCb29sZWFuQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5KTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9KShkYXQuY29udHJvbGxlcnMuT3B0aW9uQ29udHJvbGxlcixcbmRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyQm94LFxuZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJTbGlkZXIsXG5kYXQuY29udHJvbGxlcnMuU3RyaW5nQ29udHJvbGxlciA9IChmdW5jdGlvbiAoQ29udHJvbGxlciwgZG9tLCBjb21tb24pIHtcblxuICAvKipcbiAgICogQGNsYXNzIFByb3ZpZGVzIGEgdGV4dCBpbnB1dCB0byBhbHRlciB0aGUgc3RyaW5nIHByb3BlcnR5IG9mIGFuIG9iamVjdC5cbiAgICpcbiAgICogQGV4dGVuZHMgZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXJcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICpcbiAgICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcbiAgICovXG4gIHZhciBTdHJpbmdDb250cm9sbGVyID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkge1xuXG4gICAgU3RyaW5nQ29udHJvbGxlci5zdXBlcmNsYXNzLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5fX2lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICB0aGlzLl9faW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcblxuICAgIGRvbS5iaW5kKHRoaXMuX19pbnB1dCwgJ2tleXVwJywgb25DaGFuZ2UpO1xuICAgIGRvbS5iaW5kKHRoaXMuX19pbnB1dCwgJ2NoYW5nZScsIG9uQ2hhbmdlKTtcbiAgICBkb20uYmluZCh0aGlzLl9faW5wdXQsICdibHVyJywgb25CbHVyKTtcbiAgICBkb20uYmluZCh0aGlzLl9faW5wdXQsICdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgdGhpcy5ibHVyKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgXG5cbiAgICBmdW5jdGlvbiBvbkNoYW5nZSgpIHtcbiAgICAgIF90aGlzLnNldFZhbHVlKF90aGlzLl9faW5wdXQudmFsdWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQmx1cigpIHtcbiAgICAgIGlmIChfdGhpcy5fX29uRmluaXNoQ2hhbmdlKSB7XG4gICAgICAgIF90aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbChfdGhpcywgX3RoaXMuZ2V0VmFsdWUoKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVEaXNwbGF5KCk7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX2lucHV0KTtcblxuICB9O1xuXG4gIFN0cmluZ0NvbnRyb2xsZXIuc3VwZXJjbGFzcyA9IENvbnRyb2xsZXI7XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgU3RyaW5nQ29udHJvbGxlci5wcm90b3R5cGUsXG4gICAgICBDb250cm9sbGVyLnByb3RvdHlwZSxcblxuICAgICAge1xuXG4gICAgICAgIHVwZGF0ZURpc3BsYXk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIFN0b3BzIHRoZSBjYXJldCBmcm9tIG1vdmluZyBvbiBhY2NvdW50IG9mOlxuICAgICAgICAgIC8vIGtleXVwIC0+IHNldFZhbHVlIC0+IHVwZGF0ZURpc3BsYXlcbiAgICAgICAgICBpZiAoIWRvbS5pc0FjdGl2ZSh0aGlzLl9faW5wdXQpKSB7XG4gICAgICAgICAgICB0aGlzLl9faW5wdXQudmFsdWUgPSB0aGlzLmdldFZhbHVlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBTdHJpbmdDb250cm9sbGVyLnN1cGVyY2xhc3MucHJvdG90eXBlLnVwZGF0ZURpc3BsYXkuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgKTtcblxuICByZXR1cm4gU3RyaW5nQ29udHJvbGxlcjtcblxufSkoZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXIsXG5kYXQuZG9tLmRvbSxcbmRhdC51dGlscy5jb21tb24pLFxuZGF0LmNvbnRyb2xsZXJzLkZ1bmN0aW9uQ29udHJvbGxlcixcbmRhdC5jb250cm9sbGVycy5Cb29sZWFuQ29udHJvbGxlcixcbmRhdC51dGlscy5jb21tb24pLFxuZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXIsXG5kYXQuY29udHJvbGxlcnMuQm9vbGVhbkNvbnRyb2xsZXIsXG5kYXQuY29udHJvbGxlcnMuRnVuY3Rpb25Db250cm9sbGVyLFxuZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJCb3gsXG5kYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlclNsaWRlcixcbmRhdC5jb250cm9sbGVycy5PcHRpb25Db250cm9sbGVyLFxuZGF0LmNvbnRyb2xsZXJzLkNvbG9yQ29udHJvbGxlciA9IChmdW5jdGlvbiAoQ29udHJvbGxlciwgZG9tLCBDb2xvciwgaW50ZXJwcmV0LCBjb21tb24pIHtcblxuICB2YXIgQ29sb3JDb250cm9sbGVyID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkge1xuXG4gICAgQ29sb3JDb250cm9sbGVyLnN1cGVyY2xhc3MuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5KTtcblxuICAgIHRoaXMuX19jb2xvciA9IG5ldyBDb2xvcih0aGlzLmdldFZhbHVlKCkpO1xuICAgIHRoaXMuX190ZW1wID0gbmV3IENvbG9yKDApO1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgZG9tLm1ha2VTZWxlY3RhYmxlKHRoaXMuZG9tRWxlbWVudCwgZmFsc2UpO1xuXG4gICAgdGhpcy5fX3NlbGVjdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fX3NlbGVjdG9yLmNsYXNzTmFtZSA9ICdzZWxlY3Rvcic7XG5cbiAgICB0aGlzLl9fc2F0dXJhdGlvbl9maWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX19zYXR1cmF0aW9uX2ZpZWxkLmNsYXNzTmFtZSA9ICdzYXR1cmF0aW9uLWZpZWxkJztcblxuICAgIHRoaXMuX19maWVsZF9rbm9iID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fX2ZpZWxkX2tub2IuY2xhc3NOYW1lID0gJ2ZpZWxkLWtub2InO1xuICAgIHRoaXMuX19maWVsZF9rbm9iX2JvcmRlciA9ICcycHggc29saWQgJztcblxuICAgIHRoaXMuX19odWVfa25vYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX19odWVfa25vYi5jbGFzc05hbWUgPSAnaHVlLWtub2InO1xuXG4gICAgdGhpcy5fX2h1ZV9maWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX19odWVfZmllbGQuY2xhc3NOYW1lID0gJ2h1ZS1maWVsZCc7XG5cbiAgICB0aGlzLl9faW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHRoaXMuX19pbnB1dC50eXBlID0gJ3RleHQnO1xuICAgIHRoaXMuX19pbnB1dF90ZXh0U2hhZG93ID0gJzAgMXB4IDFweCAnO1xuXG4gICAgZG9tLmJpbmQodGhpcy5fX2lucHV0LCAna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7IC8vIG9uIGVudGVyXG4gICAgICAgIG9uQmx1ci5jYWxsKHRoaXMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZG9tLmJpbmQodGhpcy5fX2lucHV0LCAnYmx1cicsIG9uQmx1cik7XG5cbiAgICBkb20uYmluZCh0aGlzLl9fc2VsZWN0b3IsICdtb3VzZWRvd24nLCBmdW5jdGlvbihlKSB7XG5cbiAgICAgIGRvbVxuICAgICAgICAuYWRkQ2xhc3ModGhpcywgJ2RyYWcnKVxuICAgICAgICAuYmluZCh3aW5kb3csICdtb3VzZXVwJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGRvbS5yZW1vdmVDbGFzcyhfdGhpcy5fX3NlbGVjdG9yLCAnZHJhZycpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgdmFyIHZhbHVlX2ZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBjb21tb24uZXh0ZW5kKHRoaXMuX19zZWxlY3Rvci5zdHlsZSwge1xuICAgICAgd2lkdGg6ICcxMjJweCcsXG4gICAgICBoZWlnaHQ6ICcxMDJweCcsXG4gICAgICBwYWRkaW5nOiAnM3B4JyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyMyMjInLFxuICAgICAgYm94U2hhZG93OiAnMHB4IDFweCAzcHggcmdiYSgwLDAsMCwwLjMpJ1xuICAgIH0pO1xuXG4gICAgY29tbW9uLmV4dGVuZCh0aGlzLl9fZmllbGRfa25vYi5zdHlsZSwge1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB3aWR0aDogJzEycHgnLFxuICAgICAgaGVpZ2h0OiAnMTJweCcsXG4gICAgICBib3JkZXI6IHRoaXMuX19maWVsZF9rbm9iX2JvcmRlciArICh0aGlzLl9fY29sb3IudiA8IC41ID8gJyNmZmYnIDogJyMwMDAnKSxcbiAgICAgIGJveFNoYWRvdzogJzBweCAxcHggM3B4IHJnYmEoMCwwLDAsMC41KScsXG4gICAgICBib3JkZXJSYWRpdXM6ICcxMnB4JyxcbiAgICAgIHpJbmRleDogMVxuICAgIH0pO1xuICAgIFxuICAgIGNvbW1vbi5leHRlbmQodGhpcy5fX2h1ZV9rbm9iLnN0eWxlLCB7XG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIHdpZHRoOiAnMTVweCcsXG4gICAgICBoZWlnaHQ6ICcycHgnLFxuICAgICAgYm9yZGVyUmlnaHQ6ICc0cHggc29saWQgI2ZmZicsXG4gICAgICB6SW5kZXg6IDFcbiAgICB9KTtcblxuICAgIGNvbW1vbi5leHRlbmQodGhpcy5fX3NhdHVyYXRpb25fZmllbGQuc3R5bGUsIHtcbiAgICAgIHdpZHRoOiAnMTAwcHgnLFxuICAgICAgaGVpZ2h0OiAnMTAwcHgnLFxuICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICM1NTUnLFxuICAgICAgbWFyZ2luUmlnaHQ6ICczcHgnLFxuICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICBjdXJzb3I6ICdwb2ludGVyJ1xuICAgIH0pO1xuXG4gICAgY29tbW9uLmV4dGVuZCh2YWx1ZV9maWVsZC5zdHlsZSwge1xuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgYmFja2dyb3VuZDogJ25vbmUnXG4gICAgfSk7XG4gICAgXG4gICAgbGluZWFyR3JhZGllbnQodmFsdWVfZmllbGQsICd0b3AnLCAncmdiYSgwLDAsMCwwKScsICcjMDAwJyk7XG5cbiAgICBjb21tb24uZXh0ZW5kKHRoaXMuX19odWVfZmllbGQuc3R5bGUsIHtcbiAgICAgIHdpZHRoOiAnMTVweCcsXG4gICAgICBoZWlnaHQ6ICcxMDBweCcsXG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjNTU1JyxcbiAgICAgIGN1cnNvcjogJ25zLXJlc2l6ZSdcbiAgICB9KTtcblxuICAgIGh1ZUdyYWRpZW50KHRoaXMuX19odWVfZmllbGQpO1xuXG4gICAgY29tbW9uLmV4dGVuZCh0aGlzLl9faW5wdXQuc3R5bGUsIHtcbiAgICAgIG91dGxpbmU6ICdub25lJyxcbi8vICAgICAgd2lkdGg6ICcxMjBweCcsXG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuLy8gICAgICBwYWRkaW5nOiAnNHB4Jyxcbi8vICAgICAgbWFyZ2luQm90dG9tOiAnNnB4JyxcbiAgICAgIGNvbG9yOiAnI2ZmZicsXG4gICAgICBib3JkZXI6IDAsXG4gICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gICAgICB0ZXh0U2hhZG93OiB0aGlzLl9faW5wdXRfdGV4dFNoYWRvdyArICdyZ2JhKDAsMCwwLDAuNyknXG4gICAgfSk7XG5cbiAgICBkb20uYmluZCh0aGlzLl9fc2F0dXJhdGlvbl9maWVsZCwgJ21vdXNlZG93bicsIGZpZWxkRG93bik7XG4gICAgZG9tLmJpbmQodGhpcy5fX2ZpZWxkX2tub2IsICdtb3VzZWRvd24nLCBmaWVsZERvd24pO1xuXG4gICAgZG9tLmJpbmQodGhpcy5fX2h1ZV9maWVsZCwgJ21vdXNlZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIHNldEgoZSk7XG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBzZXRIKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCB1bmJpbmRIKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGZpZWxkRG93bihlKSB7XG4gICAgICBzZXRTVihlKTtcbiAgICAgIC8vIGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gJ25vbmUnO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgc2V0U1YpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2V1cCcsIHVuYmluZFNWKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bmJpbmRTVigpIHtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgc2V0U1YpO1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZXVwJywgdW5iaW5kU1YpO1xuICAgICAgLy8gZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3IgPSAnZGVmYXVsdCc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25CbHVyKCkge1xuICAgICAgdmFyIGkgPSBpbnRlcnByZXQodGhpcy52YWx1ZSk7XG4gICAgICBpZiAoaSAhPT0gZmFsc2UpIHtcbiAgICAgICAgX3RoaXMuX19jb2xvci5fX3N0YXRlID0gaTtcbiAgICAgICAgX3RoaXMuc2V0VmFsdWUoX3RoaXMuX19jb2xvci50b09yaWdpbmFsKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IF90aGlzLl9fY29sb3IudG9TdHJpbmcoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bmJpbmRIKCkge1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBzZXRIKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2V1cCcsIHVuYmluZEgpO1xuICAgIH1cblxuICAgIHRoaXMuX19zYXR1cmF0aW9uX2ZpZWxkLmFwcGVuZENoaWxkKHZhbHVlX2ZpZWxkKTtcbiAgICB0aGlzLl9fc2VsZWN0b3IuYXBwZW5kQ2hpbGQodGhpcy5fX2ZpZWxkX2tub2IpO1xuICAgIHRoaXMuX19zZWxlY3Rvci5hcHBlbmRDaGlsZCh0aGlzLl9fc2F0dXJhdGlvbl9maWVsZCk7XG4gICAgdGhpcy5fX3NlbGVjdG9yLmFwcGVuZENoaWxkKHRoaXMuX19odWVfZmllbGQpO1xuICAgIHRoaXMuX19odWVfZmllbGQuYXBwZW5kQ2hpbGQodGhpcy5fX2h1ZV9rbm9iKTtcblxuICAgIHRoaXMuZG9tRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9faW5wdXQpO1xuICAgIHRoaXMuZG9tRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9fc2VsZWN0b3IpO1xuXG4gICAgdGhpcy51cGRhdGVEaXNwbGF5KCk7XG5cbiAgICBmdW5jdGlvbiBzZXRTVihlKSB7XG5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdmFyIHcgPSBkb20uZ2V0V2lkdGgoX3RoaXMuX19zYXR1cmF0aW9uX2ZpZWxkKTtcbiAgICAgIHZhciBvID0gZG9tLmdldE9mZnNldChfdGhpcy5fX3NhdHVyYXRpb25fZmllbGQpO1xuICAgICAgdmFyIHMgPSAoZS5jbGllbnRYIC0gby5sZWZ0ICsgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0KSAvIHc7XG4gICAgICB2YXIgdiA9IDEgLSAoZS5jbGllbnRZIC0gby50b3AgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCkgLyB3O1xuXG4gICAgICBpZiAodiA+IDEpIHYgPSAxO1xuICAgICAgZWxzZSBpZiAodiA8IDApIHYgPSAwO1xuXG4gICAgICBpZiAocyA+IDEpIHMgPSAxO1xuICAgICAgZWxzZSBpZiAocyA8IDApIHMgPSAwO1xuXG4gICAgICBfdGhpcy5fX2NvbG9yLnYgPSB2O1xuICAgICAgX3RoaXMuX19jb2xvci5zID0gcztcblxuICAgICAgX3RoaXMuc2V0VmFsdWUoX3RoaXMuX19jb2xvci50b09yaWdpbmFsKCkpO1xuXG5cbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldEgoZSkge1xuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHZhciBzID0gZG9tLmdldEhlaWdodChfdGhpcy5fX2h1ZV9maWVsZCk7XG4gICAgICB2YXIgbyA9IGRvbS5nZXRPZmZzZXQoX3RoaXMuX19odWVfZmllbGQpO1xuICAgICAgdmFyIGggPSAxIC0gKGUuY2xpZW50WSAtIG8udG9wICsgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3ApIC8gcztcblxuICAgICAgaWYgKGggPiAxKSBoID0gMTtcbiAgICAgIGVsc2UgaWYgKGggPCAwKSBoID0gMDtcblxuICAgICAgX3RoaXMuX19jb2xvci5oID0gaCAqIDM2MDtcblxuICAgICAgX3RoaXMuc2V0VmFsdWUoX3RoaXMuX19jb2xvci50b09yaWdpbmFsKCkpO1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG5cbiAgfTtcblxuICBDb2xvckNvbnRyb2xsZXIuc3VwZXJjbGFzcyA9IENvbnRyb2xsZXI7XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgQ29sb3JDb250cm9sbGVyLnByb3RvdHlwZSxcbiAgICAgIENvbnRyb2xsZXIucHJvdG90eXBlLFxuXG4gICAgICB7XG5cbiAgICAgICAgdXBkYXRlRGlzcGxheTogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICB2YXIgaSA9IGludGVycHJldCh0aGlzLmdldFZhbHVlKCkpO1xuXG4gICAgICAgICAgaWYgKGkgIT09IGZhbHNlKSB7XG5cbiAgICAgICAgICAgIHZhciBtaXNtYXRjaCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyBDaGVjayBmb3IgbWlzbWF0Y2ggb24gdGhlIGludGVycHJldGVkIHZhbHVlLlxuXG4gICAgICAgICAgICBjb21tb24uZWFjaChDb2xvci5DT01QT05FTlRTLCBmdW5jdGlvbihjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb21tb24uaXNVbmRlZmluZWQoaVtjb21wb25lbnRdKSAmJlxuICAgICAgICAgICAgICAgICAgIWNvbW1vbi5pc1VuZGVmaW5lZCh0aGlzLl9fY29sb3IuX19zdGF0ZVtjb21wb25lbnRdKSAmJlxuICAgICAgICAgICAgICAgICAgaVtjb21wb25lbnRdICE9PSB0aGlzLl9fY29sb3IuX19zdGF0ZVtjb21wb25lbnRdKSB7XG4gICAgICAgICAgICAgICAgbWlzbWF0Y2ggPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybiB7fTsgLy8gYnJlYWtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgICAgIC8vIElmIG5vdGhpbmcgZGl2ZXJnZXMsIHdlIGtlZXAgb3VyIHByZXZpb3VzIHZhbHVlc1xuICAgICAgICAgICAgLy8gZm9yIHN0YXRlZnVsbmVzcywgb3RoZXJ3aXNlIHdlIHJlY2FsY3VsYXRlIGZyZXNoXG4gICAgICAgICAgICBpZiAobWlzbWF0Y2gpIHtcbiAgICAgICAgICAgICAgY29tbW9uLmV4dGVuZCh0aGlzLl9fY29sb3IuX19zdGF0ZSwgaSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb21tb24uZXh0ZW5kKHRoaXMuX190ZW1wLl9fc3RhdGUsIHRoaXMuX19jb2xvci5fX3N0YXRlKTtcblxuICAgICAgICAgIHRoaXMuX190ZW1wLmEgPSAxO1xuXG4gICAgICAgICAgdmFyIGZsaXAgPSAodGhpcy5fX2NvbG9yLnYgPCAuNSB8fCB0aGlzLl9fY29sb3IucyA+IC41KSA/IDI1NSA6IDA7XG4gICAgICAgICAgdmFyIF9mbGlwID0gMjU1IC0gZmxpcDtcblxuICAgICAgICAgIGNvbW1vbi5leHRlbmQodGhpcy5fX2ZpZWxkX2tub2Iuc3R5bGUsIHtcbiAgICAgICAgICAgIG1hcmdpbkxlZnQ6IDEwMCAqIHRoaXMuX19jb2xvci5zIC0gNyArICdweCcsXG4gICAgICAgICAgICBtYXJnaW5Ub3A6IDEwMCAqICgxIC0gdGhpcy5fX2NvbG9yLnYpIC0gNyArICdweCcsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuX190ZW1wLnRvU3RyaW5nKCksXG4gICAgICAgICAgICBib3JkZXI6IHRoaXMuX19maWVsZF9rbm9iX2JvcmRlciArICdyZ2IoJyArIGZsaXAgKyAnLCcgKyBmbGlwICsgJywnICsgZmxpcCArJyknXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLl9faHVlX2tub2Iuc3R5bGUubWFyZ2luVG9wID0gKDEgLSB0aGlzLl9fY29sb3IuaCAvIDM2MCkgKiAxMDAgKyAncHgnXG5cbiAgICAgICAgICB0aGlzLl9fdGVtcC5zID0gMTtcbiAgICAgICAgICB0aGlzLl9fdGVtcC52ID0gMTtcblxuICAgICAgICAgIGxpbmVhckdyYWRpZW50KHRoaXMuX19zYXR1cmF0aW9uX2ZpZWxkLCAnbGVmdCcsICcjZmZmJywgdGhpcy5fX3RlbXAudG9TdHJpbmcoKSk7XG5cbiAgICAgICAgICBjb21tb24uZXh0ZW5kKHRoaXMuX19pbnB1dC5zdHlsZSwge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLl9faW5wdXQudmFsdWUgPSB0aGlzLl9fY29sb3IudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIGNvbG9yOiAncmdiKCcgKyBmbGlwICsgJywnICsgZmxpcCArICcsJyArIGZsaXAgKycpJyxcbiAgICAgICAgICAgIHRleHRTaGFkb3c6IHRoaXMuX19pbnB1dF90ZXh0U2hhZG93ICsgJ3JnYmEoJyArIF9mbGlwICsgJywnICsgX2ZsaXAgKyAnLCcgKyBfZmxpcCArJywuNyknXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgKTtcbiAgXG4gIHZhciB2ZW5kb3JzID0gWyctbW96LScsJy1vLScsJy13ZWJraXQtJywnLW1zLScsJyddO1xuICBcbiAgZnVuY3Rpb24gbGluZWFyR3JhZGllbnQoZWxlbSwgeCwgYSwgYikge1xuICAgIGVsZW0uc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgIGNvbW1vbi5lYWNoKHZlbmRvcnMsIGZ1bmN0aW9uKHZlbmRvcikge1xuICAgICAgZWxlbS5zdHlsZS5jc3NUZXh0ICs9ICdiYWNrZ3JvdW5kOiAnICsgdmVuZG9yICsgJ2xpbmVhci1ncmFkaWVudCgnK3grJywgJythKycgMCUsICcgKyBiICsgJyAxMDAlKTsgJztcbiAgICB9KTtcbiAgfVxuICBcbiAgZnVuY3Rpb24gaHVlR3JhZGllbnQoZWxlbSkge1xuICAgIGVsZW0uc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgIGVsZW0uc3R5bGUuY3NzVGV4dCArPSAnYmFja2dyb3VuZDogLW1vei1saW5lYXItZ3JhZGllbnQodG9wLCAgI2ZmMDAwMCAwJSwgI2ZmMDBmZiAxNyUsICMwMDAwZmYgMzQlLCAjMDBmZmZmIDUwJSwgIzAwZmYwMCA2NyUsICNmZmZmMDAgODQlLCAjZmYwMDAwIDEwMCUpOydcbiAgICBlbGVtLnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCwgICNmZjAwMDAgMCUsI2ZmMDBmZiAxNyUsIzAwMDBmZiAzNCUsIzAwZmZmZiA1MCUsIzAwZmYwMCA2NyUsI2ZmZmYwMCA4NCUsI2ZmMDAwMCAxMDAlKTsnXG4gICAgZWxlbS5zdHlsZS5jc3NUZXh0ICs9ICdiYWNrZ3JvdW5kOiAtby1saW5lYXItZ3JhZGllbnQodG9wLCAgI2ZmMDAwMCAwJSwjZmYwMGZmIDE3JSwjMDAwMGZmIDM0JSwjMDBmZmZmIDUwJSwjMDBmZjAwIDY3JSwjZmZmZjAwIDg0JSwjZmYwMDAwIDEwMCUpOydcbiAgICBlbGVtLnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQ6IC1tcy1saW5lYXItZ3JhZGllbnQodG9wLCAgI2ZmMDAwMCAwJSwjZmYwMGZmIDE3JSwjMDAwMGZmIDM0JSwjMDBmZmZmIDUwJSwjMDBmZjAwIDY3JSwjZmZmZjAwIDg0JSwjZmYwMDAwIDEwMCUpOydcbiAgICBlbGVtLnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0b3AsICAjZmYwMDAwIDAlLCNmZjAwZmYgMTclLCMwMDAwZmYgMzQlLCMwMGZmZmYgNTAlLCMwMGZmMDAgNjclLCNmZmZmMDAgODQlLCNmZjAwMDAgMTAwJSk7J1xuICB9XG5cblxuICByZXR1cm4gQ29sb3JDb250cm9sbGVyO1xuXG59KShkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlcixcbmRhdC5kb20uZG9tLFxuZGF0LmNvbG9yLkNvbG9yID0gKGZ1bmN0aW9uIChpbnRlcnByZXQsIG1hdGgsIHRvU3RyaW5nLCBjb21tb24pIHtcblxuICB2YXIgQ29sb3IgPSBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuX19zdGF0ZSA9IGludGVycHJldC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgaWYgKHRoaXMuX19zdGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHRocm93ICdGYWlsZWQgdG8gaW50ZXJwcmV0IGNvbG9yIGFyZ3VtZW50cyc7XG4gICAgfVxuXG4gICAgdGhpcy5fX3N0YXRlLmEgPSB0aGlzLl9fc3RhdGUuYSB8fCAxO1xuXG5cbiAgfTtcblxuICBDb2xvci5DT01QT05FTlRTID0gWydyJywnZycsJ2InLCdoJywncycsJ3YnLCdoZXgnLCdhJ107XG5cbiAgY29tbW9uLmV4dGVuZChDb2xvci5wcm90b3R5cGUsIHtcblxuICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0b1N0cmluZyh0aGlzKTtcbiAgICB9LFxuXG4gICAgdG9PcmlnaW5hbDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX3N0YXRlLmNvbnZlcnNpb24ud3JpdGUodGhpcyk7XG4gICAgfVxuXG4gIH0pO1xuXG4gIGRlZmluZVJHQkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdyJywgMik7XG4gIGRlZmluZVJHQkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdnJywgMSk7XG4gIGRlZmluZVJHQkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdiJywgMCk7XG5cbiAgZGVmaW5lSFNWQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ2gnKTtcbiAgZGVmaW5lSFNWQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ3MnKTtcbiAgZGVmaW5lSFNWQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ3YnKTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29sb3IucHJvdG90eXBlLCAnYScsIHtcblxuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX3N0YXRlLmE7XG4gICAgfSxcblxuICAgIHNldDogZnVuY3Rpb24odikge1xuICAgICAgdGhpcy5fX3N0YXRlLmEgPSB2O1xuICAgIH1cblxuICB9KTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29sb3IucHJvdG90eXBlLCAnaGV4Jywge1xuXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcblxuICAgICAgaWYgKCF0aGlzLl9fc3RhdGUuc3BhY2UgIT09ICdIRVgnKSB7XG4gICAgICAgIHRoaXMuX19zdGF0ZS5oZXggPSBtYXRoLnJnYl90b19oZXgodGhpcy5yLCB0aGlzLmcsIHRoaXMuYik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9fc3RhdGUuaGV4O1xuXG4gICAgfSxcblxuICAgIHNldDogZnVuY3Rpb24odikge1xuXG4gICAgICB0aGlzLl9fc3RhdGUuc3BhY2UgPSAnSEVYJztcbiAgICAgIHRoaXMuX19zdGF0ZS5oZXggPSB2O1xuXG4gICAgfVxuXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGRlZmluZVJHQkNvbXBvbmVudCh0YXJnZXQsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpIHtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbXBvbmVudCwge1xuXG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGlmICh0aGlzLl9fc3RhdGUuc3BhY2UgPT09ICdSR0InKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVjYWxjdWxhdGVSR0IodGhpcywgY29tcG9uZW50LCBjb21wb25lbnRIZXhJbmRleCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xuXG4gICAgICB9LFxuXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcblxuICAgICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlICE9PSAnUkdCJykge1xuICAgICAgICAgIHJlY2FsY3VsYXRlUkdCKHRoaXMsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpO1xuICAgICAgICAgIHRoaXMuX19zdGF0ZS5zcGFjZSA9ICdSR0InO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fX3N0YXRlW2NvbXBvbmVudF0gPSB2O1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG5cbiAgZnVuY3Rpb24gZGVmaW5lSFNWQ29tcG9uZW50KHRhcmdldCwgY29tcG9uZW50KSB7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb21wb25lbnQsIHtcblxuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcblxuICAgICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlID09PSAnSFNWJylcbiAgICAgICAgICByZXR1cm4gdGhpcy5fX3N0YXRlW2NvbXBvbmVudF07XG5cbiAgICAgICAgcmVjYWxjdWxhdGVIU1YodGhpcyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xuXG4gICAgICB9LFxuXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcblxuICAgICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlICE9PSAnSFNWJykge1xuICAgICAgICAgIHJlY2FsY3VsYXRlSFNWKHRoaXMpO1xuICAgICAgICAgIHRoaXMuX19zdGF0ZS5zcGFjZSA9ICdIU1YnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fX3N0YXRlW2NvbXBvbmVudF0gPSB2O1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG5cbiAgZnVuY3Rpb24gcmVjYWxjdWxhdGVSR0IoY29sb3IsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpIHtcblxuICAgIGlmIChjb2xvci5fX3N0YXRlLnNwYWNlID09PSAnSEVYJykge1xuXG4gICAgICBjb2xvci5fX3N0YXRlW2NvbXBvbmVudF0gPSBtYXRoLmNvbXBvbmVudF9mcm9tX2hleChjb2xvci5fX3N0YXRlLmhleCwgY29tcG9uZW50SGV4SW5kZXgpO1xuXG4gICAgfSBlbHNlIGlmIChjb2xvci5fX3N0YXRlLnNwYWNlID09PSAnSFNWJykge1xuXG4gICAgICBjb21tb24uZXh0ZW5kKGNvbG9yLl9fc3RhdGUsIG1hdGguaHN2X3RvX3JnYihjb2xvci5fX3N0YXRlLmgsIGNvbG9yLl9fc3RhdGUucywgY29sb3IuX19zdGF0ZS52KSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aHJvdyAnQ29ycnVwdGVkIGNvbG9yIHN0YXRlJztcblxuICAgIH1cblxuICB9XG5cbiAgZnVuY3Rpb24gcmVjYWxjdWxhdGVIU1YoY29sb3IpIHtcblxuICAgIHZhciByZXN1bHQgPSBtYXRoLnJnYl90b19oc3YoY29sb3IuciwgY29sb3IuZywgY29sb3IuYik7XG5cbiAgICBjb21tb24uZXh0ZW5kKGNvbG9yLl9fc3RhdGUsXG4gICAgICAgIHtcbiAgICAgICAgICBzOiByZXN1bHQucyxcbiAgICAgICAgICB2OiByZXN1bHQudlxuICAgICAgICB9XG4gICAgKTtcblxuICAgIGlmICghY29tbW9uLmlzTmFOKHJlc3VsdC5oKSkge1xuICAgICAgY29sb3IuX19zdGF0ZS5oID0gcmVzdWx0Lmg7XG4gICAgfSBlbHNlIGlmIChjb21tb24uaXNVbmRlZmluZWQoY29sb3IuX19zdGF0ZS5oKSkge1xuICAgICAgY29sb3IuX19zdGF0ZS5oID0gMDtcbiAgICB9XG5cbiAgfVxuXG4gIHJldHVybiBDb2xvcjtcblxufSkoZGF0LmNvbG9yLmludGVycHJldCxcbmRhdC5jb2xvci5tYXRoID0gKGZ1bmN0aW9uICgpIHtcblxuICB2YXIgdG1wQ29tcG9uZW50O1xuXG4gIHJldHVybiB7XG5cbiAgICBoc3ZfdG9fcmdiOiBmdW5jdGlvbihoLCBzLCB2KSB7XG5cbiAgICAgIHZhciBoaSA9IE1hdGguZmxvb3IoaCAvIDYwKSAlIDY7XG5cbiAgICAgIHZhciBmID0gaCAvIDYwIC0gTWF0aC5mbG9vcihoIC8gNjApO1xuICAgICAgdmFyIHAgPSB2ICogKDEuMCAtIHMpO1xuICAgICAgdmFyIHEgPSB2ICogKDEuMCAtIChmICogcykpO1xuICAgICAgdmFyIHQgPSB2ICogKDEuMCAtICgoMS4wIC0gZikgKiBzKSk7XG4gICAgICB2YXIgYyA9IFtcbiAgICAgICAgW3YsIHQsIHBdLFxuICAgICAgICBbcSwgdiwgcF0sXG4gICAgICAgIFtwLCB2LCB0XSxcbiAgICAgICAgW3AsIHEsIHZdLFxuICAgICAgICBbdCwgcCwgdl0sXG4gICAgICAgIFt2LCBwLCBxXVxuICAgICAgXVtoaV07XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHI6IGNbMF0gKiAyNTUsXG4gICAgICAgIGc6IGNbMV0gKiAyNTUsXG4gICAgICAgIGI6IGNbMl0gKiAyNTVcbiAgICAgIH07XG5cbiAgICB9LFxuXG4gICAgcmdiX3RvX2hzdjogZnVuY3Rpb24ociwgZywgYikge1xuXG4gICAgICB2YXIgbWluID0gTWF0aC5taW4ociwgZywgYiksXG4gICAgICAgICAgbWF4ID0gTWF0aC5tYXgociwgZywgYiksXG4gICAgICAgICAgZGVsdGEgPSBtYXggLSBtaW4sXG4gICAgICAgICAgaCwgcztcblxuICAgICAgaWYgKG1heCAhPSAwKSB7XG4gICAgICAgIHMgPSBkZWx0YSAvIG1heDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaDogTmFOLFxuICAgICAgICAgIHM6IDAsXG4gICAgICAgICAgdjogMFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBpZiAociA9PSBtYXgpIHtcbiAgICAgICAgaCA9IChnIC0gYikgLyBkZWx0YTtcbiAgICAgIH0gZWxzZSBpZiAoZyA9PSBtYXgpIHtcbiAgICAgICAgaCA9IDIgKyAoYiAtIHIpIC8gZGVsdGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoID0gNCArIChyIC0gZykgLyBkZWx0YTtcbiAgICAgIH1cbiAgICAgIGggLz0gNjtcbiAgICAgIGlmIChoIDwgMCkge1xuICAgICAgICBoICs9IDE7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGg6IGggKiAzNjAsXG4gICAgICAgIHM6IHMsXG4gICAgICAgIHY6IG1heCAvIDI1NVxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgcmdiX3RvX2hleDogZnVuY3Rpb24ociwgZywgYikge1xuICAgICAgdmFyIGhleCA9IHRoaXMuaGV4X3dpdGhfY29tcG9uZW50KDAsIDIsIHIpO1xuICAgICAgaGV4ID0gdGhpcy5oZXhfd2l0aF9jb21wb25lbnQoaGV4LCAxLCBnKTtcbiAgICAgIGhleCA9IHRoaXMuaGV4X3dpdGhfY29tcG9uZW50KGhleCwgMCwgYik7XG4gICAgICByZXR1cm4gaGV4O1xuICAgIH0sXG5cbiAgICBjb21wb25lbnRfZnJvbV9oZXg6IGZ1bmN0aW9uKGhleCwgY29tcG9uZW50SW5kZXgpIHtcbiAgICAgIHJldHVybiAoaGV4ID4+IChjb21wb25lbnRJbmRleCAqIDgpKSAmIDB4RkY7XG4gICAgfSxcblxuICAgIGhleF93aXRoX2NvbXBvbmVudDogZnVuY3Rpb24oaGV4LCBjb21wb25lbnRJbmRleCwgdmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZSA8PCAodG1wQ29tcG9uZW50ID0gY29tcG9uZW50SW5kZXggKiA4KSB8IChoZXggJiB+ICgweEZGIDw8IHRtcENvbXBvbmVudCkpO1xuICAgIH1cblxuICB9XG5cbn0pKCksXG5kYXQuY29sb3IudG9TdHJpbmcsXG5kYXQudXRpbHMuY29tbW9uKSxcbmRhdC5jb2xvci5pbnRlcnByZXQsXG5kYXQudXRpbHMuY29tbW9uKSxcbmRhdC51dGlscy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSAoZnVuY3Rpb24gKCkge1xuXG4gIC8qKlxuICAgKiByZXF1aXJlanMgdmVyc2lvbiBvZiBQYXVsIElyaXNoJ3MgUmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAqIGh0dHA6Ly9wYXVsaXJpc2guY29tLzIwMTEvcmVxdWVzdGFuaW1hdGlvbmZyYW1lLWZvci1zbWFydC1hbmltYXRpbmcvXG4gICAqL1xuXG4gIHJldHVybiB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICBmdW5jdGlvbihjYWxsYmFjaywgZWxlbWVudCkge1xuXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuXG4gICAgICB9O1xufSkoKSxcbmRhdC5kb20uQ2VudGVyZWREaXYgPSAoZnVuY3Rpb24gKGRvbSwgY29tbW9uKSB7XG5cblxuICB2YXIgQ2VudGVyZWREaXYgPSBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuYmFja2dyb3VuZEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb21tb24uZXh0ZW5kKHRoaXMuYmFja2dyb3VuZEVsZW1lbnQuc3R5bGUsIHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwwLDAsMC44KScsXG4gICAgICB0b3A6IDAsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgZGlzcGxheTogJ25vbmUnLFxuICAgICAgekluZGV4OiAnMTAwMCcsXG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgV2Via2l0VHJhbnNpdGlvbjogJ29wYWNpdHkgMC4ycyBsaW5lYXInXG4gICAgfSk7XG5cbiAgICBkb20ubWFrZUZ1bGxzY3JlZW4odGhpcy5iYWNrZ3JvdW5kRWxlbWVudCk7XG4gICAgdGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb21tb24uZXh0ZW5kKHRoaXMuZG9tRWxlbWVudC5zdHlsZSwge1xuICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICBkaXNwbGF5OiAnbm9uZScsXG4gICAgICB6SW5kZXg6ICcxMDAxJyxcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICBXZWJraXRUcmFuc2l0aW9uOiAnLXdlYmtpdC10cmFuc2Zvcm0gMC4ycyBlYXNlLW91dCwgb3BhY2l0eSAwLjJzIGxpbmVhcidcbiAgICB9KTtcblxuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmJhY2tncm91bmRFbGVtZW50KTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZG9tRWxlbWVudCk7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIGRvbS5iaW5kKHRoaXMuYmFja2dyb3VuZEVsZW1lbnQsICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgX3RoaXMuaGlkZSgpO1xuICAgIH0pO1xuXG5cbiAgfTtcblxuICBDZW50ZXJlZERpdi5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICBcblxuXG4gICAgdGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XG4vLyAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUudG9wID0gJzUyJSc7XG4gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgxLjEpJztcblxuICAgIHRoaXMubGF5b3V0KCk7XG5cbiAgICBjb21tb24uZGVmZXIoZnVuY3Rpb24oKSB7XG4gICAgICBfdGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgIF90aGlzLmRvbUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICBfdGhpcy5kb21FbGVtZW50LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgxKSc7XG4gICAgfSk7XG5cbiAgfTtcblxuICBDZW50ZXJlZERpdi5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciBoaWRlID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgIF90aGlzLmRvbUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIF90aGlzLmJhY2tncm91bmRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICAgIGRvbS51bmJpbmQoX3RoaXMuZG9tRWxlbWVudCwgJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBoaWRlKTtcbiAgICAgIGRvbS51bmJpbmQoX3RoaXMuZG9tRWxlbWVudCwgJ3RyYW5zaXRpb25lbmQnLCBoaWRlKTtcbiAgICAgIGRvbS51bmJpbmQoX3RoaXMuZG9tRWxlbWVudCwgJ29UcmFuc2l0aW9uRW5kJywgaGlkZSk7XG5cbiAgICB9O1xuXG4gICAgZG9tLmJpbmQodGhpcy5kb21FbGVtZW50LCAnd2Via2l0VHJhbnNpdGlvbkVuZCcsIGhpZGUpO1xuICAgIGRvbS5iaW5kKHRoaXMuZG9tRWxlbWVudCwgJ3RyYW5zaXRpb25lbmQnLCBoaWRlKTtcbiAgICBkb20uYmluZCh0aGlzLmRvbUVsZW1lbnQsICdvVHJhbnNpdGlvbkVuZCcsIGhpZGUpO1xuXG4gICAgdGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcbi8vICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS50b3AgPSAnNDglJztcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgxLjEpJztcblxuICB9O1xuXG4gIENlbnRlcmVkRGl2LnByb3RvdHlwZS5sYXlvdXQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCA9IHdpbmRvdy5pbm5lcldpZHRoLzIgLSBkb20uZ2V0V2lkdGgodGhpcy5kb21FbGVtZW50KSAvIDIgKyAncHgnO1xuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS50b3AgPSB3aW5kb3cuaW5uZXJIZWlnaHQvMiAtIGRvbS5nZXRIZWlnaHQodGhpcy5kb21FbGVtZW50KSAvIDIgKyAncHgnO1xuICB9O1xuICBcbiAgZnVuY3Rpb24gbG9ja1Njcm9sbChlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG4gIH1cblxuICByZXR1cm4gQ2VudGVyZWREaXY7XG5cbn0pKGRhdC5kb20uZG9tLFxuZGF0LnV0aWxzLmNvbW1vbiksXG5kYXQuZG9tLmRvbSxcbmRhdC51dGlscy5jb21tb24pOyIsIi8qKlxuICogZGF0LWd1aSBKYXZhU2NyaXB0IENvbnRyb2xsZXIgTGlicmFyeVxuICogaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2RhdC1ndWlcbiAqXG4gKiBDb3B5cmlnaHQgMjAxMSBEYXRhIEFydHMgVGVhbSwgR29vZ2xlIENyZWF0aXZlIExhYlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqL1xuXG4vKiogQG5hbWVzcGFjZSAqL1xudmFyIGRhdCA9IG1vZHVsZS5leHBvcnRzID0gZGF0IHx8IHt9O1xuXG4vKiogQG5hbWVzcGFjZSAqL1xuZGF0LmNvbG9yID0gZGF0LmNvbG9yIHx8IHt9O1xuXG4vKiogQG5hbWVzcGFjZSAqL1xuZGF0LnV0aWxzID0gZGF0LnV0aWxzIHx8IHt9O1xuXG5kYXQudXRpbHMuY29tbW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgXG4gIHZhciBBUlJfRUFDSCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoO1xuICB2YXIgQVJSX1NMSUNFID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuXG4gIC8qKlxuICAgKiBCYW5kLWFpZCBtZXRob2RzIGZvciB0aGluZ3MgdGhhdCBzaG91bGQgYmUgYSBsb3QgZWFzaWVyIGluIEphdmFTY3JpcHQuXG4gICAqIEltcGxlbWVudGF0aW9uIGFuZCBzdHJ1Y3R1cmUgaW5zcGlyZWQgYnkgdW5kZXJzY29yZS5qc1xuICAgKiBodHRwOi8vZG9jdW1lbnRjbG91ZC5naXRodWIuY29tL3VuZGVyc2NvcmUvXG4gICAqL1xuXG4gIHJldHVybiB7IFxuICAgIFxuICAgIEJSRUFLOiB7fSxcbiAgXG4gICAgZXh0ZW5kOiBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgIFxuICAgICAgdGhpcy5lYWNoKEFSUl9TTElDRS5jYWxsKGFyZ3VtZW50cywgMSksIGZ1bmN0aW9uKG9iaikge1xuICAgICAgICBcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iailcbiAgICAgICAgICBpZiAoIXRoaXMuaXNVbmRlZmluZWQob2JqW2tleV0pKSBcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gb2JqW2tleV07XG4gICAgICAgIFxuICAgICAgfSwgdGhpcyk7XG4gICAgICBcbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICBcbiAgICB9LFxuICAgIFxuICAgIGRlZmF1bHRzOiBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgIFxuICAgICAgdGhpcy5lYWNoKEFSUl9TTElDRS5jYWxsKGFyZ3VtZW50cywgMSksIGZ1bmN0aW9uKG9iaikge1xuICAgICAgICBcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iailcbiAgICAgICAgICBpZiAodGhpcy5pc1VuZGVmaW5lZCh0YXJnZXRba2V5XSkpIFxuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgXG4gICAgICB9LCB0aGlzKTtcbiAgICAgIFxuICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICBcbiAgICB9LFxuICAgIFxuICAgIGNvbXBvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHRvQ2FsbCA9IEFSUl9TTElDRS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciBhcmdzID0gQVJSX1NMSUNFLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IHRvQ2FsbC5sZW5ndGggLTE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgYXJncyA9IFt0b0NhbGxbaV0uYXBwbHkodGhpcywgYXJncyldO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBhcmdzWzBdO1xuICAgICAgICAgICAgfVxuICAgIH0sXG4gICAgXG4gICAgZWFjaDogZnVuY3Rpb24ob2JqLCBpdHIsIHNjb3BlKSB7XG5cbiAgICAgIFxuICAgICAgaWYgKEFSUl9FQUNIICYmIG9iai5mb3JFYWNoID09PSBBUlJfRUFDSCkgeyBcbiAgICAgICAgXG4gICAgICAgIG9iai5mb3JFYWNoKGl0ciwgc2NvcGUpO1xuICAgICAgICBcbiAgICAgIH0gZWxzZSBpZiAob2JqLmxlbmd0aCA9PT0gb2JqLmxlbmd0aCArIDApIHsgLy8gSXMgbnVtYmVyIGJ1dCBub3QgTmFOXG4gICAgICAgIFxuICAgICAgICBmb3IgKHZhciBrZXkgPSAwLCBsID0gb2JqLmxlbmd0aDsga2V5IDwgbDsga2V5KyspXG4gICAgICAgICAgaWYgKGtleSBpbiBvYmogJiYgaXRyLmNhbGwoc2NvcGUsIG9ialtrZXldLCBrZXkpID09PSB0aGlzLkJSRUFLKSBcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIFxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSBcbiAgICAgICAgICBpZiAoaXRyLmNhbGwoc2NvcGUsIG9ialtrZXldLCBrZXkpID09PSB0aGlzLkJSRUFLKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgXG4gICAgICB9XG4gICAgICAgICAgICBcbiAgICB9LFxuICAgIFxuICAgIGRlZmVyOiBmdW5jdGlvbihmbmMpIHtcbiAgICAgIHNldFRpbWVvdXQoZm5jLCAwKTtcbiAgICB9LFxuICAgIFxuICAgIHRvQXJyYXk6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgaWYgKG9iai50b0FycmF5KSByZXR1cm4gb2JqLnRvQXJyYXkoKTtcbiAgICAgIHJldHVybiBBUlJfU0xJQ0UuY2FsbChvYmopO1xuICAgIH0sXG5cbiAgICBpc1VuZGVmaW5lZDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09PSB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICBcbiAgICBpc051bGw6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gbnVsbDtcbiAgICB9LFxuICAgIFxuICAgIGlzTmFOOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogIT09IG9iajtcbiAgICB9LFxuICAgIFxuICAgIGlzQXJyYXk6IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqLmNvbnN0cnVjdG9yID09PSBBcnJheTtcbiAgICB9LFxuICAgIFxuICAgIGlzT2JqZWN0OiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IE9iamVjdChvYmopO1xuICAgIH0sXG4gICAgXG4gICAgaXNOdW1iZXI6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gb2JqKzA7XG4gICAgfSxcbiAgICBcbiAgICBpc1N0cmluZzogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09PSBvYmorJyc7XG4gICAgfSxcbiAgICBcbiAgICBpc0Jvb2xlYW46IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gZmFsc2UgfHwgb2JqID09PSB0cnVlO1xuICAgIH0sXG4gICAgXG4gICAgaXNGdW5jdGlvbjogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG4gICAgfVxuICBcbiAgfTtcbiAgICBcbn0pKCk7XG5cblxuZGF0LmNvbG9yLnRvU3RyaW5nID0gKGZ1bmN0aW9uIChjb21tb24pIHtcblxuICByZXR1cm4gZnVuY3Rpb24oY29sb3IpIHtcblxuICAgIGlmIChjb2xvci5hID09IDEgfHwgY29tbW9uLmlzVW5kZWZpbmVkKGNvbG9yLmEpKSB7XG5cbiAgICAgIHZhciBzID0gY29sb3IuaGV4LnRvU3RyaW5nKDE2KTtcbiAgICAgIHdoaWxlIChzLmxlbmd0aCA8IDYpIHtcbiAgICAgICAgcyA9ICcwJyArIHM7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAnIycgKyBzO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgcmV0dXJuICdyZ2JhKCcgKyBNYXRoLnJvdW5kKGNvbG9yLnIpICsgJywnICsgTWF0aC5yb3VuZChjb2xvci5nKSArICcsJyArIE1hdGgucm91bmQoY29sb3IuYikgKyAnLCcgKyBjb2xvci5hICsgJyknO1xuXG4gICAgfVxuXG4gIH1cblxufSkoZGF0LnV0aWxzLmNvbW1vbik7XG5cblxuZGF0LkNvbG9yID0gZGF0LmNvbG9yLkNvbG9yID0gKGZ1bmN0aW9uIChpbnRlcnByZXQsIG1hdGgsIHRvU3RyaW5nLCBjb21tb24pIHtcblxuICB2YXIgQ29sb3IgPSBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuX19zdGF0ZSA9IGludGVycHJldC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgaWYgKHRoaXMuX19zdGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHRocm93ICdGYWlsZWQgdG8gaW50ZXJwcmV0IGNvbG9yIGFyZ3VtZW50cyc7XG4gICAgfVxuXG4gICAgdGhpcy5fX3N0YXRlLmEgPSB0aGlzLl9fc3RhdGUuYSB8fCAxO1xuXG5cbiAgfTtcblxuICBDb2xvci5DT01QT05FTlRTID0gWydyJywnZycsJ2InLCdoJywncycsJ3YnLCdoZXgnLCdhJ107XG5cbiAgY29tbW9uLmV4dGVuZChDb2xvci5wcm90b3R5cGUsIHtcblxuICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0b1N0cmluZyh0aGlzKTtcbiAgICB9LFxuXG4gICAgdG9PcmlnaW5hbDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX3N0YXRlLmNvbnZlcnNpb24ud3JpdGUodGhpcyk7XG4gICAgfVxuXG4gIH0pO1xuXG4gIGRlZmluZVJHQkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdyJywgMik7XG4gIGRlZmluZVJHQkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdnJywgMSk7XG4gIGRlZmluZVJHQkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdiJywgMCk7XG5cbiAgZGVmaW5lSFNWQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ2gnKTtcbiAgZGVmaW5lSFNWQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ3MnKTtcbiAgZGVmaW5lSFNWQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ3YnKTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29sb3IucHJvdG90eXBlLCAnYScsIHtcblxuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX3N0YXRlLmE7XG4gICAgfSxcblxuICAgIHNldDogZnVuY3Rpb24odikge1xuICAgICAgdGhpcy5fX3N0YXRlLmEgPSB2O1xuICAgIH1cblxuICB9KTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29sb3IucHJvdG90eXBlLCAnaGV4Jywge1xuXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcblxuICAgICAgaWYgKCF0aGlzLl9fc3RhdGUuc3BhY2UgIT09ICdIRVgnKSB7XG4gICAgICAgIHRoaXMuX19zdGF0ZS5oZXggPSBtYXRoLnJnYl90b19oZXgodGhpcy5yLCB0aGlzLmcsIHRoaXMuYik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9fc3RhdGUuaGV4O1xuXG4gICAgfSxcblxuICAgIHNldDogZnVuY3Rpb24odikge1xuXG4gICAgICB0aGlzLl9fc3RhdGUuc3BhY2UgPSAnSEVYJztcbiAgICAgIHRoaXMuX19zdGF0ZS5oZXggPSB2O1xuXG4gICAgfVxuXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGRlZmluZVJHQkNvbXBvbmVudCh0YXJnZXQsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpIHtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbXBvbmVudCwge1xuXG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGlmICh0aGlzLl9fc3RhdGUuc3BhY2UgPT09ICdSR0InKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVjYWxjdWxhdGVSR0IodGhpcywgY29tcG9uZW50LCBjb21wb25lbnRIZXhJbmRleCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xuXG4gICAgICB9LFxuXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcblxuICAgICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlICE9PSAnUkdCJykge1xuICAgICAgICAgIHJlY2FsY3VsYXRlUkdCKHRoaXMsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpO1xuICAgICAgICAgIHRoaXMuX19zdGF0ZS5zcGFjZSA9ICdSR0InO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fX3N0YXRlW2NvbXBvbmVudF0gPSB2O1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG5cbiAgZnVuY3Rpb24gZGVmaW5lSFNWQ29tcG9uZW50KHRhcmdldCwgY29tcG9uZW50KSB7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb21wb25lbnQsIHtcblxuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcblxuICAgICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlID09PSAnSFNWJylcbiAgICAgICAgICByZXR1cm4gdGhpcy5fX3N0YXRlW2NvbXBvbmVudF07XG5cbiAgICAgICAgcmVjYWxjdWxhdGVIU1YodGhpcyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xuXG4gICAgICB9LFxuXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcblxuICAgICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlICE9PSAnSFNWJykge1xuICAgICAgICAgIHJlY2FsY3VsYXRlSFNWKHRoaXMpO1xuICAgICAgICAgIHRoaXMuX19zdGF0ZS5zcGFjZSA9ICdIU1YnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fX3N0YXRlW2NvbXBvbmVudF0gPSB2O1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG5cbiAgZnVuY3Rpb24gcmVjYWxjdWxhdGVSR0IoY29sb3IsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpIHtcblxuICAgIGlmIChjb2xvci5fX3N0YXRlLnNwYWNlID09PSAnSEVYJykge1xuXG4gICAgICBjb2xvci5fX3N0YXRlW2NvbXBvbmVudF0gPSBtYXRoLmNvbXBvbmVudF9mcm9tX2hleChjb2xvci5fX3N0YXRlLmhleCwgY29tcG9uZW50SGV4SW5kZXgpO1xuXG4gICAgfSBlbHNlIGlmIChjb2xvci5fX3N0YXRlLnNwYWNlID09PSAnSFNWJykge1xuXG4gICAgICBjb21tb24uZXh0ZW5kKGNvbG9yLl9fc3RhdGUsIG1hdGguaHN2X3RvX3JnYihjb2xvci5fX3N0YXRlLmgsIGNvbG9yLl9fc3RhdGUucywgY29sb3IuX19zdGF0ZS52KSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aHJvdyAnQ29ycnVwdGVkIGNvbG9yIHN0YXRlJztcblxuICAgIH1cblxuICB9XG5cbiAgZnVuY3Rpb24gcmVjYWxjdWxhdGVIU1YoY29sb3IpIHtcblxuICAgIHZhciByZXN1bHQgPSBtYXRoLnJnYl90b19oc3YoY29sb3IuciwgY29sb3IuZywgY29sb3IuYik7XG5cbiAgICBjb21tb24uZXh0ZW5kKGNvbG9yLl9fc3RhdGUsXG4gICAgICAgIHtcbiAgICAgICAgICBzOiByZXN1bHQucyxcbiAgICAgICAgICB2OiByZXN1bHQudlxuICAgICAgICB9XG4gICAgKTtcblxuICAgIGlmICghY29tbW9uLmlzTmFOKHJlc3VsdC5oKSkge1xuICAgICAgY29sb3IuX19zdGF0ZS5oID0gcmVzdWx0Lmg7XG4gICAgfSBlbHNlIGlmIChjb21tb24uaXNVbmRlZmluZWQoY29sb3IuX19zdGF0ZS5oKSkge1xuICAgICAgY29sb3IuX19zdGF0ZS5oID0gMDtcbiAgICB9XG5cbiAgfVxuXG4gIHJldHVybiBDb2xvcjtcblxufSkoZGF0LmNvbG9yLmludGVycHJldCA9IChmdW5jdGlvbiAodG9TdHJpbmcsIGNvbW1vbikge1xuXG4gIHZhciByZXN1bHQsIHRvUmV0dXJuO1xuXG4gIHZhciBpbnRlcnByZXQgPSBmdW5jdGlvbigpIHtcblxuICAgIHRvUmV0dXJuID0gZmFsc2U7XG5cbiAgICB2YXIgb3JpZ2luYWwgPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGNvbW1vbi50b0FycmF5KGFyZ3VtZW50cykgOiBhcmd1bWVudHNbMF07XG5cbiAgICBjb21tb24uZWFjaChJTlRFUlBSRVRBVElPTlMsIGZ1bmN0aW9uKGZhbWlseSkge1xuXG4gICAgICBpZiAoZmFtaWx5LmxpdG11cyhvcmlnaW5hbCkpIHtcblxuICAgICAgICBjb21tb24uZWFjaChmYW1pbHkuY29udmVyc2lvbnMsIGZ1bmN0aW9uKGNvbnZlcnNpb24sIGNvbnZlcnNpb25OYW1lKSB7XG5cbiAgICAgICAgICByZXN1bHQgPSBjb252ZXJzaW9uLnJlYWQob3JpZ2luYWwpO1xuXG4gICAgICAgICAgaWYgKHRvUmV0dXJuID09PSBmYWxzZSAmJiByZXN1bHQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0b1JldHVybiA9IHJlc3VsdDtcbiAgICAgICAgICAgIHJlc3VsdC5jb252ZXJzaW9uTmFtZSA9IGNvbnZlcnNpb25OYW1lO1xuICAgICAgICAgICAgcmVzdWx0LmNvbnZlcnNpb24gPSBjb252ZXJzaW9uO1xuICAgICAgICAgICAgcmV0dXJuIGNvbW1vbi5CUkVBSztcblxuICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gY29tbW9uLkJSRUFLO1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICAgIHJldHVybiB0b1JldHVybjtcblxuICB9O1xuXG4gIHZhciBJTlRFUlBSRVRBVElPTlMgPSBbXG5cbiAgICAvLyBTdHJpbmdzXG4gICAge1xuXG4gICAgICBsaXRtdXM6IGNvbW1vbi5pc1N0cmluZyxcblxuICAgICAgY29udmVyc2lvbnM6IHtcblxuICAgICAgICBUSFJFRV9DSEFSX0hFWDoge1xuXG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcblxuICAgICAgICAgICAgdmFyIHRlc3QgPSBvcmlnaW5hbC5tYXRjaCgvXiMoW0EtRjAtOV0pKFtBLUYwLTldKShbQS1GMC05XSkkL2kpO1xuICAgICAgICAgICAgaWYgKHRlc3QgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdIRVgnLFxuICAgICAgICAgICAgICBoZXg6IHBhcnNlSW50KFxuICAgICAgICAgICAgICAgICAgJzB4JyArXG4gICAgICAgICAgICAgICAgICAgICAgdGVzdFsxXS50b1N0cmluZygpICsgdGVzdFsxXS50b1N0cmluZygpICtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXN0WzJdLnRvU3RyaW5nKCkgKyB0ZXN0WzJdLnRvU3RyaW5nKCkgK1xuICAgICAgICAgICAgICAgICAgICAgIHRlc3RbM10udG9TdHJpbmcoKSArIHRlc3RbM10udG9TdHJpbmcoKSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IHRvU3RyaW5nXG5cbiAgICAgICAgfSxcblxuICAgICAgICBTSVhfQ0hBUl9IRVg6IHtcblxuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG5cbiAgICAgICAgICAgIHZhciB0ZXN0ID0gb3JpZ2luYWwubWF0Y2goL14jKFtBLUYwLTldezZ9KSQvaSk7XG4gICAgICAgICAgICBpZiAodGVzdCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ0hFWCcsXG4gICAgICAgICAgICAgIGhleDogcGFyc2VJbnQoJzB4JyArIHRlc3RbMV0udG9TdHJpbmcoKSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IHRvU3RyaW5nXG5cbiAgICAgICAgfSxcblxuICAgICAgICBDU1NfUkdCOiB7XG5cbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuXG4gICAgICAgICAgICB2YXIgdGVzdCA9IG9yaWdpbmFsLm1hdGNoKC9ecmdiXFwoXFxzKiguKylcXHMqLFxccyooLispXFxzKixcXHMqKC4rKVxccypcXCkvKTtcbiAgICAgICAgICAgIGlmICh0ZXN0ID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgcjogcGFyc2VGbG9hdCh0ZXN0WzFdKSxcbiAgICAgICAgICAgICAgZzogcGFyc2VGbG9hdCh0ZXN0WzJdKSxcbiAgICAgICAgICAgICAgYjogcGFyc2VGbG9hdCh0ZXN0WzNdKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogdG9TdHJpbmdcblxuICAgICAgICB9LFxuXG4gICAgICAgIENTU19SR0JBOiB7XG5cbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuXG4gICAgICAgICAgICB2YXIgdGVzdCA9IG9yaWdpbmFsLm1hdGNoKC9ecmdiYVxcKFxccyooLispXFxzKixcXHMqKC4rKVxccyosXFxzKiguKylcXHMqXFwsXFxzKiguKylcXHMqXFwpLyk7XG4gICAgICAgICAgICBpZiAodGVzdCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICAgIHI6IHBhcnNlRmxvYXQodGVzdFsxXSksXG4gICAgICAgICAgICAgIGc6IHBhcnNlRmxvYXQodGVzdFsyXSksXG4gICAgICAgICAgICAgIGI6IHBhcnNlRmxvYXQodGVzdFszXSksXG4gICAgICAgICAgICAgIGE6IHBhcnNlRmxvYXQodGVzdFs0XSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IHRvU3RyaW5nXG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgLy8gTnVtYmVyc1xuICAgIHtcblxuICAgICAgbGl0bXVzOiBjb21tb24uaXNOdW1iZXIsXG5cbiAgICAgIGNvbnZlcnNpb25zOiB7XG5cbiAgICAgICAgSEVYOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnSEVYJyxcbiAgICAgICAgICAgICAgaGV4OiBvcmlnaW5hbCxcbiAgICAgICAgICAgICAgY29udmVyc2lvbk5hbWU6ICdIRVgnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIGNvbG9yLmhleDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8vIEFycmF5c1xuICAgIHtcblxuICAgICAgbGl0bXVzOiBjb21tb24uaXNBcnJheSxcblxuICAgICAgY29udmVyc2lvbnM6IHtcblxuICAgICAgICBSR0JfQVJSQVk6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgaWYgKG9yaWdpbmFsLmxlbmd0aCAhPSAzKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICAgIHI6IG9yaWdpbmFsWzBdLFxuICAgICAgICAgICAgICBnOiBvcmlnaW5hbFsxXSxcbiAgICAgICAgICAgICAgYjogb3JpZ2luYWxbMl1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIFtjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBSR0JBX0FSUkFZOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChvcmlnaW5hbC5sZW5ndGggIT0gNCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICByOiBvcmlnaW5hbFswXSxcbiAgICAgICAgICAgICAgZzogb3JpZ2luYWxbMV0sXG4gICAgICAgICAgICAgIGI6IG9yaWdpbmFsWzJdLFxuICAgICAgICAgICAgICBhOiBvcmlnaW5hbFszXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gW2NvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmIsIGNvbG9yLmFdO1xuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvLyBPYmplY3RzXG4gICAge1xuXG4gICAgICBsaXRtdXM6IGNvbW1vbi5pc09iamVjdCxcblxuICAgICAgY29udmVyc2lvbnM6IHtcblxuICAgICAgICBSR0JBX09CSjoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnIpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmcpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmIpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmEpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICAgIHI6IG9yaWdpbmFsLnIsXG4gICAgICAgICAgICAgICAgZzogb3JpZ2luYWwuZyxcbiAgICAgICAgICAgICAgICBiOiBvcmlnaW5hbC5iLFxuICAgICAgICAgICAgICAgIGE6IG9yaWdpbmFsLmFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHI6IGNvbG9yLnIsXG4gICAgICAgICAgICAgIGc6IGNvbG9yLmcsXG4gICAgICAgICAgICAgIGI6IGNvbG9yLmIsXG4gICAgICAgICAgICAgIGE6IGNvbG9yLmFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgUkdCX09CSjoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnIpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmcpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmIpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICAgIHI6IG9yaWdpbmFsLnIsXG4gICAgICAgICAgICAgICAgZzogb3JpZ2luYWwuZyxcbiAgICAgICAgICAgICAgICBiOiBvcmlnaW5hbC5iXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICByOiBjb2xvci5yLFxuICAgICAgICAgICAgICBnOiBjb2xvci5nLFxuICAgICAgICAgICAgICBiOiBjb2xvci5iXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIEhTVkFfT0JKOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuaCkgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwucykgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwudikgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuYSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzcGFjZTogJ0hTVicsXG4gICAgICAgICAgICAgICAgaDogb3JpZ2luYWwuaCxcbiAgICAgICAgICAgICAgICBzOiBvcmlnaW5hbC5zLFxuICAgICAgICAgICAgICAgIHY6IG9yaWdpbmFsLnYsXG4gICAgICAgICAgICAgICAgYTogb3JpZ2luYWwuYVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgaDogY29sb3IuaCxcbiAgICAgICAgICAgICAgczogY29sb3IucyxcbiAgICAgICAgICAgICAgdjogY29sb3IudixcbiAgICAgICAgICAgICAgYTogY29sb3IuYVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBIU1ZfT0JKOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuaCkgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwucykgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwudikpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzcGFjZTogJ0hTVicsXG4gICAgICAgICAgICAgICAgaDogb3JpZ2luYWwuaCxcbiAgICAgICAgICAgICAgICBzOiBvcmlnaW5hbC5zLFxuICAgICAgICAgICAgICAgIHY6IG9yaWdpbmFsLnZcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGg6IGNvbG9yLmgsXG4gICAgICAgICAgICAgIHM6IGNvbG9yLnMsXG4gICAgICAgICAgICAgIHY6IGNvbG9yLnZcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9XG5cblxuICBdO1xuXG4gIHJldHVybiBpbnRlcnByZXQ7XG5cblxufSkoZGF0LmNvbG9yLnRvU3RyaW5nLFxuZGF0LnV0aWxzLmNvbW1vbiksXG5kYXQuY29sb3IubWF0aCA9IChmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIHRtcENvbXBvbmVudDtcblxuICByZXR1cm4ge1xuXG4gICAgaHN2X3RvX3JnYjogZnVuY3Rpb24oaCwgcywgdikge1xuXG4gICAgICB2YXIgaGkgPSBNYXRoLmZsb29yKGggLyA2MCkgJSA2O1xuXG4gICAgICB2YXIgZiA9IGggLyA2MCAtIE1hdGguZmxvb3IoaCAvIDYwKTtcbiAgICAgIHZhciBwID0gdiAqICgxLjAgLSBzKTtcbiAgICAgIHZhciBxID0gdiAqICgxLjAgLSAoZiAqIHMpKTtcbiAgICAgIHZhciB0ID0gdiAqICgxLjAgLSAoKDEuMCAtIGYpICogcykpO1xuICAgICAgdmFyIGMgPSBbXG4gICAgICAgIFt2LCB0LCBwXSxcbiAgICAgICAgW3EsIHYsIHBdLFxuICAgICAgICBbcCwgdiwgdF0sXG4gICAgICAgIFtwLCBxLCB2XSxcbiAgICAgICAgW3QsIHAsIHZdLFxuICAgICAgICBbdiwgcCwgcV1cbiAgICAgIF1baGldO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICByOiBjWzBdICogMjU1LFxuICAgICAgICBnOiBjWzFdICogMjU1LFxuICAgICAgICBiOiBjWzJdICogMjU1XG4gICAgICB9O1xuXG4gICAgfSxcblxuICAgIHJnYl90b19oc3Y6IGZ1bmN0aW9uKHIsIGcsIGIpIHtcblxuICAgICAgdmFyIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpLFxuICAgICAgICAgIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpLFxuICAgICAgICAgIGRlbHRhID0gbWF4IC0gbWluLFxuICAgICAgICAgIGgsIHM7XG5cbiAgICAgIGlmIChtYXggIT0gMCkge1xuICAgICAgICBzID0gZGVsdGEgLyBtYXg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGg6IE5hTixcbiAgICAgICAgICBzOiAwLFxuICAgICAgICAgIHY6IDBcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKHIgPT0gbWF4KSB7XG4gICAgICAgIGggPSAoZyAtIGIpIC8gZGVsdGE7XG4gICAgICB9IGVsc2UgaWYgKGcgPT0gbWF4KSB7XG4gICAgICAgIGggPSAyICsgKGIgLSByKSAvIGRlbHRhO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaCA9IDQgKyAociAtIGcpIC8gZGVsdGE7XG4gICAgICB9XG4gICAgICBoIC89IDY7XG4gICAgICBpZiAoaCA8IDApIHtcbiAgICAgICAgaCArPSAxO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBoOiBoICogMzYwLFxuICAgICAgICBzOiBzLFxuICAgICAgICB2OiBtYXggLyAyNTVcbiAgICAgIH07XG4gICAgfSxcblxuICAgIHJnYl90b19oZXg6IGZ1bmN0aW9uKHIsIGcsIGIpIHtcbiAgICAgIHZhciBoZXggPSB0aGlzLmhleF93aXRoX2NvbXBvbmVudCgwLCAyLCByKTtcbiAgICAgIGhleCA9IHRoaXMuaGV4X3dpdGhfY29tcG9uZW50KGhleCwgMSwgZyk7XG4gICAgICBoZXggPSB0aGlzLmhleF93aXRoX2NvbXBvbmVudChoZXgsIDAsIGIpO1xuICAgICAgcmV0dXJuIGhleDtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50X2Zyb21faGV4OiBmdW5jdGlvbihoZXgsIGNvbXBvbmVudEluZGV4KSB7XG4gICAgICByZXR1cm4gKGhleCA+PiAoY29tcG9uZW50SW5kZXggKiA4KSkgJiAweEZGO1xuICAgIH0sXG5cbiAgICBoZXhfd2l0aF9jb21wb25lbnQ6IGZ1bmN0aW9uKGhleCwgY29tcG9uZW50SW5kZXgsIHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUgPDwgKHRtcENvbXBvbmVudCA9IGNvbXBvbmVudEluZGV4ICogOCkgfCAoaGV4ICYgfiAoMHhGRiA8PCB0bXBDb21wb25lbnQpKTtcbiAgICB9XG5cbiAgfVxuXG59KSgpLFxuZGF0LmNvbG9yLnRvU3RyaW5nLFxuZGF0LnV0aWxzLmNvbW1vbik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3ZlbmRvci9kYXQuZ3VpJylcbm1vZHVsZS5leHBvcnRzLmNvbG9yID0gcmVxdWlyZSgnLi92ZW5kb3IvZGF0LmNvbG9yJykiLCJpbXBvcnQge1xuICBGcm9udFNpZGUsXG4gIEJhY2tTaWRlLFxuICBEb3VibGVTaWRlLFxuXG4gIFNtb290aFNoYWRpbmcsXG4gIEZsYXRTaGFkaW5nLFxuXG4gIE5vQmxlbmRpbmcsXG4gIE5vcm1hbEJsZW5kaW5nLFxuICBBZGRpdGl2ZUJsZW5kaW5nLFxuICBTdWJ0cmFjdGl2ZUJsZW5kaW5nLFxuICBNdWx0aXBseUJsZW5kaW5nLFxuICBDdXN0b21CbGVuZGluZyxcblxuICBOZXZlckRlcHRoLFxuICBBbHdheXNEZXB0aCxcbiAgTGVzc0RlcHRoLFxuICBMZXNzRXF1YWxEZXB0aCxcbiAgR3JlYXRlckVxdWFsRGVwdGgsXG4gIEdyZWF0ZXJEZXB0aCxcbiAgTm90RXF1YWxEZXB0aFxufSBmcm9tICd0aHJlZSc7XG5cbmNvbnN0IGFkZGl0aW9uYWwgPSB7XG4gIHdpcmVmcmFtZToge1xuICAgIHdpcmVmcmFtZTogJ2Jvb2xlYW4nLFxuICAgIHdpcmVmcmFtZUxpbmVjYXA6IFsnYnV0dCcsICdyb3VuZCcsICdzcXVhcmUnXSxcbiAgICB3aXJlZnJhbWVMaW5lam9pbjogWydyb3VuZCcsICdiZXZlbCcsICdtaXRlciddLFxuICAgIHdpcmVmcmFtZUxpbmV3aWR0aDogJ251bWJlcidcbiAgfSxcblxuICByZWZyOiB7XG4gICAgcmVmbGVjdGl2aXR5OiAnbnVtYmVyJyxcbiAgICByZWZyYWN0aW9uUmF0aW86ICdudW1iZXInXG4gIH0sXG5cbiAgbWFwczoge1xuICAgIG1hcDogJ3RleHR1cmUnLFxuICAgIGFscGhhTWFwOiAndGV4dHVyZScsXG4gICAgZW52TWFwOiAndGV4dHVyZScsXG4gICAgbGlnaHRNYXA6ICd0ZXh0dXJlJyxcbiAgICBsaWdodE1hcEludGVuc2l0eTogJ251bWJlcidcbiAgfSxcblxuICBub3JtYWw6IHtcbiAgICBub3JtYWxNYXA6ICd0ZXh0dXJlJyxcbiAgICBub3JtYWxTY2FsZTogJ251bWJlcidcbiAgfSxcblxuICBkaXNwbGFjZW1lbnQ6IHtcbiAgICBkaXNwbGFjZW1lbnRTY2FsZTogJ251bWJlcicsXG4gICAgZGlzcGxhY2VtZW50QmlhczogJ251bWJlcicsXG4gICAgZGlzcGxhY2VtZW50TWFwOiAndGV4dHVyZSdcbiAgfSxcblxuICBlbWlzc2l2ZToge1xuICAgIGVtaXNzaXZlOiAnY29sb3InLFxuICAgIGVtaXNzaXZlTWFwOiAndGV4dHVyZScsXG4gICAgZW1pc3NpdmVJbnRlbnNpdHk6ICdudW1iZXInXG4gIH0sXG5cbiAgc3BlY3VsYXI6IHtcbiAgICBzcGVjdWxhcjogJ2NvbG9yJyxcbiAgICBzcGVjdWxhck1hcDogJ3RleHR1cmUnXG4gIH0sXG5cbiAgYW86IHtcbiAgICBhb01hcDogJ3RleHR1cmUnLFxuICAgIGFvTWFwSW50ZW5zaXR5OiAnbnVtYmVyJ1xuICB9XG59XG5cbmNvbnN0IGFkZCA9IChvcmlnaW4sIC4uLmFkZHYpID0+IHtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24ob3JpZ2luLCAuLi5hZGR2Lm1hcCh2YWx1ZSA9PiBhZGRpdGlvbmFsW3ZhbHVlXSkpXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYW55OiBhZGQoe1xuICAgIHNpZGU6IHtGcm9udFNpZGUsIEJhY2tTaWRlLCBEb3VibGVTaWRlfSxcbiAgICBzaGFkaW5nOiB7U21vb3RoU2hhZGluZywgRmxhdFNoYWRpbmd9LFxuICAgIGJsZW5kaW5nOiB7XG4gICAgICBOb0JsZW5kaW5nLCBOb3JtYWxCbGVuZGluZywgQWRkaXRpdmVCbGVuZGluZywgU3VidHJhY3RpdmVCbGVuZGluZywgTXVsdGlwbHlCbGVuZGluZywgQ3VzdG9tQmxlbmRpbmdcbiAgICB9LFxuICAgIGRlcHRoRnVuYzoge1xuICAgICAgTmV2ZXJEZXB0aCwgQWx3YXlzRGVwdGgsIExlc3NEZXB0aCwgTGVzc0VxdWFsRGVwdGgsIEdyZWF0ZXJFcXVhbERlcHRoLCBHcmVhdGVyRGVwdGgsIE5vdEVxdWFsRGVwdGhcbiAgICB9XG4gIH0sICd3aXJlZnJhbWUnKSxcblxuICBNZXNoQmFzaWNNYXRlcmlhbDoge1xuICAgIGNvbG9yOiAnY29sb3InLFxuICAgIGxpZ2h0czogJ2Jvb2xlYW4nLFxuICAgIGxpbmV3aWR0aDogJ251bWJlcicsXG4gICAgbGluZWNhcDogWydidXR0JywgJ3JvdW5kJywgJ3NxdWFyZSddLFxuICAgIGxpbmVqb2luOiBbJ3JvdW5kJywgJ2JldmVsJywgJ21pdGVyJ11cbiAgfSxcblxuICBNZXNoTGFtYmVydE1hdGVyaWFsOiBhZGQoe1xuICAgIGNvbG9yOiAnY29sb3InLFxuICAgIHNraW5uaW5nOiAnYm9vbGVhbicsXG4gICAgbW9ycGhUYXJnZXRzOiAnYm9vbGVhbicsXG4gICAgbW9ycGhOb3JtYWxzOiAnYm9vbGVhbidcbiAgfSwgJ2VtaXNzaXZlJywgJ3JlZnInLCAnbWFwcycsICdub3JtYWwnLCAnc3BlY3VsYXInLCAnYW8nKSxcblxuICBNZXNoUGhvbmdNYXRlcmlhbDogYWRkKHtcbiAgICBjb2xvcjogJ2NvbG9yJyxcbiAgICBza2lubmluZzogJ2Jvb2xlYW4nLFxuICAgIG1vcnBoVGFyZ2V0czogJ2Jvb2xlYW4nLFxuICAgIG1vcnBoTm9ybWFsczogJ2Jvb2xlYW4nXG4gIH0sICdkaXNwbGFjZW1lbnQnLCAnZW1pc3NpdmUnLCAnbWFwcycsICdyZWZyJywgJ3NwZWN1bGFyJywgJ2FvJyksXG5cbiAgTWVzaERlcHRoTWF0ZXJpYWw6IHtcblxuICB9XG4gIC8vIFRvIGJlIGNvbnRpbnVlZC4uLlxufVxuIiwiZXhwb3J0IGNsYXNzIERhdEFQSSB7XG4gIGZvbGRPYmplY3Qob2JqZWN0LCBvcmlnaW4sIGluc3RhbmNlID0gdGhpcy5mb2xkLCBvbkNoYW5nZSA9ICgpID0+IHt9KSB7XG4gICAgZm9yIChsZXQga2V5IGluIG9yaWdpbikge1xuICAgICAgY29uc3QgdmFsdWUgPSBvYmplY3Rba2V5XTtcbiAgICAgIGlmICghdmFsdWUpIGNvbnRpbnVlO1xuXG4gICAgICBpZiAodmFsdWUuaXNDb2xvcikge1xuICAgICAgICB0aGlzLmFkZENvbG9yKG9iamVjdCwga2V5LCBpbnN0YW5jZSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcmlnaW5ba2V5XSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKG9iamVjdFtrZXldID09PSBvYmplY3QpIGNvbnRpbnVlO1xuICAgICAgICB0aGlzLmZvbGRPYmplY3Qob2JqZWN0W2tleV0sIG9yaWdpbltrZXldLCBpbnN0YW5jZS5hZGRGb2xkZXIoa2V5KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBsZXQgcmFuZ2UgPSAnMScgKyAnMCcucmVwZWF0KHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoKTtcbiAgICAgICAgLy8gaWYgKHZhbHVlLnRvU3RyaW5nKCkuaW5kZXhPZignLicpICE9PSAtMSkgcmFuZ2UgPSAxO1xuXG4gICAgICAgIGluc3RhbmNlLmFkZChvYmplY3QsIGtleSlcbiAgICAgICAgICAubWluKDApXG4gICAgICAgICAgLnN0ZXAoMC4wMDEpXG4gICAgICAgICAgLm9uQ2hhbmdlKG9uQ2hhbmdlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBndWlUcmFuc2Zvcm1zKG5hdGl2ZSwgaW5zdGFuY2UgPSB0aGlzLmZvbGQpIHtcbiAgICBpZiAoIXRoaXMucGFyYW1zLnRyYW5zZm9ybXMpIHJldHVybjtcblxuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBpbnN0YW5jZS5hZGRGb2xkZXIoJ3RyYW5zZm9ybXMnKTtcblxuICAgIC8vIHBvc2l0aW9uXG4gICAgY29uc3QgcG9zaXRpb24gPSBjb250cm9sbGVyLmFkZEZvbGRlcigncG9zaXRpb24nKTtcbiAgICBwb3NpdGlvbi5hZGQobmF0aXZlLnBvc2l0aW9uLCAneCcpO1xuICAgIHBvc2l0aW9uLmFkZChuYXRpdmUucG9zaXRpb24sICd5Jyk7XG4gICAgcG9zaXRpb24uYWRkKG5hdGl2ZS5wb3NpdGlvbiwgJ3onKTtcblxuICAgIC8vIHJvdGF0aW9uXG4gICAgY29uc3Qgcm90YXRpb24gPSBjb250cm9sbGVyLmFkZEZvbGRlcigncm90YXRpb24nKTtcbiAgICByb3RhdGlvbi5hZGQobmF0aXZlLnJvdGF0aW9uLCAneCcpLnN0ZXAoMC4xKTtcbiAgICByb3RhdGlvbi5hZGQobmF0aXZlLnJvdGF0aW9uLCAneScpLnN0ZXAoMC4xKTtcbiAgICByb3RhdGlvbi5hZGQobmF0aXZlLnJvdGF0aW9uLCAneicpLnN0ZXAoMC4xKTtcblxuICAgIC8vIHNjYWxlXG4gICAgaWYgKCFuYXRpdmUuc2NhbGUpIHJldHVybjtcbiAgICBjb25zdCBzY2FsZSA9IGNvbnRyb2xsZXIuYWRkRm9sZGVyKCdzY2FsZScpO1xuICAgIHNjYWxlLmFkZChuYXRpdmUuc2NhbGUsICd4Jykuc3RlcCgwLjEpO1xuICAgIHNjYWxlLmFkZChuYXRpdmUuc2NhbGUsICd5Jykuc3RlcCgwLjEpO1xuICAgIHNjYWxlLmFkZChuYXRpdmUuc2NhbGUsICd6Jykuc3RlcCgwLjEpO1xuICB9XG59XG4iLCJpbXBvcnQgbWF0ZXJpYWxzIGZyb20gJy4vbWF0ZXJpYWxzJztcbmltcG9ydCB7RGF0QVBJfSBmcm9tICcuL0RhdEFQSSc7XG5cbmV4cG9ydCBjbGFzcyBEYXRNZXNoTW9kdWxlIGV4dGVuZHMgRGF0QVBJIHtcbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30sIGd1aSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgbmFtZTogJ1Vua25vd24gbWVzaCcsXG4gICAgICBnZW9tZXRyeTogdHJ1ZSxcbiAgICAgIG1hdGVyaWFsOiB0cnVlLFxuICAgICAgdHJhbnNmb3JtczogdHJ1ZSxcbiAgICAgIGd1aTogZmFsc2VcbiAgICB9LCBwYXJhbXMpO1xuXG4gICAgdGhpcy5ndWkgPSBndWk7XG4gICAgdGhpcy5mb2xkID0gdGhpcy5ndWkuYWRkRm9sZGVyKHRoaXMucGFyYW1zLm5hbWUpO1xuICAgIHRoaXMuY3VzdG9tTWF0ZXJpYWxzID0gZmFsc2U7XG4gIH1cblxuICBhZGRDb2xvcihvYmplY3QsIHByb3BlcnR5LCBpbnN0YW5jZSA9IHRoaXMuZm9sZCkge1xuICAgIGNvbnN0IGNvbG9yID0gb2JqZWN0W3Byb3BlcnR5XTtcblxuICAgIGluc3RhbmNlLmFkZENvbG9yKHtbcHJvcGVydHldOiBjb2xvci5nZXRIZXgoKX0sIHByb3BlcnR5KS5vbkNoYW5nZSh2YWx1ZSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykgdmFsdWUucmVwbGFjZSgnIycsICcweCcpO1xuICAgICAgY29sb3Iuc2V0SGV4KHZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGd1aU1hdGVyaWFsKGNvbXBvbmVudCwgbWF0ZXJpYWwsIGluc3RhbmNlID0gdGhpcy5mb2xkKSB7XG4gICAgY29uc3QgcGFyYW1zUHJvY2Vzc29yID0gcGFyYW1zID0+IHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIHBhcmFtcykge1xuICAgICAgICBpZiAocGFyYW1zW2tleV0gJiYgbWF0ZXJpYWxba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgc3dpdGNoIChwYXJhbXNba2V5XSkge1xuICAgICAgICAgICAgY2FzZSAnY29sb3InOlxuICAgICAgICAgICAgICB0aGlzLmFkZENvbG9yKG1hdGVyaWFsLCBrZXksIGluc3RhbmNlKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgICAgaW5zdGFuY2UuYWRkKG1hdGVyaWFsLCBrZXkpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICAgIGluc3RhbmNlLmFkZChtYXRlcmlhbCwga2V5KTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd0ZXh0dXJlJzpcbiAgICAgICAgICAgICAgLy8gVE9ET1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGluc3RhbmNlLmFkZChtYXRlcmlhbCwga2V5LCBwYXJhbXNba2V5XSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHBhcmFtc1Byb2Nlc3NvcihtYXRlcmlhbHNbbWF0ZXJpYWwudHlwZV0pO1xuICAgIHBhcmFtc1Byb2Nlc3NvcihtYXRlcmlhbHMuYW55KTtcbiAgfVxuXG4gIGd1aUdlb21ldHJ5KGNvbXBvbmVudCwgaW5zdGFuY2UgPSB0aGlzLmZvbGQpIHtcbiAgICBpZiAoIWNvbXBvbmVudC5nXykgdGhyb3cgbmV3IEVycm9yKCdEYXRHVUlNb2R1bGUgcmVxdWlyZXMgV0hTLkR5bmFtaWNHZW9tZXRyeU1vZHVsZSBmb3IgZ2VvbWV0cnkgdXBkYXRlcy4nKTtcblxuICAgIGNvbnN0IGdlb21QYXJhbXMgPSBjb21wb25lbnQucGFyYW1zLmdlb21ldHJ5O1xuICAgIGNvbnN0IGdlb21EYXRhID0gdGhpcy5wYXJhbXMuZ2VvbWV0cnk7XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBnZW9tUGFyYW1zKSB7XG4gICAgICBjb25zdCBkYXRhID0gZ2VvbURhdGFba2V5XTtcblxuICAgICAgY29uc3QgcmFuZ2UgPSBkYXRhICYmIGRhdGEucmFuZ2UgPyBkYXRhLnJhbmdlIDogWzAsIDEwMF07XG5cbiAgICAgIGluc3RhbmNlLmFkZChnZW9tUGFyYW1zLCBrZXkpXG4gICAgICAgIC5taW4ocmFuZ2VbMF0pXG4gICAgICAgIC5tYXgocmFuZ2VbMV0pXG4gICAgICAgIC5zdGVwKGtleS5pbmRleE9mKCdTZWdtZW50cycpID4gMCA/IDEgOiAwLjEpXG4gICAgICAgIC5vbkNoYW5nZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50LmdfKHtba2V5XTogdmFsdWV9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbWF0ZXJpYWxzKG1hdGVyaWFscyA9IHt9KSB7XG4gICAgdGhpcy5jdXN0b21NYXRlcmlhbHMgPSBtYXRlcmlhbHM7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGJyaWRnZSA9IHtcbiAgICBtYXRlcmlhbChtYXRlcmlhbCwgc2VsZikge1xuICAgICAgaWYgKCFzZWxmLnBhcmFtcy5tYXRlcmlhbCkgcmV0dXJuIG1hdGVyaWFsO1xuXG4gICAgICBjb25zdCBmb2xkZXIgPSBzZWxmLmZvbGQuYWRkRm9sZGVyKCdtYXRlcmlhbCcpO1xuICAgICAgc2VsZi5ndWlNYXRlcmlhbCh0aGlzLCBtYXRlcmlhbCwgZm9sZGVyKTtcblxuICAgICAgcmV0dXJuIG1hdGVyaWFsO1xuICAgIH0sXG5cbiAgICBnZW9tZXRyeShnZW9tZXRyeSwgc2VsZikge1xuICAgICAgaWYgKCFzZWxmLnBhcmFtcy5nZW9tZXRyeSkgcmV0dXJuIGdlb21ldHJ5O1xuICAgICAgaWYgKCF0aGlzLmdfKSB0aHJvdyBuZXcgRXJyb3IoJ1dIUy5EeW5hbWljR2VvbWV0cnlNb2R1bGUgc2hvdWxkIGJlIHVzZWQgaW4gYSBjb21wb25lbnQgKGJlZm9yZSBndWkpJyk7XG5cbiAgICAgIGNvbnN0IGZvbGRlciA9IHNlbGYuZm9sZC5hZGRGb2xkZXIoJ2dlb21ldHJ5Jyk7XG4gICAgICBzZWxmLmd1aUdlb21ldHJ5KHRoaXMsIGZvbGRlcik7XG5cbiAgICAgIHJldHVybiBnZW9tZXRyeTtcbiAgICB9LFxuXG4gICAgbWVzaChtZXNoLCBzZWxmKSB7XG4gICAgICBpZiAoIXNlbGYuY3VzdG9tTWF0ZXJpYWxzKSByZXR1cm4gbWVzaDtcblxuICAgICAgc2VsZi5jdXN0b21NYXRlcmlhbHMuY3VycmVudCA9IG1lc2gubWF0ZXJpYWw7XG5cbiAgICAgIC8vIGNvbnN0IG1hdEFsaWFzID0ge21hdGVyaWFsOiAnY3VycmVudCd9O1xuICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHNlbGYuY3VzdG9tTWF0ZXJpYWxzKTtcbiAgICAgIGNvbnN0IGZvbGRlciA9IHNlbGYuZm9sZDtcblxuICAgICAgZm9sZGVyLmFkZCh7dHlwZTogJ2N1cnJlbnQnfSwgJ3R5cGUnLCBrZXlzKS5vbkNoYW5nZSh2ID0+IHtcbiAgICAgICAgbWVzaC5tYXRlcmlhbCA9IHNlbGYuY3VzdG9tTWF0ZXJpYWxzW3ZdO1xuICAgICAgICBmb2xkZXIucmVtb3ZlRm9sZGVyKCdtYXRlcmlhbCcpO1xuICAgICAgICBzZWxmLmd1aU1hdGVyaWFsKHRoaXMsIG1lc2gubWF0ZXJpYWwsIGZvbGRlci5hZGRGb2xkZXIoJ21hdGVyaWFsJykpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBtZXNoO1xuICAgIH0sXG5cbiAgICBvbldyYXAoYSwgc2VsZikge1xuICAgICAgc2VsZi5ndWlUcmFuc2Zvcm1zKHRoaXMubmF0aXZlLCBzZWxmLmZvbGQpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtEYXRBUEl9IGZyb20gJy4vRGF0QVBJJztcblxuZXhwb3J0IGNsYXNzIERhdExpZ2h0TW9kdWxlIGV4dGVuZHMgRGF0QVBJIHtcbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30sIGd1aSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgbmFtZTogJ1Vua25vd24gbGlnaHQnLFxuICAgICAgbGlnaHQ6IHRydWUsXG4gICAgICBzaGFkb3c6IHRydWUsXG4gICAgICB0cmFuc2Zvcm1zOiB0cnVlLFxuICAgICAgZ3VpOiBmYWxzZVxuICAgIH0sIHBhcmFtcyk7XG5cbiAgICB0aGlzLmd1aSA9IGd1aTtcbiAgICB0aGlzLmZvbGQgPSB0aGlzLmd1aS5hZGRGb2xkZXIodGhpcy5wYXJhbXMubmFtZSk7XG4gIH1cblxuICBhZGRDb2xvcihvYmplY3QsIHByb3BlcnR5LCBpbnN0YW5jZSA9IHRoaXMuZm9sZCkge1xuICAgIGNvbnN0IGNvbG9yID0gb2JqZWN0W3Byb3BlcnR5XTtcblxuICAgIGluc3RhbmNlLmFkZENvbG9yKHtbcHJvcGVydHldOiBjb2xvci5nZXRIZXgoKX0sIHByb3BlcnR5KS5vbkNoYW5nZSh2YWx1ZSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykgdmFsdWUucmVwbGFjZSgnIycsICcweCcpO1xuICAgICAgY29sb3Iuc2V0SGV4KHZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGJyaWRnZSA9IHtcbiAgICBsaWdodChsaWdodCwgc2VsZikge1xuICAgICAgaWYgKCFzZWxmLnBhcmFtcy5saWdodCkgcmV0dXJuIGxpZ2h0O1xuXG4gICAgICBjb25zdCBsaWdodFBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucGFyYW1zKTtcbiAgICAgIGRlbGV0ZSBsaWdodFBhcmFtcy5wb3NpdGlvbjtcbiAgICAgIGRlbGV0ZSBsaWdodFBhcmFtcy5yb3RhdGlvbjtcbiAgICAgIGRlbGV0ZSBsaWdodFBhcmFtcy5zaGFkb3c7XG5cbiAgICAgIHNlbGYuZm9sZE9iamVjdChsaWdodCwgbGlnaHRQYXJhbXMsIHNlbGYuZm9sZC5hZGRGb2xkZXIoJ2xpZ2h0JykpO1xuXG4gICAgICBpZiAobGlnaHQuc2hhZG93KSB7XG4gICAgICAgIGNvbnN0IHNoYWRvd0ZvbGRlciA9IHNlbGYuZm9sZC5hZGRGb2xkZXIoJ3NoYWRvdycpO1xuICAgICAgICBzZWxmLmZvbGRPYmplY3QobGlnaHQuc2hhZG93LCB0aGlzLnBhcmFtcy5zaGFkb3csIHNoYWRvd0ZvbGRlcik7XG5cbiAgICAgICAgY29uc29sZS5sb2cobGlnaHQpO1xuXG4gICAgICAgIHNoYWRvd0ZvbGRlci5hZGQobGlnaHQsICdjYXN0U2hhZG93Jyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBsaWdodDtcbiAgICB9LFxuXG4gICAgb25XcmFwKGEsIHNlbGYpIHtcbiAgICAgIHNlbGYuZ3VpVHJhbnNmb3Jtcyh0aGlzLm5hdGl2ZSwgc2VsZi5mb2xkKTtcbiAgICB9XG4gIH1cbn07XG4iLCJpbXBvcnQge0RhdEFQSX0gZnJvbSAnLi9EYXRBUEknO1xuXG5leHBvcnQgY2xhc3MgRGF0Q2FtZXJhTW9kdWxlIGV4dGVuZHMgRGF0QVBJIHtcbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30sIGd1aSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgbmFtZTogJ1Vua25vd24gY2FtZXJhJyxcbiAgICAgIHRyYW5zZm9ybXM6IHRydWUsXG4gICAgICBjYW1lcmE6IHRydWVcbiAgICB9LCBwYXJhbXMpO1xuXG4gICAgdGhpcy5ndWkgPSBndWk7XG4gICAgdGhpcy5mb2xkID0gdGhpcy5ndWkuYWRkRm9sZGVyKHRoaXMucGFyYW1zLm5hbWUpO1xuICB9XG5cbiAgYnJpZGdlID0ge1xuICAgIGNhbWVyYShjYW1lcmEsIHNlbGYpIHtcbiAgICAgIGlmICghc2VsZi5wYXJhbXMuY2FtZXJhKSByZXR1cm4gY2FtZXJhO1xuICAgICAgc2VsZi5mb2xkT2JqZWN0KGNhbWVyYSwgdGhpcy5wYXJhbXMsIHNlbGYuZm9sZCwgKCkgPT4ge1xuICAgICAgICBjYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBjYW1lcmE7XG4gICAgfSxcblxuICAgIG9uV3JhcChhLCBzZWxmKSB7XG4gICAgICBzZWxmLmd1aVRyYW5zZm9ybXModGhpcy5uYXRpdmUsIHNlbGYuZm9sZCk7XG4gICAgfVxuICB9XG59O1xuIiwiZXhwb3J0IGNsYXNzIERhdEN1c3RvbU1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHByb3BzID0gW10sIGd1aSkge1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICB0aGlzLmd1aSA9IGd1aTtcblxuICAgIHByb3BzLmZvckVhY2godGhpcy5hZGQuYmluZCh0aGlzKSk7XG4gIH1cblxuICBhZGQoe1xuICAgIG5hbWUsXG4gICAgdmFsdWUsXG4gICAgcmFuZ2UgPSBbZmFsc2UsIGZhbHNlXSxcbiAgICBzdGVwID0gMSxcbiAgICBvbkNoYW5nZSxcbiAgICBvbkZpbmlzaENoYW5nZSxcbiAgICBsaXN0ZW4gPSBmYWxzZVxuICB9KSB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IHRoaXMuZ3VpLmFkZCh7W25hbWVdOiB2YWx1ZX0sIG5hbWUsIHJhbmdlWzBdIHx8IDAsIHJhbmdlWzFdIHx8IDEpO1xuXG4gICAgY29udHJvbGxlci5vbkNoYW5nZShvbkNoYW5nZSk7XG4gICAgaWYgKG9uRmluaXNoQ2hhbmdlKSBjb250cm9sbGVyLm9uRmluaXNoQ2hhbmdlKG9uRmluaXNoQ2hhbmdlKTtcbiAgICBpZiAobGlzdGVuKSBjb250cm9sbGVyLmxpc3RlbigpO1xuXG4gICAgcmV0dXJuIGNvbnRyb2xsZXI7XG4gIH1cbn07XG4iLCJpbXBvcnQgZGF0IGZyb20gJ2RhdC1ndWknO1xuXG5pbXBvcnQge0RhdE1lc2hNb2R1bGV9IGZyb20gJy4vZGF0Z3VpL0RhdE1lc2hNb2R1bGUnO1xuaW1wb3J0IHtEYXRMaWdodE1vZHVsZX0gZnJvbSAnLi9kYXRndWkvRGF0TGlnaHRNb2R1bGUnO1xuaW1wb3J0IHtEYXRDYW1lcmFNb2R1bGV9IGZyb20gJy4vZGF0Z3VpL0RhdENhbWVyYU1vZHVsZSc7XG5pbXBvcnQge0RhdEN1c3RvbU1vZHVsZX0gZnJvbSAnLi9kYXRndWkvRGF0Q3VzdG9tTW9kdWxlJztcblxuLy8gUG9seWZpbGxcbmRhdC5HVUkucHJvdG90eXBlLnJlbW92ZUZvbGRlciA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgdmFyIGZvbGRlciA9IHRoaXMuX19mb2xkZXJzW25hbWVdO1xuICBpZiAoIWZvbGRlcikge1xuICAgIHJldHVybjtcbiAgfVxuICBmb2xkZXIuY2xvc2UoKTtcbiAgdGhpcy5fX3VsLnJlbW92ZUNoaWxkKGZvbGRlci5kb21FbGVtZW50LnBhcmVudE5vZGUpO1xuICBkZWxldGUgdGhpcy5fX2ZvbGRlcnNbbmFtZV07XG4gIHRoaXMub25SZXNpemUoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0R1VJTW9kdWxlIHtcbiAgc3RhdGljIG5ldyhwYXJhbXMpIHtcbiAgICByZXR1cm4gbmV3IERhdEdVSU1vZHVsZShuZXcgZGF0LkdVSShwYXJhbXMpKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGd1aSA9IG5ldyBkYXQuR1VJKHthdXRvUGxhY2U6IGZhbHNlfSkpIHtcbiAgICB0aGlzLmd1aSA9IGd1aTtcbiAgfVxuXG4gIG1hbmFnZXIobWFuYWdlcikge1xuICAgIG1hbmFnZXIuZGVmaW5lKCdndWkvZGF0Lmd1aScpO1xuICAgIGNvbnN0IGRvbSA9IHRoaXMuZ3VpLmRvbUVsZW1lbnQ7XG4gICAgY29uc3Qgc3R5bGUgPSBkb20uc3R5bGU7XG5cbiAgICBzdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgc3R5bGUudG9wID0gMDtcbiAgICBzdHlsZS5yaWdodCA9ICcyMHB4JztcblxuICAgIG1hbmFnZXIuZ2V0KCdlbGVtZW50JykuYXBwZW5kQ2hpbGQodGhpcy5ndWkuZG9tRWxlbWVudCk7XG4gIH1cblxuICBzZXQoZ3VpKSB7XG4gICAgdGhpcy5ndWkgPSBndWk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBmb2xkZXIobmFtZSA9ICdmb2xkZXInKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRHVUlNb2R1bGUodGhpcy5ndWkuYWRkRm9sZGVyKG5hbWUpKTtcbiAgfVxuXG4gIE1lc2gocGFyYW1zID0ge30sIGd1aSA9IHRoaXMuZ3VpKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRNZXNoTW9kdWxlKHBhcmFtcywgZ3VpKTtcbiAgfVxuXG4gIExpZ2h0KHBhcmFtcyA9IHt9LCBndWkgPSB0aGlzLmd1aSkge1xuICAgIHJldHVybiBuZXcgRGF0TGlnaHRNb2R1bGUocGFyYW1zLCBndWkpO1xuICB9XG5cbiAgQ2FtZXJhKHBhcmFtcyA9IHt9LCBndWkgPSB0aGlzLmd1aSkge1xuICAgIHJldHVybiBuZXcgRGF0Q2FtZXJhTW9kdWxlKHBhcmFtcywgZ3VpKTtcbiAgfVxuXG4gIEN1c3RvbShwYXJhbXMgPSB7fSwgZ3VpID0gdGhpcy5ndWkpIHtcbiAgICByZXR1cm4gbmV3IERhdEN1c3RvbU1vZHVsZShwYXJhbXMsIGd1aSk7XG4gIH1cbn1cblxuRGF0R1VJTW9kdWxlLmRhdCA9IGRhdDtcbiJdLCJuYW1lcyI6WyJyZXF1aXJlJCQwIiwicmVxdWlyZSQkMSIsImFkZGl0aW9uYWwiLCJhZGQiLCJvcmlnaW4iLCJhZGR2IiwiT2JqZWN0IiwiYXNzaWduIiwibWFwIiwidmFsdWUiLCJGcm9udFNpZGUiLCJCYWNrU2lkZSIsIkRvdWJsZVNpZGUiLCJTbW9vdGhTaGFkaW5nIiwiRmxhdFNoYWRpbmciLCJOb3JtYWxCbGVuZGluZyIsIkFkZGl0aXZlQmxlbmRpbmciLCJTdWJ0cmFjdGl2ZUJsZW5kaW5nIiwiTXVsdGlwbHlCbGVuZGluZyIsIkN1c3RvbUJsZW5kaW5nIiwiQWx3YXlzRGVwdGgiLCJMZXNzRGVwdGgiLCJMZXNzRXF1YWxEZXB0aCIsIkdyZWF0ZXJFcXVhbERlcHRoIiwiR3JlYXRlckRlcHRoIiwiTm90RXF1YWxEZXB0aCIsIkRhdEFQSSIsIm9iamVjdCIsImluc3RhbmNlIiwiZm9sZCIsIm9uQ2hhbmdlIiwia2V5IiwiaXNDb2xvciIsImFkZENvbG9yIiwiYmFiZWxIZWxwZXJzLnR5cGVvZiIsImZvbGRPYmplY3QiLCJhZGRGb2xkZXIiLCJtaW4iLCJzdGVwIiwibmF0aXZlIiwicGFyYW1zIiwidHJhbnNmb3JtcyIsImNvbnRyb2xsZXIiLCJwb3NpdGlvbiIsInJvdGF0aW9uIiwic2NhbGUiLCJEYXRNZXNoTW9kdWxlIiwiZ3VpIiwiYnJpZGdlIiwibWF0ZXJpYWwiLCJzZWxmIiwiZm9sZGVyIiwiZ3VpTWF0ZXJpYWwiLCJnZW9tZXRyeSIsImdfIiwiRXJyb3IiLCJndWlHZW9tZXRyeSIsIm1lc2giLCJjdXN0b21NYXRlcmlhbHMiLCJjdXJyZW50Iiwia2V5cyIsInR5cGUiLCJ2IiwicmVtb3ZlRm9sZGVyIiwiYSIsImd1aVRyYW5zZm9ybXMiLCJuYW1lIiwicHJvcGVydHkiLCJjb2xvciIsImdldEhleCIsInJlcGxhY2UiLCJzZXRIZXgiLCJjb21wb25lbnQiLCJwYXJhbXNQcm9jZXNzb3IiLCJ1bmRlZmluZWQiLCJtYXRlcmlhbHMiLCJhbnkiLCJnZW9tUGFyYW1zIiwiZ2VvbURhdGEiLCJkYXRhIiwicmFuZ2UiLCJtYXgiLCJpbmRleE9mIiwiRGF0TGlnaHRNb2R1bGUiLCJsaWdodCIsImxpZ2h0UGFyYW1zIiwic2hhZG93Iiwic2hhZG93Rm9sZGVyIiwibG9nIiwiRGF0Q2FtZXJhTW9kdWxlIiwiY2FtZXJhIiwidXBkYXRlUHJvamVjdGlvbk1hdHJpeCIsIkRhdEN1c3RvbU1vZHVsZSIsInByb3BzIiwiZm9yRWFjaCIsImJpbmQiLCJvbkZpbmlzaENoYW5nZSIsImxpc3RlbiIsImRhdCIsIkdVSSIsInByb3RvdHlwZSIsIl9fZm9sZGVycyIsImNsb3NlIiwiX191bCIsInJlbW92ZUNoaWxkIiwiZG9tRWxlbWVudCIsInBhcmVudE5vZGUiLCJvblJlc2l6ZSIsIkRhdEdVSU1vZHVsZSIsImF1dG9QbGFjZSIsIm1hbmFnZXIiLCJkZWZpbmUiLCJkb20iLCJzdHlsZSIsInRvcCIsInJpZ2h0IiwiZ2V0IiwiYXBwZW5kQ2hpbGQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFjQSxJQUFJLEdBQUcsR0FBRyxjQUFjLEdBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBQzs7O0FBR3JDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7OztBQUd4QixHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDOzs7QUFHNUIsR0FBRyxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQzs7O0FBR3hDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7OztBQUd4QixHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDOztBQUU1QixHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLFlBQVk7RUFDM0IsT0FBTztJQUNMLElBQUksRUFBRSxVQUFVLEdBQUcsRUFBRSxHQUFHLEVBQUU7TUFDeEIsR0FBRyxHQUFHLEdBQUcsSUFBSSxRQUFRLENBQUM7TUFDdEIsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztNQUNyQyxJQUFJLENB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QUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztJQUVoRCxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQzs7SUFFOUIsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzQyxLQUFLLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztJQUMzQixHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxjQUFjLENBQUMsQ0FBQzs7O0lBR3BDLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7SUFDMUIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDL0IsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7O0lBRTdCLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0MsT0FBTyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDMUIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7O0lBRWpDLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0MsT0FBTyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7SUFDN0IsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7O0lBRWhDLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENB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QUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO01BQ3BDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7TUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUM1QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQ3BDLElBQUksQ0FBQyxHQUFHO1FBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDVCxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDVCxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO09BQ1YsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7TUFFTixPQUFPO1FBQ0wsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHO1FBQ2IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHO1FBQ2IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHO09BQ2QsQ0FBQzs7S0FFSDs7SUFFRCxVQUFVLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTs7TUFFNUIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztVQUN2QixHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztV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
