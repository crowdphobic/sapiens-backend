const Joi = require('joi');

const validate = {
 stringValidation: async (str) => {
   const stringSchema = Joi.string();
   const stringValidationCheck = stringSchema.validate(str);
   if(stringValidationCheck.error) return false;
   else return true;
 },
 emailValidation: async(email) => {
   const emailSchema = Joi.string().email();
   const emailValidationCheck = emailSchema.validate(email);
   if(emailValidationCheck.error) return false;
   else return true;
 }  
}

module.exports.validation = validate;