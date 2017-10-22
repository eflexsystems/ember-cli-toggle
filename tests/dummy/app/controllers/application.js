import Controller from '@ember/controller';

export default Controller.extend({
	boundToggle: false,
	bT2: false,

	actions: {
		checkboxToggled(toggled, toggledBy) {
			this.setProperties({
        toggled, toggledBy
      });
		}
	}
});
