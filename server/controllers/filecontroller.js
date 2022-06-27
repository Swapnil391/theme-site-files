var FileService = require('../services/fileservice')
var async = require("async");

var uploadFile = function (req,response) {
    console.log('uploadFile');
    var finalData = {};
    var reqfiles = req.files;
    async.series([
        function(cb){
            FileService.uploadFile(reqfiles,function (err,res) {
                if(err){
                    cb(err);
                    return;
                }
                finalData.uploadedFiles = res;
                cb();
            })
        }
    ],function(err,res){
        if(err){
            response.json({ error:err , data:null });
        }else{
            response.json({ error:null , data:finalData });
        }
    })
}
module.exports.uploadFile = uploadFile;

var deleteFile = function (req,response) {
    console.log('deleteFile');
    var reqBody = req.body;
    async.series([
        function(cb){
            FileService.deleteFile(reqBody.filenames,function (err,res) {
                if(err){
                    cb(err);
                    return;
                }
                cb();
            })
        }
    ],function(err,res){
        if(err){
            response.json({ error:err , data:null });
        }else{
            response.json({ error:null , data:null });
        }
    })
}
module.exports.deleteFile = deleteFile;