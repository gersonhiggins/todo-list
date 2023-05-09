import Todolist from './modules/dom.js';
import './style.css';

const library = new Todolist();

if (localStorage.getItem('collection')) {
  library.collection = JSON.parse(localStorage.getItem('collection'));
  library.displayItems();
}
const refresh = document.querySelector('.rolling');
refresh.addEventListener('click', () => {
  refresh.classList.toggle('active');
});
