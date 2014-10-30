var GoogleSpreadsheetPrinter = function (config, helper) {
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
  doc.template = function() {
    return doc.helper(doc.getConfig('template')).html();
  };
  doc.target = function() {
    return doc.helper(doc.getConfig('target'));
  };
  doc.renderHtml = function(data) {
    return Mustache.render(doc.template(), data);
  };
  doc.displayHtml = function(entries) {
    var data = {
      'rows' : doc.parseEntries(entries)
    };
    var html = doc.renderHtml(data);
    doc.target().html(html);
  };
  doc.fetchData = function(callback) {
    this.helper.getJSON( this.jsonURL, function( json ) {
        callback(json.feed.entry);
    });
  };
  doc.print = function() {
    this.fetchData(this.displayHtml);
    return doc;
  };
  return doc;
};
