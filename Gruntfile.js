module.exports = function(grunt) {
	'use strict';

	// var mozjpeg = require('imagemin-mozjpeg');

	grunt.initConfig({
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
						{ smartcrop: true, resize: [2000, 847], rename: '{base}-lg.{ext}' },
						{ smartcrop: true, resize: [2000, 847], rename: '{base}-lg.webp' },
						{ smartcrop: true, resize: [1300, 700], rename: '{base}-md.{ext}' },
						{ smartcrop: true, resize: [1300, 700], rename: '{base}-md.webp' },
						{ smartcrop: true, resize: [1000, 600], rename: '{base}-sm.{ext}' },
						{ smartcrop: true, resize: [1300, 600], rename: '{base}-md.webp' },
						{ smartcrop: true, resize: [600, 600], rename: '{base}-xs.{ext}' },
						{ smartcrop: true, resize: [600, 600], rename: '{base}-xs.webp' }
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
	grunt.registerTask('hero', ['sharp:hero'], 'imagemin:hero');
};