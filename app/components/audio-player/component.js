/* global Amplitude */
import Component from '@ember/component';
import ENV from 'brendan-fay/config/environment';

export default Component.extend({
  recording: null,
  classNames: ['audio-player'],

  didInsertElement() {
    const _this = this;
    const recording = this.recording;

    Amplitude.init({
      "bindings": {
        32: 'play_pause'
      },
      "songs": [
        {
          "url": recording.url,
        }
      ],
      soundcloud_client: ENV.soundcloudClientId,

      "callbacks": {
        'time_update': function() {
          if (_this.handleTimeUpdate) {
            _this.handleTimeUpdate(Amplitude.getSongPlayedSeconds());
          }
        },
        'after_play': function() {
          if (_this.handlePlay) { _this.handlePlay(); }
        },
        'after_stop': function() {
          if (_this.handleStop) { _this.handleStop(); }
        },
        'after_pause': function() {
          if (_this.handleStop) { _this.handleStop(); }
        },
      }
    });

    window.onkeydown = function(e) {
      return !(e.keyCode == 32);
    };

    /*
    Handles a click on the song played progress bar.
    */
    this.$('.audio-player__progress-bar').click(function( e ){
      const offset = this.getBoundingClientRect();
      const x = e.pageX - offset.left;

      Amplitude.setSongPlayedPercentage( ( parseFloat( x ) / parseFloat( this.offsetWidth) ) * 100 );
    });
  }
});
