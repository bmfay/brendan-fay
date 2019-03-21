import Component from '@ember/component';
import CloudinaryImgUrl from 'brendan-fay/mixins/cloudinary-img-url';
import { computed } from '@ember/object';

export default Component.extend(CloudinaryImgUrl, {
  tagName: 'img',
  attributeBindings: ['src', 'imgWidth:width', 'imgHeight:height'],

  // Cloudinary Image Options
  width: null,
  height: null,
  crop: 'limit',
  cloudinaryId: null,

  src: computed('width', 'height', 'crop', 'cloudinaryId', function() {
    return this.findCloudinarySrc({
      width: this.width,
      height: this.height,
      crop: this.crop,
      cloudinaryId: this.cloudinaryId
    });
  }),
});
