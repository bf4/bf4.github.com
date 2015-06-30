import Ember from 'ember';
import GoogleSpreadsheet from 'viewtastic/models/google-spreadsheet';

export default Ember.Component.extend({
  tagName: '',
  config: {},
  rows: null,
   // hook into component initialization
  init() {
    this._super(...arguments);
    var component = this;
    var doc = GoogleSpreadsheet.create(this.config);
    if (doc.isValid()) {
      doc.getRows( function(rows) {
        component.set('rows', rows);
      });
    }
  }
});
