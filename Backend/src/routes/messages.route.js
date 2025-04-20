import express from 'express';
import { protect } from '../middlewares/Auth.middleware.js';
import { getmessage, getUsersForSideBar, sendMessage } from '../controllers/messages.controller.js';
 const router = express.Router() ;

router.get('/users', protect, getUsersForSideBar)
router.get('/:id', protect, getmessage)
router.post('/send/:id', protect, sendMessage)


 export default router;