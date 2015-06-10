/* jshint ignore:start */

/* jshint ignore:end */

define('viewtastic/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'viewtastic/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('viewtastic/components/doc-printer', ['exports', 'ember', 'ic-ajax'], function (exports, Ember, request) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    init: function init() {
      this._super.apply(this, arguments);
      request['default']('https://spreadsheets.google.com/feeds/list/0AqHUOZcVEj_XdE5SMzBKSWhINjVtTlh2b0JjUFp4OEE/od6/public/values?alt=json').then(function (data) {
        // do nothing with the data, for now
        // debugger;
        console.log(data, 'Using the data so jshint is happy.');
      });
    }
  });

});
define('viewtastic/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('viewtastic/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('viewtastic/initializers/app-version', ['exports', 'viewtastic/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;
  var registered = false;

  exports['default'] = {
    name: 'App Version',
    initialize: function initialize(container, application) {
      if (!registered) {
        var appName = classify(application.toString());
        Ember['default'].libraries.register(appName, config['default'].APP.version);
        registered = true;
      }
    }
  };

});
define('viewtastic/initializers/boot-ember-islands', ['exports', 'ember', 'ember-islands/deactivate-routing', 'ember-islands/render-components'], function (exports, Ember, deactivateRouting, renderComponents) {

  'use strict';

  exports.initialize = initialize;

  var get = Ember['default'].get;
  function initialize(registry, application) {
    if (get(application, 'EMBER_ISLANDS.bypass')) {
      return;
    }

    deactivateRouting['default'](application);
    renderComponents['default'](application);
  }

  ;

  exports['default'] = {
    name: 'boot-ember-islands',
    after: 'registerComponentLookup',
    initialize: initialize
  };

});
define('viewtastic/initializers/export-application-global', ['exports', 'ember', 'viewtastic/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var classifiedName = Ember['default'].String.classify(config['default'].modulePrefix);

    if (config['default'].exportApplicationGlobal && !window[classifiedName]) {
      window[classifiedName] = application;
    }
  }

  ;

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('viewtastic/templates/components/doc-printer', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("Hello!\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        return fragment;
      }
    };
  }()));

});
/* jshint ignore:start */

define('viewtastic/config/environment', ['ember'], function(Ember) {
  return { 'default': {"modulePrefix":"viewtastic","environment":"development","baseURL":"/","locationType":"auto","EmberENV":{"FEATURES":{}},"APP":{"name":"viewtastic","version":"0.0.0.9df64865"},"contentSecurityPolicyHeader":"Content-Security-Policy-Report-Only","contentSecurityPolicy":{"default-src":"'none'","script-src":"'self' 'unsafe-eval'","font-src":"'self'","connect-src":"'self'","img-src":"'self'","style-src":"'self'","media-src":"'self'"},"exportApplicationGlobal":true}};
});

var runningTests = false;
if (runningTests) {
  require("viewtastic/tests/test-helper");
} else {
  require("viewtastic/app")["default"].create({"name":"viewtastic","version":"0.0.0.9df64865"});
}

/* jshint ignore:end */
//# sourceMappingURL=viewtastic.map
