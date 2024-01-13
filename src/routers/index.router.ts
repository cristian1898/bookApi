import { Router } from "express";

import { helloWorld } from "@controllers/hello";

const router = Router();

router.get("/", helloWorld);

export { router };
