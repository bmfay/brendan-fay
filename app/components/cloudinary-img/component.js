/* global cloudinary */
import ENV from 'brendan-fay/config/environment';
import { computed, get } from '@ember/object';
import { isPresent } from '@ember/utils';
import Component from '@ember/component';

export default Component.extend({
  tagName: 'img',
  attributeBindings: ['src', 'imgWidth:width', 'imgHeight:height'],

  // Cloudinary Image Options
  width: null,
  height: null,
  crop: 'limit',
  cloudinaryId: null,
  adjustForDpr: true,
  breakpoints: [200,300,400,600,800,1000,1200,1400,1600,1800,2000,2200,2400,2800,3000,3500,4000,5000],

  didInsertElement() {
    this._super(...arguments);
  },

  findBreakpointForValue(value) {
    let breakpoint = 5000;
    for (let i=0; i < this.breakpoints.length; i++) {
      if (this.breakpoints[i] > value) {
        breakpoint = this.breakpoints[i];
        break;
      }
    }
    return breakpoint;
  },

  src: computed('width', 'height', 'crop', 'cloudinaryId', function() {
    const cloudinaryId = get(this, 'cloudinaryId');

    let dpr = isNaN(window.devicePixelRatio) ? 1 : window.devicePixelRatio;

    const opts = {};
    ['width', 'height', 'crop'].forEach(property => {
      if (isPresent(get(this, property))) {
        let value = get(this, property)
        if (['width','height'].includes(property)) {
          value = this.findBreakpointForValue(value * dpr)
        }
        opts[property] = value;
      }
    });

    const cl = cloudinary.Cloudinary.new({cloud_name: ENV.cloudinary.name});
    const cloudinaryUrl = cl.url(cloudinaryId, opts);

    return `${cloudinaryUrl}.jpg`;
  }),
});
