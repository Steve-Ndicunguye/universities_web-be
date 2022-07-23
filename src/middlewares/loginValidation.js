import joi from "@hapi/joi";

const authValidationSchema = joi.object({
        email: joi.string().required().email(),
        password: joi.string().regex(/^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{5,}$/).required().messages({
            "string.pattern.base": "Your password must contain at least one capital letter, one number and one special character"
        }),
    });

export default authValidationSchema;