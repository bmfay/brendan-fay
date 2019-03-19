import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  photo: null,
  navVerticalSpace: 100, //TODO: update
  widthPaddedSpace: 40,

  //TODO recalculate on resize?

  widthIsLimit: computed('photo.{originalWidth,originalHeight}', function() {
    const availHeight = document.documentElement.clientHeight - this.navVerticalSpace;
    const availWidth = document.documentElement.clientWidth - this.widthPaddedSpace;

    const screenRatio = availWidth / availHeight;
    const photoRatio = this.photo.originalWidth / this.photo.originalHeight;

    return photoRatio > screenRatio;
  }),

  width: computed('widthIsLimit', function() {
    if (this.widthIsLimit) {
      return document.documentElement.clientWidth - this.widthPaddedSpace;
    }
  }),

  height: computed('widthIsLimit', function() {
    if (!this.widthIsLimit) {
      return document.documentElement.clientHeight - this.navVerticalSpace;
    }
  }),

  imgClass: computed('widthIsLimit', function() {
    return this.widthIsLimit ? 'photo-album__photo--wide' : 'photo-album__photo--tall';
  })

  //prevId: computed('photo.photoAlbum.photos.[]')
});
