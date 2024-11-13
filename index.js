const express = require('express')
const app = express()
const cors = require('cors')

const mongoose = require('mongoose')

const port = 4000
require('dotenv').config()

// FDa7b7rmhgmiHbAC

// middleware
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}))

// routes
const bookRoutes = require('./src/books/book.route')
const orderRoutes = require('./src/orders/Order.route')
const userRoutes = require('./src/users/user.route')
const adminRoutes = require('./src/stats/admin.stats')

app.use('/api/books', bookRoutes)//get
app.use('/api/orders', orderRoutes)//post
app.use('/api/auth', userRoutes)//post
app.use('/api/admin', adminRoutes)//get


DB_URL = "mongodb+srv://mutisov261:FDa7b7rmhgmiHbAC@cluster0.h3vkn.mongodb.net/book-store?retryWrites=true&w=majority&appName=Cluster0";

async function main() {
    await mongoose.connect(DB_URL)//process.env.DB_URL
    app.get("/", (req, res) => {
        res.send('Book-store server is running')
    })
}
main().then(() => console.log('Mongodb connected successfully')).catch(err => console.log(err));

app.listen(port, () => {

    console.log(`Listening on port ${port}`)
})