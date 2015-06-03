import Ember from 'ember';
import request from 'ic-ajax';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    request('https://spreadsheets.google.com/feeds/list/0AqHUOZcVEj_XdE5SMzBKSWhINjVtTlh2b0JjUFp4OEE/od6/public/values?alt=json').then((data) => {
      // do nothing with the data, for now
      // debugger;
      console.log(data, "Using the data so jshint is happy.");
    });
  }
});
