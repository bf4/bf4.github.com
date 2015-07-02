import Ember from 'ember';
import request from 'ic-ajax';

export default Ember.Object.extend({
  init() {
    this._super(...arguments);
    this.helper = Ember.$;
    this.jsonURL = "https://spreadsheets.google.com/feeds/list/" +
    this.key +
    "/public/values?alt=json";
    if (!this.isValid()) {
      this.jsonURL = this.fallbackURL;
      this.fallbackURL = null;
    }
  },
  isValid() {
    return (!!this.key);
  },
  getRows(callback) {
    var doc = this;
    doc.fetchData( function(entries) {
      callback( doc.parseEntries(entries) );
    });
  },
  log() {
    console.log(arguments);
  },
  fetchData(callback) {
    var url = this.jsonURL;
    var fallbackURL = this.fallbackURL;
    var log = this.log;
    var success = function(json) {
      var entries = json.feed.entry;
      if (callback) {
        callback(entries);
      } else {
        return entries;
      }
    };
    var failure = function(reason, url) {
      log(reason, "Failed to get data from " + url);
    };
    request(url).then(success,
      (reason) => {
        failure(reason, url);
        request(fallbackURL).then(success, (reason) => { failure(reason, fallbackURL); });
      }
    );
  },
  parseEntries(entries) {
    var rows = [];
    var fields = this.fields;
    var doc = this;
    this.helper.each(entries, function(index, entry) {
      rows.push(doc.parseEntry(entry, fields));
    });
    return rows;
  },
  parseEntry(entry, fields) {
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
  }
});
