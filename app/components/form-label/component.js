import Component from '@ember/component';

import {
  computed,
} from '@ember/object';

export default Component.extend({
  classNameBindings: ['isInvalid:is-invalid'],
  errors: null,
  label: '',
  tagName: 'label',
  type: 'textfield',
  displayErrors: true,
  errorBelow: false,

  isInvalid:  computed.notEmpty('errors'),
  errorMessages: computed('errors.@each.message', function(){
    return this.errors.map((msg) => msg.message ).join(', ');
  }),
});
