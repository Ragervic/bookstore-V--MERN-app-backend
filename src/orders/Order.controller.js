const Order = require("./Order.model");
// CreateOrder controller
const createOrder = async (req, res) => {
    console.log("Order info:",req.body) //log incoming data
    try {
        const newOrder = await Order({ ...req.body });
        const savedOrder = await newOrder.save();
        // res.status(200).send({ message: "Order placed successfully!!", Order: newOrder });
        res.status(200).json(savedOrder);

    } catch (error) {
        console.error("Error making order", error);
        res.status(500).json({ message: "Failed to create order!!" });
    }
}

const getOrderByEmail = async (req, res) => {
    try {
        const { email } = req.params
        const orders = await Order.find({ email }).sort({ createdAt: -1 });
        if (!orders) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders", error)
        res.status(500).json({ message: "Failed fetching orders" });
    }
}


module.exports = {
    createOrder,
    getOrderByEmail
}