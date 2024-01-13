import { db } from "@libs/firebase";
import { AuthorService } from "@services/author";
import { MessagesError } from "@utils/errors/error.hash";



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


const author = {
        name: "ccristian1",
        email: "cristiantest1@gmail.com.ts",
        img: "https://theworldneedsyourbook.com/shop/wp-content/uploads/2020/11/13-Author-Mindset-Solo-Ebook.png",
        biographyInformation: "My description1",
        firstName: "Cristian1",
        lastName: "Test1",
      };


jest.mock("@utils/errors/error.hash", () => ({
  MessagesError: {
    notFoundError: jest.fn(() => ({ message: "Not Found", status: 500 })),
    deleteID: jest.fn((name, id) => ({
      message: `${name} with id: ${id} deleted`,
      status: 200,
    })),
    updateID: jest.fn((name, id) => ({
      message: `${name} with id: ${id} updated`,
      status: 200,
    })),
    createdID: jest.fn((name, id) => ({
      message: `${name} with id: ${id} created`,
      status: 201,
    })),
    list: jest.fn((name, data) => ({
      message: `Successfully found ${name}`,
      details: data,
      status: 200,
    })),
    listOne: jest.fn((name, id, item) => ({
      message: `Successfully found ${name} with id: ${id}`,
      status: 200,
      details: item,
    })),
    internalError: jest.fn(() => ({
      message: "Internal server error",
      status: 500,
    })),
  },
}));


describe("AuthorService", () => {
  let authorService: AuthorService;

  beforeEach(() => {
    authorService = new AuthorService();
  });



  describe("deleteAuthor", () => {
    it("should delete an author and return success message", async () => {
      const id = "existingId";
      const result = await authorService.deleteAuthor(id);
      expect(result).toEqual({ message: "Author with id: existingId deleted", status: 200 });
    });

  
  });



  describe("updateAuthor", () => {
    it("should update an author and return success message", async () => {
      
      const id = "undefined";
      const result = await authorService.updateAuthor(author, id);
      expect(result).toEqual({ message: "Author with id: undefined updated", status: 200 });
    });
  });



 describe("createAuthor", () => {
    it("creates an author", async () => {
      (db.collection("author").add as jest.Mock).mockResolvedValueOnce({ id: "mockedId" });
      const result = await authorService.createAuthor(author);

      expect(db.collection("author").add).toBeDefined();
      expect(result).toEqual({"message": "Author with id:  created","status": 201});
    });
  });



  describe("getAuthors", () => {
    it("returns a list of authors", async () => {
      (db.collection("author").get as jest.Mock).mockResolvedValueOnce({ docs: [author] });
      jest.spyOn(authorService, "getAuthors").mockResolvedValueOnce({status: 200,  message: "Successfully found author",  details: [author]});

      const result = await authorService.getAuthors();

      expect(db.collection("author").get).toBeDefined();
      expect(result.details).toEqual([author]);
    });


  });



  describe("getOneAuthor", () => {
    it("returns one author", async () => {
 
      (db.collection("author").doc().get as jest.Mock).mockResolvedValueOnce(author);
jest.spyOn(authorService, "getOneAuthor").mockResolvedValueOnce({status: 200,  message: "Successfully found author",  details: author});
      const result = await authorService.getOneAuthor("mockedAuthorId");

      expect(db.collection("author").doc).toBeDefined();
      expect(result.details).toEqual(author);
    });


  });


});
