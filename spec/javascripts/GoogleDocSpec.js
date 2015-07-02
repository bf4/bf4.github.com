describe("GoogleDoc", function() {
  var doc;
  var config = {
      'key' : "0AqHUOZcVEj_XdE5SMzBKSWhINjVtTlh2b0JjUFp4OEE",
      'fields' : [
              'appointments',
               'link',
               'pair',
               'description'
      ],
      'target' : '#pairing',
      'template' : '#pairing-template'
  };
  var entry = {
    "link":[{"rel":"self",
    "type":"application/atom+xml",
    "href":"https://spreadsheets.google.com/feeds/list/0AqHUOZcVEj_XdE5SMzBKSWhINjVtTlh2b0JjUFp4OEE/od6/public/values/bs9tc"}],
    "gsx$appointments":{"$t":"10/23/2014"},
    "gsx$pair":{"$t":"Mark Simoneau"},
    "gsx$link":{"$t":"https://github.com/rubygems/rubygems.org/issues/725"},
    "gsx$description":{"$t":"RFC: RubyGems Adoption Center"}
  };

  beforeEach(function() {
    doc = GoogleDoc(config, window.$);
  });

  it("getKey()", function() {
    expect(doc.getKey()).toEqual(config.key);
  });
  it("jsonURL", function() {
    var expectedJSONURL = "https://spreadsheets.google.com/feeds/list/" + config.key + "/od6/public/values?alt=json";
    expect(doc.jsonURL).toEqual(expectedJSONURL);
  });
  it("config.target", function() {
    expect(doc.target).toEqual('#pairing');
  });
  it("parse_entry()", function() {
    var fields = [
              'appointments',
               'link',
               'pair',
               'description'
      ];
    var parsed_entry = { appointments: '10/23/2014',
      link: 'https://github.com/rubygems/rubygems.org/issues/725',
      pair: 'Mark Simoneau',
      description: 'RFC: RubyGems Adoption Center'
    };
    expect(doc.parse_entry(entry, fields)).toEqual(parsed_entry);
  });
  it("parse_entries()", function() {
    var fields = [
              'appointments',
               'link',
               'pair',
               'description'
      ];
    var entries = [ entry ];
    var parsed_entries = [{ appointments: '10/23/2014',
      link: 'https://github.com/rubygems/rubygems.org/issues/725',
      pair: 'Mark Simoneau',
      description: 'RFC: RubyGems Adoption Center'
    }];
    expect(doc.parse_entries(entries, fields)).toEqual(parsed_entries);
  });
  it("templateHTML()", function() {
    var templateHTML = doc.helper(this.config.template).html();
  });
  it("printPairs()", function() {
    doc.fetch_data(config, display_html);
  });
  it("display_html()", function() {
    var html = doc.display_html(config, [ entry ]);
    expect(html).toEqual("");
      // config.view.rows = parse_entries(config.fields, entries);
      // this.html    = Mustache.render(config.source, config.view);
      // this.target = this.helper(config.target);
      // this.helper(this.target).html(this.html);
  });
  it("fetch_data()", function() {
      // this.helper.getJSON( config.url, function( json ) {
      //   this.entries = json.feed.entry;
      //   callback(config, this.entries);
      // });
  });

});
