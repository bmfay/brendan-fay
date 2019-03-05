import Component from '@ember/component';

export default Component.extend({
  composition: null,
  store: null,
  classNames: ['form'],

  actions: {
    addPhoto(album) {
      return this.store.createRecord('photo', {
        album: album,
        position: album.photos.length + 1,
      });
    },
  }
});
