// dependencies
var config = {
        name:     "polyfiller",
        source:   "https://bitbucket.org/omrilotan/polyfiller",
        filename: "polyfiller"
    },
    fs = require("fs"),

    templates = {
        FILLER: "if (typeof ${ type }.prototype.${ name } !== \"function\") {\r\n${ fn }\r\n}"
    },

    // Used for build date
    now = (function parseCurrentDate (date) {
        var toDoubleDigit = function (num) {
            return num < 10 ? "0" + num : "" + num;
        };
        return date.getFullYear() + "-" +
                toDoubleDigit(date.getMonth() + 1) + "-" +
                toDoubleDigit(date.getDate());
    }((new Date))),

    interpolate = function (string, obj) {
        return string.replace(/\${([^{}]*)}/gmi,
            function (a, b) {
                var r = obj[b.trim()];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            });
    },

    // Collecting files info a single code base
    entries = [
        "// " + config.name + ".\n// " + config.source + "\n// Build Date: " + now
    ],
    sum = entries.length,

    // operations
    begin = function (obj) {
        console.log(obj);
        var key,
            nkey,
            items = [];
        for (key in obj) {
            if (obj.hasOwnProperty(key) &&
                    typeof obj[key].forEach === "function") {
                obj[key].forEach(function (item, index, array) {
                    sum++;
                    addEntry(key, item);
                });
            } else {
                console.log(key + " is not an array")
            }
        }
    },
    addEntry = function (key, nkey) {
        var place = sum - 1;
        fs.readFile("lib/" + key + "/" + nkey + ".js",
                "utf8",
                function (error, result) {
                    if (error) {
                        console.log(error);
                    }
                    var data = {
                        type: key,
                        name: nkey,
                        fn: result
                    };
                    // add one indentation level
                    data.fn = interpolate("    ${ type }.prototype.${ fn }", data).replace(/\n/gmi, "\n    ");

                    entries[place] = interpolate(templates.FILLER, data);
                    if (entries.length === sum) {
                        write(entries.join("\r\n\r\n"));
                    }
                    console.log(interpolate("${ type }/${ name }.js", data));
                });
    },
    write = function (code) {
        fs.writeFile(config.filename + ".js", code, function (error) {
            if (error) {

            } else {
                console.log("file saved");
            }
        });
    };

var init = function () {
    fs.readFile("list.json",
            "utf8",
            function (error, result) {
                begin(JSON.parse(result));
            });
};
init();