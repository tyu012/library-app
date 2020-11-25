let myLibrary = [];
let bookDisplay = document.querySelector("#content");
let newBookButton = document.querySelector("#new-book");




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




function BookForm() {
    this.createForm();
}

BookForm.prototype.createForm = function() {
    let form = document.createElement("form");

    form.appendChild(this.createField("text", "Title: ", "book-form-title"));
    form.appendChild(this.createField("text", "Author: ", "book-form-author"));
    form.appendChild(this.createField("text", "Pages: ", "book-form-pages"));
    form.appendChild(this.createField("checkbox", "I have read this book: ", "book-form-read"));
    
    let submitButton = document.createElement("input");
    submitButton.type = "submit";
    submitButton.id = "book-form-submit";
    submitButton.value = "Submit";
    form.appendChild(submitButton);

    this.form = form;
}

BookForm.prototype.createField = function(type, labelText, name) {
    let field = document.createElement("span");
    
    let label = document.createElement("label");
    label.setAttribute("for", name);
    label.textContent = labelText;
    label.id = `${name}-label`;
    field.appendChild(label);

    let input = document.createElement("input");
    input.type = type;
    input.id = name;
    input.name = name;
    field.appendChild(input);

    field.appendChild(document.createElement("br"));

    return field;
}




function addBookToLibrary(book, library) {
    library.push(book);
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

function testLibrary() {
    for (let i = 0; i < 5; i++) {
        let newBook = new Book("Title", "Author", 250, false);
        console.log(newBook);
        myLibrary.push(newBook);
    }

    bookList = createBookListElementFromArray(myLibrary);
    bookDisplay.appendChild(bookList);
}

function testFormCreation() {
    bookDisplay.appendChild(new BookForm().form);
}





testLibrary();
testFormCreation();