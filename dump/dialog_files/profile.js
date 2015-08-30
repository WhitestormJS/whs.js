var Profile = {
  showFull: function() {
    var lnk = ge('profile_full_link');
    if (lnk) {
      lnk.innerHTML = getLang('hide_full');
      lnk.onclick = Profile.hideFull;
    }
    ge('profile_short').innerHTML = cur.options.info[1];
    show('profile_full_info');
  },
  hideFull: function() {
    var lnk = ge('profile_full_link');
    if (lnk) {
      lnk.innerHTML = getLang('show_full');
      lnk.onclick = Profile.showFull;
    }
    ge('profile_short').innerHTML = cur.options.info[0];
    hide('profile_full_info', 'profile_class_hint');
  },
  showGroups: function(e) {
    if (checkEvent(e) !== false) return;
    var lnk = ge('profile_groups_link');
    lnk.oldText = val(lnk);
    ajax.post('al_profile.php', {act: 'groups', id: cur.oid}, {onDone: function(label, text) {
      if (text) {
        val(lnk, label);
        lnk.onclick = Profile.hideGroups;
        var pag = ge('profile_all_groups');
        val(pag, text);
        show(pag.parentNode);
      } else {
        hide(lnk);
      }
    }, showProgress: function() {
      val(lnk, '<div class="progress" id="profile_groups_prg"></div>');
    }, hideProgress: function() {
      val(lnk, lnk.oldText);
    }, cache: 1});
    return cancelEvent(e);
  },
  hideGroups: function(e) {
    if (checkEvent(e) !== false) return;
    var lnk = ge('profile_groups_link');
    val(lnk, lnk.oldText);
    lnk.onclick = Profile.showGroups;
    hide(ge('profile_all_groups').parentNode);
    return cancelEvent(e);
  },
  photoOver: function(el) {
    var table = el.parentNode.parentNode, index = indexOf(el.parentNode.cells, el);
    fadeIn(table.rows[1].cells[index].firstChild, 200);
  },
  photoOut: function(el) {
    var table = el.parentNode.parentNode, index = indexOf(el.parentNode.cells, el);
    fadeOut(table.rows[1].cells[index].firstChild, 200);
  },
  photoRemove: function(lnk, photo_id) {
    if (cur.viewAsBox) return cur.viewAsBox();

    var el = lnk.parentNode.parentNode, table = el.parentNode.parentNode, index = indexOf(el.parentNode.cells, el);
    var prg = lnk.nextSibling || el.appendChild(ce('div', {className: 'progress'}));
    ajax.post('al_profile.php', {act: 'remove_photo', photo_id: photo_id, hash: cur.options.profph_hash}, {onDone: function(about, text, photo_id) {
      var aboutNode = ge('profile_photos_about') || ge('profile_photos_module').appendChild(ce('div', {className: 'msg', id: 'profile_photos_about'}));
      aboutNode.innerHTML = about;
      hide(table.rows[1].cells[index].firstChild);
      cur.oldProfilePhotos = ge('profile_photos').innerHTML;
      if (text) {
        var l = table.rows[0].cells.length;
        for (var i = index + 1; i < l; ++i) {
          for (var j = 0; j < 2; ++j) {
            table.rows[j].cells[i - 1].innerHTML = table.rows[j].cells[i].innerHTML;
          }
        }
        table.rows[0].cells[l - 1].innerHTML = text;
        var div = table.rows[1].cells[l - 1].firstChild;
        div.innerHTML = '<a onclick="Profile.photoRemove(this, ' + photo_id + ')">' + div.firstChild.innerHTML + '</a>';
      } else {
        table.rows[0].deleteCell(index);
        table.rows[1].deleteCell(index);
        if (!table.rows[0].cells.length) {
          hide('profile_photos_module');
        }
      }
    }, showProgress: function() {
      hide(lnk);
      show(prg);
    }, hideProgress: function() {
      hide(prg);
      show(lnk);
    }});
  },
  photoReturn: function(lnk, photo_id) {
    if (cur.viewAsBox) return cur.viewAsBox();

    ajax.post('al_profile.php', {act: 'return_photo', photo_id: photo_id, hash: cur.options.profph_hash}, {onDone: function() {
      ge('profile_photos').innerHTML = cur.oldProfilePhotos;
      var about = ge('profile_photos_about');
      about.parentNode.removeChild(about);
    }, showProgress: function() {
      hide(lnk);
      lnk.nextSibling.style.display = 'inline';
    }, hideProgress: function() {
      hide(lnk.nextSibling);
      show(lnk);
    }});
  },

  otherActs: function(el) {
    clearTimeout(cur.hideOtherTimer);
    if (!el) return false;
    el.blur();
    var acts = ge('profile_other_acts');
    if (isVisible(acts)) {
      fadeIn(acts, 0);
      return false;
    }
    setTimeout(addEvent.pbind(document, 'click', Profile.hideOther), 1);
    acts.style.marginLeft = '-1px';
    acts.style.marginTop = '-21px';
    show(acts);
    return false;
  },
  hideOther: function(timeout) {
    if (timeout > 0) {
      cur.hideOtherTimer = setTimeout(Profile.hideOther.pbind(0), timeout);
      return;
    }
    var acts = ge('profile_other_acts');
    if (!acts) return;
    if (timeout == -1) {
      hide(acts);
    } else {
      fadeOut(acts, 200);
    }
    removeEvent(document, 'click', Profile.hideOther);
  },

  newPhoto: function(params) {
    Profile.hideOther(-1);
    if (cur.viewAsBox) return cur.viewAsBox();

    showBox('/al_profile.php', extend(params || {}, {act: 'new_photo', flash: browser.flash}), {params: {
      bodyStyle: 'padding: 0px; position: relative;'
    }});
  },
  editPhoto: function(newph) {
    Profile.hideOther(-1);
    if (cur.viewAsBox) return cur.viewAsBox();

    showBox('/al_profile.php', extend(newph || {}, {act: 'edit_photo'}), {
      params: {
        onHide: newph ? Profile.newPhoto : false,
        bodyStyle: 'padding: 16px 7px'
      },
      stat: ['tagger.js', 'tagger.css']
    });
  },
  deletePhoto: function() {
    Profile.hideOther(-1);
    if (cur.viewAsBox) return cur.viewAsBox();

    var box = showFastBox({title: getLang('global_warning')}, getLang('sure_delete_photo'), getLang('global_delete'), function() {
      ajax.post('al_profile.php', {
        act: 'delete_photo',
        hash: cur.options.photo_hash
      }, {
        showProgress: box.showProgress,
        hideProgress: box.hideProgress
      });
    }, getLang('global_cancel'));
  },
  showProfilePhoto: function(i, e) {
    if (checkEvent(e)) {
      return true;
    }
    if (cur.viewAsBox) return cur.viewAsBox();

    var cnt = cur.options.photos_count, ph = cur.options.photos;
    clearTimeout(cur.changePhotoTimer);
    i -= (i >= cnt) ? i : 0;
    var wait = (i >= ph.length), wait_index = i;
    if (ph.length < cnt && (ph.length - i < 5)) {
      ajax.post('al_profile.php', {
        act: 'get_profile_photos',
        id: cur.oid,
        offset: ph.length,
        skip_one: cur.options.skip_one
      }, {onDone: function(photos) {
        var added = false;
        for (var i in photos) {
          added = true;
          vkImage().src = photos[i][0];
          cur.options.photos.push(photos[i]);
        }
        if (!added) {
          cur.options.photos_count = cur.options.photos.length;
        }
        if (wait) {
          Profile.showProfilePhoto(wait_index);
        }
      }});
    }
    if (!wait) {
      var lnk = ge('profile_photo_link');
      lnk.firstChild.src = ph[i][0];
      lnk.href = ph[i][1];
      lnk.onclick = Profile.showProfilePhoto.pbind(wait_index + 1);
      if (ph[i][4]) {
        cur.changePhotoTimer = setTimeout(ajax.post.pbind('al_profile.php', {
          act: 'change_photo',
          photo: ph[i][2],
          data: ph[i][3],
          hash: ph[i][4]
        }, {onFail: function() { return true; }}), 500);
      }
    }
    return false;
  },

  setupSMS: function(hash) {
    Profile.hideOther(-1);
    if (cur.viewAsBox) return cur.viewAsBox();

    showBox('al_mobile.php', {act: 'configure_sms_notifications', mid: cur.oid, hash: hash});
  },
  toggleFan: function(btn, hash, act, ev) {
    if (cur.viewAsBox) {
      Profile.hideOther(-1);
      return cur.viewAsBox();
    }

    if (cur.toggleFanAct != undefined) {
      act = cur.toggleFanAct;
    }
    ajax.post('al_fans.php', {act: act ? 'be_fan' : 'not_fan', mid: cur.oid, hash: hash}, {onDone: function(text) {
      btn.firstChild.nextSibling.innerHTML = text;
      cur.toggleFanAct = !act;
    }, progress: btn.firstChild});
    cancelEvent(ev);
  },
  toggleFave: function(btn, hash, act, ev) {
    if (cur.viewAsBox) {
      Profile.hideOther(-1);
      return cur.viewAsBox();
    }

    if (cur.toggleFaveAct != undefined) {
      act = cur.toggleFaveAct;
    }
    ajax.post('fave.php', {act: act ? 'addPerson' : 'deletePerson', mid: cur.oid, hash: hash}, {onDone: function(text) {
      btn.firstChild.nextSibling.innerHTML = text;
      cur.toggleFaveAct = !act;
    }, progress: btn.firstChild});
    cancelEvent(ev);
  },
  toggleFriend: function(btn, hash, act, ev) {
    if (cur.viewAsBox) {
      Profile.hideOther(-1);
      return cur.viewAsBox();
    }

    if (act) {
      stManager.add(['tooltips.css', 'tooltips.js']);
    }

    ajax.post('al_friends.php', {act: act ? 'add' : 'remove', mid: cur.oid, hash: hash, from: 'profile'}, {
      onDone: function(text, vis, ttText, ttScript, doReload) {
        if (!text) return nav.reload();
        var tt = (ge('profile_am_subscribed') || {}).tt;
        if (tt) {
          tt.hide({fasthide: 1});
          tt.destroy();
        }
        Profile.hideOther(-1);
        var fs = ge('friend_status');
        cleanElems(fs.firstChild);
        if (text) {
          show(fs);
          val(fs, text);
        } else {
          hide(fs);
        }
        (vis ? show : hide)('friend_remove');
        if (doReload) {
          nav.reload();
        } else if (ttText) {
          ajax.preload('al_friends.php', {act: 'friend_tt', mid: cur.oid}, [ttText, ttScript])
          setTimeout(Profile.friendTooltip, 0);
        }
      },
      showProgress: btn.tagName == 'BUTTON' ? lockButton.pbind(btn) : show.pbind(btn.firstChild),
      hideProgress: btn.tagName == 'BUTTON' ? unlockButton.pbind(btn) : hide.pbind(btn.firstChild),
      onFail: function(text) {
        if (!text) return;

        showFastBox(getLang('global_error'), text);
        return true;
      }
    });
    cancelEvent(ev);
  },
  friendTooltip: function() {
    if (cur.viewAsBox) {
      return;
    }

    return showTooltip(ge('profile_am_subscribed'), {
      url: 'al_friends.php',
      params: {act: 'friend_tt', mid: cur.oid},
      slide: 15,
      hidedt: 500,
      shift: [23, -1, -10],
      className: 'preq_tt',
      forcetodown: true
    });
  },
  submitReqText: function() {
    var msg = trim(val('preq_input'));
    if (!msg) return elfocus('preq_input');

    ajax.post('al_friends.php', {act: 'request_text', mid: cur.oid, message: msg, hash: cur.reqHash}, {onDone: function(text) {
      if (!text) return;

      var t = ge('preq_text');
      val(t, text);
      show(t.parentNode);
      hide(ge('preq_input').parentNode);
    }, showProgress: lockButton.pbind('preq_submit'), hideProgress: unlockButton.pbind('preq_submit')});
  },
  reqTextChanged: function(ev) {
    onCtrlEnter(ev, Profile.submitReqText);
    var field = ge('preq_input');
    var v = trim(val(field)).replace(/\n\n\n+/g, '\n\n');
    if (field.lastLen === v.length) return;
    field.lastLen = v.length;
    var countRealLen = function(text) {
      var spec = {'&': 5, '<': 4, '>': 4, '"': 6, "\n": 4, "\r": 0, '!': 5, "'": 5};
      var res = 0;
      for (var i = 0, l = text.length; i < l; i++) {
        var k = spec[text.charAt(i)], c = text.charCodeAt(i);
        if (k !== undefined) res += k;
        else if ((c > 0x80 && c < 0xC0) || c > 0x500) res += ('&#' + c + ';').length;
        else res += 1;
      }
      return res;
    }
    var realLen = countRealLen(v), maxLen = 240;
    var brCount = (realLen - v.replace(/\n/g, '').length) / 4;
    var warn = ge('preq_warn');
    if (realLen > maxLen - 40 || brCount > 4) {
      if (realLen > maxLen) {
        warn.innerHTML = getLang('friends_exceeds_symbol_limit', realLen - maxLen);
      } else if (brCount > 4) {
        warn.innerHTML = getLang('friends_exceeds_lines_limit', brCount - 4);
      } else {
        warn.innerHTML = getLang('text_N_symbols_remain', maxLen - realLen);
      }
      show(warn);
    } else {
      hide(warn);
    }
  },
  toggleBlacklist: function(btn, hash, act, ev) {
    if (cur.viewAsBox) {
      Profile.hideOther(-1);
      return cur.viewAsBox();
    }

    if (cur.toggleBlacklistAct != undefined) {
      act = cur.toggleBlacklistAct;
    }
    ajax.post('al_settings.php', {act: act ? 'a_add_to_bl' : 'a_del_from_bl', id: cur.oid, hash: hash, from: 'profile'}, {onDone: function(text) {
      btn.firstChild.nextSibling.innerHTML = text;
      cur.toggleBlacklistAct = !act;
    }, progress: btn.firstChild});
    cancelEvent(ev);
  },
  showGiftBox: function(ev) {
    Profile.hideOther(-1);
    if (cur.viewAsBox) return cur.viewAsBox();

    return !showTabbedBox('al_gifts.php', {act: 'get_gift_box', mid: cur.oid}, {stat: ['gifts.css', 'ui_controls.js', 'ui_controls.css'], cache: 1}, ev);
  },
  showHideGiftsBox: function(ev) {
    Profile.hideOther(-1);
    if (cur.viewAsBox) return cur.viewAsBox();
    var msg = getLang('profile_sure_hide_gifts').replace('{link}', '<a href="/settings" onclick="return nav.go(this, event;)">').replace('{/link}', '</a>').replace('{link1}', '<a href="/settings?act=privacy" onclick="return nav.go(this, event;)">').replace('{/link1}', '</a>');

    var box = showFastBox({title: getLang('global_warning'), bodyStyle: 'line-height: 140%;', width: 350}, msg, getLang('profile_gifts_hide_button'), function() {
      ajax.post('al_profile.php', {
        act: 'hide_gifts',
        hash: cur.options.gifts_hash
      }, {
        onDone: function() {
          slideUp('profile_gifts', 200);
          box.hide();
        },
        progress: box.progress
      });
    }, getLang('global_cancel'));
    cancelEvent(ev);
    return false;
  },
  addFriendBox: function() {
    if (cur.viewAsBox) return cur.viewAsBox();
    showBox('al_friends.php', {act: 'add_box', mid: cur.oid});
  },
  acceptFriend: function(hash) {
    if (cur.viewAsBox) return cur.viewAsBox();
    ajax.post('al_friends.php', {act: 'add', mid: cur.oid, hash: hash}, {onDone: function(text) {
      nav.go('/friends?section=recent');
    }});;
  },
  declineFriend: function(hash) {
    if (cur.viewAsBox) return cur.viewAsBox();
    ajax.post('al_friends.php', {act: 'remove', mid: cur.oid, hash: hash}, {onDone: function(text) {
      hide('friend_request_actions');
    }});
  },
  showWishesBox: function(ev) {
    return true;
    //return !showTabbedBox('al_gifts.php', {act: 'wishlist_box', mid: cur.oid}, {stat: ['gifts.css'], cache: 1}, ev);
  },
  processRelation: function(el, mid, hash, accept) {
    if (cur.viewAsBox) return cur.viewAsBox();

    var pos = getXY(el), parpos = getXY(el.parentNode);
    var pr = ge('relation_progress' + mid), lnk = ge('profile_full_link');
    ajax.post('al_profile.php', {
      act: 'process_relation',
      mid: mid,
      accept: accept ? 1 : '',
      full_shown: lnk ? 1 : '',
      hash: hash
    }, {
      onDone: function(short_info, long_info) {
        cur.options.info = [short_info, long_info];
        if (isVisible('profile_full_info')) {
          Profile.showFull();
        } else {
          Profile.hideFull();
        }
      },
      showProgress: function() {
        pr.style.left = (el.offsetLeft + Math.floor((el.offsetWidth - 32) / 2)) + 'px';
        show(pr);
        el.style.visibility = 'hidden';
      },
      hideProgress: function() {
        el.style.visibility = 'visible';
        hide(pr);
      }
    });
  },

  infoEdit: function() {
    if (cur.viewAsBox) return cur.viewAsBox();

    var tt = ge('current_info').tt;
    if (tt && tt.hide) {
      tt.hide();
    }
    var ed = ge('currinfo_editor');
    if (browser.msie6 || browser.msie7) {
      ed.style.marginLeft = '-10px';
      ed.style.marginTop = '-23px';
    } else if (browser.msie || browser.opera) {
      ed.style.marginLeft = '-10px';
    }
    show(ed, ge('profile_current_info').firstChild.nextSibling);
    hide(ge('profile_current_info').firstChild);
    var info = ge('current_info').firstChild, input = ge('currinfo_input');
    cur.infoEditing = (info.className == 'my_current_info');
    if (cur.infoEditing) {
      cur.infoOld = info.innerHTML;
      hide('currinfo_about');
      setTimeout(show.pbind(ge('currinfo_cancel').parentNode, 'currinfo_sep', 'currinfo_clear'), 0);
    } else {
      cur.infoOld = '';
      hide(ge('currinfo_cancel').parentNode, 'currinfo_sep', 'currinfo_clear');
      setTimeout(show.pbind('currinfo_about'), 0);
    }
    input.value = winToUtf(cur.infoOld);
    elfocus(input, 0, cur.infoOld.length);
    addEvent(window, 'keydown', Profile.infoKeydown);
    addEvent(document, 'mousedown', Profile.infoMousedown);
    ge('currinfo_save').onclick = Profile.infoCheckSave;
    ge('currinfo_cancel').onclick = Profile.infoCancel;
  },
  infoCancel: function() {
    hide('currinfo_editor', ge('profile_current_info').firstChild.nextSibling);
    show(ge('profile_current_info').firstChild);
    cleanElems('currinfo_save', 'currinfo_cancel');
    removeEvent(window, 'keydown', Profile.infoKeydown);
    removeEvent(document, 'mousedown', Profile.infoMousedown);
  },
  infoShowShare: function() {
    if (cur.viewAsBox) return cur.viewAsBox();

    var el = ge('current_info'), label = getLang('share_current_info');
    showTooltip(el, {
      content: '<div class="content"><div class="checkbox"><div></div>' + label + '</div></div>',
      className: 'share_tt',
      init: function() {
        addEvent(geByClass1('checkbox', el.tt.container), 'click', function() {
          checkbox(this);
          ajax.post('al_profile.php', {act: 'share_currinfo', hash: cur.options.info_hash, checked: isChecked(this)}, {onDone: wall.receive});
        });
      },
      toup: false,
      showdt: 0,
      slide: 10,
      hidedt: 200,
      onClean: function() {
        cleanElems(geByClass1('checkbox', el.tt.container));
      }
    });
  },
  infoKeydown: function(e) {
    if (e.keyCode == KEY.ESC) {
      Profile.infoCancel();
    }
  },
  infoMousedown: function(e) {
    var t = e.target;
    while (t.parentNode) {
      if (t.id == 'currinfo_editor') {
        return;
      }
      t = t.parentNode;
    }
    Profile.infoCancel();
  },
  infoCheck: function(el) {
    if (isVisible('currinfo_progress')) return;

    el = ge(el);
    var t = trim(el.value), w = ge('currinfo_warn');
    if (t.length > 140) {
      hide(cur.infoEditing ? 'currinfo_clear' : 'currinfo_about');
      w.innerHTML = getLang('text_exceeds_symbol_limit', t.length - 140);
      show(w);
    } else if (t.length > 100) {
      hide(cur.infoEditing ? 'currinfo_clear' : 'currinfo_about');
      w.innerHTML = getLang('text_N_symbols_remain', 140 - t.length)
      show(w);
    } else if (isVisible(w)) {
      hide(w);
      show(cur.infoEditing ? 'currinfo_clear' : 'currinfo_about');
    }
  },
  infoSave: function(txt) {
    if (cur.viewAsBox) return cur.viewAsBox();
    if (txt == cur.infoOld) {
      return Profile.infoCancel();
    }
    txt = trim(txt).substr(0, 140);
    hide('currinfo_warn', 'currinfo_clear', 'currinfo_about');
    ajax.post('al_profile.php', {act: 'current_info', info: txt, hash: cur.options.info_hash}, {onDone: function() {
      hide('currinfo_progress');
      var c = txt ? 'my' : 'no', t = txt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;') || getLang('change_current_info');
      ge('current_info').innerHTML = ge('profile_current_info').firstChild.nextSibling.innerHTML = '<span class="' + c + '_current_info">' + t + '</span>';
      Profile.infoCancel();
      var el = ge('current_info'), tt = el.tt;
      if (tt && tt.el) {
        tt.destroy();
        removeEvent(el, 'mouseover');
      }
      if (txt) {
        addEvent(el, 'mouseover', Profile.infoShowShare);
        Profile.infoShowShare();
      }
    }, onFail: function(t) {
      if (!t) {
        Profile.infoCheck('currinfo_input');
        return true;
      }
    }, progress: 'currinfo_progress', stat: ['tooltips.js', 'tooltips.css']});
  },
  infoCheckSave: function(e) {
    e = e || window.event;
    if (e && e.type == 'keydown' && e.keyCode != 10 && e.keyCode != 13) {
      return;
    }
    Profile.infoSave(ge('currinfo_input').value);
  },
  showFans: function(ev) {
    if (cur.viewAsBox) return cur.viewAsBox();

    return !showTabbedBox('al_fans.php', {act: 'show_fans_box', oid: cur.oid}, {cache: 1}, ev);
  },
  showIdols: function(ev) {
    if (cur.viewAsBox) return cur.viewAsBox();

    return !showTabbedBox('al_fans.php', {act: 'show_idols_box', oid: cur.oid}, {cache: 1}, ev);
  },
  showPublics: function(ev) {
    if (cur.viewAsBox) return cur.viewAsBox();

    return !showTabbedBox('al_fans.php', {act: 'show_publics_box', oid: cur.oid}, {cache: 1}, ev);
  },
  showClassHint: function(text) {
    var cl = ge('profile_class');
    if (!cl) return;

    var hint = cur.classhint = bodyNode.appendChild(ce('div', {id: 'profile_class_hint', innerHTML: '\
<table cellspacing="0" cellpadding="0">\
  <tr>\
    <td rowspan="2"><div class="pointer"></div></td>\
    <td><div class="content">' + text + '</div></td>\
  </tr>\
  <tr><td><div class="bottom"></div></td></tr>\
</table>'}, {display: 'none'}));

    var xy = getXY(cl), elsize = getSize(cl);

    hint.style.opacity = 0;
    show(hint);
    var size = getSize(hint);

    var top = xy[1] - Math.floor((size[1] - elsize[1]) / 2);
    var newleft = xy[0] + (vk.rtl ? -(size[0] + 10) : (elsize[0] + 10));
    hint.style.left = (newleft + (vk.rtl ? -10 : 10)) + 'px';
    hint.style.top = top + 'px';

    var showhint = animate.pbind(hint, {left: newleft, opacity: 1}, 500, false), img = vkImage();
    img.onload = showhint;
    img.src = '/images/classhint.gif';

    cur.destroy.push(function(c) {
      if (c.classhint && c.classhint.parentNode) {
        c.classhint.parentNode.removeChild(c.classhint);
        c.classhint = false;
      }
    });
    if (cur._back) {
      cur._back.hide.push(function() {
        if (cur.classhint && cur.classhint.parentNode) {
          cur.classhint.parentNode.removeChild(cur.classhint);
          cur.classhint = false;
        }
      });
    }
  },

  init: function(opts) {
    extend(cur, {
      module: 'profile',
      options: opts,
      oid: opts.user_id,
      postTo: opts.user_id,
      editing: false,
      viewAsBox: opts.view_as ? function() {
        setTimeout(showFastBox(getLang('global_warning'), cur.options.view_as).hide, 2000);
        return false;
      } : false,
      _back: opts.view_as ? false : {loc: opts.loc, show: [], hide: [], text: opts.back}
    });
    if (opts.mail_cache) {
      ajax.preload('al_mail.php', {act: 'write_box', to: cur.oid}, opts.mail_cache)
    }
    for (var i = 0; i < opts.photos.length; ++i) {
      vkImage().src = opts.photos[i][0];
    }
    if (ge('profile_wall')) {
      wall.init(extend(opts, {automore: 1}));
    }
    if (opts.class_hint) {
      cur.clHintTimer = setTimeout(Profile.showClassHint.pbind(opts.class_hint), 1000);
    }
    if (opts.invite_hint) {
      cur.invHintTimer = setTimeout(function() {
        var hint = ge('top_invite_hint');
        showTooltip(hint, {
          text: opts.invite_hint,
          slide: 30,
          shift: [vk.rtl ? -220 : 0, 0, 0],
          showdt: 0,
          showsp: 500,
          forcetodown: true,
          className: 'invite_tt'
        });
        cur.tsUpdated = Profile.inviteHintUpdate;
        stManager.add(['tooltips.css', 'tooltips.js'], cur.tsUpdated);
      }, 1000);
    }
    (cur._back ? cur._back.hide : cur.destroy).push(function(c) {
      clearTimeout((c || cur).clHintTimer);
      clearTimeout((c || cur).invHintTimer);
    });

    setTimeout(function () {
      if (window.FastChat && (window.curFastChat && curFastChat.inited || window.curNotifier && curNotifier.fc !== undefined)) {
        show('profile_fast_chat');
      }
    }, 100);
    var _a = window.audioPlayer;
    if (_a && _a.id && _a.showCurrentTrack) _a.showCurrentTrack();
  },
  inviteHintUpdate: function() {
    var hint = ge('top_invite_hint');
    if (!hint || !hint.tt || !hint.tt.container) return;
    var lnk = isVisible('ts_wrap') ? ge('ts_settings') : ge('top_invite_link'), l = 0, r = 0;
    if (vk.rtl) {
      r = (413 - lnk.parentNode.parentNode.offsetLeft - (lnk.offsetWidth / 2)) + 'px';
    } else {
      l = (lnk.parentNode.parentNode.offsetLeft + (lnk.offsetWidth / 2) - 370) + 'px';
    }
    geByClass1('top_pointer', hint.tt.container).style.margin = '0px ' + r + ' 0px ' + l;
  }
}, profile = Profile;

try{stManager.done('profile.js');}catch(e){}
