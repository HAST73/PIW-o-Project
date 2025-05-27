export default function BookItem({ book }) {
  return (
    <article className="list-horizontal">
      <div>
        <strong>{book.title}</strong> <span>({book.genre})</span><br />
        <small>{book.author}</small>
      </div>
      <div className="center">
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </article>
  );
}
