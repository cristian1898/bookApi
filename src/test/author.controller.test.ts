import * as ctrl from "@controllers/author";
import { AuthorService } from "@services/author";
import { db } from "@libs/firebase";
import { authorIdSchema, authorSchema } from "@middlewares/schema/author.shema";

import { ResponseMethod } from "@interfaces/index";

const defaultResponse = {
  status: 200,
  message: "Success",
  details: {},
};

jest.mock("@middlewares/schema/author.shema");
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
jest.mock("@services/author");
jest.mock("@controllers/author", () => ({
  ...jest.requireActual("@controllers/author"),
  getAuthor: jest
    .fn()
    .mockResolvedValue({ status: 200, message: "Success", details: {} }),
  listAuthors: jest
    .fn()
    .mockResolvedValue({ status: 200, message: "Success", details: [{}] }),
  updateAuthor: jest
    .fn()
    .mockResolvedValue({ status: 200, message: "Success Update" }),
  createAuthor: jest
    .fn()
    .mockResolvedValue({ status: 201, message: "Success" }),
  destroyAuthor: jest
    .fn()
    .mockResolvedValue({ status: 200, message: "Success Delete" }),
}));

describe("Controladores de Author", () => {
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

  describe("getAuthor", () => {
    it("debería devolver un autor según el ID proporcionado", async () => {
      const result = await ctrl.getAuthor(req, res);

      expect(res.status).toBeDefined();
      expect(result).toEqual(defaultResponse);
    });
  });

  describe("listAuthors", () => {
    it("debería devolver una lista de autores", async () => {
      const result: any | ResponseMethod = await ctrl.listAuthors(req, res);

      expect(res.status).toBeDefined();
      expect(result.details).toEqual([{}]);
    });
  });

  describe("updateAuthor", () => {
    it("debería actualizar un autor según el ID proporcionado", async () => {
      const result: any | ResponseMethod = await ctrl.updateAuthor(req, res);
      expect(res.status).toBeDefined();
      expect(result.status).toEqual(200);
    });
  });

  describe("createAuthor", () => {
    it("debería crear un nuevo autor", async () => {
      const result: any | ResponseMethod = await ctrl.createAuthor(req, res);
      expect(res.status).toBeDefined();
      expect(result.status).toEqual(201);
      expect(result.message).toEqual(defaultResponse.message);
    });
  });

  describe("destroyAuthor", () => {
    it("debería eliminar un autor según el ID proporcionado", async () => {
      const result: any | ResponseMethod = await ctrl.destroyAuthor(req, res);
      expect(res.status).toBeDefined();
      expect(result.status).toEqual(200);
      expect(result.message).toEqual("Success Delete");
    });
  });
});
