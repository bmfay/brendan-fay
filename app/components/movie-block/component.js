import Component from '@ember/component';
import Player from '@vimeo/player';

export default Component.extend({
  movie: null,
  classNames: ['movie'],
  
  didInsertElement() {
    const videoPlayerEl = this.$().find('.movie__video-player')[0];
    new Player(videoPlayerEl, {
      id: this.movie.url,
      responsive: true,
      byline: false,
      portrait: false,
      title: false,
      playsinline: false,
    });
  },
});
