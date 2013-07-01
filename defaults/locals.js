var spawn = require("child_process").spawn

var CONFIGURE_NAME = "please configure user.name in git"
var CONFIGURE_EMAIL = "please configure user.email in git"

module.exports = locals

function locals(opts) {
    return {
        project: function (cb) {
            cb(null, opts.project)
        },
        description: function (cb) {
            cb(null, opts.description)
        },
        projectName: function (cb) {
            cb(null, camelCase(opts.project))
        },
        year: function (cb) {
            cb(null, new Date().getFullYear())
        },
        name: function (cb) {
            loadGitConfig("user.name", function (err, res) {
                if (res === "") {
                    return cb(new Error(CONFIGURE_NAME))
                }

                cb(null, res)
            })
        },
        email: function (cb) {
            loadGitConfig("user.email", function (err, res) {
                if (res === "") {
                    return cb(new Error(CONFIGURE_EMAIL))
                }

                cb(null, res)
            })
        }
    }
}

function loadGitConfig(name, callback) {
    var stdout = spawn("git", [
        "--bare", "config", "--global", name
    ])
    var res = ""
    stdout.on("data", function (chunk) {
        res += chunk
    })
    stdout.once("error", callback)
    stdout.once("end", function () {
        callback(null, res)
    })
}

function camelCase(str) {
    return str.replace(/[_.-](\w|$)/g, function (_,x) {
        return x.toUpperCase()
    });
}
