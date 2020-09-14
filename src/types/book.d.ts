export type Book = {
  id: string;
  title: string;
  synopsis: string;
  chapters: Chapter[];
  created: string;
  updated: string;
}

export type Chapter = {
  id: string;
  bookId: string;
  number: string;
  title: string;
  epigraph: string;
  content: string;
  created: string;
  updated: string;
}
