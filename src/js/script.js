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
    const thisBooksList = this;
    thisBooksList.initData();
    thisBooksList.getElements();
    thisBooksList.initActions();
    thisBooksList.render();
  }

  initData(){
    const thisBooksList = this;
    thisBooksList.data = dataSource.books;
    thisBooksList.favoriteBooks = [];
    thisBooksList.filters = [];
  }
  
  getElements() {
    const thisBooksList = this;

    thisBooksList.bookTemplateSource = document.getElementById('template-book').innerHTML;
    thisBooksList.bookTemplate = Handlebars.compile(thisBooksList.bookTemplateSource);
    thisBooksList.booksList = document.querySelector('.books-list');
    thisBooksList.bookFilters = document.querySelector('.filters');
  }

  render(){
    const thisBooksList = this;

    for(const book of thisBooksList.data){
      book.ratingBgc = thisBooksList.determineRatingBgc(book.rating);
      book.ratingWidth = book.rating * 10;
      const html = thisBooksList.bookTemplate(book);
      const bookElement = utils.createDOMFromHTML(html);
      thisBooksList.booksList.appendChild(bookElement);
    }
    console.log('Wywołano funkcję: render');
  }
  
  initActions() {
    const thisBooksList = this;

    thisBooksList.booksList.addEventListener('dblclick', function(event){
      console.log(event);
      if(event.target.offsetParent.classList.contains('book__image')){
        event.preventDefault();
        const bookId = event.target.offsetParent.getAttribute('data-id');
        if(!thisBooksList.favoriteBooks.includes(bookId)){
          event.target.offsetParent.classList.add('favorite');
          thisBooksList.favoriteBooks.push(bookId);
        }else{
          event.target.offsetParent.classList.remove('favorite');
          const index = thisBooksList.favoriteBooks.indexOf(bookId);
          thisBooksList.favoriteBooks.splice(index, 1);
        }
        console.log('Zawartość tablicy z ulubionymi książkami:', thisBooksList.favoriteBooks);
      }
    });
  
    thisBooksList.bookFilters.addEventListener('click', function(event){
      if(event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter'){
        const filterValue = event.target.value;
        console.log(filterValue);
  
        if(event.target.checked){
          if(!thisBooksList.filters.includes(filterValue)){
            thisBooksList.filters.push(filterValue);
          }
        }else{
          const index = thisBooksList.filters.indexOf(filterValue);
          if(index !== -1){
            thisBooksList.filters.splice(index, 1);
          }
        }
      }
      console.log('Tablica filters:', thisBooksList.filters);
      thisBooksList.filterBooks();
    });
  }

  filterBooks(){
    const thisBooksList = this;

    for(const book of thisBooksList.data){
      let shouldBeHidden = false;
      for(const filter of thisBooksList.filters){
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

  determineRatingBgc(rating) {
    if (rating < 6) {
      return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating <= 8) {
      return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating <= 9) {
      return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else {
      return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
  }
}

const app = new BooksList();
