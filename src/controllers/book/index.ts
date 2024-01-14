import { BookService } from "@services/book";
import { Request, Response } from "express";

const bookService = new BookService();
export const getBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, message, details } = await bookService.getOneBook(id);

  return res.status(status).json({ message, details });
};
export const listBooks = async (req: Request, res: Response) => {
  const { status, message, details } = await bookService.getBooks();

  return res.status(status).json({ message, details });
};

export const listBooksByAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, message, details } = await bookService.getBooksByAuthor(id);

  return res.status(status).json({ message, details });
};

export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = req.body;
  const { status, message } = await bookService.updateBook(book, id);

  return res.status(status).json({ message });
};
export const createBook = async (req: Request, res: Response) => {
  const book = req.body;
  const { status, message } = await bookService.createBook(book);

  return res.status(status).json({ message });
};
export const destroyBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, message } = await bookService.deleteBook(id);
  return res.status(status).json({ message });
};
