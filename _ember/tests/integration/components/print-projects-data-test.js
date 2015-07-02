import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('print-projects-data', 'Unit | Component | print projects', {
  integration: true
});

test('print-projects-data renders', function(assert) {
  assert.expect(2);
  // var entries = [
  //   {"id":{"$t":"https://spreadsheets.google.com/feeds/list/1WFJzqfOc6J_0zCjXExtc6TivMD3sDqBa7mZSGbIPat4/ocq/public/values/cokwr"},"updated":{"$t":"2014-10-30T16:39:13.352Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"Active"},"content":{"type":"text","$t":"role: Collaborator, link: https://github.com/mbleigh/acts-as-taggable-on, description: mbleigh/acts-as-taggable-on, _chk2m: mbleigh, _ciyn3: acts-as-taggable-on"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1WFJzqfOc6J_0zCjXExtc6TivMD3sDqBa7mZSGbIPat4/ocq/public/values/cokwr"}],"gsx$mydevstatus":{"$t":"Active"},"gsx$role":{"$t":"Collaborator"},"gsx$link":{"$t":"https://github.com/mbleigh/acts-as-taggable-on"},"gsx$description":{"$t":"mbleigh/acts-as-taggable-on"},"gsx$_chk2m":{"$t":"mbleigh"},"gsx$_ciyn3":{"$t":"acts-as-taggable-on"}},
  //   {"id":{"$t":"https://spreadsheets.google.com/feeds/list/1WFJzqfOc6J_0zCjXExtc6TivMD3sDqBa7mZSGbIPat4/ocq/public/values/dqi9q"},"updated":{"$t":"2014-10-30T16:39:13.352Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"Stale"},"content":{"type":"text","$t":"link: https://github.com/bf4/vimeo_downloader, description: bf4/vimeo_downloader, _chk2m: bf4, _ciyn3: vimeo_downloader"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1WFJzqfOc6J_0zCjXExtc6TivMD3sDqBa7mZSGbIPat4/ocq/public/values/dqi9q"}],"gsx$mydevstatus":{"$t":"Stale"},"gsx$role":{"$t":""},"gsx$link":{"$t":"https://github.com/bf4/vimeo_downloader"},"gsx$description":{"$t":"bf4/vimeo_downloader"},"gsx$_chk2m":{"$t":"bf4"},"gsx$_ciyn3":{"$t":"vimeo_downloader"}}
  // ];
  // var json = {"version":"1.0","encoding":"UTF-8","feed":
  //   {"xmlns":"http://www.w3.org/2005/Atom","xmlns$openSearch":"http://a9.com/-/spec/opensearchrss/1.0/","xmlns$gsx":"http://schemas.google.com/spreadsheets/2006/extended","id":{"$t":"https://spreadsheets.google.com/feeds/list/1WFJzqfOc6J_0zCjXExtc6TivMD3sDqBa7mZSGbIPat4/ocq/public/values"},"updated":{"$t":"2014-10-30T16:39:13.352Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"Public"},"link":[{"rel":"alternate","type":"application/atom+xml","href":"https://docs.google.com/spreadsheets/d/1WFJzqfOc6J_0zCjXExtc6TivMD3sDqBa7mZSGbIPat4/pubhtml"},{"rel":"http://schemas.google.com/g/2005#feed","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1WFJzqfOc6J_0zCjXExtc6TivMD3sDqBa7mZSGbIPat4/ocq/public/values"},{"rel":"http://schemas.google.com/g/2005#post","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1WFJzqfOc6J_0zCjXExtc6TivMD3sDqBa7mZSGbIPat4/ocq/public/values"},{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1WFJzqfOc6J_0zCjXExtc6TivMD3sDqBa7mZSGbIPat4/ocq/public/values?alt\u003djson"}],"author":[{"name":{"$t":"bfleischer"},"email":{"$t":"bfleischer@gmail.com"}}],"openSearch$totalResults":{"$t":"36"},"openSearch$startIndex":{"$t":"1"},"entry":
  //   [ entries ]
  //   }
  // };
  var row = {mydevstatus: "Active", role: "Collaborator", link: "https://github.com/mbleigh/acts-as-taggable-on", description: "mbleigh/acts-as-taggable-on" };
  var rows = [ row ];
  this.set('rows', rows);
  this.render(hbs`
    {{print-projects-data rows=rows}}
  `);

  var $component = this.$('.doc-item');

  assert.equal($component.length, rows.length, "prints 2 projects");
  assert.equal($component.find('.doc-link').attr('href'), row.link, "gets the href");
  // var expectedData = "" + row.description + "\n\n\n" + row.role + "\n(" + row.mydevstatus + ")";
  // var actualData = $component.text().trim();
  // assert.equal(actualData, expectedData, "contains the row data");
});
