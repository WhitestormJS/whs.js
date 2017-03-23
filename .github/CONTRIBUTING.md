# Contributing to WhitestormJS

Contributions to WhitestormJS are welcome; to make things easier, we've included a [Getting Started](#getting-started) section.

We look forward to your contributions to WhitestormJS.

# Getting Started

## Reporting Bugs

If you've found a *reproduceable* bug, [submit an issue](https://github.com/WhitestormJS/whitestorm.js/issues)! If you're sure that the issue is caused by WhitestormJS, submitting an issue will help us fix the problem.

You're welcome to fix things for us, and submit pull requests; it frees up time for us to implement useful new features.

## Adding Features

If you've added a new feature to WhitestormJS and would like for it to be included, submit a pull request. We'll take a look at it.

## Building WhitestormJS

WhitestormJS can be built by installing [Node.js](https://nodejs.org), and the [gulp](https://www.npmjs.com/package/gulp) package through [npm](https://www.npmjs.com/).

After that, clone the repository anywhere you'd like (`git clone https://github.com/WhitestormJS/whitestorm.js.git`).

Open the new directory (`./WhitestormJS/` by default) using whatever terminal emulator you'd like.

You can build WhitestormJS with the following command: `gulp`

WhitestormJS will be built, and written to `build/whitestorm.js`, and `build/whitestorm.min.js`.

## CLI

### `npm start` - Development mode
- Starts `webpack-dev-server` for whs sources.
- Starts `webpack-dev-server` for each example located in `./examples`
- Starts `gulp less:watch`
  - Watches each `.less` in `./examples/assets/less`
  - Compiles to `./examples/assets/css`
  
### `npm run build` - Build all
- Runs `gulp build` - build sources
- Runs `gulp examples:build` - build examples

### `npm test` - Unit testing, coverage, snyk
Runs all testing suites. Used in Travis CI for this project.

### `npm run deploy` - Deploy examples
> Only for those, **who are in dev team and have write acess on surge.sh for examples domain**

----

## Committing

All engine code is in the `src/` folder.
Modules are in the `modules/`, each having their own build.

_We still in the process of moving all remaining modules from `src/` to `modules`. If you create a new module, please put it in the `modules` folder._

**Do not edit files in `build/` folder!!!*

### * Commit names.

#### Codes.
 - **CSF** - Code style fix. (Comes with file name.)
 - **TU** - Temporary update. (Will be changed later.)
 - **README** - You changed README.md file.
 - **LICENSE** - You changed LICENSE.md file.
 - **CONTRIBUTING.** - You changed CONTRIBUTING.md file.



#### Fixed Issue.

If your commit fixes for an _issue_ on github, you must add `Fixed #25`. Where **#25 is ID of the issue.**



#### Syntax.

- **Code** - e.g `CSF.` or `TU.` (If your commit matches one of them.)
- **Comment** - Your comment to commit. (optional, unless you have no code.)
- **Fix** - Example: `Fixed #25`. (If you fixed issue #25)

>**code must be UPPCERCASE, comment must be be Capitalized**

>**If you have `CSF` your comment must be the name of the file you fixed.** No dot after filename


#### Examples.

Good:
 - `CSF: ShaderTerrain.js Fixed #25`
 - `Edited core module`

Poor:
 - `Changes..`
 - `Fixed #25`
 - `Fixed code style.` (Use "CSF")
 - `WIPSHADEERTERRAINJSFIXES####2017!!!!`


### * Code style guidelines:
 - Follow code style guides:
    - [XO](https://github.com/sindresorhus/xo)
    - Wrap logical blocks* with newlines.
   
_logical blocks_* - lines that have something in common.

## Testing WhitestormJS

Our tests are run using [Jest](https://facebook.github.io/jest/). We're adding more tests cases.
