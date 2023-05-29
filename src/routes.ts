import { Router, Request, Response } from "express";

import multer from 'multer';

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticaded } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";

import uploadConfig from './config/multer';
import { ListByCategoryController } from "./controllers/product/ListByProductController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"))

//ROTAS DE USUÁRIO
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticaded, new DetailUserController().handle)

//ROTAS DE CATEGORIAS
router.post('/category', isAuthenticaded, new CreateCategoryController().handle);
router.get('/category', isAuthenticaded, new ListCategoryController().handle);

// ROTAS PRODUTOS
router.post('/product', isAuthenticaded, upload.single('file'), new CreateProductController().handle);
router.get('/category/product', isAuthenticaded, new ListByCategoryController().handle);

// ROTAS ORDER
router.post('/order', isAuthenticaded, new CreateOrderController().handle);
router.delete('/order', isAuthenticaded, new RemoveOrderController().handle);
router.post('/order/add', isAuthenticaded, new AddItemController().handle);

router.delete('/order/remove', isAuthenticaded, new RemoveItemController().handle);
router.put('/order/send', isAuthenticaded, new SendOrderController().handle);

router.get('/orders', isAuthenticaded, new ListOrdersController().handle);
router.get('/order/detail', isAuthenticaded, new DetailOrderController().handle);

router.put('/order/finish', isAuthenticaded, new FinishOrderController().handle);

export {router};