import Book from "../models/Book.js";
import uploadOnCloudinary from "../cloudinary.js";

const createBook = async (req, res) => {
  try {
    const { title, subtitle, chapters } = req.body;
    if (!title) {
      return res.json({
        message: "provide Required field",
      });
    }

    const book = await Book.create({
      userId: req.user._id,
      title,
      subtitle,
      chapters,
    });

    return res.status(201).json({
      message: "Book Created Successfully",
      book: book,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({
      message: "Error While Creating Book",
    });
  }
};

const getBooks = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized Access",
      });
    }
    const books = await Book.find({ userId }).populate("userId", "name email");

    if (!books) {
      return res.status(404).json({
        message: "No Books Found",
      });
    }
    return res.status(200).json({
      books,
      message: "Books Fetched Successfully",
    });
  } catch (error) {
    console.log("Error: ", error.message);
    return res.status(404).json({
      message: "Server Error",
    });
  }
};

const getBookById = async (req, res) => {
  try {
    const { bookId } = req.params;
    if (!bookId) {
      return res.status(400).json({
        message: "Book ID is required",
      });
    }
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        message: "Book Not Found",
      });
    }
    if (req.user._id.toString() !== book.userId.toString()) {
      return res.status(400).json({
        message: "Unauthorized Request",
      });
    }
    return res.status(200).json({
      book,
      message: "Book Fetched Successfully",
    });
  } catch (error) {
    console.log("Error :", error.message);
    return res.status(400).json({
      message: "Server Error",
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({ message: "User not logged in" });
    }

    const booktobeupdate = await Book.findById(bookId);

    if (!booktobeupdate) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (req.user._id.toString() !== booktobeupdate.userId.toString()) {
      return res.status(400).json({
        message: "Unauthorized Request",
      });
    }

    const book = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true,
    });

    return res.status(200).json({
      book,
      message: "Book updated successfully",
    });
  } catch (error) {
    console.log("Error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteBook = async (req, res) => {
  const { bookId } = req.params;
  const book = await Book.findById(bookId);
  if (!bookId) {
    return res.status(400).json({
      message: "Book ID is required",
    });
  }

  if (req.user._id.toString() !== book.userId.toString()) {
    return res.status(400).json({
      message: "Unauthorized Request",
    });
  }

  const deletedBook = await Book.findByIdAndDelete(bookId);

  return res.status(200).json({
    deletedBook,
    message: "Book Deleted Successfully",
  });
};

const updateCoverImage = async (req, res) => {
  const { bookId } = req.params;
  const coverImageLocalPath = req.file?.path;

  const book = await Book.findById(bookId);

  if (req.user._id.toString() !== book.userId.toString()) {
    return res.status(400).json({
      message: "Unauthorized Request",
    });
  }

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!coverImage.secure_url) {
    return res.status(400).json({
      message: "Image not Found",
    });
  }

  const updatedBook = await Book.findByIdAndUpdate(
    bookId,
    {
      $set: { coverImage: coverImage.secure_url },
    },
    { new: true }
  );

  return res.status(200).json({
    updatedBook,
    message: "Cover Image Updated Successfully",
  });
};

export {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  updateCoverImage,
};
