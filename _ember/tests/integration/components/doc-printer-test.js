import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('doc-printer', 'Unit | Component | doc printer', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(3);

  var row = {appointments: "6/1/2015", description: "Configure EmberCLI app to use Ember Islands to export Components", link: "https://github.com/bf4/bf4.github.com/compare/master...emberize_cli_islands", pair: "Mitch Lloyd"};
  var rows = [ row ];
  this.set('rows', rows);
  this.render(hbs`
    {{doc-printer rows=rows}}
  `);

  var $component = this.$('.doc-item');

  assert.equal($component.length, rows.length, "prints 1 doc");
  assert.equal($component.find('.doc-link').attr('href'), row.link, "gets the href");
  var expecteData = "" + row.appointments + " with " + row.pair + " on " + row.description;
  var actualData = $component.find('.doc-data').text().trim();
  assert.equal(actualData, expecteData, "contains the row data");
});
