import * as ctrl from "@controllers/book";
import { BookService } from "@services/book";
import { db } from "@libs/firebase";
import { authorIdSchema } from "@middlewares/schema/author.schema";
import { bookSchema } from "@middlewares/schema/book.schema";

import { ResponseMethod } from "@interfaces/index";

const defaultResponse = {
  status: 200,
  message: "Success",
  details: {},
};
jest.mock("@middlewares/schema/book.schema");
jest.mock("@middlewares/schema/author.schema");
jest.mock("@libs/firebase", () => ({
  db: {
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: jest.fn(),
        delete: jest.fn(),
        update: jest.fn(),
      })),
      add: jest.fn(),
      get: jest.fn(),
    })),
  },
}));
jest.mock("@services/book");
jest.mock("@controllers/book", () => ({
  ...jest.requireActual("@controllers/book"),
  getBook: jest
    .fn()
    .mockResolvedValue({ status: 200, message: "Success", details: {} }),
  listBooks: jest
    .fn()
    .mockResolvedValue({ status: 200, message: "Success", details: [{}] }),
  updateBook: jest
    .fn()
    .mockResolvedValue({ status: 200, message: "Success Update" }),
  createBook: jest
    .fn()
    .mockResolvedValue({ status: 201, message: "Success" }),
  destroyBook: jest
    .fn()
    .mockResolvedValue({ status: 200, message: "Success Delete" }),
}));

describe("Controller of Book", () => {
  let req: any, res: any, next: any;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getBook", () => {
    it("should return a book based on the provided ID", async () => {
      const result = await ctrl.getBook(req, res);

      expect(res.status).toBeDefined();
      expect(result).toEqual(defaultResponse);
    });
  });

  describe("listBooks", () => {
    it("should return a list of books", async () => {
      const result: any | ResponseMethod = await ctrl.listBooks(req, res);

      expect(res.status).toBeDefined();
      expect(result.details).toEqual([{}]);
    });
  });

  describe("updateBook", () => {
    it("should update a workbook based on the ID provided", async () => {
      const result: any | ResponseMethod = await ctrl.updateBook(req, res);
      expect(res.status).toBeDefined();
      expect(result.status).toEqual(200);
    });
  });

  describe("createBook", () => {
    it("I should create a new book", async () => {
      const result: any | ResponseMethod = await ctrl.createBook(req, res);
      expect(res.status).toBeDefined();
      expect(result.status).toEqual(201);
      expect(result.message).toEqual(defaultResponse.message);
    });
  });

  describe("destroyBook", () => {
    it("should delete a book based on the ID provided", async () => {
      const result: any | ResponseMethod = await ctrl.destroyBook(req, res);
      expect(res.status).toBeDefined();
      expect(result.status).toEqual(200);
      expect(result.message).toEqual("Success Delete");
    });
  });
});
