const express = require('express')
const User= require('./user.model')
const JWT = require('jsonwebtoken')


const router = express.Router()

const JWT_SECRET= process.env.JWT_SECRET_KEY

router.post("/admin", async (req, res) => {
    const { username, password } = req.body
    try {
        const admin = await User.findOne({ username })
        if (!admin) {
            res.status(404).send({message:"Admin not found!!"})
        }
        if (admin.password !== password) {
            res.status(401).send({message:"Invalid password!!"})
        }

        const token = JWT.sign(
            // user info
            { id: admin._id, username: admin.username, role: admin.role },
            // secret key
            JWT_SECRET,
            // time before expire
            {expiresIn:"1h"}
        )
        return res.status(200).json({
            message: "Authentication successful",
            token: token,
            user: {
                username: admin.username,
                role: admin.role
            }
        })
        
    } catch (error) {
        console.error("Failed to log-in as admin", error)
        res.status(401).send({ message: "Failed to log-in as admin" });
    }
})

module.exports = router