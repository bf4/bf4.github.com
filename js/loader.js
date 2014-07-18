var _jsLoader = _jsLoader || {};
_jsLoader.loaded_scripts = [];
_jsLoader.getScript =  (function(src, callback) {
    // do nothing if already requested
    if (Array.prototype.indexOf === "undefined" || _jsLoader.loaded_scripts.indexOf(src) === -1 ) {
      var script = document.createElement('script'); script.type = 'text/javascript'; script.async = true;
      script.src = src;
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(script, s);
      _jsLoader.loaded_scripts.push(src);
    }
    if (typeof(callback) === "function") { callback(); }
});

_jsLoader.timeout = 100;

_jsLoader.initJQuery = (function(callback) {
    if (typeof(jQuery) === "undefined") {
          _jsLoader.getScript('/js/jquery.min.js', function() {
            if (typeof(callback) === "function") {
                setTimeout(callback, _jsLoader.timeout);
            }
        });
      }
    else {
         if (typeof(callback) === "function") { callback(); }
    }
});

_jsLoader.initJQuery(function() {
  _jsLoader.getScript('/js/application.js');
});

_jsLoader.initMustache = (function(render) {
    _jsLoader.initJQuery(function() {
        if (typeof (Mustache) === 'undefined') {
            _jsLoader.getScript('/js/mustache.js', function() {
                setTimeout(function() {
                    _jsLoader.initMustache(render)
                }, _jsLoader.timeout);
            });
        }
        else {
            render();
        }
    });
});
