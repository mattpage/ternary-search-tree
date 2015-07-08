'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({

    settings: {
    },

    clean: {
      node: ['./node_modules'],
      docs: ['./docs'],
      coverage: {
        src: ['./coverage']
      }
    },

    env : {
      options : {
      },
      test : {
        NODE_ENV : 'test'
      }
    },

    exec: {
      istanbul: {
        cmd: function () {
          var files = grunt.file.expand('tests/*.js');
          var cover = 'istanbul cover --x "" node_modules/mocha/bin/_mocha -- --timeout 60000 --reporter spec ' + files.join(' ');
          var report = 'istanbul' + ' report ' + 'cobertura';
          return cover + ' && ' + report;
        }
      }
    },

    cafemocha: {
      options: {
        reporter: (process.env.MOCHA_REPORTER || 'spec'),
        timeout: 20000,
        colors: true,
        debug: true
      },
      all: {
        src: ['tests/*.js', '!node_modules/**/*.js']
      }
    },

    jsdoc : {
      dist : {
        src: ['*.js', '!Gruntfile.js'],
        options: {
          destination: 'docs'
        }
      }
    }

  });

  grunt.registerTask('test', 'Run Tests', function () { grunt.task.run(['env:test', 'cafemocha:all']); });
  grunt.registerTask('coverage', ['clean:coverage', 'env:test', 'exec:istanbul']);
  grunt.registerTask('docs', [ 'clean:docs', 'jsdoc' ]);
  grunt.registerTask('default', ['test']);

};

