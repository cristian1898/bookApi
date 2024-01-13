export class Book {
  title: string;
  author: string;
  description: string;
  img: string;
  price: number;
  genere: string;
  language: string;
  page_count: number;
  publication_year: string;
  url: string;
  discount: number;
  created: string;

  constructor(
  title: string,
  author: string,
  description: string,
  img: string,
  cost: number,
  genere: string,
  language: string,
  pageCount: number,
  publicationYear: string,
  url: string,
  discount: number,
  createdAt: string,
  ) {
  this.title = title;
  this.author = author;
  this.description = description;
  this.img = img;
  this.price = cost;
  this.genere = genere;
  this.language = language;
 this.page_count = pageCount;
  this.publication_year = publicationYear;
  this.url = url;
  this.discount = discount;
  this.created = createdAt;
  }
}
