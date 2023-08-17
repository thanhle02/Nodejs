import { Router } from "express";
import { create, getAll, getDetail, remove, update } from "../controllers/products";
const ProductRouter = Router()
ProductRouter.post('/', create)
ProductRouter.get('/', getAll)
ProductRouter.get('/:id', getDetail)
ProductRouter.put('/:id', update)
ProductRouter.delete('/:id', remove)

export default ProductRouter;
