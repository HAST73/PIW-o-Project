import { doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../Services/init";
import { Link } from "react-router-dom";

export default function BookItem({ book }) {
  const user = auth.currentUser;

  const handleDelete = async () => {
    if (book.userId !== user?.uid) {
      alert("Not authorized to delete this book.");
      return;
    }

    const confirm = window.confirm("Are you sure you want to delete this book?");
    if (!confirm) return;

    await deleteDoc(doc(db, "books", book.id));
    alert("Book deleted. Refresh to see changes.");
  };

  return (
    <article className="list-horizontal flex justify-between items-center border p-2 rounded shadow-sm bg-white">
      <div>
        <strong>{book.title}</strong> <span>({book.genre})</span><br />
        <small>{book.author}</small>
      </div>
      {user?.uid === book.userId && (
        <div className="flex gap-2">
          <Link to={`/new?id=${book.id}`}>
            <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</button>
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </article>
  );
}
