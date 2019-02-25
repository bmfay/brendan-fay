import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    save(composition) {
      return composition.save().then(composition => {
        this.transitionToRoute('admin.compositions.edit', composition.id);
      });
    }
  }
});
