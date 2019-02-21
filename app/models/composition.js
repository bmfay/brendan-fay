import DS from 'ember-data';

const {
  attr
} = DS;

export default DS.Model.extend({
    description: attr('string'),
    url: attr('string'),
    title: attr('string'),
});
