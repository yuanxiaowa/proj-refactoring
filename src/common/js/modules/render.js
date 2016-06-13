import Mustache from 'mustache';

export default function(ele, _data) {
  var $ele;
  var dfd = $.Deferred();
  var data = _data;
  if ('number' === typeof ele) {
    $ele = $('script[type=x-tmpl-mustache]').eq(ele);
  } else if ('string' === typeof ele || ele.tagName) {
    $ele = $(ele);
  } else if (ele.jquery) {
    $ele = ele;
  } else {
    if ('object' === typeof ele) {
      data = ele;
    }
    $ele = $('script[type=x-tmpl-mustache]');
  }
  let $rel = $ele.data('_rel_template');
  let template = $ele.html();
  Mustache.parse(template);
  let rendered = Mustache.render(template, data);
  if (!$rel) {
    $rel = $(rendered);
    $ele.data('_rel_template', $rel);
    $ele.before($rel);
  } else {
    $rel.replaceWith(rendered);
  }
  dfd.resolve($rel);
  return dfd.promise();
}