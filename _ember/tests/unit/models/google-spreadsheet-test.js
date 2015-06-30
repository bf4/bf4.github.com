import { test } from 'ember-qunit';
import Ember from 'ember';
import GoogleSpreadsheet from 'viewtastic/models/google-spreadsheet';
// import { defineFixture, lookupFixture } from 'ic-ajax';

test('it works as expected', function(assert) {
  assert.expect(7);
  var config = {
    "key": "0AqHUOZcVEj_XdE5SMzBKSWhINjVtTlh2b0JjUFp4OEE/od6",
    "fields": ["appointments","link","pair","description"],
    "fallbackURL": "/assets/pair.json"
  };
  var entry = {"id":{"$t":"https://spreadsheets.google.com/feeds/list/1v1SlkJL7G5QbX6SA692jq9g9sJ8Yewfxpxi4YrH5Vos/od6/public/values/cokwr"},"updated":{"$t":"2015-06-16T18:29:57.965Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"6/10/2015"},"content":{"type":"text","$t":"pair: Edward Loveall, link: https://github.com/rails-api/active_model_serializers/pull/949, description: Don't pass serializer option to associated serializers"},"link":[{"rel":"self","type":"application/atom+xml","href":"http://spreadsheets.google.com/feeds/list/1v1SlkJL7G5QbX6SA692jq9g9sJ8Yewfxpxi4YrH5Vos/od6/public/values/cokwr"}],"gsx$appointments":{"$t":"6/10/2015"},"gsx$pair":{"$t":"Edward Loveall"},"gsx$link":{"$t":"https://github.com/rails-api/active_model_serializers/pull/949"},"gsx$description":{"$t":"Don't pass serializer option to associated serializers"}};
  var entries = [entry];
  var json = {"version":"1.0","encoding":"UTF-8","feed":{"xmlns":"http://www.w3.org/2005/Atom","xmlns$openSearch":"http://a9.com/-/spec/opensearchrss/1.0/","xmlns$gsx":"http://schemas.google.com/spreadsheets/2006/extended","id":{"$t":"https://spreadsheets.google.com/feeds/list/1v1SlkJL7G5QbX6SA692jq9g9sJ8Yewfxpxi4YrH5Vos/od6/public/values"},"updated":{"$t":"2015-06-16T18:29:57.965Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"Public"},"link":[{"rel":"alternate","type":"application/atom+xml","href":"https://docs.google.com/spreadsheets/d/1v1SlkJL7G5QbX6SA692jq9g9sJ8Yewfxpxi4YrH5Vos/pubhtml"},{"rel":"http://schemas.google.com/g/2005#feed","type":"application/atom+xml","href":"http://spreadsheets.google.com/feeds/list/1v1SlkJL7G5QbX6SA692jq9g9sJ8Yewfxpxi4YrH5Vos/od6/public/values"},{"rel":"http://schemas.google.com/g/2005#post","type":"application/atom+xml","href":"http://spreadsheets.google.com/feeds/list/1v1SlkJL7G5QbX6SA692jq9g9sJ8Yewfxpxi4YrH5Vos/od6/public/values"},{"rel":"self","type":"application/atom+xml","href":"http://spreadsheets.google.com/feeds/list/1v1SlkJL7G5QbX6SA692jq9g9sJ8Yewfxpxi4YrH5Vos/od6/public/values?alt\u003djson"}],"author":[{"name":{"$t":"bfleischer"},"email":{"$t":"bfleischer@gmail.com"}}],"openSearch$totalResults":{"$t":"24"},"openSearch$startIndex":{"$t":"1"},"entry":
    entries
  }};
  var expectedRow = {"appointments":"6/10/2015","link":"https://github.com/rails-api/active_model_serializers/pull/949","pair":"Edward Loveall","description":"Don't pass serializer option to associated serializers"};
  var expectedRows = [expectedRow];

  var doc = GoogleSpreadsheet.create(config);

  assert.equal(doc.helper, Ember.$);
  assert.equal(doc.fallbackURL, config.fallbackURL);
  assert.equal(doc.key, config.key);
  assert.equal(doc.isValid(), true);
  doc.key = null;
  assert.equal(doc.isValid(), false);
  doc.key = config.key;

  var actualRow = doc.parseEntry(entry, config.fields);
  assert.equal(JSON.stringify(actualRow), JSON.stringify(expectedRow));

  var actualRows = doc.parseEntries(entries);
  assert.equal(JSON.stringify(actualRows), JSON.stringify(expectedRows));

  // defineFixture("/bananaboat", {
  //       response: json,
  //       textStatus: 'success',
  //       jqXHR: {}
  // });
  //
  // doc.fetchData(function(entries) {
  //   var expectedResponse = lookupFixture("/bananaboat").response;
  //   assert.equal(JSON.stringify(json), JSON.stringify(expectedResponse));
  //   var expectedEntries = expectedResponse.entry;
  //   assert.deepEqual(entries, expectedEntries);
  // });
  // //
});
