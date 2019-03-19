import Route from '@ember/routing/route';

export default Route.extend({
  model({photo_id: id}) {
    return this.store.findRecord('photo', id);
  },

  setupController(controller, model) {
    controller.setProperties({
      photo: model,
      photoAlbum: this.modelFor('main.photo-albums.show'),
    });
  },

});
