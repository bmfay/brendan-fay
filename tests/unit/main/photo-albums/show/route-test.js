import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | main/photo-albums/show', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:main/photo-albums/show');
    assert.ok(route);
  });
});
