import { Router } from "express";
import { signIn, signUp } from "../controllers/user";
const AuthRouter = Router()
AuthRouter.post('/signup', signUp)
AuthRouter.post('/signin', signIn)
export default AuthRouter