import { Router } from "express";
import ProductRouter from "./products";
import AuthRouter from "./auth";
const router = Router()
router.use('/products', ProductRouter)
router.use('/auth',  AuthRouter)
export default router