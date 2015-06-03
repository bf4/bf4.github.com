import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('doc-printer', 'Unit | Component | doc printer', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  // Creates the component instance
  var component = this.render("{{doc-printer}}");

  assert.equal(this.$('div:contains("Hello!")').length, 1, "says hello");
});
