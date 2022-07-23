import { request, response } from "express";
import contact from "../models/contactModel.js";
import contactValidationSchema from "../middlewares/contactValidation.js";


const sendMessage = async(request, response) =>{

    // inputvalidation
    const {error} = contactValidationSchema.validate(request.body);

    if (error)
        return response.status(400).send(error.details[0].message)


    try{
        const receivedMessage = await contact.create({
            names: request.body.names,
            email: request.body.email,
            phoneNumber: request.body.phoneNumber,
            subject: request.body.subject,
            message: request.body.message
        })
    
        response.status(201).json({
            "status": "message sent successfully!",
            "message": receivedMessage
        })
    }
    
    catch(error){
        response.status(500).json({
            "message": error.message
        })
    } 
}





const getAllMessages = async(request, response) =>{
    try{
        const clientMessages = await contact.find();

        response.status(200).json({
            "messages from clients": clientMessages
        })
    }

    catch(error){
        response.status(500).json({
            "message": error.message
        })
    }
}



const deleteMessage = async(request, response) =>{
    try{
        const MessageToBeDeleted = await contact.findOne({_id: request.params.id});

        await MessageToBeDeleted.deleteOne({_id: request.params.id});

        response.status(200).json({
            "status": "Success",
            "message": "The message was deleted successfully!"
        })
    }

    catch(error){
        response.status(500).json({ 
            "message": error.message
        })
    }
}

export default {sendMessage, getAllMessages, deleteMessage};