document.getElementById("addBookForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const title = document.getElementById("bookTitle").value;
    const genre = document.getElementById("bookGenre").value;

    // Na razie tylko wypiszemy dane w konsoli
    console.log("Nowa książka:", title, genre);
    alert("Dodano książkę! (ale dane nie są jeszcze zapisane)");
});