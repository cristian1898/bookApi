import { BOOKINPUT,BOOKOUTPUT } from "@interfaces/books";

export class BookModel {
  book: BOOKINPUT  | undefined;
  response(bookIn: BOOKINPUT): BOOKOUTPUT {
    return {
      id: bookIn.id,
      title: bookIn.title,
      author: bookIn.author,
      description: bookIn.description,
      img: bookIn.img,
      price: bookIn.cost,
      genere: bookIn.genere,
      language: bookIn.language,
      pageCount: bookIn.page_count,
      publicationYear: bookIn.publication_year,
      url: bookIn.url,
      discount: bookIn.discount,
      createdAt: bookIn.created,
    };
  }

  create(book: BOOKOUTPUT): BOOKINPUT {
    this.book = {
      title: book.title,
      author: book.author,
      description: book.description,
      img: book.img,
      cost: book.price,
      genere: book.genere,
      language: book.language,
      page_count: book.pageCount,
      publication_year: book.publicationYear,
      url: book.url,
      discount: book.discount,
      created: book.createdAt,
    };
    return this.book;
  }
}
