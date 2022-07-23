import User from '../models/userModels.js';
import bcrypt from 'bcrypt';
import userValidationSchema from '../middlewares/registerValidation.js';


const createUser =  async (req, res) => {

    const {error} = userValidationSchema.validate(req.body);
    if (error) return res.send(error.details[0].message);
 
    const duplicateEmail = await User.findOne({ email: req.body.email})
    if (duplicateEmail) return res.status(409).json({'message': `User with email ${req.body.email} already exists`});
    try {
        
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const hashedRepeatPassword = await bcrypt.hash(req.body.repeatPassword, salt);
       
        await User.create({ 
            firstName: req.body.firstName, 
            lastName: req.body.lastName,
            email: req.body.email,  
            password: hashedPassword, 
            repeatPassword: hashedRepeatPassword 
        });

        return res.status(201).json({ 'success': `New user ${req.body.email} created!` });
    } catch (error) {
        return res.status(500).json({ 'message': error.message });
    }
}

const getAllUsers = async(req, res) =>{
    try{
      const registeredUsers = await User.find()
      res.status(200).json({"All registered users": registeredUsers})

    }
    catch(error){
        res.status(500).json({"message": error.message})
    }
}

export default  { createUser, getAllUsers };