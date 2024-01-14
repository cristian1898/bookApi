import { checkSchema } from "express-validator";

export const bookSchema = checkSchema({
  title: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  author: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  description: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  img: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  price: {
    in: ["body"],
    isFloat: true,
    notEmpty: true,
  },
  genere: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  language: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  pageCount: {
    in: ["body"],
    isInt: true,
    notEmpty: true,
  },
  publicationYear: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  url: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  discount: {
    in: ["body"],
    isFloat: true,
  },
  createdAt: {
    in: ["body"],
    optional: true,
  },
});
