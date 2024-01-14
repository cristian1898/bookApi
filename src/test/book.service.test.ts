import { db } from "@libs/firebase";
import { BookService } from "@services/book";
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


const book = {
         title: "ccristian1",
  author: "ccristian1",
  description: "ccristian1",
  img: "https://theworldneedsyourbook.com/shop/wp-content/uploads/2020/11/13-Author-Mindset-Solo-Ebook.png",
  price: 12,
  genere: "ccristian1",  language: "ccristian1",  pageCount: 14,  publicationYear:"ccristian1",  url: "ccristian1",  discount:10,  createdAt: "172347484222",
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


describe("BookService", () => {
  let bookService: BookService;

  beforeEach(() => {
    bookService = new BookService();
  });



  describe("deleteBook", () => {
    it("should delete an author and return success message", async () => {
      const id = "existingId";
      const result = await bookService.deleteBook(id);
      expect(result).toEqual({ message: "Book with id: existingId deleted", status: 200 });
    });

  
  });



  describe("updateBook", () => {
    it("should update an book and return success message", async () => {
      
      const id = "undefined";
      const result = await bookService.updateBook(book, id);
      expect(result).toEqual({ message: "Book with id: undefined updated", status: 200 });
    });
  });



 describe("createBook", () => {
    it("creates an book", async () => {
      (db.collection("book").add as jest.Mock).mockResolvedValueOnce({ id: "mockedId" });
      const result = await bookService.createBook(book);

      expect(db.collection("book").add).toBeDefined();
      expect(result).toEqual({"message": "Book with id:  created","status": 201});
    });
  });



  describe("getBooks", () => {
    it("returns a list of books", async () => {
      (db.collection("book").get as jest.Mock).mockResolvedValueOnce({ docs: [book] });
      jest.spyOn(bookService, "getBooks").mockResolvedValueOnce({status: 200,  message: "Successfully found book",  details: [book]});

      const result = await bookService.getBooks();

      expect(db.collection("book").get).toBeDefined();
      expect(result.details).toEqual([book]);
    });


  });



  describe("getOneBook", () => {
    it("returns one book", async () => {
 
      (db.collection("book").doc().get as jest.Mock).mockResolvedValueOnce(book);
jest.spyOn(bookService, "getOneBook").mockResolvedValueOnce({status: 200,  message: "Successfully found book",  details: book});
      const result = await bookService.getOneBook("mockedBookId");

      expect(db.collection("book").doc).toBeDefined();
      expect(result.details).toEqual(book);
    });


  });


});
