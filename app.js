// Book class: Represnts book
class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

// UI class: Handles UI tasks
class UI{
    static displayBooks(){
        const books=Store.getBooks();

        books.forEach(book => UI.addBookToList(book)
        )
    }

    static addBookToList(book){
        const list= document.getElementById('book-list');

        const row= document.createElement('tr');

        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove(); 
        }
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className=`alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container =document.querySelector('.container');
        const form= document.querySelector('#book-form')
        container.insertBefore(div, form )

        // Vanish after 3 secs
        setTimeout(()=>document.querySelector('.alert').remove(),3000);

    }

    static clearFields(){
        document.querySelector('#title').value=""
        document.querySelector('#author').value=""
        document.querySelector('#isbn').value=""
    }
}


// Store class: Handles Storage
class Store{
    static getBooks(){
        let books;

        if(localStorage.getItem('books') === null) {
            books =[];
        }else{
            books=JSON.parse(localStorage.getItem('books'));
        }
    }
    static addBook(){
        const books=Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books= Store.getBooks();
        books.forEach((book,index)=>{
            if(book.isbn === isbn){
                books.splice(index,1)
            }

        });
        localStorage.setItem('books', JSON.stringify(books))
    }
}
// Events: To display books

document.addEventListener('DOMContentLoaded', UI.displayBooks)
// Events: To add a book

document.querySelector('#book-form').addEventListener('submit',(e)=>{
   
    {
        e.preventDefault(); 
         //Get form values
         const title=document.querySelector('#title').value
         const author=document.querySelector('#author').value 
         const isbn=document.querySelector('#isbn').value
        //  console.log(title,author,isbn)

        //validate
        if(title === '' || author === '' || isbn === ''){
            UI.showAlert('Please fill on the fields','danger')
        }
        else{
             // Instantiate a book
        let newBook= new Book(title,author, isbn);
        // console.log(newBook);
        UI.addBookToList(newBook);

        // add book to store
        Store.addBook(book);

        UI.showAlert('Book Added','success')
        // Clear fields
        UI.clearFields()
        }


       
    }
})
// Events: to remove a book

document.querySelector('#book-list').addEventListener('click', (e)=>{
    // Remove book from UI
    UI.deleteBook(e.target);

    // Remove book from store
Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    
// Show success message
    UI.showAlert('Book Removed','success')
})

