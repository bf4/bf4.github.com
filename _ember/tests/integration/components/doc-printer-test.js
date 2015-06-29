import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('doc-printer', 'Unit | Component | doc printer', {
  integration: true
});

test('it renders, and prompts to use the block form', function(assert) {
  assert.expect(2);

  var row = {appointments: "6/1/2015", description: "Configure EmberCLI app to use Ember Islands to export Components", link: "https://github.com/bf4/bf4.github.com/compare/master...emberize_cli_islands", pair: "Mitch Lloyd"};
  var rows = [ row ];
  this.set('rows', rows);
  this.render(hbs`
    {{doc-printer rows=rows}}
  `);

  var $component = this.$('.doc-item');

  assert.equal($component.length, rows.length, "prints 1 doc");
  var expectedData = "Without a block, I don't know what to do with [object Object]";
  var actualData = $component.text().trim();
  assert.equal(actualData, expectedData, "contains the error message");
});

test('it renders and yields the row object', function(assert) {
  assert.expect(2);

  var row = {appointments: "6/1/2015", description: "Configure EmberCLI app to use Ember Islands to export Components", link: "https://github.com/bf4/bf4.github.com/compare/master...emberize_cli_islands", pair: "Mitch Lloyd"};
  var rows = [ row ];
  this.set('rows', rows);
  this.render(hbs`
    {{#doc-printer rows=rows as |row|}}
      <span class="doc-data">
        {{row.description}}
      </span>
    {{/doc-printer}}
  `);

  var $component = this.$('.doc-item');

  assert.equal($component.length, rows.length, "prints 1 doc");
  var expectedData = row.description;
  var actualData = $component.find('.doc-data').text().trim();
  assert.equal(actualData, expectedData, "contains the row data");
});
