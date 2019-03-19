import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  photo: null,
  classNameBindings: ['widthIsLimit::photo-album__photo-container--tall'],
  navVerticalSpace: 100, //TODO: update
  widthPaddedSpace: 30,

  //TODO recalculate on resize?

  isWidthLimit(photo) {
    const availHeight = document.documentElement.clientHeight - this.navVerticalSpace;
    const availWidth = document.documentElement.clientWidth - this.widthPaddedSpace;

    const screenRatio = availWidth / availHeight;
    const photoRatio = photo.originalWidth / photo.originalHeight;

    return photoRatio > screenRatio;
  },

  widthIsLimit: computed('photo.{originalWidth,originalHeight}', function() {
    this.isWidthLimit(this.photo);
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

  //prevId: computed('photo.photoAlbum.photos.[]')
});
