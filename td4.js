// Exercice 1: Fetch and display the list of books
// Consignes:
// 1. Réaliser une requête GET sur le endpoint https://anapioficeandfire.com/api/books.
// 2. Afficher dans la console les caractéristiques de la réponse : response.status, response.statusText, response.ok, response.url.
// 3. Si la réponse est un succès (status 2xx), afficher le nom, le nombre de pages et l'ISBN de chaque livre.

function fetchBooks(url) {
    fetch(url)
        .then(response => {
            displayResponseDetails(response);
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        })
        .then(data => {
            data.forEach(book => {
                console.log(`Title: ${book.name}, Pages: ${book.numberOfPages}, ISBN: ${book.isbn}`);
            });
        })
        .catch(error => console.error('Error fetching books:', error));
}

function displayResponseDetails(response) {
    console.log(`Status: ${response.status}, Status Text: ${response.statusText}, OK: ${response.ok}, URL: ${response.url}`);
}

// Exercice 2: Fetch and display details of a specific book
// Consignes:
// 1. Construire une fonction qui reçoit en paramètre un numéro de livre.
// 2. Afficher dans la console les détails du livre : titre, ISBN, auteurs, nombre de pages, nombre de personnages, liste des 10 premiers personnages (URL).

function fetchBookDetails(bookId) {
    const url = `https://anapioficeandfire.com/api/books/${bookId}`;
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        })
        .then(book => {
            console.log(`Title: ${book.name}, ISBN: ${book.isbn}, Authors: ${book.authors.join(', ')}, Pages: ${book.numberOfPages}`);
            console.log(`Number of Characters: ${book.characters.length}`);
            console.log('First 10 Characters:', book.characters.slice(0, 10));
        })
        .catch(error => console.error('Error fetching book details:', error));
}

// Exercice 3: Fetch and display book and main character details
// Consignes:
// 1. Construire une fonction qui reçoit un numéro de livre.
// 2. Afficher dans la console les informations relatives au livre : titre, ISBN, auteurs, nombre de pages.
// 3. Afficher des détails sur le personnage principal (le premier de la liste) : nom, genre, titres, liste des livres dans lesquels il apparaît.

function fetchBookAndMainCharacter(bookId) {
    const url = `https://anapioficeandfire.com/api/books/${bookId}`;
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        })
        .then(book => {
            console.log(`Title: ${book.name}, ISBN: ${book.isbn}, Authors: ${book.authors.join(', ')}, Pages: ${book.numberOfPages}`);
            document.body.innerHTML = `<p>${book.name}</p>`;
            if (book.characters.length > 0) {
                fetch(book.characters[0])
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                    })
                    .then(character => {
                        console.log(`Main Character: ${character.name}, Gender: ${character.gender}, Titles: ${character.titles.join(', ')}`);
                        console.log('Books Appeared In:', character.books);
                        document.innerHTML = character.books;
                    })
                    .catch(error => console.error('Error fetching character details:', error));
            } else {
                console.log('No characters found for this book.');
            }
        })
        .catch(error => console.error('Error fetching book and character details:', error));
}

// Example usage:
fetchBooks('https://anapioficeandfire.com/api/books');
fetchBookDetails(1);
fetchBookAndMainCharacter(1);

