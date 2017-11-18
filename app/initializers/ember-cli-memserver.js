import MemServer from 'ember-cli-memserver';

export default {
  name: 'ember-cli-memserver',
  initialize() {
    MemServer.start();
  }
}
