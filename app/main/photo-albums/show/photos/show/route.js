import Route from '@ember/routing/route';

export default Route.extend({
  model({photo_id: id}) {
    return this.store.findRecord('photo', id);
  }
});
