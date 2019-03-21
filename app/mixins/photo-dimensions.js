import Mixin from '@ember/object/mixin';

export default Mixin.create({
  photo: null,
  navVerticalSpace: 100, //TODO: update
  widthPaddedSpace: 30,

  isWidthLimit(photo) {
    const availHeight = document.documentElement.clientHeight - this.navVerticalSpace;
    const availWidth = document.documentElement.clientWidth - this.widthPaddedSpace;

    const screenRatio = availWidth / availHeight;
    const photoRatio = photo.originalWidth / photo.originalHeight;

    return photoRatio > screenRatio;
  },

  calculateWidth(widthIsLimit) {
    if (widthIsLimit) {
      return document.documentElement.clientWidth - this.widthPaddedSpace;
    } else {
      return null;
    }
  },

  calculateHeight(widthIsLimit) {
    if (!widthIsLimit) {
      return document.documentElement.clientHeight - this.navVerticalSpace;
    } else {
      return null;
    }
  }
});
