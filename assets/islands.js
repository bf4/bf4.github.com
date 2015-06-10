define("ember-islands", ["ember-islands/index", "ember", "exports"], function(__index__, __Ember__, __exports__) {
  "use strict";
  __Ember__["default"].keys(__index__).forEach(function(key){
    __exports__[key] = __index__[key];
  });
});

define('ember-islands/deactivate-routing', ['exports', 'ember'], function (exports, Ember) {

  'use strict';



  exports['default'] = deactivateRouting;
  var noop = Ember['default'].K;
  function deactivateRouting(application) {
    if (application.startRouting) {
      application.startRouting = noop;
    } else if (application.__deprecatedInstance__ && application.__deprecatedInstance__.startRouting) {
      application.__deprecatedInstance__.startRouting = noop;
    } else {
      Ember['default'].assert("ember-islands doesn't know how to cancel routing for this" + "version of Ember. Please report this issue to https://github.com/mitchlloyd/ember-islands" + "with the version of Ember you are using (Ember.VERSION)");
    }
  }

});
define('ember-islands/render-components', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports.getRenderComponentFor = getRenderComponentFor;

  exports['default'] = renderComponents;
  var assert = Ember['default'].assert;
  var $ = Ember['default'].$;

  // Do a little dance with Ember to create a function that can render
  // components for the given application.

  function getRenderComponentFor(application) {
    var container = application.__container__;
    var componentLookup = container.lookup('component-lookup:main');

    return function renderComponent(name, attributes, element) {
      var component = componentLookup.lookupFactory(name, container);
      assert('ember-islands could not find a component named "' + name + '" in your Ember appliction.', component);

      // Temporary fix for bug in `replaceIn`
      $(element).empty();
      component.create(attributes).appendTo(element);
    };
  }

  function componentAttributes(element) {
    var attrs;
    var attrsJSON = element.getAttribute('data-attrs');

    if (attrsJSON) {
      attrs = JSON.parse(attrsJSON);
    } else {
      attrs = {};
    }

    attrs.innerContent = element.innerHTML;
    return attrs;
  }
  function renderComponents(application) {
    var renderComponent = getRenderComponentFor(application);

    $('[data-component]').each(function () {
      var name = this.getAttribute('data-component');
      var attrs = componentAttributes(this);
      renderComponent(name, attrs, this);
    });
  }

});
