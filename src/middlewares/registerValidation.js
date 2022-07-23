import joi from "@hapi/joi";

const userValidationSchema = joi.object({
        firstName: joi.string().required().min(2).regex(/^[A-Za-z]+$/).messages({
            "string.pattern.base": "The name field can not include numbers and special characters"
        }),
        lastName: joi.string().required().min(2).regex(/^[A-Za-z]+$/).messages({
            "string.pattern.base": "The name field can not include numbers and special characters"
        }),
        email: joi.string().required().email(),
        password: joi.string().regex(/^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{5,}$/).required().messages({
            "string.pattern.base": "Your password must contain at least one capital letter, one number and one special character"
        }),
        repeatPassword: joi.string().equal(joi.ref('password')).messages({
           "any.only": "Passwords don't match" 
        })
    });

export default userValidationSchema;