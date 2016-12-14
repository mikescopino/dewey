# Local Environment Setup #

Create a local environment to Gulp within.

1. Check for node
```$ node -v```

if !current:
```
$ sudo npm cache clean -f
$ sudo npm install -g n
$ sudo npm n stable
```

2. Check for npm
```$ npm -v```

if !current:
```$ sudo npm install npm@latest -g```

3. Install Gulp
```$ sudo npm install -g gulp```

4. Install required plugins
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

4. Run the server
```$ gulp```
