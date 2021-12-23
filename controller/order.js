import Order from "../model/order.js";

//get all orders
export const getOrder = async (req , res) => {
    try {
        const order = await Order.find({}).populate("products.id")
        res.status(200).json({
            result: order
        });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}

//get user orders
export const getUserOrder = async (req , res) => {
    const {id:userId} = req.params;
    try {
        const order = await Order.findOne({userId ,  status: "pending"}).populate("products.id")
        res.status(200).json({
            result: order
        });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}

//creat oreder
export const creatOrder = async (req , res) => {
    try {
        console.log("ordeeeer")
        const body = req.body;
        let order = await Order.findOne({userId: req.userId , status: "pending"});
        if(order) {
            order = await Order.findByIdAndUpdate(order._id , body , {new: true}).populate("products.id")
            res.status(201).json({result:order})
        } else {
            const newOrder = new Order(body);
            order = await newOrder.save();
            order = await Order.findOne({_id:order._id}).populate("products.id")
            res.status(200).json({
                result: order
            });
        }
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}

//update order
export const updateOrder = async (req , res) => {
    const {id} = req.params;
    const body = req.body
    try {
        const order = await Order.findByIdAndUpdate(id , body , {new:true}).populate("products.id")
        res.status(200).json({
            result: order
        });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}

//delete order
export const deleteOrder = async (req , res) => {
    const {id} = req.params;
    try {
        await Order.findByIdAndDelete(id)
        res.status(200).json('order is delted');
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}