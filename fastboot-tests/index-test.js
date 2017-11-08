'use strict';

const assert = require('assert');
const setupTest = require('ember-fastboot-addon-tests').setupTest;

describe('index', function() {
  setupTest('fastboot');

  it('can render a page', function() {
    console.log('lol')
    return this.visit('/').then((ctx) => {
      console.log('lol2');

      const $ = ctx.jQuery;
      const response = ctx.response;

      assert.equal(response.statusCode, 200);
      assert.equal($('body').length, 1);
      assert.equal($('h1').text().trim(), 'Hello World');
      assert.equal($('p').text().trim(), 'Rendered by fastboot addon tests');
    });
  });

  // it('can render list of models page from fastboot with mirage', function(done) {
  //   this.visit('/users').then((ctx) => {
  //       const $ = ctx.jQuery;
  //       const response = ctx.response;
  //
  //       assert.equal(response.statusCode, 200);
  //       assert.equal($('body').length, 1);
  //       assert.equal($('h1').text().trim(), 'ember-fastboot-addon-tests');
  //
  //       done();
  //     });
  // });
  //
  // it('can render a single model page from fastboot with mirage', function(done) {
  //   this.visit('/users/3').then((ctx) => {
  //       const $ = ctx.jQuery;
  //       const response = ctx.response;
  //
  //       assert.equal(response.statusCode, 200);
  //       assert.equal($('body').length, 1);
  //       assert.equal($('h1').text().trim(), 'ember-fastboot-addon-tests');
  //
  //       done();
  //     });
  // });
});
