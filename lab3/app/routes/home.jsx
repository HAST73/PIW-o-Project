import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Services/init";
import { auth } from "../Services/init";
import BookItem from "../Components/BookItem";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [queryText, setQueryText] = useState("");
  const [genre, setGenre] = useState("");
  const [userId, setUserId] = useState(null);
  const [showMine, setShowMine] = useState(false);

  // Zabezpieczenie przed błędem SSR
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUserId(user?.uid || null);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      const booksRef = collection(db, "books");
      const q = showMine && userId ? query(booksRef, where("userId", "==", userId)) : booksRef;
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBooks(list);
    };
    fetchBooks();
  }, [showMine, userId]);

  const filtered = books.filter(b =>
    b.title.toLowerCase().includes(queryText.toLowerCase()) &&
    (genre ? b.genre === genre : true)
  );

  // Dopóki komponent nie zamontuje się w przeglądarce, nic nie renderuj
  if (!hasMounted) return null;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          placeholder="Search by title"
          onChange={(e) => setQueryText(e.target.value)}
        />
        <select className="p-2 border rounded" onChange={(e) => setGenre(e.target.value)}>
          <option value="">All genres</option>
          <option value="fantasy">Fantasy</option>
          <option value="sci-fi">Sci-Fi</option>
          <option value="romance">Romance</option>
        </select>
        {userId && (
          <button onClick={() => setShowMine(!showMine)} className="p-2 border rounded">
            {showMine ? "All Books" : "My Books"}
          </button>
        )}
      </div>

      {filtered.map(book => <BookItem key={book.id} book={book} />)}
    </div>
  );
}
