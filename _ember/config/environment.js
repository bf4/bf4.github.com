/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'viewtastic',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    // CORS configuration for development environment
    ENV.contentSecurityPolicy = {
      'script-src':  "'self' 'unsafe-eval' http://*:35729",
      'font-src':    "'self'",
      'connect-src': "'self' *",
      'style-src':   "'self' 'unsafe-inline'",
      'object-src':  "'self' data:",
      'img-src':     "'self' data:"
    };

  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // CORS configuration for test environment
    ENV.contentSecurityPolicy = {
      'script-src':  "'self' 'unsafe-eval' http://*:35729",
      'font-src':    "'self'",
      'connect-src': "'self' *",
      'style-src':   "'self' 'unsafe-inline'",
      'object-src':  "'self' data:",
      'img-src':     "'self' data:"
    };


    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

    // CORS configuration for test environment
    ENV.contentSecurityPolicy = {
      'script-src':  "'self' 'unsafe-eval' http",
      'font-src':    "'self'",
      'connect-src': "'self' *",
      'style-src':   "'self' 'unsafe-inline'",
      'object-src':  "'self' data:",
      'img-src':     "'self' data:"
    };
  }

  return ENV;
};
