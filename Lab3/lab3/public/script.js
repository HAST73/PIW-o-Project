const books = [
    { title: "Wiedźmin", genre: "fantasy",  },
    { title: "Diuna", genre: "sci-fi" },
    { title: "Hobbit", genre: "fantasy" },
];

function renderBooks(list) {
    const container = document.getElementById("bookList");
    container.innerHTML = "";

    list.forEach(book => {
        const div = document.createElement("div");
        div.classList.add("book");
        div.textContent = `${book.title} - ${book.genre}`;
        container.appendChild(div);
    });
}

function applyFilters() {
    const search = document.getElementById("searchInput").value.toLowerCase();
    const genre = document.getElementById("genreFilter").value;

    const filtered = books.filter(book => {
        const matchesTitle = book.title.toLowerCase().includes(search);
        const matchesGenre = genre === "" || book.genre === genre;
        return matchesTitle && matchesGenre;
    });

    renderBooks(filtered);
}

document.addEventListener("DOMContentLoaded", () => {
    renderBooks(books);
    document.getElementById("filterButton").addEventListener("click", applyFilters);
});

document.getElementById("addBookButton").addEventListener("click", function () {
    window.location.href = "index2.html";
});
