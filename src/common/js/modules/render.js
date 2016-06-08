export default function(ele, data) {
  var $ele;
  var dfd = $.Deferred();
  if (typeof ele === 'number') {
    $ele = $('script[type=x-tmpl-mustache]').eq(ele);
  } else if (typeof ele === 'string' || ele.tagName) {
    $ele = $(ele);
  } else if (ele.jquery) {
    $ele = ele;
  } else {
    if (typeof ele === 'object') {
      data = ele;
    }
    $ele = $('script[type=x-tmpl-mustache]');
  }
  var template = $ele.html();
  Mustache.parse(template);
  var rendered = Mustache.render(template, data);
  var $r = $(rendered);
  $ele.before($r);
  dfd.resolve($r);
  return dfd.promise();
}