import DS from 'ember-data';

const {
  hasMany,
  attr,
} = DS;

export default DS.Model.extend({
  creationDate: attr('date'),
  title: attr('string'),
  description: attr('string'),

  photos: hasMany('photo', {async: false}),
});
