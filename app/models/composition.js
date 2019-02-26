import DS from 'ember-data';

const {
  attr,
  belongsTo,
} = DS;

export default DS.Model.extend({
  description: attr('string'),
  title: attr('string'),

  score: belongsTo('score', {async: false}),
  recording: belongsTo('recording', {async: false}),
});
