/* global cloudinary */
import Component from '@ember/component';
import $ from "jquery"
import ENV from 'brendan-fay/config/environment';
import { computed, get, set } from '@ember/object';
import { isBlank } from '@ember/utils';

export default Component.extend({
  model: null,
  attribute: '',
  canEdit: true,
  cloudinaryId: null,
  showButton: null,
  imageWidth: null,
  imageHeight: null,
  crop: 'fit',
  classNames: ['image-upload'],
  imageClass: '',
  description: 'Upload Mock',

  // Allow files to be dropped into a larger area that wraps this component
  dropZoneElement: null,

  init() {
    this._super(...arguments);

    set(this, 'progress', 0);
  },

  didInsertElement() {
    const uploadPreset = get(this, 'uploadPreset');
    this.input().unsigned_cloudinary_upload(
      uploadPreset, {
        cloud_name: ENV.cloudinary.name,
      }, {
        dropZone: get(this, 'dropZone'),
        disableImageResize: false,
        imageMaxWidth: 1000,
        imageMaxHeight: 1000,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png|bmp)$/i,
        maxFileSize: 5000000 // 5MB
      }
    );

    this.input()
    .bind('fileuploadstart', () => {
      this.setProperties({
        progress: 1,
        cloudinaryId: null,
      });
    })
    .bind('fileuploaddone', (e, data) => {
      set(this, 'progress', 100);

      const model = get(this, 'model');

      set(model, get(this, 'attribute'), data.result.public_id);
      set(this, 'cloudinaryId', data.result.public_id);

      get(this, 'model').save();
    })
    .bind('fileuploadprogress', (e, data) => {
      const progress = parseInt(data.loaded / data.total * 100, 10);

      set(this, 'progress', progress);
    });
  },

  input() {
    return this.$('input');
  },

  dropZone: computed('dropZoneElement', function() {
    const dropZoneElement = get(this,  'dropZoneElement');

    if (dropZoneElement) {
      return $(dropZoneElement);
    } else {
      return this.$();
    }
  }),

  uploadPreset: ENV.cloudinary.documentUploadPreset,

  cloudinaryImgLink: computed('cloudinaryId', function(){
    const cl = cloudinary.Cloudinary.new({cloud_name: ENV.cloudinary.name});

    return cl.url(get(this, 'cloudinaryId'));
  }),

  isUploading: computed('progress', function() {
    const progress = get(this, 'progress');

    return progress > 0 && progress < 100;
  }),

  isProcessing: computed('cloudinaryId', 'progress', function() {
    const doneUploading = get(this, 'progress') === 100;
    const cloudinaryId = get(this, 'cloudinaryId');

    return doneUploading && isBlank(cloudinaryId);
  }),



  willDestroyElement() {
    this._super(...arguments);

    this.input().remove();
  },

  actions: {
    openDialog() {
      set(this, 'progress', 0);

      this.input().click();
    },

    delete(model) {
      set(model, get(this, 'attribute'), null);
      get(this, 'model').save();
    },
  }
});
