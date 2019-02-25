import DS from 'ember-data';

const {
  attr,
  belongsTo
} = DS;

export default DS.Model.extend({
  url: attr('string'),
  recordedOn: attr('date'),

  composition: belongsTo('composition')
});
