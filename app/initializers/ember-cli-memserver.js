import MEMSERVER from 'ember-cli-memserver';
import ENV from '../config/environment';

export default {
  name: 'ember-cli-memserver',
  initialize() {
    MEMSERVER(ENV);
  }
}

export function startMemServer(environment=ENV) {
  return MEMSERVER(environment);
}
