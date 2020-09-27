const sass = require('node-sass');
module.exports = function (grunt) {
  // Configurable paths
  var config = {
    src: 'src',
    dist: 'build'
  };
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // uglify: {
    //   options: {
    //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    //   },
    //   build: {
    //     src: 'src/factorial.js',
    //     dest: 'build/factorial.min.js'
    //   }
    // },
    watch: {
      sass: {
        files: ['src/sass/**/*.{scss,sass}', 'src/sass/_partials/**/*.{scss,sass}', 'src/css/**/*.css'],
        tasks: ['sass:dist', 'cssmin']
      },
      javascript: {
        files: ['src/js/**/*.js'],
        tasks: ['concat', 'uglify']
      },
      livereload: {
        files: [
          './Gruntfile.js',
          'build/*.html',
          'build/js/**/*.{js,json}',
          'build/css/*.css',
          'build/img/**/*.{png,jpg,jpeg,gif,webp,svg}'],
        options: {
          livereload: true
        }
      }
    },
    sass: {
      options: {
        implementation: sass,
        sourceMap: true,
        outputStyle: 'compressed'
      },
      dist: {
        files: {
          'build/css/main.min.css': 'src/sass/main.scss'
        }
      }
    },
    cssmin: {
      deps: {
        src: [
          'src/css/slider-pro.min.css',
          'src/fonts/roboto/stylesheet.css',
          'src/css/owl.carousel.css'
        ],
        dest: 'build/css/vendor.css'
      },
      main: {
        files: [{
          expand: true,
          cwd: 'build/css/',
          src: ['*.css', '!*.min.css'],
          dest: 'build/css/',
          ext: '.min.css'
        }]
      }
    },
    concat: {
      options: {
        seperator: '\n\n',
        sourceMap: false,
        stripeBanners: true,
        banner: '/*!<%= pkg.name %> - v<%= pkg.version %> - ' + ' <%= grunt.template.today("yyyy-mm-dd") %> */',
      },
      dist: {
        src: ['src/js/jquery.min.js',
          'src/js/script.js'
        ],
        dest: 'build/js/ish.js',
      },
      deps: {
        src: [
          'src/js/plugins/jquery.jquery.parallax-1.1.3.js',
          'src/js/plugins/jquery.sliderPro.min.js',
          'src/js/plugins/owl.carousel.js',
          'src/js/plugins/TweenMax.min.js',
          'src/js/plugins/ScrollMagic.min.js',
          'src/js/plugins/animation.gsap.min.js',
          'src/js/plugins/debug.addIndicators.min.js',
          'src/js/plugins/jquery.easing.min.js',
          'src/js/app.js'
        ],
        dest: 'build/js/vendor.js'
      },
    },
    uglify: {
      options: {
        manage: false,
        sourceMap: true,
        preserveComments: 'all',
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      // Following task will take all the js in "dest/js" folder and combine in one minifyed js
      minifyalljs: {
        files: {
          'build/js/app_ish.min.js': ['build/js/ish.js', 'build/js/vendor.js']
        }
      }
    },
    imagemin: {
      // static: {
      //     options: {
      //         optimizationLevel: 3,
      //         svgoPlugins: [{removeViewBox: false}],
      //         use: [mozjpeg()] // Example plugin usage 
      //     },
      //     files: {
      //         'build/img.png': 'src/img.png',
      //         'build/img.jpg': 'src/img.jpg',
      //         'build/img.gif': 'src/img.gif'
      //     }
      // },
      dynamic: {
        files: [{
          expand: true,
          cwd: 'src/images',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'build/images/tiny/'
        }]
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: ['build/js/*.js', 'build/css/*.css', 'build/*.html']
        },
        options: {
          watchTask: true,
          server: 'build/'
        }
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  // Default task(s).
  // grunt.registerTask('default', ['uglify']);
  grunt.registerTask('start', ['browserSync', 'watch', 'sass:dist', 'imagemin:dynamic']);
  grunt.registerTask('default', ['sass:dist', 'concat', 'uglify', 'imagemin:dynamic']);

};
