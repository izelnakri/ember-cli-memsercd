/* eslint-env node */
'use strict';

const path = require('path');
const mergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-cli-memserver',
  blueprintsPath() {
    // TODO: add here blueprints
    // NOTE: maybe use preBuild() hook, preprocessTree()
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

    if (this.addonENV.enabled) {
      app.import('vendor/mem-server.js');
      app.import('vendor/shims/memserver/response.js');
      app.import('vendor/shims/memserver/model.js');
      app.import('vendor/shims/jquery.min.js');
    }
  },
  treeForFastBoot(tree) {
    return this.addonENV.enabled ? tree : null;
  },
  updateFastBootManifest(manifest) {
    return manifest;
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
  }
};
