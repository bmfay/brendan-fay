import DS from 'ember-data';

const {
  attr,
  belongsTo
} = DS;

export default DS.Model.extend({
  url: attr('string'),
  recordedOn: attr('date'),
  isSoundcloud: attr('boolean'),

  composition: belongsTo('composition')
});
