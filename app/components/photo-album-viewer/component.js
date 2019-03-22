import Component from '@ember/component';
import CloudinaryImgUrl from 'brendan-fay/mixins/cloudinary-img-url';
import PhotoDimensions from 'brendan-fay/mixins/photo-dimensions';
import { computed, set } from '@ember/object';

export default Component.extend(CloudinaryImgUrl, PhotoDimensions, {
  classNames: ['photo-album'],
  closeRoute: 'main.photo-albums.index',
  photoNumber: 1,
  photoAlbum: null,
  photoSorting: Object.freeze(['position']),
  sortedPhotos: computed.sort('photoAlbum.photos', 'photoSorting'),
  supportsFullscreen: true,
  isFullscreened: false,

  init() {
    this._super(...arguments);

    if (!document.fullscreenEnabled) {
      set(this, 'supportsFullscreen', false);
    }
  },

  didInsertElement() {
    this._super(...arguments);
    // TODO if photoNumber > 1, load first one slast
    this.preload(this.sortedPhotos.toArray(), this.photoNumber);
  },

  preload(photos, index) {
    index = index || 0;
    if (photos && photos.length > index) {
      const img = new Image ();
      const _this = this;
      img.onload = function() {
        _this.preload(photos, index + 1);
      }
      img.src = this.cloudinaryUrl(photos[index]);
    }
  },

  cloudinaryUrl(photo) {
    const widthIsLimit = this.isWidthLimit(photo);
    return this.findCloudinarySrc({
      width: this.calculateWidth(widthIsLimit),
      height: this.calculateHeight(widthIsLimit),
      crop: 'limit',
      cloudinaryId: photo.cloudinaryId
    })
  },

  photo: computed('sortedPhotos.photos.[]', 'photoNumber', function() {
    return this.sortedPhotos.toArray()[this.photoNumber - 1];
  }),
  prevId: computed('photoAlbum.photos.[]', 'photoNumber', function() {
    return this.photoNumber > 1 ? this.photoNumber - 1 : null;
  }),
  nextId: computed('photoAlbum.photos.[]', 'photoNumber', function() {
    return this.photoNumber < this.photoAlbum.photos.length ? this.photoNumber + 1 : null;
  }),

  actions: {
    toggleFullScreen() {
      if (this.isFullscreened) {
        document.exitFullscreen();
        set(this, 'isFullscreened', false);
      } else {
        document.documentElement.requestFullscreen();
        set(this, 'isFullscreened', true);
      }
    },
  }
});
