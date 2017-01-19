'use strict';
module.exports = function (grunt) {
    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    sourcemap: 'none'
                },
                files: {
                    'css/box.css': 'scss/style.scss'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
}