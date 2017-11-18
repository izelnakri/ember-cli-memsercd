import { test } from 'qunit';
import moduleForAcceptance from '../helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | MemServer');

test('MemServer has right functions', function(assert) {
  assert.deepEqual(Object.keys(window.MemServer.DB), ['PhotoComment', 'Photo', 'User']);
  assert.notEqual(window.MemServer.Server, {});
  assert.deepEqual(Object.keys(window.MemServer), ['DB', 'Server', 'Models', 'start', 'shutdown']);
  assert.deepEqual(Object.keys(window.MemServer.Models), ['PhotoComment', 'Photo', 'User']);
});

test('MemServer can be started with fixtures and initializers', function(assert) {
  const models = Object.keys(window.MemServer.Models);

  assert.deepEqual(models, ['PhotoComment', 'Photo', 'User']);
  models.forEach((modelName) => {
    const model = window.MemServer.Models[modelName];

    assert.equal(model.modelName, modelName);
    assert.deepEqual(Object.keys(window.MemServer.Models[modelName]), [
      'modelName', 'primaryKey', 'defaultAttributes', 'attributes', 'count', 'find', 'findBy',
      'findAll', 'insert', 'update', 'delete', 'embed', 'embedReferences', 'serializer',
      'serialize', 'getRelationship'
    ]);
  });

  const { PhotoComment, Photo, User } = window.MemServer.Models;

  assert.equal(PhotoComment.count(), 4);
  assert.equal(Photo.count(), 3);
  assert.equal(User.count(), 3);
  assert.deepEqual(User.serializer(User.findAll()), [
    {
      city: null,
      email: 'contact@izelnakri.com',
      first_name: 'Izel',
      id: 1,
      is_verified: true,
      last_name: 'Nakri',
      username: 'izelnakri'
    },
    {
      city: null,
      email: 'benjie@hotmail.com',
      first_name: 'Benjamin',
      id: 2,
      is_verified: false,
      last_name: 'Graham',
      username: 'benjamingraham'
    },
    {
      city: 'Istanbul',
      email: 'izelnakri@hotmail.com',
      first_name: null,
      id: 3,
      is_verified: true,
      last_name: null,
      username: 'izelnakri'
    }
  ]);
});
