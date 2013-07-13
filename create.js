var path = require("path")
var fs = require("fs")
var process = require("process")
var ncp = require("ncp")
var NpmProject = require("npm-proj")
var latest = require("latest")
var gitify = require("gitify")

var HOME = process.env.HOME || process.env.USERPROFILE
var startDir = path.join(HOME, ".nstart")
var localsFile = path.join(startDir, "locals.js")
var defaultLocals = path.join(__dirname, "defaults", "locals.js")

/*
 - disk file scaffolding
    - It's all templates
    - Check npm namespace collision (optional)
    - Move initial code from other place (optional)

    - travis file (optional)
    - testling options (optional)
    - github (optional)
*/

module.exports = create

/*  create := ({ project, description, tags, conflict,
        travis, testling, github, file }, Callback<Error>)

    Store locals file in disk if not exist
    Require it. Run it.
    Pass locals and location to scaffold
    Do npm namespace check
    Move initial code into folder if --file
    run --github logic
    run --travis logic
    run --testling logic
*/
function create(opts, callback) {
    var location = path.join(process.cwd(), opts.project)

    series([
        checkNamespace,
        createLocals,
        scaffold,
        copyFile,
        runGithub,
        runTestling,
        runTravis
    ], callback)

    function checkNamespace(callback) {
        if (!opts.conflict) {
            return callback()
        }

        var proj = opts.project
        latest(opts.proj, function (err) {
            if (err) {
                return callback()
            }

            callback(new Error("name: " + proj + " is taken on npm"))
        })
    }

    function createLocals(callback) {
        fs.stat(localsFile, function (err, stat) {
            if (err && err.code !== "EEXIST") {
                return callback(err)
            }

            if (stat) {
                return scaffold()
            }

            ncp(defaultLocals, localsFile, callback)
        })
    }

    function scaffold(callback) {
        var Locals = require(localsFile)
        var locals = Locals(opts)

        NpmProject({
            location: location,
            locals: locals
        }, callback)
    }

    function copyFile(callback) {
        var file = opts.file
        if (file) {
            return callback()
        }

        if (file[0] !== "/") {
            file = path.join(process.cwd(), file)
        }

        ncp(file, path.join(location, "index.js"), callback)
    }

    function runGithub(callback) {

      // makes no sense to get github name b/c without password it is useless to gitify
      // see: https://github.com/thlorenz/gitify/blob/master/lib/credentials.js#L20
      // possibly though we should have an .nstart config file that has user configure
      // both beforehand and we could pass those to gitify like this
      // gitify({ user: username, password: password, repo: (defaults to current dir) }, callback)
      // https://github.com/thlorenz/gitify#gitify
      gitify(callback);
    }

    function runTravis(callback) {
        callback(new Error("--travis not implemented"))
    }

    function runTestling(callback) {
        callback(new Error("--testling not implemented"))
    }

    // var project = opts.project
    // var description = opts.description
    // // var tags = opts.tags
    // // var travis = opts.travis
    // // var testling = opts.testling
    // // var github = opts.github
    // // var file = opts.file
}

function series(list, cb) {
    (function loop() {
        list.shift()(function (err) {
            if (err) {
                return cb(err)
            }

            if (list.length === 0) {
                return cb(null)
            }

            loop()
        })
    }())
}
