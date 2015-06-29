import Ember from 'ember';
// import request from 'ic-ajax';

export default Ember.Component.extend({
  tagName: '',
  config: {},
  rows: null,
   // hook into component initialization
  init() {
    this._super(...arguments);
    // request('https://spreadsheets.google.com/feeds/list/0AqHUOZcVEj_XdE5SMzBKSWhINjVtTlh2b0JjUFp4OEE/od6/public/values?alt=json').then((data) => {
    //   // do nothing with the data, for now
    //   // debugger;
    //   console.log(data, "Using the data so jshint is happy.");
    // });
    var component = this;
    this.getRows( function(rows) {
      component.set('rows', rows);
    });
  },
  // private
  getRows(callback) {
    var doc = this.GoogleSpreadsheetPrinter(this.config, Ember.$);
    var success = function( entries ) {
      var rows = doc.parseEntries(entries);
      callback(rows);
    };
    var failure = function () {
      // fallback to local pair data if ajax failed
      Ember.$.getJSON('/assets/pair.json', function( json ) {
        var entries = json.feed.entry;
        callback( doc.parseEntries(entries) );
      });
    };
    doc.fetchData(  success, failure );
  },
  GoogleSpreadsheetPrinter(config, helper) {
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
    // TODO: ensure key is set, else fail
    doc.getKey = (function() { return config.key; });
    doc.jsonURL = (function() {
      return "https://spreadsheets.google.com/feeds/list/" +
      doc.getKey() +
      "/public/values?alt=json";
    })();
    // TODO: handle undefined entry
    doc.parseEntry = function(entry, fields) {
        var row = {};
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
