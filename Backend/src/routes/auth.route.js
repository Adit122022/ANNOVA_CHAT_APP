import express from 'express' ;
import { checkAuth, login, logout, signup, updateProfile } from '../controllers/auth.controller.js';
import { protect } from '../middlewares/Auth.middleware.js';
const router = express.Router() ;

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

// updating profile routes
router.put('/update-profile',protect ,updateProfile)
router.get('/check' , protect, checkAuth)
router.get('/test', (req,res)=>{
    res.send("test route is working")
})


export default router