import express from 'express';


const router = express.Router();


// Import the auth controller
import { registerUser, loginUser } from '../controllers/authController.js';

router.post('/register', registerUser);
router.post('/login', loginUser);


export default router;
// Export the router