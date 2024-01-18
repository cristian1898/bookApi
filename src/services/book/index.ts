import { AUTHORINPUT } from "@interfaces/author";
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
      let bookItemUpdate: { [field: string]: any } =
        this.bookModel.create(book);
      delete bookItemUpdate?.created;
      await bookItem.update(bookItemUpdate);
      return this.messageError["updateID"]("Book", bookItem.id);
    });
  }

  async createBook(book: BOOKOUTPUT): Promise<ResponseMethod> {
    return this.handleService<ResponseMethod>(async () => {
      let bookItem = this.bookModel.create(book);
      delete bookItem.created;
      const res = await db.collection("ebooks").add(bookItem);

      return this.messageError["createdID"]("Libro", res?.id || "");
    });
  }
  async getBooks(): Promise<ResponseMethod> {
    return this.handleService<ResponseMethod>(async () => {
      const { docs } = await db.collection("ebooks").get();
      const response = await db.collection("author").get();
      if (!docs || !docs.length) {
        return this.messageError["notFoundError"]();
      }
      let authors: any = {};
      if (response && response.docs?.length) {
        response.docs.map((doc) => {
          let item = doc.data() as AUTHORINPUT;
          item.id = doc.id;
          authors[doc.id] = { name: item.name, email: item.email, id: item.id };
          return;
        });
      }

      const list = docs.map((doc) => {
        let book = doc.data() as BOOKINPUT;
        book.id = doc.id;
        const year: any = book.publication_year;

        book.author = authors ? authors[book.author]?.name : book.author;
        return this.bookModel.response(book);
      });

      return this.messageError["list"]("Libro", {
        list,
        count: list.length,
        listAuthors: Object.values(authors),
      });
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
        const year: any = book.publication_year;
        book.id = doc.id;
        return this.bookModel.response(book);
      });
      return this.messageError["list"]("Libro", { list, count: list.length });
    });
  }
  async getBooksByAuthorCount(id: string): Promise<ResponseMethod> {
    return this.handleService<ResponseMethod>(async () => {
      const booksSnapshot = await db
        .collection("ebooks")
        .where("author", "==", id)
        .get();

      if (!booksSnapshot || !booksSnapshot.size) {
        return this.messageError["list"]("Libro", { count: 0 });
      }
      const count = booksSnapshot.size;
      return this.messageError["list"]("Libro", { count });
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
