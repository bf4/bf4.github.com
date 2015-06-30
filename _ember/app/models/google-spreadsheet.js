import Ember from 'ember';
// import request from 'ic-ajax';
// request('https://spreadsheets.google.com/feeds/list/0AqHUOZcVEj_XdE5SMzBKSWhINjVtTlh2b0JjUFp4OEE/od6/public/values?alt=json').then((data) => {
//   // do nothing with the data, for now
//   // debugger;
//   console.log(data, "Using the data so jshint is happy.");
// });

export default Ember.Object.extend({
  init() {
    this._super(...arguments);
    this.helper = Ember.$;
    this.jsonURL = "https://spreadsheets.google.com/feeds/list/" +
    this.key +
    "/public/values?alt=json";
    this.fetcher = this.helper.getJSON;
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
  fetchData(callback) {
    var url = this.jsonURL;
    var fallbackURL = this.fallbackURL;
    var success = function(json) {
      var entries = json.feed.entry;
      callback(entries);
    };
    this.fetcher( url )
      .done( success )
    .fail(
        this.fetcher(fallbackURL, success)
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
