import { AUTHORINPUT, AUTHOROUTPUT } from "@interfaces/author";
import { ResponseMethod } from "@interfaces/index";
import { db } from "@libs/firebase";
import { AutorModel } from "@models/author";
import { BookService } from "@services/book";
import { MessagesError } from "@utils/errors/error.hash";

export class AuthorService {
  authorModel = new AutorModel();
  bookService = new BookService();

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

  async deleteAuthor(id: string): Promise<ResponseMethod> {
    return this.handleService<ResponseMethod>(async () => {
      const { details } = await this.bookService.getBooksByAuthorCount(id);
      if (details?.count > 0) {
        return this.messageError["notDeleteError"]();
      }
      const authorItem = await db.collection("author").doc(id);

      if (!authorItem) {
        return this.messageError["notFoundError"]();
      }
      await authorItem.delete();

      return this.messageError["deleteID"]("Author", id);
    });
  }

  async updateAuthor(
    author: AUTHOROUTPUT,
    id: string,
  ): Promise<ResponseMethod> {
    return this.handleService<ResponseMethod>(async () => {
      const authorItem = id ? await db.collection("author").doc(id) : null;

      if (!authorItem) {
        return this.messageError["notFoundError"]();
      }
      const authorItemUpdate: { [field: string]: any } =
        this.authorModel.create(author);
      await authorItem.update(authorItemUpdate);
      return this.messageError["updateID"]("Author", authorItem.id);
    });
  }

  async createAuthor(author: AUTHOROUTPUT): Promise<ResponseMethod> {
    return this.handleService<ResponseMethod>(async () => {
      const email = await db
        .collection("author")
        .where("email", "==", author.email)
        .get();
      if (!email.empty) {
        return this.messageError["notFoundErrorUser"]();
      }
      const authorItem = this.authorModel.create(author);
      const res = await db.collection("author").add(authorItem);
      return this.messageError["createdID"]("Author", res?.id || "");
    });
  }
  async getAuthors(): Promise<ResponseMethod> {
    return this.handleService<ResponseMethod>(async () => {
      const { docs } = await db.collection("author").get();
      if (!docs || !docs.length) {
        return this.messageError["notFoundError"]();
      }
      const list = docs.map((doc) => {
        let author = doc.data() as AUTHORINPUT;
        author.id = doc.id;
        return this.authorModel.response(author);
      });
      return this.messageError["list"]("Author", { list, count: list.length });
    });
  }
  async getOneAuthor(authorId: string): Promise<ResponseMethod> {
    return this.handleService<ResponseMethod>(async () => {
      const docs = await db.collection("author").doc(authorId).get();
      if (!docs.exists) {
        return this.messageError["notFoundError"]();
      }
      let author = docs.data() as AUTHORINPUT;
      author.id = docs.id;
      return this.messageError["listOne"](
        "Author",
        authorId,
        this.authorModel.response(author),
      );
    });
  }
}
