export default function(Models) {
  this.urlPrefix = 'http://localhost:7357';
  this.post('/users');
  this.get('/users');

  this.get('/:username/settings', (request) => {
    return {
      user: { id: 1, first_name: 'Izel', last_name: 'Nakri' },
      request_params: request.params,
      request_headers: request.headers,
      request_query_params: request.queryParams
    };
  });
}
