import startMemServer from 'ember-cli-memserver';

export default {
  name: 'ember-cli-memserver',
  initialize() {
    startMemServer();
  }
}
