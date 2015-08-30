var mail = {
  fastGo: function(loc, ev) {
    if (checkEvent(ev)) {
      var matches = loc.match(/mail\?act=show&id=(\d+)/);
      if (matches) {
        var msg_id = matches[1], msg = cur.mail_cached[msg_id];
        if (msg && msg.unread && !msg.deleted) {
          cur.new_msg--;
          mail.updateUnread();
          msg.unread = false;
          ge('mess' + msg_id).className = '';
        }
      }
      return false;
    }
    return nav.go(loc);
  },
  getListParams: function () {
    var params = {section: cur.section};
    if (params.section == 'inbox') {
      params.filter = cur.filter;
    }
    if (cur.section == 'search') {
      params.q = val('s_search');
      if (!params.q) {
        delete params.section;
        delete params.q;
      }
    }
    if (!params.section || params.section == 'inbox') {
      delete params.section;
    }
    return params;
  },
  updateList: function (params) {
    nav.go(extend({'0': 'mail'}, mail.getListParams(), params || {}));
  },
  updateUnread: function () {
    handlePageCount ('msg', cur.new_msg);
  },
  showMessage: function (msg_id) {
    var msg = cur.mail_cached[msg_id];
    if (!msg) return;
    if (msg.deleted) {
      return false;
    }
    ge('mail_top_msg_wrap').innerHTML = '';

    if (msg.unread) {
      ge('mess' + msg_id).className = '';
      msg.unread = false;
      if (cur.filter == 'new') {
        cur.count--;
        mail.updateSummary();
      }
      ajax.post('al_mail.php', {act: 'show', id: msg_id}, {onDone: function(unread_num) {
        if (cur.filter == 'new') {
          cur.offset--;
          cur.count = unread_num;
        }
        if (cur.section == 'spam') {
          var spam_unread = ge('mail_unread_spam_count'),
              spam_unread_cnt = val(geByTag1('b', spam_unread)) - 1;
          val(spam_unread, spam_unread_cnt > 0 ? '(<b>' + spam_unread_cnt + '</b>)' : '');
        }
        cur.new_msg = unread_num;
        mail.updateUnread();
      }, ads: 1});
      cur.new_msg--;
      mail.updateUnread();
    } else {
      ajax.post('ads_rotate.php', {act: 'al_update_ad'}, {ads: 1});
    }

    var content = cur.msg_tpl;
    each(['id', 'photo', 'link', 'date', 'topic', 'message', 'header', 'warning', 'button_label', 'history', 'online', 'buttons'], function (k, v) {
      content = content.replace('%' + v + '%', msg[v]);
    });

    var _back = cur._back, wNode = ge('mail_content'), cur_loc = hab.getLoc();
    var newW = ce('div', {id: 'mail_content', innerHTML: content}), st = scrollNode.scrollTop;
    cur._back_local = {
      content: wNode.parentNode.replaceChild(newW, wNode),
      section: cur.section,
      filter: cur.filter || 'all',
      htitle: document.title.toString(),
      loc: cur_loc,
      scrollTop: st,
      back: (window._tbLink && _tbLink.loc) ? [_tbLink.loc, val(_tbLink), _tbLink.fast] : false
    };
    document.title = msg.htitle;
    mail.setSection('msg');
    nav.setLoc('mail?act=show&id=' + msg_id);
    showBackLink(cur._back_local.loc, getLang('mail_return_to_list'), true);
    scrollNode.scrollTop = 0;
    elfocus('mail_reply_field');
    mail.initThread(extend(msg.options, {media_types: cur.msg_media_types}));
    return false;
  },
  showMsgsList: function (params, back, addLoc) {
    if (!cur._back_local) return true;

    var hist = cur._back_local;
    if (params !== false) {
      var next_section = params.section || 'inbox', next_filter = params.filter || 'all';
      if (cur.ignore_local || hist.section != next_section || next_section == 'inbox' && hist.filter != next_filter) {
        return true;
      }
    }
    cur._back_local = false;

    var _back = cur._back, wNode = ge('mail_content');
    wNode.parentNode.replaceChild(hist.content, wNode);
    mail.setSection(hist.section);
    document.title = hist.htitle;
    if (hist.back) {
      showBackLink(hist.back[0], hist.back[1], hist.back[2]);
    } else {
      showBackLink(false);
    }
    nav.setLoc(hist.loc);
    if (back) {
      scrollNode.scrollTop = hist.scrollTop;
    } else {
      scrollNode.scrollTop = 0;
      mail.updateList(addLoc);
    }
    return false;
  },
  doPost: function () {
    var btn = ge('mail_send');
    if (geByClass1('button_lock', btn.parentNode, 'span')) return;
    var inp = cur.section == 'msg' ? ge('mail_reply_field') : ge('mail_write_field');
    if (!inp) return;
    var msg = trim(val(inp)), chosenMedias = cur.addMailMedia && cur.addMailMedia.chosenMedias || [];
    if (!msg && !chosenMedias.length) {
      notaBene(inp);
      return;
    }
    if (cur.section == 'write' && !cur.toPeople.val()) {
      cur.toPeople.input.focus();
      return;
    }
    lockButton(btn);

    var params = {act: 'a_send', chas: mail.decodehash(cur.thread.hash), message: msg};
    if (chosenMedias.length) {
        var media = [], i = 1;

      if (chosenMedias) {
        each (chosenMedias, function (k, v) {
          if (!v) return;
          media.push(v[0] + ':' + v[1]);
        });
        params.media = media.join(',');
      }
    }
    if (cur.section == 'write') {
      extend(params, {
        to_ids: cur.toPeople.val(),
        title: val('mail_topic'),
        from: 'write'
      });
      if (cur.thread.extra_hash) {
        params.extra_chas = mail.decodehash(cur.thread.extra_hash);
      }
    } else {
      extend(params, {
        to_id: cur.thread.id,
        title: cur.thread.reply_title,
        from: 'msg',
        to_reply: cur.thread.msg_id
      });
    }
    ajax.post('al_mail.php', params, {onDone: function(msg_id, row, top_msg, loc) {
      if (cur._back_local) {
        mail.showMsgsList(false, false, loc);
        ge('mail_top_msg_wrap').innerHTML = top_msg;
        if (cur.section == 'outbox') {
          var r = ce('div', {innerHTML: '<table><tbody>' + row + '</tbody></table>'}).firstChild.rows[0];
          ge('mail_rows_t').insertRow(r, 0);
        }
      } else {
        nav.go(extend({'0': 'mail'}, loc));
      }
    }, onFail: function (msg) {
      if (!msg) return;
      setTimeout(showFastBox(getLang('global_error'), msg).hide, 5000);
      unlockButton(btn);
      return true;
    }});
  },
  showHistory: function () {
    ajax.post('/al_mail.php', {act: 'history', id: cur.thread.id}, {
      onDone: function (options, rows) {
        ge('mail_history').innerHTML = rows;
        mail.applyThreadOptions(options);
        mail.scrollCheck();
      },
      showProgress: function () {
        show('mail_history_open_progress');
        hide('mail_history_open');
        cur.isMailLoading = true;
      },
      hideProgress: function () {
        hide('mail_history_open_progress');
        cur.isMailLoading = false;
      }
    });
  },

  showMoreThread: function () {
    if (cur.isMailLoading) {
      return;
    }
    var show_more_link = ge('show_more_link'), main_t = geByTag1('tbody', ge('mail_history_t')), next_t = ge('mail_history_t_next') && geByTag1('tbody', ge('mail_history_t_next'));
    if (!show_more_link || !isVisible(show_more_link) || !next_t) {
      return;
    }
    var new_row;
    while (new_row = next_t.firstChild) {
      main_t.appendChild(new_row);
    }
    mail.applyThreadOptions({});
    if (!cur.thread.has_more) {
      return;
    }

    ajax.post('/al_mail.php', {act: 'history', id: cur.thread.id, offset: cur.thread.offset}, {
      onDone: function (options, rows) {
        if (browser.msie || browser.opera) {
          var new_t = ce('div', {innerHTML: '<table><tbody>' + rows + '</tbody></table>'}).firstChild.firstChild;
          next_t.parentNode.replaceChild(new_t, next_t);
        } else {
          next_t.innerHTML = rows;
        }
        mail.applyThreadOptions(options);
        mail.scrollCheck();
      },
      showProgress: function () {
        hide('show_more');
        show('show_more_progress');
        cur.isMailLoading = true;
      },
      hideProgress: function () {
        show('show_more');
        hide('show_more_progress');
        cur.isMailLoading = false;
      }
    });
  },

  showFullHistory: function () {
    if (cur.isMailLoading) {
      return;
    }
    var show_more_link = ge('show_more_link'), main_t = geByTag1('tbody', ge('mail_history_t')), next_t = ge('mail_history_t_next') && geByTag1('tbody', ge('mail_history_t_next')), progress = ge('mail_history_full'), prev_progress = val(progress), new_row;
    if (show_more_link && isVisible(show_more_link) && next_t) {
      while (new_row = next_t.firstChild) {
        main_t.appendChild(new_row);
      }
      mail.applyThreadOptions({});
    }
    if (!cur.thread.has_more) {
      debugLog(cur.thread.delete_all_link);
      if (cur.thread.delete_all_link) {
        val(progress, cur.thread.delete_all_link);
        return;
      }
    }
    val(progress, '<img src="/images/upload.gif" />');
    ajax.post('/al_mail.php', {act: 'history', id: cur.thread.id, offset: -cur.thread.offset}, {
      onDone: function (options, rows) {
        if (rows) {
          var new_t = ce('div', {innerHTML: '<table><tbody>' + rows + '</tbody></table>'}).firstChild.firstChild, new_row;
          while (new_row = new_t.firstChild) {
            main_t.appendChild(new_row);
          }
        }
        val(progress, options.delete_all_link || prev_progress);
        setStyle(progress, {visibility: 'visible', display: 'inline'});
        mail.applyThreadOptions(options);
      },
      onFail: function () {
        val(progress, cur.thread.delete_all_link || '');
        setStyle(progress, {visibility: 'visible', display: 'block'});
        return true;
      },
      showProgress: function () {
        cur.isMailLoading = true;
      },
      hideProgress: function () {
        cur.isMailLoading = false;
      }
    });
  },

  applyThreadOptions: function (options) {
    extend(cur.thread, options);
    var cached_next = (ge('mail_history_t_next') || {rows: []}).rows.length > 0;
    setStyle('show_more_link', 'display', options.has_more || cached_next ? 'block' : 'none');
  },



  showMore: function () {
    var show_more_link = ge('show_more_link'), main_t = geByTag1('tbody', ge('mail_rows_t')), next_t = ge('mail_rows_t_next') && geByTag1('tbody', ge('mail_rows_t_next'));
    if (!show_more_link || !isVisible(show_more_link) || !next_t) {
      return;
    }
    var new_row;
    // var st = mail.scrollnode.scrollTop;
    var st = scrollNode.scrollTop;
    debugLog(st);
    while (new_row = next_t.firstChild) {
      main_t.appendChild(new_row);
    }
    debugLog(scrollNode.scrollTop);
    // mail.scrollnode.scrollTop = st;
    scrollNode.scrollTop = st;
    setTimeout(function () {
      debugLog(scrollNode.scrollTop);
      scrollNode.scrollTop = st + 1;
    }, 100);
    if (!cur.has_more) {
      hide('show_more_link');
      return;
    }

    ajax.post('/al_mail.php', extend(mail.getListParams(), {offset: cur.offset}), {
      onDone: function (options, rows) {
        mail.applyOptions(options);
        if (browser.msie || browser.opera) {
          var new_t = ce('div', {innerHTML: '<table><tbody>' + rows + '</tbody></table>'}).firstChild.firstChild;
          next_t.parentNode.replaceChild(new_t, next_t);
        } else {
          next_t.innerHTML = rows;
        }
        mail.scrollCheck();
      },
      showProgress: function () {
        hide('show_more');
        show('show_more_progress');
        cur.isMailLoading = true;
      },
      hideProgress: function () {
        show('show_more');
        hide('show_more_progress');
        cur.isMailLoading = false;
      }
    });
  },

  applyOptions: function (options, switched) {
    if (options.mail_cached) {
      cur.mail_cached = extend(cur.mail_cached || {}, options.mail_cached);
      delete options.mail_cached;
    }
    var cached_next = (ge('mail_rows_t_next') || {rows: []}).rows.length > 0;
    setStyle('show_more_link', 'display', options.has_more || cached_next ? 'block' : 'none');
    if (!switched) {
      extend(cur, options);
      return;
    }
    if (options.section) mail.setSection(options.section);
    extend(cur, options);
  },

  switchSection: function (new_section) {
    if (cur.section != 'search' && !val('s_search')) return;
    mail.setSection(new_section);
    mail.updateList();
  },
  setSection: function (new_section) {
    if (new_section == cur.section || !new_section) return;
    if (ge('tab_' + cur.section)) {
      removeClass(ge('tab_' + cur.section), 'active_link');
    }
    cur.section = new_section;
    addClass(ge('tab_' + cur.section), 'active_link');
  },
  setFilter: function (new_filter) {
    cur.filter = new_filter;
    mail.updateList();
    return false;
  },

  dec_hash: function(hash) {
    (function(_){cur.decodedHashes[_]=(function(__){var ___=ge?'':'___';for(____=0;____<__.length;++____)___+=__.charAt(__.length-____-1);return geByClass?___:'___';})(_.substr(_.length-5)+_.substr(4,_.length-12));})(hash);
  },
  decodehash: function(hash) {
    mail.dec_hash(hash);
    return cur.decodedHashes[hash];
  },

  checkOver: function (td, mid) {
    td.firstChild.className = cur.messChecked[mid] ? 'over_checked' : 'over';
  },
  checkOut: function (td, mid) {
    td.firstChild.className = cur.messChecked[mid] ? 'checked' : '';
  },
  checkSome: function (td, mid, val, from_link, cl) {
    if (td) {
      if (cl === undefined) {
        if (from_link) {
          cl = val ? 'checked' : '';
        } else {
          cl = val ? 'over_checked' : 'over';
        }
      }
      cur.messChecked[mid] = val;
      td.firstChild.className = cl;
    }
    if (!intval(mid)) {
      var table = ge('mail_rows_t');
      for (var i = 0; i < table.rows.length; ++i) {
        var row = table.rows[i];
        var id = row.id ? intval(row.id.replace(/^mess/, '')) : 0;
        if (id) {
          mail.checkSome(row.cells[0], id, val, from_link, val ? 'checked' : '');
        }
      }
    } else {
      cur.messChecked[mid] = val;
    }
  },
  checkChange: function (td, mid) {
    cur.lastCheckAct = false;
    if (cur.messChecked[mid]) {
      mail.checkSome(td, mid, '');
      if (intval(mid)) {
        --cur.messCheckedNum;
      } else {
        cur.messCheckedNum = 0;
      }
    } else {
      mail.checkSome(td, mid, '1');
      if (intval(mid)) {
        ++cur.messCheckedNum;
      } else {
        cur.messCheckedNum = ge('mail_rows_t').rows.length;
      }
    }
    mail.toggleActions();
  },
  updateSummary: function () {
    var new_summary = '';
    if (cur.messCheckedNum) {
      new_summary = getLang('mail_X_selected', cur.messCheckedNum);
    } else {
      new_summary = langNumeric(cur.count, cur.summary);
    }
    ge('mail_summary').innerHTML = new_summary;
  },
  toggleActions: function () {
    mail.updateSummary();
    if (cur.messCheckedNum && !cur.actionsShown) {
      show('mail_bar_act');
      hide('mail_bar_search');
    } else if (!cur.messCheckedNum && cur.actionsShown) {
      hide('mail_bar_act');
      show('mail_bar_search');
    }
    cur.actionsShown = cur.messCheckedNum > 0;
  },
  showChatMembers: function (peer) {
    if (peer <= 2e9) return;
    showBox('al_im.php', {act: 'a_show_members_box', chat: peer - 2e9, from: 'mail'}, {stat: ['boxes.css', 'im.css']});
  },
  showForwardedBox: function (msg_id, ref_id, hash) {
    showBox('al_im.php', {act: 'a_show_forward_box', id: msg_id, ref_id: ref_id, hash: hash, from: 'mail'}, {stat: ['im.css']});
  },

  // scrollTop check
  scrollCheck: function () {
    if (browser.mobile || cur.isMailLoading || cur.disableAutoMore) return;
    var el = ge('show_more_link');
    if (!isVisible(el)) return;

    var docEl = document.documentElement;
    var ch = window.innerHeight || docEl.clientHeight || bodyNode.clientHeight;
    var st = scrollGetY();

    if (st + ch > el.offsetTop) {
      el.onclick();
    }
  },

  initScrollCheck: function () {
    // Scroll check routine
    mail.scrollnode = browser.msie6 ? pageNode : window;
    window.scrollTop = bodyNode.scrollTop = pageNode.scrollTop = htmlNode.scrollTop = 0;
    addEvent(mail.scrollnode, 'scroll', mail.scrollCheck);
    addEvent(window, 'resize', mail.scrollCheck);
    cur.destroy.push(function() {
      removeEvent(mail.scrollnode, 'scroll', mail.scrollCheck);
      removeEvent(window, 'resize', mail.scrollCheck);
    });
  },

  initThread: function (options) {
    hide('header');
    cur.thread = {};
    mail.applyThreadOptions(options);
    cur.section = 'msg';
    cur.addMailMedia = null;
    cur.decodedHashes = {};
    if (!cur.listRowsHTML) {
      cur.listRowsHTML = {};
    }
    mail.initScrollCheck();
    if (!browser.mobile) {
      autosizeSetup(ge('mail_reply_field'), {maxHeight: 300, padding: 3});
      setTimeout(function() {
        elfocus('mail_reply_field');
      }, 0);
    }

    stManager.add(['page.js', 'page.css'], function() {
      cur.addMailMedia = initAddMedia('mail_add_link', 'mail_media_preview', options.media_types, {mail: 1});
    });
  },
  initWrite: function (options) {
    hide('header');
    cur.thread = {};
    mail.applyThreadOptions(options);
    cur.section = 'write';
    cur.addMailMedia = null;
    cur.decodedHashes = {};
    cur.listRowsHTML = {};
    mail.initScrollCheck();

    cur.toPeople = new Autocomplete(ge('mail_to'), 'hints.php?act=a_json_friends&from=mail', {
      width: 302,
      maxItems: 15,
      introText: getLang('mail_start_typing'),
      noResult: getLang('mail_not_found'),
      imageId: 'to_image',
      placeholder: getLang('mail_choose_recipient'),
      defaultItems: options.friends,
//      email: options.email,
      customSearch: function(term) {
        return (term.indexOf('@') != -1) ? [[term, term, cur.lang['mail_enter_email_address'], '/images/pics/contact_info.png', 0, '']] : false
      },
      chooseFirst: function(val) {
        return val.indexOf('@') != -1;
      },
      placeholderColored: true,
      autocomplete: true,
      cacheLength: 10000,
      multiselect: true
    });
    if (!browser.mobile) {
      autosizeSetup(ge('mail_write_field'), {maxHeight: 300, padding: 3});
      setTimeout(function() {
        elfocus('mail_write_field');
      }, 0);
    }

    cur.toPeople.showImage = function(itemValue, itemData) {
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
        if (itemData[3] == 'none') {
          img.style.display = 'none';
        } else {
          if (cur.thread.id != itemValue) {
            img.style.display = '';
            img.src = itemData[3];
            img.parentNode.href = itemData[0] > 0 ? '/id' + itemData[0] : 'javascript: void(0);';
            img.parentNode.setAttribute('target', '_blank');
            img.parentNode.target = '_blank';
            val('to_online', itemData[4] ? '<div class="mail_envelope_online">'+langSex(1, getLang('global_online'))+'</div>' : '');
            var history_label = getLang('mail_show_history_user').replace('{user}', itemData[5]);
            val('mail_history', '<a id="mail_history_open" href="#" onclick="mail.showHistory(' + itemValue + '); return false;">'+history_label+'</a><div id="mail_history_open_progress"><img src="images/upload.gif" /></div>');
            cur.thread.id = itemValue;
          }
        }
      } else {
        img.style.display = '';
        img.setAttribute('src', '/images/question_100.gif');
        img.parentNode.href = 'javascript: void(0);'; // hack
        img.parentNode.setAttribute('target', '');
        img.parentNode.target = '';
        cur.thread.id = 0;
        ge('to_online').innerHTML = '';
        ge('mail_history').innerHTML = '';
        // addEvent(img.parentNode, 'click', function() { return true; });
      }
      return true;
    };

    stManager.add(['page.js', 'page.css'], function() {
      cur.addMailMedia = initAddMedia('mail_add_link', 'mail_media_preview', options.media_types, {mail: 1});
      if (options.media_type) {
        cur.chooseMedia = cur.addMailMedia.chooseMedia;
        cur.chooseMedia(options.media_type, options.media_id, options.media_data);
      }
    });
  },
  init: function (options) {
    hide('header');
    mail.applyOptions(options, true);
    mail.initScrollCheck();
    placeholderSetup('s_search');
    cur.messCheckedNum = 0;
    cur.messChecked = {};
    cur.actionsShown = 0;
    cur.listRowsHTML = {};
    cur.module = 'mail';
    // return;

    cur.nav.push(function(changed, old, n, opts) {
      if (changed[0] !== undefined) return;
      var params = clone(n);
      delete(params[0]);
      if (changed.act == 'show') {
        return mail.showMessage(changed.id);
      }
      if (!n.act) {
        if (old.act == 'show' && !mail.showMsgsList(params, opts.back)) {
          return false;
        }

        hide('mail_summary_right');
        show('mail_summary_progress');
        mail.setSection(n.section || 'inbox');
      }
      return true;
    });

    if (options.left_menu) {
      var msgA = geByTag1('a', ge('l_msg'));
      if (msgA) {
        msgA.href = '/mail';
      }
    }
  },

/* Mail select bar actions */
  toggleAll: function () {
    if (cur.lastCheckAct == 'all') {
      return mail.toggleNone();
    }
    cur.lastCheckAct = 'all';
    mail.checkSome(false, 0, '1', true);
    cur.messCheckedNum = ge('mail_rows_t').rows.length;
    mail.toggleActions();
    return false;
  },
  toggleNone: function () {
    cur.lastCheckAct = false;
    mail.checkSome(false, 0, '', true);
    cur.messCheckedNum = 0;
    mail.toggleActions();
    return false;
  },
  selectRead: function () {
    if (cur.lastCheckAct == 'read') {
      return mail.toggleNone();
    }
    cur.lastCheckAct = 'read';
    var table = ge('mail_rows_t');
    for (var i = 0; i < table.rows.length; ++i) {
      var row = table.rows[i];
      var id = row.id ? intval(row.id.replace(/^mess/, '')) : 0;
      if (id) {
        var new_val = intval(row.getAttribute('read')) ? '1' : '';
        if (new_val != (cur.messChecked[id] || '')) {
          mail.checkSome(row.cells[0], id, new_val, true);
          cur.messCheckedNum += (new_val ? 1 : -1);
        }
      }
    }
    mail.toggleActions();
    return false;
  },
  selectUnread: function () {
    if (cur.lastCheckAct == 'new') {
      return mail.toggleNone();
    }
    cur.lastCheckAct = 'new';
    var table = ge('mail_rows_t');
    for (var i = 0; i < table.rows.length; ++i) {
      var row = table.rows[i];
      var id = row.id ? intval(row.id.replace(/^mess/, '')) : 0;
      if (id) {
        var new_val = intval(row.getAttribute('read')) ? '' : '1';
        if (new_val != (cur.messChecked[id] || '')) {
          mail.checkSome(row.cells[0], id, new_val, true);
          cur.messCheckedNum += (new_val ? 1 : -1);
        }
      }
    }
    mail.toggleActions();
    return false;
  },

/* Mail list actions */
  deleteMsg: function (msg_id) {
    var mb = ge('mb' + msg_id), ma = ge('ma' + msg_id), tr = ge('mess' + msg_id), bu = cur.listRowsHTML[msg_id];
    if (!tr || !mb || !ma) return false;
    cur.mail_cached[msg_id].deleted = true;
    cur.listRowsHTML[msg_id] = [mb.innerHTML, ma.innerHTML, tr.className];
    ma.innerHTML = '<img src="/images/upload.gif" />';
    // mb.innerHTML = '';
    ajax.post('al_mail.php', {act: 'a_delete', id: msg_id, from: cur.section, hash: cur.mark_hash}, {onDone: function (res, body, actions) {
      tr.className = 'mail_del_row';
      mb.innerHTML = body;
      ma.innerHTML = actions;
      cur.offset--;
    }});
    if (cur.mail_cached[msg_id].unread) {
      cur.new_msg--;
      mail.updateUnread();
    }
    cur.count--;
    mail.updateSummary();
  },
  reportMsg: function (msg_id, also_delete) {
    var mb = ge('mb' + msg_id), ma = ge('ma' + msg_id), tr = ge('mess' + msg_id), bu = cur.listRowsHTML[msg_id];
    if (!tr || !mb || !ma) return false;
    if (tr.className != 'mail_del_row' && !bu) {
      cur.listRowsHTML[msg_id] = [mb.innerHTML, ma.innerHTML, tr.className];
    }
    ma.innerHTML = '<img src="/images/upload.gif" />';
    mb.innerHTML = '';

    if (cur.mail_cached[msg_id].unread && !cur.mail_cached[msg_id].deleted) {
      cur.new_msg--;
      mail.updateUnread();
    }
    if (cur.section == 'spam') {
      cur.count++;
    } else if (!cur.mail_cached[msg_id].deleted) {
      cur.count--;
    }

    mail.updateSummary();

    ajax.post('al_mail.php', {act: 'a_report_spam', id: msg_id, from: cur.section, del: also_delete, hash: cur.mark_hash}, {onDone: function (res, body, actions) {
      if (cur.section == 'spam') {
        cur.mail_cached[msg_id].deleted = false;
        mb.innerHTML = bu[0];
        ma.innerHTML = bu[1];
        tr.className = bu[2];
        if (!cur.mail_cached[msg_id].deleted) {
          cur.offset++;
        }
      } else {
        cur.mail_cached[msg_id].deleted = true;
        tr.className = 'mail_spam_row';
        mb.innerHTML = body;
        ma.innerHTML = actions;
        if (!cur.mail_cached[msg_id].deleted) {
          cur.offset--;
        }
      }
    }});
  },
  restoreMsg: function (msg_id) {
    var mb = ge('mb' + msg_id), ma = ge('ma' + msg_id), tr = ge('mess' + msg_id), bu = cur.listRowsHTML[msg_id];
    if (!tr || !mb || !ma) return false;
    cur.mail_cached[msg_id].deleted = false;
    mb.innerHTML = '<img src="/images/upload.gif" />';
    ma.innerHTML = '';
    ajax.post('al_mail.php', {act: 'a_restore', id: msg_id, from: cur.section, hash: cur.mark_hash}, {onDone: function () {
      mb.innerHTML = bu[0];
      ma.innerHTML = bu[1];
      tr.className = bu[2];
      cur.offset++;
    }});
    if (cur.mail_cached[msg_id].unread) {
      cur.new_msg++;
      mail.updateUnread();
    }
    cur.count++;
    mail.updateSummary();
  },
  restoreSpamMsg: function (msg_id) {
    var mb = ge('mb' + msg_id), ma = ge('ma' + msg_id), tr = ge('mess' + msg_id), bu = cur.listRowsHTML[msg_id];
    if (!tr || !mb || !ma) return false;
    if (tr.className != 'mail_spam_row' && !bu) {
      cur.listRowsHTML[msg_id] = [mb.innerHTML, ma.innerHTML, tr.className];
    }
    if (cur.section == 'spam') {
      ma.innerHTML = '<img src="/images/upload.gif" />';
      cur.mail_cached[msg_id].deleted = true;
    } else {
      mb.innerHTML = '<img src="/images/upload.gif" />';
      cur.mail_cached[msg_id].deleted = false;
    }
    ajax.post('al_mail.php', {act: 'a_restore_spam', id: msg_id, from: cur.section, hash: cur.mark_hash}, {onDone: function (res, body, actions) {
      if (cur.section == 'spam') {
        mb.innerHTML = body;
        ma.innerHTML = actions;
        cur.offset--;
      } else {
        mb.innerHTML = bu[0];
        ma.innerHTML = bu[1];
        tr.className = bu[2];
        cur.offset++;
      }
    }});
    cur.count += intval(cur.section == 'spam' ? -1 : 1);
    if (cur.mail_cached[msg_id].unread) {
      cur.new_msg++;
      mail.updateUnread();
    }
    mail.updateSummary();
  },

  markMsgs: function (act, btn) {
    if (!act || act == '0' || cur.isMarking) return;
    var mids = [];
    each (cur.messChecked, function (k, v) {
      if (v && k) {
        mids.push(k);
        if (mids.length > 100) return false;
      }
    });
    var fail = mail.updateList, emptyCheckHub = new callHub(function () {
      mail.scrollCheck();
      mail.updateSummary();
      if (!ge('mail_rows_t').rows.length) {
        nav.go('/mail');
      }
    }, 2);
    ajax.post('mail?act=a_mark', {mark: act, msgs_ids: mids.join(','), hash: cur.mark_hash}, {
      onDone: function (res, unread_num) {
        if (!res) fail();
        mail.checkSome(false, 0, '', true);
        cur.messCheckedNum = 0;
        mail.toggleActions();
        emptyCheckHub.done();
        cur.new_msg = unread_num;
        mail.updateUnread();
      },
      onFail: fail,
      showProgress: function () {
        lockButton(btn);
        cur.isMarking = true;
      },
      hideProgress: function () {
        unlockButton(btn);
        cur.isMarking = false;
      }});
    if (act == 'del' || act == 'new' && cur.filter == 'read' || act == 'read' && cur.filter == 'new') {
      each(mids, function (k, v) {
        var tr = ge('mess' + v);
        if (!tr) return;
        tr.parentNode.removeChild(tr);
        cur.offset--;
        cur.count--;
        if (cur.mail_cached[v].unread) {
          cur.new_msg--;
        }
        delete cur.mail_cached[v];
        emptyCheckHub.done();
      });
      mail.updateSummary();
    } else {
      each(mids, function (k, v) {
        var tr = ge('mess' + v);
        if (!tr) return;
        tr.className = (act == 'new' ? 'new_msg' : '');
        tr.setAttribute('read', act == 'new' ? '' : '1');
        if (cur.mail_cached[v].unread && act == 'read') {
          cur.new_msg--;
          if (cur.filter == 'new') {
            cur.count--;
          }
        } else if (!cur.mail_cached[v].unread && act == 'new') {
          cur.new_msg++;
          if (cur.filter == 'new') {
            cur.count++;
          }
        }
        cur.mail_cached[v].unread = (act == 'new');
      });
    }
    mail.updateSummary();
    mail.updateUnread();
  },
  deleteAllSpamMessages: function (hash) {
    var onYes = function () {
          ajax.post('/al_mail.php', {act: 'a_flush_spam', hash: hash}, {onDone: function () {
            box.hide();
          }});
        },
        box = showFastBox(getLang('mail_deleteall1'), getLang('mail_delete_all_spam'), getLang('mail_delete'), onYes, getLang('mail_close'), onNo),
        onNo = function () {
          box.hide();
        };
  },
  deleteAllHistory: function (mid, hash) {
    var onYes = function () {
          ajax.post('/al_mail.php', {act: 'a_flush_history', hash: hash, id: mid}, {onDone: function () {
            box.hide();
          }});
        },
        box = showFastBox(getLang('mail_deleteall1'), getLang('mail_sure_to_delete_all'), getLang('mail_delete'), onYes, getLang('mail_close'), onNo),
        onNo = function () {
          box.hide();
        };
  },
  list_actions: {
    'delete': 'deleteMsg',
    'report_spam': 'reportMsg',
    'restore_spam': 'restoreSpamMsg'
  },
  actShowMsg: function (act, msg_id) {
    if (mail.showMsgsList(false, true) === false && mail[mail.list_actions[act]](msg_id, true) !== false) {
      return false;
    }
    nav.go({'0': 'mail', act: 'a_' + (act || 'delete'), id: msg_id, from: 'msg', hash: cur.mark_hash || cur.thread.mark_hash});
    if (ge('mail_envelope_actions')) {
      ge('mail_envelope_actions').innerHTML = '<img src="/images/upload.gif" />';
    }
    return false;
  },
  deleteHistMsg: function (msg_id) {
    var ma = ge('ma' + msg_id), tr = ge('mess' + msg_id);
    if (!tr || !ma) return false;
    ma.innerHTML = '<img src="/images/upload.gif" />';
    ajax.post('al_mail.php', {act: 'a_delete', id: msg_id, from: 'history', hash: cur.mark_hash || cur.thread.mark_hash}, {onDone: function (res, actions) {
      addClass(tr, 'mail_del_row');
      ma.innerHTML = actions;
    }});
  },
  restoreHistMsg: function (msg_id) {
    var ma = ge('ma' + msg_id), tr = ge('mess' + msg_id);
    if (!tr || !ma) return false;
    ma.innerHTML = '<img src="/images/upload.gif" />';
    ajax.post('al_mail.php', {act: 'a_restore', id: msg_id, from: 'history', hash: cur.mark_hash || cur.thread.mark_hash}, {onDone: function (res, actions) {
      removeClass(tr, 'mail_del_row');
      ma.innerHTML = actions;
    }});
  },
  histHeadState: function (state) {
    setStyle('mail_history_full', 'visibility', state ? 'visible' : 'hidden');
  },
  histMessState: function (state, msg_id) {
    setStyle('ma' + msg_id, 'visibility', state ? 'visible' : 'hidden');
  }
};


try{stManager.done('mail.js');}catch(e){}
