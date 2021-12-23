import express from 'express';
import { payment } from "./../controller/stripe.js";

const router = express.Router();

router.post('/payment' , payment);

export default router;