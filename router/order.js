import express from 'express';
import { getOrder , getUserOrder , updateOrder , creatOrder , deleteOrder } from "./../controller/order.js";
import auth from './../middleware/userAuth.js';

const router = express.Router();

//get all orders
router.get('/' , auth , getOrder );

//get user order
router.get('/:id' , auth , getUserOrder);

//add new order 
router.post('/add' , auth , creatOrder);

//udpdate order
router.patch("/:id" , auth , updateOrder);

//delete order
router.delete('/:id' , auth , deleteOrder)

export default router;