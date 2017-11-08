const path = require('path');
const assert = require('assert');
const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

process.setMaxListeners(0);

describe('Addon', function() {
  this.timeout(15000);

  afterEach(function() {
    delete process.env.EMBER_ENV;
  });

  describe('#treeFor addon', function() {
    treeForTests('addon');
  });

  describe('#treeFor app', function() {
    treeForTests('app');
  });
});

function treeForTests(name) {
  ['development', 'test', 'production'].forEach((environment) => {
    it('returns an empty tree in ' + environment + ' environment by default', function() {
      process.env.EMBER_ENV = environment;

      const addonTree = getMemServerAddon().treeFor(name);

      assert.equal(addonTree, undefined);
    });
  });

  ['development', 'test', 'production'].forEach((environment) => {
    it('returns a tree in ' + environment + ' environment by default when enabled', function() {
      process.env.EMBER_ENV = environment;

      const addon = getMemServerAddon({ configPath: 'tests/config/environment-enabled' });
      const addonTree = addon.treeFor(name);

      assert.ok(addonTree._inputNodes.length !== 0);
    });
  });
}

function getMemServerAddon(options={}) {
  options['ember-cli-memserver'] = options['ember-cli-memserver'] || options;
  options['ember-cli-memserver'].directory = options['ember-cli-memserver'].directory ||
    path.resolve(__dirname, path.join('..', 'dummy', 'memserver'));

  const dummyApp = new EmberAddon(options);
  const server = findMemServer(dummyApp);

  return server;
}

function findMemServer(app) {
  const addons = app.project.addons;

  return addons.find((addon) => addon.name === 'ember-cli-memserver');
}
