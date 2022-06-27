const uuidv4 = require("uuid");
const bcrypt = require('bcryptjs');

var generateUUID = function(){
    var uuid = uuidv4.v4();
    return uuid;
}

module.exports.generateUUID = generateUUID;

var generateOTP = function() {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

module.exports.generateOTP = generateOTP;

var encryptStr  = function (str,callback) {
    bcrypt.genSalt(10, function (err, Salt) {
        bcrypt.hash(str, Salt, function (err, hash) {
            if (err) {
                callback('Cannot encrypt');
                return console.log('Cannot encrypt');
            }
            callback(null,hash);
        })
    })
}
module.exports.encryptStr = encryptStr;

var checkEncryptedStr = function (str,encStr,callback) {
    bcrypt.compare(str, encStr,
        async function (err, isMatch) {
        if (isMatch) {
            callback();
        }else{
            callback({massage:'Some Error Occured'});
        }
    })
}
module.exports.checkEncryptedStr = checkEncryptedStr;