import express, { Router } from "express";
import { Books } from "../models/book.model.js";

const router = express.Router();

// MidleWare
const getBook = async (req, res, next) => {
  let book;
  const { id } = req.params;

  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({
      message: "El Id del Libro no es Valido Man",
    });
  }

  try {
    book = await Books.findById(id);
    if (!book) {
      return res.status(404).json({
        message: "El Libro no fue en contrado ",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }

  res.book = book;
  next();
};

// Methodo de Obtencion "Books"
router.get("/", async (req, res) => {
  try {
    const books = await Books.find();
    console.log("Del Metodo Get ", books);
    if (books.length === 0) {
      return res.status(204).json([]);
    }
    res(books);
  } catch (error) {
    res.status(500);
    console.error("Error 😥:", error);
  }
});

export default router;

// MMetodo de Escritura
router.post("/", async (req, res) => {
  const { title, author, genre, publication_date } = req?.body;
  if (!title || !author || !genre || !publication_date) {
    return res.status(400).json({
      message: "Todos los Campos son Obligatorios",
    });
  }

  const book = new Books({
    title,
    author,
    genre,
    publication_date,
  });

  try {
    const newBook = await book.save();
    console.log(newBook);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({
      message: "Error en el Mensaje ",
    });
  }
});
