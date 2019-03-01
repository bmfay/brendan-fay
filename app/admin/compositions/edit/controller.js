import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    save(composition) {
      return composition.save().then(() => {
        this.transitionToRoute('admin.compositions.index');
      });
    },
  }
});
