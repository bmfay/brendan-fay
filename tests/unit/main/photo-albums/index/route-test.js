import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | main/photo-albums/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:main/photo-albums/index');
    assert.ok(route);
  });
});
