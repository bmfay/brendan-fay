import Component from '@ember/component';

export default Component.extend({
  composition: null,
  store: null,
  classNames: ['form'],

  actions: {
    addScore(composition) {
      return this.store.createRecord('score', {composition: composition}).save();
    },
    addPage(score) {
      return this.store.createRecord('page', {score: score});
    },
    savePage(page) {
      return page.save();
    },
    addRecording(composition) {
      return this.store.createRecord('recording', {composition: composition});
    },
    saveRecording(recording) {
      return recording.then(recording => {
        return recording.save();
      });
    }
  }
});
