export interface BOOK {
  title: string;
  author: string;
  description: string;
  img: string;
  price: number;
  genere: string;
  language: string;
  pageCount: number;
  publicationYear: string;
  url: string;
  discount: number;
  createdAt?: string;
}
interface BOOKBASE {
  id?: string;
  title: string;
  author: string;
  description: string;
  img: string;
  genere: string;
  language: string;
  url: string;
  discount: number;
}

export interface BOOKINPUT extends BOOKBASE {
  cost: number;
  page_count: number;
  publication_year: string;
  created?: string;
}

export interface BOOKOUTPUT extends BOOKBASE {
  price: number;
  pageCount: number;
  publicationYear: string;
  createdAt?: string;
}
