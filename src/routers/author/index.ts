import { createAuthor, getAuthor, listAuthors, updateAuthor } from "@controllers/author";
import { authorIdSchema, authorSchema } from "@middlewares/schema/author.schema";
import { Router } from "express";
import apicache from 'apicache'; // prod use redis
import env, { onlyStatus200 } from "@config";
let cache = apicache.middleware;

const routerAuthor = Router();

routerAuthor.get("/author/:id",cache(env.CACHE,onlyStatus200),authorIdSchema, getAuthor);
routerAuthor.get("/author",cache(env.CACHE,onlyStatus200),listAuthors);
routerAuthor.post("/author", authorSchema, createAuthor);
routerAuthor.put("/author/:id",authorIdSchema, authorSchema, updateAuthor);
routerAuthor.delete("/author/:id",authorIdSchema, updateAuthor);


export { routerAuthor };
