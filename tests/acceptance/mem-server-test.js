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
  assert.deepEqual(User.findAll(), [
    {
      id: 1,
      email: 'contact@izelnakri.com',
      is_verified: true,
      username: 'izelnakri',
      first_name: 'Izel',
      last_name: 'Nakri'
    },
    {
      id: 2,
      email: 'benjie@hotmail.com',
      is_verified: false,
      username: 'benjamingraham',
      first_name: 'Benjamin',
      last_name: 'Graham'
    },
    {
      id: 3,
      city: 'Istanbul',
      email: 'izelnakri@hotmail.com',
      first_name: undefined,
      last_name: undefined,
      username: 'izelnakri',
      is_verified: true
    }
  ]);
});
