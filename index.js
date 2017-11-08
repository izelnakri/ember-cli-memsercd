/* eslint-env node */
// NOTE: maybe use preBuild() hook, preprocessTree()
'use strict';

const path = require('path');
const mergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-cli-memserver',
  blueprintsPath() {
    // TODO: add here blueprints
  },
  isDevelopingAddon() {
   return true;
  },
  included(app) {
    this.app = this._findHost();
    this.addonENV = this.app.project.config(this.app.env)['ember-cli-memserver'] || {};

    this._super.included.apply(this, arguments);

    if (this.app.project.pkg['ember-addon'] && !this.app.project.pkg['ember-addon'].paths) { // NOTE: maybe this.app here wrong
      this.memserverDir = path.resolve(app.project.root, path.join('tests', 'dummy', 'memserver'));
    } else {
      this.memserverDir = path.join(this.app.project.root, '/memserver');
    }

    // NOTE: maybe do app.imports here
  },
  treeFor() {
    if (!this.addonENV.enabled) {
      return;
    }

    return this._super.treeFor.apply(this, arguments);
  },
  treeForApp(appTree) {
    if (this.addonENV.enabled) {
      const trees = [appTree];
      const memserverFilesTree = new Funnel(this.memserverDir, { destDir: 'memserver' });

      trees.push(memserverFilesTree);

      return mergeTrees(trees);
    }

    return this._super.treeFor.apply(this, arguments);
    // NOTE: import all memserver files, FakeXMLHttpRequest, RouteRecognizer(this 2 might be unnecessary)
    // models + fixtures gets required, Server and initializer gets required.
    // MEMSERVER(modelFixtureTree, Server, initializer);
  }
};

// import models from '_memserver_models';
// import fixtures from '_memserver_fixtures';
// import initializer from '_memserver_initializer';
// import targetMemServer from '_memserver';
// import MEMSERVER from './mem-server';
//
// const modelFixtureTree = Object.keys(models).reduce((tree, modelName) => {
//   return Object.assign({}, tree, {
//     [modelName]: {
//       model: models[modelName],
//       fixtures: fixtures[modelName] || []
//     }
//   });
// }, {});
//
// const memserver = MEMSERVER(modelFixtureTree, targetMemServer, initializer);
//
// export default memserver;
