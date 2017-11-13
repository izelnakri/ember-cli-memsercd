// TODO: make another jquery shim for AJAX!!!!
import Ember from 'ember';
import { singularize } from 'ember-inflector';
import Server from '../memserver/server';
import MemServerInitializer from '../memserver/initializer';

const { classify } = Ember.String;

export default {
  name: 'ember-cli-memserver',
  initialize() {
  }
}
