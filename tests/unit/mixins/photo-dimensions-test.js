import EmberObject from '@ember/object';
import PhotoDimensionsMixin from 'brendan-fay/mixins/photo-dimensions';
import { module, test } from 'qunit';

module('Unit | Mixin | photo-dimensions', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let PhotoDimensionsObject = EmberObject.extend(PhotoDimensionsMixin);
    let subject = PhotoDimensionsObject.create();
    assert.ok(subject);
  });
});
