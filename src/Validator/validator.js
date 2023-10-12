const mongoose=require("mongoose");
//validator of username
const usernameRegex = /^[a-zA-Z].*@gmail\.com$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

let isValid = function (x) {
  if (typeof x === "undefined" || x === null) return false;
  if (typeof x === "string" && x.trim().length === 0) return false;
  return true;
};
const isBodyEmpty = function(data)
{
    if(Object.keys(data).length == 0) return true
    return false;
}


module.exports={usernameRegex,passwordRegex,isValid,isBodyEmpty};