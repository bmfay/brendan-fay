/* global Amplitude */
import Component from '@ember/component';
import $ from "jquery"
import ENV from 'brendan-fay/config/environment';
import { computed } from '@ember/object';

export default Component.extend({
  composition: null,

  sortedPages: computed('composition.score.pages.@each.pageNumber', function() {
    return this.composition.score.pages.sortBy('pageNumber');
  }),
  oddPages: computed('sortedPages.@each.beginTime', function() {
    return this.sortedPages.filter(page => (page.pageNumber % 2) == 1);
  }),

  didInsertElement() {
    const INITIAL_PAGE_OFFSET = 1;
    const $flipbook = this.$(".score");

    this.initializeScoreViewer($flipbook[0], INITIAL_PAGE_OFFSET)

    const oddPages = this.oddPages.toArray();
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
      soundcloud_client: ENV.soundcloudClientId,

			"callbacks": {
        'time_update': function(){
					const currentTime = Amplitude.getSongPlayedSeconds();
					const currentPageNumber = $flipbook.turn("page");
					oddPages.forEach(function(page, index) {
						const pageNumber = page.pageNumber + INITIAL_PAGE_OFFSET;

						if (currentTime > page.beginTime && currentPageNumber !== pageNumber) {
							if (index == (oddPages.length - 1)) {
								$flipbook.turn("page", pageNumber)
							} else if (currentTime < oddPages[index + 1].time) {
								$flipbook.turn("page", pageNumber)
							}
						}
					});
				}
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
  },

  initializeScoreViewer(scoreElement, pageOffset) {
    const scoreModule = {
      ratio: 1.585,
      init: function (element, pageOffset, totalPages) {
        const _this = this;

        // if older browser then don't run javascript
        if (document.addEventListener) {
          this.el = element;
          this.pageOffset = pageOffset;
          this.resize();
          this.initializeTurn(totalPages);


          // on window resize, update the plugin size
          window.addEventListener('resize', function () {
            const size = _this.resize();
            $(_this.el).turn('size', size.width, size.height);
          });
        }
      },
      resize: function () {
        // reset the width and height to the css defaults
        this.el.style.width = '';
        this.el.style.height = '';

        const availWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        const availHeight = viewportHeight - 140; // leave room for audio player

        let width, height;

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
      initializeTurn: function (totalPages) {
        // Check if the CSS was already loaded
        const $flipbook = $(this.el);

        if ($flipbook.width()==0 || $flipbook.height()==0) {
          setTimeout(this.initializeTurn, 10);
          return;
        }

        $flipbook.turn({
          elevation: 50,
          acceleration: true, //TODO: isChrome,
          autoCenter: false,
          gradients: true,
          duration: 3000,
          page: 1 + this.pageOffset,
          pages: totalPages,
          when: {
            start: function(event, pageObject) {
              if (pageObject.next==1)
              event.preventDefault();
            },
            turning: function(event, page) {
              if (page==1)
              event.preventDefault();
            }
          }
        });
      }
    };

    scoreModule.init(scoreElement, pageOffset, this.composition.score.pages.length);
  }
});
