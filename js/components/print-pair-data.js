App.PrintPairDataComponent = Ember.Component.extend({
  // 4. Make sure you specify the layoutName to match the data-template-name of your handlebars template
  layoutName: "components/print-pair-data",
  tagName: '',
  config: {},
  rows: null,
   // hook into component initialization
  init: function init() {
    this._super.apply(this, arguments);
    var component = this;
    this.getRows( function(rows) {
      component.set('rows', rows);
    });
  },
  // private
  getRows: function (callback) {
    var doc = this.GoogleSpreadsheetPrinter(this.config, $);
    var success = function( entries ) {
      rows = doc.parseEntries(entries);
      callback(rows);
    };
    var failure = function () {
      // fallback to local pair data if ajax failed
      $.getJSON('/assets/pair.json', function( json ) {
        entries = json.feed.entry;
        callback( doc.parseEntries(entries) );
      });
    };
    doc.fetchData(  success, failure );
  },
  GoogleSpreadsheetPrinter: function (config, helper) {
    "use strict";
    var doc = {};
    doc.helper = helper;
    doc.getConfig = (function(key) {
      if (key) {
        return config[key];
      }  else {
        return config;
      }
    });
    doc.getKey = (function() { return config.key; });
    doc.jsonURL = (function(key) {
      return "https://spreadsheets.google.com/feeds/list/" +
      doc.getKey() +
      "/public/values?alt=json";
    })();
    doc.parseEntry = function(entry, fields) {
        var row = {};
        this.helper.each(fields, function(index, field) {
          var field_name = "gsx$" + field;
          var cell = entry[field_name].$t;
          row[field] = cell;
        });
        return row;
    };
    doc.parseEntries = function(entries, fields) {
        var rows = [];
        this.helper.each(entries, function(index, entry) {
          rows.push(doc.parseEntry(entry, doc.getConfig('fields')));
        });
        return rows;
    };
    doc.fetchData = function(success, failure) {
      this.helper.getJSON( this.jsonURL )
        .done( function( json ) {
          success(json.feed.entry);
        })
        .fail( failure );
    };
    return doc;
  }

});
