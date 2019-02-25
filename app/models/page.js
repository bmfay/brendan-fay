import DS from 'ember-data';

const {
  attr,
  belongsTo,
} = DS;

export default DS.Model.extend({
  beginTime: attr('number'),
  url: attr('string'),

  score: belongsTo('score')
});
