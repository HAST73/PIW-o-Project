import { useEffect, useState } from "react";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../Services/init";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function New() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const bookId = searchParams.get("id");

  useEffect(() => {
    const fetchBook = async () => {
      if (bookId) {
        const docRef = doc(db, "books", bookId);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();

        const user = auth.currentUser;
        if (!user || data.userId !== user.uid) {
          alert("You are not authorized to edit this book.");
          return navigate("/");
        }

        setTitle(data.title);
        setAuthor(data.author);
        setGenre(data.genre);
        setIsEditing(true);
      }
    };

    fetchBook();
  }, [bookId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in.");
      return;
    }

    const bookData = {
      title,
      author,
      genre,
      userId: user.uid,
    };

    if (isEditing) {
      await updateDoc(doc(db, "books", bookId), bookData);
      alert("Book updated!");
    } else {
      await addDoc(collection(db, "books"), bookData);
      alert("Book added!");
    }

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold">{isEditing ? "Edit Book" : "Add New Book"}</h2>
      <input
        className="w-full p-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        className="w-full p-2 border rounded"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
        required
      />
      <select
        className="w-full p-2 border rounded"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        required
      >
        <option value="">Select genre</option>
        <option value="fantasy">Fantasy</option>
        <option value="sci-fi">Sci-Fi</option>
        <option value="romance">Romance</option>
      </select>
      <button
        className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700"
        type="submit"
      >
        {isEditing ? "Save Changes" : "Add Book"}
      </button>
    </form>
  );
}
