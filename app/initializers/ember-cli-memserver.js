import require from 'require';
import Server from '../memserver/server';
import MemServerInitializer from '../memserver/initializer';
import Ember from 'ember';
import { singularize } from 'ember-inflector';

const { classify } = Ember.String;

export default {
  name: 'ember-cli-mirage',
  initialize() {
    const modelFixtureTree = Object.keys(requirejs.entries).reduce((result, moduleReference) => {
      if (/\/memserver\/fixtures/g.test(moduleReference)) {
        const modelName = classify(singularize(moduleReference.split('/').slice(-1)[0]));
        console.log('modelName', modelName);

        result[modelName] = Object.assign(result[modelName] || {}, {
          fixtures: require(moduleReference, null, null, true).default
        });
      } else if (/\/memserver\/models/g.test(moduleReference)) {
        const modelName = classify(moduleReference.split('/').slice(-1)[0]);
        console.log('modelName', modelName);

        result[modelName] = Object.assign(result[modelName] || {}, {
          model: require(moduleReference, null, null, true).default
        });
      }

      return result;
    }, {});

    window.MemServer = window.MEMSERVER(modelFixtureTree, Server, MemServerInitializer);
    window.MemServer.start();
  }
}

// TODO:
// if (!fs.existsSync('memserver')) {
//   throw new Error(chalk.red('/memserver folder doesn\'t exist for this directory!'));
// } else if (!fs.existsSync('memserver/models')) {
//   throw new Error(chalk.red('/memserver/models folder doesn\'t exist for this directory!'));
// } else if (!fs.existsSync('memserver/server.js')) {
//   throw new Error(chalk.red('/memserver/server.js doesn\'t exist for this directory!'));
// }
