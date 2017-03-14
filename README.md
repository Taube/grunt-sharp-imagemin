# Set up Windows 10 to work with Sharp

## 1. Install Windows Build Tools
If you're using Windows you can now install all node-gyp dependencies with single command (As Administrator):
DOCS: https://github.com/felixrieseberg/windows-build-tools
$ npm install --global --production windows-build-tools

## 2. Install Node Build Tools
DOCS: https://github.com/nodejs/node-gyp
$ npm install --global node-gyp

## 3. Install Windows SDK version 8.1
Creating A C++ (Desktop) project in VS2015.
Basically, when u choose to create a c++ project, VS2015 will ask you to install a certain component, you just let it install.
The issue will get fixed. VS2015 on Win10)