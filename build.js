// dependencies
var fs = require("fs"),
    name = "polyfiller",
    now = (function (date) {
        var toDoubleDigit = function (num) {
            return num < 10 ? "0" + num : "" + num;
        };
        return date.getFullYear() + "-" +
                toDoubleDigit(date.getMonth() + 1) + "-" +
                toDoubleDigit(date.getDate());
    }((new Date)));

// operations
var entries = [
        "// polyfiller.\n// https://github.com/watermelonbunny/polyfiller\n// Build Date: " + now
    ],
    sum = 1,
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
        fs.readFile("lib/" + key + "/" + nkey + ".js",
                "utf8",
                function (error, result) {
                    if (error) {
                        console.log(error);
                    }
                    // add one indentation level
                    result = "    " + result.replace(/\n/gmi, "\n    ");
                    entries.push("if (typeof " + key + ".prototype." + nkey + " !== \"function\"){\r\n" + result + "\r\n}");
                    if (entries.length === sum) {
                        write(entries.join("\r\n\r\n"));
                    }
                    console.log(key + "/" + nkey + ".js");
                });
    },
    write = function (code) {
        fs.writeFile(name + ".js", code, function (error) {
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