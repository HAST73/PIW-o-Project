import { createContext, useState } from "react";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([
    { id: 1, title: "The Witcher", genre: "fantasy", author: "Andrzej Sapkowski" },
    { id: 2, title: "Dune", genre: "sci-fi", author: "Frank Herbert" },
    { id: 5, title: "The Hobbit", genre: "fantasy", author: "J.R.R. Tolkien" },
    { id: 6, title: "The Fault in Our Stars", genre: "romance", author: "John Green" }
  ]);

  return (
    <BookContext.Provider value={{ books, setBooks }}>
      {children}
    </BookContext.Provider>
  );
};
