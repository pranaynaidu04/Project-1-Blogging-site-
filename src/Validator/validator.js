const { default: mongoose } = require("mongoose");

const isValidId = function (id) {
  return mongoose.Types.ObjectId.isValid(id);
};

const isEmail = function (emailId) {
  let emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRegex.test(emailId)) {
    return true;
  } else {
    return false;
  }
};

const isValidString = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const isValidPassword = function (pwd) {
  let passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;

  if (passwordRegex.test(pwd)) {
    return true;
  } else {
    return false;
  }
};
//token

module.exports = { isValidId, isEmail, isValidString, isValidPassword };
