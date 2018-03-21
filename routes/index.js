const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const util = require('util');
const fsExtra   = require('fs.extra');
const fs = require('fs');
let path = require('path');
let form = new formidable.IncomingForm();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/upload',(req,res)=> {
    form.on('end', function (fields, files) {
        let file_array_len = this.openedFiles.length;
        for(let i = 0;i < file_array_len;i++) {
            let temp_path = this.openedFiles[i].path;
            let file_name = this.openedFiles[i].name;
            let new_location = 'path';
            fsExtra.copy(temp_path, new_location + file_name, function (err) {
                if (err) {
                    console.error(err);
                } else {
                    fs.readFile(new_location + file_name, 'utf8', function (err, contents) {
                        if (err)
                            console.log(err);
                    });
                }
            });
        }
    });
    form.parse(req, function(err, fields, files) {
        if(err)
            console.log(err);
        res.end(util.inspect('okay'));
    });
});


module.exports = router;
