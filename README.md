# Dewey #
I wanted to be able to create sites and prototypes quickly without building out a full application. I wanted to capitalize on:

- Content separated from HTML
- Reusable components
- Compiling and compressing SASS and Javascript files.

Dewey uses Gulp to combine Handlebars templates with JSON data into HTML files. A simple Express server is then used to deliver the files.

---

### Local Environment Setup ###

Create a local environment to Gulp within.

1. Install Gulp
```$ sudo npm install -g gulp```

2. Install required plugins
```
npm install body-parser
npm install express
npm install gulp
npm install gulp-autoprefixer
npm install gulp-compile-handlebars
npm install gulp-concat
npm install gulp-connect
npm install jshint
npm install gulp-jshint
npm install gulp-jsonlint
npm install gulp-live-server
npm install gulp-merge-json
npm install gulp-rename
npm install gulp-sass
npm install gulp-uglify
npm install ansi-colors
npm install fancy-log
```

3. Run the server
```$ gulp```
