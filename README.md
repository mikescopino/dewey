# Dewey #
I wanted to be able to create sites and prototypes quickly without building out a full application environment. I did want the benefit of content separated from my HTML, reusable components, and to compile/compress SASS and Javascript files.

Dewey uses Gulp to combine Handlebars templates with JSON data into HTML files. A simple Express server is then used to deliver the files. 

---

### Local Environment Setup ###

Create a local environment to Gulp within.

1. Install Gulp
```$ sudo npm install -g gulp```

2. Install required plugins
```
$ sudo npm install gulp-autoprefixer
$ sudo npm install gulp-compile-handlebars
$ sudo npm install gulp-concat
$ sudo npm install gulp-connect
$ sudo npm install gulp-jshint
$ sudo npm install gulp-jsonlint
$ sudo npm install gulp-live-server
$ sudo npm install gulp-merge-json
$ sudo npm install gulp-rename
$ sudo npm install gulp-sass
$ sudo npm install gulp-uglify
$ sudo npm install gulp-util

$ sudo npm install express
$ sudo npm install body-parser
$ sudo npm install gulp
$ sudo npm install jshint
$ sudo npm install nodemailer
```

3. Run the server
```$ gulp```
