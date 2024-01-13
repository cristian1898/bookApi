import { AuthorService } from "@services/author/index";
import { Request, Response } from "express";

const authorService = new AuthorService();
export const getAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, message, details } = await authorService.getOneAuthor(id);

  return res.status(status).json({ message, details });
};
export const listAuthors = async (req: Request, res: Response) => {
  const { status, message, details } = await authorService.getAuthors();

  return res.status(status).json({ message, details });
};
export const updateAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const author = req.body;
  const { status, message } = await authorService.updateAuthor(author, id);

  return res.status(status).json({ message });
};
export const createAuthor = async (req: Request, res: Response) => {
  const author = req.body;
  const { status, message } = await authorService.createAuthor(author);

  return res.status(status).json({ message });
};
export const destroyAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, message } = await authorService.deleteAuthor(id);
  return res.status(status).json({ message });
};
export const searchAuthor = async (req: Request, res: Response) => {
  return res.status(200).json({ message: "Hello World" });
};
