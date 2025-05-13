// Suppression de l'importation de Handlebars car il est chargé via le CDN dans index.html


// Université de Lorraine T Info S4
// Programmation web en JS
// TD n° 5 : Templates

// Initialisation de l'application
const apiBaseUrl = 'https://anapioficeandfire.com/api';

// Fonction pour récupérer la liste des livres
function fetchBooks() {
    fetch(`${apiBaseUrl}/books`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        })
        .then(books => {
            renderBooksList(books);
        })
        .catch(error => console.error('Error fetching books:', error));
}

// Fonction pour afficher la liste des livres avec Handlebars
function renderBooksList(books) {
    const source = document.getElementById('books-template').innerHTML;
    const template = Handlebars.compile(source);
    const html = template({ books });
    document.getElementById('books-container').innerHTML = html;
}

// Fonction pour récupérer et afficher les détails d'un livre
function fetchBookDetails(bookId) {
    fetch(`${apiBaseUrl}/books/${bookId}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        })
        .then(book => {
            renderBookDetails(book);
        })
        .catch(error => console.error('Error fetching book details:', error));
}

// Fonction pour afficher les détails d'un livre avec Handlebars
function renderBookDetails(book) {
    const source = document.getElementById('book-details-template').innerHTML;
    const template = Handlebars.compile(source);
    const html = template(book);
    document.getElementById('book-details-container').innerHTML = html;
}

// Fonction pour récupérer et afficher les détails du personnage principal
function fetchMainCharacterDetails(characterUrl) {
    fetch(characterUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        })
        .then(character => {
            renderCharacterDetails(character);
        })
        .catch(error => console.error('Error fetching character details:', error));
}

// Fonction pour afficher les détails du personnage principal avec Handlebars
function renderCharacterDetails(character) {
    const source = document.getElementById('character-details-template').innerHTML;
    const template = Handlebars.compile(source);
    const html = template(character);
    document.getElementById('character-details-container').innerHTML = html;
}

// Charger la liste des livres au démarrage
document.addEventListener('DOMContentLoaded', () => {
    fetchBooks();
});

// Rendre les fonctions accessibles globalement
window.fetchBooks = fetchBooks;
window.fetchBookDetails = fetchBookDetails;
window.fetchMainCharacterDetails = fetchMainCharacterDetails;