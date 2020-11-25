let myLibrary = [];
let bookDisplay = document.querySelector("#content");
let newBookButton = document.querySelector("#new-book");
let numberOfFormsCreated = 0;




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

    let toggleReadUnreadItem = document.createElement("li");
    let toggleReadUnreadButton = document.createElement("button");
    toggleReadUnreadButton.textContent = "Read/Unread";
    toggleReadUnreadButton.addEventListener("click", () => {
        this.read = !this.read;
        refresh();
    });
    toggleReadUnreadItem.appendChild(toggleReadUnreadButton);
    bookInfoList.appendChild(toggleReadUnreadItem);

    let deleteBookItem = document.createElement("li");
    let deleteBookButton = document.createElement("button");
    deleteBookButton.textContent = "Delete Book";
    deleteBookButton.addEventListener("click", () => {
        console.log("Deleted book: " + this.infoAsString());
        myLibrary.splice(myLibrary.indexOf(this), 1);
        refresh();
    });
    deleteBookItem.appendChild(deleteBookButton);
    bookInfoList.appendChild(deleteBookItem);

    bookInfoList.classList.add("book-info-list");

    return bookInfoList;
}




function BookForm(id) {
    this.id = id;
    this.createForm();
}

BookForm.prototype.createForm = function() {
    let form = document.createElement("form");
    form.id = this.appendWithID("form");

    form.appendChild(this.createField("text", "Title: ", this.appendWithID("book-form-title")));
    form.appendChild(this.createField("text", "Author: ", this.appendWithID("book-form-author")));
    form.appendChild(this.createField("text", "Pages: ", this.appendWithID("book-form-pages")));
    form.appendChild(this.createField("checkbox", "I have read this book: ", this.appendWithID("book-form-read")));
    
    let submitButton = document.createElement("input");
    submitButton.type = "submit";
    submitButton.id = "book-form-submit-" + this.id;
    submitButton.value = "Submit";
    form.appendChild(submitButton);

    form.addEventListener("submit", e => {
        e.preventDefault();
        console.log("Submitted");
        this.submitForm();
        addBookToLibrary(this.book, myLibrary);
    })
    
    let cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";

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

BookForm.prototype.submitForm = function() {
    const formData = new FormData(this.form);
    const title = formData.get(this.appendWithID("book-form-title"));
    const author = formData.get(this.appendWithID("book-form-author"));
    const pages = parseInt(formData.get(this.appendWithID("book-form-pages")));
    const read = formData.get(this.appendWithID("book-form-read")) === "on" ? true : false;

    removeForm(this.form.id);
    
    let newBook = new Book(title, author, pages, read);
    console.log(newBook);
    this.book = newBook;
}

BookForm.prototype.appendWithID = function(stringWithoutUniqueID) {
    return stringWithoutUniqueID + "-" + this.id;
}




function addBookToLibrary(book, library) {
    console.log("Added book: " + book.infoAsString());
    library.push(book);
    refresh();
}


function createBookListElementFromArray(bookArray) {
    let bookList = document.createElement("div");

    for (let i = 0; i < bookArray.length; i++) {
        let book = bookArray[i];
        let bookInfoList = book.infoAsList();
        bookInfoList.setAttribute("data-book-index", i);
        bookList.appendChild(bookInfoList);
    }

    bookList.classList.add("book-list");

    return bookList;
}

// Not efficient, overwrites the book display whenever the function is called
function refresh() {
    overwriteBookDisplay();
}

function overwriteBookDisplay() {
    if (document.querySelector(".book-list")) {
        bookDisplay.replaceChild(createBookListElementFromArray(myLibrary), bookDisplay.querySelector(".book-list"));
    } else {
        bookDisplay.appendChild(createBookListElementFromArray(myLibrary));
    }
}

function removeForm(id) {
    bookDisplay.removeChild(document.querySelector("#" + id));
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





// Code executed on load
newBookButton.addEventListener("click", () => {
    if (document.querySelector("form")) {
        console.log("A form is already present");
        return;
    }

    bookDisplay.appendChild(new BookForm(numberOfFormsCreated).form);
    numberOfFormsCreated++;
})
