module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

      /*
         1. Je configure ma tâche
         (la doc de chaque package vous fournira les options disponibles)
      */
      concat: {
        options: {
          separator: ';',
        },
        dist: {
          src: ['src/form.js', 'src/algorithm.js','src/needlemanwunsch.js','src/smithwaterman.js','src/timelapse.js','src/display.js'],
          dest: 'dist/app.concat.js'
        }
      },
   
    uglify: {
        options: {
          separator: ';',
        },
        dist: {
          src: ['src/form.js', 'src/algorithm.js','src/needlemanwunsch.js','src/smithwaterman.js','src/timelapse.js','src/display.js'],
          dest: 'dist/app.min.js'
        }
      }
    });




      // 2. Je charge ma tâche
      grunt.loadNpmTasks('grunt-contrib-concat');
      grunt.loadNpmTasks('grunt-contrib-uglify');

      // J'assigne ma tâche à la commande par défaut de Grunt
      grunt.registerTask('default', ['concat:dist']);
            grunt.registerTask('prod', ['uglify:dist']);
};
