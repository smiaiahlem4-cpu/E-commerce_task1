import {Router} from "express";
import productsRouter from './productsRouter.mjs'
import usersRouter from './usersRouter.mjs';
import ordersRouter from './ordersRouter.mjs';
// import productsFillRouter from './fillProductsDB.mjs'
import authRouter from './authRouter.mjs';
const router = Router();


router.use(usersRouter);
// router.use(productsFillRouter);
router.use(productsRouter);
router.use(ordersRouter);
router.use(authRouter);
export default router;