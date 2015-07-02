import Ember from 'ember';
import googleSpreadsheet from 'viewtastic/utils/google-spreadsheet';

export default Ember.Component.extend({
  tagName: '',
  config: {},
  rows: null,
   // hook into component initialization
  init() {
    this._super(...arguments);
    var component = this;
    var doc = googleSpreadsheet.create(this.config);
    if (doc.isValid()) {
      doc.getRows( function(rows) {
        component.set('rows', rows);
      });
    }
  }
});
