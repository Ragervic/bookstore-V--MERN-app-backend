const Book = require("./book.model");


// Post a book controller
const postABook = async (req, res) => {
    try {
        const newBook = await Book({ ...req.body });
        await newBook.save();
        res.status(200).send({ message: "Book posted successfully!", book: newBook })
    } catch (error) {
        console.error("Error creating book", error);
        res.status(500).send({ message: "Failed creating book!" });
    }
}

// Get all books controller
const getBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.status(200).send(books)
    } catch (error) {
        console.error("Error fetching books", error);
        res.status(500).send({ message: "Failed fetching books!" });
    }
}

// get single book controller
const getBook = async (req, res) => {
    try {
        const {id}=req.params
        const book = await Book.findById(id)
        if (!book) {
            res.status(404).send({ message: "Book not found!!" })
        }
        res.status(200).send(book)
     }catch (error) {
        console.error("Error fetching book!!", error)
        res.status(500).send({message:"Failed getting book!"})
    }
}
// Update a book  
const updateBook = async (req, res) => {
    try {
        const {id} = req.params
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).send({message:"Book updated successfully!!" , book: updatedBook})
    } catch (error) {
        console.error("Error updating book!!")
        res.status(500).send({message:"Failed to update book!!"})
    }
}
// Delete a book
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params
        const deletedBook = await Book.findByIdAndDelete(id, { new: true })
        if (!deletedBook) {
            res.status(404).send({ message: "Book not found!!" })
        }
        res.status(200).send({message:"Book deleted successfully!!", book: deletedBook})
        
    } catch (error) {
        console.error("Error deleting book!!")
        res.status(500).send({ message: "Failed to delete book!!" })
    }
}

module.exports = {
    postABook,
    getBooks,
    getBook,
    updateBook,
    deleteBook
}