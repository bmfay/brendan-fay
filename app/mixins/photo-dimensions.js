import Mixin from '@ember/object/mixin';

export default Mixin.create({
  photo: null,
  unusableVerticalSpace: 100, //TODO: update
  widthPaddedSpace: 30,

  isWidthLimit(photo) {
    const availHeight = this.safeCalculateHeight();
    const availWidth = this.safeCalculateWidth();

    const screenRatio = availWidth / availHeight;
    const photoRatio = photo.originalWidth / photo.originalHeight;

    return photoRatio > screenRatio;
  },

  safeCalculateWidth() {
    // since we preload images for an album, we don't want to do that twice,
    // so even if their browser window is small, let's get the largest image
    // for their screen upfront
    let totalWidth = window.screen.width;
    let documentWidth = document.documentElement.clientWidth;

    if (isNaN(totalWidth) || totalWidth < documentWidth) {
      totalWidth = documentWidth;
    }
    return totalWidth - this.widthPaddedSpace;
  },

  safeCalculateHeight() {
    // get image big enough for full screen
    let totalHeight = window.screen.height;
    let documentHeight = document.documentElement.clientHeight;

    if (isNaN(totalHeight) || totalHeight < documentHeight) {
      totalHeight = documentHeight;
    }
    return totalHeight - this.unusableVerticalSpace;
  },

  calculateWidth(widthIsLimit) {
    if (widthIsLimit) {
      return this.safeCalculateWidth();
    } else {
      return null;
    }
  },

  calculateHeight(widthIsLimit) {
    if (!widthIsLimit) {
      return this.safeCalculateHeight();
    } else {
      return null;
    }
  }
});
