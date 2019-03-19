import DS from 'ember-data';

const {
  attr,
  belongsTo,
} = DS;

export default DS.Model.extend({
  title: attr('string'),
  cloudinaryId: attr('string'),
  position: attr('number'),
  originalWidth: attr('number'),
  originalHeight: attr('number'),

  photoAlbum: belongsTo('photo-album')
});
