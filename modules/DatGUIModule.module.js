/* Built for whs v1.0.0 */
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
        var folder = self.fold.addFolder('other materials');

        folder.add({ material: 'current' }, 'material', keys).onChange(function (v) {
          _mesh.material = self.customMaterials[v];
          folder.removeFolder('customize');
          self.guiMaterial(_this2, _mesh.material, folder.addFolder('customize'));
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
  }, {
    key: 'integrate',
    value: function integrate(self) {
      if (this.native) {
        self.bridge.material.bind(this)(this.native.material, self);
        self.bridge.geometry.bind(this)(this.native.geometry, self);
        self.bridge.onWrap.bind(this)(this.native, self);
      }
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

        self.foldObject(_light, this.params.light, self.fold.addFolder('light'));
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
  }, {
    key: 'integrate',
    value: function integrate(self) {
      if (this.native) {
        self.bridge.light.bind(this)(this.native, self);
        self.bridge.onWrap.bind(this)(this.native, self);
      }
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
        // console.log(this);
        if (!self.params.camera) return _camera;
        self.foldObject(_camera, this.params.camera, self.fold, function () {
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

  createClass(DatCameraModule, [{
    key: 'integrate',
    value: function integrate(self) {
      if (this.native) {
        self.bridge.camera.bind(this)(this.native, self);
        self.bridge.onWrap.bind(this)(this.native, self);
      }
    }
  }]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0R1VJTW9kdWxlLm1vZHVsZS5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL2RhdC1ndWkvdmVuZG9yL2RhdC5ndWkuanMiLCJub2RlX21vZHVsZXMvZGF0LWd1aS92ZW5kb3IvZGF0LmNvbG9yLmpzIiwibm9kZV9tb2R1bGVzL2RhdC1ndWkvaW5kZXguanMiLCJzcmMvZGF0Z3VpL21hdGVyaWFscy5qcyIsInNyYy9kYXRndWkvRGF0QVBJLmpzIiwic3JjL2RhdGd1aS9EYXRNZXNoTW9kdWxlLmpzIiwic3JjL2RhdGd1aS9EYXRMaWdodE1vZHVsZS5qcyIsInNyYy9kYXRndWkvRGF0Q2FtZXJhTW9kdWxlLmpzIiwic3JjL2RhdGd1aS9EYXRDdXN0b21Nb2R1bGUuanMiLCJzcmMvRGF0R1VJTW9kdWxlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogZGF0LWd1aSBKYXZhU2NyaXB0IENvbnRyb2xsZXIgTGlicmFyeVxuICogaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2RhdC1ndWlcbiAqXG4gKiBDb3B5cmlnaHQgMjAxMSBEYXRhIEFydHMgVGVhbSwgR29vZ2xlIENyZWF0aXZlIExhYlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqL1xuXG4vKiogQG5hbWVzcGFjZSAqL1xudmFyIGRhdCA9IG1vZHVsZS5leHBvcnRzID0gZGF0IHx8IHt9O1xuXG4vKiogQG5hbWVzcGFjZSAqL1xuZGF0Lmd1aSA9IGRhdC5ndWkgfHwge307XG5cbi8qKiBAbmFtZXNwYWNlICovXG5kYXQudXRpbHMgPSBkYXQudXRpbHMgfHwge307XG5cbi8qKiBAbmFtZXNwYWNlICovXG5kYXQuY29udHJvbGxlcnMgPSBkYXQuY29udHJvbGxlcnMgfHwge307XG5cbi8qKiBAbmFtZXNwYWNlICovXG5kYXQuZG9tID0gZGF0LmRvbSB8fCB7fTtcblxuLyoqIEBuYW1lc3BhY2UgKi9cbmRhdC5jb2xvciA9IGRhdC5jb2xvciB8fCB7fTtcblxuZGF0LnV0aWxzLmNzcyA9IChmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB7XG4gICAgbG9hZDogZnVuY3Rpb24gKHVybCwgZG9jKSB7XG4gICAgICBkb2MgPSBkb2MgfHwgZG9jdW1lbnQ7XG4gICAgICB2YXIgbGluayA9IGRvYy5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgICBsaW5rLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCc7XG4gICAgICBsaW5rLmhyZWYgPSB1cmw7XG4gICAgICBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICB9LFxuICAgIGluamVjdDogZnVuY3Rpb24oY3NzLCBkb2MpIHtcbiAgICAgIGRvYyA9IGRvYyB8fCBkb2N1bWVudDtcbiAgICAgIHZhciBpbmplY3RlZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICBpbmplY3RlZC50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgIGluamVjdGVkLmlubmVySFRNTCA9IGNzcztcbiAgICAgIGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKGluamVjdGVkKTtcbiAgICB9XG4gIH1cbn0pKCk7XG5cblxuZGF0LnV0aWxzLmNvbW1vbiA9IChmdW5jdGlvbiAoKSB7XG4gIFxuICB2YXIgQVJSX0VBQ0ggPSBBcnJheS5wcm90b3R5cGUuZm9yRWFjaDtcbiAgdmFyIEFSUl9TTElDRSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuICAvKipcbiAgICogQmFuZC1haWQgbWV0aG9kcyBmb3IgdGhpbmdzIHRoYXQgc2hvdWxkIGJlIGEgbG90IGVhc2llciBpbiBKYXZhU2NyaXB0LlxuICAgKiBJbXBsZW1lbnRhdGlvbiBhbmQgc3RydWN0dXJlIGluc3BpcmVkIGJ5IHVuZGVyc2NvcmUuanNcbiAgICogaHR0cDovL2RvY3VtZW50Y2xvdWQuZ2l0aHViLmNvbS91bmRlcnNjb3JlL1xuICAgKi9cblxuICByZXR1cm4geyBcbiAgICBcbiAgICBCUkVBSzoge30sXG4gIFxuICAgIGV4dGVuZDogZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICBcbiAgICAgIHRoaXMuZWFjaChBUlJfU0xJQ0UuY2FsbChhcmd1bWVudHMsIDEpLCBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopXG4gICAgICAgICAgaWYgKCF0aGlzLmlzVW5kZWZpbmVkKG9ialtrZXldKSkgXG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IG9ialtrZXldO1xuICAgICAgICBcbiAgICAgIH0sIHRoaXMpO1xuICAgICAgXG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgXG4gICAgfSxcbiAgICBcbiAgICBkZWZhdWx0czogZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICBcbiAgICAgIHRoaXMuZWFjaChBUlJfU0xJQ0UuY2FsbChhcmd1bWVudHMsIDEpLCBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopXG4gICAgICAgICAgaWYgKHRoaXMuaXNVbmRlZmluZWQodGFyZ2V0W2tleV0pKSBcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gb2JqW2tleV07XG4gICAgICAgIFxuICAgICAgfSwgdGhpcyk7XG4gICAgICBcbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgXG4gICAgfSxcbiAgICBcbiAgICBjb21wb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0b0NhbGwgPSBBUlJfU0xJQ0UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2YXIgYXJncyA9IEFSUl9TTElDRS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSB0b0NhbGwubGVuZ3RoIC0xOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIGFyZ3MgPSBbdG9DYWxsW2ldLmFwcGx5KHRoaXMsIGFyZ3MpXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gYXJnc1swXTtcbiAgICAgICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIGVhY2g6IGZ1bmN0aW9uKG9iaiwgaXRyLCBzY29wZSkge1xuXG4gICAgICBcbiAgICAgIGlmIChBUlJfRUFDSCAmJiBvYmouZm9yRWFjaCA9PT0gQVJSX0VBQ0gpIHsgXG4gICAgICAgIFxuICAgICAgICBvYmouZm9yRWFjaChpdHIsIHNjb3BlKTtcbiAgICAgICAgXG4gICAgICB9IGVsc2UgaWYgKG9iai5sZW5ndGggPT09IG9iai5sZW5ndGggKyAwKSB7IC8vIElzIG51bWJlciBidXQgbm90IE5hTlxuICAgICAgICBcbiAgICAgICAgZm9yICh2YXIga2V5ID0gMCwgbCA9IG9iai5sZW5ndGg7IGtleSA8IGw7IGtleSsrKVxuICAgICAgICAgIGlmIChrZXkgaW4gb2JqICYmIGl0ci5jYWxsKHNjb3BlLCBvYmpba2V5XSwga2V5KSA9PT0gdGhpcy5CUkVBSykgXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBcbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikgXG4gICAgICAgICAgaWYgKGl0ci5jYWxsKHNjb3BlLCBvYmpba2V5XSwga2V5KSA9PT0gdGhpcy5CUkVBSylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIFxuICAgICAgfVxuICAgICAgICAgICAgXG4gICAgfSxcbiAgICBcbiAgICBkZWZlcjogZnVuY3Rpb24oZm5jKSB7XG4gICAgICBzZXRUaW1lb3V0KGZuYywgMCk7XG4gICAgfSxcbiAgICBcbiAgICB0b0FycmF5OiBmdW5jdGlvbihvYmopIHtcbiAgICAgIGlmIChvYmoudG9BcnJheSkgcmV0dXJuIG9iai50b0FycmF5KCk7XG4gICAgICByZXR1cm4gQVJSX1NMSUNFLmNhbGwob2JqKTtcbiAgICB9LFxuXG4gICAgaXNVbmRlZmluZWQ6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkO1xuICAgIH0sXG4gICAgXG4gICAgaXNOdWxsOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IG51bGw7XG4gICAgfSxcbiAgICBcbiAgICBpc05hTjogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICE9PSBvYmo7XG4gICAgfSxcbiAgICBcbiAgICBpc0FycmF5OiBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iai5jb25zdHJ1Y3RvciA9PT0gQXJyYXk7XG4gICAgfSxcbiAgICBcbiAgICBpc09iamVjdDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09PSBPYmplY3Qob2JqKTtcbiAgICB9LFxuICAgIFxuICAgIGlzTnVtYmVyOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IG9iaiswO1xuICAgIH0sXG4gICAgXG4gICAgaXNTdHJpbmc6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gb2JqKycnO1xuICAgIH0sXG4gICAgXG4gICAgaXNCb29sZWFuOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IGZhbHNlIHx8IG9iaiA9PT0gdHJ1ZTtcbiAgICB9LFxuICAgIFxuICAgIGlzRnVuY3Rpb246IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xuICAgIH1cbiAgXG4gIH07XG4gICAgXG59KSgpO1xuXG5cbmRhdC5jb250cm9sbGVycy5Db250cm9sbGVyID0gKGZ1bmN0aW9uIChjb21tb24pIHtcblxuICAvKipcbiAgICogQGNsYXNzIEFuIFwiYWJzdHJhY3RcIiBjbGFzcyB0aGF0IHJlcHJlc2VudHMgYSBnaXZlbiBwcm9wZXJ0eSBvZiBhbiBvYmplY3QuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqXG4gICAqIEBtZW1iZXIgZGF0LmNvbnRyb2xsZXJzXG4gICAqL1xuICB2YXIgQ29udHJvbGxlciA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHtcblxuICAgIHRoaXMuaW5pdGlhbFZhbHVlID0gb2JqZWN0W3Byb3BlcnR5XTtcblxuICAgIC8qKlxuICAgICAqIFRob3NlIHdobyBleHRlbmQgdGhpcyBjbGFzcyB3aWxsIHB1dCB0aGVpciBET00gZWxlbWVudHMgaW4gaGVyZS5cbiAgICAgKiBAdHlwZSB7RE9NRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBvYmplY3QgdG8gbWFuaXB1bGF0ZVxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgdGhpcy5vYmplY3QgPSBvYmplY3Q7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gbWFuaXB1bGF0ZVxuICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy5wcm9wZXJ0eSA9IHByb3BlcnR5O1xuXG4gICAgLyoqXG4gICAgICogVGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBvbiBjaGFuZ2UuXG4gICAgICogQHR5cGUge0Z1bmN0aW9ufVxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICB0aGlzLl9fb25DaGFuZ2UgPSB1bmRlZmluZWQ7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIG9uIGZpbmlzaGluZyBjaGFuZ2UuXG4gICAgICogQHR5cGUge0Z1bmN0aW9ufVxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICB0aGlzLl9fb25GaW5pc2hDaGFuZ2UgPSB1bmRlZmluZWQ7XG5cbiAgfTtcblxuICBjb21tb24uZXh0ZW5kKFxuXG4gICAgICBDb250cm9sbGVyLnByb3RvdHlwZSxcblxuICAgICAgLyoqIEBsZW5kcyBkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlci5wcm90b3R5cGUgKi9cbiAgICAgIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogU3BlY2lmeSB0aGF0IGEgZnVuY3Rpb24gZmlyZSBldmVyeSB0aW1lIHNvbWVvbmUgY2hhbmdlcyB0aGUgdmFsdWUgd2l0aFxuICAgICAgICAgKiB0aGlzIENvbnRyb2xsZXIuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuYyBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdoZW5ldmVyIHRoZSB2YWx1ZVxuICAgICAgICAgKiBpcyBtb2RpZmllZCB2aWEgdGhpcyBDb250cm9sbGVyLlxuICAgICAgICAgKiBAcmV0dXJucyB7ZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXJ9IHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbihmbmMpIHtcbiAgICAgICAgICB0aGlzLl9fb25DaGFuZ2UgPSBmbmM7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNwZWNpZnkgdGhhdCBhIGZ1bmN0aW9uIGZpcmUgZXZlcnkgdGltZSBzb21lb25lIFwiZmluaXNoZXNcIiBjaGFuZ2luZ1xuICAgICAgICAgKiB0aGUgdmFsdWUgd2loIHRoaXMgQ29udHJvbGxlci4gVXNlZnVsIGZvciB2YWx1ZXMgdGhhdCBjaGFuZ2VcbiAgICAgICAgICogaW5jcmVtZW50YWxseSBsaWtlIG51bWJlcnMgb3Igc3RyaW5ncy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5jIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2hlbmV2ZXJcbiAgICAgICAgICogc29tZW9uZSBcImZpbmlzaGVzXCIgY2hhbmdpbmcgdGhlIHZhbHVlIHZpYSB0aGlzIENvbnRyb2xsZXIuXG4gICAgICAgICAqIEByZXR1cm5zIHtkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlcn0gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgb25GaW5pc2hDaGFuZ2U6IGZ1bmN0aW9uKGZuYykge1xuICAgICAgICAgIHRoaXMuX19vbkZpbmlzaENoYW5nZSA9IGZuYztcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2hhbmdlIHRoZSB2YWx1ZSBvZiA8Y29kZT5vYmplY3RbcHJvcGVydHldPC9jb2RlPlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gbmV3VmFsdWUgVGhlIG5ldyB2YWx1ZSBvZiA8Y29kZT5vYmplY3RbcHJvcGVydHldPC9jb2RlPlxuICAgICAgICAgKi9cbiAgICAgICAgc2V0VmFsdWU6IGZ1bmN0aW9uKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5vYmplY3RbdGhpcy5wcm9wZXJ0eV0gPSBuZXdWYWx1ZTtcbiAgICAgICAgICBpZiAodGhpcy5fX29uQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLl9fb25DaGFuZ2UuY2FsbCh0aGlzLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMudXBkYXRlRGlzcGxheSgpO1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSB2YWx1ZSBvZiA8Y29kZT5vYmplY3RbcHJvcGVydHldPC9jb2RlPlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgY3VycmVudCB2YWx1ZSBvZiA8Y29kZT5vYmplY3RbcHJvcGVydHldPC9jb2RlPlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0VmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLm9iamVjdFt0aGlzLnByb3BlcnR5XTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVmcmVzaGVzIHRoZSB2aXN1YWwgZGlzcGxheSBvZiBhIENvbnRyb2xsZXIgaW4gb3JkZXIgdG8ga2VlcCBzeW5jXG4gICAgICAgICAqIHdpdGggdGhlIG9iamVjdCdzIGN1cnJlbnQgdmFsdWUuXG4gICAgICAgICAqIEByZXR1cm5zIHtkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlcn0gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgdXBkYXRlRGlzcGxheTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm5zIHtCb29sZWFufSB0cnVlIGlmIHRoZSB2YWx1ZSBoYXMgZGV2aWF0ZWQgZnJvbSBpbml0aWFsVmFsdWVcbiAgICAgICAgICovXG4gICAgICAgIGlzTW9kaWZpZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmluaXRpYWxWYWx1ZSAhPT0gdGhpcy5nZXRWYWx1ZSgpXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICk7XG5cbiAgcmV0dXJuIENvbnRyb2xsZXI7XG5cblxufSkoZGF0LnV0aWxzLmNvbW1vbik7XG5cblxuZGF0LmRvbS5kb20gPSAoZnVuY3Rpb24gKGNvbW1vbikge1xuXG4gIHZhciBFVkVOVF9NQVAgPSB7XG4gICAgJ0hUTUxFdmVudHMnOiBbJ2NoYW5nZSddLFxuICAgICdNb3VzZUV2ZW50cyc6IFsnY2xpY2snLCdtb3VzZW1vdmUnLCdtb3VzZWRvd24nLCdtb3VzZXVwJywgJ21vdXNlb3ZlciddLFxuICAgICdLZXlib2FyZEV2ZW50cyc6IFsna2V5ZG93biddXG4gIH07XG5cbiAgdmFyIEVWRU5UX01BUF9JTlYgPSB7fTtcbiAgY29tbW9uLmVhY2goRVZFTlRfTUFQLCBmdW5jdGlvbih2LCBrKSB7XG4gICAgY29tbW9uLmVhY2godiwgZnVuY3Rpb24oZSkge1xuICAgICAgRVZFTlRfTUFQX0lOVltlXSA9IGs7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHZhciBDU1NfVkFMVUVfUElYRUxTID0gLyhcXGQrKFxcLlxcZCspPylweC87XG5cbiAgZnVuY3Rpb24gY3NzVmFsdWVUb1BpeGVscyh2YWwpIHtcblxuICAgIGlmICh2YWwgPT09ICcwJyB8fCBjb21tb24uaXNVbmRlZmluZWQodmFsKSkgcmV0dXJuIDA7XG5cbiAgICB2YXIgbWF0Y2ggPSB2YWwubWF0Y2goQ1NTX1ZBTFVFX1BJWEVMUyk7XG5cbiAgICBpZiAoIWNvbW1vbi5pc051bGwobWF0Y2gpKSB7XG4gICAgICByZXR1cm4gcGFyc2VGbG9hdChtYXRjaFsxXSk7XG4gICAgfVxuXG4gICAgLy8gVE9ETyAuLi5lbXM/ICU/XG5cbiAgICByZXR1cm4gMDtcblxuICB9XG5cbiAgLyoqXG4gICAqIEBuYW1lc3BhY2VcbiAgICogQG1lbWJlciBkYXQuZG9tXG4gICAqL1xuICB2YXIgZG9tID0ge1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIGVsZW1cbiAgICAgKiBAcGFyYW0gc2VsZWN0YWJsZVxuICAgICAqL1xuICAgIG1ha2VTZWxlY3RhYmxlOiBmdW5jdGlvbihlbGVtLCBzZWxlY3RhYmxlKSB7XG5cbiAgICAgIGlmIChlbGVtID09PSB1bmRlZmluZWQgfHwgZWxlbS5zdHlsZSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG5cbiAgICAgIGVsZW0ub25zZWxlY3RzdGFydCA9IHNlbGVjdGFibGUgPyBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSA6IGZ1bmN0aW9uKCkge1xuICAgICAgfTtcblxuICAgICAgZWxlbS5zdHlsZS5Nb3pVc2VyU2VsZWN0ID0gc2VsZWN0YWJsZSA/ICdhdXRvJyA6ICdub25lJztcbiAgICAgIGVsZW0uc3R5bGUuS2h0bWxVc2VyU2VsZWN0ID0gc2VsZWN0YWJsZSA/ICdhdXRvJyA6ICdub25lJztcbiAgICAgIGVsZW0udW5zZWxlY3RhYmxlID0gc2VsZWN0YWJsZSA/ICdvbicgOiAnb2ZmJztcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICogQHBhcmFtIGhvcml6b250YWxcbiAgICAgKiBAcGFyYW0gdmVydGljYWxcbiAgICAgKi9cbiAgICBtYWtlRnVsbHNjcmVlbjogZnVuY3Rpb24oZWxlbSwgaG9yaXpvbnRhbCwgdmVydGljYWwpIHtcblxuICAgICAgaWYgKGNvbW1vbi5pc1VuZGVmaW5lZChob3Jpem9udGFsKSkgaG9yaXpvbnRhbCA9IHRydWU7XG4gICAgICBpZiAoY29tbW9uLmlzVW5kZWZpbmVkKHZlcnRpY2FsKSkgdmVydGljYWwgPSB0cnVlO1xuXG4gICAgICBlbGVtLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblxuICAgICAgaWYgKGhvcml6b250YWwpIHtcbiAgICAgICAgZWxlbS5zdHlsZS5sZWZ0ID0gMDtcbiAgICAgICAgZWxlbS5zdHlsZS5yaWdodCA9IDA7XG4gICAgICB9XG4gICAgICBpZiAodmVydGljYWwpIHtcbiAgICAgICAgZWxlbS5zdHlsZS50b3AgPSAwO1xuICAgICAgICBlbGVtLnN0eWxlLmJvdHRvbSA9IDA7XG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWxlbVxuICAgICAqIEBwYXJhbSBldmVudFR5cGVcbiAgICAgKiBAcGFyYW0gcGFyYW1zXG4gICAgICovXG4gICAgZmFrZUV2ZW50OiBmdW5jdGlvbihlbGVtLCBldmVudFR5cGUsIHBhcmFtcywgYXV4KSB7XG4gICAgICBwYXJhbXMgPSBwYXJhbXMgfHwge307XG4gICAgICB2YXIgY2xhc3NOYW1lID0gRVZFTlRfTUFQX0lOVltldmVudFR5cGVdO1xuICAgICAgaWYgKCFjbGFzc05hbWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFdmVudCB0eXBlICcgKyBldmVudFR5cGUgKyAnIG5vdCBzdXBwb3J0ZWQuJyk7XG4gICAgICB9XG4gICAgICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoY2xhc3NOYW1lKTtcbiAgICAgIHN3aXRjaCAoY2xhc3NOYW1lKSB7XG4gICAgICAgIGNhc2UgJ01vdXNlRXZlbnRzJzpcbiAgICAgICAgICB2YXIgY2xpZW50WCA9IHBhcmFtcy54IHx8IHBhcmFtcy5jbGllbnRYIHx8IDA7XG4gICAgICAgICAgdmFyIGNsaWVudFkgPSBwYXJhbXMueSB8fCBwYXJhbXMuY2xpZW50WSB8fCAwO1xuICAgICAgICAgIGV2dC5pbml0TW91c2VFdmVudChldmVudFR5cGUsIHBhcmFtcy5idWJibGVzIHx8IGZhbHNlLFxuICAgICAgICAgICAgICBwYXJhbXMuY2FuY2VsYWJsZSB8fCB0cnVlLCB3aW5kb3csIHBhcmFtcy5jbGlja0NvdW50IHx8IDEsXG4gICAgICAgICAgICAgIDAsIC8vc2NyZWVuIFhcbiAgICAgICAgICAgICAgMCwgLy9zY3JlZW4gWVxuICAgICAgICAgICAgICBjbGllbnRYLCAvL2NsaWVudCBYXG4gICAgICAgICAgICAgIGNsaWVudFksIC8vY2xpZW50IFlcbiAgICAgICAgICAgICAgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIDAsIG51bGwpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdLZXlib2FyZEV2ZW50cyc6XG4gICAgICAgICAgdmFyIGluaXQgPSBldnQuaW5pdEtleWJvYXJkRXZlbnQgfHwgZXZ0LmluaXRLZXlFdmVudDsgLy8gd2Via2l0IHx8IG1velxuICAgICAgICAgIGNvbW1vbi5kZWZhdWx0cyhwYXJhbXMsIHtcbiAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAgICAgICBjdHJsS2V5OiBmYWxzZSxcbiAgICAgICAgICAgIGFsdEtleTogZmFsc2UsXG4gICAgICAgICAgICBzaGlmdEtleTogZmFsc2UsXG4gICAgICAgICAgICBtZXRhS2V5OiBmYWxzZSxcbiAgICAgICAgICAgIGtleUNvZGU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGNoYXJDb2RlOiB1bmRlZmluZWRcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpbml0KGV2ZW50VHlwZSwgcGFyYW1zLmJ1YmJsZXMgfHwgZmFsc2UsXG4gICAgICAgICAgICAgIHBhcmFtcy5jYW5jZWxhYmxlLCB3aW5kb3csXG4gICAgICAgICAgICAgIHBhcmFtcy5jdHJsS2V5LCBwYXJhbXMuYWx0S2V5LFxuICAgICAgICAgICAgICBwYXJhbXMuc2hpZnRLZXksIHBhcmFtcy5tZXRhS2V5LFxuICAgICAgICAgICAgICBwYXJhbXMua2V5Q29kZSwgcGFyYW1zLmNoYXJDb2RlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBldnQuaW5pdEV2ZW50KGV2ZW50VHlwZSwgcGFyYW1zLmJ1YmJsZXMgfHwgZmFsc2UsXG4gICAgICAgICAgICAgIHBhcmFtcy5jYW5jZWxhYmxlIHx8IHRydWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY29tbW9uLmRlZmF1bHRzKGV2dCwgYXV4KTtcbiAgICAgIGVsZW0uZGlzcGF0Y2hFdmVudChldnQpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICogQHBhcmFtIGV2ZW50XG4gICAgICogQHBhcmFtIGZ1bmNcbiAgICAgKiBAcGFyYW0gYm9vbFxuICAgICAqL1xuICAgIGJpbmQ6IGZ1bmN0aW9uKGVsZW0sIGV2ZW50LCBmdW5jLCBib29sKSB7XG4gICAgICBib29sID0gYm9vbCB8fCBmYWxzZTtcbiAgICAgIGlmIChlbGVtLmFkZEV2ZW50TGlzdGVuZXIpXG4gICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuYywgYm9vbCk7XG4gICAgICBlbHNlIGlmIChlbGVtLmF0dGFjaEV2ZW50KVxuICAgICAgICBlbGVtLmF0dGFjaEV2ZW50KCdvbicgKyBldmVudCwgZnVuYyk7XG4gICAgICByZXR1cm4gZG9tO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICogQHBhcmFtIGV2ZW50XG4gICAgICogQHBhcmFtIGZ1bmNcbiAgICAgKiBAcGFyYW0gYm9vbFxuICAgICAqL1xuICAgIHVuYmluZDogZnVuY3Rpb24oZWxlbSwgZXZlbnQsIGZ1bmMsIGJvb2wpIHtcbiAgICAgIGJvb2wgPSBib29sIHx8IGZhbHNlO1xuICAgICAgaWYgKGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcilcbiAgICAgICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBmdW5jLCBib29sKTtcbiAgICAgIGVsc2UgaWYgKGVsZW0uZGV0YWNoRXZlbnQpXG4gICAgICAgIGVsZW0uZGV0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBmdW5jKTtcbiAgICAgIHJldHVybiBkb207XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGVsZW1cbiAgICAgKiBAcGFyYW0gY2xhc3NOYW1lXG4gICAgICovXG4gICAgYWRkQ2xhc3M6IGZ1bmN0aW9uKGVsZW0sIGNsYXNzTmFtZSkge1xuICAgICAgaWYgKGVsZW0uY2xhc3NOYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZWxlbS5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gICAgICB9IGVsc2UgaWYgKGVsZW0uY2xhc3NOYW1lICE9PSBjbGFzc05hbWUpIHtcbiAgICAgICAgdmFyIGNsYXNzZXMgPSBlbGVtLmNsYXNzTmFtZS5zcGxpdCgvICsvKTtcbiAgICAgICAgaWYgKGNsYXNzZXMuaW5kZXhPZihjbGFzc05hbWUpID09IC0xKSB7XG4gICAgICAgICAgY2xhc3Nlcy5wdXNoKGNsYXNzTmFtZSk7XG4gICAgICAgICAgZWxlbS5jbGFzc05hbWUgPSBjbGFzc2VzLmpvaW4oJyAnKS5yZXBsYWNlKC9eXFxzKy8sICcnKS5yZXBsYWNlKC9cXHMrJC8sICcnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGRvbTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWxlbVxuICAgICAqIEBwYXJhbSBjbGFzc05hbWVcbiAgICAgKi9cbiAgICByZW1vdmVDbGFzczogZnVuY3Rpb24oZWxlbSwgY2xhc3NOYW1lKSB7XG4gICAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICAgIGlmIChlbGVtLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gZWxlbS5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbS5jbGFzc05hbWUgPT09IGNsYXNzTmFtZSkge1xuICAgICAgICAgIGVsZW0ucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBjbGFzc2VzID0gZWxlbS5jbGFzc05hbWUuc3BsaXQoLyArLyk7XG4gICAgICAgICAgdmFyIGluZGV4ID0gY2xhc3Nlcy5pbmRleE9mKGNsYXNzTmFtZSk7XG4gICAgICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICBlbGVtLmNsYXNzTmFtZSA9IGNsYXNzZXMuam9pbignICcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbS5jbGFzc05hbWUgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gZG9tO1xuICAgIH0sXG5cbiAgICBoYXNDbGFzczogZnVuY3Rpb24oZWxlbSwgY2xhc3NOYW1lKSB7XG4gICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnKD86XnxcXFxccyspJyArIGNsYXNzTmFtZSArICcoPzpcXFxccyt8JCknKS50ZXN0KGVsZW0uY2xhc3NOYW1lKSB8fCBmYWxzZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWxlbVxuICAgICAqL1xuICAgIGdldFdpZHRoOiBmdW5jdGlvbihlbGVtKSB7XG5cbiAgICAgIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbSk7XG5cbiAgICAgIHJldHVybiBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydib3JkZXItbGVmdC13aWR0aCddKSArXG4gICAgICAgICAgY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsnYm9yZGVyLXJpZ2h0LXdpZHRoJ10pICtcbiAgICAgICAgICBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydwYWRkaW5nLWxlZnQnXSkgK1xuICAgICAgICAgIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ3BhZGRpbmctcmlnaHQnXSkgK1xuICAgICAgICAgIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ3dpZHRoJ10pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICovXG4gICAgZ2V0SGVpZ2h0OiBmdW5jdGlvbihlbGVtKSB7XG5cbiAgICAgIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbSk7XG5cbiAgICAgIHJldHVybiBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydib3JkZXItdG9wLXdpZHRoJ10pICtcbiAgICAgICAgICBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydib3JkZXItYm90dG9tLXdpZHRoJ10pICtcbiAgICAgICAgICBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydwYWRkaW5nLXRvcCddKSArXG4gICAgICAgICAgY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsncGFkZGluZy1ib3R0b20nXSkgK1xuICAgICAgICAgIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ2hlaWdodCddKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWxlbVxuICAgICAqL1xuICAgIGdldE9mZnNldDogZnVuY3Rpb24oZWxlbSkge1xuICAgICAgdmFyIG9mZnNldCA9IHtsZWZ0OiAwLCB0b3A6MH07XG4gICAgICBpZiAoZWxlbS5vZmZzZXRQYXJlbnQpIHtcbiAgICAgICAgZG8ge1xuICAgICAgICAgIG9mZnNldC5sZWZ0ICs9IGVsZW0ub2Zmc2V0TGVmdDtcbiAgICAgICAgICBvZmZzZXQudG9wICs9IGVsZW0ub2Zmc2V0VG9wO1xuICAgICAgICB9IHdoaWxlIChlbGVtID0gZWxlbS5vZmZzZXRQYXJlbnQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9mZnNldDtcbiAgICB9LFxuXG4gICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3Bvc3RzLzI2ODQ1NjEvcmV2aXNpb25zXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIGVsZW1cbiAgICAgKi9cbiAgICBpc0FjdGl2ZTogZnVuY3Rpb24oZWxlbSkge1xuICAgICAgcmV0dXJuIGVsZW0gPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgKCBlbGVtLnR5cGUgfHwgZWxlbS5ocmVmICk7XG4gICAgfVxuXG4gIH07XG5cbiAgcmV0dXJuIGRvbTtcblxufSkoZGF0LnV0aWxzLmNvbW1vbik7XG5cblxuZGF0LmNvbnRyb2xsZXJzLk9wdGlvbkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKENvbnRyb2xsZXIsIGRvbSwgY29tbW9uKSB7XG5cbiAgLyoqXG4gICAqIEBjbGFzcyBQcm92aWRlcyBhIHNlbGVjdCBpbnB1dCB0byBhbHRlciB0aGUgcHJvcGVydHkgb2YgYW4gb2JqZWN0LCB1c2luZyBhXG4gICAqIGxpc3Qgb2YgYWNjZXB0ZWQgdmFsdWVzLlxuICAgKlxuICAgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlclxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge09iamVjdHxzdHJpbmdbXX0gb3B0aW9ucyBBIG1hcCBvZiBsYWJlbHMgdG8gYWNjZXB0YWJsZSB2YWx1ZXMsIG9yXG4gICAqIGEgbGlzdCBvZiBhY2NlcHRhYmxlIHN0cmluZyB2YWx1ZXMuXG4gICAqXG4gICAqIEBtZW1iZXIgZGF0LmNvbnRyb2xsZXJzXG4gICAqL1xuICB2YXIgT3B0aW9uQ29udHJvbGxlciA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHksIG9wdGlvbnMpIHtcblxuICAgIE9wdGlvbkNvbnRyb2xsZXIuc3VwZXJjbGFzcy5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHkpO1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIC8qKlxuICAgICAqIFRoZSBkcm9wIGRvd24gbWVudVxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICB0aGlzLl9fc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XG5cbiAgICBpZiAoY29tbW9uLmlzQXJyYXkob3B0aW9ucykpIHtcbiAgICAgIHZhciBtYXAgPSB7fTtcbiAgICAgIGNvbW1vbi5lYWNoKG9wdGlvbnMsIGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgbWFwW2VsZW1lbnRdID0gZWxlbWVudDtcbiAgICAgIH0pO1xuICAgICAgb3B0aW9ucyA9IG1hcDtcbiAgICB9XG5cbiAgICBjb21tb24uZWFjaChvcHRpb25zLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG5cbiAgICAgIHZhciBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgIG9wdC5pbm5lckhUTUwgPSBrZXk7XG4gICAgICBvcHQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIHZhbHVlKTtcbiAgICAgIF90aGlzLl9fc2VsZWN0LmFwcGVuZENoaWxkKG9wdCk7XG5cbiAgICB9KTtcblxuICAgIC8vIEFja25vd2xlZGdlIG9yaWdpbmFsIHZhbHVlXG4gICAgdGhpcy51cGRhdGVEaXNwbGF5KCk7XG5cbiAgICBkb20uYmluZCh0aGlzLl9fc2VsZWN0LCAnY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZGVzaXJlZFZhbHVlID0gdGhpcy5vcHRpb25zW3RoaXMuc2VsZWN0ZWRJbmRleF0udmFsdWU7XG4gICAgICBfdGhpcy5zZXRWYWx1ZShkZXNpcmVkVmFsdWUpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX19zZWxlY3QpO1xuXG4gIH07XG5cbiAgT3B0aW9uQ29udHJvbGxlci5zdXBlcmNsYXNzID0gQ29udHJvbGxlcjtcblxuICBjb21tb24uZXh0ZW5kKFxuXG4gICAgICBPcHRpb25Db250cm9sbGVyLnByb3RvdHlwZSxcbiAgICAgIENvbnRyb2xsZXIucHJvdG90eXBlLFxuXG4gICAgICB7XG5cbiAgICAgICAgc2V0VmFsdWU6IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICB2YXIgdG9SZXR1cm4gPSBPcHRpb25Db250cm9sbGVyLnN1cGVyY2xhc3MucHJvdG90eXBlLnNldFZhbHVlLmNhbGwodGhpcywgdik7XG4gICAgICAgICAgaWYgKHRoaXMuX19vbkZpbmlzaENoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5fX29uRmluaXNoQ2hhbmdlLmNhbGwodGhpcywgdGhpcy5nZXRWYWx1ZSgpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRvUmV0dXJuO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZURpc3BsYXk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoaXMuX19zZWxlY3QudmFsdWUgPSB0aGlzLmdldFZhbHVlKCk7XG4gICAgICAgICAgcmV0dXJuIE9wdGlvbkNvbnRyb2xsZXIuc3VwZXJjbGFzcy5wcm90b3R5cGUudXBkYXRlRGlzcGxheS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgIH1cblxuICApO1xuXG4gIHJldHVybiBPcHRpb25Db250cm9sbGVyO1xuXG59KShkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlcixcbmRhdC5kb20uZG9tLFxuZGF0LnV0aWxzLmNvbW1vbik7XG5cblxuZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKENvbnRyb2xsZXIsIGNvbW1vbikge1xuXG4gIC8qKlxuICAgKiBAY2xhc3MgUmVwcmVzZW50cyBhIGdpdmVuIHByb3BlcnR5IG9mIGFuIG9iamVjdCB0aGF0IGlzIGEgbnVtYmVyLlxuICAgKlxuICAgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlclxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gT3B0aW9uYWwgcGFyYW1ldGVyc1xuICAgKiBAcGFyYW0ge051bWJlcn0gW3BhcmFtcy5taW5dIE1pbmltdW0gYWxsb3dlZCB2YWx1ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW3BhcmFtcy5tYXhdIE1heGltdW0gYWxsb3dlZCB2YWx1ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW3BhcmFtcy5zdGVwXSBJbmNyZW1lbnQgYnkgd2hpY2ggdG8gY2hhbmdlIHZhbHVlXG4gICAqXG4gICAqIEBtZW1iZXIgZGF0LmNvbnRyb2xsZXJzXG4gICAqL1xuICB2YXIgTnVtYmVyQ29udHJvbGxlciA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHksIHBhcmFtcykge1xuXG4gICAgTnVtYmVyQ29udHJvbGxlci5zdXBlcmNsYXNzLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgICBwYXJhbXMgPSBwYXJhbXMgfHwge307XG5cbiAgICB0aGlzLl9fbWluID0gcGFyYW1zLm1pbjtcbiAgICB0aGlzLl9fbWF4ID0gcGFyYW1zLm1heDtcbiAgICB0aGlzLl9fc3RlcCA9IHBhcmFtcy5zdGVwO1xuXG4gICAgaWYgKGNvbW1vbi5pc1VuZGVmaW5lZCh0aGlzLl9fc3RlcCkpIHtcblxuICAgICAgaWYgKHRoaXMuaW5pdGlhbFZhbHVlID09IDApIHtcbiAgICAgICAgdGhpcy5fX2ltcGxpZWRTdGVwID0gMTsgLy8gV2hhdCBhcmUgd2UsIHBzeWNoaWNzP1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSGV5IERvdWcsIGNoZWNrIHRoaXMgb3V0LlxuICAgICAgICB0aGlzLl9faW1wbGllZFN0ZXAgPSBNYXRoLnBvdygxMCwgTWF0aC5mbG9vcihNYXRoLmxvZyh0aGlzLmluaXRpYWxWYWx1ZSkvTWF0aC5MTjEwKSkvMTA7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aGlzLl9faW1wbGllZFN0ZXAgPSB0aGlzLl9fc3RlcDtcblxuICAgIH1cblxuICAgIHRoaXMuX19wcmVjaXNpb24gPSBudW1EZWNpbWFscyh0aGlzLl9faW1wbGllZFN0ZXApO1xuXG5cbiAgfTtcblxuICBOdW1iZXJDb250cm9sbGVyLnN1cGVyY2xhc3MgPSBDb250cm9sbGVyO1xuXG4gIGNvbW1vbi5leHRlbmQoXG5cbiAgICAgIE51bWJlckNvbnRyb2xsZXIucHJvdG90eXBlLFxuICAgICAgQ29udHJvbGxlci5wcm90b3R5cGUsXG5cbiAgICAgIC8qKiBAbGVuZHMgZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXIucHJvdG90eXBlICovXG4gICAgICB7XG5cbiAgICAgICAgc2V0VmFsdWU6IGZ1bmN0aW9uKHYpIHtcblxuICAgICAgICAgIGlmICh0aGlzLl9fbWluICE9PSB1bmRlZmluZWQgJiYgdiA8IHRoaXMuX19taW4pIHtcbiAgICAgICAgICAgIHYgPSB0aGlzLl9fbWluO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fX21heCAhPT0gdW5kZWZpbmVkICYmIHYgPiB0aGlzLl9fbWF4KSB7XG4gICAgICAgICAgICB2ID0gdGhpcy5fX21heDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5fX3N0ZXAgIT09IHVuZGVmaW5lZCAmJiB2ICUgdGhpcy5fX3N0ZXAgIT0gMCkge1xuICAgICAgICAgICAgdiA9IE1hdGgucm91bmQodiAvIHRoaXMuX19zdGVwKSAqIHRoaXMuX19zdGVwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBOdW1iZXJDb250cm9sbGVyLnN1cGVyY2xhc3MucHJvdG90eXBlLnNldFZhbHVlLmNhbGwodGhpcywgdik7XG5cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU3BlY2lmeSBhIG1pbmltdW0gdmFsdWUgZm9yIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gbWluVmFsdWUgVGhlIG1pbmltdW0gdmFsdWUgZm9yXG4gICAgICAgICAqIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+XG4gICAgICAgICAqIEByZXR1cm5zIHtkYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlcn0gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgbWluOiBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgdGhpcy5fX21pbiA9IHY7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNwZWNpZnkgYSBtYXhpbXVtIHZhbHVlIGZvciA8Y29kZT5vYmplY3RbcHJvcGVydHldPC9jb2RlPi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IG1heFZhbHVlIFRoZSBtYXhpbXVtIHZhbHVlIGZvclxuICAgICAgICAgKiA8Y29kZT5vYmplY3RbcHJvcGVydHldPC9jb2RlPlxuICAgICAgICAgKiBAcmV0dXJucyB7ZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJ9IHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIG1heDogZnVuY3Rpb24odikge1xuICAgICAgICAgIHRoaXMuX19tYXggPSB2O1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTcGVjaWZ5IGEgc3RlcCB2YWx1ZSB0aGF0IGRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyXG4gICAgICAgICAqIGluY3JlbWVudHMgYnkuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzdGVwVmFsdWUgVGhlIHN0ZXAgdmFsdWUgZm9yXG4gICAgICAgICAqIGRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyXG4gICAgICAgICAqIEBkZWZhdWx0IGlmIG1pbmltdW0gYW5kIG1heGltdW0gc3BlY2lmaWVkIGluY3JlbWVudCBpcyAxJSBvZiB0aGVcbiAgICAgICAgICogZGlmZmVyZW5jZSBvdGhlcndpc2Ugc3RlcFZhbHVlIGlzIDFcbiAgICAgICAgICogQHJldHVybnMge2RhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyfSB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBzdGVwOiBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgdGhpcy5fX3N0ZXAgPSB2O1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgIH1cblxuICApO1xuXG4gIGZ1bmN0aW9uIG51bURlY2ltYWxzKHgpIHtcbiAgICB4ID0geC50b1N0cmluZygpO1xuICAgIGlmICh4LmluZGV4T2YoJy4nKSA+IC0xKSB7XG4gICAgICByZXR1cm4geC5sZW5ndGggLSB4LmluZGV4T2YoJy4nKSAtIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBOdW1iZXJDb250cm9sbGVyO1xuXG59KShkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlcixcbmRhdC51dGlscy5jb21tb24pO1xuXG5cbmRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyQm94ID0gKGZ1bmN0aW9uIChOdW1iZXJDb250cm9sbGVyLCBkb20sIGNvbW1vbikge1xuXG4gIC8qKlxuICAgKiBAY2xhc3MgUmVwcmVzZW50cyBhIGdpdmVuIHByb3BlcnR5IG9mIGFuIG9iamVjdCB0aGF0IGlzIGEgbnVtYmVyIGFuZFxuICAgKiBwcm92aWRlcyBhbiBpbnB1dCBlbGVtZW50IHdpdGggd2hpY2ggdG8gbWFuaXB1bGF0ZSBpdC5cbiAgICpcbiAgICogQGV4dGVuZHMgZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXJcbiAgICogQGV4dGVuZHMgZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIE9wdGlvbmFsIHBhcmFtZXRlcnNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtwYXJhbXMubWluXSBNaW5pbXVtIGFsbG93ZWQgdmFsdWVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtwYXJhbXMubWF4XSBNYXhpbXVtIGFsbG93ZWQgdmFsdWVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtwYXJhbXMuc3RlcF0gSW5jcmVtZW50IGJ5IHdoaWNoIHRvIGNoYW5nZSB2YWx1ZVxuICAgKlxuICAgKiBAbWVtYmVyIGRhdC5jb250cm9sbGVyc1xuICAgKi9cbiAgdmFyIE51bWJlckNvbnRyb2xsZXJCb3ggPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5LCBwYXJhbXMpIHtcblxuICAgIHRoaXMuX190cnVuY2F0aW9uU3VzcGVuZGVkID0gZmFsc2U7XG5cbiAgICBOdW1iZXJDb250cm9sbGVyQm94LnN1cGVyY2xhc3MuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5LCBwYXJhbXMpO1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIC8qKlxuICAgICAqIHtOdW1iZXJ9IFByZXZpb3VzIG1vdXNlIHkgcG9zaXRpb25cbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgdmFyIHByZXZfeTtcblxuICAgIHRoaXMuX19pbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgdGhpcy5fX2lucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XG5cbiAgICAvLyBNYWtlcyBpdCBzbyBtYW51YWxseSBzcGVjaWZpZWQgdmFsdWVzIGFyZSBub3QgdHJ1bmNhdGVkLlxuXG4gICAgZG9tLmJpbmQodGhpcy5fX2lucHV0LCAnY2hhbmdlJywgb25DaGFuZ2UpO1xuICAgIGRvbS5iaW5kKHRoaXMuX19pbnB1dCwgJ2JsdXInLCBvbkJsdXIpO1xuICAgIGRvbS5iaW5kKHRoaXMuX19pbnB1dCwgJ21vdXNlZG93bicsIG9uTW91c2VEb3duKTtcbiAgICBkb20uYmluZCh0aGlzLl9faW5wdXQsICdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuXG4gICAgICAvLyBXaGVuIHByZXNzaW5nIGVudGlyZSwgeW91IGNhbiBiZSBhcyBwcmVjaXNlIGFzIHlvdSB3YW50LlxuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgX3RoaXMuX190cnVuY2F0aW9uU3VzcGVuZGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ibHVyKCk7XG4gICAgICAgIF90aGlzLl9fdHJ1bmNhdGlvblN1c3BlbmRlZCA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBvbkNoYW5nZSgpIHtcbiAgICAgIHZhciBhdHRlbXB0ZWQgPSBwYXJzZUZsb2F0KF90aGlzLl9faW5wdXQudmFsdWUpO1xuICAgICAgaWYgKCFjb21tb24uaXNOYU4oYXR0ZW1wdGVkKSkgX3RoaXMuc2V0VmFsdWUoYXR0ZW1wdGVkKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkJsdXIoKSB7XG4gICAgICBvbkNoYW5nZSgpO1xuICAgICAgaWYgKF90aGlzLl9fb25GaW5pc2hDaGFuZ2UpIHtcbiAgICAgICAgX3RoaXMuX19vbkZpbmlzaENoYW5nZS5jYWxsKF90aGlzLCBfdGhpcy5nZXRWYWx1ZSgpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1vdXNlRG93bihlKSB7XG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBvbk1vdXNlRHJhZyk7XG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZXVwJywgb25Nb3VzZVVwKTtcbiAgICAgIHByZXZfeSA9IGUuY2xpZW50WTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1vdXNlRHJhZyhlKSB7XG5cbiAgICAgIHZhciBkaWZmID0gcHJldl95IC0gZS5jbGllbnRZO1xuICAgICAgX3RoaXMuc2V0VmFsdWUoX3RoaXMuZ2V0VmFsdWUoKSArIGRpZmYgKiBfdGhpcy5fX2ltcGxpZWRTdGVwKTtcblxuICAgICAgcHJldl95ID0gZS5jbGllbnRZO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3VzZVVwKCkge1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBvbk1vdXNlRHJhZyk7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBvbk1vdXNlVXApO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlRGlzcGxheSgpO1xuXG4gICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX19pbnB1dCk7XG5cbiAgfTtcblxuICBOdW1iZXJDb250cm9sbGVyQm94LnN1cGVyY2xhc3MgPSBOdW1iZXJDb250cm9sbGVyO1xuXG4gIGNvbW1vbi5leHRlbmQoXG5cbiAgICAgIE51bWJlckNvbnRyb2xsZXJCb3gucHJvdG90eXBlLFxuICAgICAgTnVtYmVyQ29udHJvbGxlci5wcm90b3R5cGUsXG5cbiAgICAgIHtcblxuICAgICAgICB1cGRhdGVEaXNwbGF5OiBmdW5jdGlvbigpIHtcblxuICAgICAgICAgIHRoaXMuX19pbnB1dC52YWx1ZSA9IHRoaXMuX190cnVuY2F0aW9uU3VzcGVuZGVkID8gdGhpcy5nZXRWYWx1ZSgpIDogcm91bmRUb0RlY2ltYWwodGhpcy5nZXRWYWx1ZSgpLCB0aGlzLl9fcHJlY2lzaW9uKTtcbiAgICAgICAgICByZXR1cm4gTnVtYmVyQ29udHJvbGxlckJveC5zdXBlcmNsYXNzLnByb3RvdHlwZS51cGRhdGVEaXNwbGF5LmNhbGwodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICk7XG5cbiAgZnVuY3Rpb24gcm91bmRUb0RlY2ltYWwodmFsdWUsIGRlY2ltYWxzKSB7XG4gICAgdmFyIHRlblRvID0gTWF0aC5wb3coMTAsIGRlY2ltYWxzKTtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAqIHRlblRvKSAvIHRlblRvO1xuICB9XG5cbiAgcmV0dXJuIE51bWJlckNvbnRyb2xsZXJCb3g7XG5cbn0pKGRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyLFxuZGF0LmRvbS5kb20sXG5kYXQudXRpbHMuY29tbW9uKTtcblxuXG5kYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlclNsaWRlciA9IChmdW5jdGlvbiAoTnVtYmVyQ29udHJvbGxlciwgZG9tLCBjc3MsIGNvbW1vbiwgc3R5bGVTaGVldCkge1xuXG4gIC8qKlxuICAgKiBAY2xhc3MgUmVwcmVzZW50cyBhIGdpdmVuIHByb3BlcnR5IG9mIGFuIG9iamVjdCB0aGF0IGlzIGEgbnVtYmVyLCBjb250YWluc1xuICAgKiBhIG1pbmltdW0gYW5kIG1heGltdW0sIGFuZCBwcm92aWRlcyBhIHNsaWRlciBlbGVtZW50IHdpdGggd2hpY2ggdG9cbiAgICogbWFuaXB1bGF0ZSBpdC4gSXQgc2hvdWxkIGJlIG5vdGVkIHRoYXQgdGhlIHNsaWRlciBlbGVtZW50IGlzIG1hZGUgdXAgb2ZcbiAgICogPGNvZGU+Jmx0O2RpdiZndDs8L2NvZGU+IHRhZ3MsIDxzdHJvbmc+bm90PC9zdHJvbmc+IHRoZSBodG1sNVxuICAgKiA8Y29kZT4mbHQ7c2xpZGVyJmd0OzwvY29kZT4gZWxlbWVudC5cbiAgICpcbiAgICogQGV4dGVuZHMgZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXJcbiAgICogQGV4dGVuZHMgZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJcbiAgICogXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtaW5WYWx1ZSBNaW5pbXVtIGFsbG93ZWQgdmFsdWVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG1heFZhbHVlIE1heGltdW0gYWxsb3dlZCB2YWx1ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gc3RlcFZhbHVlIEluY3JlbWVudCBieSB3aGljaCB0byBjaGFuZ2UgdmFsdWVcbiAgICpcbiAgICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcbiAgICovXG4gIHZhciBOdW1iZXJDb250cm9sbGVyU2xpZGVyID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSwgbWluLCBtYXgsIHN0ZXApIHtcblxuICAgIE51bWJlckNvbnRyb2xsZXJTbGlkZXIuc3VwZXJjbGFzcy5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHksIHsgbWluOiBtaW4sIG1heDogbWF4LCBzdGVwOiBzdGVwIH0pO1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuX19iYWNrZ3JvdW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fX2ZvcmVncm91bmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBcblxuXG4gICAgZG9tLmJpbmQodGhpcy5fX2JhY2tncm91bmQsICdtb3VzZWRvd24nLCBvbk1vdXNlRG93bik7XG4gICAgXG4gICAgZG9tLmFkZENsYXNzKHRoaXMuX19iYWNrZ3JvdW5kLCAnc2xpZGVyJyk7XG4gICAgZG9tLmFkZENsYXNzKHRoaXMuX19mb3JlZ3JvdW5kLCAnc2xpZGVyLWZnJyk7XG5cbiAgICBmdW5jdGlvbiBvbk1vdXNlRG93bihlKSB7XG5cbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIG9uTW91c2VEcmFnKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBvbk1vdXNlVXApO1xuXG4gICAgICBvbk1vdXNlRHJhZyhlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1vdXNlRHJhZyhlKSB7XG5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdmFyIG9mZnNldCA9IGRvbS5nZXRPZmZzZXQoX3RoaXMuX19iYWNrZ3JvdW5kKTtcbiAgICAgIHZhciB3aWR0aCA9IGRvbS5nZXRXaWR0aChfdGhpcy5fX2JhY2tncm91bmQpO1xuICAgICAgXG4gICAgICBfdGhpcy5zZXRWYWx1ZShcbiAgICAgICAgbWFwKGUuY2xpZW50WCwgb2Zmc2V0LmxlZnQsIG9mZnNldC5sZWZ0ICsgd2lkdGgsIF90aGlzLl9fbWluLCBfdGhpcy5fX21heClcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2VVcCgpIHtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgb25Nb3VzZURyYWcpO1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZXVwJywgb25Nb3VzZVVwKTtcbiAgICAgIGlmIChfdGhpcy5fX29uRmluaXNoQ2hhbmdlKSB7XG4gICAgICAgIF90aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbChfdGhpcywgX3RoaXMuZ2V0VmFsdWUoKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVEaXNwbGF5KCk7XG5cbiAgICB0aGlzLl9fYmFja2dyb3VuZC5hcHBlbmRDaGlsZCh0aGlzLl9fZm9yZWdyb3VuZCk7XG4gICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX19iYWNrZ3JvdW5kKTtcblxuICB9O1xuXG4gIE51bWJlckNvbnRyb2xsZXJTbGlkZXIuc3VwZXJjbGFzcyA9IE51bWJlckNvbnRyb2xsZXI7XG5cbiAgLyoqXG4gICAqIEluamVjdHMgZGVmYXVsdCBzdHlsZXNoZWV0IGZvciBzbGlkZXIgZWxlbWVudHMuXG4gICAqL1xuICBOdW1iZXJDb250cm9sbGVyU2xpZGVyLnVzZURlZmF1bHRTdHlsZXMgPSBmdW5jdGlvbigpIHtcbiAgICBjc3MuaW5qZWN0KHN0eWxlU2hlZXQpO1xuICB9O1xuXG4gIGNvbW1vbi5leHRlbmQoXG5cbiAgICAgIE51bWJlckNvbnRyb2xsZXJTbGlkZXIucHJvdG90eXBlLFxuICAgICAgTnVtYmVyQ29udHJvbGxlci5wcm90b3R5cGUsXG5cbiAgICAgIHtcblxuICAgICAgICB1cGRhdGVEaXNwbGF5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgcGN0ID0gKHRoaXMuZ2V0VmFsdWUoKSAtIHRoaXMuX19taW4pLyh0aGlzLl9fbWF4IC0gdGhpcy5fX21pbik7XG4gICAgICAgICAgdGhpcy5fX2ZvcmVncm91bmQuc3R5bGUud2lkdGggPSBwY3QqMTAwKyclJztcbiAgICAgICAgICByZXR1cm4gTnVtYmVyQ29udHJvbGxlclNsaWRlci5zdXBlcmNsYXNzLnByb3RvdHlwZS51cGRhdGVEaXNwbGF5LmNhbGwodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG5cblxuICApO1xuXG4gIGZ1bmN0aW9uIG1hcCh2LCBpMSwgaTIsIG8xLCBvMikge1xuICAgIHJldHVybiBvMSArIChvMiAtIG8xKSAqICgodiAtIGkxKSAvIChpMiAtIGkxKSk7XG4gIH1cblxuICByZXR1cm4gTnVtYmVyQ29udHJvbGxlclNsaWRlcjtcbiAgXG59KShkYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlcixcbmRhdC5kb20uZG9tLFxuZGF0LnV0aWxzLmNzcyxcbmRhdC51dGlscy5jb21tb24sXG5cIi5zbGlkZXIge1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xNSk7XFxuICBoZWlnaHQ6IDFlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDFlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XFxuICBwYWRkaW5nOiAwIDAuNWVtO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuLnNsaWRlci1mZyB7XFxuICBwYWRkaW5nOiAxcHggMCAycHggMDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNhYWE7XFxuICBoZWlnaHQ6IDFlbTtcXG4gIG1hcmdpbi1sZWZ0OiAtMC41ZW07XFxuICBwYWRkaW5nLXJpZ2h0OiAwLjVlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDFlbSAwIDAgMWVtO1xcbn1cXG5cXG4uc2xpZGVyLWZnOmFmdGVyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGJvcmRlci1yYWRpdXM6IDFlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBib3JkZXI6ICAxcHggc29saWQgI2FhYTtcXG4gIGNvbnRlbnQ6ICcnO1xcbiAgZmxvYXQ6IHJpZ2h0O1xcbiAgbWFyZ2luLXJpZ2h0OiAtMWVtO1xcbiAgbWFyZ2luLXRvcDogLTFweDtcXG4gIGhlaWdodDogMC45ZW07XFxuICB3aWR0aDogMC45ZW07XFxufVwiKTtcblxuXG5kYXQuY29udHJvbGxlcnMuRnVuY3Rpb25Db250cm9sbGVyID0gKGZ1bmN0aW9uIChDb250cm9sbGVyLCBkb20sIGNvbW1vbikge1xuXG4gIC8qKlxuICAgKiBAY2xhc3MgUHJvdmlkZXMgYSBHVUkgaW50ZXJmYWNlIHRvIGZpcmUgYSBzcGVjaWZpZWQgbWV0aG9kLCBhIHByb3BlcnR5IG9mIGFuIG9iamVjdC5cbiAgICpcbiAgICogQGV4dGVuZHMgZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXJcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICpcbiAgICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcbiAgICovXG4gIHZhciBGdW5jdGlvbkNvbnRyb2xsZXIgPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5LCB0ZXh0KSB7XG5cbiAgICBGdW5jdGlvbkNvbnRyb2xsZXIuc3VwZXJjbGFzcy5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHkpO1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuX19idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9fYnV0dG9uLmlubmVySFRNTCA9IHRleHQgPT09IHVuZGVmaW5lZCA/ICdGaXJlJyA6IHRleHQ7XG4gICAgZG9tLmJpbmQodGhpcy5fX2J1dHRvbiwgJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgX3RoaXMuZmlyZSgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgZG9tLmFkZENsYXNzKHRoaXMuX19idXR0b24sICdidXR0b24nKTtcblxuICAgIHRoaXMuZG9tRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9fYnV0dG9uKTtcblxuXG4gIH07XG5cbiAgRnVuY3Rpb25Db250cm9sbGVyLnN1cGVyY2xhc3MgPSBDb250cm9sbGVyO1xuXG4gIGNvbW1vbi5leHRlbmQoXG5cbiAgICAgIEZ1bmN0aW9uQ29udHJvbGxlci5wcm90b3R5cGUsXG4gICAgICBDb250cm9sbGVyLnByb3RvdHlwZSxcbiAgICAgIHtcbiAgICAgICAgXG4gICAgICAgIGZpcmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICh0aGlzLl9fb25DaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuX19vbkNoYW5nZS5jYWxsKHRoaXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5fX29uRmluaXNoQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbCh0aGlzLCB0aGlzLmdldFZhbHVlKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmdldFZhbHVlKCkuY2FsbCh0aGlzLm9iamVjdCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICApO1xuXG4gIHJldHVybiBGdW5jdGlvbkNvbnRyb2xsZXI7XG5cbn0pKGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyLFxuZGF0LmRvbS5kb20sXG5kYXQudXRpbHMuY29tbW9uKTtcblxuXG5kYXQuY29udHJvbGxlcnMuQm9vbGVhbkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKENvbnRyb2xsZXIsIGRvbSwgY29tbW9uKSB7XG5cbiAgLyoqXG4gICAqIEBjbGFzcyBQcm92aWRlcyBhIGNoZWNrYm94IGlucHV0IHRvIGFsdGVyIHRoZSBib29sZWFuIHByb3BlcnR5IG9mIGFuIG9iamVjdC5cbiAgICogQGV4dGVuZHMgZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXJcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICpcbiAgICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcbiAgICovXG4gIHZhciBCb29sZWFuQ29udHJvbGxlciA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHtcblxuICAgIEJvb2xlYW5Db250cm9sbGVyLnN1cGVyY2xhc3MuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5KTtcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdGhpcy5fX3ByZXYgPSB0aGlzLmdldFZhbHVlKCk7XG5cbiAgICB0aGlzLl9fY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHRoaXMuX19jaGVja2JveC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnY2hlY2tib3gnKTtcblxuXG4gICAgZG9tLmJpbmQodGhpcy5fX2NoZWNrYm94LCAnY2hhbmdlJywgb25DaGFuZ2UsIGZhbHNlKTtcblxuICAgIHRoaXMuZG9tRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9fY2hlY2tib3gpO1xuXG4gICAgLy8gTWF0Y2ggb3JpZ2luYWwgdmFsdWVcbiAgICB0aGlzLnVwZGF0ZURpc3BsYXkoKTtcblxuICAgIGZ1bmN0aW9uIG9uQ2hhbmdlKCkge1xuICAgICAgX3RoaXMuc2V0VmFsdWUoIV90aGlzLl9fcHJldik7XG4gICAgfVxuXG4gIH07XG5cbiAgQm9vbGVhbkNvbnRyb2xsZXIuc3VwZXJjbGFzcyA9IENvbnRyb2xsZXI7XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgQm9vbGVhbkNvbnRyb2xsZXIucHJvdG90eXBlLFxuICAgICAgQ29udHJvbGxlci5wcm90b3R5cGUsXG5cbiAgICAgIHtcblxuICAgICAgICBzZXRWYWx1ZTogZnVuY3Rpb24odikge1xuICAgICAgICAgIHZhciB0b1JldHVybiA9IEJvb2xlYW5Db250cm9sbGVyLnN1cGVyY2xhc3MucHJvdG90eXBlLnNldFZhbHVlLmNhbGwodGhpcywgdik7XG4gICAgICAgICAgaWYgKHRoaXMuX19vbkZpbmlzaENoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5fX29uRmluaXNoQ2hhbmdlLmNhbGwodGhpcywgdGhpcy5nZXRWYWx1ZSgpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fX3ByZXYgPSB0aGlzLmdldFZhbHVlKCk7XG4gICAgICAgICAgcmV0dXJuIHRvUmV0dXJuO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZURpc3BsYXk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIFxuICAgICAgICAgIGlmICh0aGlzLmdldFZhbHVlKCkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMuX19jaGVja2JveC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpO1xuICAgICAgICAgICAgdGhpcy5fX2NoZWNrYm94LmNoZWNrZWQgPSB0cnVlOyAgICBcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLl9fY2hlY2tib3guY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBCb29sZWFuQ29udHJvbGxlci5zdXBlcmNsYXNzLnByb3RvdHlwZS51cGRhdGVEaXNwbGF5LmNhbGwodGhpcyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgIH1cblxuICApO1xuXG4gIHJldHVybiBCb29sZWFuQ29udHJvbGxlcjtcblxufSkoZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXIsXG5kYXQuZG9tLmRvbSxcbmRhdC51dGlscy5jb21tb24pO1xuXG5cbmRhdC5jb2xvci50b1N0cmluZyA9IChmdW5jdGlvbiAoY29tbW9uKSB7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKGNvbG9yKSB7XG5cbiAgICBpZiAoY29sb3IuYSA9PSAxIHx8IGNvbW1vbi5pc1VuZGVmaW5lZChjb2xvci5hKSkge1xuXG4gICAgICB2YXIgcyA9IGNvbG9yLmhleC50b1N0cmluZygxNik7XG4gICAgICB3aGlsZSAocy5sZW5ndGggPCA2KSB7XG4gICAgICAgIHMgPSAnMCcgKyBzO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJyMnICsgcztcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHJldHVybiAncmdiYSgnICsgTWF0aC5yb3VuZChjb2xvci5yKSArICcsJyArIE1hdGgucm91bmQoY29sb3IuZykgKyAnLCcgKyBNYXRoLnJvdW5kKGNvbG9yLmIpICsgJywnICsgY29sb3IuYSArICcpJztcblxuICAgIH1cblxuICB9XG5cbn0pKGRhdC51dGlscy5jb21tb24pO1xuXG5cbmRhdC5jb2xvci5pbnRlcnByZXQgPSAoZnVuY3Rpb24gKHRvU3RyaW5nLCBjb21tb24pIHtcblxuICB2YXIgcmVzdWx0LCB0b1JldHVybjtcblxuICB2YXIgaW50ZXJwcmV0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICB0b1JldHVybiA9IGZhbHNlO1xuXG4gICAgdmFyIG9yaWdpbmFsID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBjb21tb24udG9BcnJheShhcmd1bWVudHMpIDogYXJndW1lbnRzWzBdO1xuXG4gICAgY29tbW9uLmVhY2goSU5URVJQUkVUQVRJT05TLCBmdW5jdGlvbihmYW1pbHkpIHtcblxuICAgICAgaWYgKGZhbWlseS5saXRtdXMob3JpZ2luYWwpKSB7XG5cbiAgICAgICAgY29tbW9uLmVhY2goZmFtaWx5LmNvbnZlcnNpb25zLCBmdW5jdGlvbihjb252ZXJzaW9uLCBjb252ZXJzaW9uTmFtZSkge1xuXG4gICAgICAgICAgcmVzdWx0ID0gY29udmVyc2lvbi5yZWFkKG9yaWdpbmFsKTtcblxuICAgICAgICAgIGlmICh0b1JldHVybiA9PT0gZmFsc2UgJiYgcmVzdWx0ICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgdG9SZXR1cm4gPSByZXN1bHQ7XG4gICAgICAgICAgICByZXN1bHQuY29udmVyc2lvbk5hbWUgPSBjb252ZXJzaW9uTmFtZTtcbiAgICAgICAgICAgIHJlc3VsdC5jb252ZXJzaW9uID0gY29udmVyc2lvbjtcbiAgICAgICAgICAgIHJldHVybiBjb21tb24uQlJFQUs7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGNvbW1vbi5CUkVBSztcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdG9SZXR1cm47XG5cbiAgfTtcblxuICB2YXIgSU5URVJQUkVUQVRJT05TID0gW1xuXG4gICAgLy8gU3RyaW5nc1xuICAgIHtcblxuICAgICAgbGl0bXVzOiBjb21tb24uaXNTdHJpbmcsXG5cbiAgICAgIGNvbnZlcnNpb25zOiB7XG5cbiAgICAgICAgVEhSRUVfQ0hBUl9IRVg6IHtcblxuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG5cbiAgICAgICAgICAgIHZhciB0ZXN0ID0gb3JpZ2luYWwubWF0Y2goL14jKFtBLUYwLTldKShbQS1GMC05XSkoW0EtRjAtOV0pJC9pKTtcbiAgICAgICAgICAgIGlmICh0ZXN0ID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnSEVYJyxcbiAgICAgICAgICAgICAgaGV4OiBwYXJzZUludChcbiAgICAgICAgICAgICAgICAgICcweCcgK1xuICAgICAgICAgICAgICAgICAgICAgIHRlc3RbMV0udG9TdHJpbmcoKSArIHRlc3RbMV0udG9TdHJpbmcoKSArXG4gICAgICAgICAgICAgICAgICAgICAgdGVzdFsyXS50b1N0cmluZygpICsgdGVzdFsyXS50b1N0cmluZygpICtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXN0WzNdLnRvU3RyaW5nKCkgKyB0ZXN0WzNdLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiB0b1N0cmluZ1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgU0lYX0NIQVJfSEVYOiB7XG5cbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuXG4gICAgICAgICAgICB2YXIgdGVzdCA9IG9yaWdpbmFsLm1hdGNoKC9eIyhbQS1GMC05XXs2fSkkL2kpO1xuICAgICAgICAgICAgaWYgKHRlc3QgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdIRVgnLFxuICAgICAgICAgICAgICBoZXg6IHBhcnNlSW50KCcweCcgKyB0ZXN0WzFdLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiB0b1N0cmluZ1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgQ1NTX1JHQjoge1xuXG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcblxuICAgICAgICAgICAgdmFyIHRlc3QgPSBvcmlnaW5hbC5tYXRjaCgvXnJnYlxcKFxccyooLispXFxzKixcXHMqKC4rKVxccyosXFxzKiguKylcXHMqXFwpLyk7XG4gICAgICAgICAgICBpZiAodGVzdCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICAgIHI6IHBhcnNlRmxvYXQodGVzdFsxXSksXG4gICAgICAgICAgICAgIGc6IHBhcnNlRmxvYXQodGVzdFsyXSksXG4gICAgICAgICAgICAgIGI6IHBhcnNlRmxvYXQodGVzdFszXSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IHRvU3RyaW5nXG5cbiAgICAgICAgfSxcblxuICAgICAgICBDU1NfUkdCQToge1xuXG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcblxuICAgICAgICAgICAgdmFyIHRlc3QgPSBvcmlnaW5hbC5tYXRjaCgvXnJnYmFcXChcXHMqKC4rKVxccyosXFxzKiguKylcXHMqLFxccyooLispXFxzKlxcLFxccyooLispXFxzKlxcKS8pO1xuICAgICAgICAgICAgaWYgKHRlc3QgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICByOiBwYXJzZUZsb2F0KHRlc3RbMV0pLFxuICAgICAgICAgICAgICBnOiBwYXJzZUZsb2F0KHRlc3RbMl0pLFxuICAgICAgICAgICAgICBiOiBwYXJzZUZsb2F0KHRlc3RbM10pLFxuICAgICAgICAgICAgICBhOiBwYXJzZUZsb2F0KHRlc3RbNF0pXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiB0b1N0cmluZ1xuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8vIE51bWJlcnNcbiAgICB7XG5cbiAgICAgIGxpdG11czogY29tbW9uLmlzTnVtYmVyLFxuXG4gICAgICBjb252ZXJzaW9uczoge1xuXG4gICAgICAgIEhFWDoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ0hFWCcsXG4gICAgICAgICAgICAgIGhleDogb3JpZ2luYWwsXG4gICAgICAgICAgICAgIGNvbnZlcnNpb25OYW1lOiAnSEVYJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBjb2xvci5oZXg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvLyBBcnJheXNcbiAgICB7XG5cbiAgICAgIGxpdG11czogY29tbW9uLmlzQXJyYXksXG5cbiAgICAgIGNvbnZlcnNpb25zOiB7XG5cbiAgICAgICAgUkdCX0FSUkFZOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChvcmlnaW5hbC5sZW5ndGggIT0gMykgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICByOiBvcmlnaW5hbFswXSxcbiAgICAgICAgICAgICAgZzogb3JpZ2luYWxbMV0sXG4gICAgICAgICAgICAgIGI6IG9yaWdpbmFsWzJdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBbY29sb3IuciwgY29sb3IuZywgY29sb3IuYl07XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgUkdCQV9BUlJBWToge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAob3JpZ2luYWwubGVuZ3RoICE9IDQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgcjogb3JpZ2luYWxbMF0sXG4gICAgICAgICAgICAgIGc6IG9yaWdpbmFsWzFdLFxuICAgICAgICAgICAgICBiOiBvcmlnaW5hbFsyXSxcbiAgICAgICAgICAgICAgYTogb3JpZ2luYWxbM11cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIFtjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iLCBjb2xvci5hXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgLy8gT2JqZWN0c1xuICAgIHtcblxuICAgICAgbGl0bXVzOiBjb21tb24uaXNPYmplY3QsXG5cbiAgICAgIGNvbnZlcnNpb25zOiB7XG5cbiAgICAgICAgUkdCQV9PQko6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgaWYgKGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5yKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5nKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5iKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5hKSkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgICByOiBvcmlnaW5hbC5yLFxuICAgICAgICAgICAgICAgIGc6IG9yaWdpbmFsLmcsXG4gICAgICAgICAgICAgICAgYjogb3JpZ2luYWwuYixcbiAgICAgICAgICAgICAgICBhOiBvcmlnaW5hbC5hXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICByOiBjb2xvci5yLFxuICAgICAgICAgICAgICBnOiBjb2xvci5nLFxuICAgICAgICAgICAgICBiOiBjb2xvci5iLFxuICAgICAgICAgICAgICBhOiBjb2xvci5hXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIFJHQl9PQko6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgaWYgKGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5yKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5nKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5iKSkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgICByOiBvcmlnaW5hbC5yLFxuICAgICAgICAgICAgICAgIGc6IG9yaWdpbmFsLmcsXG4gICAgICAgICAgICAgICAgYjogb3JpZ2luYWwuYlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgcjogY29sb3IucixcbiAgICAgICAgICAgICAgZzogY29sb3IuZyxcbiAgICAgICAgICAgICAgYjogY29sb3IuYlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBIU1ZBX09CSjoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmgpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnMpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnYpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmEpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3BhY2U6ICdIU1YnLFxuICAgICAgICAgICAgICAgIGg6IG9yaWdpbmFsLmgsXG4gICAgICAgICAgICAgICAgczogb3JpZ2luYWwucyxcbiAgICAgICAgICAgICAgICB2OiBvcmlnaW5hbC52LFxuICAgICAgICAgICAgICAgIGE6IG9yaWdpbmFsLmFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGg6IGNvbG9yLmgsXG4gICAgICAgICAgICAgIHM6IGNvbG9yLnMsXG4gICAgICAgICAgICAgIHY6IGNvbG9yLnYsXG4gICAgICAgICAgICAgIGE6IGNvbG9yLmFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgSFNWX09CSjoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmgpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnMpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnYpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3BhY2U6ICdIU1YnLFxuICAgICAgICAgICAgICAgIGg6IG9yaWdpbmFsLmgsXG4gICAgICAgICAgICAgICAgczogb3JpZ2luYWwucyxcbiAgICAgICAgICAgICAgICB2OiBvcmlnaW5hbC52XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBoOiBjb2xvci5oLFxuICAgICAgICAgICAgICBzOiBjb2xvci5zLFxuICAgICAgICAgICAgICB2OiBjb2xvci52XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfVxuXG5cbiAgXTtcblxuICByZXR1cm4gaW50ZXJwcmV0O1xuXG5cbn0pKGRhdC5jb2xvci50b1N0cmluZyxcbmRhdC51dGlscy5jb21tb24pO1xuXG5cbmRhdC5HVUkgPSBkYXQuZ3VpLkdVSSA9IChmdW5jdGlvbiAoY3NzLCBzYXZlRGlhbG9ndWVDb250ZW50cywgc3R5bGVTaGVldCwgY29udHJvbGxlckZhY3RvcnksIENvbnRyb2xsZXIsIEJvb2xlYW5Db250cm9sbGVyLCBGdW5jdGlvbkNvbnRyb2xsZXIsIE51bWJlckNvbnRyb2xsZXJCb3gsIE51bWJlckNvbnRyb2xsZXJTbGlkZXIsIE9wdGlvbkNvbnRyb2xsZXIsIENvbG9yQ29udHJvbGxlciwgcmVxdWVzdEFuaW1hdGlvbkZyYW1lLCBDZW50ZXJlZERpdiwgZG9tLCBjb21tb24pIHtcblxuICBjc3MuaW5qZWN0KHN0eWxlU2hlZXQpO1xuXG4gIC8qKiBPdXRlci1tb3N0IGNsYXNzTmFtZSBmb3IgR1VJJ3MgKi9cbiAgdmFyIENTU19OQU1FU1BBQ0UgPSAnZGcnO1xuXG4gIHZhciBISURFX0tFWV9DT0RFID0gNzI7XG5cbiAgLyoqIFRoZSBvbmx5IHZhbHVlIHNoYXJlZCBiZXR3ZWVuIHRoZSBKUyBhbmQgU0NTUy4gVXNlIGNhdXRpb24uICovXG4gIHZhciBDTE9TRV9CVVRUT05fSEVJR0hUID0gMjA7XG5cbiAgdmFyIERFRkFVTFRfREVGQVVMVF9QUkVTRVRfTkFNRSA9ICdEZWZhdWx0JztcblxuICB2YXIgU1VQUE9SVFNfTE9DQUxfU1RPUkFHRSA9IChmdW5jdGlvbigpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuICdsb2NhbFN0b3JhZ2UnIGluIHdpbmRvdyAmJiB3aW5kb3dbJ2xvY2FsU3RvcmFnZSddICE9PSBudWxsO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pKCk7XG5cbiAgdmFyIFNBVkVfRElBTE9HVUU7XG5cbiAgLyoqIEhhdmUgd2UgeWV0IHRvIGNyZWF0ZSBhbiBhdXRvUGxhY2UgR1VJPyAqL1xuICB2YXIgYXV0b19wbGFjZV92aXJnaW4gPSB0cnVlO1xuXG4gIC8qKiBGaXhlZCBwb3NpdGlvbiBkaXYgdGhhdCBhdXRvIHBsYWNlIEdVSSdzIGdvIGluc2lkZSAqL1xuICB2YXIgYXV0b19wbGFjZV9jb250YWluZXI7XG5cbiAgLyoqIEFyZSB3ZSBoaWRpbmcgdGhlIEdVSSdzID8gKi9cbiAgdmFyIGhpZGUgPSBmYWxzZTtcblxuICAvKiogR1VJJ3Mgd2hpY2ggc2hvdWxkIGJlIGhpZGRlbiAqL1xuICB2YXIgaGlkZWFibGVfZ3VpcyA9IFtdO1xuXG4gIC8qKlxuICAgKiBBIGxpZ2h0d2VpZ2h0IGNvbnRyb2xsZXIgbGlicmFyeSBmb3IgSmF2YVNjcmlwdC4gSXQgYWxsb3dzIHlvdSB0byBlYXNpbHlcbiAgICogbWFuaXB1bGF0ZSB2YXJpYWJsZXMgYW5kIGZpcmUgZnVuY3Rpb25zIG9uIHRoZSBmbHkuXG4gICAqIEBjbGFzc1xuICAgKlxuICAgKiBAbWVtYmVyIGRhdC5ndWlcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbcGFyYW1zLm5hbWVdIFRoZSBuYW1lIG9mIHRoaXMgR1VJLlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtcy5sb2FkXSBKU09OIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHNhdmVkIHN0YXRlIG9mXG4gICAqIHRoaXMgR1VJLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtwYXJhbXMuYXV0bz10cnVlXVxuICAgKiBAcGFyYW0ge2RhdC5ndWkuR1VJfSBbcGFyYW1zLnBhcmVudF0gVGhlIEdVSSBJJ20gbmVzdGVkIGluLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtwYXJhbXMuY2xvc2VkXSBJZiB0cnVlLCBzdGFydHMgY2xvc2VkXG4gICAqL1xuICB2YXIgR1VJID0gZnVuY3Rpb24ocGFyYW1zKSB7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgLyoqXG4gICAgICogT3V0ZXJtb3N0IERPTSBFbGVtZW50XG4gICAgICogQHR5cGUgRE9NRWxlbWVudFxuICAgICAqL1xuICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX191bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX191bCk7XG5cbiAgICBkb20uYWRkQ2xhc3ModGhpcy5kb21FbGVtZW50LCBDU1NfTkFNRVNQQUNFKTtcblxuICAgIC8qKlxuICAgICAqIE5lc3RlZCBHVUkncyBieSBuYW1lXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHRoaXMuX19mb2xkZXJzID0ge307XG5cbiAgICB0aGlzLl9fY29udHJvbGxlcnMgPSBbXTtcblxuICAgIC8qKlxuICAgICAqIExpc3Qgb2Ygb2JqZWN0cyBJJ20gcmVtZW1iZXJpbmcgZm9yIHNhdmUsIG9ubHkgdXNlZCBpbiB0b3AgbGV2ZWwgR1VJXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHRoaXMuX19yZW1lbWJlcmVkT2JqZWN0cyA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogTWFwcyB0aGUgaW5kZXggb2YgcmVtZW1iZXJlZCBvYmplY3RzIHRvIGEgbWFwIG9mIGNvbnRyb2xsZXJzLCBvbmx5IHVzZWRcbiAgICAgKiBpbiB0b3AgbGV2ZWwgR1VJLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAaWdub3JlXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIFtcbiAgICAgKiAge1xuICAgICAqICAgIHByb3BlcnR5TmFtZTogQ29udHJvbGxlcixcbiAgICAgKiAgICBhbm90aGVyUHJvcGVydHlOYW1lOiBDb250cm9sbGVyXG4gICAgICogIH0sXG4gICAgICogIHtcbiAgICAgKiAgICBwcm9wZXJ0eU5hbWU6IENvbnRyb2xsZXJcbiAgICAgKiAgfVxuICAgICAqIF1cbiAgICAgKi9cbiAgICB0aGlzLl9fcmVtZW1iZXJlZE9iamVjdEluZGVjZXNUb0NvbnRyb2xsZXJzID0gW107XG5cbiAgICB0aGlzLl9fbGlzdGVuaW5nID0gW107XG5cbiAgICBwYXJhbXMgPSBwYXJhbXMgfHwge307XG5cbiAgICAvLyBEZWZhdWx0IHBhcmFtZXRlcnNcbiAgICBwYXJhbXMgPSBjb21tb24uZGVmYXVsdHMocGFyYW1zLCB7XG4gICAgICBhdXRvUGxhY2U6IHRydWUsXG4gICAgICB3aWR0aDogR1VJLkRFRkFVTFRfV0lEVEhcbiAgICB9KTtcblxuICAgIHBhcmFtcyA9IGNvbW1vbi5kZWZhdWx0cyhwYXJhbXMsIHtcbiAgICAgIHJlc2l6YWJsZTogcGFyYW1zLmF1dG9QbGFjZSxcbiAgICAgIGhpZGVhYmxlOiBwYXJhbXMuYXV0b1BsYWNlXG4gICAgfSk7XG5cblxuICAgIGlmICghY29tbW9uLmlzVW5kZWZpbmVkKHBhcmFtcy5sb2FkKSkge1xuXG4gICAgICAvLyBFeHBsaWNpdCBwcmVzZXRcbiAgICAgIGlmIChwYXJhbXMucHJlc2V0KSBwYXJhbXMubG9hZC5wcmVzZXQgPSBwYXJhbXMucHJlc2V0O1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgcGFyYW1zLmxvYWQgPSB7IHByZXNldDogREVGQVVMVF9ERUZBVUxUX1BSRVNFVF9OQU1FIH07XG5cbiAgICB9XG5cbiAgICBpZiAoY29tbW9uLmlzVW5kZWZpbmVkKHBhcmFtcy5wYXJlbnQpICYmIHBhcmFtcy5oaWRlYWJsZSkge1xuICAgICAgaGlkZWFibGVfZ3Vpcy5wdXNoKHRoaXMpO1xuICAgIH1cblxuICAgIC8vIE9ubHkgcm9vdCBsZXZlbCBHVUkncyBhcmUgcmVzaXphYmxlLlxuICAgIHBhcmFtcy5yZXNpemFibGUgPSBjb21tb24uaXNVbmRlZmluZWQocGFyYW1zLnBhcmVudCkgJiYgcGFyYW1zLnJlc2l6YWJsZTtcblxuXG4gICAgaWYgKHBhcmFtcy5hdXRvUGxhY2UgJiYgY29tbW9uLmlzVW5kZWZpbmVkKHBhcmFtcy5zY3JvbGxhYmxlKSkge1xuICAgICAgcGFyYW1zLnNjcm9sbGFibGUgPSB0cnVlO1xuICAgIH1cbi8vICAgIHBhcmFtcy5zY3JvbGxhYmxlID0gY29tbW9uLmlzVW5kZWZpbmVkKHBhcmFtcy5wYXJlbnQpICYmIHBhcmFtcy5zY3JvbGxhYmxlID09PSB0cnVlO1xuXG4gICAgLy8gTm90IHBhcnQgb2YgcGFyYW1zIGJlY2F1c2UgSSBkb24ndCB3YW50IHBlb3BsZSBwYXNzaW5nIHRoaXMgaW4gdmlhXG4gICAgLy8gY29uc3RydWN0b3IuIFNob3VsZCBiZSBhICdyZW1lbWJlcmVkJyB2YWx1ZS5cbiAgICB2YXIgdXNlX2xvY2FsX3N0b3JhZ2UgPVxuICAgICAgICBTVVBQT1JUU19MT0NBTF9TVE9SQUdFICYmXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShnZXRMb2NhbFN0b3JhZ2VIYXNoKHRoaXMsICdpc0xvY2FsJykpID09PSAndHJ1ZSc7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLFxuXG4gICAgICAgIC8qKiBAbGVuZHMgZGF0Lmd1aS5HVUkucHJvdG90eXBlICovXG4gICAgICAgIHtcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIFRoZSBwYXJlbnQgPGNvZGU+R1VJPC9jb2RlPlxuICAgICAgICAgICAqIEB0eXBlIGRhdC5ndWkuR1VJXG4gICAgICAgICAgICovXG4gICAgICAgICAgcGFyZW50OiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zLnBhcmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgc2Nyb2xsYWJsZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcy5zY3JvbGxhYmxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBIYW5kbGVzIDxjb2RlPkdVSTwvY29kZT4ncyBlbGVtZW50IHBsYWNlbWVudCBmb3IgeW91XG4gICAgICAgICAgICogQHR5cGUgQm9vbGVhblxuICAgICAgICAgICAqL1xuICAgICAgICAgIGF1dG9QbGFjZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcy5hdXRvUGxhY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIFRoZSBpZGVudGlmaWVyIGZvciBhIHNldCBvZiBzYXZlZCB2YWx1ZXNcbiAgICAgICAgICAgKiBAdHlwZSBTdHJpbmdcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBwcmVzZXQ6IHtcblxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKF90aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5nZXRSb290KCkucHJlc2V0O1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJhbXMubG9hZC5wcmVzZXQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odikge1xuICAgICAgICAgICAgICBpZiAoX3RoaXMucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuZ2V0Um9vdCgpLnByZXNldCA9IHY7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmxvYWQucHJlc2V0ID0gdjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzZXRQcmVzZXRTZWxlY3RJbmRleCh0aGlzKTtcbiAgICAgICAgICAgICAgX3RoaXMucmV2ZXJ0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogVGhlIHdpZHRoIG9mIDxjb2RlPkdVSTwvY29kZT4gZWxlbWVudFxuICAgICAgICAgICAqIEB0eXBlIE51bWJlclxuICAgICAgICAgICAqL1xuICAgICAgICAgIHdpZHRoOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zLndpZHRoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odikge1xuICAgICAgICAgICAgICBwYXJhbXMud2lkdGggPSB2O1xuICAgICAgICAgICAgICBzZXRXaWR0aChfdGhpcywgdik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIFRoZSBuYW1lIG9mIDxjb2RlPkdVSTwvY29kZT4uIFVzZWQgZm9yIGZvbGRlcnMuIGkuZVxuICAgICAgICAgICAqIGEgZm9sZGVyJ3MgbmFtZVxuICAgICAgICAgICAqIEB0eXBlIFN0cmluZ1xuICAgICAgICAgICAqL1xuICAgICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwYXJhbXMubmFtZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICAgICAgLy8gVE9ETyBDaGVjayBmb3IgY29sbGlzaW9ucyBhbW9uZyBzaWJsaW5nIGZvbGRlcnNcbiAgICAgICAgICAgICAgcGFyYW1zLm5hbWUgPSB2O1xuICAgICAgICAgICAgICBpZiAodGl0bGVfcm93X25hbWUpIHtcbiAgICAgICAgICAgICAgICB0aXRsZV9yb3dfbmFtZS5pbm5lckhUTUwgPSBwYXJhbXMubmFtZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBXaGV0aGVyIHRoZSA8Y29kZT5HVUk8L2NvZGU+IGlzIGNvbGxhcHNlZCBvciBub3RcbiAgICAgICAgICAgKiBAdHlwZSBCb29sZWFuXG4gICAgICAgICAgICovXG4gICAgICAgICAgY2xvc2VkOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zLmNsb3NlZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICAgICAgcGFyYW1zLmNsb3NlZCA9IHY7XG4gICAgICAgICAgICAgIGlmIChwYXJhbXMuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgZG9tLmFkZENsYXNzKF90aGlzLl9fdWwsIEdVSS5DTEFTU19DTE9TRUQpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbS5yZW1vdmVDbGFzcyhfdGhpcy5fX3VsLCBHVUkuQ0xBU1NfQ0xPU0VEKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBGb3IgYnJvd3NlcnMgdGhhdCBhcmVuJ3QgZ29pbmcgdG8gcmVzcGVjdCB0aGUgQ1NTIHRyYW5zaXRpb24sXG4gICAgICAgICAgICAgIC8vIExldHMganVzdCBjaGVjayBvdXIgaGVpZ2h0IGFnYWluc3QgdGhlIHdpbmRvdyBoZWlnaHQgcmlnaHQgb2ZmXG4gICAgICAgICAgICAgIC8vIHRoZSBiYXQuXG4gICAgICAgICAgICAgIHRoaXMub25SZXNpemUoKTtcblxuICAgICAgICAgICAgICBpZiAoX3RoaXMuX19jbG9zZUJ1dHRvbikge1xuICAgICAgICAgICAgICAgIF90aGlzLl9fY2xvc2VCdXR0b24uaW5uZXJIVE1MID0gdiA/IEdVSS5URVhUX09QRU4gOiBHVUkuVEVYVF9DTE9TRUQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogQ29udGFpbnMgYWxsIHByZXNldHNcbiAgICAgICAgICAgKiBAdHlwZSBPYmplY3RcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBsb2FkOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zLmxvYWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIERldGVybWluZXMgd2hldGhlciBvciBub3QgdG8gdXNlIDxhIGhyZWY9XCJodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9ET00vU3RvcmFnZSNsb2NhbFN0b3JhZ2VcIj5sb2NhbFN0b3JhZ2U8L2E+IGFzIHRoZSBtZWFucyBmb3JcbiAgICAgICAgICAgKiA8Y29kZT5yZW1lbWJlcjwvY29kZT5pbmdcbiAgICAgICAgICAgKiBAdHlwZSBCb29sZWFuXG4gICAgICAgICAgICovXG4gICAgICAgICAgdXNlTG9jYWxTdG9yYWdlOiB7XG5cbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiB1c2VfbG9jYWxfc3RvcmFnZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKGJvb2wpIHtcbiAgICAgICAgICAgICAgaWYgKFNVUFBPUlRTX0xPQ0FMX1NUT1JBR0UpIHtcbiAgICAgICAgICAgICAgICB1c2VfbG9jYWxfc3RvcmFnZSA9IGJvb2w7XG4gICAgICAgICAgICAgICAgaWYgKGJvb2wpIHtcbiAgICAgICAgICAgICAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ3VubG9hZCcsIHNhdmVUb0xvY2FsU3RvcmFnZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGRvbS51bmJpbmQod2luZG93LCAndW5sb2FkJywgc2F2ZVRvTG9jYWxTdG9yYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oZ2V0TG9jYWxTdG9yYWdlSGFzaChfdGhpcywgJ2lzTG9jYWwnKSwgYm9vbCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgIC8vIEFyZSB3ZSBhIHJvb3QgbGV2ZWwgR1VJP1xuICAgIGlmIChjb21tb24uaXNVbmRlZmluZWQocGFyYW1zLnBhcmVudCkpIHtcblxuICAgICAgcGFyYW1zLmNsb3NlZCA9IGZhbHNlO1xuXG4gICAgICBkb20uYWRkQ2xhc3ModGhpcy5kb21FbGVtZW50LCBHVUkuQ0xBU1NfTUFJTik7XG4gICAgICBkb20ubWFrZVNlbGVjdGFibGUodGhpcy5kb21FbGVtZW50LCBmYWxzZSk7XG5cbiAgICAgIC8vIEFyZSB3ZSBzdXBwb3NlZCB0byBiZSBsb2FkaW5nIGxvY2FsbHk/XG4gICAgICBpZiAoU1VQUE9SVFNfTE9DQUxfU1RPUkFHRSkge1xuXG4gICAgICAgIGlmICh1c2VfbG9jYWxfc3RvcmFnZSkge1xuXG4gICAgICAgICAgX3RoaXMudXNlTG9jYWxTdG9yYWdlID0gdHJ1ZTtcblxuICAgICAgICAgIHZhciBzYXZlZF9ndWkgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShnZXRMb2NhbFN0b3JhZ2VIYXNoKHRoaXMsICdndWknKSk7XG5cbiAgICAgICAgICBpZiAoc2F2ZWRfZ3VpKSB7XG4gICAgICAgICAgICBwYXJhbXMubG9hZCA9IEpTT04ucGFyc2Uoc2F2ZWRfZ3VpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX19jbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdGhpcy5fX2Nsb3NlQnV0dG9uLmlubmVySFRNTCA9IEdVSS5URVhUX0NMT1NFRDtcbiAgICAgIGRvbS5hZGRDbGFzcyh0aGlzLl9fY2xvc2VCdXR0b24sIEdVSS5DTEFTU19DTE9TRV9CVVRUT04pO1xuICAgICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX19jbG9zZUJ1dHRvbik7XG5cbiAgICAgIGRvbS5iaW5kKHRoaXMuX19jbG9zZUJ1dHRvbiwgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgX3RoaXMuY2xvc2VkID0gIV90aGlzLmNsb3NlZDtcblxuXG4gICAgICB9KTtcblxuXG4gICAgICAvLyBPaCwgeW91J3JlIGEgbmVzdGVkIEdVSSFcbiAgICB9IGVsc2Uge1xuXG4gICAgICBpZiAocGFyYW1zLmNsb3NlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHBhcmFtcy5jbG9zZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGl0bGVfcm93X25hbWUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShwYXJhbXMubmFtZSk7XG4gICAgICBkb20uYWRkQ2xhc3ModGl0bGVfcm93X25hbWUsICdjb250cm9sbGVyLW5hbWUnKTtcblxuICAgICAgdmFyIHRpdGxlX3JvdyA9IGFkZFJvdyhfdGhpcywgdGl0bGVfcm93X25hbWUpO1xuXG4gICAgICB2YXIgb25fY2xpY2tfdGl0bGUgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgX3RoaXMuY2xvc2VkID0gIV90aGlzLmNsb3NlZDtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfTtcblxuICAgICAgZG9tLmFkZENsYXNzKHRoaXMuX191bCwgR1VJLkNMQVNTX0NMT1NFRCk7XG5cbiAgICAgIGRvbS5hZGRDbGFzcyh0aXRsZV9yb3csICd0aXRsZScpO1xuICAgICAgZG9tLmJpbmQodGl0bGVfcm93LCAnY2xpY2snLCBvbl9jbGlja190aXRsZSk7XG5cbiAgICAgIGlmICghcGFyYW1zLmNsb3NlZCkge1xuICAgICAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgaWYgKHBhcmFtcy5hdXRvUGxhY2UpIHtcblxuICAgICAgaWYgKGNvbW1vbi5pc1VuZGVmaW5lZChwYXJhbXMucGFyZW50KSkge1xuXG4gICAgICAgIGlmIChhdXRvX3BsYWNlX3Zpcmdpbikge1xuICAgICAgICAgIGF1dG9fcGxhY2VfY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgZG9tLmFkZENsYXNzKGF1dG9fcGxhY2VfY29udGFpbmVyLCBDU1NfTkFNRVNQQUNFKTtcbiAgICAgICAgICBkb20uYWRkQ2xhc3MoYXV0b19wbGFjZV9jb250YWluZXIsIEdVSS5DTEFTU19BVVRPX1BMQUNFX0NPTlRBSU5FUik7XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhdXRvX3BsYWNlX2NvbnRhaW5lcik7XG4gICAgICAgICAgYXV0b19wbGFjZV92aXJnaW4gPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFB1dCBpdCBpbiB0aGUgZG9tIGZvciB5b3UuXG4gICAgICAgIGF1dG9fcGxhY2VfY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuZG9tRWxlbWVudCk7XG5cbiAgICAgICAgLy8gQXBwbHkgdGhlIGF1dG8gc3R5bGVzXG4gICAgICAgIGRvbS5hZGRDbGFzcyh0aGlzLmRvbUVsZW1lbnQsIEdVSS5DTEFTU19BVVRPX1BMQUNFKTtcblxuICAgICAgfVxuXG5cbiAgICAgIC8vIE1ha2UgaXQgbm90IGVsYXN0aWMuXG4gICAgICBpZiAoIXRoaXMucGFyZW50KSBzZXRXaWR0aChfdGhpcywgcGFyYW1zLndpZHRoKTtcblxuICAgIH1cblxuICAgIGRvbS5iaW5kKHdpbmRvdywgJ3Jlc2l6ZScsIGZ1bmN0aW9uKCkgeyBfdGhpcy5vblJlc2l6ZSgpIH0pO1xuICAgIGRvbS5iaW5kKHRoaXMuX191bCwgJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBmdW5jdGlvbigpIHsgX3RoaXMub25SZXNpemUoKTsgfSk7XG4gICAgZG9tLmJpbmQodGhpcy5fX3VsLCAndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uKCkgeyBfdGhpcy5vblJlc2l6ZSgpIH0pO1xuICAgIGRvbS5iaW5kKHRoaXMuX191bCwgJ29UcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24oKSB7IF90aGlzLm9uUmVzaXplKCkgfSk7XG4gICAgdGhpcy5vblJlc2l6ZSgpO1xuXG5cbiAgICBpZiAocGFyYW1zLnJlc2l6YWJsZSkge1xuICAgICAgYWRkUmVzaXplSGFuZGxlKHRoaXMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNhdmVUb0xvY2FsU3RvcmFnZSgpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGdldExvY2FsU3RvcmFnZUhhc2goX3RoaXMsICdndWknKSwgSlNPTi5zdHJpbmdpZnkoX3RoaXMuZ2V0U2F2ZU9iamVjdCgpKSk7XG4gICAgfVxuXG4gICAgdmFyIHJvb3QgPSBfdGhpcy5nZXRSb290KCk7XG4gICAgZnVuY3Rpb24gcmVzZXRXaWR0aCgpIHtcbiAgICAgICAgdmFyIHJvb3QgPSBfdGhpcy5nZXRSb290KCk7XG4gICAgICAgIHJvb3Qud2lkdGggKz0gMTtcbiAgICAgICAgY29tbW9uLmRlZmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJvb3Qud2lkdGggLT0gMTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghcGFyYW1zLnBhcmVudCkge1xuICAgICAgICByZXNldFdpZHRoKCk7XG4gICAgICB9XG5cbiAgfTtcblxuICBHVUkudG9nZ2xlSGlkZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgaGlkZSA9ICFoaWRlO1xuICAgIGNvbW1vbi5lYWNoKGhpZGVhYmxlX2d1aXMsIGZ1bmN0aW9uKGd1aSkge1xuICAgICAgZ3VpLmRvbUVsZW1lbnQuc3R5bGUuekluZGV4ID0gaGlkZSA/IC05OTkgOiA5OTk7XG4gICAgICBndWkuZG9tRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gaGlkZSA/IDAgOiAxO1xuICAgIH0pO1xuICB9O1xuXG4gIEdVSS5DTEFTU19BVVRPX1BMQUNFID0gJ2EnO1xuICBHVUkuQ0xBU1NfQVVUT19QTEFDRV9DT05UQUlORVIgPSAnYWMnO1xuICBHVUkuQ0xBU1NfTUFJTiA9ICdtYWluJztcbiAgR1VJLkNMQVNTX0NPTlRST0xMRVJfUk9XID0gJ2NyJztcbiAgR1VJLkNMQVNTX1RPT19UQUxMID0gJ3RhbGxlci10aGFuLXdpbmRvdyc7XG4gIEdVSS5DTEFTU19DTE9TRUQgPSAnY2xvc2VkJztcbiAgR1VJLkNMQVNTX0NMT1NFX0JVVFRPTiA9ICdjbG9zZS1idXR0b24nO1xuICBHVUkuQ0xBU1NfRFJBRyA9ICdkcmFnJztcblxuICBHVUkuREVGQVVMVF9XSURUSCA9IDI0NTtcbiAgR1VJLlRFWFRfQ0xPU0VEID0gJ0Nsb3NlIENvbnRyb2xzJztcbiAgR1VJLlRFWFRfT1BFTiA9ICdPcGVuIENvbnRyb2xzJztcblxuICBkb20uYmluZCh3aW5kb3csICdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuXG4gICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQudHlwZSAhPT0gJ3RleHQnICYmXG4gICAgICAgIChlLndoaWNoID09PSBISURFX0tFWV9DT0RFIHx8IGUua2V5Q29kZSA9PSBISURFX0tFWV9DT0RFKSkge1xuICAgICAgR1VJLnRvZ2dsZUhpZGUoKTtcbiAgICB9XG5cbiAgfSwgZmFsc2UpO1xuXG4gIGNvbW1vbi5leHRlbmQoXG5cbiAgICAgIEdVSS5wcm90b3R5cGUsXG5cbiAgICAgIC8qKiBAbGVuZHMgZGF0Lmd1aS5HVUkgKi9cbiAgICAgIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIG9iamVjdFxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlcbiAgICAgICAgICogQHJldHVybnMge2RhdC5jb250cm9sbGVycy5Db250cm9sbGVyfSBUaGUgbmV3IGNvbnRyb2xsZXIgdGhhdCB3YXMgYWRkZWQuXG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgYWRkOiBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7XG5cbiAgICAgICAgICByZXR1cm4gYWRkKFxuICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICBvYmplY3QsXG4gICAgICAgICAgICAgIHByb3BlcnR5LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmFjdG9yeUFyZ3M6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIG9iamVjdFxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlcbiAgICAgICAgICogQHJldHVybnMge2RhdC5jb250cm9sbGVycy5Db2xvckNvbnRyb2xsZXJ9IFRoZSBuZXcgY29udHJvbGxlciB0aGF0IHdhcyBhZGRlZC5cbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBhZGRDb2xvcjogZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkge1xuXG4gICAgICAgICAgcmV0dXJuIGFkZChcbiAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgb2JqZWN0LFxuICAgICAgICAgICAgICBwcm9wZXJ0eSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbG9yOiB0cnVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSBjb250cm9sbGVyXG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbihjb250cm9sbGVyKSB7XG5cbiAgICAgICAgICAvLyBUT0RPIGxpc3RlbmluZz9cbiAgICAgICAgICB0aGlzLl9fdWwucmVtb3ZlQ2hpbGQoY29udHJvbGxlci5fX2xpKTtcbiAgICAgICAgICB0aGlzLl9fY29udHJvbGxlcnMuc2xpY2UodGhpcy5fX2NvbnRyb2xsZXJzLmluZGV4T2YoY29udHJvbGxlciksIDEpO1xuICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgY29tbW9uLmRlZmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgX3RoaXMub25SZXNpemUoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgaWYgKHRoaXMuYXV0b1BsYWNlKSB7XG4gICAgICAgICAgICBhdXRvX3BsYWNlX2NvbnRhaW5lci5yZW1vdmVDaGlsZCh0aGlzLmRvbUVsZW1lbnQpO1xuICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAgICAgKiBAcmV0dXJucyB7ZGF0Lmd1aS5HVUl9IFRoZSBuZXcgZm9sZGVyLlxuICAgICAgICAgKiBAdGhyb3dzIHtFcnJvcn0gaWYgdGhpcyBHVUkgYWxyZWFkeSBoYXMgYSBmb2xkZXIgYnkgdGhlIHNwZWNpZmllZFxuICAgICAgICAgKiBuYW1lXG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgYWRkRm9sZGVyOiBmdW5jdGlvbihuYW1lKSB7XG5cbiAgICAgICAgICAvLyBXZSBoYXZlIHRvIHByZXZlbnQgY29sbGlzaW9ucyBvbiBuYW1lcyBpbiBvcmRlciB0byBoYXZlIGEga2V5XG4gICAgICAgICAgLy8gYnkgd2hpY2ggdG8gcmVtZW1iZXIgc2F2ZWQgdmFsdWVzXG4gICAgICAgICAgaWYgKHRoaXMuX19mb2xkZXJzW25hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IGFscmVhZHkgaGF2ZSBhIGZvbGRlciBpbiB0aGlzIEdVSSBieSB0aGUnICtcbiAgICAgICAgICAgICAgICAnIG5hbWUgXCInICsgbmFtZSArICdcIicpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBuZXdfZ3VpX3BhcmFtcyA9IHsgbmFtZTogbmFtZSwgcGFyZW50OiB0aGlzIH07XG5cbiAgICAgICAgICAvLyBXZSBuZWVkIHRvIHBhc3MgZG93biB0aGUgYXV0b1BsYWNlIHRyYWl0IHNvIHRoYXQgd2UgY2FuXG4gICAgICAgICAgLy8gYXR0YWNoIGV2ZW50IGxpc3RlbmVycyB0byBvcGVuL2Nsb3NlIGZvbGRlciBhY3Rpb25zIHRvXG4gICAgICAgICAgLy8gZW5zdXJlIHRoYXQgYSBzY3JvbGxiYXIgYXBwZWFycyBpZiB0aGUgd2luZG93IGlzIHRvbyBzaG9ydC5cbiAgICAgICAgICBuZXdfZ3VpX3BhcmFtcy5hdXRvUGxhY2UgPSB0aGlzLmF1dG9QbGFjZTtcblxuICAgICAgICAgIC8vIERvIHdlIGhhdmUgc2F2ZWQgYXBwZWFyYW5jZSBkYXRhIGZvciB0aGlzIGZvbGRlcj9cblxuICAgICAgICAgIGlmICh0aGlzLmxvYWQgJiYgLy8gQW55dGhpbmcgbG9hZGVkP1xuICAgICAgICAgICAgICB0aGlzLmxvYWQuZm9sZGVycyAmJiAvLyBXYXMgbXkgcGFyZW50IGEgZGVhZC1lbmQ/XG4gICAgICAgICAgICAgIHRoaXMubG9hZC5mb2xkZXJzW25hbWVdKSB7IC8vIERpZCBkYWRkeSByZW1lbWJlciBtZT9cblxuICAgICAgICAgICAgLy8gU3RhcnQgbWUgY2xvc2VkIGlmIEkgd2FzIGNsb3NlZFxuICAgICAgICAgICAgbmV3X2d1aV9wYXJhbXMuY2xvc2VkID0gdGhpcy5sb2FkLmZvbGRlcnNbbmFtZV0uY2xvc2VkO1xuXG4gICAgICAgICAgICAvLyBQYXNzIGRvd24gdGhlIGxvYWRlZCBkYXRhXG4gICAgICAgICAgICBuZXdfZ3VpX3BhcmFtcy5sb2FkID0gdGhpcy5sb2FkLmZvbGRlcnNbbmFtZV07XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgZ3VpID0gbmV3IEdVSShuZXdfZ3VpX3BhcmFtcyk7XG4gICAgICAgICAgdGhpcy5fX2ZvbGRlcnNbbmFtZV0gPSBndWk7XG5cbiAgICAgICAgICB2YXIgbGkgPSBhZGRSb3codGhpcywgZ3VpLmRvbUVsZW1lbnQpO1xuICAgICAgICAgIGRvbS5hZGRDbGFzcyhsaSwgJ2ZvbGRlcicpO1xuICAgICAgICAgIHJldHVybiBndWk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBvcGVuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGlzLmNsb3NlZCA9IHRydWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgb25SZXNpemU6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgdmFyIHJvb3QgPSB0aGlzLmdldFJvb3QoKTtcblxuICAgICAgICAgIGlmIChyb290LnNjcm9sbGFibGUpIHtcblxuICAgICAgICAgICAgdmFyIHRvcCA9IGRvbS5nZXRPZmZzZXQocm9vdC5fX3VsKS50b3A7XG4gICAgICAgICAgICB2YXIgaCA9IDA7XG5cbiAgICAgICAgICAgIGNvbW1vbi5lYWNoKHJvb3QuX191bC5jaGlsZE5vZGVzLCBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgICAgIGlmICghIChyb290LmF1dG9QbGFjZSAmJiBub2RlID09PSByb290Ll9fc2F2ZV9yb3cpKVxuICAgICAgICAgICAgICAgIGggKz0gZG9tLmdldEhlaWdodChub2RlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAod2luZG93LmlubmVySGVpZ2h0IC0gdG9wIC0gQ0xPU0VfQlVUVE9OX0hFSUdIVCA8IGgpIHtcbiAgICAgICAgICAgICAgZG9tLmFkZENsYXNzKHJvb3QuZG9tRWxlbWVudCwgR1VJLkNMQVNTX1RPT19UQUxMKTtcbiAgICAgICAgICAgICAgcm9vdC5fX3VsLnN0eWxlLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIHRvcCAtIENMT1NFX0JVVFRPTl9IRUlHSFQgKyAncHgnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZG9tLnJlbW92ZUNsYXNzKHJvb3QuZG9tRWxlbWVudCwgR1VJLkNMQVNTX1RPT19UQUxMKTtcbiAgICAgICAgICAgICAgcm9vdC5fX3VsLnN0eWxlLmhlaWdodCA9ICdhdXRvJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChyb290Ll9fcmVzaXplX2hhbmRsZSkge1xuICAgICAgICAgICAgY29tbW9uLmRlZmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByb290Ll9fcmVzaXplX2hhbmRsZS5zdHlsZS5oZWlnaHQgPSByb290Ll9fdWwub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChyb290Ll9fY2xvc2VCdXR0b24pIHtcbiAgICAgICAgICAgIHJvb3QuX19jbG9zZUJ1dHRvbi5zdHlsZS53aWR0aCA9IHJvb3Qud2lkdGggKyAncHgnO1xuICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNYXJrIG9iamVjdHMgZm9yIHNhdmluZy4gVGhlIG9yZGVyIG9mIHRoZXNlIG9iamVjdHMgY2Fubm90IGNoYW5nZSBhc1xuICAgICAgICAgKiB0aGUgR1VJIGdyb3dzLiBXaGVuIHJlbWVtYmVyaW5nIG5ldyBvYmplY3RzLCBhcHBlbmQgdGhlbSB0byB0aGUgZW5kXG4gICAgICAgICAqIG9mIHRoZSBsaXN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdC4uLn0gb2JqZWN0c1xuICAgICAgICAgKiBAdGhyb3dzIHtFcnJvcn0gaWYgbm90IGNhbGxlZCBvbiBhIHRvcCBsZXZlbCBHVUkuXG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgcmVtZW1iZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgaWYgKGNvbW1vbi5pc1VuZGVmaW5lZChTQVZFX0RJQUxPR1VFKSkge1xuICAgICAgICAgICAgU0FWRV9ESUFMT0dVRSA9IG5ldyBDZW50ZXJlZERpdigpO1xuICAgICAgICAgICAgU0FWRV9ESUFMT0dVRS5kb21FbGVtZW50LmlubmVySFRNTCA9IHNhdmVEaWFsb2d1ZUNvbnRlbnRzO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWW91IGNhbiBvbmx5IGNhbGwgcmVtZW1iZXIgb24gYSB0b3AgbGV2ZWwgR1VJLlwiKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgY29tbW9uLmVhY2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSwgZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgICAgICAgICBpZiAoX3RoaXMuX19yZW1lbWJlcmVkT2JqZWN0cy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICBhZGRTYXZlTWVudShfdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoX3RoaXMuX19yZW1lbWJlcmVkT2JqZWN0cy5pbmRleE9mKG9iamVjdCkgPT0gLTEpIHtcbiAgICAgICAgICAgICAgX3RoaXMuX19yZW1lbWJlcmVkT2JqZWN0cy5wdXNoKG9iamVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAodGhpcy5hdXRvUGxhY2UpIHtcbiAgICAgICAgICAgIC8vIFNldCBzYXZlIHJvdyB3aWR0aFxuICAgICAgICAgICAgc2V0V2lkdGgodGhpcywgdGhpcy53aWR0aCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm5zIHtkYXQuZ3VpLkdVSX0gdGhlIHRvcG1vc3QgcGFyZW50IEdVSSBvZiBhIG5lc3RlZCBHVUkuXG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0Um9vdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGd1aSA9IHRoaXM7XG4gICAgICAgICAgd2hpbGUgKGd1aS5wYXJlbnQpIHtcbiAgICAgICAgICAgIGd1aSA9IGd1aS5wYXJlbnQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBndWk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3R9IGEgSlNPTiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50IHN0YXRlIG9mXG4gICAgICAgICAqIHRoaXMgR1VJIGFzIHdlbGwgYXMgaXRzIHJlbWVtYmVyZWQgcHJvcGVydGllcy5cbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBnZXRTYXZlT2JqZWN0OiBmdW5jdGlvbigpIHtcblxuICAgICAgICAgIHZhciB0b1JldHVybiA9IHRoaXMubG9hZDtcblxuICAgICAgICAgIHRvUmV0dXJuLmNsb3NlZCA9IHRoaXMuY2xvc2VkO1xuXG4gICAgICAgICAgLy8gQW0gSSByZW1lbWJlcmluZyBhbnkgdmFsdWVzP1xuICAgICAgICAgIGlmICh0aGlzLl9fcmVtZW1iZXJlZE9iamVjdHMubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICB0b1JldHVybi5wcmVzZXQgPSB0aGlzLnByZXNldDtcblxuICAgICAgICAgICAgaWYgKCF0b1JldHVybi5yZW1lbWJlcmVkKSB7XG4gICAgICAgICAgICAgIHRvUmV0dXJuLnJlbWVtYmVyZWQgPSB7fTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdG9SZXR1cm4ucmVtZW1iZXJlZFt0aGlzLnByZXNldF0gPSBnZXRDdXJyZW50UHJlc2V0KHRoaXMpO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdG9SZXR1cm4uZm9sZGVycyA9IHt9O1xuICAgICAgICAgIGNvbW1vbi5lYWNoKHRoaXMuX19mb2xkZXJzLCBmdW5jdGlvbihlbGVtZW50LCBrZXkpIHtcbiAgICAgICAgICAgIHRvUmV0dXJuLmZvbGRlcnNba2V5XSA9IGVsZW1lbnQuZ2V0U2F2ZU9iamVjdCgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIHRvUmV0dXJuO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2F2ZTogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICBpZiAoIXRoaXMubG9hZC5yZW1lbWJlcmVkKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWQucmVtZW1iZXJlZCA9IHt9O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMubG9hZC5yZW1lbWJlcmVkW3RoaXMucHJlc2V0XSA9IGdldEN1cnJlbnRQcmVzZXQodGhpcyk7XG4gICAgICAgICAgbWFya1ByZXNldE1vZGlmaWVkKHRoaXMsIGZhbHNlKTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIHNhdmVBczogZnVuY3Rpb24ocHJlc2V0TmFtZSkge1xuXG4gICAgICAgICAgaWYgKCF0aGlzLmxvYWQucmVtZW1iZXJlZCkge1xuXG4gICAgICAgICAgICAvLyBSZXRhaW4gZGVmYXVsdCB2YWx1ZXMgdXBvbiBmaXJzdCBzYXZlXG4gICAgICAgICAgICB0aGlzLmxvYWQucmVtZW1iZXJlZCA9IHt9O1xuICAgICAgICAgICAgdGhpcy5sb2FkLnJlbWVtYmVyZWRbREVGQVVMVF9ERUZBVUxUX1BSRVNFVF9OQU1FXSA9IGdldEN1cnJlbnRQcmVzZXQodGhpcywgdHJ1ZSk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmxvYWQucmVtZW1iZXJlZFtwcmVzZXROYW1lXSA9IGdldEN1cnJlbnRQcmVzZXQodGhpcyk7XG4gICAgICAgICAgdGhpcy5wcmVzZXQgPSBwcmVzZXROYW1lO1xuICAgICAgICAgIGFkZFByZXNldE9wdGlvbih0aGlzLCBwcmVzZXROYW1lLCB0cnVlKTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIHJldmVydDogZnVuY3Rpb24oZ3VpKSB7XG5cbiAgICAgICAgICBjb21tb24uZWFjaCh0aGlzLl9fY29udHJvbGxlcnMsIGZ1bmN0aW9uKGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIC8vIE1ha2UgcmV2ZXJ0IHdvcmsgb24gRGVmYXVsdC5cbiAgICAgICAgICAgIGlmICghdGhpcy5nZXRSb290KCkubG9hZC5yZW1lbWJlcmVkKSB7XG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIuc2V0VmFsdWUoY29udHJvbGxlci5pbml0aWFsVmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVjYWxsU2F2ZWRWYWx1ZShndWkgfHwgdGhpcy5nZXRSb290KCksIGNvbnRyb2xsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgICAgY29tbW9uLmVhY2godGhpcy5fX2ZvbGRlcnMsIGZ1bmN0aW9uKGZvbGRlcikge1xuICAgICAgICAgICAgZm9sZGVyLnJldmVydChmb2xkZXIpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYgKCFndWkpIHtcbiAgICAgICAgICAgIG1hcmtQcmVzZXRNb2RpZmllZCh0aGlzLmdldFJvb3QoKSwgZmFsc2UpO1xuICAgICAgICAgIH1cblxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgbGlzdGVuOiBmdW5jdGlvbihjb250cm9sbGVyKSB7XG5cbiAgICAgICAgICB2YXIgaW5pdCA9IHRoaXMuX19saXN0ZW5pbmcubGVuZ3RoID09IDA7XG4gICAgICAgICAgdGhpcy5fX2xpc3RlbmluZy5wdXNoKGNvbnRyb2xsZXIpO1xuICAgICAgICAgIGlmIChpbml0KSB1cGRhdGVEaXNwbGF5cyh0aGlzLl9fbGlzdGVuaW5nKTtcblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICApO1xuXG4gIGZ1bmN0aW9uIGFkZChndWksIG9iamVjdCwgcHJvcGVydHksIHBhcmFtcykge1xuXG4gICAgaWYgKG9iamVjdFtwcm9wZXJ0eV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiT2JqZWN0IFwiICsgb2JqZWN0ICsgXCIgaGFzIG5vIHByb3BlcnR5IFxcXCJcIiArIHByb3BlcnR5ICsgXCJcXFwiXCIpO1xuICAgIH1cblxuICAgIHZhciBjb250cm9sbGVyO1xuXG4gICAgaWYgKHBhcmFtcy5jb2xvcikge1xuXG4gICAgICBjb250cm9sbGVyID0gbmV3IENvbG9yQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5KTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHZhciBmYWN0b3J5QXJncyA9IFtvYmplY3QscHJvcGVydHldLmNvbmNhdChwYXJhbXMuZmFjdG9yeUFyZ3MpO1xuICAgICAgY29udHJvbGxlciA9IGNvbnRyb2xsZXJGYWN0b3J5LmFwcGx5KGd1aSwgZmFjdG9yeUFyZ3MpO1xuXG4gICAgfVxuXG4gICAgaWYgKHBhcmFtcy5iZWZvcmUgaW5zdGFuY2VvZiBDb250cm9sbGVyKSB7XG4gICAgICBwYXJhbXMuYmVmb3JlID0gcGFyYW1zLmJlZm9yZS5fX2xpO1xuICAgIH1cblxuICAgIHJlY2FsbFNhdmVkVmFsdWUoZ3VpLCBjb250cm9sbGVyKTtcblxuICAgIGRvbS5hZGRDbGFzcyhjb250cm9sbGVyLmRvbUVsZW1lbnQsICdjJyk7XG5cbiAgICB2YXIgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBkb20uYWRkQ2xhc3MobmFtZSwgJ3Byb3BlcnR5LW5hbWUnKTtcbiAgICBuYW1lLmlubmVySFRNTCA9IGNvbnRyb2xsZXIucHJvcGVydHk7XG5cbiAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG5hbWUpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250cm9sbGVyLmRvbUVsZW1lbnQpO1xuXG4gICAgdmFyIGxpID0gYWRkUm93KGd1aSwgY29udGFpbmVyLCBwYXJhbXMuYmVmb3JlKTtcblxuICAgIGRvbS5hZGRDbGFzcyhsaSwgR1VJLkNMQVNTX0NPTlRST0xMRVJfUk9XKTtcbiAgICBkb20uYWRkQ2xhc3MobGksIHR5cGVvZiBjb250cm9sbGVyLmdldFZhbHVlKCkpO1xuXG4gICAgYXVnbWVudENvbnRyb2xsZXIoZ3VpLCBsaSwgY29udHJvbGxlcik7XG5cbiAgICBndWkuX19jb250cm9sbGVycy5wdXNoKGNvbnRyb2xsZXIpO1xuXG4gICAgcmV0dXJuIGNvbnRyb2xsZXI7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSByb3cgdG8gdGhlIGVuZCBvZiB0aGUgR1VJIG9yIGJlZm9yZSBhbm90aGVyIHJvdy5cbiAgICpcbiAgICogQHBhcmFtIGd1aVxuICAgKiBAcGFyYW0gW2RvbV0gSWYgc3BlY2lmaWVkLCBpbnNlcnRzIHRoZSBkb20gY29udGVudCBpbiB0aGUgbmV3IHJvd1xuICAgKiBAcGFyYW0gW2xpQmVmb3JlXSBJZiBzcGVjaWZpZWQsIHBsYWNlcyB0aGUgbmV3IHJvdyBiZWZvcmUgYW5vdGhlciByb3dcbiAgICovXG4gIGZ1bmN0aW9uIGFkZFJvdyhndWksIGRvbSwgbGlCZWZvcmUpIHtcbiAgICB2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGlmIChkb20pIGxpLmFwcGVuZENoaWxkKGRvbSk7XG4gICAgaWYgKGxpQmVmb3JlKSB7XG4gICAgICBndWkuX191bC5pbnNlcnRCZWZvcmUobGksIHBhcmFtcy5iZWZvcmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBndWkuX191bC5hcHBlbmRDaGlsZChsaSk7XG4gICAgfVxuICAgIGd1aS5vblJlc2l6ZSgpO1xuICAgIHJldHVybiBsaTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGF1Z21lbnRDb250cm9sbGVyKGd1aSwgbGksIGNvbnRyb2xsZXIpIHtcblxuICAgIGNvbnRyb2xsZXIuX19saSA9IGxpO1xuICAgIGNvbnRyb2xsZXIuX19ndWkgPSBndWk7XG5cbiAgICBjb21tb24uZXh0ZW5kKGNvbnRyb2xsZXIsIHtcblxuICAgICAgb3B0aW9uczogZnVuY3Rpb24ob3B0aW9ucykge1xuXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIGNvbnRyb2xsZXIucmVtb3ZlKCk7XG5cbiAgICAgICAgICByZXR1cm4gYWRkKFxuICAgICAgICAgICAgICBndWksXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIub2JqZWN0LFxuICAgICAgICAgICAgICBjb250cm9sbGVyLnByb3BlcnR5LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYmVmb3JlOiBjb250cm9sbGVyLl9fbGkubmV4dEVsZW1lbnRTaWJsaW5nLFxuICAgICAgICAgICAgICAgIGZhY3RvcnlBcmdzOiBbY29tbW9uLnRvQXJyYXkoYXJndW1lbnRzKV1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb21tb24uaXNBcnJheShvcHRpb25zKSB8fCBjb21tb24uaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICAgICAgICBjb250cm9sbGVyLnJlbW92ZSgpO1xuXG4gICAgICAgICAgcmV0dXJuIGFkZChcbiAgICAgICAgICAgICAgZ3VpLFxuICAgICAgICAgICAgICBjb250cm9sbGVyLm9iamVjdCxcbiAgICAgICAgICAgICAgY29udHJvbGxlci5wcm9wZXJ0eSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJlZm9yZTogY29udHJvbGxlci5fX2xpLm5leHRFbGVtZW50U2libGluZyxcbiAgICAgICAgICAgICAgICBmYWN0b3J5QXJnczogW29wdGlvbnNdXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuXG4gICAgICAgIH1cblxuICAgICAgfSxcblxuICAgICAgbmFtZTogZnVuY3Rpb24odikge1xuICAgICAgICBjb250cm9sbGVyLl9fbGkuZmlyc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQuaW5uZXJIVE1MID0gdjtcbiAgICAgICAgcmV0dXJuIGNvbnRyb2xsZXI7XG4gICAgICB9LFxuXG4gICAgICBsaXN0ZW46IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250cm9sbGVyLl9fZ3VpLmxpc3Rlbihjb250cm9sbGVyKTtcbiAgICAgICAgcmV0dXJuIGNvbnRyb2xsZXI7XG4gICAgICB9LFxuXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250cm9sbGVyLl9fZ3VpLnJlbW92ZShjb250cm9sbGVyKTtcbiAgICAgICAgcmV0dXJuIGNvbnRyb2xsZXI7XG4gICAgICB9XG5cbiAgICB9KTtcblxuICAgIC8vIEFsbCBzbGlkZXJzIHNob3VsZCBiZSBhY2NvbXBhbmllZCBieSBhIGJveC5cbiAgICBpZiAoY29udHJvbGxlciBpbnN0YW5jZW9mIE51bWJlckNvbnRyb2xsZXJTbGlkZXIpIHtcblxuICAgICAgdmFyIGJveCA9IG5ldyBOdW1iZXJDb250cm9sbGVyQm94KGNvbnRyb2xsZXIub2JqZWN0LCBjb250cm9sbGVyLnByb3BlcnR5LFxuICAgICAgICAgIHsgbWluOiBjb250cm9sbGVyLl9fbWluLCBtYXg6IGNvbnRyb2xsZXIuX19tYXgsIHN0ZXA6IGNvbnRyb2xsZXIuX19zdGVwIH0pO1xuXG4gICAgICBjb21tb24uZWFjaChbJ3VwZGF0ZURpc3BsYXknLCAnb25DaGFuZ2UnLCAnb25GaW5pc2hDaGFuZ2UnXSwgZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgIHZhciBwYyA9IGNvbnRyb2xsZXJbbWV0aG9kXTtcbiAgICAgICAgdmFyIHBiID0gYm94W21ldGhvZF07XG4gICAgICAgIGNvbnRyb2xsZXJbbWV0aG9kXSA9IGJveFttZXRob2RdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgIHBjLmFwcGx5KGNvbnRyb2xsZXIsIGFyZ3MpO1xuICAgICAgICAgIHJldHVybiBwYi5hcHBseShib3gsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgZG9tLmFkZENsYXNzKGxpLCAnaGFzLXNsaWRlcicpO1xuICAgICAgY29udHJvbGxlci5kb21FbGVtZW50Lmluc2VydEJlZm9yZShib3guZG9tRWxlbWVudCwgY29udHJvbGxlci5kb21FbGVtZW50LmZpcnN0RWxlbWVudENoaWxkKTtcblxuICAgIH1cbiAgICBlbHNlIGlmIChjb250cm9sbGVyIGluc3RhbmNlb2YgTnVtYmVyQ29udHJvbGxlckJveCkge1xuXG4gICAgICB2YXIgciA9IGZ1bmN0aW9uKHJldHVybmVkKSB7XG5cbiAgICAgICAgLy8gSGF2ZSB3ZSBkZWZpbmVkIGJvdGggYm91bmRhcmllcz9cbiAgICAgICAgaWYgKGNvbW1vbi5pc051bWJlcihjb250cm9sbGVyLl9fbWluKSAmJiBjb21tb24uaXNOdW1iZXIoY29udHJvbGxlci5fX21heCkpIHtcblxuICAgICAgICAgIC8vIFdlbGwsIHRoZW4gbGV0cyBqdXN0IHJlcGxhY2UgdGhpcyB3aXRoIGEgc2xpZGVyLlxuICAgICAgICAgIGNvbnRyb2xsZXIucmVtb3ZlKCk7XG4gICAgICAgICAgcmV0dXJuIGFkZChcbiAgICAgICAgICAgICAgZ3VpLFxuICAgICAgICAgICAgICBjb250cm9sbGVyLm9iamVjdCxcbiAgICAgICAgICAgICAgY29udHJvbGxlci5wcm9wZXJ0eSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJlZm9yZTogY29udHJvbGxlci5fX2xpLm5leHRFbGVtZW50U2libGluZyxcbiAgICAgICAgICAgICAgICBmYWN0b3J5QXJnczogW2NvbnRyb2xsZXIuX19taW4sIGNvbnRyb2xsZXIuX19tYXgsIGNvbnRyb2xsZXIuX19zdGVwXVxuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJldHVybmVkO1xuXG4gICAgICB9O1xuXG4gICAgICBjb250cm9sbGVyLm1pbiA9IGNvbW1vbi5jb21wb3NlKHIsIGNvbnRyb2xsZXIubWluKTtcbiAgICAgIGNvbnRyb2xsZXIubWF4ID0gY29tbW9uLmNvbXBvc2UociwgY29udHJvbGxlci5tYXgpO1xuXG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBCb29sZWFuQ29udHJvbGxlcikge1xuXG4gICAgICBkb20uYmluZChsaSwgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGRvbS5mYWtlRXZlbnQoY29udHJvbGxlci5fX2NoZWNrYm94LCAnY2xpY2snKTtcbiAgICAgIH0pO1xuXG4gICAgICBkb20uYmluZChjb250cm9sbGVyLl9fY2hlY2tib3gsICdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTsgLy8gUHJldmVudHMgZG91YmxlLXRvZ2dsZVxuICAgICAgfSlcblxuICAgIH1cbiAgICBlbHNlIGlmIChjb250cm9sbGVyIGluc3RhbmNlb2YgRnVuY3Rpb25Db250cm9sbGVyKSB7XG5cbiAgICAgIGRvbS5iaW5kKGxpLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZG9tLmZha2VFdmVudChjb250cm9sbGVyLl9fYnV0dG9uLCAnY2xpY2snKTtcbiAgICAgIH0pO1xuXG4gICAgICBkb20uYmluZChsaSwgJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBkb20uYWRkQ2xhc3MoY29udHJvbGxlci5fX2J1dHRvbiwgJ2hvdmVyJyk7XG4gICAgICB9KTtcblxuICAgICAgZG9tLmJpbmQobGksICdtb3VzZW91dCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBkb20ucmVtb3ZlQ2xhc3MoY29udHJvbGxlci5fX2J1dHRvbiwgJ2hvdmVyJyk7XG4gICAgICB9KTtcblxuICAgIH1cbiAgICBlbHNlIGlmIChjb250cm9sbGVyIGluc3RhbmNlb2YgQ29sb3JDb250cm9sbGVyKSB7XG5cbiAgICAgIGRvbS5hZGRDbGFzcyhsaSwgJ2NvbG9yJyk7XG4gICAgICBjb250cm9sbGVyLnVwZGF0ZURpc3BsYXkgPSBjb21tb24uY29tcG9zZShmdW5jdGlvbihyKSB7XG4gICAgICAgIGxpLnN0eWxlLmJvcmRlckxlZnRDb2xvciA9IGNvbnRyb2xsZXIuX19jb2xvci50b1N0cmluZygpO1xuICAgICAgICByZXR1cm4gcjtcbiAgICAgIH0sIGNvbnRyb2xsZXIudXBkYXRlRGlzcGxheSk7XG5cbiAgICAgIGNvbnRyb2xsZXIudXBkYXRlRGlzcGxheSgpO1xuXG4gICAgfVxuXG4gICAgY29udHJvbGxlci5zZXRWYWx1ZSA9IGNvbW1vbi5jb21wb3NlKGZ1bmN0aW9uKHIpIHtcbiAgICAgIGlmIChndWkuZ2V0Um9vdCgpLl9fcHJlc2V0X3NlbGVjdCAmJiBjb250cm9sbGVyLmlzTW9kaWZpZWQoKSkge1xuICAgICAgICBtYXJrUHJlc2V0TW9kaWZpZWQoZ3VpLmdldFJvb3QoKSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcjtcbiAgICB9LCBjb250cm9sbGVyLnNldFZhbHVlKTtcblxuICB9XG5cbiAgZnVuY3Rpb24gcmVjYWxsU2F2ZWRWYWx1ZShndWksIGNvbnRyb2xsZXIpIHtcblxuICAgIC8vIEZpbmQgdGhlIHRvcG1vc3QgR1VJLCB0aGF0J3Mgd2hlcmUgcmVtZW1iZXJlZCBvYmplY3RzIGxpdmUuXG4gICAgdmFyIHJvb3QgPSBndWkuZ2V0Um9vdCgpO1xuXG4gICAgLy8gRG9lcyB0aGUgb2JqZWN0IHdlJ3JlIGNvbnRyb2xsaW5nIG1hdGNoIGFueXRoaW5nIHdlJ3ZlIGJlZW4gdG9sZCB0b1xuICAgIC8vIHJlbWVtYmVyP1xuICAgIHZhciBtYXRjaGVkX2luZGV4ID0gcm9vdC5fX3JlbWVtYmVyZWRPYmplY3RzLmluZGV4T2YoY29udHJvbGxlci5vYmplY3QpO1xuXG4gICAgLy8gV2h5IHllcywgaXQgZG9lcyFcbiAgICBpZiAobWF0Y2hlZF9pbmRleCAhPSAtMSkge1xuXG4gICAgICAvLyBMZXQgbWUgZmV0Y2ggYSBtYXAgb2YgY29udHJvbGxlcnMgZm9yIHRoY29tbW9uLmlzT2JqZWN0LlxuICAgICAgdmFyIGNvbnRyb2xsZXJfbWFwID1cbiAgICAgICAgICByb290Ll9fcmVtZW1iZXJlZE9iamVjdEluZGVjZXNUb0NvbnRyb2xsZXJzW21hdGNoZWRfaW5kZXhdO1xuXG4gICAgICAvLyBPaHAsIEkgYmVsaWV2ZSB0aGlzIGlzIHRoZSBmaXJzdCBjb250cm9sbGVyIHdlJ3ZlIGNyZWF0ZWQgZm9yIHRoaXNcbiAgICAgIC8vIG9iamVjdC4gTGV0cyBtYWtlIHRoZSBtYXAgZnJlc2guXG4gICAgICBpZiAoY29udHJvbGxlcl9tYXAgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb250cm9sbGVyX21hcCA9IHt9O1xuICAgICAgICByb290Ll9fcmVtZW1iZXJlZE9iamVjdEluZGVjZXNUb0NvbnRyb2xsZXJzW21hdGNoZWRfaW5kZXhdID1cbiAgICAgICAgICAgIGNvbnRyb2xsZXJfbWFwO1xuICAgICAgfVxuXG4gICAgICAvLyBLZWVwIHRyYWNrIG9mIHRoaXMgY29udHJvbGxlclxuICAgICAgY29udHJvbGxlcl9tYXBbY29udHJvbGxlci5wcm9wZXJ0eV0gPSBjb250cm9sbGVyO1xuXG4gICAgICAvLyBPa2F5LCBub3cgaGF2ZSB3ZSBzYXZlZCBhbnkgdmFsdWVzIGZvciB0aGlzIGNvbnRyb2xsZXI/XG4gICAgICBpZiAocm9vdC5sb2FkICYmIHJvb3QubG9hZC5yZW1lbWJlcmVkKSB7XG5cbiAgICAgICAgdmFyIHByZXNldF9tYXAgPSByb290LmxvYWQucmVtZW1iZXJlZDtcblxuICAgICAgICAvLyBXaGljaCBwcmVzZXQgYXJlIHdlIHRyeWluZyB0byBsb2FkP1xuICAgICAgICB2YXIgcHJlc2V0O1xuXG4gICAgICAgIGlmIChwcmVzZXRfbWFwW2d1aS5wcmVzZXRdKSB7XG5cbiAgICAgICAgICBwcmVzZXQgPSBwcmVzZXRfbWFwW2d1aS5wcmVzZXRdO1xuXG4gICAgICAgIH0gZWxzZSBpZiAocHJlc2V0X21hcFtERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUVdKSB7XG5cbiAgICAgICAgICAvLyBVaGgsIHlvdSBjYW4gaGF2ZSB0aGUgZGVmYXVsdCBpbnN0ZWFkP1xuICAgICAgICAgIHByZXNldCA9IHByZXNldF9tYXBbREVGQVVMVF9ERUZBVUxUX1BSRVNFVF9OQU1FXTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgLy8gTmFkYS5cblxuICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvLyBEaWQgdGhlIGxvYWRlZCBvYmplY3QgcmVtZW1iZXIgdGhjb21tb24uaXNPYmplY3Q/XG4gICAgICAgIGlmIChwcmVzZXRbbWF0Y2hlZF9pbmRleF0gJiZcblxuICAgICAgICAgIC8vIERpZCB3ZSByZW1lbWJlciB0aGlzIHBhcnRpY3VsYXIgcHJvcGVydHk/XG4gICAgICAgICAgICBwcmVzZXRbbWF0Y2hlZF9pbmRleF1bY29udHJvbGxlci5wcm9wZXJ0eV0gIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgLy8gV2UgZGlkIHJlbWVtYmVyIHNvbWV0aGluZyBmb3IgdGhpcyBndXkgLi4uXG4gICAgICAgICAgdmFyIHZhbHVlID0gcHJlc2V0W21hdGNoZWRfaW5kZXhdW2NvbnRyb2xsZXIucHJvcGVydHldO1xuXG4gICAgICAgICAgLy8gQW5kIHRoYXQncyB3aGF0IGl0IGlzLlxuICAgICAgICAgIGNvbnRyb2xsZXIuaW5pdGlhbFZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgY29udHJvbGxlci5zZXRWYWx1ZSh2YWx1ZSk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldExvY2FsU3RvcmFnZUhhc2goZ3VpLCBrZXkpIHtcbiAgICAvLyBUT0RPIGhvdyBkb2VzIHRoaXMgZGVhbCB3aXRoIG11bHRpcGxlIEdVSSdzP1xuICAgIHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5ocmVmICsgJy4nICsga2V5O1xuXG4gIH1cblxuICBmdW5jdGlvbiBhZGRTYXZlTWVudShndWkpIHtcblxuICAgIHZhciBkaXYgPSBndWkuX19zYXZlX3JvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG5cbiAgICBkb20uYWRkQ2xhc3MoZ3VpLmRvbUVsZW1lbnQsICdoYXMtc2F2ZScpO1xuXG4gICAgZ3VpLl9fdWwuaW5zZXJ0QmVmb3JlKGRpdiwgZ3VpLl9fdWwuZmlyc3RDaGlsZCk7XG5cbiAgICBkb20uYWRkQ2xhc3MoZGl2LCAnc2F2ZS1yb3cnKTtcblxuICAgIHZhciBnZWFycyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBnZWFycy5pbm5lckhUTUwgPSAnJm5ic3A7JztcbiAgICBkb20uYWRkQ2xhc3MoZ2VhcnMsICdidXR0b24gZ2VhcnMnKTtcblxuICAgIC8vIFRPRE8gcmVwbGFjZSB3aXRoIEZ1bmN0aW9uQ29udHJvbGxlclxuICAgIHZhciBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgYnV0dG9uLmlubmVySFRNTCA9ICdTYXZlJztcbiAgICBkb20uYWRkQ2xhc3MoYnV0dG9uLCAnYnV0dG9uJyk7XG4gICAgZG9tLmFkZENsYXNzKGJ1dHRvbiwgJ3NhdmUnKTtcblxuICAgIHZhciBidXR0b24yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGJ1dHRvbjIuaW5uZXJIVE1MID0gJ05ldyc7XG4gICAgZG9tLmFkZENsYXNzKGJ1dHRvbjIsICdidXR0b24nKTtcbiAgICBkb20uYWRkQ2xhc3MoYnV0dG9uMiwgJ3NhdmUtYXMnKTtcblxuICAgIHZhciBidXR0b24zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGJ1dHRvbjMuaW5uZXJIVE1MID0gJ1JldmVydCc7XG4gICAgZG9tLmFkZENsYXNzKGJ1dHRvbjMsICdidXR0b24nKTtcbiAgICBkb20uYWRkQ2xhc3MoYnV0dG9uMywgJ3JldmVydCcpO1xuXG4gICAgdmFyIHNlbGVjdCA9IGd1aS5fX3ByZXNldF9zZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcblxuICAgIGlmIChndWkubG9hZCAmJiBndWkubG9hZC5yZW1lbWJlcmVkKSB7XG5cbiAgICAgIGNvbW1vbi5lYWNoKGd1aS5sb2FkLnJlbWVtYmVyZWQsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgYWRkUHJlc2V0T3B0aW9uKGd1aSwga2V5LCBrZXkgPT0gZ3VpLnByZXNldCk7XG4gICAgICB9KTtcblxuICAgIH0gZWxzZSB7XG4gICAgICBhZGRQcmVzZXRPcHRpb24oZ3VpLCBERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUUsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBkb20uYmluZChzZWxlY3QsICdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcblxuXG4gICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgZ3VpLl9fcHJlc2V0X3NlbGVjdC5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgZ3VpLl9fcHJlc2V0X3NlbGVjdFtpbmRleF0uaW5uZXJIVE1MID0gZ3VpLl9fcHJlc2V0X3NlbGVjdFtpbmRleF0udmFsdWU7XG4gICAgICB9XG5cbiAgICAgIGd1aS5wcmVzZXQgPSB0aGlzLnZhbHVlO1xuXG4gICAgfSk7XG5cbiAgICBkaXYuYXBwZW5kQ2hpbGQoc2VsZWN0KTtcbiAgICBkaXYuYXBwZW5kQ2hpbGQoZ2VhcnMpO1xuICAgIGRpdi5hcHBlbmRDaGlsZChidXR0b24pO1xuICAgIGRpdi5hcHBlbmRDaGlsZChidXR0b24yKTtcbiAgICBkaXYuYXBwZW5kQ2hpbGQoYnV0dG9uMyk7XG5cbiAgICBpZiAoU1VQUE9SVFNfTE9DQUxfU1RPUkFHRSkge1xuXG4gICAgICB2YXIgc2F2ZUxvY2FsbHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGctc2F2ZS1sb2NhbGx5Jyk7XG4gICAgICB2YXIgZXhwbGFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZy1sb2NhbC1leHBsYWluJyk7XG5cbiAgICAgIHNhdmVMb2NhbGx5LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgICB2YXIgbG9jYWxTdG9yYWdlQ2hlY2tCb3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGctbG9jYWwtc3RvcmFnZScpO1xuXG4gICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oZ2V0TG9jYWxTdG9yYWdlSGFzaChndWksICdpc0xvY2FsJykpID09PSAndHJ1ZScpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlQ2hlY2tCb3guc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJ2NoZWNrZWQnKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2hvd0hpZGVFeHBsYWluKCkge1xuICAgICAgICBleHBsYWluLnN0eWxlLmRpc3BsYXkgPSBndWkudXNlTG9jYWxTdG9yYWdlID8gJ2Jsb2NrJyA6ICdub25lJztcbiAgICAgIH1cblxuICAgICAgc2hvd0hpZGVFeHBsYWluKCk7XG5cbiAgICAgIC8vIFRPRE86IFVzZSBhIGJvb2xlYW4gY29udHJvbGxlciwgZm9vbCFcbiAgICAgIGRvbS5iaW5kKGxvY2FsU3RvcmFnZUNoZWNrQm94LCAnY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGd1aS51c2VMb2NhbFN0b3JhZ2UgPSAhZ3VpLnVzZUxvY2FsU3RvcmFnZTtcbiAgICAgICAgc2hvd0hpZGVFeHBsYWluKCk7XG4gICAgICB9KTtcblxuICAgIH1cblxuICAgIHZhciBuZXdDb25zdHJ1Y3RvclRleHRBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RnLW5ldy1jb25zdHJ1Y3RvcicpO1xuXG4gICAgZG9tLmJpbmQobmV3Q29uc3RydWN0b3JUZXh0QXJlYSwgJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgICBpZiAoZS5tZXRhS2V5ICYmIChlLndoaWNoID09PSA2NyB8fCBlLmtleUNvZGUgPT0gNjcpKSB7XG4gICAgICAgIFNBVkVfRElBTE9HVUUuaGlkZSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZG9tLmJpbmQoZ2VhcnMsICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgbmV3Q29uc3RydWN0b3JUZXh0QXJlYS5pbm5lckhUTUwgPSBKU09OLnN0cmluZ2lmeShndWkuZ2V0U2F2ZU9iamVjdCgpLCB1bmRlZmluZWQsIDIpO1xuICAgICAgU0FWRV9ESUFMT0dVRS5zaG93KCk7XG4gICAgICBuZXdDb25zdHJ1Y3RvclRleHRBcmVhLmZvY3VzKCk7XG4gICAgICBuZXdDb25zdHJ1Y3RvclRleHRBcmVhLnNlbGVjdCgpO1xuICAgIH0pO1xuXG4gICAgZG9tLmJpbmQoYnV0dG9uLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIGd1aS5zYXZlKCk7XG4gICAgfSk7XG5cbiAgICBkb20uYmluZChidXR0b24yLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBwcmVzZXROYW1lID0gcHJvbXB0KCdFbnRlciBhIG5ldyBwcmVzZXQgbmFtZS4nKTtcbiAgICAgIGlmIChwcmVzZXROYW1lKSBndWkuc2F2ZUFzKHByZXNldE5hbWUpO1xuICAgIH0pO1xuXG4gICAgZG9tLmJpbmQoYnV0dG9uMywgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICBndWkucmV2ZXJ0KCk7XG4gICAgfSk7XG5cbi8vICAgIGRpdi5hcHBlbmRDaGlsZChidXR0b24yKTtcblxuICB9XG5cbiAgZnVuY3Rpb24gYWRkUmVzaXplSGFuZGxlKGd1aSkge1xuXG4gICAgZ3VpLl9fcmVzaXplX2hhbmRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgY29tbW9uLmV4dGVuZChndWkuX19yZXNpemVfaGFuZGxlLnN0eWxlLCB7XG5cbiAgICAgIHdpZHRoOiAnNnB4JyxcbiAgICAgIG1hcmdpbkxlZnQ6ICctM3B4JyxcbiAgICAgIGhlaWdodDogJzIwMHB4JyxcbiAgICAgIGN1cnNvcjogJ2V3LXJlc2l6ZScsXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xuLy8gICAgICBib3JkZXI6ICcxcHggc29saWQgYmx1ZSdcblxuICAgIH0pO1xuXG4gICAgdmFyIHBtb3VzZVg7XG5cbiAgICBkb20uYmluZChndWkuX19yZXNpemVfaGFuZGxlLCAnbW91c2Vkb3duJywgZHJhZ1N0YXJ0KTtcbiAgICBkb20uYmluZChndWkuX19jbG9zZUJ1dHRvbiwgJ21vdXNlZG93bicsIGRyYWdTdGFydCk7XG5cbiAgICBndWkuZG9tRWxlbWVudC5pbnNlcnRCZWZvcmUoZ3VpLl9fcmVzaXplX2hhbmRsZSwgZ3VpLmRvbUVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQpO1xuXG4gICAgZnVuY3Rpb24gZHJhZ1N0YXJ0KGUpIHtcblxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBwbW91c2VYID0gZS5jbGllbnRYO1xuXG4gICAgICBkb20uYWRkQ2xhc3MoZ3VpLl9fY2xvc2VCdXR0b24sIEdVSS5DTEFTU19EUkFHKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIGRyYWcpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2V1cCcsIGRyYWdTdG9wKTtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhZyhlKSB7XG5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgZ3VpLndpZHRoICs9IHBtb3VzZVggLSBlLmNsaWVudFg7XG4gICAgICBndWkub25SZXNpemUoKTtcbiAgICAgIHBtb3VzZVggPSBlLmNsaWVudFg7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyYWdTdG9wKCkge1xuXG4gICAgICBkb20ucmVtb3ZlQ2xhc3MoZ3VpLl9fY2xvc2VCdXR0b24sIEdVSS5DTEFTU19EUkFHKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgZHJhZyk7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBkcmFnU3RvcCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFdpZHRoKGd1aSwgdykge1xuICAgIGd1aS5kb21FbGVtZW50LnN0eWxlLndpZHRoID0gdyArICdweCc7XG4gICAgLy8gQXV0byBwbGFjZWQgc2F2ZS1yb3dzIGFyZSBwb3NpdGlvbiBmaXhlZCwgc28gd2UgaGF2ZSB0b1xuICAgIC8vIHNldCB0aGUgd2lkdGggbWFudWFsbHkgaWYgd2Ugd2FudCBpdCB0byBibGVlZCB0byB0aGUgZWRnZVxuICAgIGlmIChndWkuX19zYXZlX3JvdyAmJiBndWkuYXV0b1BsYWNlKSB7XG4gICAgICBndWkuX19zYXZlX3Jvdy5zdHlsZS53aWR0aCA9IHcgKyAncHgnO1xuICAgIH1pZiAoZ3VpLl9fY2xvc2VCdXR0b24pIHtcbiAgICAgIGd1aS5fX2Nsb3NlQnV0dG9uLnN0eWxlLndpZHRoID0gdyArICdweCc7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q3VycmVudFByZXNldChndWksIHVzZUluaXRpYWxWYWx1ZXMpIHtcblxuICAgIHZhciB0b1JldHVybiA9IHt9O1xuXG4gICAgLy8gRm9yIGVhY2ggb2JqZWN0IEknbSByZW1lbWJlcmluZ1xuICAgIGNvbW1vbi5lYWNoKGd1aS5fX3JlbWVtYmVyZWRPYmplY3RzLCBmdW5jdGlvbih2YWwsIGluZGV4KSB7XG5cbiAgICAgIHZhciBzYXZlZF92YWx1ZXMgPSB7fTtcblxuICAgICAgLy8gVGhlIGNvbnRyb2xsZXJzIEkndmUgbWFkZSBmb3IgdGhjb21tb24uaXNPYmplY3QgYnkgcHJvcGVydHlcbiAgICAgIHZhciBjb250cm9sbGVyX21hcCA9XG4gICAgICAgICAgZ3VpLl9fcmVtZW1iZXJlZE9iamVjdEluZGVjZXNUb0NvbnRyb2xsZXJzW2luZGV4XTtcblxuICAgICAgLy8gUmVtZW1iZXIgZWFjaCB2YWx1ZSBmb3IgZWFjaCBwcm9wZXJ0eVxuICAgICAgY29tbW9uLmVhY2goY29udHJvbGxlcl9tYXAsIGZ1bmN0aW9uKGNvbnRyb2xsZXIsIHByb3BlcnR5KSB7XG4gICAgICAgIHNhdmVkX3ZhbHVlc1twcm9wZXJ0eV0gPSB1c2VJbml0aWFsVmFsdWVzID8gY29udHJvbGxlci5pbml0aWFsVmFsdWUgOiBjb250cm9sbGVyLmdldFZhbHVlKCk7XG4gICAgICB9KTtcblxuICAgICAgLy8gU2F2ZSB0aGUgdmFsdWVzIGZvciB0aGNvbW1vbi5pc09iamVjdFxuICAgICAgdG9SZXR1cm5baW5kZXhdID0gc2F2ZWRfdmFsdWVzO1xuXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdG9SZXR1cm47XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFByZXNldE9wdGlvbihndWksIG5hbWUsIHNldFNlbGVjdGVkKSB7XG4gICAgdmFyIG9wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgIG9wdC5pbm5lckhUTUwgPSBuYW1lO1xuICAgIG9wdC52YWx1ZSA9IG5hbWU7XG4gICAgZ3VpLl9fcHJlc2V0X3NlbGVjdC5hcHBlbmRDaGlsZChvcHQpO1xuICAgIGlmIChzZXRTZWxlY3RlZCkge1xuICAgICAgZ3VpLl9fcHJlc2V0X3NlbGVjdC5zZWxlY3RlZEluZGV4ID0gZ3VpLl9fcHJlc2V0X3NlbGVjdC5sZW5ndGggLSAxO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFByZXNldFNlbGVjdEluZGV4KGd1aSkge1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBndWkuX19wcmVzZXRfc2VsZWN0Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgaWYgKGd1aS5fX3ByZXNldF9zZWxlY3RbaW5kZXhdLnZhbHVlID09IGd1aS5wcmVzZXQpIHtcbiAgICAgICAgZ3VpLl9fcHJlc2V0X3NlbGVjdC5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbWFya1ByZXNldE1vZGlmaWVkKGd1aSwgbW9kaWZpZWQpIHtcbiAgICB2YXIgb3B0ID0gZ3VpLl9fcHJlc2V0X3NlbGVjdFtndWkuX19wcmVzZXRfc2VsZWN0LnNlbGVjdGVkSW5kZXhdO1xuLy8gICAgY29uc29sZS5sb2coJ21hcmsnLCBtb2RpZmllZCwgb3B0KTtcbiAgICBpZiAobW9kaWZpZWQpIHtcbiAgICAgIG9wdC5pbm5lckhUTUwgPSBvcHQudmFsdWUgKyBcIipcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0LmlubmVySFRNTCA9IG9wdC52YWx1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVEaXNwbGF5cyhjb250cm9sbGVyQXJyYXkpIHtcblxuXG4gICAgaWYgKGNvbnRyb2xsZXJBcnJheS5sZW5ndGggIT0gMCkge1xuXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XG4gICAgICAgIHVwZGF0ZURpc3BsYXlzKGNvbnRyb2xsZXJBcnJheSk7XG4gICAgICB9KTtcblxuICAgIH1cblxuICAgIGNvbW1vbi5lYWNoKGNvbnRyb2xsZXJBcnJheSwgZnVuY3Rpb24oYykge1xuICAgICAgYy51cGRhdGVEaXNwbGF5KCk7XG4gICAgfSk7XG5cbiAgfVxuXG4gIHJldHVybiBHVUk7XG5cbn0pKGRhdC51dGlscy5jc3MsXG5cIjxkaXYgaWQ9XFxcImRnLXNhdmVcXFwiIGNsYXNzPVxcXCJkZyBkaWFsb2d1ZVxcXCI+XFxuXFxuICBIZXJlJ3MgdGhlIG5ldyBsb2FkIHBhcmFtZXRlciBmb3IgeW91ciA8Y29kZT5HVUk8L2NvZGU+J3MgY29uc3RydWN0b3I6XFxuXFxuICA8dGV4dGFyZWEgaWQ9XFxcImRnLW5ldy1jb25zdHJ1Y3RvclxcXCI+PC90ZXh0YXJlYT5cXG5cXG4gIDxkaXYgaWQ9XFxcImRnLXNhdmUtbG9jYWxseVxcXCI+XFxuXFxuICAgIDxpbnB1dCBpZD1cXFwiZGctbG9jYWwtc3RvcmFnZVxcXCIgdHlwZT1cXFwiY2hlY2tib3hcXFwiLz4gQXV0b21hdGljYWxseSBzYXZlXFxuICAgIHZhbHVlcyB0byA8Y29kZT5sb2NhbFN0b3JhZ2U8L2NvZGU+IG9uIGV4aXQuXFxuXFxuICAgIDxkaXYgaWQ9XFxcImRnLWxvY2FsLWV4cGxhaW5cXFwiPlRoZSB2YWx1ZXMgc2F2ZWQgdG8gPGNvZGU+bG9jYWxTdG9yYWdlPC9jb2RlPiB3aWxsXFxuICAgICAgb3ZlcnJpZGUgdGhvc2UgcGFzc2VkIHRvIDxjb2RlPmRhdC5HVUk8L2NvZGU+J3MgY29uc3RydWN0b3IuIFRoaXMgbWFrZXMgaXRcXG4gICAgICBlYXNpZXIgdG8gd29yayBpbmNyZW1lbnRhbGx5LCBidXQgPGNvZGU+bG9jYWxTdG9yYWdlPC9jb2RlPiBpcyBmcmFnaWxlLFxcbiAgICAgIGFuZCB5b3VyIGZyaWVuZHMgbWF5IG5vdCBzZWUgdGhlIHNhbWUgdmFsdWVzIHlvdSBkby5cXG4gICAgICBcXG4gICAgPC9kaXY+XFxuICAgIFxcbiAgPC9kaXY+XFxuXFxuPC9kaXY+XCIsXG5cIi5kZyB1bHtsaXN0LXN0eWxlOm5vbmU7bWFyZ2luOjA7cGFkZGluZzowO3dpZHRoOjEwMCU7Y2xlYXI6Ym90aH0uZGcuYWN7cG9zaXRpb246Zml4ZWQ7dG9wOjA7bGVmdDowO3JpZ2h0OjA7aGVpZ2h0OjA7ei1pbmRleDowfS5kZzpub3QoLmFjKSAubWFpbntvdmVyZmxvdzpoaWRkZW59LmRnLm1haW57LXdlYmtpdC10cmFuc2l0aW9uOm9wYWNpdHkgMC4xcyBsaW5lYXI7LW8tdHJhbnNpdGlvbjpvcGFjaXR5IDAuMXMgbGluZWFyOy1tb3otdHJhbnNpdGlvbjpvcGFjaXR5IDAuMXMgbGluZWFyO3RyYW5zaXRpb246b3BhY2l0eSAwLjFzIGxpbmVhcn0uZGcubWFpbi50YWxsZXItdGhhbi13aW5kb3d7b3ZlcmZsb3cteTphdXRvfS5kZy5tYWluLnRhbGxlci10aGFuLXdpbmRvdyAuY2xvc2UtYnV0dG9ue29wYWNpdHk6MTttYXJnaW4tdG9wOi0xcHg7Ym9yZGVyLXRvcDoxcHggc29saWQgIzJjMmMyY30uZGcubWFpbiB1bC5jbG9zZWQgLmNsb3NlLWJ1dHRvbntvcGFjaXR5OjEgIWltcG9ydGFudH0uZGcubWFpbjpob3ZlciAuY2xvc2UtYnV0dG9uLC5kZy5tYWluIC5jbG9zZS1idXR0b24uZHJhZ3tvcGFjaXR5OjF9LmRnLm1haW4gLmNsb3NlLWJ1dHRvbnstd2Via2l0LXRyYW5zaXRpb246b3BhY2l0eSAwLjFzIGxpbmVhcjstby10cmFuc2l0aW9uOm9wYWNpdHkgMC4xcyBsaW5lYXI7LW1vei10cmFuc2l0aW9uOm9wYWNpdHkgMC4xcyBsaW5lYXI7dHJhbnNpdGlvbjpvcGFjaXR5IDAuMXMgbGluZWFyO2JvcmRlcjowO3Bvc2l0aW9uOmFic29sdXRlO2xpbmUtaGVpZ2h0OjE5cHg7aGVpZ2h0OjIwcHg7Y3Vyc29yOnBvaW50ZXI7dGV4dC1hbGlnbjpjZW50ZXI7YmFja2dyb3VuZC1jb2xvcjojMDAwfS5kZy5tYWluIC5jbG9zZS1idXR0b246aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojMTExfS5kZy5he2Zsb2F0OnJpZ2h0O21hcmdpbi1yaWdodDoxNXB4O292ZXJmbG93LXg6aGlkZGVufS5kZy5hLmhhcy1zYXZlIHVse21hcmdpbi10b3A6MjdweH0uZGcuYS5oYXMtc2F2ZSB1bC5jbG9zZWR7bWFyZ2luLXRvcDowfS5kZy5hIC5zYXZlLXJvd3twb3NpdGlvbjpmaXhlZDt0b3A6MDt6LWluZGV4OjEwMDJ9LmRnIGxpey13ZWJraXQtdHJhbnNpdGlvbjpoZWlnaHQgMC4xcyBlYXNlLW91dDstby10cmFuc2l0aW9uOmhlaWdodCAwLjFzIGVhc2Utb3V0Oy1tb3otdHJhbnNpdGlvbjpoZWlnaHQgMC4xcyBlYXNlLW91dDt0cmFuc2l0aW9uOmhlaWdodCAwLjFzIGVhc2Utb3V0fS5kZyBsaTpub3QoLmZvbGRlcil7Y3Vyc29yOmF1dG87aGVpZ2h0OjI3cHg7bGluZS1oZWlnaHQ6MjdweDtvdmVyZmxvdzpoaWRkZW47cGFkZGluZzowIDRweCAwIDVweH0uZGcgbGkuZm9sZGVye3BhZGRpbmc6MDtib3JkZXItbGVmdDo0cHggc29saWQgcmdiYSgwLDAsMCwwKX0uZGcgbGkudGl0bGV7Y3Vyc29yOnBvaW50ZXI7bWFyZ2luLWxlZnQ6LTRweH0uZGcgLmNsb3NlZCBsaTpub3QoLnRpdGxlKSwuZGcgLmNsb3NlZCB1bCBsaSwuZGcgLmNsb3NlZCB1bCBsaSA+ICp7aGVpZ2h0OjA7b3ZlcmZsb3c6aGlkZGVuO2JvcmRlcjowfS5kZyAuY3J7Y2xlYXI6Ym90aDtwYWRkaW5nLWxlZnQ6M3B4O2hlaWdodDoyN3B4fS5kZyAucHJvcGVydHktbmFtZXtjdXJzb3I6ZGVmYXVsdDtmbG9hdDpsZWZ0O2NsZWFyOmxlZnQ7d2lkdGg6NDAlO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzfS5kZyAuY3tmbG9hdDpsZWZ0O3dpZHRoOjYwJX0uZGcgLmMgaW5wdXRbdHlwZT10ZXh0XXtib3JkZXI6MDttYXJnaW4tdG9wOjRweDtwYWRkaW5nOjNweDt3aWR0aDoxMDAlO2Zsb2F0OnJpZ2h0fS5kZyAuaGFzLXNsaWRlciBpbnB1dFt0eXBlPXRleHRde3dpZHRoOjMwJTttYXJnaW4tbGVmdDowfS5kZyAuc2xpZGVye2Zsb2F0OmxlZnQ7d2lkdGg6NjYlO21hcmdpbi1sZWZ0Oi01cHg7bWFyZ2luLXJpZ2h0OjA7aGVpZ2h0OjE5cHg7bWFyZ2luLXRvcDo0cHh9LmRnIC5zbGlkZXItZmd7aGVpZ2h0OjEwMCV9LmRnIC5jIGlucHV0W3R5cGU9Y2hlY2tib3hde21hcmdpbi10b3A6OXB4fS5kZyAuYyBzZWxlY3R7bWFyZ2luLXRvcDo1cHh9LmRnIC5jci5mdW5jdGlvbiwuZGcgLmNyLmZ1bmN0aW9uIC5wcm9wZXJ0eS1uYW1lLC5kZyAuY3IuZnVuY3Rpb24gKiwuZGcgLmNyLmJvb2xlYW4sLmRnIC5jci5ib29sZWFuICp7Y3Vyc29yOnBvaW50ZXJ9LmRnIC5zZWxlY3RvcntkaXNwbGF5Om5vbmU7cG9zaXRpb246YWJzb2x1dGU7bWFyZ2luLWxlZnQ6LTlweDttYXJnaW4tdG9wOjIzcHg7ei1pbmRleDoxMH0uZGcgLmM6aG92ZXIgLnNlbGVjdG9yLC5kZyAuc2VsZWN0b3IuZHJhZ3tkaXNwbGF5OmJsb2NrfS5kZyBsaS5zYXZlLXJvd3twYWRkaW5nOjB9LmRnIGxpLnNhdmUtcm93IC5idXR0b257ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZzowcHggNnB4fS5kZy5kaWFsb2d1ZXtiYWNrZ3JvdW5kLWNvbG9yOiMyMjI7d2lkdGg6NDYwcHg7cGFkZGluZzoxNXB4O2ZvbnQtc2l6ZToxM3B4O2xpbmUtaGVpZ2h0OjE1cHh9I2RnLW5ldy1jb25zdHJ1Y3RvcntwYWRkaW5nOjEwcHg7Y29sb3I6IzIyMjtmb250LWZhbWlseTpNb25hY28sIG1vbm9zcGFjZTtmb250LXNpemU6MTBweDtib3JkZXI6MDtyZXNpemU6bm9uZTtib3gtc2hhZG93Omluc2V0IDFweCAxcHggMXB4ICM4ODg7d29yZC13cmFwOmJyZWFrLXdvcmQ7bWFyZ2luOjEycHggMDtkaXNwbGF5OmJsb2NrO3dpZHRoOjQ0MHB4O292ZXJmbG93LXk6c2Nyb2xsO2hlaWdodDoxMDBweDtwb3NpdGlvbjpyZWxhdGl2ZX0jZGctbG9jYWwtZXhwbGFpbntkaXNwbGF5Om5vbmU7Zm9udC1zaXplOjExcHg7bGluZS1oZWlnaHQ6MTdweDtib3JkZXItcmFkaXVzOjNweDtiYWNrZ3JvdW5kLWNvbG9yOiMzMzM7cGFkZGluZzo4cHg7bWFyZ2luLXRvcDoxMHB4fSNkZy1sb2NhbC1leHBsYWluIGNvZGV7Zm9udC1zaXplOjEwcHh9I2RhdC1ndWktc2F2ZS1sb2NhbGx5e2Rpc3BsYXk6bm9uZX0uZGd7Y29sb3I6I2VlZTtmb250OjExcHggJ0x1Y2lkYSBHcmFuZGUnLCBzYW5zLXNlcmlmO3RleHQtc2hhZG93OjAgLTFweCAwICMxMTF9LmRnLm1haW46Oi13ZWJraXQtc2Nyb2xsYmFye3dpZHRoOjVweDtiYWNrZ3JvdW5kOiMxYTFhMWF9LmRnLm1haW46Oi13ZWJraXQtc2Nyb2xsYmFyLWNvcm5lcntoZWlnaHQ6MDtkaXNwbGF5Om5vbmV9LmRnLm1haW46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1ie2JvcmRlci1yYWRpdXM6NXB4O2JhY2tncm91bmQ6IzY3Njc2N30uZGcgbGk6bm90KC5mb2xkZXIpe2JhY2tncm91bmQ6IzFhMWExYTtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjMmMyYzJjfS5kZyBsaS5zYXZlLXJvd3tsaW5lLWhlaWdodDoyNXB4O2JhY2tncm91bmQ6I2RhZDVjYjtib3JkZXI6MH0uZGcgbGkuc2F2ZS1yb3cgc2VsZWN0e21hcmdpbi1sZWZ0OjVweDt3aWR0aDoxMDhweH0uZGcgbGkuc2F2ZS1yb3cgLmJ1dHRvbnttYXJnaW4tbGVmdDo1cHg7bWFyZ2luLXRvcDoxcHg7Ym9yZGVyLXJhZGl1czoycHg7Zm9udC1zaXplOjlweDtsaW5lLWhlaWdodDo3cHg7cGFkZGluZzo0cHggNHB4IDVweCA0cHg7YmFja2dyb3VuZDojYzViZGFkO2NvbG9yOiNmZmY7dGV4dC1zaGFkb3c6MCAxcHggMCAjYjBhNThmO2JveC1zaGFkb3c6MCAtMXB4IDAgI2IwYTU4ZjtjdXJzb3I6cG9pbnRlcn0uZGcgbGkuc2F2ZS1yb3cgLmJ1dHRvbi5nZWFyc3tiYWNrZ3JvdW5kOiNjNWJkYWQgdXJsKGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQXNBQUFBTkNBWUFBQUIvOVpRN0FBQUFHWFJGV0hSVGIyWjBkMkZ5WlFCQlpHOWlaU0JKYldGblpWSmxZV1I1Y2NsbFBBQUFBUUpKUkVGVWVOcGlZS0FVL1AvL1B3R0lDL0FwQ0FCaUJTQVcrSThBQ2xBY2dLeFE0VDlob01BRVVyeHgyUVNHTjYrZWdEWCsvdldUNGU3TjgyQU1Zb1BBeC9ldndXb1lvU1liQUNYMnM3S3hDeHpjc2V6RGgzZXZGb0RFQllURUVxeWNnZ1dBekE5QXVVU1FRZ2VZUGE5ZlB2Ni9ZV20vQWN4NUlQYjd0eS9mdytRWmJsdzY3dkRzOFIwWUh5UWhnT2J4K3lBSmtCcW1HNWRQUERoMWFQT0dSL2V1Z1cwRzR2bElvVElmeUZjQStRZWtoaEhKaFBkUXhiaUFJZ3VNQlRRWnJQRDcxMDhNNnJvV1lERlFpSUFBdjZBb3cvMWJGd1hnaXMrZjJMVUF5bndvSWFOY3o4WE54M0RsN01FSlVER1FweDlndFE4WUN1ZUIrRDI2T0VDQUFRRGFkdDdlNDZENDJRQUFBQUJKUlU1RXJrSmdnZz09KSAycHggMXB4IG5vLXJlcGVhdDtoZWlnaHQ6N3B4O3dpZHRoOjhweH0uZGcgbGkuc2F2ZS1yb3cgLmJ1dHRvbjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNiYWIxOWU7Ym94LXNoYWRvdzowIC0xcHggMCAjYjBhNThmfS5kZyBsaS5mb2xkZXJ7Ym9yZGVyLWJvdHRvbTowfS5kZyBsaS50aXRsZXtwYWRkaW5nLWxlZnQ6MTZweDtiYWNrZ3JvdW5kOiMwMDAgdXJsKGRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEJRQUZBSkVBQVAvLy8vUHo4Ly8vLy8vLy95SDVCQUVBQUFJQUxBQUFBQUFGQUFVQUFBSUlsSStoS2dGeG9DZ0FPdz09KSA2cHggMTBweCBuby1yZXBlYXQ7Y3Vyc29yOnBvaW50ZXI7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwwLjIpfS5kZyAuY2xvc2VkIGxpLnRpdGxle2JhY2tncm91bmQtaW1hZ2U6dXJsKGRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEJRQUZBSkVBQVAvLy8vUHo4Ly8vLy8vLy95SDVCQUVBQUFJQUxBQUFBQUFGQUFVQUFBSUlsR0lXcU1DYldBRUFPdz09KX0uZGcgLmNyLmJvb2xlYW57Ym9yZGVyLWxlZnQ6M3B4IHNvbGlkICM4MDY3ODd9LmRnIC5jci5mdW5jdGlvbntib3JkZXItbGVmdDozcHggc29saWQgI2U2MWQ1Zn0uZGcgLmNyLm51bWJlcntib3JkZXItbGVmdDozcHggc29saWQgIzJmYTFkNn0uZGcgLmNyLm51bWJlciBpbnB1dFt0eXBlPXRleHRde2NvbG9yOiMyZmExZDZ9LmRnIC5jci5zdHJpbmd7Ym9yZGVyLWxlZnQ6M3B4IHNvbGlkICMxZWQzNmZ9LmRnIC5jci5zdHJpbmcgaW5wdXRbdHlwZT10ZXh0XXtjb2xvcjojMWVkMzZmfS5kZyAuY3IuZnVuY3Rpb246aG92ZXIsLmRnIC5jci5ib29sZWFuOmhvdmVye2JhY2tncm91bmQ6IzExMX0uZGcgLmMgaW5wdXRbdHlwZT10ZXh0XXtiYWNrZ3JvdW5kOiMzMDMwMzA7b3V0bGluZTpub25lfS5kZyAuYyBpbnB1dFt0eXBlPXRleHRdOmhvdmVye2JhY2tncm91bmQ6IzNjM2MzY30uZGcgLmMgaW5wdXRbdHlwZT10ZXh0XTpmb2N1c3tiYWNrZ3JvdW5kOiM0OTQ5NDk7Y29sb3I6I2ZmZn0uZGcgLmMgLnNsaWRlcntiYWNrZ3JvdW5kOiMzMDMwMzA7Y3Vyc29yOmV3LXJlc2l6ZX0uZGcgLmMgLnNsaWRlci1mZ3tiYWNrZ3JvdW5kOiMyZmExZDZ9LmRnIC5jIC5zbGlkZXI6aG92ZXJ7YmFja2dyb3VuZDojM2MzYzNjfS5kZyAuYyAuc2xpZGVyOmhvdmVyIC5zbGlkZXItZmd7YmFja2dyb3VuZDojNDRhYmRhfVxcblwiLFxuZGF0LmNvbnRyb2xsZXJzLmZhY3RvcnkgPSAoZnVuY3Rpb24gKE9wdGlvbkNvbnRyb2xsZXIsIE51bWJlckNvbnRyb2xsZXJCb3gsIE51bWJlckNvbnRyb2xsZXJTbGlkZXIsIFN0cmluZ0NvbnRyb2xsZXIsIEZ1bmN0aW9uQ29udHJvbGxlciwgQm9vbGVhbkNvbnRyb2xsZXIsIGNvbW1vbikge1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkge1xuXG4gICAgICAgIHZhciBpbml0aWFsVmFsdWUgPSBvYmplY3RbcHJvcGVydHldO1xuXG4gICAgICAgIC8vIFByb3ZpZGluZyBvcHRpb25zP1xuICAgICAgICBpZiAoY29tbW9uLmlzQXJyYXkoYXJndW1lbnRzWzJdKSB8fCBjb21tb24uaXNPYmplY3QoYXJndW1lbnRzWzJdKSkge1xuICAgICAgICAgIHJldHVybiBuZXcgT3B0aW9uQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5LCBhcmd1bWVudHNbMl0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUHJvdmlkaW5nIGEgbWFwP1xuXG4gICAgICAgIGlmIChjb21tb24uaXNOdW1iZXIoaW5pdGlhbFZhbHVlKSkge1xuXG4gICAgICAgICAgaWYgKGNvbW1vbi5pc051bWJlcihhcmd1bWVudHNbMl0pICYmIGNvbW1vbi5pc051bWJlcihhcmd1bWVudHNbM10pKSB7XG5cbiAgICAgICAgICAgIC8vIEhhcyBtaW4gYW5kIG1heC5cbiAgICAgICAgICAgIHJldHVybiBuZXcgTnVtYmVyQ29udHJvbGxlclNsaWRlcihvYmplY3QsIHByb3BlcnR5LCBhcmd1bWVudHNbMl0sIGFyZ3VtZW50c1szXSk7XG5cbiAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IE51bWJlckNvbnRyb2xsZXJCb3gob2JqZWN0LCBwcm9wZXJ0eSwgeyBtaW46IGFyZ3VtZW50c1syXSwgbWF4OiBhcmd1bWVudHNbM10gfSk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb21tb24uaXNTdHJpbmcoaW5pdGlhbFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiBuZXcgU3RyaW5nQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb21tb24uaXNGdW5jdGlvbihpbml0aWFsVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBGdW5jdGlvbkNvbnRyb2xsZXIob2JqZWN0LCBwcm9wZXJ0eSwgJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbW1vbi5pc0Jvb2xlYW4oaW5pdGlhbFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiBuZXcgQm9vbGVhbkNvbnRyb2xsZXIob2JqZWN0LCBwcm9wZXJ0eSk7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfSkoZGF0LmNvbnRyb2xsZXJzLk9wdGlvbkNvbnRyb2xsZXIsXG5kYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlckJveCxcbmRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyU2xpZGVyLFxuZGF0LmNvbnRyb2xsZXJzLlN0cmluZ0NvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKENvbnRyb2xsZXIsIGRvbSwgY29tbW9uKSB7XG5cbiAgLyoqXG4gICAqIEBjbGFzcyBQcm92aWRlcyBhIHRleHQgaW5wdXQgdG8gYWx0ZXIgdGhlIHN0cmluZyBwcm9wZXJ0eSBvZiBhbiBvYmplY3QuXG4gICAqXG4gICAqIEBleHRlbmRzIGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqXG4gICAqIEBtZW1iZXIgZGF0LmNvbnRyb2xsZXJzXG4gICAqL1xuICB2YXIgU3RyaW5nQ29udHJvbGxlciA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHtcblxuICAgIFN0cmluZ0NvbnRyb2xsZXIuc3VwZXJjbGFzcy5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHkpO1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuX19pbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgdGhpcy5fX2lucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XG5cbiAgICBkb20uYmluZCh0aGlzLl9faW5wdXQsICdrZXl1cCcsIG9uQ2hhbmdlKTtcbiAgICBkb20uYmluZCh0aGlzLl9faW5wdXQsICdjaGFuZ2UnLCBvbkNoYW5nZSk7XG4gICAgZG9tLmJpbmQodGhpcy5fX2lucHV0LCAnYmx1cicsIG9uQmx1cik7XG4gICAgZG9tLmJpbmQodGhpcy5fX2lucHV0LCAna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgIHRoaXMuYmx1cigpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIFxuXG4gICAgZnVuY3Rpb24gb25DaGFuZ2UoKSB7XG4gICAgICBfdGhpcy5zZXRWYWx1ZShfdGhpcy5fX2lucHV0LnZhbHVlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkJsdXIoKSB7XG4gICAgICBpZiAoX3RoaXMuX19vbkZpbmlzaENoYW5nZSkge1xuICAgICAgICBfdGhpcy5fX29uRmluaXNoQ2hhbmdlLmNhbGwoX3RoaXMsIF90aGlzLmdldFZhbHVlKCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudXBkYXRlRGlzcGxheSgpO1xuXG4gICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX19pbnB1dCk7XG5cbiAgfTtcblxuICBTdHJpbmdDb250cm9sbGVyLnN1cGVyY2xhc3MgPSBDb250cm9sbGVyO1xuXG4gIGNvbW1vbi5leHRlbmQoXG5cbiAgICAgIFN0cmluZ0NvbnRyb2xsZXIucHJvdG90eXBlLFxuICAgICAgQ29udHJvbGxlci5wcm90b3R5cGUsXG5cbiAgICAgIHtcblxuICAgICAgICB1cGRhdGVEaXNwbGF5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyBTdG9wcyB0aGUgY2FyZXQgZnJvbSBtb3Zpbmcgb24gYWNjb3VudCBvZjpcbiAgICAgICAgICAvLyBrZXl1cCAtPiBzZXRWYWx1ZSAtPiB1cGRhdGVEaXNwbGF5XG4gICAgICAgICAgaWYgKCFkb20uaXNBY3RpdmUodGhpcy5fX2lucHV0KSkge1xuICAgICAgICAgICAgdGhpcy5fX2lucHV0LnZhbHVlID0gdGhpcy5nZXRWYWx1ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gU3RyaW5nQ29udHJvbGxlci5zdXBlcmNsYXNzLnByb3RvdHlwZS51cGRhdGVEaXNwbGF5LmNhbGwodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICk7XG5cbiAgcmV0dXJuIFN0cmluZ0NvbnRyb2xsZXI7XG5cbn0pKGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyLFxuZGF0LmRvbS5kb20sXG5kYXQudXRpbHMuY29tbW9uKSxcbmRhdC5jb250cm9sbGVycy5GdW5jdGlvbkNvbnRyb2xsZXIsXG5kYXQuY29udHJvbGxlcnMuQm9vbGVhbkNvbnRyb2xsZXIsXG5kYXQudXRpbHMuY29tbW9uKSxcbmRhdC5jb250cm9sbGVycy5Db250cm9sbGVyLFxuZGF0LmNvbnRyb2xsZXJzLkJvb2xlYW5Db250cm9sbGVyLFxuZGF0LmNvbnRyb2xsZXJzLkZ1bmN0aW9uQ29udHJvbGxlcixcbmRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyQm94LFxuZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJTbGlkZXIsXG5kYXQuY29udHJvbGxlcnMuT3B0aW9uQ29udHJvbGxlcixcbmRhdC5jb250cm9sbGVycy5Db2xvckNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKENvbnRyb2xsZXIsIGRvbSwgQ29sb3IsIGludGVycHJldCwgY29tbW9uKSB7XG5cbiAgdmFyIENvbG9yQ29udHJvbGxlciA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHtcblxuICAgIENvbG9yQ29udHJvbGxlci5zdXBlcmNsYXNzLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgICB0aGlzLl9fY29sb3IgPSBuZXcgQ29sb3IodGhpcy5nZXRWYWx1ZSgpKTtcbiAgICB0aGlzLl9fdGVtcCA9IG5ldyBDb2xvcigwKTtcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGRvbS5tYWtlU2VsZWN0YWJsZSh0aGlzLmRvbUVsZW1lbnQsIGZhbHNlKTtcblxuICAgIHRoaXMuX19zZWxlY3RvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX19zZWxlY3Rvci5jbGFzc05hbWUgPSAnc2VsZWN0b3InO1xuXG4gICAgdGhpcy5fX3NhdHVyYXRpb25fZmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9fc2F0dXJhdGlvbl9maWVsZC5jbGFzc05hbWUgPSAnc2F0dXJhdGlvbi1maWVsZCc7XG5cbiAgICB0aGlzLl9fZmllbGRfa25vYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX19maWVsZF9rbm9iLmNsYXNzTmFtZSA9ICdmaWVsZC1rbm9iJztcbiAgICB0aGlzLl9fZmllbGRfa25vYl9ib3JkZXIgPSAnMnB4IHNvbGlkICc7XG5cbiAgICB0aGlzLl9faHVlX2tub2IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9faHVlX2tub2IuY2xhc3NOYW1lID0gJ2h1ZS1rbm9iJztcblxuICAgIHRoaXMuX19odWVfZmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9faHVlX2ZpZWxkLmNsYXNzTmFtZSA9ICdodWUtZmllbGQnO1xuXG4gICAgdGhpcy5fX2lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICB0aGlzLl9faW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICB0aGlzLl9faW5wdXRfdGV4dFNoYWRvdyA9ICcwIDFweCAxcHggJztcblxuICAgIGRvbS5iaW5kKHRoaXMuX19pbnB1dCwgJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykgeyAvLyBvbiBlbnRlclxuICAgICAgICBvbkJsdXIuY2FsbCh0aGlzKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGRvbS5iaW5kKHRoaXMuX19pbnB1dCwgJ2JsdXInLCBvbkJsdXIpO1xuXG4gICAgZG9tLmJpbmQodGhpcy5fX3NlbGVjdG9yLCAnbW91c2Vkb3duJywgZnVuY3Rpb24oZSkge1xuXG4gICAgICBkb21cbiAgICAgICAgLmFkZENsYXNzKHRoaXMsICdkcmFnJylcbiAgICAgICAgLmJpbmQod2luZG93LCAnbW91c2V1cCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBkb20ucmVtb3ZlQ2xhc3MoX3RoaXMuX19zZWxlY3RvciwgJ2RyYWcnKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIHZhciB2YWx1ZV9maWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgY29tbW9uLmV4dGVuZCh0aGlzLl9fc2VsZWN0b3Iuc3R5bGUsIHtcbiAgICAgIHdpZHRoOiAnMTIycHgnLFxuICAgICAgaGVpZ2h0OiAnMTAycHgnLFxuICAgICAgcGFkZGluZzogJzNweCcsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMjIyJyxcbiAgICAgIGJveFNoYWRvdzogJzBweCAxcHggM3B4IHJnYmEoMCwwLDAsMC4zKSdcbiAgICB9KTtcblxuICAgIGNvbW1vbi5leHRlbmQodGhpcy5fX2ZpZWxkX2tub2Iuc3R5bGUsIHtcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgd2lkdGg6ICcxMnB4JyxcbiAgICAgIGhlaWdodDogJzEycHgnLFxuICAgICAgYm9yZGVyOiB0aGlzLl9fZmllbGRfa25vYl9ib3JkZXIgKyAodGhpcy5fX2NvbG9yLnYgPCAuNSA/ICcjZmZmJyA6ICcjMDAwJyksXG4gICAgICBib3hTaGFkb3c6ICcwcHggMXB4IDNweCByZ2JhKDAsMCwwLDAuNSknLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnMTJweCcsXG4gICAgICB6SW5kZXg6IDFcbiAgICB9KTtcbiAgICBcbiAgICBjb21tb24uZXh0ZW5kKHRoaXMuX19odWVfa25vYi5zdHlsZSwge1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB3aWR0aDogJzE1cHgnLFxuICAgICAgaGVpZ2h0OiAnMnB4JyxcbiAgICAgIGJvcmRlclJpZ2h0OiAnNHB4IHNvbGlkICNmZmYnLFxuICAgICAgekluZGV4OiAxXG4gICAgfSk7XG5cbiAgICBjb21tb24uZXh0ZW5kKHRoaXMuX19zYXR1cmF0aW9uX2ZpZWxkLnN0eWxlLCB7XG4gICAgICB3aWR0aDogJzEwMHB4JyxcbiAgICAgIGhlaWdodDogJzEwMHB4JyxcbiAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjNTU1JyxcbiAgICAgIG1hcmdpblJpZ2h0OiAnM3B4JyxcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgY3Vyc29yOiAncG9pbnRlcidcbiAgICB9KTtcblxuICAgIGNvbW1vbi5leHRlbmQodmFsdWVfZmllbGQuc3R5bGUsIHtcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgIGJhY2tncm91bmQ6ICdub25lJ1xuICAgIH0pO1xuICAgIFxuICAgIGxpbmVhckdyYWRpZW50KHZhbHVlX2ZpZWxkLCAndG9wJywgJ3JnYmEoMCwwLDAsMCknLCAnIzAwMCcpO1xuXG4gICAgY29tbW9uLmV4dGVuZCh0aGlzLl9faHVlX2ZpZWxkLnN0eWxlLCB7XG4gICAgICB3aWR0aDogJzE1cHgnLFxuICAgICAgaGVpZ2h0OiAnMTAwcHgnLFxuICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICBib3JkZXI6ICcxcHggc29saWQgIzU1NScsXG4gICAgICBjdXJzb3I6ICducy1yZXNpemUnXG4gICAgfSk7XG5cbiAgICBodWVHcmFkaWVudCh0aGlzLl9faHVlX2ZpZWxkKTtcblxuICAgIGNvbW1vbi5leHRlbmQodGhpcy5fX2lucHV0LnN0eWxlLCB7XG4gICAgICBvdXRsaW5lOiAnbm9uZScsXG4vLyAgICAgIHdpZHRoOiAnMTIwcHgnLFxuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbi8vICAgICAgcGFkZGluZzogJzRweCcsXG4vLyAgICAgIG1hcmdpbkJvdHRvbTogJzZweCcsXG4gICAgICBjb2xvcjogJyNmZmYnLFxuICAgICAgYm9yZGVyOiAwLFxuICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgdGV4dFNoYWRvdzogdGhpcy5fX2lucHV0X3RleHRTaGFkb3cgKyAncmdiYSgwLDAsMCwwLjcpJ1xuICAgIH0pO1xuXG4gICAgZG9tLmJpbmQodGhpcy5fX3NhdHVyYXRpb25fZmllbGQsICdtb3VzZWRvd24nLCBmaWVsZERvd24pO1xuICAgIGRvbS5iaW5kKHRoaXMuX19maWVsZF9rbm9iLCAnbW91c2Vkb3duJywgZmllbGREb3duKTtcblxuICAgIGRvbS5iaW5kKHRoaXMuX19odWVfZmllbGQsICdtb3VzZWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgICBzZXRIKGUpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgc2V0SCk7XG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZXVwJywgdW5iaW5kSCk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBmaWVsZERvd24oZSkge1xuICAgICAgc2V0U1YoZSk7XG4gICAgICAvLyBkb2N1bWVudC5ib2R5LnN0eWxlLmN1cnNvciA9ICdub25lJztcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIHNldFNWKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCB1bmJpbmRTVik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdW5iaW5kU1YoKSB7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIHNldFNWKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2V1cCcsIHVuYmluZFNWKTtcbiAgICAgIC8vIGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gJ2RlZmF1bHQnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQmx1cigpIHtcbiAgICAgIHZhciBpID0gaW50ZXJwcmV0KHRoaXMudmFsdWUpO1xuICAgICAgaWYgKGkgIT09IGZhbHNlKSB7XG4gICAgICAgIF90aGlzLl9fY29sb3IuX19zdGF0ZSA9IGk7XG4gICAgICAgIF90aGlzLnNldFZhbHVlKF90aGlzLl9fY29sb3IudG9PcmlnaW5hbCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSBfdGhpcy5fX2NvbG9yLnRvU3RyaW5nKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdW5iaW5kSCgpIHtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgc2V0SCk7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCB1bmJpbmRIKTtcbiAgICB9XG5cbiAgICB0aGlzLl9fc2F0dXJhdGlvbl9maWVsZC5hcHBlbmRDaGlsZCh2YWx1ZV9maWVsZCk7XG4gICAgdGhpcy5fX3NlbGVjdG9yLmFwcGVuZENoaWxkKHRoaXMuX19maWVsZF9rbm9iKTtcbiAgICB0aGlzLl9fc2VsZWN0b3IuYXBwZW5kQ2hpbGQodGhpcy5fX3NhdHVyYXRpb25fZmllbGQpO1xuICAgIHRoaXMuX19zZWxlY3Rvci5hcHBlbmRDaGlsZCh0aGlzLl9faHVlX2ZpZWxkKTtcbiAgICB0aGlzLl9faHVlX2ZpZWxkLmFwcGVuZENoaWxkKHRoaXMuX19odWVfa25vYik7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX2lucHV0KTtcbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX3NlbGVjdG9yKTtcblxuICAgIHRoaXMudXBkYXRlRGlzcGxheSgpO1xuXG4gICAgZnVuY3Rpb24gc2V0U1YoZSkge1xuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHZhciB3ID0gZG9tLmdldFdpZHRoKF90aGlzLl9fc2F0dXJhdGlvbl9maWVsZCk7XG4gICAgICB2YXIgbyA9IGRvbS5nZXRPZmZzZXQoX3RoaXMuX19zYXR1cmF0aW9uX2ZpZWxkKTtcbiAgICAgIHZhciBzID0gKGUuY2xpZW50WCAtIG8ubGVmdCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCkgLyB3O1xuICAgICAgdmFyIHYgPSAxIC0gKGUuY2xpZW50WSAtIG8udG9wICsgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3ApIC8gdztcblxuICAgICAgaWYgKHYgPiAxKSB2ID0gMTtcbiAgICAgIGVsc2UgaWYgKHYgPCAwKSB2ID0gMDtcblxuICAgICAgaWYgKHMgPiAxKSBzID0gMTtcbiAgICAgIGVsc2UgaWYgKHMgPCAwKSBzID0gMDtcblxuICAgICAgX3RoaXMuX19jb2xvci52ID0gdjtcbiAgICAgIF90aGlzLl9fY29sb3IucyA9IHM7XG5cbiAgICAgIF90aGlzLnNldFZhbHVlKF90aGlzLl9fY29sb3IudG9PcmlnaW5hbCgpKTtcblxuXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRIKGUpIHtcblxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB2YXIgcyA9IGRvbS5nZXRIZWlnaHQoX3RoaXMuX19odWVfZmllbGQpO1xuICAgICAgdmFyIG8gPSBkb20uZ2V0T2Zmc2V0KF90aGlzLl9faHVlX2ZpZWxkKTtcbiAgICAgIHZhciBoID0gMSAtIChlLmNsaWVudFkgLSBvLnRvcCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wKSAvIHM7XG5cbiAgICAgIGlmIChoID4gMSkgaCA9IDE7XG4gICAgICBlbHNlIGlmIChoIDwgMCkgaCA9IDA7XG5cbiAgICAgIF90aGlzLl9fY29sb3IuaCA9IGggKiAzNjA7XG5cbiAgICAgIF90aGlzLnNldFZhbHVlKF90aGlzLl9fY29sb3IudG9PcmlnaW5hbCgpKTtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxuXG4gIH07XG5cbiAgQ29sb3JDb250cm9sbGVyLnN1cGVyY2xhc3MgPSBDb250cm9sbGVyO1xuXG4gIGNvbW1vbi5leHRlbmQoXG5cbiAgICAgIENvbG9yQ29udHJvbGxlci5wcm90b3R5cGUsXG4gICAgICBDb250cm9sbGVyLnByb3RvdHlwZSxcblxuICAgICAge1xuXG4gICAgICAgIHVwZGF0ZURpc3BsYXk6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgdmFyIGkgPSBpbnRlcnByZXQodGhpcy5nZXRWYWx1ZSgpKTtcblxuICAgICAgICAgIGlmIChpICE9PSBmYWxzZSkge1xuXG4gICAgICAgICAgICB2YXIgbWlzbWF0Y2ggPSBmYWxzZTtcblxuICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIG1pc21hdGNoIG9uIHRoZSBpbnRlcnByZXRlZCB2YWx1ZS5cblxuICAgICAgICAgICAgY29tbW9uLmVhY2goQ29sb3IuQ09NUE9ORU5UUywgZnVuY3Rpb24oY29tcG9uZW50KSB7XG4gICAgICAgICAgICAgIGlmICghY29tbW9uLmlzVW5kZWZpbmVkKGlbY29tcG9uZW50XSkgJiZcbiAgICAgICAgICAgICAgICAgICFjb21tb24uaXNVbmRlZmluZWQodGhpcy5fX2NvbG9yLl9fc3RhdGVbY29tcG9uZW50XSkgJiZcbiAgICAgICAgICAgICAgICAgIGlbY29tcG9uZW50XSAhPT0gdGhpcy5fX2NvbG9yLl9fc3RhdGVbY29tcG9uZW50XSkge1xuICAgICAgICAgICAgICAgIG1pc21hdGNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge307IC8vIGJyZWFrXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgICAgICAvLyBJZiBub3RoaW5nIGRpdmVyZ2VzLCB3ZSBrZWVwIG91ciBwcmV2aW91cyB2YWx1ZXNcbiAgICAgICAgICAgIC8vIGZvciBzdGF0ZWZ1bG5lc3MsIG90aGVyd2lzZSB3ZSByZWNhbGN1bGF0ZSBmcmVzaFxuICAgICAgICAgICAgaWYgKG1pc21hdGNoKSB7XG4gICAgICAgICAgICAgIGNvbW1vbi5leHRlbmQodGhpcy5fX2NvbG9yLl9fc3RhdGUsIGkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29tbW9uLmV4dGVuZCh0aGlzLl9fdGVtcC5fX3N0YXRlLCB0aGlzLl9fY29sb3IuX19zdGF0ZSk7XG5cbiAgICAgICAgICB0aGlzLl9fdGVtcC5hID0gMTtcblxuICAgICAgICAgIHZhciBmbGlwID0gKHRoaXMuX19jb2xvci52IDwgLjUgfHwgdGhpcy5fX2NvbG9yLnMgPiAuNSkgPyAyNTUgOiAwO1xuICAgICAgICAgIHZhciBfZmxpcCA9IDI1NSAtIGZsaXA7XG5cbiAgICAgICAgICBjb21tb24uZXh0ZW5kKHRoaXMuX19maWVsZF9rbm9iLnN0eWxlLCB7XG4gICAgICAgICAgICBtYXJnaW5MZWZ0OiAxMDAgKiB0aGlzLl9fY29sb3IucyAtIDcgKyAncHgnLFxuICAgICAgICAgICAgbWFyZ2luVG9wOiAxMDAgKiAoMSAtIHRoaXMuX19jb2xvci52KSAtIDcgKyAncHgnLFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLl9fdGVtcC50b1N0cmluZygpLFxuICAgICAgICAgICAgYm9yZGVyOiB0aGlzLl9fZmllbGRfa25vYl9ib3JkZXIgKyAncmdiKCcgKyBmbGlwICsgJywnICsgZmxpcCArICcsJyArIGZsaXAgKycpJ1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5fX2h1ZV9rbm9iLnN0eWxlLm1hcmdpblRvcCA9ICgxIC0gdGhpcy5fX2NvbG9yLmggLyAzNjApICogMTAwICsgJ3B4J1xuXG4gICAgICAgICAgdGhpcy5fX3RlbXAucyA9IDE7XG4gICAgICAgICAgdGhpcy5fX3RlbXAudiA9IDE7XG5cbiAgICAgICAgICBsaW5lYXJHcmFkaWVudCh0aGlzLl9fc2F0dXJhdGlvbl9maWVsZCwgJ2xlZnQnLCAnI2ZmZicsIHRoaXMuX190ZW1wLnRvU3RyaW5nKCkpO1xuXG4gICAgICAgICAgY29tbW9uLmV4dGVuZCh0aGlzLl9faW5wdXQuc3R5bGUsIHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5fX2lucHV0LnZhbHVlID0gdGhpcy5fX2NvbG9yLnRvU3RyaW5nKCksXG4gICAgICAgICAgICBjb2xvcjogJ3JnYignICsgZmxpcCArICcsJyArIGZsaXAgKyAnLCcgKyBmbGlwICsnKScsXG4gICAgICAgICAgICB0ZXh0U2hhZG93OiB0aGlzLl9faW5wdXRfdGV4dFNoYWRvdyArICdyZ2JhKCcgKyBfZmxpcCArICcsJyArIF9mbGlwICsgJywnICsgX2ZsaXAgKycsLjcpJ1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICk7XG4gIFxuICB2YXIgdmVuZG9ycyA9IFsnLW1vei0nLCctby0nLCctd2Via2l0LScsJy1tcy0nLCcnXTtcbiAgXG4gIGZ1bmN0aW9uIGxpbmVhckdyYWRpZW50KGVsZW0sIHgsIGEsIGIpIHtcbiAgICBlbGVtLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICBjb21tb24uZWFjaCh2ZW5kb3JzLCBmdW5jdGlvbih2ZW5kb3IpIHtcbiAgICAgIGVsZW0uc3R5bGUuY3NzVGV4dCArPSAnYmFja2dyb3VuZDogJyArIHZlbmRvciArICdsaW5lYXItZ3JhZGllbnQoJyt4KycsICcrYSsnIDAlLCAnICsgYiArICcgMTAwJSk7ICc7XG4gICAgfSk7XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIGh1ZUdyYWRpZW50KGVsZW0pIHtcbiAgICBlbGVtLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICBlbGVtLnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQ6IC1tb3otbGluZWFyLWdyYWRpZW50KHRvcCwgICNmZjAwMDAgMCUsICNmZjAwZmYgMTclLCAjMDAwMGZmIDM0JSwgIzAwZmZmZiA1MCUsICMwMGZmMDAgNjclLCAjZmZmZjAwIDg0JSwgI2ZmMDAwMCAxMDAlKTsnXG4gICAgZWxlbS5zdHlsZS5jc3NUZXh0ICs9ICdiYWNrZ3JvdW5kOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICAjZmYwMDAwIDAlLCNmZjAwZmYgMTclLCMwMDAwZmYgMzQlLCMwMGZmZmYgNTAlLCMwMGZmMDAgNjclLCNmZmZmMDAgODQlLCNmZjAwMDAgMTAwJSk7J1xuICAgIGVsZW0uc3R5bGUuY3NzVGV4dCArPSAnYmFja2dyb3VuZDogLW8tbGluZWFyLWdyYWRpZW50KHRvcCwgICNmZjAwMDAgMCUsI2ZmMDBmZiAxNyUsIzAwMDBmZiAzNCUsIzAwZmZmZiA1MCUsIzAwZmYwMCA2NyUsI2ZmZmYwMCA4NCUsI2ZmMDAwMCAxMDAlKTsnXG4gICAgZWxlbS5zdHlsZS5jc3NUZXh0ICs9ICdiYWNrZ3JvdW5kOiAtbXMtbGluZWFyLWdyYWRpZW50KHRvcCwgICNmZjAwMDAgMCUsI2ZmMDBmZiAxNyUsIzAwMDBmZiAzNCUsIzAwZmZmZiA1MCUsIzAwZmYwMCA2NyUsI2ZmZmYwMCA4NCUsI2ZmMDAwMCAxMDAlKTsnXG4gICAgZWxlbS5zdHlsZS5jc3NUZXh0ICs9ICdiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG9wLCAgI2ZmMDAwMCAwJSwjZmYwMGZmIDE3JSwjMDAwMGZmIDM0JSwjMDBmZmZmIDUwJSwjMDBmZjAwIDY3JSwjZmZmZjAwIDg0JSwjZmYwMDAwIDEwMCUpOydcbiAgfVxuXG5cbiAgcmV0dXJuIENvbG9yQ29udHJvbGxlcjtcblxufSkoZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXIsXG5kYXQuZG9tLmRvbSxcbmRhdC5jb2xvci5Db2xvciA9IChmdW5jdGlvbiAoaW50ZXJwcmV0LCBtYXRoLCB0b1N0cmluZywgY29tbW9uKSB7XG5cbiAgdmFyIENvbG9yID0gZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLl9fc3RhdGUgPSBpbnRlcnByZXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIGlmICh0aGlzLl9fc3RhdGUgPT09IGZhbHNlKSB7XG4gICAgICB0aHJvdyAnRmFpbGVkIHRvIGludGVycHJldCBjb2xvciBhcmd1bWVudHMnO1xuICAgIH1cblxuICAgIHRoaXMuX19zdGF0ZS5hID0gdGhpcy5fX3N0YXRlLmEgfHwgMTtcblxuXG4gIH07XG5cbiAgQ29sb3IuQ09NUE9ORU5UUyA9IFsncicsJ2cnLCdiJywnaCcsJ3MnLCd2JywnaGV4JywnYSddO1xuXG4gIGNvbW1vbi5leHRlbmQoQ29sb3IucHJvdG90eXBlLCB7XG5cbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdG9TdHJpbmcodGhpcyk7XG4gICAgfSxcblxuICAgIHRvT3JpZ2luYWw6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZS5jb252ZXJzaW9uLndyaXRlKHRoaXMpO1xuICAgIH1cblxuICB9KTtcblxuICBkZWZpbmVSR0JDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAncicsIDIpO1xuICBkZWZpbmVSR0JDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAnZycsIDEpO1xuICBkZWZpbmVSR0JDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAnYicsIDApO1xuXG4gIGRlZmluZUhTVkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdoJyk7XG4gIGRlZmluZUhTVkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdzJyk7XG4gIGRlZmluZUhTVkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICd2Jyk7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbG9yLnByb3RvdHlwZSwgJ2EnLCB7XG5cbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZS5hO1xuICAgIH0sXG5cbiAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHRoaXMuX19zdGF0ZS5hID0gdjtcbiAgICB9XG5cbiAgfSk7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbG9yLnByb3RvdHlwZSwgJ2hleCcsIHtcblxuICAgIGdldDogZnVuY3Rpb24oKSB7XG5cbiAgICAgIGlmICghdGhpcy5fX3N0YXRlLnNwYWNlICE9PSAnSEVYJykge1xuICAgICAgICB0aGlzLl9fc3RhdGUuaGV4ID0gbWF0aC5yZ2JfdG9faGV4KHRoaXMuciwgdGhpcy5nLCB0aGlzLmIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5fX3N0YXRlLmhleDtcblxuICAgIH0sXG5cbiAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcblxuICAgICAgdGhpcy5fX3N0YXRlLnNwYWNlID0gJ0hFWCc7XG4gICAgICB0aGlzLl9fc3RhdGUuaGV4ID0gdjtcblxuICAgIH1cblxuICB9KTtcblxuICBmdW5jdGlvbiBkZWZpbmVSR0JDb21wb25lbnQodGFyZ2V0LCBjb21wb25lbnQsIGNvbXBvbmVudEhleEluZGV4KSB7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb21wb25lbnQsIHtcblxuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcblxuICAgICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlID09PSAnUkdCJykge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9fc3RhdGVbY29tcG9uZW50XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlY2FsY3VsYXRlUkdCKHRoaXMsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9fc3RhdGVbY29tcG9uZW50XTtcblxuICAgICAgfSxcblxuICAgICAgc2V0OiBmdW5jdGlvbih2KSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX19zdGF0ZS5zcGFjZSAhPT0gJ1JHQicpIHtcbiAgICAgICAgICByZWNhbGN1bGF0ZVJHQih0aGlzLCBjb21wb25lbnQsIGNvbXBvbmVudEhleEluZGV4KTtcbiAgICAgICAgICB0aGlzLl9fc3RhdGUuc3BhY2UgPSAnUkdCJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdID0gdjtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlZmluZUhTVkNvbXBvbmVudCh0YXJnZXQsIGNvbXBvbmVudCkge1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29tcG9uZW50LCB7XG5cbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX19zdGF0ZS5zcGFjZSA9PT0gJ0hTVicpXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xuXG4gICAgICAgIHJlY2FsY3VsYXRlSFNWKHRoaXMpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9fc3RhdGVbY29tcG9uZW50XTtcblxuICAgICAgfSxcblxuICAgICAgc2V0OiBmdW5jdGlvbih2KSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX19zdGF0ZS5zcGFjZSAhPT0gJ0hTVicpIHtcbiAgICAgICAgICByZWNhbGN1bGF0ZUhTVih0aGlzKTtcbiAgICAgICAgICB0aGlzLl9fc3RhdGUuc3BhY2UgPSAnSFNWJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdID0gdjtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlY2FsY3VsYXRlUkdCKGNvbG9yLCBjb21wb25lbnQsIGNvbXBvbmVudEhleEluZGV4KSB7XG5cbiAgICBpZiAoY29sb3IuX19zdGF0ZS5zcGFjZSA9PT0gJ0hFWCcpIHtcblxuICAgICAgY29sb3IuX19zdGF0ZVtjb21wb25lbnRdID0gbWF0aC5jb21wb25lbnRfZnJvbV9oZXgoY29sb3IuX19zdGF0ZS5oZXgsIGNvbXBvbmVudEhleEluZGV4KTtcblxuICAgIH0gZWxzZSBpZiAoY29sb3IuX19zdGF0ZS5zcGFjZSA9PT0gJ0hTVicpIHtcblxuICAgICAgY29tbW9uLmV4dGVuZChjb2xvci5fX3N0YXRlLCBtYXRoLmhzdl90b19yZ2IoY29sb3IuX19zdGF0ZS5oLCBjb2xvci5fX3N0YXRlLnMsIGNvbG9yLl9fc3RhdGUudikpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhyb3cgJ0NvcnJ1cHRlZCBjb2xvciBzdGF0ZSc7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlY2FsY3VsYXRlSFNWKGNvbG9yKSB7XG5cbiAgICB2YXIgcmVzdWx0ID0gbWF0aC5yZ2JfdG9faHN2KGNvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmIpO1xuXG4gICAgY29tbW9uLmV4dGVuZChjb2xvci5fX3N0YXRlLFxuICAgICAgICB7XG4gICAgICAgICAgczogcmVzdWx0LnMsXG4gICAgICAgICAgdjogcmVzdWx0LnZcbiAgICAgICAgfVxuICAgICk7XG5cbiAgICBpZiAoIWNvbW1vbi5pc05hTihyZXN1bHQuaCkpIHtcbiAgICAgIGNvbG9yLl9fc3RhdGUuaCA9IHJlc3VsdC5oO1xuICAgIH0gZWxzZSBpZiAoY29tbW9uLmlzVW5kZWZpbmVkKGNvbG9yLl9fc3RhdGUuaCkpIHtcbiAgICAgIGNvbG9yLl9fc3RhdGUuaCA9IDA7XG4gICAgfVxuXG4gIH1cblxuICByZXR1cm4gQ29sb3I7XG5cbn0pKGRhdC5jb2xvci5pbnRlcnByZXQsXG5kYXQuY29sb3IubWF0aCA9IChmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIHRtcENvbXBvbmVudDtcblxuICByZXR1cm4ge1xuXG4gICAgaHN2X3RvX3JnYjogZnVuY3Rpb24oaCwgcywgdikge1xuXG4gICAgICB2YXIgaGkgPSBNYXRoLmZsb29yKGggLyA2MCkgJSA2O1xuXG4gICAgICB2YXIgZiA9IGggLyA2MCAtIE1hdGguZmxvb3IoaCAvIDYwKTtcbiAgICAgIHZhciBwID0gdiAqICgxLjAgLSBzKTtcbiAgICAgIHZhciBxID0gdiAqICgxLjAgLSAoZiAqIHMpKTtcbiAgICAgIHZhciB0ID0gdiAqICgxLjAgLSAoKDEuMCAtIGYpICogcykpO1xuICAgICAgdmFyIGMgPSBbXG4gICAgICAgIFt2LCB0LCBwXSxcbiAgICAgICAgW3EsIHYsIHBdLFxuICAgICAgICBbcCwgdiwgdF0sXG4gICAgICAgIFtwLCBxLCB2XSxcbiAgICAgICAgW3QsIHAsIHZdLFxuICAgICAgICBbdiwgcCwgcV1cbiAgICAgIF1baGldO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICByOiBjWzBdICogMjU1LFxuICAgICAgICBnOiBjWzFdICogMjU1LFxuICAgICAgICBiOiBjWzJdICogMjU1XG4gICAgICB9O1xuXG4gICAgfSxcblxuICAgIHJnYl90b19oc3Y6IGZ1bmN0aW9uKHIsIGcsIGIpIHtcblxuICAgICAgdmFyIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpLFxuICAgICAgICAgIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpLFxuICAgICAgICAgIGRlbHRhID0gbWF4IC0gbWluLFxuICAgICAgICAgIGgsIHM7XG5cbiAgICAgIGlmIChtYXggIT0gMCkge1xuICAgICAgICBzID0gZGVsdGEgLyBtYXg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGg6IE5hTixcbiAgICAgICAgICBzOiAwLFxuICAgICAgICAgIHY6IDBcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKHIgPT0gbWF4KSB7XG4gICAgICAgIGggPSAoZyAtIGIpIC8gZGVsdGE7XG4gICAgICB9IGVsc2UgaWYgKGcgPT0gbWF4KSB7XG4gICAgICAgIGggPSAyICsgKGIgLSByKSAvIGRlbHRhO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaCA9IDQgKyAociAtIGcpIC8gZGVsdGE7XG4gICAgICB9XG4gICAgICBoIC89IDY7XG4gICAgICBpZiAoaCA8IDApIHtcbiAgICAgICAgaCArPSAxO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBoOiBoICogMzYwLFxuICAgICAgICBzOiBzLFxuICAgICAgICB2OiBtYXggLyAyNTVcbiAgICAgIH07XG4gICAgfSxcblxuICAgIHJnYl90b19oZXg6IGZ1bmN0aW9uKHIsIGcsIGIpIHtcbiAgICAgIHZhciBoZXggPSB0aGlzLmhleF93aXRoX2NvbXBvbmVudCgwLCAyLCByKTtcbiAgICAgIGhleCA9IHRoaXMuaGV4X3dpdGhfY29tcG9uZW50KGhleCwgMSwgZyk7XG4gICAgICBoZXggPSB0aGlzLmhleF93aXRoX2NvbXBvbmVudChoZXgsIDAsIGIpO1xuICAgICAgcmV0dXJuIGhleDtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50X2Zyb21faGV4OiBmdW5jdGlvbihoZXgsIGNvbXBvbmVudEluZGV4KSB7XG4gICAgICByZXR1cm4gKGhleCA+PiAoY29tcG9uZW50SW5kZXggKiA4KSkgJiAweEZGO1xuICAgIH0sXG5cbiAgICBoZXhfd2l0aF9jb21wb25lbnQ6IGZ1bmN0aW9uKGhleCwgY29tcG9uZW50SW5kZXgsIHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUgPDwgKHRtcENvbXBvbmVudCA9IGNvbXBvbmVudEluZGV4ICogOCkgfCAoaGV4ICYgfiAoMHhGRiA8PCB0bXBDb21wb25lbnQpKTtcbiAgICB9XG5cbiAgfVxuXG59KSgpLFxuZGF0LmNvbG9yLnRvU3RyaW5nLFxuZGF0LnV0aWxzLmNvbW1vbiksXG5kYXQuY29sb3IuaW50ZXJwcmV0LFxuZGF0LnV0aWxzLmNvbW1vbiksXG5kYXQudXRpbHMucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gKGZ1bmN0aW9uICgpIHtcblxuICAvKipcbiAgICogcmVxdWlyZWpzIHZlcnNpb24gb2YgUGF1bCBJcmlzaCdzIFJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgKiBodHRwOi8vcGF1bGlyaXNoLmNvbS8yMDExL3JlcXVlc3RhbmltYXRpb25mcmFtZS1mb3Itc21hcnQtYW5pbWF0aW5nL1xuICAgKi9cblxuICByZXR1cm4gd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgIHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgZnVuY3Rpb24oY2FsbGJhY2ssIGVsZW1lbnQpIHtcblxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcblxuICAgICAgfTtcbn0pKCksXG5kYXQuZG9tLkNlbnRlcmVkRGl2ID0gKGZ1bmN0aW9uIChkb20sIGNvbW1vbikge1xuXG5cbiAgdmFyIENlbnRlcmVkRGl2ID0gZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmJhY2tncm91bmRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29tbW9uLmV4dGVuZCh0aGlzLmJhY2tncm91bmRFbGVtZW50LnN0eWxlLCB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsMCwwLDAuOCknLFxuICAgICAgdG9wOiAwLFxuICAgICAgbGVmdDogMCxcbiAgICAgIGRpc3BsYXk6ICdub25lJyxcbiAgICAgIHpJbmRleDogJzEwMDAnLFxuICAgICAgb3BhY2l0eTogMCxcbiAgICAgIFdlYmtpdFRyYW5zaXRpb246ICdvcGFjaXR5IDAuMnMgbGluZWFyJ1xuICAgIH0pO1xuXG4gICAgZG9tLm1ha2VGdWxsc2NyZWVuKHRoaXMuYmFja2dyb3VuZEVsZW1lbnQpO1xuICAgIHRoaXMuYmFja2dyb3VuZEVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xuXG4gICAgdGhpcy5kb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29tbW9uLmV4dGVuZCh0aGlzLmRvbUVsZW1lbnQuc3R5bGUsIHtcbiAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgZGlzcGxheTogJ25vbmUnLFxuICAgICAgekluZGV4OiAnMTAwMScsXG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgV2Via2l0VHJhbnNpdGlvbjogJy13ZWJraXQtdHJhbnNmb3JtIDAuMnMgZWFzZS1vdXQsIG9wYWNpdHkgMC4ycyBsaW5lYXInXG4gICAgfSk7XG5cblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5iYWNrZ3JvdW5kRWxlbWVudCk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmRvbUVsZW1lbnQpO1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICBkb20uYmluZCh0aGlzLmJhY2tncm91bmRFbGVtZW50LCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIF90aGlzLmhpZGUoKTtcbiAgICB9KTtcblxuXG4gIH07XG5cbiAgQ2VudGVyZWREaXYucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbigpIHtcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgXG5cblxuICAgIHRoaXMuYmFja2dyb3VuZEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAwO1xuLy8gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLnRvcCA9ICc1MiUnO1xuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoMS4xKSc7XG5cbiAgICB0aGlzLmxheW91dCgpO1xuXG4gICAgY29tbW9uLmRlZmVyKGZ1bmN0aW9uKCkge1xuICAgICAgX3RoaXMuYmFja2dyb3VuZEVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICBfdGhpcy5kb21FbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgX3RoaXMuZG9tRWxlbWVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoMSknO1xuICAgIH0pO1xuXG4gIH07XG5cbiAgQ2VudGVyZWREaXYucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpIHtcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB2YXIgaGlkZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICBfdGhpcy5kb21FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICBfdGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgICBkb20udW5iaW5kKF90aGlzLmRvbUVsZW1lbnQsICd3ZWJraXRUcmFuc2l0aW9uRW5kJywgaGlkZSk7XG4gICAgICBkb20udW5iaW5kKF90aGlzLmRvbUVsZW1lbnQsICd0cmFuc2l0aW9uZW5kJywgaGlkZSk7XG4gICAgICBkb20udW5iaW5kKF90aGlzLmRvbUVsZW1lbnQsICdvVHJhbnNpdGlvbkVuZCcsIGhpZGUpO1xuXG4gICAgfTtcblxuICAgIGRvbS5iaW5kKHRoaXMuZG9tRWxlbWVudCwgJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBoaWRlKTtcbiAgICBkb20uYmluZCh0aGlzLmRvbUVsZW1lbnQsICd0cmFuc2l0aW9uZW5kJywgaGlkZSk7XG4gICAgZG9tLmJpbmQodGhpcy5kb21FbGVtZW50LCAnb1RyYW5zaXRpb25FbmQnLCBoaWRlKTtcblxuICAgIHRoaXMuYmFja2dyb3VuZEVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XG4vLyAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUudG9wID0gJzQ4JSc7XG4gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoMS4xKSc7XG5cbiAgfTtcblxuICBDZW50ZXJlZERpdi5wcm90b3R5cGUubGF5b3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLmxlZnQgPSB3aW5kb3cuaW5uZXJXaWR0aC8yIC0gZG9tLmdldFdpZHRoKHRoaXMuZG9tRWxlbWVudCkgLyAyICsgJ3B4JztcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUudG9wID0gd2luZG93LmlubmVySGVpZ2h0LzIgLSBkb20uZ2V0SGVpZ2h0KHRoaXMuZG9tRWxlbWVudCkgLyAyICsgJ3B4JztcbiAgfTtcbiAgXG4gIGZ1bmN0aW9uIGxvY2tTY3JvbGwoZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xuICB9XG5cbiAgcmV0dXJuIENlbnRlcmVkRGl2O1xuXG59KShkYXQuZG9tLmRvbSxcbmRhdC51dGlscy5jb21tb24pLFxuZGF0LmRvbS5kb20sXG5kYXQudXRpbHMuY29tbW9uKTsiLCIvKipcbiAqIGRhdC1ndWkgSmF2YVNjcmlwdCBDb250cm9sbGVyIExpYnJhcnlcbiAqIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9kYXQtZ3VpXG4gKlxuICogQ29weXJpZ2h0IDIwMTEgRGF0YSBBcnRzIFRlYW0sIEdvb2dsZSBDcmVhdGl2ZSBMYWJcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKi9cblxuLyoqIEBuYW1lc3BhY2UgKi9cbnZhciBkYXQgPSBtb2R1bGUuZXhwb3J0cyA9IGRhdCB8fCB7fTtcblxuLyoqIEBuYW1lc3BhY2UgKi9cbmRhdC5jb2xvciA9IGRhdC5jb2xvciB8fCB7fTtcblxuLyoqIEBuYW1lc3BhY2UgKi9cbmRhdC51dGlscyA9IGRhdC51dGlscyB8fCB7fTtcblxuZGF0LnV0aWxzLmNvbW1vbiA9IChmdW5jdGlvbiAoKSB7XG4gIFxuICB2YXIgQVJSX0VBQ0ggPSBBcnJheS5wcm90b3R5cGUuZm9yRWFjaDtcbiAgdmFyIEFSUl9TTElDRSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuICAvKipcbiAgICogQmFuZC1haWQgbWV0aG9kcyBmb3IgdGhpbmdzIHRoYXQgc2hvdWxkIGJlIGEgbG90IGVhc2llciBpbiBKYXZhU2NyaXB0LlxuICAgKiBJbXBsZW1lbnRhdGlvbiBhbmQgc3RydWN0dXJlIGluc3BpcmVkIGJ5IHVuZGVyc2NvcmUuanNcbiAgICogaHR0cDovL2RvY3VtZW50Y2xvdWQuZ2l0aHViLmNvbS91bmRlcnNjb3JlL1xuICAgKi9cblxuICByZXR1cm4geyBcbiAgICBcbiAgICBCUkVBSzoge30sXG4gIFxuICAgIGV4dGVuZDogZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICBcbiAgICAgIHRoaXMuZWFjaChBUlJfU0xJQ0UuY2FsbChhcmd1bWVudHMsIDEpLCBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopXG4gICAgICAgICAgaWYgKCF0aGlzLmlzVW5kZWZpbmVkKG9ialtrZXldKSkgXG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IG9ialtrZXldO1xuICAgICAgICBcbiAgICAgIH0sIHRoaXMpO1xuICAgICAgXG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgXG4gICAgfSxcbiAgICBcbiAgICBkZWZhdWx0czogZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICBcbiAgICAgIHRoaXMuZWFjaChBUlJfU0xJQ0UuY2FsbChhcmd1bWVudHMsIDEpLCBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopXG4gICAgICAgICAgaWYgKHRoaXMuaXNVbmRlZmluZWQodGFyZ2V0W2tleV0pKSBcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gb2JqW2tleV07XG4gICAgICAgIFxuICAgICAgfSwgdGhpcyk7XG4gICAgICBcbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgXG4gICAgfSxcbiAgICBcbiAgICBjb21wb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0b0NhbGwgPSBBUlJfU0xJQ0UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2YXIgYXJncyA9IEFSUl9TTElDRS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSB0b0NhbGwubGVuZ3RoIC0xOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIGFyZ3MgPSBbdG9DYWxsW2ldLmFwcGx5KHRoaXMsIGFyZ3MpXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gYXJnc1swXTtcbiAgICAgICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIGVhY2g6IGZ1bmN0aW9uKG9iaiwgaXRyLCBzY29wZSkge1xuXG4gICAgICBcbiAgICAgIGlmIChBUlJfRUFDSCAmJiBvYmouZm9yRWFjaCA9PT0gQVJSX0VBQ0gpIHsgXG4gICAgICAgIFxuICAgICAgICBvYmouZm9yRWFjaChpdHIsIHNjb3BlKTtcbiAgICAgICAgXG4gICAgICB9IGVsc2UgaWYgKG9iai5sZW5ndGggPT09IG9iai5sZW5ndGggKyAwKSB7IC8vIElzIG51bWJlciBidXQgbm90IE5hTlxuICAgICAgICBcbiAgICAgICAgZm9yICh2YXIga2V5ID0gMCwgbCA9IG9iai5sZW5ndGg7IGtleSA8IGw7IGtleSsrKVxuICAgICAgICAgIGlmIChrZXkgaW4gb2JqICYmIGl0ci5jYWxsKHNjb3BlLCBvYmpba2V5XSwga2V5KSA9PT0gdGhpcy5CUkVBSykgXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBcbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikgXG4gICAgICAgICAgaWYgKGl0ci5jYWxsKHNjb3BlLCBvYmpba2V5XSwga2V5KSA9PT0gdGhpcy5CUkVBSylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIFxuICAgICAgfVxuICAgICAgICAgICAgXG4gICAgfSxcbiAgICBcbiAgICBkZWZlcjogZnVuY3Rpb24oZm5jKSB7XG4gICAgICBzZXRUaW1lb3V0KGZuYywgMCk7XG4gICAgfSxcbiAgICBcbiAgICB0b0FycmF5OiBmdW5jdGlvbihvYmopIHtcbiAgICAgIGlmIChvYmoudG9BcnJheSkgcmV0dXJuIG9iai50b0FycmF5KCk7XG4gICAgICByZXR1cm4gQVJSX1NMSUNFLmNhbGwob2JqKTtcbiAgICB9LFxuXG4gICAgaXNVbmRlZmluZWQ6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkO1xuICAgIH0sXG4gICAgXG4gICAgaXNOdWxsOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IG51bGw7XG4gICAgfSxcbiAgICBcbiAgICBpc05hTjogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICE9PSBvYmo7XG4gICAgfSxcbiAgICBcbiAgICBpc0FycmF5OiBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iai5jb25zdHJ1Y3RvciA9PT0gQXJyYXk7XG4gICAgfSxcbiAgICBcbiAgICBpc09iamVjdDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09PSBPYmplY3Qob2JqKTtcbiAgICB9LFxuICAgIFxuICAgIGlzTnVtYmVyOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IG9iaiswO1xuICAgIH0sXG4gICAgXG4gICAgaXNTdHJpbmc6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gb2JqKycnO1xuICAgIH0sXG4gICAgXG4gICAgaXNCb29sZWFuOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IGZhbHNlIHx8IG9iaiA9PT0gdHJ1ZTtcbiAgICB9LFxuICAgIFxuICAgIGlzRnVuY3Rpb246IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xuICAgIH1cbiAgXG4gIH07XG4gICAgXG59KSgpO1xuXG5cbmRhdC5jb2xvci50b1N0cmluZyA9IChmdW5jdGlvbiAoY29tbW9uKSB7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKGNvbG9yKSB7XG5cbiAgICBpZiAoY29sb3IuYSA9PSAxIHx8IGNvbW1vbi5pc1VuZGVmaW5lZChjb2xvci5hKSkge1xuXG4gICAgICB2YXIgcyA9IGNvbG9yLmhleC50b1N0cmluZygxNik7XG4gICAgICB3aGlsZSAocy5sZW5ndGggPCA2KSB7XG4gICAgICAgIHMgPSAnMCcgKyBzO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJyMnICsgcztcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHJldHVybiAncmdiYSgnICsgTWF0aC5yb3VuZChjb2xvci5yKSArICcsJyArIE1hdGgucm91bmQoY29sb3IuZykgKyAnLCcgKyBNYXRoLnJvdW5kKGNvbG9yLmIpICsgJywnICsgY29sb3IuYSArICcpJztcblxuICAgIH1cblxuICB9XG5cbn0pKGRhdC51dGlscy5jb21tb24pO1xuXG5cbmRhdC5Db2xvciA9IGRhdC5jb2xvci5Db2xvciA9IChmdW5jdGlvbiAoaW50ZXJwcmV0LCBtYXRoLCB0b1N0cmluZywgY29tbW9uKSB7XG5cbiAgdmFyIENvbG9yID0gZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLl9fc3RhdGUgPSBpbnRlcnByZXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIGlmICh0aGlzLl9fc3RhdGUgPT09IGZhbHNlKSB7XG4gICAgICB0aHJvdyAnRmFpbGVkIHRvIGludGVycHJldCBjb2xvciBhcmd1bWVudHMnO1xuICAgIH1cblxuICAgIHRoaXMuX19zdGF0ZS5hID0gdGhpcy5fX3N0YXRlLmEgfHwgMTtcblxuXG4gIH07XG5cbiAgQ29sb3IuQ09NUE9ORU5UUyA9IFsncicsJ2cnLCdiJywnaCcsJ3MnLCd2JywnaGV4JywnYSddO1xuXG4gIGNvbW1vbi5leHRlbmQoQ29sb3IucHJvdG90eXBlLCB7XG5cbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdG9TdHJpbmcodGhpcyk7XG4gICAgfSxcblxuICAgIHRvT3JpZ2luYWw6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZS5jb252ZXJzaW9uLndyaXRlKHRoaXMpO1xuICAgIH1cblxuICB9KTtcblxuICBkZWZpbmVSR0JDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAncicsIDIpO1xuICBkZWZpbmVSR0JDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAnZycsIDEpO1xuICBkZWZpbmVSR0JDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAnYicsIDApO1xuXG4gIGRlZmluZUhTVkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdoJyk7XG4gIGRlZmluZUhTVkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdzJyk7XG4gIGRlZmluZUhTVkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICd2Jyk7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbG9yLnByb3RvdHlwZSwgJ2EnLCB7XG5cbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZS5hO1xuICAgIH0sXG5cbiAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHRoaXMuX19zdGF0ZS5hID0gdjtcbiAgICB9XG5cbiAgfSk7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbG9yLnByb3RvdHlwZSwgJ2hleCcsIHtcblxuICAgIGdldDogZnVuY3Rpb24oKSB7XG5cbiAgICAgIGlmICghdGhpcy5fX3N0YXRlLnNwYWNlICE9PSAnSEVYJykge1xuICAgICAgICB0aGlzLl9fc3RhdGUuaGV4ID0gbWF0aC5yZ2JfdG9faGV4KHRoaXMuciwgdGhpcy5nLCB0aGlzLmIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5fX3N0YXRlLmhleDtcblxuICAgIH0sXG5cbiAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcblxuICAgICAgdGhpcy5fX3N0YXRlLnNwYWNlID0gJ0hFWCc7XG4gICAgICB0aGlzLl9fc3RhdGUuaGV4ID0gdjtcblxuICAgIH1cblxuICB9KTtcblxuICBmdW5jdGlvbiBkZWZpbmVSR0JDb21wb25lbnQodGFyZ2V0LCBjb21wb25lbnQsIGNvbXBvbmVudEhleEluZGV4KSB7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb21wb25lbnQsIHtcblxuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcblxuICAgICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlID09PSAnUkdCJykge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9fc3RhdGVbY29tcG9uZW50XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlY2FsY3VsYXRlUkdCKHRoaXMsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9fc3RhdGVbY29tcG9uZW50XTtcblxuICAgICAgfSxcblxuICAgICAgc2V0OiBmdW5jdGlvbih2KSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX19zdGF0ZS5zcGFjZSAhPT0gJ1JHQicpIHtcbiAgICAgICAgICByZWNhbGN1bGF0ZVJHQih0aGlzLCBjb21wb25lbnQsIGNvbXBvbmVudEhleEluZGV4KTtcbiAgICAgICAgICB0aGlzLl9fc3RhdGUuc3BhY2UgPSAnUkdCJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdID0gdjtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlZmluZUhTVkNvbXBvbmVudCh0YXJnZXQsIGNvbXBvbmVudCkge1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29tcG9uZW50LCB7XG5cbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX19zdGF0ZS5zcGFjZSA9PT0gJ0hTVicpXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xuXG4gICAgICAgIHJlY2FsY3VsYXRlSFNWKHRoaXMpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9fc3RhdGVbY29tcG9uZW50XTtcblxuICAgICAgfSxcblxuICAgICAgc2V0OiBmdW5jdGlvbih2KSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX19zdGF0ZS5zcGFjZSAhPT0gJ0hTVicpIHtcbiAgICAgICAgICByZWNhbGN1bGF0ZUhTVih0aGlzKTtcbiAgICAgICAgICB0aGlzLl9fc3RhdGUuc3BhY2UgPSAnSFNWJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdID0gdjtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlY2FsY3VsYXRlUkdCKGNvbG9yLCBjb21wb25lbnQsIGNvbXBvbmVudEhleEluZGV4KSB7XG5cbiAgICBpZiAoY29sb3IuX19zdGF0ZS5zcGFjZSA9PT0gJ0hFWCcpIHtcblxuICAgICAgY29sb3IuX19zdGF0ZVtjb21wb25lbnRdID0gbWF0aC5jb21wb25lbnRfZnJvbV9oZXgoY29sb3IuX19zdGF0ZS5oZXgsIGNvbXBvbmVudEhleEluZGV4KTtcblxuICAgIH0gZWxzZSBpZiAoY29sb3IuX19zdGF0ZS5zcGFjZSA9PT0gJ0hTVicpIHtcblxuICAgICAgY29tbW9uLmV4dGVuZChjb2xvci5fX3N0YXRlLCBtYXRoLmhzdl90b19yZ2IoY29sb3IuX19zdGF0ZS5oLCBjb2xvci5fX3N0YXRlLnMsIGNvbG9yLl9fc3RhdGUudikpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhyb3cgJ0NvcnJ1cHRlZCBjb2xvciBzdGF0ZSc7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlY2FsY3VsYXRlSFNWKGNvbG9yKSB7XG5cbiAgICB2YXIgcmVzdWx0ID0gbWF0aC5yZ2JfdG9faHN2KGNvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmIpO1xuXG4gICAgY29tbW9uLmV4dGVuZChjb2xvci5fX3N0YXRlLFxuICAgICAgICB7XG4gICAgICAgICAgczogcmVzdWx0LnMsXG4gICAgICAgICAgdjogcmVzdWx0LnZcbiAgICAgICAgfVxuICAgICk7XG5cbiAgICBpZiAoIWNvbW1vbi5pc05hTihyZXN1bHQuaCkpIHtcbiAgICAgIGNvbG9yLl9fc3RhdGUuaCA9IHJlc3VsdC5oO1xuICAgIH0gZWxzZSBpZiAoY29tbW9uLmlzVW5kZWZpbmVkKGNvbG9yLl9fc3RhdGUuaCkpIHtcbiAgICAgIGNvbG9yLl9fc3RhdGUuaCA9IDA7XG4gICAgfVxuXG4gIH1cblxuICByZXR1cm4gQ29sb3I7XG5cbn0pKGRhdC5jb2xvci5pbnRlcnByZXQgPSAoZnVuY3Rpb24gKHRvU3RyaW5nLCBjb21tb24pIHtcblxuICB2YXIgcmVzdWx0LCB0b1JldHVybjtcblxuICB2YXIgaW50ZXJwcmV0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICB0b1JldHVybiA9IGZhbHNlO1xuXG4gICAgdmFyIG9yaWdpbmFsID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBjb21tb24udG9BcnJheShhcmd1bWVudHMpIDogYXJndW1lbnRzWzBdO1xuXG4gICAgY29tbW9uLmVhY2goSU5URVJQUkVUQVRJT05TLCBmdW5jdGlvbihmYW1pbHkpIHtcblxuICAgICAgaWYgKGZhbWlseS5saXRtdXMob3JpZ2luYWwpKSB7XG5cbiAgICAgICAgY29tbW9uLmVhY2goZmFtaWx5LmNvbnZlcnNpb25zLCBmdW5jdGlvbihjb252ZXJzaW9uLCBjb252ZXJzaW9uTmFtZSkge1xuXG4gICAgICAgICAgcmVzdWx0ID0gY29udmVyc2lvbi5yZWFkKG9yaWdpbmFsKTtcblxuICAgICAgICAgIGlmICh0b1JldHVybiA9PT0gZmFsc2UgJiYgcmVzdWx0ICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgdG9SZXR1cm4gPSByZXN1bHQ7XG4gICAgICAgICAgICByZXN1bHQuY29udmVyc2lvbk5hbWUgPSBjb252ZXJzaW9uTmFtZTtcbiAgICAgICAgICAgIHJlc3VsdC5jb252ZXJzaW9uID0gY29udmVyc2lvbjtcbiAgICAgICAgICAgIHJldHVybiBjb21tb24uQlJFQUs7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGNvbW1vbi5CUkVBSztcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdG9SZXR1cm47XG5cbiAgfTtcblxuICB2YXIgSU5URVJQUkVUQVRJT05TID0gW1xuXG4gICAgLy8gU3RyaW5nc1xuICAgIHtcblxuICAgICAgbGl0bXVzOiBjb21tb24uaXNTdHJpbmcsXG5cbiAgICAgIGNvbnZlcnNpb25zOiB7XG5cbiAgICAgICAgVEhSRUVfQ0hBUl9IRVg6IHtcblxuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG5cbiAgICAgICAgICAgIHZhciB0ZXN0ID0gb3JpZ2luYWwubWF0Y2goL14jKFtBLUYwLTldKShbQS1GMC05XSkoW0EtRjAtOV0pJC9pKTtcbiAgICAgICAgICAgIGlmICh0ZXN0ID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnSEVYJyxcbiAgICAgICAgICAgICAgaGV4OiBwYXJzZUludChcbiAgICAgICAgICAgICAgICAgICcweCcgK1xuICAgICAgICAgICAgICAgICAgICAgIHRlc3RbMV0udG9TdHJpbmcoKSArIHRlc3RbMV0udG9TdHJpbmcoKSArXG4gICAgICAgICAgICAgICAgICAgICAgdGVzdFsyXS50b1N0cmluZygpICsgdGVzdFsyXS50b1N0cmluZygpICtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXN0WzNdLnRvU3RyaW5nKCkgKyB0ZXN0WzNdLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiB0b1N0cmluZ1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgU0lYX0NIQVJfSEVYOiB7XG5cbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuXG4gICAgICAgICAgICB2YXIgdGVzdCA9IG9yaWdpbmFsLm1hdGNoKC9eIyhbQS1GMC05XXs2fSkkL2kpO1xuICAgICAgICAgICAgaWYgKHRlc3QgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdIRVgnLFxuICAgICAgICAgICAgICBoZXg6IHBhcnNlSW50KCcweCcgKyB0ZXN0WzFdLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiB0b1N0cmluZ1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgQ1NTX1JHQjoge1xuXG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcblxuICAgICAgICAgICAgdmFyIHRlc3QgPSBvcmlnaW5hbC5tYXRjaCgvXnJnYlxcKFxccyooLispXFxzKixcXHMqKC4rKVxccyosXFxzKiguKylcXHMqXFwpLyk7XG4gICAgICAgICAgICBpZiAodGVzdCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICAgIHI6IHBhcnNlRmxvYXQodGVzdFsxXSksXG4gICAgICAgICAgICAgIGc6IHBhcnNlRmxvYXQodGVzdFsyXSksXG4gICAgICAgICAgICAgIGI6IHBhcnNlRmxvYXQodGVzdFszXSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IHRvU3RyaW5nXG5cbiAgICAgICAgfSxcblxuICAgICAgICBDU1NfUkdCQToge1xuXG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcblxuICAgICAgICAgICAgdmFyIHRlc3QgPSBvcmlnaW5hbC5tYXRjaCgvXnJnYmFcXChcXHMqKC4rKVxccyosXFxzKiguKylcXHMqLFxccyooLispXFxzKlxcLFxccyooLispXFxzKlxcKS8pO1xuICAgICAgICAgICAgaWYgKHRlc3QgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICByOiBwYXJzZUZsb2F0KHRlc3RbMV0pLFxuICAgICAgICAgICAgICBnOiBwYXJzZUZsb2F0KHRlc3RbMl0pLFxuICAgICAgICAgICAgICBiOiBwYXJzZUZsb2F0KHRlc3RbM10pLFxuICAgICAgICAgICAgICBhOiBwYXJzZUZsb2F0KHRlc3RbNF0pXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiB0b1N0cmluZ1xuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8vIE51bWJlcnNcbiAgICB7XG5cbiAgICAgIGxpdG11czogY29tbW9uLmlzTnVtYmVyLFxuXG4gICAgICBjb252ZXJzaW9uczoge1xuXG4gICAgICAgIEhFWDoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ0hFWCcsXG4gICAgICAgICAgICAgIGhleDogb3JpZ2luYWwsXG4gICAgICAgICAgICAgIGNvbnZlcnNpb25OYW1lOiAnSEVYJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBjb2xvci5oZXg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvLyBBcnJheXNcbiAgICB7XG5cbiAgICAgIGxpdG11czogY29tbW9uLmlzQXJyYXksXG5cbiAgICAgIGNvbnZlcnNpb25zOiB7XG5cbiAgICAgICAgUkdCX0FSUkFZOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChvcmlnaW5hbC5sZW5ndGggIT0gMykgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICByOiBvcmlnaW5hbFswXSxcbiAgICAgICAgICAgICAgZzogb3JpZ2luYWxbMV0sXG4gICAgICAgICAgICAgIGI6IG9yaWdpbmFsWzJdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBbY29sb3IuciwgY29sb3IuZywgY29sb3IuYl07XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgUkdCQV9BUlJBWToge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAob3JpZ2luYWwubGVuZ3RoICE9IDQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgcjogb3JpZ2luYWxbMF0sXG4gICAgICAgICAgICAgIGc6IG9yaWdpbmFsWzFdLFxuICAgICAgICAgICAgICBiOiBvcmlnaW5hbFsyXSxcbiAgICAgICAgICAgICAgYTogb3JpZ2luYWxbM11cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIFtjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iLCBjb2xvci5hXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgLy8gT2JqZWN0c1xuICAgIHtcblxuICAgICAgbGl0bXVzOiBjb21tb24uaXNPYmplY3QsXG5cbiAgICAgIGNvbnZlcnNpb25zOiB7XG5cbiAgICAgICAgUkdCQV9PQko6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgaWYgKGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5yKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5nKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5iKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5hKSkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgICByOiBvcmlnaW5hbC5yLFxuICAgICAgICAgICAgICAgIGc6IG9yaWdpbmFsLmcsXG4gICAgICAgICAgICAgICAgYjogb3JpZ2luYWwuYixcbiAgICAgICAgICAgICAgICBhOiBvcmlnaW5hbC5hXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICByOiBjb2xvci5yLFxuICAgICAgICAgICAgICBnOiBjb2xvci5nLFxuICAgICAgICAgICAgICBiOiBjb2xvci5iLFxuICAgICAgICAgICAgICBhOiBjb2xvci5hXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIFJHQl9PQko6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgaWYgKGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5yKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5nKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5iKSkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgICByOiBvcmlnaW5hbC5yLFxuICAgICAgICAgICAgICAgIGc6IG9yaWdpbmFsLmcsXG4gICAgICAgICAgICAgICAgYjogb3JpZ2luYWwuYlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgcjogY29sb3IucixcbiAgICAgICAgICAgICAgZzogY29sb3IuZyxcbiAgICAgICAgICAgICAgYjogY29sb3IuYlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBIU1ZBX09CSjoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmgpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnMpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnYpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmEpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3BhY2U6ICdIU1YnLFxuICAgICAgICAgICAgICAgIGg6IG9yaWdpbmFsLmgsXG4gICAgICAgICAgICAgICAgczogb3JpZ2luYWwucyxcbiAgICAgICAgICAgICAgICB2OiBvcmlnaW5hbC52LFxuICAgICAgICAgICAgICAgIGE6IG9yaWdpbmFsLmFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGg6IGNvbG9yLmgsXG4gICAgICAgICAgICAgIHM6IGNvbG9yLnMsXG4gICAgICAgICAgICAgIHY6IGNvbG9yLnYsXG4gICAgICAgICAgICAgIGE6IGNvbG9yLmFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgSFNWX09CSjoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmgpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnMpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnYpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3BhY2U6ICdIU1YnLFxuICAgICAgICAgICAgICAgIGg6IG9yaWdpbmFsLmgsXG4gICAgICAgICAgICAgICAgczogb3JpZ2luYWwucyxcbiAgICAgICAgICAgICAgICB2OiBvcmlnaW5hbC52XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBoOiBjb2xvci5oLFxuICAgICAgICAgICAgICBzOiBjb2xvci5zLFxuICAgICAgICAgICAgICB2OiBjb2xvci52XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfVxuXG5cbiAgXTtcblxuICByZXR1cm4gaW50ZXJwcmV0O1xuXG5cbn0pKGRhdC5jb2xvci50b1N0cmluZyxcbmRhdC51dGlscy5jb21tb24pLFxuZGF0LmNvbG9yLm1hdGggPSAoZnVuY3Rpb24gKCkge1xuXG4gIHZhciB0bXBDb21wb25lbnQ7XG5cbiAgcmV0dXJuIHtcblxuICAgIGhzdl90b19yZ2I6IGZ1bmN0aW9uKGgsIHMsIHYpIHtcblxuICAgICAgdmFyIGhpID0gTWF0aC5mbG9vcihoIC8gNjApICUgNjtcblxuICAgICAgdmFyIGYgPSBoIC8gNjAgLSBNYXRoLmZsb29yKGggLyA2MCk7XG4gICAgICB2YXIgcCA9IHYgKiAoMS4wIC0gcyk7XG4gICAgICB2YXIgcSA9IHYgKiAoMS4wIC0gKGYgKiBzKSk7XG4gICAgICB2YXIgdCA9IHYgKiAoMS4wIC0gKCgxLjAgLSBmKSAqIHMpKTtcbiAgICAgIHZhciBjID0gW1xuICAgICAgICBbdiwgdCwgcF0sXG4gICAgICAgIFtxLCB2LCBwXSxcbiAgICAgICAgW3AsIHYsIHRdLFxuICAgICAgICBbcCwgcSwgdl0sXG4gICAgICAgIFt0LCBwLCB2XSxcbiAgICAgICAgW3YsIHAsIHFdXG4gICAgICBdW2hpXTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcjogY1swXSAqIDI1NSxcbiAgICAgICAgZzogY1sxXSAqIDI1NSxcbiAgICAgICAgYjogY1syXSAqIDI1NVxuICAgICAgfTtcblxuICAgIH0sXG5cbiAgICByZ2JfdG9faHN2OiBmdW5jdGlvbihyLCBnLCBiKSB7XG5cbiAgICAgIHZhciBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKSxcbiAgICAgICAgICBtYXggPSBNYXRoLm1heChyLCBnLCBiKSxcbiAgICAgICAgICBkZWx0YSA9IG1heCAtIG1pbixcbiAgICAgICAgICBoLCBzO1xuXG4gICAgICBpZiAobWF4ICE9IDApIHtcbiAgICAgICAgcyA9IGRlbHRhIC8gbWF4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBoOiBOYU4sXG4gICAgICAgICAgczogMCxcbiAgICAgICAgICB2OiAwXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGlmIChyID09IG1heCkge1xuICAgICAgICBoID0gKGcgLSBiKSAvIGRlbHRhO1xuICAgICAgfSBlbHNlIGlmIChnID09IG1heCkge1xuICAgICAgICBoID0gMiArIChiIC0gcikgLyBkZWx0YTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGggPSA0ICsgKHIgLSBnKSAvIGRlbHRhO1xuICAgICAgfVxuICAgICAgaCAvPSA2O1xuICAgICAgaWYgKGggPCAwKSB7XG4gICAgICAgIGggKz0gMTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaDogaCAqIDM2MCxcbiAgICAgICAgczogcyxcbiAgICAgICAgdjogbWF4IC8gMjU1XG4gICAgICB9O1xuICAgIH0sXG5cbiAgICByZ2JfdG9faGV4OiBmdW5jdGlvbihyLCBnLCBiKSB7XG4gICAgICB2YXIgaGV4ID0gdGhpcy5oZXhfd2l0aF9jb21wb25lbnQoMCwgMiwgcik7XG4gICAgICBoZXggPSB0aGlzLmhleF93aXRoX2NvbXBvbmVudChoZXgsIDEsIGcpO1xuICAgICAgaGV4ID0gdGhpcy5oZXhfd2l0aF9jb21wb25lbnQoaGV4LCAwLCBiKTtcbiAgICAgIHJldHVybiBoZXg7XG4gICAgfSxcblxuICAgIGNvbXBvbmVudF9mcm9tX2hleDogZnVuY3Rpb24oaGV4LCBjb21wb25lbnRJbmRleCkge1xuICAgICAgcmV0dXJuIChoZXggPj4gKGNvbXBvbmVudEluZGV4ICogOCkpICYgMHhGRjtcbiAgICB9LFxuXG4gICAgaGV4X3dpdGhfY29tcG9uZW50OiBmdW5jdGlvbihoZXgsIGNvbXBvbmVudEluZGV4LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlIDw8ICh0bXBDb21wb25lbnQgPSBjb21wb25lbnRJbmRleCAqIDgpIHwgKGhleCAmIH4gKDB4RkYgPDwgdG1wQ29tcG9uZW50KSk7XG4gICAgfVxuXG4gIH1cblxufSkoKSxcbmRhdC5jb2xvci50b1N0cmluZyxcbmRhdC51dGlscy5jb21tb24pOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi92ZW5kb3IvZGF0Lmd1aScpXG5tb2R1bGUuZXhwb3J0cy5jb2xvciA9IHJlcXVpcmUoJy4vdmVuZG9yL2RhdC5jb2xvcicpIiwiaW1wb3J0IHtcbiAgRnJvbnRTaWRlLFxuICBCYWNrU2lkZSxcbiAgRG91YmxlU2lkZSxcblxuICBTbW9vdGhTaGFkaW5nLFxuICBGbGF0U2hhZGluZyxcblxuICBOb0JsZW5kaW5nLFxuICBOb3JtYWxCbGVuZGluZyxcbiAgQWRkaXRpdmVCbGVuZGluZyxcbiAgU3VidHJhY3RpdmVCbGVuZGluZyxcbiAgTXVsdGlwbHlCbGVuZGluZyxcbiAgQ3VzdG9tQmxlbmRpbmcsXG5cbiAgTmV2ZXJEZXB0aCxcbiAgQWx3YXlzRGVwdGgsXG4gIExlc3NEZXB0aCxcbiAgTGVzc0VxdWFsRGVwdGgsXG4gIEdyZWF0ZXJFcXVhbERlcHRoLFxuICBHcmVhdGVyRGVwdGgsXG4gIE5vdEVxdWFsRGVwdGhcbn0gZnJvbSAndGhyZWUnO1xuXG5jb25zdCBhZGRpdGlvbmFsID0ge1xuICB3aXJlZnJhbWU6IHtcbiAgICB3aXJlZnJhbWU6ICdib29sZWFuJyxcbiAgICB3aXJlZnJhbWVMaW5lY2FwOiBbJ2J1dHQnLCAncm91bmQnLCAnc3F1YXJlJ10sXG4gICAgd2lyZWZyYW1lTGluZWpvaW46IFsncm91bmQnLCAnYmV2ZWwnLCAnbWl0ZXInXSxcbiAgICB3aXJlZnJhbWVMaW5ld2lkdGg6ICdudW1iZXInXG4gIH0sXG5cbiAgcmVmcjoge1xuICAgIHJlZmxlY3Rpdml0eTogJ251bWJlcicsXG4gICAgcmVmcmFjdGlvblJhdGlvOiAnbnVtYmVyJ1xuICB9LFxuXG4gIGxpZ2h0OiB7XG4gICAgbGlnaHRNYXA6ICd0ZXh0dXJlJyxcbiAgICBsaWdodE1hcEludGVuc2l0eTogJ251bWJlcidcbiAgfSxcblxuICBkaXNwbGFjZW1lbnQ6IHtcbiAgICBkaXNwbGFjZW1lbnRTY2FsZTogJ251bWJlcicsXG4gICAgZGlzcGxhY2VtZW50QmlhczogJ251bWJlcicsXG4gICAgZGlzcGxhY2VtZW50TWFwOiAndGV4dHVyZSdcbiAgfSxcblxuICBlbWlzc2l2ZToge1xuICAgIGVtaXNzaXZlOiAnY29sb3InLFxuICAgIGVtaXNzaXZlTWFwOiAndGV4dHVyZScsXG4gICAgZW1pc3NpdmVJbnRlbnNpdHk6ICdudW1iZXInXG4gIH1cbn1cblxuY29uc3QgYWRkID0gKG9yaWdpbiwgLi4uYWRkdikgPT4ge1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbihvcmlnaW4sIC4uLmFkZHYubWFwKHZhbHVlID0+IGFkZGl0aW9uYWxbdmFsdWVdKSlcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBhbnk6IGFkZCh7XG4gICAgc2lkZToge0Zyb250U2lkZSwgQmFja1NpZGUsIERvdWJsZVNpZGV9LFxuICAgIHNoYWRpbmc6IHtTbW9vdGhTaGFkaW5nLCBGbGF0U2hhZGluZ30sXG4gICAgYmxlbmRpbmc6IHtcbiAgICAgIE5vQmxlbmRpbmcsIE5vcm1hbEJsZW5kaW5nLCBBZGRpdGl2ZUJsZW5kaW5nLCBTdWJ0cmFjdGl2ZUJsZW5kaW5nLCBNdWx0aXBseUJsZW5kaW5nLCBDdXN0b21CbGVuZGluZ1xuICAgIH0sXG4gICAgZGVwdGhGdW5jOiB7XG4gICAgICBOZXZlckRlcHRoLCBBbHdheXNEZXB0aCwgTGVzc0RlcHRoLCBMZXNzRXF1YWxEZXB0aCwgR3JlYXRlckVxdWFsRGVwdGgsIEdyZWF0ZXJEZXB0aCwgTm90RXF1YWxEZXB0aFxuICAgIH1cbiAgfSwgJ3dpcmVmcmFtZScpLFxuXG4gIE1lc2hCYXNpY01hdGVyaWFsOiB7XG4gICAgY29sb3I6ICdjb2xvcicsXG4gICAgbGlnaHRzOiAnYm9vbGVhbicsXG4gICAgbGluZXdpZHRoOiAnbnVtYmVyJyxcbiAgICBsaW5lY2FwOiBbJ2J1dHQnLCAncm91bmQnLCAnc3F1YXJlJ10sXG4gICAgbGluZWpvaW46IFsncm91bmQnLCAnYmV2ZWwnLCAnbWl0ZXInXVxuICB9LFxuXG4gIE1lc2hMYW1iZXJ0TWF0ZXJpYWw6IGFkZCh7XG4gICAgY29sb3I6ICdjb2xvcidcbiAgfSwgJ2VtaXNzaXZlJywgJ3JlZnInLCAnbGlnaHQnKSxcblxuICBNZXNoUGhvbmdNYXRlcmlhbDogYWRkKHtcbiAgICBjb2xvcjogJ2NvbG9yJ1xuICB9LCAnZGlzcGxhY2VtZW50JywgJ2VtaXNzaXZlJyksXG5cbiAgTWVzaERlcHRoTWF0ZXJpYWw6IHtcblxuICB9XG4gIC8vIFRvIGJlIGNvbnRpbnVlZC4uLlxufVxuIiwiZXhwb3J0IGNsYXNzIERhdEFQSSB7XG4gIGZvbGRPYmplY3Qob2JqZWN0LCBvcmlnaW4sIGluc3RhbmNlID0gdGhpcy5mb2xkLCBvbkNoYW5nZSA9ICgpID0+IHt9KSB7XG4gICAgZm9yIChsZXQga2V5IGluIG9yaWdpbikge1xuICAgICAgY29uc3QgdmFsdWUgPSBvYmplY3Rba2V5XTtcbiAgICAgIGlmICghdmFsdWUpIGNvbnRpbnVlO1xuXG4gICAgICBpZiAodmFsdWUuaXNDb2xvcikge1xuICAgICAgICB0aGlzLmFkZENvbG9yKG9iamVjdCwga2V5LCBpbnN0YW5jZSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcmlnaW5ba2V5XSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKG9iamVjdFtrZXldID09PSBvYmplY3QpIGNvbnRpbnVlO1xuICAgICAgICB0aGlzLmZvbGRPYmplY3Qob2JqZWN0W2tleV0sIG9yaWdpbltrZXldLCBpbnN0YW5jZS5hZGRGb2xkZXIoa2V5KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCByYW5nZSA9ICcxJyArICcwJy5yZXBlYXQodmFsdWUudG9TdHJpbmcoKS5sZW5ndGgpO1xuXG4gICAgICAgIGluc3RhbmNlLmFkZChvYmplY3QsIGtleSlcbiAgICAgICAgICAubWluKDApXG4gICAgICAgICAgLnN0ZXAocmFuZ2UgPiAxMCA/IDEgOiAwLjEpXG4gICAgICAgICAgLm9uQ2hhbmdlKG9uQ2hhbmdlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBndWlUcmFuc2Zvcm1zKG5hdGl2ZSwgaW5zdGFuY2UgPSB0aGlzLmZvbGQpIHtcbiAgICBpZiAoIXRoaXMucGFyYW1zLnRyYW5zZm9ybXMpIHJldHVybjtcblxuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBpbnN0YW5jZS5hZGRGb2xkZXIoJ3RyYW5zZm9ybXMnKTtcblxuICAgIC8vIHBvc2l0aW9uXG4gICAgY29uc3QgcG9zaXRpb24gPSBjb250cm9sbGVyLmFkZEZvbGRlcigncG9zaXRpb24nKTtcbiAgICBwb3NpdGlvbi5hZGQobmF0aXZlLnBvc2l0aW9uLCAneCcpO1xuICAgIHBvc2l0aW9uLmFkZChuYXRpdmUucG9zaXRpb24sICd5Jyk7XG4gICAgcG9zaXRpb24uYWRkKG5hdGl2ZS5wb3NpdGlvbiwgJ3onKTtcblxuICAgIC8vIHJvdGF0aW9uXG4gICAgY29uc3Qgcm90YXRpb24gPSBjb250cm9sbGVyLmFkZEZvbGRlcigncm90YXRpb24nKTtcbiAgICByb3RhdGlvbi5hZGQobmF0aXZlLnJvdGF0aW9uLCAneCcpLnN0ZXAoMC4xKTtcbiAgICByb3RhdGlvbi5hZGQobmF0aXZlLnJvdGF0aW9uLCAneScpLnN0ZXAoMC4xKTtcbiAgICByb3RhdGlvbi5hZGQobmF0aXZlLnJvdGF0aW9uLCAneicpLnN0ZXAoMC4xKTtcblxuICAgIC8vIHNjYWxlXG4gICAgaWYgKCFuYXRpdmUuc2NhbGUpIHJldHVybjtcbiAgICBjb25zdCBzY2FsZSA9IGNvbnRyb2xsZXIuYWRkRm9sZGVyKCdzY2FsZScpO1xuICAgIHNjYWxlLmFkZChuYXRpdmUuc2NhbGUsICd4Jykuc3RlcCgwLjEpO1xuICAgIHNjYWxlLmFkZChuYXRpdmUuc2NhbGUsICd5Jykuc3RlcCgwLjEpO1xuICAgIHNjYWxlLmFkZChuYXRpdmUuc2NhbGUsICd6Jykuc3RlcCgwLjEpO1xuICB9XG59XG4iLCJpbXBvcnQgbWF0ZXJpYWxzIGZyb20gJy4vbWF0ZXJpYWxzJztcbmltcG9ydCB7RGF0QVBJfSBmcm9tICcuL0RhdEFQSSc7XG5cbmV4cG9ydCBjbGFzcyBEYXRNZXNoTW9kdWxlIGV4dGVuZHMgRGF0QVBJIHtcbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30sIGd1aSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgbmFtZTogJ1Vua25vd24gbWVzaCcsXG4gICAgICBnZW9tZXRyeTogdHJ1ZSxcbiAgICAgIG1hdGVyaWFsOiB0cnVlLFxuICAgICAgdHJhbnNmb3JtczogdHJ1ZSxcbiAgICAgIGd1aTogZmFsc2VcbiAgICB9LCBwYXJhbXMpO1xuXG4gICAgdGhpcy5ndWkgPSBndWk7XG4gICAgdGhpcy5mb2xkID0gdGhpcy5ndWkuYWRkRm9sZGVyKHRoaXMucGFyYW1zLm5hbWUpO1xuICAgIHRoaXMuY3VzdG9tTWF0ZXJpYWxzID0gZmFsc2U7XG4gIH1cblxuICBhZGRDb2xvcihvYmplY3QsIHByb3BlcnR5LCBpbnN0YW5jZSA9IHRoaXMuZm9sZCkge1xuICAgIGNvbnN0IGNvbG9yID0gb2JqZWN0W3Byb3BlcnR5XTtcblxuICAgIGluc3RhbmNlLmFkZENvbG9yKHtbcHJvcGVydHldOiBjb2xvci5nZXRIZXgoKX0sIHByb3BlcnR5KS5vbkNoYW5nZSh2YWx1ZSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykgdmFsdWUucmVwbGFjZSgnIycsICcweCcpO1xuICAgICAgY29sb3Iuc2V0SGV4KHZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGd1aU1hdGVyaWFsKGNvbXBvbmVudCwgbWF0ZXJpYWwsIGluc3RhbmNlID0gdGhpcy5mb2xkKSB7XG4gICAgY29uc3QgcGFyYW1zUHJvY2Vzc29yID0gcGFyYW1zID0+IHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIHBhcmFtcykge1xuICAgICAgICBpZiAocGFyYW1zW2tleV0gJiYgbWF0ZXJpYWxba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgc3dpdGNoIChwYXJhbXNba2V5XSkge1xuICAgICAgICAgICAgY2FzZSAnY29sb3InOlxuICAgICAgICAgICAgICB0aGlzLmFkZENvbG9yKG1hdGVyaWFsLCBrZXksIGluc3RhbmNlKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgICAgaW5zdGFuY2UuYWRkKG1hdGVyaWFsLCBrZXkpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICAgIGluc3RhbmNlLmFkZChtYXRlcmlhbCwga2V5KTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd0ZXh0dXJlJzpcbiAgICAgICAgICAgICAgLy8gVE9ET1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGluc3RhbmNlLmFkZChtYXRlcmlhbCwga2V5LCBwYXJhbXNba2V5XSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHBhcmFtc1Byb2Nlc3NvcihtYXRlcmlhbHNbbWF0ZXJpYWwudHlwZV0pO1xuICAgIHBhcmFtc1Byb2Nlc3NvcihtYXRlcmlhbHMuYW55KTtcbiAgfVxuXG4gIGd1aUdlb21ldHJ5KGNvbXBvbmVudCwgaW5zdGFuY2UgPSB0aGlzLmZvbGQpIHtcbiAgICBpZiAoIWNvbXBvbmVudC5nXykgdGhyb3cgbmV3IEVycm9yKCdEYXRHVUlNb2R1bGUgcmVxdWlyZXMgV0hTLkR5bmFtaWNHZW9tZXRyeU1vZHVsZSBmb3IgZ2VvbWV0cnkgdXBkYXRlcy4nKTtcblxuICAgIGNvbnN0IGdlb21QYXJhbXMgPSBjb21wb25lbnQucGFyYW1zLmdlb21ldHJ5O1xuICAgIGNvbnN0IGdlb21EYXRhID0gdGhpcy5wYXJhbXMuZ2VvbWV0cnk7XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBnZW9tUGFyYW1zKSB7XG4gICAgICBjb25zdCBkYXRhID0gZ2VvbURhdGFba2V5XTtcblxuICAgICAgY29uc3QgcmFuZ2UgPSBkYXRhICYmIGRhdGEucmFuZ2UgPyBkYXRhLnJhbmdlIDogWzAsIDEwMF07XG5cbiAgICAgIGluc3RhbmNlLmFkZChnZW9tUGFyYW1zLCBrZXkpXG4gICAgICAgIC5taW4ocmFuZ2VbMF0pXG4gICAgICAgIC5tYXgocmFuZ2VbMV0pXG4gICAgICAgIC5zdGVwKGtleS5pbmRleE9mKCdTZWdtZW50cycpID4gMCA/IDEgOiAwLjEpXG4gICAgICAgIC5vbkNoYW5nZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50LmdfKHtba2V5XTogdmFsdWV9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbWF0ZXJpYWxzKG1hdGVyaWFscyA9IHt9KSB7XG4gICAgdGhpcy5jdXN0b21NYXRlcmlhbHMgPSBtYXRlcmlhbHM7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGludGVncmF0ZShzZWxmKSB7XG4gICAgaWYgKHRoaXMubmF0aXZlKSB7XG4gICAgICBzZWxmLmJyaWRnZS5tYXRlcmlhbC5iaW5kKHRoaXMpKHRoaXMubmF0aXZlLm1hdGVyaWFsLCBzZWxmKTtcbiAgICAgIHNlbGYuYnJpZGdlLmdlb21ldHJ5LmJpbmQodGhpcykodGhpcy5uYXRpdmUuZ2VvbWV0cnksIHNlbGYpO1xuICAgICAgc2VsZi5icmlkZ2Uub25XcmFwLmJpbmQodGhpcykodGhpcy5uYXRpdmUsIHNlbGYpO1xuICAgIH1cbiAgfVxuXG4gIGJyaWRnZSA9IHtcbiAgICBtYXRlcmlhbChtYXRlcmlhbCwgc2VsZikge1xuICAgICAgaWYgKCFzZWxmLnBhcmFtcy5tYXRlcmlhbCkgcmV0dXJuIG1hdGVyaWFsO1xuXG4gICAgICBjb25zdCBmb2xkZXIgPSBzZWxmLmZvbGQuYWRkRm9sZGVyKCdtYXRlcmlhbCcpO1xuICAgICAgc2VsZi5ndWlNYXRlcmlhbCh0aGlzLCBtYXRlcmlhbCwgZm9sZGVyKTtcblxuICAgICAgcmV0dXJuIG1hdGVyaWFsO1xuICAgIH0sXG5cbiAgICBnZW9tZXRyeShnZW9tZXRyeSwgc2VsZikge1xuICAgICAgaWYgKCFzZWxmLnBhcmFtcy5nZW9tZXRyeSkgcmV0dXJuIGdlb21ldHJ5O1xuICAgICAgaWYgKCF0aGlzLmdfKSB0aHJvdyBuZXcgRXJyb3IoJ1dIUy5EeW5hbWljR2VvbWV0cnlNb2R1bGUgc2hvdWxkIGJlIHVzZWQgaW4gYSBjb21wb25lbnQgKGJlZm9yZSBndWkpJyk7XG5cbiAgICAgIGNvbnN0IGZvbGRlciA9IHNlbGYuZm9sZC5hZGRGb2xkZXIoJ2dlb21ldHJ5Jyk7XG4gICAgICBzZWxmLmd1aUdlb21ldHJ5KHRoaXMsIGZvbGRlcik7XG5cbiAgICAgIHJldHVybiBnZW9tZXRyeTtcbiAgICB9LFxuXG4gICAgbWVzaChtZXNoLCBzZWxmKSB7XG4gICAgICBpZiAoIXNlbGYuY3VzdG9tTWF0ZXJpYWxzKSByZXR1cm4gbWVzaDtcblxuICAgICAgc2VsZi5jdXN0b21NYXRlcmlhbHMuY3VycmVudCA9IG1lc2gubWF0ZXJpYWw7XG5cbiAgICAgIC8vIGNvbnN0IG1hdEFsaWFzID0ge21hdGVyaWFsOiAnY3VycmVudCd9O1xuICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHNlbGYuY3VzdG9tTWF0ZXJpYWxzKTtcbiAgICAgIGNvbnN0IGZvbGRlciA9IHNlbGYuZm9sZC5hZGRGb2xkZXIoJ290aGVyIG1hdGVyaWFscycpO1xuXG4gICAgICBmb2xkZXIuYWRkKHttYXRlcmlhbDogJ2N1cnJlbnQnfSwgJ21hdGVyaWFsJywga2V5cykub25DaGFuZ2UodiA9PiB7XG4gICAgICAgIG1lc2gubWF0ZXJpYWwgPSBzZWxmLmN1c3RvbU1hdGVyaWFsc1t2XTtcbiAgICAgICAgZm9sZGVyLnJlbW92ZUZvbGRlcignY3VzdG9taXplJyk7XG4gICAgICAgIHNlbGYuZ3VpTWF0ZXJpYWwodGhpcywgbWVzaC5tYXRlcmlhbCwgZm9sZGVyLmFkZEZvbGRlcignY3VzdG9taXplJykpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBtZXNoO1xuICAgIH0sXG5cbiAgICBvbldyYXAoYSwgc2VsZikge1xuICAgICAgc2VsZi5ndWlUcmFuc2Zvcm1zKHRoaXMubmF0aXZlLCBzZWxmLmZvbGQpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtEYXRBUEl9IGZyb20gJy4vRGF0QVBJJztcblxuZXhwb3J0IGNsYXNzIERhdExpZ2h0TW9kdWxlIGV4dGVuZHMgRGF0QVBJIHtcbiAgY29uc3RydWN0b3IocGFyYW1zID0ge30sIGd1aSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgbmFtZTogJ1Vua25vd24gbGlnaHQnLFxuICAgICAgbGlnaHQ6IHRydWUsXG4gICAgICBzaGFkb3c6IHRydWUsXG4gICAgICB0cmFuc2Zvcm1zOiB0cnVlLFxuICAgICAgZ3VpOiBmYWxzZVxuICAgIH0sIHBhcmFtcyk7XG5cbiAgICB0aGlzLmd1aSA9IGd1aTtcbiAgICB0aGlzLmZvbGQgPSB0aGlzLmd1aS5hZGRGb2xkZXIodGhpcy5wYXJhbXMubmFtZSk7XG4gIH1cblxuICBhZGRDb2xvcihvYmplY3QsIHByb3BlcnR5LCBpbnN0YW5jZSA9IHRoaXMuZm9sZCkge1xuICAgIGNvbnN0IGNvbG9yID0gb2JqZWN0W3Byb3BlcnR5XTtcblxuICAgIGluc3RhbmNlLmFkZENvbG9yKHtbcHJvcGVydHldOiBjb2xvci5nZXRIZXgoKX0sIHByb3BlcnR5KS5vbkNoYW5nZSh2YWx1ZSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykgdmFsdWUucmVwbGFjZSgnIycsICcweCcpO1xuICAgICAgY29sb3Iuc2V0SGV4KHZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGludGVncmF0ZShzZWxmKSB7XG4gICAgaWYgKHRoaXMubmF0aXZlKSB7XG4gICAgICBzZWxmLmJyaWRnZS5saWdodC5iaW5kKHRoaXMpKHRoaXMubmF0aXZlLCBzZWxmKTtcbiAgICAgIHNlbGYuYnJpZGdlLm9uV3JhcC5iaW5kKHRoaXMpKHRoaXMubmF0aXZlLCBzZWxmKTtcbiAgICB9XG4gIH1cblxuICBicmlkZ2UgPSB7XG4gICAgbGlnaHQobGlnaHQsIHNlbGYpIHtcbiAgICAgIGlmICghc2VsZi5wYXJhbXMubGlnaHQpIHJldHVybiBsaWdodDtcblxuICAgICAgc2VsZi5mb2xkT2JqZWN0KGxpZ2h0LCB0aGlzLnBhcmFtcy5saWdodCwgc2VsZi5mb2xkLmFkZEZvbGRlcignbGlnaHQnKSk7XG4gICAgICBzZWxmLmZvbGRPYmplY3QobGlnaHQuc2hhZG93LCB0aGlzLnBhcmFtcy5zaGFkb3csIHNlbGYuZm9sZC5hZGRGb2xkZXIoJ3NoYWRvdycpKTtcblxuICAgICAgcmV0dXJuIGxpZ2h0O1xuICAgIH0sXG5cbiAgICBvbldyYXAoYSwgc2VsZikge1xuICAgICAgc2VsZi5ndWlUcmFuc2Zvcm1zKHRoaXMubmF0aXZlLCBzZWxmLmZvbGQpO1xuICAgIH1cbiAgfVxufTtcbiIsImltcG9ydCB7RGF0QVBJfSBmcm9tICcuL0RhdEFQSSc7XG5cbmV4cG9ydCBjbGFzcyBEYXRDYW1lcmFNb2R1bGUgZXh0ZW5kcyBEYXRBUEkge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMgPSB7fSwgZ3VpKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBuYW1lOiAnVW5rbm93biBjYW1lcmEnLFxuICAgICAgdHJhbnNmb3JtczogdHJ1ZSxcbiAgICAgIGNhbWVyYTogdHJ1ZVxuICAgIH0sIHBhcmFtcyk7XG5cbiAgICB0aGlzLmd1aSA9IGd1aTtcbiAgICB0aGlzLmZvbGQgPSB0aGlzLmd1aS5hZGRGb2xkZXIodGhpcy5wYXJhbXMubmFtZSk7XG4gIH1cblxuICBpbnRlZ3JhdGUoc2VsZikge1xuICAgIGlmICh0aGlzLm5hdGl2ZSkge1xuICAgICAgc2VsZi5icmlkZ2UuY2FtZXJhLmJpbmQodGhpcykodGhpcy5uYXRpdmUsIHNlbGYpO1xuICAgICAgc2VsZi5icmlkZ2Uub25XcmFwLmJpbmQodGhpcykodGhpcy5uYXRpdmUsIHNlbGYpO1xuICAgIH1cbiAgfVxuXG4gIGJyaWRnZSA9IHtcbiAgICBjYW1lcmEoY2FtZXJhLCBzZWxmKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzKTtcbiAgICAgIGlmICghc2VsZi5wYXJhbXMuY2FtZXJhKSByZXR1cm4gY2FtZXJhO1xuICAgICAgc2VsZi5mb2xkT2JqZWN0KGNhbWVyYSwgdGhpcy5wYXJhbXMuY2FtZXJhLCBzZWxmLmZvbGQsICgpID0+IHtcbiAgICAgICAgY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gY2FtZXJhO1xuICAgIH0sXG5cbiAgICBvbldyYXAoYSwgc2VsZikge1xuICAgICAgc2VsZi5ndWlUcmFuc2Zvcm1zKHRoaXMubmF0aXZlLCBzZWxmLmZvbGQpO1xuICAgIH1cbiAgfVxufTtcbiIsImV4cG9ydCBjbGFzcyBEYXRDdXN0b21Nb2R1bGUge1xuICBjb25zdHJ1Y3Rvcihwcm9wcyA9IFtdLCBndWkpIHtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgdGhpcy5ndWkgPSBndWk7XG5cbiAgICBwcm9wcy5mb3JFYWNoKHRoaXMuYWRkLmJpbmQodGhpcykpO1xuICB9XG5cbiAgYWRkKHtcbiAgICBuYW1lLFxuICAgIHZhbHVlLFxuICAgIHJhbmdlID0gW2ZhbHNlLCBmYWxzZV0sXG4gICAgc3RlcCA9IDEsXG4gICAgb25DaGFuZ2UsXG4gICAgb25GaW5pc2hDaGFuZ2UsXG4gICAgbGlzdGVuID0gZmFsc2VcbiAgfSkge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSB0aGlzLmd1aS5hZGQoe1tuYW1lXTogdmFsdWV9LCBuYW1lKTtcblxuICAgIGlmIChyYW5nZVswXSAhPT0gZmFsc2UpIGNvbnRyb2xsZXIubWluKHJhbmdlWzBdKVxuICAgIGlmIChyYW5nZVsxXSAhPT0gZmFsc2UpIGNvbnRyb2xsZXIubWF4KHJhbmdlWzFdKVxuXG4gICAgY29udHJvbGxlci5zdGVwKHN0ZXApO1xuXG4gICAgaWYgKG9uQ2hhbmdlKSBjb250cm9sbGVyLm9uQ2hhbmdlKG9uQ2hhbmdlKTtcbiAgICBpZiAob25GaW5pc2hDaGFuZ2UpIGNvbnRyb2xsZXIub25GaW5pc2hDaGFuZ2Uob25GaW5pc2hDaGFuZ2UpO1xuICAgIGlmIChsaXN0ZW4pIGNvbnRyb2xsZXIubGlzdGVuKCk7XG5cbiAgICByZXR1cm4gY29udHJvbGxlcjtcbiAgfVxufTtcbiIsImltcG9ydCBkYXQgZnJvbSAnZGF0LWd1aSc7XG5cbmltcG9ydCB7RGF0TWVzaE1vZHVsZX0gZnJvbSAnLi9kYXRndWkvRGF0TWVzaE1vZHVsZSc7XG5pbXBvcnQge0RhdExpZ2h0TW9kdWxlfSBmcm9tICcuL2RhdGd1aS9EYXRMaWdodE1vZHVsZSc7XG5pbXBvcnQge0RhdENhbWVyYU1vZHVsZX0gZnJvbSAnLi9kYXRndWkvRGF0Q2FtZXJhTW9kdWxlJztcbmltcG9ydCB7RGF0Q3VzdG9tTW9kdWxlfSBmcm9tICcuL2RhdGd1aS9EYXRDdXN0b21Nb2R1bGUnO1xuXG4vLyBQb2x5ZmlsbFxuZGF0LkdVSS5wcm90b3R5cGUucmVtb3ZlRm9sZGVyID0gZnVuY3Rpb24obmFtZSkge1xuICB2YXIgZm9sZGVyID0gdGhpcy5fX2ZvbGRlcnNbbmFtZV07XG4gIGlmICghZm9sZGVyKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGZvbGRlci5jbG9zZSgpO1xuICB0aGlzLl9fdWwucmVtb3ZlQ2hpbGQoZm9sZGVyLmRvbUVsZW1lbnQucGFyZW50Tm9kZSk7XG4gIGRlbGV0ZSB0aGlzLl9fZm9sZGVyc1tuYW1lXTtcbiAgdGhpcy5vblJlc2l6ZSgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRHVUlNb2R1bGUge1xuICBzdGF0aWMgbmV3KHBhcmFtcykge1xuICAgIHJldHVybiBuZXcgRGF0R1VJTW9kdWxlKG5ldyBkYXQuR1VJKHBhcmFtcykpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoZ3VpID0gbmV3IGRhdC5HVUkoe2F1dG9QbGFjZTogZmFsc2V9KSkge1xuICAgIHRoaXMuZ3VpID0gZ3VpO1xuICB9XG5cbiAgbWFuYWdlcihtYW5hZ2VyKSB7XG4gICAgY29uc3QgZG9tID0gdGhpcy5ndWkuZG9tRWxlbWVudDtcbiAgICBjb25zdCBzdHlsZSA9IGRvbS5zdHlsZTtcblxuICAgIHN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBzdHlsZS50b3AgPSAwO1xuICAgIHN0eWxlLnJpZ2h0ID0gJzIwcHgnO1xuXG4gICAgbWFuYWdlci5nZXQoJ2VsZW1lbnQnKS5hcHBlbmRDaGlsZCh0aGlzLmd1aS5kb21FbGVtZW50KTtcbiAgfVxuXG4gIHNldChndWkpIHtcbiAgICB0aGlzLmd1aSA9IGd1aTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGZvbGRlcihuYW1lID0gJ2ZvbGRlcicpIHtcbiAgICByZXR1cm4gbmV3IERhdEdVSU1vZHVsZSh0aGlzLmd1aS5hZGRGb2xkZXIobmFtZSkpO1xuICB9XG5cbiAgTWVzaChwYXJhbXMgPSB7fSwgZ3VpID0gdGhpcy5ndWkpIHtcbiAgICByZXR1cm4gbmV3IERhdE1lc2hNb2R1bGUocGFyYW1zLCBndWkpO1xuICB9XG5cbiAgTGlnaHQocGFyYW1zID0ge30sIGd1aSA9IHRoaXMuZ3VpKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRMaWdodE1vZHVsZShwYXJhbXMsIGd1aSk7XG4gIH1cblxuICBDYW1lcmEocGFyYW1zID0ge30sIGd1aSA9IHRoaXMuZ3VpKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRDYW1lcmFNb2R1bGUocGFyYW1zLCBndWkpO1xuICB9XG5cbiAgQ3VzdG9tKHBhcmFtcyA9IHt9LCBndWkgPSB0aGlzLmd1aSkge1xuICAgIHJldHVybiBuZXcgRGF0Q3VzdG9tTW9kdWxlKHBhcmFtcywgZ3VpKTtcbiAgfVxufVxuXG5EYXRHVUlNb2R1bGUuZGF0ID0gZGF0O1xuIl0sIm5hbWVzIjpbInJlcXVpcmUkJDAiLCJyZXF1aXJlJCQxIiwiYWRkaXRpb25hbCIsImFkZCIsIm9yaWdpbiIsImFkZHYiLCJPYmplY3QiLCJhc3NpZ24iLCJtYXAiLCJ2YWx1ZSIsIkZyb250U2lkZSIsIkJhY2tTaWRlIiwiRG91YmxlU2lkZSIsIlNtb290aFNoYWRpbmciLCJGbGF0U2hhZGluZyIsIk5vcm1hbEJsZW5kaW5nIiwiQWRkaXRpdmVCbGVuZGluZyIsIlN1YnRyYWN0aXZlQmxlbmRpbmciLCJNdWx0aXBseUJsZW5kaW5nIiwiQ3VzdG9tQmxlbmRpbmciLCJBbHdheXNEZXB0aCIsIkxlc3NEZXB0aCIsIkxlc3NFcXVhbERlcHRoIiwiR3JlYXRlckVxdWFsRGVwdGgiLCJHcmVhdGVyRGVwdGgiLCJOb3RFcXVhbERlcHRoIiwiRGF0QVBJIiwib2JqZWN0IiwiaW5zdGFuY2UiLCJmb2xkIiwib25DaGFuZ2UiLCJrZXkiLCJpc0NvbG9yIiwiYWRkQ29sb3IiLCJiYWJlbEhlbHBlcnMudHlwZW9mIiwiZm9sZE9iamVjdCIsImFkZEZvbGRlciIsInJhbmdlIiwicmVwZWF0IiwidG9TdHJpbmciLCJsZW5ndGgiLCJtaW4iLCJzdGVwIiwibmF0aXZlIiwicGFyYW1zIiwidHJhbnNmb3JtcyIsImNvbnRyb2xsZXIiLCJwb3NpdGlvbiIsInJvdGF0aW9uIiwic2NhbGUiLCJEYXRNZXNoTW9kdWxlIiwiZ3VpIiwiYnJpZGdlIiwibWF0ZXJpYWwiLCJzZWxmIiwiZm9sZGVyIiwiZ3VpTWF0ZXJpYWwiLCJnZW9tZXRyeSIsImdfIiwiRXJyb3IiLCJndWlHZW9tZXRyeSIsIm1lc2giLCJjdXN0b21NYXRlcmlhbHMiLCJjdXJyZW50Iiwia2V5cyIsInYiLCJyZW1vdmVGb2xkZXIiLCJhIiwiZ3VpVHJhbnNmb3JtcyIsIm5hbWUiLCJwcm9wZXJ0eSIsImNvbG9yIiwiZ2V0SGV4IiwicmVwbGFjZSIsInNldEhleCIsImNvbXBvbmVudCIsInBhcmFtc1Byb2Nlc3NvciIsInVuZGVmaW5lZCIsIm1hdGVyaWFscyIsInR5cGUiLCJhbnkiLCJnZW9tUGFyYW1zIiwiZ2VvbURhdGEiLCJkYXRhIiwibWF4IiwiaW5kZXhPZiIsImJpbmQiLCJvbldyYXAiLCJEYXRMaWdodE1vZHVsZSIsImxpZ2h0Iiwic2hhZG93IiwiRGF0Q2FtZXJhTW9kdWxlIiwiY2FtZXJhIiwidXBkYXRlUHJvamVjdGlvbk1hdHJpeCIsIkRhdEN1c3RvbU1vZHVsZSIsInByb3BzIiwiZm9yRWFjaCIsIm9uRmluaXNoQ2hhbmdlIiwibGlzdGVuIiwiZGF0IiwiR1VJIiwicHJvdG90eXBlIiwiX19mb2xkZXJzIiwiY2xvc2UiLCJfX3VsIiwicmVtb3ZlQ2hpbGQiLCJkb21FbGVtZW50IiwicGFyZW50Tm9kZSIsIm9uUmVzaXplIiwiRGF0R1VJTW9kdWxlIiwiYXV0b1BsYWNlIiwibWFuYWdlciIsImRvbSIsInN0eWxlIiwidG9wIiwicmlnaHQiLCJnZXQiLCJhcHBlbmRDaGlsZCJdLCJtYXBw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
