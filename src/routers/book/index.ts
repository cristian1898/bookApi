import {
  createBook,
  destroyBook,
  getBook,
  listBooks,
  listBooksByAuthor,
  updateBook,
} from "@controllers/book";
import { authorIdSchema } from "@middlewares/schema/author.schema";
import { Router } from "express";
import apicache from "apicache"; // prod use redis
import env, { onlyStatus200 } from "@config";
import { bookSchema } from "@middlewares/schema/book.schema";
let cache = apicache.middleware;

const routerBook = Router();

routerBook.get(
  "/book/:id/author",
  cache(env.CACHE, onlyStatus200),
  authorIdSchema,
  listBooksByAuthor,
);
routerBook.get(
  "/book/:id",
  cache(env.CACHE, onlyStatus200),
  authorIdSchema,
  getBook,
);
routerBook.get("/book", listBooks);
routerBook.post("/book", bookSchema, createBook);
routerBook.put("/book/:id", authorIdSchema, bookSchema, updateBook);
routerBook.delete("/book/:id", authorIdSchema, destroyBook);

export { routerBook };
