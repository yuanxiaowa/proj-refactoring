

var $menuAside = $('#menu-aside');
var Tab, TabData;


$menuAside
  .on('click', '.j-toggle', () => {
    $menuAside.toggleClass('is-toggled');
    $('#menu-top').toggleClass('is-toggled');
  })
  .on('click', '.main-menu-item-t', function() {
    $(this).next('.main-menu-item-c').slideToggle();
  });

$menuAside.add('.j-menu-top')
  .on('click', 'a', function() {
    var $this = $(this);
    var url = $this.attr('href');
    if (url) {
      Tab.open(url, $this.text());
    }
    return false;
  });

TabData = (function() {
  var data = {};
  var cur;
  var arr = [];
  return {
    has(key) {
      return key in data;
    },
    remove(key) {
      delete data[key];
    },
    add(key, _data) {
      data[key] = _data;
    },
    get(key) {
      return data[key];
    },
    setCur(key) {
      cur = key;
    },
    getCur() {
      return data[cur];
    },
    isCur(key) {
      return key === cur;
    },
    active(key, cb) {
      cb(data[key], data[cur]);
      arr.push(cur);
      cur = key;
    },
    pop() {
      var key;
      /*eslint curly:0*/
      while (!((key = arr.pop()) in data));
      return key;
    }
  };
})();

Tab = (function(Data) {
  var $tabMain = $('.tab-main');
  var $tabCont = $tabMain.next();
  var dataKey = '__url';

  $tabMain.children().each(function(i) {
    var $tab = $(this);
    var $cont = $tabCont.children().eq(i);
    var key = $cont.attr('src');
    Data.add(key, {
      $tab,
      $cont
    });
    $tab.data(dataKey, key);
    if (!i) {
      tabSwitch(key);
    }
  });
  function getTabItem(text) {
    return $(`<li class="tab-main-item"><span class="j-close"></span>${text}</li>`);
  }
  function getContItem(url) {
    var $iframe = $(`<iframe src="${url}">`);
    $iframe.on('load', function() {
      var $this = $(this);
      $tabMain.children().eq($this.index()).attr('title', this.contentWindow.document.title);
    });
    return $iframe;
  }
  function close(key) {
    var data = Data.get(key);
    data.$tab.add(data.$cont).remove();
    Data.remove(key);
    tabSwitch(Data.pop());
  }

  function tabSwitchCb(data, old) {
    if (old) {
      old.$tab.removeClass('active');
      old.$cont.hide();
    }
    data.$tab.addClass('active');
    data.$cont.show();
  }

  function tabSwitch(key) {
    if (Data.isCur(key)) {
      return;
    }
    Data.active(key, tabSwitchCb);
  }
  $tabMain
    .on('click', 'li', function() {
      var $this = $(this);
      var key = $this.data(dataKey);
      tabSwitch(key);
    })
    .on('click', '.j-close', function() {
      close($(this).parent().data(dataKey));
      return false;
    });
  return {
    close,
    active(url) {
      tabSwitch(url);
    },
    open(url, text) {
      var $tab, $cont;
      if (Data.has(url)) {
        this.active(url);
        return;
      }
      $tab = getTabItem(text);
      $cont = getContItem(url);
      $tabCont.append($cont);
      $tab.data(dataKey, url);
      $tabMain.append($tab);
      Data.add(url, {
        $tab,
        $cont
      });
      tabSwitch(url);
    }
  };
}(TabData));