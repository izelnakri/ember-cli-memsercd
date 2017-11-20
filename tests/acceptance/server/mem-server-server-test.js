import { test } from 'qunit';
import moduleForAcceptance from '../../helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | MemServer');

test('MemServer works for fetch()', function(assert) {
  assert.expect(1);

  let done = assert.async();
  fetch('/izelnakri/settings?versions=false', {
    method: 'GET', headers: { 'Authorization': `Bearer 12312` }
  }).then((response) => {
    if (response.status === 200) {
      return response;
    }

    new Error(response.statusText);
    throw response;
  }).then((response) => response.json())
  .then((json) => {
    assert.deepEqual(json, {
      user: { id: 1, first_name: 'Izel', last_name: 'Nakri' },
      request_params: { username: 'izelnakri' },
      request_headers: { authorization: 'Bearer 12312' },
      request_query_params: { versions: false }
    });

    done();
  });
});
