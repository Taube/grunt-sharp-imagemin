module.exports = function(grunt) {
	'use strict';

	// var mozjpeg = require('imagemin-mozjpeg');

	grunt.initConfig({
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'resize/',
					src: ['**/*.{png,jpg,gif,webp}'],
					dest: 'dist/'
				}]
			},
			retina: {
				files: [{
					expand: true,
					cwd: 'resize/retina/',
					src: ['**/*.{png,jpg,gif,webp}'],
					dest: 'dist/'
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
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-sharp');

	grunt.registerTask('default', ['imagemin']);

	// Generate and minify all images with retina input.
	grunt.registerTask('retina', ['sharp:retina', 'imagemin:retina']);
};