# Realtime Chatroom [![TravisCI Build Status](https://travis-ci.org/772807886/RealtimeChatroom.svg?branch=master)](https://travis-ci.org/772807886/RealtimeChatroom) [![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/wxofgb271nx61x32?svg=true&retina=true)](https://ci.appveyor.com/project/LimingJin/realtimechatroom) [![Coverage Status](https://coveralls.io/repos/github/772807886/RealtimeChatroom/badge.svg?branch=master)](https://coveralls.io/github/772807886/RealtimeChatroom?branch=master) [![Coverity Scan Build Status](https://scan.coverity.com/projects/10321/badge.svg)](https://scan.coverity.com/projects/772807886-realtimechatroom)
[![Developing](https://img.shields.io/badge/Realtime%20Chatroom-developing-yellow.svg)](https://github.com/772807886/RealtimeChatroom)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/772807886/RealtimeChatroom/start/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/772807886/RealtimeChatroom.svg)](https://github.com/772807886/RealtimeChatroom/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/772807886/RealtimeChatroom.svg)](https://github.com/772807886/RealtimeChatroom/network)
[![GitHub issues](https://img.shields.io/github/issues/772807886/RealtimeChatroom.svg)](https://github.com/772807886/RealtimeChatroom/issues)

A realtime chatroom service based on websocket, written in Javascript(ES6) and run with Node.JS.

# Before install
1. Make sure you have Node.JS (Version 6+) installed.
2. Make sure you have MongoDB installed.
3. Make sure `npm` was in your system PATH.
4. Make sure you have a C++ build tools installed (For some dependencies required).

# Install
* Firstly, Clone this repository using git.
```
git clone https://github.com/772807886/RealtimeChatroom.git
cd RealtimeChatroom
```

* Secondly, Restore dependency modules.
```
npm install
```
> Note: This may failure if you're using the latest release of Visual Studio 2015, you need to update your `npm` package to the latest version.
>
> `npm i npm@latest -g`
>
> *See Also: [https://github.com/nodejs/node-gyp/issues/802#issuecomment-232865395](https://github.com/nodejs/node-gyp/issues/802#issuecomment-232865395)*

* Thirdly, Make sure your MongoDB server was running.

* Fourthly(Optional), Make a test for this project.
```
npm test
```
OR test with coverage report.
```
npm run cov
```

* Fifthly, Run project.
```
npm start
```
This will listen on port 3000, then you can open your browser, and visit [http://[::1]:3000](http://[::1]:3000)(IPv6 address) or [http://127.0.0.1:3000](http://127.0.0.1)(IPv4 address).


