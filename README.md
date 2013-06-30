# nstart

<!--
    [![build status][1]][2]
    [![NPM version][3]][4]
    [![Coverage Status][5]][6]
    [![gemnasium Dependency Status][7]][8]
    [![Davis Dependency status][9]][10]
-->

<!-- [![browser support][11]][12] -->

Project creation and publishing

## Example


## Docs

```
Usage:

  nstart create <name> <description> <[options]> -- <tags ...>

    Use nstart to create a project for you. Given a name and a
      description it will use `npm-proj` to create a folder
      directory. You can edit the `~/.npm-proj/` template to
      change the default scaffolding.
    The name get's used to create a folder name and is used in
      the project scaffolding, the description is also used in
      the scaffolding.
    You can pass a space seperated list of tags after the `--`
    You can also pass in options for travis/testling/git/github/file.

    Options:
      -a [--travis] <Bool>    Enable creation of travis.ci hook
      -t [--testling] <Bool>  Enable creation of testling hook
      -g [--git] <Bool>       Initialize a git repo & commit it
      -h [--github] <Bool>    Send the initial git code to github
      -f [--file] <file path> Location of code to copy to ./index.js

  nstart publish <[options]>

    Use nstart to publish the current project you are in. You
      can pass in options to do the git, github, travis and
      testling flows. After it has done those it will run npm
      publish.
    Note: You shouldn't run the git/github/travis/testling steps
      if you have already run them in the `nstart create` step

    Options:
      -g [--git] <Bool>       Initialize a git repo & commit it
      -h [--github] <Bool>    Send the initial git code to github
      -a [--travis] <Bool>    Enable creation of travis.ci hook
      -t [--testling] <Bool>  Enable creation of testling hook
```

## Configuring the config for nstart and npm-proj

You can go into `~/.npm-proj` to tweak the scaffolding template
  to your liking!

You can go to `~/.nstart/config.json` to tweak the config to your
  liking!

The default config is

```json
{
  create: {
    travis: false,
    testling: false,
    git: false,
    github: false
  },
  publish: {
    git: false,
    github: false,
    travis: false,
    testling: false
  }
}
```

You should change the keys to `true` so that they default to being
  on without setting the flag in the CLI. If you want to disable
  them for individual calls then do `nstart create -a false`

I recommend one of two flows:

### Create & github + code + publish

Create your project, push to github, then write code then publish it

```json
{
  create: {
    travis: false,
    testling: false,
    git: true,
    github: true
  },
  publish: {
    git: false,
    github: false,
    travis: false,
    testling: false
  }
}
```

### Create + code + github & publish

Create your project, write some code, then push to github & publish it

```json
{
  create: {
    travis: false,
    testling: false,
    git: false,
    github: false
  },
  publish: {
    git: true,
    github: true,
    travis: false,
    testling: false
  }
}
```

## Installation

`npm install nstart`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/nstart.png
  [2]: https://travis-ci.org/Raynos/nstart
  [3]: https://badge.fury.io/js/nstart.png
  [4]: https://badge.fury.io/js/nstart
  [5]: https://coveralls.io/repos/Raynos/nstart/badge.png
  [6]: https://coveralls.io/r/Raynos/nstart
  [7]: https://gemnasium.com/Raynos/nstart.png
  [8]: https://gemnasium.com/Raynos/nstart
  [9]: https://david-dm.org/Raynos/nstart.png
  [10]: https://david-dm.org/Raynos/nstart
  [11]: https://ci.testling.com/Raynos/nstart.png
  [12]: https://ci.testling.com/Raynos/nstart
