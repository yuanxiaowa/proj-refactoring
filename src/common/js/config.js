define('jquery', function() {
  return window.jQuery;
});
$.ajaxSettings.accept = 'application/json';
$.ajaxSettings.contentType = 'application/json';
requirejs.config({
  paths: $$references
});