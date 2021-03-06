# Pre Install
1. Make sure you have Node installed.
2. Make sure you have Grunt CLI installed globally.


# Install
Step 1: Clone the project.
```shell
git clone https://github.com/Taube/grunt-sharp-imagemin.git
```
Step 2: Install the dependencies
```shell
cd grunt-sharp-imagemin
npm install
```

# Usage
Create 1x and 2x versions of your 3x retina images incl. webp.
```shell
grunt retina
```

Created Smartcrop version of your LG breapoint Hero image
```shell
grunt hero
```

## Learn more
Sharp:
https://github.com/lovell/sharp

Smartcrop:
https://github.com/jwagner/smartcrop.js


## Example
```js
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
```

## Set up Windows 10 to work with Sharp

### 1. Install Windows Build Tools
If you're using Windows you can now install all node-gyp dependencies with single command (As Administrator):
DOCS: https://github.com/felixrieseberg/windows-build-tools
```shell
$ npm install --global --production windows-build-tools
```

### 2. Install Node Build Tools
DOCS: https://github.com/nodejs/node-gyp
```shell
$ npm install --global node-gyp
```

### 3. Install Windows SDK version 8.1
Creating A C++ (Desktop) project in VS2015.
Basically, when u choose to create a c++ project, VS2015 will ask you to install a certain component, you just let it install.
The issue will get fixed. VS2015 on Win10)