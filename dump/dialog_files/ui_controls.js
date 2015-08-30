// Classes:
//   Dropdown / Autocomplete / Selector
//   Select
//   Checkbox
//   Radiobutton
//   Autosize
//   DropdownMenu
//   Cache
//   Indexer

var UI_CONTROLS_DEBUG = false;
function debug(e) {
  if (!UI_CONTROLS_DEBUG) return;
  debugLog(e);
}
if (!window.vk) vk = {};

//
// OOP functions
//
function inherit(child, parent) {
  var F = function() {};
  F.prototype = parent.prototype;
  child.prototype = new F();
  child.prototype.constructor = child;
  child.superclass = parent.prototype;
}

function createChildClass(className, parent, proto) {
  var code = 'function ' + className + ' (a, b, c, d) {\
    if (this == window || this.setInterval) return new ' + className + '(a, b, c, d);\
    this.__className = "' + className + '";\
    return this.__construct__(arguments);\
  };';

  if (window.execScript) {
    window.execScript(code);
  } else {
    window.eval(code);
  }
  childClass = eval('(' + className + ')');
  inherit(childClass, parent);
  if (('common' in proto)) {
    extend(childClass, proto['common']);
    proto['common'] = childClass;
  }
  extend(childClass.prototype, proto);
}

if (window._ui === undefined) {
  var _ui = {
    _guid: 0,
    _sel: false,
    _uids: [false],
    reg: function(obj) {
      _ui._uids.push(obj);
      return ++_ui._guid;
    },
    sel: function(nsel) {
      if (nsel !== undefined) {
        var s = _ui.selobj();
        if (s && s._blur) {
          s._blur();
        }
        _ui._sel = nsel;
      }
      return _ui._sel;
    },
    selobj: function(val) {
      if (_ui._sel && val !== undefined) {
        _ui._uids[_ui._sel] = val;
      }
      return _ui._uids[_ui._sel];
    }
  }

  addEvent(document, 'keypress keydown mousedown', function(e) {
    if (_ui.sel()) {
      var sel = _ui.selobj();
      if (!sel) {
        return _ui.sel(false);
      }
      if (sel.container && sel.container != ge(sel.container.id)) {
        _ui.selobj(false);
        return _ui.sel(false);
      }
      sel.onEvent(e);
    }
  });
}

//
// UiControl abstract class
//
function UiControl(args) {
  return this.__construct__(args);
}

extend(UiControl.prototype, {
  // Constants
  CSS: {},
  defaultOptions: null,
  dom: {},

  // Consructor
  __construct__: function(args) {
    if (this.beforeInit) if (this.beforeInit.apply(this, args) === false) return false;
    if (this.initOptions) if (this.initOptions.apply(this, args) === false) return false;
    if (this.init.apply(this, args) === false) return false;
    if (this.initDOM) if (this.initDOM.apply(this, args) === false) return false;
    if (this.initEvents) this.initEvents.apply(this, args);
    if (this.afterInit) this.afterInit.apply(this, args);
    return this;
  },

  // Standart abstract methods

  // UI Control initialisation

  // User defined callback
  beforeInit: null,
  // Init options field
  initOptions: null,
  // init and initEvents are required
  init: null,
  // Construct DOM
  initDOM: null,

  // Attach events listeners to elements
  initEvents: null,

  // User defined callback
  afterInit: null,

  show: null,
  hide: null
});

function Dropdown(input, data, options) {
  if (!options) options = {};
  return new Selector(
    input,
    options.autocomplete ? data : [], extend({
      introText: '',
      multiselect: false,
      autocomplete: false,
      selectedItems: options.selectedItem
    }, options, {
      defaultItems: data
    }
  ));
}

// Alias
function Autocomplete(input, data, options) {
  return new Selector(input, data, options);
}

//
// Dropdown class
//
createChildClass('Selector', UiControl, {
  // Standart object fields
  CSS: {
  },
  defaultOptions: {
    selectedItems: [],
    defaultItems: [],
    multiselect: true,
    autocomplete: true,
    dropdown: true,
    cacheLength: 100,
    showMax: 10,
    maxItems: 50,
    maxItemsShown: function(query_length) {
      if (query_length > 6) {
        return 500;
      } else if (query_length > 4) {
        return 200;
      } else if (query_length > 2) {
        return 150;
      } else {
        return 100;
      }
    },
    selectFirst: true,
    dividingLine: 'smart',
    enableCustom: false,
    valueForCustom: -1,
    width: 300,
    height: 250,
    progressBar: false,
    highlight: function(label, term) {
      label = term.indexOf(' ') == -1 ? label.split(' ') : [label];
      var tmp = '';
      var termRus = parseLatin(term);

      if (termRus != null) {
        term = term + '|' + termRus;
      }
      var re = new RegExp('(?![^&;]+;)(?!<[^<>]*)((\\(*)(' + escapeRE(term) + '))(?![^<>]*>)(?![^&;]+;)', 'gi');
      for (var i in label) {
        tmp += (i > 0 ? ' ' : '') + label[i].replace(re, '$2<em>$3</em>');
      }
      return tmp;
    },
    placeholder: '',
    placeholderColor: '#afb8c2',
    introText: 'Start typing',
    noResult: getLang('search_nothing_found'),
    noImageSrc: 'http://vkontakte.ru/images/question_s.gif',
    formatResult: function(data) {
      return data[1] + (typeof(data[2]) == 'string' ? ' <span>' + data[2] + '</span>' : '');
    },
    hrefPrefix: 'id'
  },
  controlName: 'Selector',

  // Standart object methods
  beforeInit: function(input) {
    if (input == null || input['autocomplete']) {
      try { console.error("Can't init ", input); } catch (e) {}
      return false;
    }
    this.guid = _ui.reg(this);
  },
  initOptions: function(input, data, options) {
    var opts = this.options = extend({}, this.defaultOptions, {
      resultField: input['name'] || 'selectedItems',
      customField: input['name'] ? (input['name'] + '_custom') : 'selectedItems_custom'
    }, this.prepareOptionsText(options || {}));

    // if highlight is set to false, replace it with a do-nothing function
    opts.highlight = opts.highlight || function(label) { return label; };

    // Get selected value
    if (!isArray(opts.selectedItems) && isEmpty(opts.selectedItems)) {
      opts.selectedItems = [];
    }
    if (input['value'] && !opts.selectedItems.length) {
      opts.selectedItems = input['value'];
    }

    opts.width = parseInt(opts.width) > 0 ? parseInt(opts.width) : this.defaultOptions.width;
    opts.height = parseInt(opts.height) > 0 ? parseInt(opts.height) : this.defaultOptions.height;
    opts.resultListWidth = parseInt(opts.resultListWidth) > 0 ? parseInt(opts.resultListWidth) : opts.width;
    if (opts.imageId) {
      opts.imageId = ge(opts.imageId);
    }
  },
  init: function(input, data) {
    this.dataURL = typeof(data) == 'string' ? data : null;
    this.dataItems = isArray(data) ? data : [];
    this.currentList = this.dataItems;

    if (this.dataURL) {
      this.cache = new Cache(this.options);
    } else {
      this.indexer = new Indexer(this.dataItems, {indexkeys: this.options.indexkeys});
    }

    this._selectedItems = [];
    this.input = input;
    this.disabled = false;
    this.mouseIsOver = false;
    this.hasFocus = 0;
    this.scrollbarWidth = 0;
    this.timeout = null;
    this.readOnly = (!this.options.autocomplete ? 'readonly="true"' : '');
    this.requestTimeout = null;
    this.selectedTokenId = 0;
    this.selectorWidth = this.options.width;
  },
  initDOM: function(input, data, options) {
    var opts = this.options, self = this;

    this.container = ce('div', {
      id: 'container' + this.guid,
      className: 'selector_container' + (!opts.autocomplete ? ' dropdown_container' : '') + (browser.mobile ? ' mobile_selector_container' : ''),
      innerHTML:
  '<table cellspacing="0" cellpadding="0" class="selector_table">\
    <tr>\
      <td class="selector">\
        <span class="selected_items"></span>\
        <input type="text" class="selector_input" ' + this.readOnly + ' />\
        <input type="hidden" name="' + opts.resultField + '" id="' + opts.resultField + '" value="" class="resultField"><input type="hidden" name="' + opts.customField + '" id="' + opts.customField + '" value="" class="customField">\
      </td>' + (opts.dropdown ? '<td id="dropdown' + this.guid + '" class="selector_dropdown">&nbsp;</td>' : '') + '\
    </tr>\
  </table>\
  <div class="results_container">\
    <div class="result_list" style="display:none;"></div>\
    <div class="result_list_shadow">\
      <div class="shadow1"></div>\
      <div class="shadow2"></div>\
    </div>\
  </div>'
    }, {
      width: opts.width + 'px'
    });
    input.parentNode.replaceChild(this.container, input);
    each ({
      selector: 'selector',
      resultList: 'result_list',
      resultListShadow: 'result_list_shadow',
      input: 'selector_input',
      selectedItemsContainer: 'selected_items',
      resultField: 'resultField',
      customField: 'customField',
      dropdownButton: 'selector_dropdown'
    }, function(k, v) {
      self[k] = geByClass(v, self.container)[0];
    });

    if (browser.chrome) {
      this.resultList.style.opacity = 1;
    }

    //if (!this.disabled) // always enabled at init
    input.style.color = opts.placeholderColor;
    input.autocomplete = '1';

    if (opts.dividingLine) {
      addClass(this.resultList, 'dividing_line')
    }

    this.resultList.style.width = this.resultListShadow.style.width = opts.resultListWidth + 'px';

    if (this.options.dropdown) {
      this.initDropdown();
    }

    this.select = new Select(this.resultList, this.resultListShadow, {
      selectFirst: opts.selectFirst,
      height: opts.height,
      onItemActive: function(value) {
        self.showImage(value);
        self.activeItemValue = value;
      },
      onItemSelect: self._selectItem.bind(self),
      onShow: function() {
        _ui.sel(self.guid);
        self.highlightInput(true);
      },
      onHide: function() {
        _ui.sel(false);
        self.highlightInput(false);
      }
    });
  },
  initEvents: function() {
    var self = this;
    if (this.options.dropdown) {
      this.initDropdownEvents();
    }
    var keyev1 = browser.opera || browser.mozilla ? 'keypress' : 'keydown';
    var keyev2 = browser.opera ? 'keypress' : 'keydown';
    this.onEvent = function(e) {
      if (e.type == 'mousedown') {
        var outside = true, t = e.target;
        while (t && t != t.parentNode) {
          if (t == self.container) {
            outside = false;
            break;
          }
          t = t.parentNode;
        }
        if (outside) {
          self.select.hide();
          self.deselectTokens();
        }
      }
      if (e.type == keyev1) {
        self.handleKeyboardEventOutside(e);
      }
      if (e.type == keyev2) {
        self.select.handleKeyEvent(e);
      }
    }

    addEvent(this.input, 'paste keypress keydown focus blur', this.handleKeyboardEvent, false, {self: this});
    addEvent(this.selector, 'mousedown', function(e) {
      var click_over_token = false;
      var el = e.target;
      while (el != null) {
        if (hasClass(el, 'token')) {
          click_over_token = true;
          break;
        }
        el = el.parentNode;
      }
      if (!click_over_token) {
        return self.onInputClick(e);
      }
      return true;
    }, false, {self: this});
  },
  afterInit: function() {
    this.updateInput();
    var opt = this.options, self = this;
    if (opt.selectedItems !== undefined) {
      if (isArray(opt.selectedItems)) {
        for (var i in opt.selectedItems) {
          this._selectItem(opt.selectedItems[i], false);
        }
      } else {
        each((opt.selectedItems + '').split(','), function(i, x) {
          self._selectItem(x, false);
        });
      }
    }

    // Select first item if it is dropdown
    if (!this._selectedItems.length && !this.options.autocomplete && !this.options.multiselect && this.options.defaultItems.length) {
      this._selectItem(this.options.defaultItems[0], false);
    }
  },
  // Extended methods
  prepareOptionsText: function(options) {
    each(['disabledText', 'placeholder'], function() {
      if (this in options) {
        options[this] = winToUtf(stripHTML(options[this]));
      }
    });
    return options;
  },
  fadeButtonToColor: function() {
    var state = window.is_rtl ? {backgroundColor: '#E1E8ED', borderRightColor: '#D2DBE0'} : {backgroundColor: '#E1E8ED', borderLeftColor: '#D2DBE0'};
    var self = this;
    animate(this.dropdownButton, state, 200, function() {
      if (!self.mouseIsOver) {
        if (!self.select.isVisible()) {
           self.fadeButtonToWhite();
        } else {
          self.dropdownButton.style.backgroundColor = self.dropdownButton.style[window.is_rtl ? 'borderRightColor' : 'borderLeftColor'] = '';
        }
      }
    });
  },
  fadeButtonToWhite: function() {
    var self = this;
    animate(this.dropdownButton, {backgroundColor: '#FFFFFF', borderLeftColor: '#FFFFFF'}, 200, function() {
      self.dropdownButton.style.backgroundColor = self.dropdownButton.style[window.is_rtl ? 'borderRightColor' : 'borderLeftColor'] = '';
      if (self.mouseIsOver) {
        self.fadeButtonToColor();
      }
    });
  },
  initDropdown: function() {
    this.scrollbarWidth = window.sbWidth();
    if (this.scrollbarWidth <= 3) {
      this.scrollbarWidth = browser.mobile ? 20 : 14;
    }
    this.dropdownButton.style.width = this.scrollbarWidth + 'px';
    this.selectorWidth -= this.scrollbarWidth;
  },
  initDropdownEvents: function() {
    var self = this;
    addEvent(this.dropdownButton, 'mouseover', function() {
      addClass(this, 'selector_dropdown_hover');
    });
    addEvent(this.dropdownButton, 'mouseout', function() {
      removeClass(this, 'selector_dropdown_hover');
    });
    addEvent(this.container, 'mouseover', function(e) {
      self.mouseIsOver = true;
      if (self.disabled) return;
      self.fadeButtonToColor();
    });
    addEvent(this.container, 'mouseout', function() {
      self.mouseIsOver = false;
      if (self.disabled) return;
      setTimeout(function() {
        if (self.mouseIsOver) return;
        if (!self.select.isVisible()) {
          self.fadeButtonToWhite();
        } else {
          self.dropdownButton.style.backgroundColor = self.dropdownButton.style[window.is_rtl ? 'borderRightColor' : 'borderLeftColor'] = '';
        }
      }, 0);
    });
    addEvent(this.dropdownButton, 'mousedown', function() {
      if (!self.select.isVisible()) {
        self.showDefaultList();
      } else {
        self.select.toggle();
      }
    });
  },
  destroyDropdown: function() {
    if (vk.al) cleanElems(this.dropdownButton);
    removeEvent(this.container, 'mouseover');
    removeEvent(this.container, 'mouseout');
    this.scrollbarWidth = 0;
    this.selectorWidth = this.options.width;
  },
  destroy: function() {
    if (!vk.al || this.destroyed) return;
    this.destroyDropdown();
    var img = ge(this.options.imageId);
    if (img) removeEvent(img, 'click');
    this.select.destroy();
    cleanElems(this.container, this.input, this.selector, this.resultList, this.resultListShadow);
    for (var el = this.selectedItemsContainer.firstChild; el; el = el.nextSibling) {
      cleanElems(el, el.firstChild.nextSibling);
    }
    this.destroyed = true;
  },
  updateInput: function() {
    if (!this._selectedItems.length && !this.hasFocus) {
      this.input.value = ((this.disabled && this.options.disabledText) ? this.options.disabledText : this.options.placeholder);
      if (!this.disabled) this.input.style.color = this.options.placeholderColor;
    }
    if (!this.options.autocomplete && this.options.multiselect && this._selectedItems.length){
      hide(this.input);
    } else {
      if (!isVisible(this.input)) show(this.input);
      this.input.style.width = '20px';
      var offset = this._selectedItems.length ? this.input.offsetLeft : (window.is_rtl ? this.selectorWidth - 9 : 0);
      var w = window.is_rtl ? offset : (this.selectorWidth - offset - 9);
      this.input.style.width = Math.max(20, w) + 'px';
    }
  },
  handleKeyboardEvent: function(e) {
    var self = e.data.self;

    switch (e.type) {

    case 'paste':
      clearTimeout(self.timeout);
      self.timeout = setTimeout(function(){ self.onChange(); }, 0);
    break;

    case 'keypress':
      if (e.which == KEY.RETURN && browser.opera && self.options.enableCustom && (self.select.selectedItem() === null || self.select.selectedItem() === undefined)) {
        self.select.hide();
        if (!self.options.noBlur) { self.input.blur(); }
        else if (isFunction(self.options.onChange)) {
          self.updateCustom();
          self.options.onChange(self.resultField.value);
        }
        return false;
      } else if (e.which == KEY.SPACE || e.which > 40 && !e.metaKey) {
        clearTimeout(self.timeout);
        self.timeout = setTimeout(function(){ self.onChange(); }, 0);
      }
    break;

    case 'keydown':
      switch (e.keyCode) {
        case KEY.DOWN:
          if (!self.select.isVisible()) {
            setTimeout(self.showDefaultList.bind(self), 0);
            return false;
          }
        break;
        case KEY.DEL:
          if (self.input.value.length > 0) {
            clearTimeout(self.timeout);
            self.timeout = setTimeout(self.onChange.bind(self), 0);
          } else {
            if (self.selectedTokenId) {
              var nextTokenId = 0;
              for (var i = self._selectedItems.length - 2; i >= 0; i--) {
                if (self._selectedItems[i][0] == self.selectedTokenId && self._selectedItems[i+1]) {
                  nextTokenId = self._selectedItems[i+1][0];
                }
              }
              self.removeTagData(self.selectedTokenId);

              if (nextTokenId) {
                self.selectToken(nextTokenId);
              } else if (!self.readOnly && !self.hasFocus) {
                self.input.focus();
              }
            } else if (self.hasFocus && self._selectedItems.length) {
              self.selectToken(self._selectedItems[self._selectedItems.length - 1][0]);
            }
            cancelEvent(e);
          }
          return true;
        break;
        case KEY.RETURN:
          if (!browser.opera && self.options.enableCustom && (self.select.selectedItem() === null || self.select.selectedItem() === undefined)) {
            self.select.hide();
            if (!self.options.noBlur) { self.input.blur(); }
            else if (isFunction(self.options.onChange)) {
              self.updateCustom();
              self.options.onChange(self.resultField.value);
            }
            return false;
          }
          break;
        case KEY.ESC:
          self.input.blur();
          break;
      }
    break;

    case 'focus':
      if (!self.disabled && !self.select.isVisible() && !self.focusSelf) {
        self.showDefaultList();
      }
      self.focusSelf = false;
      if (self.disabled || self.readOnly) {
        self.input.blur();
        return true;
      }

      if ((self._selectedItems.length == 0) || self.options.multiselect) {
        if (browser.mozilla) {
          setTimeout(function () {
            self.input.value = '';
          }, 0);
        } else {
          self.input.value = '';
        }
      }
      addClass(self.input, 'focused');
      self.input.style.color = '#000';
      self.hasFocus++;
    break;

    case 'blur':
      if (self.options.chooseFirst && self.options.chooseFirst(self.input.value)) { // email field
        // todo
        self.select.active = 0;
        if (isFunction(self.select.options.onItemSelect)) {
          self.select.options.onItemSelect(self.select.selectedItem(), undefined, true);
        }
        return cancelEvent(e);
      }
      if (self.readOnly) return true;
      if (!self.disabled) {
        self.updateCustom();
        clearTimeout(self.requestTimeout);
        if (self.changeAfterBlur && isFunction(self.options.onChange)) {
          if (!self.options.enableCustom || !self._selectedItems.length) {
            self.options.onChange('');
          }
          self.changeAfterBlur = false;
        }
        if (self.options.onBlur) { self.options.onBlur(); }
      }
      if (!hasClass(self.input, 'selected')) {
        self.input.style.color = self.options.placeholderColor;
      }
      removeClass(self.input, 'focused');
      self.hasFocus = 0;
    break;

    }
    return true;
  },
  updateCustom: function() {
    var self = this;
    if (self.options.enableCustom && self.input.value.length) {
      var custom_val = self.input.value;
      if (self._selectedItems.length == 0) {
        self.resultField.value = parseInt(!self.options.valueForCustom);
        self.customField.value = custom_val;
        self._selectItem([self.options.valueForCustom, custom_val]);
      }
    } else if (self._selectedItems.length == 0) {
      self.input.value = self.options.placeholder;
    } else if (self.options.multiselect) {
      self.input.value = '';
    }
  },
  handleKeyboardEventOutside: function(e) {
    if (this.disabled || this.input.value.length > 0 && this.hasFocus || !this.hasFocus && this.selectedTokenId == 0) {
      return true;
    }
    switch(e.keyCode) {
      case KEY.RETURN:
        return false;
      break;
      case KEY.LEFT:
        for (var i = this._selectedItems.length - 1; i >= 0; i--) {
          if (!this.selectedTokenId || this._selectedItems[i][0] == this.selectedTokenId && i > 0) {
            if (this.selectedTokenId) {
              i--;
            }
            this.selectToken(this._selectedItems[i][0]);
            this.input.blur();
            break;
          }
        }
        return false;
        break;

      case KEY.RIGHT:
        for (var i = 0; i < this._selectedItems.length; i++) {
          if (this._selectedItems[i][0] == this.selectedTokenId) {
            if (i < this._selectedItems.length - 1) {
              this.selectToken(this._selectedItems[i+1][0]);
              this.input.blur();
            } else if (!this.readOnly) {
              this.deselectTokens();
              this.input.focus();
            }
            break;
          }
        }
        return false;
        break;
    }
    return true;
  },
  onInputClick: function(e) {
    var self = e.data.self;
    self.deselectTokens();
    if (!self.select.isVisible()) {
      self.showDefaultList();
    } else {
      if (self.input.readOnly) {
        self.focusSelf = true;
        self.select.toggle();
      } else {
        self.onChange();
      }
    }
    if (!self.readOnly) {
      // self.focusSelf = true;
      self.input.focus();
    } else {
      self.input.blur();
    }
  },
  highlightInput: function(focus) {
    if (focus) {
      addClass(this.container, 'selector_focused');
    } else {
      removeClass(this.container, 'selector_focused');
    }
  },
  selectToken: function(id) {
    if (!this.options.multiselect) return;
    this.select.hide();
    removeClass(ge('bit_' + this.guid + '_' + this.selectedTokenId), 'token_selected');
    addClass(ge('bit_' + this.guid + '_' +  id), 'token_selected');
    this.selectedTokenId = id;
    if (this.options.onTokenSelected) this.options.onTokenSelected(id);
    this.showImage(id);
  },
  deselectTokens: function() {
    if (!this.selectedTokenId || !this.options.multiselect) return;
    removeClass(ge('bit_' + this.guid + '_' + this.selectedTokenId), 'token_selected');
    this.selectedTokenId = 0;
    if (this.options.onTokenSelected) this.options.onTokenSelected();
    this.showImage();
  },
  _blur: function() {
    this.select.hide();
  },
  showImage: function(itemValue, itemData) {
    if (!this.options.imageId) {
      return false;
    }
    var img = ge(this.options.imageId);
    if (!img) return false;
    if (itemData === undefined) {
      if (!itemValue) { // 0 or undefined
        itemValue = this.resultField.value.split(',')[0];
      }
      var data = this._selectedItems.concat(this.currenDataItems);

      if (data && data.length) {
        for (var i in data) {
          if (data[i] && data[i][0] == itemValue) {
            itemData = data[i];
            break;
          }
        }
      }
    }
    if (itemData !== undefined && typeof(itemData[3]) == 'string' && itemData[3].length) {
      if (itemData[3] == 'none'){
        img.style.display = 'none';
      } else {
        img.style.display = '';
        img.setAttribute('src', itemData[3]);
        img.parentNode.href = '/' + this.options.hrefPrefix + itemData[0]; // hack
        removeEvent(img.parentNode, 'click');
      }
    } else {
      img.style.display = '';
      img.setAttribute('src', this.options.noImageSrc);
      img.parentNode.href = '#'; // hack
      addEvent(img.parentNode, 'click', function() { return true; });
    }
    return true;
  },
  _selectItem: function(item, fireEvent, focusIfMultiselect) {
    if (item == null) {
      return;
    }
    if (fireEvent === undefined) {
      fireEvent = true;
    }
    var data;

    if (item == -2e9) {
      data = [this.curTerm, this.curTerm, cur.lang['mail_enter_email_address'], '/images/pics/contact_info.png', 0, ''];
    } else if (typeof(item) == 'object') {
      data = item;
    } else {
      var all_data = [];
      each([this.dataItems, this.options.defaultItems, this.receivedData], function(i,items) {
        if (items && items.length)
          all_data = all_data.concat(items);
      });
      for (var i in all_data) {
        if (all_data[i][0] == item || all_data[i] == item) {
          data = all_data[i];
          break;
        }
      }
    }

    if (typeof data != 'object') {
      data = [item, item]; // value and text
    };
    data[0] = data[0].toString();
    data[1] = data[1].toString();

    this.changeAfterBlur = false;
    if (data[0] === this.resultField.value) {
      if (!this.options.multiselect) {
        this.input.value = winToUtf(stripHTML(data[1])); // It could have changed in setData method
        this.showImage();
        if (this.input.value.length || !this.options.placeholder) {
          addClass(this.input, 'selected');
          if (!this.disabled) {
            this.input.style.color = this.resultField.value == '0' && this.options.zeroPlaceholder && this.options.placeholderColor || '#000';
          }
        } else {
          this.input.value = this.options.placeholder;
          if (!this.disabled) this.input.style.color = this.options.placeholderColor;
        }
      }
      return;
    }
    this.select.hide();
    if (this._selectedItems.length >= this.options.maxItems) {
      return;
    }

    this.deselectTokens();
    this.addTagData(data);
    this.showImage();

    if (this.options.multiselect) {
      this.input.value = '';
      if (this.dataURL) {
        this.select.clear();
      } else {
        this.select.removeItem(data[0]);
      }
    } else {
      this.input.value = winToUtf(stripHTML(data[1]));
      addClass(this.input, 'selected');
      if (!this.disabled) {
        this.input.style.color = this.resultField.value == '0' && this.options.zeroPlaceholder && this.options.placeholderColor || '#000';
      }
    }

    this.updateInput();
    if (focusIfMultiselect && this.options.multiselect && !this.readOnly) {
      setTimeout(function() {
        this.focusSelf = true;
        hide(this.input);
        show(this.input);
        this.input.focus();
      }.bind(this), 100);
    } else {
      if (!this.options.noBlur) this.input.blur();
    }

    if (fireEvent) {
      if (this.options.multiselect && isFunction(this.options.onTagAdd)) {
        this.options.onTagAdd(data, this.resultField.value);
      }
      if (isFunction(this.options.onChange)) {
        this.options.onChange(this.resultField.value);
      }
    }
  },
  addTagData: function(data) {
    if (!data || data.length < 2) return;
    if (!this.options.multiselect) {
      this._selectedItems.splice(0, this._selectedItems.length, data);
      this.resultField.value = data[0];
      return;
    }
    for (var i in this._selectedItems) {
      if (this._selectedItems[i][0] == data[0]) {
        this.selectToken(this._selectedItems[i][0]);
        return;
      }
    }
    this._selectedItems.push(data);

    var resultArr = [];
    for (i in this._selectedItems) {
      resultArr.push(this._selectedItems[i][0]);
    }
    this.resultField.value = resultArr.join(',');

    this.input.style.width = '1px';

    // make box
    var token = ce('div', {
      id: 'bit_' + this.guid + '_' + data[0],
      className: 'token'
    });
    var maxTokenWidth = Math.max(this.selector.clientWidth, getSize(token)[0]);
    var self = this;

    token.innerHTML = '<span class="l">' + data[1] + '</span><span class="x" />';

    addEvent(token, 'click', function() {
      self.selectToken(data[0]);
      return false;
    });
    addEvent(token, 'dblclick', function() {
      if (data[4]) {
        self.removeTagData(data[0]);
        each(data[4], function(i, v) {
          self._selectItem(v, false);
        });
      }
      return false;
    });
    addEvent(token, 'mouseover', function(e) {
      addClass(token, 'token_hover');
      self.showImage(data[0], data);
    });
    addEvent(token, 'mouseout', function(e) {
      removeClass(token, 'token_hover');
      self.showImage(self.activeItemValue ? self.activeItemValue : self.selectedTokenId);
    });
    var close = token.firstChild.nextSibling;
    addEvent(close, 'mousedown', function() {
      self.select.hide();
      self.removeTagData(data[0]);
      if (!self.readOnly && self.hasFocus) {
        self.input.focus();
      }
      return false;
    });

    self.selectedItemsContainer.appendChild(token);

    var label = token.firstChild;
    var labelStr = label.innerHTML;
    while (token.offsetWidth > maxTokenWidth && labelStr.length > 3) {
       labelStr = labelStr.substr(0, labelStr.length - 2);
       label.innerHTML = labelStr + '...';
    }
  },
  removeTagData: function(id) {
    this.selectedTokenId = 0;
    var token = ge('bit_' + this.guid + '_' + id);
    if (!token) {
      return false;
    }
    var close = token.firstChild.nextSibling;
    if (vk.al) cleanElems(token, close);
    token.parentNode.removeChild(token);

    var index, resultArr = [];
    for (i in this._selectedItems) {
      if (this._selectedItems[i][0] == id) {
        index = i;
        continue;
      }
      resultArr.push(this._selectedItems[i][0]);
    }
    if (index == undefined) return false;

    this.resultField.value = resultArr.join(',');

    if (this.options.onTagRemove) {
      this.options.onTagRemove(this._selectedItems[i], this.resultField.value);
    }
    if (isFunction(this.options.onChange)) {
      this.options.onChange(this.resultField.value);
    }
    this._selectedItems.splice(index, 1);
    if (this.options.multiselect) {
      this.defaultList = false;
    }
    this.showImage();
    this.updateInput();
    return false;
  },
  onChange: function() {
    var term = trim(this.input.value.toLowerCase()),
      self = this;
    if (!this.options.multiselect) {
      if (this._selectedItems.length) {
        this.changeAfterBlur = true;
      }
      this._clear();
    }
    clearTimeout(this.requestTimeout);
    if (term.length == 0) {
      this.showDefaultList();
      return;
    }
    this.curTerm = term;
    var custom = this.options.customSearch, res = custom && custom(term);
    if (res) {
      this.receiveData(term, res);
      return;
    }
    if (this.dataURL) {
      var data = this.cache.getData(term);
      if (data == null) {
          this.requestTimeout = setTimeout(function() {
            self.request(self.receiveData.bind(self), self.showNoDataList.bind(self));
          }, 300);
      } else {
        // receive the cached data
        if (data && data.length) {
          this.receiveData(term, data);
        } else {
          this.showNoDataList();
        }
      }
    } else {
      var data = this.indexer.search(term);
      if (data && data.length) {
        this.receiveData(term, data);
      } else {
        this.showNoDataList();
      }
    }
  },
  showNoDataList: function() {
    if (this.hasFocus || this.readOnly) {
      this._showSelectList(this.options.noResult);
      this.defaultList = false;
    }
  },
  showDefaultList: function() {
    var reversed = hasClass(this.resultList, 'reverse');
    if (reversed != this.needsReverse() && this.currenDataItems) {
      this.setSelectContent(this.currenDataText || '', this.currenDataItems);
    }
    if (this.defaultList && this.select.hasItems()) {
      if (this.options.multiselect || !this._selectedItems.length)
        this.select.show();
      else
        this.select.show(this._selectedItems[0][0]);
    } else {
      this.defaultList = true;
      var text = this.options.autocomplete ? this.options.introText : null;
      this._showSelectList(text, (this.options.defaultItems.length || this.options.zeroDefault) ? this.options.defaultItems : this.dataItems);
    }
    reversed = hasClass(this.resultList, 'reverse');
    if (reversed) {
      if (!this._selectedItems.length) {
        this.resultList.scrollTop = getSize(this.resultList.firstChild)[1] - getSize(this.resultList)[1] + 10;
      }
      setStyle(this.resultList, {bottom: getSize(this.container)[1] - 1});
    } else {
      setStyle(this.resultList, {bottom: 'auto'});
    }
  },
  showDataList: function(items, query) {
    this.defaultList = false;
    this._showSelectList(null, items, query);
  },
  needsReverse: function() {
    var scrollY = window.scrollGetY ? scrollGetY() : getScroll()[1],
        contY = getXY(this.container)[1] || 0,
        contH = getSize(this.container)[1] || 22,
        maxListH = this.options.height || 250,
        wh = window.lastWindowHeight || getScroll()[3],
        list_ul = this.resultList && this.resultList.firstChild, listH;
    if (list_ul && list_ul.firstChild) {
      var disp = getStyle(this.resultList, 'display'), vis = getStyle(this.resultList, 'visibility');
      setStyle(this.resultList, {visibility: 'hidden', display: 'block'});
      listH = getSize(this.resultList)[1];
      setStyle(this.resultList, {visibility: vis, display: disp});
    } else {
      listH = this.currenDataItems ? this.currenDataItems.length * getSize(this.container)[1] : maxListH;
    }
    if (listH > maxListH) listH = maxListH;
    return (contY + contH + listH - scrollY > wh && contY - listH - scrollY > 0);
  },
  setSelectContent: function(text, items, query) {
    items = isArray(items) && items.length ? items : [];
    var adding = [];
    this.select.clear();
    if (text) {
      adding.push(['', text, true]);
    }

    if (items.length) {
      for (var i in items) {
        if (typeof items[i] != 'object') items[i] = [items[i], items[i]];
      }
      if (this.options.multiselect) {
        items = this.filterData(items);
      }
      if (this.options.dividingLine == 'smart') {
        removeClass(this.resultList, 'dividing_line');
        for (var i in items) {
          if (typeof(items[i][2]) == 'string' && items[i][2].length) {
            addClass(this.resultList, 'dividing_line');
          }
        }
      }
      var itemsToShow = (this.options.autocomplete && query) ? this.options.maxItemsShown(query.length) : items.length, self = this;
      for (var i = 0; i < items.length; ++i) {
        var it = items[i];
        if (!itemsToShow) break;
        var formatted = self.options.formatResult(it);
        if (query) {
          if ((formatted = self.options.highlight(formatted, query))) {
            --itemsToShow;
          }
        }
        if (!formatted) continue;
        adding.push([it[0], formatted]);
      }
    }
    var rev = this.needsReverse();
    if (rev) adding = adding.reverse();
    toggleClass(this.resultList, 'reverse', rev);
    toggleClass(this.resultListShadow, 'reverse', rev);
    this.select.content(adding);
  },
  _showSelectList: function(text, items, query) {
    this.currenDataItems = items;
    this.currenDataText = text;
    // RTL fix
    if (window.is_rtl) {
      var l = getXY(this.container)[0];
      if (l) geByClass('results_container', this.container)[0].style.left = l + 'px';
    }

    this.setSelectContent(text, items, query);
    if (this.options.multiselect || !this._selectedItems.length) {
      this.select.show();
    } else {
      this.select.show(this._selectedItems[0][0]);
    }
    return true;
  },
  receiveData: function(q, data) {
    if (q != this.curTerm) return;
    if (q != '' && data && data.length && this.hasFocus) {
      this.receivedData = data;
      this.showDataList(data, q);
    } else {
      this.select.hide();
    }
  },
  filterData: function(items) {
    var result = [], self = this;
    each(items, function(i) {
      for (var j in self._selectedItems) {
        if (this[0] == self._selectedItems[j][0])
          return;
      }
      result.push(this);
    });
    return result;
  },
  request: function(success, failure) {
    if (!this.dataURL) return;
    var term = trim(this.input.value.toLowerCase()), self = this;
    if (term.length == 0) return;
    var sep = this.dataURL.indexOf('?') == -1 ? '?' : '&';
    var url = this.dataURL + sep + 'str=' + encodeURI(term);
    var done = function(data) {
      if (self.options.progressBar) {
        hide(self.options.progressBar);
      }
      try {
        data = eval('(' + data + ')');
      } catch (e) {}
      if (data.length) {
        self.cache.setData(term, data);
        if (isFunction(success)) success(term, data);
      } else {
        self.cache.setData(term, []);
        if (isFunction(failure)) failure(term);
      }
    }
    if (vk.al) {
       ajax.plainpost(url, {}, done);
    } else {
      var aj = new Ajax(function(obj, data) {
        done(data);
      });
      aj.post(url);
    }
    if (this.options.progressBar) {
      show(this.options.progressBar);
    }
  },
  doSort: function(data) {
    var i, j, tmp;
    if (!data.length || data.length < 2) return;
    for (i = 0; i < data.length - 1; i++) {
      for (j = i + 1; j < data.length; j++) {
        if (data[i][1] > data[j][1]) {
          tmp = data[i];
          data[i] = data[j];
          data[j] = tmp;
        }
      }
    }
  },
  disable: function(value) {
    if (value && !this.disabled) {
      this.disabled = true;
      addClass(this.container, 'disabled');

      var s = getSize(this.container);
      if (this.options.disabledText) this.input.value = this.options.disabledText;
      this.container.appendChild(
        ce('div', {
          className: 'hide_mask'
        }, {
          position: 'absolute',
          background: '#000',
          opacity: 0,
          width: s[0] + 'px',
          height: s[1] + 'px',
          marginTop: -s[1] + 'px'
        })
      );
      this.input.blur();
      this.input.style.color = '';
      this.select.hide();
      //this.updateInput(); // Is it correct?
    } else if (!value && this.disabled) {
      this.disabled = false;
      if (this.options.autocomplete) this.input.value = '';
      removeClass(this.container, 'disabled');
      this.container.removeChild(geByClass('hide_mask', this.container)[0]);
      //this.updateInput(); // Is it correct?
    }
  },
  _clear: function() {
    this.showImage();

    if (this.options.multiselect) {
      this.selectedTokenId = 0;
      this.selectedItemsContainer.innerHTML = '';
      this.defaultList = false;
    }
    if (!this.options.multiselect && !this.options.autocomplete) {
      if (this._selectedItems[0] != this.options.defaultItems[0]) {
        this._selectItem(this.options.defaultItems[0], false);
      }
    } else {
      removeClass(this.input, 'selected');
      this.resultField.value = '';
      this._selectedItems.splice(0, this._selectedItems.length);
    }

    return false;
  },
  setURL: function(url) {
    if (typeof(url) == 'string') {
      this.dataURL = url;
      if (!this.cache) {
        this.cache = new Cache(this.options);
      } else {
        this.cache.flush();
      }
      if (this.indexer) delete this.indexer;

      this.dataItems = [];
    }
  },
  setData: function(dataArr) {
    if (!isArray(dataArr)) return;
    if (!this.options.autocomplete) {
      this.select.clear();
      this.options.defaultItems = dataArr;
      if (!this.options.multiselect) {
        if (!this._selectedItems.length && this.options.defaultItems.length) {
          this._selectItem(this.options.defaultItems[0], false);
        } else if (this._selectedItems.length) {
          var exists = false;
          for (var i in this.options.defaultItems) {
            var item = this.options.defaultItems[i][0] || this.options.defaultItems[i];
            if (item == this._selectedItems[0][0] || item == this._selectedItems[0][0]) {
              exists = true;
              break
            }
          }
          if (!exists) {
            this._selectItem(this.options.defaultItems[0], false);
          } else {
            this._selectItem(this._selectedItems[0][0], false);
          }
        }
      }
    } else {
      this.dataItems = dataArr;
      this.dataURL = null;
    }
    if (!this.indexer) {
      this.indexer = new Indexer(dataArr);
    } else {
      this.indexer.setData(dataArr);
    }
    if (this.cache) delete this.cache;
  },
  focus: function() {
    if (!this.readOnly) {
      this.input.focus();
    }
  },
  selectItem: function(item) {
    this._selectItem(item, false);
  },
  setOptions: function(new_options) {
    new_options = this.prepareOptionsText(new_options);
    extend(this.options, new_options);
    if ('maxItems' in new_options && this.options.maxItems >= 0) {
      for (var i = this._selectedItems.length - 1; i >= this.options.maxItems; i--) {
        this.removeTagData(this._selectedItems[i][0]);
      }
    }

    if ('defaultItems' in new_options) {
      this.select.clear();
      if (this.select.isVisible(this.container)) { // todo: check and remove arg
        this.showDefaultList();
      }
    }

    if ('enableCustom' in new_options) {
      if (this.options.enableCustom && !this.options.autocomplete) {
        this.options.autocomplete = new_options.autocomplete = true;
      }
    }
    if ('width' in new_options) {
      this.container.style.width = this.options.width + 'px';
      this.resultList.style.width = this.resultListShadow.style.width = this.options.width + 'px';

      this.selectorWidth = this.options.width - this.scrollbarWidth;
    }
    if ('dropdown' in new_options) {
      var dd = geByClass('selector_dropdown', this.container)[0];
      if (!this.options.dropdown && dd) {
        this.destroyDropdown();
        dd.parentNode.removeChild(dd);
      } else if (!dd && this.options.dropdown) {
        dd = this.container.firstChild.rows[0].insertCell(1);
        dd.id = 'dropdown' + this.guid;
        dd.className = 'selector_dropdown';
        dd.innerHTML = '&nbsp;';
        this.dropdownButton = dd;
        this.initDropdown();
        this.initDropdownEvents();
      }
    }
    if (('width' in new_options) || ('autocomplete' in new_options) || ('dropdown' in new_options)) {
      this.updateInput();
    }
    if ('autocomplete' in new_options) {
      if (this.options.autocomplete) {
        removeClass(this.container, 'dropdown_container');
        this.input.readOnly = false;
        this.readOnly = '';
      } else {
        addClass(this.container, 'dropdown_container');
        this.input.readOnly = true;
        this.options.enableCustom = false;
        this.readOnly = 'readonly="true"';
      }
    }
  },
  val: function(value, fireEvent) {
    if (value !== undefined) this._selectItem(value, (fireEvent === undefined) ? false : fireEvent);
    return this.resultField.value;
  },
  val_full: function() {
    if (this.options.multiselect) {
      return this._selectedItems;
    } else {
      if (this._selectedItems.length) {
        return this._selectedItems[0];
      } else {
        return [this.resultField.value, this.input.value];
      }
    }
  },
  customVal: function(value, fireEvent) {
    if (value !== undefined) {
      this.customField.value = value;
      this.selectItem([this.options.valueForCustom, value], (fireEvent === undefined) ? false : fireEvent);
    }
    return this.customField.value;
  },
  selectedItems: function() {
    return this._selectedItems;
  },
  clear: function() {
    this._clear();
    this.updateInput();
  }
});

//
// Select class
//
createChildClass('Select', UiControl, {
  // Static class fields
  common: {
    _sel: window.Select && Select._sel || [],
    reg: function(obj) {
      this._sel.push(obj);
      return this._sel.length;
    },
    destroy: function(uid) {
      this._sel[uid - 1] = false;
    },
    itemMouseMove: function(uid, i, el) {
      this._sel[uid - 1].onMouseMove(i, el);
    },
    itemMouseDown: function(uid, i, el) {
      this._sel[uid - 1].onMouseDown(i, el);
    }
  },

  // Standart fields
  CSS: {
    FIRST: 'first',
    LAST: 'last',
    ACTIVE: 'active',
    SCROLLABLE: 'result_list_scrollable'
  },
  controlName: 'SelectList',

  // Standart methods
  initOptions: function(container, shadow, options) {
    this.options = options || {};
  },
  init: function(container, shadow, options) {
    this.container = container;
    this.shadow = shadow;
    this.active = -1;
    this.data = [];
    this.uid = this.common.reg(this);
    this.maxHeight = this.options.height ? this.options.height : 250;
  },
  initDOM: function() {
    this.list = ce('ul');
    this.container.appendChild(this.list);
  },
  show: function(selectedItem) {
    var wasVisible = isVisible(this.container);
    if (!wasVisible) {
      this.performShow();
    }
    var childNode;
    if (selectedItem) {
      for (var i = 0; i < this.list.childNodes.length; i++) {
        childNode = this.list.childNodes[i];
        if (childNode.getAttribute('val') == selectedItem) {
          this.highlight(i, childNode);
          break;
        }
      }
    } else if (this.options.selectFirst) {
      var reversed = this.container && hasClass(this.container, 'reverse'), ind;
      for (var i = 0; i < this.list.childNodes.length; i++) {
        ind = reversed ? this.list.childNodes.length - 1 - i : i;
        childNode = this.list.childNodes[ind];
        if (!childNode.getAttribute('dis')) {
          this.highlight(ind, childNode);
          break;
        }
      }
    }
    if (!wasVisible && isFunction(this.options.onShow)) this.options.onShow();
  },
  hide: function() {
    if (!isVisible(this.container)) return;
    hide(this.container);
    hide(this.shadow);
    if (isFunction(this.options.onHide)) this.options.onHide();
    this.highlight(-1);
    if (isFunction(this.options.onItemActive)) this.options.onItemActive();
  },

  // Extended methods
  handleKeyEvent: function(e) {
    if (!isVisible(this.container)) {
      return true;
    }
    switch(e.keyCode) {
      case KEY.UP:
        this.movePosition(-1)
        return cancelEvent(e);
        break;

      case KEY.DOWN:
        this.movePosition(1);
        return cancelEvent(e);
        break;

      case KEY.TAB:
        this.hide();
      break;

      case KEY.RETURN:
        if (isFunction(this.options.onItemSelect) && this.active > -1) {
          this.options.onItemSelect(this.selectedItem(), undefined, true);
        }
        cancelEvent(e);
        return false;
        break;

      case KEY.ESC:
        this.hide();
        return false;
        break;

      case KEY.PAGEUP:
      case KEY.PAGEDOWN:
        // deprecated
        return false;
        break;
    }
    return true;
  },
  clear: function() {
    this.highlight(-1);
    this.list.innerHTML = '';
    this.updateContainer();
  },
  destroy: function() {
    this.clear();
    Select.destroy(this.uid);
  },
  selectedItem: function() {
    if (this.active >= 0) {
      var el = this.list.childNodes[this.active];
      var value = el.getAttribute('val') || el.innerHTML;
      return value;
    }
    return undefined;
  },
  movePosition: function(step) {
    var selected = intval(this.active) + intval(step);
    if (selected < 0)
      this.container.scrollTop = 0;
    else if (selected + 1 > this.list.childNodes.length)
      this.container.scrollTop = this.list.offsetTop + this.list.offsetHeight - this.container.offsetHeight;
    while (1) {
      if (selected + 1 > this.list.childNodes.length || selected < 0) {
        if (this.options.cycle) break;
        else return false;
      }
      var s = this.list.childNodes[selected];
      if (s && !s.getAttribute('dis')) {
        break;
      }
      selected++;
    }
    this.highlight(selected, this.list.childNodes[selected]);
    return true;
  },
  highlight: function(i, el) {
    if (this.active != -1) {
      removeClass(this.list.childNodes[this.active], this.CSS.ACTIVE);
    }
    if (!el) {
      this.active = -1;
      return;
    }
    this.active = i;
    addClass(el, this.CSS.ACTIVE);

    if (isFunction(this.options.onItemActive)) {
      this.options.onItemActive(el.getAttribute('val') || el.innerHTML);
    }
    if (el.offsetTop + el.offsetHeight + this.list.offsetTop > this.container.offsetHeight + this.container.scrollTop - 1) {
      this.container.scrollTop = el.offsetTop + this.list.offsetTop + el.offsetHeight - this.container.offsetHeight + 1;
    } else if (el.offsetTop + this.list.offsetTop < this.container.scrollTop) {
      this.container.scrollTop = el.offsetTop + this.list.offsetTop;
    }
  },
  onMouseMove: function(i, el) {
    if (hasClass(el, 'active')) return false;
    this.highlight(i, el);
    return true;
  },
  onMouseDown: function(i, el) {
    var val = el.getAttribute('val') || el.innerHTML;
    if (isFunction(this.options.onItemSelect)) {
      this.options.onItemSelect(val, undefined, true);
    }
    this.hide();
  },
  updateContainer: function() {
    if (this.maxHeight < this.list.offsetHeight) {
      this.container.style.height = this.maxHeight + 'px';
      show(this.shadow);
      this.shadow.style.marginTop = (this.maxHeight + 1) + 'px'; // +1 - because of border-bottom
      addClass(this.container, this.CSS.SCROLLABLE);
    } else {
      removeClass(this.container, this.CSS.SCROLLABLE);
      this.container.style.height = 'auto';
      var shadow_height = intval(this.list.offsetHeight) + intval(this.list.offsetTop);
      if (shadow_height) {
        show(this.shadow);
        this.shadow.style.marginTop = shadow_height + 'px';
      } else {
        hide(this.shadow);
      }
    }
  },
  content: function(items) {
    var html = [];
    for (var i = 0; i < items.length; ++i) {
      // value, text, disabled, attributes, index
      var it = items[i], v = it[0], t = it[1], d = it[2], a = [], ind = this.uid + ', ' + i;

      v = (v === undefined) ? '' : v.toString();
      t = ((t === undefined) ? '' : t.toString()) || v;

      a.push(d ? 'dis="1"' : 'onmousemove="Select.itemMouseMove(' + ind + ', this)" onmousedown="Select.itemMouseDown(' + ind + ', this)"');
      a.push('val="' + v.replace(/&/g, '&amp;').replace(/"/g, '&quot;') + '"');
      a.push('class="' + (d ? 'disabled ' : '') + ((i == items.length - 1) ? (this.CSS.LAST + ' '): '') + (i ? '' : this.CSS.FIRST) + '"');

      html.push('<li ' + a.join(' ') + '>' + t + '</li>');
    }
    this.list.innerHTML = html.join('');
    this.updateContainer();
    return true;
  },
  removeItem: function(value) {
    var undefined, l = this.list.childNodes, len = l.length;
    if (value === undefined) return;
    for (var i = 0; i < len; ++i) {
      var node = l[i];
      if (node.getAttribute('val') != value && node.innerHTML != value) continue;
      node.setAttribute('dis', '1');
      hide(node);
      break;
    }
    for (var i = 0; i < len; ++i) {
      if (isVisible(l[i])) {
        addClass(l[i], this.CSS.FIRST);
        break;
      }
    }
    for (var i = len; i > 0; --i) {
      if (isVisible(l[i - 1])) {
        addClass(l[i - 1], this.CSS.LAST);
        break;
      }
    }
    this.updateContainer();
  },
  // AntanubiS - if list.offsetHeight is greater, than screen without scrollbar - bugs.
  performShow: function() {
    this.list.style.position = 'absolute';
    this.list.style.visibility = 'hidden';
    show(this.container);// We see bug in MessageBox with Selector between theese lines.
    show(this.shadow);
    this.updateContainer();
    this.list.style.position = 'relative';
    this.list.style.visibility = 'visible';
  },
  // Shortcuts
  isVisible: function() {
    return isVisible(this.container);
  },
  hasItems: function() {
    return this.list.childNodes.length > 0;
  },
  toggle: function() {
    if (this.isVisible(this.container)) {
      this.hide();
    } else {
      this.show();
    }
  }
});

//
// Checkbox class
//
createChildClass('Checkbox', UiControl, {
  // Standart fields
  CSS: {
    STANDART: 'checkbox_'
  },
  defaultOptions: {
    checkedValue: 1,
    notCheckedValue: '',
    width: 300,
    label: 'checkbox'
  },
  beforeInit: function() {
    this.guid = _ui.reg(this);
  },
  controlName: 'CheckBox',

  initOptions: function(input, options) {
    if (!input) return false;
    this.options = extend({}, this.defaultOptions, {
      checked: input['value'],
      resultField: input.name || input.id || 'checkbox'
    }, options);
    this.options.checked = intval(this.options.checked) ? true : false;
    this.options.width = intval(this.options.width) > 0 ? intval(this.options.width) : this.defaultOptions.width;
  },
  init: function() {
    this.disabled = false;
  },
  initDOM: function(input, options) {
    this.container = ce('div', {
      id: 'container' + this.guid,
      className: 'checkbox_container',
      innerHTML: '<table cellpadding=0 cellspacing=0><tr><td class="checkbox"><div class="checkbox_off"></div></td><td class="checkbox_label">' + this.options.label + '<input type="hidden" name="' + this.options.resultField + '" id="' + this.options.resultField + '" value="'+ (this.options.checked ? this.options.checkedValue : this.options.notCheckedValue) + '"></td></tr></table>'
    }, {
      width: this.options.width + 'px'
    });
    input.parentNode.replaceChild(this.container, input);

    this.checkbox = geByClass('checkbox_off', this.container)[0];

    this.resultField = ge(this.options.resultField);
  },
  initEvents: function() {
    addEvent(this.container, 'click mouseover mouseout', this.handleMouseEvent, false, {'self': this});
  },
  afterInit: function() {
    this.setState(this.options.checked, false, true);
  },
  destroy: function() {
    if (!vk.al || this.destroyed) return;
    removeEvent(this.container, 'click mouseover mouseout', this.handleMouseEvent);
    this.destroyed = true;
  },

  show: function() {show(this.container);},
  hide: function() {hide(this.container);},

  // extended methods
  handleMouseEvent: function(e) {
    if (e.type == 'click') {
      if (!e.data.self.disabled) {
        e.data.self.setState(!e.data.self.options.checked);
      }
    } else {
      e.data.self.is_over = (e.type == 'mouseover');
      e.data.self.updateClass();
    }
  },
  disable: function(value) {
    if (value && !this.disabled) {
      this.disabled = true;
      addClass(this.container, 'disabled');
    } else if (!value && this.disabled) {
      this.disabled = false;
      removeClass(this.container, 'disabled');
    }
  },
  updateClass: function() {
    this.checkbox.className = 'checkbox_' + (this.options.checked ? 'on' : 'off') + (this.is_over ? '_over' : '');
  },
  setState: function(checked, fireEvent, forceUpdate) {
    if (fireEvent === undefined) fireEvent = true;
    if (forceUpdate === undefined) forceUpdate = false;

    checked = checked ? true : false;
    if (this.options.checked == checked && !forceUpdate) {
      return;
    }
    this.options.checked = checked;
    this.updateClass();
    this.resultField.value = this.options.checked ? this.options.checkedValue : this.options.notCheckedValue;
    if (fireEvent && isFunction(this.options.onChange)) {
      this.options.onChange(this.resultField.value);
    }
  },
  // shortcuts
  setOptions: function(new_options) {
    extend(this.options, new_options);
    if (('checked' in new_options) || ('checkedValue' in new_options) || ('notCheckedValue' in new_options)) {
      this.setState(this.options.checked, false, true);
    }
  },
  checked: function(value) {
    if (value !== undefined) this.setState(value);
    return this.options.checked;
  },
  val: function() {
    return this.resultField.value;
  }
});

//
// Radiobutton class
//
createChildClass('Radiobutton', UiControl, {
  // Static class fields
  common: {
    _radio_buttons: {},
    _callbacks: {},
    // static methods
    deselect: function(name) {
      for (var i = 0; i < this._radio_buttons[name].length; ++i) {
        this._radio_buttons[name][i].checked(false);
      }
    },
    select: function(name, value) {
      for (var i = 0; i < this._radio_buttons[name].length; ++i) {
        if (this._radio_buttons[name][i].val() == value) {
          this._radio_buttons[name][i].checked(true);
          return;
        }
      }
    },
    setChangeEvent: function(name, callback) {
      if (isFunction(callback)) this._callbacks[name] = callback;
      else delete(this._callbacks[name]);
    }
  },

  // Standart object fields
  CSS: {
    STANDART: 'radiobutton_',
    CONTAINER: 'radiobtn_container'
  },
  defaultOptions: {
    checked: false,
    width: 300,
    label: 'radiobutton'
  },
  controlName: 'Radiobutton',

  beforeInit: function() {
    this.guid = _ui.reg(this);
  },
  initOptions: function(input, options) {
    if (!input) return false;
    this.options = extend({}, this.defaultOptions, {
      value: input.value,
      resultField: input.name || 'radiobutton'
    }, options);
    this.options.checked = intval(this.options.checked) ? true : false;
    this.options.width = intval(this.options.width) > 0 ? intval(this.options.width) : this.defaultOptions.width;
  },
  init: function() {
    this.disabled = false;
    this.is_over = false;
    this.inputName = this.options.resultField;
  },
  initDOM: function(input, options) {
    this.container = ce('div', {
      id: 'container' + this.guid,
      className: this.CSS.CONTAINER,
      innerHTML: '<table cellpadding=0 cellspacing=0><tr><td class="radiobtn"><div class="radiobtn_off"><div></div></div></td><td class="radiobtn_label">' + this.options.label + '<input type="radio" id="' + input.id + '" name="' + this.options.resultField + '" value="'+ (this.options.checked ? 'checked="true"' : '') + '"></td></tr></table>'
    }, {
      width: this.options.width + 'px'
    });
    input.parentNode.replaceChild(this.container, input);

    this.radiobutton = geByClass('radiobtn_off', this.container)[0];
    this.resultField = this.container.getElementsByTagName('input')[0];
    this.resultField.value = this.options.value;
  },
  initEvents: function() {
    addEvent(this.container, 'click mouseover mouseout', this.handleMouseEvent, false, {'self': this});
  },
  afterInit: function() {
    if (!isArray(this.common._radio_buttons[this.inputName])) {
      this.common._radio_buttons[this.inputName] = [];
    }
    this.common._radio_buttons[this.inputName].push(this);
    this.setState(this.options.checked, false, true);
  },
  destroy: function() {
    if (!vk.al || this.destroyed) return;
    for (var i = 0; i < this.common._radio_buttons[this.inputName].length; ++i) {
      if (this.common._radio_buttons[this.inputName][i] === this) {
        this.common._radio_buttons[this.inputName].splice(i, 1);
        break;
      }
    }
    if (!this.common._radio_buttons[this.inputName].length) {
      delete this.common._radio_buttons[this.inputName];
      this.common.setChangeEvent(this.inputName);
    }
    removeEvent(this.container, 'click mouseover mouseout', this.handleMouseEvent);
    this.destroyed = true;
  },

  handleMouseEvent: function(e) {
    var t = e.data.self;

    if (e.type == 'click') {
      if (!t.disabled && !t.options.checked) {
        t.setState(true);
      }
    } else {
      t.is_over = (e.type == 'mouseover');
      t.updateClass();
    }
  },
  disable: function(value) {
    if (value && !this.disabled) {
      this.disabled = true;
      addClass(this.container, 'disabled');
    } else if (!value && this.disabled) {
      this.disabled = false;
      removeClass(this.container, 'disabled');
    }
  },
  updateClass: function() {
    this.radiobutton.className = 'radiobtn_' + (this.options.checked ? 'on' : 'off') + (this.is_over ? '_over' : '');
  },
  setState: function(checked, fireEvent, forceUpdate) {
    if (fireEvent === undefined) fireEvent = true;
    forceUpdate = forceUpdate || false;
    checked = checked ? true : false;

    if (this.options.checked == checked && !forceUpdate)
      return;
    if (checked)
      this.common.deselect(this.inputName);
    this.options.checked = checked;
    this.updateClass();
    this.resultField.checked = checked;
    if (fireEvent) {
      if (this.options.checked && isFunction(this.options.onSelect))
        this.options.onSelect(this.resultField.value);

      if (isFunction(this.options.onChange))
        this.options.onChange(this.resultField.value, checked);

      if (checked) {
        if (isFunction(this.common._callbacks[this.inputName])) this.common._callbacks[this.inputName](this.resultField.value);
      }
    }
  },
  // shortcuts
  setOptions: function(new_options) {
    extend(this.options, new_options);
    if (('checked' in new_options)) {
      this.setState(this.options.checked, false);
    }
  },
  checked: function(value) {
    if (value !== undefined) this.setState(value);
    return this.options.checked;
  },
  val: function() {
    return this.resultField.value;
  }
});

// Multiple radiobutton initialization
function Radiobuttons(input, buttons, options) {
  var id = input.id;
  Radiobutton._radio_buttons[id] = [];
  Radiobutton._callbacks[id] = [];
  each(buttons, function(i, v) {
    new Radiobutton(ge(id + v[0]), {label: v[1], width: options.width, resultField:id});
  });
  Radiobutton.select(id, options.selected !== undefined ? options.selected : input.value);
  Radiobutton.setChangeEvent(id, function(value) {
    input.value = value;
    if(isFunction(options.onChange)) {
      options.onChange(value);
    }
  });
}

//
// Autosize class
//
createChildClass('Autosize', UiControl, {
  // Static class fields
  common: {
    _autosize_helpers: null
  },

  // Standart object fields
  CSS: {
  },
  defaultOptions: {
    height: 0,
    minHeight: 0,
    padding: 0,
    helperTA: false // new type of autosize, untested
  },
  controlName: 'Autosize',

  // Standart object methods
  beforeInit: function() {
    this.guid = _ui.reg(this);
    if (!this.common._autosize_helpers || !ge('autosize_helpers')) {
      document.body.appendChild(
        (this.common._autosize_helpers = ce('div', {'id': 'autosize_helpers'}, {
          'position': 'absolute',
          'left': '-10000px',
          'top': '-10000px'
        }))
      );
    }
  },
  initOptions: function(textarea, options) {
    this.options = extend({}, this.defaultOptions, options);
    this.options.checked = intval(this.options.checked) ? true : false;
    this.options.width = intval(this.options.width) > 0 ? intval(this.options.width) : this.defaultOptions.width;
  },
  init: function(input) {
    this.input = input;
    this.oldValue = '';
    this.oldHeight = 0;
    this.overflowAuto = false;
  },
  initDOM: function(input) {
    this.minHeight = intval(this.options.minHeight) || intval(getStyle(input, 'height'));
    this.maxHeight = intval(this.options.height);
    this.fontSize = intval(getStyle(input, 'fontSize'));
    var w = intval(getStyle(input, 'width'));
    // fix for hidden textareas
    if (w < 1) {
      w = intval(getStyle(input, 'width', false));
    }
    if (this.defaultOptions.padding) w -= this.defaultOptions.padding * 2;

    this.common._autosize_helpers.appendChild(
      this.helper = ce(this.options.helperTA ? 'textarea' : 'div', false, {
        wordWrap: 'break-word',
        width: (w < 0 ? 0 : w) + 'px',
        fontFamily: getStyle(input, 'fontFamily'),
        fontSize: this.fontSize + 'px',
        lineHeight: getStyle(input, 'lineHeight')
      })
    );
    this.input.helper = this.helper;
    setStyle(this.input, 'overflow', 'hidden');
  },
  initEvents: function() {
    addEvent(this.input, 'keydown keypress keyup', this.updateSize, false, {'self': this});
  },
  afterInit: function() {
    this.update();
  },

  // Extended methods
  updateSize: function(event) {
    var self = event.data.self, value = self.input.value, newHeight;
    if (event.type != 'keyup') {
      if (event.keyCode == 13 && !event.ctrlKey && !event.altKey) {
        value += '\n';
      }
    }
    if (value == self.oldValue) {
      return;
    }
    self.oldValue = value;
    if (self.options.helperTA) {
      self.helper.value = value;
      newHeight = self.helper.scrollHeight + self.fontSize + 4;
    } else {
      self.helper.innerHTML = trim(replaceChars(value)).replace(/<br>$/, '<br>&nbsp;');
      newHeight = getSize(self.helper, true)[1] + self.fontSize + 4;
    }
    newHeight = Math.max(newHeight, self.minHeight);

    if (self.maxHeight > 0 && newHeight > self.maxHeight) {
      newHeight = self.maxHeight;
      if (!self.overflowAuto) {
        if (browser.mozilla) var cr = self.input.selectionStart;
        self.overflowAuto = true;
        setStyle(self.input, {
          'overflow': 'auto',
          'overflowX': 'hidden'
        });
        if (browser.mozilla) self.input.setSelectionRange(cr, cr);
        self.oldHeight = newHeight;
      }
    } else {
      if (self.overflowAuto) {
        self.overflowAuto = false;
        if (browser.mozilla) var cr = self.input.selectionStart;
        self.input.style.overflow = 'hidden';
        if (browser.mozilla) self.input.setSelectionRange(cr, cr);
      }
    }
    if (self.options.preventEnter && event.keyCode == 13 && !event.shiftKey) {
      return;
    }
    if (self.oldHeight != newHeight) {
      self.input.style.height = (self.oldHeight = newHeight) + 'px';
      if (self.options.onResize) self.options.onResize(newHeight);
    }
  },
  // Shortcuts
  update: function() {
    this.updateSize({data: {self: this}});
  }
});

//
// Dropdown Menu class
//
createChildClass('DropdownMenu', UiControl, {
  // Static class fields
  common: {
    pageContainer: null
  },
  defaultOptions: {
    title: 'Menu',
    hideOnClick: true,
    showHover: true,
    updateTarget: true,
    alwaysMenuToUp: false,

    offsetLeft: -7,
    offsetTop: -4,
    onSelect: function(){},
    updateHeader: function(i,t){return t;}
  },
  controlName: 'DropdownMenu',

  // Standart object methods
  beforeInit: function() {
    this.guid = _ui.reg(this);
    if (!this.common.pageContainer) {
      this.common.pageContainer = document.body;
      if (browser.msie6 && ge('pageContainer')) {
        this.pageContainer = ge('pageContainer');
      }
    }
  },
  initOptions: function(items, options) {
    if (!options.title && options.target) options.title = options.target.innerHTML;
    this.options = extend({}, this.defaultOptions, options);
  },
  init: function(input, options) {
    this.visible = false;
    this.offsetTop = 0;
    this.mouseTimer = 0;
    this.childMenus = [];
    this.childIsOver = false;
    if (options.parentMenu) {
      this.parentMenu = options.parentMenu;
      this.parentMenu.childMenus.push(this);
    }
    this.isOver = false;
    this.value = options.value || 0;
    this.items = {};
  },
  initDOM: function(input, options) {
    this.container = ce('div', {
      className: 'dd_menu' + (options.containerClass ? ' '+options.containerClass : ''),
      id: 'dd_menu' + this.guid
    });

    this.header = ce('div', {
      className: 'dd_menu_header',
      innerHTML: '<div>' + this.options.title.replace(/\s+/g, '&nbsp;') + '</div>'
    });

    this.body = ce('div', {
      className: 'dd_menu_body',
      innerHTML: '<table cellspacing="0" cellpadding="0"><tbody><tr><td class="dd_menu_shad_l"><div></div></td><td><div class="dd_menu_shad_t2"></div><div class="dd_menu_shad_t"></div><div id="dd_rows_'+this.guid+'" class="dd_menu_rows"></div><div class="dd_menu_shad_b"></div><div class="dd_menu_shad_b2"></div></td><td class="dd_menu_shad_r"><div> </div></td></tr></tbody></table>'
    });

    this.container.appendChild(this.header);
    this.container.appendChild(this.body);
    hide(this.header);
    hide(this.body);

    // Container for menu items
    this.rows = ce('div', {'id': 'rows' + this.guid});
  },
  initEvents: function() {
    addEvent(this.container, 'mouseover mouseout', this.handleMouseEvent, false, {'self': this});
  },
  afterInit: function(items, options) {
    this.setData(items);
    var self = this;
    onDomReady(function() {
      (self.common.pageContainer || window.pageNode).appendChild(self.container);
      var header = self.header, body = self.body, target = self.options.target;
      ge('dd_rows_'+ self.guid).appendChild(self.rows);
      self.setOptions(self.options);
      if (target) {
        if (target.innerHTML.indexOf('<') == -1) {
          target.innerHTML = target.innerHTML.replace(/\s+/g, '&nbsp;');
        }
        target.onclick = function() {self.show();return false;};
        if (target.tagName == 'A') {
          target.className += ' dd_menu_target';
        }
      }
      if (self.options.target && self.options.showHover) {
        var timer;
        var outFunc = function() {
          if (self.parentMenu) { self.parentMenu.childIsOver = false; }
          if (!self.visible) hide(header);
          removeClass(header, 'dd_header_hover');
        }
        self.showTargetHover = function() {
          if (self.parentMenu) { self.parentMenu.childIsOver = true; }
          addClass(header, 'dd_header_hover');
          self.moveToTarget();
          show(header);
          timer = setTimeout(outFunc, 100);
        };
        addEvent(self.options.target, 'mouseover', self.showTargetHover);
        addEvent(header, 'mouseover', function() {
          if (self.parentMenu) { self.parentMenu.childIsOver = true; }
          clearTimeout(timer);
        });
        addEvent(header, 'mouseout', outFunc);
      }
    });
  },

  moveTo: function(left, top) {
    extend(this.container.style, {top: intval(top)+'px', left: intval(left) + 'px'});
    setStyle(this.rows, 'width', 'auto');
    var h_w = getSize(this.header)[0];
    var b_w = getSize(this.body)[0];
    if(h_w > b_w){
      setStyle(this.rows, 'width', h_w - 2);
    }
  },
  moveToTarget: function() {
    var tc = getXY(this.options.target);
    if (/mac/.test(_ua) && browser.mozilla) {
      tc[1] += 1; // offset fix
    }
    this.moveTo(tc[0] + this.options.offsetLeft, tc[1] + this.options.offsetTop);
  },
  alignBody: function() {
    this.body.style.marginLeft = (getSize(this.header)[0] - getSize(this.body)[0] + 1) + 'px';
  },
  setData: function(items) {
    this.rows.innerHTML = '';
    if (isArray(items) && items.length) {
      for (var i=0; i<items.length; i++) {
        this.addItem(items[i]);
      }
    }
    if (this.visible && this.menuToUp()){
      var bh = getSize(this.body)[1];
      this.body.style.top = -bh+3+'px';
      addClass(this.container, 'dd_up');
    }
  },
  addItem: function(item) {
    if (!item) return false;
    var link = ce('a');
    if(isArray(item))item = {i: item[0], l: item[1], onClick: item[2], c: item[3], s: item[4], b: item[5], h: item[6], el: link};
    if(item.onClick && !isFunction(item.onClick)){
      var funcs = item.onClick;
      item.onClick = funcs.onClick;
      item.onMouseOver = funcs.onMouseOver;
      item.onMouseOut = funcs.onMouseOut;
    }
    link.innerHTML = (this.options.checkable ? '<img src="/images/dropdead_check.gif">' : '') + item.l;
    if (item.i) link['index'] = item.i;
    if (item.c) link.className = item.c;
    if (item.s) extend(link.style, item.s);
    if (item.b) extend(link.style, {backgroundImage: 'url(\'' + item.b + '\')', paddingLeft: '27px' });
    if (item.h) link.href = item.h;
    var self = this;

    addEvent(link, 'click', function(e) {
      self.value = e.data.item.i;
      var hide = true;
      if (isFunction(item.onClick) && item.onClick(e) === false)
        hide = false;
      if (self.options.onSelect(e) === false)
        hide = false;
      if (item.h) {
        return true; //toUrl(item.h, e);
      }
      if (hide) self.hide();
      else cancelEvent(e);
      if(self.options.updateTarget && hide) {
        var text = self.options.updateHeader(e.target.index, e.target.innerHTML);
        self.header.innerHTML = '<div>'+text+'</div>';
        if (self.options.target) {
          self.options.target.innerHTML = text.replace(/\s+/g, '&nbsp;');
        }
      }
    }, false, {item: item});
    if (isFunction(item.onMouseOver)) {addEvent(link, 'mouseover', item.onMouseOver);}
    if (isFunction(item.onMouseOut)) {addEvent(link, 'mouseout', item.onMouseOut);}
    if (browser.msie) {
      link.onmouseover = function(){addClass(link, 'dd_a_hover');};
      link.onmouseout = function(){removeClass(link, 'dd_a_hover');};
    }

    this.items[item.i] = link;
    this.rows.appendChild(link);
    if (this.options.align == 'left') this.alignBody();
  },
  getRows: function() {
    return this.rows;
  },
  setOptions: function(options) {
    var self = this;
    extend(this.options, options);
    // apply options

    if (options.title)
      this.header.innerHTML = '<div>'+this.options.title+'</div>';
    if (typeof options.hideOnClick != 'undefined')
      this.header.onclick = options.hideOnClick ? this.toggle.bind(this) : this.show.bind(this);
    if (this.options.align == 'left') this.alignBody();
  },
  onHide: function(fade) {
    this.visible = false;
    if (fade || !this.options.showHover) hide(this.header);
    else addClass(this.header, 'dd_header_hover');
    hide(this.body);
    if (this.options.onHide) this.options.onHide();
  },

  toggle: function() {
    this.visible ? this.hide(false) : this.show();
  },
  show: function() {
    if (this.visible) return;
    if (this.options.target && !this.options.showHover) this.moveToTarget();

    clearTimeout(this.mouseTimer);
    show(this.header);
    show(this.body);
    if (this.options.showHover) removeClass(this.header, 'dd_header_hover');

    this.visible = true;

    // Set menu coordinates
    if (this.menuToUp()) {
      var bh = getSize(this.body)[1];
      this.body.style.top = -bh+3+'px';
      addClass(this.container, 'dd_up');
    } else {
      var hh = getSize(this.header)[1];
      this.body.style.top = hh-1+'px';
      removeClass(this.container, 'dd_up');
    }

    if (this.options.onShow) {
      this.options.onShow();
    }
    _ui.sel(this.guid);
  },
  menuToUp: function() {
    if (this.options.alwaysMenuToUp) {
      return true;
    }
    var h = window.innerHeight,
    bh = getSize(this.body)[1],
    hh = getSize(this.header)[1],
    ht = getXY(this.header)[1];

    if (!h && document.documentElement) {
      h = document.documentElement.clientHeight;
    }
    var pt = this.common.pageContainer.scrollTop;
    if (!pt && !browser.msie6) pt = document.getElementsByTagName('html')[0].scrollTop;
    if (ht - pt > bh) {
      return (hh + ht + bh > h + pt);
    }
    return false;
  },
  hide: function(fade) {
    if (!this.visible) return;
    // return;
    var self = this;
    if (self.childIsOver) {
      self.mouseTimer = setTimeout(self.hide.bind(self), 400);
      return;
    }
    each(self.childMenus, function () {
      this.hide();
    });
    var fadeSpeed = (this.options.fadeSpeed !== undefined) ? this.options.fadeSpeed : 100;
    (fade === false) ? this.onHide(false) : fadeOut(this.container, fadeSpeed, function(){
      show(self.container);
      self.onHide.call(self, true);
      _ui.sel(false);
      //if (self.options.onHide) self.options.onHide();
    });
    if (self.parentMenu) {
      self.parentMenu.childIsOver = false;
    }
  },
  val: function () {
    return this.value;
  },
  destroy: function() {
    if (!vk.al || this.destroyed) return;
    removeEvent(this.options.target, 'mouseover', this.showTargetHover);
    cleanElems(this.container, this.header);
    for (var el = this.rows.firstChild; el; el = el.nextSibling) {
      cleanElems(el);
    }
    this.destroyed = true;
  },
  handleMouseEvent: function(e) {
    var self = e.data.self;
    self.isOver = (e.type == 'mouseover');
    if (self.parentMenu) { self.parentMenu.childIsOver = self.isOver; }
    clearTimeout(self.mouseTimer);
    if (e.type == 'mouseout') {
      self.mouseTimer = setTimeout(self.hide.bind(self), 400);
    }
  },
  onEvent: function (e) {
    var outside = true, t = e.target;
    while (t && t != t.parentNode) {
      if (t == this.container) {
        outside = false;
        break;
      }
      t = t.parentNode;
    }
    if (outside) {
      this.hide();
    }
  }
});

//
// UiControl abstract class
//
function UiUtil(args) {
  return this.__construct__(args);
}

extend(UiUtil.prototype, {
  // Constants
  defaultOptions: null,

  // List of all storages, to delete on page reload
  __components: {},
  __cid: 0,

  // Main storage for current component
  storage: null,

  // Consructor
  __construct__: function(args) {
    if (this.beforeInit) this.beforeInit.apply(this, args);
    if (this.initOptions) this.initOptions.apply(this, args);
    this.init.apply(this, args);
    if (this.initEvents) this.initEvents.apply(this, args);
    if (this.afterInit) this.afterInit.apply(this, args);
    this.__components[(this.componentName ? this.componentName : this.__className) + (this.__cid++)] = this;
    return this;
  },

  // Standart abstract methods

  // Component initialisation

  // User defined callback
  beforeInit: null,
  // Init options field
  initOptions: null,
  // init and initEvents are required
  init: null,
  // Attach events listeners to elements
  initEvents: null,
  // User defined callback
  afterInit: null
});

//
// Cache Menu class
//
createChildClass('Cache', UiUtil, {
  defaultOptions: {
    cacheLength: 100
  },
  componentName: 'Cache',

  initOptions: function(options) {
    this.options = extend({}, this.defaultOptions, options);
  },
  init: function() {
    this.storage = {};
    this.length = 0;
  },

  setData: function(key, value) {
    if (this.length > this.options.cacheLength) {
      this.flush();
    }
    if (!(key in this.storage)){
      this.length++;
    }
    this.storage[key] = clone(value);
  },
  getData: function(key) {
    if (!this.options.cacheLength || !this.length || !(key in this.storage)) {
      return null;
    }
    return this.storage[key];
  },
  flush: function() {
    delete this.storage;
    this.storage = {};
    this.length = 0;
  }
});

//
// Indexer class
//
createChildClass('Indexer', UiUtil, {
  defaultOptions: {
    chars: 2,
    delimeter: /[\s\(\)\.,\-]+/
  },

  componentName: 'Indexer',

  initOptions: function(data, options) {
    this.options = extend({}, this.defaultOptions, {indexkeys: [1]}, options);
  },
  init: function(data) {
    this.setData(data);
  },

  setData: function(data) {
    delete this.storage;
    this.storage = {
      data: clone(data),
      index: {}
    };
    clearTimeout(this.indexTimer);
    this.indexTimer = setTimeout(this.createIndex.bind(this), 10);
  },
  createIndex: function() {
    if (!this.storage.data.length) return;
    this.storage.index = {};
    debug('createIndex start, ' + this.storage.data.length + ' items');
    each(this.storage.data, this.indexItem.bind(this));
    debug('createIndex ended');
  },
  indexItem: function(k, v) {
    var i, j, current_words = '', index_key, already_indexed = {};
    for (i = 0; i < this.options.indexkeys.length; i++) {
      if (!v[this.options.indexkeys[i]]) continue;
      current_words += ' ' + v[this.options.indexkeys[i]].replace(this.options.delimeter, ' ').replace(/<[^>]*>/, '');
    }
    current_words = trim(current_words.toLowerCase()).split(/\s+/);
    for (i = 0; i < current_words.length; i++) {
      for (j = 1; j <= this.options.chars; j++) {
        index_key = current_words[i].substr(0, j);
        if (already_indexed[index_key]) {
          continue;
        }
        already_indexed[index_key] = 1;
        if (this.storage.index[index_key] === undefined) this.storage.index[index_key] = [];
        this.storage.index[index_key].push(k);
      }
    }
  },
  search: function(pattern) {
    debug('search start, index width: ' + this.options.chars + ', data size: ' + this.storage.data.length);
    pattern = trim(pattern.toLowerCase().replace(this.options.delimeter, ' '));
    debug('pattern: '+pattern+', length: ' + pattern.length);
    var self = this;
    if (!pattern) {
      debug('empty pattern, return whole list');
      return self.storage.data;
    }
    if (pattern.length <= this.options.chars && pattern.indexOf(' ') == -1) {
      debug('found whole pattern indexed');
      var retArr = [];
      each ((this.storage.index[pattern] || []), function() {
        retArr.push(self.storage.data[this]);
      });
      return retArr;
    }

    pattern = pattern.split(' ');
    var min_size = 0, min_pattern = '', self = this;
    each (pattern, function() {
      var items = self.storage.index[this.substr(0, self.options.chars)];
      if (!min_pattern || !items || items.length < min_size) {
        min_size = items ? items.length : 0;
        min_pattern = this.substr(0, self.options.chars);
      }
      return !min_size;
    });
    var ret_arr = [];
    debug('index returned: ' + min_size + ' items');
    if (!min_size) return ret_arr;
    debug('starting manual filter');

    each (self.storage.index[min_pattern.substr(0, self.options.chars)], function(k, v) {
      var item = self.storage.data[v];
      var i, fail = false, current_words = '', index_key;
      for (i = 0; i < self.options.indexkeys.length; i++) {
        current_words += ' ' + item[self.options.indexkeys[i]].replace(self.options.delimeter, ' ').replace('<b>', '').replace('</b>', '');
      }
      current_words = current_words.toLowerCase();
      for (i = 0; i < pattern.length; i++) {
        if (current_words.indexOf(' ' + pattern[i]) == -1) {
          fail = true;
          break;
        }
      }
      if (fail) return;
      ret_arr.push(item);
    });
    debug('manual filter ended, found ' + ret_arr.length + ' items');
    return ret_arr;
  },
  flush: function() {
    delete this.storage;
  }
});

var curInlineEdit = false;
if (!window.inlineOnEvent) {
  window.inlineOnEvent = function(e) {
    if (!curInlineEdit) return;
    if (e.type == 'mousedown') {
      var outside = true, t = e.target;
      while (t && t != t.parentNode) {
        if (t == curInlineEdit.container) {
          outside = false;
          break;
        }
        t = t.parentNode;
      }
      if (!outside || !isVisible(curInlineEdit.container)) return;
      curInlineEdit.hide();
    }
    if (e.type == 'keydown') {
      if (!isVisible(curInlineEdit.container)) return;
      if (e.keyCode == KEY.ESC) curInlineEdit.hide();
      if (e.keyCode == KEY.RETURN) {
        if (!curInlineEdit.options.onConfirm || curInlineEdit.options.onConfirm.apply(curInlineEdit) !== false) curInlineEdit.hide();
      }
    }
  }
  addEvent(document, 'mousedown keydown', inlineOnEvent);
}

//
// InlineEdit class
//
createChildClass('InlineEdit', UiControl, {
  // Static class fields
  common: {
    pageContainer: null
  },
  defaultOptions: {
    offsetLeft: -20 + (browser.msie7 ? 2 : (browser.opera || browser.msie ? 3 : (browser.safari || browser.chrome ? 0 : (browser.mozilla ? 2 : 0)))),
    offsetTop: -20 + (browser.msie7 ? 2 : (browser.opera || browser.msie ? 3 : (browser.safari || browser.chrome ? 1 : (browser.mozilla ? 3 : 0)))),
    top: 0,
    left: 0,
    width: 'auto',
    flex: false,

    mainTableHTML:
  '<tbody><tr><td class="inlFrame00"></td><td class="inlFrame01"><div></div></td><td class="inlFrame02"></td></tr>\
   <tr><td class="inlFrame10"></td><td class="inlContent">{content_table}</td><td class="inlFrame12"></td></tr>\
   <tr><td class="inlFrame20"></td><td class="inlFrame21"><div></div></td><td class="inlFrame22"></td></tr></tbody>',

    contentTableHTML:
  '<tbody>{content}\
   <tr>\
    <td class="inlButtonOk"><div class="button_yes"><div>{yeslabel}</div></div></td>\
    <td class="inlButtonCancel"><div class="button_no"><div>{nolabel}</div></div></td>\
   </tr></tbody>',
    contentHTML: '<tr><td><input class="inlInput text" type="text" /></td></tr>',

    confirmLabel: getLang('box_save'),
    cancelLabel: getLang('Cancel'),

    onBeforeShow: null,
    onShow: null,
    onHide: null,
    onConfirm: null,
    onCancel: null
  },
  controlName: 'InlineEdit',

  // Standart object methods
  beforeInit: function() {
    if (!this.common.pageContainer) {
      this.common.pageContainer = document.body;
      if (browser.msie6 && ge('pageContainer')) {
        this.pageContainer = ge('pageContainer');
      }
    }
    this.guid = _ui.reg(this);
  },
  initOptions: function(target, options) {
    if (!target) return false;
    this.options = extend({}, this.defaultOptions, options);
  },
  init: function(target) {
    this.target = target;
  },
  initDOM: function(target, options) {
    this.container =  ce('div', {
      className: 'inlContainer',
      id: 'container' + this.guid,
      innerHTML: '<table class="inlMainTable">' + this.options.mainTableHTML.replace('{content_table}', '<table class="inlContentTable">' + this.options.contentTableHTML.replace('{content}', this.options.contentHTML).replace('{nolabel}', this.options.cancelLabel).replace('{yeslabel}', this.options.confirmLabel) + '</table>') + '</table>'
    });

    this.mainTable = geByClass('inlMainTable', this.container)[0];
    this.mainCell = geByClass('inlContent', this.mainTable)[0];
    this.contentTable = geByClass('inlContentTable', this.mainCell)[0];
    setStyle(this.contentTable, 'width', this.options.width);

    this.input = geByClass('inlInput', this.contentTable)[0];
    this.buttonOkCell = geByClass('inlButtonOk', this.contentTable)[0];
    this.buttonCancelCell = geByClass('inlButtonCancel', this.contentTable)[0];
    this.buttonOk = this.buttonOkCell.firstChild.firstChild;
    this.buttonCancel = this.buttonCancelCell.firstChild.firstChild;

    this.container.appendChild(this.mainTable);
    this.mainCell.appendChild(this.contentTable);
  },
  initEvents: function() {
    var self = this;
    createButton(this.buttonOk, function() {
      if (!self.options.onConfirm || self.options.onConfirm.apply(self) !== false) self.hide();
    });
    createButton(this.buttonCancel, function() {
      if (!self.options.onCancel || self.options.onCancel.apply(self) !== false) self.hide();
    });
    addEvent(this.target, 'click', function() {self.show(); return false;});
    this.onEvent = function(e) {
    }
  },
  afterInit: function(target, options) {
    if (this.options.afterInit) {
      this.options.afterInit.apply(this);
    }
    var self = this;
    onDomReady(function() {
      self.common.pageContainer.appendChild(self.container);
    });
  },
  hide: function() {
    if (!isVisible(this.container)) return;
    hide(this.container);
    if (curInlineEdit == this) curInlineEdit = false;
    if (this.options.onHide) this.options.onHide.apply(this);
  },
  moveTo: function(left, top) {
    setStyle(this.container, {top: intval(top)+'px', left: intval(left) + 'px'});
  },
  moveToTarget: function() {
    var tc = getXY(this.target);
    this.moveTo(tc[0] + this.options.offsetLeft + this.options.left, tc[1] + this.options.offsetTop + this.options.top);
  },
  setOptions: function(options) {
    var self = this;
    extend(this.options, options);
  },

  toggle: function() {
    this.visible ? this.hide(false) : this.show();
  },
  show: function() {
    if (isVisible(this.container)) return;
    this.moveToTarget();

    if (this.options.onBeforeShow) {
      this.options.onBeforeShow.apply(this);
    }
    show(this.container);
    if (curInlineEdit) curInlineEdit.hide();
    curInlineEdit = this;
    if (this.input) elfocus(this.input);

    if (this.options.onShow) {
      this.options.onShow.apply(this);
    }
  }
});

try{jsDispatcher.triggerOnload('lib/ui_controls');}catch(e){}
try{stManager.done('ui_controls.js');}catch(e){}
