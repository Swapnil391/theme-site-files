const path = require('path');
const mime = require('mime-types');
var fs = require("fs");
var async = require('async');
var GeneralUtility = require("../utlities/generalutil");
const storage_path = path.resolve(__dirname, `${__dirname}/../../uploads`)

var uploadFile = async function(files,callback){
    try {
        var uploadedFiles = [];
        async.each(files, function (file, cback) {
            var file_path = GeneralUtility.generateUUID();
            var extension = mime.extension(file.mimetype);
            fs.writeFile(`${storage_path}/${file_path}.${extension}`, file.buffer, function (err) {
                if (err) {
                    cback(err);
                    return;
                }
                uploadedFiles.push({serverFileName:`${file_path}.${extension}`});
                console.log('File is created successfully.');
                cback();
            });
        
        }, function (err) {
        
            if (err) {
                // One of the iterations produced an error.
                // All processing will now stop.
                console.log('A file failed to process');
                callback(err);
            }
            else {
                console.log('All files have been processed successfully');
                callback(null,uploadedFiles);
            }
        });
    } catch (error) {
        console.log(error)
        callback(error);
    }
}
module.exports.uploadFile=uploadFile;

var deleteFile = async function(files,callback){
    try {
        async.each(files, function (file, cback) {
            fs.unlink(`${storage_path}/${file}`, function (err) {
                if (err) {
                    cback(err);
                    return;
                }
                cback();
            });
        
        }, function (err) {
        
            if (err) {
                console.log('A file failed to process');
                callback(err);
            }
            else {
                console.log('All files have been processed successfully');
                callback();
            }
        });
    } catch (error) {
        console.log(error)
        callback(error);
    }
}
module.exports.deleteFile=deleteFile;

var generateFolder = function(folder_path,callback){
    fs.mkdir(`${storage_path}${folder_path}`,callback);
}
module.exports.generateFolder=generateFolder;





