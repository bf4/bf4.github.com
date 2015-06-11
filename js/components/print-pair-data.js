App.PrintPairDataComponent = Ember.Component.extend({
  // 4. Make sure you specify the layoutName to match the data-template-name of your handlebars template
  layoutName: "components/print-pair-data",
  tagName: '',
  rows: null,
   // hook into component initialization
  init: function init() {
    var component = this;
    component._super.apply(component, arguments);
    // Get the existing input value
    var doc = GoogleSpreadsheetPrinter({
      'key' : "0AqHUOZcVEj_XdE5SMzBKSWhINjVtTlh2b0JjUFp4OEE/od6",
      'fields' : [
        'appointments',
        'link',
        'pair',
        'description'
      ]
    }, jQuery);
    doc.fetchData( function( entries ) {
      var rows = doc.parseEntries(entries);
      component.set('rows', rows);
    });
    // fallback to local pair data if ajax failed
    if (! component.rows ) {
      $.getJSON('/assets/pair.json', function( json ) {
        entries = json.feed.entry;
        rows = doc.parseEntries(entries);
        component.set('rows', rows);
      });
    }
  }

});
