'use strict';

var cp = require('child_process');

module.exports = function(grunt)
{
	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// build
	grunt.registerTask('default', ['build', 'publish']);
	grunt.registerTask('build', ['clean:dist', 'build-js', 'build-css', 'copy']);
	grunt.registerTask('build-js', ['jshint', 'concat:js', 'concat:vendor', 'uglify']);
	grunt.registerTask('build-css', ['less:dist', 'concat:css', 'cssmin', 'clean:tmp']);
	grunt.registerTask('publish', ['ftp_push:prod']);
	grunt.registerTask('publish-wordpress', ['ftp_push:wordpress']);

	var config = {
		// variables
		paths: {
			src: 'src',
			dist: 'dist',
			tmp: 'tmp'
		},
		// target configs
		clean: {
			dist: ['<%= paths.dist %>'],
			tmp: ['<%= paths.tmp %>']
		},
		jshint: {
			all: ['<%= paths.src %>/**/*.js']
		},
		concat: {
			js: {
				src: ['<%= paths.src %>/**/*.js'],
				dest: '<%= paths.dist %>/js/beaches.js'
			},
			vendor: {
				src: [
					'bower_components/jquery/dist/jquery.min.js',
					'bower_components/angular/angular.min.js',
					'bower_components/angular-route/angular-route.min.js'
				],
				dest: '<%= paths.dist %>/js/vendor.min.js'
			},
			css: {
				src: ['<%= paths.tmp %>/**/*.css'],
				dest: '<%= paths.dist %>/css/beaches.css'
			}
		},
		uglify: {
			dist: {
				options: {
					sourceMap: true,
					sourceMapName: '<%= paths.dist %>/js/beaches.min.js.map'
				},
				files: {
					'<%= paths.dist %>/js/beaches.min.js': ['<%= paths.dist %>/js/beaches.js']
				}
			}
		},
		copy: {
			img: {
				files: [
					{
						expand: true,
						cwd: '<%= paths.src %>/img',
						src: '**',
						dest: '<%= paths.dist %>/img/'
					}
				]
			},
			partials: {
				files: [
					{
						expand: true,
						cwd: '<%= paths.src %>/partials',
						src: '**',
						dest: '<%= paths.dist %>/partials/'
					}
				]
			},
			fonts: {
				files: [
					{
						expand: true,
						cwd: '<%= paths.src %>/fonts',
						src: '**',
						dest: '<%= paths.dist %>/fonts/'
					}
				]
			}
		},
		less: {
			dist: {
				files: [
					{
						expand: true,
						cwd: '<%= paths.src %>/',
						src: ['**/*.less'],
						dest: '<%= paths.tmp %>',
						ext: '.css'
					}
				]
			}
		},
		cssmin: {
			minify: {
				files: {
					'<%= paths.dist %>/css/beaches.min.css': ['<%= paths.dist %>/css/beaches.css']
				}
			}
		},
		watch: {
		  everything: {
		    files: [
		    	'<%= paths.src %>/js/**/*.js',
		    	'<%= paths.src %>/less/**/*.less',
		    	'<%= paths.src %>/partials/**/*.html'
		    ],
		    tasks: ['build'],
		    options: {
		      spawn: false,
		    },
		  },
		},
		ftp_push: {
			prod: {
				options: {
					authKey: "beaches",
					host: "af7.75f.myftpupload.com",
					dest: "/beaches2/",
					port: 21
				},
				files: [
					{
						expand: true,
						cwd: '.',
						src: [
							"index.html",
							"dist/**"
						]
					}
				]
			},
			wordpress: {
				options: {
					authKey: "beaches",
					host: "af7.75f.myftpupload.com",
					dest: "/wordpress/",
					port: 21
				},
				files: [
					{
						expand: true,
						cwd: 'wordpress',
						src: [
							"**/*"
						]
					}
				]
			}
		}
	};

	grunt.initConfig(config);

};
