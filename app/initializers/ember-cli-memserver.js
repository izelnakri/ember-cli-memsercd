import require from 'require';
import Ember from 'ember';
import { singularize } from 'ember-inflector';
import Server from '../memserver/server';
import MemServerInitializer from '../memserver/initializer';

const { classify } = Ember.String;

export default {
  name: 'ember-cli-memserver',
  initialize() {
    const modelFixtureTree = Object.keys(requirejs.entries).reduce((result, moduleReference) => {
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

    window.MemServer = window.MEMSERVER(modelFixtureTree, Server, MemServerInitializer);
    window.MemServer.start();

    // NOTE: mock fetch
  }
}
