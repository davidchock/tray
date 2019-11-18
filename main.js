var fs = require('fs'),
    path = require('path'),    
    traySolution = require('./tray-solution.js');
    filePath = path.join(__dirname, 'input.txt');

fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
        traySolution.main(data);
    } else {
        console.log(err);
    }
});

