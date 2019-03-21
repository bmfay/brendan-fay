import EmberObject from '@ember/object';
import CloudinaryImgUrlMixin from 'brendan-fay/mixins/cloudinary-img-url';
import { module, test } from 'qunit';

module('Unit | Mixin | cloudinary-img-url', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let CloudinaryImgUrlObject = EmberObject.extend(CloudinaryImgUrlMixin);
    let subject = CloudinaryImgUrlObject.create();
    assert.ok(subject);
  });
});
