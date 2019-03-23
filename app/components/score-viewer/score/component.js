import Component from '@ember/component';

export default Component.extend({
  classNames: ['score'],
  classNameBindings: ['isPlaying:score--unclickable', 'isPreview:score--preview'],
  isPlaying: false,
  isPreview: false,
  showExtraBlankPage: false,
  sortedPages: null,
  pageWidth: null,
  pageHeight: null,
});
