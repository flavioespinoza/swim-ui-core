require('./style.less');
tag('x-mdl-progress-bar', {
  template: require('./template.html'),
  methods: {
    setProgress: function(value) {
        $('.mdl-progress', this)[0].MaterialProgress.setProgress(value);
    }
  }
});