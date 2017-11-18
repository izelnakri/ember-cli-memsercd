import require from 'require';
import Ember from 'ember';
import { singularize } from 'ember-inflector';

const { classify } = Ember.String;

const APP_MODULES = Object.keys(requirejs.entries);

const modelFixtureTree = APP_MODULES.reduce((result, moduleReference) => {
  if (/\/memserver\/fixtures/g.test(moduleReference)) {
    const modelName = classify(singularize(moduleReference.split('/').slice(-1)[0]));

    result[modelName] = Object.assign(result[modelName] || {}, {
      fixtures: require(moduleReference, null, null, true).default
    });
  } else if (/\/memserver\/models/g.test(moduleReference)) {
    const modelName = classify(moduleReference.split('/').slice(-1)[0]);

    result[modelName] = Object.assign(result[modelName] || {}, {
      model: require(moduleReference, null, null, true).default
    });
  }

  return result;
}, {});

const initializerPath = APP_MODULES.find((entry) => entry.endsWith('memserver/initializer'));
const MemServerInitializer = initializerPath ? require(initializerPath).default : function() {};
const serverPath = APP_MODULES.find((entry) => entry.endsWith('memserver/server'));

if (!serverPath) {
  throw new Error('/memserver/server.js doesn\'t exist for this application!');
}

const Server = require(serverPath).default

window.MemServer = window.MEMSERVER(modelFixtureTree, Server, MemServerInitializer);

export default window.MemServer;

// NOTE: mock fetch
