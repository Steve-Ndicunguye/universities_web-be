import mongoose from 'mongoose';
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
        type: String, 
        required: true
       },
    lastName: {
        type: String, 
        required: true
       },
    email: {
       type: String,
       required: true
    },
    password: {
        type: String, 
        required: true
       },
    repeatPassword: {
        type: String, 
        required: true
       },

    role: {
        type: 'string',
        default:"user"
    },
    
    dateCreated:{
        type: Date,
        default: Date.now()
    }

})

export default mongoose.model('User', userSchema);