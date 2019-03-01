import Controller from "@ember/controller"
import Component from "@ember/component"

const shared = {
  actions: {
    delete(model) {
      model = model.content || model;

      if (confirm('Are you sure you want to delete this?')){
        if (model.isSaving) {
          model.one('didUpdate', () => {
            return model.destroyRecord();
          });

          model.one('didCreate', () => {
            return model.destroyRecord();
          });
        } else {
          return model.destroyRecord();
        }
      }
    },

    save(model) {
      model = model.content || model;
      return model.save();
    },
  }
};

export function initialize() {
  Component.reopen(shared);
  Controller.reopen(shared);
}

export default {
  name: 'global-actions',
  initialize
};
