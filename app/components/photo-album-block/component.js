/* global cloudinary */
import ENV from 'brendan-fay/config/environment';
import Component from '@ember/component';
import { computed } from '@ember/object';
import $ from "jquery"

export default Component.extend({
  photoAlbum: null,
  photoSorting: Object.freeze(['positiong']),
  sortedPhotos: computed.sort('photoAlbum.photos', 'photoSorting'),

  photoSwipePhotos: computed('sortedPhotos.[]', function() {
    return this.sortedPhotos.map(photo => {
      const opts = { width: 600, height: 400};
      const bigOpts = { width: 3500, height: 1459};
      // ['width', 'height', 'crop', 'dpr'].forEach(property => {
      //   if (isPresent(get(this, property))) {
      //     opts[property] = get(this, property);
      //   }
      // });
      //

      const cl = cloudinary.Cloudinary.new({cloud_name: ENV.cloudinary.name});
      const cloudinaryUrl = cl.url(photo.cloudinaryId, bigOpts);
      const cloudinaryThumbUrl = cl.url(photo.cloudinaryId, opts);

      return {
        src: `${cloudinaryUrl}.jpg`,
        w: 3500,
        h: 1459,
        title: null,
      }
    })
  })
});
