// Creating the order router from express and connecting it to the order model and respective controllers
const express = require('express')
const router = express.Router()
// const order = require('./Order.model');
const { createOrder, getOrderByEmail } = require('./Order.controller')


// create/post an order
router.post("/", createOrder)

// Fetch orders of a particular email
router.get('/email/:email',getOrderByEmail)


module.exports = router;

