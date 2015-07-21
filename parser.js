var fs = require('fs');
var results = '';
var toWriteTo = '';
var logs = '';
var summ = 0;

function parseFile (file) {
    fs.readFile(file, function (err, logData) {
        if (err) {
            throw err;
        }

        var text = logData.toString();
        var lines = text.split('\n');
        var count = 0;

        lines.forEach(function (line) {
            if (line.match(' 404 ')) {
                results += line + '\n';
                count += 1;
                summ += 1;
            }
        });

        fs.readFile('404logs.txt', function (err, data) {
            if(err) {
                return console.log(err);
            }

            logs = data;
            toWriteTo = logs + + '\n' + results;

            fs.writeFile('404logs.txt', toWriteTo, function (err) {
                if(err) {
                    return console.log(err);
                }

                console.log(file + " was parsed! Found " + count +  " logs. Results were written. Summ: " + summ);
            });
        });
    });
}

fs.readdir('./iis-logs/', function (err, files) {
    if (err) {
        throw err;
    }

    files.forEach(function (file) {
        var source = './iis-logs/' + file;
        parseFile(source);
    });
});
