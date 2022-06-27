const controller = require("../controllers/filecontroller.js");
const COMMON_CONF = require("../config/commonconf");

var express = require('express');
var router = express.Router();
var MAX_FILE_SIZE_IN_BYTES=150 * 1024 * 1024;
const Multer = require('multer');
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: MAX_FILE_SIZE_IN_BYTES 
    }
});

var commonValidatorFunction=function(req, res, isValidationNeeded, toCallFunction){
  if(!req || !req.body){
    res.json({ error:{code:"sc000", message:'Some Error Occured'} , data:null });
    return;
  }
  if(isValidationNeeded){
    if(req && req.query && req.query.server_key && req.query.server_key == COMMON_CONF.SERVICE_API_KEY){
      toCallFunction(req, res);
    }else{
      res.json({ error:{code:"sc000", message:'Some Error Occured'} , data:null });
      return;
    }
  }else{
    toCallFunction(req, res);
  }
}

router.post("/uploadfile",multer.array('file'),(req, res)=>{
  commonValidatorFunction(req, res, false, controller.uploadFile);
});
router.post("/deletefile",(req, res)=>{
  commonValidatorFunction(req, res, false, controller.deleteFile);
});

module.exports = router;