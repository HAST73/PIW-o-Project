import { useContext, useState } from "react";
import { BookContext } from "../Contexts/BookContext";
import BookItem from "../Components/BookItem";

export default function Home() {
  const { books } = useContext(BookContext);
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");

  const filtered = books.filter(b =>
    b.title.toLowerCase().includes(query.toLowerCase()) &&
    (genre ? b.genre === genre : true)
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          placeholder="Search by title"
          onChange={(e) => setQuery(e.target.value)}
        />
        <select className="p-2 border rounded" onChange={(e) => setGenre(e.target.value)}>
          <option value="">All genres</option>
          <option value="fantasy">Fantasy</option>
          <option value="sci-fi">Sci-Fi</option>
          <option value="romance">Romance</option>
        </select>
      </div>

      {filtered.map(book => <BookItem key={book.id} book={book} />)}
    </div>
  );
}
