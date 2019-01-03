// The methods in this object get used by gulp-compile-handlebars as individual helpers
module.exports = {

  selectTemplate: function(template) {
    return template;
  },
  component: function(index) {
    var template = index.component;
    return template;
  },
  rowStart: function(index, grid) {
    var i = index + 1;
    var x = 1;
    switch (grid) {
      case 'two':
        x = 2;
        break;
      case 'three':
        x = 3;
        break;
      case 'four':
        x = 4;
        break;
    }
    if (i%x == 1) {
      return '<div class="row">\n';
    }
  },
  rowEnd: function(index, grid, length) {
    var i = index + 1;
    var x = 1;
    switch (grid) {
      case 'two':
        x = 2;
        break;
      case 'three':
        x = 3;
        break;
      case 'four':
        x = 4;
        break;
    }

    if (i%x == 0 || i == length) {
      return '</div>\n';
    }
  },
  isOdd: function(index, options) {
   if (index%2 == 0) {
      return options.fn(this);
   }
   else {
      return options.inverse(this);
   }
  },
  year: function(index) {
    var d = new Date();
    return d.getFullYear();
  }
}
