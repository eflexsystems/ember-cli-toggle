import Ember from 'ember';
import layout from './template';

const { computed } = Ember;

export default Ember.Component.extend({
  layout: layout,
  tagName: 'span',
  classNameBindings: ['toggled:x-toggle-container-checked', 'disabled:x-toggle-container-disabled'],
  classNames: ['x-toggle-container'],
  disabled: false,
  value: false,
  toggled: false,
  name: 'default',

  onLabelValue: computed('onLabel', function () {
    var on = this.get('onLabel');
    var index = on.indexOf(':');

    return index > -1 ? on.substr(0, index) : on;
  }),

  offLabelValue: computed('offLabel', function () {
    var off = this.get('offLabel');
    var index = off.indexOf(':');

    return index > -1 ? off.substr(0, index) : off;
  }),

  themeClass: computed('theme', function () {
    var theme = this.get('theme') || 'default';

    return 'x-toggle-' + theme;
  }),

  forId: computed(function () {
    return this.get('elementId') + '-x-toggle';
  }),

  didUpdateAttrs: function({newAttrs, oldAttrs}) {
    if (!oldAttrs) {
      oldAttrs = {};
    }

    var offIndex = this.get('offLabel').indexOf(':');
    var onIndex = this.get('onLabel').indexOf(':');
    var offState = offIndex > -1 ? this.get('offLabel').substr(offIndex + 1) : false;
    var onState = onIndex > -1 ? this.get('onLabel').substr(onIndex + 1) : true;

    if (newAttrs.toggled !== oldAttrs.toggled) {
      if (newAttrs.toggled === false) {
        newAttrs.value = offState;
      } else {
        newAttrs.value = onState;
      }
    } else if (newAttrs.value !== oldAttrs.value) {
      if (newAttrs.value === onState) {
        newAttrs.toggled = true;
      } else {
        newAttrs.toggled = false;
        newAttrs.value = offState;
      }
    }

    this._super(...arguments);
  },

  click(event) {
    event.stopPropagation();
  },

  actions: {
    checkedChanged: function(e) {
      this.sendAction('toggle', e);
    }
  }
});
