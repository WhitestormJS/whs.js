var page = {
  inviteToGroup: function(gid, mid, invited, hash) {
    var setInvited = function(invited) {
      var row = ge('member_row'+mid);
      geByClass('actions', row)[0].innerHTML = invited ? '<a href="" onclick="return page.inviteToGroup('+gid+', '+mid+', 1, \''+hash+'\')">'+getLang('friends_cancel_event_invite')+'</a>' : '<a href="" onclick="return page.inviteToGroup('+gid+', '+mid+', 0, \''+hash+'\')">'+getLang('friends_send_event_invite')+'</a>';
    }
    if (invited) {
      ajax.post('/al_page.php', {act: 'a_cancel_invite', mid: mid, gid: gid, hash: hash}, {onDone: function(res){ }});
      setInvited(0);
    } else {
      ajax.post('/al_page.php', {act: 'a_invite', mid: mid, gid:gid, hash: hash}, {onDone: function(res, message) {
        if (!res) {
          setInvited(0);
          ge('res'+mid).innerHTML = '<div class="res">' + message + '</div>';
          var row = ge('member_row' + mid);
          hide(geByClass('actions', row)[0]);
        }
      }});
      setInvited(1);
    }
    return false;
  },
  memberListAction: function(el, action, gid, mid, hash) {
    ajax.post('al_page.php', {act: 'a_member_list_action', action: action, gid: gid, mid: mid, hash: hash}, {onDone: function(res) {
      el.parentNode.innerHTML = res;
    }});
  },
  showPageMembers: function(ev, oid, tab) {
    return !showTabbedBox('al_page.php', {act: 'show_members_box', gid: -oid, tab:tab}, {cache: 1}, ev);
  },
  newPhoto: function(params) {
    cur.hideOther();
    showBox('al_page.php', extend(params || {}, {act: 'a_new_photo'}), {params: {bodyStyle: 'padding: 0px; position: relative;'}});
  },
  editPhoto: function(newph) {
    cur.hideOther();
    showBox('al_page.php', extend(newph || {}, {act: 'a_edit_photo'}), {
      params: {onHide: (newph && newph.photo) ? page.newPhoto.pbind({oid: newph.oid}) : false, bodyStyle: 'padding: 16px 7px'},
      stat: ['tagger.js', 'tagger.css']
    });
  },
  deletePhoto: function(oid, hash) {
    cur.hideOther();
    var box = showFastBox({title: getLang('global_warning')}, getLang('sure_delete_photo'), getLang('global_delete'), function() {
      ajax.post('al_page.php', {
        act: 'a_delete_photo',
        hash: hash,
        oid: oid
      }, {
        showProgress: box.showProgress,
        hideProgress: box.hideProgress
      });
    }, getLang('global_cancel'));
  },
  showContacts: function(oid, edit, callback) {
    var b = showBox('/al_page.php', {act: 'a_get_contacts', oid: oid, edit: edit}, {params:{width:467}});
    b.setOptions({onHideAttempt: function() {
      if (cur.reloadAfterClose) {
        if (callback) {
          callback();
        } else {
          nav.reload({noscroll: true});
          cur.reloadAfterClose = false;
        }
      }
      return true;
    }});
  },
  editContact: function(oid, cid, hash, callback) {
    var b = showBox('al_page.php', {act: 'a_edit_contact_box', cid: cid, oid: oid}).setButtons(getLang('global_save'), function() {
      cur.reloadAfterClose = true;
      function onSearch() {
        var params = {act: 'a_add_contact', cid: cid, oid: oid};
        params.hash = hash;
        if (!hash) params.hash = ge('public_contact_hash').value;
        if (ge('public_contact_memlink')) params.page = ge('public_contact_memlink').value;
        params.title = ge('public_contact_position').value;
        params.phone = ge('public_contact_phone').value;
        params.email = ge('public_contact_email').value;
        ajax.post('al_page.php', params, {onDone: function(res) {
          b.hide();
          if (curBox()) {
            curBox().content(res);
          } else {
            page.showContacts(oid, 1, callback);
          }
        }, onFail: function(error) {
          if (ge('public_contact_error')) {
            ge('public_contact_error').innerHTML = error;
            show('public_contact_error');
            return true;
          }
        }});
      }
      if (!cid && cur.lastContact != ge('public_contact_memlink').value) {
        page.searchContact(ge('public_contact_memlink').value, onSearch);
      } else {
        onSearch();
      }
    }, getLang('global_cancel'));
  },
  searchContact: function(oid, page, onSearch) {
    if (!trim(page)) {
      cur.lastContact = '';
      return;
    }
    if (page == cur.lastContact) return;
    ajax.post('al_page.php', {act: 'a_search_contact', pid: oid, page: page}, {onDone:function(uid, img, name, hash) {
      cur.lastContact = page;
      ge('public_contact_name').innerHTML = name;
      ge('public_contact_image').innerHTML = img;
      ge('public_contact_hash').value = hash;
      if (!uid) {
        notaBene('public_contact_memlink', '', true);
        hide('public_contact_error');
      } else {
        if (onSearch) {
          onSearch();
        } else {
          hide('public_contact_error');
        }
      }
    }});
  },
  deleteContact: function(oid, cid, hash) {
    cur.reloadAfterClose = true;
    ajax.post('al_page.php', {act:'a_delete_contact', oid:oid, cid:cid, hash:hash}, {onDone: function(res){
      curBox().content(res);
    }});
  },
  showInput: function(el) {
    el = el.parentNode;
    addClass(el, 'unshown');
    var input_wrap = geByClass('input_wrap', el.parentNode)[0];
    removeClass(input_wrap, 'unshown');
    geByClass('text', input_wrap)[0].focus();
  },
  hideInput: function(el, val) {
    return;
  }
};

var wall = {
  withMentions: !(browser.mozilla && browser.version.match(/^2\./) || browser.mobile),
  editPost: function(post) {
    if (cur.editingPost) {
      return elfocus('wpe_text');
    }
    cur.editingPost = [post];
    if (wall.withMentions) {
      stManager.add(['ui_controls.css', 'ui_controls.js', 'mentions.js', 'walledit.js']);
    } else {
      stManager.add(['walledit.js']);
    }
    ajax.post('al_wall.php', {act: 'edit', post: post, mention: wall.withMentions ? 1 : ''}, {onDone: function() {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(post);
      WallEdit.editPost.apply(window, args);
    }, onFail: function() {
      cur.editingPost = false;
    }, progress: 'wpe_prg' + post});
  },
  cancelEdit: function() {
    if (cur.editingPost) {
      if (window.WallEdit) {
        WallEdit.cancelEditPost();
      } else {
        cur.editingPost = false;
      }
    }
  },

  switchWall: function(ev) {
    var cnts = {all: 0, own: 0}, sw = ge('page_wall_switch');
    if (ge('page_wall_count_all')) cnts.all = intval(ge('page_wall_count_all').value);
    if (ge('page_wall_count_own')) cnts.own = intval(ge('page_wall_count_own').value);
    if (!cnts.own || cnts.own >= cnts.all) {
      return cancelEvent(ev);
    }
    cur.wallType = ge('page_wall_posts').className = (cur.wallType == 'own') ? 'all' : 'own';
    wall.update();
    return cancelEvent(ev);
  },
  cmp: function(id1, id2) {
    var l1 = id1.length, l2 = id2.length;
    if (l1 < l2) {
      return -1;
    } else if (l1 > l2) {
      return 1;
    } else if (id1 < id2) {
      return -1;
    } else if (id1 > id2) {
      return 1;
    }
    return 0;
  },
  receive: function(rows, names) {
    var n = ce('div', {innerHTML: rows}), posts = ge('page_wall_posts');
    var current = posts.lastChild, added = 0;
    for (el = n.lastChild; el; el = re(n.lastChild)) {
      if (el.tagName.toLowerCase() == 'input') {
        var old = ge(el.id);
        if (old) {
          posts.replaceChild(el, old);
        }
        continue;
      }
      while (current && current.tagName.toLowerCase() == 'div' && wall.cmp(current.id, el.id) < 0) {
        current = current.previousSibling;
      }
      ++added;
      if (!current) {
        posts.insertBefore(el, posts.firstChild);
      } else if (!wall.cmp(current.id, el.id)) {
        posts.replaceChild(el, current);
        current = el;
        --added;
      } else {
        posts.insertBefore(el, current.nextSibling);
      }
      placeholderSetup(geByTag1('textarea', el), {fast: 1});
    }
    if (cur.wallType == 'full_own' || cur.wallType == 'full_all') {
      Pagination.recache(added);
      FullWall.updateSummary(cur.pgCount);
    }
    wall.update();
    extend(cur.options.reply_names, names);
  },
  showMore: function(offset) {
    if (cur.viewAsBox) return cur.viewAsBox();

    var type = cur.wallType;
    var pr = ge('wall_more_progress');
    cur.wallLoading = 1;
    ajax.post('al_wall.php', {act: 'get_wall', owner_id: cur.oid, offset: offset, type: type}, {
      onDone: function (rows, names) {
        delete cur.wallLoading;
        setTimeout(wall.receive.pbind(rows, names), 0)
      },
      showProgress: function() {
        show(pr);
        hide(pr.nextSibling);
      },
      hideProgress: function() {
        show(pr.nextSibling);
        hide(pr);
      }
    });
  },
  checkTextLen: function(inp, warn, force) {
    var val = trim(inp.value).replace(/\n\n\n+/g, '\n\n');
    if (inp.lastLen === val.length && !force) return;

    var realLen = inp.lastLen = val.length, maxLen = cur.options.max_post_len;
    var brCount = realLen - val.replace(/\n/g, '').length;

    warn = ge(warn);
    if (realLen > maxLen - 100 || brCount > 4) {
      show(warn);
      if (realLen > maxLen) {
        warn.innerHTML = getLang('global_recommended_exceeded', realLen - maxLen);
      } else if (brCount > 4) {
        warn.innerHTML = getLang('global_recommended_lines', brCount - 4);
      } else {
        warn.innerHTML = getLang('text_N_symbols_remain', maxLen - realLen);
      }
    } else {
      hide(warn);
    }
  },
  checkPostLen: function(field, warn, val, force) {
    var pf = ge(field);
    val = trim(val).replace(/\n\n\n+/g, '\n\n');
    if (!pf || pf.lastLen === val.length && !force) return;
    var realLen = pf.lastLen = val.length, maxLen = cur.options.max_post_len, noteName = ge('post_note_name_wrap');
    var brCount = realLen - val.replace(/\n/g, '').length;
    var pw = ge(warn);
    if (realLen > maxLen - 100 || brCount > 4) {
      var canNote = (pf.id != 'wpe_text') && (cur.oid == vk.id) && !(cur.wallAddMedia || {}).chosenMedia && false; // disabled 26.09.11
      if (realLen > maxLen) {
        pw.innerHTML = getLang('global_recommended_exceeded', realLen - maxLen);
      } else if (brCount > 4) {
        pw.innerHTML = getLang('global_recommended_lines', brCount - 4);
      } else {
        pw.innerHTML = getLang('text_N_symbols_remain', maxLen - realLen);
      }
      if (canNote && (realLen > maxLen || brCount > 4)) {
        show(noteName);
        placeholderSetup(noteName.firstChild);
        hide(pw);
      } else {
        hide(noteName);
        show(pw);
      }
    } else {
      hide(pw, noteName);
    }
  },
  postChanged: function(value, force, onlyHash) {
    //wall.checkPostLen('post_field', 'post_warn', value);
    if (!isVisible('submit_post')) wall.showEditPost();
    if (vk.id && intval(cur.oid) == vk.id) {
      var params = {
        act: 'save_draft',
        msg: value,
        hash: cur.options.post_hash
      }
      var queryHash = params.msg
      if (cur.wallAddMedia) {
        var media = cur.wallAddMedia.chosenMedias || [], num = 1;
        for (var i in media) {
          if (media[i]) {
            queryHash += params['media' + (num++)] = media[i][0]+'|'+media[i][1];
          }
        }
      }
      if (cur.lastPostMsg === queryHash) return;
      clearTimeout(cur.postAutosave);
      if (onlyHash) {
        cur.lastPostMsg = queryHash;
        return;
      }
      cur.postAutosave = setTimeout(function () {
        if (!cur.postAutosave) return;
        cur.lastPostMsg = queryHash;
        ajax.post('al_wall.php', params, {onFail: function() {
          return true;
        }});
      }, (!params.msg || force) ? 0 : 3000);
    }
  },
  setDraft: function(data) {
    if (!data[0] && !data[1]) return;
    var field = ge('post_field');
    if (!field) return;
    if (cur.module == 'feed' && !isVisible(ge('feed_news_bar'))) {
      cur.onFeedBarShow = wall.setDraft.pbind(data);
      return;
    }

    val(field, data[0] || '');
    wall.showEditPost(function() {
      setTimeout(function() {
        if (data[1] && cur.wallAddMedia) {
          for (var i in data[1]) {
            cur.wallAddMedia.chooseMedia.apply(cur.wallAddMedia, data[1][i]);
          }
        }
        wall.postChanged(data[0] || '', false, true);
      }, 0);

    });
  },
  showEditPost: function(callback) {
    if (cur.viewAsBox) {
      setTimeout(function() { ge('post_field').blur() }, 0);
      return cur.viewAsBox();
    }

    if (cur.editing === 0) return;

    if (cur.withUpload) {
      if (!cur.uploadAdded) {
        cur.uploadAdded = true;
        var initUploadHub = new callHub(WallUpload.init, 2);
        stManager.add(['upload.js'], function() {
          initUploadHub.done();
        });
        removeClass(ge('post_preupload_wrap'), 'post_upload_min_wrap');
      } else {
        WallUpload.show();
      }
    }

    if (wall.withMentions && !cur.mentionsAdded) {
      cur.mentionsAdded = true;
      stManager.add(['ui_controls.css', 'ui_controls.js', 'mentions.js'], function() {
        initMentionClass();
        cur.postMention = new MentionAutocomplete('post_field', {
          minHeight: cur.fullPostHeight || (cur.fullPostView ? 50 : 32),
          introText: getLang('profile_mention_start_typing'),
          noResult: getLang('profile_mention_not_found'),
          onSubmit: wall.sendPost,
          checkLen: wall.postChanged,
          onValueChange: wall.onPostValChange
        });
        addEvent(cur.postMention.rtaEl, 'focus', wall.showEditPost.pbind(false));
        triggerEvent(ge('post_field'), 'focus');
        cur.withUpload && initUploadHub && initUploadHub.done();
        callback && callback();
      });
    } else if (cur.postMention) {
      cur.postMention.options.minHeight = cur.fullPostHeight || (cur.fullPostView ? 50 : 32);
      callback && callback();
    }
    wall.hideEditPostReply();
    show('submit_post');
    autosizeSetup('post_field', {minHeight: cur.fullPostHeight || (cur.fullPostView ? 50 : 32), onResize: function() {
      if (cur.wallType == 'full_own' || cur.wallType == 'full_all') {
        Pagination.pageTopUpdated();
      }
    }});
    cur.editing = 0;
  },

  onPostValChange: function() {
    if (cur.wallAddMedia) {
      cur.wallAddMedia.checkPostLink.apply(window, arguments);
    }
    if (cur.wallType == 'full_own' || cur.wallType == 'full_all') {
      Pagination.pageTopUpdated();
    }
  },
  hideEditPost: function(force) {
    cur.editing = false;
    var rf = ge('post_field'),
        addmedia = cur.wallAddMedia || {},
        empty = true;
    if (browser.opera_mobile || !rf || cur.fullPostView) return;
    each (addmedia.chosenMedias || [], function (k, v) {
      if (v) {
        empty = false;
        return false;
      }
    });
    if (!force && (val(rf) || addmedia.chosenMedia || !empty)) return;
    hide('submit_post');
    if (rf && !rf.value) {
      if (cur.postMention) {
        cur.postMention.options.minHeight = cur.emptyPostheight || 14;
      }
      setStyle(rf, {height: cur.emptyPostheight || 14});
    }
    window.WallUpload && WallUpload.hide();
  },
  clearInput: function() {
    show('page_add_media');

    var rf = ge('post_field');
    if (wall.withMentions) {
      var mention = data(rf, 'mention');
      if (mention) {
        mention.rtaEl.innerHTML = '';
        hide(mention.cont);
        show(rf);
      }
    }
    rf.value = '';
    rf.blur();
    rf.phonblur();
    wall.hideEditPost(true);
    if (cur.wallAddMedia) cur.wallAddMedia.unchooseMedia();
    checkbox('export_status', false);
    hide('post_warn');
  },
  sendPost: function() {
    var addmedia = cur.wallAddMedia || {},
        media = addmedia.chosenMedia || {},
        medias = clone(addmedia.chosenMedias || []),
        share = (addmedia.shareData || {})
        msg = val(ge('post_field')),
        noteName = ge('post_note_name'),
        noteNameWrap = ge('post_note_name_wrap');

    var params = {
      act: 'post',
      message: msg,
      to_id: cur.postTo,
      type: cur.wallType,
      note_title: ge('post_note_name').value,
      friends_only: isChecked('friends_only'),
      status_export: isChecked('status_export'),
      facebook_export: ge('facebook_export') ? (isChecked('facebook_export') ? 1 : 0) : '',
      official: isChecked('official'),
      hash: cur.options.post_hash
    }, ownmsg = (cur.postTo == vk.id || params.official || cur.options.only_official), attachI = 0;

    if (isArray(media) && media.length) {
      medias.push(clone(media));
    }
    if (isArray(medias) && medias.length) {
      var ret = false;
      each (medias, function (k, v) {
        if (!v) return;
        var type = this[0], val = this[1];
        switch (type) {
          case 'poll':
            var poll = addmedia.pollData();
            if (!poll) {
              return;
            }
            val = poll.media;
            delete poll.media;
            params = extend(params, poll);
            break;
          case 'share':
            if (share.failed || !share.url) {
              return;
            }
            val = share.user_id + '_' + share.photo_id;
            if (share.images && share.images.length) {
              addmedia.uploadShare(wall.sendPost);
              ret = true;
              return false;
            }
            if (share.initialPattern) {
              params.message = msg = msg.replace(share.initialPattern, ' ');
            }
            params = extend(params, {
              url: share.url,
              title: share.title,
              description: share.description,
              extra: share.extra,
              extra_data: share.extraData,
              photo_url: share.photo_url,
              open_graph_data: (share.openGraph || {}).data,
              open_graph_hash: (share.openGraph || {}).hash
            });
            break;
          case 'page':
            if (share.initialPattern) {
              params.message = msg = msg.replace(share.initialPattern, ' ');
            }
            break;
        }
        params['attach' + (attachI + 1) + '_type'] = type;
        params['attach' + (attachI + 1)] = val;
        attachI++;
      });
      if (ret) {
        return;
      }
    }
    if (!attachI && !msg) {
      elfocus('post_field');
      return;
    }

    if (cur.postAutosave) {
      clearTimeout(cur.postAutosave);
    }

    setTimeout(function() {
      ajax.post('al_wall.php', params, {
        onDone: function(rows, names) {
          wall.clearInput();

          if ((cur.wallType == 'full_own' || cur.wallType == 'full_all') && cur.pgStart) {
            var nloc = clone(nav.objLoc);
            delete(nloc.offset);
            if (vk.id != cur.oid) {
              delete(nloc.own);
            }
            return nav.go(nloc);
          }
          if (vk.id != cur.oid && cur.wallType == 'full_own') {
            var nloc = clone(nav.objLoc);
            delete(nloc.own);
            return nav.go(nloc);
          }
          if (cur.wallType == 'feed') {
            return cur.wallPostCb();
          }
          wall.receive(rows, names);
          if (!ownmsg && cur.wallType == 'own') {
            wall.switchWall();
          }
        },
        showProgress: function() {
          lockButton(ge('send_post'));
        },
        hideProgress: function() {
          unlockButton(ge('send_post'));
        }
      });
    }, 0);
  },

  _repliesLoaded: function(post, hl, replies, names) {
    var r = ge('replies' + post), openEl = r.nextSibling;
    var a = vkNow();
    if (hl) {
      var el = browser.msie6 ? pageNode : ((browser.chrome || browser.safari) ? bodyNode : htmlNode);
      var h = r.offsetHeight;
      r.innerHTML = replies;
      el.scrollTop = intval(el.scrollTop) + (r.offsetHeight - h);
      setTimeout(wall.highlightReply.pbind('post' + hl), 0);
    } else {
      r.innerHTML = replies;
    }
    debugLog('render in', vkNow() - a);
    if (openEl && openEl.className == 'replies_open') {
      re(openEl);
    }
    if (ajax.framedata !== false) {
      for (var i = 0, l = ajax.framedata.length; i < l; ++i) {
        var d = ajax.framedata[i];
        setTimeout(ajax._receive.pbind(d[0], d[1], d[2]), 0);
      }
      ajax.framedata = false;
    }

    if (names) {
      extend(cur.options.reply_names, names);
      wall.repliesSideSetup(post);
    }
  },
  repliesSideSetup: function (post) {
    if (browser.msie6 || browser.msie7) return;
    var postEl = ge('post' + post),
        r = ge('replies' + post),
        header = r && geByClass1('wr_header', r, 'a'),
        h = r && r.offsetHeight || 0,
        ch = window.innerHeight || document.documentElement.clientHeight,
        side = ge('replies_side' + post);

    if (cur.wallMyOpened[post] && header) {
      if (!side) {
        var sideWrap = se('<div class="replies_side_wrap"><div id="replies_side' + post + '" class="replies_side"><div class="replies_side_icon" id="replies_side_icon' + post + '"></div></div></div>')
        r.parentNode.insertBefore(sideWrap, r);
        side = sideWrap.firstChild;
        side.onclick = wall.repliesSideClick.pbind(post);
        side.onmouseover = wall.repliesSideOver.pbind(post);
        side.onmouseout = wall.repliesSideOut.pbind(post);
        setStyle(side, {height: r.clientHeight - 31});
      }
      show(side);
    } else {
      hide(side);
    }
  },
  repliesSideClick: function (post) {
    var postEl = ge('post' + post),
        r = ge('replies' + post),
        header = r && geByClass1('wr_header', r, 'a'),
        st = scrollGetY(),
        pos = getXY(r)[1];

    if (st > pos) {
      scrollToY(pos - 100, 0);
    }
    hide('replies_side' + post);
    header && header.onclick();
  },
  repliesSideOver: function (post) {
    var side = ge('replies_side' + post);

    addClass(side, 'replies_side_over');
    setStyle(side, {height: ge('replies' + post).clientHeight - 51});

    var icon = ge('replies_side_icon' + post),
        top = getXY(side)[1],
        h = side.clientHeight;

    var minOffset = 16,
        maxOffset = h - 23,
        minSt = top + minOffset - 16,
        maxSt = top + maxOffset - 16;


    cur.wallRepliesSideOver = [
      post,
      icon,
      false,
      minSt,
      maxSt,
      getXY(side)[0] + 18,
      maxOffset,
      false
    ];
    wall.repliesSideUpdate();
  },
  repliesSideOut: function (post) {
    removeClass(ge('replies_side' + post), 'replies_side_over');
    if (cur.wallRepliesSideOver && cur.wallRepliesSideOver[0] == post) {
      delete cur.wallRepliesSideOver;
    }
  },

  repliesSideUpdate: function (st) {
    var postData = cur.wallRepliesSideOver;
    if (!postData) return;

    var curState = postData[7], newState;
    if (st === undefined) {
      st = scrollGetY();
    }
    if (st < postData[3]) {
      if (curState != 1) {
        setStyle(postData[1], {position: 'absolute', top: '16px', bottom: 'auto', left: '18px'})
        postData[7] = 1;
      }
    } else if (st < postData[4]) {
      if (curState != 2) {
        setStyle(postData[1], {position: 'fixed', top: '16px', bottom: 'auto', left: postData[5]})
        postData[7] = 2;
      }
    } else {
      if (curState != 3) {
        setStyle(postData[1], {position: 'absolute', bottom: '16px', top: 'auto', left: '18px'})
        postData[7] = 3;
      }
    }
  },
  highlightReply: function(el) {
    el = ge(el);
    if (!el) return;

    var hlfunc = animate.pbind(el, {backgroundColor: '#ECEFF3'}, 200, function() {
      setTimeout(function() {
        animate(el, {backgroundColor: '#FFF'}, 200);
      }, 1000);
    });

    var xy = getXY(el), top = xy[1] - (bodyNode.scrollTop || htmlNode.scrollTop || 0);
    if (top < 0) {
      var cont = browser.msie6 ? pageNode : ((browser.chrome || browser.safari) ? bodyNode : htmlNode);
      animate(cont, {scrollTop: cont.scrollTop + top - 50}, 300, hlfunc);
    } else {
      hlfunc();
    }
  },
  showReply: function(post, reply) {
    if (cur.viewAsBox) return false;
    var p = ge('post' + reply);
    if (p) {
      wall.highlightReply(p);
    } else {
      wall.showReplies(post, false, reply);
    }
    return false;
  },
  showReplies: function(post, count, hl, ev) {
    if (checkEvent(ev || window.event)) { return true; }
    if (cur.viewAsBox) return cur.viewAsBox();
    hide('wrh_text' + post);
    cur.wallMyOpened[post] = (count != 3);
    var params = {
      act: 'get_replies',
      post: post,
      count: count
    }, opts = {
      onDone: wall._repliesLoaded.pbind(post, hl),
      onFail: show.pbind('wrh_text' + post),
      progress: 'wrh_prg' + post
    };
    if (!hl && (!count || count > 20)) {
      extend(params, {cont: 'replies' + post});
      extend(opts, {frame: 1});
      if (!browser.msie6 && !browser.msie7)  {
        cur.onFrameBlocksDone = function () {
          setTimeout(wall.repliesSideSetup.pbind(post), browser.msie ? 100 : 10);
        }
      }
    }
    ajax.post('al_wall.php', params, opts);

    if (!browser.msie && count > 0 && count < 10) {
      var cont = ge('replies' + post), el = cont && cont.lastChild, slice = [];
      while (slice.length < count && el) {
        if (el.tagName == 'DIV' && hasClass(el, 'reply')) {
          slice.push(el);
        }
        el = el.previousSibling;
      }
      if (slice.length == count) {
        var total = geByClass('reply', cont, 'div').length;
        val(cont, '<a class="wr_header wrh_all"></a>');
        wall.updateRepliesHeader(post, cont.firstChild, count, total);
        while (slice.length) {
          cont.appendChild(slice.pop());
        }
        hide('wrh_text' + post);
        show('wrh_prg' + post);
      }
    }
    return false;
  },
  moreReplies: function(post, offset, count) {
    hide('wrh_text' + post);
    ajax.post('al_wall.php', {act: 'get_replies', offset: offset, post: post, count: count}, {
      onDone: function(replies, names) {
        var r = ge('replies' + post);
        r.removeChild(r.firstChild); // remove header
        r.innerHTML = replies + r.innerHTML;
        extend(cur.options.reply_names, names);
      },
      onFail: show.pbind('wrh_text' + post),
      progress: 'wrh_prg' + post
    });
    return false;
  },
  showEditReply: function(post) {
    if (cur.viewAsBox) {
      setTimeout(function() { ge('reply_field' + post).blur() }, 0);
      return cur.viewAsBox();
    }

    var rf = ge('reply_field' + post);
    if (cur.editing === post) {
      elfocus(rf);
      return;
    }
    autosizeSetup(rf, {minHeight: 32});
    wall.hideEditPostReply();
    show('replies_wrap' + post, 'submit_reply' + post);
    hide('reply_link' + post);
    ge('reply_button' + post).onclick = wall.sendReply.pbind(post);
    cur.editing = post;
    elfocus(rf);
  },
  hideEditReply: function(post) {
    cur.editing = false;

    var rf = ge('reply_field' + post), replyName = cur.reply_to && cur.options.reply_names[cur.reply_to[0]], v = trim(val(rf));
    if (!rf) return;
    if (replyName && isArray(replyName)) {
      if (!v || !replyName[1].indexOf(v)) {
        val(rf, '');
        v = '';
      }
    }
    if (browser.opera_mobile || browser.safari_mobile || v) return;
    hide('submit_reply' + post);
    var replyLink = ge('reply_link' + post);
    if (replyLink) {
      show(replyLink);
      hide('replies_wrap' + post);
    }
    rf.blur();
    if (!rf.active) {
      setStyle(rf, {height: 14});
    }
    if (rf.phonblur) rf.phonblur();
    ge('reply_to' + post).value = ge('reply_to_title' + post).innerHTML = '';
    cur.reply_to = false;
  },
  replyTo: function(post, toMsgId, toId, event) {
    val('reply_to' + post, toMsgId);
    var replyName = cur.options.reply_names[toId];
    if (isArray(replyName)) {
      val('reply_to_title' + post, replyName[0]);
      var rf = ge('reply_field' + post),
          replyNameOld = cur.reply_to && cur.options.reply_names[cur.reply_to[0]],
          v = trim(val(rf));
      if (!v || replyNameOld && isArray(replyNameOld) && !replyNameOld[1].indexOf(v)) {
        val(rf, !checkEvent(event) ? replyName[1] : '');
      }
    } else {
      val('reply_to_title' + post, replyName);
    }
    cur.reply_to = [toId, toMsgId];
    wall.showEditReply(post);
    return false;
  },
  sendReply: function(post) {
    var rf = ge('reply_field' + post), msg = val(rf), v = trim(msg), replyName;
    if (!v || isArray(replyName = (cur.reply_to && cur.options.reply_names[cur.reply_to[0]])) && !replyName[1].indexOf(v)) {
      elfocus('reply_field' + post);
      return;
    }
    ge('reply_field' + post).blur();
    var post_hash = ge('post_hash' + post) ? ge('post_hash' + post).value : cur.options.post_hash;
    cur.wallMyReplied[post] = 1;
    cur.wallMyOpened[post] = 1;
    ajax.post('al_wall.php', {
      act: 'post',
      type: cur.wallType,
      reply_to: post,
      reply_to_msg: val('reply_to' + post),
      reply_to_user: cur.reply_to && cur.reply_to[0] || 0,
      start_id: val('start_reply' + post),
      message: msg,
      hash: post_hash
    }, {
      onDone: function(reply, replies, names) {
        cur.wallMyReplied[post] = 0;
        var replyLink = ge('reply_link' + post);
        if (replyLink) {
          replyLink.parentNode.removeChild(replyLink);
        }
        val('reply_field' + post, '');
        hide('reply_warn' + post);
        wall.hideEditReply(post);
        wall._repliesLoaded(post, false, replies, names);
      },
      showProgress: lockButton.pbind(ge('reply_button' + post)),
      hideProgress: unlockButton.pbind(ge('reply_button' + post))
    });
  },
  postTooltip: function(el, post, opts) {
    if (cur.viewAsBox) return;
    var reply = (opts || {}).reply;

    showTooltip(el, {
      url: 'al_wall.php',
      params: extend({act: 'post_tt', post: post}, opts || {}),
      slide: 15,
      shift: [(reply && !(reply % 2)) ? 300 : 35, -3, 0],
      ajaxdt: 100,
      showdt: 400,
      hidedt: 200,
      className: 'rich wall_tt'
    });
  },

  hideEditPostReply: function(e) {
    if (cur.editing === false || isVisible(boxLayerBG) || isVisible(layerBG)) return;
    var el = (e && e.target) ? e.target : {};
    var id = el.id;
    if (cur.editing) {
      if (cur.editingHide) {
        cur.editingHide(cur.editing, el);
      } else if (!e || !hasClass(el, 'reply_link') && id != 'reply_field' + cur.editing && el.className != 'reply_to_link') {
        wall.hideEditReply(cur.editing);
      }
    } else if (!(cur.wallAddMedia || {}).chosenMedia) {
      if (!e || id != 'post_field') {
        wall.hideEditPost();
      }
    }
  },
  deletePost: function(post, hash, root) {
    cur.wallMyDeleted[post] = 1;
    ajax.post('al_wall.php', {
      act: 'delete',
      post: post,
      hash: hash,
      root: root ? 1 : 0,
      from: 'wall'
    }, {
      onDone: function(msg) {
        var r = ge('post' + post), t = geByTag1('table', r) || geByClass1('post_content', r);
        var pd = ge('post_del' + post);
        if (pd) {
          pd.innerHTML = msg;
          show(pd);
        } else {
          r.appendChild(ce('div', {id: 'post_del' + post, className: 'dld', innerHTML: msg}));
        }
        hide(t);
        if (cur.wallType == 'full_own' || cur.wallType == 'full_all') {
          Pagination.recache(-1);
          FullWall.updateSummary(cur.pgCount);
        }
      }
    });
    var btn = ge('delete_post' + post);
    if (btn && btn.tt && btn.tt.el) {
      btn.tt.destroy();
    }
  },
  markAsSpam: function(post, hash) {
    ajax.post('al_wall.php', {
      act: 'spam',
      post: post,
      hash: hash
    }, {
      onDone: function(msg) {
        var r = ge('post' + post), t = geByTag1('table', r) || geByClass1('post_content', r);
        var pd = ge('post_del' + post);
        if (pd) {
          pd.innerHTML = msg;
          show(pd);
        } else {
          r.appendChild(ce('div', {id: 'post_del' + post, className: 'dld', innerHTML: msg}));
        }
        hide(t);
      }
    });
    var btn = ge('delete_post' + post);
    if (btn && btn.tt && btn.tt.el) {
      btn.tt.destroy();
    }
  },
  restorePost: function(post, hash, root) {
    cur.wallMyDeleted[post] = 0;
    ajax.post('al_wall.php', {
      act: 'restore',
      post: post,
      hash: hash,
      root: root ? 1 : 0
    }, {
      onDone: function(msg) {
        var pd = ge('post_del' + post);
        if (!pd) return;
        var r = ge('post' + post), t = geByTag1('table', r) || geByClass1('post_content', r);
        show(t);
        hide(pd);
        if (cur.wallType == 'full_own' || cur.wallType == 'full_all') {
          Pagination.recache(1);
          FullWall.updateSummary(cur.pgCount);
        }
      }
    });
  },

  checkPostClick: function (el, event) {
    event = event || window.event;
    if (!el || !event) return false;
    var target = event.target || event.srcElement,
        i = 8,
        foundGood = false,
        classRE = /wall_post_text|post_media|event_share|public_share|group_share|feed_friends|feed_gifts|feed_videos|feed_explain_list|explain|feed_photos|feedback_row/;
    do {
      if (!target ||
          target == el ||
          target.onclick ||
          target.onmousedown ||
          inArray(target.tagName, ['A', 'IMG', 'TEXTAREA', 'EMBED', 'OBJECT']) ||
          inArray(target.className, ['play_new', 'page_video_inline_wrap']) ||
          (foundGood = target.className.match(classRE))
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
  postClick: function (post, event) {
    var matches = (post || '').match(/^(-?\d+)_(wall)?(\d+)$/),
        el = ge('post' + post);
    if (!matches) return;
    if (wall.checkPostClick(el, event)) return;

    var moreLink = geByClass1('wall_post_more', el, 'a');
    if (moreLink && isVisible(moreLink)) {
      moreLink.onclick();
      return;
    }

    var url = 'wall' + matches[1] + '_' + matches[3];
    if (checkEvent(event)) {
      window.open(url, '_blank');
    } else {
      nav.go(url);
    }
  },
  checkReplyClick: function (el, event) {
    event = event || window.event;
    if (!el || !event) return false;
    var target = event.target || event.srcElement,
        i = 8,
        foundGood = false,
        classRE = /reply_dived/;
    do {
      if (!target ||
          target == el ||
          target.onclick ||
          target.onmousedown ||
          inArray(target.tagName, ['A', 'IMG', 'TEXTAREA', 'EMBED', 'OBJECT']) ||
          (foundGood = hasClass(target, 'post_content'))
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
  replyClick: function (post, reply, event, answering) {
    var oid = intval(post),
        el = ge('post' + oid + '_' + reply);
    (event || {}).cancelBubble = true;
    if (wall.checkReplyClick(el, event)) return;

    var moreLink = geByClass1('wall_reply_more', el, 'a');
    if (moreLink && isVisible(moreLink)) {
      removeClass(el, 'reply_moreable');
      moreLink.onclick();
      return;
    }
    if (answering) {
      wall.replyTo(post, reply, answering, event);
    }
  },

  postOver: function(post) {
    var el = ge('post' + post);
    if (!el || hasClass(el, 'one')) return;
    if (post.match(/^(-?\d+)_(wall)?(\d+)$/)) {
      addClass(el, 'wall_post_over');
    }
    if (!vk.id) return;

    wall.showDeletePost(post);
  },
  postOut: function(post) {
    var el = ge('post' + post);
    if (!el || hasClass(el, 'one')) return;
    if (post.match(/^(-?\d+)_(wall)?(\d+)$/)) {
      removeClass(el, 'wall_post_over');
    }
    if (!vk.id) return;

    if (!el || hasClass(el, 'one')) return;
    wall.hideDeletePost(post);
  },
  actsOver: function(post) {
    if (!vk.id) return;
    var acts = ge('actions' + post);
    var postParts = post.split('_');
    var reply = postParts.join('_wall_reply');
    if (postParts[0].match(/(-?\d+)(photo|video|note|topic)/)) {
      reply = postParts.join('_reply');
    }
    var lnk = ge('like_link' + reply);
    var icon = ge('like_icon' + reply);

    if (!acts) return;
    if (acts.timeout) {
      clearTimeout(acts.timeout);
      removeAttr(acts, 'timeout');
    } else {
      fadeIn(acts, 200);
      wall.showDeletePost(post);
      if (hasClass(icon, 'no_likes')) {
        icon.style.visibility = 'visible';
        animate(icon, {opacity: 0.4}, 200);
      }
    }
  },
  actsOut: function(post) {
    if (!vk.id) return;

    var acts = ge('actions' + post);
    var postParts = post.split('_');
    var reply = postParts.join('_wall_reply');
    if (postParts[0].match(/(-?\d+)(photo|video|note|topic)/)) {
      reply = postParts.join('_reply');
    }
    var lnk = ge('like_link' + reply);
    var icon = ge('like_icon' + reply);

    if (!acts) return;
    acts.timeout = setTimeout(function() {
      removeAttr(acts, 'timeout');
      fadeOut(acts, 200);
      wall.hideDeletePost(post);
      if (hasClass(icon, 'no_likes')) {
        animate(icon, {opacity: 0}, 200, function () {
          icon.style.visibility = 'hidden';
        });
      }
    }, 1);
  },
  likeOver: function(post, opts) {
    var icon = ge('like_icon' + post);
    if (!icon) return;
    opts = opts || {};
    if (!hasClass(icon, 'my_like') && !hasClass(icon, 'fw_my_like')) {
      setTimeout(animate.pbind(icon, {opacity: 1}, 200, false), 1);
    } else {
      icon.style.visibility = 'visible';
      setStyle(icon, {opacity: 1});
    }
    var matches = post.match(/(-?\d+)(_?)(photo|video|note|topic|wall_reply|note_reply|photo_comment|video_comment|topic_post|)(\d+)/);
    var like_obj = (matches[3] || 'wall') + matches[1] + '_' + matches[4];
    var leftShift = vk.id && matches[3] != 'wall_reply' && matches[3] != 'note_reply' && matches[3] != 'photo_comment' && matches[3] != 'video_comment' && matches[3] != 'topic_post' ? 35 : 55,
        topShift = opts.topShift || -3;

    if (opts.leftShift) {
      leftShift = opts.leftShift;
    } else if ((matches[3] == 'wall_reply' || matches[3] == 'note_reply' || matches[3] == 'photo_comment' || matches[3] == 'video_comment' || matches[3] == 'topic_post') && vk.id) {
      leftShift = 61;
    }

    if (cur.viewAsBox) return;

    showTooltip(icon.parentNode, {
      url: 'like.php',
      params: {act: 'a_get_stats', 'object': like_obj},
      slide: 15,
      shift: [leftShift, topShift, 0],
      ajaxdt: 100,
      showdt: 400,
      hidedt: 200,
      tip: {
        over: function() {
          wall.postOver(post);
          wall.likeOver(post);
        },
        out: function() {
          wall.likeOut(post);
          wall.postOut(post);
        }
      },
      className: 'rich like_tt ' + (opts.cl || '')
    });
  },
  likeOut: function(post, opts) {
    var icon = ge('like_icon' + post);
    if (!icon) return;
    opts = opts || {};
    if (!hasClass(icon, 'my_like') && !hasClass(icon, 'fw_my_like')) {
      data(icon, 'likeoutTO', setTimeout(animate.pbind(icon, {opacity: opts.opacity || 0.4}, 200, false), 1));
    }
    if (opts.tthide) {
      triggerEvent(icon.parentNode, 'mouseout');
    }
  },
  postLikeOver: function(post, opts) {
    var icon = ge('like_icon' + post),
        link = ge('like_link' + post);
    if (!icon || cur.viewAsBox) return;
    opts = opts || {};
    var matches = post.match(/(-?\d+)(_?)(photo|video|note|topic|wall_reply|note_reply|photo_comment|video_comment|topic_post|)(\d+)/);
    var like_obj = (matches[3] || 'wall') + matches[1] + '_' + matches[4];
    var leftShift =  55 - link.clientWidth,
        topShift = opts.topShift || -3;

    showTooltip(icon.parentNode, {
      url: 'like.php',
      params: {act: 'a_get_stats', 'object': like_obj},
      slide: 15,
      shift: [leftShift, topShift, 0],
      ajaxdt: 100,
      showdt: 400,
      hidedt: 200,
      tip: {
        over: function() {
          wall.postOver(post);
          wall.likeOver(post);
        },
        out: function() {
          wall.likeOut(post);
          wall.postOut(post);
        }
      },
      className: 'rich like_tt ' + (opts.cl || '')
    });
  },
  postLikeOut: function () {

  },
  likeUpdate: function(post, my, count, title) {
    count = intval(count);

    var m = post.match(/(-?\d+)(_?)(photo|video|note|topic|wall_reply|note_reply|photo_comment|video_comment|topic_post|)(\d+)/), like_obj = (m[3] || 'wall') + m[1] + '_' + m[4];

    var countInput = ge('like_real_count_' + like_obj) || {}, rows = ge('like_table_' + like_obj);
    var titleNode = ge('like_title_' + like_obj), countNode = ge('like_count' + post);
    var icon = ge('like_icon' + post);
    var tt = countNode.parentNode.tt || {}, opts = clone(tt.opts || {}), newleft = (my ? 0 : -31);

    if (title && titleNode) {
      titleNode.innerHTML = title;
    }
    countInput.value = count;
    countNode.innerHTML = count ? count : '';

    if (my) {
      addClass(icon, hasClass(icon, 'fw_like_icon') ? 'fw_my_like' : 'my_like');
    } else {
      removeClass(icon, hasClass(icon, 'fw_like_icon') ? 'fw_my_like' : 'my_like');
      var cb = ge('like_share_wall' + post);
      if (cb) checkbox(cb, false);
    }
    if (count) {
      var styleName = vk.rtl ? 'right' : 'left';
      if (tt.el && !isVisible(tt.container) && !title) {
        rows.style[styleName] = newleft + 'px';
        tooltips.show(tt.el, extend(opts, {showdt: 0}));
      } else if (rows) {
        var params = {};
        params[styleName] = newleft;
        animate(rows, params, 200);
      }
      removeClass(icon, 'no_likes');
    } else {
      if (tt.el) tt.hide();
      addClass(icon, 'no_likes');
    }
  },
  like: function(post, hash) {
    if (!vk.id || cur.viewAsBox) return;

    var icon = ge('like_icon' + post),
        my = hasClass(icon, hasClass(icon, 'fw_like_icon') ? 'fw_my_like' : 'my_like'),
        matches = post.match(/(-?\d+)(_?)(photo|video|note|topic|wall_reply|note_reply|photo_comment|video_comment|topic_post|)(\d+)/),
        like_obj = (matches[3] || 'wall') + matches[1] + '_' + matches[4],
        ref = cur.wallType ? (cur.wallType == 'feed' ? 'feed_' + cur.section : ('wall_' + (cur.onepost ? 'one' : (!(cur.wallType || '').indexOf('full_') ? 'full' : 'page')))) : cur.module;

    ajax.post('like.php', {act: 'a_do_' + (my ? 'un' : '') + 'like', 'object': like_obj, hash: hash, wall: 1, from: ref}, {
      onDone: wall.likeUpdate.pbind(post, !my)
    });
    var countInput = ge('like_real_count_wall' + post);
    var count = countInput ? countInput.value : ge('like_count' + post).innerHTML;
    wall.likeUpdate(post, !my, intval(count) + (my ? -1 : 1));
  },
  likeShare: function(post, hash) {
    var el = ge('like_share_wall' + post), was = isChecked(el),
        ref = cur.wallType ? (cur.wallType == 'feed' ? 'feed_' + cur.section : ('wall_' + (cur.onepost ? 'one' : (!(cur.wallType || '').indexOf('full_') ? 'full' : 'page')))) : cur.module;
    checkbox(el);
    ajax.post('like.php', {act: 'a_do_' + (was ? 'un' : '') + 'publish', object: 'wall' + post, hash: hash, wall: 1, ref: ref}, {
      onDone: wall.likeUpdate.pbind(post, true)
    });
    var countInput = ge('like_real_count_wall' + post);
    var count = countInput ? countInput.value : ge('like_count' + post).innerHTML;
    var icon = ge('like_icon' + post), my = hasClass(icon, hasClass(icon, 'fw_like_icon') ? 'fw_my_like' : 'my_like');
    wall.likeUpdate(post, true, intval(count) + (my ? 0 : 1));
  },
  showLikesPage: function(post, published, offset) {
    cur.likesBox.loadTabContent('like.php', {act: 'a_get_members', object: 'wall' + post, published: published, offset: offset, wall: 1}, published);
  },
  clearLikesCache: function(post, published) {
    var str = '^/like.php#' + ajx2q({act: 'a_get_members', object: 'wall' + post, published: published, offset: 12345, wall: 1, tab: published, only_content: 1}).replace('12345', '\\d+') + '$';
    for (var i in ajaxCache) {
      if ((new RegExp(str, 'i')).test(i)) {
        delete(ajaxCache[i]);
      }
    }
  },
  showPhoto: function(to_id, ph, hash, el, ev) {
    return !showBox('al_photos.php', {act: 'photo_box', to_id: to_id, photo: ph, hash: hash}, {cache: 1}, el.href ? ev : false);
  },
  _animDelX: function(opacity, new_active, post) {
    if (post === undefined) {
      post = new_active;
      new_active = undefined;
    }
    var el = ge('delete_post' + post);
    if (!el) return;
    if (new_active !== undefined) {
      el.active = new_active;
    } else if (el.active) {
      return;
    }
    animate(el, {opacity: opacity}, 200);
  },
  scrollCheck: function () {
    var st = scrollGetY();
    wall.repliesSideUpdate(st);

    if (!cur.wallAutoMore || cur.wallLoading || cur.viewAsBox) return;
    var el = ge('wall_more_link');
    if (!isVisible(el)) return;

    if (st + lastWindowHeight + 1000 > getXY(el)[1]) {
      el.onclick();
    }
  },
  pollVote: function(option, post, params, attachI) {
    addClass(option, 'on');
    // var progress = option.nextSibling;
    var progress = geByClass1('progress', option);
    ajax.post('widget_poll.php', extend(params, {
      act: 'a_vote',
      no_widget: 1,
      inline: 1,
      sid: post,
      i: attachI
    }), {
      onDone: function(html) {
        val('post_poll' + post, html);
      },
      showProgress: addClass.pbind(progress, 'progress_inline'),
      hideProgress: removeClass.pbind(progress, 'progress_inline')
    });
  },
  update: function(count) {
    if (cur.wallType != 'all' && cur.wallType != 'own') return;
    var sw = ge('page_wall_switch'), pnw = ge('page_no_wall'),
        cnts = {
      all: intval(val('page_wall_count_all')),
      own: intval(val('page_wall_count_own'))
    };
    if (cnts.all && pnw) {
      pnw.parentNode.removeChild(pnw);
    }
    if (!cnts.own || cnts.own >= cnts.all) {
      hide(sw);
    } else {
      show(sw);
      sw.innerHTML = cur.options[cur.wallType + '_link'];
    }
    var h = ge('page_wall_header'), cnt = cnts[cur.wallType];
    val('page_wall_posts_count', cnt ? langNumeric(cnt, cur.options.wall_counts) : cur.options.wall_no);
    h.style.cursor = cnt ? '' : 'default';
    h.onclick = function() { return cnt ? true : false; };
    ge('page_wall_header').href = '/wall' + cur.oid + ((cur.wallType == 'own') ? '?own=1' : '');
    var morelnk = ge('wall_more_link'), count = geByClass(cur.wallType, ge('page_wall_posts')).length;
    if (count >= cnts[cur.wallType]) {
      hide(morelnk);
    } else {
      show(morelnk);
      morelnk.onclick = wall.showMore.pbind(count);
    }
  },
  getAbsDate: function (ts) {
    var date = new Date(ts || vkNow()),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        ampm = '', numhours;
    if (cur.wallTpl.time_system) {
      ampm = cur.wallTpl.time_system[hours > 11 ? 1 : 0];
      hours = (hours % 12) || 12;
    }
    numhours = hours > 9 ? hours : ('0' + hours);
    minutes = minutes > 9 ? minutes : ('0' + minutes);
    return cur.wallTpl.date_format.replace('{am_pm}', ampm).replace('{hour}', hours).replace('{num_hour}', numhours).replace('{minute}', minutes);
  },
  getNowRelTime: function () {
    var ts = vkNow();
    return '<span class="rel_date rel_date_needs_update" time="' + intval(ts / 1000 - (cur.tsDiff || 0)) + '" abs_time="' + wall.getAbsDate(ts) + '">' + getLang('wall_just_now') + '</span>';
  },
  getNewPostHTML: function (ev, isAdmin, extendCb) {
    var post_id = ev[2],
        oid = post_id.split('_')[0],
        repls = {
      oid: oid,
      name: ev[3].replace('mem_link', 'author').replace('memLink', 'author'),
      online: '',
      del: (isAdmin || oid == vk.id || ev[9] == vk.id) ? cur.wallTpl.del : cur.wallTpl.spam,
      replies: '',
      reply_link: ev[8] == 1 ? cur.wallTpl.reply_link : (oid != vk.id ? cur.wallTpl.own_reply_link : ''),
      own_reply_link: (ev[8] == 0) ? cur.wallTpl.own_reply_link : '',
      reply_box: ev[8] == 1 ? cur.wallTpl.reply_box : '',
      photo: ev[4],
      link: ev[5],
      text: ev[6],
      date: wall.getNowRelTime(),
      post_id: ev[2],
      poll_hash: cur.wallTpl.poll_hash
    };

    extendCb && extend(repls, extendCb(repls, ev));
    return rs(cur.wallTpl.post, repls);
  },
  getNewReplyHTML: function (ev, isAdmin, extendCb) {
    var acts = [],
        can_reply = ge('reply_field' + ev[2]) || ge('fwr_text'),
        delLink = '',
        className = '';
        attr = '';
    if (isAdmin || !ev[2].indexOf(vk.id + '_') || !ev[4].indexOf(vk.id + '_')) {
      delLink = cur.wallTpl.del_reply;
    } else if (ev[2].split('_')[0] != ev[4]) {
      delLink = cur.wallTpl.spam_reply;
    }
    if (cur.onepost && delLink) {
      acts.push(delLink);
    }
    if (ev[8].indexOf('class="wall_reply_more"') != -1) {
      className += 'reply_moreable';
    }
    if (can_reply && vk.id != ev[4]) {
      if (cur.onepost) {
        acts.push(cur.wallTpl.answer_reply);
      } else {
        className += ' reply_replieable';
      }
      if (!cur.options.reply_names[ev[4]]) {
        cur.options.reply_names[ev[4]] = [ev[11], ev[12]]; // name link, name greeting
      }
    }
    if (className) {
      attr = ' onclick="wall.replyClick(\'%post_id%\', %reply_msg_id%, event, %reply_uid%)"';
    }
    acts.push(cur.onepost ? '' : '%like_link%');
    var repls = {
      name: ev[5].replace('mem_link', 'author'),
      photo: ev[6],
      online: '',
      link: ev[7],
      text: (ev[8] && !cur.onepost) ? ('<div class="wall_reply_text">' + ev[8] + '</div>') : ev[8],
      media: '', // not returned by now
      classname: className,
      acts: acts.join('<span class="divide">|</span>'),
      attr: attr,
      date: wall.getAbsDate(vkNow()),
      delete_link: delLink,
      like_link: cur.wallTpl.like_reply,
      to_link: ev[10],
      post_id: ev[2],
      reply_id: ev[3],
      like_id: ev[3].replace('_', '_wall_reply'),
      reply_msg_id: ev[3].split('_')[1],
      reply_uid: ev[4] || 'false'
    };
    extendCb && extend(repls, extendCb(repls));
    return rs(cur.wallTpl.reply, repls);
  },
  openNewComments: function (post_raw) {
    var repliesEl = cur.onepost ? ge('fw_replies_rows') : ge('replies' + post_raw),
        openEl = repliesEl.nextSibling,
        headerEl = geByClass1('wr_header', repliesEl, 'a'),
        newCnt = 0,
        shown = geByClass('reply', repliesEl, 'div').length,
        total = shown,
        newTotal = openEl.newCnt;
    each (clone(geByClass('new_reply', repliesEl, 'div')), function () {
      removeClass(this, 'new_reply');
      this.style.backgroundColor = '#FEFAE4';
      animate(this, {backgroundColor: '#FFF'}, 6000);
      newCnt++;
      if (newCnt == 100) return false;
    });
    if (headerEl) {
      total = newCnt + intval(headerEl.getAttribute('offs').split('/')[1]);
    }
    shown += - newTotal + newCnt;
    if (total > 3 || shown < total) {
      if (!headerEl) {
        repliesEl.insertBefore(headerEl = ce('a', {className: 'wr_header'}), repliesEl.firstChild);
      }
      wall.updateRepliesHeader(post_raw, headerEl, shown, total);
    }
    cur.wallMyOpened[post_raw] = 1;
    if (openEl && openEl.className == 'replies_open') {
      if (newTotal > 100) {
        openEl.innerHTML = getLang('news_x_new_replies_more', Math.min(100, newTotal - newCnt));
        openEl.newCnt -= newCnt;
      } else {
        openEl.parentNode.removeChild(openEl);
      }
    }
  },
  langWordNumeric: function(num, words, arr) {
    if (words && num < words.length) {
      return words[num];
    }
    return langNumeric(num, arr);
  },
  updateTimes: function (cont) {
    var timeNow = intval(vkNow() / 1000), toClean = [];
    timeNow -= cur.tsDiff;
    each(geByClass('rel_date_needs_update', cont || ge('page_wall_posts'), 'span'), function(k, v) {
      if (!v) return;
      var timeRow = intval(v.getAttribute('time')), diff = timeNow - timeRow, timeText = v.getAttribute('abs_time');
      if (diff < 5) {
        timeText = getLang('wall_just_now');
      } else if (diff < 60) {
        timeText = wall.langWordNumeric(diff, cur.lang.wall_X_seconds_ago_words, cur.lang.wall_X_seconds_ago);
      } else if (diff < 3600) {
        timeText = wall.langWordNumeric(intval(diff / 60), cur.lang.wall_X_minutes_ago_words, cur.lang.wall_X_minutes_ago);
      } else if (diff < 4 * 3600) {
        timeText = wall.langWordNumeric(intval(diff / 3600), cur.lang.wall_X_hours_ago_words, cur.lang.wall_X_hours_ago);
      } else {
        toClean.push(v);
      }
      v.innerHTML = timeText;
    });
    each (toClean, function () {
      removeClass(this, 'rel_date_needs_update');
    });
  },

  updateRepliesHeader: function(post_raw, headerEl, shown, total) {
    if (cur.onepost) return;
    var headerText, allReplies, href = headerEl.href, matches, showCount = 3;

    if (!href && (matches = post_raw.match(/^(-?\d+)_(photo|video|note|topic|video|)(\d+)$/))) {
      var type = matches[2] || 'wall';
      href = '/' + type + matches[1] + '_' + matches[3];
      switch (type) {
        case 'topic':
          href += '?offset=last&scroll=1';
          break;
        case 'wall':
          href += '?offset=last&f=replies';
          break;
      }
      headerEl.href = href;
    }
    if (total > shown) {
      if (shown < 100) {
        if (total > 100) {
          headerText = getLang('wall_show_n_of_m_last', 100);
          headerText = headerText.replace('{count}', total);
        } else {
          headerText = getLang('wall_show_all_n_replies', total);
        }
        showCount = false;
      } else {
        headerText = getLang('wall_hide_replies');
      }
    } else {
      headerText = getLang('wall_hide_replies');
    }
    headerEl.innerHTML = '<div class="wrh_text" id="wrh_text' + post_raw + '">' + headerText + '</div><div class="progress wrh_prg" id="wrh_prg' + post_raw + '"></div>';
    headerEl.onclick = wall.showReplies.pbind(post_raw, showCount, false);
    headerEl.setAttribute('offs', shown + '/' + total);
  },

  updatePoll: function (post_raw) {
    if (!vk.id) return;
    ajax.post('al_wall.php', {act: 'post_poll', post_raw: post_raw}, {
      onDone: function (html) {
        if (html) {
          val('post_poll' + post_raw, html);
        }
      }
    });
  },

  updatePollResults: function (post_raw, newPollDataTxt) {
    var pollWrapEl = ge('post_poll' + post_raw),
        pollDataEl = ge('post_poll_data' + post_raw),
        pollDataTxt = val(pollDataEl) || false;

    if (!pollWrapEl) return;

    var newPollData = eval('(' + newPollDataTxt + ')'),
        totalVotes = 0,
        maxVotes = 0,
        pollStats = '';

    each (newPollData, function () {
      totalVotes += this[1];
      if (this[1] > maxVotes) {
        maxVotes = this[1];
      }
    });

    if (pollDataTxt) {
      var pollData = eval('(' + pollDataTxt + ')');
      each (newPollData, function () {
        pollStats += rs(cur.wallTpl.poll_stats, {
          option_text: this[0],
          css_percent: totalVotes ? Math.round(this[1] * 100 / maxVotes) : 0,
          count: langNumeric(this[1], '%s', true),
          percent: totalVotes ? Math.round(this[1] * 1000 / totalVotes) / 10 : 0
        });
      });
      val(geByTag1('table', pollWrapEl), pollStats);
      val(pollDataEl, newPollDataTxt)
    }
    val(geByClass1('page_poll_total', pollWrapEl, 'span'), langNumeric(totalVotes, cur.lang.wall_X_people_voted || '%', true));
  },

  updated: function (key, data) {
    if (!cur.wallAddQueue || cur.wallAddQueue.key != key) {
      return;
    }
    if (data.failed) {
      cur.wallAddQueue = false;
      return;
    }
    cur.wallAddQueue.ts = data.ts;
    if (!isArray(data.events) || !data.events.length) {
      return;
    }

    var len = data.events.length,
        startST = scrollGetY(),
        curST = startST,
        fullWall = !cur.wallType.indexOf('full'),
        onepost = cur.onepost;

    each(data.events, function () {
      var ev = this.split('<!>'), ev_ver = ev[0], ev_type = ev[1], post_id = ev[2],
          el = ge('post' + post_id) || (onepost && ge('fw_post')),
          updH = 0, updY = 0;
      if (ev_ver != cur.options.qversion) {
        location.reload();
        return;
      }
      switch (ev_type) {
        case 'new_post':
          if (el) break;
          if (fullWall && cur.pgStart > 0) {
            cur.pgOffset++;
            break;
          }
          if (cur.oid == vk.id && vk.id == ev[9]) {
            if (window.curNotifier && curNotifier.idle_manager.is_idle) {
              wall.clearInput();
            }
          }

          var cont = ge('page_wall_posts'),
              lastPost = cont.lastChild,
              extendCb = fullWall ? FullWall.addTetaTet : false,
              isAdmin = cur.options.is_admin !== undefined ? cur.options.is_admin : (cur.options.wall_oid < 0 ? ev[ev.length - 1] & 2 : 0),
              newEl = se(wall.getNewPostHTML(ev, isAdmin, extendCb)),
              insBefore = cont.firstChild;

          if (ge('post' + post_id)) break;
          if (lastPost && lastPost != newEl) {
            re(lastPost);
          } else lastPost = false;
          if (!fullWall) {
            val('page_wall_count_all', intval(val('page_wall_count_all')) + 1);
            addClass(newEl, 'all');
            if (intval(ev[10])) {
              val('page_wall_count_own', intval(val('page_wall_count_own')) + 1);
              addClass(newEl, 'own');
            }
          } else if (!lastPost) {
            cur.pgOffset++;
          }
          while (insBefore && (insBefore.tagName == 'INPUT' || insBefore.nodeType != 1)) {
            insBefore = insBefore.nextSibling;
          }
          cont.insertBefore(newEl, insBefore);
          if (ge('post_poll_id' + post_id)) {
            wall.updatePoll(post_id);
          }
          placeholderSetup(ge('reply_field' + post_id));
          updH = newEl.offsetHeight;
          updY = getXY(newEl)[1];
          setStyle(newEl, {backgroundColor: '#FEFAE4'});
          animate(newEl, {backgroundColor: '#FFF'}, 6000);
          break;

        case 'edit_post':
          var editEl = ge('wpt' + post_id);
          if (!isVisible(el) || !editEl) break;

          updH = -editEl.offsetHeight;
          updY = getXY(editEl)[1];
          var text = rs(ev[3], {
            poll_hash: cur.wallTpl.poll_hash
          });
          val(editEl, text);
          if (ge('post_poll_id' + post_id)) {
            wall.updatePoll(post_id);
          }
          updH += editEl.offsetHeight;
          setStyle(editEl, {backgroundColor: '#FEFAE4'});
          animate(editEl, {backgroundColor: '#FFF'}, 6000);
          break;

        case 'del_post':
          if (!isVisible(el)) break;

          if (!cur.wallMyDeleted[post_id]) {
            updH = -el.offsetHeight;
            updY = getXY(el)[1];
            hide(el);
          }
          if (!fullWall) {
            val('page_wall_count_all', intval(val('page_wall_count_all')) - 1);
            if (ev[3]) {
              val('page_wall_count_own', intval(val('page_wall_count_own')) - 1);
            }
          }
          break;

        case 'res_post':
          if (!el && isVisible(el)) break

          if (fullWall) {
            cur.pgOffset++;
          } else {
            val('page_wall_count_all', intval(val('page_wall_count_all')) + 1);
            if (ev[3]) {
              val('page_wall_count_own', intval(val('page_wall_count_own')) + 1);
            }
          }
          break;

        case 'new_reply':
          if (!el || cur.wallMyReplied[post_id] || ge('post' + ev[3]) || (cur.onepost && cur.pgOffset < cur.pgCount)) break;

          var repliesEl = onepost ? ge('fw_replies_rows') : ge('replies' + post_id),
              extendCb = !onepost ? false : function (repls) {
                return (repls.acts ? {acts: '<span class="divide">|</span>' + repls.acts} : {})
              },
              isAdmin = cur.options.is_admin !== undefined ? cur.options.is_admin : (cur.options.wall_oid < 0 ? ev[ev.length - 1] & 2 : 0),
              newEl = ce('div', {innerHTML: wall.getNewReplyHTML(ev, isAdmin, extendCb)}).firstChild,
              highlight = false;

          if (repliesEl && !isVisible(repliesEl) || isVisible('reply_link' + post_id)) {
            re('reply_link' + post_id);
            show('replies_wrap' + post_id);
            highlight = true;
          } else {
            var openEl = repliesEl.nextSibling, newCnt = geByClass('new_reply', repliesEl, 'div').length + 1;
            if (!onepost && !cur.wallMyOpened[post_id]) {
              addClass(newEl, 'new_reply');
              if (!openEl || openEl.className != 'replies_open') {
                openEl = ce('div', {className: 'replies_open', onclick: wall.openNewComments.pbind(post_id)});
                repliesEl.parentNode.insertBefore(openEl, repliesEl.nextSibling);
                updH = 35;
                updY = getXY(openEl)[1];
              }
              openEl.innerHTML = getLang('wall_x_new_replies_more', Math.min(100, newCnt));
              openEl.newCnt = newCnt;
            } else {
              if (openEl && openEl.className == 'replies_open') re(openEl);
              highlight = true;
              var headerEl = geByClass1('wr_header', repliesEl, 'a'),
                  shown = geByClass('reply', repliesEl, 'div').length + 1,
                  total = shown;
              if (headerEl) {
                total = intval(headerEl.getAttribute('offs').split('/')[1]) + 1;
              }
              if (total > 5 || shown < total) {
                if (!headerEl) {
                  repliesEl.insertBefore(headerEl = ce('a', {className: 'wr_header'}), repliesEl.firstChild);
                }
                wall.updateRepliesHeader(post_id, headerEl, shown, total);
              }
            }
          }
          repliesEl.appendChild(newEl);
          if (highlight) {
            setStyle(newEl, {backgroundColor: '#FEFAE4'});
            animate(newEl, {backgroundColor: '#FFF'}, 6000);
          }
          if (cur.onepost) {
            FullWall.repliesSummary(ev[13]);
            cur.pgOffset++;
            cur.pgCount++;
            Pagination.pageReady(false);
            FullWall.onePostOnScroll(false, false, true);
          } else if (!hasClass(newEl, 'new_reply')) {
            updH = newEl.offsetHeight;
            updY = getXY(newEl)[1];
            repliesEl && setStyle('replies_side' + post_id, {height: repliesEl.clientHeight - 31});
          }
          break;

        case 'del_reply':
          if (cur.wallMyDeleted[post_id] || !el) break;
          updH = -el.offsetHeight;
          updY = getXY(el)[1];
          if (cur.onepost) {
            hide(el);
            cur.pgOffset--;
            cur.pgCount--;
          } else {
            re(el);
          }
          break;

        case 'like_post':
        case 'like_reply':
          if (!el) break;
          var likePost = ev_type == 'like_reply' ? post_id.replace('_', '_wall_reply') : post_id;
              cntEl = ge('like_count' + likePost),
              iconEl = ge('like_icon' + likePost),
              // lnkEl = ge('like_link' + post_id),
              cnum = intval(val(cntEl)),
              num = intval(ev[3]);

          val(cntEl, num || '');
          toggleClass(iconEl, 'no_likes', num <= 0);
          // setStyle(lnkEl, {opacity: '', visibility: ''});
          setStyle(iconEl, {opacity: '', visibility: ''});
          break;

        case 'vote_poll':
          if (!el) break;
          wall.updatePollResults(post_id, ev[3]);
          break;
      }
      if (updH && curST > updY) {
        curST += updH;
      }
    });
    var endST = scrollGetY();
    if (curST != startST && startST > 100 && Math.abs(startST - endST) < 100) {
      if (browser.msie6) {
        pageNode.scrollTop = curST;
      } else {
        htmlNode.scrollTop = bodyNode.scrollTop = curST;
      }
    }
    wall.update();
  },

  initUpdates: function (key) {
    if (!key || !window.Notifier) {
      return;
    }
    var wasKey = cur.wallAddQueue,
        checkCb = function () {if (cur.wallAddQueue) Notifier.addKey(cur.wallAddQueue, wall.updated);};

    cur.wallAddQueue = key;
    checkCb();
    if (!wasKey) {
      checkInt = setInterval(checkCb, 10000);
      cur.destroy.push(function () {clearInterval(checkInt)});
    }
  },

  init: function(opts) {
    extend(cur, {
      postField: ge('post_field'),
      postNoteName: ge('post_note_name'),
      wallType: opts.wall_type,
      wallTpl: opts.wall_tpl,
      wallMyDeleted: {},
      tsDiff: opts.wall_tpl && opts.wall_tpl.abs_timestamp ? Math.round((vkNow() / 1000 - opts.wall_tpl.abs_timestamp) / 900.0) * 900 : 0,
      wallMyOpened: {},
      wallMyReplied: {},
      wallUploadOpts: opts.upload || false
    });
    if (opts.wall_tpl && opts.wall_tpl.lang) {
      cur.lang = extend(cur.lang || {}, opts.wall_tpl.lang);
    }

    cur.destroy.push(function(c) {
      cleanElems(c.postField, c.postNoteName);
    });
    var rem = removeEvent.pbind(document, 'click', wall.hideEditPostReply);

    if (cur._back) {
      cur._back.hide.push(rem);
      cur._back.show.push(rem);
      cur._back.show.push(addEvent.pbind(document, 'click', wall.hideEditPostReply));
    } else {
      cur.destroy.push(rem);
    }
    var ownCnt = ge('page_wall_count_own');
    if (cur.wallType == 'own' && !intval(ownCnt && ownCnt.value)) {
      cur.wallType = ge('page_wall_posts').className = 'all';
    }
    wall.update();
    wall.initUpdates(opts.add_queue_key);

    // Times update interval. For relative time correction
    if (opts.wall_tpl) {
      cur.timeUpdateInt = setInterval(function () {wall.updateTimes(opts.wallCont);}, 10000);
      cur.destroy.push(function () {clearInterval(cur.timeUpdateInt);});
    }

    if (opts.draft) {
      wall.setDraft(opts.draft);
    }

    var scrollNode = browser.msie6 ? pageNode : window;
    addEvent(scrollNode, 'scroll', wall.scrollCheck);
    addEvent(window, 'resize', wall.scrollCheck);
    cur.destroy.push(function () {
      removeEvent(scrollNode, 'scroll', wall.scrollCheck);
      removeEvent(window, 'resize', wall.scrollCheck);
    });
    cur.wallAutoMore = opts.automore;

    placeholderSetup(cur.postField);

    each(geByTag('textarea', ge('page_wall_posts')), function() { placeholderSetup(this, {fast: 1}); });

    removeEvent(document, 'click', wall.hideEditPostReply);
    addEvent(document, 'click', wall.hideEditPostReply);

    if (opts.media_types) {
      cur.wallAddMedia = initAddMedia(ge('page_add_media').firstChild, 'media_preview', opts.media_types, {
        onMediaAdd: function() {
          if (cur.module == 'profile' || cur.module == 'feed' || cur.module == 'wall') {
            wall.postChanged(val('post_field'), true);
          }
        }
      });
      cur.wallAddMedia.onChange = function() {
        //wall.checkPostLen('post_field', 'post_warn', val('post_field'), true);
      }
    }
    cur.withUpload = window.WallUpload && !(browser.msie111 || browser.safari_mobile) && (cur.wallType == 'all' || cur.wallType == 'own' || cur.wallType == 'feed') && wall.withMentions && cur.wallUploadOpts;
    if (cur.withUpload && WallUpload.checkDragDrop()) {
      var clean = function () {
          removeEvent(document, 'dragover dragenter drop dragleave', cb);
        },
        cb = function (e) {
          if (dragtimer !== false) {
            clearTimeout(dragtimer);
            dragtimer = false;
          }
          if (cur.uploadInited) {
            clean();
            return cancelEvent(e);
          }
          switch (e.type) {
            case 'drop':
              started = false;
              delete cur.wallUploadFromDrag;
              hide('post_upload_dropbox');
              break;

            case 'dragleave':
              dragtimer = setTimeout(function () {
                started = false;
                delete cur.wallUploadFromDrag;
                hide('post_upload_dropbox');
              }, 100);
              break;

            case 'dragover':
            case 'dragenter':
              if (!started) {
                started = (e.target && (e.target.tagName == 'IMG' || e.target.tagName == 'A')) ? 1 : 2;
                if (started == 2) {
                  setTimeout(wall.showEditPost, 0);
                }
              }
              if (started == 2) {
                cur.wallUploadFromDrag = 1;
              }
          }
          return cancelEvent(e);
        },
        started = false,
        dragtimer = false;
      addEvent(document, 'dragover dragenter drop dragleave', cb);
      cur.destroy.push(clean);
    }
  },
  photoGetNext: function(obj, pv) {
    if (pv) {
      var img = obj;
      obj = obj.parentNode;
    }
    if (!obj) return false;
    var next = obj.firstChild;
    if (!next || next.className != 'post_hh') {
      var img = pv ? img : geByTag1('img', obj);
      var size = getSize(img);
      var mt = (size[1] / 2 - 40);
      if (pv) {
        size[0] += getXY(img)[0] - getXY(obj)[0] - 25;
        mt += intval(getStyle(img, 'marginTop'));
      }
      var style = getStyle(obj, 'paddingLeft');
      next = ce('div', {
        innerHTML: '<div class="post_hh_cover"><div class="post_hh_bg"></div><div class="post_hh_fg" onmouseover="wall.hhOver(this)" onmouseout="wall.hhOut(this)" onmousedown="return wall.hhClick(this, event, '+intval(pv)+')"></div></div>',
        className: 'post_hh',
        w: size[0]

      }, {
        marginLeft: size[0] - 72,
        marginTop: mt
        //width: getSize(obj)[0]
        //-intval(getStyle(obj, 'paddingLeft'))-intval(getStyle(obj, 'paddingRight'))
      });
      obj.insertBefore(next, obj.firstChild);
    }
    return next;
  },

  photoOver: function(obj, pv) {
    if (cur.pvHTime || cur.pvHLoad) return;
    if (obj.showing) return;
    obj.showing = true;
    var next = wall.photoGetNext(obj, pv);
    clearTimeout(next.getAttribute('timer'));
    show(next);

    animate(next.firstChild, {marginLeft: 0}, {duration: 400, transition: Fx.Transitions.easeOutCubic});
  },

  photoOut: function(obj, pv, next) {
    delete obj.showing;
    var next = next || wall.photoGetNext(obj, pv);
    if (!next) return;
    next.setAttribute('timer', setTimeout(function() {
      animate(next.firstChild, {marginLeft: 72}, {duration: 300, transition: Fx.Transitions.easeInBack, onComplete: function() {
        hide(next);
      }});
    }, 300));
  },

  hhLiked: function(obj, act) {
    return (act || hasClass)(obj.parentNode.parentNode.parentNode, 'post_hh_liked');
  },

  hhOver: function(obj) {
    clearTimeout(obj.parentNode.parentNode.getAttribute('timer'));
    //wall.photoOver(false, false, obj.parentNode.parentNode);
    //clearTimeout(obj.getAttribute('timer'));
    var params = wall.hhLiked(obj) ? [0.7, 1] : [0.5, 0.8];
    animate(obj.previousSibling, {opacity: params[0]}, 200);
    animate(obj, {opacity: params[1]}, 200);
  },

  hhOut: function(obj) {
    //obj.setAttribute('timer', setTimeout(function() {
    debugLog('CLICKED');
    var params = wall.hhLiked(obj) ? [0.6, 1] : [0.3, 0.7];
    animate(obj.previousSibling, {opacity: params[0]}, 200);
    animate(obj, {opacity: params[1]}, 200);
    wall.photoOut(false, false, obj.parentNode.parentNode);

    //}, 200));
  },

  hhClick: function(obj, ev, pv) {
    wall.hhLiked(obj, wall.hhLiked(obj) ? removeClass : addClass);
    wall.hhOver(obj);
    //wall.like();
    if (pv) {
      Photoview.like()
    } else {
      var info = obj.parentNode.parentNode.parentNode.getAttribute('like').split('/');
      debugLog(info)
    }
    obj.innerHTML = '<img class="post_hh_ah" src="/images/icons/post_hh.png" />';
    //ajax.post('a_do_like', {'object': 'photo'+info[0], hash: info[1]});
    var img = obj.firstChild;
    animate(img, {transform: 'scale(2)', opacity: 0}, {duration: 600, transition: Fx.Transitions.easeOutCubic});
    //addClass(img, 'post_hh_ah_after');
    return cancelEvent(ev);
  }
}

wall = extend(wall, {
  showDeletePost: wall._animDelX.pbind(0.3),
  hideDeletePost: wall._animDelX.pbind(0),
  activeDeletePost: function(post, tt) {
    wall._animDelX(1, 1, post);
    if (tt) showTooltip(ge('delete_post' + post), {text: tt, showdt: 500});
  },
  deactiveDeletePost: wall._animDelX.pbind(0.3, 0)
});

WallUpload = {
  photoUploaded: function(info, params) {
    var i = info.ind !== undefined ? info.ind : info,
        fileName = info.fileName ? info.fileName : info,
        ind = info.fileName ? i + '_' + info.fileName : info,
        prg = ge('upload' + ind + '_progress_wrap');

    prg && hide(geByClass1('progress_x', prg));
    ajax.post('al_photos.php', extend({act: 'choose_uploaded'}, params), {
      onDone: function(media, data) {
        cur.wallAddMedia.chooseMedia('photo', media, extend(data, {upload_ind: i + '_' + fileName}));
      },
      onFail: WallUpload.uploadFailed.pbind(info)
    });
  },
  uploadFailed: function(info, code) {
    var i = info.ind !== undefined ? info.ind : info, fileName = info.fileName ? info.fileName : info;
    if (Upload.types[i] == 'fileApi' && !Upload.options[i].wiki_editor) {
      var lnkId, ind = info.fileName ? i+'_'+info.fileName : info;
      if (cur.imMedia) {
        re('upload'+ind+'_progress_wrap');
        lnkId = cur.imMedia.lnkId;
        cur.addMedia[lnkId].unchooseMedia();
      } else if (cur.addMedia) {
        re('upload'+ind+'_progress_wrap');
        lnkId = (cur.attachMediaIndexes || {})[fileName];
        if (lnkId) cur.addMedia[lnkId].unchooseMedia();
      }
    }
    // hide(box.progress);
    topError('Upload failed', {dt: -1, type: 102, url: (ge('file_uploader_form' + i) || {}).action});
    Upload.embed(i);
  },
  show: function () {
    if (!cur.uploadInited) return;
    var richTA = geByClass1('mention_rich_ta', ge('submit_post_box'), 'div'),
        s = {};
    if (cur.wallType == 'feed') {
      removeClass(cur.uploadWrap, 'post_upload_min_wrap');
      s.width = 515;
      s[vk.rtl ? 'paddingLeft' : 'paddingRight'] = 35;
    } else {
      show(cur.uploadWrap);
      s.width = 340;
      s[vk.rtl ? 'paddingLeft' : 'paddingRight'] = 35;
    }
    setStyle('post_field', s);
    setStyle(richTA, s);
  },
  hide: function () {
    if (!cur.uploadInited) return;
    var richTA = geByClass1('mention_rich_ta', ge('submit_post_box'), 'div'),
        s = {};
    if (cur.wallType == 'feed') {
      addClass(cur.uploadWrap || ge('post_preupload_wrap'), 'post_upload_min_wrap');
      s.width = 515;
      s[vk.rtl ? 'paddingLeft' : 'paddingRight'] = 35;
    } else {
      hide(cur.uploadWrap);
      s.width = 372;
      s[vk.rtl ? 'paddingLeft' : 'paddingRight'] = 3;
    }
    setStyle('post_field', s);
    setStyle(richTA, s);
    hide('post_upload_dropbox');
  },
  checkDragDrop: function() {
    var b = browser, bv = floatval(browser.version);
    if (!(b.msie && bv >= 9 || b.mozilla && bv >= 3.5 || b.chrome || b.safari)) { // Drag'n'Drop reqs
      return false;
    }
    return (window.XMLHttpRequest || window.XDomainRequest) &&
           (window.FormData || window.FileReader && (window.XMLHttpRequest && XMLHttpRequest.sendAsBinary ||  window.ArrayBuffer && window.Uint8Array && (window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder)));
  },
  preinit: function () {
    var data = cur.wallUploadOpts,
        field = ge('post_field'),
        tt = WallUpload.checkDragDrop() ?  ' onmouseover="showTooltip(this, {text: \'' + (data.opts.lang.wall_photos_drag_hint || 'You can also drop files here') + '\'})"' : '';
    field.parentNode.insertBefore(cur.uploadWrap = ce('div', {
      className: 'post_upload_wrap post_upload_min_wrap',
      id: 'post_preupload_wrap',
      innerHTML: '<div id="post_field_upload" class="post_upload"' + tt + '><input class="file" type="file" size="28" onchange="data(this, \'changed\', true); wall.showEditPost();" ' + (browser.opera ? '' : 'multiple="true" ') + 'accept="image/*" name="photo"/></div>'
    }), field);
  },
  init: function () {
    removeEvent(bodyNode, 'dragover dragenter');
    var preinited = ge('post_preupload_wrap'),
        fileinput = preinited && geByTag1('input', preinited),
        data = cur.wallUploadOpts,
        field = ge('post_field'),
        tt = WallUpload.checkDragDrop() ?  ' onmouseover="showTooltip(this, {text: \'' + (data.opts.lang.wall_photos_drag_hint || 'You can also drop files here') + '\'})"' : '';

    if (preinited) {
      var btn = preinited.firstChild;
      if (btn.tt && btn.tt.el) {
        btn.tt.destroy();
      }
      re(preinited);
    }
    field.parentNode.insertBefore(cur.uploadWrap = ce('div', {
      className: 'post_upload_wrap fl_r',
      innerHTML: '<div id="post_field_upload" class="post_upload"' + tt + '></div>'
    }), field);
    var submitBox = ge('submit_post_box');
    submitBox.insertBefore(ce('div', {
      id: 'post_upload_dropbox',
      className: 'post_upload_dropbox',
      innerHTML: '<div class="post_upload_dropbox_inner noselect"><span class="post_upload_drop_label">' + (data.opts.lang.wall_drop_photos_here || 'Drop files here') + '</span><span class="post_upload_release_label">' + (data.opts.lang.wall_release_photos_here || 'Release button to attach files') + '</span></div>'
    }), submitBox.firstChild);

    Upload.init('post_field_upload', data.url, data.params, {
      file_name: 'photo',
      file_size_limit: 1024 * 1024 * 5, // 5Mb
      file_types_description: 'Image files (*.jpg, *.png, *.gif)',
      file_types: '*.jpg;*.JPG;*.png;*.PNG;*.gif;*.GIF',
      file_input: fileinput,
      accept: 'image/*',
      file_match:  data.opts.ext_re,
      lang: data.opts.lang,
      wiki_editor: 0,

      onUploadStart: function(info, res) {
        var i = info.ind !== undefined ? info.ind : info, options = Upload.options[i];
        if (Upload.types[i] == 'form') {
          // show(box.progress);
          geByClass1('file', ge('choose_photo_upload')).disabled = true;
        }
        if (Upload.types[i] == 'fileApi') {
          if (cur.notStarted) {
            boxQueue.hideLast();
            delete cur.notStarted;
          }
          if (options.multi_progress) this.onUploadProgress(info, 0, 0);
        }
      },
      onUploadComplete: function(info, res) {
        var params, i = info.ind !== undefined ? info.ind : info, fileName = info.fileName ? info.fileName : info;
        try {
          params = eval('(' + res + ')');
        } catch(e) {
          params = q2ajx(res);
        }
        if (!params.photos) {
          Upload.onUploadError(info);
          return;
        }
        WallUpload.photoUploaded(info, params);
      },
      onUploadProgress: function(info, bytesLoaded, bytesTotal) {
        var i = info.ind !== undefined ? info.ind : info;
        if (Upload.types[i] == 'fileApi') {
          var lnkId = (cur.attachMediaIndexes || {})[i];
          if (lnkId === undefined || lnkId && cur.addMedia[lnkId].chosenMedia || cur.imMedia) {
            var data = {loaded: bytesLoaded, total: bytesTotal};
            if (info.fileName) data.fileName = info.fileName;
            cur.wallAddMedia.showMediaProgress('photo', i, data);
          }
        }
      },
      onUploadError: WallUpload.uploadFailed,
      onCheckServerFailed: function () {
        delete cur.uploadInited;
        WallUpload.hide();
      },
      onUploadCompleteAll: function (i) {
        if (Upload.types[i] == 'form') {
          Upload.embed(i);
        }
      },
      onDragEnter: function () {
        wall.showEditPost();
        var dropEl = ge('post_upload_dropbox').firstChild,
            h = ge('submit_post_box').offsetHeight - (browser.webkit || browser.chrome ? 2 : 0);
        if (cur.wallType != 'feed') {
          h -= 16;
        }
        setStyle(dropEl, {height: h});
      },

      noFlash: 1,
      multiple: 1,
      multi_progress: 1,
      max_files: 10,
      chooseBox: 1,
      clear: 1,
      type: 'photo',
      max_attempts: 3,
      server: data.opts.server,
      error: data.opts.default_error,
      error_hash: data.opts.error_hash,
      dropbox: 'post_upload_dropbox',
      label: data.opts.label,
      dragEl: bodyNode
    });
    cur.uploadInited = true;
    WallUpload.show();
    if (cur.wallUploadFromDrag) {
      if (cur.wallUploadFromDrag == 1) {
        var dropEl = ge('post_upload_dropbox'),
            h = ge('submit_post_box').offsetHeight - (browser.webkit || browser.chrome ? 2 : 0);
        if (cur.wallType != 'feed') {
          h -= 16;
        }
        setStyle(dropEl.firstChild, {height: h});
        show(dropEl);
      }
      delete cur.wallUploadFromDrag;
    }
  }
};

function initCustomMedia(lnk, types, opts) {
  lnk = ge(lnk);
  if (!lnk) return false;

  opts = opts || {};

  if (!window.__addMediaIndex) __addMediaIndex = 0;
  var menuId = ++__addMediaIndex;

  var icons = opts.bgsprite || '/images/icons/wall_icons.gif?4';
  vkImage().src = icons;

  var html = '\
<table cellspacing="0" cellpadding="0">\
  <tr>\
    <td class="side"><div></div></td>\
    <td><div class="rows"></div></td>\
    <td class="side"><div></div></td>\
  </tr>\
  <tr>\
    <td colspan="3">\
      <div class="bottom"></div><div class="bottom2"></div>\
    </td>\
  </tr>\
</table>';

  var menuNode = ce('div', {
    id: 'add_media_menu_' + menuId,
    className: 'add_media_menu',
    innerHTML: '<div class="add_media_header"><nobr>' + lnk.innerHTML + '</nobr></div><div class="add_media_rows">' + html + '</div>'
  }), rowsNode = geByClass1('rows', menuNode, 'div');

  bodyNode.appendChild(menuNode);

  var _hideTimer, mediaMenu = {
    id: menuId,
    fixed: -1,
    menuNode: menuNode,
    updateFixed: function(newVal) {
      if (mediaMenu.fixed != -1 && newVal != -1 && newVal !== undefined && mediaMenu.fixed == newVal) {
        return;
      }
      if (mediaMenu.fixed == -1 || newVal !== undefined) {
        if (newVal === undefined || newVal == -1) {
          var el = lnk;
          mediaMenu.fixed = false;
          while (el) {
            if (getStyle(el, 'position') == 'fixed') {
              mediaMenu.fixed = true;
              break;
            }
            el = el.offsetParent;
          }
        } else {
          mediaMenu.fixed = newVal;
        }
        if (mediaMenu.fixed) {
          setStyle(menuNode, {position: ''});
          addClass(menuNode, 'fixed');
        } else {
          setStyle(menuNode, {position: 'absolute'});
          removeClass(menuNode, 'fixed');
        }
        if (isVisible(menuNode)) {
          mediaMenu._updatePosition(true);
        }
      }
    },
    show: function() {
      clearTimeout(_hideTimer);
      if (menuNode && !isVisible(menuNode)) {
        lnk.blur();
        mediaMenu.updateFixed(-1);
        mediaMenu._updatePosition();

        browser.msie ? show(menuNode) : fadeIn(menuNode, 100);
        opts.onShow && opts.onShow();
      }
    },
    _updatePosition: function(visible) {
      var coords = getXY(lnk, mediaMenu.fixed);
      var left = coords[0] - 8 + (browser.msie6 ? 1 : 0);
      var top = coords[1] - 4 + (browser.msie && !browser.msie8 ? 1 : 0);
      var rowsEl = geByClass1('add_media_rows', menuNode);
      setStyle(menuNode, {left: left, top: top});

      // Showing to up in case of little widget height
      if (!visible) {
        setStyle(menuNode, {visibility: 'hidden', display: 'block'});
      }
      var size = getSize(rowsEl.firstChild), st = (mediaMenu.fixed ? 0 : scrollGetY());
      if (!visible) {
        setStyle(menuNode, {visibility: '', display: 'none'});
      }

      var needReverse = false;
      if (size[1] < top - st && lastWindowHeight + st < top + size[1] + 20) {
        setStyle(rowsEl, 'marginTop', -size[1] + 3);
        if (!mediaMenu.reverse) needReverse = true;
      } else {
        setStyle(rowsEl, 'marginTop', (/mac/.test(_ua) && browser.mozilla ? 22 : 20));
        if (mediaMenu.reverse) needReverse = true;
      }
      if (needReverse) {
        var els = rowsNode.childNodes;
        var len = els.length;
        while(len--) {
          rowsNode.appendChild(els[len]);
        }
        if (mediaMenu.moreWrap) {
          mediaMenu.moreWrap.appendChild(mediaMenu.moreWrap.firstChild);
        }
        mediaMenu.reverse = !mediaMenu.reverse;
      }
    },
    hide: function(noTimeout) {
      var hideFunc = browser.msie ? hide.pbind(menuNode) : fadeOut.pbind(menuNode, 100);
      if (noTimeout === true) {
        hideFunc();
      } else {
        _hideTimer = setTimeout(hideFunc, 300);
      }
      opts.onHide && opts.onHide();
    },
    setItems: function(types) {
      rowsNode.innerHTML = '';
      var test = '';
      var spec_style = (/mac/.test(_ua) && browser.mozilla) ? {height: 19, paddingTop: 3} : {};
      var moreNode = false;

      var needHide = (types.length > 6 && getLang('global_add_media_more'));
      mediaMenu.moreWrap = false;

      each(types, function(i, v) { // [id, name, bg-position, onclick, href, bg-url, customStyle]

        var attrs = {
          innerHTML: '<nobr>' + v[1].replace(/\s/g, '&nbsp;') + '</nobr>',
          className: 'add_media_type_' + menuId + '_' + v[0]
        }, style = v[6] || {
          backgroundImage: 'url(' + (v[5] || icons) + ')',
          backgroundPosition: (v[2] || '0 0')
        }, row;

        if (needHide && i == 3) {
          var rowsEl = geByClass1('add_media_rows', menuNode);
          var moreWrap = rowsNode.appendChild(ce('div', {
            className: "add_media_more_wrap"
          }));
          addEvent(moreWrap, 'mouseover', function () {
            clearTimeout(mediaMenu.hideTimeout);
            show(moreNode);
            if (mediaMenu.reverse) {
              var size = getSize(rowsEl.firstChild);
              setStyle(rowsEl, 'marginTop', -size[1] + 3);
            }
          });
          addEvent(moreWrap, 'mouseout', function () {
            clearTimeout(mediaMenu.hideTimeout);
            mediaMenu.hideTimeout = setTimeout(function() {
              hide(moreNode);
              if (mediaMenu.reverse) {
                var size = getSize(rowsEl.firstChild);
                setStyle(rowsEl, 'marginTop', -size[1] + 3);
              }
            }, 10)
          });
          row = moreWrap.appendChild(ce('a', {
            className: 'add_media_more',
            innerHTML: '<nobr>'+getLang('global_add_media_more')+'</nobr>'
          }));
          addEvent(row, 'click', function (ev) {
            return cancelEvent(ev);
          });
          moreNode = ce('div', {
            id: 'add_media_more_node'
          }, {
            display: 'none'
          });
          row = moreWrap.appendChild(moreNode);
          mediaMenu.moreWrap = moreWrap;
        }

        extend(style, spec_style);
        if (v[4]) {
          attrs.href = v[4];
        }
        row = (moreNode ? moreNode : rowsNode).appendChild(ce('a', attrs, style));
        if (v[3]) {
          addEvent(row, 'click', function () {
            mediaMenu.hide(true);
            v[3]();
            return false;
          });
        }
      });
    }
  };

  types && mediaMenu.setItems(types);

  removeEvent(lnk, 'click');
  addEvent(lnk, 'click', mediaMenu.show);
  addEvent(menuNode, 'mouseover', mediaMenu.show);
  addEvent(menuNode, 'mouseout', mediaMenu.hide);
  addEvent(geByClass1('add_media_header', menuNode), 'click', function(e) {
    mediaMenu.show(true);
    cancelEvent(e);
  });

  cur.destroy.push(function() {
    cleanElems(geByClass1('add_media_header', menuNode), menuNode);
    bodyNode.removeChild(menuNode);
    removeEvent(lnk, 'click', mediaMenu.show);
  });

  return mediaMenu;
}

var urlActiveExp = /([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+[a-z]{2,6})(\/.*?)?)(&nbsp;|[ \t\r\n \u00A0])/i,
    urlInactiveExp = /([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+[a-z]{2,6})(\/.*?)?)(&nbsp;|[ \t\r\n \u00A0]|$)/i;

function initAddMedia(lnk, previewId, mediaTypes, opts) {
  var types = [], bgposes = {graffiti: 0, video: -22, photo: -44, audio: -66, poll: -88, doc: -110, map: -132, note: -154}, addMedia;
  opts = opts || {};
  each (mediaTypes || [], function (i, v) {
    if (!v[1]) return;
    var handler = false, toId = opts.toId || cur.postTo, params = {to_id: toId, scrollbar_width: sbWidth()};
    params.mail_add = opts.mail || nav.strLoc.match(/^(mail|im|al_mail\.php|al_im\.php)($|\?)/) ? 1 : '';
    switch (v[0]) {
      case 'graffiti':
        if ((browser.chrome || browser.opera || browser.mobile || browser.safari || browser.mozilla || browser.msie9) &&
            document.createElement('canvas').getContext) {
          handler = showBox.pbind('al_wall.php', {act: 'canvas_draw_box', to_id: toId, flash: browser.flash}, {cache: 1});
        } else {
          handler = showBox.pbind('al_wall.php', {act: 'draw_box', to_id: toId, flash: browser.flash}, {cache: 1});
        }
        break;

      case 'photo':
        handler = showBox.pbind('photos.php', extend(params, {act: 'a_choose_photo_box'}), {cache: 1}); break;

      case 'video':
        handler = showBox.pbind('video.php', extend(params, {act: 'a_choose_video_box'}), {cache: 1}); break;

      case 'audio':
        handler = showBox.pbind('audio', extend(params, {act: 'a_choose_audio_box'}), {cache: 1}); break;

      case 'poll':
        handler = function () {addMedia.chooseMedia('poll', '', v[2])}; break;

      case 'app':
        handler = showBox.pbind('apps.php', {act: 'a_choose_app_box', to_id: toId, aid: v[2]}, {stat: ['apps_flash.js'], cache: 1});
        break;

      case 'doc':
        handler = showBox.pbind('docs.php', extend(params, {act: 'a_choose_doc_box'}), {stat: ['docs.css'], cache: 1});
        break;
      case 'map':
        handler = showBox.pbind('al_places.php', extend(params, {act: 'a_choose_place_box'}), {stat: ['places.css', 'map.css', 'maps.js', 'ui_controls.css', 'ui_controls.js', 'boxes.css'], cache: 1});
        break;
      case 'note':
        handler = function() {
          showWiki({note: 'new'}, true);
        }
        break;
    }
    var isApp = (v[0] == 'app');
    var icon = isApp ? v[4] : false;
    var bgpos = isApp ? '3px 3px' : ('0px ' + bgposes[v[0]] + 'px');
    var url = isApp ? ('/app' + v[2] + '?to_id=' + toId) : false;
    var name = v[1].replace(/\s/g, '&nbsp;');
    types.push([v[0], v[1], bgpos, handler, url, icon]);
  });

  var menu = initCustomMedia(lnk, types, {
    onShow: function () {
      cur.chooseMedia = addMedia.chooseMedia;
      cur.showMediaProgress = addMedia.showMediaProgress;
      cur.attachCount = addMedia.attachCount;
    }
  });

  if (!menu) return;
  previewId = previewId || 'media_preview';

  var lnkId = menu.id,
      limit = opts.limit || 10,
      multi = limit > 1,
      previewEl = ge(previewId),
      progressEl, picsEl, docsEl;

  if (multi) {
    val(previewEl, '<div id="page_pics_preview' + lnkId + '" class="page_pics_preview media_preview clear_fix"></div><div id="page_docs_preview' + lnkId + '" class="page_docs_preview media_preview clear_fix"></div><div id="page_progress_preview' + lnkId + '" class="page_progress_preview media_preview clear_fix"></div>');
    var picsEl = previewEl.childNodes[0],
        docsEl = previewEl.childNodes[1],
        progressEl = previewEl.childNodes[2];
    removeClass(previewEl, 'media_preview');
    addClass(previewEl, 'multi_media_preview');
  }

  addMedia = {
    _addMediaLink: lnk,
    lnkId: lnkId,
    menu: menu,
    handlers: {},
    chosenMedias: [],
    _showAddMedia: function() {
      menu.show();
    },
    _hideAddMedia: function(noTimeout) {
      menu.hide(noTimeout);
    },
    chooseMedia: function(type, media, data) {
      if (addMedia.onChange && addMedia.onChange(type, media, data) === false) {
        return false;
      }
      if (addMedia.attachCount() >= limit && data.upload_ind === undefined) {
        if (multi) {
          return false;
        } else {
          addMedia.unchooseMedia();
        }
      }
      var preview = '', toPics = false;
      switch (type) {
        case 'graffiti':
          preview = '<div class="fl_l page_preview_graffiti"><img class="page_preview_graffiti" src="' + data + '" /></div>';
          // preview = '<img class="graffiti" src="' + data + '" />';
          toPics = true;
          break;
        case 'photo':
          vkImage().src = data[1];
          preview = '<div onclick="return showPhoto(\'' + media + '\', \'' + data[2] + '\', ' + data[3].replace(/"/g, '&quot;') + ');" class="fl_l page_preview_photo"><img class="page_preview_photo" src="' + data[1] + '" /></div>';
          // preview = '<img class="photo" src="' + (isArray(data) ? data[0] : data) + '" />';
          toPics = true;
          break;
        case 'video':
          preview = '<div onclick="return showVideo(\'' + media + '\');" class="fl_l page_preview_video"><img class="page_preview_video" src="' + data + '" /></div>';
          // preview = '<img class="video" src="' + data + '" />';
          toPics = true;
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
          // preview = '<div class="audio"><div class="media_audio_icon"></div><span><b>' + data[0] + '</b> - ' + data[1] + '</span></div>';
          break;
        case 'app':
          preview = '<div class="app fl_l"><img src="' + data[0] + '" /><span>' + data[1] + '</span></div>';
          each(geByClass('add_media_type_' + lnkId + '_app', menu.menuNode, 'a'), function () {hide(this);});
          break;
        case 'doc':
          if (data[1] && data[2]) {
            preview = '<div class="fl_l"><div class="page_preview_doc_photo"><img src="'+data[2]+'" align="center"></div><div class="page_preview_doc_photo_hint">'+data[0]+'</div></div>';
            toPics = true;
          } else {
            preview = '<div class="doc fl_l"><div class="media_doc_icon"></div><span><b>' + data[0] + '</b></span></div>';
          }
          break;
        case 'share':
          preview = '<div class="share fl_l"><b class="fl_l"></b>' + getLang('forum_link_link') + ': <a href="/away.php?to=' + encodeURIComponent(data[1]) + '" target="_blank">' + data[0] + '</a></div>';
          addMedia.shareData = {domain: data[0], url: data[1], initialPattern: data[2]};
          if (data[3]) {
            cur.shareShowImg = 0;
            extend(addMedia.shareData, {title: data[3], description: data[4], images: [data[5]], imagesStyles: [''], user_id: data[6], photo_id: data[7]});
            addMedia.showPreview(true);
            addMedia.shareData.images = false;
          } else {
            addMedia.loadPreview(data[1]);
          }
          break;
        case 'poll':
          preview = '<div class="poll fl_l"><b class="fl_l"></b>' + getLang('create_poll') + '<span id="create_poll_question_preview' + lnkId + '"></span></div>';
          addMedia.createPoll(data);
          hide(geByClass1('add_media_type_' + lnkId + '_poll', menu.menuNode, 'a'));
          break;
        case 'map':
          preview = '<div class="fl_l"><a onclick="return showBox(\'al_places.php\', {act: \'geo_box\', lat: '+data[0]+', long: '+data[1]+', provider: '+intval(data[3])+'});"><div class="page_media_map_point"></div><img class="page_preview_map" width="180" height="70" src="http://maps.googleapis.com/maps/api/staticmap?center='+data[0]+','+data[1]+'&zoom=11&size=180x70&sensor=false&language='+data[2]+'" /></a></div>';
          toPics = true;
          var lnk = addMedia.lnkId;
          hide(geByClass('add_media_type_'+lnk+'_map', ge('add_media_menu_'+lnk))[0])
          break;
        case 'page':
          preview = '<div class="share fl_l"><b class="fl_l"></b>' + data['lang']['profile_page_media'] + ': <a href="'+data['url']+'" target="_blank">'+data['title']+'</a></div>';
          cur.shareShowImg = 0;
          addMedia.shareData = data;
          addMedia.showPreview(true);
          addMedia.shareData.images = false;
          break;
        case 'note':
          preview = '<div class="share fl_l"><b class="fl_l"></b>' + data['lang']['profile_note_media'] + ': <a onclick="showWiki({w: \'note'+data['raw']+'\', edit: 1}, true, event);" id="share_note_title'+data['raw']+'" target="_blank">'+data['title']+'</a></div>';
          break;
      }
      if (multi) {
        var medias = addMedia.chosenMedias,
            ind = medias.length,
            mediaEl = se('<div class="page_preview_' + type + '_wrap">' + preview + '<div class="page_media_x_wrap fl_l" '+ (browser.msie ? 'title' : 'tootltip') + '="'+getLang('dont_attach')+'" onmouseover="if (browser.msie) return; showTooltip(this, {text: this.getAttribute(\'tootltip\'), shift: [0, 3, 3]})" onclick="cur.addMedia['+addMedia.lnkId+'].unchooseMedia(' + ind + ')"><div class="page_media_x"></div></div></div>');
        addClass(mediaEl, toPics ? 'fl_l' : 'clear_fix');
        if (data.upload_ind !== undefined) re('upload' + data.upload_ind + '_progress_wrap');
        (toPics ? picsEl : docsEl).appendChild(mediaEl);
        medias.push([type, media, mediaEl]);

        toggle(lnk, addMedia.attachCount() < limit);
        toggle(picsEl, picsEl.childNodes.length > 0);
        toggle(docsEl, docsEl.childNodes.length > 0);
        toggle(progressEl, progressEl.childNodes.length > 0);
      } else {
        val(previewEl, '<div class="fl_l">' + preview + '</div><div class="x fl_l" onmouseover="showTooltip(this, {text: \'' + getLang('dont_attach') + '\', shift: [0, 3, 3]})" onclick="cur.addMedia[' + lnkId + '].unchooseMedia()"></div>');
        show(previewEl);
        addMedia.chosenMedia = [type, media];
        addMedia.chosenMediaData = data;
      }

      if (!cur.fileApiUploadStarted) {
        boxQueue.hideLast();
      }

      cur.lastPostMsg = false;
      if (opts.onMediaAdd) {
        opts.onMediaAdd();
      }

      if (data.upload_ind !== undefined) {
        delete data.upload_ind;
      }
      return false;
    },
    unchooseMedia: function(ind) {
      if (addMedia.onChange && addMedia.onChange(false, ind) === false) {
        return false;
      }
      if (multi) {
        if (ind === undefined) {
          each (addMedia.chosenMedias, function (k, v) {
            if (v && k !== undefined) addMedia.unchooseMedia(k);
          });
          return;
        }
        var medias = addMedia.chosenMedias, x;
        if (medias[ind]) {
          if ((x = geByClass1('page_media_x_wrap', medias[ind][2], 'div')) && x.tt && x.tt.el) {
            x.tt.destroy();
          }
          re(medias[ind][2]);
          switch (medias[ind][0]) {
            case 'page':
            case 'share':
              var share = addMedia.shareData;
              if (share.url) {
                addMedia.urlsCancelled.push(share.url);
              }
              if (share.initialPattern) {
                addMedia.urlsCancelled.push(share.initialPattern);
              }
              addMedia.shareData = {};
              re(addMedia.sharePreview);
              addMedia.sharePreview = false;
              break;
            case 'poll':
              re(addMedia.pollPreview);
              addMedia.pollPreview = false;
              show(geByClass1('add_media_type_' + lnkId + '_poll', menu.menuNode, 'a'));
              break;
            case 'app':
              each(geByClass('add_media_type_' + lnkId + '_app', menu.menuNode, 'a'), function () {show(this);});
              break;
            case 'map':
              var lnk = addMedia.lnkId;
              show(geByClass('add_media_type_'+lnk+'_map', ge('add_media_menu_'+lnk))[0])
              break;
          }
          medias[ind] = false;
        }
        toggle(lnk, addMedia.attachCount() < limit);
        toggle(picsEl, picsEl.childNodes.length > 0);
        toggle(docsEl, docsEl.childNodes.length > 0);
        toggle(progressEl, progressEl.childNodes.length > 0);
        addMedia.urlsCancelled = [];
      } else {
        var share, x;
        if (addMedia.chosenMedia) {
          if ((x = previewEl.firstChild.nextSibling) && x.tt && x.tt.el) {
            x.tt.destroy();
          }
          addMedia.chosenMedia = false;
          addMedia.chosenMediaData = false;
          val(previewEl, '');
          hide(previewEl);
        }
        if (share = addMedia.shareData) {
          if (share.url) {
            addMedia.urlsCancelled.push(share.url);
          }
          if (share.initialPattern) {
            addMedia.urlsCancelled.push(share.initialPattern);
          }
          addMedia.shareData = {};
        }
        each([addMedia.sharePreview, addMedia.pollPreview], function () {re(this);});
        addMedia.sharePreview = addMedia.pollPreview = false;
      }

      cur.lastPostMsg = false;
      if (cur.module == 'profile' || cur.module == 'feed' || cur.module == 'wall') {
        setTimeout(function() {
          wall.postChanged(val('post_field'), true);
        }, 0);
      }

      if (addMedia.onChange) addMedia.onChange(false);
    },
    showMediaProgress: function(type, i, info) {
      if (addMedia.onProgress && addMedia.onProgress(type, i, info) === false) {
        return false;
      }
      var frac = info.loaded / info.total, percent = intval(frac * 100),
          fileName = info.fileName || info.name || '',
          // ind = i,
          ind = fileName ? i + '_' + fileName : i,
          label = fileName ? (fileName.length > 33 ? fileName.substr(0, 30) + '...' : fileName) : '';

      var prg = ge('upload' + ind + '_progress');
      if (!prg) {
        if (!cur.attachMediaIndexes) cur.attachMediaIndexes = {};
        cur.attachMediaIndexes[ind] = lnkId;

        var progress = '\
<div class="fl_l"><div class="page_attach_progress_wrap" style="margin-top: 3px; margin-bottom: 4px;">\
  <div id="upload' + ind + '_progress" class="page_attach_progress"></div>\
</div></div></div>' + (label ? '<div class="attach_label fl_l">' + label + '</div>' : '') + '<div class="progress_x fl_l" onmouseover="animate(this, {opacity: 1}, 200); showTooltip(this, {text: \'' + getLang('dont_attach') + '\', shift: [6, 3, 3]})" onmouseout="animate(this, {opacity: 0.6}, 200);" onclick="Upload.terminateUpload(' + i + ', \'' + (fileName || i) + '\');"></div>';

        if (multi) {
          progressEl.appendChild(ce('div', {id: 'upload' + ind + '_progress_wrap', innerHTML: progress, className: 'clear_fix'}, {marginTop: '6px'}));
          show(progressEl);
          toggle(lnk, addMedia.attachCount() < limit);
        } else {
          val(previewEl, progress);
          addMedia.chosenMedia = 'progress';
        }
        prg = ge('upload' + ind + '_progress');
        prg.full = false;//intval(getStyle(prg.parentNode, 'width'));

        if (percent) {
          setStyle(prg, {width: prg.full ? (intval(prg.full * frac) + 'px') : percent + '%'})
        } else {
          setStyle(prg, {width: '1px'});
          hide(prg);
        }
      } else {
        show(prg);
        if (prg.full) {
          var tw = data(prg, 'tween'), w = intval(prg.full * frac);
          if (tw && tw.isTweening) {
            tw.to.width = w;
          } else {
            animate(prg, {width: w + 'px'}, 500);
          }
        } else {
          setStyle(prg, {width: percent + '%'});
        }
      }
      // show(previewEl);
    },

    attachCount: function() {
      if (addMedia.attachedCount) {
        return addMedia.attachedCount();
      }
      if (!previewEl) {
        return 0;
      }
      if (!multi) {
        return previewEl.childNodes.length;
      }
      var num = picsEl.childNodes.length + docsEl.childNodes.length + progressEl.childNodes.length;
      if (addMedia.sharePreview) {
        num--;
      }
      if (addMedia.pollPreview) {
        num--;
      }
      return num;
    },

    // Inline Polls
    createPoll: function(data) {
      var h = (browser.msie6 || data.length > 2) ? '' : 'height: 1px';
      var incCl = data[3 + (10 - 1) * 2] ? 'disabled' : '', decCl = data[3 + 2 * 2] ? '' : 'disabled';
      addMedia.pollPreview = docsEl.appendChild(ce('div', {className: 'poll_preview', innerHTML: '\
<div class="content" style="' + h + '">\
  <div class="clear_fix">\
    <div class="label fl_l ta_r">' + data[0] + '</div>\
    <div class="labeled fl_l"><input type="text" onkeyup="cur.addMedia[' + lnkId + '].updatePoll()" class="text" id="create_poll_question' + lnkId + '" value="' + (data[2] || '') + '" /></div>\
  </div>\
  <div class="clear_fix">\
    <div class="label fl_l ta_r">' + data[1] + '\
      <nobr class="no_select" onselectstart="return false;" ondblclick="return false;">\
        <a id="create_poll_inc' + lnkId + '" onclick="cur.addMedia[' + lnkId + '].incPoll()" class="' + incCl + '">' + getLang('global_add') + '</a><span class="sdivide">|</span><a id="create_poll_dec' + lnkId + '" class="' + decCl + '" onclick="cur.addMedia[' + lnkId + '].decPoll()">' + getLang('global_delete') + '</a>\
      </nobr>\
    </div>\
    <div class="labeled fl_l" id="create_poll_answers' + lnkId + '"></div>\
  </div>\
</div>\
<div class="bottom_pointer"></div>\
      '}));
      var html = [], content = addMedia.pollPreview.firstChild;
      for (var i = 0; i < 10; ++i) {
        var optId = data[3 + i * 2], optVal = data[4 + i * 2];
        html.push('<input type="text" class="text" style="' + ((!optId && i > 1) ? 'display: none' : '') + '" ' + (optId ? ('id="poll_opt' + optId + '" value="' + optVal + '"') : '') + ' />');
      }
      ge('create_poll_answers' + lnkId).innerHTML = html.join('');
      if (browser.msie6 || data.length > 2) {
        elfocus('create_poll_question' + lnkId);
        setTimeout(addMedia.updatePoll, 0);
        return;
      }
      animate(content, {height: 87}, 200, function() {
        content.style.height = 'auto';
        elfocus('create_poll_question' + lnkId);
        addMedia.updatePoll();
      });
    },
    incPoll: function() {
      var answers = ge('create_poll_answers' + lnkId);
      for (var el = answers.firstChild; el; el = el.nextSibling) {
        if (!isVisible(el)) {
          break;
        }
      }
      if (el) {
        ge('create_poll_dec' + lnkId).className = '';
        show(el);
      }
      if (!el || !el.nextSibling) {
        ge('create_poll_inc' + lnkId).className = 'disabled';
      }
    },
    decPoll: function() {
      var answers = ge('create_poll_answers' + lnkId), first = answers.firstChild;
      for (var el = answers.lastChild; el; el = el.previousSibling) {
        if (isVisible(el)) {
          break;
        }
      }
      if (el) {
        if (el == first || el == first.nextSibling) {
          el = false;
        }
        if (el) {
          ge('create_poll_inc' + lnkId).className = '';
          hide(el);
        }
      }
      if (!el || !el.previousSibling || el.previousSibling == first.nextSibling) {
        ge('create_poll_dec' + lnkId).className = 'disabled';
      }
    },
    updatePoll: function() {
      var q = trim(val('create_poll_question' + lnkId));
      ge('create_poll_question_preview' + lnkId).innerHTML = q ? (': <span>' + q + '</span>') : '';
    },
    pollData: function() {
      var answers = ge('create_poll_answers' + lnkId), q = trim(ge('create_poll_question' + lnkId).value);
      var result = {media: q}, ind = 0, found = false;
      for (var el = answers.firstChild; el; el = el.nextSibling) {
        if (isVisible(el) && trim(val(el))) {
          var id = -intval((el.id.match(/^poll_opt(\d+)$/) || [0, -(ind++)])[1]); // -id or ind
          result['answers[' + id + ']'] = trim(val(el));
          found = true;
        }
      }
      if (!q) {
        notaBene('create_poll_question' + lnkId);
        return false;
      }
      if (!found) {
        notaBene(answers.firstChild);
        return false;
      }
      return result;
    },

    // Inline Share
    urlsCancelled: [],
    shareData: {},
    checkPostLink: function(wikiValue, noFocus) {
      //if (vk.id != cur.oid) return; // temp
      if (addMedia.chosenMedia) return;
      var foundShare = false;
      each(addMedia.chosenMedias || [], function () {
        if (this[0] == 'share') {
          foundShare = true;
          return false;
        }
      });
      if (foundShare) {
        return;
      }

      var rx = noFocus ? urlInactiveExp : urlActiveExp, matchesUrl;
      while (wikiValue && (matchesUrl = wikiValue.match(rx))) {
        wikiValue = wikiValue.substr(matchesUrl.index + matchesUrl[0].length);
        var url = matchesUrl[2], initialUrl = url;
        url = url.replace(/[,.;'!@#$%^&*()?:]+$/, '');
        if (!url.match(/^https?:\/\//)) url = 'http://' + url;
        if (inArray(url, addMedia.urlsCancelled) || inArray(initialUrl, addMedia.urlsCancelled)) {
          continue;
        }
        if (matchesUrl[4].match(/vkontakte\.ru|vk\.com|vkontakte\.com|vk\.cc/)) {
          var query = matchesUrl[5] || '', mediaMatches = null, mediaType = false,  dataObj = false, dup = false;
          if ((mediaMatches = query.match(/#photo\/(\-?\d+)_(\d+)/)) || (mediaMatches = query.match(/photo(\-?\d+)_(\d+)/)) || (mediaMatches = query.match(/photos\.php\?oid=\-?\d+&act=show&id=(\-?\d+)_(\d+)/))) {
            mediaType = 'photo';
          } else if (mediaMatches = query.match(/video(\-?\d+)_(\d+)/)) {
            mediaType = 'video';
          } else if (mediaMatches = query.match(/audio\.php\?id=(\-?\d+)&audio_id=(\d+)/)) {
            mediaType = 'audio';
          } else if (mediaMatches = query.match(/page(\-?\d+)_(\d+)?/)) {
            mediaType = 'page';
          } else if (queryString = query.match(/pages\?(.+)/)) {
            mediaType = 'page';
            var objLoc = nav.fromStr(queryString[1]);
            var params = nav.fromStr(url);
            dataObj = {oid: params['oid'] || params['o'], p: params['p']};
          } else if (queryString = query.match(/ru\/(.+)/)) {
            mediaType = 'page';
            var objLoc = nav.fromStr(queryString[1]);
            var params = nav.fromStr(url);
            var name = params[0].substr(params[0].lastIndexOf('/')+1)
            dataObj = {global: 1, p: name};
          }

          if (!mediaType) continue;
          if (!dataObj) {
            dataObj = {media: mediaMatches[1] + '_' + mediaMatches[2]};
          }
          each (addMedia.chosenMedias || [], function () {
            if (this[0] == mediaType && (this[1] == dataObj.media || !dataObj.media)) {
              dup = true;
              return false;
            }
          });
          if (dup || addMedia.mediaInfoLoading) return;
          addMedia.mediaInfoLoading = true;
          var params = {act: 'media_info', type: mediaType};
          ajax.post('share.php', extend(dataObj, params), {
            onDone: function(data) {
              if (data.media) {
                dataObj.media = data.media;
              }
              addMedia.chooseMedia(mediaType, dataObj.media, data);
              addMedia.shareData = {initialPattern: initialUrl};
              addMedia.mediaInfoLoading = false;
            },
            onFail: function () {
              addMedia.urlsCancelled.push(url);
              addMedia.mediaInfoLoading = false;
              return true;
            }
          });
          return;
        }
        addMedia.chooseMedia('share', '', [matchesUrl[4], url, initialUrl]);
        return;
      }
    },
    addPreview: function(withFrame) {
      return (addMedia.sharePreview = docsEl.appendChild(ce('div', {className: 'share_preview', innerHTML: '\
<div class="content"><div></div>' + (withFrame ? '<div class="progress"></div>' : '') + '</div>\
<div class="bottom_pointer"></div>' + (withFrame ? '\
<iframe class="upload_frame" name="share_parse_iframe' + lnkId + '"></iframe>' : '')})));
    },
    loadPreview: function(url) {
      if (!url) return;
      addMedia.addPreview(true);
      var parseForm = addMedia.sharePreview.appendChild(ce('form', {action: cur.options.share.url, method: 'post', target: 'share_parse_iframe' + lnkId}));
      each({
        act: 'parse_share',
        from_host: locHost,
        mid: vk.id,
        hash: cur.options.share.hash,
        rhash: cur.options.share.rhash,
        url: url
      }, function(i, v) {
        parseForm.appendChild(ce('input', {type: 'hidden', name: i, value: v}));
      });

      window.onParseDone = function(data) {
        var data = addMedia.shareData = extend(addMedia.shareData, data);
        if (!data.images || !data.images.length) {
          cur.shareShowImg = 0;
          addMedia.showPreview();
          return;
        } else {
          cur.shareShowImg = -1;
        }
        data.imagesStyles = {};
        for (var i in data.images) {
          var url = '';
          if (/^\//.test(data.images[i])) {
            url = (/^https:\/\//i.test(data.url) ? 'https://' : 'http://') + data.domain;
          } else if (!/^https?:\/\//i.test(data.images[i])) {
            url = data.url.replace(/[^\/]*$/, '');
            if (/^https?:\/\/$/i.test(url)) {
              url = data.url + '/';
            }
          }
          data.images[i] = url + data.images[i];
        }

        var fast = false;

        cur.shareShowNext = function () {
          var tmpImg = vkImage();
          cur.shareShowImg += 1;
          if (cur.shareShowImg > data.images.length - 1) {
            cur.shareShowImg = 0;
          } else if (cur.shareShowImg == 0) {
            for (var i = 1; i < data.images.length - 1; i++) {
              var t = vkImage();
              t.src = data.images[i];
            }
          }
          tmpImg.src = data.images[cur.shareShowImg];

          var imgLoadTimeout = setTimeout(function() {
            if (cur.shareImgInterval === true) return;
            data.images.splice(cur.shareShowImg, 1);
            cur.shareShowNext();
          }, 5000);

          var updatePreview = function() {
            if (tmpImg.width || tmpImg.height) {
              var w = tmpImg.width, h = tmpImg.height;
              var imgStyle = '';
              var imgParams = '';
              if (imgLoadTimeout) {
                clearTimeout(imgLoadTimeout);
              }
              clearInterval(cur.shareImgInterval);
              if (w < 20 || h < 20) {
                data.images.splice(cur.shareShowImg, 1);
                if (data.images.length) {
                  return setTimeout(cur.shareShowNext, 0);
                }
              } else {
                if (w > h && w > 150) {
                  h = 150 * h / w;
                  w = 150;
                } else if (h > 150) {
                  w = 150 * w / h;
                  h = 150;
                }
                imgStyle = 'width: ' + w + 'px; height: ' + h + 'px;';
              }
              if (data.images.length) {
                imgStyle += 'cursor: pointer';
                imgParams = ' onclick="cur.shareShowNext();"';
              }
              data.imagesStyles[cur.shareShowImg] = 'style="'+imgStyle+'"'+imgParams;
              addMedia.showPreview(fast);
              fast = true;
            }
          }
          clearInterval(cur.shareImgInterval);
          cur.shareImgInterval = setInterval(updatePreview, 300);
          setTimeout(updatePreview, 0);
        }
        cur.shareShowNext();
      }
      window.onParseFail = function () {
        data.failed = true;
        addMedia.showPreview();
      }

      parseForm.submit();
    },
    showPreview: function(fast) {
      var data = addMedia.shareData, prev = addMedia.sharePreview || addMedia.addPreview();
      if (data.failed) {
        var html = getLang('page_not_loaded');
      } else {
        var html = (data.images && data.images[cur.shareShowImg]  ? '<img src="' + data.images[cur.shareShowImg] + '" class="fl_l" ' + data.imagesStyles[cur.shareShowImg] + ' />' : '') + (data.title ? '<h4 class="header">' + data.title + '</h4>' : '') + (data.description ? '<div class="descr">' + data.description + '</div>' : '') + '<div class="clear"></div>';
      }
      if (fast) {
        prev.firstChild.innerHTML = html;
        prev.firstChild.style.height = 'auto';
        return;
      }
      var tmpDiv = ge(previewId).appendChild(ce('div', {innerHTML: '<div class="share_preview">' + html + '</div>'}, {position: 'absolute', width: getSize(prev)[0] - 10, visibility: 'hidden'}));
      var height = getSize(tmpDiv)[1];
      re(tmpDiv);

      animate(prev.firstChild, {height: height}, 200, function () {
        prev.firstChild.innerHTML = html;
      });
    },
    uploadShare: function(callback) {
      var data = addMedia.shareData, prev = addMedia.sharePreview;
      var uploadCont = prev.appendChild(ce('div', {innerHTML: '<iframe class="upload_frame" name="share_upload_iframe' + lnkId + '"></iframe>'})),
          uploadForm = uploadCont.appendChild(ce('form', {action: '/share.php', method: 'post', target: 'share_upload_iframe' + lnkId})),
          photoUrl = data.images[cur.shareShowImg];
      each({
        act: 'a_photo',
        url: data.url,
        index: lnkId,
        image: photoUrl,
        extra: data.extra || 0
      }, function (i, v) {
        uploadForm.appendChild(ce('input', {type: 'hidden', name: i, value: v}));
      });
      window.onUploadDone = function(index, params) {
        window.onUploadFail = window.onUploadDone = function () {};
        prev.removeChild(uploadCont);
        addMedia.shareData = extend(addMedia.shareData, {
          user_id: params.user_id,
          photo_id: params.photo_id,
          photo_url: photoUrl,
          images: []
        });
        callback();
      }
      window.onUploadFail = function(index, msg) {
        window.onUploadFail = window.onUploadDone = function () {};
        prev.removeChild(uploadCont);
        addMedia.shareData.images = [];
        callback();
      }
      uploadForm.submit();
    }
  }

  if (!cur.addMedia) {
    cur.addMedia = {};
  }

  cur.addMedia[lnkId] = addMedia;
  return addMedia;
}

try{stManager.done('page.js');}catch(e){}
