import DS from 'ember-data';
import { htmlSafe } from "@ember/string"
import { computed } from "@ember/object"

const {
  attr,
  belongsTo,
} = DS;

export default DS.Model.extend({
  description: attr('string'),
  title: attr('string'),

  score: belongsTo('score', {async: false}),
  recording: belongsTo('recording', {async: false}),

  descriptionHtmlSafe: computed('description', function() {
    return htmlSafe(this.description);
  })
});
