var Wiki = {
  inBox: function(params, event) {
    if (checkEvent(event)) return;
    if (cur.wkBox) cur.wkBox.hide();
    cur.wkBox = showBox('al_pages.php', extend({act: 'in_box'}, params), {params: {
      width: 634,
      bodyStyle: 'max-height: 400px; padding: 10px 16px; padding-left: 10px; overflow-y: scroll; overflow-x: hidden;'
    }});
    return false;
  },
  switchHider: function(el) {
    var box = el.parentNode.parentNode;
    if (hasClass(box, 'wk_hider_box')) {
      box.className = box.className.replace('wk_hider_box', 'wk_hider_box_opened');
    } else {
      box.className = box.className.replace('wk_hider_box_opened', 'wk_hider_box');
    }
  }
}

try{stManager.done('wk.js');}catch(e){}
