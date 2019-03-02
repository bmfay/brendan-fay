import Component from '@ember/component';
import { computed } from '@ember/object';
import { set } from "@ember/object";

export default Component.extend({
  composition: null,
  score: computed.reads('composition.score'),
  initialPageOffset: 1,
  ratio: 1.585,
  audioPlayerRoom: 140,
  shouldAutoResize: true,
  isPreview: false,
  scoreClass: '',
  isPlaying: false,

  sortedPages: computed('score.pages.@each.pageNumber', function() {
    const sortedPages = this.score.pages.sortBy('pageNumber');
    if (this.isPreview) {
      return sortedPages.filter((page, index) => index < 2);
    } else {
      return sortedPages;
    }
  }),
  sortedOddPagesArray: computed('sortedPages.@each.beginTime', function() {
    return this.sortedPages.filter(page => (page.pageNumber % 2) == 1).toArray();
  }),
  showExtraBlankPage: computed('sortedPages.[]', function() {
    return (this.sortedPages.length % 2) == 1;
  }),
  totalPageCount: computed('showExtraBlankPage', 'score.pages.[]', 'initialPageOffset', function() {
    const basePageCount = this.score.pages.length + this.initialPageOffset;
    return this.showExtraBlankPage ? basePageCount + 1 : basePageCount;
  }),

  didInsertElement() {
    const $scoreEl = this.$(".score");
    if (this.shouldAutoResize) {
      const _this = this;

      this.resize($scoreEl[0]);

      // on window resize, update the plugin size
      window.addEventListener('resize', function () {
        const size = _this.resize($scoreEl[0]);
        $scoreEl.turn('size', size.width, size.height);
      });
    }

    this.initializeTurn($scoreEl);
  },

  resize: function (scoreEl) {
    // reset the width and height to the css defaults
    scoreEl.style.width = '';
    scoreEl.style.height = '';

    const availWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const availHeight = viewportHeight - this.audioPlayerRoom; // leave room for audio player

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
    scoreEl.style.width = width + 'px';
    scoreEl.style.height = height + 'px';

    return {
      width: width,
      height: height
    };
  },

  initializeTurn: function ($score) {
    const _this = this;

    if ($score.width()==0 || $score.height()==0) {
      setTimeout(this.initializeTurn, 10);
      return;
    }

    $score.turn({
      elevation: 50,
      acceleration: true, //TODO: isChrome,
      autoCenter: false,
      gradients: true,
      duration: 3000,
      disabled: true,
      page: 1 + _this.initialPageOffset,
      pages: _this.totalPageCount,
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

    if (!this.isPreview) {
      $score.find('.odd').click(() => {
        if (!$score.turn('animating') && !_this.isPlaying) {
          $score.turn("next");
        }
      });
      $score.find('.even').click(() => {
        if (!$score.turn('animating') && !_this.isPlaying) {
          $score.turn("previous");
        }
      });
    }
  },

  actions: {
    handleRecordingPlay() {
      this.$(".score").turn("allowManualPageTurn", false);
      set(this, 'isPlaying', true);
    },
    handleRecordingStop() {
      this.$(".score").turn("allowManualPageTurn", true);
      set(this, 'isPlaying', false);
    },

    handleRecordingTimeUpdate(timeInSeconds) {
      const oddPages = this.sortedOddPagesArray;
      const $score = this.$(".score");
      const currentPageNumber = $score.turn("page");
      const _this = this;

      oddPages.forEach(function(page, index) {
        const pageNumber = page.pageNumber + _this.initialPageOffset;

        if (timeInSeconds > page.beginTime && currentPageNumber !== pageNumber) {
          if (index == (oddPages.length - 1)) {
            $score.turn("page", pageNumber)
          } else if (timeInSeconds < oddPages[index + 1].beginTime) {
            $score.turn("page", pageNumber)
          }
        }
      });
    }
  }
});
