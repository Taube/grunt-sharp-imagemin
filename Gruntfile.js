module.exports = function(grunt) {
	'use strict';

	var mozjpeg = require('imagemin-mozjpeg');

	grunt.initConfig({
		env: {
			dev: {
				VIPS_WARNING: 0
			}
		},
		express: {
		 	dev: {
		 		options: {
		 			script: 'server.js',
		 		}
		 	}
		},
		watch: {
			express: {
				files:  [ 'index.html', 'dist/**/*.js' ],
				tasks:  [ 'express:dev' ],
				options: {
					spawn: false
				},
				public: {
					files: ['dist/**/*.js']
				}
			}
		},
		modernizr: {
			dist: {
				'crawl': false,
				'customTests': [],
				'dest': 'dist/modernizr.js',
				'tests': [
					'webp'
				],
				'options': [
					'setClasses'
				],
				'uglify': true
			}
		},
		imagemin: {
			retina: {
				files: [{
					expand: true,
					cwd: 'resize/retina/',
					src: ['**/*.{png,jpg,gif,webp}'],
					dest: 'dist/retina/'
				}]
			},
			hero: {
				files: [{
					expand: true,
					cwd: 'resize/hero/',
					src: ['**/*.{png,jpg,gif,webp}'],
					dest: 'dist/hero/'
				}]
			}
		},
		sharp: {
			retina: {
				files: [{
					expand: true,
					cwd: 'src/retina/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'resize/retina/'
				}],
				options: {
					tasks: [
						{ resize: '3x', rename: '{base}_3x.{ext}' },
						{ resize: '3x', rename: '{base}_3x.webp' },
						{ resize: '2x', rename: '{base}_2x.{ext}' },
						{ resize: '2x', rename: '{base}_2x.webp' },
						{ resize: '1x', rename: '{base}.{ext}' },
						{ resize: '1x', rename: '{base}.webp' }
					]
				}
			},
			hero: {
				files: [{
					expand: true,
					cwd: 'src/hero/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'resize/hero/'
				}],
				options: {
					tasks: [
						{ smartcrop: true, resize: [2000, 847], rename: '{base}-lg.{ext}',	overlayWith: ['src/black_04.png', { tile: true }] },
						{ smartcrop: true, resize: [2000, 847], rename: '{base}-lg.webp', 	overlayWith: ['src/black_04.png', { tile: true }] },
						{ smartcrop: true, resize: [1300, 700], rename: '{base}-md.{ext}', 	overlayWith: ['src/black_04.png', { tile: true }] },
						{ smartcrop: true, resize: [1300, 700], rename: '{base}-md.webp', 	overlayWith: ['src/black_04.png', { tile: true }] },
						{ smartcrop: true, resize: [1000, 600], rename: '{base}-sm.{ext}', 	overlayWith: ['src/black_04.png', { tile: true }] },
						{ smartcrop: true, resize: [1000, 600], rename: '{base}-sm.webp', 	overlayWith: ['src/black_04.png', { tile: true }] },
						{ smartcrop: true, resize: [600, 600], rename: '{base}-xs.{ext}', 	overlayWith: ['src/black_04.png', { tile: true }] },
						{ smartcrop: true, resize: [600, 600], rename: '{base}-xs.webp', 	overlayWith: ['src/black_04.png', { tile: true }] }
					]
				}
			}
		}
	});

	// Image optimization
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-sharp');
	grunt.loadNpmTasks('grunt-env');

	// Demo servewr tasks
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks("grunt-modernizr");

	// Generate production images
	grunt.registerTask('default', ['imagemin']);
	grunt.registerTask('retina', ['env:dev', 'sharp:retina', 'imagemin:retina']);
	grunt.registerTask('hero', ['env:dev', 'sharp:hero', 'imagemin:hero']);

	// Run a simple server to test the production images
	grunt.registerTask('server', ['modernizr', 'express:dev', 'watch']);
};