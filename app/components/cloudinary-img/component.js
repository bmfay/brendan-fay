/* global cloudinary */
import ENV from 'brendan-fay/config/environment';
import { computed, get } from '@ember/object';
import { isPresent } from '@ember/utils';
import Component from '@ember/component';

export default Component.extend({
  tagName: 'img',
  attributeBindings: ['noDprSrc:data-src', 'imgWidth:width', 'imgHeight:height'],
  classNames: ["cld-hidpi", "cld-responsive"],

  // Cloudinary Image Options
  width: null,
  height: null,
  crop: null,
  cloudinaryId: null,
  dpr: 'auto',

  didInsertElement() {
    this._super(...arguments);
    this.$().cloudinary_update({round_dpr: true});
  },

  noDprSrc: computed('width', 'height', 'crop', 'dpr', 'cloudinaryId', function() {
    const cloudinaryId = get(this, 'cloudinaryId');

    const opts = {};
    ['width', 'height', 'crop', 'dpr'].forEach(property => {
      if (isPresent(get(this, property))) {
        opts[property] = get(this, property);
      }
    });

    const cl = cloudinary.Cloudinary.new({cloud_name: ENV.cloudinary.name});
    const cloudinaryUrl = cl.url(cloudinaryId, opts);

    return `${cloudinaryUrl}.jpg`;
  }),
});
