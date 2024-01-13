import "dotenv/config"
import { z } from "zod"
import {Request,Response } from "express";


// Schema validation for env
const schema = z.object({
	PORT: z.string().default("3333"),
	JWT_SECRET: z.string().default("secret123"),
	DEBUG: z.boolean().default(false),
  CACHE: z.string().default("5 minutes")
})

const env = schema.parse(process.env)

export default env


// Middleware change status code
export const onlyStatus200 = (req:Request, res:Response) => res.statusCode === 200 || res.statusCode === 304;

