import Model from 'memserver/model';

export default Model({
  defaultAttributes: {
    is_public: true,
    name() {
      return 'Unknown name';
    }
  },
  // publicPhotos() {
  //   return this.findAll({ is_public: true });
  // }
});
