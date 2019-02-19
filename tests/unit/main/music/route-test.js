import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | main/music', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:main/music');
    assert.ok(route);
  });
});
