const { default: mongoose } = require("mongoose");

const isValidId = function (id) {
  return mongoose.Types.ObjectId.isValid(id);
};

const isEmail = function (emailId) {
  let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(emailRegex.test(emailId)){
    return true
  }else{
    return false
  }
};

// enum,string,trim,token,

module.exports.isValidId = isValidId;
module.exports.isEmail = isEmail