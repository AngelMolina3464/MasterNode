import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  publication_date: String,
});

export const Books = mongoose.model("Books", bookSchema);
