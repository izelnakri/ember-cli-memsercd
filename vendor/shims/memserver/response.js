(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': function(statusCode=200, data={}, headers={}) {
        return [
          statusCode,
          Object.assign({ 'Content-Type': 'application/json' }, headers),
          JSON.stringify(data)
        ];
      },
      __esModule: true,
    };
  }

  define('memserver/response', [], vendorModule);
})();
