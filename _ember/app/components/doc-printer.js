import Ember from 'ember';
// import request from 'ic-ajax';
// request('https://spreadsheets.google.com/feeds/list/0AqHUOZcVEj_XdE5SMzBKSWhINjVtTlh2b0JjUFp4OEE/od6/public/values?alt=json').then((data) => {
//   // do nothing with the data, for now
//   // debugger;
//   console.log(data, "Using the data so jshint is happy.");
// });

export default Ember.Component.extend({
  tagName: '',
  config: {},
  rows: null,
   // hook into component initialization
  init() {
    this._super(...arguments);
    var component = this;
    this.getRows( function(rows) {
      component.set('rows', rows);
    });
  },
  // private
  getRows(callback) {
    var doc = this.newGoogleSpreadsheetPrinter(this.config, Ember.$);
    doc.fetchData( function(json) {
      var entries = json.feed.entry;
      callback( doc.parseEntries(entries) );
    });
  },
  newGoogleSpreadsheetPrinter(config, helper) {
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
    doc.fallbackURL = (function() {
      return config.fallbackURL;
    })();
    doc.jsonURL = (function() {
      return "https://spreadsheets.google.com/feeds/list/" +
      doc.getKey() +
      "/public/values?alt=json";
    })();
    doc.parseEntry = function(entry, fields) {
      var row = {};
      if (!entry) {
        return row;
      }
      this.helper.each(fields, function(index, field) {
        var field_name = "gsx$" + field;
        var cell = entry[field_name].$t;
        row[field] = cell;
      });
      return row;
    };
    doc.parseEntries = function(entries) {
        var rows = [];
        this.helper.each(entries, function(index, entry) {
          rows.push(doc.parseEntry(entry, doc.getConfig('fields')));
        });
        return rows;
    };
    doc.fetcher = doc.helper.getJSON;
    doc.fetchData = function(callback) {
      var url = this.jsonURL;
      var fallbackURL = this.fallbackURL;
      var success = function(json) {
        callback(json.feed.entry);
      };
      doc.fetcher( url )
        .done( success )
      .fail(
          doc.fetcher(fallbackURL, success)
          );
    };
    doc.parseEntries = function(entries) {
        var rows = [];
        this.helper.each(entries, function(index, entry) {
          rows.push(doc.parseEntry(entry, doc.getConfig('fields')));
        });
        return rows;
    };
    doc.isValid = function() {
      return (!!this.getKey());
    };
    if (!doc.isValid()) {
      doc.jsonURL = doc.fallbackURL;
      doc.fallbackURL = null;
    }
    if (!doc.isValid()) {
      // no valid urls, disable fetchData
      doc.fetchData = function() { };
    }
    return doc;
  }
});
