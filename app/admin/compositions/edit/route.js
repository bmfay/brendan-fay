import Route from '@ember/routing/route';

export default Route.extend({
  model({id: id}) {
    return this.store.findRecord('composition', id);
  }
});
