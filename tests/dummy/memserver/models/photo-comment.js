import Model from 'memserver/model';

export default Model({
  defaultAttributes: {
    inserted_at() {
      return new Date().toJSON();
    },
    is_important: true
  },
  // forPhoto(photo) {
  //   return this.findAll({ photo_id: photo.id });
  // }
});
