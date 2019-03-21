import Component from '@ember/component';
import { computed } from "@ember/object";

export default Component.extend({
  photoAlbum: null,
  classNames: ['photo-album'],
  closeRoute: 'main.photo-albums',
  photoNumber: 1,

  photo: computed('photoAlbum.photos.[]', 'photoNumber', function() {
    return this.photoAlbum.photos.find(photo => photo.position == this.photoNumber);
  }),
  prevId: computed('photoAlbum.photos.[]', 'photoNumber', function() {
    return this.photoNumber > 1 ? this.photoNumber - 1 : null;
  }),
  nextId: computed('photoAlbum.photos.[]', 'photoNumber', function() {
    return this.photoNumber < this.photoAlbum.photos.length ? this.photoNumber + 1 : null;
  }),
});
