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

// <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
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

// <script src="http://builds.handlebarsjs.com.s3.amazonaws.com/handlebars-v2.0.0.js"></script>
_jsLoader.initHandlebars = (function(callback) {
  _jsLoader.initJQuery(function() {
    if (typeof (Handlebars) === 'undefined') {
      _jsLoader.getScript('/js/handlebars-v2.0.0.js', function() {
        setTimeout(function() {
          _jsLoader.initHandlebars(callback)
        }, _jsLoader.timeout);
      });
    }
    else {
      callback();
    }
  });
});

// <script src="http://builds.emberjs.com/canary/ember-template-compiler.js"></script>
// <script src="http://builds.emberjs.com/canary/ember.debug.js"></script>
_jsLoader.initEmber = (function(callback) {
  _jsLoader.initHandlebars( function() {
    if (typeof (Ember) === 'undefined') {
      _jsLoader.getScript('/js/ember-template-compiler.js', function() {
        setTimeout(function() {
          _jsLoader.initEmber(callback);
        }, _jsLoader.timeout);
      });
    }
    else {
      if (typeof (Ember.Application) === 'undefined') {
        _jsLoader.getScript('/js/ember.debug.js', function() {
          setTimeout(function() {
            _jsLoader.initEmber(callback);
          }, _jsLoader.timeout);
        });
      } else {
        if (typeof(callback) === "function") { callback(); }
      }
    }
  });
});

_jsLoader.initApp = (function(callback) {
    _jsLoader.initEmber(callback);
});
