export default class Todolist {
  constructor() {
    this.collection = [];
    this.task = document.getElementById('item');
    this.item = document.getElementById('new-item');
    this.container = document.querySelector('.task');
    this.submit = document.getElementById('form');
    this.clear = document.querySelector('.clear');
    this.refresh = document.querySelector('.refresh');
    this.displayItems();
    this.container.addEventListener('click', (e) => {
      if (e.target.classList.contains('toggle')) {
        const index = e.target.dataset.id;
        this.checkItem(index);
      }
    });
    this.submit.addEventListener('submit', () => {
      this.addItem();
    });
    this.clear.addEventListener('click', () => {
      this.clearItem();
    });
    this.refresh.addEventListener('click', () => {
      this.refreshItems();
    });
  }

  addItem() {
    const item = this.item.value;
    const check = false;
    this.collection.push({ item, check });
    localStorage.setItem('collection', JSON.stringify(this.collection));
    this.displayItems();
    this.item.value = '';
  }

  displayItems() {
    this.container.innerHTML = '';
    this.collection.forEach((element, index) => {
      const node1 = document.createElement('div');
      node1.setAttribute('class', 'tasks');
      this.container.appendChild(node1);
      const checkbox = document.createElement('button');
      checkbox.setAttribute('class', 'toggle');
      checkbox.setAttribute('data-id', `${index}`);
      node1.appendChild(checkbox);
      const node2 = document.createElement('p');
      node2.setAttribute('class', 'text');
      node2.innerText = `${element.item}`;
      node1.appendChild(node2);
    });
  }

  clearItem() {
    const newCollection = [];
    for (let i = 0; i < this.collection.length; i += 1) {
      if (this.collection[i].check === false) {
        newCollection.push(this.collection[i]);
      }
    }
    this.collection = newCollection;
    localStorage.setItem('collection', JSON.stringify(this.collection));
    this.displayItems();
  }

  checkItem(index) {
    const check = document.querySelectorAll('.toggle');
    check[index].classList.toggle('active');
    check[index].parentElement.children[1].classList.toggle('active');
    if (this.collection[index].check) {
      this.collection[index].check = false;
    } else {
      this.collection[index].check = true;
    }
    localStorage.setItem('collection', JSON.stringify(this.collection));
  }

  refreshItems() {
    const newCollection = [];
    this.collection = newCollection;
    this.displayItems();
    localStorage.setItem('collection', JSON.stringify(this.collection));
  }
}
