(function($) {

  var defaults = {
      inputSelectors: 'input[name]:not([type=radio],[type=checkbox],[type=reset],[type=button]),input[type=checkbox]:checked,input[type=radio]:checked,textarea,select',
      keyAttr: 'name',
      wrapped: false,
      allowEmptyMultiVal: false,
      allowEmptySingleVal: true,
      keyTransform: null
    },
    settings = {},
    reg = /^(\w+)\[(\d+)?\]\s*$/;
  // borrow isEmpty from underscore to prevent a hard dependency
  // http://documentcloud.github.com/underscore
  empty = function(obj) {
    //if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    if (obj && obj.length) return obj.length === 0;
    for (var key in obj)
      if (hasOwnProperty.call(obj, key)) return false;
    return true;
  };

  $.fn.form2json = function(options) {
    var form = $(this);

    if (!form.is('form')) {
      return;
    }

    settings = $.extend(true, {}, defaults, options);

    var data = {},
      fields = form.find(settings.inputSelectors);
    fields.each(function() {
      var self = this;
      var $item = $(this);
      var name = this.name;
      var val = this.value;
      if (!name) {
        return;
      }
      if (!settings.allowEmptySingleVal && empty(val)) {
        return;
      }
      var keyHierarchy = name.split('.'),
        dKeys = $.map(keyHierarchy, function(k) {
          return $.isFunction(settings.keyTransform) ? settings.keyTransform(k, self) : k;
        }),
        obj = data,
        prop;
      while (prop = dKeys.shift()) {
        if (reg.test(prop)) {
          var k = RegExp.$1;
          var d = RegExp.$2;
          var p = obj[k];
          if (!p) {
            p = obj[k] = [];
          } else if (!$.isArray(p)) {
            p = obj[k] = [obj[k]];
          }
          if (dKeys.length) {
            obj = p[d];
            if (undefined === obj) {
              obj = p[d] = {};
            }
          } else {
            obj = p;
            prop = k;
            break;
          }
        } else {
          if (dKeys.length) {
            if (undefined === obj[prop]) {
              obj[prop] = {};
            } else if ('string' === typeof obj[prop]) {
              obj[prop] = [obj[prop]];
            }
            obj = obj[prop];
          } else {
            break;
          }
        }
      }
      if ($.isArray(obj)) {
        obj.push(val);
      } else {
        if (undefined !== obj[prop]) {
          if ($.isArray(obj[prop])) {
            obj[prop].push(val);
          } else {
            obj[prop] = [obj[prop]];
            obj[prop].push(val);
          }

        } else {
          obj[prop] = val;
        }
      }
    });

    if (!settings.wrapped) {
      return data;
    }

    var ajax = {
        data: data
      },
      method = form.attr('method'),
      action = form.attr('action');

    (method && method.toUpperCase() != 'GET') && (ajax.type = method);
    (action) && (ajax.url = action);

    return ajax;
  };

})(jQuery);