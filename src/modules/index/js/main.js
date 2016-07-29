var Tab, TabData, Menu;

var path = (location => {
  var protocols = /^((\w+:)?\/\/)/;
  var protocol = location.protocol;
  var href = location.href;
  var pathname = location.pathname;
  var arr;
  var host = location.host;

  if ('/' === pathname) {
    arr = pathname.split('/');
  } else {
    arr = [];
  }

  return {
    getAbsPath(path) {
      return protocol + '//' + host + path;
    },
    resolve(url) {
      if (protocols.test(url)) {
        if (!RegExp.$2) {
          url = protocol + url;
        }
      } else if (!url) {
        url = href;
      } else if (/^\//.test(url)) {
        url = this.getAbsPath(url);
      } else {
        let arr1 = url.split('/');
        let i = 0;
        let j = arr.length;
        let len = arr1.length;
        for (; i < len; i++) {
          if ('.' === arr1[i]) {
            j--;
          } else if ('..' === arr1[i]) {
            j -= 2;
          } else {
            break;
          }
        }
        url = this.getAbsPath(arr.slice(0, j).join('/') + '/' + arr1.slice(i).join('/'));
      }
      return url;
    },
    iseq(a, b) {
      return this.resolve(a) === this.resolve(b);
    }
  };
})(location);

Menu = (() => {
  var $menuAside = $('#menu-aside');
  $menuAside
  // 切换菜单显示
    .on('click', '.j-toggle', () => {
      $menuAside.toggleClass('is-toggled');
      $('#menu-top').toggleClass('is-toggled');
    })
    // 展开收缩菜单
    .on('click', '.j-item', function() {
      $(this).parent().toggleClass('is-active');
    });

  $menuAside.add('.j-menu-top')
    // 点击链接在窗口中打开
    .on('click', 'a', function() {
      var $this = $(this);
      var url = $this.attr('href');
      if (url) {
        Tab.open(url, $this.text());
      }
      return false;
    });
  return {
    // 切换选中菜单
    select(url) {
      $menuAside.find('a.c-menu-main__subitem').each(function() {
        var $this = $(this);
        if ($this.hasClass('is-active')) {
          $this.removeClass('is-active');
        } else if ($this.attr('href') === url) {
          $this.addClass('is-active');
        }
      });
    }
  };
})();

TabData = (path => {
  var data = {};
  var cur;
  var arr = [];
  return {
    has(key) {
      return path.resolve(key) in data;
    },
    remove(key) {
      delete data[path.resolve(key)];
    },
    add(key, _data) {
      data[path.resolve(key)] = _data;
    },
    get(key) {
      return data[path.resolve(key)];
    },
    setCur(key) {
      cur = path.resolve(key);
    },
    getCur() {
      return data[cur];
    },
    isCur(key) {
      return path.resolve(key) === cur;
    },
    active(key, cb) {
      cb(data[path.resolve(key)], data[cur]);
      arr.push(cur);
      cur = path.resolve(key);
    },
    pop() {
      var key;
      /*eslint curly:0*/
      while (!((key = arr.pop()) in data));
      return key;
    }
  };
})(path);

Tab = (Data => {
  var $tabMain = $('#tab-main');
  var $tabCont = $tabMain.next();
  var $tabWrap = $tabMain.find('.j-tab');
  var $home = $tabWrap.children().first();
  var $swrap = $tabMain.find('.j-swrap');
  var w = $tabMain.width();
  var $shome;
  var dataKey = '__url';
  var prevl = 0;

  // 初始化
  $tabWrap.children().each(function(i) {
    var $tab = $(this);
    var $cont = $tabCont.children().eq(i);
    var $sitem = getSubTabItem($tab.text());
    var key = $cont.attr('src');
    Data.add(key, {
      $tab,
      $cont,
      $sitem
    });
    $tab.data(dataKey, key);
    if (!i) {
      tabSwitch(key);
      $shome = $sitem;
      $shome.appendTo($swrap);
    }
  });

  function getTabItem(text) {
    return $(`<div class="c-tab-main__item j-item" title="${text}"><span class="j-close"></span>${text}</div>`);
  }

  function getSubTabItem(text) {
    return $(`<div class="c-tab-main__dropdown__menu__item j-sitem">${text}</div>`);
  }

  function getContItem(url) {
    var $iframe = $(`<iframe src="${url}">`);
    $iframe.on('load', function() {
      var title = this.contentWindow.document.title;
      changeTitle($(this).index(), title);
    });
    return $iframe;
  }

  function changeTitle(i, title) {
    var $items = $tabMain.children();
    $items.eq($items - i - 1).attr('title', title).text(title);
  }

  function close(key) {
    var data = Data.get(key);
    var isCur = Data.isCur(key);
    Data.remove(key);
    data.$tab.animate({
      top: 30
    }, 250, () => {
      data.$tab.add(data.$cont).add(data.$sitem).remove();
    });
    if (isCur) {
      let nkey = Data.pop();
      tabSwitch(nkey);
    }
  }

  function tabSwitchCb(data, old) {
    if (old) {
      old.$tab.add(old.$sitem).removeClass('is-active');
      old.$cont.hide();
    }
    data.$tab.add(data.$sitem).addClass('is-active');
    data.$cont.show();
    setPos(data.$tab);
  }

  function setPos($tab) {
    var $last = $tab.nextAll().last();
    var left = $tab[0].offsetLeft;
    var r = left - prevl;
    if (!$last.length) {
      $last = $tab;
    }
    let tl = $last[0].offsetLeft + $last.outerWidth();
    if (0 <= r) {
      if (r + $tab.outerWidth() > w) {
        if (tl - left >= w / 2) {
          prevl = left - w / 2;
        } else {
          prevl = tl - w;
        }
      }
    } else {
      if (!$tab.prev().length) {
        prevl = 0;
      } else {
        prevl = $tab[0].offsetLeft - 30;
      }
    }
    $tabWrap.css({
      left: -prevl
    });
  }

  function tabSwitch(key) {
    if (Data.isCur(key)) {
      return;
    }
    Menu.select(key);
    Data.active(key, tabSwitchCb);
  }
  $tabMain
    .on('click', '.j-item', function() {
      var $this = $(this);
      var key = $this.data(dataKey);
      tabSwitch(key);
    })
    .on('click', '.j-close', function() {
      close($(this).parent().data(dataKey));
      return false;
    })
    .on('click', '.j-tab-toggle', () => {
      $swrap.toggle();
      return false;
    })
    .on('click', '.j-sitem', function() {
      $tabWrap.children().eq($(this).index()).click();
    });
  $(document).on('click', () => {
    $swrap.hide();
  });
  return {
    close,
    active(url) {
      tabSwitch(url);
    },
    open(url, text) {
      if (Data.has(url)) {
        this.active(url);
        return;
      }
      let $tab = getTabItem(text);
      let $cont = getContItem(url);
      let $sitem = getSubTabItem(text);
      $tabCont.append($cont);
      $tab.data(dataKey, url);
      $home.after($tab);
      $shome.after($sitem);
      Data.add(url, {
        $tab,
        $cont,
        $sitem
      });
      tabSwitch(url);
    }
  };
})(TabData);

window.openLink = Tab.open;

// $('.c-menu-main__wrap').find('a').filter(':lt(20)').click()