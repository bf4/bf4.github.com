// load social sharing scripts if the page includes a Twitter "share" button
var _jsLoader = _jsLoader || {};

// callback pattern
_jsLoader.initTwitter = (function() {
    if (typeof (twttr) != 'undefined') {
      twttr.widgets.load();
    } else {
      _jsLoader.getScript('http://platform.twitter.com/widgets.js', function() {
        setTimeout(function() {
          _jsLoader.initTwitter();
        }, _jsLoader.timeout);
      });
    }
});

_jsLoader.initFacebook = (function() {
    if (typeof (FB) != 'undefined') {
      FB.init({ status: true, cookie: true, xfbml: true });
    } else {
      _jsLoader.getScript("http://connect.facebook.net/en_US/all.js#xfbml=1", function () {
        setTimeout(function() {
          _jsLoader.initFacebook();
        }, _jsLoader.timeout);
      });
    }
});

_jsLoader.initGooglePlusOne = (function() {
    if (typeof (gapi) != 'undefined') {
      $(".g-plusone").each(function () {
        gapi.plusone.render($(this).get(0));
      });
    } else {
      _jsLoader.getScript('https://apis.google.com/js/plusone.js', function() {
        setTimeout(function() {
          _jsLoader.initGooglePlusOne();
        }, _jsLoader.timeout);
      });
    }
});

_jsLoader.loadSocial = (function() {
  _jsLoader.initTwitter();
  _jsLoader.initFacebook();
  _jsLoader.initGooglePlusOne();
});
