import express from 'express';
import verifyJWT from '../middleware/authMiddleware.js';
import { createBook, getBooks , getBookById , updateBook, deleteBook, updateCoverImage } from '../controller.js/bookController.js';
import upload from '../middleware/multerMiddleware.js';
const router = express.Router();

router.use(verifyJWT);


router.route("/create-book").post(createBook);
router.route("/get-books").get(getBooks);
router.route("/get-book/:bookId").get(getBookById);
router.route("/update-book/:bookId").patch(updateBook);
router.route("/delete-book/:bookId").delete(deleteBook);    
router.route("/update-coverimage/:bookId").patch(upload.single("coverImage"),updateCoverImage);



export default router;  