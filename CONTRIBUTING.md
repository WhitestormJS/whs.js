# Contributing to WhitestormJS

Contributions to WhitestormJS are welcome; to make things easier, we've included a [Getting Started](#getting-started) section.

We look forward to your contributions to WhitestormJS.

# Getting Started

### Reporting Bugs

If you've found a *reproduceable* bug, [submit an issue](https://github.com/sasha240100/WhitestormJS/issues)! If you're sure that the issue is caused by WhitestormJS, submitting an issue will help us fix the problem.

You're welcome to fix things for us, and submit pull requests; it frees up time for us to implement useful new features.

### Adding Features

If you've added a new feature to WhitestormJS and would like for it to be included, submit a pull request. We'll take a look at it.

### Building WhitestormJS

WhitestormJS can be built by installing [Node.js](https://nodejs.org), and the [gulp](https://www.npmjs.com/package/gulp) package through [npm](https://www.npmjs.com/).

After that, clone the repository anywhere you'd like (`git clone https://github.com/sasha240100/WhitestormJS.git`).

Open the new directory (`./WhitestormJS/` by default) using whatever terminal emulator you'd like.

You can build WhitestormJS with the following command: `gulp build`

WhitestormJS will be built, and written to `build/whitestorm.js`, and `build/whitestorm.min.js`.

### Testing WhitestormJS

We haven't yet implemented a testing system, so for now, run the [examples listed in the README](https://github.com/sasha240100/WhitestormJS/blob/master/README.md#examples) (these are located in `examples/`) with your newly built version of WhitestormJS, and make sure there are no errors.