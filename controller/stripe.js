import Stripe from 'stripe';
import { config } from 'dotenv';

config();

const stripe = new Stripe(process.env.STRIPE_KEY)

export const payment =  (req , res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd"
    } , (err , stripeRes) => {
        if(err) {
            console.log(err)
            res.status(500).json(err)
        } else {
            res.status(200).json(stripeRes)
        }
    })
}