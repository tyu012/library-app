let myLibrary = [];
let bookDisplay = document.querySelector("#content");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.infoAsString = function() {
    const hasReadText = this.read ? "has read" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${hasReadText}`;
}

Book.prototype.infoAsList = function() {
    let bookInfoList = document.createElement("ul");

    let titleListItem = document.createElement("li");
    titleListItem.textContent = `Title: ${this.title}`;
    bookInfoList.appendChild(titleListItem);

    let authorListItem = document.createElement("li");
    authorListItem.textContent = `Author: ${this.author}`;
    bookInfoList.appendChild(authorListItem);

    let pagesListItem = document.createElement("li");
    pagesListItem.textContent = `${this.pages} pages`;
    bookInfoList.appendChild(pagesListItem);

    let readListItem = document.createElement("li");
    readListItem.textContent = this.read ? "Read" : "Not read";
    bookInfoList.appendChild(readListItem);

    bookInfoList.classList.add("book-info-list");

    return bookInfoList;
}

function createBookListElementFromArray(bookArray) {
    let bookList = document.createElement("div");

    bookArray.forEach(book => {
        console.log(book);
        bookList.appendChild(book.infoAsList());
    })

    bookList.classList.add("book-list");

    return bookList;
}

function testApp() {
    for (let i = 0; i < 5; i++) {
        let newBook = new Book("Title", "Author", 250, false);
        console.log(newBook);
        myLibrary.push(newBook);
    }

    bookList = createBookListElementFromArray(myLibrary);
    bookDisplay.appendChild(bookList);
}

testApp();