async function getBooks() {
    const query = document.getElementById("query").value;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;

    const res = await fetch(url);
    const data = await res.json();

    displayBooks(data.items);
}

function displayBooks(books) {
    const container = document.getElementById("books");
    container.innerHTML = "";

    books.slice(0, 10).forEach(book => {
        const info = book.volumeInfo;

        const bookDiv = document.createElement("div");
        bookDiv.className = "book";

        bookDiv.innerHTML = `
            <img src="${info.imageLinks ? info.imageLinks.thumbnail : ''}">
            <h3>${info.title}</h3>
            <p><b>Author:</b> ${info.authors ? info.authors.join(", ") : "N/A"}</p>
            <p><b>Rating:</b> ${info.averageRating || "N/A"}</p>
            <p>${info.description ? info.description.substring(0, 100) + "..." : "No description"}</p>
        `;

        container.appendChild(bookDiv);
    });
}