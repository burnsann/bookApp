'use strict';

/* const bookTemplateSource = document.getElementById('template-book').innerHTML;
const bookTemplate = Handlebars.compile(bookTemplateSource);
const booksList = document.querySelector('.books-list');
const bookFilters = document.querySelector('.filters');
const favoriteBooks = [];
const filters = [];

function render(){
  for(const book of dataSource.books){
    const html = bookTemplate(book);
    const bookElement = utils.createDOMFromHTML(html);
    booksList.appendChild(bookElement);
  }
  console.log('Wywołano funkcję: render');
}

function filterBooks(){
  for(const book of dataSource.books){
    let shouldBeHidden = false;
    for(const filter of filters){
      if(!book.details[filter]){
        shouldBeHidden = true;
        break;
      }
    }
    const bookImage = document.querySelector(`.book__image[data-id="${book.id}"]`);
    if (bookImage){
      if(shouldBeHidden){
        bookImage.classList.add('hidden');
      }else{
        bookImage.classList.remove('hidden');
      }
    }
  }
}

function initActions(){

  booksList.addEventListener('dblclick', function(event){
    console.log(event);
    if(event.target.offsetParent.classList.contains('book__image')){
      event.preventDefault();
      const bookId = event.target.offsetParent.getAttribute('data-id');
      if(!favoriteBooks.includes(bookId)){
        event.target.offsetParent.classList.add('favorite');
        favoriteBooks.push(bookId);
      }else{
        event.target.offsetParent.classList.remove('favorite');
        const index = favoriteBooks.indexOf(bookId);
        favoriteBooks.splice(index, 1);
      }
      console.log('Zawartość tablicy z ulubionymi książkami:', favoriteBooks);
    }
  });

  bookFilters.addEventListener('click', function(event){
    if(event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter'){
      const filterValue = event.target.value;
      console.log(filterValue);

      if(event.target.checked){
        if(!filters.includes(filterValue)){
          filters.push(filterValue);
        }
      }else{
        const index = filters.indexOf(filterValue);
        if(index !== -1){
          filters.splice(index, 1);
        }
      }
    }
    console.log('Tablica filters:', filters);
    filterBooks();
  });
}

render();
initActions(); */

class BooksList{
  constructor(){
    this.initData();
    this.getElements();
    this.initActions();
    this.render();
  }

  initData(){
    this.data = dataSource.books;
    this.favoriteBooks = [];
    this.filters = [];
  }
  
  getElements() {
    this.bookTemplateSource = document.getElementById('template-book').innerHTML;
    this.bookTemplate = Handlebars.compile(this.bookTemplateSource);
    this.booksList = document.querySelector('.books-list');
    this.bookFilters = document.querySelector('.filters');
  }

  render(){
    for(const book of dataSource.books){
      const html = this.bookTemplate(book);
      const bookElement = utils.createDOMFromHTML(html);
      this.booksList.appendChild(bookElement);
    }
    console.log('Wywołano funkcję: render');
  }
  
  initActions() {
    this.booksList.addEventListener('dblclick', function(event){
      console.log(event);
      if(event.target.offsetParent.classList.contains('book__image')){
        event.preventDefault();
        const bookId = event.target.offsetParent.getAttribute('data-id');
        if(!this.favoriteBooks.includes(bookId)){
          event.target.offsetParent.classList.add('favorite');
          this.favoriteBooks.push(bookId);
        }else{
          event.target.offsetParent.classList.remove('favorite');
          const index = this.favoriteBooks.indexOf(bookId);
          this.favoriteBooks.splice(index, 1);
        }
        console.log('Zawartość tablicy z ulubionymi książkami:', this.favoriteBooks);
      }
    });
  
    this.bookFilters.addEventListener('click', function(event){
      if(event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter'){
        const filterValue = event.target.value;
        console.log(filterValue);
  
        if(event.target.checked){
          if(!this.filters.includes(filterValue)){
            this.filters.push(filterValue);
          }
        }else{
          const index = this.filters.indexOf(filterValue);
          if(index !== -1){
            this.filters.splice(index, 1);
          }
        }
      }
      console.log('Tablica filters:', this.filters);
      this.filterBooks();
    });
  }

  filterBooks(){
    for(const book of this.data){
      let shouldBeHidden = false;
      for(const filter of this.filters){
        if(!book.details[filter]){
          shouldBeHidden = true;
          break;
        }
      }
      const bookImage = document.querySelector(`.book__image[data-id="${book.id}"]`);
      if (bookImage){
        if(shouldBeHidden){
          bookImage.classList.add('hidden');
        }else{
          bookImage.classList.remove('hidden');
        }
      }
    }
  }
}

const app = new BooksList();
