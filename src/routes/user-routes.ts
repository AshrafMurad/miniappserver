import {Router} from 'express'
import { getAllUSers, loginUser, signupUser, userLogout, verifyUser } from '../controllers/user-controller.js'
import {loginValidator, signupValidator, validate} from '../utils/validation.js'
import { verifyToken } from '../utils/token-manager.js'
const userRoutes = Router()

userRoutes.get('/', (req, res) => {
  res.send('User endpoint');
});

userRoutes.post('/signup',validate(signupValidator), signupUser)
userRoutes.post('/login',validate(loginValidator), loginUser)
userRoutes.get('/auth-status', verifyToken,verifyUser)
userRoutes.get('/logout', verifyToken, userLogout)

export default userRoutes ;