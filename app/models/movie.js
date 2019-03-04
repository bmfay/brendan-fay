import DS from 'ember-data';

const {
  attr,
} = DS;

export default DS.Model.extend({
  url: attr('string'),
  title: attr('string'),
  description: attr('string'),
  creationDate: attr('date'),
});
