import { BOOKINPUT, BOOKOUTPUT } from "@interfaces/books";
import { ResponseMethod } from "@interfaces/index";
import { db } from "@libs/firebase";
import { BookModel } from "@models/book";
import { MessagesError } from "@utils/errors/error.hash";

export class BookService {
  bookModel = new BookModel();
  messageError = MessagesError;

  async handleService<T>(
    method: () => Promise<T>,
  ): Promise<T | ResponseMethod> {
    try {
      const response = await method();
      return response;
    } catch (error) {
      return this.messageError["internalError"]();
    }
  }

  async deleteBook(id: string): Promise<ResponseMethod> {
    return this.handleService<ResponseMethod>(async () => {
      const bookItem = await db.collection("ebooks").doc(id);

      if (!bookItem) {
        return this.messageError["notFoundError"]();
      }
      await bookItem.delete();

      return this.messageError["deleteID"]("Book", id);
    });
  }

  async updateBook(book: BOOKOUTPUT, id: string): Promise<ResponseMethod> {
    return this.handleService<ResponseMethod>(async () => {
      const bookItem = id ? await db.collection("ebooks").doc(id) : null;

      if (!bookItem) {
        return this.messageError["notFoundError"]();
      }
      const bookItemUpdate: { [field: string]: any } =
        this.bookModel.create(book);
      await bookItem.update(bookItemUpdate);
      return this.messageError["updateID"]("Book", bookItem.id);
    });
  }

  async createBook(book: BOOKOUTPUT): Promise<ResponseMethod> {
    return this.handleService<ResponseMethod>(async () => {
      const bookItem = this.bookModel.create(book);
      const res = await db.collection("ebooks").add(bookItem);
      return this.messageError["createdID"]("Book", res?.id || "");
    });
  }
  async getBooks(): Promise<ResponseMethod> {
    return this.handleService<ResponseMethod>(async () => {
      const { docs } = await db.collection("ebooks").get();
      if (!docs || !docs.length) {
        return this.messageError["notFoundError"]();
      }
      const list = docs.map((doc) => {
        let book = doc.data() as BOOKINPUT;
        book.id = doc.id;
        return this.bookModel.response(book);
      });
      return this.messageError["list"]("Book", {list,count:list.length});
    });
  }
  async getBooksByAuthor(id: string): Promise<ResponseMethod> {
    return this.handleService<ResponseMethod>(async () => {
      const { docs } = await db
        .collection("ebooks")
        .where("author", "==", id)
        .get();

      if (!docs || !docs.length) {
        return this.messageError["notFoundError"]();
      }
      const list = docs.map((doc) => {
        let book = doc.data() as BOOKINPUT;
        book.id = doc.id;
        return this.bookModel.response(book);
      });
      return this.messageError["list"]("Book", {list,count:list.length});
    });
  }
  async getBooksByAuthorCount(id: string): Promise<ResponseMethod> {
    return this.handleService<ResponseMethod>(async () => {
      const booksSnapshot= await db
        .collection("ebooks")
        .where("author", "==", id)
        .get();

      if (!booksSnapshot || !booksSnapshot.size) {
        return this.messageError["list"]("Book", {count:0});
      }
      const count = booksSnapshot.size;
      return this.messageError["list"]("Book", {count});
    });
  }
  async getOneBook(bookId: string): Promise<ResponseMethod> {
    return this.handleService<ResponseMethod>(async () => {
      const docs = await db.collection("ebooks").doc(bookId).get();
      if (!docs.exists) {
        return this.messageError["notFoundError"]();
      }
      let book = docs.data() as BOOKINPUT;
      book.id = docs.id;
      return this.messageError["listOne"](
        "Book",
        bookId,
        this.bookModel.response(book),
      );
    });
  }
}
