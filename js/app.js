App = Ember.Application.create();

// 5. Use jQuery to replace your html div with your Ember component.
$(document).ready(function(){
  // Find the data-component container divs
  // This is basically what Ember-Islands by @too_mitch does
  // https://github.com/mitchlloyd/ember-islands/blob/3197b544c3c8fd4b632022a406fe565ca687810a/addon/render-components.js
  $("[data-component]").each(function(){
    // Get the data-component name e.g. 'fs-gif-url-input'
    var element = this;
    var name = element.getAttribute('data-component');
    var attributes;
    var attrsJSON = element.getAttribute('data-attrs');

    if (attrsJSON) {
      attributes = JSON.parse(attrsJSON);
    } else {
      attributes = {};
    }
    attributes.innerContent = element.innerHTML;

    // Build the component & stuff in any pre-existing value
    // Gut out the container div & replace with the component

   var container = App.__container__;
   var componentLookup = container.lookup('component-lookup:main');
   var component = componentLookup.lookupFactory(name,  container);

   // Temporary fix for bug in `replaceIn`
   $(element).empty();
   component.create(attributes).appendTo(element);

  });
  // Additional thanks to @runspired for the inspiration to start
  // down the component-only path
  // and to @locks @jordan-hawker @rwjblue
  // and many others in the embercommunity slack
});

