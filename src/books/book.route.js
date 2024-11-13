// API maintenance is done in this folder
const express = require('express')
const router = express.Router()
const Book = require('./book.model');
const { postABook, getBooks, getBook, updateBook, deleteBook } = require('./book.controller');
const verifyAdminToken = require('../middlewares/verifyAdminToken');


// frontend => backend server => controller => book schema => database => send to server =>  back-to-the-frontend

// Post a book
router.post('/create-book',verifyAdminToken, postABook)
// Show books
router.get('/', getBooks)
// Fetch a single book
router.get('/:id', getBook)
// Update a book
router.put('/edit/:id', verifyAdminToken,updateBook)
// Delete a book
router.delete('/delete/:id',verifyAdminToken,deleteBook)









module.exports = router;