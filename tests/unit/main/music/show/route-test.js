import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | main/music/show', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:main/music/show');
    assert.ok(route);
  });
});
