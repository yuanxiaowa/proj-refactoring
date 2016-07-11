$(() => {
  var $rotation = $('#rotation');
  var $rotationItems = $rotation.find('.j-rotation-wrap').children();
  var cur = 0;

  $rotation
    .on('click', '.j-left', () => {
      cur = (cur + 1) % 3;
      rotate();
    })
    .on('click', '.j-right', () => {
      cur = (cur + 2) % 3;
      rotate();
    });

  function rotate() {
    $rotationItems.each((i, item) => {
      var $item = $(item);
      if (i === cur) {
        $item.css('left', 118).addClass('is-active');
      } else {
        $item.css('left', (i - cur + 4) % 3 * 226).removeClass('is-active');
      }
    });
  }
});

$('#timeline')
  .on('mouseenter', '.j-item', function() {
    $(this).addClass('is-active');
  })
  .on('mouseleave', '.j-item', function() {
    $(this).removeClass('is-active');
  });

$(() => {
  var $slider = $('#slider');
  var $con = $slider.find('.j-con');
  var $pitems = $slider.find('.j-pager').children();
  var cur = 0;
  var delay = 5000;
  var st;
  $pitems.on('click', function() {
    var index = $pitems.index(this);
    if (index === cur) {
      return;
    }
    slide(index, true);
  });
  $slider
    .on('mouseenter', stop)
    .on('mouseleave', start);

  function slide(index, c) {
    stop();
    if (!index) {
      index = (cur + 1) % 4;
    }
    $pitems.eq(index).addClass('is-active');
    $pitems.eq(cur).removeClass('is-active');
    $con.css('margin-left', `-${index * 100}%`);
    cur = index;
    if (!c) {
      st = setTimeout(slide, delay);
    }
  }

  function start() {
    st = setTimeout(slide, delay);
  }

  function stop() {
    if (st) {
      clearTimeout(st);
    }
  }
  start();
});
