require('babel-register')({
  presets: ['env']
});

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import Inflector from 'i';

const { pluralize } = Inflector();
const NPM_PATH = './node_modules';
const IS_MEMSERVER_MODEL_BUILD = process.env.BUILD === 'model';

const buildConfig = function() {
  if (IS_MEMSERVER_MODEL_BUILD) {
    return {
      input: `${NPM_PATH}/memserver/lib/model.js`,
      output: {
        file: 'vendor/shims/memserver/model.js',
        format: 'iife'
      },
      name: '_MEMSERVER_MODEL',
      banner: `(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': (function(){`,
      footer: `
        return _MEMSERVER_MODEL;
      })(),
          __esModule: true,
        };
      }

      define('memserver/model', [], vendorModule);
      })();`,
      plugins: [
        resolve({ jsnext: true }),
        commonjs({
          include: 'node_modules/**',
          namedExports: {
            'node_modules/ember-cli-string-utils/index.js': ['classify', 'underscore', 'dasherize'],
            'node_modules/ember-inflector/index.js': ['singularize', 'pluralize']
          }
        }),
        globals(),
        builtins()
      ]
    };
  }

  return {
    input: `${NPM_PATH}/memserver/lib/mem-server.js`,
    output: {
      file: 'vendor/shims/memserver/mem-server.js',
      format: 'iife'
    },
    name: 'MEMSERVER',
    plugins: [
      resolve({ jsnext: true }),
      commonjs({
        include: 'node_modules/**',
        namedExports: {
          'node_modules/ember-cli-string-utils/index.js': ['classify', 'underscore', 'dasherize'],
          'node_modules/ember-inflector/index.js': ['singularize', 'pluralize']
        }
      }),
      globals(),
      builtins()
    ]
  };
}();


export default buildConfig;
