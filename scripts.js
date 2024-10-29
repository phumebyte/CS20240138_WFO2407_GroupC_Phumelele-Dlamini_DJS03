import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

let currentPage = 1;
let filteredBooks = books;

//Function to create HTML element for a book
function createBookElement({ author, id, image, title }){
    const bookElement = document.createElement('button')
    bookElement.classList = 'preview'
    bookElement.setAttribute('data-preview', id)

    bookElement.innerHTML = `
        <img
            class="preview__image"
            src="${image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `
    return bookElement
}

// Function to render the list of books
function renderBookList(bookList){
const initialBookList = document.createDocumentFragment()

// Filters and appends all initial books to book list
for (const book of bookList) {
    initialBookList.appendChild(createBookElement(book))
}
    document.querySelector('[data-list-items]').appendChild(initialBookList)
}

// Function to create options for genres and authors
function createOptionElements(data, defaultText){
    const fragment = document.createDocumentFragment()
    const defaultOption = document.createElement('option')
    defaultOption.value = 'any'
    defaultOption.innerText = defaultText

    fragment.appendChild(defaultOption)

    for (const [id, name] of Object.entries(data)) {
        const optionElement = document.createElement('option')
        optionElement.value = id
        optionElement.innerText = name

        fragment.appendChild(optionElement)
    }

    return fragment
}

// Function that handles theme toggling
function toggleTheme(theme) {
    if(theme === 'night'){
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
}

// Initialisation function that triggers rendering for genre and author search
function init(){
    renderBookList(filteredBooks.slice(0, BOOKS_PER_PAGE));
    document.querySelector('[data-search-genres]').appendChild(createOptionElements(genres, 'All Genres'));
    document.querySelector('[data-search-authors]').appendChild(createOptionElements(authors, 'All Authors'));

    // Abstracted theme toggle function - triggered when initialisation function is called
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.querySelector('[data-settings-theme]').value = 'night'
        toggleTheme('night');
    } else {
        document.querySelector('[data-settings-theme]').value = 'day'
        toggleTheme('day');
    }
    document.querySelector('[data-list-button]').innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
    document.querySelector('[data-list-button]').disabled = (filteredBooks.length - (currentPage * BOOKS_PER_PAGE)) > 0

    document.querySelector('[data-list-button]').innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(filteredBooks.length - (filteredBooks * BOOKS_PER_PAGE)) > 0 ? (filteredBooks.length - (currentPage * BOOKS_PER_PAGE)) : 0})</span>
`
    addEventListeners();
}

// Function to add event listeners - organises and abstracts all event listeneers into a single function
function addEventListeners() {
    document.querySelector('[data-search-cancel]').addEventListener('click', () => {
        document.querySelector('[data-search-overlay]').open = false
    })
    
    document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
        document.querySelector('[data-settings-overlay]').open = false
    })
    
    document.querySelector('[data-header-search]').addEventListener('click', () => {
        document.querySelector('[data-search-overlay]').open = true 
        document.querySelector('[data-search-title]').focus()
    })
    
    document.querySelector('[data-header-settings]').addEventListener('click', () => {
        document.querySelector('[data-settings-overlay]').open = true 
    })
    
    document.querySelector('[data-list-close]').addEventListener('click', () => {
        document.querySelector('[data-list-active]').open = false
    })

    document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const { theme } = Object.fromEntries(formData)

        toggleTheme(theme)

    document.querySelector('[data-settings-overlay]').open = false
    })
}

document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = []

    for (const book of books) {
        let genreMatch = filters.genre === 'any'

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            result.push(book)
        }
    }

    currentPage = 1;
    filteredBooks = result

    if (result.length < 1) {
        document.querySelector('[data-list-message]').classList.add('list__message_show')
    } else {
        document.querySelector('[data-list-message]').classList.remove('list__message_show')
    }

    document.querySelector('[data-list-items]').innerHTML = ''
    const newItems = document.createDocumentFragment()

    for (const book of result.slice(0, BOOKS_PER_PAGE0)){
        newItems.appendChild(createBookElement(book))
    }

    document.querySelector('[data-list-items]').appendChild(newItems)
    document.querySelector('[data-list-button]').disabled = (filteredBooks.length - (currentPage * BOOKS_PER_PAGE)) < 1

    document.querySelector('[data-list-button]').innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(filteredBooks.length - (currentPage * BOOKS_PER_PAGE)) > 0 ? (filteredBooks.length - (currentPage * BOOKS_PER_PAGE)) : 0})</span>
    `

    window.scrollTo({top: 0, behavior: 'smooth'});
    document.querySelector('[data-search-overlay]').open = false
})

document.querySelector('[data-list-button]').addEventListener('click', () => {
    const fragment = document.createDocumentFragment()

    for (const book of filteredBooks.slice(currentPage * BOOKS_PER_PAGE, (currentPage + 1) * BOOKS_PER_PAGE)) {
        fragment.appendChild(createBookElement(book))
    }

    document.querySelector('[data-list-items]').appendChild(fragment)
    currentPage += 1
})

document.querySelector('[data-list-items]').addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    let active = null

    for (const node of pathArray) {
        if (active) break

        if (node?.dataset?.preview) {
            let result = null
    
            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook
            } 
        
            active = result
        }
    }
    
    if (active) {
        document.querySelector('[data-list-active]').open = true
        document.querySelector('[data-list-blur]').src = active.image
        document.querySelector('[data-list-image]').src = active.image
        document.querySelector('[data-list-title]').innerText = active.title
        document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        document.querySelector('[data-list-description]').innerText = active.description
    }
})

init()