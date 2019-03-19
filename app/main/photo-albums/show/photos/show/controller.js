import Controller from '@ember/controller';
import { computed } from "@ember/object";

export default Controller.extend({
  prevId: computed('photoAlbum.photos.[]', 'photo.position', function() {
    if (this.photo.position > 1) {
      return this.photoAlbum.photos.find(photo => photo.position == this.photo.position - 1);
    }
  }),
  nextId: computed('photoAlbum.photos.[]', 'photo.position', function() {
    if (this.photo.position < this.photoAlbum.photos.length) {
      return this.photoAlbum.photos.find(photo => photo.position == this.photo.position + 1);
    }
  }),

});
