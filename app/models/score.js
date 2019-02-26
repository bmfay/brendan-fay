import DS from 'ember-data';

const {
  belongsTo,
  hasMany,
} = DS;

export default DS.Model.extend({
  composition: belongsTo('composition'),
  pages: hasMany('page', {async: false}),
});
