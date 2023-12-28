'use strict';

const bookTemplateSource = document.getElementById('template-book').innerHTML;
const bookTemplate = Handlebars.compile(bookTemplateSource);
const booksList = document.querySelector('.books-list');
const bookFilters = document.querySelector('.filters');

function render(){
  for(const book of dataSource.books){
    const html = bookTemplate(book);
    const bookElement = utils.createDOMFromHTML(html);
    booksList.appendChild(bookElement);
  }
  console.log('Wywołano funkcję: render');
}

const favoriteBooks = [];
const filters = [];

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
      console.log('Tablica filters:', filters);
    }
  });
}

render();
initActions();
