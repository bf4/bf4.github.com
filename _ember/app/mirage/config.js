export default function() {

  // ignore request
  this.get("/assets/pair.json", function(db) {
    return db.pairs[0];
  });
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing
  // Example: return a single object with related models
  // - db.{collection} // returns all the data defined in /app/mirage/fixtures/{collection}.js
  // this.get('/assets/pair(.:format)');
  // this.get('/assets/:fixture_name(.:format)', function(db, request) {
  //   var contactId = +request.params.fixture_name;
  //   return {
  //     contact: contact,
  //     addresses: addresses
  //   };
  // });
}

/*
You can optionally export a config that is only loaded during tests
export function testConfig() {

}
*/
