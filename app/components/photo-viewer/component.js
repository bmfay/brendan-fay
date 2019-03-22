import Component from '@ember/component';
import { computed } from '@ember/object';
import PhotoDimensions from 'brendan-fay/mixins/photo-dimensions';

export default Component.extend(PhotoDimensions, {
  photo: null,
  classNameBindings: ['widthIsLimit::photo-album__photo-container--tall'],

  //TODO recalculate on resize?

  widthIsLimit: computed('photo.{originalWidth,originalHeight}', function() {
    return this.isWidthLimit(this.photo);
  }),

  width: computed('widthIsLimit', function() {
    return this.calculateWidth(this.widthIsLimit);
  }),

  height: computed('widthIsLimit', function() {
    return this.calculateHeight(this.widthIsLimit);
  }),
});
