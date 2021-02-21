function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
  

class Book{
    constructor(name, author, pages, read_pages){
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read_pages = read_pages;
    }

    get leftPages(){
        return this.calculateLeftPages();
    }

    calculateLeftPages(){
        return this.pages - this.read_pages;
    }

    declareWhatYouRead(){
        return this.name + " by " + this.author + " has " + this.pages + " from which I've read " + this.read_pages + ". Now, I'm left with " + this.leftPages + " pages.";
    }
}

let books_section = document.getElementById("books_list");
let books_rec = document.getElementById("books_record");
let clear_b = document.getElementById("clear_butt");

class bookList{
    constructor(){
        this.books = [];
    }

    createLocalStorage(){
        window.localStorage.setItem("books", JSON.stringify(this.books));
    }

    insertBook(name, author, pages, read_pages){
        let book = new Book(name, author, pages, read_pages);
        this.books.push(book);
    }

    emptyList(){
        this.books = [];
    }

    get allBooks(){
        for (let i in this.books){
            let r = new Book(this.books[i].name, this.books[i].author, this.books[i].pages, this.books[i].read_pages);
            let random = getRandomInt(0, 3);
            let r_t;
            if(r.calculateLeftPages() == 1){
                r_t = "'" + r.name + "' by " + r.author + " has " + r.pages + " from which I've read " + r.read_pages + ". Now, I'm left with " + r.leftPages + " page.";
            }
            else {
                r_t = "'" + r.name + "' by " + r.author + " has " + r.pages + " from which I've read " + r.read_pages + ". Now, I'm left with " + r.leftPages + " pages.";
            }
            books_section.innerHTML += "<div class='book' style='background-image: url(img/b"+random+".png)'><div style='width: 100%; height: auto; line-height: 5px;'><h2>"+r.name+"</h2><h3>"+r.author+"</h3></div><div style='width: 100%; height: auto; line-height: 5px;'><h4>"+r.pages+" pages</h4><h4>Pages read: "+r.read_pages+" pages</h4><h4>Pages left: "+r.leftPages+" pages</h4></div></div>";
        }

        window.localStorage.setItem('books', JSON.stringify(this.books));
    }

    get bookNumber(){
        return this.books.length;
    }

}
let ls_books, result_ls_books;
let yourBookList = new bookList();

    for(let i=0; i<localStorage.length; i++){
        ls_books = window.localStorage.key(i);
        if(ls_books == "books"){
           result_ls_books = JSON.parse(window.localStorage.getItem("books"));
           break;
        }
    }

    if(result_ls_books == undefined){
        yourBookList.createLocalStorage();
    }
    else{
        if(result_ls_books.length !=0){
            for (let i=0;i<result_ls_books.length;i++){
                let random = getRandomInt(0, 3);
                yourBookList.insertBook(result_ls_books[i].name, result_ls_books[i].author, result_ls_books[i].pages, result_ls_books[i].read_pages);
                books_section.innerHTML += "<div class='book' style='background-image: url(img/b"+random+".png)'><div style='width: 100%; height: auto; line-height: 5px;'><h2>"+result_ls_books[i].name+"</h2><h3>"+result_ls_books[i].author+"</h3></div><div style='width: 100%; height: auto; line-height: 5px;'><h4>"+result_ls_books[i].pages+" pages</h4><h4>Pages read: "+result_ls_books[i].read_pages+" pages</h4><h4>Pages left: "+ (result_ls_books[i].pages - result_ls_books[i].read_pages)+" pages</h4></div></div>";
            }
        }
    }

    books_rec.innerHTML = "<h1>Book Count: "+yourBookList.bookNumber+"</h1>";

clear_b.onclick = function(){
    localStorage.removeItem("books");
    yourBookList.emptyList();
    books_section.innerHTML="";
    books_rec.innerHTML = "<h1>Book Count: 0</h1>";
}

let submit_b = document.getElementById("submit_butt");
let title_b = document.getElementById("title");
let author_b = document.getElementById("author");
let pages_b = document.getElementById("pages");
let r_pages_b = document.getElementById("read_pages");

submit_b.onclick = function(){
    books_section.innerHTML = "";
    yourBookList.insertBook(title_b.value, author_b.value, pages_b.value, r_pages_b.value);
    yourBookList.allBooks;
    books_rec.innerHTML = "<h1>Book Count: "+yourBookList.bookNumber+"</h1>";
};


//let theGayScience = new Book("The Gay Science", "Friedrich Nietzsche", 174, 45);

//let book_text = theGayScience.declareWhatYouRead();

//document.body.innerHTML = "<h1>"+book_text+"</h1>";