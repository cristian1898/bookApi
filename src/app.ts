import cors from "cors";
import express from "express";
import morgan from "morgan";

import env from "@config";
import { router } from "@routers/index.router";
import { routerAuthor } from "@routers/author/index";
import { errorHandle } from "@middlewares/errors";
import { routerBook } from "@routers/book";

const app = express();

app.use(cors());
app.use(express.json());

if (env.DEBUG) app.use(morgan("dev"));

app.use(router);
app.use(routerAuthor);
app.use(routerBook);

app.use(errorHandle);

export { app };
