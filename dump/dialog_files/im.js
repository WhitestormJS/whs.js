var IM = {
  updateUnread: function (newmsg) {
    handlePageCount ('msg', newmsg);
  },
  peerToId: function(peer) {
    if (peer > 2e9) {
      return 'c' + (peer - 2e9);
    } else if (!IM.r(peer) && peer < -2e9) {
      return 'e' + (-peer - 2e9);
    } else {
      return peer;
    }
  },
  updateLoc: function (ret) {
    var peers = [], newLoc = {'0': 'im'};
    if (cur.peer == -2) {
      newLoc.q = cur.searchQ;
    } else {
      newLoc.sel = IM.peerToId(cur.peer);
    }
    var curLoc = nav.strLoc;
    for (var i in cur.tabs) {
      if (cur.peer == i) continue;
      peers.push(IM.peerToId(i));
    }
    if (peers.length) {
      newLoc.peers = peers.join('_');
    }
    if (ret) {
      return nav.toStr(newLoc);
    }

    if (newLoc == curLoc) return;
    clearTimeout(cur.setLocTO);
    cur.setLocTO = setTimeout(function () {
      if (nav.strLoc == curLoc) {
        nav.setLoc(newLoc);
      }
    }, 500);
  },
  scroll: function(toTop) {
    if (!IM.fixedScroll && !IM.r()) {
      cur.imEl.rows.scrollTop = toTop ? 0 : cur.imEl.rows.scrollHeight;
    } else {
      var st = 0;
      if (!toTop) {
        var winH = window.innerHeight || document.documentElement.clientHeight,
            contOH = cur.imEl.cont.offsetHeight,
            headH = cur.imEl.head.clientHeight,
            imNavH = cur.imEl.nav.offsetHeight;
        st = contOH - winH + headH + imNavH;
      }
      debugLog('scroll to', st);
      // console.trace();
      scrollToY(st, 0);
    }
    IM.updateScroll();
  },

  scrollAppended: function (appendedH) {
    var winH = window.innerHeight || document.documentElement.clientHeight,
        contentST = scrollGetY(),
        contentSH = Math.max(intval(bodyNode.scrollHeight), intval(pageNode.scrollHeight), intval(htmlNode.scrollHeight));

    // debugLog('scroll appended check', contentST, contentSH, winH, appendedH, contentST > contentSH - winH - (appendedH || 0) - 200);
    if (contentST > contentSH - winH - (appendedH || 0) - 200) {
      IM.scrollOn();
      IM.updateScroll();
    }
  },

  scrollOn: function(toTop) {
    clearTimeout(cur.scrollTO);
    IM.scroll(toTop);
    cur.scrollTO = setTimeout(IM.scroll.bind(IM).pbind(toTop), 100);
    // clearInterval(cur.scrollInt);
    // if (toTop) {
    //   return;
    // }
    // cur.scrollTO = setTimeout(IM.scroll.bind(IM).pbind(toTop), 1000);
    // cur.scrollInt = setInterval(IM.scroll.bind(IM).pbind(toTop), 300);
    // cur.scrollTO = setTimeout(function () {
    //   clearInterval(cur.scrollInt);
    //   IM.updateScroll();
    // }, 2000);
    // IM.scroll(toTop);
    // IM.updateScroll();
  },

  error: function(error, peer) {
    if (IM.r()) return;
    var errorEl = ge('im_error' + (peer || cur.peer));
    if (!errorEl) return;
    errorEl.innerHTML = error;
    show(errorEl);
    IM.scrollOn();
  },

  mkdate: function(raw) {
    var result = new Date(raw * 1000), now_time = new Date(), pad = function(num) {
      return ((num + '').length < 2) ? ('0' + num) : num;
    }
    if (result.getDay() == now_time.getDay()) {
      return pad(result.getHours()) + ':' + pad(result.getMinutes()) + ':' + pad(result.getSeconds());
      // return trim(result.toLocaleTimeString().match(/([\d.:amp ]+)/)[1]);
    }
    return pad(result.getDate()) + '.' + pad(result.getMonth()+1) + '.' + (result.getFullYear() + '').substr(2);
  },

  mknotonline: function(sex, name) {
    if (!sex || sex == 2) {
      return lang.mail_im_not_online[1].replace('{user}', name).replace(/\..+$/, '.');
    } else {
      return lang.mail_im_not_online[2].replace('{user}', name).replace(/\..+$/, '.')
    }
  },

  updateOnline: function(is_online) {
    val('im_status_holder', is_online ? getLang('global_online_sm') : '')
    if (is_online && !IM.typing) {
      ge('im_status').style.color = '#F2F2F2';
    }
  },

  getTable: function(peer) {
    return ge('im_log' + peer);
  },

  esc: function(msg) {
    return msg.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(new RegExp('>', 'g'), '&gt;').replace(/\"/g, '&quot;').replace(/\n/g, '<br>');
  },
  goodTitle: function(title, peer) {
    return peer < 2e9 && title && !title.match(/^\s*(Re(\(\d*\))?\:)?\s*\.\.\.\s*$/);
  },

  addMsg: function(peer_id, after_id, msg_id, status, out, title, message, date, kludges, delayed) {
    re('mess' + msg_id);
    full_date = date ? IM.mkdate(date) : '';
    var peer_data = cur.tabs[peer_id].data, actual_peer = kludges.from || false;
    if (peer_id > 2e9 && actual_peer < 2e9 && actual_peer) {
      if (!peer_data.members[actual_peer]) {
        if (!delayed) {
          cur.tabs[peer_id].delayed.push([peer_id, after_id, msg_id, status, out, title, message, date, kludges, true]);
          IM.updateChat(peer_id);
        }
        return;
      }
    }
    var i = 1, media_html = '';
    while (kludges['attach' + i + '_type']) {
      media_html += '<div class="progress im_media_progress im_' + kludges.attach1_type + '_filler" style="display: block;"></div>';
      i++;
    }
    if (kludges.geo) {
      media_html += '<div class="progress im_media_progress im_map_filler" style="display: block;"></div>';
    }
    if (kludges.fwd) {
      media_html += '<div class="progress im_media_progress im_forward_filler" style="display: block;"></div>';
    }
    if (media_html) {
      message += '<div id="im_msg_media' + msg_id + '" class="wall_module">' + media_html + '</div>';
      if (msg_id > 0) IM.loadMedia(msg_id, peer_id);
    }

    if (IM.goodTitle(title, peer_id)) {
      message = '<div class="im_subj">' + title + '</div>' + message;
    }
    message = message.replace(/((https?:\/\/)?)((([A-Za-z0-9][A-Za-z0-9\-\_\.]*[A-Za-z0-9])|(([à-ÿÀ-ß0-9\-\_\.]+\.ðô)))(\/([A-Za-zÀ-ßà-ÿ0-9\-\_#%&?+\/\.=;]*[^\.\,;\(\)\?\<\&\s])?)?)/ig, function () {
      var domain = arguments[4], url = arguments[3], full = arguments[0], protocol = arguments[1] || 'http://', attrUrl = url.replace(/"/g, '&quot;');

      if (domain.indexOf('.') == -1) return full;
      var topDomain = domain.split('.').pop();
      if (topDomain.length > 5 || indexOf('aero,asia,biz,com,coop,edu,gov,info,int,jobs,mil,mobi,name,net,org,pro,tel,travel,xxx,ru,ua,su,ðô,fi,fr,uk,cn,gr,ie,nl,au,co,gd,im,cc,si,ly,gl'.split(','), topDomain) == -1) return full;

      if (full.length > 55) {
        full = full.substr(0, 52) + '...';
      }

      if (domain.match(/^([a-zA-Z0-9\.\_\-]+\.)?(vkontakte\.ru|vk\.com|vk\.cc|vkadre\.ru|vshtate\.ru)$/)) {
        return '<a href="'+ protocol + attrUrl + '" target="_blank">' + full + '</a>';
      }
      return '<a href="away.php?utf=1&to=' + encodeURIComponent(protocol + url) + '" target="_blank" onclick="return goAway(\''+ protocol + attrUrl+'\', {}, event);">' + full + '</a>';
    });

    var hist = IM.getTable(peer_id), maxIndex = hist.rows.length, index;
    if (after_id == -1) {
      index = maxIndex;
    } else {
      if (after_id) {
        var prev_row = ge('mess' + after_id);
        index = Math.min(maxIndex, prev_row.rowIndex + 1);
      } else {
        index = 0;
      }
    }

    var img_class = 'img';
    var classNames = [out ? 'im_out' : 'im_in', 'im_msg_from' + (actual_peer || (out ? cur.id : peer_id))];
    if (status > 1) classNames.push('im_new_msg');
    if (index && hasClass(hist.rows[index - 1], classNames[1]) && (date - intval(ge('im_date' + hist.rows[index - 1].id.substr(4)).value) < 300)) {
      classNames.push('im_add_row');
    }
    if (index < hist.rows.length && hasClass(hist.rows[index], classNames[0]) && (intval(ge('im_date' + hist.rows[index].id.substr(4)).value) - date < 300)) {
      removeClass(hist.rows[index], 'im_add_row');
    }

    var row = hist.insertRow(index), user, author_html;
    row.id = 'mess' + msg_id;

    row.className = classNames.join(' ');

    if (peer_data && actual_peer && (user = peer_data.members[actual_peer])) {
      author_html = '<div class="im_log_author_chat_thumb"><a href="' + user.link + '"><img src="' + user.photo + '" class="im_log_author_chat_thumb" /></a></div>';
      message = '<div class="im_log_author_chat_name"><a href="' + user.link + '" class="mem_link" onclick="return nav.go(this, event);">'+ user.name + '</a></div>' + message;
      user = [user.link, user.photo, user.name];
    } else {
      if (out) {
        user = ['/id' + cur.id, cur.photo, cur.name]
      } else {
        if (peer_id < -2e9) {
          if (cur.peer > 2e9) {
            var link = '/im?email='+encodeURIComponent(user.name);
          } else {
            var link = '/im?sel=e'+(-peer_id - 2e9);
          }
        } else {
          var link = '/id' + peer_id;
        }
        user = [link, cur.tabs[peer_id].photo, cur.tabs[peer_id].name];
      }
      author_html = '<div class="im_log_author_chat_thumb"><a href="' + user[0] + '"><img src="' + user[1] + '" class="im_log_author_chat_thumb" /></a></div>';
      message = '<div class="im_log_author_chat_name"><a href="' + user[0] + '" class="mem_link" onclick="return nav.go(this, event);">'+ user[2] + '</a></div>' + message;
    }
    var actions_html = '';
    if (msg_id > 0) {
      actions_html = '<div id="ma'+msg_id+'" class="im_log_check_wrap"><div class="im_log_check" id="mess_check'+msg_id+'"></div></div>';
      addEvent(row, 'mouseover', IM.logMessState.pbind(1, msg_id));
      addEvent(row, 'mouseout', IM.logMessState.pbind(0, msg_id));
      row.onclick = function (e) {if (!IM.checkLogClick(this, e || window.event)) IM.checkLogMsg(msg_id)};
    } else {
      actions_html  = '<div id="ma' + msg_id + '" style="visibility: visible;"><div class="progress" id="mprg' + msg_id + '"></div></div>';
    }

    row.insertCell(0).innerHTML = actions_html;
    row.insertCell(1).innerHTML = author_html;
    row.insertCell(2).innerHTML = '<div class="wrapped">' + message + '</div>';

    var dateLink = msg_id > 0 ? '<a class="im_date_link" href="/mail?act=show&id=' + msg_id + '" onclick="return nav.go(this, event);">' + full_date + '</a>' : '<span>' + full_date + '</span>';
    row.insertCell(3).innerHTML = dateLink + '<input type="hidden" id="im_date' + msg_id + '" value="' + date + '" />';

    row.insertCell(4).className = 'im_log_rspacer';

    row.cells[0].className = 'im_log_act';
    row.cells[1].className = 'im_log_author';
    row.cells[2].className = 'im_log_body';
    row.cells[3].className = 'im_log_date';

    if (status > 1 && !out) {
      addEvent(row, 'mouseover', IM.onNewMsgOver.pbind(peer_id, msg_id));
    }
    if (index == maxIndex && cur.peer == peer_id) {
      IM.scrollAppended(row.offsetHeight);
    }

    hide('im_none' + peer_id);
    show('im_log' + peer_id);
  },

  loadMedia: function (msg_id, peer_id) {
    ajax.post('al_im.php', {act: 'a_get_media', id: msg_id}, {
      onDone: function (content) {
        var cont = ge('im_msg_media' + msg_id);
        if (!cont) return;
        cont.innerHTML = content;
        if (cur.peer == peer_id)
          IM.scrollAppended(0);
      },
      onFail: function () {
        var cont = ge('im_msg_media' + msg_id);
        hide(cont);
      }
    });
  },

  loadHistoryScroll: function (sh, st, all_shown) {
    var curSh = browser.msie6 ? intval(pageNode.scrollHeight) : (intval(htmlNode.scrollHeight) || intval(bodyNode.scrollHeight)),
        curSt = st + (curSh - sh);
    if (all_shown) {
      curSt -= 55;
    }
    scrollToY(curSt, 0);
  },

  loadHistory: function(peer_id, more) {
    if (!cur.tabs[peer_id] || cur.tabs[peer_id].loadingHistory) return false;
    cur.tabs[peer_id].loadingHistory = true;

    ajax.post('al_im.php', {act: 'a_history', peer: peer_id, offset: more ? cur.tabs[peer_id].msg_count : 0, whole: more == 2 ? 1 : 0}, {
      onDone: function (html, msgs, all_shown, newmsg) {
        if (!cur.tabs[peer_id]) {
          return;
        }
        cur.tabs[peer_id].loadingHistory = false;
        var table = ge('im_log' + peer_id);
        if (!table) {
          // fail!
          return;
        }
        var cur_rows = geByTag1('tbody', table);
        var new_t = se(html),
            new_rows = geByTag1('tbody', new_t),
            before_row = cur_rows.firstChild, add_row, row_id;

        if (more) {
          doScroll = IM.loadHistoryScroll.bind(IM).pbind(
            browser.msie6 ? pageNode.scrollHeight : (intval(htmlNode.scrollHeight) || intval(bodyNode.scrollHeight)),
            scrollGetY(),
            all_shown
          );
        } else {
          doScroll = IM.scrollOn.bind(IM).pbind(false);
        }
        table.parentNode.insertBefore(new_t, table);
        doScroll();
        if (more && all_shown) hide('im_more' + peer_id);
        IM.updateScroll();

        setTimeout(function () {
          while (add_row = new_rows.firstChild) {
            if (!add_row.id.match(/mess\d+/)) {
              new_rows.removeChild(add_row);
              continue;
            }
            row_id = add_row.id;
            add_row.id = '';
            if (ge(row_id)) {
              new_rows.removeChild(add_row);
              continue;
            }
            add_row.id = row_id;
            cur_rows.insertBefore(add_row, before_row);
          }
          re(new_t);
          IM.updatePeer(peer_id, msgs, all_shown);
          //IM.onWheel();
          if (!more) {
            IM.readLastMsgs();
            debugLog('upd scroll');
            doScroll();
          }
          if (cur.peer == peer_id) IM.applyPeer();
        }, 0);
        doScroll();
        IM.updateUnread(newmsg);
      },
      onFail: function () {
        cur.tabs[peer_id].loadingHistory = false;
      }
    });
    return false;
  },
  deleteHistory: function (peer, hash) {
    var box = false, hash = hash || cur.tabs[peer].hash, succ = function () {
      cur.flushing_peer = peer;
      ajax.post('/al_mail.php', {act: 'a_flush_history', hash: hash, id: peer, from: 'im'}, {
        onDone: function (res, text) {
          cur.flushing_peer = false;
          if (cur.tabs[peer]) {
            IM.closeTab(peer);
          }
          re('im_dialog' + peer);
          box && box.hide();
          if (peer < -2e9) {
            delete cur.emails[peer+'_'];
            IM.cacheFriends();
          }
          showDoneBox(text);
        },
        showProgress: box && box.showProgress,
        hideProgress: box && box.hideProgress
      });
    };
    box = showFastBox(getLang('mail_deleteall1'), getLang('mail_sure_to_delete_all'), getLang('mail_delete'), succ, getLang('mail_close'), box.hide);
  },
  deleteDialog: function (peer, hash) {
    re('im_deleted_dialog' + peer);
    var tab = cur.tabs[peer],
        del = geByClass1('dialogs_del', ge('im_dialog' + peer), 'div');

    if (del && del.tt && del.tt.el) {
      del.tt.destroy();
    }
    if (tab) {
      var foundMine = false;
      each(tab.msgs || [], function (id, msg) {
        if (id && msg && (foundMine = msg[0])) {
          debugLog('mine', id, msg[0], msg[1]);
          return false;
        }
      });
      if (foundMine) {
        IM.deleteHistory(peer);
        return;
      }
      if (!hash) {
        hash = tab.hash || '';
      }
    }
    ajax.post('al_im.php', {act: 'a_delete_dialog', peer: peer, hash: hash}, {
      onDone: function (result, hash) {
        if (result) {
          var el = ge('im_dialog' + peer),
              newEl = se('<div class="dialogs_row dialogs_deleted_row" id="im_deleted_dialog' + peer + '">' + val(el) + '</div>');
          cur.deletedDialogs[peer] = el;
          el.parentNode.replaceChild(newEl, el);
          val(geByClass1('dialogs_msg_body', newEl, 'div'), result);
        } else {
          IM.deleteHistory(peer, hash);
        }
      }
    });
  },
  spamDialog: function (peer, hash) {
    ajax.post('al_im.php', {act: 'a_spam_dialog', peer: peer, hash: hash}, {
      onDone: function (result) {
        val(geByClass1('dialogs_msg_body', ge('im_deleted_dialog' + peer), 'div'), result);
      }
    });
  },
  restoreDialog: function (peer, hash, spam) {
    ajax.post('al_im.php', {act: 'a_restore_dialog', peer: peer, hash: hash, spam: spam}, {
      onDone: function (result) {
        var el = ge('im_deleted_dialog' + peer);
        el.parentNode.replaceChild(cur.deletedDialogs[peer], el);
        delete cur.deletedDialogs[peer];
      }
    });
  },

  startChatWith: function (peer) {
    IM.activateTab(0, 1);
    cur.multi = true;
    cur.multi_friends = {};
    cur.multi_friends[peer] = 1;
    IM.updateTopNav();
    IM.updateFriends(true);
    setTimeout("if (!cur.peer) elfocus('im_filter')", browser.msie ? 100 : 0);
  },

  send: function() {
    var peer = cur.peer,
        peerMedia = cur.imPeerMedias[peer] || [],
        peerTab = cur.tabs[peer],
        txt = ge('im_txt' + peer);
    if (!peer || !txt || txt.disabled) return;

    var msg = val(txt), title = isVisible('im_title_wrap' + peer) && val('im_title' + peer) || '';
    if (!trim(msg).length && !peerMedia.length) {
      ge('im_txt' + peer).focus();
      return;
    }
    if (peerTab.sending) {
      return;
    }
    peerTab.sending = true;

    var msg_id = --peerTab.sent,
        params = {act: 'a_send', to: peer, hash: peerTab.hash, msg: msg, title: title, ts: cur.ts},
        media = [], kludges = {}, i = 1;

    if (peerMedia) {
      each(peerMedia, function (k, v) {
        if (!v) return;
        media.push(v[0] + ':' + v[1]);
        if (v[0] == 'mail') {
          kludges.fwd = v[1];
        } else {
          kludges['attach' + i + '_type'] = v[0];
          kludges['attach' + i] = v[1];
        }
      });
      params.media = media.join(',');
      cur.imPeerMedias[peer] = false;
      IM.restorePeerMedia(peer);
    }
    if (cur.imMedia) {
      var lnk = cur.imMedia.lnkId;
      show(geByClass('add_media_type_'+lnk+'_map', ge('add_media_menu_'+lnk))[0]);
    }
    ajax.post('al_im.php', params, {
      onDone: function(response) {
        peerTab.sending = false;

        if (response.version && intval(response.version) > IM.version) {
          document.location = IM.updateLoc(true);
          return;
        }

        var msg_row = ge('mess' + msg_id), new_msg_id = response.msg_id;
        if (!msg_row) return;

        ++peerTab.msg_count;

        var i = peerTab.new_msgs.length;
        while (i--) {
          if (peerTab.new_msgs[i] == msg_id) {
            peerTab.new_msgs[i] = peerTab.new_msgs.pop();
            break;
          }
        }

        msg_row.cells[3].innerHTML = '<a class="im_date_link" href="/mail?act=show&id=' + new_msg_id + '" onclick="return nav.go(this, event);">' + IM.mkdate(response.date + cur.tsDiff) + '</a><input type="hidden" id="im_date' + new_msg_id + '" value="' + response.date + '" />';
        msg_row.id = 'mess' + new_msg_id;
        msg_row.cells[0].innerHTML = '<div id="ma'+new_msg_id+'" class="im_log_check_wrap"><div class="im_log_check" id="mess_check'+new_msg_id+'"></div></div>';
        addEvent(msg_row, 'mouseover', IM.logMessState.pbind(1, new_msg_id));
        addEvent(msg_row, 'mouseout', IM.logMessState.pbind(0, new_msg_id));
        msg_row.onclick = function (e) {if (!IM.checkLogClick(this, e || window.event)) IM.checkLogMsg(new_msg_id)};

        if (peerMedia) {
          var cont = ge('im_msg_media' + msg_id);
          if (cont) {
            cont.innerHTML = response.media || '';
          }
          IM.scroll();
        }

        peerTab.msgs[new_msg_id] = [1, 1];
        if (cur.peer == peer) IM.updateOnline(response.online);
        IM.updateUnread(response.newmsg);
      },
      onFail: function(error) {
        peerTab.sending = false;
        IM.error(error || getLang('global_unknown_error'));

        ge('im_txt' + peer).focus();
        ge('im_txt' + peer).value = msg;
        if (title) {
          show('im_title_wrap' + peer);
        }

        if (peerMedia) {
          cur.imPeerMedias[peer] = peerMedia;
          IM.restorePeerMedia(peer);
        }
        peerTab.txt.update();

        var msg_row = ge('mess' + msg_id);
        if (!msg_row) return;
        re('mprg' + msg_id);
        msg_row.cells[3].innerHTML = '<span class="im_log_date_error">' + getLang('global_error') + '</span><input type="hidden" id="im_date' + msg_row.id.substr(4) + '" value="0" />';
        IM.scroll();
        return true;
      }
    });

    hide('im_error' + peer, 'im_title_wrap' + peer);
    var rowMsg = IM.esc(msg), rowTitle = IM.esc(title);
    if (peerTab.data) {
      kludges.from = cur.id;
    }

    peerTab.new_msgs.push(msg_id);
    IM.addMsg(peer, -1, msg_id, 2, 1, rowTitle, rowMsg, Math.floor((new Date()).getTime() / 1000), kludges);
    setTimeout(function () {
      var prg = ge('mprg' + msg_id);
      if (prg) {
        setStyle(prg, {visibility: 'visible', display: 'block'});
      }
    }, 5000);
    IM.scroll();

    ge('im_txt' + peer).value = '';
    peerTab.txt.update();
    ge('im_txt' + peer).focus();
    IM.updateTopNav();
  },

  feed: function(peer, events) {
    var show_new = false, lastMsg = false;
    if (!cur.tabs[peer] || cur.tabs[peer].msgs === undefined) {
      return;
    }
    for (var i in events) {
      var msg = events[i], row = ge('mess' + i);
      if (!msg[0] && row) { // Existing message was deleted
        if (cur.deletedRows[i]) {
          continue;
        }
        var hist = IM.getTable(peer);
        var index = row.rowIndex;
        hist.deleteRow(index);

        if (!cur.tabs[peer].msgs[i][0] && cur.tabs[peer].msgs[i][1]) {
          --cur.tabs[peer].unread;
        }
        --cur.tabs[peer].msg_count;
        cur.tabs[peer].msgs[i] = false;
      } else if (msg[0]) {
        var new_unread = (!msg[1] && msg[0] > 1), cur_msg = cur.tabs[peer].msgs[i];
        if (cur_msg && new_unread && (cur_msg[0] || cur_msg[1])) {
          new_unread = false;
        }
        show_new = show_new || new_unread;
        if (!row) { // New message appeared
          if (cur.tabs[peer].new_msgs.length) {
            each (cur.tabs[peer].new_msgs, function (k, v) {
              re('mess' + v);
            });
          }

          var table = IM.getTable(peer);
          var j, after_id, first = 0, last = table.rows.length;
          while (last - first > 1) {
            var middle = Math.floor((last + first) / 2);
            var msg_id = intval(table.rows[middle].id.substr(6));
            if (msg_id < i) {
              first = middle;
            } else {
              last = middle;
            }
          }
          after_id = -1;
          if (table.rows[first])
            after_id = intval(table.rows[first].id.substr(4));
          lastMsg = [i, msg[0], msg[1], msg[2], msg[3], msg[4], msg[5]];
          IM.addMsg(peer, after_id, i, msg[0], msg[1], msg[2], msg[3], msg[4] + cur.tsDiff, msg[5]);
          ++cur.tabs[peer].msg_count;
          if (new_unread) {
            ++cur.tabs[peer].unread;
            if (cur.notify_on && IM.focused != peer) {
              IM.notify(peer, msg);
            }
          }
          cur.tabs[peer].msgs[i] = [msg[1], (msg[0] > 1) ? 1 : 0];
        } else if (cur.tabs[peer].msgs[i]) { // Existing message changed read status
          var out = cur.tabs[peer].msgs[i][0], unread = cur.tabs[peer].msgs[i][1];
          if (msg[0] > 1 && !unread) { // Existing message became unread
            addClass(row, 'im_new_msg');
            if (!out) {
              addEvent(row, 'mouseover', IM.onNewMsgOver.pbind(peer, i));
              ++cur.tabs[peer].unread;
            }
            cur.tabs[peer].msgs[i][1] = 1;
          } else if (msg[0] < 2 && unread) { // Existing message became read
            removeClass(row, 'im_new_msg');
            if (!out) {
              removeEvent(row, 'mouseover');
              addEvent(row, 'mouseover', IM.logMessState.pbind(1, i));
              --cur.tabs[peer].unread;
              --cur.unreadMsgs;
            }
            cur.tabs[peer].msgs[i][1] = 0;

            if (msg[1] && cur.peer == peer && peer < 2e9) { // If existing icoming became read, so user is typing
              val('im_status', langSex(cur.tabs[peer].sex, cur.lang.mail_im_typing).replace('{user}', cur.tabs[peer].name));
              ge('im_status').style.color = '#777777';
              IM.typing = setTimeout(function() {
                IM.typing = animate(ge('im_status'), {color: '#F2F2F2'}, 1000, function() { IM.typing = false; });
              }, 2000);
            }
          }
        }
      }
    }
    if (cur.tabs[peer].msg_count) {
      hide('im_none' + peer);
      show('im_log' + peer);
    } else {
      show('im_none' + peer);
      hide('im_log' + peer);
    }
    IM.updateUnreadMsgs();
    if (!IM.focused) {
      if (!cur.titleTO && cur.unreadMsgs) {
        cur.titleTO = setInterval(IM.changeTitle, 1000);
      }
    }
    if (IM.focused != peer && show_new && IM.sound && !IM.sound_off && ls.get('sound_notify_off') !== 1) {
      IM.sound.play();
    }
    if (cur.tabs[peer].unread) {
      if (cur.peer != peer) {
        val('im_unread' + peer, '&nbsp;<b>(</b>' + cur.tabs[peer].unread + '<b>)</b>');
        if (show_new) {
          addClass(ge('im_tab' + peer), 'im_tab_over');
        }
        IM.updateScroll();
      } else if (show_new && cur.friends[peer + '_']) {
        IM.updateOnline(1);
      }
    } else {
      if (cur.peer != peer && cur.tabs[peer].auto) {
        IM.closeTab(peer);
      } else {
        val('im_unread' + peer, '');
        if (cur.peer === peer) {
          setTimeout(IM.scroll.pbind(false), 100);
        }
        removeClass(ge('im_tab' + peer), 'im_tab_over');
      }
    }

    var tab;
    if (lastMsg && (tab = cur.tabs[peer]) && !tab.loading) { // Updating dialogs rows
      var repls = {
            peer: peer,
            timestamp: lastMsg[5],
            body_class: lastMsg[1] && lastMsg[2] && 'dialogs_new_msg' || '',
            row_class: lastMsg[1] && !lastMsg[2] && 'dialogs_new_msg' || '',
            online: ''
          },
          ampm = '',
          date = new Date(repls.timestamp * 1000),
          hours = date.getHours(),
          minutes = date.getMinutes(),
          title = lastMsg[3],
          body = lastMsg[4],
          inlineAuthor = '',
          numhours;

      // Date
      if (cur.time_system) {
        ampm = cur.time_system[hours > 11 ? 1 : 0];
        hours = (hours % 12) || 12;
      }
      numhours = hours > 9 ? hours : ('0' + hours);
      repls.date = getLang('mail_im_row_date_format').replace('{am_pm}', ampm).replace('{hour}', hours).replace('{num_hour}', numhours).replace('{minute}', minutes);

      body = body.replace(/(<br\s?\/?>){3,}/gi, '<br/><br/>');
      var brMatches = body.match(/^(.*?<br>)(.*<br>.*)$/);
      if (brMatches) {
        body = brMatches[1] + brMatches[2].replace(/<br>/g, ' ');
      }

      // Msg body
      var prevLen = 90;
      title = IM.goodTitle(title, peer) ? title : '';
      if (title) {
        if (title.length > 48) {
          title = title.substr(0, 48) + '..';
        }
        title = '<div class="im_subj">' + title + '</div>';
        prevLen = 40;
        body = body.replace(/<br>/g, ' ');
      }
      if (body.length > prevLen) {
        body = body.substr(0, prevLen) + '..';
      }
      body = title + body;
      // Attachment
      if (lastMsg[6].attach1_type) {
        body += '<div class="im_row_attach"><div class="im_attach_' + lastMsg[6].attach1_type + '"></div>' + getLang('mail_added_' + lastMsg[6].attach1_type) + '</div>';
      } else if (lastMsg[6].fwd) { // Forwarded mail
        body += '<div class="im_row_attach"><div class="im_attach_mail"></div>' + (lastMsg[6].fwd.match(/,\(/) ? getLang('mail_added_msgs') : getLang('mail_added_msg')) + '</div>';
      }
      // Inline author
      if (lastMsg[2] || lastMsg[6].from) {
        if (!lastMsg[2]) {
          body = '<div class="dialogs_chat_title">' + tab.data.members[lastMsg[6].from].name + '</div>' + body;
        }
        inlineAuthor = '<img class="dialogs_inline_author fl_l" src="' + (lastMsg[2] ? cur.photo : tab.data.members[lastMsg[6].from].photo) + '" />';
      }

      if (peer < 2e9) {
        repls.photo = '<a href="/id'+peer+'" target="_blank" onclick="event.cancelBubble = true; return nav.go(this, event);" onmousedown="event.cancelBubble = true;"><img src="' + tab.photo + '" /></a>';
        repls.user_link = '<a href="/id'+peer+'" target="_blank" onclick="event.cancelBubble = true; return nav.go(this, event);" onmousedown="event.cancelBubble = true;">' + tab.tab_text.replace('&nbsp;', ' ') + '</a>';
        if (!lastMsg[2] || cur.friends[peer + '_'] && cur.friends[peer + '_'].online) {
          repls.online = '<div class="dialogs_online">' + getLang('global_online') + '</div>';
        }
      } else {
        // Complicated photo and user link
        repls.user_link = '<a href="/im?sel='+peer+'" onclick="event.cancelBubble = true; if (!checkEvent(event)) {IM.addPeer('+peer+'); return false;}">' + tab.name + '</a>';
        repls.photo = tab.data.members_grid_small;
      }
      repls.body = body;
      repls.inline_author = inlineAuthor;
      re('im_dialog' + peer);
      var dRow = se(rs(cur.drow_template, repls)),
          cont = ge('im_dialogs'),
          insBefore = cont && cont.firstChild;
      while (insBefore) {
        if (hasClass(insBefore, 'dialogs_row') &&
            repls.timestamp > intval(insBefore.getAttribute('timestamp'))) {
          break;
        }
        insBefore = insBefore.nextSibling;
      }
      if (insBefore) {
        cont.insertBefore(dRow, insBefore);
      }
    }
  },
  updateUnreadMsgs: function () {
    cur.unreadMsgs = 0;
    for (var i in cur.tabs) {
      cur.unreadMsgs += cur.tabs[i].unread;
    }
    val('im_unread_count', cur.unreadMsgs ? ' (<b>' + cur.unreadMsgs + '</b>)' : '');
  },
  updateUnreadSpam: function () {
    val('im_spam_cnt', cur.spam.unread ? ' (<b>' + cur.spam.unread + '</b>)' : '');
  },

  getKey: function() {
    cur.lastOperation = vkNow();

    cur.key = false;
    if (cur.keyReq) {
      try {
        cur.keyReq.abort();
      } catch (e) {}
    }

    cur.keyReq = ajax.post('al_im.php', {act: 'a_get_key', uid: cur.id}, {
      onDone: function (key, newmsg) {
        key = trim(key);
        if (/[0-9a-f]{40}/i.test(key)) {
          cur.key = key;
          IM.check();
        } else {
          IM.error(getLang('mail_im_auth_failed'));
        }
        IM.updateUnread(newmsg);
      },
      onFail: function (msg) {
        setTimeout(IM.getKey, cur.errorTimeout * 1000);
        debugLog('from getKey delaying getKey for ' + cur.errorTimeout + 'secs');
        if (cur.errorTimeout < 64) {
          cur.errorTimeout *= 2;
        }
      }
    });
  },

  checked: function(response) {
    // debugLog('checked', response);
    var failed = response.failed;
    if (failed == 1 || cur.ts >= response.ts + 256) {
      cur.ts = response.ts;
      for (var i in cur.tabs) {
        cur.tabs[i].history = false;
        hide('im_more' + i);
        var hist = geByTag1('tbody', ge('im_log' + i));
        while (hist && hist.firstChild) {
          re(hist.firstChild);
        }
        cur.tabs[i].msg_count = 0;
        cur.tabs[i].history = false;
        cur.tabs[i].unread = 0;
        cur.tabs[i].new_msgs = [];
        cur.tabs[i].msgs = {};
      }
      if (cur.peer) {
        IM.loadHistory(cur.peer);
      }
      if (failed) return true;
    } else if (failed == 2) {
      debugLog('delaying getKey for ' + cur.errorTimeout + 'secs');
      setTimeout(IM.getKey, cur.errorTimeout * 1000);
      if (cur.errorTimeout < 64) {
        cur.errorTimeout *= 2;
      }
      return false;
    } else if (failed) {
      throw getLang('global_unknown_error');
    }

    cur.ts = response.ts;
    var result = {};
    var update_chats = {};
    var modified_flags = {}; // if more than one event for one message
    if (response.updates) {
      for (var i in response.updates) {
        var update = response.updates[i],
            code = intval(update[0]),
            msg_id = intval(update[1]),
            flags = intval(update[2]),
            peer = intval(update[3]);

        if (code == 51) { // chat members or title were updated
          var peer = 2e9 + msg_id, tab = cur.tabs[peer];
          if (tab && !update_chats[peer] && (!(flags & 1) || vkNow() - intval(tab.lastModifiedTime) > 2000)) {
            update_chats[peer] = 1;
          }
          continue;
        }
        if (!peer) continue;

        if (code == 0 || code == 2 || code == 3) {
          if (!cur.tabs[peer] || !cur.tabs[peer].msgs) continue;
          var prev_msg = cur.tabs[peer].msgs[msg_id];
          if (!prev_msg) continue;
          var prev_flags = modified_flags[peer + '_' + msg_id] !== undefined ? modified_flags[peer + '_' + msg_id] : prev_msg[0] * 2 + prev_msg[1];
          // debugLog(update, prev_flags, prev_msg);
          if (code == 0) {
            flags = prev_flags | 128;
          } else if (code == 2) {
            flags = prev_flags | flags;
          } else if (code == 3) {
            flags = prev_flags & (~flags);
          }
          modified_flags[peer + '_' + msg_id] = flags;
        }
        if (flags & 4096) { // NO_CHAT
          flags = flags | 128;
        }
        if (flags & 64) { // SPAM
          flags = flags | 128;
        }
        if (!result[peer]) {
          result[peer] = {};
        }
        if (code == 2 && flags == 16384) {
          var status = 3;
        } else {
          var status = (flags & 128) ? 0 : ((flags & 1) ? 2 : 1);
        }
        if (status) {
          var msg = update[6];
          var title = update[5];
          var date = intval(update[4]);
          var out = (flags & 2) ? 1 : 0;
          if (ge('mess' + msg_id) || (msg !== undefined)) {
            result[peer][msg_id] = [status, out, title, msg, date, update[7] || {}];
          }
        } else {
          result[peer][msg_id] = [0];
        }
      }
    } else {
      result = response.result;
    }
    if (result) {
      for (var peer in result) {
        if (!intval(peer) || cur.flushing_peer == peer) continue;
        var events = result[peer];
        if (!cur.tabs[peer]) {
          var need_tab = false;
          for (var i in events) {
            if (events[i][0] > 1 && !events[i][1]) {
              need_tab = true;
              break;
            }
          }
          if (need_tab) {
            IM.addPeer(peer, events);
          }
          continue;
        }
        IM.feed(peer, events);
      }
    }
    for (var peer in update_chats) {
      IM.updateChat(peer, true);
    }
    return true;
  },

  check: function() {
    if (cur.imInited !== true) {
      return;
    }
    cur.lastOperation = vkNow();

    if (!IM.makeRequest) {
      setTimeout(IM.check, 1000);
      return;
    }
    try {
      IM.makeRequest(function(obj, text) {

        if (cur.id == 13033 || cur.id == 2943) {
          var success = IM.checked(eval('(' + text + ')'));
          if (success) {
            IM.check();
            cur.errorTimeout = 1;
          }
        } else {
        try {
          var success = IM.checked(eval('(' + text + ')'));
          if (success) {
            IM.check();
            cur.errorTimeout = 1;
          }
        } catch (e) {
          IM.error('Error: ' + e.message);
          try {
            debugLog('error', e.message || 'no message', e.type || 'no type', e.stack || 'no stack');
          } catch (e) {}

          setTimeout(IM.check, cur.errorTimeout * 1000);
          if (cur.errorTimeout < 64) {
            cur.errorTimeout *= 2;
          }
        }
        }
      }, function() {
        setTimeout(IM.check, cur.errorTimeout * 1000);
        if (cur.errorTimeout < 64) {
          cur.errorTimeout *= 2;
        }
      });
    } catch (e) {
      debugLog('makeRequest failed', e)
    }
  },

  checkConnection: function() {
    var timePassed = vkNow() - cur.lastOperation;
    if (timePassed > 60000 && timePassed > cur.errorTimeout * 1500) {
      if (!cur.key) {
        debugLog('gkey from check conn');
        IM.getKey();
      } else {
        debugLog('check from check conn');
        IM.check();
      }
    }
  },

  changeTitle: function() {
    if (!cur.unreadMsgs) return IM.restoreTitle();
    if (!IM.old_title) {
      IM.old_title = document.title;
      document.title = getLang('mail_im_new_messages', cur.unreadMsgs);
      var icon_num = cur.unreadMsgs > 9 ? 10 : cur.unreadMsgs;
      setFavIcon('/images/icons/fav_im' + icon_num + '.ico');
    } else {
      document.title = IM.old_title;
      IM.old_title = false;
      setFavIcon('/images/fav_chat.ico?1');
    }
  },

  restoreTitle: function() {
    if (IM.old_title) {
      setTimeout("document.title = '" + IM.old_title + "';", 200);
      setFavIcon('/images/fav_chat.ico?1');
      IM.old_title = false;
    }
    clearInterval(cur.titleTO);
    cur.titleTO = false;
  },

  markRead: function(peer, unread) {
    if (!unread.length) return;
    var curTab = peer == -4 ? cur.spam : cur.tabs[peer];
    curTab.markingRead = true;

    ajax.post('al_im.php', {act: 'a_mark_read', peer: peer, ids: unread, hash: curTab.hash}, {
      onDone: function (res, newmsg) {
        curTab.markingRead = false;

        for (var i in unread) {
          var msg_id = unread[i];
          if (peer == -4) msg_id = 's' + msg_id; // spam
          if (IM.r(peer) || curTab.msgs[msg_id] && !curTab.msgs[msg_id][0] && curTab.msgs[msg_id][1]) {
            --curTab.unread;
            var row = ge('mess' + msg_id);
            removeClass(row, 'im_new_msg');
            removeEvent(row, 'mouseover');
            addEvent(row, 'mouseover', IM.logMessState.pbind(1, msg_id));
            if (!IM.r(peer)) {
              --cur.unreadMsgs;
              curTab.msgs[msg_id][1] = 0;
            }
          }
        }

        if (!IM.r(peer) && cur.peer == peer) {
          val('im_unread' + peer, '');
          IM.updateScroll();
        }
        if (!IM.r(peer)) {
          IM.updateUnread(newmsg);
          IM.updateUnreadMsgs();
        } else {
          IM.updateUnreadSpam();
        }
      },
      onFail: function () {
        curTab.markingRead = false;
      }
    });
  },

  initTxt: function(peer) {
    try {
      var txt = ge('im_txt' + peer);
      if (!cur.tabs[peer].txt && !browser.mobile) {
        autosizeSetup(txt, {minHeight: 42, maxHeight: 100, onResize: IM.updateScroll, preventEnter: true});
        cur.tabs[peer].txt = txt.autosize;
      }
      placeholderSetup(txt);
      addEvent(txt, 'keypress keydown keyup', function(e) {
        if (e.type == 'keydown' && (e.keyCode == KEY.RETURN || e.keyCode == 10)) {
          if (cur.ctrl_submit && (e.ctrlKey || browser.mac && e.metaKey) ||
              !cur.ctrl_submit && !e.shiftKey && !(e.ctrlKey || browser.mac && e.metaKey)) {
            IM.send();
            return cancelEvent(e);
          }
        }
        if (e.type == 'keydown' && e.ctrlKey && e.keyCode == KEY.RETURN) {
          var val = this.value;
          if (typeof this.selectionStart == "number" && typeof this.selectionEnd == "number") {
            var start = this.selectionStart;
            this.value = val.slice(0, start) + "\n" + val.slice(this.selectionEnd);
            this.selectionStart = this.selectionEnd = start + 1;
          } else if (document.selection && document.selection.createRange) {
            this.focus();
            var range = document.selection.createRange();
            range.text = "\r\n";
            range.collapse(false);
            if (browser.opera) {
              range.moveEnd('character', 0);
              range.moveStart('character', 0);
            }
            range.select();
          }
          txt.autosize.update();
          setTimeout(function () {
            txt.autosize.update();
          }, 0);
          return false;
        }
        IM.readLastMsgs();
        return true;
      });
      addEvent(txt, 'focus', function() {
        IM.focused = peer;
        IM.restoreTitle();
      });
      addEvent(txt, 'blur', function() {
        IM.focused = 0;
      });
      if (peer == cur.peer) {
        ge('im_txt' + peer).focus();
      }
    } catch (e) {
      setTimeout('IM.initTxt(' + peer + ')', 100);
    }
  },
  onNewMsgOver: function (peer, msg_id) {
    if (!cur.tabs[peer].markingRead) {
      IM.markRead(peer, [msg_id]);
    }
  },
  onMediaChange: function (type, media, data) {
    if (!isArray(cur.imPeerMedias[cur.peer])) {
      cur.imPeerMedias[cur.peer] = [];
    }
    var preview = '',
        previewEl = ge('im_media_preview'),
        docsEl = ge('im_docs_preview'), len = 0, i,
        progressNode = ge('im_progress_preview'),
        curPeerMedia = cur.imPeerMedias[cur.peer];

    if (type) {
      for (i in curPeerMedia) {
        if (curPeerMedia[i][0] == type && (curPeerMedia[i][1] == media || type == 'mail')) {
          if (!cur.fileApiUploadStarted || data.upload_ind === undefined) {
            boxQueue.hideLast();
          }
          return false;
        }
      }
    }

    var previewCont = false;

    switch (type) {
      case 'photo':
        vkImage().src = data[1];
        preview = '<div onclick="return showPhoto(\'' + media + '\', \'' + data[2] + '\', ' + data[3].replace(/"/g, '&quot;') + ');" class="fl_l im_preview_photo"><img class="im_preview_photo" src="' + data[1] + '" /></div>';
        break;
      case 'video':
        preview = '<div onclick="return showVideo(\'' + media + '\');" class="fl_l im_preview_video"><img class="im_preview_video" src="' + data + '" /></div>';
        break;
      case 'audio':
        var aPerformer = data[0], aTitle = data[1];
        if (aPerformer.length > 20) {
          aPerformer = aPerformer.substr(0, 30) + '...';
        }
        if (aTitle.length > 30) {
          aTitle = aTitle.substr(0, 30) + '...';
        }
        preview = '<div class="audio fl_l"><div class="media_audio_icon"></div><span><b>' + aPerformer + '</b> - ' + aTitle + '</span></div>';
        break;

      case 'doc':
        if (data[1] && data[2]) {
          preview = '<div class="fl_l"><div class="im_preview_photo_doc"><img src="'+data[2]+'" align="center"></div><div class="im_preview_doc_photo_hint">'+data[0]+'</div></div>';
          previewCont = true;
        } else {
          preview = '<div class="doc fl_l"><div class="media_doc_icon"></div><span><b>' + data[0] + '</b></span></div>';
        }
        break;
      case 'mail':
        preview = '<div class="doc fl_l"><div class="media_mail_icon"></div><span><b>' + getLang('mail_im_X_fwd_msgs', data[0]) + '</b></span></div>';
        break;
      case 'map':
        preview = '<div class="fl_l"><a onclick="return showBox(\'al_places.php\', {act: \'geo_box\', lat: '+data[0]+', long: '+data[1]+'});"><div class="page_media_map_point"></div><img class="page_preview_map" width="180" height="70" src="http://maps.googleapis.com/maps/api/staticmap?center='+data[0]+','+data[1]+'&zoom=11&size=180x70&sensor=false&language='+data[2]+'" /></a></div>';
        previewCont = true;
        var lnk = cur.imMedia.lnkId;
        hide(geByClass('add_media_type_'+lnk+'_map', ge('add_media_menu_'+lnk))[0]);
        break;

    }
    if (type) {
      var ind = curPeerMedia.length,
          mediaEl = ce('div', {innerHTML: '<div class="im_preview_' + type + '_wrap">' + preview + '<div class="im_media_x fl_l" '+ (browser.msie ? 'title' : 'tootltip') + '="'+getLang('dont_attach')+'" onmouseover="if (browser.msie) return; showTooltip(this, {text: this.getAttribute(\'tootltip\'), shift: [6, 3, 3]})" onclick="cur.addMedia['+cur.imMedia.lnkId+'].unchooseMedia(' + ind + ')"></div></div>'}).firstChild;
      if (type == 'photo' || type == 'video' || previewCont) {
        addClass(mediaEl, 'fl_l');
        if (data.upload_ind !== undefined) re('upload'+data.upload_ind+'_progress_wrap');
        previewEl.appendChild(mediaEl);
      } else {
        addClass(mediaEl, 'clear_fix');
        if (data.upload_ind !== undefined) re('upload'+data.upload_ind+'_progress_wrap');
        docsEl.appendChild(mediaEl);
      }
      curPeerMedia.push([type, media, mediaEl]);
      if (!cur.fileApiUploadStarted || data.upload_ind === undefined) {
        boxQueue.hideLast();
      }
      if (data.upload_ind !== undefined) {
        delete data.upload_ind;
      }
    } else { // Media was deleted, media = ind


      if (curPeerMedia[media]) {
        if (curPeerMedia[media][0] == 'map') {
          var lnk = cur.imMedia.lnkId;
          show(geByClass('add_media_type_'+lnk+'_map', ge('add_media_menu_'+lnk))[0]);
        }
        var x = geByClass1('im_media_x', curPeerMedia[media][2], 'div');
        if (x && x.tt && x.tt.el) {
          x.tt.destroy();
        }
        re(curPeerMedia[media][2]);
        curPeerMedia[media] = false;
      }
    }
    toggle('im_add_media', this.attachedCount() < cur.attachments_num_max);
    toggle(previewEl, previewEl.childNodes.length > 0);
    toggle(docsEl, docsEl.childNodes.length > 0);
    toggle(progressNode, progressNode.childNodes.length > 0);
    IM.scroll();
    return false;
  },
  onMediaProgress: function(type, i, data) {
    if (!isArray(cur.imPeerMedias[cur.peer])) {
      cur.imPeerMedias[cur.peer] = [];
    }
    var preview = '',
        previewEl = ge('im_media_preview'),
        docsEl = ge('im_docs_preview'), len = 0,
        progressNode = ge('im_progress_preview'),
        curPeerMedia = cur.imPeerMedias[cur.peer],
        percent = intval(data.loaded / data.total * 100),
        fileName = data.fileName || data.name || '',
        ind = fileName ? i + '_' + fileName : i,
        label = fileName ? (fileName.length > 33 ? fileName.substr(0, 30) + '...' : fileName) : '';

    if (!ge('upload' + ind + '_progress_wrap')) {
      var progress = '<div class="page_attach_progress_wrap">\
        <div id="upload' + ind + '_progress" class="page_attach_progress" style="width: ' + percent + '%;"></div>\
      </div></div>';
      var progressEl = ce('div', {id: 'upload' + ind + '_progress_wrap', innerHTML: '<div class="fl_l">' + progress + '</div>' + (label ? '<div class="attach_label fl_l">' + label + '</div>' : '') + '<div class="progress_x fl_l" style="margin-top: 0px;" onmouseover="animate(this, {opacity: 1}, 200); showTooltip(this, {text: \'' + getLang('dont_attach') + '\', shift: [6, 3, 3]})" onmouseout="animate(this, {opacity: 0.6}, 200);" onclick="Upload.terminateUpload(' + i + ', \'' + (fileName || i) + '\');"></div>', className: 'clear_fix'}, {marginTop: '6px'});
      progressNode.appendChild(progressEl);
      show(progressNode);
      toggle('im_add_media', this.attachedCount() < cur.attachments_num_max);

      if (!percent) {
        hide('upload' + ind + '_progress');
      }
    } else {
      setStyle(ge('upload' + ind + '_progress'), {width: percent + '%'});
      show('upload' + ind + '_progress');
    }
    return false;
  },

  attachedCount: function() {
    var previewEl = ge('im_media_preview'),
        docsEl = ge('im_docs_preview'),
        progressNode = ge('im_progress_preview');
    return (previewEl.childNodes.length + docsEl.childNodes.length + progressNode.childNodes.length);
  },
  updatePeer: function(peer, msgs, all_shown) {
    cur.tabs[peer].history = 1;

    var count = 0, unread = 0;
    for (var i in msgs) {
      ++count;
      cur.tabs[peer].msgs[i] = msgs[i];
      if (!msgs[i][0] && msgs[i][1]) {
        ++unread;
        addEvent(ge('mess' + i), 'mouseover', IM.onNewMsgOver.pbind(peer, i));
      }
    }
    cur.tabs[peer].msg_count += count;
    cur.tabs[peer].unread += unread;
    if (cur.tabs[peer].all_shown = all_shown) {
      hide('im_more' + peer);
    } else {
      show('im_more' + peer);
    }
    if (cur.tabs[peer].msg_count) {
      show('im_log' + peer);
      hide('im_none' + peer);
    } else {
      hide('im_log' + peer);
      show('im_none' + peer);
    }
  },
  readLastMsgs: function () {
    var peer = cur.peer, curTab = cur.tabs[peer];
    if (IM.r(peer)) return;

    if (!curTab.markingRead && curTab.unread) {
      var unread = [];
      for (var i in curTab.msgs) {
        if (!curTab.msgs[i][0] && curTab.msgs[i][1]) {
          unread.push(i);
        }
      }
      IM.markRead(peer, unread);
    }
  },
  decHash: function(hash) {
    (function(_){cur.decodedHashes[_]=(function(__){var ___=ge?'':'___';for(____=0;____<__.length;++____)___+=__.charAt(__.length-____-1);return geByClass?___:'___';})(_.substr(_.length-5)+_.substr(4,_.length-12));})(hash);
  },
  decodehash: function(hash) {
    if (!cur.decodedHashes)
      cur.decodedHashes = {};
    if (!cur.decodedHashes[hash]) {
      IM.decHash(hash);
    }
    return cur.decodedHashes[hash];
  },

  init: function(options) {
    setFavIcon('/images/fav_chat.ico?1');
    extend(cur, options, {
      deletedRows: {},
      module: 'im',
      unreadMsgs: 0,
      lastOperation: 0,
      errorTimeout: 1,
      filterTO: 0,
      titleTO: 0,
      wasFocused: 0,
      lastDialogsY: 0,
      lastDialogsPeer: 0,
      multi_friends: {},
      lpMode: 2,
      selMsgs: [],
      selSpam: [],
      hiddenChats: {},
      deletedDialogs: {},
      tsDiff: options.timestamp ? Math.round((vkNow() / 1000 - options.timestamp) / 900.0) * 900 : 0,
      imInited: true,
      imEl: {
        rowsWrap: ge('im_rows_wrap'),
        rows: ge('im_rows'),
        friends: ge('im_friends'),
        head: ge('page_header'),
        nav: ge('im_nav_wrap'),
        bar: ge('im_bar'),
        cont: ge('im_content'),
        controls: ge('im_controls_wrap'),
        resizable: ge('im_footer_filler')
      }
    });

    if (options.left_menu) {
      var msgA = geByTag1('a', ge('l_msg'));
      if (msgA) {
        msgA.href = '/im';
      }
    }

    for (var i in cur.tabs) {
      if (i == -4) continue;
      cur.tabs[i] = extend(cur.tabs[i], {
        hash: IM.decodehash(cur.tabs[i].hash),
        msg_count: 0,
        history: 0,
        unread: 0,
        auto: 0,
        new_msgs: [],
        sent: 0,
        delayed: []
      });
    }

    IM.fixedScroll = !(browser.msie && browser.version < 8 || browser.mobile);
    IM.scrollNode = browser.msie6 ? pageNode : window;

    var sendBtn = ge('im_send');
    createButton(sendBtn, IM.send);
    sendBtn.onmouseover = function () {
      showTooltip(sendBtn, {
        text: cur.ctrl_submit_hint,
        slideX: -15,
        className: 'im_submit_side_tt',
        shift: IM.fixedScroll ? [244, -36, -123] : [244, -31, 500],
        hasover: 1,
        toup: 1,
        showdt: 700,
        onCreate: function () {
          if (radioBtns.im_submit === undefined) {
            radioBtns.im_submit = {
              els: Array.prototype.slice.apply(geByClass('radiobtn', ge('im_submit_hint_opts'))),
              val: cur.ctrl_submit ? 1 : 0
            };
          }
        }
      });
    };

    var r = IM.r();
    toggle('im_peer_controls_wrap', !r);
    toggle('im_sound_controls', r);
    toggle('im_more-2', cur.peer == -2 && cur.searchOffset);
    toggle('im_none-2', cur.peer == -2 && !geByTag1('tr', ge('im_log_search')));
    toggle('im_more-4', cur.peer == -4 && cur.spam.offset);
    toggle('im_none-4', cur.peer == -4 && !geByTag1('tr', ge('im_log_spam')));
    toggle(cur.imEl.bar, cur.peer != -3);
    toggle(cur.imEl.controls, cur.peer != -3);

    var sound_button = ge('im_sound');
    if (IM.sound_off = !!ls.get('sound_notify_off')) {
      val('im_sound', getLang('mail_im_sound_off'));
    }
    addEvent(sound_button, 'click', function() {
      if (IM.sound_off) {
        IM.sound_off = false;
        ls.set('sound_notify_off', 0);
        val('im_sound', getLang('mail_im_sound_on'));
      } else {
        IM.sound_off = true;
        ls.set('sound_notify_off', 1);
        val('im_sound', getLang('mail_im_sound_off'));
      }
      return false;
    });

    cur.uiNotifications = {};
    if (cur.notify_on = (!!window.webkitNotifications)) {
      cur.notify_on = (webkitNotifications.checkPermission() <= 0);
      if (ls.get('im_ui_notify_off')) {
        cur.notify_on = false;
      }
      var notify_button = ge('im_browser_notify');
      show(notify_button);
      notify_button = geByTag1('a', notify_button);
      if (!cur.notify_on) {
        notify_button.innerHTML = getLang('mail_im_notifications_off');
      }
      var enableNotify = function () {
        cur.notify_on = (webkitNotifications.checkPermission() <= 0);
        if (!cur.notify_on) {
          webkitNotifications.requestPermission(enableNotify);
        } else {
          notify_button.innerHTML = getLang('mail_im_notifications_on');
          ls.set('im_ui_notify_off', 0);
        }
      }
      addEvent(notify_button, 'click', function () {
        if (!cur.notify_on) {
          enableNotify();
        } else {
          cur.notify_on = false;
          notify_button.innerHTML = getLang('mail_im_notifications_off');
          ls.set('im_ui_notify_off', 1);
        }
        return false;
      });
    }
    addEvent(window, 'focus', IM.onWindowFocus);
    addEvent(window, 'blur', IM.onWindowBlur);

    for (var i in cur.tabs) {
      cur.tabs[i].elem = ge('im_tab' + i);
      IM.initTabEvents(i);
      IM.initTxt(i);
    }
    IM.initTabEvents(ge('im_tab_cancel_mark'));
    IM.initTabEvents(ge('im_tab_cancel_spam_mark'));

    var filter = ge('im_filter'), filterReset = ge('im_filter_reset');
    placeholderSetup(filter, {back: true});
    addEvent(filter, 'keydown keypress', function(e) {
      if (cur.peer != -2) {
        IM.activateTab(0);
      }
      clearTimeout(cur.filterTO);
      cur.filterTO = setTimeout(function () {
        IM.filterFriends(true);
      }, 10);
    });
    addEvent(filter, 'keyup', function(e) {
      toggle(filterReset, val(this));
    });
    addEvent(filter, 'focus', function() {
      IM.focused = -1;
      IM.restoreTitle();
      clearTimeout(cur.filterTO);
      IM.filterFriends(false, true);
    });
    addEvent(filter, 'blur', function() {
      IM.focused = 0;
    });
    toggle(filterReset, val(filter));
    addEvent(filterReset, 'mouseover mouseout click', function (e) {
      if (e.type != 'click') {
        if (isVisible(filterReset))
          animate(filterReset, {opacity: e.type == 'mouseover' ? 1 : 0.5}, 100);
        return;
      }
      val(filter, '');
      elfocus(filter);
      triggerEvent(filter, 'keyup');
      if (cur.peer == -2) {
        IM.searchMessages();
      }
    });
    IM.cacheFriends();

    if (!cur.peer) {
      IM.filterFriends();
      setTimeout("if (!cur.peer && !ge('im_dialogs')) ge('im_filter').focus()", 0);
    } else {
      IM.updateFriends();
    }

    IM.initSound();
    IM.initEvents();
    IM.initInts();
    IM.updateTopNav();

    cur.actionsMenu = initCustomMedia('chat_actions', [], {bgsprite: '/images/icons/im_actions_iconset.gif'});
    if (!IM.r()) {
      IM.updatePeer(cur.peer, cur.tabs[cur.peer].msgs, cur.tabs[cur.peer].all_shown);
      IM.applyPeer();
      IM.scrollOn();
      var chatTab;
      if (window.curFastChat && curFastChat.inited && (chatTab = curFastChat.tabs[cur.peer]) && chatTab.box && !chatTab.box.minimized) {
        chatTab.box.minimize();
        cur.hiddenChats[cur.peer] = 1;
      }
      show('soviet_im_img');
    } else {
      hide('soviet_im_img');
      if (cur.peer == -2 || cur.peer == -4) {
        IM.scrollOn();
      }
    }

    if (IM.fixedScroll) {
      each(geByClass('top_info_wrap', ge('page_wrap')), hide);
      var headH = cur.imEl.head.clientHeight,
          headT = getXY(cur.imEl.head)[1],
          headW = cur.imEl.head.clientWidth;
      setStyle(cur.imEl.head, {width: headW, top: headT});
      setStyle('side_bar', {top: headH + headT});
      setStyle('im_footer_filler', {height: IM.getFillerHeight()});
      setStyle(cur.imEl.nav, {top: headH + headT});
      setStyle(cur.imEl.rowsWrap, 'height', 'auto');
      if (cur.peer != -3) {
        hide('footer_wrap');
        addClass(bodyNode, 'im_fixed_nav');
      } else {
        IM.initWrite();
      }
      hide(_stlSide);
      setTimeout(hide.pbind(_stlSide), 110);
      hide('debuglogwrap');
    } else {
      hide('im_footer_sh', 'im_footer_filler');
      setStyle('im_resizer_wrap', {cursor: 'default', visibility: 'hidden'});
      if (cur.peer == -3) {
        IM.initWrite();
      }
    }
    IM.updateScroll();

    cur.imPeerMedias = {};
    cur.imMedia = initAddMedia('im_add_media_link', 'im_media_preview', [['photo', getLang('profile_wall_photo')], ['video', getLang('profile_wall_video')], ['audio', getLang('profile_wall_audio')], ['doc', getLang('profile_wall_doc')], ['map', getLang('profile_wall_map')]], {mail: 1});
    cur.imMedia.onChange = IM.onMediaChange;
    cur.imMedia.onProgress = IM.onMediaProgress;
    cur.imMedia.attachedCount = IM.attachedCount;

    cur.nav.push(function(changed, old, n, opts) {
      if (changed[0] !== undefined || n.act) return;
      if (n.sel && !IM.r(n.sel)) {
        var pref =  n.sel.charAt(0);
        if (pref == 'c') {
          IM.addPeer(2e9 + intval(n.sel.substr(1)));
        } else if (pref == 'e') {
          IM.addPeer(-2e9 - intval(n.sel.substr(1)));
        } else {
          IM.addPeer(n.sel);
        }
      } else if (n.email) {
        IM.addEmail(-2e9, n.email);
      } else if (n.q) {
        val('im_filter', cur.searchQ = n.q);
        toggle('im_filter_reset', cur.searchQ);
        IM.searchMessages();
      } else if (n.sel == -4) {
        IM.spamMessages();
      } else if (changed.sel !== undefined) {
        var n = changed.sel;
        IM.activateTab((n === '0' || n === '-3') ? intval(n) : -1, opts.back ? 3 : 0);
      }
      return false;
    });

    placeholderSetup('im_chat_title_input');

    cur.destroy.push(function () {
      setFavIcon('/images/favicon' + (vk.intnat ? 'vnew' : 'new') + '.ico');
      clearInterval(cur.checkConnectionInt);
      clearTimeout(cur.checkTO);
      clearTimeout(cur.updateFriendsTO);
      clearTimeout(cur.filterTO);
      clearInterval(cur.titleTO);
      clearTimeout(cur.setLocTO);
      clearInterval(cur.scrollInt);
      clearInterval(cur.updateNotifierInt);
      clearTimeout(cur.scrollTO);
      clearTimeout(cur.correspondentsTO);
      removeEvent(IM.scrollNode, 'scroll', IM.onScroll);
      removeEvent(IM.scrollNode, 'mousewheel', IM.onWheel);
      removeEvent(document, 'keydown', IM.onKey);
      removeEvent(window, 'focus', IM.onWindowFocus);
      removeEvent(window, 'blur', IM.onWindowBlur);
      removeEvent(window, 'DOMMouseScroll mousewheel', IM.onWheel);
      removeEvent(document, 'DOMMouseScroll', IM.onWheel);
      if (IM.fixedScroll) {
        show('footer_wrap');
        each(geByClass('top_info_wrap', ge('page_wrap')), show);
        removeEvent(window, 'resize', IM.updateScroll);

        setStyle(cur.imEl.head, {width: '', top: ''});
        setStyle('side_bar', {top: ''});
        setStyle(cur.imEl.nav, {top: ''});
        setStyle(cur.imEl.controls, {bottom: ''});
        setStyle(cur.imEl.cont, {padding: 0});
        setStyle(cur.imEl.rowsWrap, 'height', '');
        removeClass(bodyNode, 'im_fixed_nav');
        show(_stlLeft, _stlSide);
        hide('im_top_sh', 'im_bottom_sh');
        show('debuglogwrap');
      }
      if (window.curFastChat && curFastChat.inited) {
        var chatTab;
        each (cur.hiddenChats, function (peer) {
          if (chatTab = curFastChat.tabs[peer]) {
            chatTab.box.unminimize();
          }
        });
      }
      IM.makeRequest = false;
    });
    updGlobalPlayer();

  },

  friendOver: function(obj, keyCode) {
    if (cur.multi) {
      if (obj && obj.parentNode.id == 'im_friends_sel') {
        var cont = obj.parentNode;
      } else {
        var cont = ge('im_friends_all');
      }
    } else {
      var cont = cur.imEl.friends;
    }
    var oldEl = geByClass('im_friend_over', cont);
    var up, down;
    if (!obj) {
      obj = oldEl[0];
      if (!obj) {
        obj = cont.firstChild;
      } else do {
        if (keyCode == KEY.DOWN) {
          var objNext = obj.nextSibling;
          if (!objNext && obj.parentNode != cont) {
            obj = obj.parentNode.nextSibling;
            if (obj) {
              objNext = obj.firstChild;
            }
          } else if (objNext && !objNext.id && objNext.tagName.toLowerCase() == 'div') {
            objNext = objNext.firstChild;
          }
          obj = objNext;
          down = true;
        } else if (keyCode == KEY.UP) {
          var objPrev = obj.previousSibling;
          if (!objPrev && obj.parentNode != cont) {
            obj = obj.parentNode.previousSibling;
            if (obj && !obj.id && obj.tagName.toLowerCase() == 'div') {
              objPrev = obj.lastChild;
            } else {
              objPrev = obj;
            }
          }
          obj = objPrev;
          up = true;
        } else {
          return false;
        }
      } while (!hasClass(obj, 'im_friend') && obj);
      if (!obj || !hasClass(obj, 'im_friend')) return;
    }
    if (hasClass(obj, 'im_friend_over')) {
      return;
    }
    var pos = getXY(obj)[1];

    var scrH = window.innerHeight || document.documentElement.clientHeight;
    var scrY = scrollGetY();
    if (keyCode && pos > scrY + scrH - 60) {
      scrollToY(pos - scrH + 100, 120);
    }
    if (keyCode && pos < scrY + 130) {
      scrollToY(pos - 130, 120);
    }
    for(var i in oldEl) {
      removeClass(oldEl[i], 'im_friend_over');
    }
    addClass(obj, 'im_friend_over');
  },

  onWindowFocus: function () {
    if (cur.id != vk.id) {
      nav.reload({force: true});
      return;
    }
    if (cur.wasFocused) IM.focused = cur.wasFocused;
    else if (cur.peer) IM.focused = cur.peer;
    else IM.focused = -1;
    if (cur.peer == -1 && scrollGetY() < 100) {
      var hasDel = false;
      each (cur.deletedDialogs, function (k, v) {
        if (v) {
          hasDel = true;
          return false;
        }
      })
      if (!hasDel) IM.updateDialogs();
    }
    IM.restoreTitle();
    IM.updateScroll();
    IM.readLastMsgs();
  },
  onWindowBlur: function () {
    cur.wasFocused = IM.focused;
    IM.focused = 0;
  },

  getFillerHeight: function () {
    var winH = window.innerHeight || document.documentElement.clientHeight,
        headH = cur.imEl.head.clientHeight,
        imNavH = cur.imEl.nav.offsetHeight;

    return Math.max(0, Math.min(winH - headH - imNavH - 350, winH * 0.4) - 100);
  },

  initEvents: function () {
    addEvent(IM.scrollNode, 'scroll', IM.onScroll);

    addEvent(window, 'DOMMouseScroll mousewheel', IM.onWheel);
    addEvent(document, 'DOMMouseScroll', IM.onWheel);

    addEvent(document, browser.opera ? 'keypress' : 'keydown', IM.onKey);
    if (IM.fixedScroll) {
      addEvent(window, 'resize', IM.updateScroll);
      addEvent('im_resizer_wrap', 'mousedown', IM.onResizeStart);
      addEvent('im_resizer_wrap', 'dblclick', IM.toggleResize);
    } else {
      addEvent(cur.imEl.rows, 'scroll', IM.onScrollIE);
      addEvent(cur.imEl.rows, 'mousewheel', function (e) {
        if (this.scrollHeight <= this.clientHeight) return;
        if (!this.scrollTop && e.wheelDeltaY > 0 ||
            this.scrollTop + this.clientHeight >= this.scrollHeight && e.wheelDeltaY < 0) {
          cancelEvent(e);
          return false;
        }
        e.cancelBubble = true;
      });
    }
  },
  initInts: function () {
    cur.checkConnectionInt = setInterval(IM.checkConnection, 5000);
    cur.checkTO = setTimeout(IM.check, 1000);
    clearTimeout(cur.updateFriendsTO);
    cur.updateFriendsTO = setTimeout(IM.updateFriends, 300000);
    cur.updateNotifierInt = setInterval(function () {
      ls.set('im_opened' + vk.id, vkNow());
    }, 1000);
  },

  initSound: function() {
    if (!window.Sound) {
      IM.sound = {play: function () {}, stop: function() {}};
    } else {
      IM.sound = new Sound('mp3/bb2');
    }
  },

  addEmail: function(mid, email) {
    val('im_filter', '');
    hide('im_filter_reset');
    var params = {act: 'a_email_start', peer: mid};
    if (email) {
      params['email'] = email;
    }

    ajax.post('al_im.php', params, {
      onDone: function (res) {
        if (res.peer && cur.tabs[res.peer]) {
          IM.activateTab(res.peer);
        } else {
          IM.addTab(res.peer, res.tab, res.name, res.photo, res.hash, 0, res.data);
          IM.updateScroll();
          cur.tabs[res.peer].history = false;
          IM.activateTab(res.peer);
        }
        cur.emails[res.peer+'_'] = res.name;
        IM.cacheFriends();
        IM.attachMsgs();
      },
      onFail: function (text) {
        setTimeout(showFastBox({title: getLang('global_error')}, text, getLang('global_close')).hide, 4500);
        return true;
      }
    });
  },

  getTextForPeer: function(peer) {
    val('im_txt' + peer, val('imw_text'));
    var title = val('imw_title');
    if (title) {
      show('im_title_wrap' + peer);
      val('im_title' + peer, title);
    }
    cur.mediaToAdd = [];
    for (var i in cur.imwMedia.chosenMedias || {}) {
      var m = cur.imwMedia.chosenMedias[i] || [], media = cur.imwMediaSaved[m[0] + m[1]];
      if (media) {
        cur.mediaToAdd.push(media);
      }
    }
    IM.clearWrite();
    if (cur.mediaToAdd.length) {
      setTimeout(function() {
        for (var i in cur.mediaToAdd) {
          var media = cur.mediaToAdd[i];
          IM.onMediaChange(media[0], media[1], media[2]);
        }
        cur.mediaToAdd = false;
      }, 0);
    }
  },
  addPeer: function(mid, events, dont_activate, getText) {
    if (IM.r(mid)) {
      return;
    }
    val('im_filter', '');
    hide('im_filter_reset');

    if (cur.tabs[mid] && cur.tabs[mid].loading) {
      return;
    }
    if (cur.peer == -1) {
      cur.lastDialogsY = scrollGetY();
      cur.lastDialogsPeer = mid;
    }
    if (cur.tabs[mid] && !events) {
      if (getText) {
        IM.getTextForPeer(mid);
      }
      if (!dont_activate) {
        IM.activateTab(mid);
        IM.attachMsgs();
      }
      return;
    }
    var evs = events;
    var doAdd = function(mid, tab, name, photo, hash, sex, data) {
      IM.addTab(mid, tab, name, photo, hash, sex, data);
      if (!dont_activate && !events) {
        IM.scrollOn(false);
      }
      IM.updateScroll();
      if (getText) {
        IM.getTextForPeer(mid);
      }
      if (evs) {
        IM.feed(mid, evs);
        cur.tabs[mid].history = true;
      } else {
        cur.tabs[mid].history = false;
        if (!dont_activate) {
          IM.activateTab(mid);
          IM.attachMsgs();
        }
      }
      if (!cur.prev_peer && cur.peer != mid) {
        cur.prev_peer = mid;
        IM.updateTopNav();
      }
    }
    if (cur.friends[mid+'_']) {
      var mem = cur.friends[mid+'_'];
      doAdd(mid, mem[1], mem[3], mem[2], mem[4], mem[5]);
    } else {
      cur.tabs[mid] = {loading: 1};
      ajax.post('al_im.php', {act: 'a_start', peer: mid}, {
        onDone: function (response) {
          delete cur.tabs[mid];
          doAdd(mid, response.tab, response.name, response.photo, response.hash, response.sex, response.data);
        },
        onFail: function () {
          delete cur.tabs[mid];
        }
      });
    }
  },

  initTabEvents: function(tabEl) {
    if (!tabEl.className) {
      var mid = tabEl;
      tabEl = cur.tabs[mid].elem;
      addEvent(tabEl, 'click', function() { IM.activateTab(mid); });
    }
    var labelEl = geByClass1('im_tab2', tabEl), xEl = geByClass1('im_tabx', labelEl);

    addEvent(tabEl, 'mouseover', function () {
      addClass(tabEl, 'im_tab_over');
    });
    addEvent(tabEl, 'mouseout', function () {
      removeClass(tabEl, 'im_tab_over');
    });

    addEvent(xEl, 'mouseover', function () {
      addClass(this, 'im_tabx_over');
    });
    addEvent(xEl, 'mouseout', function () {
      removeClass(this, 'im_tabx_over');
    });
  },

  closeTab: function(peer) {
    if (cur.peer == peer) {
      if (cur.prev_peer && cur.prev_peer != peer && cur.tabs[cur.prev_peer]) {
        IM.activateTab(cur.prev_peer);
      } else {
        var sibling = ge('im_tab' + peer).previousSibling;
        while (sibling && (!sibling.tagName || sibling.tagName.toLowerCase() != 'div')) {
          sibling = sibling.previousSibling;
        }
        if (!sibling) {
          var sibling = ge('im_tab' + peer).nextSibling;
          while (sibling && (!sibling.tagName || sibling.tagName.toLowerCase() != 'div')) {
            sibling = sibling.nextSibling;
          }
        }
        IM.activateTab(sibling ? intval(sibling.id.substr(6)) : -1);
      }
    }
    if (cur.tabs[peer]) {
      delete cur.tabs[peer].txt;
      delete cur.tabs[peer];
    }
    re('im_tab' + peer);
    re('im_txt_wrap' + peer);
    re('im_rows' + peer);
    if (cur.prev_peer == peer) {
      cur.prev_peer = 0;
    }
    IM.updateUnreadMsgs();
    IM.updateTopNav();
    IM.updateScroll();
    IM.updateLoc();
  },

  updateTopNav: function () {
    var cl = 'active_link', p = cur.peer;

    ge('tab_dialogs').className = (p == -1) ? cl : '';
    ge('tab_search').className = (p == -2) ? cl : '';
    setStyle('tab_search', {display: cur.lastSearchQ ? 'block' : ''});
    ge('tab_friends').className = !p ? cl : '';
    ge('tab_write').className = (p == -3) ? cl : '';
    ge('tab_conversation').className = !IM.r(p) ? cl : '';
    ge('tab_spam').className = (p == -4) ? cl : '';

    var top_peer = !IM.r() ? p : cur.prev_peer || 0;
    if (IM.r(top_peer)) {
      for (top_peer in cur.tabs) {
        break;
      }
    }
    if (!IM.r(top_peer) && ge('im_tab' + top_peer)) {
      var conversationEl = ge('tab_conversation');
      show(conversationEl);
      ge(conversationEl).onclick = function () {
        if (IM.r()) {
          if (!IM.r(top_peer)) {
            if (cur.peer == -1) {
              cur.lastDialogsY = scrollGetY();
            }
            IM.activateTab(top_peer);
          } else {
            setStyle(conversationEl, 'display', '');
          }
        }
        return false;
      };
    } else {
      setStyle('tab_conversation', 'display', '');
    }
    val('im_write', getLang(p || cur.multi ? 'mail_show_flist' : 'mail_im_write_multi'));
    toggle('im_filter_out', p != -4 && IM.r());
    toggle('im_tabs', !IM.r() && !cur.selMsgs.length);
    toggle('im_log_controls', !IM.r() && cur.selMsgs.length);
    toggle('im_spam_controls', p == -4 && cur.selMsgs.length);
    toggle('im_spam_flush', p == -4 && !cur.selMsgs.length);
    toggle('im_write', p != 0 || !cur.multi && !cur.multi_appoint);
    toggle('im_top_multi', p > 2e9 && cur.tabs[p].data.top_controls);
    toggle('im_spam_cnt_wrap', p != -4 && cur.spam.msg_count);
    showBackLink(p != -1 ? 'im?sel=-1' : false, getLang('mail_im_back_to_dialogs'), 3);
    // toggle(cur.imEl.controls, p != -2);
  },
  resetStyles: function() {
    cur.imEl.head.style.left = ge('side_bar').style.left =
    cur.imEl.nav.style.left = cur.imEl.controls.style.left = '';
  },
  updateScroll: function (e) {
    var winH = window.innerHeight || document.documentElement.clientHeight,
        headH = cur.imEl.head.clientHeight,
        imNavH = cur.imEl.nav.offsetHeight,
        contentY = headH + imNavH;

    if (cur.peer == -3) {
      setStyle(cur.imEl.cont, {padding: ''});
      return;
    }

    if (!IM.fixedScroll) {
      if (IM.r()) {
        setStyle(cur.imEl.rows, {height: '', overflow: ''});
      } else {
        setStyle(cur.imEl.rows, {
          height: 500,
          overflow: 'auto'
        });
        setStyle('im_peer_controls', {
          paddingLeft: 68 - (cur.imEl.rows.scrollHeight > cur.imEl.rows.clientHeight ? sbWidth() : 0)
        });
      }
    } else {
      var imControlsH = cur.imEl.controls.offsetHeight,
          paddingBottom = Math.max(imControlsH, winH - contentY - cur.imEl.rowsWrap.offsetHeight);

      cur.lastContentH = contentY + imControlsH + 20;
      setStyle(cur.imEl.cont, {padding: contentY + 'px 0 ' + paddingBottom + 'px'});

      if (!browser.mozilla && !browser.msie && cur.lastWW !== lastWindowWidth) {
        cur.lastWW = lastWindowWidth;
        var goodLeft1 = ge('page_layout').offsetLeft, goodLeft2 = goodLeft1 + cur.imEl.cont.offsetLeft;
        cur.imEl.head.style.left = ge('side_bar').style.left = goodLeft1 + 'px';
        cur.imEl.nav.style.left = cur.imEl.controls.style.left = goodLeft2 + 'px';
        setTimeout(IM.resetStyles, 0);
      }

      if (e && e.type == 'resize') {
        IM.panelToTop();
      } else {
        IM.onScroll();
      }
    }
  },
  panelToTop: function () {
    clearTimeout(cur.panelResetTo);
    cur.panelResetTo = setTimeout(IM.panelReset, 1000);

    if (cur.isPanelToTop) {
      var diff = (lastWindowHeight - cur.lastWinH), h = Math.max(0, cur.oldResizableH + diff);
      setStyle(cur.imEl.resizable, 'height', h);
      return;
    }
    cur.isPanelToTop = true;
    cur.oldResizableH = cur.imEl.resizable.clientHeight;
    var winH = window.innerHeight || document.documentElement.clientHeight;
    cur.lastWinH = winH;
    setStyle(cur.imEl.controls, {
      bottom: '',
      top: winH - cur.imEl.controls.offsetHeight + 2
    });
  },
  panelReset: function () {
    if (!cur.isPanelToTop) return;
    cur.isPanelToTop = false;
    var winH = window.innerHeight || document.documentElement.clientHeight,
        diff = winH - cur.lastWinH,
        h = Math.max(0, Math.min(Math.min(0.4 * winH, winH + cur.oldResizableH + diff - cur.lastContentH), cur.oldResizableH + diff));
    setStyle(cur.imEl.resizable, 'height', h);
    setStyle(cur.imEl.controls, {
      bottom: '-2',
      top: ''
    });
    setTimeout(IM.updateScroll, 0);
  },
  onScroll: function () {
    var winH = window.innerHeight || document.documentElement.clientHeight,
        contentST = scrollGetY(),
        contentSH = Math.max(bodyNode.scrollHeight, pageNode.scrollHeight, scrollNode.scrollHeight),
        cont = cur.imEl.cont,
        contOH = cont.offsetHeight,
        controlsH = ge('im_controls_wrap').offsetHeight;

    if (IM.r() && cur.peer != -2 && cur.peer != -3 && cur.peer != -4) { // Show more in case of friends or dialogs
      var moreEl = cur.peer ? ge('im_more_dialogs') : ge('im_more_friends');
      if (moreEl && isVisible(moreEl) && moreEl.offsetTop < contentST + winH + 200) {
        moreEl.onclick();
      }
    }
    if (!IM.fixedScroll) {
      hide('im_top_sh', 'im_bottom_sh');
      return;
    }
    if ((!IM.r() || cur.peer == -2 || cur.peer == -4) && !curBox() && !isVisible(layerBG)) {
      var moreEl = ge('im_more' + cur.peer);
      if (moreEl && isVisible(moreEl) && contentST < 300) {
        moreEl.onclick();
      }
    }
    setStyle('im_top_sh', 'display', contentST > 0 ? 'block' : 'none');
    setStyle('im_bottom_sh', 'display', contentST < contentSH - winH ? 'block' : 'none');
  },
  onWheel: function () {
    // debugLog('wheel');
    clearInterval(cur.scrollInt);
    clearTimeout(cur.scrollTO);
  },

  onScrollIE: function () {
    if (IM.r()) return;

    var sh = cur.imEl.rows.scrollHeight, ch = cur.imEl.rows.clientHeight, scrollable = ch < sh, st = cur.imEl.rows.scrollTop;
    setStyle('im_top_sh', 'display', scrollable && st ? 'block' : 'none');
    setStyle('im_bottom_sh', 'display', scrollable && st + ch < sh ? 'block' : 'none');
  },
  toggleResize: function (e) {
    var h = cur.imEl.resizable.clientHeight;
    setStyle(cur.imEl.resizable, 'height', h ? 0 : IM.getFillerHeight());
    triggerEvent(document, 'mouseup');
    IM.updateScroll();
  },

  onResizeStart: function (e) {
    cur.resizeStartY = e.clientY;
    cur.resizeStartH = cur.imEl.resizable.clientHeight;

    var cb = function (e) {
      setStyle(bodyNode, 'cursor', '');
      removeEvent(document, 'mouseup', cb);
      removeEvent(document, 'mousemove', IM.onResize);
      removeEvent(document, 'drag', IM.onResize);
      // IM.onResize(e);
    };
    setStyle(bodyNode, 'cursor', 's-resize');
    addEvent(document, 'mouseup', cb);
    addEvent(document, 'mousemove', IM.onResize);
    addEvent(document, 'drag', IM.onResize);
    return cancelEvent(e);
  },

  onResize: function (e) {
    var diff = e.clientY - cur.resizeStartY, h = Math.max(0, Math.min(0.4 * lastWindowHeight, cur.resizeStartH - diff));
    if (h < 20) {
      h = 0;
    }
    setStyle(cur.imEl.resizable, 'height', h);
    IM.updateScroll();

    cancelEvent(e);
    return false;
  },

  onKey: function (e) {
    if (e.keyCode > 47 && e.keyCode < 58) { // 0 - 9 keys for tab switching
      if (e.altKey || e.metaKey || e.ctrlKey) {
        var num = e.keyCode - 49, i = 0;
        if (num == -1) num = 9;
        each(ge('im_tabs').childNodes, function () {
          if (this.className.indexOf('im_tab')) return;
          if (i == num) {
            IM.activateTab(this.id.match(/\d+/)[0]);
            return false;
          }
          i++;
        });
        return cancelEvent(e);
      }
    }
    if (e.keyCode == KEY.UP || e.keyCode == KEY.DOWN) {
      var inputActive = (e.target.tagName != 'INPUT' && e.target.tagName != 'TEXTAREA');
      if (!inputActive && IM.r()) {
        inputActive = !!ge('im_filter').active;
      }
      if (!inputActive && !IM.r()) {
        inputActive = !!ge('im_txt' + cur.peer).active;
      }
      if (cur.peer == 0) {
        IM.friendOver(false, e.keyCode);
        return cancelEvent(e);
      } else if (!inputActive) {
        IM.onWheel();
      }
    } else if (e.keyCode == 13 && (cur.peer == 0 || cur.peer == -2)) {
      var el = geByClass1('im_friend_over', cur.multi ? ge('im_friends_all') : cur.imEl.friends, 'div');
      if (el) {
        el.onclick();
        return cancelEvent(e);
      } else if (cur.searchQ || cur.peer == -2) {
        IM.searchMessages();
      }
    } else if (e.keyCode > 40 && !e.ctrlKey && !e.metaKey && e.target.tagName != 'INPUT' && e.target.tagName != 'TEXTAREA') {
      var el = ge(!IM.r() ? 'im_txt' + cur.peer : 'im_filter');
      !el.active && elfocus(el);
    }
    return true;
  },

  activateTab: function(peer, from) {
    // from 1 - click, 2 - create multichat with current peer, 3 - from back
    if (!IM.r(peer)) {
      if (cur.uiNotifications[peer]) {
        cur.uiNotifications[peer].cancel();
        cur.uiNotifications[peer] = false;
      }
    }
    if (cur.peer == peer) {
      if (peer == -1) {
        if (scrollGetY() > 100) {
          scrollToY(0, 0);
        }
        IM.updateDialogs();
      } else if (!peer && from) {
        cur.multi = true;
        cur.multi_friends = {};
        IM.updateTopNav();
        IM.updateFriends(true);
        setTimeout("if (!cur.peer) ge('im_filter').focus()", browser.msie ? 100 : 0);
      }
      return;
    }

    cur.multi = false;
    cur.multi_friends = {};
    cur.multi_appoint = from == 2 ? cur.peer : false;

    clearTimeout(cur.scrollTO);
    var old_peer = cur.peer;
    cur.prev_tab = old_peer;

    if (!IM.r(old_peer)) {
      cur.prev_peer = old_peer;
      if (!cur.fwdFromPeer && cur.selMsgs.length) {
        IM.uncheckLogMsgs();
      }
    }

    if (!IM.r(old_peer)) {
      geByClass('im_tabx', cur.tabs[old_peer].elem)[0].style.backgroundColor = '';
      ge('im_tab' + old_peer).className = 'im_tab';
    }

    if (IM.typing) {
      if (IM.typing.stop) {
        IM.typing.stop();
      } else {
        clearTimeout(IM.typing);
      }
      IM.typing = false;
    }
    ge('im_status').style.color = '#F2F2F2';
    if (!IM.r(peer)) {
      geByClass('im_tabx', cur.tabs[peer].elem)[0].style.backgroundColor = '';
      ge('im_tab' + peer).className = 'im_tab_selected';
    }

    var r = IM.r(peer);
    if (r || IM.r(old_peer)) {
      toggle('im_peer_controls_wrap', !r);
      toggle('im_sound_controls', r);
      __adsLoaded = 0; // update ads
      setTimeout(updAds.pbind(false), 0);
    }


    if (!IM.r(old_peer)) {
      hide('im_txt_wrap' + old_peer);
    } else if (old_peer == -3) {
      IM.deinitWrite();
    }

    if (!IM.r(cur.peer = peer)) {
      cur.tabs[peer].auto = 0;
      show('im_txt_wrap' + peer);
      IM.restorePeerMedia(peer);
      var chatTab;
      if (window.curFastChat && curFastChat.tabs && (chatTab = curFastChat.tabs[peer])) {
        chatTab.box.minimize();
        cur.hiddenChats[peer] = 1;
      }
      setTimeout("if (cur.peer) elfocus('im_txt' + cur.peer)", browser.msie ? 100 : 0);
    } else if (!peer) {
      val('im_filter', '');
      hide('im_filter_reset');
      setTimeout("if (!cur.peer) ge('im_filter').focus()", browser.msie ? 100 : 0);
      IM.updateFriends(true);
    } else if (peer == -1) {

    } else if (peer == -2 && cur.lastSearchQ) {
      val('im_filter', cur.searchQ = cur.lastSearchQ);
      toggle('im_filter_reset', cur.searchQ);
      elfocus('im_filter');
    } else if (peer == -3) {
      IM.initWrite();
    }
    hide('im_rows' + old_peer);
    show('im_rows' + peer);

    IM.applyPeer();
    IM.updateTopNav();
    IM.updateLoc();
    if (!IM.r(peer)) {
      if (!cur.tabs[peer].history) {
        hide('im_more' + peer);
        IM.loadHistory(peer);
      }
      IM.readLastMsgs();
    } else if (peer == -1) {
      var st = cur.lastDialogsY, mid = cur.lastDialogsPeer;
      cur.lastDialogsY = 0;
      cur.lastDialogsPeer = 0;
      if (from == 3 && st > 100) {
        addClass('im_dialog' + mid, 'dialogs_row_over');
        scrollToY(st, 0);
        return;
      } else {
        IM.updateDialogs();
      }
    }
    IM.scrollOn(IM.r(peer) && peer != -2 && peer != -4);
  },
  restorePeerMedia: function (peer) {
    var previewEl = ge('im_media_preview'),
        docsEl = ge('im_docs_preview'),
        curEl,
        peerMedia = cur.imPeerMedias[peer] || [],
        togglePreview = false, toggleDocs = false;

    while (curEl = previewEl.firstChild) re(curEl);
    while (curEl = docsEl.firstChild) re(curEl);
    // val(previewEl, '');
    // val(docsEl, '');
    each (peerMedia, function (k, v) {
      if (!v) return;
      if (v[0] == 'photo' || v[0] == 'video') {
        previewEl.appendChild(v[2]);
        togglePreview = true;
      } else {
        docsEl.appendChild(v[2]);
        toggleDocs = true;
      }
    });
    var len = 0, i;
    for (i in peerMedia) {
      if (peerMedia[i]) len++;
    }
    toggle('im_add_media', len < cur.attachments_num_max);
    toggle(previewEl, togglePreview);
    toggle(docsEl, toggleDocs);
  },
  applyPeer: function () {
    var peer = cur.peer;

    if (IM.r(peer)) {
      val('im_peer_holders', '');
      hide('im_chat_actions');
      return;
    }
    var user = cur.tabs[peer], user_data = user.data, acts = {};
    if (user.msg_count && !user.all_shown) {
      acts['8'] = getLang('mail_im_load_all_history');
    } else {
      delete acts['8'];
    }
    if (peer < -2e9) {
      acts['9'] = getLang('mail_im_delete_email_contact');
    } else if (user.msg_count) {
      acts['9'] = getLang('mail_im_delete_all_history');
    } else {
      delete acts['9'];
    }
    if (peer > 0 && peer < 2e9 && cur.friends[peer + '_']) {
      acts['10'] = getLang('mail_im_create_chat_with');
    }
    if (peer > 2e9) {
      val('im_peer_holders', user_data.members_grid);
      val('im_rcpt', user_data.members_text);
      extend(acts, user_data.actions);
      var txt = ge('im_txt' + peer);
      if (txt.disabled && !user_data.kicked) {
        txt.disabled = false;
        val(txt, '');
        show(txt.previousSibling);
      } else if (!txt.disabled && user_data.kicked) {
        txt.disabled = true;
        val(txt, getLang('mail_chat_youre_kicked'));
        hide(txt.previousSibling);
      }
      val(geByClass1('im_tab3', ge('im_tab' + peer), 'div'), user.name + '<span id="im_unread'+peer+'">'+val('im_unread'+peer)+'</span>');
    } else {
      if (peer < -2e9) {
        var peerLink = '/im?sel=e' + (-peer - 2e9);
      } else {
        var peerLink = '/id' + peer;
      }
      val('im_peer_holders', '<div class="im_peer_holder fl_l"><div class="im_photo_holder"><a href="'+peerLink+'" target="_blank" onclick="return nav.go(this, event);"><img src="'+user.photo+'"/></a></div><div class="im_status_holder" id="im_status_holder"></div></div>');

      if (cur.friends[peer + '_']) {
        IM.updateOnline(cur.friends[peer + '_'][0]);
      }
    }
    var types = [], bgpos = {'1': 0, '2': -22, '3': -110, '4': -88, '8': -44, '9': -66};
    each (acts, function (k, v) {
      types.push([k, v, '0 ' + bgpos[k] + 'px', IM.onActionMenu.pbind(k)]);
    });
    cur.actionsMenu.setItems(types);

    var hasActs = false;
    for (var i in acts) {hasActs = true; break;}
    toggle('im_chat_actions', hasActs);
    toggle('im_status', peer < 2e9);
    toggle('im_rcpt', peer > 2e9);
  },

  addTab: function(mid, tab_text, name, photo, hash, sex, data) {
    var tab = se(rs(cur.tab_template, {peer_id: mid, peer_name: tab_text.replace(/\s+/g, '&nbsp;')})),
        txtWrap = se(rs(cur.txt_template, {peer_id: mid})),
        txt = geByTag1('textarea', txtWrap);

    cur.tabs[mid] = {name: name, tab_text: tab_text, photo: photo, hash: IM.decodehash(hash), sex: sex, msgs: {}, all_shown: 0, msg_count: 0, tables: 0, unread: 0, auto: 1, sent: 0, new_msgs: [], elem: ge('im_tabs').appendChild(tab), data: data || false, delayed: []};
    ge('im_texts').appendChild(txtWrap);

    IM.initTabEvents(mid);

    var text = '<a href="write' + mid + '?hist=1&offset=-1" target="_blank" class="im_more" id="im_more' + mid + '" onclick="return IM.loadHistory(' + mid + ', 1)" style="display: block;"><div>' + getLang('mail_im_more_history') + '</div></a>';
    text += '<table cellspacing="0" cellpadding="0" id="im_log' + mid + '" class="im_log_t"><tbody></tbody></table>';
    text += '<div class="im_none" id="im_none' + mid + '">' + getLang('mail_im_here_history') + '</div>';
    text += '<div class="error" style="margin: 5px; display: none" id="im_error' + mid + '"></div>';
    var rows = ce('div', {className: 'im_rows', id: 'im_rows' + mid, innerHTML: text}, {display: 'none'});
    cur.imEl.rows.appendChild(rows);


    IM.initTxt(mid);
    show(ge('im_tab' + mid));
    IM.updateTopNav();
  },

  updateFriends: function (upd_multi) {
    if (!cur.imEl) {
      window.console && console.trace && console.trace();
      return;
    }
    if (upd_multi) {
      toggle('im_friends', !cur.multi);
      toggle('im_friends_multi', cur.multi);
      IM.multiFriends();
    }
    if (!cur.peer) IM.filterFriends();
    if (cur.friendsLoaded) {
      ajax.post('al_im.php', {act: 'a_onlines', peer: cur.peer}, {
        onDone: function (friendsOnline, newmsg) {
          for (var i in cur.friends) {
            cur.friends[i][0] = friendsOnline[intval(i)] ? 1 : 0;
          }
          if (!cur.peer) {
            IM.filterFriends();
          } else {
            IM.updateOnline(friendsOnline[cur.peer] ? 1 : 0);
          }
          IM.updateUnread(newmsg);
        }
      });
    } else {
      if (cur.multi) return;
      ajax.post('al_im.php', {act: 'a_friends'}, {
        onDone: function (friends) {
          cur.friendsLoaded = 1;
          cur.friends = friends;
          IM.cacheFriends();
          if (!cur.peer) {
            IM.filterFriends();
          } else if (!IM.r() && cur.friends[cur.peer + '_']) {
            IM.applyPeer();
          }
        }
      });
    }
    if (cur.peer > 2e9) {
      IM.updateChat(cur.peer);
    }
    clearTimeout(cur.updateFriendsTO);
    cur.updateFriendsTO = setTimeout(IM.updateFriends, 300000);
  },

  updateDialogs: function () {
    var tabEl = geByClass1('tab_word', ge('tab_dialogs'), 'b');
    ajax.post('al_im.php', {act: 'a_get_dialogs', offset: 0}, {
      onDone: function (options, rows, next_rows) {
        hide('im_progress');
        if (rows) {
          var moreEl = ge('im_more_dialogs');
          ge('im_dialogs').innerHTML = rows;
          ge('im_dialogs').appendChild(moreEl);
          if (next_rows) {
            ge('im_dialogs').appendChild(ce('div', {id: 'im_dialogs_next', innerHTML: next_rows}));
            ge('im_more_dialogs').onclick = function () {
              IM.showMoreDialogs(options.offset, options.has_more);
              return false;
            };
          } else {
            hide(moreEl);
          }
          IM.onScroll();
        }
        IM.updateUnread(options.newmsg);
        cur.deletedDialogs = {};
      }
    });
    show('im_progress');
  },

  cacheFriends: function(q) {
    if (q) {
      if (!IM.friends_cache[q]) IM.friends_cache[q] = {};

      var queries = [q], t;
      if (t = parseLatin(q)) {
        queries.push(t);
      }
      if (t = IM.parseLatKeys(q)) {
        queries.push(t);
      }
      if (t = IM.parseCyr(q)) {
        queries.push(t);
      }
      for (var i in queries) {
        query = queries[i];
        var search_in = IM.friends_cache[query.substr(0, 1).toLowerCase()];
        if (search_in) {
          query = escapeRE(query);
          for (var i in search_in) {
            if (intval(i) > 2e9) {
              var name = cur.chats[i];
            } else if (intval(i) < -2e9) {
              var name = cur.emails[i]
            } else if (cur.friends[i]) {
              var name = cur.friends[i][1].replace('&nbsp;', ' ');
            }
            if ((new RegExp('^' + query + '|\\s' + query + '|\\(' + query, 'gi')).test(name.replace('¸', 'å'))) {
              IM.friends_cache[q][i] = 1;
            }
          }
        }
      }
    } else {
      IM.friends_cache = {};
      for (var i in cur.friends) {
        var name = cur.friends[i][1].replace('&nbsp;', ' ').replace('¸', 'å');
        var cursor = 0, letter;
        while (1) {
          letter = name.charAt(cursor).toLowerCase();
          if (!IM.friends_cache[letter]) {
            IM.friends_cache[letter] = {};
          }
          IM.friends_cache[letter][i] = 1;
          cursor = name.indexOf(' ', cursor + 1);
          if (cursor == -1) break;
          ++cursor;
        }
      }
      for (i in cur.chats) {
        var name = cur.chats[i].replace('&nbsp;', ' ').replace('¸', 'å');
        var cursor = 0, letter;
        while (1) {
          letter = name.charAt(cursor).toLowerCase();
          if (!IM.friends_cache[letter]) {
            IM.friends_cache[letter] = {};
          }
          IM.friends_cache[letter][i] = 1;
          cursor = name.indexOf(' ', cursor + 1);
          if (cursor == -1) break;
          ++cursor;
        }
      }
      for (i in cur.emails) {
        var name = cur.emails[i];;
        var cursor = 0, letter;
        while (1) {
          letter = name.charAt(cursor).toLowerCase();
          if (!IM.friends_cache[letter]) {
            IM.friends_cache[letter] = {};
          }
          IM.friends_cache[letter][i] = 1;
          cursor = name.indexOf(' ', cursor + 1);
          if (cursor == -1) break;
          ++cursor;
        }
      }
    }
  },

  wrapFriends: function(list, online, to_match, simpleOver) {
    var text = [], is_sel, j;
    for (var i in list) {
      j = intval(i);
      if (j > 2e9 || j < -2e9) {
        continue;
      }
      var mem = cur.friends[i] || [0, 'DELETED'];

      if (online !== 1) {
        if (online === true  && !mem[0] ||
            online === false &&  mem[0] ||
            cur.multi_friends[intval(i)])
          continue;

        if (cur.multi_appoint && cur.tabs[cur.multi_appoint].data.members[intval(i)]) {
          continue;
        }
        if (IM.friends_to_pass-- > 0) continue;

        if (++IM.friends_shown > IM.friends_to_show) {
          // var shown_txt = getLang('mail_im_friends_shown', 100);
          var shown_txt = 'Ïîêàçàòü áîëüøå äðóçåé';
          IM.friends_last_list = list;
          IM.friends_last_match = to_match;
          text.push('<a href="#" onclick="IM.showMoreFriends(); return false;" id="im_more_friends">' + shown_txt + '</a>');
          break;
        }
      }

      var name = mem[1].replace('&nbsp;', ' ');
      if (to_match) {
        each(to_match, function() {
          var re = new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + this + ")(?![^<>]*>)(?![^&;]+;)", "gi");
          name = name.replace(re, "<em>\$1</em>");
        });
      }

      var txt = '<img src="' + mem[2] + '" class="fl_l" /><div class="fl_l"><nobr>' + name + '</nobr></div>';
      if (mem[0]) {
        txt += '<div class="online fl_l">'+langSex(0, getLang('global_online_sm'))+'</div>';
      }
      var cls = '';
      if (cur.isPeerFirst) {
        cls = ' im_friend_over';
        cur.isPeerFirst = false;
      }
      if (simpleOver) {
        var over = 'onmouseover="addClass(this, \'im_friend_over\');" onmouseout="removeClass(this, \'im_friend_over\');"';
      } else {
        var over = 'onmousemove="IM.friendOver(this);"';
      }

      text.push('<div class="im_friend', cls, '" id="im_friend', intval(i), '" ', over, ' onclick="IM.selectPeer(', intval(i), ')">', txt, '</div>');
    }
    return text.join('');
  },

  wrapCorrespondents: function (q, to_match) {
    clearTimeout(cur.correspondentsTO);
    cur.correspondentsTO = setTimeout(function () {
      if (q != cur.searchQ) {return;}
      ajax.post('hints.php', {act: 'a_json_friends', str: q, from: 'im'}, {
        onDone: function (correspondents) {
          if (q != cur.searchQ) {return;}
          var text = [];
          each (correspondents || [], function (i) {
            if (ge('im_friend' + this[3])) {
              return;
            }
            var name = this[1];
            each(to_match, function() {
              var re = new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + this + ")(?![^<>]*>)(?![^&;]+;)", "gi");
              name = name.replace(re, "<em>\$1</em>");
            });
            var txt = '<img src="' + this[2] + '" class="fl_l" /><div class="fl_l"><nobr>' + name + '</nobr></div>';
            if (this[0]) {
              txt += '<div class="online fl_l">'+langSex(0, getLang('global_online_sm'))+'</div>';
            }
            text.push('<div class="im_friend" id="im_friend', this[3], '" ', 'onmousemove="IM.friendOver(this);"', ' onclick="IM.selectPeer(', this[3], ')">', txt, '</div>');
          });

          var el = ge('im_correspondents');
          if (!el) {
            return;
          }
          var wrap = el.parentNode, has = false,
              div = ce('div', {innerHTML: text.join('')}),
              frag = document.createDocumentFragment();
          re(geByClass1('im_friend_not_found', wrap));
          re(geByClass1('im_find_in_mail', wrap));
          if (div.firstChild) {
            has = true;
            while (div.firstChild) {
              frag.appendChild(div.firstChild);
            }
          } else {
            if (cur.multi && (!correspondents || !correspondents.length)) {
              frag.appendChild(ce('div', {className: 'im_friend_not_found', innerHTML: cur.lang['mail_im_empty_search']}));
              return;
            }
          }
          if (!cur.multi) {
            if (cur.multi_appoint) {
              frag.appendChild(ce('div', {className: 'im_friend_not_found', innerHTML: getLang('mail_im_empty_search')}));
            } else {
              var cl = 'im_find_in_mail im_friend' + ((has || IM.friends_shown) ? '' : ' im_friend_over');
              frag.appendChild(ce('a', {href: '/im?q=' + encodeURIComponent(q), onmousemove: function() { IM.friendOver(this); }, className: cl, innerHTML: getLang('mail_im_search_query').replace('{query}', '<b>' + q.replace('<', '&lt;') + '</b>'), onclick: IM.findClick}));
            }
          }
          wrap.replaceChild(frag, el);
        },
        cache: 1
      })
    }, 100);
  },
  findClick: function(e) {
    e = e || window.event;
    if (checkEvent(e)) {
      return;
    }
    IM.searchMessages();
    return cancelEvent(e);
  },

  wrapEmail: function (name, to_match, user_id) {
    if (!user_id) {
      user_id = -2000000000;
      if (name.split('@')[1].indexOf('.') == -1) {
        name += '...';
      }
    }
    var cls = '';
    if (cur.isPeerFirst) {
      cls = ' im_friend_over';
      cur.isPeerFirst = false;
    }
    var text = ['<div class="im_friend im_chat', cls,'" id="im_friend', user_id, '" onmousemove="IM.friendOver(this);" onclick="IM.selectPeer(', user_id, ')"><img src="/images/contact_32.gif" class="fl_l" /><div class="fl_l"><nobr>', name, '</nobr></div>'];
    return text.join('');
  },

  wrapEmails: function (list, to_match, selected) {
    var text = [];
    var emails_list = to_match ? list : cur.emails;


    for (var i in emails_list) {
      var user_id = intval(i);
      if (to_match && user_id > -2e9) {
        continue;
      }
      if (!selected && cur.multi && cur.multi_friends[user_id]) {
        continue;
      }
      var email = cur.emails[i];

      if (IM.friends_to_pass-- > 0) continue;

      if (!selected && ++IM.friends_shown > IM.friends_to_show) {
        var shown_txt = 'Ïîêàçàòü áîëüøå äðóçåé';
        IM.friends_last_list = list;
        IM.friends_last_match = to_match;
        text.push('<a href="#" onclick="IM.showMoreFriends(); return false;" id="im_more_friends">' + shown_txt + '</a>');
        break;
      }

      if (to_match) {
        each(to_match, function() {
          var re = new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + this + ")(?![^<>]*>)(?![^&;]+;)", "gi");
          email = (email || '').replace(re, "<em>\$1</em>");
        });
      }

      var cls = '';
      if (cur.isPeerFirst) {
        cls = ' im_friend_over';
        cur.isPeerFirst = false;
      }

      if (selected) {
        var over = 'onmouseover="addClass(this, \'im_friend_over\');" onmouseout="removeClass(this, \'im_friend_over\');"';
      } else {
        var over = 'onmousemove="IM.friendOver(this);"';
      }

      text.push('<div class="im_friend im_chat',cls ,'" id="im_friend', user_id, '" ', over,' onclick="IM.selectPeer(', user_id, ')"><img src="/images/contact_32.gif" class="fl_l" /><div class="fl_l"><nobr>', email, '</nobr></div></div>');
    }
    return text.join('');
  },

  wrapChats: function (list, to_match) {
    var text = [], is_sel, chat_list = to_match ? list : cur.chats, limit = 20;
    for (var i in chat_list) {
      if (to_match && intval(i) < 2e9) {
        continue;
      }
      var chat_title = cur.chats[i];

      if (IM.friends_to_pass-- > 0) continue;
      if (!to_match && !(limit--)) break;

      // debugLog(i, chat_title);
      if (++IM.friends_shown > IM.friends_to_show) {
        // var shown_txt = getLang('mail_im_friends_shown', 100);
        var shown_txt = 'Ïîêàçàòü áîëüøå äðóçåé';
        IM.friends_last_list = list;
        IM.friends_last_match = to_match;
        text.push('<a href="#" onclick="IM.showMoreFriends(); return false;" id="im_more_friends">' + shown_txt + '</a>');
        break;
      }

      var name = chat_title;
      if (to_match) {
        each(to_match, function() {
          var re = new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + this + ")(?![^<>]*>)(?![^&;]+;)", "gi");
          name = name.replace(re, "<em>\$1</em>");
        });
      }
      var cls = '';
      if (cur.isPeerFirst) {
        cls = ' im_friend_over';
        cur.isPeerFirst = false;
      }
      var txt = '<img src="/images/icons/multichat.png" class="fl_l" /><div class="fl_l"><nobr>' + name + '</nobr></div>';
      text.push('<div class="im_friend im_chat', cls, '" id="im_friend' + intval(i) + '" onmousemove="IM.friendOver(this);" onclick="IM.selectPeer(' + intval(i) + ')">' + txt + '</div>');
    }
    return text.join('');
  },

  wrapPeers: function (friends, to_match) {
    var text = '', corresp = '<div id="im_correspondents"></div>';
    cur.isPeerFirst = to_match ? true : false;
    if (!cur.multi) {
      text += IM.wrapFriends(friends, true, to_match);
      if (IM.friends_shown <= IM.friends_to_show) {
        text += IM.wrapFriends(friends, false, to_match);
      }
      if (IM.friends_shown <= IM.friends_to_show && !cur.multi_appoint) {
        text += IM.wrapChats(friends, to_match);
      }
      if (IM.friends_shown <= IM.friends_to_show) {
        text += IM.wrapEmails(friends, to_match);
        if (cur.addEmailPeer && to_match) {
          var i = 0;
          for (i in friends) break;
          if (!i) {
            text += IM.wrapEmail(cur.addEmailPeer, to_match);
          }
        }
      }
      if (IM.friends_shown <= IM.friends_to_show && to_match) {
        re('im_correspondents');
        text += corresp;
        IM.wrapCorrespondents(cur.searchQ, to_match);
      }
      if (trim(cur.searchQ) && !cur.multi_appoint) {
        var cl = 'im_find_in_mail im_friend' + (IM.friends_shown ? '' : ' im_friend_over');
        text += '<a href="/im?q=' + encodeURIComponent(cur.searchQ) + '" class="' + cl + '" onmousemove="IM.friendOver(this)" onclick="return IM.findClick(event)">' + getLang('mail_im_search_query').replace('{query}', '<b>' + cur.searchQ.replace('<', '&lt;') + '</b>') + '</a>';
      }
    } else {
      var len = false, i;
      for (i in cur.multi_friends || {}) {
        len = true;
        break;
      }
      if (!cur.multi_appoint && !len) {
        text += IM.wrapChats(friends, to_match);
      }
      if (IM.friends_shown <= IM.friends_to_show) {
        text += IM.wrapFriends(friends, true, to_match);
      }
      if (IM.friends_shown <= IM.friends_to_show) {
        text += IM.wrapFriends(friends, false, to_match);
      }
      if (IM.friends_shown <= IM.friends_to_show) {
        text += IM.wrapEmails(friends, to_match);
      }
      if (cur.addEmailPeer && to_match) {
        var i = 0;
        for (i in friends) break;
        if (!i) {
          text += IM.wrapEmail(cur.addEmailPeer, to_match);
        }
      }
      if (to_match && !text && cur.limitedUser) {
        text += '<div class="im_friend_not_found">' + getLang('mail_im_empty_search') + '</div>';
      }
    }
    return text;
  },

  showMoreFriends: function () {
    var friends = IM.friends_last_list;
    var to_match = IM.friends_last_match;
    IM.friends_to_pass = IM.friends_shown;
    IM.friends_to_show += 100;

    var text = IM.wrapPeers(friends, to_match);
    var more_link = ge('im_more_friends');
    more_link.parentNode.removeChild(more_link);
    ge('im_friends').appendChild(ce('div', {innerHTML: text}));
  },

  filterFriends: function(no_force) {
    var q = trim(val('im_filter')).toLowerCase();

    if (no_force && q == cur.searchQ) return;
    cur.searchQ = q;

    var t = parseLatin(q);
    var to_match = t ? [escapeRE(q), escapeRE(t)] : (q ? [escapeRE(q)] : false);

    if (q.length > 1 && !IM.cacheFriends[q] || q.length == 1 && parseLatin(q)) IM.cacheFriends(q);
    var friends = q ? IM.friends_cache[q] : cur.friends;


    if (cur.limitedUser) {
      cur.addEmailPeer = (q.indexOf('@') != -1) ? q : false;
    }

    // selUser
    for (var f in friends) break;
    cur.selUser = intval(f);

    IM.friends_shown = 0;
    IM.friends_to_show = 100;
    IM.friends_to_pass = 0;
    var text = IM.wrapPeers(friends, to_match);
    if (!IM.friends_shown) {
      var has_friends = false;
      for (var i in cur.friends) {
        has_friends = true;
        break;
      }
      if (!has_friends && cur.friendsLoaded) {
        hide('im_filter_out');
        text += '<div class="im_none" style="display: block;">' + getLang('mail_im_no_friends') + '</div>';
      }
    }
    val(cur.multi ? 'im_friends_all' : 'im_friends', text);
    val(!cur.multi ? 'im_friends_all' : 'im_friends', '');
    IM.updateScroll();
  },

  multiFriends: function () {
    var len = 0, i;
    for (i in cur.multi_friends) len++;
    toggle('im_friends_none_wrap', !len);
    toggle('im_friends_yes_wrap', len);

    if (!len) return;

    var friends = {}, i;
    for (i in cur.multi_friends) {
      if (i > 0) {
        friends[i + '_'] = cur.friends[i + '_'];
      } else if (i < -2e9) {
        friends[i + '_'] = cur.emails[i + '_'];
      }
    }
    var text = IM.wrapFriends(friends, 1, false, true);
    text += IM.wrapEmails(friends, 1, true);
    val('im_friends_sel', text);
    val('im_friends_sel_count', getLang('mail_im_X_friends_selected', len));
  },

  selectDialog: function(mid, e) {
    if (checkEvent(e)) {
      var wnd = window.open('/im?sel=' + IM.peerToId(mid), '_blank');
      try {wnd.blur(); window.focus();} catch (e) {}
    } else {
      IM.addPeer(mid);
    }
  },

  selectPeer: function (mid) {
    if (!cur.multi) {
      if (mid == -2e9 && cur.addEmailPeer) {
        if (cur.multi_appoint) {
          IM.updateChat(cur.multi_appoint, true, {new_peer: cur.addEmailPeer});
          IM.activateTab(cur.multi_appoint);
        } else {
          IM.addEmail(mid, cur.addEmailPeer);
        }
        return;
      }
      if (cur.multi_appoint) {
        IM.updateChat(cur.multi_appoint, true, {new_peer: mid});
        IM.activateTab(cur.multi_appoint);
      } else {
        IM.addPeer(mid);
        // IM.attachMsgs();
      }
      return;
    }
    if (mid > 2e9) {
      IM.addPeer(mid);
      return;
    }
    var len = 0, row = ge('im_friend' + mid), i;
    for (i in cur.multi_friends) len++;
    if (mid == -2e9) { // custom email address
      var min = -2e9;
      for (i in cur.emails) {
        if (cur.emails[i] == cur.addEmailPeer) {
          var filter = ge('im_filter');
          val(filter, '');
          hide('im_filter_reset');
          filter.focus();
          return;
        }
        if (intval(i) < min) {
          min = intval(i);
        }
      }
      mid = min - 1;
      cur.emails[mid+'_'] = cur.addEmailPeer.replace(/,/g, '');
    }
    if (!cur.multi_friends[mid]) {
      if (len >= cur.multi_peers_max - 1) {
        setTimeout(showFastBox(getLang('global_error'), getLang('mail_im_multi_limit', cur.multi_peers_max)).hide, 5000);
        return;
      }
      re(row);
      cur.multi_friends[mid] = 1;
      if (len && row) {
        ge('im_friends_sel').appendChild(row)
      }
      IM.multiFriends();
    } else {
      re(row);
      delete cur.multi_friends[mid];
      IM.multiFriends();
      IM.filterFriends();
    }
    var filter = ge('im_filter');
    val(filter, '');
    hide('im_filter_reset');
    filter.focus();
  },

  startChat: function (btn) {
    var sel = [], i;
    for (i in cur.multi_friends) {
      if (i < -2e9) { // emails
        sel.push(cur.emails[i + '_']);
      } else { // users
        sel.push(i);
      }
    }
    if (!sel.length) return;

    if (sel.length == 1) {
      IM.addPeer(sel[0]);
      // IM.attachMsgs();
      return;
    }
    if (sel.length >= cur.multi_peers_max) {
      setTimeout(showFastBox(getLang('global_error'), getLang('mail_im_multi_limit', cur.multi_peers_max)).hide, 5000);
      return;
    }
    ajax.post('al_im.php', {act: 'a_multi_start', title: val('im_chat_title_input'), peers: sel.join(',')}, {
      onDone: function(res) {
        if (res.peer && cur.tabs[res.peer]) {
          IM.activateTab(res.peer);
        } else {
          IM.addTab(res.peer, res.tab, res.name, res.photo, res.hash, 0, res.data);
          IM.updateScroll();
          cur.tabs[res.peer].history = false;
          IM.activateTab(res.peer);
        }
        IM.attachMsgs();
      },
      onFail: function(text) {
        setTimeout(showFastBox({
          title: getLang('global_error'),
          onHide: function() {
            IM.activateTab(-1);
          }
        }, text, getLang('global_close')).hide, 4500);
        return true;
      },
      showProgress: lockButton.pbind(btn),
      hideProgress: unlockButton.pbind(btn)
    });
    val('im_chat_title_input', '');
    val('im_friends_sel', '');
  },
  updateChat: function (peer, force, options) {
    // debugLog(peer, options, cur.tabs[peer]);
    var curTab = cur.tabs[peer], curData = curTab.data, curMems = [];
    if (options) {
      curTab.lastModifiedTime = vkNow();
    }
    if (vkNow() - curTab.lastUpdatedTime < 10000 && !force) {
      return;
    }
    curTab.lastUpdatedTime = vkNow();
    each (curData.members, function (id) {
      curMems.push(id);
    });
    ajax.post('al_im.php', extend({act: 'a_get_chat', chat: peer - 2e9, cur_peers: curMems.join(','), cur_title: replaceEntities(curData.title), hash: curTab.hash}, options || {}), {
      onDone: function (evs, newTab) {
        if (newTab.hash) {
          newTab.hash = IM.decodehash(newTab.hash);
        }
        extend(cur.tabs[peer], newTab);
        IM.applyPeer();
        var hist = ge('im_log' + peer), len = hist && hist.rows.length, ev;
        if (!hist) {
          debugLog(peer, evs);
          return;
        }
        each(evs, function () {
          var msg_id = --curTab.sent,
              row = extend(hist.insertRow(len++), {className: 'im_in im_chat_event', id: 'mess' + msg_id}),
              date = Math.floor(vkNow() / 1000);

          extend(row.insertCell(0), {className: 'im_log_act'});
          extend(row.insertCell(1), {innerHTML: this.user || '', className: 'im_log_author'});
          extend(row.insertCell(2), {innerHTML: this.message, className: 'im_log_body'});
          extend(row.insertCell(3), {innerHTML: '<span>' + IM.mkdate(date + cur.tsDiff) + '</span><input type="hidden" id="im_date' + msg_id + '" value="' + date + '" />', className: 'im_log_date'});
          extend(row.insertCell(4), {className: 'im_log_rspacer'});

          hide('im_none' + peer);
          show('im_log' + peer);
        });
        while (ev = curTab.delayed.shift()) {
          IM.addMsg.apply(IM, ev);
        }
        if (cur.peer == peer) {
          IM.scrollAppended();
        }
      }
    });
  },
  inviteToChat: function () {
    // debugLog(cur.peer);
    if (cur.peer <= 2e9) return;
    var mems = cur.tabs[cur.peer].data.members, len = 0, i;
    for (i in mems) len++;
    if (len >= cur.multi_peers_max) {
      setTimeout(showFastBox(getLang('global_error'), getLang('mail_im_multi_limit', cur.multi_peers_max)).hide, 5000);
      return;
    }
    if (cur.tabs[cur.peer].data.closed) {
      setTimeout(showFastBox(getLang('global_error'), getLang('mail_im_invite_closed')).hide, 5000);
      return;
    }
    IM.activateTab(0, 2);
  },
  leaveChat: function (force) {
    var peer = cur.peer;
    if (peer <= 2e9) return;

    if (!force) {
      var box = showFastBox(getLang('mail_chat_leave_title'), getLang('mail_chat_leave_confirm'), getLang('box_yes'), function () {
        IM.leaveChat(true);
        box.hide();
      }, getLang('box_no'), function () {
        box.hide();
      });
      return;
    }
    ajax.post('al_im.php', extend({act: 'a_leave_chat', chat: peer - 2e9, hash: cur.tabs[peer].hash}), {
      onDone: function () {
        delete cur.chats[peer+'_'];
        IM.cacheFriends();
        IM.closeTab(peer);
      }
    });
  },
  returnToChat: function () {
    var peer = cur.peer;
    if (peer <= 2e9) return;

    ajax.post('al_im.php', extend({act: 'a_return_to_chat', chat: peer - 2e9, hash: cur.tabs[peer].hash}), {
      onDone: function () {

      }
    });
  },
  changeChatTopic: function (force) {
    var peer = cur.peer;
    if (peer <= 2e9) return;

    var onsubmit = function () {
      var topicVal = trim(val(inp));
      if (!topicVal) {
        notaBene(inp);
        return;
      }
      IM.updateChat(peer, true, {new_title: topicVal});
      box.hide();
    },
        box = showFastBox(getLang('mail_chat_topic_change_title'), '<div class="im_change_topic_wrap clear_fix"><div class="im_change_topic_label fl_l ta_r">' + getLang('mail_chat_topic_change_label') + '</div><div class="im_change_topic_labeled fl_l"><input id="im_change_topic_val" class="text" /></div></div>', getLang('global_save'), onsubmit, getLang('global_cancel'), function () {
      box.hide();
    }),
        inp = ge('im_change_topic_val');
    val(inp, replaceEntities(cur.tabs[cur.peer].name));
    elfocus(inp);
    addEvent(inp, 'keydown', function (e) {
      if (e.keyCode == 13) {
        onsubmit();
      }
    });
  },

  showChatMembers: function () {
    var peer = cur.peer;
    if (peer <= 2e9) return;
    showBox('al_im.php', {act: 'a_show_members_box', chat: peer - 2e9}, {stat: ['boxes.css']});
  },

  searchMessages: function () {
    var q = trim(val('im_filter')), btn = ge('im_search_btn');
    cur.lastSearchQ = cur.searchQ = q || '';
    if (!q) {
      setTimeout(IM.activateTab.pbind(-1), 50);
      return;
    }
    IM.activateTab(-2);
    cur.searchOffset = false;
    cur.searchLoading = true;

    ajax.post('al_im.php', {act: 'a_search', q: q}, {
      onDone: function (rows, nextOffset) {
        cur.searchLoading = false;
        cur.searchOffset = nextOffset;
        var none = !rows;
        toggle('im_more-2', rows && nextOffset);
        toggle('im_log_search', !none);
        toggle('im_none-2', none);
        if (!none) {
          var t = ge('im_log_search');
          t.parentNode.replaceChild(se(rows), t);
        }
        IM.scrollOn();
        IM.updateLoc();
        cur.lastSearchQ = q;
      },
      progress: 'im_search_prg'
    });
  },

  showMoreSearch: function() {
    var q = cur.searchQ;
    if (cur.searchLoading || cur.searchOffset === false || !q) return false;
    cur.searchLoading = true;

    ajax.post('al_im.php', {act: 'a_search', q: q, offset: cur.searchOffset}, {
      onDone: function (html, nextOffset) {
        if (q != cur.searchQ) {
          return;
        }
        cur.searchLoading = false;
        var table = ge('im_log_search');
        if (!table) {
          // fail!
          return;
        }
        cur.searchOffset = nextOffset;
        var cur_rows = geByTag1('tbody', table),
            new_t = se(html),
            new_rows = geByTag1('tbody', new_t),
            before_row = cur_rows.firstChild, add_row, row_id;

        doScroll =IM.loadHistoryScroll.bind(IM).pbind(
          browser.msie6 ? pageNode.scrollHeight : (htmlNode.scrollHeight || bodyNode.scrollHeight),
          scrollGetY(),
          !nextOffset
        );
        table.parentNode.insertBefore(new_t, table);
        doScroll();
        toggle('im_more-2', nextOffset);
        IM.updateScroll();

        setTimeout(function () {
          while (add_row = new_rows.firstChild) {
            if (!add_row.id.match(/messq\d+/)) {
              new_rows.removeChild(add_row);
              continue;
            }
            row_id = add_row.id;
            add_row.id = '';
            if (ge(row_id)) {
              new_rows.removeChild(add_row);
              continue;
            }
            add_row.id = row_id;
            cur_rows.insertBefore(add_row, before_row);
          }
          re(new_t);
        }, 0);
        doScroll();
      },
      onFail: function () {
        cur.searchLoading = false;
      }
    });
    return false;
  },

  spamMessages: function () {
    IM.activateTab(-4);
    cur.selSpam = [];
    cur.spam.offset = false;
    cur.spamLoading = true;

    ajax.post('al_im.php', {act: 'a_spam'}, {
      onDone: function (rows, nextOffset) {
        cur.spamLoading = false;
        cur.spam.offset = nextOffset;
        var none = !rows;
        toggle('im_more-4', rows && nextOffset);
        toggle('im_log_spam', !none);
        toggle('im_none-4', none);
        if (!none) {
          var t = ge('im_log_spam');
          t.parentNode.replaceChild(se(rows), t);
        }
        IM.scrollOn();
        IM.updateLoc();
      }
    });
  },

  showMoreSpam: function() {
    cur.spamLoading = true;
    ajax.post('al_im.php', {act: 'a_spam', offset: cur.spam.offset}, {
      onDone: function (html, nextOffset) {
        cur.spamLoading = false;
        var table = ge('im_log_spam');
        if (!table) {
          // fail!
          return;
        }
        cur.spam.offset = nextOffset;
        var cur_rows = geByTag1('tbody', table),
            new_t = se(html),
            new_rows = geByTag1('tbody', new_t),
            before_row = cur_rows.firstChild, add_row, row_id;

        doScroll =IM.loadHistoryScroll.bind(IM).pbind(
          browser.msie6 ? pageNode.scrollHeight : (htmlNode.scrollHeight || bodyNode.scrollHeight),
          scrollGetY(),
          !nextOffset
        );
        table.parentNode.insertBefore(new_t, table);
        doScroll();
        toggle('im_more-4', nextOffset);
        IM.updateScroll();

        setTimeout(function () {
          while (add_row = new_rows.firstChild) {
            if (!add_row.id.match(/messq\d+/)) {
              new_rows.removeChild(add_row);
              continue;
            }
            row_id = add_row.id;
            add_row.id = '';
            if (ge(row_id)) {
              new_rows.removeChild(add_row);
              continue;
            }
            add_row.id = row_id;
            cur_rows.insertBefore(add_row, before_row);
          }
          re(new_t);
        }, 0);
        doScroll();
      },
      onFail: function () {
        cur.spamLoading = false;
      }
    });
    return false;
  },

  showMoreDialogs: function (offset, has_more) {
    var nextDialogsEl = ge('im_dialogs_next');
    if (!nextDialogsEl) {
      return;
    }
    nextDialogsEl.id = '';
    if (has_more) {
      ajax.post('al_im.php', {act: 'a_get_dialogs', offset: offset}, {
        onDone: function (options, rows) {
          if (rows) {
            ge('im_dialogs').appendChild(ce('div', {id: 'im_dialogs_next', innerHTML: rows}));
            ge('im_more_dialogs').onclick = function () {
              IM.showMoreDialogs(options.offset, options.has_more);
              return false;
            };
            ge('im_dialogs').appendChild(ge('im_more_dialogs'));
            IM.onScroll();
          }
          IM.updateUnread(options.newmsg);
        }
      });
    } else {
      hide('im_more_dialogs');
    }
  },
  logMessState: function (state, msg_id) {
    var pos = indexOf(cur.selMsgs, msg_id), posSp = indexOf(cur.selSpam, msg_id), row = ge('mess' + msg_id);
    if (pos != -1 || posSp != -1 || !row || cur.deletedRows[msg_id]) return;
    setStyle('ma' + msg_id, 'visibility', state ? 'visible' : 'hidden');

    if (cur.peer == -4 && !cur.spam.markingRead && hasClass('mess' + msg_id, 'im_new_msg')) {
      IM.markRead(-4, [msg_id.substr(1)]);
    }
  },
  checkLogClick: function (el, event) {
    event = event || window.event;
    if (!el && !event) return false;
    var target = event.target || event.srcElement,
        i = 4,
        foundGood = false,
        checkeRE = /wrapped|im_log_act|im_log_author|im_log_body|im_log_date|im_log_rspacer/;
    do {
      if (!target ||
          target == el ||
          target.onclick ||
          target.onmousedown ||
          target.tagName == 'A' ||
          target.tagName == 'IMG' ||
          target.tagName == 'TEXTAREA' ||
          target.className == 'play_new' ||
          (foundGood = checkeRE.test(target.className))
      ) {
        break;
      }
    } while (i-- && (target = target.parentNode));
    if (!foundGood) {
      return true;
    }
    var sel = trim((
      window.getSelection && window.getSelection() ||
      document.getSelection && document.getSelection() ||
      document.selection && document.selection.createRange().text || ''
    ).toString());
    if (sel) {
      return true;
    }
    return false;
  },
  checkLogMsg: function (msg_id) {
    var pos = indexOf(cur.selMsgs, msg_id), row = ge('mess' + msg_id);
    if (!row || cur.deletedRows[msg_id]) return;
    if (pos == -1) {
      if (cur.selMsgs.length >= 100) {
        return false;
      }
      cur.selMsgs.push(msg_id);
      addClass(row, 'im_sel_row');
      removeClass(ge('mess_check' + msg_id), 'im_log_check_on');
      setStyle('ma' + msg_id, {visibility: ''});
    } else {
      cur.selMsgs.splice(pos, 1);
      removeClass(row, 'im_sel_row');
    }
    val('im_n_marked', getLang('mail_im_X_sel_msgs', cur.selMsgs.length));
    toggle('im_tabs', !cur.selMsgs.length);
    toggle('im_log_controls', cur.selMsgs.length);
  },
  markLogMsgs: function (act, btn) {
    if (!cur.selMsgs.length || IM.r()) return;
    if (act == 'cancel') {
      IM.uncheckLogMsgs();
      return;
    }
    if (act == 'fwd') {
      cur.fwdFromPeer = cur.peer;
      IM.activateTab(0);
      return;
    }
    // So delete or mark as spam
    each (cur.selMsgs, function (k, v) {
      cur.deletedRows[v] = 1;
    });
    ajax.post('al_mail.php', {act: 'a_mark', msgs_ids: cur.selMsgs.join(','), mark: act, from: 'im', hash: cur.mark_hash}, {
      onDone: function (res, restore, actions) {
        each (cur.selMsgs, function (k, msg_id) {
          cur.deletedRows[msg_id] = 1;
          var tr = ge('mess' + msg_id),
              mBody = geByClass1('wrapped', tr),
              mRes = ce('div', {id: 'mres' + msg_id, className: 'im_marked_res', innerHTML: restore.replace(/%s/, msg_id)});
          hide(mBody);
          mBody.parentNode.insertBefore(mRes, mBody);
          addClass(tr, act == 'del' ? 'im_del_row' : 'im_spam_row');
        });
        IM.uncheckLogMsgs();
      },
      showProgress: lockButton.pbind(btn),
      hideProgress: unlockButton.pbind(btn)
    });
  },
  uncheckLogMsgs: function () {
    each (cur.selMsgs, function (k, msg_id) {
      removeClass(ge('mess' + msg_id), 'im_sel_row');
    });
    cur.selMsgs = [];
    show('im_tabs');
    hide('im_log_controls');
  },
  attachMsgs: function () {
    if (!cur.fwdFromPeer || !cur.selMsgs.length) return;

    IM.onMediaChange('mail', cur.selMsgs.join(';'), [cur.selMsgs.length]);
    IM.uncheckLogMsgs();
  },

  checkSpamMsg: function (msg_id) {
    var pos = indexOf(cur.selSpam, msg_id), row = ge('mess' + msg_id);
    if (!row || cur.deletedRows[msg_id]) return;
    if (pos == -1) {
      if (cur.selSpam.length >= 100) {
        return false;
      }
      cur.selSpam.push(msg_id);
      addClass(row, 'im_sel_row');
      removeClass(ge('mess_check' + msg_id), 'im_log_check_on');
      setStyle('ma' + msg_id, {visibility: ''});
    } else {
      cur.selSpam.splice(pos, 1);
      removeClass(row, 'im_sel_row');
    }

    val('im_spam_n_marked', getLang('mail_im_X_sel_msgs', cur.selSpam.length));
    val('im_spam_mark_no', getLang('mail_im_mark_notspam', cur.selSpam.length));
    val('im_spam_mark_del', getLang('mail_im_mark_delspam', cur.selSpam.length));
    toggle('im_spam_controls', cur.selSpam.length);
    toggle('im_spam_flush', !cur.selSpam.length);
  },
  markSpamMsgs: function (act, btn) {
    if (!cur.selSpam.length || cur.peer != -4) return;
    if (act == 'cancel') {
      IM.uncheckSpamMsgs();
      return;
    }
    // So delete or mark as spam
    each (cur.selSpam, function (k, v) {
      cur.deletedRows[v] = 1;
    });
    ajax.post('al_mail.php', {act: 'a_mark', msgs_ids: cur.selSpam.join(',').replace(/s/g, ''), mark: act, from: 'im', hash: cur.mark_hash}, {
      onDone: function (res, restore, cnt, unread) {
        each (cur.selSpam, function (k, msg_id) {
          cur.deletedRows[msg_id] = 1;
          var tr = ge('mess' + msg_id),
              mBody = geByClass1('wrapped', tr),
              mRes = ce('div', {id: 'mres' + msg_id, className: 'im_marked_res', innerHTML: restore.replace(/%s/, msg_id)});
          hide(mBody);
          mBody.parentNode.insertBefore(mRes, mBody);
          addClass(tr, act == 'delspam' ? 'im_del_row' : 'im_spam_row');
        });
        cur.spam.msg_count = cnt;
        cur.spam.unread = unread;
        IM.updateUnreadSpam();
        IM.uncheckSpamMsgs();
      },
      showProgress: lockButton.pbind(btn),
      hideProgress: unlockButton.pbind(btn)
    });
  },
  openMsgDialog: function (msgId) {
    var el = ge('mess' + msgId), peer;
    if (el && (peer = (el.className || '').match(/from(\d+)/))) {
      IM.addPeer(peer[1]);
    }
  },
  uncheckSpamMsgs: function () {
    each (cur.selSpam, function (k, msgId) {
      removeClass(ge('mess' + msgId), 'im_sel_row');
    });
    cur.selSpam = [];
    hide('im_spam_controls');
    show('im_spam_flush');
  },
  flushSpam: function () {
    var onYes = function () {
        ajax.post('/al_mail.php', {act: 'a_flush_spam', hash: cur.spam.flushhash, from: 'im'}, {
          onDone: function (res, text) {
            box.hide();
            cur.spam.unread = cur.spam.msg_count = 0;
            IM.activateTab(-1);
            showDoneBox(text);
          },
          showProgress: box.showProgress,
          hideProgress: box.hideProgress
        });
      },
      box = showFastBox(getLang('mail_deleteall1'), getLang('mail_delete_all_spam'), getLang('mail_delete'), onYes, getLang('mail_close'), onNo),
      onNo = function () {
        box.hide();
      };
  },

  showForwardedBox: function (msg_id, ref_id, hash) {
    showBox('al_im.php', {act: 'a_show_forward_box', id: msg_id, ref_id: ref_id, hash: hash});
  },
  deleteLogMsg: function (msg_id) {
    var ma = ge('ma' + msg_id), tr = ge('mess' + msg_id);
    if (!tr || !ma) return false;
    ma.innerHTML = '<img src="/images/upload.gif" />';
    cur.deletedRows[msg_id] = 1;
    ajax.post('al_mail.php', {act: 'a_delete', id: msg_id, from: 'im', hash: cur.mark_hash}, {onDone: function (res, restore, actions) {
      var mBody = geByClass1('wrapped', tr), mres = ce('div', {id: 'mres' + msg_id, innerHTML: restore});
      hide(mBody);
      mBody.parentNode.insertBefore(mres, mBody);
      addClass(tr, 'im_del_row');
      ma.innerHTML = actions;
    }});
    return false;
  },
  restoreLogMsg: function (msg_id) {
    var ma = ge('ma' + msg_id), tr = ge('mess' + msg_id);
    if (!tr || !ma) return false;
    var mBody = geByClass1('wrapped', tr), mres = ge('mres' + msg_id);
    if  (!mBody || !mres) return false;
    mres.innerHTML = '<img src="/images/upload.gif" />';
    cur.deletedRows[msg_id] = 0;
    ajax.post('al_mail.php', {act: 'a_restore', id: msg_id, from: 'im', hash: cur.mark_hash}, {onDone: function (res, actions) {
      show(mBody);
      re(mres);
      removeClass(tr, 'im_del_row');
    }});
    return false;
  },
  restoreSpamMsg: function (msg_id) {
    var ma = ge('ma' + msg_id), tr = ge('mess' + msg_id);
    if (!tr || !ma) return false;
    var mBody = geByClass1('wrapped', tr), mres = ge('mres' + msg_id);
    if  (!mBody || !mres) return false;
    mres.innerHTML = '<img src="/images/upload.gif" />';
    cur.deletedRows[msg_id] = 0;
    ajax.post('al_mail.php', {act: 'a_restore_spam', id: msg_id, from: 'imspam', hash: cur.mark_hash}, {onDone: function (res, cnt) {
      cur.spam.msg_count = cnt;
      show(mBody);
      re(mres);
      removeClass(tr, 'im_del_row');
    }});
    return false;
  },
  reportLogMsg: function (msg_id) {
    var ma = ge('ma' + msg_id), tr = ge('mess' + msg_id);
    if (!tr || !ma) return false;
    var mBody = geByClass1('wrapped', tr), mres = ge('mres' + msg_id);
    if  (!mBody || !mres) return false;
    ma.innerHTML = '<img src="/images/upload.gif" />';
    ajax.post('al_mail.php', {act: 'a_report_spam', id: msg_id, from: 'im', hash: cur.mark_hash}, {onDone: function (res, restore) {
      addClass(tr, 'im_spam_row');
      removeClass(tr, 'im_del_row');
      mres.innerHTML = restore;
    }});
    return false;
  },
  restoreSpamLogMsg: function (msg_id) {
    var ma = ge('ma' + msg_id), tr = ge('mess' + msg_id);
    if (!tr || !ma) return false;
    var mBody = geByClass1('wrapped', tr), mres = ge('mres' + msg_id);
    if  (!mBody || !mres) return false;
    mres.innerHTML = '<img src="/images/upload.gif" />';
    cur.deletedRows[msg_id] = 0;
    ajax.post('al_mail.php', {act: 'a_restore_spam', id: msg_id, from: 'im', hash: cur.mark_hash}, {onDone: function (res, actions) {
      show(mBody);
      re(mres);
      removeClass(tr, 'im_spam_row');
    }});
    return false;
  },
  onSubmitSettingsChanged: function (val) {
    var curSettings = intval(getCookie('remixsettings_bits'));
    if (curSettings & 2) {
      curSettings &= (~2);
      setCookie('remixsettings_bits', curSettings, 365);
    }
    ajax.post('al_im.php', {act: 'a_save_ctrl_submit', to: cur.peer, value: val ? 1 : 0, hash: cur.tabs[cur.peer].hash});
    cur.ctrl_submit = !!val;
  },
  onActionMenu: function (val) {
    switch (intval(val)) {
      case 1: IM.inviteToChat(); break;
      case 2: IM.changeChatTopic(); break;
      case 3: IM.returnToChat(); break;
      case 4: IM.leaveChat(); break;
      case 8: IM.loadHistory(cur.peer, 2); break;
      case 9: IM.deleteHistory(cur.peer); break;
      case 10: IM.startChatWith(cur.peer); break;
    }
  },
  notify: function (peer_id, msg) {
    if (!cur.notify_on) {
      return;
    }
    var peer, peer_photo, peer_name, title = IM.goodTitle(msg[2], peer_id) && msg[2] || '';
        message = ((title ? (title + ' ') : '') + msg[3]) || '',
        peer_data = cur.tabs[peer_id].data,
        actual_peer = msg[3].match(/<\*>from:(\d+)/);

    message = trim(stripHTML(replaceEntities(message).replace(/<br>/g, "\n").replace(/<\*>.*$/, '')));
    actual_peer = actual_peer && actual_peer[1] || msg[5].from || peer_id;

    if (peer_data && peer_data.members[actual_peer]) {
      peer_name = peer_data.members[actual_peer].name;
      if (peer_data.title) {
        peer_name += ' « ' + peer_data.title;
      }
      peer_photo = peer_data.members[actual_peer].photo;
    } else if (peer = cur.friends[actual_peer + '_']) {
      peer_name = peer[1];
      peer_photo = peer[2];
    } else if (peer = cur.tabs[actual_peer]) {
      peer_name = peer.tab_text;
      peer_photo = peer.photo;
    } else {
      return;
    }
    if (msg[5].attach1_type) {
      message += "\n[" + getLang('mail_added_' + msg[5].attach1_type) + "]";
    } else if (msg[5].fwd) {
      message += "\n[" + getLang('mail_added_msgs') + "]";
    }
    peer_name = (peer_name || '').replace('&nbsp;', ' ');
    if (cur.uiNotifications[peer_id]) {
      cur.uiNotifications[peer_id].cancel();
    }

    var notification = cur.uiNotifications[peer_id] = webkitNotifications.createNotification(peer_photo, peer_name, message);
    notification.onclick = function (e) {
      IM.activateTab(peer_id);
      window.focus();
      notification.cancel();
      setTimeout(elfocus.bind('im_txt' + peer_id), 250);
      cur.uiNotifications[peer_id] = false;
      elfocus('im_txt' + peer_id);
    };
    notification.replaceId = 'im_txt' + peer_id;
    cur.notifyTO = setTimeout(function () {
      notification.cancel();
      cur.uiNotifications[peer_id] = false;
    }, 10000);
    notification.show();
  },
  parseLatKeys: function (text) {
    var outtext = text;
    var lat = "qwertyuiop[]asdfghjkl;'zxcvbnm,./`";
    var rus = "éöóêåíãøùçõúôûâàïðîëäæýÿ÷ñìèòüáþ.¸";
    for(var i=0;i<lat.length;i++){
      outtext = outtext.split(lat.charAt(i)).join(rus.charAt(i));
    }
    return (outtext==text)?null:outtext;
  },
  parseCyr: function (text) {
    var outtext = text;
    var lat1 = ['yo','zh','kh','ts','ch','sch','shch','sh','eh','yu','ya','YO','ZH','KH','TS','CH','SCH','SHCH','SH','EH','YU','YA',"'"];
    var rus1 = ['¸', 'æ', 'õ', 'ö', '÷', 'ù',  'ù',   'ø', 'ý', 'þ', 'ÿ', '¨', 'Æ', 'Õ', 'Ö', '×', 'Ù',  'Ù',   'Ø', 'Ý', 'Þ', 'ß', 'ü'];
    for (var i = 0; i < rus1.length; i++) {
      outtext = outtext.split(rus1[i]).join(lat1[i]);
    }
    var lat2 = 'abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCY¸¨';
    var rus2 = 'àáâãäåçèéêëìíîïðñòóôõöûÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖÛåÅ';
    for (var i = 0; i < rus2.length; i++) {
      outtext = outtext.split(rus2.charAt(i)).join(lat2.charAt(i));
    }
    outtext = outtext.replace(/¨¸/g, 'å');
    return (outtext == text) ? null : outtext;
  },
  r: function(peer) { // is peer reserved
    if (peer === undefined) {
      peer = cur.peer;
    }
    return (peer == 0 || peer == -1 || peer == -2 || peer == -3 || peer == -4);
  },

  deinitWrite: function() {
    show(cur.imEl.bar, cur.imEl.controls, 'im_write_wrap');
    hide('im_to_dialog');
    cur.imEl.rowsWrap.style.overflow = 'hidden';
    if (IM.fixedScroll) {
      hide('footer_wrap');
      addClass(bodyNode, 'im_fixed_nav');
    }
  },
  showToDialog: function(sel) {
    hide('im_to_dialog');
    var mid = false, sex = 0, text = '';
    for (var i in sel) {
      if (mid) return;
      mid = sel[i][0];
      if (mid != intval(mid)) return;
      sex = sel[i][6];
      text = sel[i][7];
    }
    if (!mid || !sex || !text) return;
    text = getLang('mail_im_to_dialog', 3 - sex).replace('{user}', text);
    ge('im_to_dialog').innerHTML = '<a href="/im?sel=' + mid + '" onclick="if (checkEvent(event) === false) { IM.addPeer(' + mid + ', false, false, true); return false; }">' + text + '</a>';
    show('im_to_dialog');
  },
  initWriteDD: function() {
    if (WideDropdown.init('imw_dd', {
      defaultItems: cur.ddfriends,
      url: 'hints.php',
      params: {act: 'a_json_friends', from: 'imwrite'},
      noResult: getLang('mail_not_found'),
      img: 'imw_ava',
      introText: getLang('mail_choose_recipient'),
      custom: function(q) {
        return (q.indexOf('@') != -1) ? [[q, q, getLang('mail_enter_email_address'), '/images/pics/contact50.gif', 0, '']] : false;
      },
      chooseOnBlur: function(id) {
        id = trim(id + '');
        return id.length < 64 && id.match(/^[a-z0-9_\-\.]+@[a-z0-9_\-\.]+\.[a-z]{2,6}$/i);
      },
      onChange: function(act) {
        var dd = cur.wdd['imw_dd'], sel = dd.selCount;
        if (act == 1) { // added
          setTimeout(elfocus.pbind('imw_text'), 0);
        }
        IM.checkNewLen(ge('imw_text'));
        IM.showToDialog(dd.selected);
        val('imw_to_header', getLang((sel > 1) ? 'mail_rcpnts' : 'mail_rcpnt'));
      },
      itemMark: function(item) {
        return intval((cur.friends[item[0] + '_'] || [item[5]])[0]);
      }
    })) {
      cur.destroy.push(WideDropdown.deinit.pbind('imw_dd'));
    }
    if (cur.ddfriends_sel) {
      var sel = cur.ddfriends_sel[0];
      cur.wdd.imw_dd.over = sel;
      cur.wdd.imw_dd.shown = {};
      cur.wdd.imw_dd.shown[sel + '_'] = cur.ddfriends_sel;
      WideDropdown.select('imw_dd');
      delete cur.wdd.imw_dd.shown[sel + '_']
      delete cur.ddfriends_sel;
      if (window.curFastChat && curFastChat.tabs && (chatTab = curFastChat.tabs[sel])) {
        chatTab.box.minimize();
        cur.hiddenChats[sel] = 1;
      }
    }
  },
  initWrite: function() {
    removeClass(bodyNode, 'im_fixed_nav');
    hide(cur.imEl.bar, cur.imEl.controls, 'im_top_sh', 'im_bottom_sh', 'im_write_wrap');
    show('footer_wrap');
    cur.imEl.rowsWrap.style.overflow = 'visible';

    autosizeSetup('imw_text', {minHeight: 90, maxHeight: 400});
    if (cur.wdd && cur.wdd['imw_dd']) {
      IM.showToDialog(cur.wdd['imw_dd'].selected);
    } else if (cur.ddfriends) {
      stManager.add(['wide_dd.css', 'wide_dd.js'], IM.initWriteDD);
    } else {
      ajax.post('hints.php', {act: 'a_json_friends', from: 'imwrite', str: ''}, {stat: ['wide_dd.css', 'wide_dd.js'], onDone: function(arr) {
        cur.ddfriends = arr;
        IM.initWriteDD();
      }});
    }
    if (!cur.imwMedia) {
      cur.imwMediaSaved = {};
      cur.imwMedia = initAddMedia('imw_attach', 'imw_media_preview', [['photo', getLang('profile_wall_photo')], ['video', getLang('profile_wall_video')], ['audio', getLang('profile_wall_audio')], ['doc', getLang('profile_wall_doc')], ['map', getLang('profile_wall_map')]], {mail: 1});
      cur.imwMedia.onChange = function(type, value, data) {
        if (type) {
          show('imw_media_preview');
          cur.imwMediaSaved[type + value] = [type, value, data];
        } else if (!cur.imwMedia.attachCount()) {
          hide('imw_media_preview');
        }
      };
      cur.imwMedia.onProgress = function(type) {
        if (type) {
          show('imw_media_preview');
        }
      }
    }
  },
  clearWrite: function() {
    WideDropdown.deselect('imw_dd');
    val('imw_text', '');
    val('imw_title', '');
    cur.imwMedia.unchooseMedia();
    cur.imwMediaSaved = {};
    hide('imw_title_wrap');
  },
  checkNewLen: function(inp) {
    checkTextLength(4096, inp, 'imw_warn');
    if (inp.lastLen > 200 || cur.wdd['imw_dd'].selCount > 1 || val('imw_title')) {
      show('imw_title_wrap');
    } else {
      hide('imw_title_wrap');
    }
  },
  sendNewMsg: function() {
    var text = trim(val('imw_text')), media = cur.imwMedia.chosenMedias || [], dd = cur.wdd && cur.wdd['imw_dd'];
    if (!dd || !dd.selCount) {
      return elfocus('imw_inp');
    }
    var params = {act: 'a_send', chas: cur.writeHash, message: text, title: (isVisible('imw_title_wrap') && val('imw_title') || ''), from: 'im', media: [], to_ids: []}, v;
    for (var i = 0, l = media.length; i < l; ++i) {
      if (v = media[i]) {
        params.media.push(v[0] + ':' + v[1]);
      }
    }
    if (!text && !params.media) {
      return elfocus('imw_text');
    }
    for (var i in dd.selected) {
      params.to_ids.push(i.replace(/_$/, ''));
    }
    params.media = params.media.join(',');
    params.to_ids = params.to_ids.join(',');
    ajax.post('al_mail.php', params, {onDone: function(peer) {
      IM.clearWrite();
      IM.addPeer(peer);
    }, showProgress: lockButton.pbind('imw_send'), hideProgress: unlockButton.pbind('imw_send')});
  }
};

try{stManager.done('im.js');}catch(e){}
