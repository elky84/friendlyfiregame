Ludum Dare 46
=============

Development
-----------

### Getting started

* Install [Node.js](https://nodejs.org/)
* Install [Yarn](https://classic.yarnpkg.com/en/docs/getting-started)
* Install [Visual Studio Code](https://code.visualstudio.com/)
* Clone the source code:
  ```
  git clone git@github.com:/iplabs/ludum-dare-46
  ```
* Initially run `yarn` in the project folder to install/update dependencies.


### Build game

In Visual Studio Code press *Ctrl-Shift-B* to start the compiler in watch mode. This compiles the TypeScript sources
in the `src` folder to JavaScript in the `lib` folder. It also watches the `src` folder for changes so changed files
are compiled on-save.

Alternatively you can run `yarn` on the CLI to compile the project once or `yarn watch` to continously compile the
project in watch mode.


### Run game in browser

There are three alternatives to run the game in the browser:

* Run `yarn start` and point your browser to http://localhost:8000/. The browser automatically reloads the
  game when changes are detected (You still need to run the compiler in watch mode in VSCode or on the CLI to receive
  code changes).
* If you already have a local webserver you can simply open the `index.html` file in the project folder in your
  browser. This only works with a http/https URL not with a file URL.
* Run `yarn dist` to package the game into the `dist` folder. Open the `dist/index.html` in your browser to run the
  game. To publish the game simply copy the contents of the `dist` folder to a public web server.
