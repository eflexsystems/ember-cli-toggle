import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from './template';

export default Component.extend({
  layout: layout,
  tagName: 'span',
  classNameBindings: ['value:x-toggle-container-checked', 'disabled:x-toggle-container-disabled'],
  classNames: ['x-toggle-container'],
  disabled: false,
  value: false,
  name: 'default',

  themeClass: computed('theme', function () {
    var theme = this.get('theme') || 'default';

    return 'x-toggle-' + theme;
  }),

  forId: computed(function () {
    return this.get('elementId') + '-x-toggle';
  }),

  click(event) {
    event.stopPropagation();
  },

  actions: {
    checkedChanged: function(value) {
      if (this.attrs.onToggle) {
        this.attrs.onToggle(value)
      }
    }
  }
});
