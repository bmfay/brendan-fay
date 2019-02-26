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
      return this.store.createRecord('page', {
        score: score,
        pageNumber: score.pages.length + 1,
      });
    },
    savePage(page) {
      return page.save();
    },
    addRecording(composition) {
      return this.store.createRecord('recording', {composition: composition});
    },
    saveRecording(recording) {
      return recording.save();
    }
  }
});
