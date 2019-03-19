/* global cloudinary */
import ENV from 'brendan-fay/config/environment';
import Component from '@ember/component';
import { computed } from '@ember/object';
import $ from "jquery"

export default Component.extend({
  photoAlbum: null,
  photoSorting: Object.freeze(['positiong']),
  sortedPhotos: computed.sort('photoAlbum.photos', 'photoSorting'),
  width: 750,
});
