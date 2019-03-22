/* global cloudinary */
import Mixin from '@ember/object/mixin';
import ENV from 'brendan-fay/config/environment';
import { breakpoints } from 'brendan-fay/lib/photo-breakpoints';
import { isPresent } from '@ember/utils';

export default Mixin.create({
  breakpoints: breakpoints,

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

  findCloudinarySrc(attributes) {
    const dpr = isNaN(window.devicePixelRatio) ? 1 : window.devicePixelRatio;

    const opts = {};
    ['width', 'height', 'crop'].forEach(attributeName => {
      if (isPresent(attributes[attributeName])) {
        let value = attributes[attributeName];
        if (['width','height'].includes(attributeName)) {
          value = this.findBreakpointForValue(value * dpr)
        }
        opts[attributeName] = value;
      }
    });

    const cl = cloudinary.Cloudinary.new({cloud_name: ENV.cloudinary.name});
    const cloudinaryUrl = cl.url(attributes.cloudinaryId, opts);

    return `${cloudinaryUrl}.jpg`;
  },
});
