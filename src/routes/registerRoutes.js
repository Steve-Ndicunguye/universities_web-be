import express from 'express'
const router = express.Router()
import registerController from '../controllers/registerController.js'
import protectRoute from '../middlewares/verifyToken.js'

/**
 * @swagger
 * /register/createUser:
 *  post:
 *    tags:
 *    - "Authentication"
 *    summary: Create an account 
 *    description: Fill inforamation in email, firstname, lastname and password
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The user's firstname.
 *                 example: Graham   
 *               lastName:
 *                 type: string
 *                 description: The user's lastnaname.
 *                 example: Leanne  
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: test@gmail.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: test123
 *               repeatPassword:
 *                 type: string
 *                 description: The user's password.
 *                 example: test123
 *    responses:
 *      '201':
 *        description: A new user created successfully!
 *      '400':
 *        description: All fields are required required!
 *      '409':
 *        description: Conflict User already exists
 *      '500':
 *        description: Internal server error
*/

router.post('/createUser', registerController.createUser)


/**
 * @swagger
 * /register/getAllUsers:
 *   get:
 *     summary: Getting all users
 *     tags:
 *     - "Authentication"
 *     responses:
 *       200:
 *         description: All registered users
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Unauthorized   
*/ 


router.get('/getAllUsers', protectRoute.authAdmin ,registerController.getAllUsers)

export default router;