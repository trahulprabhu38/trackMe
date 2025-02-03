import express from 'express'
import {addUser,getUser, displayUsers} from '../controllers/userController.js'
import { authenticateToken } from '../middlewares/authorizeUser.js'

const router = express.Router()

router.post('/adduser',addUser)
router.post('/getuser',getUser)
router.get('/display',displayUsers)


export default router;
