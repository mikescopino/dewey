// The methods in this object get used by gulp-compile-handlebars as individual helpers
module.exports = {
  navClass: function(index) {
    var navClass = '';
    if (index.data.root.home) {
      navClass = 'home';
    }
    return navClass;
  },
  overview: function(index) {
    var template = index.data.root.section + '-overview';
    return template;
  },
  detail: function(index) {
    var template = index.data.root.section + '-detail';
    return template;
  },
  isOdd: function(index, options) {
   if (index%2 == 0) {
      return options.fn(this);
   }
   else {
      return options.inverse(this);
   }
  }
}
