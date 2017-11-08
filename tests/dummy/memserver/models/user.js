import Model from 'memserver/model';

export default Model({
  defaultAttributes: {
    is_verified: true,
    city() {
      return 'Istanbul';
    }
  }
});
