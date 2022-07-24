import express from "express";
import contactController from "../controllers/contactController.js";
import protectRoute from '../middlewares/verifyToken.js'

const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - names
 *         - email
 *         - phoneNumber
 *         - subject
 *         - message
 *       properties:
 *         name:
 *           type: string
 *           description: your name
 *         email:
 *           type: string
 *           description: your email
 *         phoneNumber:
 *           type: string
 *           description: your phone number
 *         subject:
 *           type: string
 *           description: your subject
 *         message:
 *           type: string
 *           description: your message
 *       example:
 *         names: john doe
 *         email: johndoe@gmail.com
 *         phoneNumber: '+250788619790'
 *         subject: Job
 *         message: I have a job for you
 */



/**
 * @swagger
 * /contact/sendMessage:
 *   post:
 *     summary: Send a message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: The query was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       500:
 *         description: Internal server error
*/


router.post("/sendMessage" , contactController.sendMessage);


/**
 * @swagger
 * /contact/getAllMessages:
 *   get:
 *     summary: Getting all messages
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: All available queries
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Unauthorized   
*/ 

router.get("/getAllMessages", protectRoute.authAdmin , contactController.getAllMessages);


/**
 * @swagger
 * /contact/deleteMessage/{id}:
 *   delete:
 *     summary: Delete user messages
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The query id
 * 
 *     responses:
 *       200:
 *         description: Message deleted successfully
 *       404:
 *         description: Message not found
 */

router.delete("/deleteMessage/:id", protectRoute.authAdmin , contactController.deleteMessage);

export default router;
