import { moduleForComponent, test } from 'ember-qunit';
import { startMemServer } from '../../initializers/ember-cli-memserver';
import Response from 'memserver/response';

moduleForComponent('dummy-start', 'Integration | Component | dummy-start', {
  integration: true,
  beforeEach() {
    startMemServer();
  },
  afterEach() {
    window.MemServer.shutdown();
  }
});

test('can start window.MemServer manually in integration tests', function(assert) {
  assert.expect(8);

  assert.ok(window.MemServer.start, 'window.MemServer.start() exists');
  assert.ok(window.MemServer.shutdown, 'window.MemServer.shutdown() exists');
  assert.ok(window.MemServer.Models, 'window.MemServer.Models exists');

  assert.ok(Object.keys(window.MemServer.Server).length > 0, 'window.MemServer.start() adds the Pretender instance');
  assert.ok(Object.keys(window.MemServer.DB).length > 0, 'window.MemServer.start() injects fixtures');

  const User = window.MemServer.Models.User;

  let done = assert.async();
  window.$.ajax({
    type: 'GET', url: '/users', headers: { 'Content-Type': 'application/json' }
  }).then((data, textStatus, jqXHR) => {
    assert.equal(jqXHR.status, 200);
    assert.deepEqual(data, { users: User.serializer(User.findAll()) });
    assert.equal(User.findAll().length, 3);
    done();
  });
});

test('can add routes dynamically to window.MemServer after manual start', function(assert) {
  assert.expect(7);

  window.MemServer.start();

  const { Server } = window.MemServer;
  const { Photo } = window.MemServer.Models;

  Server.get('/photos')

  let done = assert.async();
  window.$.ajax({
    type: 'GET', url: '/photos', headers: { 'Content-Type': 'application/json' }
  }).then((data, textStatus, jqXHR) => {
    assert.equal(jqXHR.status, 200);
    assert.deepEqual(data, { photos: Photo.serializer(Photo.findAll()) });
    assert.equal(Photo.findAll().length, 3);

    Server.get('/photos', () => {
      return Response(500, { error: 'Manual window.MemServer error declared for Photos' });
    });

    window.$.ajax({
      type: 'GET', url: '/photos', headers: { 'Content-Type': 'application/json' }
    }).catch((jqXHR) => {
      assert.equal(jqXHR.status, 500);
      assert.deepEqual(jqXHR.responseJSON, { error: 'Manual window.MemServer error declared for Photos' });

      Server.get('/photos/:id', (request) => {
        return Response(500, { error: `Manual window.MemServer error declared for Photo: ${request.params.id}` });
      });

      window.$.ajax({
        type: 'GET', url: '/photos/5', headers: { 'Content-Type': 'application/json' }
      }).catch((jqXHR) => {
        assert.equal(jqXHR.status, 500);
        assert.deepEqual(jqXHR.responseJSON, { error: 'Manual window.MemServer error declared for Photo: 5' });
        done();
      });
    });
  });
});
