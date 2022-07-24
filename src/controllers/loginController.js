import User from '../models/userModels.js'; 
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// import authValidationSchema from '../middlewares/loginValidation.js';

//test
const loginUser = async (req, res) => {

    // const {error} = authValidationSchema.validate(req.body);
    // if(error) return res.status(400).send({error: error.details[0].message })
      
    
    //check if a email is in the database
    const checkUser = await User.findOne({email: req.body.email});
    if(!checkUser) return res.status(400).send({error:'Invalid email please try again'});

    //check if the password is correct.
    const validPassword = await bcrypt.compare(req.body.password, checkUser.password);
    if(!validPassword) return res.status(400).send({error:'Invalid password please try again'});


    //create and Assign a token
    const token = jwt.sign({ user : {id: checkUser.id, role: checkUser.role}}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:3600});
    res.header('auth-token', token);
        
    
    const userRole = checkUser.role;
   if(userRole == "admin") return res.set("token", token).send({Message:"Successfully logged in", token:token, role:userRole})
   if(userRole == "user") return res.set("token", token).send({Message:"Successfully logged in", token:token, role:userRole})

    //res.status(200).json({success: 'Logged In Successfully :'});
}


export default { loginUser};