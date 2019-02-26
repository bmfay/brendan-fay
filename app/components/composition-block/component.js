import Component from '@ember/component';
import $ from "jquery"
import ENV from 'brendan-fay/config/environment';
import { computed, get, set } from '@ember/object';
import { isBlank } from '@ember/utils';


export default Component.extend({
  composition: null,

  didInsertElement() {
    const INITIAL_PAGE_OFFSET = 1;
    initializeScoreViewer()
    const recording = this.composition.recording;

		Amplitude.init({
			"bindings": {
				32: 'play_pause'
			},
			"songs": [
				{
					"name": recording.title,
					"url": recording.url,
				}
			],
      soundcloud_client: ENV.soundcloudClientId
		});

    window.onkeydown = function(e) {
      return !(e.keyCode == 32);
    };

    /*
      Handles a click on the song played progress bar.
    */
    this.$('.audio-player__progress-bar').click(function( e ){
      var offset = this.getBoundingClientRect();
      var x = e.pageX - offset.left;

      Amplitude.setSongPlayedPercentage( ( parseFloat( x ) / parseFloat( this.offsetWidth) ) * 100 );
    });
  },

  initializeScoreViewer() {
    var scoreModule = {
      ratio: 1.585,
      init: function (id, pageOffset) {
        var _this = this;

        // if older browser then don't run javascript
        if (document.addEventListener) {
          this.el = document.getElementById(id);
          this.pageOffset = pageOffset;
          //this.resize();
          this.initializeTurn();


          // // on window resize, update the plugin size
          // window.addEventListener('resize', function (e) {
          // 	var size = _this.resize();
          // 	$(_this.el).turn('size', size.width, size.height);
          // });
        }
      },
      resize: function () {
        // reset the width and height to the css defaults
        this.el.style.width = '';
        this.el.style.height = '';

        var availWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        var availHeight = viewportHeight - 136; // leave room for audio player

        var width, height;

        if ((availWidth / availHeight) >= this.ratio) {
          // we have more width than we need, height should limit
          height = availHeight;
          width = Math.round(height * this.ratio);
        } else {
          // we have more height than we need, width should limit;
          width = availWidth;
          height = Math.round(width / this.ratio);
        }

        // set the width and height matching the aspect ratio
        this.el.style.width = width + 'px';
        this.el.style.height = height + 'px';

        return {
          width: width,
          height: height
        };
      },
      initializeTurn: function () {
        // Check if the CSS was already loaded
        var flipbook = $(this.el);

        if (flipbook.width()==0 || flipbook.height()==0) {
          setTimeout(this.initializeTurn, 10);
          return;
        }

        flipbook.turn({
          elevation: 50,
          acceleration: true, //TODO: isChrome,
          autoCenter: false,
          gradients: true,
          duration: 3000,
          page: 1 + this.pageOffset,
          pages: 6,
          when: {
            start: function(event, pageObject, corner) {
              if (pageObject.next==1)
              event.preventDefault();
            },
            turning: function(event, page, view) {
              if (page==1)
              event.preventDefault();
            }
          }
        });
      }
    };
  }
});
